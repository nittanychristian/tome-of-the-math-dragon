port module Verify exposing (main)

import Game.Battle as Battle
import Game.Curriculum as Curriculum
import Game.Elementary as Elementary
import Game.Passcode as Passcode
import Game.Problem as Problem
import Game.Problem.Algebra1 as Algebra1
import Game.Problem.Course1 as Course1
import Game.Problem.Course2 as Course2
import Game.Problem.Elementary as ElementaryProblem
import Game.Problem.PreAlgebra as PreAlgebra
import Json.Encode as Encode
import Main
import Platform
import Random
import Set
import Types exposing (..)
import View.Math as Math


port report : Encode.Value -> Cmd msg


main : Program () () Never
main =
    Platform.worker
        { init = \_ -> ( (), report results )
        , update = \never _ -> never |> neverHappens
        , subscriptions = \_ -> Sub.none
        }


neverHappens : Never -> a
neverHappens never =
    neverHappens never


type alias Check =
    ( String, Bool )


check : String -> Bool -> Check
check name passed =
    ( name, passed )


step : Msg -> Main.Model -> Main.Model
step msg model =
    Main.update msg model |> Tuple.first


initial : Main.Model
initial =
    Main.init "" |> Tuple.first


inputFor : Problem -> AnswerInput
inputFor problem =
    case problem.inputType of
        TInteger ->
            IInt problem.hint.answer

        TDecimal ->
            IDecimal problem.hint.answer

        TFraction ->
            let
                parts =
                    String.split "/" problem.hint.answer
            in
            IFraction { num = List.head parts |> Maybe.withDefault "", den = List.drop 1 parts |> List.head |> Maybe.withDefault "" }

        TChoice choices ->
            IChoice (List.indexedMap Tuple.pair choices |> List.filter (\( _, label ) -> label == problem.hint.answer) |> List.head |> Maybe.map Tuple.first)

        _ ->
            IInt ""


correct : Main.Model -> Main.Model
correct model =
    case model.screen of
        BattleScreen state ->
            model |> step (UpdateInput (inputFor state.problem)) |> step SubmitAnswer |> step FlashDone

        _ ->
            model


repeat : Int -> (a -> a) -> a -> a
repeat times fn value =
    if times <= 0 then
        value

    else
        repeat (times - 1) fn (fn value)


isQuest : UnitId -> Int -> Bool -> Main.Model -> Bool
isQuest uid qi continuous model =
    case model.screen of
        BattleScreen state ->
            state.unit == uid && state.mode == QuestMode qi && state.continuousPractice == continuous

        _ ->
            False


phaseIs : BattlePhase -> Main.Model -> Bool
phaseIs phase model =
    case model.screen of
        BattleScreen state ->
            state.phase == phase

        _ ->
            False


navigationChecks : List Check
navigationChecks =
    let
        highest =
            initial.highestUnlocked

        uid =
            Curriculum.firstUnit (Elementary 3)

        qi =
            Elementary.topicsFor 3 |> List.indexedMap Tuple.pair |> List.filter (\( _, topic ) -> topic.quest.name == "Single-Digit Times Tables") |> List.head |> Maybe.map Tuple.first |> Maybe.withDefault -1

        practice =
            initial |> step ToggleContinuousPractice |> step (PracticeQuest uid qi) |> step BeginQuest

        extended =
            repeat 100 correct practice

        disabled =
            extended |> step ToggleContinuousPractice |> correct

        wrong =
            extended |> step (UpdateInput (IInt "9999")) |> step SubmitAnswer

        resumed =
            wrong |> step DismissTutorial

        helped =
            extended |> step AskForHelp |> step ExitHelp

        retry =
            extended |> step RetryUnit

        full =
            initial |> step ToggleContinuousPractice |> step (StartUnit uid) |> step BeginQuest |> repeat 20 correct

        normal =
            initial |> step (StartUnit uid) |> step BeginQuest |> repeat 3 correct

        boss =
            extended |> step (StartBoss uid)

        won =
            boss |> repeat 30 correct

        victory =
            won |> step BackToMap

        after =
            victory |> step BackToMap

        middleUid =
            Curriculum.firstUnit Course1

        middle =
            initial |> step ToggleContinuousPractice |> step (PracticeQuest middleUid 0) |> step BeginQuest |> repeat 20 correct
    in
    [ check "New game begins with grade 1 identity" (highest == Curriculum.firstUnit (Elementary 1))
    , check "Grades precede unchanged middle school courses" (Curriculum.allCourses == List.map Elementary (List.range 1 5) ++ [ Course1, Course2, PreAlgebra, Algebra1 ])
    , check "Direct access to every grade and Course 1" (List.all (\course -> Curriculum.isUnlocked (Curriculum.firstUnit course) highest) (List.map Elementary (List.range 1 5) ++ [ Course1 ]))
    , check "Later middle school courses stay locked" (not (Curriculum.isUnlocked (Curriculum.firstUnit Course2) highest))
    , check "Direct grade 2 navigation" ((initial |> step (GoToAct (Elementary 2))).screen == MapScreen { course = Elementary 2 })
    , check "One chapter per elementary grade" (List.all (\grade -> Curriculum.unitsForCourse (Elementary grade) == [ Curriculum.firstUnit (Elementary grade) ]) (List.range 1 5))
    , check "Dedicated multiplication facts quest exists" (qi >= 0)
    , check "Continuous mode survives 100 correct answers in same quest" (isQuest uid qi True extended && phaseIs Idle extended)
    , check "Continuous counter reaches 100"
        (case extended.screen of
            BattleScreen state ->
                state.correctInQuest == 100

            _ ->
                False
        )
    , check "Switching continuous off restores completion" (isQuest uid qi False disabled && phaseIs QuestComplete disabled)
    , check "Enabling continuous on completed quest resumes it" (phaseIs Idle (disabled |> step ToggleContinuousPractice))
    , check "Wrong answers retain continuous mode"
        (isQuest uid qi True wrong
            && (case wrong.screen of
                    BattleScreen state ->
                        case state.phase of
                            ShowTutorial _ _ ->
                                True

                            _ ->
                                False

                    _ ->
                        False
               )
        )
    , check "Dismiss tutorial retains continuous quest" (isQuest uid qi True resumed && phaseIs Idle resumed)
    , check "Help retains continuous mode and counters"
        (isQuest uid qi True helped
            && (case helped.screen of
                    BattleScreen state ->
                        state.correctInQuest == 100

                    _ ->
                        False
               )
        )
    , check "Retry inherits continuous preference" (isQuest uid 0 True retry)
    , check "Full-chapter continuous mode stays in first quest" (isQuest uid 0 True full && phaseIs Idle full)
    , check "Normal full-chapter quest still completes" (phaseIs QuestComplete normal)
    , check "Continuous practice works in old middle school quests" (isQuest middleUid 0 True middle && phaseIs Idle middle)
    , check "Boss ignores continuous preference"
        (case boss.screen of
            BattleScreen state ->
                state.mode == BossMode && not state.continuousPractice

            _ ->
                False
        )
    , check "Boss victory still works" (phaseIs BattleWon won)
    , check "Elementary victory reaches next grade" (after.screen == MapScreen { course = Elementary 4 })
    , check "Practice exit returns to chapter" ((extended |> step BackToMap).screen == ChapterScreen uid)
    , check "Grade 5 hands off to Course 1" (Curriculum.nextUnit (Curriculum.firstUnit (Elementary 5)) == Just middleUid)
    , check "Invalid code rejected" (Passcode.unitForCode "not a real code" == Nothing)
    , check "Legacy trophy remains the trophy" (Passcode.codeForUnit { course = Algebra1, unit = MegaBoss } == Just "shard peak fire arch")
    ]


legacyChecks : List Check
legacyChecks =
    let
        legacyUnits =
            List.concatMap (\( course, count ) -> List.map (\n -> { course = course, unit = Unit n }) (List.range 1 count) ++ [ { course = course, unit = MegaBoss } ]) [ ( Course1, 8 ), ( Course2, 8 ), ( PreAlgebra, 9 ), ( Algebra1, 12 ) ]

        normalizeCheck ( code, uid ) =
            [ check ("Legacy resume: " ++ code) (Passcode.unitForCode code == Just uid)
            , check ("Legacy normalization: " ++ code) (Passcode.unitForCode ("  " ++ String.toUpper code ++ "  ") == Just uid)
            ]

        completionCheck uid ( code, nextUid ) =
            check ("Legacy award and progression: " ++ code) (Passcode.codeForUnit uid == Just code && Curriculum.nextUnit uid == Just nextUid)

        resumeCheck ( code, uid ) =
            let
                model =
                    initial |> step (SetPasscodeDraft code) |> step SubmitPasscode |> step SubmitName
            in
            check ("Legacy resume UI: " ++ code) (model.highestUnlocked == uid && model.screen == MapScreen { course = uid.course })
    in
    List.concatMap normalizeCheck legacyEntries
        ++ List.map2 completionCheck legacyUnits legacyEntries
        ++ List.map resumeCheck legacyEntries
        ++ List.map
            (\grade ->
                let
                    uid =
                        Curriculum.firstUnit (Elementary grade)
                in
                check ("Elementary code round trip " ++ String.fromInt grade) (Passcode.codeForUnit uid |> Maybe.andThen Passcode.unitForCode |> (==) (Curriculum.nextUnit uid))
            )
            (List.range 1 5)


legacyEntries : List ( String, UnitId )
legacyEntries =
    [ ( "stone wall paper crow", { course = Course1, unit = Unit 2 } )
    , ( "lamp silver torch pine", { course = Course1, unit = Unit 3 } )
    , ( "river moon apple salt", { course = Course1, unit = Unit 4 } )
    , ( "forge blade iron dust", { course = Course1, unit = Unit 5 } )
    , ( "brass kettle march wind", { course = Course1, unit = Unit 6 } )
    , ( "castle door seven noon", { course = Course1, unit = Unit 7 } )
    , ( "bridge quill amber frost", { course = Course1, unit = Unit 8 } )
    , ( "thunder helm deep pool", { course = Course1, unit = MegaBoss } )
    , ( "crystal peak ember song", { course = Course2, unit = Unit 1 } )

    -- Course 2 completions
    , ( "shore lantern black twig", { course = Course2, unit = Unit 2 } )
    , ( "crown vale copper ring", { course = Course2, unit = Unit 3 } )
    , ( "hollow branch smoke bell", { course = Course2, unit = Unit 4 } )
    , ( "dusk arrow leather drum", { course = Course2, unit = Unit 5 } )
    , ( "glacier hound swift mast", { course = Course2, unit = Unit 6 } )
    , ( "oak shield bright lens", { course = Course2, unit = Unit 7 } )
    , ( "cliff powder veil chalk", { course = Course2, unit = Unit 8 } )
    , ( "harbor comet flint straw", { course = Course2, unit = MegaBoss } )
    , ( "silver bloom arch tide", { course = PreAlgebra, unit = Unit 1 } )

    -- Pre-Algebra completions
    , ( "wolf timber shade beam", { course = PreAlgebra, unit = Unit 2 } )
    , ( "raven cloak north gate", { course = PreAlgebra, unit = Unit 3 } )
    , ( "ember flask coin tower", { course = PreAlgebra, unit = Unit 4 } )
    , ( "marsh swift peak dawn", { course = PreAlgebra, unit = Unit 5 } )
    , ( "frost pine wheel sail", { course = PreAlgebra, unit = Unit 6 } )
    , ( "vale arrow smoke helm", { course = PreAlgebra, unit = Unit 7 } )
    , ( "ridge torch copper gale", { course = PreAlgebra, unit = Unit 8 } )
    , ( "dune mirror pale drift", { course = PreAlgebra, unit = Unit 9 } )
    , ( "iron bell moss quay", { course = PreAlgebra, unit = MegaBoss } )
    , ( "storm veil amber crest", { course = Algebra1, unit = Unit 1 } )

    -- Algebra 1 completions
    , ( "blaze chalk quill tide", { course = Algebra1, unit = Unit 2 } )
    , ( "thorn gate river mist", { course = Algebra1, unit = Unit 3 } )
    , ( "crest flame loom salt", { course = Algebra1, unit = Unit 4 } )
    , ( "sand crown night oar", { course = Algebra1, unit = Unit 5 } )
    , ( "hinge dark well shore", { course = Algebra1, unit = Unit 6 } )
    , ( "plume brass swift knot", { course = Algebra1, unit = Unit 7 } )
    , ( "grove seal pale drum", { course = Algebra1, unit = Unit 8 } )
    , ( "wren coil deep flint", { course = Algebra1, unit = Unit 9 } )
    , ( "anvil ember moon pool", { course = Algebra1, unit = Unit 10 } )
    , ( "cleft bower shade ring", { course = Algebra1, unit = Unit 11 } )
    , ( "spark reed dawn lens", { course = Algebra1, unit = Unit 12 } )
    , ( "bone vault swift bloom", { course = Algebra1, unit = MegaBoss } )
    ]


type alias Sample =
    { grade : Int, quest : Int, variant : Int, seed : Int, problem : Problem }


samples : List Sample
samples =
    List.concatMap
        (\grade -> Elementary.topicsFor grade |> List.indexedMap (\qi topic -> topic.generators |> List.indexedMap (\variant _ -> List.range 0 99 |> List.map (\seed -> { grade = grade, quest = qi, variant = variant, seed = seed, problem = Random.step (Problem.generatorFor (Curriculum.firstUnit (Elementary grade)) qi variant) (Random.initialSeed seed) |> Tuple.first })) |> List.concat) |> List.concat)
        (List.range 1 5)
        ++ List.concatMap
            (\grade -> List.range 0 99 |> List.map (\seed -> { grade = grade, quest = -1, variant = seed, seed = seed, problem = Random.step (Problem.generatorFor (Curriculum.firstUnit (Elementary grade)) -1 seed) (Random.initialSeed seed) |> Tuple.first }))
            (List.range 1 5)


validProblem : Problem -> Bool
validProblem p =
    p.prompt
        == p.hint.prompt
        && not (String.isEmpty p.prompt)
        && List.length p.hint.steps
        >= 2
        && Battle.checkAnswer (inputFor p) p.answer
        && not (Battle.checkAnswer (IInt "999999999") p.answer)
        && (case ( p.inputType, p.answer ) of
                ( TInteger, AInt _ ) ->
                    True

                ( TDecimal, AFloat value tolerance ) ->
                    not (isNaN value || isInfinite value) && tolerance > 0

                ( TFraction, AFraction _ d ) ->
                    d > 0 && not (Battle.checkAnswer (IFraction { num = "1", den = "0" }) p.answer)

                ( TChoice choices, AChoice index ) ->
                    List.length choices == Set.size (Set.fromList choices) && List.length choices >= 2 && index >= 0 && index < List.length choices

                _ ->
                    False
           )


sampleChecks : List Check
sampleChecks =
    List.map
        (\sample ->
            check ("Generated problem: grade " ++ String.fromInt sample.grade ++ ", quest " ++ String.fromInt sample.quest ++ ", variant " ++ String.fromInt sample.variant ++ ", seed " ++ String.fromInt sample.seed)
                (validProblem sample.problem
                    && (sample.grade
                            >= 5
                            || (case sample.problem.answer of
                                    AInt n ->
                                        n >= 0

                                    AFraction n _ ->
                                        n >= 0

                                    _ ->
                                        True
                               )
                       )
                )
        )
        samples
        ++ List.concatMap (\grade -> Elementary.topicsFor grade |> List.map (\topic -> check ("All variants encountered: " ++ topic.quest.name) (topic.quest.minCorrect >= List.length topic.generators && not (List.isEmpty topic.generators)))) (List.range 1 5)


middleDispatchChecks : List Check
middleDispatchChecks =
    List.concatMap
        (\entry ->
            List.range 1 entry.count
                |> List.concatMap
                    (\unit ->
                        List.range -1 (List.length (Curriculum.questsFor { course = entry.course, unit = Unit unit }) - 1)
                            |> List.map
                                (\qi ->
                                    let
                                        seed =
                                            Random.initialSeed (unit * 53 + qi)
                                    in
                                    check "Unchanged middle school problem dispatch"
                                        (Tuple.first (Random.step (Problem.generatorFor { course = entry.course, unit = Unit unit } qi 1) seed)
                                            == Tuple.first
                                                (Random.step
                                                    (if qi < 0 then
                                                        entry.generator unit

                                                     else
                                                        entry.questGenerator unit qi 1
                                                    )
                                                    seed
                                                )
                                        )
                                )
                    )
        )
        [ { course = Course1, count = 8, generator = Course1.generatorFor, questGenerator = Course1.generatorForQuest }
        , { course = Course2, count = 8, generator = Course2.generatorFor, questGenerator = Course2.generatorForQuest }
        , { course = PreAlgebra, count = 9, generator = PreAlgebra.generatorFor, questGenerator = PreAlgebra.generatorForQuest }
        , { course = Algebra1, count = 12, generator = Algebra1.generatorFor, questGenerator = Algebra1.generatorForQuest }
        ]


encodeSample : Sample -> Encode.Value
encodeSample sample =
    let
        p =
            sample.problem

        ( answerType, answer ) =
            case p.answer of
                AInt n ->
                    ( "integer", Encode.float (toFloat n) )

                AFloat n _ ->
                    ( "decimal", Encode.float n )

                AFraction n d ->
                    ( "fraction", Encode.float (toFloat n / toFloat d) )

                AChoice index ->
                    ( "choice"
                    , Encode.string
                        (case p.inputType of
                            TChoice choices ->
                                List.drop index choices |> List.head |> Maybe.withDefault ""

                            _ ->
                                ""
                        )
                    )

                _ ->
                    ( "other", Encode.null )
    in
    Encode.object
        [ ( "grade", Encode.int sample.grade )
        , ( "quest", Encode.int sample.quest )
        , ( "variant", Encode.int sample.variant )
        , ( "prompt", Encode.string p.prompt )
        , ( "type", Encode.string answerType )
        , ( "answer", answer )
        , ( "choices"
          , case p.inputType of
                TChoice options ->
                    Encode.list Encode.string options

                _ ->
                    Encode.list Encode.string []
          )
        , ( "visual", encodeVisual p.visual )
        , ( "layout", Math.arithmeticLayout p.prompt |> Maybe.map (\layout -> Encode.object [ ( "operator", Encode.string layout.operator ), ( "operands", Encode.list Encode.string layout.operands ) ]) |> Maybe.withDefault Encode.null )
        ]


encodeVisual : Maybe ProblemVisual -> Encode.Value
encodeVisual maybeVisual =
    let
        rows values =
            Encode.list (\( name, value ) -> Encode.object [ ( "name", Encode.string name ), ( "value", Encode.int value ) ]) values

        make kind fields =
            Encode.object (( "kind", Encode.string kind ) :: fields)
    in
    case maybeVisual of
        Nothing ->
            Encode.null

        Just visual ->
            case visual of
                CountingObjects _ count ->
                    make "objects" [ ( "count", Encode.int count ) ]

                RibbonLengths values ->
                    make "ribbons" [ ( "rows", rows values ) ]

                ObjectArray rowCount columns ->
                    make "array" [ ( "rows", Encode.int rowCount ), ( "columns", Encode.int columns ) ]

                FractionStrip shaded total ->
                    make "fraction" [ ( "shaded", Encode.int shaded ), ( "total", Encode.int total ) ]

                BarChart _ _ scaleStep values ->
                    make "bars" [ ( "step", Encode.int scaleStep ), ( "rows", rows values ) ]

                PictureGraph _ perSymbol values ->
                    make "pictures" [ ( "perSymbol", Encode.int perSymbol ), ( "rows", rows values ) ]

                MeasurementPlot _ denominator counts ->
                    make "plot" [ ( "denominator", Encode.int denominator ), ( "marks", Encode.list (\( value, count ) -> Encode.object [ ( "value", Encode.int value ), ( "count", Encode.int count ) ]) counts ) ]

                InputOutputTable values ->
                    make "table" [ ( "rows", Encode.list (\( input, output ) -> Encode.object [ ( "input", Encode.int input ), ( "output", output |> Maybe.map Encode.int |> Maybe.withDefault Encode.null ) ]) values ) ]

                EqualGroups groups perGroup ->
                    make "groups" [ ( "groups", Encode.int groups ), ( "perGroup", Encode.int perGroup ) ]


results : Encode.Value
results =
    let
        checks =
            navigationChecks ++ legacyChecks ++ sampleChecks ++ middleDispatchChecks ++ arithmeticLayoutChecks ++ ruleDiscoveryChecks ++ grade2TimesTableChecks
    in
    Encode.object
        [ ( "checks", Encode.int (List.length checks) )
        , ( "failures", Encode.list Encode.string (checks |> List.filter (Tuple.second >> not) |> List.map Tuple.first) )
        , ( "catalog", Encode.list identity (List.range 1 5 |> List.map (\grade -> Encode.object [ ( "grade", Encode.int grade ), ( "topics", Encode.list Encode.string (Elementary.questsFor grade |> List.map .name) ) ])) )
        , ( "samples", Encode.list encodeSample samples )
        ]


arithmeticLayoutChecks : List Check
arithmeticLayoutChecks =
    let
        layout operator operands =
            Just { operator = operator, operands = operands }

        fixtures =
            [ ( "123456 + 789 = ?", layout "+" [ "123456", "789" ] )
            , ( "11 + 2 = ?", layout "+" [ "11", "2" ] )
            , ( "9 + 10 = ?", Nothing )
            , ( "10 + 10 = ?", Nothing )
            , ( "9 x 9 = ?", Nothing )
            , ( "12.5 + 3.75 = ?", layout "+" [ "12.50", "3.75" ] )
            , ( "0.45 + 0.3 = ?", layout "+" [ "0.45", "0.30" ] )
            , ( "4.2 - 0.75 = ?", layout "-" [ "4.20", "0.75" ] )
            , ( "0.4 x 0.25 = ?", layout "x" [ "0.4", "0.25" ] )
            , ( "0.81 / 0.9 = ?", layout "/" [ "0.81", "0.9" ] )
            , ( "2 + 0.125 = ?", layout "+" [ "2.000", "0.125" ] )
            , ( "1.0 + 2.0 = ?", layout "+" [ "1.0", "2.0" ] )
            , ( "12 + 0.125 = ?", layout "+" [ "12.000", "0.125" ] )
            , ( "15.2 - 0.75 = ?", layout "-" [ "15.20", "0.75" ] )
            , ( "1000 - 98 = ?", layout "-" [ "1000", "98" ] )
            , ( "-12 + 3 = ?", layout "+" [ "-12", "3" ] )
            , ( "48 x 12 = ?", layout "x" [ "48", "12" ] )
            , ( "24 × 3 = ?", layout "x" [ "24", "3" ] )
            , ( "144 / 12 = ?", layout "/" [ "144", "12" ] )
            , ( "12.5 ÷ 0.5 = ?", layout "/" [ "12.5", "0.5" ] )
            , ( "3 + 4 + 5 + 12 = ?", layout "+" [ "3", "4", "5", "12" ] )
            , ( "12 + 3 x 4 = ?", Nothing )
            , ( "(12 + 3) x 4 = ?", Nothing )
            , ( "1/2 + 11/12 = ?", Nothing )
            , ( "12 + ? = 20", Nothing )
            , ( "n + 12 = ?", Nothing )
            , ( "12^2 + 3 = ?", Nothing )
            , ( "You have 12 apples and get 3 more. How many?", Nothing )
            , ( "12 + 3 = 15", Nothing )
            ]
    in
    List.map (\( prompt, expected ) -> check ("Arithmetic layout: " ++ prompt) (Math.arithmeticLayout prompt == expected)) fixtures


ruleDiscoveryChecks : List Check
ruleDiscoveryChecks =
    let
        problem =
            Random.step (ElementaryProblem.ruleFromTable 6 3) (Random.initialSeed 0) |> Tuple.first
    in
    [ check "Rule example: actual table contains 1 -> 9, 2 -> 15, 3 -> 21" (problem.visual == Just (InputOutputTable [ ( 1, Just 9 ), ( 2, Just 15 ), ( 3, Just 21 ) ]))
    , check "Rule discovery does not reveal the rule in its prompt" (not (String.contains "multiply" (String.toLower problem.prompt)))
    , check "Rule example: correct rule and worked derivation" (problem.hint.answer == "Multiply by 6, then add 3" && List.length problem.hint.steps >= 4)
    ]


grade2TimesTableChecks : List Check
grade2TimesTableChecks =
    let
        uid =
            Curriculum.firstUnit (Elementary 2)

        study =
            initial |> step ToggleContinuousPractice |> step (PracticeQuest uid 12) |> step BeginQuest |> repeat 60 correct

        zeroGroups =
            Random.step (ElementaryProblem.groupedTimesTable 0) (Random.initialSeed 0) |> Tuple.first

        emptyGroups =
            ElementaryProblem.timesTableProblem 5 0 |> ElementaryProblem.withVisual (EqualGroups 5 0)
    in
    [ check "Grade 2 has 26 quests" (List.length (Elementary.questsFor 2) == 26)
    , check "Grade 2 multiplication quests occupy positions 8 through 13" ((Elementary.questsFor 2 |> List.drop 7 |> List.take 6 |> List.map .name) == List.map (\factor -> "Multiply by " ++ String.fromInt factor) (List.range 0 5))
    , check "Multiply by 5 stays in its quest after 60 continuous answers"
        (isQuest uid 12 True study
            && phaseIs Idle study
            && (case study.screen of
                    BattleScreen state ->
                        String.startsWith "5 x " state.problem.prompt && state.correctInQuest == 60

                    _ ->
                        False
               )
        )
    , check "Zero groups always have zero counters" (zeroGroups.answer == AInt 0)
    , check "Five empty groups have zero counters" (emptyGroups.answer == AInt 0 && emptyGroups.visual == Just (EqualGroups 5 0))
    ]
