module View.Help exposing (viewHelp)

import Html exposing (Html, button, div, p, text)
import Html.Attributes exposing (style)
import Html.Events exposing (onClick)
import Types exposing (BattleState, HelpState, Msg(..))
import View.Theme as T
import View.Window as W


viewHelp : HelpState -> BattleState -> Html Msg
viewHelp helpState battleState =
    div
        [ style "background" T.bgBlack
        , style "display" "flex"
        , style "flex-direction" "column"
        , style "height" "100%"
        , style "padding" "16px"
        , style "gap" "16px"
        ]
        [ header
        , hintSection helpState
        , stepSection helpState
        , buttons helpState
        ]


header : Html Msg
header =
    div
        [ style "font-family" T.fontFamily
        , style "font-size" (String.fromInt T.fontSizeLarge ++ "px")
        , style "color" T.gold
        , style "text-align" "center"
        , style "letter-spacing" "2px"
        ]
        [ text "THE TOME SPEAKS..." ]


hintSection : HelpState -> Html Msg
hintSection helpState =
    W.windowTitle "SIMILAR PROBLEM"
        [ p
            [ style "font-family" T.fontFamily
            , style "font-size" (String.fromInt T.fontSizeNormal ++ "px")
            , style "color" T.cream
            , style "line-height" "1.8"
            , style "white-space" "pre-wrap"
            ]
            [ text helpState.hint.prompt ]
        , p
            [ style "font-family" T.fontFamily
            , style "font-size" (String.fromInt T.fontSizeNormal ++ "px")
            , style "color" T.gold
            , style "margin-top" "8px"
            ]
            [ text ("Answer: " ++ helpState.hint.answer) ]
        ]


stepSection : HelpState -> Html Msg
stepSection helpState =
    let
        visibleSteps =
            List.take helpState.stepShown helpState.hint.steps
    in
    W.windowTitle "STEP BY STEP"
        [ div
            [ style "display" "flex"
            , style "flex-direction" "column"
            , style "gap" "8px"
            ]
            (List.indexedMap
                (\i step ->
                    div
                        [ style "display" "flex"
                        , style "gap" "8px"
                        , style "align-items" "flex-start"
                        ]
                        [ div
                            [ style "font-family" T.fontFamily
                            , style "font-size" (String.fromInt T.fontSizeSmall ++ "px")
                            , style "color" T.gold
                            , style "min-width" "20px"
                            ]
                            [ text (String.fromInt (i + 1) ++ ".") ]
                        , p
                            [ style "font-family" T.fontFamily
                            , style "font-size" (String.fromInt T.fontSizeSmall ++ "px")
                            , style "color" T.cream
                            , style "line-height" "1.7"
                            , style "white-space" "pre-wrap"
                            ]
                            [ text step ]
                        ]
                )
                visibleSteps
            )
        ]


buttons : HelpState -> Html Msg
buttons helpState =
    let
        allShown =
            helpState.stepShown >= List.length helpState.hint.steps
    in
    div
        [ style "display" "flex"
        , style "justify-content" "space-between"
        , style "align-items" "center"
        ]
        [ div [ style "display" "flex", style "gap" "8px" ]
            [ if not allShown then
                button
                    [ onClick NextHelpStep
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
            , button
                [ onClick ExitHelp
                , style "background" T.bgDark
                , style "color" T.cream
                , style "font-family" T.fontFamily
                , style "font-size" (String.fromInt T.fontSizeNormal ++ "px")
                , style "border" ("2px solid " ++ T.cream)
                , style "padding" "10px 20px"
                , style "cursor" "pointer"
                ]
                [ text "BACK TO BATTLE" ]
            ]
        , button
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
        ]
