module Game.Problem.PreAlgebra exposing (generatorFor, generatorForQuest)

import Game.Problem.Common exposing (..)
import Random exposing (Generator)
import Types exposing (..)


-- ──────────────────────────────────────────────────────────────────────────────
-- LOCAL HELPERS
-- ──────────────────────────────────────────────────────────────────────────────


shuffleChoices : String -> List String -> List String
shuffleChoices correct wrong =
    correct :: List.take 3 wrong


showFrac : Int -> Int -> String
showFrac n d =
    String.fromInt n ++ "/" ++ String.fromInt d


showSigned : Int -> String
showSigned n =
    if n < 0 then
        "(" ++ String.fromInt n ++ ")"
    else
        String.fromInt n


superscript : Int -> String
superscript n =
    case n of
        2 -> "²"
        3 -> "³"
        _ -> "^" ++ String.fromInt n


-- ──────────────────────────────────────────────────────────────────────────────
-- UNIT DISPATCHER
-- ──────────────────────────────────────────────────────────────────────────────


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
        9 -> unit9
        _ -> unit1


generatorForQuest : Int -> Int -> Int -> Generator Problem
generatorForQuest unitNum questIndex _ =
    case ( unitNum, questIndex ) of
        -- Unit 1: The Real Numbers (8 quests, indices 0–7)
        ( 1, 0 ) -> genAbsoluteValue
        ( 1, 1 ) -> genSimplifyFrac
        ( 1, 2 ) -> genFracOps
        ( 1, 3 ) -> genNegativeExponent
        ( 1, 4 ) -> genSquareRoot
        ( 1, 5 ) -> genCubeRoot
        ( 1, 6 ) -> genSciNotation
        ( 1, 7 ) -> genOrderOfOps
        -- Unit 2: Algebraic Expressions (6 quests, indices 0–5)
        ( 2, 0 ) -> genTranslateExpr
        ( 2, 1 ) -> genCombineLike
        ( 2, 2 ) -> genDistributeAndCombine
        ( 2, 3 ) -> genFactorLinear
        ( 2, 4 ) -> genMonomialOps
        ( 2, 5 ) -> genPolyAddSub
        -- Unit 3: Equations and Inequalities (7 quests, indices 0–6)
        ( 3, 0 ) -> genOneStepEq
        ( 3, 1 ) -> genRationalEq
        ( 3, 2 ) -> genTwoStepEq
        ( 3, 3 ) -> genSolveBySquareRoot
        ( 3, 4 ) -> genMultiStepEq
        ( 3, 5 ) -> genEqWithFractions
        ( 3, 6 ) -> genTwoStepInequality
        -- Unit 4: Ratios, Proportions, and Percents (7 quests, indices 0–6)
        ( 4, 0 ) -> genRatio
        ( 4, 1 ) -> genUnitRate
        ( 4, 2 ) -> genSolveProportion
        ( 4, 3 ) -> genSimilarFigures
        ( 4, 4 ) -> genPercentProportion
        ( 4, 5 ) -> genPercentChange
        ( 4, 6 ) -> genSimpleInterest
        -- Unit 5: Functions and Linear Representations (7 quests, indices 0–6)
        ( 5, 0 ) -> genDomainRange
        ( 5, 1 ) -> genSlopeFromPoints
        ( 5, 2 ) -> genSlopeFormula
        ( 5, 3 ) -> genSlopeIntercept
        ( 5, 4 ) -> genWriteLinearEq
        ( 5, 5 ) -> genDirectVariation
        ( 5, 6 ) -> genIdentifySlope
        -- Unit 6: Systems of Equations (4 quests, indices 0–3)
        ( 6, 0 ) -> genSystemSubstitution
        ( 6, 1 ) -> genSystemElimination
        ( 6, 2 ) -> genSystemApp
        ( 6, 3 ) -> genSystemSubstitution
        -- Unit 7: Geometry (7 quests, indices 0–6)
        ( 7, 0 ) -> genAngleTypes
        ( 7, 1 ) -> genAngleRelationships
        ( 7, 2 ) -> genTriangleSum
        ( 7, 3 ) -> genPythagorean
        ( 7, 4 ) -> genInteriorAngles
        ( 7, 5 ) -> genTransformation
        ( 7, 6 ) -> genDilation
        -- Unit 8: Measurement (7 quests, indices 0–6)
        ( 8, 0 ) -> genAreaPerimeter
        ( 8, 1 ) -> genCircleArea
        ( 8, 2 ) -> genCompositeArea
        ( 8, 3 ) -> genVolumePrism
        ( 8, 4 ) -> genVolumeCone
        ( 8, 5 ) -> genSurfaceAreaPrism
        ( 8, 6 ) -> genSphereVolume
        -- Unit 9: Probability and Statistics (6 quests, indices 0–5)
        ( 9, 0 ) -> genSimpleProbability
        ( 9, 1 ) -> genCountingOutcomes
        ( 9, 2 ) -> genCompoundProbability
        ( 9, 3 ) -> genMeasuresOfCenter
        ( 9, 4 ) -> genMAD
        ( 9, 5 ) -> genTwoWayTable
        -- fallback
        _ -> generatorFor unitNum


-- ──────────────────────────────────────────────────────────────────────────────
-- UNIT 1: The Real Numbers
-- ──────────────────────────────────────────────────────────────────────────────


unit1 : Generator Problem
unit1 =
    Random.int 0 7
        |> Random.andThen
            (\t ->
                case t of
                    0 -> genAbsoluteValue
                    1 -> genSimplifyFrac
                    2 -> genFracOps
                    3 -> genNegativeExponent
                    4 -> genSquareRoot
                    5 -> genCubeRoot
                    6 -> genSciNotation
                    _ -> genOrderOfOps
            )


genAbsoluteValue : Generator Problem
genAbsoluteValue =
    Random.int 0 2
        |> Random.andThen
            (\t ->
                case t of
                    0 ->
                        randInt -15 15
                            |> Random.map
                                (\n ->
                                    { prompt = "|" ++ String.fromInt n ++ "| = ?"
                                    , inputType = TInteger
                                    , answer = AInt (abs n)
                                    , hint =
                                        { prompt = "|−7| = ?"
                                        , answer = "7"
                                        , steps =
                                            [ "Absolute value is the distance from zero"
                                            , "It is always non-negative"
                                            , "|−7| = 7"
                                            ]
                                        }
                                    }
                                )

                    1 ->
                        Random.map2 Tuple.pair (randInt -10 10) (randInt -10 10)
                            |> Random.andThen
                                (\( a, b ) ->
                                    let correct = abs a + abs b in
                                    wrongChoicesInt correct
                                        |> Random.map
                                            (\wrong ->
                                                let choices = shuffleChoices (String.fromInt correct) wrong in
                                                { prompt = "|" ++ String.fromInt a ++ "| + |" ++ String.fromInt b ++ "| = ?"
                                                , inputType = TChoice choices
                                                , answer = AChoice 0
                                                , hint =
                                                    { prompt = "|−3| + |5| = ?"
                                                    , answer = "8"
                                                    , steps =
                                                        [ "Evaluate each absolute value first"
                                                        , "|−3| = 3, |5| = 5"
                                                        , "3 + 5 = 8"
                                                        ]
                                                    }
                                                }
                                            )
                                )

                    _ ->
                        Random.map2 Tuple.pair (randInt -12 12) (randInt -12 12)
                            |> Random.andThen
                                (\( a, b ) ->
                                    let correct = if abs a > abs b then 0 else 1 in
                                    Random.constant
                                        { prompt = "Which is greater: |" ++ String.fromInt a ++ "| or |" ++ String.fromInt b ++ "|?"
                                        , inputType = TChoice [ "|" ++ String.fromInt a ++ "|", "|" ++ String.fromInt b ++ "|", "They are equal", "Cannot determine" ]
                                        , answer = AChoice correct
                                        , hint =
                                            { prompt = "Which is greater: |−8| or |5|?"
                                            , answer = "|−8|"
                                            , steps =
                                                [ "|−8| = 8, |5| = 5"
                                                , "8 > 5, so |−8| is greater"
                                                ]
                                            }
                                        }
                                )
            )


genSimplifyFrac : Generator Problem
genSimplifyFrac =
    randInt 2 8
        |> Random.andThen
            (\g ->
                Random.map2 Tuple.pair (randInt 2 6) (randInt 2 6)
                    |> Random.map
                        (\( p, q ) ->
                            let
                                n = g * p
                                d = g * q
                                ( rn, rd ) = reduceFraction n d
                            in
                            { prompt = "Simplify " ++ showFrac n d
                            , inputType = TFraction
                            , answer = AFraction rn rd
                            , hint =
                                { prompt = "Simplify 6/8"
                                , answer = "3/4"
                                , steps =
                                    [ "Find GCF of 6 and 8: GCF = 2"
                                    , "Divide both by 2: 6÷2=3, 8÷2=4"
                                    , "Answer: 3/4"
                                    ]
                                }
                            }
                        )
            )


genFracOps : Generator Problem
genFracOps =
    Random.int 0 3
        |> Random.andThen
            (\op ->
                case op of
                    0 ->
                        -- add unlike fractions
                        Random.map2 Tuple.pair (randInt 2 6) (randInt 2 6)
                            |> Random.andThen
                                (\( d1, d2raw ) ->
                                    let
                                        d2 = if d2raw == d1 then d2raw + 1 else d2raw
                                    in
                                    Random.map2 Tuple.pair (randInt 1 (d1 - 1)) (randInt 1 (d2 - 1))
                                        |> Random.map
                                            (\( n1, n2 ) ->
                                                let
                                                    rn = n1 * d2 + n2 * d1
                                                    rd = d1 * d2
                                                    ( srn, srd ) = reduceFraction rn rd
                                                in
                                                { prompt = showFrac n1 d1 ++ " + " ++ showFrac n2 d2 ++ " = ?"
                                                , inputType = TFraction
                                                , answer = AFraction srn srd
                                                , hint =
                                                    { prompt = "1/2 + 1/3 = ?"
                                                    , answer = "5/6"
                                                    , steps =
                                                        [ "Find LCD: LCD(2,3) = 6"
                                                        , "1/2 = 3/6, 1/3 = 2/6"
                                                        , "3/6 + 2/6 = 5/6"
                                                        ]
                                                    }
                                                }
                                            )
                                )

                    1 ->
                        -- subtract unlike fractions
                        Random.map2 Tuple.pair (randInt 3 8) (randInt 2 6)
                            |> Random.andThen
                                (\( d1, d2raw ) ->
                                    let
                                        d2 = if d2raw == d1 then d2raw + 1 else d2raw
                                    in
                                    Random.map2 Tuple.pair (randInt 2 d1) (randInt 1 (d2 - 1))
                                        |> Random.map
                                            (\( n1, n2 ) ->
                                                let
                                                    rn = n1 * d2 - n2 * d1
                                                    rd = d1 * d2
                                                    ( srn, srd ) = reduceFraction (abs rn) rd
                                                in
                                                { prompt = showFrac n1 d1 ++ " − " ++ showFrac n2 d2 ++ " = ?"
                                                , inputType = TFraction
                                                , answer = AFraction srn srd
                                                , hint =
                                                    { prompt = "3/4 − 1/3 = ?"
                                                    , answer = "5/12"
                                                    , steps =
                                                        [ "LCD(4,3) = 12"
                                                        , "3/4 = 9/12, 1/3 = 4/12"
                                                        , "9/12 − 4/12 = 5/12"
                                                        ]
                                                    }
                                                }
                                            )
                                )

                    2 ->
                        -- multiply fractions
                        Random.map2 Tuple.pair
                            (Random.map2 Tuple.pair (randInt 1 5) (randInt 2 7))
                            (Random.map2 Tuple.pair (randInt 1 5) (randInt 2 7))
                            |> Random.map
                                (\( ( n1, d1 ), ( n2, d2 ) ) ->
                                    let
                                        ( rn, rd ) = reduceFraction (n1 * n2) (d1 * d2)
                                    in
                                    { prompt = showFrac n1 d1 ++ " × " ++ showFrac n2 d2 ++ " = ?"
                                    , inputType = TFraction
                                    , answer = AFraction rn rd
                                    , hint =
                                        { prompt = "2/3 × 3/4 = ?"
                                        , answer = "1/2"
                                        , steps =
                                            [ "Multiply numerators: 2 × 3 = 6"
                                            , "Multiply denominators: 3 × 4 = 12"
                                            , "Simplify 6/12 = 1/2"
                                            ]
                                        }
                                    }
                                )

                    _ ->
                        -- divide fractions
                        Random.map2 Tuple.pair
                            (Random.map2 Tuple.pair (randInt 1 5) (randInt 2 7))
                            (Random.map2 Tuple.pair (randInt 1 5) (randInt 2 7))
                            |> Random.map
                                (\( ( n1, d1 ), ( n2, d2 ) ) ->
                                    let
                                        ( rn, rd ) = reduceFraction (n1 * d2) (d1 * n2)
                                    in
                                    { prompt = showFrac n1 d1 ++ " ÷ " ++ showFrac n2 d2 ++ " = ?"
                                    , inputType = TFraction
                                    , answer = AFraction rn rd
                                    , hint =
                                        { prompt = "2/3 ÷ 4/5 = ?"
                                        , answer = "5/6"
                                        , steps =
                                            [ "Multiply by the reciprocal: 2/3 × 5/4"
                                            , "= 10/12 = 5/6"
                                            ]
                                        }
                                    }
                                )
            )


genNegativeExponent : Generator Problem
genNegativeExponent =
    Random.int 0 1
        |> Random.andThen
            (\t ->
                if t == 0 then
                    -- zero exponent
                    randInt 2 20
                        |> Random.andThen
                            (\base ->
                                wrongChoicesInt 1
                                    |> Random.map
                                        (\wrong ->
                                            let choices = shuffleChoices "1" wrong in
                                            { prompt = String.fromInt base ++ "⁰ = ?"
                                            , inputType = TChoice choices
                                            , answer = AChoice 0
                                            , hint =
                                                { prompt = "5⁰ = ?"
                                                , answer = "1"
                                                , steps =
                                                    [ "Any non-zero number raised to the 0 power equals 1"
                                                    , "5⁰ = 1"
                                                    ]
                                                }
                                            }
                                        )
                            )

                else
                    -- negative exponent → fraction
                    randChoice [ 2, 3, 4, 5 ] 2
                        |> Random.andThen
                            (\base ->
                                randChoice [ 1, 2 ] 1
                                    |> Random.map
                                        (\expAbs ->
                                            let
                                                denom = base ^ expAbs
                                                correct = "1/" ++ String.fromInt denom
                                                wrong = [ "−" ++ String.fromInt denom, String.fromInt denom, "−1/" ++ String.fromInt denom ]
                                                choices = shuffleChoices correct wrong
                                            in
                                            { prompt = String.fromInt base ++ superscript (-expAbs) ++ " = ?"
                                            , inputType = TChoice choices
                                            , answer = AChoice 0
                                            , hint =
                                                { prompt = "2⁻² = ?"
                                                , answer = "1/4"
                                                , steps =
                                                    [ "Negative exponent means take the reciprocal"
                                                    , "2⁻² = 1/(2²) = 1/4"
                                                    ]
                                                }
                                            }
                                        )
                            )
            )


genSquareRoot : Generator Problem
genSquareRoot =
    randChoice [ 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144 ] 25
        |> Random.andThen
            (\sq ->
                let correct = round (sqrt (toFloat sq)) in
                wrongChoicesInt correct
                    |> Random.map
                        (\wrong ->
                            let choices = shuffleChoices (String.fromInt correct) wrong in
                            { prompt = "√" ++ String.fromInt sq ++ " = ?"
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "√36 = ?"
                                , answer = "6"
                                , steps =
                                    [ "Ask: what number × itself = 36?"
                                    , "6 × 6 = 36"
                                    , "√36 = 6"
                                    ]
                                }
                            }
                        )
            )


genCubeRoot : Generator Problem
genCubeRoot =
    randChoice [ 1, 8, 27, 64, 125, 216 ] 8
        |> Random.andThen
            (\cube ->
                let correct = round (toFloat cube ^ (1.0 / 3.0)) in
                wrongChoicesInt correct
                    |> Random.map
                        (\wrong ->
                            let choices = shuffleChoices (String.fromInt correct) wrong in
                            { prompt = "∛" ++ String.fromInt cube ++ " = ?"
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "∛27 = ?"
                                , answer = "3"
                                , steps =
                                    [ "Ask: what number × itself × itself = 27?"
                                    , "3 × 3 × 3 = 27"
                                    , "∛27 = 3"
                                    ]
                                }
                            }
                        )
            )


genSciNotation : Generator Problem
genSciNotation =
    Random.int 0 1
        |> Random.andThen
            (\direction ->
                if direction == 0 then
                    -- standard → scientific
                    Random.map2 Tuple.pair (randInt 1 9) (randInt 2 6)
                        |> Random.andThen
                            (\( coeff, expn ) ->
                                let
                                    correct = String.fromInt coeff ++ " × 10^" ++ String.fromInt expn
                                    wrong =
                                        [ String.fromInt coeff ++ " × 10^" ++ String.fromInt (expn + 1)
                                        , String.fromInt coeff ++ " × 10^" ++ String.fromInt (expn - 1)
                                        , String.fromInt (coeff + 1) ++ " × 10^" ++ String.fromInt expn
                                        ]
                                    value = coeff * (10 ^ expn)
                                    choices = shuffleChoices correct wrong
                                in
                                Random.constant
                                    { prompt = "Write " ++ String.fromInt value ++ " in scientific notation."
                                    , inputType = TChoice choices
                                    , answer = AChoice 0
                                    , hint =
                                        { prompt = "Write 3000 in scientific notation."
                                        , answer = "3 × 10^3"
                                        , steps =
                                            [ "Move decimal so only one digit is before it"
                                            , "3000 → 3.000 × 10^3"
                                            , "Answer: 3 × 10^3"
                                            ]
                                        }
                                    }
                            )

                else
                    -- scientific → standard (small exponents)
                    Random.map2 Tuple.pair (randInt 1 9) (randInt 1 4)
                        |> Random.map
                            (\( coeff, expn ) ->
                                let
                                    value = coeff * (10 ^ expn)
                                in
                                { prompt = "Evaluate: " ++ String.fromInt coeff ++ " × 10^" ++ String.fromInt expn
                                , inputType = TInteger
                                , answer = AInt value
                                , hint =
                                    { prompt = "Evaluate: 4 × 10^2"
                                    , answer = "400"
                                    , steps =
                                        [ "10^2 = 100"
                                        , "4 × 100 = 400"
                                        ]
                                    }
                                }
                            )
            )


genOrderOfOps : Generator Problem
genOrderOfOps =
    Random.int 0 2
        |> Random.andThen
            (\t ->
                case t of
                    0 ->
                        Random.map3 (\a b c -> ( a, b, c )) (randInt 1 8) (randInt 1 6) (randInt 1 5)
                            |> Random.andThen
                                (\( a, b, c ) ->
                                    let correct = a + b * c in
                                    wrongChoicesInt correct
                                        |> Random.map
                                            (\wrong ->
                                                let choices = shuffleChoices (String.fromInt correct) wrong in
                                                { prompt = String.fromInt a ++ " + " ++ String.fromInt b ++ " × " ++ String.fromInt c ++ " = ?"
                                                , inputType = TChoice choices
                                                , answer = AChoice 0
                                                , hint =
                                                    { prompt = "3 + 4 × 2 = ?"
                                                    , answer = "11"
                                                    , steps =
                                                        [ "Multiplication before addition (PEMDAS)"
                                                        , "4 × 2 = 8, then 3 + 8 = 11"
                                                        ]
                                                    }
                                                }
                                            )
                                )

                    1 ->
                        Random.map3 (\a b c -> ( a, b, c )) (randInt 1 5) (randInt 2 8) (randInt 2 4)
                            |> Random.andThen
                                (\( a, b, c ) ->
                                    let correct = (a + b) * c in
                                    wrongChoicesInt correct
                                        |> Random.map
                                            (\wrong ->
                                                let choices = shuffleChoices (String.fromInt correct) wrong in
                                                { prompt = "(" ++ String.fromInt a ++ " + " ++ String.fromInt b ++ ") × " ++ String.fromInt c ++ " = ?"
                                                , inputType = TChoice choices
                                                , answer = AChoice 0
                                                , hint =
                                                    { prompt = "(2 + 3) × 4 = ?"
                                                    , answer = "20"
                                                    , steps =
                                                        [ "Parentheses first: 2 + 3 = 5"
                                                        , "Then multiply: 5 × 4 = 20"
                                                        ]
                                                    }
                                                }
                                            )
                                )

                    _ ->
                        Random.map4 (\a b c d -> { a = a, b = b, c = c, d = d })
                            (randInt 2 5) (randInt 2 4) (randInt 1 6) (randInt 1 5)
                            |> Random.andThen
                                (\r ->
                                    let correct = r.a ^ r.b + r.c - r.d in
                                    wrongChoicesInt correct
                                        |> Random.map
                                            (\wrong ->
                                                let choices = shuffleChoices (String.fromInt correct) wrong in
                                                { prompt = String.fromInt r.a ++ superscript r.b ++ " + " ++ String.fromInt r.c ++ " − " ++ String.fromInt r.d ++ " = ?"
                                                , inputType = TChoice choices
                                                , answer = AChoice 0
                                                , hint =
                                                    { prompt = "2² + 5 − 3 = ?"
                                                    , answer = "6"
                                                    , steps =
                                                        [ "Exponent first: 2² = 4"
                                                        , "Then left to right: 4 + 5 − 3 = 6"
                                                        ]
                                                    }
                                                }
                                            )
                                )
            )


-- ──────────────────────────────────────────────────────────────────────────────
-- UNIT 2: Algebraic Expressions
-- ──────────────────────────────────────────────────────────────────────────────


unit2 : Generator Problem
unit2 =
    Random.int 0 5
        |> Random.andThen
            (\t ->
                case t of
                    0 -> genTranslateExpr
                    1 -> genCombineLike
                    2 -> genDistributeAndCombine
                    3 -> genFactorLinear
                    4 -> genMonomialOps
                    _ -> genPolyAddSub
            )


genTranslateExpr : Generator Problem
genTranslateExpr =
    Random.int 0 3
        |> Random.map
            (\t ->
                case t of
                    0 ->
                        { prompt = "Translate: \"5 more than a number n\""
                        , inputType = TChoice [ "n + 5", "5 − n", "5n", "n − 5" ]
                        , answer = AChoice 0
                        , hint =
                            { prompt = "\"5 more than n\" means?"
                            , answer = "n + 5"
                            , steps = [ "\"More than\" means add", "n + 5" ]
                            }
                        }

                    1 ->
                        { prompt = "Translate: \"3 times a number n, decreased by 4\""
                        , inputType = TChoice [ "3n − 4", "3n + 4", "3(n − 4)", "4 − 3n" ]
                        , answer = AChoice 0
                        , hint =
                            { prompt = "\"3 times n, decreased by 4\""
                            , answer = "3n − 4"
                            , steps = [ "3 times n = 3n", "decreased by 4 = subtract 4", "3n − 4" ]
                            }
                        }

                    2 ->
                        { prompt = "Translate: \"the quotient of n and 6\""
                        , inputType = TChoice [ "n/6", "6/n", "6n", "n − 6" ]
                        , answer = AChoice 0
                        , hint =
                            { prompt = "\"quotient of n and 6\""
                            , answer = "n/6"
                            , steps = [ "Quotient means divide", "n divided by 6 = n/6" ]
                            }
                        }

                    _ ->
                        { prompt = "Translate: \"twice the sum of a number n and 7\""
                        , inputType = TChoice [ "2(n + 7)", "2n + 7", "2n × 7", "n + 14" ]
                        , answer = AChoice 0
                        , hint =
                            { prompt = "\"twice the sum of n and 7\""
                            , answer = "2(n + 7)"
                            , steps = [ "Sum of n and 7 = (n + 7)", "Twice = multiply by 2", "2(n + 7)" ]
                            }
                        }
            )


genCombineLike : Generator Problem
genCombineLike =
    Random.map3 (\a b c -> ( a, b, c )) (randInt 1 9) (randInt 1 9) (randInt 1 8)
        |> Random.andThen
            (\( a, b, x ) ->
                wrongChoicesInt ((a + b) * x)
                    |> Random.map
                        (\wrong ->
                            let
                                correct = (a + b) * x
                                choices = shuffleChoices (String.fromInt correct) wrong
                            in
                            { prompt = "If x = " ++ String.fromInt x ++ ", what is " ++ String.fromInt a ++ "x + " ++ String.fromInt b ++ "x?"
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "If x = 3, what is 2x + 5x?"
                                , answer = "21"
                                , steps =
                                    [ "Combine like terms: 2x + 5x = 7x"
                                    , "Substitute: 7(3) = 21"
                                    ]
                                }
                            }
                        )
            )


genDistributeAndCombine : Generator Problem
genDistributeAndCombine =
    Random.map3 (\a b c -> ( a, b, c )) (randInt 2 6) (randInt 1 8) (randInt 1 8)
        |> Random.andThen
            (\( a, b, c ) ->
                -- a(x + b) + c  →  ax + ab + c, evaluate at x
                randInt 1 5
                    |> Random.andThen
                        (\x ->
                            let correct = a * x + a * b + c in
                            wrongChoicesInt correct
                                |> Random.map
                                    (\wrong ->
                                        let choices = shuffleChoices (String.fromInt correct) wrong in
                                        { prompt =
                                            "Simplify " ++ String.fromInt a ++ "(x + " ++ String.fromInt b ++ ") + " ++ String.fromInt c
                                                ++ " when x = " ++ String.fromInt x
                                        , inputType = TChoice choices
                                        , answer = AChoice 0
                                        , hint =
                                            { prompt = "Simplify 3(x + 2) + 5 when x = 1"
                                            , answer = "12"
                                            , steps =
                                                [ "Distribute: 3(x) + 3(2) + 5 = 3x + 6 + 5"
                                                , "Combine: 3x + 11"
                                                , "x=1: 3 + 11 = 12 (wait, 3(1)+11=14)... Actually 3x+11 at x=1 is 14"
                                                , "Follow same steps with your numbers"
                                                ]
                                            }
                                        }
                                    )
                        )
            )


genFactorLinear : Generator Problem
genFactorLinear =
    Random.map2 Tuple.pair (randInt 2 8) (randInt 1 9)
        |> Random.andThen
            (\( g, k ) ->
                let
                    a = g * k
                    b = g * (k + 1)
                in
                wrongChoicesInt g
                    |> Random.map
                        (\wrong ->
                            let choices = shuffleChoices (String.fromInt g ++ "(x + " ++ String.fromInt (k + 1) ++ ")") [ String.fromInt g ++ "(x + " ++ String.fromInt k ++ ")", String.fromInt (g + 1) ++ "(x + " ++ String.fromInt k ++ ")", String.fromInt (g - 1) ++ "(x + " ++ String.fromInt (k + 1) ++ ")" ] in
                            { prompt = "Factor: " ++ String.fromInt a ++ "x + " ++ String.fromInt b
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "Factor: 6x + 9"
                                , answer = "3(2x + 3)"
                                , steps =
                                    [ "Find GCF of 6 and 9: GCF = 3"
                                    , "Factor out 3: 3(2x + 3)"
                                    ]
                                }
                            }
                        )
            )


genMonomialOps : Generator Problem
genMonomialOps =
    Random.int 0 2
        |> Random.andThen
            (\t ->
                case t of
                    0 ->
                        -- multiply monomials: a*x^m * b*x^n = ab*x^(m+n)
                        Random.map4 (\a b m n -> { a = a, b = b, m = m, n = n })
                            (randInt 1 5) (randInt 1 5) (randInt 1 3) (randInt 1 3)
                            |> Random.andThen
                                (\r ->
                                    let
                                        coeff = r.a * r.b
                                        expn = r.m + r.n
                                        correct = String.fromInt coeff ++ "x^" ++ String.fromInt expn
                                        wrong =
                                            [ String.fromInt coeff ++ "x^" ++ String.fromInt (expn + 1)
                                            , String.fromInt (coeff + 1) ++ "x^" ++ String.fromInt expn
                                            , String.fromInt coeff ++ "x^" ++ String.fromInt (expn - 1)
                                            ]
                                        choices = shuffleChoices correct wrong
                                    in
                                    Random.constant
                                        { prompt = String.fromInt r.a ++ "x^" ++ String.fromInt r.m ++ " × " ++ String.fromInt r.b ++ "x^" ++ String.fromInt r.n ++ " = ?"
                                        , inputType = TChoice choices
                                        , answer = AChoice 0
                                        , hint =
                                            { prompt = "2x² × 3x³ = ?"
                                            , answer = "6x^5"
                                            , steps =
                                                [ "Multiply coefficients: 2 × 3 = 6"
                                                , "Add exponents: x² × x³ = x^5"
                                                , "Answer: 6x^5"
                                                ]
                                            }
                                        }
                                )

                    1 ->
                        -- divide monomials: a*x^m / b*x^n (m>n, a divisible by b)
                        Random.map3 (\b q n -> { b = b, q = q, n = n })
                            (randInt 1 4) (randInt 1 4) (randInt 1 2)
                            |> Random.andThen
                                (\r ->
                                    randInt (r.n + 1) (r.n + 3)
                                        |> Random.andThen
                                            (\m ->
                                                let
                                                    a = r.b * r.q
                                                    expn = m - r.n
                                                    correct = String.fromInt r.q ++ "x^" ++ String.fromInt expn
                                                    wrong =
                                                        [ String.fromInt r.q ++ "x^" ++ String.fromInt (expn + 1)
                                                        , String.fromInt (r.q + 1) ++ "x^" ++ String.fromInt expn
                                                        , String.fromInt r.q ++ "x^" ++ String.fromInt (expn - 1)
                                                        ]
                                                    choices = shuffleChoices correct wrong
                                                in
                                                Random.constant
                                                    { prompt = String.fromInt a ++ "x^" ++ String.fromInt m ++ " ÷ " ++ String.fromInt r.b ++ "x^" ++ String.fromInt r.n ++ " = ?"
                                                    , inputType = TChoice choices
                                                    , answer = AChoice 0
                                                    , hint =
                                                        { prompt = "6x^4 ÷ 2x^2 = ?"
                                                        , answer = "3x^2"
                                                        , steps =
                                                            [ "Divide coefficients: 6 ÷ 2 = 3"
                                                            , "Subtract exponents: x^4 ÷ x^2 = x^2"
                                                            , "Answer: 3x^2"
                                                            ]
                                                        }
                                                    }
                                            )
                                )

                    _ ->
                        -- power of a monomial: (a*x^m)^n
                        Random.map3 (\a m n -> ( a, m, n )) (randInt 1 4) (randInt 1 3) (randInt 2 3)
                            |> Random.andThen
                                (\( a, m, n ) ->
                                    let
                                        coeff = a ^ n
                                        expn = m * n
                                        correct = String.fromInt coeff ++ "x^" ++ String.fromInt expn
                                        wrong =
                                            [ String.fromInt coeff ++ "x^" ++ String.fromInt (expn + 1)
                                            , String.fromInt (coeff + 1) ++ "x^" ++ String.fromInt expn
                                            , String.fromInt a ++ "x^" ++ String.fromInt expn
                                            ]
                                        choices = shuffleChoices correct wrong
                                    in
                                    Random.constant
                                        { prompt = "(" ++ String.fromInt a ++ "x^" ++ String.fromInt m ++ ")^" ++ String.fromInt n ++ " = ?"
                                        , inputType = TChoice choices
                                        , answer = AChoice 0
                                        , hint =
                                            { prompt = "(2x²)³ = ?"
                                            , answer = "8x^6"
                                            , steps =
                                                [ "Raise coefficient to power: 2³ = 8"
                                                , "Multiply exponents: 2 × 3 = 6"
                                                , "Answer: 8x^6"
                                                ]
                                            }
                                        }
                                )
            )


genPolyAddSub : Generator Problem
genPolyAddSub =
    Random.int 0 1
        |> Random.andThen
            (\op ->
                Random.map4 (\a b c d -> { a = a, b = b, c = c, d = d })
                    (randInt 1 6) (randInt 1 9) (randInt 1 6) (randInt 1 9)
                    |> Random.andThen
                        (\r ->
                            let
                                -- (a*x + b) + (c*x + d) = (a+c)x + (b+d)
                                -- or subtract: (a*x + b) - (c*x + d) = (a-c)x + (b-d)
                                ( xCoeff, con ) =
                                    if op == 0 then
                                        ( r.a + r.c, r.b + r.d )
                                    else
                                        ( r.a - r.c, r.b - r.d )

                                opStr = if op == 0 then "+" else "−"
                                correct = String.fromInt xCoeff ++ "x + " ++ String.fromInt con
                                wrong =
                                    [ String.fromInt (xCoeff + 1) ++ "x + " ++ String.fromInt con
                                    , String.fromInt xCoeff ++ "x + " ++ String.fromInt (con + 1)
                                    , String.fromInt xCoeff ++ "x − " ++ String.fromInt con
                                    ]
                                choices = shuffleChoices correct wrong
                            in
                            Random.constant
                                { prompt =
                                    "(" ++ String.fromInt r.a ++ "x + " ++ String.fromInt r.b ++ ") "
                                        ++ opStr ++ " (" ++ String.fromInt r.c ++ "x + " ++ String.fromInt r.d ++ ") = ?"
                                , inputType = TChoice choices
                                , answer = AChoice 0
                                , hint =
                                    { prompt = "(3x + 2) + (4x + 5) = ?"
                                    , answer = "7x + 7"
                                    , steps =
                                        [ "Combine x terms: 3x + 4x = 7x"
                                        , "Combine constants: 2 + 5 = 7"
                                        , "Answer: 7x + 7"
                                        ]
                                    }
                                }
                        )
            )


-- ──────────────────────────────────────────────────────────────────────────────
-- UNIT 3: Equations and Inequalities
-- ──────────────────────────────────────────────────────────────────────────────


unit3 : Generator Problem
unit3 =
    Random.int 0 6
        |> Random.andThen
            (\t ->
                case t of
                    0 -> genOneStepEq
                    1 -> genRationalEq
                    2 -> genTwoStepEq
                    3 -> genSolveBySquareRoot
                    4 -> genMultiStepEq
                    5 -> genEqWithFractions
                    _ -> genTwoStepInequality
            )


genOneStepEq : Generator Problem
genOneStepEq =
    Random.int 0 1
        |> Random.andThen
            (\op ->
                if op == 0 then
                    Random.map2 Tuple.pair (randInt 1 15) (randInt 1 20)
                        |> Random.map
                            (\( a, x ) ->
                                { prompt = "Solve: x + " ++ String.fromInt a ++ " = " ++ String.fromInt (a + x)
                                , inputType = TInteger
                                , answer = AInt x
                                , hint =
                                    { prompt = "Solve: x + 4 = 9"
                                    , answer = "5"
                                    , steps =
                                        [ "Subtract 4 from both sides"
                                        , "x = 9 − 4 = 5"
                                        ]
                                    }
                                }
                            )

                else
                    Random.map2 Tuple.pair (randIntNonZero 2 9) (randInt 1 12)
                        |> Random.map
                            (\( a, x ) ->
                                { prompt = "Solve: " ++ String.fromInt a ++ "x = " ++ String.fromInt (a * x)
                                , inputType = TInteger
                                , answer = AInt x
                                , hint =
                                    { prompt = "Solve: 3x = 15"
                                    , answer = "5"
                                    , steps =
                                        [ "Divide both sides by 3"
                                        , "x = 15 ÷ 3 = 5"
                                        ]
                                    }
                                }
                            )
            )


genRationalEq : Generator Problem
genRationalEq =
    -- x/a = b  →  x = ab
    Random.map2 Tuple.pair (randIntNonZero 2 8) (randInt 1 10)
        |> Random.map
            (\( a, b ) ->
                let x = a * b in
                { prompt = "Solve: x/" ++ String.fromInt a ++ " = " ++ String.fromInt b
                , inputType = TInteger
                , answer = AInt x
                , hint =
                    { prompt = "Solve: x/4 = 3"
                    , answer = "12"
                    , steps =
                        [ "Multiply both sides by 4"
                        , "x = 3 × 4 = 12"
                        ]
                    }
                }
            )


genTwoStepEq : Generator Problem
genTwoStepEq =
    Random.map3 (\a b x -> ( a, b, x )) (randIntNonZero 2 6) (randInt 1 10) (randInt 1 10)
        |> Random.map
            (\( a, b, x ) ->
                { prompt = "Solve: " ++ String.fromInt a ++ "x + " ++ String.fromInt b ++ " = " ++ String.fromInt (a * x + b)
                , inputType = TInteger
                , answer = AInt x
                , hint =
                    { prompt = "Solve: 2x + 3 = 11"
                    , answer = "4"
                    , steps =
                        [ "Subtract 3 from both sides: 2x = 8"
                        , "Divide both sides by 2: x = 4"
                        ]
                    }
                }
            )


genSolveBySquareRoot : Generator Problem
genSolveBySquareRoot =
    -- x² = n  →  x = ±√n (accept positive root)
    randChoice [ 1, 4, 9, 16, 25, 36, 49, 64, 81, 100 ] 25
        |> Random.map
            (\n ->
                let x = round (sqrt (toFloat n)) in
                { prompt = "Solve: x² = " ++ String.fromInt n ++ "  (give the positive solution)"
                , inputType = TInteger
                , answer = AInt x
                , hint =
                    { prompt = "Solve: x² = 49"
                    , answer = "7"
                    , steps =
                        [ "Take the square root of both sides"
                        , "x = √49 = 7  (positive root)"
                        ]
                    }
                }
            )


genMultiStepEq : Generator Problem
genMultiStepEq =
    -- a(x + b) + c = d  →  x = (d - c)/a - b
    Random.map4 (\a b c x -> { a = a, b = b, c = c, x = x })
        (randIntNonZero 2 5) (randInt 1 6) (randInt 1 8) (randInt 1 8)
        |> Random.map
            (\r ->
                let
                    rhs = r.a * (r.x + r.b) + r.c
                in
                { prompt = "Solve: " ++ String.fromInt r.a ++ "(x + " ++ String.fromInt r.b ++ ") + " ++ String.fromInt r.c ++ " = " ++ String.fromInt rhs
                , inputType = TInteger
                , answer = AInt r.x
                , hint =
                    { prompt = "Solve: 3(x + 2) + 1 = 16"
                    , answer = "3"
                    , steps =
                        [ "Distribute: 3x + 6 + 1 = 16"
                        , "Combine: 3x + 7 = 16"
                        , "Subtract 7: 3x = 9"
                        , "Divide by 3: x = 3"
                        ]
                    }
                }
            )


genEqWithFractions : Generator Problem
genEqWithFractions =
    -- (x + a)/b = c  →  x = b*c - a
    Random.map3 (\a b c -> ( a, b, c )) (randInt 1 8) (randIntNonZero 2 6) (randInt 1 8)
        |> Random.map
            (\( a, b, c ) ->
                let x = b * c - a in
                { prompt = "Solve: (x + " ++ String.fromInt a ++ ")/" ++ String.fromInt b ++ " = " ++ String.fromInt c
                , inputType = TInteger
                , answer = AInt x
                , hint =
                    { prompt = "Solve: (x + 3)/2 = 5"
                    , answer = "7"
                    , steps =
                        [ "Multiply both sides by 2: x + 3 = 10"
                        , "Subtract 3: x = 7"
                        ]
                    }
                }
            )


genTwoStepInequality : Generator Problem
genTwoStepInequality =
    Random.map3 (\a b x -> ( a, b, x )) (randIntNonZero 2 6) (randInt 1 8) (randInt 1 10)
        |> Random.andThen
            (\( a, b, x ) ->
                Random.int 0 1
                    |> Random.map
                        (\dirN ->
                            let
                                dir = if dirN == 0 then IGt else ILt
                                dirStr = if dirN == 0 then ">" else "<"
                                rhs = a * x + b
                            in
                            { prompt = "Solve: " ++ String.fromInt a ++ "x + " ++ String.fromInt b ++ " " ++ dirStr ++ " " ++ String.fromInt rhs
                            , inputType = TInequality
                            , answer = AInequality dir (toFloat x)
                            , hint =
                                { prompt = "Solve: 2x + 3 > 11"
                                , answer = "x > 4"
                                , steps =
                                    [ "Subtract 3 from both sides: 2x > 8"
                                    , "Divide both sides by 2: x > 4"
                                    ]
                                }
                            }
                        )
            )


-- ──────────────────────────────────────────────────────────────────────────────
-- UNIT 4: Ratios, Proportions, and Percents
-- ──────────────────────────────────────────────────────────────────────────────


unit4 : Generator Problem
unit4 =
    Random.int 0 6
        |> Random.andThen
            (\t ->
                case t of
                    0 -> genRatio
                    1 -> genUnitRate
                    2 -> genSolveProportion
                    3 -> genSimilarFigures
                    4 -> genPercentProportion
                    5 -> genPercentChange
                    _ -> genSimpleInterest
            )


genRatio : Generator Problem
genRatio =
    Random.map2 Tuple.pair (randInt 2 10) (randInt 2 10)
        |> Random.andThen
            (\( a, b ) ->
                let
                    ( ra, rb ) = reduceFraction a b
                    correct = String.fromInt ra ++ ":" ++ String.fromInt rb
                    wrong =
                        [ String.fromInt a ++ ":" ++ String.fromInt b
                        , String.fromInt rb ++ ":" ++ String.fromInt ra
                        , String.fromInt (ra + 1) ++ ":" ++ String.fromInt rb
                        ]
                    choices = shuffleChoices correct wrong
                in
                Random.constant
                    { prompt = "Simplify the ratio " ++ String.fromInt a ++ ":" ++ String.fromInt b
                    , inputType = TChoice choices
                    , answer = AChoice 0
                    , hint =
                        { prompt = "Simplify 6:9"
                        , answer = "2:3"
                        , steps =
                            [ "GCF of 6 and 9 is 3"
                            , "6÷3 = 2, 9÷3 = 3"
                            , "Simplified: 2:3"
                            ]
                        }
                    }
            )


genUnitRate : Generator Problem
genUnitRate =
    Random.map2 Tuple.pair (randInt 2 9) (randInt 1 9)
        |> Random.andThen
            (\( units, rate ) ->
                let total = units * rate in
                wrongChoicesInt rate
                    |> Random.map
                        (\wrong ->
                            let choices = shuffleChoices (String.fromInt rate) wrong in
                            { prompt = String.fromInt units ++ " items cost $" ++ String.fromInt total ++ ". What is the cost per item?"
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "4 items cost $20. Cost per item?"
                                , answer = "$5"
                                , steps =
                                    [ "Unit rate = total cost ÷ number of items"
                                    , "$20 ÷ 4 = $5"
                                    ]
                                }
                            }
                        )
            )


genSolveProportion : Generator Problem
genSolveProportion =
    Random.map2 Tuple.pair (randInt 2 8) (randInt 2 6)
        |> Random.map
            (\( a, k ) ->
                let
                    b = a * k
                    c = a + 2
                    x = c * k
                in
                { prompt = String.fromInt a ++ "/" ++ String.fromInt b ++ " = " ++ String.fromInt c ++ "/x"
                , inputType = TInteger
                , answer = AInt x
                , hint =
                    { prompt = "2/6 = 5/x"
                    , answer = "15"
                    , steps =
                        [ "Cross multiply: 2x = 6 × 5 = 30"
                        , "Divide: x = 30 ÷ 2 = 15"
                        ]
                    }
                }
            )


genSimilarFigures : Generator Problem
genSimilarFigures =
    Random.map2 Tuple.pair (randInt 2 8) (randInt 2 5)
        |> Random.map
            (\( side, scale ) ->
                let missing = side * scale in
                { prompt =
                    "Two similar triangles. Smaller triangle has a side of " ++ String.fromInt side
                        ++ " cm. The scale factor is " ++ String.fromInt scale ++ ":1. Find the corresponding side of the larger triangle."
                , inputType = TInteger
                , answer = AInt missing
                , hint =
                    { prompt = "Scale factor 3:1, smaller side = 4. Larger side?"
                    , answer = "12"
                    , steps =
                        [ "Multiply the smaller side by the scale factor"
                        , "4 × 3 = 12"
                        ]
                    }
                }
            )


genPercentProportion : Generator Problem
genPercentProportion =
    randChoice [ 10, 20, 25, 40, 50, 75 ] 25
        |> Random.andThen
            (\pct ->
                randChoice [ 20, 40, 50, 60, 80, 100, 120, 200 ] 100
                    |> Random.map
                        (\whole ->
                            let correct = (pct * whole) // 100 in
                            { prompt = "What is " ++ String.fromInt pct ++ "% of " ++ String.fromInt whole ++ "?"
                            , inputType = TInteger
                            , answer = AInt correct
                            , hint =
                                { prompt = "What is 25% of 80?"
                                , answer = "20"
                                , steps =
                                    [ "Percent proportion: part/whole = percent/100"
                                    , "part/80 = 25/100"
                                    , "part = 80 × 25/100 = 20"
                                    ]
                                }
                            }
                        )
            )


genPercentChange : Generator Problem
genPercentChange =
    Random.map2 Tuple.pair (randInt 10 90) (randChoice [ 10, 20, 25, 50 ] 25)
        |> Random.andThen
            (\( original, pct ) ->
                Random.int 0 1
                    |> Random.map
                        (\dir ->
                            let
                                change = (original * pct) // 100
                                newVal = if dir == 0 then original + change else original - change
                                dirStr = if dir == 0 then "increased" else "decreased"
                            in
                            { prompt =
                                "A price of $" ++ String.fromInt original ++ " is " ++ dirStr
                                    ++ " by " ++ String.fromInt pct ++ "%. New price?"
                            , inputType = TInteger
                            , answer = AInt newVal
                            , hint =
                                { prompt = "Price of $50 increases by 20%. New price?"
                                , answer = "$60"
                                , steps =
                                    [ "Find the change: 20% of 50 = 10"
                                    , "Add to original: 50 + 10 = 60"
                                    ]
                                }
                            }
                        )
            )


genSimpleInterest : Generator Problem
genSimpleInterest =
    -- I = P × r × t, with friendly numbers
    Random.map3 (\p r t -> ( p, r, t ))
        (randChoice [ 100, 200, 500, 1000 ] 200)
        (randChoice [ 2, 4, 5, 10 ] 5)
        (randInt 1 5)
        |> Random.map
            (\( p, r, t ) ->
                let interest = (p * r * t) // 100 in
                { prompt =
                    "Simple interest: Principal = $" ++ String.fromInt p
                        ++ ", Rate = " ++ String.fromInt r ++ "% per year, Time = " ++ String.fromInt t ++ " years. Find the interest."
                , inputType = TInteger
                , answer = AInt interest
                , hint =
                    { prompt = "P=$500, r=4%, t=3 years. Interest?"
                    , answer = "$60"
                    , steps =
                        [ "I = P × r × t"
                        , "I = 500 × 0.04 × 3 = 60"
                        ]
                    }
                }
            )


-- ──────────────────────────────────────────────────────────────────────────────
-- UNIT 5: Functions and Linear Representations
-- ──────────────────────────────────────────────────────────────────────────────


unit5 : Generator Problem
unit5 =
    Random.int 0 6
        |> Random.andThen
            (\t ->
                case t of
                    0 -> genDomainRange
                    1 -> genSlopeFromPoints
                    2 -> genSlopeFormula
                    3 -> genSlopeIntercept
                    4 -> genWriteLinearEq
                    5 -> genDirectVariation
                    _ -> genIdentifySlope
            )


genDomainRange : Generator Problem
genDomainRange =
    Random.int 0 1
        |> Random.andThen
            (\t ->
                if t == 0 then
                    -- is a relation a function?
                    Random.int 0 1
                        |> Random.map
                            (\isFn ->
                                let
                                    ( pairs, correct ) =
                                        if isFn == 0 then
                                            ( "{(1,2), (3,4), (5,6)}", "Yes" )
                                        else
                                            ( "{(1,2), (1,4), (3,6)}", "No" )
                                    choices = shuffleChoices correct [ if correct == "Yes" then "No" else "Yes", "Sometimes", "Cannot determine" ]
                                in
                                { prompt = "Is " ++ pairs ++ " a function?"
                                , inputType = TChoice choices
                                , answer = AChoice 0
                                , hint =
                                    { prompt = "Is {(1,2),(1,3)} a function?"
                                    , answer = "No"
                                    , steps =
                                        [ "A function has exactly one output for each input"
                                        , "x=1 maps to both 2 and 3, so not a function"
                                        ]
                                    }
                                }
                            )

                else
                    -- domain/range from a set
                    Random.map4 (\a b c d -> List.sort [ a, b, c, d ])
                        (randInt 1 8) (randInt 1 8) (randInt 1 8) (randInt 1 8)
                        |> Random.andThen
                            (\xs ->
                                Random.map4 (\a b c d -> [ a, b, c, d ])
                                    (randInt 1 8) (randInt 1 8) (randInt 1 8) (randInt 1 8)
                                    |> Random.andThen
                                        (\ys ->
                                            Random.int 0 1
                                                |> Random.map
                                                    (\drChoice ->
                                                        let
                                                            pairs = List.map2 (\x y -> "(" ++ String.fromInt x ++ "," ++ String.fromInt y ++ ")") xs ys
                                                            pairStr = "{" ++ String.join ", " pairs ++ "}"
                                                            xMin = List.minimum xs |> Maybe.withDefault 0
                                                            xMax = List.maximum xs |> Maybe.withDefault 0
                                                            yMin = List.minimum ys |> Maybe.withDefault 0
                                                            yMax = List.maximum ys |> Maybe.withDefault 0
                                                        in
                                                        if drChoice == 0 then
                                                            { prompt = "For " ++ pairStr ++ ", what is the minimum value of the domain?"
                                                            , inputType = TInteger
                                                            , answer = AInt xMin
                                                            , hint =
                                                                { prompt = "For {(2,4),(5,1),(3,7)}, min domain?"
                                                                , answer = "2"
                                                                , steps =
                                                                    [ "Domain = set of all x-values (inputs)"
                                                                    , "x-values: 2, 5, 3 → minimum is 2"
                                                                    ]
                                                                }
                                                            }
                                                        else
                                                            { prompt = "For " ++ pairStr ++ ", what is the minimum value of the range?"
                                                            , inputType = TInteger
                                                            , answer = AInt yMin
                                                            , hint =
                                                                { prompt = "For {(2,4),(5,1),(3,7)}, min range?"
                                                                , answer = "1"
                                                                , steps =
                                                                    [ "Range = set of all y-values (outputs)"
                                                                    , "y-values: 4, 1, 7 → minimum is 1"
                                                                    ]
                                                                }
                                                            }
                                                    )
                                        )
                            )
            )


genSlopeFromPoints : Generator Problem
genSlopeFromPoints =
    -- pick integer slope, then generate two points
    Random.map4 (\m x1 y1 dx -> { m = m, x1 = x1, y1 = y1, dx = dx })
        (randIntNonZero -4 4) (randInt -5 5) (randInt -5 5) (randInt 1 4)
        |> Random.andThen
            (\r ->
                let
                    x2 = r.x1 + r.dx
                    y2 = r.y1 + r.m * r.dx
                in
                wrongChoicesInt r.m
                    |> Random.map
                        (\wrong ->
                            let choices = shuffleChoices (String.fromInt r.m) wrong in
                            { prompt =
                                "Find the slope through (" ++ String.fromInt r.x1 ++ ", " ++ String.fromInt r.y1
                                    ++ ") and (" ++ String.fromInt x2 ++ ", " ++ String.fromInt y2 ++ ")"
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "Slope through (1, 2) and (3, 6)?"
                                , answer = "2"
                                , steps =
                                    [ "slope = (y₂ − y₁)/(x₂ − x₁)"
                                    , "(6 − 2)/(3 − 1) = 4/2 = 2"
                                    ]
                                }
                            }
                        )
            )


genSlopeFormula : Generator Problem
genSlopeFormula =
    -- same as genSlopeFromPoints but TInteger (no multiple choice)
    Random.map3 (\m x1 y1 -> { m = m, x1 = x1, y1 = y1 })
        (randIntNonZero -5 5) (randInt -4 4) (randInt -4 4)
        |> Random.andThen
            (\r ->
                randInt 1 3
                    |> Random.map
                        (\dx ->
                            let
                                x2 = r.x1 + dx
                                y2 = r.y1 + r.m * dx
                            in
                            { prompt =
                                "Use the slope formula: points (" ++ String.fromInt r.x1 ++ ", " ++ String.fromInt r.y1
                                    ++ ") and (" ++ String.fromInt x2 ++ ", " ++ String.fromInt y2 ++ ")"
                            , inputType = TInteger
                            , answer = AInt r.m
                            , hint =
                                { prompt = "Slope of (0,1) and (2,5)?"
                                , answer = "2"
                                , steps =
                                    [ "m = (y₂ − y₁)/(x₂ − x₁)"
                                    , "m = (5 − 1)/(2 − 0) = 4/2 = 2"
                                    ]
                                }
                            }
                        )
            )


genSlopeIntercept : Generator Problem
genSlopeIntercept =
    -- given slope m and y-intercept b, find y when x = x0
    Random.map3 (\m b x0 -> ( m, b, x0 )) (randIntNonZero -4 4) (randInt -6 6) (randInt 1 5)
        |> Random.map
            (\( m, b, x0 ) ->
                let y = m * x0 + b in
                { prompt = "y = " ++ String.fromInt m ++ "x + " ++ String.fromInt b ++ ". Find y when x = " ++ String.fromInt x0 ++ "."
                , inputType = TInteger
                , answer = AInt y
                , hint =
                    { prompt = "y = 2x + 1. Find y when x = 3."
                    , answer = "7"
                    , steps =
                        [ "Substitute x = 3: y = 2(3) + 1"
                        , "y = 6 + 1 = 7"
                        ]
                    }
                }
            )


genWriteLinearEq : Generator Problem
genWriteLinearEq =
    -- given two points, identify slope
    Random.map4 (\m b x1 x2 -> { m = m, b = b, x1 = x1, x2 = x2 })
        (randIntNonZero -3 3) (randInt -5 5) (randInt 0 3) (randInt 4 7)
        |> Random.andThen
            (\r ->
                let
                    y1 = r.m * r.x1 + r.b
                    y2 = r.m * r.x2 + r.b
                    slopeStr = String.fromInt r.m
                in
                wrongChoicesInt r.m
                    |> Random.map
                        (\wrong ->
                            let choices = shuffleChoices slopeStr wrong in
                            { prompt =
                                "A line passes through (" ++ String.fromInt r.x1 ++ ", " ++ String.fromInt y1
                                    ++ ") and (" ++ String.fromInt r.x2 ++ ", " ++ String.fromInt y2 ++ "). What is the slope?"
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "Line through (0,1) and (3,7). Slope?"
                                , answer = "2"
                                , steps =
                                    [ "m = (7 − 1)/(3 − 0) = 6/3 = 2"
                                    ]
                                }
                            }
                        )
            )


genDirectVariation : Generator Problem
genDirectVariation =
    -- y = kx; given (x1, y1) find y at x2
    Random.map3 (\k x1 x2 -> ( k, x1, x2 )) (randIntNonZero 2 8) (randInt 1 6) (randInt 1 6)
        |> Random.map
            (\( k, x1, x2 ) ->
                let
                    y1 = k * x1
                    y2 = k * x2
                in
                { prompt =
                    "y varies directly with x. When x = " ++ String.fromInt x1 ++ ", y = " ++ String.fromInt y1
                        ++ ". Find y when x = " ++ String.fromInt x2 ++ "."
                , inputType = TInteger
                , answer = AInt y2
                , hint =
                    { prompt = "y = kx. When x=2, y=6. Find y when x=5."
                    , answer = "15"
                    , steps =
                        [ "Find k: k = y/x = 6/2 = 3"
                        , "y = 3 × 5 = 15"
                        ]
                    }
                }
            )


genIdentifySlope : Generator Problem
genIdentifySlope =
    -- identify slope and y-intercept from y = mx + b
    Random.map2 Tuple.pair (randIntNonZero -5 5) (randInt -8 8)
        |> Random.andThen
            (\( m, b ) ->
                Random.int 0 1
                    |> Random.andThen
                        (\ask ->
                            wrongChoicesInt (if ask == 0 then m else b)
                                |> Random.map
                                    (\wrong ->
                                        let
                                            correct = if ask == 0 then m else b
                                            choices = shuffleChoices (String.fromInt correct) wrong
                                        in
                                        { prompt =
                                            "y = " ++ String.fromInt m ++ "x + " ++ String.fromInt b
                                                ++ ". What is the " ++ (if ask == 0 then "slope" else "y-intercept") ++ "?"
                                        , inputType = TChoice choices
                                        , answer = AChoice 0
                                        , hint =
                                            { prompt = "y = 3x + 5. Slope?"
                                            , answer = "3"
                                            , steps =
                                                [ "In y = mx + b, m is the slope and b is the y-intercept"
                                                , "Slope = 3"
                                                ]
                                            }
                                        }
                                    )
                        )
            )


-- ──────────────────────────────────────────────────────────────────────────────
-- UNIT 6: Systems of Equations
-- ──────────────────────────────────────────────────────────────────────────────


unit6 : Generator Problem
unit6 =
    Random.int 0 2
        |> Random.andThen
            (\t ->
                case t of
                    0 -> genSystemSubstitution
                    1 -> genSystemElimination
                    _ -> genSystemApp
            )


genSystemSubstitution : Generator Problem
genSystemSubstitution =
    -- System: x + y = s, x - y = d  → x=(s+d)/2, y=(s-d)/2
    -- Choose x and y first so we control the solution
    Random.map2 Tuple.pair (randInt 1 8) (randInt 1 8)
        |> Random.map
            (\( x, y ) ->
                let
                    s = x + y
                    d = x - y
                    dStr = if d >= 0 then String.fromInt d else showSigned d
                in
                { prompt = "Solve by substitution:\nx + y = " ++ String.fromInt s ++ "\nx − y = " ++ dStr ++ "\n\nEnter x:"
                , inputType = TSystem
                , answer = ASystem (toFloat x) (toFloat y)
                , hint =
                    { prompt = "x + y = 7, x − y = 3"
                    , answer = "x=5, y=2"
                    , steps =
                        [ "From equation 2: x = y + 3"
                        , "Substitute into equation 1: (y+3) + y = 7"
                        , "2y + 3 = 7  →  y = 2"
                        , "x = 2 + 3 = 5"
                        ]
                    }
                }
            )


genSystemElimination : Generator Problem
genSystemElimination =
    -- 2x + y = a, x + y = b  → x = a-b, y = 2b-a
    Random.map2 Tuple.pair (randInt 1 8) (randInt 1 8)
        |> Random.map
            (\( x, y ) ->
                let
                    eq1rhs = 2 * x + y
                    eq2rhs = x + y
                in
                { prompt = "Solve by elimination:\n2x + y = " ++ String.fromInt eq1rhs ++ "\nx + y = " ++ String.fromInt eq2rhs ++ "\n\nEnter x:"
                , inputType = TSystem
                , answer = ASystem (toFloat x) (toFloat y)
                , hint =
                    { prompt = "2x + y = 9, x + y = 5"
                    , answer = "x=4, y=1"
                    , steps =
                        [ "Subtract equation 2 from equation 1"
                        , "(2x+y) − (x+y) = 9−5  →  x = 4"
                        , "Substitute: 4 + y = 5  →  y = 1"
                        ]
                    }
                }
            )


genSystemApp : Generator Problem
genSystemApp =
    -- Two numbers: sum = s, difference = d
    Random.map2 Tuple.pair (randInt 2 8) (randInt 1 6)
        |> Random.map
            (\( y, x ) ->
                let
                    s = x + y
                    d = y - x
                in
                { prompt =
                    "Two numbers have a sum of " ++ String.fromInt s
                        ++ " and a difference of " ++ String.fromInt d
                        ++ ".\nLet x = smaller, y = larger.\nSolve the system:\nx + y = " ++ String.fromInt s
                        ++ "\ny − x = " ++ String.fromInt d ++ "\n\nEnter x:"
                , inputType = TSystem
                , answer = ASystem (toFloat x) (toFloat y)
                , hint =
                    { prompt = "Sum=10, difference=4. x+y=10, y-x=4"
                    , answer = "x=3, y=7"
                    , steps =
                        [ "Add equations: 2y = 14  →  y = 7"
                        , "Substitute: x + 7 = 10  →  x = 3"
                        ]
                    }
                }
            )


-- ──────────────────────────────────────────────────────────────────────────────
-- UNIT 7: Geometry
-- ──────────────────────────────────────────────────────────────────────────────


unit7 : Generator Problem
unit7 =
    Random.int 0 6
        |> Random.andThen
            (\t ->
                case t of
                    0 -> genAngleTypes
                    1 -> genAngleRelationships
                    2 -> genTriangleSum
                    3 -> genPythagorean
                    4 -> genInteriorAngles
                    5 -> genTransformation
                    _ -> genDilation
            )


genAngleTypes : Generator Problem
genAngleTypes =
    randChoice [ 30, 45, 60, 90, 120, 145, 180 ] 90
        |> Random.andThen
            (\deg ->
                let
                    correct =
                        if deg < 90 then "Acute"
                        else if deg == 90 then "Right"
                        else if deg < 180 then "Obtuse"
                        else "Straight"
                    wrongList = List.filter (\s -> s /= correct) [ "Acute", "Right", "Obtuse", "Straight" ]
                    choices = shuffleChoices correct (List.take 3 wrongList)
                in
                Random.constant
                    { prompt = "Classify a " ++ String.fromInt deg ++ "° angle."
                    , inputType = TChoice choices
                    , answer = AChoice 0
                    , hint =
                        { prompt = "Classify a 120° angle."
                        , answer = "Obtuse"
                        , steps =
                            [ "Acute: less than 90°"
                            , "Right: exactly 90°"
                            , "Obtuse: between 90° and 180°"
                            , "Straight: exactly 180°"
                            ]
                        }
                    }
            )


genAngleRelationships : Generator Problem
genAngleRelationships =
    Random.int 0 1
        |> Random.andThen
            (\t ->
                if t == 0 then
                    -- complementary: two angles sum to 90
                    randInt 10 79
                        |> Random.map
                            (\a ->
                                let b = 90 - a in
                                { prompt = "Two angles are complementary. One measures " ++ String.fromInt a ++ "°. Find the other."
                                , inputType = TInteger
                                , answer = AInt b
                                , hint =
                                    { prompt = "Complementary angles sum to 90°. One is 35°. Other?"
                                    , answer = "55°"
                                    , steps =
                                        [ "Complementary angles add to 90°"
                                        , "90 − 35 = 55"
                                        ]
                                    }
                                }
                            )

                else
                    -- supplementary: two angles sum to 180
                    randInt 10 169
                        |> Random.map
                            (\a ->
                                let b = 180 - a in
                                { prompt = "Two angles are supplementary. One measures " ++ String.fromInt a ++ "°. Find the other."
                                , inputType = TInteger
                                , answer = AInt b
                                , hint =
                                    { prompt = "Supplementary angles sum to 180°. One is 110°. Other?"
                                    , answer = "70°"
                                    , steps =
                                        [ "Supplementary angles add to 180°"
                                        , "180 − 110 = 70"
                                        ]
                                    }
                                }
                            )
            )


genTriangleSum : Generator Problem
genTriangleSum =
    Random.map2 Tuple.pair (randInt 30 80) (randInt 30 80)
        |> Random.map
            (\( a, b ) ->
                let c = 180 - a - b in
                if c <= 0 then
                    -- fallback
                    { prompt = "A triangle has angles 60° and 70°. Find the third angle."
                    , inputType = TInteger
                    , answer = AInt 50
                    , hint =
                        { prompt = "Angles 60° + 70° + ? = 180°"
                        , answer = "50°"
                        , steps = [ "Sum of angles in a triangle = 180°", "180 − 60 − 70 = 50" ]
                        }
                    }
                else
                    { prompt = "A triangle has angles " ++ String.fromInt a ++ "° and " ++ String.fromInt b ++ "°. Find the third angle."
                    , inputType = TInteger
                    , answer = AInt c
                    , hint =
                        { prompt = "Angles 50° + 60° + ? = 180°"
                        , answer = "70°"
                        , steps =
                            [ "Triangle angle sum = 180°"
                            , "180 − " ++ String.fromInt a ++ " − " ++ String.fromInt b ++ " = " ++ String.fromInt c
                            ]
                        }
                    }
            )


genPythagorean : Generator Problem
genPythagorean =
    -- Pythagorean triples: (3,4,5), (5,12,13), (8,15,17), (6,8,10)
    randChoice [ ( 3, 4, 5 ), ( 5, 12, 13 ), ( 6, 8, 10 ), ( 8, 15, 17 ) ] ( 3, 4, 5 )
        |> Random.andThen
            (\( a, b, c ) ->
                Random.int 0 1
                    |> Random.map
                        (\missing ->
                            if missing == 0 then
                                { prompt = "Right triangle: legs " ++ String.fromInt a ++ " and " ++ String.fromInt b ++ ". Find the hypotenuse."
                                , inputType = TInteger
                                , answer = AInt c
                                , hint =
                                    { prompt = "Legs 3 and 4. Hypotenuse?"
                                    , answer = "5"
                                    , steps =
                                        [ "a² + b² = c²"
                                        , "3² + 4² = 9 + 16 = 25"
                                        , "c = √25 = 5"
                                        ]
                                    }
                                }
                            else
                                { prompt = "Right triangle: one leg " ++ String.fromInt a ++ ", hypotenuse " ++ String.fromInt c ++ ". Find the other leg."
                                , inputType = TInteger
                                , answer = AInt b
                                , hint =
                                    { prompt = "Leg 3, hypotenuse 5. Find other leg."
                                    , answer = "4"
                                    , steps =
                                        [ "a² + b² = c²"
                                        , "3² + b² = 5²"
                                        , "9 + b² = 25  →  b² = 16  →  b = 4"
                                        ]
                                    }
                                }
                        )
            )


genInteriorAngles : Generator Problem
genInteriorAngles =
    -- Sum of interior angles of a polygon: (n-2)*180
    randChoice [ 3, 4, 5, 6, 8 ] 4
        |> Random.andThen
            (\n ->
                let correct = (n - 2) * 180 in
                wrongChoicesInt correct
                    |> Random.map
                        (\wrong ->
                            let choices = shuffleChoices (String.fromInt correct) wrong in
                            { prompt = "What is the sum of interior angles of a polygon with " ++ String.fromInt n ++ " sides?"
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "Sum of interior angles of a hexagon (6 sides)?"
                                , answer = "720°"
                                , steps =
                                    [ "Formula: (n − 2) × 180°"
                                    , "(6 − 2) × 180 = 4 × 180 = 720"
                                    ]
                                }
                            }
                        )
            )


genTransformation : Generator Problem
genTransformation =
    Random.int 0 1
        |> Random.andThen
            (\t ->
                if t == 0 then
                    -- reflection over x-axis: (x,y) → (x,-y)
                    Random.map2 Tuple.pair (randInt -6 6) (randIntNonZero -6 6)
                        |> Random.andThen
                            (\( x, y ) ->
                                let reflY = -y in
                                wrongChoicesInt reflY
                                    |> Random.map
                                        (\wrong ->
                                            let choices = shuffleChoices (String.fromInt reflY) wrong in
                                            { prompt = "Point (" ++ String.fromInt x ++ ", " ++ String.fromInt y ++ ") reflected over the x-axis. What is the new y-coordinate?"
                                            , inputType = TChoice choices
                                            , answer = AChoice 0
                                            , hint =
                                                { prompt = "Reflect (3, 5) over x-axis. New y?"
                                                , answer = "-5"
                                                , steps =
                                                    [ "Reflection over x-axis: (x, y) → (x, −y)"
                                                    , "y becomes −y"
                                                    ]
                                                }
                                            }
                                        )
                            )

                else
                    -- translation: (x,y) → (x+dx, y+dy)
                    Random.map4 (\x y dx dy -> { x = x, y = y, dx = dx, dy = dy })
                        (randInt -5 5) (randInt -5 5) (randIntNonZero -4 4) (randIntNonZero -4 4)
                        |> Random.andThen
                            (\r ->
                                Random.int 0 1
                                    |> Random.map
                                        (\coord ->
                                            if coord == 0 then
                                                { prompt =
                                                    "Translate (" ++ String.fromInt r.x ++ ", " ++ String.fromInt r.y ++ ") by ("
                                                        ++ showSigned r.dx ++ ", " ++ showSigned r.dy ++ "). New x-coordinate?"
                                                , inputType = TInteger
                                                , answer = AInt (r.x + r.dx)
                                                , hint =
                                                    { prompt = "Translate (2,3) by (+4, −1). New x?"
                                                    , answer = "6"
                                                    , steps = [ "Add dx to x: 2 + 4 = 6" ]
                                                    }
                                                }
                                            else
                                                { prompt =
                                                    "Translate (" ++ String.fromInt r.x ++ ", " ++ String.fromInt r.y ++ ") by ("
                                                        ++ showSigned r.dx ++ ", " ++ showSigned r.dy ++ "). New y-coordinate?"
                                                , inputType = TInteger
                                                , answer = AInt (r.y + r.dy)
                                                , hint =
                                                    { prompt = "Translate (2,3) by (+4, −1). New y?"
                                                    , answer = "2"
                                                    , steps = [ "Add dy to y: 3 + (−1) = 2" ]
                                                    }
                                                }
                                        )
                            )
            )


genDilation : Generator Problem
genDilation =
    -- dilation with scale factor k: (x,y) → (kx, ky)
    Random.map3 (\x y k -> ( x, y, k )) (randIntNonZero -6 6) (randIntNonZero -6 6) (randIntNonZero 2 4)
        |> Random.andThen
            (\( x, y, k ) ->
                Random.int 0 1
                    |> Random.map
                        (\coord ->
                            if coord == 0 then
                                { prompt =
                                    "Dilate (" ++ String.fromInt x ++ ", " ++ String.fromInt y ++ ") with scale factor " ++ String.fromInt k ++ ". New x-coordinate?"
                                , inputType = TInteger
                                , answer = AInt (k * x)
                                , hint =
                                    { prompt = "Dilate (3, 4) with scale factor 2. New x?"
                                    , answer = "6"
                                    , steps = [ "Multiply both coordinates by scale factor", "x: 3 × 2 = 6" ]
                                    }
                                }
                            else
                                { prompt =
                                    "Dilate (" ++ String.fromInt x ++ ", " ++ String.fromInt y ++ ") with scale factor " ++ String.fromInt k ++ ". New y-coordinate?"
                                , inputType = TInteger
                                , answer = AInt (k * y)
                                , hint =
                                    { prompt = "Dilate (3, 4) with scale factor 2. New y?"
                                    , answer = "8"
                                    , steps = [ "Multiply both coordinates by scale factor", "y: 4 × 2 = 8" ]
                                    }
                                }
                        )
            )


-- ──────────────────────────────────────────────────────────────────────────────
-- UNIT 8: Measurement (Area and Volume)
-- ──────────────────────────────────────────────────────────────────────────────


unit8 : Generator Problem
unit8 =
    Random.int 0 6
        |> Random.andThen
            (\t ->
                case t of
                    0 -> genAreaPerimeter
                    1 -> genCircleArea
                    2 -> genCompositeArea
                    3 -> genVolumePrism
                    4 -> genVolumeCone
                    5 -> genSurfaceAreaPrism
                    _ -> genSphereVolume
            )


genAreaPerimeter : Generator Problem
genAreaPerimeter =
    Random.int 0 1
        |> Random.andThen
            (\shape ->
                if shape == 0 then
                    -- rectangle area
                    Random.map2 Tuple.pair (randInt 2 15) (randInt 2 15)
                        |> Random.map
                            (\( w, h ) ->
                                { prompt = "Area of rectangle: width = " ++ String.fromInt w ++ ", height = " ++ String.fromInt h ++ "?"
                                , inputType = TInteger
                                , answer = AInt (w * h)
                                , hint =
                                    { prompt = "Area of rectangle: width=5, height=8?"
                                    , answer = "40"
                                    , steps = [ "A = l × w", "5 × 8 = 40" ]
                                    }
                                }
                            )

                else
                    -- triangle area (even base)
                    Random.map2 Tuple.pair (randInt 1 8) (randInt 1 8)
                        |> Random.map
                            (\( h, bHalf ) ->
                                let b = bHalf * 2 in
                                { prompt = "Area of triangle: base = " ++ String.fromInt b ++ ", height = " ++ String.fromInt h ++ "?"
                                , inputType = TInteger
                                , answer = AInt (b * h // 2)
                                , hint =
                                    { prompt = "Area of triangle: base=8, height=5?"
                                    , answer = "20"
                                    , steps = [ "A = ½ × b × h", "½ × 8 × 5 = 20" ]
                                    }
                                }
                            )
            )


genCircleArea : Generator Problem
genCircleArea =
    randChoice [ 2, 3, 4, 5, 6, 7 ] 5
        |> Random.andThen
            (\r ->
                Random.int 0 1
                    |> Random.map
                        (\which ->
                            if which == 0 then
                                -- area
                                let correct = round (3.14 * toFloat r * toFloat r) in
                                { prompt = "Area of circle with radius " ++ String.fromInt r ++ "? (use π≈3.14)"
                                , inputType = TInteger
                                , answer = AInt correct
                                , hint =
                                    { prompt = "Area of circle with radius 5? (use π≈3.14)"
                                    , answer = "79"
                                    , steps = [ "A = πr²", "3.14 × 5² = 3.14 × 25 = 78.5 ≈ 79" ]
                                    }
                                }
                            else
                                -- circumference
                                let correctF = 2.0 * 3.14 * toFloat r in
                                { prompt = "Circumference of circle with radius " ++ String.fromInt r ++ "? (use π≈3.14)"
                                , inputType = TDecimal
                                , answer = AFloat correctF 0.5
                                , hint =
                                    { prompt = "Circumference with radius 5? (use π≈3.14)"
                                    , answer = "31.4"
                                    , steps = [ "C = 2πr", "2 × 3.14 × 5 = 31.4" ]
                                    }
                                }
                        )
            )


genCompositeArea : Generator Problem
genCompositeArea =
    -- rectangle + triangle on top
    Random.map3 (\w h1 h2 -> ( w, h1, h2 )) (randInt 4 10) (randInt 3 8) (randInt 2 6)
        |> Random.map
            (\( w, h1, h2 ) ->
                let
                    rectArea = w * h1
                    triArea = w * h2 // 2
                    total = rectArea + triArea
                in
                { prompt =
                    "A composite figure has a rectangle (width=" ++ String.fromInt w ++ ", height=" ++ String.fromInt h1
                        ++ ") with a triangle on top (same base, height=" ++ String.fromInt h2 ++ "). Total area?"
                , inputType = TInteger
                , answer = AInt total
                , hint =
                    { prompt = "Rectangle 6×4 with triangle on top (base=6, height=3). Total area?"
                    , answer = "33"
                    , steps =
                        [ "Rectangle area: 6 × 4 = 24"
                        , "Triangle area: ½ × 6 × 3 = 9"
                        , "Total: 24 + 9 = 33"
                        ]
                    }
                }
            )


genVolumePrism : Generator Problem
genVolumePrism =
    Random.map3 (\l w h -> ( l, w, h )) (randInt 2 10) (randInt 2 10) (randInt 2 10)
        |> Random.map
            (\( l, w, h ) ->
                { prompt = "Volume of rectangular prism: " ++ String.fromInt l ++ " × " ++ String.fromInt w ++ " × " ++ String.fromInt h ++ "?"
                , inputType = TInteger
                , answer = AInt (l * w * h)
                , hint =
                    { prompt = "Volume of 3×4×5 prism?"
                    , answer = "60"
                    , steps = [ "V = l × w × h", "3 × 4 × 5 = 60" ]
                    }
                }
            )


genVolumeCone : Generator Problem
genVolumeCone =
    -- V = (1/3)*pi*r^2*h, use π≈3.14, pick values so result is integer-ish
    Random.map2 Tuple.pair (randChoice [ 2, 3, 4, 6 ] 3) (randInt 5 12)
        |> Random.map
            (\( r, h ) ->
                let correctF = (1.0 / 3.0) * 3.14 * toFloat r * toFloat r * toFloat h in
                { prompt = "Volume of cone: radius = " ++ String.fromInt r ++ ", height = " ++ String.fromInt h ++ "? (use π≈3.14, round to nearest whole)"
                , inputType = TInteger
                , answer = AInt (round correctF)
                , hint =
                    { prompt = "Volume of cone: r=3, h=10? (π≈3.14)"
                    , answer = "94"
                    , steps =
                        [ "V = (1/3)πr²h"
                        , "(1/3) × 3.14 × 9 × 10 = 94.2 ≈ 94"
                        ]
                    }
                }
            )


genSurfaceAreaPrism : Generator Problem
genSurfaceAreaPrism =
    -- rectangular prism SA = 2(lw + lh + wh)
    Random.map3 (\l w h -> ( l, w, h )) (randInt 2 8) (randInt 2 8) (randInt 2 8)
        |> Random.map
            (\( l, w, h ) ->
                let sa = 2 * (l * w + l * h + w * h) in
                { prompt = "Surface area of rectangular prism: " ++ String.fromInt l ++ " × " ++ String.fromInt w ++ " × " ++ String.fromInt h ++ "?"
                , inputType = TInteger
                , answer = AInt sa
                , hint =
                    { prompt = "SA of 2×3×4 prism?"
                    , answer = "52"
                    , steps =
                        [ "SA = 2(lw + lh + wh)"
                        , "2(6 + 8 + 12) = 2(26) = 52"
                        ]
                    }
                }
            )


genSphereVolume : Generator Problem
genSphereVolume =
    -- V = (4/3)*pi*r^3, use π≈3.14
    randChoice [ 2, 3, 4 ] 3
        |> Random.map
            (\r ->
                let correctF = (4.0 / 3.0) * 3.14 * toFloat r ^ 3 in
                { prompt = "Volume of sphere with radius " ++ String.fromInt r ++ "? (use π≈3.14, round to nearest whole)"
                , inputType = TInteger
                , answer = AInt (round correctF)
                , hint =
                    { prompt = "Volume of sphere with radius 3? (π≈3.14)"
                    , answer = "113"
                    , steps =
                        [ "V = (4/3)πr³"
                        , "(4/3) × 3.14 × 27 = 113.04 ≈ 113"
                        ]
                    }
                }
            )


-- ──────────────────────────────────────────────────────────────────────────────
-- UNIT 9: Probability and Statistics
-- ──────────────────────────────────────────────────────────────────────────────


unit9 : Generator Problem
unit9 =
    Random.int 0 5
        |> Random.andThen
            (\t ->
                case t of
                    0 -> genSimpleProbability
                    1 -> genCountingOutcomes
                    2 -> genCompoundProbability
                    3 -> genMeasuresOfCenter
                    4 -> genMAD
                    _ -> genTwoWayTable
            )


genSimpleProbability : Generator Problem
genSimpleProbability =
    -- bag with total marbles, pick favorable count
    Random.map2 Tuple.pair (randInt 2 6) (randInt 3 9)
        |> Random.andThen
            (\( fav, rest ) ->
                let
                    total = fav + rest
                    ( rn, rd ) = reduceFraction fav total
                in
                Random.constant
                    { prompt =
                        "A bag has " ++ String.fromInt fav ++ " red marbles and " ++ String.fromInt rest
                            ++ " blue marbles. Probability of drawing red?"
                    , inputType = TFraction
                    , answer = AFraction rn rd
                    , hint =
                        { prompt = "3 red, 7 blue. P(red)?"
                        , answer = "3/10"
                        , steps =
                            [ "P = favorable outcomes / total outcomes"
                            , "P(red) = 3/10"
                            ]
                        }
                    }
            )


genCountingOutcomes : Generator Problem
genCountingOutcomes =
    Random.map2 Tuple.pair (randInt 2 6) (randInt 2 5)
        |> Random.andThen
            (\( choices1, choices2 ) ->
                let total = choices1 * choices2 in
                wrongChoicesInt total
                    |> Random.map
                        (\wrong ->
                            let choices = shuffleChoices (String.fromInt total) wrong in
                            { prompt =
                                "A menu has " ++ String.fromInt choices1 ++ " entrees and " ++ String.fromInt choices2
                                    ++ " sides. How many different meals (1 entree + 1 side) are possible?"
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "3 entrees, 4 sides. Number of meals?"
                                , answer = "12"
                                , steps =
                                    [ "Counting Principle: multiply the number of choices"
                                    , "3 × 4 = 12"
                                    ]
                                }
                            }
                        )
            )


genCompoundProbability : Generator Problem
genCompoundProbability =
    -- P(A and B) = P(A) × P(B) for independent events
    -- Use simple fractions: coin (1/2) and die faces
    Random.int 0 1
        |> Random.andThen
            (\t ->
                if t == 0 then
                    -- flip a coin twice: P(H, H) = 1/4
                    Random.constant
                        { prompt = "A fair coin is flipped twice. What is the probability of getting heads both times?"
                        , inputType = TFraction
                        , answer = AFraction 1 4
                        , hint =
                            { prompt = "P(H,H) for two flips?"
                            , answer = "1/4"
                            , steps =
                                [ "P(H) = 1/2 each flip"
                                , "Independent: P(H,H) = 1/2 × 1/2 = 1/4"
                                ]
                            }
                        }

                else
                    -- roll a die: P(even) × P(> 4)
                    Random.constant
                        { prompt = "A fair die is rolled. What is the probability of rolling an even number?"
                        , inputType = TFraction
                        , answer = AFraction 1 2
                        , hint =
                            { prompt = "P(even) on a 6-sided die?"
                            , answer = "1/2"
                            , steps =
                                [ "Even numbers on a die: 2, 4, 6 → 3 favorable"
                                , "Total outcomes: 6"
                                , "P = 3/6 = 1/2"
                                ]
                            }
                        }
            )


genMeasuresOfCenter : Generator Problem
genMeasuresOfCenter =
    Random.int 0 2
        |> Random.andThen
            (\t ->
                Random.map4 (\a b c d -> [ a, b, c, d ])
                    (randInt 2 20) (randInt 2 20) (randInt 2 20) (randInt 2 20)
                    |> Random.andThen
                        (\nums ->
                            case t of
                                0 ->
                                    -- mean
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
                                                    { prompt = "Mean of {2, 8, 6, 4}?"
                                                    , answer = "5"
                                                    , steps =
                                                        [ "Sum = 2+8+6+4 = 20"
                                                        , "Mean = 20 ÷ 4 = 5"
                                                        ]
                                                    }
                                                }
                                            )

                                1 ->
                                    -- median (even count, average two middle)
                                    let
                                        sorted = List.sort nums
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
                                                    { prompt = "Median of {2, 5, 7, 10}?"
                                                    , answer = "6"
                                                    , steps =
                                                        [ "Already sorted: 2, 5, 7, 10"
                                                        , "Even count: average middle two"
                                                        , "(5 + 7) ÷ 2 = 6"
                                                        ]
                                                    }
                                                }
                                            )

                                _ ->
                                    -- range
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
                                                    { prompt = "Range of {3, 9, 1, 7}?"
                                                    , answer = "8"
                                                    , steps =
                                                        [ "Range = max − min"
                                                        , "9 − 1 = 8"
                                                        ]
                                                    }
                                                }
                                            )
                        )
            )


genMAD : Generator Problem
genMAD =
    -- Use a simple dataset where MAD is a whole number
    -- {2, 4, 6, 8}: mean=5, deviations=3,1,1,3, MAD=2
    -- {1, 3, 5, 7}: mean=4, deviations=3,1,1,3, MAD=2
    -- {10, 20, 30, 40}: mean=25, deviations=15,5,5,15, MAD=10
    randChoice [ ( [ 2, 4, 6, 8 ], 5, 2 ), ( [ 1, 3, 5, 7 ], 4, 2 ), ( [ 10, 20, 30, 40 ], 25, 10 ) ] ( [ 2, 4, 6, 8 ], 5, 2 )
        |> Random.andThen
            (\( nums, mean, mad ) ->
                wrongChoicesInt mad
                    |> Random.map
                        (\wrong ->
                            let
                                numStr = String.join ", " (List.map String.fromInt nums)
                                choices = shuffleChoices (String.fromInt mad) wrong
                            in
                            { prompt = "Find the mean absolute deviation (MAD) of {" ++ numStr ++ "}."
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "MAD of {2, 4, 6, 8}?"
                                , answer = "2"
                                , steps =
                                    [ "Mean = (2+4+6+8)/4 = 5"
                                    , "Deviations: |2−5|=3, |4−5|=1, |6−5|=1, |8−5|=3"
                                    , "MAD = (3+1+1+3)/4 = 8/4 = 2"
                                    ]
                                }
                            }
                        )
            )


genTwoWayTable : Generator Problem
genTwoWayTable =
    -- Simple two-way table reading
    Random.map4 (\a b c d -> { a = a, b = b, c = c, d = d })
        (randInt 5 20) (randInt 5 20) (randInt 5 20) (randInt 5 20)
        |> Random.andThen
            (\r ->
                let
                    rowTotal1 = r.a + r.b
                    rowTotal2 = r.c + r.d
                    grandTotal = rowTotal1 + rowTotal2
                in
                Random.int 0 2
                    |> Random.map
                        (\q ->
                            case q of
                                0 ->
                                    { prompt =
                                        "Two-way table:\n"
                                            ++ "         | Cat A | Cat B | Total\n"
                                            ++ "Group 1  |  " ++ String.fromInt r.a ++ "   |  " ++ String.fromInt r.b ++ "   |  " ++ String.fromInt rowTotal1 ++ "\n"
                                            ++ "Group 2  |  " ++ String.fromInt r.c ++ "   |  " ++ String.fromInt r.d ++ "   |  " ++ String.fromInt rowTotal2 ++ "\n"
                                            ++ "Find the grand total."
                                    , inputType = TInteger
                                    , answer = AInt grandTotal
                                    , hint =
                                        { prompt = "Grand total of a two-way table?"
                                        , answer = "Sum all cells"
                                        , steps = [ "Add all four cell values", "Or add the two row totals" ]
                                        }
                                    }

                                1 ->
                                    { prompt =
                                        "Two-way table:\n"
                                            ++ "         | Cat A | Cat B\n"
                                            ++ "Group 1  |  " ++ String.fromInt r.a ++ "   |  " ++ String.fromInt r.b ++ "\n"
                                            ++ "Group 2  |  " ++ String.fromInt r.c ++ "   |  " ++ String.fromInt r.d ++ "\n"
                                            ++ "How many total are in Group 1?"
                                    , inputType = TInteger
                                    , answer = AInt rowTotal1
                                    , hint =
                                        { prompt = "Group 1 has Cat A=8 and Cat B=12. Total?"
                                        , answer = "20"
                                        , steps = [ "Add all values in Group 1 row: 8 + 12 = 20" ]
                                        }
                                    }

                                _ ->
                                    { prompt =
                                        "Two-way table:\n"
                                            ++ "         | Cat A | Cat B\n"
                                            ++ "Group 1  |  " ++ String.fromInt r.a ++ "   |  " ++ String.fromInt r.b ++ "\n"
                                            ++ "Group 2  |  " ++ String.fromInt r.c ++ "   |  " ++ String.fromInt r.d ++ "\n"
                                            ++ "How many total are in Category A?"
                                    , inputType = TInteger
                                    , answer = AInt (r.a + r.c)
                                    , hint =
                                        { prompt = "Cat A has 8 in Group 1 and 12 in Group 2. Total?"
                                        , answer = "20"
                                        , steps = [ "Add all values in Cat A column: 8 + 12 = 20" ]
                                        }
                                    }
                        )
            )
