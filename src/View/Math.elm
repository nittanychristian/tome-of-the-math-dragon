module View.Math exposing (renderMath)

import Html exposing (Html)
import Html.Attributes exposing (style)


{-| Renders a math string as HTML:
  - ^N and ² ³ → proper <sup> elements
  - arithmetic operators → gold color for visual distinction
-}
renderMath : String -> Html msg
renderMath raw =
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
