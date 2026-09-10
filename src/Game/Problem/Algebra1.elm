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
                                { prompt =
                                    String.fromInt r.a ++ " + " ++ String.fromInt r.b
                                        ++ " × " ++ String.fromInt r.c
                                        ++ " − " ++ String.fromInt r.d ++ " = ?"
                                , answer = String.fromInt correct
                                , steps =
                                    [ "Multiply first (PEMDAS): " ++ String.fromInt r.b ++ " × " ++ String.fromInt r.c ++ " = " ++ String.fromInt (r.b * r.c)
                                    , "Then add: " ++ String.fromInt r.a ++ " + " ++ String.fromInt (r.b * r.c) ++ " = " ++ String.fromInt (r.a + r.b * r.c)
                                    , "Finally subtract: " ++ String.fromInt (r.a + r.b * r.c) ++ " − " ++ String.fromInt r.d ++ " = " ++ String.fromInt correct
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
                    { prompt =
                        "Evaluate " ++ String.fromInt a ++ "x + " ++ String.fromInt b
                            ++ " when x = " ++ String.fromInt x
                    , answer = String.fromInt (a * x + b)
                    , steps =
                        [ "Substitute x = " ++ String.fromInt x ++ ": " ++ String.fromInt a ++ "(" ++ String.fromInt x ++ ") + " ++ String.fromInt b
                        , "Multiply: " ++ String.fromInt (a * x) ++ " + " ++ String.fromInt b
                        , "Add: " ++ String.fromInt (a * x + b)
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
                                { prompt = "|" ++ String.fromInt n ++ "| = ?"
                                , answer = String.fromInt correct
                                , steps =
                                    [ "Absolute value is the distance from zero — always non-negative"
                                    , "|" ++ String.fromInt n ++ "| = " ++ String.fromInt correct
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
                                { prompt =
                                    String.fromInt a ++ "x + " ++ String.fromInt b ++ "x = ?x"
                                , answer = String.fromInt correct ++ "x"
                                , steps =
                                    [ "Add the coefficients: " ++ String.fromInt a ++ " + " ++ String.fromInt b ++ " = " ++ String.fromInt correct
                                    , "Keep the variable: " ++ String.fromInt correct ++ "x"
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
                                        { prompt =
                                            "\"" ++ String.fromInt k ++ " more than a number\" — evaluate when the number is " ++ String.fromInt x
                                        , answer = String.fromInt (x + k)
                                        , steps =
                                            [ "Translate: x + " ++ String.fromInt k
                                            , "Substitute x = " ++ String.fromInt x ++ ": " ++ String.fromInt x ++ " + " ++ String.fromInt k ++ " = " ++ String.fromInt (x + k)
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
                                        { prompt =
                                            "\"" ++ String.fromInt k ++ " times a number\" — evaluate when the number is " ++ String.fromInt x
                                        , answer = String.fromInt (k * x)
                                        , steps =
                                            [ "Translate: " ++ String.fromInt k ++ "x"
                                            , "Substitute x = " ++ String.fromInt x ++ ": " ++ String.fromInt k ++ "(" ++ String.fromInt x ++ ") = " ++ String.fromInt (k * x)
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
                                        { prompt =
                                            "\"A number decreased by " ++ String.fromInt k ++ "\" — evaluate when the number is " ++ String.fromInt (x + k)
                                        , answer = String.fromInt x
                                        , steps =
                                            [ "Translate: n − " ++ String.fromInt k
                                            , "Substitute n = " ++ String.fromInt (x + k) ++ ": " ++ String.fromInt (x + k) ++ " − " ++ String.fromInt k ++ " = " ++ String.fromInt x
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
                    { prompt =
                        String.fromInt a ++ "x + " ++ String.fromInt b ++ " = " ++ String.fromInt c
                    , answer = "x = " ++ String.fromInt x
                    , steps =
                        [ "Subtract " ++ String.fromInt b ++ " from both sides: " ++ String.fromInt a ++ "x = " ++ String.fromInt (c - b)
                        , "Divide both sides by " ++ String.fromInt a ++ ": x = " ++ String.fromInt x
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
                    { prompt =
                        String.fromInt r.a ++ "x + " ++ String.fromInt r.b ++ dir ++ String.fromInt c
                    , answer = "x " ++ symStr ++ " " ++ String.fromInt r.x
                    , steps =
                        [ "Subtract " ++ String.fromInt r.b ++ " from both sides: " ++ String.fromInt r.a ++ "x " ++ symStr ++ " " ++ String.fromInt (c - r.b)
                        , "Divide by " ++ String.fromInt r.a ++ ": x " ++ symStr ++ " " ++ String.fromInt r.x
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
                    { prompt =
                        String.fromInt a ++ "(x + " ++ String.fromInt b ++ ") = " ++ String.fromInt c
                    , answer = "x = " ++ String.fromInt x
                    , steps =
                        [ "Divide both sides by " ++ String.fromInt a ++ ": x + " ++ String.fromInt b ++ " = " ++ String.fromInt (c // a)
                        , "Subtract " ++ String.fromInt b ++ ": x = " ++ String.fromInt x
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
                    { prompt =
                        aStr ++ " + " ++ String.fromInt r.b ++ " = " ++ cStr ++ " + " ++ String.fromInt d
                    , answer = "x = " ++ String.fromInt r.x
                    , steps =
                        [ "Subtract " ++ cStr ++ " from both sides: " ++ String.fromInt (r.a - r.c) ++ "x + " ++ String.fromInt r.b ++ " = " ++ String.fromInt d
                        , "Subtract " ++ String.fromInt r.b ++ ": " ++ String.fromInt (r.a - r.c) ++ "x = " ++ String.fromInt (d - r.b)
                        , "Divide by " ++ String.fromInt (r.a - r.c) ++ ": x = " ++ String.fromInt r.x
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
                                    { prompt =
                                        String.fromInt a ++ "/" ++ String.fromInt b
                                            ++ " = " ++ String.fromInt c ++ "/x"
                                    , answer = "x = " ++ String.fromInt x
                                    , steps =
                                        [ "Cross-multiply: " ++ String.fromInt a ++ "x = " ++ String.fromInt (b * c)
                                        , "Divide by " ++ String.fromInt a ++ ": x = " ++ String.fromInt x
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
                    { prompt =
                        "|" ++ String.fromInt a ++ "x + " ++ String.fromInt b ++ "| = " ++ String.fromInt c
                    , answer = "x = " ++ String.fromFloat r1 ++ " or x = " ++ String.fromFloat r2
                    , steps =
                        [ "Set up two cases: " ++ String.fromInt a ++ "x + " ++ String.fromInt b ++ " = " ++ String.fromInt c ++ " and " ++ String.fromInt a ++ "x + " ++ String.fromInt b ++ " = −" ++ String.fromInt c
                        , "Case 1: " ++ String.fromInt a ++ "x = " ++ String.fromInt (c - b) ++ ", x = " ++ String.fromFloat r1
                        , "Case 2: " ++ String.fromInt a ++ "x = " ++ String.fromInt (-c - b) ++ ", x = " ++ String.fromFloat r2
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
                    { prompt =
                        "Perimeter P = 2l + 2w. Find w when P = " ++ String.fromInt p ++ " and l = " ++ String.fromInt l
                    , answer = "w = " ++ String.fromInt w
                    , steps =
                        [ "Substitute: " ++ String.fromInt p ++ " = 2(" ++ String.fromInt l ++ ") + 2w"
                        , String.fromInt p ++ " = " ++ String.fromInt (2 * l) ++ " + 2w → 2w = " ++ String.fromInt (p - 2 * l) ++ " → w = " ++ String.fromInt w
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
                    { prompt =
                        String.fromInt r.a ++ "x − " ++ String.fromInt r.b ++ dirStr ++ String.fromInt c
                    , answer = "x " ++ (if r.t == 0 then ">" else "<") ++ " " ++ String.fromInt r.x
                    , steps =
                        [ "Add " ++ String.fromInt r.b ++ " to both sides: " ++ String.fromInt r.a ++ "x " ++ (if r.t == 0 then ">" else "<") ++ " " ++ String.fromInt (c + r.b)
                        , "Divide by " ++ String.fromInt r.a ++ ": x " ++ (if r.t == 0 then ">" else "<") ++ " " ++ String.fromInt r.x
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
                                { prompt =
                                    "The relation is {(" ++ String.fromInt r.a ++ ", 2), ("
                                        ++ String.fromInt r.b ++ ", 5), ("
                                        ++ String.fromInt r.c ++ ", 3), ("
                                        ++ String.fromInt r.d ++ ", 8)}. What is the smallest element of the domain?"
                                , answer = String.fromInt r.a
                                , steps =
                                    [ "The domain is the set of all x-values (first coordinates)"
                                    , "x-values: " ++ String.fromInt r.a ++ ", " ++ String.fromInt r.b ++ ", " ++ String.fromInt r.c ++ ", " ++ String.fromInt r.d
                                    , "Smallest: " ++ String.fromInt r.a
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
                            { prompt = "Is this a function? {(1,2), (2,3), (3,4), (4,5)}"
                            , answer = "Yes"
                            , steps =
                                [ "Each x-value maps to exactly one y-value"
                                , "x-values 1, 2, 3, 4 are all different → it is a function"
                                ]
                            }
                        }

                    1 ->
                        { prompt = "Is this a function? {(1,2), (1,3), (2,4)}"
                        , inputType = TChoice [ "Yes", "No" ]
                        , answer = AChoice 1
                        , hint =
                            { prompt = "Is this a function? {(1,2), (1,3), (2,4)}"
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
                            { prompt = "Is this a function? {(2,5), (3,5), (4,5)}"
                            , answer = "Yes"
                            , steps =
                                [ "Each x maps to exactly one y (even if y repeats)"
                                , "x-values 2, 3, 4 are all different → it is a function"
                                ]
                            }
                        }

                    _ ->
                        { prompt = "Is this a function? {(0,1), (0,−1), (1,0)}"
                        , inputType = TChoice [ "Yes", "No" ]
                        , answer = AChoice 1
                        , hint =
                            { prompt = "Is this a function? {(0,1), (0,−1), (1,0)}"
                            , answer = "No"
                            , steps =
                                [ "x = 0 maps to both 1 and −1"
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
                    { prompt =
                        "f(x) = " ++ String.fromInt a ++ "x + " ++ String.fromInt b
                            ++ ". Find f(" ++ String.fromInt x ++ ")."
                    , answer = String.fromInt (a * x + b)
                    , steps =
                        [ "Substitute x = " ++ String.fromInt x ++ ": f(" ++ String.fromInt x ++ ") = " ++ String.fromInt a ++ "(" ++ String.fromInt x ++ ") + " ++ String.fromInt b
                        , "= " ++ String.fromInt (a * x) ++ " + " ++ String.fromInt b ++ " = " ++ String.fromInt (a * x + b)
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
                    { prompt =
                        "Complete the table for f(x) = " ++ String.fromInt a ++ "x + " ++ String.fromInt b
                            ++ ". What is f(" ++ String.fromInt x ++ ")?"
                    , answer = String.fromInt (a * x + b)
                    , steps =
                        [ "Replace x with " ++ String.fromInt x ++ ": " ++ String.fromInt a ++ "(" ++ String.fromInt x ++ ") + " ++ String.fromInt b
                        , "= " ++ String.fromInt (a * x) ++ " + " ++ String.fromInt b ++ " = " ++ String.fromInt (a * x + b)
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
                                { prompt =
                                    "Find the next term: "
                                        ++ String.fromInt a1 ++ ", "
                                        ++ String.fromInt a2 ++ ", "
                                        ++ String.fromInt a3 ++ ", "
                                        ++ String.fromInt a4 ++ ", ?"
                                , answer = String.fromInt a5
                                , steps =
                                    [ "Common difference: " ++ String.fromInt a2 ++ " − " ++ String.fromInt a1 ++ " = " ++ String.fromInt d
                                    , "Next term: " ++ String.fromInt a4 ++ " + " ++ String.fromInt d ++ " = " ++ String.fromInt a5
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
                                    { prompt =
                                        "Find the slope through ("
                                            ++ String.fromInt r.x1 ++ ", " ++ String.fromInt r.y1
                                            ++ ") and ("
                                            ++ String.fromInt x2 ++ ", " ++ String.fromInt y2 ++ ")."
                                    , answer = slopeStr
                                    , steps =
                                        [ "m = (y₂ − y₁) / (x₂ − x₁)"
                                        , "= (" ++ String.fromInt y2 ++ " − " ++ String.fromInt r.y1 ++ ") / (" ++ String.fromInt x2 ++ " − " ++ String.fromInt r.x1 ++ ") = " ++ String.fromInt r.dy ++ "/" ++ String.fromInt r.dx ++ " = " ++ slopeStr
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
                                { prompt =
                                    "What is the y-intercept of y = " ++ showSigned m ++ "x + " ++ String.fromInt b ++ "?"
                                , answer = String.fromInt b
                                , steps =
                                    [ "The y-intercept is the value of b in y = mx + b"
                                    , "When x = 0: y = " ++ String.fromInt b
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
                    { prompt =
                        String.fromInt a ++ "x + " ++ String.fromInt bAdj ++ "y = " ++ String.fromInt c
                            ++ ". Find the y-intercept."
                    , answer = String.fromInt yInt
                    , steps =
                        [ "Set x = 0: " ++ String.fromInt bAdj ++ "y = " ++ String.fromInt c
                        , "Divide: y = " ++ String.fromInt yInt
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
                    { prompt =
                        String.fromInt aAdj ++ "x + " ++ String.fromInt b ++ "y = " ++ String.fromInt c
                            ++ ". Find the x-intercept."
                    , answer = String.fromInt xInt
                    , steps =
                        [ "Set y = 0: " ++ String.fromInt aAdj ++ "x = " ++ String.fromInt c
                        , "Divide: x = " ++ String.fromInt xInt
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
                    { prompt =
                        "A line passes through ("
                            ++ String.fromInt r.x1 ++ ", " ++ String.fromInt r.y1
                            ++ ") with slope " ++ showSigned r.m
                            ++ ". Find y when x = " ++ String.fromInt xTarget ++ "."
                    , answer = String.fromInt yTarget
                    , steps =
                        [ "y − " ++ String.fromInt r.y1 ++ " = " ++ String.fromInt r.m ++ "(x − " ++ String.fromInt r.x1 ++ ")"
                        , "y − " ++ String.fromInt r.y1 ++ " = " ++ String.fromInt r.m ++ "(" ++ String.fromInt xTarget ++ " − " ++ String.fromInt r.x1 ++ ") = " ++ String.fromInt (r.m * r.x)
                        , "y = " ++ String.fromInt yTarget
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
                                { prompt =
                                    "A line parallel to y = " ++ showSigned m ++ "x + " ++ String.fromInt b
                                        ++ " has what slope?"
                                , answer = String.fromInt m
                                , steps =
                                    [ "Parallel lines have the same slope"
                                    , "Slope of y = " ++ showSigned m ++ "x + " ++ String.fromInt b ++ " is " ++ String.fromInt m
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
                        { prompt =
                            "A line perpendicular to y = " ++ String.fromInt m ++ "x + " ++ String.fromInt b
                                ++ " has what slope?"
                        , answer = perpStr
                        , steps =
                            [ "Perpendicular slope = negative reciprocal of " ++ String.fromInt m
                            , "Negate and flip: " ++ perpStr
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
                    { prompt =
                        "Solve the system:\ny = " ++ showSigned r.a ++ "x + " ++ String.fromInt r.b
                            ++ "\n" ++ String.fromInt r.c ++ "x + y = " ++ String.fromInt e
                    , answer = "x = " ++ String.fromInt r.x ++ ", y = " ++ String.fromInt y
                    , steps =
                        [ "Substitute y = " ++ showSigned r.a ++ "x + " ++ String.fromInt r.b ++ " into " ++ String.fromInt r.c ++ "x + y = " ++ String.fromInt e
                        , String.fromInt r.c ++ "x + (" ++ showSigned r.a ++ "x + " ++ String.fromInt r.b ++ ") = " ++ String.fromInt e ++ " → " ++ String.fromInt (r.c + r.a) ++ "x = " ++ String.fromInt (e - r.b) ++ " → x = " ++ String.fromInt r.x
                        , "y = " ++ showSigned r.a ++ "(" ++ String.fromInt r.x ++ ") + " ++ String.fromInt r.b ++ " = " ++ String.fromInt y
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
                    { prompt =
                        "Solve the system:\n"
                            ++ String.fromInt r.a ++ "x + " ++ String.fromInt r.b ++ "y = " ++ String.fromInt c
                            ++ "\n" ++ String.fromInt r.a ++ "x − " ++ String.fromInt r.b ++ "y = " ++ String.fromInt c2
                    , answer = "x = " ++ String.fromInt r.x ++ ", y = " ++ String.fromInt r.y
                    , steps =
                        [ "Add the equations: " ++ String.fromInt (2 * r.a) ++ "x = " ++ String.fromInt (c + c2) ++ " → x = " ++ String.fromInt r.x
                        , "Substitute x = " ++ String.fromInt r.x ++ " into first: " ++ String.fromInt r.a ++ "(" ++ String.fromInt r.x ++ ") + " ++ String.fromInt r.b ++ "y = " ++ String.fromInt c ++ " → y = " ++ String.fromInt r.y
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
                    { prompt =
                        "Two numbers sum to " ++ String.fromInt sumAB
                            ++ " and their difference is " ++ String.fromInt diffAB
                            ++ ". Find the larger number."
                    , answer = String.fromInt larger
                    , steps =
                        [ "x + y = " ++ String.fromInt sumAB ++ " and x − y = " ++ String.fromInt diffAB
                        , "Add: 2x = " ++ String.fromInt (sumAB + diffAB) ++ " → x = " ++ String.fromInt larger
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
                        { prompt =
                            "Which ordered pair is the solution?\nx + y = " ++ String.fromInt s
                                ++ "\n2x + y = " ++ String.fromInt t
                        , answer = correct
                        , steps =
                            [ "Subtract first from second: x = " ++ String.fromInt x
                            , "Substitute: " ++ String.fromInt x ++ " + y = " ++ String.fromInt s ++ " → y = " ++ String.fromInt y
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
                                { prompt =
                                    "x" ++ superscript a ++ " · x" ++ superscript b ++ " = x^?"
                                , answer = "x" ++ superscript correct
                                , steps =
                                    [ "Product rule: add exponents"
                                    , String.fromInt a ++ " + " ++ String.fromInt b ++ " = " ++ String.fromInt correct ++ " → x" ++ superscript correct
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
                                "x" ++ superscript a ++ " / x" ++ superscript b ++ " = x^?"
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt =
                                    "x" ++ superscript a ++ " / x" ++ superscript b ++ " = x^?"
                                , answer = "x" ++ superscript correct
                                , steps =
                                    [ "Quotient rule: subtract exponents"
                                    , String.fromInt a ++ " − " ++ String.fromInt b ++ " = " ++ String.fromInt correct ++ " → x" ++ superscript correct
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
                                { prompt =
                                    "(x" ++ superscript a ++ ")" ++ superscript b ++ " = x^?"
                                , answer = "x" ++ superscript correct
                                , steps =
                                    [ "Power rule: multiply exponents"
                                    , String.fromInt a ++ " × " ++ String.fromInt b ++ " = " ++ String.fromInt correct ++ " → x" ++ superscript correct
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
                        { prompt =
                            String.fromInt base ++ "^(−" ++ String.fromInt n ++ ") = ?"
                        , answer = correct
                        , steps =
                            [ "Negative exponent: flip to denominator"
                            , String.fromInt base ++ "^(−" ++ String.fromInt n ++ ") = 1/" ++ String.fromInt base ++ superscript n ++ " = 1/" ++ String.fromInt denom
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
                        { prompt =
                            "Write " ++ valueStr ++ " in scientific notation."
                        , answer = correct
                        , steps =
                            [ "Move decimal to get one non-zero digit before the decimal point"
                            , "Moved " ++ String.fromInt n ++ " places left → 10^" ++ String.fromInt n
                            , "Answer: " ++ correct
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
                                                    { prompt =
                                                        "A colony starts with " ++ String.fromInt p
                                                            ++ " organisms and doubles each hour. How many after "
                                                            ++ String.fromInt years ++ " hours?"
                                                    , answer = String.fromInt result
                                                    , steps =
                                                        [ "A = P · 2^t"
                                                        , "A = " ++ String.fromInt p ++ " · 2^" ++ String.fromInt years ++ " = " ++ String.fromInt p ++ " · " ++ String.fromInt (2 ^ years) ++ " = " ++ String.fromInt result
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
                                                    { prompt =
                                                        "A substance of " ++ String.fromInt p
                                                            ++ " grams is cut in half each year. How many grams remain after "
                                                            ++ String.fromInt years ++ " years? (Assume exact halving)"
                                                    , answer = String.fromInt result
                                                    , steps =
                                                        [ "Each year the amount is divided by 2"
                                                        , "After " ++ String.fromInt years ++ " years: " ++ String.fromInt p ++ " / 2^" ++ String.fromInt years ++ " = " ++ String.fromInt p ++ " / " ++ String.fromInt (factor ^ years) ++ " = " ++ String.fromInt result
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
                        { prompt = "Simplify: √" ++ String.fromInt radicand
                        , answer = correct
                        , steps =
                            [ "Factor: " ++ String.fromInt radicand ++ " = " ++ String.fromInt (n * n) ++ " × " ++ String.fromInt k ++ " = " ++ String.fromInt n ++ "² × " ++ String.fromInt k
                            , "Pull out perfect square: √(" ++ String.fromInt (n * n) ++ "·" ++ String.fromInt k ++ ") = " ++ correct
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
                        { prompt =
                            "(" ++ String.fromInt r.a ++ "x + " ++ String.fromInt r.b
                                ++ ") + (" ++ String.fromInt r.c ++ "x + " ++ String.fromInt r.d ++ ") = ?"
                        , answer = correct
                        , steps =
                            [ "Combine x terms: " ++ String.fromInt r.a ++ "x + " ++ String.fromInt r.c ++ "x = " ++ String.fromInt xCoeff ++ "x"
                            , "Combine constants: " ++ String.fromInt r.b ++ " + " ++ String.fromInt r.d ++ " = " ++ String.fromInt constTerm
                            , "Answer: " ++ correct
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
                        { prompt =
                            String.fromInt a ++ "(" ++ String.fromInt b ++ "x + " ++ String.fromInt c ++ ") = ?"
                        , answer = correct
                        , steps =
                            [ "Distribute: " ++ String.fromInt a ++ " · " ++ String.fromInt b ++ "x = " ++ String.fromInt xCoeff ++ "x"
                            , String.fromInt a ++ " · " ++ String.fromInt c ++ " = " ++ String.fromInt constTerm
                            , "Answer: " ++ correct
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
                        { prompt =
                            "(x + " ++ String.fromInt a ++ ")(x + " ++ String.fromInt b ++ ") = ?"
                        , answer = correct
                        , steps =
                            [ "FOIL: First: x·x = x²"
                            , "Outer + Inner: " ++ String.fromInt b ++ "x + " ++ String.fromInt a ++ "x = " ++ String.fromInt sumAB ++ "x"
                            , "Last: " ++ String.fromInt a ++ "·" ++ String.fromInt b ++ " = " ++ String.fromInt prodAB
                            , "Answer: " ++ correct
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
                        { prompt =
                            "Factor: " ++ String.fromInt term1 ++ "x + " ++ String.fromInt term2
                        , answer = correct
                        , steps =
                            [ "GCF of " ++ String.fromInt term1 ++ " and " ++ String.fromInt term2 ++ " is " ++ String.fromInt g
                            , String.fromInt term1 ++ "x / " ++ String.fromInt g ++ " = " ++ String.fromInt b ++ "x, " ++ String.fromInt term2 ++ " / " ++ String.fromInt g ++ " = " ++ String.fromInt c
                            , "Answer: " ++ correct
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
                        { prompt = "Factor: x² − " ++ String.fromInt radicand
                        , answer = correct
                        , steps =
                            [ "Difference of squares: a² − b² = (a+b)(a−b)"
                            , "√" ++ String.fromInt radicand ++ " = " ++ String.fromInt a
                            , "x² − " ++ String.fromInt radicand ++ " = " ++ correct
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
                        { prompt = "Factor: x² + " ++ String.fromInt b ++ "x + " ++ String.fromInt c
                        , answer = correct
                        , steps =
                            [ "Find two numbers that multiply to " ++ String.fromInt c ++ " and add to " ++ String.fromInt b
                            , String.fromInt r ++ " × " ++ String.fromInt s ++ " = " ++ String.fromInt c ++ " and " ++ String.fromInt r ++ " + " ++ String.fromInt s ++ " = " ++ String.fromInt b
                            , "Answer: " ++ correct
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
                                    { prompt =
                                        "Axis of symmetry of y = "
                                            ++ String.fromInt a ++ "x² + "
                                            ++ showSigned b ++ "x + "
                                            ++ String.fromInt c ++ "?"
                                    , answer = "x = " ++ String.fromInt axis
                                    , steps =
                                        [ "x = −b/(2a) = −(" ++ String.fromInt b ++ ")/(2·" ++ String.fromInt a ++ ") = " ++ String.fromInt num ++ "/" ++ String.fromInt denom ++ " = " ++ String.fromInt axis
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
                                { prompt =
                                    "Find the discriminant of "
                                        ++ String.fromInt a ++ "x² + "
                                        ++ showSigned b ++ "x + "
                                        ++ String.fromInt c
                                , answer = String.fromInt disc
                                , steps =
                                    [ "Discriminant = b² − 4ac"
                                    , "= " ++ String.fromInt b ++ "² − 4(" ++ String.fromInt a ++ ")(" ++ String.fromInt c ++ ") = " ++ String.fromInt (b * b) ++ " − " ++ String.fromInt (4 * a * c) ++ " = " ++ String.fromInt disc
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
                    { prompt =
                        "Solve: x² + " ++ String.fromInt b ++ "x + " ++ String.fromInt c ++ " = 0"
                    , answer = "x = −" ++ String.fromInt r ++ " or x = −" ++ String.fromInt s
                    , steps =
                        [ "Factor: (x + " ++ String.fromInt r ++ ")(x + " ++ String.fromInt s ++ ") = 0"
                        , "Set each factor to zero"
                        , "x = −" ++ String.fromInt r ++ " or x = −" ++ String.fromInt s
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
                    { prompt = "Solve: x² = " ++ String.fromInt nn
                    , answer = "x = " ++ String.fromInt n ++ " or x = −" ++ String.fromInt n
                    , steps =
                        [ "Take square root of both sides"
                        , "x = ±√" ++ String.fromInt nn ++ " = ±" ++ String.fromInt n
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
                    { prompt =
                        "Use the quadratic formula. Solve: x² + "
                            ++ showSigned b ++ "x + " ++ String.fromInt c ++ " = 0"
                    , answer = "x = " ++ String.fromInt r ++ " or x = " ++ String.fromInt s
                    , steps =
                        [ "x = [−b ± √(b²−4ac)] / (2a), with a=1, b=" ++ String.fromInt b ++ ", c=" ++ String.fromInt c
                        , "= [" ++ String.fromInt (-b) ++ " ± √(" ++ String.fromInt (b * b) ++ "−" ++ String.fromInt (4 * c) ++ ")] / 2 = [" ++ String.fromInt (-b) ++ " ± " ++ String.fromInt (r + s) ++ "] / 2"
                        , "x = " ++ String.fromInt r ++ " or x = " ++ String.fromInt s
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
                        { prompt =
                            "Find the vertex of y = (x − " ++ String.fromInt h ++ ")² + " ++ String.fromInt k
                        , answer = correct
                        , steps =
                            [ "Vertex form: y = (x − h)² + k"
                            , "Vertex is at (h, k) = (" ++ String.fromInt h ++ ", " ++ String.fromInt k ++ ")"
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
                            { prompt = "Which type of function is f(x) = 3x + 2?"
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
                            { prompt = "Which type of function is f(x) = x² − 4x + 1?"
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
                            { prompt = "Which type of function is f(x) = 3 · 2^x?"
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
                                                    { prompt =
                                                        "f(x) = { 2x if x ≥ 0 | −x if x < 0 }. Find f(" ++ String.fromInt x ++ ")."
                                                    , answer = String.fromInt (2 * x)
                                                    , steps =
                                                        [ "x = " ++ String.fromInt x ++ " ≥ 0, so use f(x) = 2x"
                                                        , "f(" ++ String.fromInt x ++ ") = 2(" ++ String.fromInt x ++ ") = " ++ String.fromInt (2 * x)
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
                                                    { prompt =
                                                        "f(x) = { 2x if x ≥ 0 | −x if x < 0 }. Find f(" ++ String.fromInt nx ++ ")."
                                                    , answer = String.fromInt (-nx)
                                                    , steps =
                                                        [ "x = " ++ String.fromInt nx ++ " < 0, so use f(x) = −x"
                                                        , "f(" ++ String.fromInt nx ++ ") = −(" ++ String.fromInt nx ++ ") = " ++ String.fromInt (-nx)
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
                                                    { prompt =
                                                        "f(x) = { x + 3 if x < 2 | x² if x ≥ 2 }. Find f(" ++ String.fromInt x ++ ")."
                                                    , answer = String.fromInt (x * x)
                                                    , steps =
                                                        [ "x = " ++ String.fromInt x ++ " ≥ 2, so use f(x) = x²"
                                                        , "f(" ++ String.fromInt x ++ ") = " ++ String.fromInt x ++ "² = " ++ String.fromInt (x * x)
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
                            { prompt = "Simplify: " ++ String.fromInt num ++ "x / (" ++ String.fromInt den ++ "x)"
                            , answer = correct
                            , steps =
                                [ "Cancel the common factor x: " ++ String.fromInt num ++ "/" ++ String.fromInt den
                                , String.fromInt num ++ "/" ++ String.fromInt den ++ " → GCF is " ++ String.fromInt g ++ " → " ++ correct
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
                        { prompt =
                            "(" ++ String.fromInt r.a ++ "/" ++ String.fromInt r.b
                                ++ ") × (" ++ String.fromInt r.c ++ "/" ++ String.fromInt r.d ++ ") = ?"
                        , answer = correct
                        , steps =
                            [ "Multiply numerators: " ++ String.fromInt r.a ++ " × " ++ String.fromInt r.c ++ " = " ++ String.fromInt numProd
                            , "Multiply denominators: " ++ String.fromInt r.b ++ " × " ++ String.fromInt r.d ++ " = " ++ String.fromInt denProd
                            , "Simplify: " ++ String.fromInt numProd ++ "/" ++ String.fromInt denProd ++ " = " ++ correct
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
                        { prompt =
                            String.fromInt a ++ "√" ++ String.fromInt k
                                ++ " + " ++ String.fromInt b ++ "√" ++ String.fromInt k ++ " = ?"
                        , answer = correct
                        , steps =
                            [ "Like radicals: add coefficients"
                            , String.fromInt a ++ " + " ++ String.fromInt b ++ " = " ++ String.fromInt coeff ++ " → " ++ correct
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
                        { prompt =
                            "√" ++ String.fromInt a ++ " × √" ++ String.fromInt b ++ " = ?"
                        , answer = correct
                        , steps =
                            [ "√a × √b = √(a·b)"
                            , "√" ++ String.fromInt a ++ " × √" ++ String.fromInt b ++ " = √" ++ String.fromInt product
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
                    { prompt = "Solve: √x = " ++ String.fromInt n
                    , answer = "x = " ++ String.fromInt (n * n)
                    , steps =
                        [ "Square both sides: x = " ++ String.fromInt n ++ "² = " ++ String.fromInt (n * n)
                        , "Check: √" ++ String.fromInt (n * n) ++ " = " ++ String.fromInt n ++ " ✓"
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
                                    { prompt =
                                        "Find the mean of: "
                                            ++ String.fromInt r.a ++ ", "
                                            ++ String.fromInt r.b ++ ", "
                                            ++ String.fromInt r.c ++ ", "
                                            ++ String.fromInt r.d
                                    , answer = String.fromInt mean
                                    , steps =
                                        [ "Add all values: " ++ String.fromInt r.a ++ " + " ++ String.fromInt r.b ++ " + " ++ String.fromInt r.c ++ " + " ++ String.fromInt r.d ++ " = " ++ String.fromInt total
                                        , "Divide by count (4): " ++ String.fromInt total ++ "/4 = " ++ String.fromInt mean
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
                                { prompt =
                                    "Mean μ = " ++ String.fromInt mu
                                        ++ ", σ = " ++ String.fromInt sigma
                                        ++ ". Find the z-score for x = " ++ String.fromInt x ++ "."
                                , answer = String.fromInt z
                                , steps =
                                    [ "z = (x − μ) / σ"
                                    , "= (" ++ String.fromInt x ++ " − " ++ String.fromInt mu ++ ") / " ++ String.fromInt sigma ++ " = " ++ String.fromInt (x - mu) ++ "/" ++ String.fromInt sigma ++ " = " ++ String.fromInt z
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
                                { prompt =
                                    "Find the variance of: "
                                        ++ String.fromInt v1 ++ ", "
                                        ++ String.fromInt v2 ++ ", "
                                        ++ String.fromInt v3 ++ ", "
                                        ++ String.fromInt v4
                                        ++ " (mean = " ++ String.fromInt m ++ ")"
                                , answer = String.fromInt variance
                                , steps =
                                    [ "Deviations from mean: " ++ String.fromInt d1 ++ ", " ++ String.fromInt d2 ++ ", −" ++ String.fromInt d1 ++ ", −" ++ String.fromInt d2
                                    , "Squared: " ++ String.fromInt (d1 * d1) ++ ", " ++ String.fromInt (d2 * d2) ++ ", " ++ String.fromInt (d1 * d1) ++ ", " ++ String.fromInt (d2 * d2)
                                    , "Variance = (" ++ String.fromInt (d1 * d1) ++ "+" ++ String.fromInt (d2 * d2) ++ "+" ++ String.fromInt (d1 * d1) ++ "+" ++ String.fromInt (d2 * d2) ++ ")/4 = " ++ String.fromInt (2 * (d1 * d1 + d2 * d2)) ++ "/4 = " ++ String.fromInt variance
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
