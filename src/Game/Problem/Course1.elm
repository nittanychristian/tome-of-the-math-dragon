module Game.Problem.Course1 exposing (generatorFor, generatorForQuest)

import Game.Problem.Common exposing (..)
import Random exposing (Generator)
import Types exposing (..)


factorsOf : Int -> List Int
factorsOf n =
    List.range 1 n |> List.filter (\d -> modBy d n == 0)


multiplesUpTo : Int -> Int -> List Int
multiplesUpTo n limit =
    List.range 1 (limit // max 1 n) |> List.map (\k -> k * n)


generatorFor : Int -> Generator Problem
generatorFor unitNum =
    case unitNum of
        1 -> unit1
        2 -> unit2
        3 -> unit3
        4 -> unit4
        5 -> unit5
        6 -> unit6
        7 -> unit7
        8 -> unit8
        _ -> unit1


-- UNIT 1: Whole Numbers, GCF, LCM, Exponents, Order of Ops


unit1 : Generator Problem
unit1 =
    Random.int 0 7
        |> Random.andThen
            (\t ->
                case t of
                    0 -> genGcf
                    1 -> genLcm
                    2 -> genExponent
                    3 -> genOrderOfOps
                    4 -> genWholeNumApp
                    5 -> genPerfectSquare
                    6 -> genPerfectCube
                    _ -> genGcfLcmApp
            )


genAddSub : Generator Problem
genAddSub =
    Random.map2 Tuple.pair (randInt 10 99) (randInt 10 99)
        |> Random.andThen
            (\( a, b ) ->
                wrongChoicesInt (a + b)
                    |> Random.map
                        (\wrong ->
                            let
                                correct = a + b
                                choices = shuffleChoices (String.fromInt correct) wrong
                            in
                            { prompt = String.fromInt a ++ " + " ++ String.fromInt b ++ " = ?"
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = String.fromInt a ++ " + " ++ String.fromInt b ++ " = ?"
                                , answer = String.fromInt correct
                                , steps =
                                    [ "Line up the ones: " ++ String.fromInt (modBy 10 a) ++ " + " ++ String.fromInt (modBy 10 b) ++ " = " ++ String.fromInt (modBy 10 a + modBy 10 b)
                                    , "Line up the tens: " ++ String.fromInt (a // 10) ++ " + " ++ String.fromInt (b // 10) ++ " = " ++ String.fromInt (a // 10 + b // 10)
                                    , "Answer: " ++ String.fromInt correct
                                    ]
                                }
                            }
                        )
            )


genGcf : Generator Problem
genGcf =
    -- pick a common factor g, then two multiples
    Random.map2 Tuple.pair (randInt 2 8) (randInt 2 6)
        |> Random.andThen
            (\( g, ka ) ->
                randInt 2 6
                    |> Random.map
                        (\kb ->
                            let
                                a = g * ka
                                b = g * kb
                                correct = gcd a b
                            in
                            { prompt = "GCF of " ++ String.fromInt a ++ " and " ++ String.fromInt b ++ "?"
                            , inputType = TInteger
                            , answer = AInt correct
                            , hint =
                                { prompt = "GCF of " ++ String.fromInt a ++ " and " ++ String.fromInt b ++ "?"
                                , answer = String.fromInt correct
                                , steps =
                                    [ "Factors of " ++ String.fromInt a ++ ": " ++ String.join ", " (List.map String.fromInt (factorsOf a))
                                    , "Factors of " ++ String.fromInt b ++ ": " ++ String.join ", " (List.map String.fromInt (factorsOf b))
                                    , "Greatest common factor: " ++ String.fromInt correct
                                    ]
                                }
                            }
                        )
            )


genLcm : Generator Problem
genLcm =
    Random.map2 Tuple.pair (randInt 2 10) (randInt 2 10)
        |> Random.map
            (\( a, b ) ->
                let
                    correct = lcm a b
                in
                { prompt = "LCM of " ++ String.fromInt a ++ " and " ++ String.fromInt b ++ "?"
                , inputType = TInteger
                , answer = AInt correct
                , hint =
                    { prompt = "LCM of " ++ String.fromInt a ++ " and " ++ String.fromInt b ++ "?"
                    , answer = String.fromInt correct
                    , steps =
                        [ "Multiples of " ++ String.fromInt a ++ ": " ++ String.join ", " (List.map String.fromInt (multiplesUpTo a (correct * 2))) ++ "..."
                        , "Multiples of " ++ String.fromInt b ++ ": " ++ String.join ", " (List.map String.fromInt (multiplesUpTo b (correct * 2))) ++ "..."
                        , "Least common multiple: " ++ String.fromInt correct
                        ]
                    }
                }
            )


genExponent : Generator Problem
genExponent =
    Random.map2 Tuple.pair (randInt 2 9) (randInt 2 3)
        |> Random.map
            (\( base, exp ) ->
                let
                    correct = base ^ exp
                in
                { prompt = String.fromInt base ++ superscript exp ++ " = ?"
                , inputType = TInteger
                , answer = AInt correct
                , hint =
                    { prompt = String.fromInt base ++ superscript exp ++ " = ?"
                    , answer = String.fromInt correct
                    , steps =
                        [ String.fromInt base ++ superscript exp ++ " means multiply " ++ String.fromInt base ++ " by itself " ++ String.fromInt exp ++ " times"
                        , String.join " × " (List.repeat exp (String.fromInt base)) ++ " = " ++ String.fromInt correct
                        ]
                    }
                }
            )


superscript : Int -> String
superscript n =
    case n of
        2 -> "²"
        3 -> "³"
        _ -> "^" ++ String.fromInt n


genOrderOfOps : Generator Problem
genOrderOfOps =
    Random.map3 (\a b c -> ( a, b, c )) (randInt 1 8) (randInt 1 8) (randInt 1 5)
        |> Random.andThen
            (\( a, b, c ) ->
                -- expression: a + b × c
                wrongChoicesInt (a + b * c)
                    |> Random.map
                        (\wrong ->
                            let
                                correct = a + b * c
                                choices = shuffleChoices (String.fromInt correct) wrong
                            in
                            { prompt =
                                String.fromInt a
                                    ++ " + "
                                    ++ String.fromInt b
                                    ++ " × "
                                    ++ String.fromInt c
                                    ++ " = ?"
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = String.fromInt a ++ " + " ++ String.fromInt b ++ " × " ++ String.fromInt c ++ " = ?"
                                , answer = String.fromInt correct
                                , steps =
                                    [ "Multiplication before addition (PEMDAS)"
                                    , "First: " ++ String.fromInt b ++ " × " ++ String.fromInt c ++ " = " ++ String.fromInt (b * c)
                                    , "Then: " ++ String.fromInt a ++ " + " ++ String.fromInt (b * c) ++ " = " ++ String.fromInt correct
                                    ]
                                }
                            }
                        )
            )


-- UNIT 2: Integer Operations


unit2 : Generator Problem
unit2 =
    Random.int 0 6
        |> Random.andThen
            (\t ->
                case t of
                    0 -> genIntAdd
                    1 -> genIntSub
                    2 -> genIntMul
                    3 -> genIntDiv
                    4 -> genIntApp
                    5 -> genIntOrderOfOps
                    _ -> genCoordinatePlane
            )


genIntAdd : Generator Problem
genIntAdd =
    Random.map2 Tuple.pair (randInt -20 20) (randInt -20 20)
        |> Random.map
            (\( a, b ) ->
                let
                    result = a + b
                    sameSign = (a >= 0) == (b >= 0)
                in
                { prompt = showSigned a ++ " + " ++ showSigned b ++ " = ?"
                , inputType = TInteger
                , answer = AInt result
                , hint =
                    { prompt = showSigned a ++ " + " ++ showSigned b ++ " = ?"
                    , answer = String.fromInt result
                    , steps =
                        if sameSign then
                            [ "Same sign: add the values and keep the sign"
                            , String.fromInt (abs a) ++ " + " ++ String.fromInt (abs b) ++ " = " ++ String.fromInt (abs result)
                            , "Answer: " ++ String.fromInt result
                            ]
                        else
                            [ "Different signs: subtract smaller from larger, keep sign of larger"
                            , "Larger: " ++ String.fromInt (max (abs a) (abs b)) ++ " − " ++ String.fromInt (min (abs a) (abs b)) ++ " = " ++ String.fromInt (abs result)
                            , "Answer: " ++ String.fromInt result
                            ]
                    }
                }
            )


genIntSub : Generator Problem
genIntSub =
    Random.map2 Tuple.pair (randInt -15 15) (randInt -15 15)
        |> Random.map
            (\( a, b ) ->
                { prompt = showSigned a ++ " - " ++ showSigned b ++ " = ?"
                , inputType = TInteger
                , answer = AInt (a - b)
                , hint =
                    { prompt = showSigned a ++ " - " ++ showSigned b ++ " = ?"
                    , answer = String.fromInt (a - b)
                    , steps =
                        if b < 0 then
                            [ "Subtracting a negative = adding a positive"
                            , showSigned a ++ " - (" ++ String.fromInt b ++ ") = " ++ showSigned a ++ " + " ++ String.fromInt (abs b) ++ " = " ++ String.fromInt (a - b)
                            ]
                        else
                            [ "Subtract: " ++ showSigned a ++ " - " ++ String.fromInt b ++ " = " ++ String.fromInt (a - b)
                            ]
                    }
                }
            )


genIntMul : Generator Problem
genIntMul =
    Random.map2 Tuple.pair (randInt -9 9) (randInt -9 9)
        |> Random.andThen
            (\( a, b ) ->
                wrongChoicesInt (a * b)
                    |> Random.map
                        (\wrong ->
                            let
                                correct = a * b
                                choices = shuffleChoices (String.fromInt correct) wrong
                            in
                            let
                                result = correct
                                sameSign = (a >= 0) == (b >= 0)
                            in
                            { prompt = showSigned a ++ " × " ++ showSigned b ++ " = ?"
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = showSigned a ++ " × " ++ showSigned b ++ " = ?"
                                , answer = String.fromInt result
                                , steps =
                                    [ "Multiply absolute values: " ++ String.fromInt (abs a) ++ " × " ++ String.fromInt (abs b) ++ " = " ++ String.fromInt (abs result)
                                    , if sameSign then "Same sign → positive" else "Different signs → negative"
                                    , "Answer: " ++ String.fromInt result
                                    ]
                                }
                            }
                        )
            )


genIntDiv : Generator Problem
genIntDiv =
    Random.map2 Tuple.pair (randIntNonZero -9 9) (randInt 1 5)
        |> Random.andThen
            (\( b, q ) ->
                let
                    a = b * q
                in
                wrongChoicesInt q
                    |> Random.map
                        (\wrong ->
                            let choices = shuffleChoices (String.fromInt q) wrong in
                            { prompt = showSigned a ++ " / " ++ showSigned b ++ " = ?"
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = showSigned a ++ " / " ++ showSigned b ++ " = ?"
                                , answer = String.fromInt q
                                , steps =
                                    [ "Divide absolute values: " ++ String.fromInt (abs a) ++ " / " ++ String.fromInt (abs b) ++ " = " ++ String.fromInt (abs q)
                                    , if (a >= 0) == (b >= 0) then "Same sign → positive" else "Different signs → negative"
                                    , "Answer: " ++ String.fromInt q
                                    ]
                                }
                            }
                        )
            )


genIntApp : Generator Problem
genIntApp =
    Random.int 0 2
        |> Random.andThen
            (\t ->
                case t of
                    0 ->
                        -- Temperature change
                        Random.map2 Tuple.pair (randInt -20 20) (randInt -15 15)
                            |> Random.map
                                (\( start, change ) ->
                                    { prompt = "Temperature starts at " ++ showSigned start ++ "°F and changes by " ++ showSigned change ++ "°F. New temperature?"
                                    , inputType = TInteger
                                    , answer = AInt (start + change)
                                    , hint =
                                        { prompt = "Temperature starts at " ++ showSigned start ++ "°F and changes by " ++ showSigned change ++ "°F. New temperature?"
                                        , answer = String.fromInt (start + change) ++ "°F"
                                        , steps =
                                            [ "Add the change to the starting value"
                                            , showSigned start ++ " + " ++ showSigned change ++ " = " ++ String.fromInt (start + change)
                                            , "Answer: " ++ String.fromInt (start + change) ++ "°F"
                                            ]
                                        }
                                    }
                                )

                    1 ->
                        -- Elevation / depth
                        Random.map2 Tuple.pair (randInt -200 -10) (randInt 5 100)
                            |> Random.map
                                (\( depth, rise ) ->
                                    { prompt = "A diver is at " ++ String.fromInt depth ++ " m. She rises " ++ String.fromInt rise ++ " m. New depth?"
                                    , inputType = TInteger
                                    , answer = AInt (depth + rise)
                                    , hint =
                                        { prompt = "A diver is at " ++ String.fromInt depth ++ " m. She rises " ++ String.fromInt rise ++ " m. New depth?"
                                        , answer = String.fromInt (depth + rise) ++ " m"
                                        , steps =
                                            [ "Rising means adding a positive number"
                                            , "(" ++ String.fromInt depth ++ ") + " ++ String.fromInt rise ++ " = " ++ String.fromInt (depth + rise)
                                            , "Answer: " ++ String.fromInt (depth + rise) ++ " m"
                                            ]
                                        }
                                    }
                                )

                    _ ->
                        -- Account balance / debt
                        Random.map2 Tuple.pair (randInt -50 50) (randInt -30 30)
                            |> Random.map
                                (\( balance, transaction ) ->
                                    let verb = if transaction >= 0 then "deposits" else "withdraws"
                                        amount = abs transaction
                                    in
                                    { prompt = "Account: $" ++ showSigned balance ++ ". Player " ++ verb ++ " $" ++ String.fromInt amount ++ ". New balance?"
                                    , inputType = TInteger
                                    , answer = AInt (balance + transaction)
                                    , hint =
                                        { prompt = "Account: $" ++ showSigned balance ++ ". Player " ++ verb ++ " $" ++ String.fromInt amount ++ ". New balance?"
                                        , answer = "$" ++ String.fromInt (balance + transaction)
                                        , steps =
                                            [ "Add the transaction to the balance"
                                            , showSigned balance ++ " + " ++ showSigned transaction ++ " = " ++ String.fromInt (balance + transaction)
                                            , "Answer: $" ++ String.fromInt (balance + transaction)
                                            ]
                                        }
                                    }
                                )
            )


genIntOrderOfOps : Generator Problem
genIntOrderOfOps =
    -- Generate expressions like a + b * c or (a + b) * c with negative numbers
    Random.int 0 2
        |> Random.andThen
            (\t ->
                case t of
                    0 ->
                        -- a + b * c  (no parens, multiply first)
                        Random.map3 (\a b c -> ( a, b, c )) (randInt -5 5) (randInt -4 4) (randInt -4 4)
                            |> Random.map
                                (\( a, b, c ) ->
                                    { prompt = showSigned a ++ " + " ++ showSigned b ++ " × " ++ showSigned c ++ " = ?"
                                    , inputType = TInteger
                                    , answer = AInt (a + b * c)
                                    , hint =
                                        { prompt = showSigned a ++ " + " ++ showSigned b ++ " × " ++ showSigned c ++ " = ?"
                                        , answer = String.fromInt (a + b * c)
                                        , steps =
                                            [ "Multiplication first: " ++ showSigned b ++ " × " ++ showSigned c ++ " = " ++ String.fromInt (b * c)
                                            , "Then addition: " ++ showSigned a ++ " + " ++ showSigned (b * c) ++ " = " ++ String.fromInt (a + b * c)
                                            , "Answer: " ++ String.fromInt (a + b * c)
                                            ]
                                        }
                                    }
                                )

                    1 ->
                        -- a - b * c
                        Random.map3 (\a b c -> ( a, b, c )) (randInt -5 5) (randInt -4 4) (randInt -4 4)
                            |> Random.map
                                (\( a, b, c ) ->
                                    { prompt = showSigned a ++ " - " ++ showSigned b ++ " × " ++ showSigned c ++ " = ?"
                                    , inputType = TInteger
                                    , answer = AInt (a - b * c)
                                    , hint =
                                        { prompt = showSigned a ++ " - " ++ showSigned b ++ " × " ++ showSigned c ++ " = ?"
                                        , answer = String.fromInt (a - b * c)
                                        , steps =
                                            [ "Multiplication first: " ++ showSigned b ++ " × " ++ showSigned c ++ " = " ++ String.fromInt (b * c)
                                            , "Then subtraction: " ++ showSigned a ++ " - " ++ showSigned (b * c) ++ " = " ++ String.fromInt (a - b * c)
                                            , "Answer: " ++ String.fromInt (a - b * c)
                                            ]
                                        }
                                    }
                                )

                    _ ->
                        -- a * b + c * d (two products, then add)
                        Random.map4 (\a b c d -> { a = a, b = b, c = c, d = d }) (randInt -3 3) (randInt -3 3) (randInt -3 3) (randInt -3 3)
                            |> Random.map
                                (\r ->
                                    { prompt = showSigned r.a ++ " × " ++ showSigned r.b ++ " + " ++ showSigned r.c ++ " × " ++ showSigned r.d ++ " = ?"
                                    , inputType = TInteger
                                    , answer = AInt (r.a * r.b + r.c * r.d)
                                    , hint =
                                        { prompt = showSigned r.a ++ " × " ++ showSigned r.b ++ " + " ++ showSigned r.c ++ " × " ++ showSigned r.d ++ " = ?"
                                        , answer = String.fromInt (r.a * r.b + r.c * r.d)
                                        , steps =
                                            [ "Multiply both pairs first"
                                            , showSigned r.a ++ " × " ++ showSigned r.b ++ " = " ++ String.fromInt (r.a * r.b) ++ "  and  " ++ showSigned r.c ++ " × " ++ showSigned r.d ++ " = " ++ String.fromInt (r.c * r.d)
                                            , "Add results: " ++ showSigned (r.a * r.b) ++ " + " ++ showSigned (r.c * r.d) ++ " = " ++ String.fromInt (r.a * r.b + r.c * r.d)
                                            ]
                                        }
                                    }
                                )
            )


genCoordinatePlane : Generator Problem
genCoordinatePlane =
    Random.int 0 2
        |> Random.andThen
            (\t ->
                case t of
                    0 ->
                        -- Identify quadrant
                        Random.map2 Tuple.pair (randIntNonZero -8 8) (randIntNonZero -8 8)
                            |> Random.map
                                (\( x, y ) ->
                                    let
                                        q =
                                            if x > 0 && y > 0 then 0
                                            else if x < 0 && y > 0 then 1
                                            else if x < 0 && y < 0 then 2
                                            else 3
                                    in
                                    let
                                        quadrantName =
                                            [ "Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV" ]
                                                |> List.drop q
                                                |> List.head
                                                |> Maybe.withDefault "?"
                                    in
                                    { prompt = "The point (" ++ String.fromInt x ++ ", " ++ String.fromInt y ++ ") lies in which quadrant?"
                                    , inputType = TChoice [ "Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV" ]
                                    , answer = AChoice q
                                    , hint =
                                        { prompt = "The point (" ++ String.fromInt x ++ ", " ++ String.fromInt y ++ ") lies in which quadrant?"
                                        , answer = quadrantName
                                        , steps =
                                            [ "x = " ++ String.fromInt x ++ (if x > 0 then " → right (+)" else " → left (−)")
                                            , "y = " ++ String.fromInt y ++ (if y > 0 then " → up (+)" else " → down (−)")
                                            , "Quadrants: I(+,+)  II(−,+)  III(−,−)  IV(+,−)"
                                            , "Answer: " ++ quadrantName
                                            ]
                                        }
                                    }
                                )

                    1 ->
                        -- Read x-coordinate
                        Random.map2 Tuple.pair (randIntNonZero -9 9) (randIntNonZero -9 9)
                            |> Random.map
                                (\( x, y ) ->
                                    { prompt = "What is the x-coordinate of the point (" ++ String.fromInt x ++ ", " ++ String.fromInt y ++ ")?"
                                    , inputType = TInteger
                                    , answer = AInt x
                                    , hint =
                                        { prompt = "What is the x-coordinate of the point (" ++ String.fromInt x ++ ", " ++ String.fromInt y ++ ")?"
                                        , answer = String.fromInt x
                                        , steps =
                                            [ "A point is written as (x, y)"
                                            , "The first number is the x-coordinate"
                                            , "Answer: " ++ String.fromInt x
                                            ]
                                        }
                                    }
                                )

                    _ ->
                        -- Read y-coordinate
                        Random.map2 Tuple.pair (randIntNonZero -9 9) (randIntNonZero -9 9)
                            |> Random.map
                                (\( x, y ) ->
                                    { prompt = "What is the y-coordinate of the point (" ++ String.fromInt x ++ ", " ++ String.fromInt y ++ ")?"
                                    , inputType = TInteger
                                    , answer = AInt y
                                    , hint =
                                        { prompt = "What is the y-coordinate of the point (" ++ String.fromInt x ++ ", " ++ String.fromInt y ++ ")?"
                                        , answer = String.fromInt y
                                        , steps =
                                            [ "A point is written as (x, y)"
                                            , "The second number is the y-coordinate"
                                            , "Answer: " ++ String.fromInt y
                                            ]
                                        }
                                    }
                                )
            )


showSigned : Int -> String
showSigned n =
    if n < 0 then
        "(" ++ String.fromInt n ++ ")"

    else
        String.fromInt n


-- UNIT 3: Fractions and Decimals


unit3 : Generator Problem
unit3 =
    Random.int 0 7
        |> Random.andThen
            (\t ->
                case t of
                    0 -> genFracAdd
                    1 -> genFracSub
                    2 -> genFracMul
                    3 -> genDecAdd
                    4 -> genDecMul
                    5 -> genSimplifyFrac
                    6 -> genFracAddUnlike
                    _ -> genNegRational
            )


genFracAdd : Generator Problem
genFracAdd =
    -- same denominator for simplicity
    randInt 2 8
        |> Random.andThen
            (\d ->
                Random.map2 Tuple.pair (randInt 1 (d - 1)) (randInt 1 (d - 1))
                    |> Random.map
                        (\( n1, n2 ) ->
                            let
                                ( rn, rd ) = reduceFraction (n1 + n2) d
                            in
                            { prompt =
                                showFrac n1 d ++ " + " ++ showFrac n2 d ++ " = ?"
                            , inputType = TFraction
                            , answer = AFraction rn rd
                            , hint =
                                { prompt = showFrac n1 d ++ " + " ++ showFrac n2 d ++ " = ?"
                                , answer = showFrac rn rd
                                , steps =
                                    [ "Same denominator: add numerators"
                                    , String.fromInt n1 ++ " + " ++ String.fromInt n2 ++ " = " ++ String.fromInt (n1 + n2) ++ ", denominator stays " ++ String.fromInt d
                                    , "Answer: " ++ showFrac rn rd
                                    ]
                                }
                            }
                        )
            )


genFracSub : Generator Problem
genFracSub =
    randInt 2 8
        |> Random.andThen
            (\d ->
                Random.map2 Tuple.pair (randInt 2 d) (randInt 1 (d - 1))
                    |> Random.map
                        (\( n1, n2 ) ->
                            let
                                safe_n1 = max n1 (n2 + 1)
                                ( rn, rd ) = reduceFraction (safe_n1 - n2) d
                            in
                            { prompt =
                                showFrac safe_n1 d ++ " - " ++ showFrac n2 d ++ " = ?"
                            , inputType = TFraction
                            , answer = AFraction rn rd
                            , hint =
                                { prompt = showFrac safe_n1 d ++ " - " ++ showFrac n2 d ++ " = ?"
                                , answer = showFrac rn rd
                                , steps =
                                    [ "Same denominator: subtract numerators"
                                    , String.fromInt safe_n1 ++ " - " ++ String.fromInt n2 ++ " = " ++ String.fromInt (safe_n1 - n2) ++ ", denominator stays " ++ String.fromInt d
                                    , "Answer: " ++ showFrac rn rd
                                    ]
                                }
                            }
                        )
            )


genFracMul : Generator Problem
genFracMul =
    Random.map2 Tuple.pair
        (Random.map2 Tuple.pair (randInt 1 6) (randInt 2 8))
        (Random.map2 Tuple.pair (randInt 1 6) (randInt 2 8))
        |> Random.map
            (\( ( n1, d1 ), ( n2, d2 ) ) ->
                let
                    ( rn, rd ) = reduceFraction (n1 * n2) (d1 * d2)
                in
                { prompt = showFrac n1 d1 ++ " × " ++ showFrac n2 d2 ++ " = ?"
                , inputType = TFraction
                , answer = AFraction rn rd
                , hint =
                    { prompt = showFrac n1 d1 ++ " × " ++ showFrac n2 d2 ++ " = ?"
                    , answer = showFrac rn rd
                    , steps =
                        [ "Multiply numerators: " ++ String.fromInt n1 ++ " × " ++ String.fromInt n2 ++ " = " ++ String.fromInt (n1 * n2)
                        , "Multiply denominators: " ++ String.fromInt d1 ++ " × " ++ String.fromInt d2 ++ " = " ++ String.fromInt (d1 * d2)
                        , "Simplify " ++ showFrac (n1 * n2) (d1 * d2) ++ ": " ++ showFrac rn rd
                        ]
                    }
                }
            )


genDecAdd : Generator Problem
genDecAdd =
    Random.map2 Tuple.pair (randInt 10 99) (randInt 10 99)
        |> Random.map
            (\( a, b ) ->
                let
                    fa = toFloat a / 10.0
                    fb = toFloat b / 10.0
                    correct = fa + fb
                in
                { prompt = String.fromFloat fa ++ " + " ++ String.fromFloat fb ++ " = ?"
                , inputType = TDecimal
                , answer = AFloat correct 0.01
                , hint =
                    { prompt = String.fromFloat fa ++ " + " ++ String.fromFloat fb ++ " = ?"
                    , answer = String.fromFloat correct
                    , steps =
                        [ "Line up the decimal points"
                        , "Add as normal: " ++ String.fromInt a ++ " + " ++ String.fromInt b ++ " = " ++ String.fromInt (a + b)
                        , "Place the decimal: " ++ String.fromFloat correct
                        ]
                    }
                }
            )


genDecMul : Generator Problem
genDecMul =
    Random.map2 Tuple.pair (randInt 1 9) (randInt 1 9)
        |> Random.map
            (\( a, b ) ->
                let
                    fa = toFloat a / 10.0
                    fb = toFloat b / 10.0
                    correct = fa * fb
                in
                { prompt = String.fromFloat fa ++ " × " ++ String.fromFloat fb ++ " = ?"
                , inputType = TDecimal
                , answer = AFloat correct 0.01
                , hint =
                    { prompt = String.fromFloat fa ++ " × " ++ String.fromFloat fb ++ " = ?"
                    , answer = String.fromFloat correct
                    , steps =
                        [ "Multiply as whole numbers: " ++ String.fromInt a ++ " × " ++ String.fromInt b ++ " = " ++ String.fromInt (a * b)
                        , "Count decimal places: 1 + 1 = 2"
                        , "Place decimal 2 from right: " ++ String.fromFloat correct
                        ]
                    }
                }
            )


showFrac : Int -> Int -> String
showFrac n d =
    String.fromInt n ++ "/" ++ String.fromInt d


-- UNIT 4: Evaluating Algebraic Expressions


unit4 : Generator Problem
unit4 =
    Random.int 0 5
        |> Random.andThen
            (\t ->
                case t of
                    0 -> genEvalLinear
                    1 -> genEvalTwoVar
                    2 -> genCombineLike
                    3 -> genTranslateExpr
                    4 -> genSimplifyExpr
                    _ -> genFactorExpr
            )


genEvalLinear : Generator Problem
genEvalLinear =
    Random.map3 (\a b x -> ( a, b, x ))
        (randInt 1 9)
        (randInt 0 9)
        (randInt 1 9)
        |> Random.map
            (\( a, b, x ) ->
                { prompt =
                    "Evaluate " ++ String.fromInt a ++ "x + " ++ String.fromInt b
                        ++ " when x = " ++ String.fromInt x
                , inputType = TInteger
                , answer = AInt (a * x + b)
                , hint =
                    { prompt = "Evaluate " ++ String.fromInt a ++ "x + " ++ String.fromInt b ++ " when x = " ++ String.fromInt x
                    , answer = String.fromInt (a * x + b)
                    , steps =
                        [ "Substitute x = " ++ String.fromInt x ++ ": " ++ String.fromInt a ++ "(" ++ String.fromInt x ++ ") + " ++ String.fromInt b
                        , "Multiply: " ++ String.fromInt (a * x) ++ " + " ++ String.fromInt b
                        , "Add: " ++ String.fromInt (a * x + b)
                        ]
                    }
                }
            )


genEvalTwoVar : Generator Problem
genEvalTwoVar =
    Random.map4 (\a b x y -> { a = a, b = b, x = x, y = y })
        (randInt 1 6)
        (randInt 1 6)
        (randInt 1 8)
        (randInt 1 8)
        |> Random.map
            (\{ a, b, x, y } ->
                { prompt =
                    "Evaluate " ++ String.fromInt a ++ "x + " ++ String.fromInt b ++ "y"
                        ++ " when x=" ++ String.fromInt x ++ ", y=" ++ String.fromInt y
                , inputType = TInteger
                , answer = AInt (a * x + b * y)
                , hint =
                    { prompt = "Evaluate " ++ String.fromInt a ++ "x + " ++ String.fromInt b ++ "y when x=" ++ String.fromInt x ++ ", y=" ++ String.fromInt y
                    , answer = String.fromInt (a * x + b * y)
                    , steps =
                        [ "Substitute: " ++ String.fromInt a ++ "(" ++ String.fromInt x ++ ") + " ++ String.fromInt b ++ "(" ++ String.fromInt y ++ ")"
                        , "Multiply: " ++ String.fromInt (a * x) ++ " + " ++ String.fromInt (b * y)
                        , "Add: " ++ String.fromInt (a * x + b * y)
                        ]
                    }
                }
            )


genCombineLike : Generator Problem
genCombineLike =
    Random.map3 (\a b c -> ( a, b, c ))
        (randInt 1 8)
        (randInt 1 8)
        (randInt 1 8)
        |> Random.andThen
            (\( a, b, x ) ->
                wrongChoicesInt ((a + b) * x)
                    |> Random.map
                        (\wrong ->
                            let
                                correct = (a + b) * x
                                choices = shuffleChoices (String.fromInt correct) wrong
                            in
                            { prompt =
                                "If x=" ++ String.fromInt x ++ ", what is "
                                    ++ String.fromInt a ++ "x + " ++ String.fromInt b ++ "x?"
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "If x=" ++ String.fromInt x ++ ", what is " ++ String.fromInt a ++ "x + " ++ String.fromInt b ++ "x?"
                                , answer = String.fromInt correct
                                , steps =
                                    [ "Combine like terms first: " ++ String.fromInt a ++ "x + " ++ String.fromInt b ++ "x = " ++ String.fromInt (a + b) ++ "x"
                                    , "Then substitute: " ++ String.fromInt (a + b) ++ "(" ++ String.fromInt x ++ ") = " ++ String.fromInt correct
                                    ]
                                }
                            }
                        )
            )


-- UNIT 5: Equations and Inequalities


unit5 : Generator Problem
unit5 =
    Random.int 0 5
        |> Random.andThen
            (\t ->
                case t of
                    0 -> genSolveAdd
                    1 -> genSolveMul
                    2 -> genTwoStep
                    3 -> genInequality
                    4 -> genWriteEquation
                    _ -> genSolveInequality
            )


genSolveAdd : Generator Problem
genSolveAdd =
    Random.map2 Tuple.pair (randInt 1 9) (randInt 1 20)
        |> Random.map
            (\( a, x ) ->
                let
                    b = a + x
                in
                { prompt = "Solve: x + " ++ String.fromInt a ++ " = " ++ String.fromInt b
                , inputType = TInteger
                , answer = AInt x
                , hint =
                    { prompt = "Solve: x + " ++ String.fromInt a ++ " = " ++ String.fromInt b
                    , answer = String.fromInt x
                    , steps =
                        [ "Subtract " ++ String.fromInt a ++ " from both sides"
                        , "x + " ++ String.fromInt a ++ " − " ++ String.fromInt a ++ " = " ++ String.fromInt b ++ " − " ++ String.fromInt a
                        , "x = " ++ String.fromInt x
                        ]
                    }
                }
            )


genSolveMul : Generator Problem
genSolveMul =
    Random.map2 Tuple.pair (randIntNonZero 2 9) (randInt 1 12)
        |> Random.map
            (\( a, x ) ->
                let
                    b = a * x
                in
                { prompt = "Solve: " ++ String.fromInt a ++ "x = " ++ String.fromInt b
                , inputType = TInteger
                , answer = AInt x
                , hint =
                    { prompt = "Solve: " ++ String.fromInt a ++ "x = " ++ String.fromInt b
                    , answer = String.fromInt x
                    , steps =
                        [ "Divide both sides by " ++ String.fromInt a
                        , String.fromInt a ++ "x / " ++ String.fromInt a ++ " = " ++ String.fromInt b ++ " / " ++ String.fromInt a
                        , "x = " ++ String.fromInt x
                        ]
                    }
                }
            )


genInequality : Generator Problem
genInequality =
    Random.map2 Tuple.pair (randIntNonZero 2 9) (randInt 1 12)
        |> Random.andThen
            (\( a, x ) ->
                let
                    b = a * x
                in
                Random.int 0 1
                    |> Random.map
                        (\dirN ->
                            let
                                dir = if dirN == 0 then IGt else ILt
                                dirStr = if dirN == 0 then ">" else "<"
                            in
                            { prompt =
                                "Solve: " ++ String.fromInt a ++ "x " ++ dirStr ++ " " ++ String.fromInt b
                            , inputType = TInequality
                            , answer = AInequality dir (toFloat x)
                            , hint =
                                { prompt = "Solve: " ++ String.fromInt a ++ "x " ++ dirStr ++ " " ++ String.fromInt b
                                , answer = "x " ++ dirStr ++ " " ++ String.fromInt x
                                , steps =
                                    [ "Divide both sides by " ++ String.fromInt a
                                    , String.fromInt a ++ "x / " ++ String.fromInt a ++ " " ++ dirStr ++ " " ++ String.fromInt b ++ " / " ++ String.fromInt a
                                    , "x " ++ dirStr ++ " " ++ String.fromInt x
                                    , "Note: dividing by a positive keeps the inequality direction"
                                    ]
                                }
                            }
                        )
            )


-- UNIT 6: Ratios and Percents


unit6 : Generator Problem
unit6 =
    Random.int 0 5
        |> Random.andThen
            (\t ->
                case t of
                    0 -> genPercent
                    1 -> genUnitRate
                    2 -> genMissingProportion
                    3 -> genEquivRatio
                    4 -> genConvertFDP
                    _ -> genPercentOfNum
            )


genPercent : Generator Problem
genPercent =
    Random.map2 Tuple.pair
        (randChoice [ 10, 20, 25, 50, 75 ] 25)
        (randChoice [ 20, 40, 60, 80, 100, 120, 200 ] 100)
        |> Random.map
            (\( pct, whole ) ->
                let
                    correct = (pct * whole) // 100
                in
                { prompt =
                    "What is " ++ String.fromInt pct ++ "% of " ++ String.fromInt whole ++ "?"
                , inputType = TInteger
                , answer = AInt correct
                , hint =
                    { prompt = "What is " ++ String.fromInt pct ++ "% of " ++ String.fromInt whole ++ "?"
                    , answer = String.fromInt correct
                    , steps =
                        [ "Convert: " ++ String.fromInt pct ++ "% = " ++ String.fromFloat (toFloat pct / 100)
                        , "Multiply: " ++ String.fromFloat (toFloat pct / 100) ++ " × " ++ String.fromInt whole ++ " = " ++ String.fromInt correct
                        ]
                    }
                }
            )


genUnitRate : Generator Problem
genUnitRate =
    Random.map2 Tuple.pair (randInt 2 9) (randInt 1 9)
        |> Random.andThen
            (\( units, rate ) ->
                wrongChoicesInt rate
                    |> Random.map
                        (\wrong ->
                            let
                                total = units * rate
                                choices = shuffleChoices (String.fromInt rate) wrong
                            in
                            { prompt =
                                String.fromInt units ++ " items cost $" ++ String.fromInt total ++ ". Cost per item?"
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = String.fromInt units ++ " items cost $" ++ String.fromInt total ++ ". Cost per item?"
                                , answer = "$" ++ String.fromInt rate
                                , steps =
                                    [ "Unit rate = total / quantity"
                                    , "$" ++ String.fromInt total ++ " / " ++ String.fromInt units ++ " = $" ++ String.fromInt rate ++ " per item"
                                    ]
                                }
                            }
                        )
            )


genMissingProportion : Generator Problem
genMissingProportion =
    Random.map2 Tuple.pair (randInt 2 8) (randInt 2 6)
        |> Random.map
            (\( a, k ) ->
                let
                    b = a * k
                    c = a + 1
                    x = c * k
                in
                { prompt =
                    String.fromInt a ++ "/" ++ String.fromInt b ++ " = " ++ String.fromInt c ++ "/?"
                , inputType = TInteger
                , answer = AInt x
                , hint =
                    { prompt = String.fromInt a ++ "/" ++ String.fromInt b ++ " = " ++ String.fromInt c ++ "/?"
                    , answer = String.fromInt x
                    , steps =
                        [ "Find the scale factor: " ++ String.fromInt b ++ " / " ++ String.fromInt a ++ " = " ++ String.fromInt k
                        , "Apply to numerator " ++ String.fromInt c ++ ": " ++ String.fromInt c ++ " × " ++ String.fromInt k ++ " = " ++ String.fromInt x
                        ]
                    }
                }
            )


-- UNIT 7: Area and Volume


unit7 : Generator Problem
unit7 =
    Random.int 0 5
        |> Random.andThen
            (\t ->
                case t of
                    0 -> genAreaRect
                    1 -> genAreaTriangle
                    2 -> genCircumference
                    3 -> genVolumeBox
                    4 -> genPerimeter
                    _ -> genSurfaceArea
            )


genAreaRect : Generator Problem
genAreaRect =
    Random.map2 Tuple.pair (randInt 2 15) (randInt 2 15)
        |> Random.map
            (\( w, h ) ->
                { prompt =
                    "Area of a rectangle: width=" ++ String.fromInt w ++ ", height=" ++ String.fromInt h ++ "?"
                , inputType = TInteger
                , answer = AInt (w * h)
                , hint =
                    { prompt = "Area of a rectangle: width=" ++ String.fromInt w ++ ", height=" ++ String.fromInt h ++ "?"
                    , answer = String.fromInt (w * h)
                    , steps =
                        [ "Area = width × height"
                        , String.fromInt w ++ " × " ++ String.fromInt h ++ " = " ++ String.fromInt (w * h)
                        ]
                    }
                }
            )


genAreaTriangle : Generator Problem
genAreaTriangle =
    -- use even bases so area is always whole
    Random.map2 Tuple.pair (randInt 1 8) (randInt 2 12)
        |> Random.map
            (\( h, bHalf ) ->
                let
                    b = bHalf * 2
                in
                { prompt =
                    "Area of triangle: base=" ++ String.fromInt b ++ ", height=" ++ String.fromInt h ++ "?"
                , inputType = TInteger
                , answer = AInt (b * h // 2)
                , hint =
                    { prompt = "Area of triangle: base=" ++ String.fromInt b ++ ", height=" ++ String.fromInt h ++ "?"
                    , answer = String.fromInt (b * h // 2)
                    , steps =
                        [ "Area = ½ × base × height"
                        , "½ × " ++ String.fromInt b ++ " × " ++ String.fromInt h ++ " = " ++ String.fromInt (b * h // 2)
                        ]
                    }
                }
            )


genCircumference : Generator Problem
genCircumference =
    randChoice [ 3, 4, 5, 6, 7, 8, 10 ] 5
        |> Random.map
            (\r ->
                let
                    correct = 2.0 * pi * toFloat r
                in
                { prompt = "Circumference of circle with radius " ++ String.fromInt r ++ "? (use π≈3.14)"
                , inputType = TDecimal
                , answer = AFloat (2.0 * 3.14 * toFloat r) 0.1
                , hint =
                    let c314 = 2.0 * 3.14 * toFloat r in
                    { prompt = "Circumference of circle with radius " ++ String.fromInt r ++ "? (use π≈3.14)"
                    , answer = String.fromFloat c314
                    , steps =
                        [ "C = 2πr"
                        , "C = 2 × 3.14 × " ++ String.fromInt r
                        , "C = " ++ String.fromFloat c314
                        ]
                    }
                }
            )


genVolumeBox : Generator Problem
genVolumeBox =
    Random.map3 (\l w h -> ( l, w, h )) (randInt 2 8) (randInt 2 8) (randInt 2 8)
        |> Random.map
            (\( l, w, h ) ->
                { prompt =
                    "Volume of box: " ++ String.fromInt l ++ "×" ++ String.fromInt w ++ "×" ++ String.fromInt h ++ "?"
                , inputType = TInteger
                , answer = AInt (l * w * h)
                , hint =
                    { prompt = "Volume of box: " ++ String.fromInt l ++ "×" ++ String.fromInt w ++ "×" ++ String.fromInt h ++ "?"
                    , answer = String.fromInt (l * w * h)
                    , steps =
                        [ "V = length × width × height"
                        , String.fromInt l ++ " × " ++ String.fromInt w ++ " × " ++ String.fromInt h ++ " = " ++ String.fromInt (l * w * h)
                        ]
                    }
                }
            )


-- UNIT 8: Statistics (multiple choice)


unit8 : Generator Problem
unit8 =
    Random.int 0 4
        |> Random.andThen
            (\t ->
                case t of
                    0 -> genMean
                    1 -> genMedian
                    2 -> genRange
                    3 -> genIQR
                    _ -> genMAD
            )


genMean : Generator Problem
genMean =
    Random.map4 (\a b c d -> [ a, b, c, d ])
        (randInt 1 20) (randInt 1 20) (randInt 1 20) (randInt 1 20)
        |> Random.andThen
            (\nums ->
                let
                    s = List.sum nums
                    n = List.length nums
                    correct = s // n
                in
                wrongChoicesInt correct
                    |> Random.map
                        (\wrong ->
                            let
                                numStr = String.join ", " (List.map String.fromInt nums)
                                choices = shuffleChoices (String.fromInt correct) wrong
                            in
                            { prompt = "Mean of {" ++ numStr ++ "}?"
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "Mean of {" ++ numStr ++ "}?"
                                , answer = String.fromInt correct
                                , steps =
                                    [ "Add all: " ++ String.join " + " (List.map String.fromInt nums) ++ " = " ++ String.fromInt s
                                    , "Divide by " ++ String.fromInt n ++ ": " ++ String.fromInt s ++ " / " ++ String.fromInt n ++ " = " ++ String.fromInt correct
                                    ]
                                }
                            }
                        )
            )


genMedian : Generator Problem
genMedian =
    Random.map4 (\a b c d -> List.sort [ a, b, c, d ])
        (randInt 1 20) (randInt 1 20) (randInt 1 20) (randInt 1 20)
        |> Random.andThen
            (\sorted ->
                let
                    mid1 = List.drop 1 sorted |> List.head |> Maybe.withDefault 0
                    mid2 = List.drop 2 sorted |> List.head |> Maybe.withDefault 0
                    correct = (mid1 + mid2) // 2
                in
                wrongChoicesInt correct
                    |> Random.map
                        (\wrong ->
                            let
                                numStr = String.join ", " (List.map String.fromInt sorted)
                                choices = shuffleChoices (String.fromInt correct) wrong
                            in
                            { prompt = "Median of {" ++ numStr ++ "}?"
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "Median of {" ++ numStr ++ "}?"
                                , answer = String.fromInt correct
                                , steps =
                                    [ "Sorted: " ++ String.join ", " (List.map String.fromInt sorted)
                                    , "Even count — average the two middle values"
                                    , "(" ++ String.fromInt mid1 ++ " + " ++ String.fromInt mid2 ++ ") / 2 = " ++ String.fromInt correct
                                    ]
                                }
                            }
                        )
            )


genRange : Generator Problem
genRange =
    Random.map4 (\a b c d -> [ a, b, c, d ])
        (randInt 1 20) (randInt 1 20) (randInt 1 20) (randInt 1 20)
        |> Random.andThen
            (\nums ->
                let
                    mn = List.minimum nums |> Maybe.withDefault 0
                    mx = List.maximum nums |> Maybe.withDefault 0
                    correct = mx - mn
                in
                wrongChoicesInt correct
                    |> Random.map
                        (\wrong ->
                            let
                                numStr = String.join ", " (List.map String.fromInt nums)
                                choices = shuffleChoices (String.fromInt correct) wrong
                            in
                            { prompt = "Range of {" ++ numStr ++ "}?"
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "Range of {" ++ numStr ++ "}?"
                                , answer = String.fromInt correct
                                , steps =
                                    [ "Maximum: " ++ String.fromInt mx
                                    , "Minimum: " ++ String.fromInt mn
                                    , "Range = " ++ String.fromInt mx ++ " − " ++ String.fromInt mn ++ " = " ++ String.fromInt correct
                                    ]
                                }
                            }
                        )
            )


-- QUEST DISPATCHER
-- Routes (unitNum, questIndex) to the appropriate generator.
-- questIndex = -1 means boss battle (use full unit mix).


generatorForQuest : Int -> Int -> Int -> Generator Problem
generatorForQuest unitNum questIndex variant =
    case ( unitNum, questIndex ) of
        -- Unit 1 (13 quests, indices 0–12)
        ( 1, 0 )  -> pickGen variant genPlaceValue [ genPlaceValue, genRounding ]
        ( 1, 1 )  -> genAddSub
        ( 1, 2 )  -> genMulDiv
        ( 1, 3 )  -> genDivisibility
        ( 1, 4 )  -> genWholeNumApp
        ( 1, 5 )  -> genExponent
        ( 1, 6 )  -> genPerfectSquare
        ( 1, 7 )  -> genPerfectCube
        ( 1, 8 )  -> genOrderOfOps
        ( 1, 9 )  -> genProperties
        ( 1, 10 ) -> pickGen variant genPrimeFact [ genPrimeFact, genPrimeComposite ]
        ( 1, 11 ) -> pickGen variant genGcf [ genGcf, genLcm ]
        ( 1, 12 ) -> genGcfLcmApp
        -- Unit 2 (8 quests, indices 0–7)
        ( 2, 0 ) -> genIntCompare
        ( 2, 1 ) -> genIntAdd
        ( 2, 2 ) -> genIntSub
        ( 2, 3 ) -> genIntMul
        ( 2, 4 ) -> genIntDiv
        ( 2, 5 ) -> genIntApp
        ( 2, 6 ) -> genIntOrderOfOps
        ( 2, 7 ) -> genCoordinatePlane
        -- Unit 3 (14 quests, indices 0–13)
        ( 3, 0 )  -> genSimplifyFrac
        ( 3, 1 )  -> genEquivFrac
        ( 3, 2 )  -> genFracAdd
        ( 3, 3 )  -> genFracAddUnlike
        ( 3, 4 )  -> genFracSub
        ( 3, 5 )  -> genFracMul
        ( 3, 6 )  -> genFracDiv
        ( 3, 7 )  -> genFracApp
        ( 3, 8 )  -> genDecRound
        ( 3, 9 )  -> pickGen variant genDecAdd [ genDecAdd, genDecSub ]
        ( 3, 10 ) -> genDecMul
        ( 3, 11 ) -> genDecDivWhole
        ( 3, 12 ) -> genDecDiv
        ( 3, 13 ) -> genNegRational
        -- Unit 4 (8 quests, indices 0–7)
        ( 4, 0 ) -> genVarExpr
        ( 4, 1 ) -> pickGen variant genEvalLinear [ genEvalLinear, genEvalTwoVar ]
        ( 4, 2 ) -> genCombineLike
        ( 4, 3 ) -> genDistributive
        ( 4, 4 ) -> genTranslateExpr
        ( 4, 5 ) -> genSimplifyExpr
        ( 4, 6 ) -> genFactorExpr
        ( 4, 7 ) -> genAlgProperties
        -- Unit 5 (7 quests, indices 0–6)
        ( 5, 0 ) -> genSolveAdd
        ( 5, 1 ) -> genSolveMul
        ( 5, 2 ) -> genTwoStep
        ( 5, 3 ) -> genInequality
        ( 5, 4 ) -> genWriteEquation
        ( 5, 5 ) -> genInequalitySolution
        ( 5, 6 ) -> genSolveInequality
        -- Unit 6 (7 quests, indices 0–6)
        ( 6, 0 ) -> genRatio
        ( 6, 1 ) -> genEquivRatio
        ( 6, 2 ) -> genUnitRate
        ( 6, 3 ) -> genMissingProportion
        ( 6, 4 ) -> genConvertFDP
        ( 6, 5 ) -> genPercent
        ( 6, 6 ) -> genPercentOfNum
        -- Unit 7 (7 quests, indices 0–6)
        ( 7, 0 ) -> genPerimeter
        ( 7, 1 ) -> genAreaRect
        ( 7, 2 ) -> genAreaTriangle
        ( 7, 3 ) -> genAreaTrapezoid
        ( 7, 4 ) -> genCircumference
        ( 7, 5 ) -> genSurfaceArea
        ( 7, 6 ) -> genVolumeBox
        -- Unit 8 (6 quests, indices 0–5)
        ( 8, 0 ) -> genMean
        ( 8, 1 ) -> genMedian
        ( 8, 2 ) -> genRange
        ( 8, 3 ) -> genMean  -- Interpreting Graphs uses mean for now
        ( 8, 4 ) -> genIQR
        ( 8, 5 ) -> genMAD
        ( 8, _ ) -> genMean
        -- fallback to full unit mix
        _ -> generatorFor unitNum


-- NEW GENERATORS FOR MISSING QUESTS


genPlaceValue : Generator Problem
genPlaceValue =
    Random.map3 (\h t o -> h * 100 + t * 10 + o)
        (randInt 1 9) (randInt 0 9) (randInt 0 9)
        |> Random.andThen
            (\n ->
                randChoice [ "ones", "tens", "hundreds" ] "tens"
                    |> Random.andThen
                        (\place ->
                            let
                                correct =
                                    case place of
                                        "ones"     -> modBy 10 n
                                        "tens"     -> modBy 10 (n // 10)
                                        _          -> n // 100
                                wrong = List.filter (\d -> d /= correct)
                                    [ modBy 10 n, modBy 10 (n // 10), n // 100 ]
                                    |> List.take 3
                                    |> List.map String.fromInt
                                choices = shuffleChoices (String.fromInt correct) wrong
                            in
                            Random.constant
                                { prompt = "What digit is in the " ++ place ++ " place of " ++ String.fromInt n ++ "?"
                                , inputType = TChoice choices
                                , answer = AChoice 0
                                , hint =
                                    { prompt = "What digit is in the " ++ place ++ " place of " ++ String.fromInt n ++ "?"
                                    , answer = String.fromInt correct
                                    , steps =
                                        [ String.fromInt n ++ " → ones=" ++ String.fromInt (modBy 10 n) ++ ", tens=" ++ String.fromInt (modBy 10 (n // 10)) ++ ", hundreds=" ++ String.fromInt (n // 100)
                                        , "The " ++ place ++ " digit is " ++ String.fromInt correct
                                        ]
                                    }
                                }
                        )
            )


genRounding : Generator Problem
genRounding =
    Random.map2 Tuple.pair (randInt 10 99) (randChoice [ 10, 100 ] 10)
        |> Random.andThen
            (\( n, roundTo ) ->
                let
                    actual = if roundTo == 10 then n else n * 10
                    rounded =
                        if roundTo == 10 then
                            (actual + 5) // 10 * 10
                        else
                            (actual + 50) // 100 * 100
                    placeStr = if roundTo == 10 then "ten" else "hundred"
                in
                wrongChoicesInt rounded
                    |> Random.map
                        (\wrong ->
                            let choices = shuffleChoices (String.fromInt rounded) wrong in
                            { prompt = "Round " ++ String.fromInt actual ++ " to the nearest " ++ placeStr ++ "."
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                let lookAt = if roundTo == 10 then modBy 10 actual else modBy 10 (actual // 10) in
                                { prompt = "Round " ++ String.fromInt actual ++ " to the nearest " ++ placeStr ++ "."
                                , answer = String.fromInt rounded
                                , steps =
                                    [ "Look at the " ++ (if roundTo == 10 then "ones" else "tens") ++ " digit: " ++ String.fromInt lookAt
                                    , if lookAt >= 5 then "≥ 5, so round up" else "< 5, so round down"
                                    , "Answer: " ++ String.fromInt rounded
                                    ]
                                }
                            }
                        )
            )


genMulDiv : Generator Problem
genMulDiv =
    Random.int 0 1
        |> Random.andThen
            (\op ->
                if op == 0 then
                    Random.map2 Tuple.pair (randInt 2 12) (randInt 2 12)
                        |> Random.andThen
                            (\( a, b ) ->
                                wrongChoicesInt (a * b)
                                    |> Random.map
                                        (\wrong ->
                                            let choices = shuffleChoices (String.fromInt (a * b)) wrong in
                                            { prompt = String.fromInt a ++ " × " ++ String.fromInt b ++ " = ?"
                                            , inputType = TChoice choices
                                            , answer = AChoice 0
                                            , hint =
                                                { prompt = String.fromInt a ++ " × " ++ String.fromInt b ++ " = ?"
                                                , answer = String.fromInt (a * b)
                                                , steps = [ "Count by " ++ String.fromInt a ++ "s up to " ++ String.fromInt b ++ " groups", String.fromInt a ++ " × " ++ String.fromInt b ++ " = " ++ String.fromInt (a * b) ]
                                                }
                                            }
                                        )
                            )
                else
                    Random.map2 Tuple.pair (randInt 2 9) (randInt 2 12)
                        |> Random.andThen
                            (\( b, q ) ->
                                let a = b * q in
                                wrongChoicesInt q
                                    |> Random.map
                                        (\wrong ->
                                            let choices = shuffleChoices (String.fromInt q) wrong in
                                            { prompt = String.fromInt a ++ " / " ++ String.fromInt b ++ " = ?"
                                            , inputType = TChoice choices
                                            , answer = AChoice 0
                                            , hint =
                                                { prompt = String.fromInt a ++ " / " ++ String.fromInt b ++ " = ?"
                                                , answer = String.fromInt q
                                                , steps = [ "Ask: " ++ String.fromInt b ++ " × ? = " ++ String.fromInt a, String.fromInt b ++ " × " ++ String.fromInt q ++ " = " ++ String.fromInt a ++ ", so answer is " ++ String.fromInt q ]
                                                }
                                            }
                                        )
                            )
            )


genDivisibility : Generator Problem
genDivisibility =
    randChoice [ 2, 3, 5, 9, 10 ] 2
        |> Random.andThen
            (\divisor ->
                randInt 10 99
                    |> Random.andThen
                        (\base ->
                            Random.int 0 1
                                |> Random.map
                                    (\flip ->
                                        let
                                            n = if flip == 0 then base * divisor else base * divisor + 1
                                            isDivisible = modBy divisor n == 0
                                            correct = if isDivisible then "Yes" else "No"
                                            wrong = if isDivisible then [ "No" ] else [ "Yes" ]
                                            choices = shuffleChoices correct wrong
                                        in
                                        { prompt = "Is " ++ String.fromInt n ++ " divisible by " ++ String.fromInt divisor ++ "?"
                                        , inputType = TChoice choices
                                        , answer = AChoice 0
                                        , hint =
                                            { prompt = "Is " ++ String.fromInt n ++ " divisible by " ++ String.fromInt divisor ++ "?"
                                            , answer = correct
                                            , steps =
                                                [ "Check: " ++ String.fromInt n ++ " / " ++ String.fromInt divisor ++ " = " ++ String.fromFloat (toFloat n / toFloat divisor)
                                                , if isDivisible then "No remainder, so " ++ String.fromInt n ++ " is divisible by " ++ String.fromInt divisor else "Has a remainder, so " ++ String.fromInt n ++ " is not divisible by " ++ String.fromInt divisor
                                                , "Answer: " ++ correct
                                                ]
                                            }
                                        }
                                    )
                        )
            )


genProperties : Generator Problem
genProperties =
    Random.int 0 2
        |> Random.map
            (\t ->
                case t of
                    0 ->
                        { prompt = "Which property: a + b = b + a?"
                        , inputType = TChoice [ "Commutative", "Associative", "Distributive", "Identity" ]
                        , answer = AChoice 0
                        , hint =
                            { prompt = "Which property: 3 + 5 = 5 + 3?"
                            , answer = "Commutative"
                            , steps = [ "When you swap the order and get the same result, that's the Commutative Property" ]
                            }
                        }
                    1 ->
                        { prompt = "Which property: (a + b) + c = a + (b + c)?"
                        , inputType = TChoice [ "Associative", "Commutative", "Distributive", "Identity" ]
                        , answer = AChoice 0
                        , hint =
                            { prompt = "Which property: (2 + 3) + 4 = 2 + (3 + 4)?"
                            , answer = "Associative"
                            , steps = [ "When you regroup without changing order and get the same result, that's the Associative Property" ]
                            }
                        }
                    _ ->
                        { prompt = "Which property: a(b + c) = ab + ac?"
                        , inputType = TChoice [ "Distributive", "Commutative", "Associative", "Identity" ]
                        , answer = AChoice 0
                        , hint =
                            { prompt = "Which property: 3(4 + 5) = 3×4 + 3×5?"
                            , answer = "Distributive"
                            , steps = [ "Multiply the outside number by each term inside the parentheses — that's the Distributive Property" ]
                            }
                        }
            )


genPrimeComposite : Generator Problem
genPrimeComposite =
    randChoice [ 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 17, 19, 20, 23 ] 7
        |> Random.map
            (\n ->
                let
                    isPrime = List.all (\d -> modBy d n /= 0) (List.range 2 (n - 1))
                    correct = if isPrime then "Prime" else "Composite"
                    wrong = if isPrime then [ "Composite" ] else [ "Prime" ]
                    choices = shuffleChoices correct wrong
                in
                { prompt = "Is " ++ String.fromInt n ++ " prime or composite?"
                , inputType = TChoice choices
                , answer = AChoice 0
                , hint =
                    { prompt = "Is " ++ String.fromInt n ++ " prime or composite?"
                    , answer = correct
                    , steps =
                        if isPrime then
                            [ "A prime number has exactly 2 factors: 1 and itself"
                            , String.fromInt n ++ " is only divisible by 1 and " ++ String.fromInt n
                            , "So " ++ String.fromInt n ++ " is prime"
                            ]
                        else
                            [ "A composite number has more than 2 factors"
                            , "Factors of " ++ String.fromInt n ++ ": " ++ String.join ", " (List.map String.fromInt (factorsOf n))
                            , "So " ++ String.fromInt n ++ " is composite"
                            ]
                    }
                }
            )


genPrimeFact : Generator Problem
genPrimeFact =
    randChoice [ 6, 8, 9, 10, 12, 14, 15, 18, 20, 21, 22, 25 ] 12
        |> Random.map
            (\n ->
                let
                    factStr num =
                        primeFactors num
                            |> groupFactors
                            |> List.map (\( p, e ) ->
                                if e == 1 then String.fromInt p
                                else String.fromInt p ++ superscript e)
                            |> String.join " × "
                    correct = factStr n
                    wrongs =
                        [ factStr (n + 2)
                        , String.fromInt (n // 2) ++ " × 2"
                        , String.fromInt (n + 1)
                        ]
                    choices = shuffleChoices correct (List.take 3 wrongs)
                in
                { prompt = "Prime factorization of " ++ String.fromInt n ++ "?"
                , inputType = TChoice choices
                , answer = AChoice 0
                , hint =
                    { prompt = "Prime factorization of " ++ String.fromInt n ++ "?"
                    , answer = correct
                    , steps =
                        let factors = primeFactors n in
                        [ "Divide by smallest prime factors of " ++ String.fromInt n
                        , "Prime factors: " ++ String.join " × " (List.map String.fromInt factors)
                        , "Answer: " ++ correct
                        ]
                    }
                }
            )


primeFactors : Int -> List Int
primeFactors n =
    primeFactorsHelper n 2 []


primeFactorsHelper : Int -> Int -> List Int -> List Int
primeFactorsHelper n d acc =
    if n <= 1 then
        List.reverse acc
    else if modBy d n == 0 then
        primeFactorsHelper (n // d) d (d :: acc)
    else
        primeFactorsHelper n (d + 1) acc


groupFactors : List Int -> List ( Int, Int )
groupFactors fs =
    List.foldl
        (\f acc ->
            case acc of
                [] -> [ ( f, 1 ) ]
                ( p, e ) :: rest ->
                    if p == f then ( p, e + 1 ) :: rest
                    else ( f, 1 ) :: acc
        )
        []
        fs
        |> List.reverse


genIntCompare : Generator Problem
genIntCompare =
    Random.map2 Tuple.pair (randInt -20 20) (randInt -20 20)
        |> Random.andThen
            (\( a, b ) ->
                if a == b then
                    let bigger2 = b + 1 in
                    Random.constant { prompt = "Which is greater: " ++ showSigned a ++ " or " ++ showSigned bigger2 ++ "?"
                    , inputType = TChoice [ showSigned bigger2, showSigned a ]
                    , answer = AChoice 0
                    , hint =
                        { prompt = "Which is greater: " ++ showSigned a ++ " or " ++ showSigned bigger2 ++ "?"
                        , answer = showSigned bigger2
                        , steps = [ "On a number line, numbers to the right are greater", showSigned bigger2 ++ " is to the right of " ++ showSigned a ++ ", so " ++ showSigned bigger2 ++ " > " ++ showSigned a ]
                        }
                    }
                else
                    let
                        bigger = max a b
                        smaller = min a b
                        choices = shuffleChoices (showSigned bigger) [ showSigned smaller ]
                    in
                    Random.constant
                        { prompt = "Which is greater: " ++ showSigned a ++ " or " ++ showSigned b ++ "?"
                        , inputType = TChoice choices
                        , answer = AChoice 0
                        , hint =
                            { prompt = "Which is greater: " ++ showSigned a ++ " or " ++ showSigned b ++ "?"
                            , answer = showSigned bigger
                            , steps = [ "On a number line, numbers to the right are greater", showSigned bigger ++ " is to the right of " ++ showSigned smaller ++ ", so " ++ showSigned bigger ++ " > " ++ showSigned smaller ]
                            }
                        }
            )


genFracDiv : Generator Problem
genFracDiv =
    Random.map2 Tuple.pair
        (Random.map2 Tuple.pair (randInt 1 6) (randInt 2 8))
        (Random.map2 Tuple.pair (randInt 1 6) (randInt 2 8))
        |> Random.map
            (\( ( n1, d1 ), ( n2, d2 ) ) ->
                let
                    ( rn, rd ) = reduceFraction (n1 * d2) (d1 * n2)
                in
                { prompt = showFrac n1 d1 ++ " / " ++ showFrac n2 d2 ++ " = ?"
                , inputType = TFraction
                , answer = AFraction rn rd
                , hint =
                    { prompt = showFrac n1 d1 ++ " / " ++ showFrac n2 d2 ++ " = ?"
                    , answer = showFrac rn rd
                    , steps =
                        [ "Keep, Change, Flip: keep the first fraction, change / to ×, flip the second"
                        , showFrac n1 d1 ++ " × " ++ showFrac d2 n2
                        , "Multiply: (" ++ String.fromInt n1 ++ "×" ++ String.fromInt d2 ++ ")/(" ++ String.fromInt d1 ++ "×" ++ String.fromInt n2 ++ ") = " ++ showFrac (n1 * d2) (d1 * n2)
                        , "Simplify: " ++ showFrac rn rd
                        ]
                    }
                }
            )


genDecSub : Generator Problem
genDecSub =
    Random.map2 Tuple.pair (randInt 11 99) (randInt 10 99)
        |> Random.map
            (\( a, b ) ->
                let
                    big = max a b
                    small = min a b
                    fa = toFloat big / 10.0
                    fb = toFloat small / 10.0
                    correct = fa - fb
                in
                { prompt = String.fromFloat fa ++ " - " ++ String.fromFloat fb ++ " = ?"
                , inputType = TDecimal
                , answer = AFloat correct 0.01
                , hint =
                    { prompt = String.fromFloat fa ++ " - " ++ String.fromFloat fb ++ " = ?"
                    , answer = String.fromFloat correct
                    , steps =
                        [ "Line up the decimal points"
                        , "Subtract as whole numbers: " ++ String.fromInt big ++ " - " ++ String.fromInt small ++ " = " ++ String.fromInt (big - small)
                        , "Place the decimal: " ++ String.fromFloat correct
                        ]
                    }
                }
            )


genDecDiv : Generator Problem
genDecDiv =
    Random.map2 Tuple.pair (randInt 2 9) (randInt 1 9)
        |> Random.map
            (\( divisor, quotient ) ->
                let
                    dividend = toFloat (divisor * quotient) / 10.0
                in
                { prompt = String.fromFloat dividend ++ " / " ++ String.fromInt divisor ++ " = ?"
                , inputType = TDecimal
                , answer = AFloat (toFloat quotient / 10.0) 0.01
                , hint =
                    { prompt = String.fromFloat dividend ++ " / " ++ String.fromInt divisor ++ " = ?"
                    , answer = String.fromFloat (toFloat quotient / 10.0)
                    , steps =
                        [ "Divide ignoring the decimal: " ++ String.fromInt (divisor * quotient) ++ " / " ++ String.fromInt divisor ++ " = " ++ String.fromInt quotient
                        , "Place the decimal: " ++ String.fromFloat (toFloat quotient / 10.0)
                        ]
                    }
                }
            )


genVarExpr : Generator Problem
genVarExpr =
    Random.map2 Tuple.pair (randInt 2 9) (randInt 1 9)
        |> Random.andThen
            (\( a, x ) ->
                wrongChoicesInt (a * x)
                    |> Random.map
                        (\wrong ->
                            let
                                correct = a * x
                                choices = shuffleChoices (String.fromInt correct) wrong
                            in
                            { prompt = "Evaluate " ++ String.fromInt a ++ "x when x = " ++ String.fromInt x
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "Evaluate " ++ String.fromInt a ++ "x when x = " ++ String.fromInt x
                                , answer = String.fromInt correct
                                , steps =
                                    [ String.fromInt a ++ "x means " ++ String.fromInt a ++ " times x"
                                    , "Replace x with " ++ String.fromInt x ++ ": " ++ String.fromInt a ++ " × " ++ String.fromInt x ++ " = " ++ String.fromInt correct
                                    ]
                                }
                            }
                        )
            )


genDistributive : Generator Problem
genDistributive =
    Random.map3 (\a b c -> ( a, b, c )) (randInt 2 8) (randInt 1 8) (randInt 1 8)
        |> Random.andThen
            (\( a, b, c ) ->
                let correct = a * b + a * c in
                wrongChoicesInt correct
                    |> Random.map
                        (\wrong ->
                            let choices = shuffleChoices (String.fromInt correct) wrong in
                            { prompt = "Expand: " ++ String.fromInt a ++ "(" ++ String.fromInt b ++ " + " ++ String.fromInt c ++ ")"
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "Expand: " ++ String.fromInt a ++ "(" ++ String.fromInt b ++ " + " ++ String.fromInt c ++ ")"
                                , answer = String.fromInt correct
                                , steps =
                                    [ "Multiply " ++ String.fromInt a ++ " by each term: " ++ String.fromInt a ++ "×" ++ String.fromInt b ++ " + " ++ String.fromInt a ++ "×" ++ String.fromInt c
                                    , "= " ++ String.fromInt (a * b) ++ " + " ++ String.fromInt (a * c)
                                    , "= " ++ String.fromInt correct
                                    ]
                                }
                            }
                        )
            )


genTwoStep : Generator Problem
genTwoStep =
    Random.map3 (\a b x -> ( a, b, x )) (randInt 2 6) (randInt 1 9) (randInt 1 9)
        |> Random.map
            (\( a, b, x ) ->
                let c = a * x + b in
                { prompt = "Solve: " ++ String.fromInt a ++ "x + " ++ String.fromInt b ++ " = " ++ String.fromInt c
                , inputType = TInteger
                , answer = AInt x
                , hint =
                    { prompt = "Solve: " ++ String.fromInt a ++ "x + " ++ String.fromInt b ++ " = " ++ String.fromInt c
                    , answer = String.fromInt x
                    , steps =
                        [ "Step 1: Subtract " ++ String.fromInt b ++ " from both sides: " ++ String.fromInt a ++ "x = " ++ String.fromInt (c - b)
                        , "Step 2: Divide both sides by " ++ String.fromInt a ++ ": x = " ++ String.fromInt x
                        ]
                    }
                }
            )


genRatio : Generator Problem
genRatio =
    Random.map2 Tuple.pair (randInt 2 6) (randInt 2 6)
        |> Random.andThen
            (\( k, a ) ->
                randInt 2 5
                    |> Random.andThen
                        (\b ->
                            let
                                n = k * a
                                d = k * b
                                ( rn, rd ) = reduceFraction n d
                            in
                            wrongChoicesInt rn
                                |> Random.map
                                    (\wrong ->
                                        let
                                            choices = shuffleChoices
                                                (String.fromInt rn ++ ":" ++ String.fromInt rd)
                                                (List.map (\w -> w ++ ":" ++ String.fromInt rd) wrong)
                                        in
                                        { prompt = "Simplify the ratio " ++ String.fromInt n ++ ":" ++ String.fromInt d
                                        , inputType = TChoice choices
                                        , answer = AChoice 0
                                        , hint =
                                            { prompt = "Simplify the ratio " ++ String.fromInt n ++ ":" ++ String.fromInt d
                                            , answer = String.fromInt rn ++ ":" ++ String.fromInt rd
                                            , steps =
                                                [ "Find the GCF of " ++ String.fromInt n ++ " and " ++ String.fromInt d ++ ": GCF = " ++ String.fromInt k
                                                , "Divide both by " ++ String.fromInt k ++ ": " ++ String.fromInt n ++ "/" ++ String.fromInt k ++ " = " ++ String.fromInt rn ++ ", " ++ String.fromInt d ++ "/" ++ String.fromInt k ++ " = " ++ String.fromInt rd
                                                , "Simplified ratio: " ++ String.fromInt rn ++ ":" ++ String.fromInt rd
                                                ]
                                            }
                                        }
                                    )
                        )
            )


-- UNIT 1 NEW GENERATORS


genWholeNumApp : Generator Problem
genWholeNumApp =
    Random.int 0 2
        |> Random.andThen
            (\t ->
                case t of
                    0 ->
                        -- Division word problem
                        Random.map2 Tuple.pair (randInt 2 8) (randInt 2 9)
                            |> Random.map
                                (\( bags, perBag ) ->
                                    let total = bags * perBag in
                                    { prompt = "A store has " ++ String.fromInt total ++ " apples split into " ++ String.fromInt bags ++ " equal bags. How many apples per bag?"
                                    , inputType = TInteger
                                    , answer = AInt perBag
                                    , hint =
                                        { prompt = String.fromInt total ++ " apples split into " ++ String.fromInt bags ++ " equal bags. How many per bag?"
                                        , answer = String.fromInt perBag
                                        , steps =
                                            [ "Divide total by number of bags"
                                            , String.fromInt total ++ " / " ++ String.fromInt bags ++ " = " ++ String.fromInt perBag
                                            ]
                                        }
                                    }
                                )

                    1 ->
                        -- Multiplication word problem
                        Random.map2 Tuple.pair (randInt 3 9) (randInt 4 12)
                            |> Random.map
                                (\( rows, cols ) ->
                                    let total = rows * cols in
                                    { prompt = "A garden has " ++ String.fromInt rows ++ " rows of plants with " ++ String.fromInt cols ++ " plants each. How many plants total?"
                                    , inputType = TInteger
                                    , answer = AInt total
                                    , hint =
                                        { prompt = String.fromInt rows ++ " rows, " ++ String.fromInt cols ++ " plants each. Total?"
                                        , answer = String.fromInt total
                                        , steps =
                                            [ "Multiply rows by plants per row"
                                            , String.fromInt rows ++ " × " ++ String.fromInt cols ++ " = " ++ String.fromInt total
                                            ]
                                        }
                                    }
                                )

                    _ ->
                        -- Addition word problem
                        Random.map2 Tuple.pair (randInt 10 99) (randInt 10 99)
                            |> Random.map
                                (\( a, b ) ->
                                    { prompt = "A knight earns " ++ String.fromInt a ++ " gold coins on Monday and " ++ String.fromInt b ++ " gold coins on Tuesday. How many total?"
                                    , inputType = TInteger
                                    , answer = AInt (a + b)
                                    , hint =
                                        { prompt = "Earns " ++ String.fromInt a ++ " on Monday and " ++ String.fromInt b ++ " on Tuesday. Total?"
                                        , answer = String.fromInt (a + b)
                                        , steps =
                                            [ "Add the two amounts"
                                            , String.fromInt a ++ " + " ++ String.fromInt b ++ " = " ++ String.fromInt (a + b)
                                            ]
                                        }
                                    }
                                )
            )


genPerfectSquare : Generator Problem
genPerfectSquare =
    randInt 2 12
        |> Random.andThen
            (\base ->
                wrongChoicesInt (base * base)
                    |> Random.map
                        (\wrong ->
                            let
                                correct = base * base
                                choices = shuffleChoices (String.fromInt correct) wrong
                            in
                            { prompt = "What is " ++ String.fromInt base ++ superscript 2 ++ "? (perfect square)"
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "What is " ++ String.fromInt base ++ superscript 2 ++ "? (perfect square)"
                                , answer = String.fromInt correct
                                , steps =
                                    [ "A perfect square is a number times itself"
                                    , String.fromInt base ++ "² = " ++ String.fromInt base ++ " × " ++ String.fromInt base ++ " = " ++ String.fromInt correct
                                    ]
                                }
                            }
                        )
            )


genPerfectCube : Generator Problem
genPerfectCube =
    randInt 2 5
        |> Random.andThen
            (\base ->
                wrongChoicesInt (base * base * base)
                    |> Random.map
                        (\wrong ->
                            let
                                correct = base * base * base
                                choices = shuffleChoices (String.fromInt correct) wrong
                            in
                            { prompt = "What is " ++ String.fromInt base ++ superscript 3 ++ "? (perfect cube)"
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "What is " ++ String.fromInt base ++ superscript 3 ++ "? (perfect cube)"
                                , answer = String.fromInt correct
                                , steps =
                                    [ "A perfect cube is a number times itself three times"
                                    , String.fromInt base ++ "³ = " ++ String.fromInt base ++ " × " ++ String.fromInt base ++ " × " ++ String.fromInt base ++ " = " ++ String.fromInt correct
                                    ]
                                }
                            }
                        )
            )


genGcfLcmApp : Generator Problem
genGcfLcmApp =
    Random.int 0 1
        |> Random.andThen
            (\t ->
                case t of
                    0 ->
                        -- LCM application: packs of items
                        Random.map2 Tuple.pair (randChoice [ 6, 8, 10, 12 ] 8) (randChoice [ 4, 6, 9, 10 ] 6)
                            |> Random.map
                                (\( packA, packB ) ->
                                    let answer = lcm packA packB in
                                    { prompt = "Hot dogs come in packs of " ++ String.fromInt packA ++ ", buns in packs of " ++ String.fromInt packB ++ ". What is the least number of each you need to buy to have equal amounts?"
                                    , inputType = TInteger
                                    , answer = AInt answer
                                    , hint =
                                        { prompt = "Hot dogs: packs of " ++ String.fromInt packA ++ ", buns: packs of " ++ String.fromInt packB ++ ". Least equal amount?"
                                        , answer = String.fromInt answer
                                        , steps =
                                            [ "Find LCM of " ++ String.fromInt packA ++ " and " ++ String.fromInt packB
                                            , "Multiples of " ++ String.fromInt packA ++ ": " ++ String.join ", " (List.map String.fromInt (multiplesUpTo packA (answer * 2))) ++ "..."
                                            , "Multiples of " ++ String.fromInt packB ++ ": " ++ String.join ", " (List.map String.fromInt (multiplesUpTo packB (answer * 2))) ++ "..."
                                            , "LCM = " ++ String.fromInt answer
                                            ]
                                        }
                                    }
                                )

                    _ ->
                        -- GCF application: splitting into groups
                        Random.map2 Tuple.pair (randInt 2 6) (randInt 2 6)
                            |> Random.map
                                (\( ga, gb ) ->
                                    let
                                        a = ga * 4
                                        b = gb * 6
                                        answer = gcd a b
                                    in
                                    { prompt = "A teacher has " ++ String.fromInt a ++ " pencils and " ++ String.fromInt b ++ " erasers. What is the greatest number of equal groups she can make with no leftovers?"
                                    , inputType = TInteger
                                    , answer = AInt answer
                                    , hint =
                                        { prompt = String.fromInt a ++ " pencils and " ++ String.fromInt b ++ " erasers. Greatest equal groups?"
                                        , answer = String.fromInt answer
                                        , steps =
                                            [ "Find GCF of " ++ String.fromInt a ++ " and " ++ String.fromInt b
                                            , "Factors of " ++ String.fromInt a ++ ": " ++ String.join ", " (List.map String.fromInt (factorsOf a))
                                            , "Factors of " ++ String.fromInt b ++ ": " ++ String.join ", " (List.map String.fromInt (factorsOf b))
                                            , "GCF = " ++ String.fromInt answer
                                            ]
                                        }
                                    }
                                )
            )


-- UNIT 3 NEW GENERATORS


genSimplifyFrac : Generator Problem
genSimplifyFrac =
    -- Pick a factor k and a reduced fraction (n,d), then ask to simplify k*n / k*d
    Random.map3 (\k n d -> ( k, n, d )) (randInt 2 4) (randInt 1 5) (randInt 2 6)
        |> Random.map
            (\( k, n, d ) ->
                let
                    -- ensure n < d and gcd(n,d) = 1 by brute-forcing simple pairs
                    safeD = if d <= n then n + 1 else d
                    g = gcd n safeD
                    rn = n // g
                    rd = safeD // g
                    bigN = k * rn
                    bigD = k * rd
                    ( ansN, ansD ) = reduceFraction bigN bigD
                in
                { prompt = "Simplify: " ++ showFrac bigN bigD
                , inputType = TFraction
                , answer = AFraction ansN ansD
                , hint =
                    { prompt = "Simplify: " ++ showFrac bigN bigD
                    , answer = showFrac ansN ansD
                    , steps =
                        [ "Find GCF of " ++ String.fromInt bigN ++ " and " ++ String.fromInt bigD ++ ": GCF = " ++ String.fromInt k
                        , "Divide both by " ++ String.fromInt k ++ ": " ++ String.fromInt bigN ++ "/" ++ String.fromInt k ++ "=" ++ String.fromInt ansN ++ ", " ++ String.fromInt bigD ++ "/" ++ String.fromInt k ++ "=" ++ String.fromInt ansD
                        , "Answer: " ++ showFrac ansN ansD
                        ]
                    }
                }
            )


genEquivFrac : Generator Problem
genEquivFrac =
    -- Show a/b and ask which of 4 choices is equivalent; correct is (k*a)/(k*b)
    Random.map3 (\a b k -> ( a, b, k )) (randInt 1 4) (randInt 2 6) (randInt 2 4)
        |> Random.map
            (\( a, b, k ) ->
                let
                    safeB = if b <= a then a + 1 else b
                    correct = showFrac (k * a) (k * safeB)
                    wrong1 = showFrac (k * a + 1) (k * safeB)
                    wrong2 = showFrac (k * a) (k * safeB + 1)
                    wrong3 = showFrac (k * a - 1) (k * safeB)
                    choices = shuffleChoices correct [ wrong1, wrong2, wrong3 ]
                in
                { prompt = "Which fraction is equivalent to " ++ showFrac a safeB ++ "?"
                , inputType = TChoice choices
                , answer = AChoice 0
                , hint =
                    { prompt = "Which fraction is equivalent to " ++ showFrac a safeB ++ "?"
                    , answer = correct
                    , steps =
                        [ "Multiply top and bottom by the same number"
                        , showFrac a safeB ++ " × " ++ String.fromInt k ++ "/" ++ String.fromInt k ++ " = " ++ correct
                        , "Answer: " ++ correct
                        ]
                    }
                }
            )


genFracAddUnlike : Generator Problem
genFracAddUnlike =
    -- Pick two different denominators from small set, add fractions
    randChoice [ 2, 3, 4, 5, 6 ] 3
        |> Random.andThen
            (\d1 ->
                randChoice [ 2, 3, 4, 5, 6 ] 4
                    |> Random.andThen
                        (\d2raw ->
                            let d2 = if d2raw == d1 then (if d1 == 6 then 2 else d1 + 1) else d2raw
                            in
                            Random.map2 Tuple.pair (randInt 1 (d1 - 1)) (randInt 1 (d2 - 1))
                                |> Random.map
                                    (\( n1, n2 ) ->
                                        let
                                            commonD = lcm d1 d2
                                            sumN = n1 * (commonD // d1) + n2 * (commonD // d2)
                                            ( rn, rd ) = reduceFraction sumN commonD
                                        in
                                        { prompt = showFrac n1 d1 ++ " + " ++ showFrac n2 d2 ++ " = ?"
                                        , inputType = TFraction
                                        , answer = AFraction rn rd
                                        , hint =
                                            { prompt = showFrac n1 d1 ++ " + " ++ showFrac n2 d2 ++ " = ?"
                                            , answer = showFrac rn rd
                                            , steps =
                                                [ "LCD of " ++ String.fromInt d1 ++ " and " ++ String.fromInt d2 ++ " is " ++ String.fromInt commonD
                                                , showFrac n1 d1 ++ " = " ++ showFrac (n1 * (commonD // d1)) commonD ++ "  and  " ++ showFrac n2 d2 ++ " = " ++ showFrac (n2 * (commonD // d2)) commonD
                                                , showFrac (n1 * (commonD // d1)) commonD ++ " + " ++ showFrac (n2 * (commonD // d2)) commonD ++ " = " ++ showFrac rn rd
                                                ]
                                            }
                                        }
                                    )
                        )
            )


genFracApp : Generator Problem
genFracApp =
    Random.int 0 2
        |> Random.andThen
            (\t ->
                case t of
                    0 ->
                        -- Pizza fractions
                        Random.map2 Tuple.pair (randInt 1 3) (randInt 1 3)
                            |> Random.map
                                (\( n1, n2 ) ->
                                    let
                                        d = 12
                                        ( rn, rd ) = reduceFraction (n1 + n2) d
                                    in
                                    { prompt = "You ate " ++ showFrac n1 d ++ " of a pizza and your friend ate " ++ showFrac n2 d ++ ". How much was eaten in total?"
                                    , inputType = TFraction
                                    , answer = AFraction rn rd
                                    , hint =
                                        { prompt = showFrac n1 d ++ " + " ++ showFrac n2 d ++ " = ?"
                                        , answer = showFrac rn rd
                                        , steps =
                                            [ "Same denominator: add numerators"
                                            , showFrac n1 d ++ " + " ++ showFrac n2 d ++ " = " ++ showFrac (n1 + n2) d ++ " = " ++ showFrac rn rd
                                            ]
                                        }
                                    }
                                )

                    1 ->
                        -- Remaining fraction
                        Random.map2 Tuple.pair (randInt 3 7) (randInt 1 2)
                            |> Random.map
                                (\( d, n ) ->
                                    let
                                        used = n
                                        ( rn, rd ) = reduceFraction (d - used) d
                                    in
                                    { prompt = "A rope is 1 metre long. You use " ++ showFrac used d ++ " of it. How much is left?"
                                    , inputType = TFraction
                                    , answer = AFraction rn rd
                                    , hint =
                                        { prompt = "1 whole minus " ++ showFrac used d ++ " = ?"
                                        , answer = showFrac rn rd
                                        , steps =
                                            [ "1 = " ++ showFrac d d
                                            , showFrac d d ++ " - " ++ showFrac used d ++ " = " ++ showFrac rn rd
                                            ]
                                        }
                                    }
                                )

                    _ ->
                        -- Multiply fraction of a whole
                        Random.map2 Tuple.pair (randInt 2 5) (randInt 2 4)
                            |> Random.map
                                (\( n, d ) ->
                                    let total = d * 4 in
                                    { prompt = "There are " ++ String.fromInt total ++ " students in a class. " ++ showFrac n d ++ " of them passed the test. How many students passed?"
                                    , inputType = TInteger
                                    , answer = AInt (total * n // d)
                                    , hint =
                                        { prompt = String.fromInt total ++ " students, " ++ showFrac n d ++ " passed. How many?"
                                        , answer = String.fromInt (total * n // d)
                                        , steps =
                                            [ "Multiply: " ++ String.fromInt total ++ " × " ++ showFrac n d
                                            , "= " ++ String.fromInt (total * n) ++ "/" ++ String.fromInt d ++ " = " ++ String.fromInt (total * n // d)
                                            ]
                                        }
                                    }
                                )
            )


genDecRound : Generator Problem
genDecRound =
    Random.map3 (\whole tenths hundredths -> ( whole, tenths, hundredths ))
        (randInt 1 9) (randInt 0 9) (randInt 0 9)
        |> Random.andThen
            (\( whole, tenths, hundredths ) ->
                let
                    -- round to nearest tenth
                    roundedTenths =
                        if hundredths >= 5 then
                            toFloat whole + toFloat (tenths + 1) / 10.0
                        else
                            toFloat whole + toFloat tenths / 10.0
                    numStr = String.fromInt whole ++ "." ++ String.fromInt tenths ++ String.fromInt hundredths
                in
                wrongChoicesFloat roundedTenths
                    |> Random.map
                        (\wrong ->
                            let
                                corrStr = String.fromFloat roundedTenths
                                choices = shuffleChoices corrStr wrong
                            in
                            { prompt = "Round " ++ numStr ++ " to the nearest tenth."
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "Round " ++ numStr ++ " to the nearest tenth."
                                , answer = corrStr
                                , steps =
                                    [ "Look at the hundredths digit: " ++ String.fromInt hundredths
                                    , if hundredths >= 5 then String.fromInt hundredths ++ " ≥ 5, so round the tenths digit up" else String.fromInt hundredths ++ " < 5, so keep the tenths digit"
                                    , "Answer: " ++ corrStr
                                    ]
                                }
                            }
                        )
            )


genDecDivWhole : Generator Problem
genDecDivWhole =
    -- Build answer first (1 decimal place), then multiply by small int
    Random.map2 Tuple.pair (randInt 1 9) (randInt 2 5)
        |> Random.map
            (\( quotientTenths, divisor ) ->
                let
                    quotient = toFloat quotientTenths / 10.0
                    dividend = quotient * toFloat divisor
                in
                { prompt = String.fromFloat dividend ++ " / " ++ String.fromInt divisor ++ " = ?"
                , inputType = TDecimal
                , answer = AFloat quotient 0.01
                , hint =
                    { prompt = String.fromFloat dividend ++ " / " ++ String.fromInt divisor ++ " = ?"
                    , answer = String.fromFloat quotient
                    , steps =
                        [ "Divide ignoring the decimal: " ++ String.fromInt quotientTenths ++ " × " ++ String.fromInt divisor ++ " → " ++ String.fromFloat dividend
                        , "Quotient: " ++ String.fromFloat quotient
                        ]
                    }
                }
            )


genNegRational : Generator Problem
genNegRational =
    Random.int 0 1
        |> Random.andThen
            (\t ->
                case t of
                    0 ->
                        -- Add two negative decimals
                        Random.map2 Tuple.pair (randInt 1 9) (randInt 1 9)
                            |> Random.map
                                (\( a, b ) ->
                                    let
                                        fa = -(toFloat a / 10.0)
                                        fb = -(toFloat b / 10.0)
                                        correct = fa + fb
                                    in
                                    { prompt = showSignedFloat fa ++ " + " ++ showSignedFloat fb ++ " = ?"
                                    , inputType = TDecimal
                                    , answer = AFloat correct 0.01
                                    , hint =
                                        { prompt = showSignedFloat fa ++ " + " ++ showSignedFloat fb ++ " = ?"
                                        , answer = String.fromFloat correct
                                        , steps =
                                            [ "Both are negative, so add their absolute values"
                                            , String.fromFloat (abs fa) ++ " + " ++ String.fromFloat (abs fb) ++ " = " ++ String.fromFloat (abs correct)
                                            , "Keep negative sign: " ++ String.fromFloat correct
                                            ]
                                        }
                                    }
                                )

                    _ ->
                        -- Subtract negative from positive decimal
                        Random.map2 Tuple.pair (randInt 5 15) (randInt 1 9)
                            |> Random.map
                                (\( a, b ) ->
                                    let
                                        fa = toFloat a / 10.0
                                        fb = -(toFloat b / 10.0)
                                        correct = fa + fb
                                    in
                                    { prompt = showSignedFloat fa ++ " + " ++ showSignedFloat fb ++ " = ?"
                                    , inputType = TDecimal
                                    , answer = AFloat correct 0.01
                                    , hint =
                                        { prompt = showSignedFloat fa ++ " + " ++ showSignedFloat fb ++ " = ?"
                                        , answer = String.fromFloat correct
                                        , steps =
                                            [ "Adding a negative is like subtracting"
                                            , String.fromFloat fa ++ " - " ++ String.fromFloat (abs fb) ++ " = " ++ String.fromFloat correct
                                            ]
                                        }
                                    }
                                )
            )


showSignedFloat : Float -> String
showSignedFloat f =
    if f < 0 then
        "(" ++ String.fromFloat f ++ ")"
    else
        String.fromFloat f


-- UNIT 4 NEW GENERATORS


genTranslateExpr : Generator Problem
genTranslateExpr =
    Random.int 0 2
        |> Random.map
            (\t ->
                case t of
                    0 ->
                        { prompt = "Translate: '3 more than x'"
                        , inputType = TChoice [ "x + 3", "x - 3", "3x", "3 - x" ]
                        , answer = AChoice 0
                        , hint =
                            { prompt = "Translate: '5 more than x'"
                            , answer = "x + 5"
                            , steps = [ "'More than' means addition", "x + 5" ]
                            }
                        }

                    1 ->
                        { prompt = "Translate: 'the product of 4 and y'"
                        , inputType = TChoice [ "4y", "4 + y", "y - 4", "y / 4" ]
                        , answer = AChoice 0
                        , hint =
                            { prompt = "Translate: 'product of 3 and y'"
                            , answer = "3y"
                            , steps = [ "'Product' means multiplication", "3 × y = 3y" ]
                            }
                        }

                    _ ->
                        { prompt = "Translate: 'a number divided by 5'"
                        , inputType = TChoice [ "x/5", "5x", "x - 5", "x + 5" ]
                        , answer = AChoice 0
                        , hint =
                            { prompt = "Translate: 'a number divided by 3'"
                            , answer = "x/3"
                            , steps = [ "'Divided by' means division", "x / 3 = x/3" ]
                            }
                        }
            )


genSimplifyExpr : Generator Problem
genSimplifyExpr =
    Random.map3 (\a b c -> ( a, b, c )) (randInt 1 5) (randInt 1 6) (randInt 1 6)
        |> Random.andThen
            (\( a, b, c ) ->
                -- Expression: a(x + b) + cx  →  (a + c)x + ab
                let
                    coeff = a + c
                    constant = a * b
                    correct = String.fromInt coeff ++ "x + " ++ String.fromInt constant
                    wrong1 = String.fromInt coeff ++ "x + " ++ String.fromInt (constant + 1)
                    wrong2 = String.fromInt (coeff + 1) ++ "x + " ++ String.fromInt constant
                    wrong3 = String.fromInt a ++ "x + " ++ String.fromInt constant
                    choices = shuffleChoices correct [ wrong1, wrong2, wrong3 ]
                in
                Random.constant
                    { prompt = "Simplify: " ++ String.fromInt a ++ "(x + " ++ String.fromInt b ++ ") + " ++ String.fromInt c ++ "x"
                    , inputType = TChoice choices
                    , answer = AChoice 0
                    , hint =
                        { prompt = "Simplify: " ++ String.fromInt a ++ "(x + " ++ String.fromInt b ++ ") + " ++ String.fromInt c ++ "x"
                        , answer = correct
                        , steps =
                            [ "Distribute: " ++ String.fromInt a ++ "(x+" ++ String.fromInt b ++ ") = " ++ String.fromInt a ++ "x + " ++ String.fromInt constant
                            , "Combine like terms: " ++ String.fromInt a ++ "x + " ++ String.fromInt c ++ "x = " ++ String.fromInt coeff ++ "x"
                            , "Answer: " ++ correct
                            ]
                        }
                    }
            )


genFactorExpr : Generator Problem
genFactorExpr =
    Random.map3 (\f a b -> ( f, a, b )) (randChoice [ 2, 3, 4, 5 ] 2) (randInt 1 5) (randInt 1 5)
        |> Random.map
            (\( f, a, b ) ->
                let
                    termA = f * a
                    termB = f * b
                    correct = String.fromInt f ++ "(" ++ String.fromInt a ++ "x + " ++ String.fromInt b ++ ")"
                    wrong1 = String.fromInt termA ++ "(x + " ++ String.fromInt termB ++ ")"
                    wrong2 = String.fromInt f ++ "(" ++ String.fromInt (a + 1) ++ "x + " ++ String.fromInt b ++ ")"
                    wrong3 = String.fromInt (f + 1) ++ "(" ++ String.fromInt a ++ "x + " ++ String.fromInt b ++ ")"
                    choices = shuffleChoices correct [ wrong1, wrong2, wrong3 ]
                in
                { prompt = "Factor: " ++ String.fromInt termA ++ "x + " ++ String.fromInt termB
                , inputType = TChoice choices
                , answer = AChoice 0
                , hint =
                    { prompt = "Factor: " ++ String.fromInt termA ++ "x + " ++ String.fromInt termB
                    , answer = correct
                    , steps =
                        [ "Find GCF of " ++ String.fromInt termA ++ " and " ++ String.fromInt termB ++ ": GCF = " ++ String.fromInt f
                        , "Divide each term by " ++ String.fromInt f ++ ": " ++ String.fromInt termA ++ "x/" ++ String.fromInt f ++ "=" ++ String.fromInt a ++ "x, " ++ String.fromInt termB ++ "/" ++ String.fromInt f ++ "=" ++ String.fromInt b
                        , "Answer: " ++ correct
                        ]
                    }
                }
            )


genAlgProperties : Generator Problem
genAlgProperties =
    Random.int 0 3
        |> Random.map
            (\t ->
                case t of
                    0 ->
                        { prompt = "Which property? a × 1 = a"
                        , inputType = TChoice [ "Identity", "Commutative", "Associative", "Zero" ]
                        , answer = AChoice 0
                        , hint =
                            { prompt = "Which property? 5 × 1 = 5"
                            , answer = "Identity"
                            , steps = [ "Multiplying by 1 does not change the value — that is the Identity Property" ]
                            }
                        }

                    1 ->
                        { prompt = "Which property? a + 0 = a"
                        , inputType = TChoice [ "Identity", "Inverse", "Zero", "Commutative" ]
                        , answer = AChoice 0
                        , hint =
                            { prompt = "Which property? 7 + 0 = 7"
                            , answer = "Identity"
                            , steps = [ "Adding 0 does not change the value — that is the Additive Identity Property" ]
                            }
                        }

                    2 ->
                        { prompt = "Which property? a × 0 = 0"
                        , inputType = TChoice [ "Zero Property", "Identity", "Inverse", "Commutative" ]
                        , answer = AChoice 0
                        , hint =
                            { prompt = "Which property? 9 × 0 = 0"
                            , answer = "Zero Property"
                            , steps = [ "Any number times zero equals zero — that is the Zero Property of Multiplication" ]
                            }
                        }

                    _ ->
                        { prompt = "Which property? a + (-a) = 0"
                        , inputType = TChoice [ "Inverse", "Identity", "Zero", "Distributive" ]
                        , answer = AChoice 0
                        , hint =
                            { prompt = "Which property? 5 + (-5) = 0"
                            , answer = "Inverse"
                            , steps = [ "Adding a number and its opposite gives zero — that is the Additive Inverse Property" ]
                            }
                        }
            )


-- UNIT 5 NEW GENERATORS


genWriteEquation : Generator Problem
genWriteEquation =
    Random.map2 Tuple.pair (randInt 10 30) (randInt 5 15)
        |> Random.map
            (\( total, earned ) ->
                let start = total - earned in
                { prompt = "A hero has x gold coins. After earning " ++ String.fromInt earned ++ " more, she has " ++ String.fromInt total ++ " gold. Find x."
                , inputType = TInteger
                , answer = AInt start
                , hint =
                    { prompt = "After earning " ++ String.fromInt earned ++ ", has " ++ String.fromInt total ++ ". Find starting amount."
                    , answer = String.fromInt start
                    , steps =
                        [ "Write equation: x + " ++ String.fromInt earned ++ " = " ++ String.fromInt total
                        , "Subtract " ++ String.fromInt earned ++ " from both sides"
                        , "x = " ++ String.fromInt start
                        ]
                    }
                }
            )


genInequalitySolution : Generator Problem
genInequalitySolution =
    Random.int 0 1
        |> Random.andThen
            (\dir ->
                randInt 1 8
                    |> Random.map
                        (\threshold ->
                            let
                                -- dir 0 = x > threshold, dir 1 = x < threshold
                                symbol = if dir == 0 then ">" else "<"
                                correct = if dir == 0 then threshold + 1 else threshold - 1
                                wrong1 = threshold
                                wrong2 = if dir == 0 then threshold - 1 else threshold + 1
                                wrong3 = if dir == 0 then threshold - 2 else threshold + 2
                                choices = shuffleChoices
                                    (String.fromInt correct)
                                    [ String.fromInt wrong1, String.fromInt wrong2, String.fromInt wrong3 ]
                            in
                            { prompt = "Which value satisfies x " ++ symbol ++ " " ++ String.fromInt threshold ++ "?"
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "Which value satisfies x " ++ symbol ++ " " ++ String.fromInt threshold ++ "?"
                                , answer = String.fromInt correct
                                , steps =
                                    [ "x " ++ symbol ++ " " ++ String.fromInt threshold ++ " means x must be " ++ (if dir == 0 then "greater" else "less") ++ " than " ++ String.fromInt threshold
                                    , String.fromInt correct ++ " " ++ symbol ++ " " ++ String.fromInt threshold ++ " is true; " ++ String.fromInt threshold ++ " is not"
                                    ]
                                }
                            }
                        )
            )


genSolveInequality : Generator Problem
genSolveInequality =
    Random.map2 Tuple.pair (randInt 1 9) (randInt 1 12)
        |> Random.andThen
            (\( a, x ) ->
                let b = a + x in
                Random.int 0 1
                    |> Random.map
                        (\dirN ->
                            let
                                dir = if dirN == 0 then IGt else ILt
                                dirStr = if dirN == 0 then ">" else "<"
                            in
                            { prompt = "Solve: x + " ++ String.fromInt a ++ " " ++ dirStr ++ " " ++ String.fromInt b
                            , inputType = TInequality
                            , answer = AInequality dir (toFloat x)
                            , hint =
                                { prompt = "Solve: x + " ++ String.fromInt a ++ " " ++ dirStr ++ " " ++ String.fromInt b
                                , answer = "x " ++ dirStr ++ " " ++ String.fromInt x
                                , steps =
                                    [ "Subtract " ++ String.fromInt a ++ " from both sides"
                                    , "x " ++ dirStr ++ " " ++ String.fromInt b ++ " - " ++ String.fromInt a
                                    , "x " ++ dirStr ++ " " ++ String.fromInt x
                                    ]
                                }
                            }
                        )
            )


-- UNIT 6 NEW GENERATORS


genEquivRatio : Generator Problem
genEquivRatio =
    Random.map2 Tuple.pair (randInt 2 6) (randInt 2 6)
        |> Random.andThen
            (\( a, b ) ->
                randInt 2 4
                    |> Random.andThen
                        (\k ->
                            let
                                bigA = a * k
                                bigB = b * k
                                -- Missing value in a:b = bigA:?
                                correct = bigB
                            in
                            wrongChoicesInt correct
                                |> Random.map
                                    (\wrong ->
                                        let choices = shuffleChoices (String.fromInt correct) wrong in
                                        { prompt = "Find the missing value: " ++ String.fromInt a ++ ":" ++ String.fromInt b ++ " = " ++ String.fromInt bigA ++ ":?"
                                        , inputType = TChoice choices
                                        , answer = AChoice 0
                                        , hint =
                                            { prompt = String.fromInt a ++ ":" ++ String.fromInt b ++ " = " ++ String.fromInt bigA ++ ":?"
                                            , answer = String.fromInt correct
                                            , steps =
                                                [ "Scale factor: " ++ String.fromInt bigA ++ " / " ++ String.fromInt a ++ " = " ++ String.fromInt k
                                                , "Multiply second term: " ++ String.fromInt b ++ " × " ++ String.fromInt k ++ " = " ++ String.fromInt correct
                                                ]
                                            }
                                        }
                                    )
                        )
            )


genConvertFDP : Generator Problem
genConvertFDP =
    -- Offer common fraction, ask for percent
    randChoice [ ( 1, 4, "25%" ), ( 1, 2, "50%" ), ( 3, 4, "75%" ), ( 1, 5, "20%" ), ( 2, 5, "40%" ) ] ( 1, 4, "25%" )
        |> Random.map
            (\( n, d, pct ) ->
                let
                    wrong1 = if pct == "25%" then "20%" else "25%"
                    wrong2 = if pct == "50%" then "45%" else "50%"
                    wrong3 = if pct == "75%" then "80%" else "75%"
                    choices = shuffleChoices pct [ wrong1, wrong2, wrong3 ]
                in
                { prompt = "Convert " ++ showFrac n d ++ " to a percent."
                , inputType = TChoice choices
                , answer = AChoice 0
                , hint =
                    { prompt = "Convert " ++ showFrac n d ++ " to a percent."
                    , answer = pct
                    , steps =
                        [ "Divide numerator by denominator: " ++ String.fromInt n ++ " / " ++ String.fromInt d ++ " = " ++ String.fromFloat (toFloat n / toFloat d)
                        , "Multiply by 100: " ++ String.fromFloat (toFloat n / toFloat d) ++ " × 100 = " ++ pct
                        ]
                    }
                }
            )


genPercentOfNum : Generator Problem
genPercentOfNum =
    Random.map2 Tuple.pair
        (randChoice [ 10, 20, 25, 30, 50, 75 ] 25)
        (randChoice [ 20, 40, 60, 80, 100, 120, 200 ] 80)
        |> Random.map
            (\( pct, whole ) ->
                let correct = (pct * whole) // 100 in
                { prompt = "What is " ++ String.fromInt pct ++ "% of " ++ String.fromInt whole ++ "?"
                , inputType = TInteger
                , answer = AInt correct
                , hint =
                    { prompt = "What is " ++ String.fromInt pct ++ "% of " ++ String.fromInt whole ++ "?"
                    , answer = String.fromInt correct
                    , steps =
                        [ "Convert: " ++ String.fromInt pct ++ "% = " ++ String.fromFloat (toFloat pct / 100)
                        , "Multiply: " ++ String.fromFloat (toFloat pct / 100) ++ " × " ++ String.fromInt whole ++ " = " ++ String.fromInt correct
                        ]
                    }
                }
            )


-- UNIT 7 NEW GENERATORS


genPerimeter : Generator Problem
genPerimeter =
    Random.int 0 1
        |> Random.andThen
            (\t ->
                case t of
                    0 ->
                        -- Rectangle perimeter
                        Random.map2 Tuple.pair (randInt 2 15) (randInt 2 15)
                            |> Random.map
                                (\( l, w ) ->
                                    { prompt = "Perimeter of a rectangle: length=" ++ String.fromInt l ++ ", width=" ++ String.fromInt w ++ "?"
                                    , inputType = TInteger
                                    , answer = AInt (2 * (l + w))
                                    , hint =
                                        { prompt = "Perimeter of a rectangle: length=" ++ String.fromInt l ++ ", width=" ++ String.fromInt w ++ "?"
                                        , answer = String.fromInt (2 * (l + w))
                                        , steps =
                                            [ "P = 2(length + width)"
                                            , "P = 2(" ++ String.fromInt l ++ " + " ++ String.fromInt w ++ ") = 2 × " ++ String.fromInt (l + w) ++ " = " ++ String.fromInt (2 * (l + w))
                                            ]
                                        }
                                    }
                                )

                    _ ->
                        -- Triangle perimeter (scalene)
                        Random.map3 (\a b c -> ( a, b, c )) (randInt 3 10) (randInt 3 10) (randInt 3 10)
                            |> Random.map
                                (\( a, b, c ) ->
                                    { prompt = "Perimeter of a triangle with sides " ++ String.fromInt a ++ ", " ++ String.fromInt b ++ ", " ++ String.fromInt c ++ "?"
                                    , inputType = TInteger
                                    , answer = AInt (a + b + c)
                                    , hint =
                                        { prompt = "Perimeter of a triangle with sides " ++ String.fromInt a ++ ", " ++ String.fromInt b ++ ", " ++ String.fromInt c ++ "?"
                                        , answer = String.fromInt (a + b + c)
                                        , steps =
                                            [ "P = a + b + c"
                                            , "P = " ++ String.fromInt a ++ " + " ++ String.fromInt b ++ " + " ++ String.fromInt c ++ " = " ++ String.fromInt (a + b + c)
                                            ]
                                        }
                                    }
                                )
            )


genAreaTrapezoid : Generator Problem
genAreaTrapezoid =
    -- A = ½(b1 + b2) × h; pick even sum so area is whole
    Random.map3 (\b1 b2 h -> ( b1, b2, h )) (randInt 2 8) (randInt 2 8) (randInt 2 8)
        |> Random.andThen
            (\( b1, b2, h ) ->
                let
                    sumB = b1 + b2
                    area = sumB * h // 2
                in
                wrongChoicesInt area
                    |> Random.map
                        (\wrong ->
                            let choices = shuffleChoices (String.fromInt area) wrong in
                            { prompt = "Area of trapezoid: bases=" ++ String.fromInt b1 ++ " and " ++ String.fromInt b2 ++ ", height=" ++ String.fromInt h ++ "?"
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "Area of trapezoid: bases=" ++ String.fromInt b1 ++ " and " ++ String.fromInt b2 ++ ", height=" ++ String.fromInt h ++ "?"
                                , answer = String.fromInt area
                                , steps =
                                    [ "A = ½ × (b1 + b2) × h"
                                    , "A = ½ × (" ++ String.fromInt b1 ++ " + " ++ String.fromInt b2 ++ ") × " ++ String.fromInt h
                                    , "A = ½ × " ++ String.fromInt sumB ++ " × " ++ String.fromInt h ++ " = " ++ String.fromInt area
                                    ]
                                }
                            }
                        )
            )


genSurfaceArea : Generator Problem
genSurfaceArea =
    Random.map3 (\l w h -> ( l, w, h )) (randInt 2 8) (randInt 2 8) (randInt 2 8)
        |> Random.map
            (\( l, w, h ) ->
                let sa = 2 * (l * w + l * h + w * h) in
                { prompt = "Surface area of rectangular prism: " ++ String.fromInt l ++ "×" ++ String.fromInt w ++ "×" ++ String.fromInt h ++ "?"
                , inputType = TInteger
                , answer = AInt sa
                , hint =
                    { prompt = "Surface area of rectangular prism: " ++ String.fromInt l ++ "×" ++ String.fromInt w ++ "×" ++ String.fromInt h ++ "?"
                    , answer = String.fromInt sa
                    , steps =
                        [ "SA = 2(lw + lh + wh)"
                        , "= 2(" ++ String.fromInt l ++ "×" ++ String.fromInt w ++ " + " ++ String.fromInt l ++ "×" ++ String.fromInt h ++ " + " ++ String.fromInt w ++ "×" ++ String.fromInt h ++ ")"
                        , "= 2(" ++ String.fromInt (l * w) ++ " + " ++ String.fromInt (l * h) ++ " + " ++ String.fromInt (w * h) ++ ") = " ++ String.fromInt sa
                        ]
                    }
                }
            )


-- UNIT 8 NEW GENERATORS


genIQR : Generator Problem
genIQR =
    -- Generate 8 values sorted, Q1 = avg of 2nd and 3rd (0-indexed: index 1 and 2)
    -- Q3 = avg of 6th and 7th (0-indexed: index 5 and 6)
    -- Use multiples of 2 so averages are whole numbers
    Random.map4 (\a b c d -> { a = a, b = b, c = c, d = d })
        (randInt 1 5) (randInt 6 10) (randInt 11 15) (randInt 16 20)
        |> Random.andThen
            (\r ->
                Random.map4 (\e f g h -> { e = e, f = f, g = g, h = h })
                    (randInt 1 5) (randInt 6 10) (randInt 11 15) (randInt 16 20)
                    |> Random.map
                        (\s ->
                            let
                                sorted = List.sort [ r.a, r.b, r.c, r.d, s.e, s.f, s.g, s.h ]
                                getAt i = List.drop i sorted |> List.head |> Maybe.withDefault 0
                                q1 = (getAt 1 + getAt 2) // 2
                                q3 = (getAt 5 + getAt 6) // 2
                                iqr = q3 - q1
                                numStr = String.join ", " (List.map String.fromInt sorted)
                            in
                            { prompt = "Find the IQR of: {" ++ numStr ++ "}"
                            , inputType = TInteger
                            , answer = AInt iqr
                            , hint =
                                { prompt = "Find the IQR of: {" ++ numStr ++ "}"
                                , answer = String.fromInt iqr
                                , steps =
                                    [ "Q1 = average of 2nd and 3rd values: (" ++ String.fromInt (getAt 1) ++ "+" ++ String.fromInt (getAt 2) ++ ")/2 = " ++ String.fromInt q1
                                    , "Q3 = average of 6th and 7th values: (" ++ String.fromInt (getAt 5) ++ "+" ++ String.fromInt (getAt 6) ++ ")/2 = " ++ String.fromInt q3
                                    , "IQR = Q3 - Q1 = " ++ String.fromInt q3 ++ " - " ++ String.fromInt q1 ++ " = " ++ String.fromInt iqr
                                    ]
                                }
                            }
                        )
            )


genMAD : Generator Problem
genMAD =
    -- Generate 4 values whose mean is a whole number, compute MAD
    -- Strategy: pick mean m, pick 4 deviations that sum to 0
    randInt 5 15
        |> Random.andThen
            (\m ->
                Random.map2 Tuple.pair (randInt 1 4) (randInt 1 4)
                    |> Random.map
                        (\( d1, d2 ) ->
                            let
                                -- vals: m+d1, m+d2, m-d1, m-d2 → mean = m, MAD = (d1+d2+d1+d2)/4 = (d1+d2)/2
                                -- only works when d1+d2 is even
                                d2safe = if modBy 2 (d1 + d2) /= 0 then d2 + 1 else d2
                                vals = List.sort [ m + d1, m + d2safe, m - d1, m - d2safe ]
                                mad = (d1 + d2safe) // 2
                                numStr = String.join ", " (List.map String.fromInt vals)
                            in
                            { prompt = "Find the mean absolute deviation (MAD) of: {" ++ numStr ++ "}"
                            , inputType = TInteger
                            , answer = AInt mad
                            , hint =
                                { prompt = "Find the mean absolute deviation (MAD) of: {" ++ numStr ++ "}"
                                , answer = String.fromInt mad
                                , steps =
                                    [ "Mean = " ++ String.fromInt m
                                    , "Deviations: " ++ String.join ", " (List.map (\v -> "|" ++ String.fromInt v ++ "-" ++ String.fromInt m ++ "|=" ++ String.fromInt (abs (v - m))) vals)
                                    , "MAD = " ++ String.fromInt mad
                                    ]
                                }
                            }
                        )
            )


-- HELPERS


shuffleChoices : String -> List String -> List String
shuffleChoices correct wrong =
    -- Correct answer always placed at index 0; view shuffles display order
    correct :: List.take 3 wrong
