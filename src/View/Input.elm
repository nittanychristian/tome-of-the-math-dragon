module View.Input exposing (onEnter, viewChoiceInput, viewInput)

import Html exposing (Html, button, div, input, span, text)
import Html.Attributes exposing (style, type_, value)
import Html.Events exposing (on, onClick, onInput)
import Json.Decode as Decode
import Types exposing (AnswerInput(..), InequalityDir(..), Msg(..))
import View.Theme as T


viewInput : AnswerInput -> Html Msg
viewInput answerInput =
    case answerInput of
        IInt s ->
            numericInput s (\v -> UpdateInput (IInt v)) "120px"

        IDecimal s ->
            numericInput s (\v -> UpdateInput (IDecimal v)) "120px"

        IFraction { num, den } ->
            fractionInput num den

        IChoice _ ->
            text ""

        IInequality { dir, val } ->
            inequalityInput dir val

        ISystem { x, y } ->
            systemInput x y

        IRoots { r1, r2 } ->
            rootsInput r1 r2


viewChoiceInput : List String -> Maybe Int -> Html Msg
viewChoiceInput choices selected =
    div
        [ style "display" "flex"
        , style "flex-direction" "column"
        , style "gap" "6px"
        ]
        (List.indexedMap
            (\i label ->
                button
                    [ onClick (UpdateInput (IChoice (Just i)))
                    , style "background"
                        (if selected == Just i then
                            T.gold

                         else
                            T.bgDark
                        )
                    , style "color"
                        (if selected == Just i then
                            T.bgBlack

                         else
                            T.cream
                        )
                    , style "font-family" T.fontFamily
                    , style "font-size" (String.fromInt T.fontSizeNormal ++ "px")
                    , style "border" ("2px solid " ++ T.cream)
                    , style "padding" "8px 12px"
                    , style "cursor" "pointer"
                    , style "text-align" "left"
                    ]
                    [ text label ]
            )
            choices
        )


onEnter : Msg -> Html.Attribute Msg
onEnter msg =
    on "keydown"
        (Decode.field "key" Decode.string
            |> Decode.andThen
                (\key ->
                    if key == "Enter" then
                        Decode.succeed msg
                    else
                        Decode.fail "not enter"
                )
        )


numericInput : String -> (String -> Msg) -> String -> Html Msg
numericInput val toMsg width =
    input
        (inputAttrs width
            ++ [ type_ "text"
               , value val
               , onInput toMsg
               , onEnter SubmitAnswer
               ]
        )
        []


fractionInput : String -> String -> Html Msg
fractionInput num den =
    div
        [ style "display" "flex"
        , style "flex-direction" "column"
        , style "align-items" "center"
        , style "gap" "2px"
        ]
        [ input
            (inputAttrs "80px"
                ++ [ type_ "text"
                   , value num
                   , onInput (\v -> UpdateInput (IFraction { num = v, den = den }))
                   , onEnter SubmitAnswer
                   , style "text-align" "center"
                   ]
            )
            []
        , div
            [ style "width" "80px"
            , style "height" "2px"
            , style "background" T.cream
            ]
            []
        , input
            (inputAttrs "80px"
                ++ [ type_ "text"
                   , value den
                   , onInput (\v -> UpdateInput (IFraction { num = num, den = v }))
                   , onEnter SubmitAnswer
                   , style "text-align" "center"
                   ]
            )
            []
        ]


inequalityInput : Maybe InequalityDir -> String -> Html Msg
inequalityInput dir val =
    div
        [ style "display" "flex"
        , style "flex-direction" "column"
        , style "gap" "8px"
        ]
        [ div
            [ style "display" "flex"
            , style "gap" "6px"
            ]
            (List.map
                (\( d, lbl ) ->
                    button
                        [ onClick (UpdateInput (IInequality { dir = Just d, val = val }))
                        , style "background"
                            (if dir == Just d then
                                T.gold

                             else
                                T.bgDark
                            )
                        , style "color"
                            (if dir == Just d then
                                T.bgBlack

                             else
                                T.cream
                            )
                        , style "font-family" T.fontFamily
                        , style "font-size" (String.fromInt T.fontSizeNormal ++ "px")
                        , style "border" ("2px solid " ++ T.cream)
                        , style "padding" "6px 10px"
                        , style "cursor" "pointer"
                        ]
                        [ text lbl ]
                )
                [ ( ILt, "<" ), ( ILte, "≤" ), ( IGt, ">" ), ( IGte, "≥" ) ]
            )
        , div
            [ style "display" "flex"
            , style "align-items" "center"
            , style "gap" "6px"
            ]
            [ span [ style "color" T.cream, style "font-family" T.fontFamily, style "font-size" "12px" ]
                [ text "x " ]
            , span [ style "color" T.gold, style "font-family" T.fontFamily, style "font-size" "14px" ]
                [ text
                    (case dir of
                        Just ILt -> "<"
                        Just ILte -> "≤"
                        Just IGt -> ">"
                        Just IGte -> "≥"
                        Nothing -> "?"
                    )
                ]
            , input
                (inputAttrs "80px"
                    ++ [ type_ "text"
                       , value val
                       , onInput (\v -> UpdateInput (IInequality { dir = dir, val = v }))
                       , onEnter SubmitAnswer
                       ]
                )
                []
            ]
        ]


systemInput : String -> String -> Html Msg
systemInput x y =
    div
        [ style "display" "flex"
        , style "flex-direction" "column"
        , style "gap" "8px"
        ]
        [ div [ style "display" "flex", style "align-items" "center", style "gap" "8px" ]
            [ span [ style "color" T.cream, style "font-family" T.fontFamily, style "font-size" "12px" ]
                [ text "x =" ]
            , input
                (inputAttrs "80px"
                    ++ [ type_ "text"
                       , value x
                       , onInput (\v -> UpdateInput (ISystem { x = v, y = y }))
                       , onEnter SubmitAnswer
                       ]
                )
                []
            ]
        , div [ style "display" "flex", style "align-items" "center", style "gap" "8px" ]
            [ span [ style "color" T.cream, style "font-family" T.fontFamily, style "font-size" "12px" ]
                [ text "y =" ]
            , input
                (inputAttrs "80px"
                    ++ [ type_ "text"
                       , value y
                       , onInput (\v -> UpdateInput (ISystem { x = x, y = v }))
                       , onEnter SubmitAnswer
                       ]
                )
                []
            ]
        ]


rootsInput : String -> String -> Html Msg
rootsInput r1 r2 =
    div
        [ style "display" "flex"
        , style "flex-direction" "column"
        , style "gap" "8px"
        ]
        [ div [ style "display" "flex", style "align-items" "center", style "gap" "8px" ]
            [ span [ style "color" T.cream, style "font-family" T.fontFamily, style "font-size" "12px" ]
                [ text "r₁ =" ]
            , input
                (inputAttrs "80px"
                    ++ [ type_ "text"
                       , value r1
                       , onInput (\v -> UpdateInput (IRoots { r1 = v, r2 = r2 }))
                       , onEnter SubmitAnswer
                       ]
                )
                []
            ]
        , div [ style "display" "flex", style "align-items" "center", style "gap" "8px" ]
            [ span [ style "color" T.cream, style "font-family" T.fontFamily, style "font-size" "12px" ]
                [ text "r₂ =" ]
            , input
                (inputAttrs "80px"
                    ++ [ type_ "text"
                       , value r2
                       , onInput (\v -> UpdateInput (IRoots { r1 = r1, r2 = v }))
                       , onEnter SubmitAnswer
                       ]
                )
                []
            ]
        ]


inputAttrs : String -> List (Html.Attribute msg)
inputAttrs width =
    [ style "background" T.bgBlack
    , style "color" T.cream
    , style "font-family" T.fontFamily
    , style "font-size" (String.fromInt T.fontSizeNormal ++ "px")
    , style "border" ("2px solid " ++ T.cream)
    , style "padding" "6px"
    , style "width" width
    , style "box-sizing" "border-box"
    ]
