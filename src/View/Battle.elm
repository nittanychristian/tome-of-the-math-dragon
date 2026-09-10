module View.Battle exposing (viewBattle)

import Config
import Game.Curriculum as Curriculum
import Html exposing (Html, button, div, p, span, text)
import Html.Attributes exposing (style)
import Html.Events exposing (onClick)
import Sprite.Lookup as Sprite
import Sprite.Renderer exposing (renderSprite)
import Svg exposing (svg)
import Svg.Attributes as SA
import Types exposing (AnswerInput(..), BattleMode(..), BattlePhase(..), BattleState, BossSprite, CorrectAnswer(..), HintData, HitOutcome(..), InequalityDir(..), InputType(..), Msg(..), Problem, UnitSlot(..))
import View.HpBar exposing (hpBar)
import View.Input exposing (viewChoiceInput, viewInput)
import View.Math exposing (renderMath)
import View.Theme as T
import View.Window as W


viewBattle : String -> BattleState -> Html Msg
viewBattle playerName state =
    case state.phase of
        QuestIntro ->
            viewQuestIntro state

        ShowTutorial prob stepsShown ->
            viewTutorial prob stepsShown

        QuestComplete ->
            viewQuestComplete state

        BattleWon ->
            viewBossVictory playerName state

        BattleLost ->
            viewBossDefeat playerName state

        _ ->
            viewFightScreen playerName state


viewFightScreen : String -> BattleState -> Html Msg
viewFightScreen playerName state =
    let
        sprite =
            case state.mode of
                BossMode ->
                    Sprite.spriteFor state.unit

                QuestMode _ ->
                    Sprite.questSpriteFor state.unit
        spriteW = sprite.pixelSize * 20
        spriteH = sprite.pixelSize * 24

        flashOverlay =
            case state.phase of
                ShowResult CorrectHit ->
                    [ div [ style "position" "absolute", style "inset" "0"
                          , style "background" "rgba(255,255,255,0.15)"
                          , style "pointer-events" "none" ] [] ]
                ShowResult WrongHit ->
                    [ div [ style "position" "absolute", style "inset" "0"
                          , style "background" "rgba(204,34,0,0.15)"
                          , style "pointer-events" "none" ] [] ]
                _ -> []
    in
    div
        [ style "background" T.bgBlack
        , style "display" "flex"
        , style "flex-direction" "column"
        , style "height" "100%"
        , style "position" "relative"
        ]
        (flashOverlay
            ++ [ questHeader state
               , enemyArea sprite spriteW spriteH state
               , playerStatusBar playerName state
               , problemArea state
               ]
        )


questHeader : BattleState -> Html Msg
questHeader state =
    let
        chapterLabel =
            case state.unit.unit of
                Unit n ->
                    "Ch." ++ String.fromInt n

                MegaBoss ->
                    "MEGA"

        practiceTag =
            if state.practice then " [PRACTICE]" else ""

        ( label, color ) =
            case state.mode of
                BossMode ->
                    ( "BOSS BATTLE", T.gold )

                QuestMode qi ->
                    let
                        quests = Curriculum.questsFor state.unit
                        total = List.length quests
                        questName =
                            quests
                                |> List.drop qi
                                |> List.head
                                |> Maybe.map .name
                                |> Maybe.withDefault "Quest"
                    in
                    ( "Quest " ++ String.fromInt (qi + 1) ++ "/" ++ String.fromInt total
                        ++ " — " ++ questName ++ practiceTag
                    , T.cream
                    )
    in
    div
        [ style "background" T.bgDark
        , style "border-bottom" ("1px solid " ++ T.cream)
        , style "padding" "6px 12px"
        , style "font-family" T.fontFamily
        , style "font-size" (String.fromInt T.fontSizeSmall ++ "px")
        , style "color" color
        , style "letter-spacing" "1px"
        ]
        [ text (chapterLabel ++ " | " ++ label) ]


enemyArea : BossSprite -> Int -> Int -> BattleState -> Html Msg
enemyArea sprite spriteW spriteH state =
    let
        ( enemyName, showHp ) =
            case state.mode of
                BossMode ->
                    ( Curriculum.bossName state.unit, True )

                QuestMode qi ->
                    let
                        quests = Curriculum.questsFor state.unit
                        qName =
                            quests |> List.drop qi |> List.head
                                |> Maybe.map .name
                                |> Maybe.withDefault "Challenge"
                        minCorrect =
                            quests |> List.drop qi |> List.head
                                |> Maybe.map .minCorrect
                                |> Maybe.withDefault 3
                    in
                    ( qName ++ " (" ++ String.fromInt state.correctInQuest ++ "/" ++ String.fromInt minCorrect ++ " correct)"
                    , False
                    )
    in
    div
        [ style "background" T.bgDark
        , style "display" "flex"
        , style "flex-direction" "column"
        , style "align-items" "center"
        , style "padding" "8px"
        , style "gap" "6px"
        ]
        ([ div
            [ style "font-family" T.fontFamily
            , style "font-size" (String.fromInt T.fontSizeSmall ++ "px")
            , style "color" T.gold
            , style "letter-spacing" "1px"
            , style "text-align" "center"
            ]
            [ text enemyName ]
         ]
            ++ (if showHp then [ hpBar "HP" state.bossHp state.bossMaxHp ] else [])
            ++ [ svg
                    [ SA.width (String.fromInt spriteW)
                    , SA.height (String.fromInt spriteH)
                    , SA.viewBox ("0 0 " ++ String.fromInt spriteW ++ " " ++ String.fromInt spriteH)
                    ]
                    (renderSprite sprite state.animFrame)
               ]
        )


playerStatusBar : String -> BattleState -> Html Msg
playerStatusBar playerName state =
    let
        isBoss = state.mode == BossMode
    in
    div
        [ style "padding" "6px 12px"
        , style "display" "flex"
        , style "justify-content" "space-between"
        , style "align-items" "center"
        , style "border-bottom" ("1px solid " ++ T.cream)
        ]
        [ div []
            [ div
                [ style "font-family" T.fontFamily
                , style "font-size" (String.fromInt T.fontSizeSmall ++ "px")
                , style "color" T.cream
                , style "margin-bottom" "2px"
                ]
                [ text playerName ]
            , if isBoss then
                hpBar "HP" state.playerHp Config.playerMaxHp
              else
                text ""
            ]
        , div [ style "text-align" "right" ]
            [ div
                [ style "font-family" T.fontFamily
                , style "font-size" (String.fromInt T.fontSizeSmall ++ "px")
                , style "color" T.streakGem
                ]
                [ text ("STREAK " ++ String.fromInt state.streak) ]
            , if isBoss then
                div
                    [ style "font-family" T.fontFamily
                    , style "font-size" (String.fromInt T.fontSizeSmall ++ "px")
                    , style "color" T.gold
                    ]
                    [ text ("ATK " ++ Config.multiplierLabel state.streak) ]
              else
                text ""
            ]
        ]


problemArea : BattleState -> Html Msg
problemArea state =
    div
        [ style "flex" "1"
        , style "overflow-y" "auto"
        , style "padding" "10px 12px"
        , style "display" "flex"
        , style "flex-direction" "column"
        , style "gap" "8px"
        ]
        [ W.windowTitle "QUESTION"
            [ p
                [ style "font-family" T.fontFamily
                , style "font-size" (String.fromInt T.fontSizeLarge ++ "px")
                , style "color" T.cream
                , style "line-height" "2"
                , style "white-space" "pre-wrap"
                , style "word-break" "break-word"
                ]
                [ renderMath state.problem.prompt ]
            ]
        , case state.problem.inputType of
            TChoice choices ->
                case state.input of
                    IChoice selected -> viewChoiceInput choices selected
                    _ -> text ""
            _ ->
                viewInput state.input
        , resultMessage state
        , actionButtons state
        ]


resultMessage : BattleState -> Html Msg
resultMessage state =
    case state.phase of
        ShowResult CorrectHit ->
            div [ style "font-family" T.fontFamily
                , style "font-size" (String.fromInt T.fontSizeNormal ++ "px")
                , style "color" T.hpGreen
                ]
                [ text
                    (case state.mode of
                        BossMode -> "CORRECT! -" ++ String.fromInt (Config.applyMultiplier state.streak Config.baseDamage) ++ " to boss!"
                        QuestMode _ -> "CORRECT!"
                    )
                ]

        ShowResult WrongHit ->
            div [ style "font-family" T.fontFamily
                , style "font-size" (String.fromInt T.fontSizeNormal ++ "px")
                , style "color" T.hpLow
                ]
                [ text
                    (case state.mode of
                        BossMode -> "WRONG! -" ++ String.fromInt Config.bossCounterDamage ++ " HP!"
                        QuestMode _ -> "Not quite — try the next one!"
                    )
                ]

        _ ->
            text ""


actionButtons : BattleState -> Html Msg
actionButtons state =
    case state.phase of
        Idle ->
            div [ style "display" "flex", style "justify-content" "space-between", style "align-items" "center" ]
                [ div [ style "display" "flex", style "gap" "8px" ]
                    [ button (primaryBtnAttrs ++ [ onClick SubmitAnswer ]) [ text "ATTACK!" ]
                    , button
                        [ onClick AskForHelp
                        , style "background" T.bgDark
                        , style "color" T.streakGem
                        , style "font-family" T.fontFamily
                        , style "font-size" (String.fromInt T.fontSizeSmall ++ "px")
                        , style "border" ("2px solid " ++ T.streakGem)
                        , style "padding" "10px 14px"
                        , style "cursor" "pointer"
                        ]
                        [ text "ASK THE TOME" ]
                    ]
                , button
                    [ onClick BackToMap
                    , style "background" T.bgBlack
                    , style "color" T.cream
                    , style "font-family" T.fontFamily
                    , style "font-size" (String.fromInt T.fontSizeSmall ++ "px")
                    , style "border" ("1px solid " ++ T.cream)
                    , style "padding" "8px 14px"
                    , style "cursor" "pointer"
                    , style "letter-spacing" "1px"
                    ]
                    [ text "← MAP" ]
                ]

        ShowResult _ ->
            text ""

        QuestIntro ->
            text ""

        ShowTutorial _ _ ->
            text ""

        QuestComplete ->
            text ""

        BattleWon ->
            text ""

        BattleLost ->
            text ""


formatAnswer : Problem -> String
formatAnswer problem =
    case ( problem.inputType, problem.answer ) of
        ( TChoice choices, AChoice idx ) ->
            List.drop idx choices |> List.head |> Maybe.withDefault "?"

        ( _, AInt n ) ->
            String.fromInt n

        ( _, AFloat v _ ) ->
            String.fromFloat v

        ( _, AFraction n d ) ->
            String.fromInt n ++ "/" ++ String.fromInt d

        ( _, AInequality dir v ) ->
            let
                dirStr =
                    case dir of
                        ILt -> "x < "
                        ILte -> "x ≤ "
                        IGt -> "x > "
                        IGte -> "x ≥ "
            in
            dirStr ++ String.fromFloat v

        ( _, ASystem x y ) ->
            "x = " ++ String.fromFloat x ++ ", y = " ++ String.fromFloat y

        ( _, ARoots r1 r2 ) ->
            String.fromFloat r1 ++ " and " ++ String.fromFloat r2

        _ ->
            "?"


viewTutorial : Problem -> Int -> Html Msg
viewTutorial problem stepsShown =
    let
        hint = problem.hint
        visibleSteps = List.take stepsShown hint.steps
        allShown = stepsShown >= List.length hint.steps
    in
    div
        [ style "background" T.bgBlack
        , style "display" "flex"
        , style "flex-direction" "column"
        , style "height" "100%"
        , style "padding" "16px"
        , style "gap" "10px"
        , style "overflow-y" "auto"
        ]
        [ div
            [ style "font-family" T.fontFamily
            , style "font-size" "11px"
            , style "color" T.hpLow
            , style "text-align" "center"
            ]
            [ text "NOT QUITE — HERE'S HOW" ]
        , W.windowTitle "THE PROBLEM"
            [ p [ style "font-family" T.fontFamily
                , style "font-size" (String.fromInt T.fontSizeLarge ++ "px")
                , style "color" T.cream
                , style "line-height" "2"
                , style "word-break" "break-word"
                ]
                [ renderMath problem.prompt ]
            , p [ style "font-family" T.fontFamily
                , style "font-size" (String.fromInt T.fontSizeNormal ++ "px")
                , style "color" T.gold
                , style "margin-top" "6px"
                ]
                [ text ("Answer: " ++ formatAnswer problem) ]
            ]
        , W.windowTitle "STEP BY STEP"
            [ div [ style "display" "flex", style "flex-direction" "column", style "gap" "8px" ]
                (List.indexedMap
                    (\i step ->
                        div [ style "display" "flex", style "gap" "8px", style "align-items" "flex-start" ]
                            [ span
                                [ style "font-family" T.fontFamily
                                , style "font-size" (String.fromInt T.fontSizeSmall ++ "px")
                                , style "color" T.gold
                                , style "min-width" "18px"
                                ]
                                [ text (String.fromInt (i + 1) ++ ".") ]
                            , p
                                [ style "font-family" T.fontFamily
                                , style "font-size" (String.fromInt T.fontSizeSmall ++ "px")
                                , style "color" T.cream
                                , style "line-height" "1.7"
                                ]
                                [ renderMath step ]
                            ]
                    )
                    visibleSteps
                )
            ]
        , div [ style "display" "flex", style "justify-content" "space-between", style "align-items" "center" ]
            [ div [ style "display" "flex", style "gap" "8px" ]
                [ if not allShown then
                    button
                        [ onClick NextTutorialStep
                        , style "background" T.bgDark
                        , style "color" T.gold
                        , style "font-family" T.fontFamily
                        , style "font-size" (String.fromInt T.fontSizeNormal ++ "px")
                        , style "border" ("3px double " ++ T.cream)
                        , style "padding" "10px 20px"
                        , style "cursor" "pointer"
                        ]
                        [ text "NEXT STEP" ]
                  else
                    text ""
                , if allShown then
                    button (primaryBtnAttrs ++ [ onClick DismissTutorial ])
                        [ text "GOT IT — NEXT PROBLEM" ]
                  else
                    text ""
                ]
            , exitBtn
            ]
        ]


viewQuestIntro : BattleState -> Html Msg
viewQuestIntro state =
    let
        qi =
            case state.mode of
                QuestMode i -> i
                BossMode -> 0

        quests = Curriculum.questsFor state.unit
        quest = quests |> List.drop qi |> List.head
        questName = quest |> Maybe.map .name |> Maybe.withDefault "Quest"
        story = quest |> Maybe.map .story |> Maybe.withDefault ""
        total = List.length quests
    in
    div
        [ style "background" T.bgBlack
        , style "display" "flex"
        , style "flex-direction" "column"
        , style "height" "100%"
        , style "padding" "20px"
        , style "gap" "16px"
        ]
        [ div
            [ style "font-family" T.fontFamily
            , style "font-size" (String.fromInt T.fontSizeSmall ++ "px")
            , style "color" T.cream
            , style "letter-spacing" "1px"
            ]
            [ text ("QUEST " ++ String.fromInt (qi + 1) ++ " OF " ++ String.fromInt total) ]
        , div
            [ style "font-family" T.fontFamily
            , style "font-size" "18px"
            , style "color" T.gold
            , style "text-shadow" ("0 0 6px " ++ T.gold)
            ]
            [ text questName ]
        , W.windowTitle "MISSION"
            [ p
                [ style "font-family" T.fontFamily
                , style "font-size" (String.fromInt T.fontSizeNormal ++ "px")
                , style "color" T.cream
                , style "line-height" "1.8"
                ]
                [ text story ]
            ]
        , div [ style "display" "flex", style "justify-content" "space-between", style "align-items" "center" ]
            [ button (primaryBtnAttrs ++ [ onClick BeginQuest ]) [ text "BEGIN QUEST" ]
            , exitBtn
            ]
        ]


viewQuestComplete : BattleState -> Html Msg
viewQuestComplete state =
    if state.practice then
        viewPracticeComplete state
    else
        viewNormalQuestComplete state


viewNormalQuestComplete : BattleState -> Html Msg
viewNormalQuestComplete state =
    let
        qi =
            case state.mode of
                QuestMode i -> i
                BossMode -> 0

        quests = Curriculum.questsFor state.unit
        total = List.length quests
        nextQi = qi + 1
        isLast = nextQi >= total

        nextLabel =
            if isLast then
                "FACE THE BOSS"
            else
                quests |> List.drop nextQi |> List.head
                    |> Maybe.map (\q -> "NEXT: " ++ q.name)
                    |> Maybe.withDefault "CONTINUE"
    in
    div
        [ style "background" T.bgBlack
        , style "display" "flex"
        , style "flex-direction" "column"
        , style "height" "100%"
        , style "align-items" "center"
        , style "justify-content" "center"
        , style "padding" "20px"
        , style "gap" "16px"
        ]
        [ div
            [ style "font-family" T.fontFamily
            , style "font-size" "24px"
            , style "color" T.gold
            , style "text-align" "center"
            , style "text-shadow" ("0 0 8px " ++ T.gold)
            ]
            [ text "QUEST COMPLETE!" ]
        , div
            [ style "font-family" T.fontFamily
            , style "font-size" (String.fromInt T.fontSizeSmall ++ "px")
            , style "color" T.cream
            , style "text-align" "center"
            , style "letter-spacing" "1px"
            ]
            [ text (String.fromInt (qi + 1) ++ " of " ++ String.fromInt total ++ " quests cleared") ]
        , div [ style "display" "flex", style "justify-content" "space-between", style "align-items" "center", style "width" "100%" ]
            [ button (primaryBtnAttrs ++ [ onClick NextQuest ]) [ text nextLabel ]
            , exitBtn
            ]
        ]


viewPracticeComplete : BattleState -> Html Msg
viewPracticeComplete state =
    let
        qi =
            case state.mode of
                QuestMode i -> i
                BossMode -> 0

        quests = Curriculum.questsFor state.unit
        questName =
            quests |> List.drop qi |> List.head |> Maybe.map .name |> Maybe.withDefault "Quest"
    in
    div
        [ style "background" T.bgBlack
        , style "display" "flex"
        , style "flex-direction" "column"
        , style "height" "100%"
        , style "align-items" "center"
        , style "justify-content" "center"
        , style "padding" "24px"
        , style "gap" "20px"
        ]
        [ div
            [ style "font-family" T.fontFamily
            , style "font-size" "18px"
            , style "color" T.gold
            , style "text-align" "center"
            , style "text-shadow" ("0 0 6px " ++ T.gold)
            ]
            [ text "QUEST COMPLETE!" ]
        , div
            [ style "font-family" T.fontFamily
            , style "font-size" (String.fromInt T.fontSizeSmall ++ "px")
            , style "color" T.cream
            , style "text-align" "center"
            ]
            [ text questName ]
        , button (primaryBtnAttrs ++ [ onClick NextQuest ])
            [ text "PRACTICE AGAIN" ]
        , div [ style "display" "flex", style "justify-content" "space-between", style "align-items" "center" ]
            [ button
                [ onClick BackToMap
                , style "background" T.bgBlack
                , style "color" T.cream
                , style "font-family" T.fontFamily
                , style "font-size" (String.fromInt T.fontSizeSmall ++ "px")
                , style "border" ("2px solid " ++ T.cream)
                , style "padding" "8px 14px"
                , style "cursor" "pointer"
                , style "letter-spacing" "1px"
                ]
                [ text "← BACK TO CHAPTER" ]
            , exitBtn
            ]
        ]


viewBossVictory : String -> BattleState -> Html Msg
viewBossVictory playerName state =
    div
        [ style "background" T.bgBlack
        , style "display" "flex"
        , style "flex-direction" "column"
        , style "height" "100%"
        , style "align-items" "center"
        , style "justify-content" "center"
        , style "padding" "24px"
        , style "gap" "20px"
        ]
        [ div
            [ style "font-family" T.fontFamily
            , style "font-size" "20px"
            , style "color" T.gold
            , style "text-shadow" ("0 0 8px " ++ T.gold)
            ]
            [ text "VICTORY!" ]
        , W.windowTitle (Curriculum.bossName state.unit ++ " DEFEATED")
            [ p [ style "font-family" T.fontFamily
                , style "font-size" (String.fromInt T.fontSizeSmall ++ "px")
                , style "color" T.cream
                , style "line-height" "1.8"
                ]
                [ text (playerName ++ " has proven their mastery of " ++ Curriculum.unitName state.unit ++ "!") ]
            ]
        , div [ style "display" "flex", style "justify-content" "space-between", style "align-items" "center" ]
            [ button (primaryBtnAttrs ++ [ onClick BackToMap ]) [ text "CONTINUE" ]
            , exitBtn
            ]
        ]


viewBossDefeat : String -> BattleState -> Html Msg
viewBossDefeat _ state =
    div
        [ style "background" T.bgBlack
        , style "display" "flex"
        , style "flex-direction" "column"
        , style "height" "100%"
        , style "align-items" "center"
        , style "justify-content" "center"
        , style "padding" "24px"
        , style "gap" "20px"
        ]
        [ div
            [ style "font-family" T.fontFamily
            , style "font-size" "20px"
            , style "color" T.hpLow
            ]
            [ text "DEFEATED..." ]
        , W.windowTitle (Curriculum.bossName state.unit)
            [ p [ style "font-family" T.fontFamily
                , style "font-size" (String.fromInt T.fontSizeSmall ++ "px")
                , style "color" T.cream
                , style "line-height" "1.8"
                ]
                [ text "Study hard and face the boss again!" ]
            ]
        , div [ style "display" "flex", style "justify-content" "space-between", style "align-items" "center" ]
            [ button (primaryBtnAttrs ++ [ onClick RetryUnit ]) [ text "TRY AGAIN" ]
            , exitBtn
            ]
        ]


exitBtn : Html Msg
exitBtn =
    button
        [ onClick RequestExit
        , style "background" T.bgBlack
        , style "color" T.cream
        , style "font-family" T.fontFamily
        , style "font-size" (String.fromInt T.fontSizeSmall ++ "px")
        , style "border" ("1px solid " ++ T.cream)
        , style "padding" "8px 14px"
        , style "cursor" "pointer"
        , style "letter-spacing" "1px"
        ]
        [ text "EXIT" ]


primaryBtnAttrs : List (Html.Attribute msg)
primaryBtnAttrs =
    [ style "background" T.bgDark
    , style "color" T.gold
    , style "font-family" T.fontFamily
    , style "font-size" (String.fromInt T.fontSizeNormal ++ "px")
    , style "border" ("3px double " ++ T.cream)
    , style "padding" "10px 20px"
    , style "cursor" "pointer"
    , style "letter-spacing" "1px"
    ]
