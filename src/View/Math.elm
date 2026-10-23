module View.Math exposing (ArithmeticLayout, arithmeticLayout, renderMath)

import Char
import Html exposing (Html)
import Html.Attributes exposing (attribute, style)


type alias ArithmeticLayout =
    { operator : String
    , operands : List String
    }


arithmeticLayout : String -> Maybe ArithmeticLayout
arithmeticLayout raw =
    case List.reverse (String.words (String.replace "×" "x" (String.replace "÷" "/" raw))) of
        "?" :: "=" :: reversed ->
            case List.reverse reversed of
                first :: operator :: rest ->
                    let
                        collect remaining =
                            case remaining of
                                [ last ] ->
                                    Just [ last ]

                                operand :: nextOperator :: following ->
                                    if nextOperator == operator then
                                        collect following |> Maybe.map ((::) operand)

                                    else
                                        Nothing

                                _ ->
                                    Nothing

                        numeric operand =
                            String.toFloat operand
                                /= Nothing
                                && String.all (\char -> Char.isDigit char || char == '.' || char == '-') operand
                    in
                    collect rest
                        |> Maybe.map ((::) first)
                        |> Maybe.andThen
                            (\operands ->
                                if
                                    List.all numeric operands
                                        && List.any (\operand -> String.contains "." operand || (String.toFloat operand |> Maybe.map (\value -> abs value > 10) |> Maybe.withDefault False)) operands
                                        && (operator == "+" || (List.member operator [ "-", "x", "/" ] && List.length operands == 2))
                                then
                                    Just
                                        { operator = operator
                                        , operands =
                                            if List.member operator [ "+", "-" ] then
                                                alignDecimals operands

                                            else
                                                operands
                                        }

                                else
                                    Nothing
                            )

                _ ->
                    Nothing

        _ ->
            Nothing


alignDecimals : List String -> List String
alignDecimals operands =
    let
        decimals operand =
            String.split "." operand |> List.drop 1 |> List.head |> Maybe.withDefault ""

        places =
            List.map (decimals >> String.length) operands |> List.maximum |> Maybe.withDefault 0
    in
    if places == 0 then
        operands

    else
        List.map
            (\operand ->
                (String.split "." operand |> List.head |> Maybe.withDefault operand)
                    ++ "."
                    ++ String.padRight places '0' (decimals operand)
            )
            operands


renderArithmetic : String -> ArithmeticLayout -> Html msg
renderArithmetic original layout =
    let
        cell value =
            Html.span [ style "text-align" "right", style "white-space" "pre" ] [ Html.text value ]

        shared =
            [ style "display" "inline-grid"
            , style "font-family" "ui-monospace, monospace"
            , style "font-variant-numeric" "tabular-nums"
            , style "font-size" "1.25em"
            , style "line-height" "1.5"
            , style "letter-spacing" "0"
            , style "max-width" "100%"
            , attribute "role" "math"
            , attribute "aria-label" original
            , attribute "data-arithmetic-layout"
                (if layout.operator == "/" then
                    "division"

                 else
                    "vertical"
                )
            ]

        visible =
            if layout.operator == "/" then
                case layout.operands of
                    [ dividend, divisor ] ->
                        [ Html.span [ style "grid-column" "2", style "text-align" "right" ] [ cell "?" ]
                        , cell divisor
                        , Html.span [ style "border-top" "2px solid currentColor", style "border-left" "2px solid currentColor", style "padding-left" "0.5ch" ] [ cell dividend ]
                        ]

                    _ ->
                        []

            else
                List.indexedMap
                    (\index operand ->
                        [ Html.span [ style "color" "#ffd700", attribute "aria-hidden" "true" ]
                            [ Html.text
                                (if index == 0 then
                                    ""

                                 else if layout.operator == "x" then
                                    "×"

                                 else
                                    layout.operator
                                )
                            ]
                        , cell operand
                        ]
                    )
                    layout.operands
                    |> List.concat
                    |> (\rows -> rows ++ [ Html.span [ style "grid-column" "1 / -1", style "border-top" "2px solid currentColor", style "text-align" "right", attribute "aria-hidden" "true" ] [ Html.text "?" ] ])
    in
    Html.span (style "grid-template-columns" "1.5ch max-content" :: style "column-gap" "0.4ch" :: shared) visible


{-| Renders a math string as HTML:

  - ^N and ² ³ → proper <sup> elements
  - arithmetic operators → gold color for visual distinction

-}
renderMath : String -> Html msg
renderMath raw =
    case arithmeticLayout raw of
        Just layout ->
            renderArithmetic raw layout

        Nothing ->
            renderInline raw


renderInline : String -> Html msg
renderInline raw =
    let
        normalized =
            raw
                |> String.replace "²" "^2"
                |> String.replace "³" "^3"
    in
    if not (String.contains "^" normalized) then
        Html.span [] (renderWithOps normalized)

    else
        let
            parts =
                String.split "^" normalized
        in
        Html.span []
            (case parts of
                [] ->
                    []

                first :: rest ->
                    renderWithOps first
                        ++ List.concatMap renderSupSegment rest
            )


renderSupSegment : String -> List (Html msg)
renderSupSegment seg =
    let
        n =
            leadingDigitCount 0 seg

        digits =
            String.left n seg

        remainder =
            String.dropLeft n seg
    in
    Html.sup
        [ style "font-size" "1.2em"
        , style "line-height" "0"
        , style "position" "relative"
        , style "top" "-0.4em"
        ]
        [ Html.text digits ]
        :: renderWithOps remainder


renderWithOps : String -> List (Html msg)
renderWithOps s =
    let
        ( elems, remaining ) =
            String.foldl
                (\c ( acc, buf ) ->
                    if isOp c then
                        let
                            prefix =
                                if String.isEmpty buf then
                                    []

                                else
                                    [ Html.span [] [ Html.text buf ] ]
                        in
                        ( acc ++ prefix ++ [ opSpan c ], "" )

                    else
                        ( acc, buf ++ String.fromChar c )
                )
                ( [], "" )
                s
    in
    if String.isEmpty remaining then
        elems

    else
        elems ++ [ Html.span [] [ Html.text remaining ] ]


opSpan : Char -> Html msg
opSpan c =
    Html.span
        [ style "color" "#ffd700"
        , style "font-weight" "bold"
        ]
        [ Html.text (String.fromChar c) ]


isOp : Char -> Bool
isOp c =
    c == '+' || c == '-' || c == '×' || c == '/' || c == '=' || c == '<' || c == '>'


leadingDigitCount : Int -> String -> Int
leadingDigitCount i s =
    case String.toInt (String.slice i (i + 1) s) of
        Just _ ->
            leadingDigitCount (i + 1) s

        Nothing ->
            i
