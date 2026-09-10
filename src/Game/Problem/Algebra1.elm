module Game.Problem.Algebra1 exposing (generatorFor, generatorForQuest)

import Game.Problem.Common exposing (..)
import Random exposing (Generator)
import Types exposing (..)


-- ── Top-level dispatchers ─────────────────────────────────────────────────────

generatorFor : Int -> Generator Problem
generatorFor unitNum =
    case unitNum of
        1  -> unit1
        2  -> unit2
        3  -> unit3
        4  -> unit4
        5  -> unit5
        6  -> unit6
        7  -> unit7
        8  -> unit8
        9  -> unit9
        10 -> unit10
        11 -> unit11
        12 -> unit12
        _  -> unit1


generatorForQuest : Int -> Int -> Int -> Generator Problem
generatorForQuest unitNum questIndex _ =
    case ( unitNum, questIndex ) of
        -- Unit 1 (7 quests, indices 0–6)
        ( 1, 0 ) -> genOrderOfOps
        ( 1, 1 ) -> genEvalExpr
        ( 1, 2 ) -> genAbsoluteValue
        ( 1, 3 ) -> genCombineLike
        ( 1, 4 ) -> genTranslateExpr
        ( 1, 5 ) -> genTwoStepEquation
        ( 1, 6 ) -> genTwoStepInequality
        -- Unit 2 (6 quests, indices 0–5)
        ( 2, 0 ) -> genMultiStepEq
        ( 2, 1 ) -> genVarsBothSides
        ( 2, 2 ) -> genAlgebraicProportion
        ( 2, 3 ) -> genAbsValueEq
        ( 2, 4 ) -> genLiteralEq
        ( 2, 5 ) -> genMultiStepIneq
        -- Unit 3 (5 quests, indices 0–4)
        ( 3, 0 ) -> genDomainRange
        ( 3, 1 ) -> genIsFunction
        ( 3, 2 ) -> genEvalFunction
        ( 3, 3 ) -> genFunctionTable
        ( 3, 4 ) -> genArithmeticSeq
        -- Unit 4 (7 quests, indices 0–6)
        ( 4, 0 ) -> genSlopeFromPoints
        ( 4, 1 ) -> genSlopeIntercept
        ( 4, 2 ) -> genYIntercept
        ( 4, 3 ) -> genXIntercept
        ( 4, 4 ) -> genPointSlopeEq
        ( 4, 5 ) -> genParallelSlope
        ( 4, 6 ) -> genPerpSlope
        -- Unit 5 (6 quests, indices 0–5)
        ( 5, 0 ) -> genSystemSubstitution
        ( 5, 1 ) -> genSystemElimination
        ( 5, 2 ) -> genSystemWordProblem
        ( 5, 3 ) -> genSystemIdentifySolution
        ( 5, 4 ) -> genSystemWordProblem
        ( 5, 5 ) -> genSystemSubstitution
        -- Unit 6 (7 quests, indices 0–6)
        ( 6, 0 ) -> genProductRule
        ( 6, 1 ) -> genQuotientRule
        ( 6, 2 ) -> genPowerRule
        ( 6, 3 ) -> genNegativeExponent
        ( 6, 4 ) -> genScientificNotation
        ( 6, 5 ) -> genExpGrowthDecay
        ( 6, 6 ) -> genSimplifyRadical
        -- Unit 7 (6 quests, indices 0–5)
        ( 7, 0 ) -> genAddSubPolynomial
        ( 7, 1 ) -> genMonomialTimesPolynomial
        ( 7, 2 ) -> genFOIL
        ( 7, 3 ) -> genFactorGCF
        ( 7, 4 ) -> genFactorDiffSquares
        ( 7, 5 ) -> genFactorTrinomial
        -- Unit 8 (6 quests, indices 0–5)
        ( 8, 0 ) -> genAxisOfSymmetry
        ( 8, 1 ) -> genDiscriminant
        ( 8, 2 ) -> genSolveByFactoring
        ( 8, 3 ) -> genSolveBySquareRoot
        ( 8, 4 ) -> genQuadraticFormula
        ( 8, 5 ) -> genVertexForm
        -- Unit 9 (4 quests, indices 0–3)
        ( 9, 0 ) -> genIdentifyFunctionType
        ( 9, 1 ) -> genEvalPiecewise
        ( 9, 2 ) -> genIdentifyFunctionType
        ( 9, 3 ) -> genEvalPiecewise
        -- Unit 10 (4 quests, indices 0–3)
        ( 10, 0 ) -> genSimplifyRational
        ( 10, 1 ) -> genMultiplyRational
        ( 10, 2 ) -> genSimplifyRational
        ( 10, 3 ) -> genMultiplyRational
        -- Unit 11 (5 quests, indices 0–4)
        ( 11, 0 ) -> genSimplifyRadical
        ( 11, 1 ) -> genAddSubRadical
        ( 11, 2 ) -> genMultiplyRadical
        ( 11, 3 ) -> genSimplifyRadical
        ( 11, 4 ) -> genSolveRadicalEq
        -- Unit 12 (4 quests, indices 0–3)
        ( 12, 0 ) -> genMeanSD
        ( 12, 1 ) -> genZScore
        ( 12, 2 ) -> genVariance
        ( 12, 3 ) -> genMeanSD
        -- fallback
        _ -> generatorFor unitNum


-- ── Unit generators (full-unit random mix) ───────────────────────────────────

unit1 : Generator Problem
unit1 =
    Random.int 0 5
        |> Random.andThen
            (\t ->
                case t of
                    0 -> genOrderOfOps
                    1 -> genEvalExpr
                    2 -> genAbsoluteValue
                    3 -> genCombineLike
                    4 -> genTranslateExpr
                    _ -> genTwoStepEquation
            )


unit2 : Generator Problem
unit2 =
    Random.int 0 4
        |> Random.andThen
            (\t ->
                case t of
                    0 -> genMultiStepEq
                    1 -> genVarsBothSides
                    2 -> genAlgebraicProportion
                    3 -> genAbsValueEq
                    _ -> genLiteralEq
            )


unit3 : Generator Problem
unit3 =
    Random.int 0 3
        |> Random.andThen
            (\t ->
                case t of
                    0 -> genDomainRange
                    1 -> genIsFunction
                    2 -> genEvalFunction
                    _ -> genArithmeticSeq
            )


unit4 : Generator Problem
unit4 =
    Random.int 0 5
        |> Random.andThen
            (\t ->
                case t of
                    0 -> genSlopeFromPoints
                    1 -> genSlopeIntercept
                    2 -> genYIntercept
                    3 -> genXIntercept
                    4 -> genParallelSlope
                    _ -> genPerpSlope
            )


unit5 : Generator Problem
unit5 =
    Random.int 0 2
        |> Random.andThen
            (\t ->
                case t of
                    0 -> genSystemSubstitution
                    1 -> genSystemElimination
                    _ -> genSystemWordProblem
            )


unit6 : Generator Problem
unit6 =
    Random.int 0 5
        |> Random.andThen
            (\t ->
                case t of
                    0 -> genProductRule
                    1 -> genQuotientRule
                    2 -> genPowerRule
                    3 -> genNegativeExponent
                    4 -> genScientificNotation
                    _ -> genSimplifyRadical
            )


unit7 : Generator Problem
unit7 =
    Random.int 0 4
        |> Random.andThen
            (\t ->
                case t of
                    0 -> genAddSubPolynomial
                    1 -> genMonomialTimesPolynomial
                    2 -> genFOIL
                    3 -> genFactorGCF
                    _ -> genFactorTrinomial
            )


unit8 : Generator Problem
unit8 =
    Random.int 0 4
        |> Random.andThen
            (\t ->
                case t of
                    0 -> genAxisOfSymmetry
                    1 -> genDiscriminant
                    2 -> genSolveByFactoring
                    3 -> genSolveBySquareRoot
                    _ -> genQuadraticFormula
            )


unit9 : Generator Problem
unit9 =
    Random.int 0 1
        |> Random.andThen
            (\t ->
                case t of
                    0 -> genIdentifyFunctionType
                    _ -> genEvalPiecewise
            )


unit10 : Generator Problem
unit10 =
    Random.int 0 1
        |> Random.andThen
            (\t ->
                case t of
                    0 -> genSimplifyRational
                    _ -> genMultiplyRational
            )


unit11 : Generator Problem
unit11 =
    Random.int 0 3
        |> Random.andThen
            (\t ->
                case t of
                    0 -> genSimplifyRadical
                    1 -> genAddSubRadical
                    2 -> genMultiplyRadical
                    _ -> genSolveRadicalEq
            )


unit12 : Generator Problem
unit12 =
    Random.int 0 2
        |> Random.andThen
            (\t ->
                case t of
                    0 -> genMeanSD
                    1 -> genZScore
                    _ -> genVariance
            )


-- ── UNIT 1: Algebra Basics ────────────────────────────────────────────────────

-- Order of operations with integers
genOrderOfOps : Generator Problem
genOrderOfOps =
    Random.map4 (\a b c d -> { a = a, b = b, c = c, d = d })
        (randInt 1 8) (randInt 1 6) (randInt 1 6) (randInt 1 5)
        |> Random.andThen
            (\r ->
                -- a + b * c - d
                let correct = r.a + r.b * r.c - r.d in
                wrongChoicesInt correct
                    |> Random.map
                        (\wrong ->
                            let choices = shuffleChoices (String.fromInt correct) wrong in
                            { prompt =
                                String.fromInt r.a ++ " + " ++ String.fromInt r.b
                                    ++ " × " ++ String.fromInt r.c
                                    ++ " − " ++ String.fromInt r.d ++ " = ?"
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "2 + 3 × 4 − 1 = ?"
                                , answer = "13"
                                , steps =
                                    [ "Multiply first (PEMDAS): 3 × 4 = 12"
                                    , "Then left to right: 2 + 12 = 14"
                                    , "Finally: 14 − 1 = 13"
                                    ]
                                }
                            }
                        )
            )


-- Evaluate ax + b for given x
genEvalExpr : Generator Problem
genEvalExpr =
    Random.map3 (\a b x -> ( a, b, x ))
        (randInt 1 9) (randInt 0 9) (randInt 1 9)
        |> Random.map
            (\( a, b, x ) ->
                { prompt =
                    "Evaluate " ++ String.fromInt a ++ "x + " ++ String.fromInt b
                        ++ " when x = " ++ String.fromInt x
                , inputType = TInteger
                , answer = AInt (a * x + b)
                , hint =
                    { prompt = "Evaluate 3x + 5 when x = 2"
                    , answer = "11"
                    , steps =
                        [ "Substitute: 3(2) + 5"
                        , "Multiply: 6 + 5"
                        , "Add: 11"
                        ]
                    }
                }
            )


-- Absolute value |n|
genAbsoluteValue : Generator Problem
genAbsoluteValue =
    randInt -15 15
        |> Random.andThen
            (\n ->
                wrongChoicesInt (abs n)
                    |> Random.map
                        (\wrong ->
                            let
                                correct = abs n
                                choices = shuffleChoices (String.fromInt correct) wrong
                            in
                            { prompt = "|" ++ String.fromInt n ++ "| = ?"
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "|−7| = ?"
                                , answer = "7"
                                , steps =
                                    [ "Absolute value is the distance from zero"
                                    , "Always non-negative"
                                    , "|−7| = 7"
                                    ]
                                }
                            }
                        )
            )


-- Combine like terms: ax + bx = ?x  (answer is coefficient)
genCombineLike : Generator Problem
genCombineLike =
    Random.map2 Tuple.pair (randInt 1 9) (randInt 1 9)
        |> Random.andThen
            (\( a, b ) ->
                wrongChoicesInt (a + b)
                    |> Random.map
                        (\wrong ->
                            let
                                correct = a + b
                                choices = shuffleChoices (String.fromInt correct) wrong
                            in
                            { prompt =
                                String.fromInt a ++ "x + " ++ String.fromInt b ++ "x = ?x"
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "3x + 5x = ?x"
                                , answer = "8x"
                                , steps =
                                    [ "Add the coefficients: 3 + 5 = 8"
                                    , "Keep the variable: 8x"
                                    ]
                                }
                            }
                        )
            )


-- Translate: "the sum of a number and k" → x + k, evaluate at given x
genTranslateExpr : Generator Problem
genTranslateExpr =
    Random.int 0 2
        |> Random.andThen
            (\t ->
                case t of
                    0 ->
                        Random.map2 Tuple.pair (randInt 2 9) (randInt 1 9)
                            |> Random.map
                                (\( k, x ) ->
                                    { prompt =
                                        "\"" ++ String.fromInt k ++ " more than a number\" — evaluate when the number is " ++ String.fromInt x
                                    , inputType = TInteger
                                    , answer = AInt (x + k)
                                    , hint =
                                        { prompt = "\"5 more than a number\" when the number is 3"
                                        , answer = "8"
                                        , steps =
                                            [ "Translate: x + 5"
                                            , "Substitute x = 3: 3 + 5 = 8"
                                            ]
                                        }
                                    }
                                )

                    1 ->
                        Random.map2 Tuple.pair (randInt 2 8) (randInt 2 9)
                            |> Random.map
                                (\( k, x ) ->
                                    { prompt =
                                        "\"" ++ String.fromInt k ++ " times a number\" — evaluate when the number is " ++ String.fromInt x
                                    , inputType = TInteger
                                    , answer = AInt (k * x)
                                    , hint =
                                        { prompt = "\"4 times a number\" when the number is 3"
                                        , answer = "12"
                                        , steps =
                                            [ "Translate: 4x"
                                            , "Substitute x = 3: 4(3) = 12"
                                            ]
                                        }
                                    }
                                )

                    _ ->
                        Random.map2 Tuple.pair (randInt 1 9) (randInt 2 9)
                            |> Random.map
                                (\( k, x ) ->
                                    { prompt =
                                        "\"A number decreased by " ++ String.fromInt k ++ "\" — evaluate when the number is " ++ String.fromInt (x + k)
                                    , inputType = TInteger
                                    , answer = AInt x
                                    , hint =
                                        { prompt = "\"A number decreased by 3\" when the number is 7"
                                        , answer = "4"
                                        , steps =
                                            [ "Translate: x − 3"
                                            , "Substitute x = 7: 7 − 3 = 4"
                                            ]
                                        }
                                    }
                                )
            )


-- Solve two-step equation: ax + b = c  → x = (c-b)/a
genTwoStepEquation : Generator Problem
genTwoStepEquation =
    Random.map3 (\a b x -> ( a, b, x ))
        (randIntNonZero 1 6) (randInt 1 9) (randInt 1 9)
        |> Random.map
            (\( a, b, x ) ->
                let
                    c = a * x + b
                in
                { prompt =
                    String.fromInt a ++ "x + " ++ String.fromInt b ++ " = " ++ String.fromInt c
                , inputType = TInteger
                , answer = AInt x
                , hint =
                    { prompt = "2x + 3 = 11"
                    , answer = "x = 4"
                    , steps =
                        [ "Subtract 3 from both sides: 2x = 8"
                        , "Divide both sides by 2: x = 4"
                        ]
                    }
                }
            )


-- Two-step inequality: ax + b > c or < c
genTwoStepInequality : Generator Problem
genTwoStepInequality =
    Random.map4 (\a b x t -> { a = a, b = b, x = x, t = t })
        (randIntNonZero 1 5) (randInt 1 8) (randInt 1 8) (Random.int 0 1)
        |> Random.map
            (\r ->
                let
                    c = r.a * r.x + r.b
                    ( dir, symStr, dirType ) =
                        if r.t == 0 then
                            ( " > ", ">", IGt )
                        else
                            ( " < ", "<", ILt )
                    -- solution: x > x0  or  x < x0
                    x0 = toFloat r.x
                in
                { prompt =
                    String.fromInt r.a ++ "x + " ++ String.fromInt r.b ++ dir ++ String.fromInt c
                , inputType = TInequality
                , answer = AInequality dirType x0
                , hint =
                    { prompt = "2x + 1 > 7"
                    , answer = "x > 3"
                    , steps =
                        [ "Subtract 1: 2x > 6"
                        , "Divide by 2: x > 3"
                        ]
                    }
                }
            )


-- ── UNIT 2: Multi-Step Equations and Inequalities ────────────────────────────

-- Multi-step: a(x + b) = c  → x = c/a - b
genMultiStepEq : Generator Problem
genMultiStepEq =
    Random.map3 (\a b x -> ( a, b, x ))
        (randIntNonZero 2 6) (randInt 1 8) (randInt 1 8)
        |> Random.map
            (\( a, b, x ) ->
                let
                    c = a * (x + b)
                in
                { prompt =
                    String.fromInt a ++ "(x + " ++ String.fromInt b ++ ") = " ++ String.fromInt c
                , inputType = TInteger
                , answer = AInt x
                , hint =
                    { prompt = "3(x + 2) = 15"
                    , answer = "x = 3"
                    , steps =
                        [ "Divide both sides by 3: x + 2 = 5"
                        , "Subtract 2: x = 3"
                        ]
                    }
                }
            )


-- Variables on both sides: ax + b = cx + d
genVarsBothSides : Generator Problem
genVarsBothSides =
    Random.map4 (\a b c x -> { a = a, b = b, c = c, x = x })
        (randIntNonZero 2 8) (randInt 1 12) (randIntNonZero 1 4) (randInt 1 8)
        |> Random.map
            (\r ->
                let
                    -- equation: r.a*x + r.b = r.c*x + d  where d = (r.a - r.c)*r.x + r.b
                    d = (r.a - r.c) * r.x + r.b
                    aStr = String.fromInt r.a ++ "x"
                    cStr = String.fromInt r.c ++ "x"
                in
                { prompt =
                    aStr ++ " + " ++ String.fromInt r.b ++ " = " ++ cStr ++ " + " ++ String.fromInt d
                , inputType = TInteger
                , answer = AInt r.x
                , hint =
                    { prompt = "5x + 2 = 3x + 8"
                    , answer = "x = 3"
                    , steps =
                        [ "Subtract 3x from both sides: 2x + 2 = 8"
                        , "Subtract 2: 2x = 6"
                        , "Divide by 2: x = 3"
                        ]
                    }
                }
            )


-- Algebraic proportion: a/b = c/x  → x = bc/a
genAlgebraicProportion : Generator Problem
genAlgebraicProportion =
    Random.map3 (\a b c -> ( a, b, c ))
        (randIntNonZero 2 8) (randInt 1 8) (randIntNonZero 2 6)
        |> Random.andThen
            (\( a, b, c ) ->
                -- ensure integer answer
                let x = b * c // a in
                if a == 0 || modBy a (b * c) /= 0 || x <= 0 then
                    genAlgebraicProportion
                else
                    wrongChoicesInt x
                        |> Random.map
                            (\wrong ->
                                let choices = shuffleChoices (String.fromInt x) wrong in
                                { prompt =
                                    String.fromInt a ++ "/" ++ String.fromInt b
                                        ++ " = " ++ String.fromInt c ++ "/x"
                                , inputType = TChoice choices
                                , answer = AChoice 0
                                , hint =
                                    { prompt = "3/4 = 6/x"
                                    , answer = "x = 8"
                                    , steps =
                                        [ "Cross-multiply: 3x = 24"
                                        , "Divide: x = 8"
                                        ]
                                    }
                                }
                            )
            )


-- Absolute value equation: |ax + b| = c → two roots
genAbsValueEq : Generator Problem
genAbsValueEq =
    Random.map3 (\a b c -> ( a, b, c ))
        (randIntNonZero 1 4) (randInt 0 8) (randInt 2 12)
        |> Random.map
            (\( a, b, c ) ->
                -- |ax + b| = c  → ax + b = c  or  ax + b = -c
                -- roots: x = (c - b)/a  and  x = (-c - b)/a
                let
                    r1 = toFloat (c - b) / toFloat a
                    r2 = toFloat (-c - b) / toFloat a
                in
                { prompt =
                    "|" ++ String.fromInt a ++ "x + " ++ String.fromInt b ++ "| = " ++ String.fromInt c
                , inputType = TRoots
                , answer = ARoots r1 r2
                , hint =
                    { prompt = "|2x + 3| = 7"
                    , answer = "x = 2 or x = −5"
                    , steps =
                        [ "Set up two cases: 2x+3 = 7 and 2x+3 = −7"
                        , "Case 1: 2x = 4, x = 2"
                        , "Case 2: 2x = −10, x = −5"
                        ]
                    }
                }
            )


-- Literal equation: solve for one variable (ax + b = cx + d  solved for the constant)
-- Simplified: given P = 2l + 2w, find w when P and l are given
genLiteralEq : Generator Problem
genLiteralEq =
    Random.map2 Tuple.pair (randInt 2 10) (randInt 1 8)
        |> Random.map
            (\( l, w ) ->
                let p = 2 * l + 2 * w in
                { prompt =
                    "Perimeter P = 2l + 2w. Find w when P = " ++ String.fromInt p ++ " and l = " ++ String.fromInt l
                , inputType = TInteger
                , answer = AInt w
                , hint =
                    { prompt = "P = 2l + 2w. Find w when P = 20 and l = 6."
                    , answer = "w = 4"
                    , steps =
                        [ "Substitute: 20 = 2(6) + 2w"
                        , "20 = 12 + 2w → 2w = 8 → w = 4"
                        ]
                    }
                }
            )


-- Multi-step inequality: ax - b > c  → x > (c+b)/a
genMultiStepIneq : Generator Problem
genMultiStepIneq =
    Random.map4 (\a b x t -> { a = a, b = b, x = x, t = t })
        (randIntNonZero 2 6) (randInt 1 8) (randInt 1 8) (Random.int 0 1)
        |> Random.map
            (\r ->
                let
                    c = r.a * r.x - r.b
                    ( dirStr, dirType ) =
                        if r.t == 0 then
                            ( " > ", IGt )
                        else
                            ( " < ", ILt )
                    x0 = toFloat r.x
                in
                { prompt =
                    String.fromInt r.a ++ "x − " ++ String.fromInt r.b ++ dirStr ++ String.fromInt c
                , inputType = TInequality
                , answer = AInequality dirType x0
                , hint =
                    { prompt = "3x − 2 > 7"
                    , answer = "x > 3"
                    , steps =
                        [ "Add 2 to both sides: 3x > 9"
                        , "Divide by 3: x > 3"
                        ]
                    }
                }
            )


-- ── UNIT 3: Relations and Functions ──────────────────────────────────────────

-- Domain/range: given a list of pairs, what is the domain?
genDomainRange : Generator Problem
genDomainRange =
    Random.map4 (\a b c d -> { a = a, b = b, c = c, d = d })
        (randInt 1 5) (randInt 6 10) (randInt 11 15) (randInt 16 20)
        |> Random.andThen
            (\r ->
                wrongChoicesInt r.a
                    |> Random.map
                        (\wrong ->
                            let choices = shuffleChoices (String.fromInt r.a) wrong in
                            { prompt =
                                "The relation is {(" ++ String.fromInt r.a ++ ", 2), ("
                                    ++ String.fromInt r.b ++ ", 5), ("
                                    ++ String.fromInt r.c ++ ", 3), ("
                                    ++ String.fromInt r.d ++ ", 8)}. What is the smallest element of the domain?"
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "Domain of {(1,2),(3,4),(5,6)}?"
                                , answer = "The domain is {1, 3, 5}"
                                , steps =
                                    [ "The domain is the set of all x-values (first coordinates)"
                                    , "List first elements: 1, 3, 5"
                                    ]
                                }
                            }
                        )
            )


-- Is this mapping a function?
genIsFunction : Generator Problem
genIsFunction =
    Random.int 0 3
        |> Random.map
            (\t ->
                case t of
                    0 ->
                        { prompt = "Is this a function? {(1,2), (2,3), (3,4), (4,5)}"
                        , inputType = TChoice [ "Yes", "No" ]
                        , answer = AChoice 0
                        , hint =
                            { prompt = "Is {(1,2),(2,3)} a function?"
                            , answer = "Yes"
                            , steps =
                                [ "Each x-value maps to exactly one y-value"
                                , "No repeated x-values → it is a function"
                                ]
                            }
                        }

                    1 ->
                        { prompt = "Is this a function? {(1,2), (1,3), (2,4)}"
                        , inputType = TChoice [ "Yes", "No" ]
                        , answer = AChoice 1
                        , hint =
                            { prompt = "Is {(1,2),(1,3)} a function?"
                            , answer = "No"
                            , steps =
                                [ "The x-value 1 maps to both 2 and 3"
                                , "One input has two outputs → not a function"
                                ]
                            }
                        }

                    2 ->
                        { prompt = "Is this a function? {(2,5), (3,5), (4,5)}"
                        , inputType = TChoice [ "Yes", "No" ]
                        , answer = AChoice 0
                        , hint =
                            { prompt = "Is {(2,5),(3,5),(4,5)} a function?"
                            , answer = "Yes"
                            , steps =
                                [ "Each x maps to exactly one y (even if y is the same)"
                                , "No repeated x-values → it is a function"
                                ]
                            }
                        }

                    _ ->
                        { prompt = "Is this a function? {(0,1), (0,−1), (1,0)}"
                        , inputType = TChoice [ "Yes", "No" ]
                        , answer = AChoice 1
                        , hint =
                            { prompt = "Is {(0,1),(0,−1)} a function?"
                            , answer = "No"
                            , steps =
                                [ "x = 0 maps to 1 and also to −1"
                                , "One input with two outputs → not a function"
                                ]
                            }
                        }
            )


-- Evaluate f(x) = ax + b at given point
genEvalFunction : Generator Problem
genEvalFunction =
    Random.map3 (\a b x -> ( a, b, x ))
        (randInt 1 7) (randInt 0 9) (randInt 1 8)
        |> Random.map
            (\( a, b, x ) ->
                { prompt =
                    "f(x) = " ++ String.fromInt a ++ "x + " ++ String.fromInt b
                        ++ ". Find f(" ++ String.fromInt x ++ ")."
                , inputType = TInteger
                , answer = AInt (a * x + b)
                , hint =
                    { prompt = "f(x) = 2x + 1. Find f(3)."
                    , answer = "7"
                    , steps =
                        [ "Substitute x = 3: f(3) = 2(3) + 1"
                        , "= 6 + 1 = 7"
                        ]
                    }
                }
            )


-- Function table: given f(x) = ax + b, find f(k)
genFunctionTable : Generator Problem
genFunctionTable =
    Random.map3 (\a b x -> ( a, b, x ))
        (randInt 2 6) (randInt 0 5) (randInt 1 6)
        |> Random.map
            (\( a, b, x ) ->
                { prompt =
                    "Complete the table for f(x) = " ++ String.fromInt a ++ "x + " ++ String.fromInt b
                        ++ ". What is f(" ++ String.fromInt x ++ ")?"
                , inputType = TInteger
                , answer = AInt (a * x + b)
                , hint =
                    { prompt = "f(x) = 3x + 2. Find f(4)."
                    , answer = "14"
                    , steps =
                        [ "Replace x with 4: 3(4) + 2"
                        , "= 12 + 2 = 14"
                        ]
                    }
                }
            )


-- Arithmetic sequence: find next term
genArithmeticSeq : Generator Problem
genArithmeticSeq =
    Random.map2 Tuple.pair (randInt 1 20) (randInt 1 8)
        |> Random.andThen
            (\( first, d ) ->
                wrongChoicesInt (first + 4 * d)
                    |> Random.map
                        (\wrong ->
                            let
                                a1 = first
                                a2 = first + d
                                a3 = first + 2 * d
                                a4 = first + 3 * d
                                a5 = first + 4 * d
                                choices = shuffleChoices (String.fromInt a5) wrong
                            in
                            { prompt =
                                "Find the next term: "
                                    ++ String.fromInt a1 ++ ", "
                                    ++ String.fromInt a2 ++ ", "
                                    ++ String.fromInt a3 ++ ", "
                                    ++ String.fromInt a4 ++ ", ?"
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "Find the next term: 3, 7, 11, 15, ?"
                                , answer = "19"
                                , steps =
                                    [ "Common difference: 7 − 3 = 4"
                                    , "Next term: 15 + 4 = 19"
                                    ]
                                }
                            }
                        )
            )


-- ── UNIT 4: Linear Equations ──────────────────────────────────────────────────

-- Slope from two points
genSlopeFromPoints : Generator Problem
genSlopeFromPoints =
    Random.map4 (\x1 y1 dx dy -> { x1 = x1, y1 = y1, dx = dx, dy = dy })
        (randInt -5 4) (randInt -5 4) (randIntNonZero 1 5) (randInt -5 5)
        |> Random.andThen
            (\r ->
                let
                    x2 = r.x1 + r.dx
                    y2 = r.y1 + r.dy
                    -- slope = dy/dx; only use integer slopes
                    slopeNum = r.dy
                    slopeDen = r.dx
                    ( rn, rd ) = reduceFraction slopeNum slopeDen
                in
                if rd == 0 then
                    genSlopeFromPoints
                else
                    wrongChoicesInt rn
                        |> Random.map
                            (\wrong ->
                                let
                                    slopeStr =
                                        if rd == 1 then
                                            String.fromInt rn
                                        else
                                            String.fromInt rn ++ "/" ++ String.fromInt rd
                                    choices = shuffleChoices slopeStr wrong
                                in
                                { prompt =
                                    "Find the slope through ("
                                        ++ String.fromInt r.x1 ++ ", " ++ String.fromInt r.y1
                                        ++ ") and ("
                                        ++ String.fromInt x2 ++ ", " ++ String.fromInt y2 ++ ")."
                                , inputType = TChoice choices
                                , answer = AChoice 0
                                , hint =
                                    { prompt = "Slope through (1, 2) and (3, 6)?"
                                    , answer = "2"
                                    , steps =
                                        [ "m = (y₂ − y₁) / (x₂ − x₁)"
                                        , "= (6 − 2) / (3 − 1) = 4/2 = 2"
                                        ]
                                    }
                                }
                            )
            )


-- y-intercept of y = mx + b
genSlopeIntercept : Generator Problem
genSlopeIntercept =
    Random.map2 Tuple.pair (randIntNonZero -5 5) (randInt -9 9)
        |> Random.andThen
            (\( m, b ) ->
                wrongChoicesInt b
                    |> Random.map
                        (\wrong ->
                            let choices = shuffleChoices (String.fromInt b) wrong in
                            { prompt =
                                "What is the y-intercept of y = " ++ showSigned m ++ "x + " ++ String.fromInt b ++ "?"
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "y-intercept of y = 3x + 5?"
                                , answer = "5"
                                , steps =
                                    [ "The y-intercept is the value of b in y = mx + b"
                                    , "When x = 0: y = b"
                                    , "Answer: 5"
                                    ]
                                }
                            }
                        )
            )


-- Find y-intercept (set x=0)
genYIntercept : Generator Problem
genYIntercept =
    Random.map3 (\a b c -> ( a, b, c ))
        (randIntNonZero 1 5) (randIntNonZero 1 5) (randInt 2 20)
        |> Random.map
            (\( a, b, c ) ->
                -- ax + by = c  → y-intercept: set x=0 → y = c/b
                -- ensure divisible
                let
                    bAdj = if modBy b c == 0 then b else 1
                    yInt = c // bAdj
                in
                { prompt =
                    String.fromInt a ++ "x + " ++ String.fromInt bAdj ++ "y = " ++ String.fromInt c
                        ++ ". Find the y-intercept."
                , inputType = TInteger
                , answer = AInt yInt
                , hint =
                    { prompt = "2x + 3y = 12. Find the y-intercept."
                    , answer = "4"
                    , steps =
                        [ "Set x = 0: 3y = 12"
                        , "Divide: y = 4"
                        ]
                    }
                }
            )


-- Find x-intercept (set y=0)
genXIntercept : Generator Problem
genXIntercept =
    Random.map3 (\a b c -> ( a, b, c ))
        (randIntNonZero 1 5) (randIntNonZero 1 5) (randInt 2 20)
        |> Random.map
            (\( a, b, c ) ->
                let
                    aAdj = if modBy a c == 0 then a else 1
                    xInt = c // aAdj
                in
                { prompt =
                    String.fromInt aAdj ++ "x + " ++ String.fromInt b ++ "y = " ++ String.fromInt c
                        ++ ". Find the x-intercept."
                , inputType = TInteger
                , answer = AInt xInt
                , hint =
                    { prompt = "2x + 3y = 10. Find the x-intercept."
                    , answer = "5"
                    , steps =
                        [ "Set y = 0: 2x = 10"
                        , "Divide: x = 5"
                        ]
                    }
                }
            )


-- Point-slope → find y when x is given
genPointSlopeEq : Generator Problem
genPointSlopeEq =
    Random.map4 (\m x1 y1 x -> { m = m, x1 = x1, y1 = y1, x = x })
        (randIntNonZero -4 4) (randInt -3 3) (randInt -5 5) (randInt 1 6)
        |> Random.map
            (\r ->
                let
                    -- y - y1 = m(x - x1)
                    xTarget = r.x1 + r.x
                    yTarget = r.y1 + r.m * r.x
                in
                { prompt =
                    "A line passes through ("
                        ++ String.fromInt r.x1 ++ ", " ++ String.fromInt r.y1
                        ++ ") with slope " ++ showSigned r.m
                        ++ ". Find y when x = " ++ String.fromInt xTarget ++ "."
                , inputType = TInteger
                , answer = AInt yTarget
                , hint =
                    { prompt = "Through (1, 2) with slope 3. Find y when x = 3."
                    , answer = "8"
                    , steps =
                        [ "y − 2 = 3(x − 1)"
                        , "y − 2 = 3(3 − 1) = 6"
                        , "y = 8"
                        ]
                    }
                }
            )


-- Parallel lines: same slope
genParallelSlope : Generator Problem
genParallelSlope =
    Random.map2 Tuple.pair (randIntNonZero -5 5) (randInt -9 9)
        |> Random.andThen
            (\( m, b ) ->
                wrongChoicesInt m
                    |> Random.map
                        (\wrong ->
                            let choices = shuffleChoices (String.fromInt m) wrong in
                            { prompt =
                                "A line parallel to y = " ++ showSigned m ++ "x + " ++ String.fromInt b
                                    ++ " has what slope?"
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "Slope of a line parallel to y = 4x + 1?"
                                , answer = "4"
                                , steps =
                                    [ "Parallel lines have the same slope"
                                    , "Slope of y = 4x + 1 is 4"
                                    ]
                                }
                            }
                        )
            )


-- Perpendicular lines: negative reciprocal slope
genPerpSlope : Generator Problem
genPerpSlope =
    Random.map2 Tuple.pair (randIntNonZero 1 5) (randInt -9 9)
        |> Random.andThen
            (\( m, b ) ->
                -- perp slope is -1/m; show as fraction if m /= 1
                let
                    ( pn, pd ) = reduceFraction (-1) m
                    perpStr =
                        if pd == 1 then String.fromInt pn
                        else String.fromInt pn ++ "/" ++ String.fromInt pd
                    wrongs =
                        [ String.fromInt m
                        , String.fromInt (-m)
                        , "1/" ++ String.fromInt m
                        ]
                    choices = shuffleChoices perpStr wrongs
                in
                Random.constant
                    { prompt =
                        "A line perpendicular to y = " ++ String.fromInt m ++ "x + " ++ String.fromInt b
                            ++ " has what slope?"
                    , inputType = TChoice choices
                    , answer = AChoice 0
                    , hint =
                        { prompt = "Slope perpendicular to y = 2x + 1?"
                        , answer = "−1/2"
                        , steps =
                            [ "Perpendicular slope = negative reciprocal"
                            , "Flip and negate 2: −1/2"
                            ]
                        }
                    }
            )


-- ── UNIT 5: Systems of Equations ─────────────────────────────────────────────

-- Substitution: y = ax + b substituted into cx + dy = e
genSystemSubstitution : Generator Problem
genSystemSubstitution =
    Random.map4 (\a b c x -> { a = a, b = b, c = c, x = x })
        (randIntNonZero 1 4) (randInt -5 5) (randIntNonZero 2 6) (randInt 1 6)
        |> Random.map
            (\r ->
                let
                    y = r.a * r.x + r.b
                    -- second equation: r.c * x + y = e
                    e = r.c * r.x + y
                in
                { prompt =
                    "Solve the system:\ny = " ++ showSigned r.a ++ "x + " ++ String.fromInt r.b
                        ++ "\n" ++ String.fromInt r.c ++ "x + y = " ++ String.fromInt e
                , inputType = TSystem
                , answer = ASystem (toFloat r.x) (toFloat y)
                , hint =
                    { prompt = "y = 2x + 1, 3x + y = 11"
                    , answer = "x = 2, y = 5"
                    , steps =
                        [ "Substitute y = 2x+1 into 3x+y=11"
                        , "3x + (2x+1) = 11 → 5x = 10 → x = 2"
                        , "y = 2(2)+1 = 5"
                        ]
                    }
                }
            )


-- Elimination: ax + by = c, dx + ey = f (eliminate by adding)
genSystemElimination : Generator Problem
genSystemElimination =
    Random.map4 (\a b x y -> { a = a, b = b, x = x, y = y })
        (randIntNonZero 1 5) (randIntNonZero 1 5) (randInt 1 6) (randInt 1 6)
        |> Random.map
            (\r ->
                let
                    c = r.a * r.x + r.b * r.y
                    -- second eq: r.a*x - r.b*y = c2 (subtract to eliminate y)
                    c2 = r.a * r.x - r.b * r.y
                in
                { prompt =
                    "Solve the system:\n"
                        ++ String.fromInt r.a ++ "x + " ++ String.fromInt r.b ++ "y = " ++ String.fromInt c
                        ++ "\n" ++ String.fromInt r.a ++ "x − " ++ String.fromInt r.b ++ "y = " ++ String.fromInt c2
                , inputType = TSystem
                , answer = ASystem (toFloat r.x) (toFloat r.y)
                , hint =
                    { prompt = "2x + 3y = 12, 2x − 3y = 0"
                    , answer = "x = 3, y = 2"
                    , steps =
                        [ "Add the equations: 4x = 12 → x = 3"
                        , "Substitute into first: 2(3)+3y=12 → y=2"
                        ]
                    }
                }
            )


-- System word problem: two numbers, x + y = a and x - y = b
genSystemWordProblem : Generator Problem
genSystemWordProblem =
    Random.map2 Tuple.pair (randInt 2 10) (randInt 1 8)
        |> Random.map
            (\( larger, smaller ) ->
                let
                    sumAB = larger + smaller
                    diffAB = larger - smaller
                in
                { prompt =
                    "Two numbers sum to " ++ String.fromInt sumAB
                        ++ " and their difference is " ++ String.fromInt diffAB
                        ++ ". Find the larger number."
                , inputType = TInteger
                , answer = AInt larger
                , hint =
                    { prompt = "Two numbers sum to 13 and differ by 3. Larger number?"
                    , answer = "8"
                    , steps =
                        [ "x + y = 13 and x − y = 3"
                        , "Add: 2x = 16 → x = 8"
                        ]
                    }
                }
            )


-- Identify solution of a system
genSystemIdentifySolution : Generator Problem
genSystemIdentifySolution =
    Random.map2 Tuple.pair (randInt 1 5) (randInt 1 5)
        |> Random.andThen
            (\( x, y ) ->
                let
                    -- System: x + y = s, 2x + y = s + x
                    s = x + y
                    t = 2 * x + y
                    xStr = String.fromInt x
                    yStr = String.fromInt y
                    wrong1 = "(" ++ String.fromInt (x + 1) ++ ", " ++ String.fromInt y ++ ")"
                    wrong2 = "(" ++ xStr ++ ", " ++ String.fromInt (y + 1) ++ ")"
                    wrong3 = "(" ++ String.fromInt (x - 1) ++ ", " ++ String.fromInt (y + 1) ++ ")"
                    correct = "(" ++ xStr ++ ", " ++ yStr ++ ")"
                    choices = shuffleChoices correct [ wrong1, wrong2, wrong3 ]
                in
                Random.constant
                    { prompt =
                        "Which ordered pair is the solution?\nx + y = " ++ String.fromInt s
                            ++ "\n2x + y = " ++ String.fromInt t
                    , inputType = TChoice choices
                    , answer = AChoice 0
                    , hint =
                        { prompt = "Solve: x+y=5, 2x+y=8"
                        , answer = "(3, 2)"
                        , steps =
                            [ "Subtract first from second: x = 3"
                            , "Substitute: 3 + y = 5 → y = 2"
                            ]
                        }
                    }
            )


-- ── UNIT 6: Exponents and Exponential Functions ───────────────────────────────

-- Product rule: x^a * x^b = x^(a+b)
genProductRule : Generator Problem
genProductRule =
    Random.map2 Tuple.pair (randInt 2 7) (randInt 2 6)
        |> Random.andThen
            (\( a, b ) ->
                wrongChoicesInt (a + b)
                    |> Random.map
                        (\wrong ->
                            let
                                correct = a + b
                                choices = shuffleChoices (String.fromInt correct) wrong
                            in
                            { prompt =
                                "x" ++ superscript a ++ " · x" ++ superscript b ++ " = x^?"
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "x³ · x⁴ = x^?"
                                , answer = "x⁷"
                                , steps =
                                    [ "Product rule: add exponents"
                                    , "3 + 4 = 7 → x⁷"
                                    ]
                                }
                            }
                        )
            )


-- Quotient rule: x^a / x^b = x^(a-b)
genQuotientRule : Generator Problem
genQuotientRule =
    Random.map2 Tuple.pair (randInt 5 10) (randInt 2 4)
        |> Random.andThen
            (\( a, b ) ->
                wrongChoicesInt (a - b)
                    |> Random.map
                        (\wrong ->
                            let
                                correct = a - b
                                choices = shuffleChoices (String.fromInt correct) wrong
                            in
                            { prompt =
                                "x" ++ superscript a ++ " ÷ x" ++ superscript b ++ " = x^?"
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "x⁷ ÷ x³ = x^?"
                                , answer = "x⁴"
                                , steps =
                                    [ "Quotient rule: subtract exponents"
                                    , "7 − 3 = 4 → x⁴"
                                    ]
                                }
                            }
                        )
            )


-- Power rule: (x^a)^b = x^(a*b)
genPowerRule : Generator Problem
genPowerRule =
    Random.map2 Tuple.pair (randInt 2 5) (randInt 2 4)
        |> Random.andThen
            (\( a, b ) ->
                wrongChoicesInt (a * b)
                    |> Random.map
                        (\wrong ->
                            let
                                correct = a * b
                                choices = shuffleChoices (String.fromInt correct) wrong
                            in
                            { prompt =
                                "(x" ++ superscript a ++ ")" ++ superscript b ++ " = x^?"
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "(x³)² = x^?"
                                , answer = "x⁶"
                                , steps =
                                    [ "Power rule: multiply exponents"
                                    , "3 × 2 = 6 → x⁶"
                                    ]
                                }
                            }
                        )
            )


-- Negative exponent: 2^(-n) = 1/(2^n)
genNegativeExponent : Generator Problem
genNegativeExponent =
    Random.map2 Tuple.pair (randInt 2 4) (randInt 1 3)
        |> Random.andThen
            (\( base, n ) ->
                let
                    denom = base ^ n
                    correct = "1/" ++ String.fromInt denom
                    wrongs =
                        [ String.fromInt (-denom)
                        , "1/" ++ String.fromInt (denom + 1)
                        , String.fromInt (base ^ (n + 1))
                        ]
                    choices = shuffleChoices correct wrongs
                in
                Random.constant
                    { prompt =
                        String.fromInt base ++ "^(−" ++ String.fromInt n ++ ") = ?"
                    , inputType = TChoice choices
                    , answer = AChoice 0
                    , hint =
                        { prompt = "2^(−3) = ?"
                        , answer = "1/8"
                        , steps =
                            [ "Negative exponent: flip to denominator"
                            , "2^(−3) = 1/2³ = 1/8"
                            ]
                        }
                    }
            )


-- Scientific notation: a × 10^n
genScientificNotation : Generator Problem
genScientificNotation =
    Random.map2 Tuple.pair (randInt 1 9) (randInt 2 6)
        |> Random.andThen
            (\( a, n ) ->
                let
                    value = toFloat a * (10 ^ n |> toFloat)
                    valueStr = String.fromFloat value
                    correct = String.fromInt a ++ " × 10^" ++ String.fromInt n
                    wrongs =
                        [ String.fromInt a ++ " × 10^" ++ String.fromInt (n + 1)
                        , String.fromInt a ++ " × 10^" ++ String.fromInt (n - 1)
                        , String.fromInt (a + 1) ++ " × 10^" ++ String.fromInt n
                        ]
                    choices = shuffleChoices correct wrongs
                in
                Random.constant
                    { prompt =
                        "Write " ++ valueStr ++ " in scientific notation."
                    , inputType = TChoice choices
                    , answer = AChoice 0
                    , hint =
                        { prompt = "Write 3000 in scientific notation."
                        , answer = "3 × 10³"
                        , steps =
                            [ "Move decimal to get one non-zero digit: 3.000"
                            , "Moved 3 places left → 10³"
                            , "Answer: 3 × 10³"
                            ]
                        }
                    }
            )


-- Exponential growth/decay: A = P(1 + r)^t or A = P(1 - r)^t
genExpGrowthDecay : Generator Problem
genExpGrowthDecay =
    Random.int 0 1
        |> Random.andThen
            (\t ->
                case t of
                    0 ->
                        -- Growth: double every year, find after 3 years
                        Random.map2 Tuple.pair (randInt 1 5) (randInt 1 4)
                            |> Random.andThen
                                (\( p, years ) ->
                                    let result = p * (2 ^ years) in
                                    wrongChoicesInt result
                                        |> Random.map
                                            (\wrong ->
                                                let choices = shuffleChoices (String.fromInt result) wrong in
                                                { prompt =
                                                    "A colony starts with " ++ String.fromInt p
                                                        ++ " organisms and doubles each hour. How many after "
                                                        ++ String.fromInt years ++ " hours?"
                                                , inputType = TChoice choices
                                                , answer = AChoice 0
                                                , hint =
                                                    { prompt = "Start: 2 organisms, doubles each hour. After 3 hours?"
                                                    , answer = "16"
                                                    , steps =
                                                        [ "A = P · 2^t"
                                                        , "A = 2 · 2³ = 2 · 8 = 16"
                                                        ]
                                                    }
                                                }
                                            )
                                )

                    _ ->
                        -- Decay: half-life
                        Random.map2 Tuple.pair (randInt 2 6) (randInt 1 3)
                            |> Random.andThen
                                (\( factor, years ) ->
                                    let p = factor ^ years
                                        result = 1
                                    in
                                    wrongChoicesInt result
                                        |> Random.map
                                            (\wrong ->
                                                let choices = shuffleChoices (String.fromInt result) wrong in
                                                { prompt =
                                                    "A substance of " ++ String.fromInt p
                                                        ++ " grams is cut in half each year. How many grams remain after "
                                                        ++ String.fromInt years ++ " years? (Assume exact halving)"
                                                , inputType = TChoice choices
                                                , answer = AChoice 0
                                                , hint =
                                                    { prompt = "8 grams, halved each year. After 3 years?"
                                                    , answer = "1"
                                                    , steps =
                                                        [ "Year 1: 8 ÷ 2 = 4"
                                                        , "Year 2: 4 ÷ 2 = 2"
                                                        , "Year 3: 2 ÷ 2 = 1"
                                                        ]
                                                    }
                                                }
                                            )
                                )
            )


-- Simplify radical: √(n²·k) = n√k
genSimplifyRadical : Generator Problem
genSimplifyRadical =
    Random.map2 Tuple.pair (randInt 2 6) (randInt 1 5)
        |> Random.andThen
            (\( n, k ) ->
                let
                    radicand = n * n * k
                    correct =
                        if k == 1 then
                            String.fromInt n
                        else
                            String.fromInt n ++ "√" ++ String.fromInt k
                    wrongs =
                        [ String.fromInt (n + 1) ++ "√" ++ String.fromInt k
                        , String.fromInt n ++ "√" ++ String.fromInt (k + 1)
                        , String.fromInt (n * k)
                        ]
                    choices = shuffleChoices correct wrongs
                in
                Random.constant
                    { prompt = "Simplify: √" ++ String.fromInt radicand
                    , inputType = TChoice choices
                    , answer = AChoice 0
                    , hint =
                        { prompt = "Simplify: √12"
                        , answer = "2√3"
                        , steps =
                            [ "Factor: 12 = 4 × 3 = 2² × 3"
                            , "Pull out perfect square: √(4·3) = 2√3"
                            ]
                        }
                    }
            )


-- ── UNIT 7: Polynomials and Factoring ────────────────────────────────────────

-- Add/subtract polynomials: (ax² + bx + c) + (dx² + ex + f)
genAddSubPolynomial : Generator Problem
genAddSubPolynomial =
    Random.map4 (\a b c d -> { a = a, b = b, c = c, d = d })
        (randInt 1 6) (randInt 1 8) (randInt 1 6) (randInt 1 8)
        |> Random.andThen
            (\r ->
                let
                    -- (r.a x + r.b) + (r.c x + r.d)
                    xCoeff = r.a + r.c
                    constTerm = r.b + r.d
                    correct = String.fromInt xCoeff ++ "x + " ++ String.fromInt constTerm
                    wrongs =
                        [ String.fromInt (xCoeff + 1) ++ "x + " ++ String.fromInt constTerm
                        , String.fromInt xCoeff ++ "x + " ++ String.fromInt (constTerm + 1)
                        , String.fromInt (xCoeff - 1) ++ "x + " ++ String.fromInt (constTerm - 1)
                        ]
                    choices = shuffleChoices correct wrongs
                in
                Random.constant
                    { prompt =
                        "(" ++ String.fromInt r.a ++ "x + " ++ String.fromInt r.b
                            ++ ") + (" ++ String.fromInt r.c ++ "x + " ++ String.fromInt r.d ++ ") = ?"
                    , inputType = TChoice choices
                    , answer = AChoice 0
                    , hint =
                        { prompt = "(2x + 3) + (4x + 5) = ?"
                        , answer = "6x + 8"
                        , steps =
                            [ "Combine x terms: 2x + 4x = 6x"
                            , "Combine constants: 3 + 5 = 8"
                            , "Answer: 6x + 8"
                            ]
                        }
                    }
            )


-- Monomial × polynomial: a(bx + c)
genMonomialTimesPolynomial : Generator Problem
genMonomialTimesPolynomial =
    Random.map3 (\a b c -> ( a, b, c ))
        (randInt 2 6) (randInt 1 8) (randInt 1 8)
        |> Random.andThen
            (\( a, b, c ) ->
                let
                    xCoeff = a * b
                    constTerm = a * c
                    correct = String.fromInt xCoeff ++ "x + " ++ String.fromInt constTerm
                    wrongs =
                        [ String.fromInt (xCoeff + a) ++ "x + " ++ String.fromInt constTerm
                        , String.fromInt xCoeff ++ "x + " ++ String.fromInt (constTerm + a)
                        , String.fromInt (b + c) ++ "x"
                        ]
                    choices = shuffleChoices correct wrongs
                in
                Random.constant
                    { prompt =
                        String.fromInt a ++ "(" ++ String.fromInt b ++ "x + " ++ String.fromInt c ++ ") = ?"
                    , inputType = TChoice choices
                    , answer = AChoice 0
                    , hint =
                        { prompt = "3(2x + 4) = ?"
                        , answer = "6x + 12"
                        , steps =
                            [ "Distribute: 3 · 2x = 6x"
                            , "3 · 4 = 12"
                            , "Answer: 6x + 12"
                            ]
                        }
                    }
            )


-- FOIL: (x + a)(x + b) = x² + (a+b)x + ab
genFOIL : Generator Problem
genFOIL =
    Random.map2 Tuple.pair (randInt 1 8) (randInt 1 8)
        |> Random.andThen
            (\( a, b ) ->
                let
                    sumAB = a + b
                    prodAB = a * b
                    correct =
                        "x² + " ++ String.fromInt sumAB ++ "x + " ++ String.fromInt prodAB
                    wrongs =
                        [ "x² + " ++ String.fromInt (sumAB + 1) ++ "x + " ++ String.fromInt prodAB
                        , "x² + " ++ String.fromInt sumAB ++ "x + " ++ String.fromInt (prodAB + 1)
                        , "x² + " ++ String.fromInt (a * b) ++ "x + " ++ String.fromInt (a + b)
                        ]
                    choices = shuffleChoices correct wrongs
                in
                Random.constant
                    { prompt =
                        "(x + " ++ String.fromInt a ++ ")(x + " ++ String.fromInt b ++ ") = ?"
                    , inputType = TChoice choices
                    , answer = AChoice 0
                    , hint =
                        { prompt = "(x + 2)(x + 3) = ?"
                        , answer = "x² + 5x + 6"
                        , steps =
                            [ "FOIL: First: x·x = x²"
                            , "Outer + Inner: 3x + 2x = 5x"
                            , "Last: 2·3 = 6"
                            , "Answer: x² + 5x + 6"
                            ]
                        }
                    }
            )


-- Factor GCF from ax + ab = a(x + b)
genFactorGCF : Generator Problem
genFactorGCF =
    Random.map3 (\g b c -> ( g, b, c ))
        (randInt 2 8) (randInt 1 6) (randInt 1 6)
        |> Random.andThen
            (\( g, b, c ) ->
                let
                    term1 = g * b
                    term2 = g * c
                    correct = String.fromInt g ++ "(x + " ++ String.fromInt c ++ ")"
                    wrongs =
                        [ String.fromInt (g + 1) ++ "(x + " ++ String.fromInt c ++ ")"
                        , String.fromInt g ++ "(x + " ++ String.fromInt (c + 1) ++ ")"
                        , String.fromInt (g * c) ++ "(x + " ++ String.fromInt b ++ ")"
                        ]
                    choices = shuffleChoices correct wrongs
                in
                Random.constant
                    { prompt =
                        "Factor: " ++ String.fromInt term1 ++ "x + " ++ String.fromInt term2
                    , inputType = TChoice choices
                    , answer = AChoice 0
                    , hint =
                        { prompt = "Factor: 6x + 9"
                        , answer = "3(2x + 3)"
                        , steps =
                            [ "GCF of 6 and 9 is 3"
                            , "6x ÷ 3 = 2x, 9 ÷ 3 = 3"
                            , "Answer: 3(2x + 3)"
                            ]
                        }
                    }
            )


-- Factor difference of squares: x² - a² = (x+a)(x-a)
genFactorDiffSquares : Generator Problem
genFactorDiffSquares =
    randInt 2 9
        |> Random.andThen
            (\a ->
                let
                    radicand = a * a
                    correct = "(x + " ++ String.fromInt a ++ ")(x − " ++ String.fromInt a ++ ")"
                    wrongs =
                        [ "(x + " ++ String.fromInt (a + 1) ++ ")(x − " ++ String.fromInt (a - 1) ++ ")"
                        , "(x + " ++ String.fromInt a ++ ")²"
                        , "(x − " ++ String.fromInt a ++ ")²"
                        ]
                    choices = shuffleChoices correct wrongs
                in
                Random.constant
                    { prompt = "Factor: x² − " ++ String.fromInt radicand
                    , inputType = TChoice choices
                    , answer = AChoice 0
                    , hint =
                        { prompt = "Factor: x² − 9"
                        , answer = "(x + 3)(x − 3)"
                        , steps =
                            [ "Difference of squares: a² − b² = (a+b)(a−b)"
                            , "√9 = 3"
                            , "x² − 9 = (x+3)(x−3)"
                            ]
                        }
                    }
            )


-- Factor trinomial: x² + bx + c = (x + r)(x + s) where r+s=b, rs=c
genFactorTrinomial : Generator Problem
genFactorTrinomial =
    Random.map2 Tuple.pair (randInt 1 7) (randInt 1 7)
        |> Random.andThen
            (\( r, s ) ->
                let
                    b = r + s
                    c = r * s
                    correct = "(x + " ++ String.fromInt r ++ ")(x + " ++ String.fromInt s ++ ")"
                    wrongs =
                        [ "(x + " ++ String.fromInt (r + 1) ++ ")(x + " ++ String.fromInt (s - 1) ++ ")"
                        , "(x + " ++ String.fromInt b ++ ")(x + " ++ String.fromInt 1 ++ ")"
                        , "(x − " ++ String.fromInt r ++ ")(x − " ++ String.fromInt s ++ ")"
                        ]
                    choices = shuffleChoices correct wrongs
                in
                Random.constant
                    { prompt = "Factor: x² + " ++ String.fromInt b ++ "x + " ++ String.fromInt c
                    , inputType = TChoice choices
                    , answer = AChoice 0
                    , hint =
                        { prompt = "Factor: x² + 5x + 6"
                        , answer = "(x + 2)(x + 3)"
                        , steps =
                            [ "Find two numbers that multiply to 6 and add to 5"
                            , "2 × 3 = 6 and 2 + 3 = 5"
                            , "Answer: (x+2)(x+3)"
                            ]
                        }
                    }
            )


-- ── UNIT 8: Quadratic Equations ───────────────────────────────────────────────

-- Axis of symmetry: x = -b/(2a)
genAxisOfSymmetry : Generator Problem
genAxisOfSymmetry =
    Random.map3 (\a b c -> ( a, b, c ))
        (randIntNonZero 1 4) (randInt -8 8) (randInt -10 10)
        |> Random.andThen
            (\( a, b, c ) ->
                -- axis: -b/(2a), use only cases where it's integer
                let
                    denom = 2 * a
                    num = -b
                in
                if modBy denom num /= 0 then
                    genAxisOfSymmetry
                else
                    let
                        axis = num // denom
                    in
                    wrongChoicesInt axis
                        |> Random.map
                            (\wrong ->
                                let choices = shuffleChoices (String.fromInt axis) wrong in
                                { prompt =
                                    "Axis of symmetry of y = "
                                        ++ String.fromInt a ++ "x² + "
                                        ++ showSigned b ++ "x + "
                                        ++ String.fromInt c ++ "?"
                                , inputType = TChoice choices
                                , answer = AChoice 0
                                , hint =
                                    { prompt = "Axis of y = x² + 4x + 3?"
                                    , answer = "x = −2"
                                    , steps =
                                        [ "x = −b/(2a) = −4/(2·1) = −2"
                                        ]
                                    }
                                }
                            )
            )


-- Discriminant: b² - 4ac
genDiscriminant : Generator Problem
genDiscriminant =
    Random.map3 (\a b c -> ( a, b, c ))
        (randIntNonZero 1 4) (randInt -6 6) (randInt -5 5)
        |> Random.andThen
            (\( a, b, c ) ->
                let disc = b * b - 4 * a * c in
                wrongChoicesInt disc
                    |> Random.map
                        (\wrong ->
                            let choices = shuffleChoices (String.fromInt disc) wrong in
                            { prompt =
                                "Find the discriminant of "
                                    ++ String.fromInt a ++ "x² + "
                                    ++ showSigned b ++ "x + "
                                    ++ String.fromInt c
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "Discriminant of x² + 2x − 3?"
                                , answer = "16"
                                , steps =
                                    [ "Discriminant = b² − 4ac"
                                    , "= 2² − 4(1)(−3) = 4 + 12 = 16"
                                    ]
                                }
                            }
                        )
            )


-- Solve by factoring: x² + bx + c = 0 where b = r+s, c = r*s
genSolveByFactoring : Generator Problem
genSolveByFactoring =
    Random.map2 Tuple.pair (randInt 1 7) (randInt 1 7)
        |> Random.map
            (\( r, s ) ->
                let
                    b = r + s
                    c = r * s
                in
                { prompt =
                    "Solve: x² + " ++ String.fromInt b ++ "x + " ++ String.fromInt c ++ " = 0"
                , inputType = TRoots
                , answer = ARoots (toFloat -r) (toFloat -s)
                , hint =
                    { prompt = "Solve: x² + 5x + 6 = 0"
                    , answer = "x = −2 or x = −3"
                    , steps =
                        [ "Factor: (x + 2)(x + 3) = 0"
                        , "Set each factor to zero"
                        , "x = −2 or x = −3"
                        ]
                    }
                }
            )


-- Solve by square root: x² = n
genSolveBySquareRoot : Generator Problem
genSolveBySquareRoot =
    randInt 1 9
        |> Random.map
            (\n ->
                let nn = n * n in
                { prompt = "Solve: x² = " ++ String.fromInt nn
                , inputType = TRoots
                , answer = ARoots (toFloat n) (toFloat -n)
                , hint =
                    { prompt = "Solve: x² = 25"
                    , answer = "x = 5 or x = −5"
                    , steps =
                        [ "Take square root of both sides"
                        , "x = ±√25 = ±5"
                        ]
                    }
                }
            )


-- Quadratic formula: ax² + bx + c = 0 with integer roots
genQuadraticFormula : Generator Problem
genQuadraticFormula =
    Random.map2 Tuple.pair (randInt 1 6) (randInt 1 6)
        |> Random.map
            (\( r, s ) ->
                -- x² - (r+s)x + rs = 0
                let
                    b = -(r + s)
                    c = r * s
                in
                { prompt =
                    "Use the quadratic formula. Solve: x² + "
                        ++ showSigned b ++ "x + " ++ String.fromInt c ++ " = 0"
                , inputType = TRoots
                , answer = ARoots (toFloat r) (toFloat s)
                , hint =
                    { prompt = "Solve x² − 5x + 6 = 0 using the quadratic formula."
                    , answer = "x = 2 or x = 3"
                    , steps =
                        [ "x = [−b ± √(b²−4ac)] / (2a)"
                        , "= [5 ± √(25−24)] / 2 = [5 ± 1] / 2"
                        , "x = 3 or x = 2"
                        ]
                    }
                }
            )


-- Vertex form: y = (x - h)² + k, find vertex
genVertexForm : Generator Problem
genVertexForm =
    Random.map2 Tuple.pair (randInt -5 5) (randInt -5 5)
        |> Random.andThen
            (\( h, k ) ->
                let
                    correct = "(" ++ String.fromInt h ++ ", " ++ String.fromInt k ++ ")"
                    wrongs =
                        [ "(" ++ String.fromInt (-h) ++ ", " ++ String.fromInt k ++ ")"
                        , "(" ++ String.fromInt h ++ ", " ++ String.fromInt (-k) ++ ")"
                        , "(" ++ String.fromInt (h + 1) ++ ", " ++ String.fromInt k ++ ")"
                        ]
                    choices = shuffleChoices correct wrongs
                in
                Random.constant
                    { prompt =
                        "Find the vertex of y = (x − " ++ String.fromInt h ++ ")² + " ++ String.fromInt k
                    , inputType = TChoice choices
                    , answer = AChoice 0
                    , hint =
                        { prompt = "Vertex of y = (x − 3)² + 2?"
                        , answer = "(3, 2)"
                        , steps =
                            [ "Vertex form: y = (x − h)² + k"
                            , "Vertex is at (h, k) = (3, 2)"
                            ]
                        }
                    }
            )


-- ── UNIT 9: Linear, Quadratic and Exponential Functions ──────────────────────

-- Identify function type from equation
genIdentifyFunctionType : Generator Problem
genIdentifyFunctionType =
    Random.int 0 2
        |> Random.map
            (\t ->
                case t of
                    0 ->
                        { prompt = "Which type of function is f(x) = 3x + 2?"
                        , inputType = TChoice [ "Linear", "Quadratic", "Exponential" ]
                        , answer = AChoice 0
                        , hint =
                            { prompt = "What type is f(x) = 3x + 2?"
                            , answer = "Linear"
                            , steps =
                                [ "Highest power of x is 1"
                                , "Linear functions have the form f(x) = mx + b"
                                ]
                            }
                        }

                    1 ->
                        { prompt = "Which type of function is f(x) = x² − 4x + 1?"
                        , inputType = TChoice [ "Linear", "Quadratic", "Exponential" ]
                        , answer = AChoice 1
                        , hint =
                            { prompt = "What type is f(x) = x² − 4x + 1?"
                            , answer = "Quadratic"
                            , steps =
                                [ "Highest power of x is 2"
                                , "Quadratic functions have an x² term"
                                ]
                            }
                        }

                    _ ->
                        { prompt = "Which type of function is f(x) = 3 · 2^x?"
                        , inputType = TChoice [ "Linear", "Quadratic", "Exponential" ]
                        , answer = AChoice 2
                        , hint =
                            { prompt = "What type is f(x) = 3 · 2^x?"
                            , answer = "Exponential"
                            , steps =
                                [ "The variable x is in the exponent"
                                , "Exponential functions have the form a · b^x"
                                ]
                            }
                        }
            )


-- Evaluate piecewise function
genEvalPiecewise : Generator Problem
genEvalPiecewise =
    Random.int 0 2
        |> Random.andThen
            (\t ->
                case t of
                    0 ->
                        -- x ≥ 0: 2x; x < 0: -x
                        randInt 1 8
                            |> Random.andThen
                                (\x ->
                                    wrongChoicesInt (2 * x)
                                        |> Random.map
                                            (\wrong ->
                                                let choices = shuffleChoices (String.fromInt (2 * x)) wrong in
                                                { prompt =
                                                    "f(x) = { 2x if x ≥ 0 | −x if x < 0 }. Find f(" ++ String.fromInt x ++ ")."
                                                , inputType = TChoice choices
                                                , answer = AChoice 0
                                                , hint =
                                                    { prompt = "f(x) = {2x if x≥0, −x if x<0}. Find f(3)."
                                                    , answer = "6"
                                                    , steps =
                                                        [ "x = 3 ≥ 0, so use f(x) = 2x"
                                                        , "f(3) = 2(3) = 6"
                                                        ]
                                                    }
                                                }
                                            )
                                )

                    1 ->
                        -- negative branch
                        randInt 1 8
                            |> Random.andThen
                                (\x ->
                                    let nx = -x in
                                    wrongChoicesInt (-nx)
                                        |> Random.map
                                            (\wrong ->
                                                let choices = shuffleChoices (String.fromInt (-nx)) wrong in
                                                { prompt =
                                                    "f(x) = { 2x if x ≥ 0 | −x if x < 0 }. Find f(" ++ String.fromInt nx ++ ")."
                                                , inputType = TChoice choices
                                                , answer = AChoice 0
                                                , hint =
                                                    { prompt = "f(x) = {2x if x≥0, −x if x<0}. Find f(−4)."
                                                    , answer = "4"
                                                    , steps =
                                                        [ "x = −4 < 0, so use f(x) = −x"
                                                        , "f(−4) = −(−4) = 4"
                                                        ]
                                                    }
                                                }
                                            )
                                )

                    _ ->
                        -- x + 3 if x < 2; x² if x ≥ 2
                        randInt 2 6
                            |> Random.andThen
                                (\x ->
                                    wrongChoicesInt (x * x)
                                        |> Random.map
                                            (\wrong ->
                                                let choices = shuffleChoices (String.fromInt (x * x)) wrong in
                                                { prompt =
                                                    "f(x) = { x + 3 if x < 2 | x² if x ≥ 2 }. Find f(" ++ String.fromInt x ++ ")."
                                                , inputType = TChoice choices
                                                , answer = AChoice 0
                                                , hint =
                                                    { prompt = "f(x) = {x+3 if x<2, x² if x≥2}. Find f(4)."
                                                    , answer = "16"
                                                    , steps =
                                                        [ "x = 4 ≥ 2, so use f(x) = x²"
                                                        , "f(4) = 4² = 16"
                                                        ]
                                                    }
                                                }
                                            )
                                )
            )


-- ── UNIT 10: Rational Expressions ────────────────────────────────────────────

-- Simplify rational expression: (ax)/(bx) = a/b
genSimplifyRational : Generator Problem
genSimplifyRational =
    Random.map3 (\g a b -> ( g, a, b ))
        (randIntNonZero 2 6) (randInt 1 5) (randInt 1 5)
        |> Random.andThen
            (\( g, a, b ) ->
                if a == b then
                    genSimplifyRational
                else
                    let
                        num = g * a
                        den = g * b
                        ( rn, rd ) = reduceFraction num den
                        correct = String.fromInt rn ++ "/" ++ String.fromInt rd
                        wrongs =
                            [ String.fromInt num ++ "/" ++ String.fromInt den
                            , String.fromInt (rn + 1) ++ "/" ++ String.fromInt rd
                            , String.fromInt rn ++ "/" ++ String.fromInt (rd + 1)
                            ]
                        choices = shuffleChoices correct wrongs
                    in
                    Random.constant
                        { prompt = "Simplify: " ++ String.fromInt num ++ "x / (" ++ String.fromInt den ++ "x)"
                        , inputType = TChoice choices
                        , answer = AChoice 0
                        , hint =
                            { prompt = "Simplify: 6x / (9x)"
                            , answer = "2/3"
                            , steps =
                                [ "Cancel the common factor x"
                                , "6/9 → GCF is 3 → 2/3"
                                ]
                            }
                        }
            )


-- Multiply rational expressions: (a/b) × (c/d) = ac/bd simplified
genMultiplyRational : Generator Problem
genMultiplyRational =
    Random.map4 (\a b c d -> { a = a, b = b, c = c, d = d })
        (randIntNonZero 1 6) (randIntNonZero 2 6) (randIntNonZero 1 6) (randIntNonZero 2 6)
        |> Random.andThen
            (\r ->
                let
                    numProd = r.a * r.c
                    denProd = r.b * r.d
                    ( rn, rd ) = reduceFraction numProd denProd
                    correct =
                        if rd == 1 then String.fromInt rn
                        else String.fromInt rn ++ "/" ++ String.fromInt rd
                    wrongs =
                        [ String.fromInt (r.a + r.c) ++ "/" ++ String.fromInt (r.b + r.d)
                        , String.fromInt (rn + 1) ++ "/" ++ String.fromInt rd
                        , String.fromInt rn ++ "/" ++ String.fromInt (rd + 1)
                        ]
                    choices = shuffleChoices correct wrongs
                in
                Random.constant
                    { prompt =
                        "(" ++ String.fromInt r.a ++ "/" ++ String.fromInt r.b
                            ++ ") × (" ++ String.fromInt r.c ++ "/" ++ String.fromInt r.d ++ ") = ?"
                    , inputType = TChoice choices
                    , answer = AChoice 0
                    , hint =
                        { prompt = "(2/3) × (3/4) = ?"
                        , answer = "1/2"
                        , steps =
                            [ "Multiply numerators: 2 × 3 = 6"
                            , "Multiply denominators: 3 × 4 = 12"
                            , "Simplify: 6/12 = 1/2"
                            ]
                        }
                    }
            )


-- ── UNIT 11: Radical Expressions and Equations ───────────────────────────────

-- Add/subtract radicals: a√k + b√k = (a+b)√k
genAddSubRadical : Generator Problem
genAddSubRadical =
    Random.map3 (\a b k -> ( a, b, k ))
        (randInt 1 6) (randInt 1 6) (randInt 2 7)
        |> Random.andThen
            (\( a, b, k ) ->
                let
                    coeff = a + b
                    correct =
                        if coeff == 1 then "√" ++ String.fromInt k
                        else String.fromInt coeff ++ "√" ++ String.fromInt k
                    wrongs =
                        [ String.fromInt (coeff + 1) ++ "√" ++ String.fromInt k
                        , String.fromInt (coeff - 1) ++ "√" ++ String.fromInt k
                        , String.fromInt coeff ++ "√" ++ String.fromInt (k + 1)
                        ]
                    choices = shuffleChoices correct wrongs
                in
                Random.constant
                    { prompt =
                        String.fromInt a ++ "√" ++ String.fromInt k
                            ++ " + " ++ String.fromInt b ++ "√" ++ String.fromInt k ++ " = ?"
                    , inputType = TChoice choices
                    , answer = AChoice 0
                    , hint =
                        { prompt = "2√3 + 5√3 = ?"
                        , answer = "7√3"
                        , steps =
                            [ "Like radicals: add coefficients"
                            , "2 + 5 = 7 → 7√3"
                            ]
                        }
                    }
            )


-- Multiply radicals: √a × √b = √(ab)
genMultiplyRadical : Generator Problem
genMultiplyRadical =
    Random.map2 Tuple.pair (randInt 2 8) (randInt 2 8)
        |> Random.andThen
            (\( a, b ) ->
                let
                    product = a * b
                    correct = "√" ++ String.fromInt product
                    wrongs =
                        [ "√" ++ String.fromInt (product + 1)
                        , String.fromInt a ++ "√" ++ String.fromInt b
                        , "√" ++ String.fromInt (a + b)
                        ]
                    choices = shuffleChoices correct wrongs
                in
                Random.constant
                    { prompt =
                        "√" ++ String.fromInt a ++ " × √" ++ String.fromInt b ++ " = ?"
                    , inputType = TChoice choices
                    , answer = AChoice 0
                    , hint =
                        { prompt = "√3 × √5 = ?"
                        , answer = "√15"
                        , steps =
                            [ "√a × √b = √(a·b)"
                            , "√3 × √5 = √15"
                            ]
                        }
                    }
            )


-- Solve radical equation: √x = n → x = n²
genSolveRadicalEq : Generator Problem
genSolveRadicalEq =
    randInt 2 12
        |> Random.map
            (\n ->
                { prompt = "Solve: √x = " ++ String.fromInt n
                , inputType = TInteger
                , answer = AInt (n * n)
                , hint =
                    { prompt = "Solve: √x = 5"
                    , answer = "x = 25"
                    , steps =
                        [ "Square both sides: x = 5² = 25"
                        , "Check: √25 = 5 ✓"
                        ]
                    }
                }
            )


-- ── UNIT 12: Statistics ───────────────────────────────────────────────────────

-- Mean of a data set (small integers)
genMeanSD : Generator Problem
genMeanSD =
    Random.map4 (\a b c d -> { a = a, b = b, c = c, d = d })
        (randInt 2 10) (randInt 2 10) (randInt 2 10) (randInt 2 10)
        |> Random.andThen
            (\r ->
                let
                    total = r.a + r.b + r.c + r.d
                in
                if modBy 4 total /= 0 then
                    genMeanSD
                else
                    let mean = total // 4 in
                    wrongChoicesInt mean
                        |> Random.map
                            (\wrong ->
                                let choices = shuffleChoices (String.fromInt mean) wrong in
                                { prompt =
                                    "Find the mean of: "
                                        ++ String.fromInt r.a ++ ", "
                                        ++ String.fromInt r.b ++ ", "
                                        ++ String.fromInt r.c ++ ", "
                                        ++ String.fromInt r.d
                                , inputType = TChoice choices
                                , answer = AChoice 0
                                , hint =
                                    { prompt = "Mean of 2, 4, 6, 8?"
                                    , answer = "5"
                                    , steps =
                                        [ "Add all values: 2+4+6+8 = 20"
                                        , "Divide by count (4): 20/4 = 5"
                                        ]
                                    }
                                }
                            )
            )


-- Z-score: z = (x - μ) / σ
genZScore : Generator Problem
genZScore =
    Random.map3 (\mu sigma k -> ( mu, sigma, k ))
        (randInt 50 80) (randIntNonZero 2 10) (randInt -3 3)
        |> Random.andThen
            (\( mu, sigma, k ) ->
                let
                    x = mu + sigma * k
                    z = k
                in
                wrongChoicesInt z
                    |> Random.map
                        (\wrong ->
                            let choices = shuffleChoices (String.fromInt z) wrong in
                            { prompt =
                                "Mean μ = " ++ String.fromInt mu
                                    ++ ", σ = " ++ String.fromInt sigma
                                    ++ ". Find the z-score for x = " ++ String.fromInt x ++ "."
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "μ = 70, σ = 5. z-score for x = 80?"
                                , answer = "2"
                                , steps =
                                    [ "z = (x − μ) / σ"
                                    , "= (80 − 70) / 5 = 10/5 = 2"
                                    ]
                                }
                            }
                        )
            )


-- Variance (simple: given deviations squared)
genVariance : Generator Problem
genVariance =
    -- data: mean=m, 4 values with deviations d1, d2, -d1, -d2
    Random.map2 Tuple.pair (randInt 1 5) (randInt 1 5)
        |> Random.andThen
            (\( d1, d2 ) ->
                let
                    variance = (d1 * d1 + d2 * d2 + d1 * d1 + d2 * d2) // 4
                    m = 10
                    v1 = m + d1
                    v2 = m + d2
                    v3 = m - d1
                    v4 = m - d2
                in
                wrongChoicesInt variance
                    |> Random.map
                        (\wrong ->
                            let choices = shuffleChoices (String.fromInt variance) wrong in
                            { prompt =
                                "Find the variance of: "
                                    ++ String.fromInt v1 ++ ", "
                                    ++ String.fromInt v2 ++ ", "
                                    ++ String.fromInt v3 ++ ", "
                                    ++ String.fromInt v4
                                    ++ " (mean = " ++ String.fromInt m ++ ")"
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "Variance of 11, 12, 9, 8 (mean=10)?"
                                , answer = "2.5 ≈ 2"
                                , steps =
                                    [ "Deviations: 1, 2, −1, −2"
                                    , "Squared: 1, 4, 1, 4"
                                    , "Variance = (1+4+1+4)/4 = 10/4 = 2.5"
                                    ]
                                }
                            }
                        )
            )


-- ── Local helpers ─────────────────────────────────────────────────────────────

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
        4 -> "⁴"
        5 -> "⁵"
        6 -> "⁶"
        7 -> "⁷"
        _ -> "^" ++ String.fromInt n


shuffleChoices : String -> List String -> List String
shuffleChoices correct wrong =
    correct :: List.take 3 wrong
