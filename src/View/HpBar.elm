module View.HpBar exposing (hpBar)

import Html exposing (Html, div, span, text)
import Html.Attributes exposing (style)
import View.Theme as T


hpBar : String -> Int -> Int -> Html msg
hpBar label current maxHp =
    let
        blocks =
            20

        filled =
            if maxHp == 0 then
                0

            else
                (current * blocks) // maxHp

        filledClamped =
            clamp 0 blocks filled

        color =
            if current * 4 <= maxHp then
                T.hpLow

            else
                T.hpGreen
    in
    div
        [ style "display" "flex"
        , style "align-items" "center"
        , style "gap" "6px"
        , style "margin-bottom" "4px"
        ]
        [ span
            [ style "font-family" T.fontFamily
            , style "font-size" (String.fromInt T.fontSizeSmall ++ "px")
            , style "color" T.cream
            , style "min-width" "36px"
            ]
            [ text label ]
        , div
            [ style "display" "flex"
            , style "gap" "1px"
            ]
            (List.range 1 blocks
                |> List.map
                    (\i ->
                        div
                            [ style "width" "10px"
                            , style "height" "10px"
                            , style "background"
                                (if i <= filledClamped then
                                    color

                                 else
                                    T.streakEmpty
                                )
                            ]
                            []
                    )
            )
        , span
            [ style "font-family" T.fontFamily
            , style "font-size" (String.fromInt T.fontSizeSmall ++ "px")
            , style "color" T.cream
            ]
            [ text (String.fromInt current ++ "/" ++ String.fromInt maxHp) ]
        ]
