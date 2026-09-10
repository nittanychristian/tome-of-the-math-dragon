port module Main exposing (main)

import Browser
import Browser.Events
import Config
import Game.Battle as Battle
import Game.Curriculum as Curriculum
import Game.Passcode as Passcode
import Game.Problem as Problem
import Html exposing (Html, div)
import Html.Attributes exposing (style)
import Html.Events exposing (onClick)
import Json.Decode as Decode
import Process
import Random
import Task
import Time
import Types exposing (..)
import View.Battle as BattleView
import View.Chapter as ChapterView
import View.Help as HelpView
import View.Map as MapView
import View.Theme as T
import View.Title as TitleView
import View.Victory as VictoryView


port saveName : String -> Cmd msg


port focusFirstInput : () -> Cmd msg


-- Flags: "playerName\tseedInt" from localStorage + Date.now()
main : Program String Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }


type alias Model =
    { screen : Screen
    , playerName : String
    , highestUnlocked : UnitId
    , seed : Random.Seed
    , confirmingExit : Bool
    }


init : String -> ( Model, Cmd Msg )
init flags =
    let
        parts =
            String.split "\t" flags

        savedName =
            Maybe.withDefault "" (List.head parts)

        seedInt =
            parts
                |> List.drop 1
                |> List.head
                |> Maybe.andThen String.toInt
                |> Maybe.withDefault 0

        startUnit =
            { course = Course1, unit = Unit 1 }
    in
    ( { screen =
            if String.isEmpty savedName then
                TitleScreen
            else
                MapScreen { course = Course1 }  -- TODO: persist course from last session
      , playerName = savedName
      , highestUnlocked = startUnit
      , seed = Random.initialSeed seedInt
      , confirmingExit = False
      }
    , Cmd.none
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        GoToTitle ->
            ( { model
                | screen = TitleScreen
                , playerName = ""
                , highestUnlocked = { course = Course1, unit = Unit 1 }
                , confirmingExit = False
              }
            , saveName ""
            )

        RequestExit ->
            ( { model | confirmingExit = True }, Cmd.none )

        CancelExit ->
            ( { model | confirmingExit = False }, Cmd.none )

        GoToAct course ->
            ( { model | screen = MapScreen { course = course } }, Cmd.none )

        SetNameDraft draft ->
            case model.screen of
                NameEntryScreen s ->
                    ( { model | screen = NameEntryScreen { s | draft = draft } }, Cmd.none )

                TitleScreen ->
                    ( { model | screen = NameEntryScreen { draft = draft, destination = Nothing } }, Cmd.none )

                _ ->
                    ( model, Cmd.none )

        SubmitName ->
            case model.screen of
                TitleScreen ->
                    ( { model | screen = NameEntryScreen { draft = "", destination = Nothing } }, Cmd.none )

                NameEntryScreen { draft, destination } ->
                    let
                        name =
                            if String.isEmpty (String.trim draft) then
                                "HERO"
                            else
                                String.trim draft

                        nextScreen =
                            case destination of
                                Just uid ->
                                    MapScreen { course = uid.course }

                                Nothing ->
                                    MapScreen { course = Course1 }
                    in
                    ( { model | playerName = name, screen = nextScreen }
                    , saveName name
                    )

                _ ->
                    ( model, Cmd.none )

        SetPasscodeDraft draft ->
            case model.screen of
                PasscodeScreen s ->
                    ( { model | screen = PasscodeScreen { s | draft = draft } }, Cmd.none )

                TitleScreen ->
                    ( { model | screen = PasscodeScreen { draft = draft, error = False } }, Cmd.none )

                _ ->
                    ( model, Cmd.none )

        SubmitPasscode ->
            case model.screen of
                PasscodeScreen { draft } ->
                    case Passcode.unitForCode draft of
                        Just uid ->
                            let
                                newHighest =
                                    if compareUnits uid model.highestUnlocked == GT then
                                        uid
                                    else
                                        model.highestUnlocked
                            in
                            if String.isEmpty model.playerName then
                                ( { model
                                    | highestUnlocked = newHighest
                                    , screen = NameEntryScreen { draft = "", destination = Just uid }
                                  }
                                , Cmd.none
                                )
                            else
                                ( { model
                                    | highestUnlocked = newHighest
                                    , screen = MapScreen { course = uid.course }
                                  }
                                , Cmd.none
                                )

                        Nothing ->
                            ( { model | screen = PasscodeScreen { draft = draft, error = True } }, Cmd.none )

                _ ->
                    ( model, Cmd.none )

        StartUnit uid ->
            let
                quests = Curriculum.questsFor uid
            in
            case quests of
                [] ->
                    startBoss uid model

                _ ->
                    startQuest uid 0 model

        ViewChapter uid ->
            ( { model | screen = ChapterScreen uid }, Cmd.none )

        PracticeQuest uid qi ->
            let
                ( problem, newSeed ) =
                    Random.step (Problem.generatorFor uid qi 0) model.seed
            in
            ( { model | screen = BattleScreen (Battle.initialPracticeState uid qi problem), seed = newSeed }
            , Cmd.none
            )

        BeginQuest ->
            case model.screen of
                BattleScreen state ->
                    ( { model | screen = BattleScreen { state | phase = Idle } }, focusFirstInput () )

                _ ->
                    ( model, Cmd.none )

        GotProblem _ ->
            ( model, Cmd.none )

        UpdateInput input ->
            case model.screen of
                BattleScreen state ->
                    ( { model | screen = BattleScreen { state | input = input } }, Cmd.none )

                _ ->
                    ( model, Cmd.none )

        SubmitAnswer ->
            case model.screen of
                BattleScreen state ->
                    if state.phase /= Idle then
                        ( model, Cmd.none )
                    else
                        handleAnswer state model

                _ ->
                    ( model, Cmd.none )

        AnimTick ->
            case model.screen of
                BattleScreen state ->
                    let
                        newFrame =
                            case state.animFrame of
                                FrameA -> FrameB
                                FrameB -> FrameA
                    in
                    ( { model | screen = BattleScreen { state | animFrame = newFrame } }, Cmd.none )

                _ ->
                    ( model, Cmd.none )

        FlashDone ->
            case model.screen of
                BattleScreen state ->
                    case state.phase of
                        ShowResult _ ->
                            ( { model | screen = BattleScreen { state | phase = Idle } }, focusFirstInput () )

                        _ ->
                            ( model, Cmd.none )

                _ ->
                    ( model, Cmd.none )

        AskForHelp ->
            case model.screen of
                BattleScreen state ->
                    let
                        helpState =
                            { hint = state.problem.hint
                            , stepShown = 0
                            }
                    in
                    ( { model | screen = HelpScreen helpState { state | streak = 0 } }
                    , Cmd.none
                    )

                _ ->
                    ( model, Cmd.none )

        NextHelpStep ->
            case model.screen of
                HelpScreen helpState battleState ->
                    ( { model
                        | screen = HelpScreen { helpState | stepShown = helpState.stepShown + 1 } battleState
                      }
                    , Cmd.none
                    )

                _ ->
                    ( model, Cmd.none )

        ExitHelp ->
            case model.screen of
                HelpScreen _ battleState ->
                    let
                        questIndex =
                            case battleState.mode of
                                QuestMode qi -> qi
                                BossMode -> -1

                        ( nextProblem, newSeed ) =
                            Random.step (Problem.generatorFor battleState.unit questIndex battleState.correctInQuest) model.seed
                    in
                    ( { model
                        | screen =
                            BattleScreen
                                { battleState
                                    | problem = nextProblem
                                    , input = Battle.defaultInput nextProblem.inputType
                                    , phase = Idle
                                }
                        , seed = newSeed
                      }
                    , focusFirstInput ()
                    )

                _ ->
                    ( model, Cmd.none )

        NextQuest ->
            case model.screen of
                BattleScreen state ->
                    case state.mode of
                        QuestMode qi ->
                            if state.practice then
                                let
                                    ( problem, newSeed ) =
                                        Random.step (Problem.generatorFor state.unit qi 0) model.seed
                                in
                                ( { model
                                    | screen =
                                        BattleScreen
                                            { state
                                                | correctInQuest = 0
                                                , problem = problem
                                                , input = Battle.defaultInput problem.inputType
                                                , phase = Idle
                                            }
                                    , seed = newSeed
                                  }
                                , Cmd.none
                                )

                            else
                                let
                                    nextQi = qi + 1
                                    quests = Curriculum.questsFor state.unit
                                in
                                if nextQi >= List.length quests then
                                    startBoss state.unit model
                                else
                                    startQuest state.unit nextQi model

                        BossMode ->
                            ( model, Cmd.none )

                _ ->
                    ( model, Cmd.none )

        NextTutorialStep ->
            case model.screen of
                BattleScreen state ->
                    case state.phase of
                        ShowTutorial prob stepsShown ->
                            ( { model | screen = BattleScreen { state | phase = ShowTutorial prob (stepsShown + 1) } }
                            , Cmd.none
                            )

                        _ ->
                            ( model, Cmd.none )

                _ ->
                    ( model, Cmd.none )

        DismissTutorial ->
            case model.screen of
                BattleScreen state ->
                    let
                        qi =
                            case state.mode of
                                QuestMode i -> i
                                BossMode -> -1

                        ( nextProblem, newSeed ) =
                            Random.step (Problem.generatorFor state.unit qi state.correctInQuest) model.seed
                    in
                    ( { model
                        | screen =
                            BattleScreen
                                { state
                                    | problem = nextProblem
                                    , input = Battle.defaultInput nextProblem.inputType
                                    , phase = Idle
                                }
                        , seed = newSeed
                      }
                    , focusFirstInput ()
                    )

                _ ->
                    ( model, Cmd.none )

        BackToMap ->
            case model.screen of
                BattleScreen state ->
                    if state.phase == BattleWon then
                        let
                            nextUid = Curriculum.nextUnit state.unit

                            newHighest =
                                case nextUid of
                                    Just nuid ->
                                        if compareUnits nuid model.highestUnlocked == GT then
                                            nuid
                                        else
                                            model.highestUnlocked

                                    Nothing ->
                                        model.highestUnlocked

                            victoryCode =
                                Maybe.withDefault "shard peak fire arch"
                                    (Passcode.codeForUnit state.unit)

                            vs =
                                { unit = state.unit
                                , code = victoryCode
                                , isLast = nextUid == Nothing
                                }
                        in
                        ( { model | screen = VictoryScreen vs, highestUnlocked = newHighest }
                        , Cmd.none
                        )

                    else if state.practice then
                        ( { model | screen = ChapterScreen state.unit }, Cmd.none )

                    else
                        ( { model | screen = MapScreen { course = state.unit.course } }, Cmd.none )

                ChapterScreen uid ->
                    ( { model | screen = MapScreen { course = uid.course } }, Cmd.none )

                VictoryScreen vs ->
                    ( { model | screen = MapScreen { course = vs.unit.course } }, Cmd.none )

                _ ->
                    ( model, Cmd.none )

        RetryUnit ->
            case model.screen of
                BattleScreen state ->
                    startQuest state.unit 0 model

                GameOverScreen uid ->
                    startQuest uid 0 model

                _ ->
                    ( model, Cmd.none )


handleAnswer : BattleState -> Model -> ( Model, Cmd Msg )
handleAnswer state model =
    let
        isCorrect = Battle.checkAnswer state.input state.problem.answer
    in
    case state.mode of
        QuestMode qi ->
            handleQuestAnswer qi isCorrect state model

        BossMode ->
            handleBossAnswer isCorrect state model


handleQuestAnswer : Int -> Bool -> BattleState -> Model -> ( Model, Cmd Msg )
handleQuestAnswer qi isCorrect state model =
    let
        quests = Curriculum.questsFor state.unit

        minCorrect =
            quests
                |> List.drop qi
                |> List.head
                |> Maybe.map .minCorrect
                |> Maybe.withDefault 3

        newCorrect =
            if isCorrect then state.correctInQuest + 1 else state.correctInQuest

        newStreak =
            if isCorrect then state.streak + 1 else 0

        questDone =
            isCorrect && newCorrect >= minCorrect
    in
    if isCorrect then
        let
            ( nextProblem, newSeed ) =
                Random.step (Problem.generatorFor state.unit qi newCorrect) model.seed

            newState =
                { state
                    | streak = newStreak
                    , correctInQuest = newCorrect
                    , problemsDone = state.problemsDone + 1
                    , problem = nextProblem
                    , input = Battle.defaultInput nextProblem.inputType
                    , phase = if questDone then QuestComplete else ShowResult CorrectHit
                }
        in
        ( { model | screen = BattleScreen newState, seed = newSeed }
        , if questDone then Cmd.none else flashCmd
        )
    else
        -- Wrong answer: show the ACTUAL failed problem's hint walkthrough
        let
            newState =
                { state
                    | streak = 0
                    , problemsDone = state.problemsDone + 1
                    , phase = ShowTutorial state.problem 0
                }
        in
        ( { model | screen = BattleScreen newState }, Cmd.none )


handleBossAnswer : Bool -> BattleState -> Model -> ( Model, Cmd Msg )
handleBossAnswer isCorrect state model =
    if isCorrect then
        let
            damage = Config.applyMultiplier state.streak Config.baseDamage
            newBossHp = max 0 (state.bossHp - damage)
            newStreak = state.streak + 1
            newDone = state.problemsDone + 1
            wonBattle = newBossHp == 0 && newDone >= Config.minProblems
        in
        if wonBattle then
            ( { model
                | screen =
                    BattleScreen
                        { state
                            | bossHp = newBossHp
                            , streak = newStreak
                            , problemsDone = newDone
                            , phase = BattleWon
                        }
              }
            , Cmd.none
            )
        else
            let
                ( nextProblem, newSeed ) =
                    Random.step (Problem.generatorFor state.unit -1 newDone) model.seed
            in
            ( { model
                | screen =
                    BattleScreen
                        { state
                            | bossHp = newBossHp
                            , streak = newStreak
                            , problemsDone = newDone
                            , problem = nextProblem
                            , input = Battle.defaultInput nextProblem.inputType
                            , phase = ShowResult CorrectHit
                        }
                , seed = newSeed
              }
            , flashCmd
            )

    else
        let
            newHp = max 0 (state.playerHp - Config.bossCounterDamage)
            lostBattle = newHp == 0
        in
        if lostBattle then
            ( { model
                | screen =
                    BattleScreen { state | playerHp = newHp, streak = 0, phase = BattleLost }
              }
            , Cmd.none
            )
        else
            let
                newDoneWrong = state.problemsDone + 1

                ( nextProblem, newSeed ) =
                    Random.step (Problem.generatorFor state.unit -1 newDoneWrong) model.seed
            in
            ( { model
                | screen =
                    BattleScreen
                        { state
                            | playerHp = newHp
                            , streak = 0
                            , problemsDone = newDoneWrong
                            , problem = nextProblem
                            , input = Battle.defaultInput nextProblem.inputType
                            , phase = ShowResult WrongHit
                        }
                , seed = newSeed
              }
            , flashCmd
            )


startQuest : UnitId -> Int -> Model -> ( Model, Cmd Msg )
startQuest uid questIndex model =
    let
        ( problem, newSeed ) =
            Random.step (Problem.generatorFor uid questIndex 0) model.seed
    in
    ( { model
        | screen = BattleScreen (Battle.initialQuestState uid questIndex problem)
        , seed = newSeed
      }
    , Cmd.none
    )


startBoss : UnitId -> Model -> ( Model, Cmd Msg )
startBoss uid model =
    let
        ( problem, newSeed ) =
            Random.step (Problem.generatorFor uid -1 0) model.seed
    in
    ( { model
        | screen = BattleScreen (Battle.initialBattleState uid problem)
        , seed = newSeed
      }
    , focusFirstInput ()
    )


flashCmd : Cmd Msg
flashCmd =
    Task.perform (always FlashDone) (Process.sleep Config.flashDurationMs)


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ case model.screen of
            BattleScreen _ ->
                Time.every Config.animIntervalMs (\_ -> AnimTick)

            _ ->
                Sub.none
        , Browser.Events.onKeyDown (enterDecoder model)
        ]


enterDecoder : Model -> Decode.Decoder Msg
enterDecoder model =
    Decode.field "key" Decode.string
        |> Decode.andThen
            (\key ->
                if key /= "Enter" then
                    Decode.fail "not enter"

                else
                    case model.screen of
                        BattleScreen state ->
                            case state.phase of
                                QuestComplete ->
                                    Decode.succeed NextQuest

                                QuestIntro ->
                                    Decode.succeed BeginQuest

                                BattleWon ->
                                    Decode.succeed BackToMap

                                BattleLost ->
                                    Decode.succeed RetryUnit

                                _ ->
                                    Decode.fail "input phase"

                        VictoryScreen _ ->
                            Decode.succeed BackToMap

                        GameOverScreen _ ->
                            Decode.succeed RetryUnit

                        _ ->
                            Decode.fail "no enter action"
            )


view : Model -> Html Msg
view model =
    div
        [ style "width" (String.fromInt T.canvasW ++ "px")
        , style "height" (String.fromInt T.canvasH ++ "px")
        , style "max-width" "100vw"
        , style "max-height" "100svh"
        , style "margin" "0 auto"
        , style "overflow" "hidden"
        , style "position" "relative"
        , style "background" T.bgBlack
        , style "font-family" T.fontFamily
        ]
        [ case model.screen of
            TitleScreen ->
                TitleView.viewTitle

            NameEntryScreen { draft } ->
                TitleView.viewNameEntry draft

            PasscodeScreen { draft, error } ->
                TitleView.viewPasscode draft error

            MapScreen { course } ->
                MapView.viewMap model.playerName course model.highestUnlocked

            ChapterScreen uid ->
                ChapterView.viewChapter uid (Curriculum.questsFor uid)

            BattleScreen state ->
                BattleView.viewBattle model.playerName state

            HelpScreen helpState battleState ->
                HelpView.viewHelp helpState battleState

            VictoryScreen vs ->
                VictoryView.viewVictory model.playerName vs

            GameOverScreen uid ->
                VictoryView.viewGameOver model.playerName uid
        , if model.confirmingExit then
            confirmExitOverlay model.playerName
          else
            Html.text ""
        ]


confirmExitOverlay : String -> Html Msg
confirmExitOverlay playerName =
    div
        [ style "position" "absolute"
        , style "inset" "0"
        , style "background" "rgba(0,0,0,0.92)"
        , style "display" "flex"
        , style "flex-direction" "column"
        , style "align-items" "center"
        , style "justify-content" "center"
        , style "padding" "24px"
        , style "gap" "16px"
        , style "z-index" "1000"
        ]
        [ div
            [ style "font-family" T.fontFamily
            , style "font-size" (String.fromInt T.fontSizeLarge ++ "px")
            , style "color" T.gold
            , style "text-align" "center"
            , style "letter-spacing" "1px"
            ]
            [ Html.text ("Abandon your quest, " ++ playerName ++ "?") ]
        , div
            [ style "font-family" T.fontFamily
            , style "font-size" (String.fromInt T.fontSizeSmall ++ "px")
            , style "color" T.cream
            , style "text-align" "center"
            , style "line-height" "1.7"
            , style "max-width" "260px"
            ]
            [ Html.text "Finish a chapter first to earn your passcode — you'll need it to pick up where you left off!" ]
        , div
            [ style "display" "flex"
            , style "gap" "12px"
            , style "margin-top" "8px"
            ]
            [ Html.button
                [ style "background" T.bgDark
                , style "color" T.cream
                , style "font-family" T.fontFamily
                , style "font-size" (String.fromInt T.fontSizeNormal ++ "px")
                , style "border" ("2px solid " ++ T.cream)
                , style "padding" "10px 20px"
                , style "cursor" "pointer"
                , style "letter-spacing" "1px"
                , onClick CancelExit
                ]
                [ Html.text "STAY" ]
            , Html.button
                [ style "background" T.bgDark
                , style "color" T.hpLow
                , style "font-family" T.fontFamily
                , style "font-size" (String.fromInt T.fontSizeNormal ++ "px")
                , style "border" ("2px solid " ++ T.hpLow)
                , style "padding" "10px 20px"
                , style "cursor" "pointer"
                , style "letter-spacing" "1px"
                , onClick GoToTitle
                ]
                [ Html.text "YES, EXIT" ]
            ]
        ]


compareUnits : UnitId -> UnitId -> Order
compareUnits a b =
    let
        courseRank c =
            case c of
                Course1 -> 0
                Course2 -> 1
                PreAlgebra -> 2
                Algebra1 -> 3

        slotRank s =
            case s of
                Unit n -> n
                MegaBoss -> 99
    in
    case compare (courseRank a.course) (courseRank b.course) of
        EQ ->
            compare (slotRank a.unit) (slotRank b.unit)

        other ->
            other
