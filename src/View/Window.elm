module View.Window exposing (window, windowTitle)

import Html exposing (Html, div, text)
import Html.Attributes exposing (style)
import View.Theme as T


window : List (Html msg) -> Html msg
window children =
    div
        [ style "border" ("3px double " ++ T.cream)
        , style "background" T.bgDark
        , style "padding" "12px"
        , style "position" "relative"
        ]
        [ div
            [ style "border" ("1px solid " ++ T.cream)
            , style "padding" "8px"
            ]
            children
        ]


windowTitle : String -> List (Html msg) -> Html msg
windowTitle title children =
    div
        [ style "border" ("3px double " ++ T.cream)
        , style "background" T.bgDark
        , style "padding" "12px"
        , style "position" "relative"
        ]
        [ div
            [ style "border" ("1px solid " ++ T.cream)
            , style "padding" "8px"
            ]
            (div
                [ style "color" T.gold
                , style "font-family" T.fontFamily
                , style "font-size" (String.fromInt T.fontSizeSmall ++ "px")
                , style "margin-bottom" "8px"
                , style "letter-spacing" "1px"
                ]
                [ text title ]
                :: children
            )
        ]
