module View.Title exposing (viewTitle, viewNameEntry, viewPasscode)

import Html exposing (Html, br, button, div, input, p, span, text)
import Html.Attributes exposing (placeholder, style, type_, value)
import Html.Events exposing (onClick, onInput)
import Types exposing (Msg(..))
import View.Theme as T
import View.Window as W


viewTitle : Html Msg
viewTitle =
    div [ canvasStyle ]
        [ div
            [ style "display" "flex"
            , style "flex-direction" "column"
            , style "align-items" "center"
            , style "justify-content" "center"
            , style "height" "100%"
            , style "gap" "32px"
            , style "padding" "24px"
            ]
            [ titleText
            , menuButtons
            ]
        ]


titleText : Html Msg
titleText =
    div [ style "text-align" "center" ]
        [ div
            [ style "font-family" T.fontFamily
            , style "font-size" "22px"
            , style "color" T.gold
            , style "line-height" "2"
            , style "text-shadow" ("0 0 8px " ++ T.gold)
            ]
            [ text "TOME OF THE"
            , Html.br [] []
            , text "MATH DRAGON"
            ]
        , div
            [ style "font-family" T.fontFamily
            , style "font-size" (String.fromInt T.fontSizeSmall ++ "px")
            , style "color" T.cream
            , style "margin-top" "16px"
            ]
            [ text "A MATH RPG ADVENTURE" ]
        ]


menuButtons : Html Msg
menuButtons =
    div
        [ style "display" "flex"
        , style "flex-direction" "column"
        , style "gap" "16px"
        , style "width" "260px"
        ]
        [ pixelButton "NEW GAME" SubmitName
        , pixelButton "CONTINUE (PASSCODE)" (SetPasscodeDraft "")
        ]


viewNameEntry : String -> Html Msg
viewNameEntry draft =
    div [ canvasStyle ]
        [ div
            [ style "display" "flex"
            , style "flex-direction" "column"
            , style "align-items" "center"
            , style "justify-content" "center"
            , style "height" "100%"
            , style "padding" "24px"
            , style "gap" "24px"
            ]
            [ W.windowTitle "ENTER YOUR NAME"
                [ p [ labelStyle ] [ text "What is your name, hero?" ]
                , input
                    [ type_ "text"
                    , value draft
                    , onInput SetNameDraft
                    , placeholder "HERO"
                    , style "background" T.bgBlack
                    , style "color" T.cream
                    , style "font-family" T.fontFamily
                    , style "font-size" (String.fromInt T.fontSizeNormal ++ "px")
                    , style "border" ("2px solid " ++ T.cream)
                    , style "padding" "8px"
                    , style "width" "100%"
                    , style "box-sizing" "border-box"
                    , style "letter-spacing" "2px"
                    ]
                    []
                , pixelButton "BEGIN" SubmitName
                ]
            ]
        ]


viewPasscode : String -> Bool -> Html Msg
viewPasscode draft hasError =
    div [ canvasStyle ]
        [ div
            [ style "display" "flex"
            , style "flex-direction" "column"
            , style "align-items" "center"
            , style "justify-content" "center"
            , style "height" "100%"
            , style "padding" "24px"
            , style "gap" "24px"
            ]
            [ W.windowTitle "CONTINUE JOURNEY"
                [ p [ labelStyle ] [ text "Enter your 4-word passcode:" ]
                , input
                    [ type_ "text"
                    , value draft
                    , onInput SetPasscodeDraft
                    , placeholder "word word word word"
                    , style "background" T.bgBlack
                    , style "color" T.cream
                    , style "font-family" T.fontFamily
                    , style "font-size" (String.fromInt T.fontSizeNormal ++ "px")
                    , style "border" ("2px solid " ++ T.cream)
                    , style "padding" "8px"
                    , style "width" "100%"
                    , style "box-sizing" "border-box"
                    ]
                    []
                , if hasError then
                    p
                        [ style "color" T.hpLow
                        , style "font-family" T.fontFamily
                        , style "font-size" (String.fromInt T.fontSizeSmall ++ "px")
                        ]
                        [ text "Unknown passcode. Try again." ]

                  else
                    text ""
                , pixelButton "CONTINUE" SubmitPasscode
                ]
            ]
        ]


pixelButton : String -> Msg -> Html Msg
pixelButton label msg =
    button
        [ onClick msg
        , style "background" T.bgDark
        , style "color" T.gold
        , style "font-family" T.fontFamily
        , style "font-size" (String.fromInt T.fontSizeNormal ++ "px")
        , style "border" ("3px double " ++ T.cream)
        , style "padding" "10px 20px"
        , style "cursor" "pointer"
        , style "letter-spacing" "2px"
        , style "width" "100%"
        ]
        [ text label ]


labelStyle : Html.Attribute msg
labelStyle =
    style "color" T.cream


canvasStyle : Html.Attribute msg
canvasStyle =
    style "background" T.bgBlack
