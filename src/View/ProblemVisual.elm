module View.ProblemVisual exposing (view)

import Html exposing (Html)
import Html.Attributes as HA
import Svg exposing (Svg)
import Svg.Attributes as A
import Types exposing (ProblemVisual(..))


cream : String
cream =
    "#f5f5dc"


colors : List String
colors =
    [ "#ff807f", "#72caff", "#8fdf98" ]


colorFor : Int -> String
colorFor index =
    List.drop index colors |> List.head |> Maybe.withDefault "#d4b1ff"


number : Int -> String
number =
    String.fromInt


tickSpacing : Int -> Int
tickSpacing count =
    if count <= 10 then
        1

    else if count <= 20 then
        2

    else
        3


label : Float -> Float -> String -> Svg msg
label x y value =
    Svg.text_
        [ A.x (String.fromFloat x), A.y (String.fromFloat y), A.fill cream, A.fontSize "10", A.fontFamily "monospace" ]
        [ Svg.text value ]


axisLabel : Float -> Float -> String -> Svg msg
axisLabel x y value =
    Svg.text_
        [ A.x (String.fromFloat x), A.y (String.fromFloat y), A.fill cream, A.fontSize "10", A.fontFamily "monospace", A.textAnchor "middle" ]
        [ Svg.text value ]


line : Float -> Float -> Float -> Float -> Svg msg
line x1 y1 x2 y2 =
    Svg.line [ A.x1 (String.fromFloat x1), A.y1 (String.fromFloat y1), A.x2 (String.fromFloat x2), A.y2 (String.fromFloat y2), A.stroke cream, A.strokeWidth "1" ] []


box : Float -> Float -> Float -> Float -> String -> Svg msg
box x y width height fill =
    Svg.rect [ A.x (String.fromFloat x), A.y (String.fromFloat y), A.width (String.fromFloat width), A.height (String.fromFloat height), A.fill fill, A.stroke cream, A.strokeWidth "1" ] []


star : Float -> Float -> Svg msg
star x y =
    Svg.polygon
        [ A.points "0,-8 2,-2 8,-2 3,2 5,8 0,4 -5,8 -3,2 -8,-2 -2,-2", A.transform ("translate(" ++ String.fromFloat x ++ "," ++ String.fromFloat y ++ ")"), A.fill "#ffe177" ]
        []


frame : String -> String -> Int -> List (Svg msg) -> Html msg
frame kind description height content =
    Svg.svg
        [ A.viewBox ("0 0 360 " ++ number height)
        , A.width "100%"
        , HA.style "display" "block"
        , HA.style "max-height" "240px"
        , HA.attribute "role" "img"
        , HA.attribute "aria-labelledby" "problem-visual-title problem-visual-description"
        , HA.attribute "data-visual-kind" kind
        ]
        (Svg.title [ A.id "problem-visual-title" ] [ Svg.text kind ]
            :: Svg.desc [ A.id "problem-visual-description" ] [ Svg.text description ]
            :: content
        )


rowsDescription : List ( String, Int ) -> String
rowsDescription rows =
    rows |> List.map (\( name, value ) -> name ++ ": " ++ number value) |> String.join "; "


view : Maybe ProblemVisual -> Html msg
view maybeVisual =
    case maybeVisual of
        Nothing ->
            Html.text ""

        Just visual ->
            case visual of
                CountingObjects name count ->
                    frame "counting objects"
                        (number count ++ " " ++ name ++ ", arranged in rows of up to five.")
                        (35 + 32 * ((count + 4) // 5))
                        (List.range 0 (count - 1) |> List.map (\i -> star (44 + toFloat (modBy 5 i) * 55) (28 + toFloat (i // 5) * 32)))

                RibbonLengths rows ->
                    ribbons rows

                ObjectArray rows columns ->
                    frame "array"
                        (number rows ++ " rows of " ++ number columns ++ " equal squares.")
                        (35 + rows * 25)
                        (List.concatMap
                            (\row -> List.range 0 (columns - 1) |> List.map (\column -> box (40 + toFloat column * 24) (18 + toFloat row * 24) 24 24 "#4b9566"))
                            (List.range 0 (rows - 1))
                        )

                FractionStrip shaded total ->
                    frame "fraction strip"
                        (number shaded ++ " shaded parts out of " ++ number total ++ " equal parts.")
                        76
                        (List.range 0 (total - 1)
                            |> List.map
                                (\i ->
                                    box (15 + toFloat i * 330 / toFloat total)
                                        18
                                        (330 / toFloat total)
                                        40
                                        (if i < shaded then
                                            "#639ee6"

                                         else
                                            "#25253e"
                                        )
                                )
                        )

                BarChart title unit step rows ->
                    bars title unit step rows

                PictureGraph unit perSymbol rows ->
                    frame "picture graph"
                        (rowsDescription rows ++ ". Each star stands for " ++ number perSymbol ++ " " ++ unit ++ ".")
                        (55 + 36 * List.length rows)
                        (label 10 17 ("Key: each star = " ++ number perSymbol ++ " " ++ unit)
                            :: List.concat (List.indexedMap (\index ( name, count ) -> label 10 (50 + toFloat index * 36) name :: (List.range 0 (count - 1) |> List.map (\i -> star (110 + toFloat i * 26) (47 + toFloat index * 36)))) rows)
                        )

                MeasurementPlot unit denominator counts ->
                    measurementPlot unit denominator counts

                EqualGroups groups perGroup ->
                    equalGroups groups perGroup

                InputOutputTable rows ->
                    let
                        cellStyles =
                            [ HA.style "border" ("1px solid " ++ cream)
                            , HA.style "padding" "8px 12px"
                            , HA.style "text-align" "center"
                            , HA.style "width" "50%"
                            ]
                    in
                    Html.table
                        [ HA.style "border-collapse" "collapse"
                        , HA.style "width" "100%"
                        , HA.style "max-width" "320px"
                        , HA.style "margin" "8px auto"
                        , HA.style "font-size" "12px"
                        , HA.style "line-height" "1.4"
                        , HA.style "color" cream
                        , HA.attribute "aria-label" "Input/output table"
                        , HA.attribute "data-visual-kind" "input-output table"
                        ]
                        [ Html.thead []
                            [ Html.tr []
                                [ Html.th (HA.scope "col" :: HA.style "color" "#ffe177" :: cellStyles) [ Html.text "Input" ]
                                , Html.th (HA.scope "col" :: HA.style "color" "#ffe177" :: cellStyles) [ Html.text "Output" ]
                                ]
                            ]
                        , Html.tbody []
                            (List.map
                                (\( input, output ) ->
                                    Html.tr []
                                        [ Html.td cellStyles [ Html.text (number input) ]
                                        , Html.td cellStyles [ Html.text (output |> Maybe.map number |> Maybe.withDefault "?") ]
                                        ]
                                )
                                rows
                            )
                        ]


equalGroups : Int -> Int -> Html msg
equalGroups groups perGroup =
    let
        groupWord =
            if groups == 1 then
                "group"

            else
                "groups"

        counterWord =
            if perGroup == 1 then
                "counter"

            else
                "counters"

        height =
            if groups == 0 then
                80

            else
                35 + 100 * ((groups + 2) // 3)

        sets =
            List.range 0 (groups - 1)
                |> List.map
                    (\index ->
                        let
                            x =
                                12 + toFloat (modBy 3 index) * 114

                            y =
                                10 + toFloat (index // 3) * 100

                            counters =
                                List.range 0 (perGroup - 1)
                                    |> List.map
                                        (\counter ->
                                            Svg.circle
                                                [ A.cx (String.fromFloat (x + 27 + toFloat (modBy 3 counter) * 25))
                                                , A.cy (String.fromFloat (y + 35 + toFloat (counter // 3) * 18))
                                                , A.r "5"
                                                , A.fill "#ffe177"
                                                , HA.attribute "data-counter" "true"
                                                ]
                                                []
                                        )
                        in
                        Svg.g [ HA.attribute "data-counter-group" "true" ]
                            (box x y 104 88 "none"
                                :: label (x + 9) (y + 16) ("Group " ++ number (index + 1))
                                :: (if perGroup == 0 then
                                        [ label (x + 24) (y + 53) "empty" ]

                                    else
                                        counters
                                   )
                            )
                    )
    in
    frame "equal groups"
        (number groups ++ " " ++ groupWord ++ " with " ++ number perGroup ++ " " ++ counterWord ++ " in each group.")
        height
        ((if groups == 0 then
            [ axisLabel 180 32 "No groups" ]

          else
            sets
         )
            ++ [ label 12 (toFloat height - 9) (number groups ++ " " ++ groupWord ++ " of " ++ number perGroup ++ " " ++ counterWord) ]
        )


ribbons : List ( String, Int ) -> Html msg
ribbons rows =
    let
        maximum =
            max 1 (List.maximum (List.map Tuple.second rows) |> Maybe.withDefault 1)

        cell =
            265 / toFloat maximum

        baseline =
            35 + 37 * List.length rows

        strips =
            List.indexedMap
                (\index ( name, length ) ->
                    let
                        y =
                            15 + toFloat index * 37

                        color =
                            case name of
                                "Blue" ->
                                    "#72caff"

                                "Red" ->
                                    "#ff807f"

                                "Green" ->
                                    "#8fdf98"

                                _ ->
                                    "#ffe177"
                    in
                    label 4 (y + 17) name
                        :: (List.range 0 (length - 1) |> List.map (\i -> box (80 + toFloat i * cell) y cell 24 color))
                )
                rows
                |> List.concat

        ruler =
            List.range 0 maximum
                |> List.concatMap
                    (\i ->
                        let
                            x =
                                80 + toFloat i * cell
                        in
                        line x (toFloat baseline - 10) x (toFloat baseline - 5)
                            :: (if modBy (tickSpacing maximum) i == 0 then
                                    [ axisLabel x (toFloat baseline + 7) (number i) ]

                                else
                                    []
                               )
                    )
    in
    frame "ribbon lengths"
        (rowsDescription rows ++ ". Lengths are measured in equal unit cubes; the ribbons start at the same zero.")
        (baseline + 38)
        (strips ++ line 80 (toFloat baseline - 10) 345 (toFloat baseline - 10) :: ruler ++ [ label 80 (toFloat baseline + 29) "Each box is 1 cube long" ])


bars : String -> String -> Int -> List ( String, Int ) -> Html msg
bars title unit step rows =
    let
        maximum =
            max step (List.maximum (List.map Tuple.second rows) |> Maybe.withDefault step)

        tickCount =
            maximum // step

        scale =
            265 / toFloat maximum

        baseline =
            38 + 34 * List.length rows

        chartRows =
            List.indexedMap
                (\index ( name, count ) ->
                    let
                        y =
                            27 + toFloat index * 34
                    in
                    [ label 4 (y + 15) name, box 80 y (toFloat count * scale) 22 (colorFor index) ]
                )
                rows
                |> List.concat

        ticks =
            List.range 0 tickCount
                |> List.concatMap
                    (\i ->
                        let
                            x =
                                80 + toFloat (i * step) * scale
                        in
                        line x 22 x (toFloat baseline - 8)
                            :: (if modBy (tickSpacing tickCount) i == 0 then
                                    [ axisLabel x (toFloat baseline + 9) (number (i * step)) ]

                                else
                                    []
                               )
                    )
    in
    frame "bar graph"
        (title ++ ". " ++ rowsDescription rows ++ ". Axis unit: " ++ unit ++ "; each interval is " ++ number step ++ ".")
        (baseline + 36)
        (label 4 13 title :: ticks ++ chartRows ++ [ line 80 (toFloat baseline - 8) 345 (toFloat baseline - 8), label 80 (toFloat baseline + 29) (unit ++ "; each tick = " ++ number step) ])


measurementPlot : String -> Int -> List ( Int, Int ) -> Html msg
measurementPlot unit denominator counts =
    let
        values =
            List.map Tuple.first counts

        minimum =
            min 0 (List.minimum values |> Maybe.withDefault 0)

        maximum =
            max denominator (List.maximum values |> Maybe.withDefault denominator)

        maxCount =
            List.maximum (List.map Tuple.second counts) |> Maybe.withDefault 0

        baseline =
            28 + maxCount * 13

        position value =
            28 + toFloat (value - minimum) * 300 / toFloat (max 1 (maximum - minimum))

        tickLabel value =
            if modBy denominator value == 0 then
                number (value // denominator)

            else if denominator == 4 && modBy 2 value == 0 then
                number (value // 2) ++ "/2"

            else
                number value ++ "/" ++ number denominator

        ticks =
            List.range minimum maximum |> List.concatMap (\value -> [ line (position value) (toFloat baseline - 5) (position value) (toFloat baseline + 5), label (position value - 8) (toFloat baseline + 22) (tickLabel value) ])

        marks =
            List.concatMap
                (\( value, count ) ->
                    List.range 1 count
                        |> List.concatMap
                            (\index ->
                                let
                                    x =
                                        position value

                                    y =
                                        toFloat (baseline - index * 13)
                                in
                                [ line (x - 4) (y - 4) (x + 4) (y + 4), line (x - 4) (y + 4) (x + 4) (y - 4) ]
                            )
                )
                counts

        description =
            counts |> List.map (\( value, count ) -> number count ++ " marks at " ++ tickLabel value ++ " " ++ unit) |> String.join "; "
    in
    frame "measurement line plot"
        (description ++ ". Each X represents one measurement.")
        (baseline + 62)
        (line 28 (toFloat baseline) 328 (toFloat baseline) :: ticks ++ marks ++ [ label 28 (toFloat baseline + 43) (unit ++ " - each X is 1 measurement") ])
