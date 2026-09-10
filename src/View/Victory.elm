module View.Victory exposing (viewGameOver, viewVictory)

import Game.Curriculum as Curriculum
import Html exposing (Html, button, div, p, text)
import Html.Attributes exposing (style)
import Html.Events exposing (onClick)
import Types exposing (Msg(..), UnitId, VictoryState)
import View.Theme as T
import View.Window as W


viewVictory : String -> VictoryState -> Html Msg
viewVictory playerName vs =
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
            , style "text-align" "center"
            , style "text-shadow" ("0 0 8px " ++ T.gold)
            ]
            [ text "VICTORY!" ]
        , W.windowTitle "DEFEATED"
            [ p labelStyle [ text (Curriculum.bossName vs.unit) ]
            ]
        , if vs.isLast then
            W.windowTitle "QUEST COMPLETE"
                [ p labelStyle [ text ("Well done, " ++ playerName ++ "!") ]
                , p labelStyle [ text "You have mastered the Tome!" ]
                ]

          else
            W.windowTitle "YOUR PASSCODE"
                [ p
                    [ style "font-family" T.fontFamily
                    , style "font-size" (String.fromInt T.fontSizeSmall ++ "px")
                    , style "color" T.cream
                    , style "margin-bottom" "4px"
                    ]
                    [ text "Write this down to continue later:" ]
                , div
                    [ style "font-family" T.fontFamily
                    , style "font-size" (String.fromInt T.fontSizeNormal ++ "px")
                    , style "color" T.gold
                    , style "letter-spacing" "2px"
                    , style "line-height" "2"
                    , style "text-align" "center"
                    , style "padding" "8px"
                    , style "border" ("1px dashed " ++ T.gold)
                    ]
                    [ text vs.code ]
                ]
        , div [ style "display" "flex", style "justify-content" "space-between", style "align-items" "center", style "width" "100%" ]
            [ button
                [ onClick BackToMap
                , style "background" T.bgDark
                , style "color" T.gold
                , style "font-family" T.fontFamily
                , style "font-size" (String.fromInt T.fontSizeNormal ++ "px")
                , style "border" ("3px double " ++ T.cream)
                , style "padding" "12px 24px"
                , style "cursor" "pointer"
                , style "letter-spacing" "2px"
                ]
                [ text "CONTINUE" ]
            , exitBtn
            ]
        ]


viewGameOver : String -> UnitId -> Html Msg
viewGameOver playerName uid =
    div
        [ style "background" T.bgBlack
        , style "display" "flex"
        , style "flex-direction" "column"
        , style "height" "100%"
        , style "align-items" "center"
        , style "justify-content" "center"
        , style "padding" "24px"
        , style "gap" "24px"
        ]
        [ div
            [ style "font-family" T.fontFamily
            , style "font-size" "20px"
            , style "color" T.hpLow
            , style "text-align" "center"
            ]
            [ text "GAME OVER" ]
        , W.windowTitle "YOU FELL TO"
            [ p labelStyle [ text (Curriculum.bossName uid) ] ]
        , p
            [ style "font-family" T.fontFamily
            , style "font-size" (String.fromInt T.fontSizeSmall ++ "px")
            , style "color" T.cream
            , style "text-align" "center"
            ]
            [ text "Study hard and try again!" ]
        , div [ style "display" "flex", style "justify-content" "space-between", style "align-items" "center", style "width" "100%" ]
            [ button
                [ onClick RetryUnit
                , style "background" T.bgDark
                , style "color" T.gold
                , style "font-family" T.fontFamily
                , style "font-size" (String.fromInt T.fontSizeNormal ++ "px")
                , style "border" ("3px double " ++ T.cream)
                , style "padding" "12px 24px"
                , style "cursor" "pointer"
                ]
                [ text "TRY AGAIN" ]
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


labelStyle : List (Html.Attribute msg)
labelStyle =
    [ style "font-family" T.fontFamily
    , style "color" T.cream
    , style "font-size" (String.fromInt T.fontSizeSmall ++ "px")
    , style "line-height" "1.8"
    ]
