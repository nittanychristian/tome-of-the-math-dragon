module Game.Problem.Common exposing
    ( gcd
    , lcm
    , pickGen
    , randInt
    , randIntNonZero
    , randChoice
    , wrongChoicesInt
    , wrongChoicesFloat
    , reduceFraction
    )

import Random exposing (Generator)


randInt : Int -> Int -> Generator Int
randInt lo hi =
    Random.int lo hi


randIntNonZero : Int -> Int -> Generator Int
randIntNonZero lo hi =
    Random.int lo hi
        |> Random.map
            (\n ->
                if n == 0 then
                    1
                else
                    n
            )


randChoice : List a -> a -> Generator a
randChoice list default =
    case list of
        [] ->
            Random.constant default

        first :: rest ->
            Random.int 0 (List.length list - 1)
                |> Random.map
                    (\i ->
                        List.drop i list
                            |> List.head
                            |> Maybe.withDefault first
                    )


-- Generate 3 wrong integer choices that are plausibly close but wrong.
-- Avoids duplicates and the correct answer.
wrongChoicesInt : Int -> Generator (List String)
wrongChoicesInt correct =
    Random.map3
        (\a b c ->
            List.map String.fromInt
                (dedupe correct [ correct + a, correct + b, correct - c ])
        )
        (Random.int 1 5)
        (Random.int 6 12)
        (Random.int 1 4)


-- 3 wrong float choices formatted to 2 decimal places
wrongChoicesFloat : Float -> Generator (List String)
wrongChoicesFloat correct =
    Random.map3
        (\a b c ->
            let
                fmt n =
                    String.fromFloat (toFixed 2 n)
            in
            List.map fmt
                [ correct + toFloat a
                , correct - toFloat b
                , correct * (1.0 + toFloat c * 0.1)
                ]
        )
        (Random.int 1 5)
        (Random.int 1 3)
        (Random.int 1 4)


dedupe : Int -> List Int -> List Int
dedupe correct candidates =
    candidates
        |> List.filter (\x -> x /= correct)
        |> List.foldl
            (\x acc ->
                if List.member x acc then
                    acc ++ [ x + 1 ]
                else
                    acc ++ [ x ]
            )
            []
        |> List.take 3


toFixed : Int -> Float -> Float
toFixed places n =
    let
        factor =
            toFloat (10 ^ places)
    in
    toFloat (round (n * factor)) / factor


-- Math helpers


gcd : Int -> Int -> Int
gcd a b =
    if b == 0 then
        abs a

    else
        gcd b (modBy b a)


lcm : Int -> Int -> Int
lcm a b =
    abs (a * b) // gcd a b


-- Deterministically pick a generator by cycling through a list.
-- `variant` drives the cycle; wraps around when it exceeds the list length.
pickGen : Int -> a -> List a -> a
pickGen variant fallback gens =
    if List.isEmpty gens then
        fallback
    else
        List.drop (modBy (List.length gens) (abs variant)) gens
            |> List.head
            |> Maybe.withDefault fallback


reduceFraction : Int -> Int -> ( Int, Int )
reduceFraction n d =
    let
        g =
            gcd (abs n) (abs d)

        sign =
            if d < 0 then
                -1

            else
                1
    in
    ( sign * n // g, sign * d // g )
