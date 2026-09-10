module Game.Problem.Course2 exposing (generatorFor, generatorForQuest)

import Game.Problem.Common exposing (..)
import Random exposing (Generator)
import Types exposing (..)


-- ── TOP-LEVEL DISPATCHERS ──────────────────────────────────────────────────


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


generatorForQuest : Int -> Int -> Int -> Generator Problem
generatorForQuest unitNum questIndex _ =
    case ( unitNum, questIndex ) of
        -- Unit 1: Number Sense (8 quests, indices 0-7)
        ( 1, 0 ) -> genIntAddSubPos
        ( 1, 1 ) -> genIntAddSubNeg
        ( 1, 2 ) -> genIntMulDiv
        ( 1, 3 ) -> genSimplifyFrac
        ( 1, 4 ) -> genFracAddSub
        ( 1, 5 ) -> genFracMulDiv
        ( 1, 6 ) -> genConvertFDP
        ( 1, 7 ) -> genExpSquareRoot
        ( 1, _ ) -> unit1
        -- Unit 2: Expressions (7 quests, indices 0-6)
        ( 2, 0 ) -> genOrderOfOps
        ( 2, 1 ) -> genTranslateEval
        ( 2, 2 ) -> genCombineLike
        ( 2, 3 ) -> genDistributive
        ( 2, 4 ) -> genSimplifyExpr
        ( 2, 5 ) -> genFactorExpr
        ( 2, 6 ) -> genMonomialOps
        ( 2, _ ) -> unit2
        -- Unit 3: Equations and Inequalities (5 quests, indices 0-4)
        ( 3, 0 ) -> genOneStepEq
        ( 3, 1 ) -> genTwoStepEq
        ( 3, 2 ) -> genMultiStepEq
        ( 3, 3 ) -> genOneStepIneq
        ( 3, 4 ) -> genTwoStepIneq
        ( 3, _ ) -> unit3
        -- Unit 4: Ratios, Proportions, and Percents (8 quests, indices 0-7)
        ( 4, 0 ) -> genRatioSimplify
        ( 4, 1 ) -> genUnitRate
        ( 4, 2 ) -> genSolveProportion
        ( 4, 3 ) -> genScaleDrawing
        ( 4, 4 ) -> genSimilarFigures
        ( 4, 5 ) -> genPercentProportion
        ( 4, 6 ) -> genDiscountMarkup
        ( 4, 7 ) -> genSimpleInterest
        ( 4, _ ) -> unit4
        -- Unit 5: Functions and Graphing (6 quests, indices 0-5)
        ( 5, 0 ) -> genQuadrant
        ( 5, 1 ) -> genIsFunction
        ( 5, 2 ) -> genSlopeFromPoints
        ( 5, 3 ) -> genSlopeIntercept
        ( 5, 4 ) -> genLinearFuncValue
        ( 5, 5 ) -> genProportionalRelation
        ( 5, _ ) -> unit5
        -- Unit 6: Geometry (6 quests, indices 0-5)
        ( 6, 0 ) -> genAngleClassify
        ( 6, 1 ) -> genCompSuppl
        ( 6, 2 ) -> genVerticalAngles
        ( 6, 3 ) -> genTriangleSum
        ( 6, 4 ) -> genTriangleClassify
        ( 6, 5 ) -> genTranslation
        ( 6, _ ) -> unit6
        -- Unit 7: Measurement (6 quests, indices 0-5)
        ( 7, 0 ) -> genPerimArea
        ( 7, 1 ) -> genCircleCalc
        ( 7, 2 ) -> genSurfaceAreaRect
        ( 7, 3 ) -> genSurfaceAreaCylinder
        ( 7, 4 ) -> genVolumeRect
        ( 7, 5 ) -> genVolumeCylinder
        ( 7, _ ) -> unit7
        -- Unit 8: Probability and Statistics (6 quests, indices 0-5)
        ( 8, 0 ) -> genSimpleProb
        ( 8, 1 ) -> genCountingPrinciple
        ( 8, 2 ) -> genCompoundProb
        ( 8, 3 ) -> genMeanMedianMode
        ( 8, 4 ) -> genBoxWhisker
        ( 8, 5 ) -> genStemLeaf
        ( 8, _ ) -> unit8
        _ -> generatorFor unitNum


-- ── UNIT MIXERS ────────────────────────────────────────────────────────────


unit1 : Generator Problem
unit1 =
    Random.int 0 7
        |> Random.andThen
            (\t ->
                case t of
                    0 -> genIntAddSubPos
                    1 -> genIntAddSubNeg
                    2 -> genIntMulDiv
                    3 -> genSimplifyFrac
                    4 -> genFracAddSub
                    5 -> genFracMulDiv
                    6 -> genConvertFDP
                    _ -> genExpSquareRoot
            )


unit2 : Generator Problem
unit2 =
    Random.int 0 6
        |> Random.andThen
            (\t ->
                case t of
                    0 -> genOrderOfOps
                    1 -> genTranslateEval
                    2 -> genCombineLike
                    3 -> genDistributive
                    4 -> genSimplifyExpr
                    5 -> genFactorExpr
                    _ -> genMonomialOps
            )


unit3 : Generator Problem
unit3 =
    Random.int 0 4
        |> Random.andThen
            (\t ->
                case t of
                    0 -> genOneStepEq
                    1 -> genTwoStepEq
                    2 -> genMultiStepEq
                    3 -> genOneStepIneq
                    _ -> genTwoStepIneq
            )


unit4 : Generator Problem
unit4 =
    Random.int 0 7
        |> Random.andThen
            (\t ->
                case t of
                    0 -> genRatioSimplify
                    1 -> genUnitRate
                    2 -> genSolveProportion
                    3 -> genScaleDrawing
                    4 -> genSimilarFigures
                    5 -> genPercentProportion
                    6 -> genDiscountMarkup
                    _ -> genSimpleInterest
            )


unit5 : Generator Problem
unit5 =
    Random.int 0 5
        |> Random.andThen
            (\t ->
                case t of
                    0 -> genQuadrant
                    1 -> genIsFunction
                    2 -> genSlopeFromPoints
                    3 -> genSlopeIntercept
                    4 -> genLinearFuncValue
                    _ -> genProportionalRelation
            )


unit6 : Generator Problem
unit6 =
    Random.int 0 5
        |> Random.andThen
            (\t ->
                case t of
                    0 -> genAngleClassify
                    1 -> genCompSuppl
                    2 -> genVerticalAngles
                    3 -> genTriangleSum
                    4 -> genTriangleClassify
                    _ -> genTranslation
            )


unit7 : Generator Problem
unit7 =
    Random.int 0 5
        |> Random.andThen
            (\t ->
                case t of
                    0 -> genPerimArea
                    1 -> genCircleCalc
                    2 -> genSurfaceAreaRect
                    3 -> genSurfaceAreaCylinder
                    4 -> genVolumeRect
                    _ -> genVolumeCylinder
            )


unit8 : Generator Problem
unit8 =
    Random.int 0 5
        |> Random.andThen
            (\t ->
                case t of
                    0 -> genSimpleProb
                    1 -> genCountingPrinciple
                    2 -> genCompoundProb
                    3 -> genMeanMedianMode
                    4 -> genBoxWhisker
                    _ -> genStemLeaf
            )


-- ── UNIT 1: Number Sense ───────────────────────────────────────────────────


genIntAddSubPos : Generator Problem
genIntAddSubPos =
    Random.int 0 1
        |> Random.andThen
            (\op ->
                Random.map2 Tuple.pair (randInt 10 999) (randInt 10 999)
                    |> Random.map
                        (\( a, b ) ->
                            if op == 0 then
                                { prompt = String.fromInt a ++ " + " ++ String.fromInt b ++ " = ?"
                                , inputType = TInteger
                                , answer = AInt (a + b)
                                , hint =
                                    { prompt = String.fromInt a ++ " + " ++ String.fromInt b ++ " = ?"
                                    , answer = String.fromInt (a + b)
                                    , steps =
                                        [ "Add ones: " ++ String.fromInt (modBy 10 a) ++ " + " ++ String.fromInt (modBy 10 b) ++ " = " ++ String.fromInt (modBy 10 a + modBy 10 b)
                                        , "Add tens: " ++ String.fromInt (modBy 10 (a // 10)) ++ " + " ++ String.fromInt (modBy 10 (b // 10))
                                        , "Add hundreds: " ++ String.fromInt (a // 100) ++ " + " ++ String.fromInt (b // 100)
                                        , "Answer: " ++ String.fromInt (a + b)
                                        ]
                                    }
                                }
                            else
                                let
                                    big = max a b
                                    small = min a b
                                    onesB = modBy 10 big
                                    onesS = modBy 10 small
                                    borrow1 = if onesB < onesS then 1 else 0
                                    onesResult = onesB + borrow1 * 10 - onesS
                                    origTens = modBy 10 (big // 10)
                                    tensB = origTens - borrow1
                                    tensS = modBy 10 (small // 10)
                                    borrow2 = if tensB < tensS then 1 else 0
                                    tensResult = tensB + borrow2 * 10 - tensS
                                    hundredsB = big // 100 - borrow2
                                    hundredsS = small // 100
                                    str = String.fromInt
                                    onesStep =
                                        if borrow1 == 1 then
                                            "Ones: " ++ str onesB ++ " < " ++ str onesS ++ ", borrow 10 → " ++ str (onesB + 10) ++ " − " ++ str onesS ++ " = " ++ str onesResult
                                        else
                                            "Ones: " ++ str onesB ++ " − " ++ str onesS ++ " = " ++ str onesResult
                                    tensStep =
                                        if borrow1 == 1 && borrow2 == 1 then
                                            "Tens: " ++ str origTens ++ " − 1 (lent) then borrow 10 → " ++ str (origTens + 9) ++ " − " ++ str tensS ++ " = " ++ str tensResult
                                        else if borrow1 == 1 then
                                            "Tens: " ++ str origTens ++ " − 1 (lent to ones) − " ++ str tensS ++ " = " ++ str tensResult
                                        else if borrow2 == 1 then
                                            "Tens: " ++ str origTens ++ " < " ++ str tensS ++ ", borrow 10 → " ++ str (origTens + 10) ++ " − " ++ str tensS ++ " = " ++ str tensResult
                                        else
                                            "Tens: " ++ str origTens ++ " − " ++ str tensS ++ " = " ++ str tensResult
                                in
                                { prompt = str big ++ " - " ++ str small ++ " = ?"
                                , inputType = TInteger
                                , answer = AInt (big - small)
                                , hint =
                                    { prompt = str big ++ " - " ++ str small ++ " = ?"
                                    , answer = str (big - small)
                                    , steps =
                                        [ onesStep
                                        , tensStep
                                        ]
                                        ++ (if big >= 100 || hundredsS > 0 then
                                                [ "Hundreds: " ++ str hundredsB ++ " − " ++ str hundredsS ++ " = " ++ str (hundredsB - hundredsS) ]
                                            else
                                                []
                                           )
                                        ++ [ "Answer: " ++ str (big - small) ]
                                    }
                                }
                        )
            )


genIntAddSubNeg : Generator Problem
genIntAddSubNeg =
    Random.int 0 1
        |> Random.andThen
            (\op ->
                Random.map2 Tuple.pair (randInt -50 50) (randInt -50 50)
                    |> Random.map
                        (\( a, b ) ->
                            if op == 0 then
                                { prompt = showSigned a ++ " + " ++ showSigned b ++ " = ?"
                                , inputType = TInteger
                                , answer = AInt (a + b)
                                , hint =
                                    { prompt = showSigned a ++ " + " ++ showSigned b ++ " = ?"
                                    , answer = String.fromInt (a + b)
                                    , steps =
                                        if (a >= 0 && b >= 0) || (a < 0 && b < 0) then
                                            [ "Same signs: add absolute values"
                                            , String.fromInt (abs a) ++ " + " ++ String.fromInt (abs b) ++ " = " ++ String.fromInt (abs a + abs b)
                                            , "Keep the sign: " ++ String.fromInt (a + b)
                                            ]
                                        else
                                            [ "Different signs: subtract smaller absolute value from larger"
                                            , "abs values: " ++ String.fromInt (abs a) ++ " and " ++ String.fromInt (abs b)
                                            , "Answer: " ++ String.fromInt (a + b)
                                            ]
                                    }
                                }
                            else
                                { prompt = showSigned a ++ " - " ++ showSigned b ++ " = ?"
                                , inputType = TInteger
                                , answer = AInt (a - b)
                                , hint =
                                    { prompt = showSigned a ++ " - " ++ showSigned b ++ " = ?"
                                    , answer = String.fromInt (a - b)
                                    , steps =
                                        [ "Subtracting " ++ showSigned b ++ " is the same as adding " ++ showSigned (-b)
                                        , showSigned a ++ " + " ++ showSigned (-b) ++ " = " ++ String.fromInt (a - b)
                                        ]
                                    }
                                }
                        )
            )


genIntMulDiv : Generator Problem
genIntMulDiv =
    Random.int 0 1
        |> Random.andThen
            (\op ->
                if op == 0 then
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
                                            { prompt = showSigned a ++ " × " ++ showSigned b ++ " = ?"
                                            , inputType = TChoice choices
                                            , answer = AChoice 0
                                            , hint =
                                                { prompt = showSigned a ++ " × " ++ showSigned b ++ " = ?"
                                                , answer = String.fromInt correct
                                                , steps =
                                                    [ "Multiply absolute values: " ++ String.fromInt (abs a) ++ " × " ++ String.fromInt (abs b) ++ " = " ++ String.fromInt (abs a * abs b)
                                                    , if (a >= 0 && b >= 0) || (a < 0 && b < 0) then "Same signs → positive" else "Different signs → negative"
                                                    , "Answer: " ++ String.fromInt correct
                                                    ]
                                                }
                                            }
                                        )
                            )
                else
                    Random.map2 Tuple.pair (randIntNonZero -8 8) (randInt 1 6)
                        |> Random.andThen
                            (\( b, q ) ->
                                let a = b * q in
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
                                                    , if (a >= 0 && b > 0) || (a < 0 && b < 0) then "Same signs → positive" else "Different signs → negative"
                                                    , "Answer: " ++ String.fromInt q
                                                    ]
                                                }
                                            }
                                        )
                            )
            )


genSimplifyFrac : Generator Problem
genSimplifyFrac =
    Random.map2 Tuple.pair (randInt 2 4) (randInt 2 6)
        |> Random.andThen
            (\( k, n ) ->
                randInt 2 6
                    |> Random.map
                        (\d ->
                            let
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
                                    [ "GCF of " ++ String.fromInt bigN ++ " and " ++ String.fromInt bigD ++ " is " ++ String.fromInt (gcd bigN bigD)
                                    , String.fromInt bigN ++ " / " ++ String.fromInt (gcd bigN bigD) ++ " = " ++ String.fromInt ansN ++ ", " ++ String.fromInt bigD ++ " / " ++ String.fromInt (gcd bigN bigD) ++ " = " ++ String.fromInt ansD
                                    , "Answer: " ++ showFrac ansN ansD
                                    ]
                                }
                            }
                        )
            )


genFracAddSub : Generator Problem
genFracAddSub =
    Random.int 0 1
        |> Random.andThen
            (\op ->
                randChoice [ 2, 3, 4, 5, 6 ] 4
                    |> Random.andThen
                        (\d1 ->
                            randChoice [ 2, 3, 4, 5, 6 ] 3
                                |> Random.andThen
                                    (\d2raw ->
                                        let d2 = if d2raw == d1 then (if d1 == 6 then 2 else d1 + 1) else d2raw
                                        in
                                        Random.map2 Tuple.pair (randInt 1 (d1 - 1)) (randInt 1 (d2 - 1))
                                            |> Random.map
                                                (\( n1, n2 ) ->
                                                    let
                                                        commonD = lcm d1 d2
                                                        e1 = n1 * (commonD // d1)
                                                        e2 = n2 * (commonD // d2)
                                                        ( rn, rd ) =
                                                            if op == 0 then
                                                                reduceFraction (e1 + e2) commonD
                                                            else
                                                                let big = max e1 e2
                                                                    small = min e1 e2
                                                                    ( bn1, bd1 ) = if e1 >= e2 then ( n1, d1 ) else ( n2, d2 )
                                                                    ( bn2, bd2 ) = if e1 >= e2 then ( n2, d2 ) else ( n1, d1 )
                                                                in
                                                                reduceFraction (big - small) commonD
                                                        opStr = if op == 0 then " + " else " - "
                                                        pn1 = if op == 0 then n1 else (if e1 >= e2 then n1 else n2)
                                                        pd1 = if op == 0 then d1 else (if e1 >= e2 then d1 else d2)
                                                        pn2 = if op == 0 then n2 else (if e1 >= e2 then n2 else n1)
                                                        pd2 = if op == 0 then d2 else (if e1 >= e2 then d2 else d1)
                                                    in
                                                    { prompt = showFrac pn1 pd1 ++ opStr ++ showFrac pn2 pd2 ++ " = ?"
                                                    , inputType = TFraction
                                                    , answer = AFraction rn rd
                                                    , hint =
                                                        { prompt = showFrac pn1 pd1 ++ opStr ++ showFrac pn2 pd2 ++ " = ?"
                                                        , answer = showFrac rn rd
                                                        , steps =
                                                            [ "Find LCD: LCD(" ++ String.fromInt pd1 ++ ", " ++ String.fromInt pd2 ++ ") = " ++ String.fromInt commonD
                                                            , showFrac pn1 pd1 ++ " = " ++ showFrac (pn1 * (commonD // pd1)) commonD ++ " and " ++ showFrac pn2 pd2 ++ " = " ++ showFrac (pn2 * (commonD // pd2)) commonD
                                                            , showFrac (pn1 * (commonD // pd1)) commonD ++ opStr ++ showFrac (pn2 * (commonD // pd2)) commonD ++ " = " ++ showFrac rn rd
                                                            ]
                                                        }
                                                    }
                                                )
                                    )
                        )
            )


genFracMulDiv : Generator Problem
genFracMulDiv =
    Random.int 0 1
        |> Random.andThen
            (\op ->
                Random.map2 Tuple.pair
                    (Random.map2 Tuple.pair (randInt 1 5) (randInt 2 7))
                    (Random.map2 Tuple.pair (randInt 1 5) (randInt 2 7))
                    |> Random.map
                        (\( ( n1, d1 ), ( n2, d2 ) ) ->
                            if op == 0 then
                                let ( rn, rd ) = reduceFraction (n1 * n2) (d1 * d2) in
                                { prompt = showFrac n1 d1 ++ " × " ++ showFrac n2 d2 ++ " = ?"
                                , inputType = TFraction
                                , answer = AFraction rn rd
                                , hint =
                                    { prompt = showFrac n1 d1 ++ " × " ++ showFrac n2 d2 ++ " = ?"
                                    , answer = showFrac rn rd
                                    , steps =
                                        [ "Multiply numerators: " ++ String.fromInt n1 ++ " × " ++ String.fromInt n2 ++ " = " ++ String.fromInt (n1 * n2)
                                        , "Multiply denominators: " ++ String.fromInt d1 ++ " × " ++ String.fromInt d2 ++ " = " ++ String.fromInt (d1 * d2)
                                        , "Simplify " ++ showFrac (n1 * n2) (d1 * d2) ++ ": GCF is " ++ String.fromInt (gcd (n1 * n2) (d1 * d2)) ++ ", so " ++ showFrac rn rd
                                        ]
                                    }
                                }
                            else
                                let ( rn, rd ) = reduceFraction (n1 * d2) (d1 * n2) in
                                { prompt = showFrac n1 d1 ++ " / " ++ showFrac n2 d2 ++ " = ?"
                                , inputType = TFraction
                                , answer = AFraction rn rd
                                , hint =
                                    { prompt = showFrac n1 d1 ++ " / " ++ showFrac n2 d2 ++ " = ?"
                                    , answer = showFrac rn rd
                                    , steps =
                                        [ "Keep, Change, Flip: " ++ showFrac n1 d1 ++ " × " ++ showFrac d2 n2
                                        , "Multiply: " ++ showFrac (n1 * d2) (d1 * n2)
                                        , "Simplify: " ++ showFrac rn rd
                                        ]
                                    }
                                }
                        )
            )


genConvertFDP : Generator Problem
genConvertFDP =
    Random.int 0 2
        |> Random.andThen
            (\t ->
                case t of
                    0 ->
                        -- fraction to percent (simple ones)
                        randChoice [ ( 1, 2, 50 ), ( 1, 4, 25 ), ( 3, 4, 75 ), ( 1, 5, 20 ), ( 2, 5, 40 ) ] ( 1, 2, 50 )
                            |> Random.andThen
                                (\( n, d, pct ) ->
                                    wrongChoicesInt pct
                                        |> Random.map
                                            (\wrong ->
                                                let choices = shuffleChoices (String.fromInt pct ++ "%") (List.map (\w -> w ++ "%") wrong) in
                                                { prompt = "Convert " ++ showFrac n d ++ " to a percent."
                                                , inputType = TChoice choices
                                                , answer = AChoice 0
                                                , hint =
                                                    { prompt = "Convert " ++ showFrac n d ++ " to a percent."
                                                    , answer = String.fromInt pct ++ "%"
                                                    , steps =
                                                        [ "Divide numerator by denominator: " ++ String.fromInt n ++ " / " ++ String.fromInt d ++ " = " ++ String.fromFloat (toFloat n / toFloat d)
                                                        , "Multiply by 100: " ++ String.fromFloat (toFloat n / toFloat d) ++ " × 100 = " ++ String.fromInt pct ++ "%"
                                                        ]
                                                    }
                                                }
                                            )
                                )

                    1 ->
                        -- decimal to percent
                        randChoice [ 0.25, 0.5, 0.75, 0.1, 0.2, 0.4, 0.6, 0.8 ] 0.5
                            |> Random.andThen
                                (\dec ->
                                    let pct = round (dec * 100) in
                                    wrongChoicesInt pct
                                        |> Random.map
                                            (\wrong ->
                                                let choices = shuffleChoices (String.fromInt pct ++ "%") (List.map (\w -> w ++ "%") wrong) in
                                                { prompt = "Convert " ++ String.fromFloat dec ++ " to a percent."
                                                , inputType = TChoice choices
                                                , answer = AChoice 0
                                                , hint =
                                                    { prompt = "Convert " ++ String.fromFloat dec ++ " to a percent."
                                                    , answer = String.fromInt pct ++ "%"
                                                    , steps =
                                                        [ "Multiply by 100 (move decimal 2 places right)"
                                                        , String.fromFloat dec ++ " × 100 = " ++ String.fromInt pct ++ "%"
                                                        ]
                                                    }
                                                }
                                            )
                                )

                    _ ->
                        -- percent to decimal
                        randChoice [ 25, 50, 75, 10, 20, 30, 60, 80 ] 50
                            |> Random.map
                                (\pct ->
                                    let dec = toFloat pct / 100.0 in
                                    { prompt = "Convert " ++ String.fromInt pct ++ "% to a decimal."
                                    , inputType = TDecimal
                                    , answer = AFloat dec 0.001
                                    , hint =
                                        { prompt = "Convert " ++ String.fromInt pct ++ "% to a decimal."
                                        , answer = String.fromFloat dec
                                        , steps =
                                            [ "Divide by 100 (move decimal 2 places left)"
                                            , String.fromInt pct ++ " / 100 = " ++ String.fromFloat dec
                                            ]
                                        }
                                    }
                                )
            )


genExpSquareRoot : Generator Problem
genExpSquareRoot =
    Random.int 0 1
        |> Random.andThen
            (\t ->
                if t == 0 then
                    -- Exponent
                    Random.map2 Tuple.pair (randInt 2 8) (randInt 2 3)
                        |> Random.andThen
                            (\( base, exp ) ->
                                let correct = base ^ exp in
                                wrongChoicesInt correct
                                    |> Random.map
                                        (\wrong ->
                                            let choices = shuffleChoices (String.fromInt correct) wrong in
                                            { prompt = String.fromInt base ++ superscript exp ++ " = ?"
                                            , inputType = TChoice choices
                                            , answer = AChoice 0
                                            , hint =
                                                { prompt = String.fromInt base ++ superscript exp ++ " = ?"
                                                , answer = String.fromInt correct
                                                , steps =
                                                    [ String.fromInt base ++ superscript exp ++ " = " ++ String.join " × " (List.repeat exp (String.fromInt base))
                                                    , "= " ++ String.fromInt correct
                                                    ]
                                                }
                                            }
                                        )
                            )
                else
                    -- Perfect square root
                    randChoice [ 4, 9, 16, 25, 36, 49, 64, 81, 100 ] 25
                        |> Random.andThen
                            (\sq ->
                                let root = round (sqrt (toFloat sq)) in
                                wrongChoicesInt root
                                    |> Random.map
                                        (\wrong ->
                                            let choices = shuffleChoices (String.fromInt root) wrong in
                                            { prompt = "√" ++ String.fromInt sq ++ " = ?"
                                            , inputType = TChoice choices
                                            , answer = AChoice 0
                                            , hint =
                                                { prompt = "√" ++ String.fromInt sq ++ " = ?"
                                                , answer = String.fromInt root
                                                , steps =
                                                    [ "Ask: what number times itself equals " ++ String.fromInt sq ++ "?"
                                                    , String.fromInt root ++ " × " ++ String.fromInt root ++ " = " ++ String.fromInt sq ++ ", so √" ++ String.fromInt sq ++ " = " ++ String.fromInt root
                                                    ]
                                                }
                                            }
                                        )
                            )
            )


-- ── UNIT 2: Expressions ────────────────────────────────────────────────────


genOrderOfOps : Generator Problem
genOrderOfOps =
    Random.int 0 2
        |> Random.andThen
            (\t ->
                case t of
                    0 ->
                        -- a + b × c
                        Random.map3 (\a b c -> ( a, b, c )) (randInt 1 9) (randInt 2 8) (randInt 2 6)
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
                                                    { prompt = String.fromInt a ++ " + " ++ String.fromInt b ++ " × " ++ String.fromInt c ++ " = ?"
                                                    , answer = String.fromInt correct
                                                    , steps =
                                                        [ "Multiply first (PEMDAS): " ++ String.fromInt b ++ " × " ++ String.fromInt c ++ " = " ++ String.fromInt (b * c)
                                                        , "Then add: " ++ String.fromInt a ++ " + " ++ String.fromInt (b * c) ++ " = " ++ String.fromInt correct
                                                        ]
                                                    }
                                                }
                                            )
                                )

                    1 ->
                        -- (a + b) × c
                        Random.map3 (\a b c -> ( a, b, c )) (randInt 1 9) (randInt 1 9) (randInt 2 6)
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
                                                    { prompt = "(" ++ String.fromInt a ++ " + " ++ String.fromInt b ++ ") × " ++ String.fromInt c ++ " = ?"
                                                    , answer = String.fromInt correct
                                                    , steps =
                                                        [ "Parentheses first: " ++ String.fromInt a ++ " + " ++ String.fromInt b ++ " = " ++ String.fromInt (a + b)
                                                        , "Then multiply: " ++ String.fromInt (a + b) ++ " × " ++ String.fromInt c ++ " = " ++ String.fromInt correct
                                                        ]
                                                    }
                                                }
                                            )
                                )

                    _ ->
                        -- a² + b × c
                        Random.map3 (\a b c -> ( a, b, c )) (randInt 2 5) (randInt 1 5) (randInt 1 5)
                            |> Random.andThen
                                (\( a, b, c ) ->
                                    let correct = a * a + b * c in
                                    wrongChoicesInt correct
                                        |> Random.map
                                            (\wrong ->
                                                let choices = shuffleChoices (String.fromInt correct) wrong in
                                                { prompt = String.fromInt a ++ "² + " ++ String.fromInt b ++ " × " ++ String.fromInt c ++ " = ?"
                                                , inputType = TChoice choices
                                                , answer = AChoice 0
                                                , hint =
                                                    { prompt = String.fromInt a ++ "² + " ++ String.fromInt b ++ " × " ++ String.fromInt c ++ " = ?"
                                                    , answer = String.fromInt correct
                                                    , steps =
                                                        [ "Exponent first: " ++ String.fromInt a ++ "² = " ++ String.fromInt (a * a)
                                                        , "Multiply: " ++ String.fromInt b ++ " × " ++ String.fromInt c ++ " = " ++ String.fromInt (b * c)
                                                        , "Add: " ++ String.fromInt (a * a) ++ " + " ++ String.fromInt (b * c) ++ " = " ++ String.fromInt correct
                                                        ]
                                                    }
                                                }
                                            )
                                )
            )


genTranslateEval : Generator Problem
genTranslateEval =
    Random.int 0 1
        |> Random.andThen
            (\t ->
                if t == 0 then
                    -- Translate phrase to expression
                    Random.int 0 2
                        |> Random.map
                            (\n ->
                                case n of
                                    0 ->
                                        { prompt = "Translate: 'twice a number n decreased by 5'"
                                        , inputType = TChoice [ "2n - 5", "2n + 5", "5 - 2n", "2(n - 5)" ]
                                        , answer = AChoice 0
                                        , hint =
                                            { prompt = "Translate: 'twice n minus 5'"
                                            , answer = "2n - 5"
                                            , steps =
                                                [ "'Twice n' = 2n"
                                                , "'Decreased by 5' = subtract 5"
                                                , "Answer: 2n - 5"
                                                ]
                                            }
                                        }

                                    1 ->
                                        { prompt = "Translate: 'the sum of x and 8, divided by 2'"
                                        , inputType = TChoice [ "(x + 8)/2", "x + 8/2", "x/2 + 8", "2(x + 8)" ]
                                        , answer = AChoice 0
                                        , hint =
                                            { prompt = "Translate: '(x + 8) divided by 2'"
                                            , answer = "(x + 8)/2"
                                            , steps =
                                                [ "'Sum of x and 8' = x + 8 (in parentheses)"
                                                , "'Divided by 2' = divide the whole sum"
                                                , "Answer: (x + 8)/2"
                                                ]
                                            }
                                        }

                                    _ ->
                                        { prompt = "Translate: 'three less than four times y'"
                                        , inputType = TChoice [ "4y - 3", "3 - 4y", "4y + 3", "4(y - 3)" ]
                                        , answer = AChoice 0
                                        , hint =
                                            { prompt = "Translate: '3 less than 4y'"
                                            , answer = "4y - 3"
                                            , steps =
                                                [ "'Four times y' = 4y"
                                                , "'Three less than' = subtract 3 after"
                                                , "Answer: 4y - 3"
                                                ]
                                            }
                                        }
                            )
                else
                    -- Evaluate expression
                    Random.map3 (\a b x -> ( a, b, x )) (randInt 1 8) (randInt 1 8) (randInt 1 8)
                        |> Random.map
                            (\( a, b, x ) ->
                                { prompt = "Evaluate " ++ String.fromInt a ++ "x - " ++ String.fromInt b ++ " when x = " ++ String.fromInt x
                                , inputType = TInteger
                                , answer = AInt (a * x - b)
                                , hint =
                                    { prompt = "Evaluate " ++ String.fromInt a ++ "x - " ++ String.fromInt b ++ " when x = " ++ String.fromInt x
                                    , answer = String.fromInt (a * x - b)
                                    , steps =
                                        [ "Replace x with " ++ String.fromInt x ++ ": " ++ String.fromInt a ++ "(" ++ String.fromInt x ++ ") - " ++ String.fromInt b
                                        , "Multiply: " ++ String.fromInt (a * x) ++ " - " ++ String.fromInt b
                                        , "Subtract: " ++ String.fromInt (a * x - b)
                                        ]
                                    }
                                }
                            )
            )


genCombineLike : Generator Problem
genCombineLike =
    Random.int 0 1
        |> Random.andThen
            (\t ->
                if t == 0 then
                    -- Combine x terms only: ax + bx = ?x
                    Random.map2 Tuple.pair (randInt 2 8) (randInt 1 7)
                        |> Random.andThen
                            (\( a, b ) ->
                                let correct = String.fromInt (a + b) ++ "x" in
                                let wrong = [ String.fromInt (a - b + 1) ++ "x", String.fromInt (a * b) ++ "x", String.fromInt (a + b + 1) ++ "x" ] in
                                let choices = shuffleChoices correct wrong in
                                Random.constant
                                    { prompt = "Combine: " ++ String.fromInt a ++ "x + " ++ String.fromInt b ++ "x"
                                    , inputType = TChoice choices
                                    , answer = AChoice 0
                                    , hint =
                                        { prompt = "Combine: " ++ String.fromInt a ++ "x + " ++ String.fromInt b ++ "x"
                                        , answer = correct
                                        , steps =
                                            [ "Like terms have the same variable part"
                                            , "Add coefficients: " ++ String.fromInt a ++ " + " ++ String.fromInt b ++ " = " ++ String.fromInt (a + b)
                                            , "Answer: " ++ correct
                                            ]
                                        }
                                    }
                            )
                else
                    -- Combine with constants: ax + b + cx + d
                    Random.map4 (\a b c d -> { a = a, b = b, c = c, d = d })
                        (randInt 1 6) (randInt 1 9) (randInt 1 6) (randInt 1 9)
                        |> Random.map
                            (\r ->
                                let
                                    xCoeff = r.a + r.c
                                    constant = r.b + r.d
                                    correct = String.fromInt xCoeff ++ "x + " ++ String.fromInt constant
                                    wrong1 = String.fromInt (xCoeff + 1) ++ "x + " ++ String.fromInt constant
                                    wrong2 = String.fromInt xCoeff ++ "x + " ++ String.fromInt (constant + 1)
                                    wrong3 = String.fromInt (xCoeff - 1) ++ "x + " ++ String.fromInt (constant + 2)
                                    choices = shuffleChoices correct [ wrong1, wrong2, wrong3 ]
                                in
                                { prompt = "Simplify: " ++ String.fromInt r.a ++ "x + " ++ String.fromInt r.b ++ " + " ++ String.fromInt r.c ++ "x + " ++ String.fromInt r.d
                                , inputType = TChoice choices
                                , answer = AChoice 0
                                , hint =
                                    { prompt = "Simplify: " ++ String.fromInt r.a ++ "x + " ++ String.fromInt r.b ++ " + " ++ String.fromInt r.c ++ "x + " ++ String.fromInt r.d
                                    , answer = correct
                                    , steps =
                                        [ "Group x terms: " ++ String.fromInt r.a ++ "x + " ++ String.fromInt r.c ++ "x = " ++ String.fromInt xCoeff ++ "x"
                                        , "Group constants: " ++ String.fromInt r.b ++ " + " ++ String.fromInt r.d ++ " = " ++ String.fromInt constant
                                        , "Answer: " ++ correct
                                        ]
                                    }
                                }
                            )
            )


genDistributive : Generator Problem
genDistributive =
    Random.int 0 1
        |> Random.andThen
            (\t ->
                if t == 0 then
                    -- Expand a(bx + c)
                    Random.map3 (\a b c -> ( a, b, c )) (randInt 2 7) (randInt 1 5) (randInt 1 8)
                        |> Random.andThen
                            (\( a, b, c ) ->
                                let
                                    correct = String.fromInt (a * b) ++ "x + " ++ String.fromInt (a * c)
                                    wrong1 = String.fromInt (a * b) ++ "x + " ++ String.fromInt c
                                    wrong2 = String.fromInt (a + b) ++ "x + " ++ String.fromInt (a * c)
                                    wrong3 = String.fromInt (a * b) ++ "x + " ++ String.fromInt (a * c + 1)
                                    choices = shuffleChoices correct [ wrong1, wrong2, wrong3 ]
                                in
                                Random.constant
                                    { prompt = "Expand: " ++ String.fromInt a ++ "(" ++ String.fromInt b ++ "x + " ++ String.fromInt c ++ ")"
                                    , inputType = TChoice choices
                                    , answer = AChoice 0
                                    , hint =
                                        { prompt = "Expand: " ++ String.fromInt a ++ "(" ++ String.fromInt b ++ "x + " ++ String.fromInt c ++ ")"
                                        , answer = correct
                                        , steps =
                                            [ "Multiply " ++ String.fromInt a ++ " by each term inside"
                                            , String.fromInt a ++ " × " ++ String.fromInt b ++ "x = " ++ String.fromInt (a * b) ++ "x"
                                            , String.fromInt a ++ " × " ++ String.fromInt c ++ " = " ++ String.fromInt (a * c)
                                            , "Answer: " ++ correct
                                            ]
                                        }
                                    }
                            )
                else
                    -- Expand a(b + c) and compute numerically
                    Random.map3 (\a b c -> ( a, b, c )) (randInt 2 9) (randInt 1 9) (randInt 1 9)
                        |> Random.andThen
                            (\( a, b, c ) ->
                                let correct = a * (b + c) in
                                wrongChoicesInt correct
                                    |> Random.map
                                        (\wrong ->
                                            let choices = shuffleChoices (String.fromInt correct) wrong in
                                            { prompt = "Compute: " ++ String.fromInt a ++ "(" ++ String.fromInt b ++ " + " ++ String.fromInt c ++ ")"
                                            , inputType = TChoice choices
                                            , answer = AChoice 0
                                            , hint =
                                                { prompt = "Compute: " ++ String.fromInt a ++ "(" ++ String.fromInt b ++ " + " ++ String.fromInt c ++ ")"
                                                , answer = String.fromInt correct
                                                , steps =
                                                    [ "Distribute: " ++ String.fromInt a ++ "×" ++ String.fromInt b ++ " + " ++ String.fromInt a ++ "×" ++ String.fromInt c
                                                    , "= " ++ String.fromInt (a * b) ++ " + " ++ String.fromInt (a * c) ++ " = " ++ String.fromInt correct
                                                    ]
                                                }
                                            }
                                        )
                            )
            )


genSimplifyExpr : Generator Problem
genSimplifyExpr =
    -- a(x + b) + cx → (a+c)x + ab
    Random.map3 (\a b c -> ( a, b, c )) (randInt 1 5) (randInt 1 6) (randInt 1 6)
        |> Random.andThen
            (\( a, b, c ) ->
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
                            , "Combine x terms: " ++ String.fromInt a ++ "x + " ++ String.fromInt c ++ "x = " ++ String.fromInt coeff ++ "x"
                            , "Answer: " ++ correct
                            ]
                        }
                    }
            )


genFactorExpr : Generator Problem
genFactorExpr =
    -- Factor: fa·x + fb → f(ax + b)
    Random.map3 (\f a b -> ( f, a, b )) (randChoice [ 2, 3, 4, 5, 6 ] 3) (randInt 1 5) (randInt 1 5)
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
                        [ "GCF of " ++ String.fromInt termA ++ " and " ++ String.fromInt termB ++ " is " ++ String.fromInt f
                        , String.fromInt termA ++ "x / " ++ String.fromInt f ++ " = " ++ String.fromInt a ++ "x, " ++ String.fromInt termB ++ " / " ++ String.fromInt f ++ " = " ++ String.fromInt b
                        , "Answer: " ++ correct
                        ]
                    }
                }
            )


genMonomialOps : Generator Problem
genMonomialOps =
    Random.int 0 2
        |> Random.andThen
            (\t ->
                case t of
                    0 ->
                        -- Multiply monomials: ax^m × bx^n = (ab)x^(m+n)
                        Random.map4 (\a b m n -> { a = a, b = b, m = m, n = n })
                            (randInt 2 6) (randInt 2 6) (randInt 1 4) (randInt 1 4)
                            |> Random.map
                                (\r ->
                                    let
                                        coeff = r.a * r.b
                                        exp_ = r.m + r.n
                                        correct = String.fromInt coeff ++ "x" ++ superscript exp_
                                        wrong1 = String.fromInt (coeff + 1) ++ "x" ++ superscript exp_
                                        wrong2 = String.fromInt coeff ++ "x" ++ superscript (exp_ + 1)
                                        wrong3 = String.fromInt (coeff - 1) ++ "x" ++ superscript exp_
                                        choices = shuffleChoices correct [ wrong1, wrong2, wrong3 ]
                                    in
                                    { prompt = "Simplify: " ++ String.fromInt r.a ++ "x" ++ superscript r.m ++ " × " ++ String.fromInt r.b ++ "x" ++ superscript r.n
                                    , inputType = TChoice choices
                                    , answer = AChoice 0
                                    , hint =
                                        { prompt = "Simplify: " ++ String.fromInt r.a ++ "x" ++ superscript r.m ++ " × " ++ String.fromInt r.b ++ "x" ++ superscript r.n
                                        , answer = correct
                                        , steps =
                                            [ "Multiply coefficients: " ++ String.fromInt r.a ++ " × " ++ String.fromInt r.b ++ " = " ++ String.fromInt coeff
                                            , "Add exponents: " ++ String.fromInt r.m ++ " + " ++ String.fromInt r.n ++ " = " ++ String.fromInt exp_
                                            , "Answer: " ++ correct
                                            ]
                                        }
                                    }
                                )

                    1 ->
                        -- Divide monomials: ax^m / bx^n (m > n, a divisible by b)
                        Random.map4 (\b q m n -> { b = b, q = q, m = m, n = n })
                            (randInt 2 5) (randInt 2 5) (randInt 3 6) (randInt 1 2)
                            |> Random.map
                                (\r ->
                                    let
                                        a = r.b * r.q
                                        m = r.m
                                        n_ = min r.n (m - 1)
                                        expResult = m - n_
                                        correct = String.fromInt r.q ++ "x" ++ superscript expResult
                                        wrong1 = String.fromInt r.q ++ "x" ++ superscript (expResult + 1)
                                        wrong2 = String.fromInt (r.q + 1) ++ "x" ++ superscript expResult
                                        wrong3 = String.fromInt r.q ++ "x" ++ superscript (expResult - 1)
                                        choices = shuffleChoices correct [ wrong1, wrong2, wrong3 ]
                                    in
                                    { prompt = "Simplify: " ++ String.fromInt a ++ "x" ++ superscript m ++ " / " ++ String.fromInt r.b ++ "x" ++ superscript n_
                                    , inputType = TChoice choices
                                    , answer = AChoice 0
                                    , hint =
                                        { prompt = "Simplify: " ++ String.fromInt a ++ "x" ++ superscript m ++ " / " ++ String.fromInt r.b ++ "x" ++ superscript n_
                                        , answer = correct
                                        , steps =
                                            [ "Divide coefficients: " ++ String.fromInt a ++ " / " ++ String.fromInt r.b ++ " = " ++ String.fromInt r.q
                                            , "Subtract exponents: " ++ String.fromInt m ++ " - " ++ String.fromInt n_ ++ " = " ++ String.fromInt expResult
                                            , "Answer: " ++ correct
                                            ]
                                        }
                                    }
                                )

                    _ ->
                        -- Power of a monomial: (ax^m)^n = a^n x^(m*n)
                        Random.map3 (\a m n -> ( a, m, n )) (randInt 2 4) (randInt 1 3) (randInt 2 3)
                            |> Random.map
                                (\( a, m, n ) ->
                                    let
                                        coeffResult = a ^ n
                                        expResult = m * n
                                        correct = String.fromInt coeffResult ++ "x" ++ superscript expResult
                                        wrong1 = String.fromInt (a * n) ++ "x" ++ superscript expResult
                                        wrong2 = String.fromInt coeffResult ++ "x" ++ superscript (m + n)
                                        wrong3 = String.fromInt coeffResult ++ "x" ++ superscript (expResult + 1)
                                        choices = shuffleChoices correct [ wrong1, wrong2, wrong3 ]
                                    in
                                    { prompt = "Simplify: (" ++ String.fromInt a ++ "x" ++ superscript m ++ ")" ++ superscript n
                                    , inputType = TChoice choices
                                    , answer = AChoice 0
                                    , hint =
                                        { prompt = "Simplify: (" ++ String.fromInt a ++ "x" ++ superscript m ++ ")" ++ superscript n
                                        , answer = correct
                                        , steps =
                                            [ "Raise coefficient to power: " ++ String.fromInt a ++ superscript n ++ " = " ++ String.fromInt coeffResult
                                            , "Multiply exponents: " ++ String.fromInt m ++ " × " ++ String.fromInt n ++ " = " ++ String.fromInt expResult
                                            , "Answer: " ++ correct
                                            ]
                                        }
                                    }
                                )
            )


-- ── UNIT 3: Equations and Inequalities ────────────────────────────────────


genOneStepEq : Generator Problem
genOneStepEq =
    Random.int 0 3
        |> Random.andThen
            (\t ->
                case t of
                    0 ->
                        -- x + a = b
                        Random.map2 Tuple.pair (randInt 1 20) (randInt 1 30)
                            |> Random.map
                                (\( a, x ) ->
                                    { prompt = "Solve: x + " ++ String.fromInt a ++ " = " ++ String.fromInt (a + x)
                                    , inputType = TInteger
                                    , answer = AInt x
                                    , hint =
                                        { prompt = "Solve: x + " ++ String.fromInt a ++ " = " ++ String.fromInt (a + x)
                                        , answer = String.fromInt x
                                        , steps = [ "Subtract " ++ String.fromInt a ++ " from both sides", "x = " ++ String.fromInt (a + x) ++ " - " ++ String.fromInt a ++ " = " ++ String.fromInt x ]
                                        }
                                    }
                                )

                    1 ->
                        -- x - a = b
                        Random.map2 Tuple.pair (randInt 1 15) (randInt 5 25)
                            |> Random.map
                                (\( a, x ) ->
                                    { prompt = "Solve: x - " ++ String.fromInt a ++ " = " ++ String.fromInt (x - a)
                                    , inputType = TInteger
                                    , answer = AInt x
                                    , hint =
                                        { prompt = "Solve: x - " ++ String.fromInt a ++ " = " ++ String.fromInt (x - a)
                                        , answer = String.fromInt x
                                        , steps = [ "Add " ++ String.fromInt a ++ " to both sides", "x = " ++ String.fromInt (x - a) ++ " + " ++ String.fromInt a ++ " = " ++ String.fromInt x ]
                                        }
                                    }
                                )

                    2 ->
                        -- ax = b
                        Random.map2 Tuple.pair (randIntNonZero 2 9) (randInt 1 12)
                            |> Random.map
                                (\( a, x ) ->
                                    { prompt = "Solve: " ++ String.fromInt a ++ "x = " ++ String.fromInt (a * x)
                                    , inputType = TInteger
                                    , answer = AInt x
                                    , hint =
                                        { prompt = "Solve: " ++ String.fromInt a ++ "x = " ++ String.fromInt (a * x)
                                        , answer = String.fromInt x
                                        , steps = [ "Divide both sides by " ++ String.fromInt a, "x = " ++ String.fromInt (a * x) ++ " / " ++ String.fromInt a ++ " = " ++ String.fromInt x ]
                                        }
                                    }
                                )

                    _ ->
                        -- x/a = b  (rational)
                        Random.map2 Tuple.pair (randInt 2 6) (randInt 1 8)
                            |> Random.map
                                (\( a, x ) ->
                                    { prompt = "Solve: x/" ++ String.fromInt a ++ " = " ++ String.fromInt x
                                    , inputType = TInteger
                                    , answer = AInt (x * a)
                                    , hint =
                                        { prompt = "Solve: x/" ++ String.fromInt a ++ " = " ++ String.fromInt x
                                        , answer = String.fromInt (x * a)
                                        , steps = [ "Multiply both sides by " ++ String.fromInt a, "x = " ++ String.fromInt x ++ " × " ++ String.fromInt a ++ " = " ++ String.fromInt (x * a) ]
                                        }
                                    }
                                )
            )


genTwoStepEq : Generator Problem
genTwoStepEq =
    Random.map3 (\a b x -> ( a, b, x )) (randInt 2 7) (randInt 1 9) (randInt 1 10)
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


genMultiStepEq : Generator Problem
genMultiStepEq =
    -- a(x + b) = c, where c = a*(x+b)
    Random.map3 (\a b x -> ( a, b, x )) (randInt 2 5) (randInt 1 6) (randInt 1 8)
        |> Random.map
            (\( a, b, x ) ->
                let c = a * (x + b) in
                { prompt = "Solve: " ++ String.fromInt a ++ "(x + " ++ String.fromInt b ++ ") = " ++ String.fromInt c
                , inputType = TInteger
                , answer = AInt x
                , hint =
                    { prompt = "Solve: " ++ String.fromInt a ++ "(x + " ++ String.fromInt b ++ ") = " ++ String.fromInt c
                    , answer = String.fromInt x
                    , steps =
                        [ "Step 1: Divide both sides by " ++ String.fromInt a ++ ": x + " ++ String.fromInt b ++ " = " ++ String.fromInt (c // a)
                        , "Step 2: Subtract " ++ String.fromInt b ++ " from both sides: x = " ++ String.fromInt x
                        ]
                    }
                }
            )


genOneStepIneq : Generator Problem
genOneStepIneq =
    Random.map2 Tuple.pair (randIntNonZero 2 9) (randInt 1 12)
        |> Random.andThen
            (\( a, x ) ->
                let b = a * x in
                Random.int 0 1
                    |> Random.map
                        (\dirN ->
                            let
                                dir = if dirN == 0 then IGt else ILt
                                dirStr = if dirN == 0 then ">" else "<"
                            in
                            { prompt = "Solve: " ++ String.fromInt a ++ "x " ++ dirStr ++ " " ++ String.fromInt b
                            , inputType = TInequality
                            , answer = AInequality dir (toFloat x)
                            , hint =
                                { prompt = "Solve: " ++ String.fromInt a ++ "x " ++ dirStr ++ " " ++ String.fromInt b
                                , answer = "x " ++ dirStr ++ " " ++ String.fromInt x
                                , steps =
                                    [ "Divide both sides by " ++ String.fromInt a
                                    , "x " ++ dirStr ++ " " ++ String.fromInt b ++ " / " ++ String.fromInt a ++ " = " ++ String.fromInt x
                                    , "Answer: x " ++ dirStr ++ " " ++ String.fromInt x
                                    ]
                                }
                            }
                        )
            )


genTwoStepIneq : Generator Problem
genTwoStepIneq =
    Random.map3 (\a b x -> ( a, b, x )) (randInt 2 6) (randInt 1 8) (randInt 1 10)
        |> Random.andThen
            (\( a, b, x ) ->
                let c = a * x + b in
                Random.int 0 1
                    |> Random.map
                        (\dirN ->
                            let
                                dir = if dirN == 0 then IGt else ILt
                                dirStr = if dirN == 0 then ">" else "<"
                            in
                            { prompt = "Solve: " ++ String.fromInt a ++ "x + " ++ String.fromInt b ++ " " ++ dirStr ++ " " ++ String.fromInt c
                            , inputType = TInequality
                            , answer = AInequality dir (toFloat x)
                            , hint =
                                { prompt = "Solve: " ++ String.fromInt a ++ "x + " ++ String.fromInt b ++ " " ++ dirStr ++ " " ++ String.fromInt c
                                , answer = "x " ++ dirStr ++ " " ++ String.fromInt x
                                , steps =
                                    [ "Step 1: Subtract " ++ String.fromInt b ++ " from both sides: " ++ String.fromInt a ++ "x " ++ dirStr ++ " " ++ String.fromInt (c - b)
                                    , "Step 2: Divide both sides by " ++ String.fromInt a ++ ": x " ++ dirStr ++ " " ++ String.fromInt x
                                    ]
                                }
                            }
                        )
            )


-- ── UNIT 4: Ratios, Proportions, and Percents ─────────────────────────────


genRatioSimplify : Generator Problem
genRatioSimplify =
    Random.map2 Tuple.pair (randInt 2 6) (randInt 2 5)
        |> Random.andThen
            (\( k, a ) ->
                randInt 2 5
                    |> Random.andThen
                        (\b ->
                            let
                                n = k * a
                                d = k * b
                                g = gcd n d
                                rn = n // g
                                rd = d // g
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
                                                [ "GCF of " ++ String.fromInt n ++ " and " ++ String.fromInt d ++ " is " ++ String.fromInt g
                                                , String.fromInt n ++ " / " ++ String.fromInt g ++ " = " ++ String.fromInt rn ++ ", " ++ String.fromInt d ++ " / " ++ String.fromInt g ++ " = " ++ String.fromInt rd
                                                , "Simplified: " ++ String.fromInt rn ++ ":" ++ String.fromInt rd
                                                ]
                                            }
                                        }
                                    )
                        )
            )


genUnitRate : Generator Problem
genUnitRate =
    Random.int 0 1
        |> Random.andThen
            (\t ->
                if t == 0 then
                    Random.map2 Tuple.pair (randInt 2 8) (randInt 1 9)
                        |> Random.andThen
                            (\( units, rate ) ->
                                let total = units * rate in
                                wrongChoicesInt rate
                                    |> Random.map
                                        (\wrong ->
                                            let choices = shuffleChoices (String.fromInt rate) wrong in
                                            { prompt = String.fromInt units ++ " books cost $" ++ String.fromInt total ++ ". Cost per book?"
                                            , inputType = TChoice choices
                                            , answer = AChoice 0
                                            , hint =
                                                { prompt = String.fromInt units ++ " books cost $" ++ String.fromInt total ++ ". Cost per book?"
                                                , answer = "$" ++ String.fromInt rate
                                                , steps = [ "Unit rate = total / quantity", "$" ++ String.fromInt total ++ " / " ++ String.fromInt units ++ " = $" ++ String.fromInt rate ]
                                                }
                                            }
                                        )
                            )
                else
                    Random.map2 Tuple.pair (randInt 2 6) (randInt 30 90)
                        |> Random.andThen
                            (\( hours, miles ) ->
                                let rate = miles // hours in
                                wrongChoicesInt rate
                                    |> Random.map
                                        (\wrong ->
                                            let choices = shuffleChoices (String.fromInt rate ++ " mph") (List.map (\w -> w ++ " mph") wrong) in
                                            { prompt = "A car travels " ++ String.fromInt miles ++ " miles in " ++ String.fromInt hours ++ " hours. What is the unit rate?"
                                            , inputType = TChoice choices
                                            , answer = AChoice 0
                                            , hint =
                                                { prompt = "A car travels " ++ String.fromInt miles ++ " miles in " ++ String.fromInt hours ++ " hours. What is the unit rate?"
                                                , answer = String.fromInt rate ++ " mph"
                                                , steps = [ "Divide miles by hours: " ++ String.fromInt miles ++ " / " ++ String.fromInt hours ++ " = " ++ String.fromInt rate ++ " mph" ]
                                                }
                                            }
                                        )
                            )
            )


genSolveProportion : Generator Problem
genSolveProportion =
    Random.map2 Tuple.pair (randInt 2 8) (randInt 2 6)
        |> Random.map
            (\( a, k ) ->
                let
                    b = a * k
                    c = a + 1
                    x = c * k
                in
                { prompt = String.fromInt a ++ "/" ++ String.fromInt b ++ " = " ++ String.fromInt c ++ "/x. Solve for x."
                , inputType = TInteger
                , answer = AInt x
                , hint =
                    { prompt = String.fromInt a ++ "/" ++ String.fromInt b ++ " = " ++ String.fromInt c ++ "/x. Solve for x."
                    , answer = String.fromInt x
                    , steps =
                        [ "Cross multiply: " ++ String.fromInt a ++ " × x = " ++ String.fromInt b ++ " × " ++ String.fromInt c
                        , String.fromInt a ++ "x = " ++ String.fromInt (b * c)
                        , "x = " ++ String.fromInt (b * c) ++ " / " ++ String.fromInt a ++ " = " ++ String.fromInt x
                        ]
                    }
                }
            )


genScaleDrawing : Generator Problem
genScaleDrawing =
    -- Scale: 1 cm = k meters, drawing is n cm, find actual length
    Random.map2 Tuple.pair (randChoice [ 5, 10, 20, 50 ] 10) (randInt 2 8)
        |> Random.andThen
            (\( scale, drawing ) ->
                let actual = scale * drawing in
                wrongChoicesInt actual
                    |> Random.map
                        (\wrong ->
                            let choices = shuffleChoices (String.fromInt actual ++ " m") (List.map (\w -> w ++ " m") wrong) in
                            { prompt = "A map scale is 1 cm = " ++ String.fromInt scale ++ " m. A road is " ++ String.fromInt drawing ++ " cm on the map. How long is the actual road?"
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "A map scale is 1 cm = " ++ String.fromInt scale ++ " m. A road is " ++ String.fromInt drawing ++ " cm on the map. How long is the actual road?"
                                , answer = String.fromInt actual ++ " m"
                                , steps =
                                    [ "Set up proportion: 1/" ++ String.fromInt scale ++ " = " ++ String.fromInt drawing ++ "/x"
                                    , "x = " ++ String.fromInt drawing ++ " × " ++ String.fromInt scale ++ " = " ++ String.fromInt actual ++ " m"
                                    ]
                                }
                            }
                        )
            )


genSimilarFigures : Generator Problem
genSimilarFigures =
    -- Two similar rectangles, find missing side
    Random.map2 Tuple.pair (randInt 2 6) (randInt 2 5)
        |> Random.andThen
            (\( a, k ) ->
                randInt 3 8
                    |> Random.andThen
                        (\b ->
                            let x = b * k in
                            wrongChoicesInt x
                                |> Random.map
                                    (\wrong ->
                                        let choices = shuffleChoices (String.fromInt x) wrong in
                                        { prompt = "Two similar rectangles. First has sides " ++ String.fromInt a ++ " and " ++ String.fromInt (a * k) ++ ". Second has short side " ++ String.fromInt b ++ ". Find the long side."
                                        , inputType = TChoice choices
                                        , answer = AChoice 0
                                        , hint =
                                            { prompt = "Two similar rectangles. First has sides " ++ String.fromInt a ++ " and " ++ String.fromInt (a * k) ++ ". Second has short side " ++ String.fromInt b ++ ". Find the long side."
                                            , answer = String.fromInt x
                                            , steps =
                                                [ "Find scale factor: " ++ String.fromInt (a * k) ++ " / " ++ String.fromInt a ++ " = " ++ String.fromInt k
                                                , "Apply to other side: " ++ String.fromInt b ++ " × " ++ String.fromInt k ++ " = " ++ String.fromInt x
                                                ]
                                            }
                                        }
                                    )
                        )
            )


genPercentProportion : Generator Problem
genPercentProportion =
    Random.int 0 1
        |> Random.andThen
            (\t ->
                if t == 0 then
                    -- Find percent of a number
                    Random.map2 Tuple.pair (randChoice [ 10, 20, 25, 50, 75 ] 25) (randChoice [ 40, 60, 80, 100, 120, 200 ] 100)
                        |> Random.andThen
                            (\( pct, whole ) ->
                                let correct = (pct * whole) // 100 in
                                wrongChoicesInt correct
                                    |> Random.map
                                        (\wrong ->
                                            let choices = shuffleChoices (String.fromInt correct) wrong in
                                            { prompt = "What is " ++ String.fromInt pct ++ "% of " ++ String.fromInt whole ++ "?"
                                            , inputType = TChoice choices
                                            , answer = AChoice 0
                                            , hint =
                                                { prompt = "What is " ++ String.fromInt pct ++ "% of " ++ String.fromInt whole ++ "?"
                                                , answer = String.fromInt correct
                                                , steps =
                                                    [ "Set up: " ++ String.fromInt pct ++ "/100 = x/" ++ String.fromInt whole
                                                    , "Cross multiply: 100x = " ++ String.fromInt pct ++ " × " ++ String.fromInt whole ++ " = " ++ String.fromInt (pct * whole)
                                                    , "x = " ++ String.fromInt (pct * whole) ++ " / 100 = " ++ String.fromInt correct
                                                    ]
                                                }
                                            }
                                        )
                            )
                else
                    -- What percent is part of whole?
                    Random.map2 Tuple.pair (randChoice [ 10, 20, 25, 50 ] 25) (randChoice [ 40, 80, 100, 200 ] 100)
                        |> Random.andThen
                            (\( pct, whole ) ->
                                let part = (pct * whole) // 100 in
                                wrongChoicesInt pct
                                    |> Random.map
                                        (\wrong ->
                                            let choices = shuffleChoices (String.fromInt pct ++ "%") (List.map (\w -> w ++ "%") wrong) in
                                            { prompt = String.fromInt part ++ " is what percent of " ++ String.fromInt whole ++ "?"
                                            , inputType = TChoice choices
                                            , answer = AChoice 0
                                            , hint =
                                                { prompt = String.fromInt part ++ " is what percent of " ++ String.fromInt whole ++ "?"
                                                , answer = String.fromInt pct ++ "%"
                                                , steps =
                                                    [ "Set up: x/100 = " ++ String.fromInt part ++ "/" ++ String.fromInt whole
                                                    , "Cross multiply: " ++ String.fromInt whole ++ "x = " ++ String.fromInt (part * 100)
                                                    , "x = " ++ String.fromInt pct ++ "%"
                                                    ]
                                                }
                                            }
                                        )
                            )
            )


genDiscountMarkup : Generator Problem
genDiscountMarkup =
    Random.int 0 1
        |> Random.andThen
            (\t ->
                Random.map2 Tuple.pair (randChoice [ 10, 15, 20, 25, 30, 40, 50 ] 20) (randChoice [ 20, 40, 50, 60, 80, 100 ] 50)
                    |> Random.andThen
                        (\( pct, price ) ->
                            let
                                amount = (pct * price) // 100
                                salePrice = if t == 0 then price - amount else price + amount
                            in
                            wrongChoicesInt salePrice
                                |> Random.map
                                    (\wrong ->
                                        let
                                            choices = shuffleChoices ("$" ++ String.fromInt salePrice) (List.map (\w -> "$" ++ w) wrong)
                                            verb = if t == 0 then "discount" else "markup"
                                            action = if t == 0 then "sale price" else "new price"
                                        in
                                        { prompt = "An item costs $" ++ String.fromInt price ++ ". There is a " ++ String.fromInt pct ++ "% " ++ verb ++ ". What is the " ++ action ++ "?"
                                        , inputType = TChoice choices
                                        , answer = AChoice 0
                                        , hint =
                                            { prompt = "An item costs $" ++ String.fromInt price ++ ". There is a " ++ String.fromInt pct ++ "% " ++ verb ++ ". What is the " ++ action ++ "?"
                                            , answer = "$" ++ String.fromInt salePrice
                                            , steps =
                                                if t == 0 then
                                                    [ verb ++ " amount: " ++ String.fromInt pct ++ "% × $" ++ String.fromInt price ++ " = $" ++ String.fromInt amount
                                                    , action ++ ": $" ++ String.fromInt price ++ " - $" ++ String.fromInt amount ++ " = $" ++ String.fromInt salePrice
                                                    ]
                                                else
                                                    [ verb ++ " amount: " ++ String.fromInt pct ++ "% × $" ++ String.fromInt price ++ " = $" ++ String.fromInt amount
                                                    , action ++ ": $" ++ String.fromInt price ++ " + $" ++ String.fromInt amount ++ " = $" ++ String.fromInt salePrice
                                                    ]
                                            }
                                        }
                                    )
                        )
            )


genSimpleInterest : Generator Problem
genSimpleInterest =
    -- I = P × r × t, where r is a nice percent and t is 1-5 years
    Random.map3 (\p r t -> ( p, r, t ))
        (randChoice [ 100, 200, 500, 1000 ] 500)
        (randChoice [ 2, 3, 4, 5, 6, 8, 10 ] 5)
        (randInt 1 5)
        |> Random.andThen
            (\( p, r, t ) ->
                let interest = (p * r * t) // 100 in
                wrongChoicesInt interest
                    |> Random.map
                        (\wrong ->
                            let choices = shuffleChoices ("$" ++ String.fromInt interest) (List.map (\w -> "$" ++ w) wrong) in
                            { prompt = "Principal: $" ++ String.fromInt p ++ ", Rate: " ++ String.fromInt r ++ "% per year, Time: " ++ String.fromInt t ++ " years. Find the simple interest."
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "Principal: $" ++ String.fromInt p ++ ", Rate: " ++ String.fromInt r ++ "% per year, Time: " ++ String.fromInt t ++ " years. Find the simple interest."
                                , answer = "$" ++ String.fromInt interest
                                , steps =
                                    [ "Formula: I = P × r × t"
                                    , "I = " ++ String.fromInt p ++ " × " ++ String.fromFloat (toFloat r / 100.0) ++ " × " ++ String.fromInt t
                                    , "I = $" ++ String.fromInt interest
                                    ]
                                }
                            }
                        )
            )


-- ── UNIT 5: Functions and Graphing ────────────────────────────────────────


genQuadrant : Generator Problem
genQuadrant =
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
                { prompt = "The point (" ++ String.fromInt x ++ ", " ++ String.fromInt y ++ ") lies in which quadrant?"
                , inputType = TChoice [ "Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV" ]
                , answer = AChoice q
                , hint =
                    { prompt = "The point (" ++ String.fromInt x ++ ", " ++ String.fromInt y ++ ") lies in which quadrant?"
                    , answer = "Quadrant " ++ (case q of
                            0 -> "I"
                            1 -> "II"
                            2 -> "III"
                            _ -> "IV")
                    , steps =
                        [ "Quadrant I: (+, +), Quadrant II: (-, +)"
                        , "Quadrant III: (-, -), Quadrant IV: (+, -)"
                        , "(" ++ String.fromInt x ++ ", " ++ String.fromInt y ++ "): x " ++ (if x > 0 then "positive" else "negative") ++ ", y " ++ (if y > 0 then "positive" else "negative") ++ " → Quadrant " ++ (case q of
                                0 -> "I"
                                1 -> "II"
                                2 -> "III"
                                _ -> "IV")
                        ]
                    }
                }
            )


genIsFunction : Generator Problem
genIsFunction =
    Random.int 0 1
        |> Random.map
            (\t ->
                if t == 0 then
                    -- IS a function (each x maps to exactly one y)
                    { prompt = "Is {(1,2), (2,4), (3,6), (4,8)} a function?"
                    , inputType = TChoice [ "Yes", "No" ]
                    , answer = AChoice 0
                    , hint =
                        { prompt = "Is {(1,2),(2,3),(3,4)} a function?"
                        , answer = "Yes"
                        , steps =
                            [ "A function: each x-value maps to exactly ONE y-value"
                            , "Check: no x repeats with different y values"
                            , "Answer: Yes, it is a function"
                            ]
                        }
                    }
                else
                    -- NOT a function (x repeats with different y)
                    { prompt = "Is {(1,2), (2,5), (1,4), (3,7)} a function?"
                    , inputType = TChoice [ "No", "Yes" ]
                    , answer = AChoice 0
                    , hint =
                        { prompt = "Is {(1,2),(1,3),(2,4)} a function?"
                        , answer = "No"
                        , steps =
                            [ "A function: each x-value maps to exactly ONE y-value"
                            , "Here x=1 appears twice with y=2 and y=3"
                            , "That violates the definition — NOT a function"
                            ]
                        }
                    }
            )


genSlopeFromPoints : Generator Problem
genSlopeFromPoints =
    -- Generate two points with integer slope
    Random.map4 (\x1 run rise x2start -> { x1 = x1, run = run, rise = rise, x2start = x2start })
        (randInt -5 3) (randInt 1 4) (randInt -4 4) (randInt 0 1)
        |> Random.andThen
            (\r ->
                let
                    x1 = r.x1
                    y1 = randInt -5 5
                in
                y1
                    |> Random.map
                        (\y1val ->
                            let
                                x2 = x1 + r.run
                                y2 = y1val + r.rise
                                slope = r.rise
                                denom = r.run
                                ( sn, sd ) = reduceFraction slope denom
                                slopeStr =
                                    if sd == 1 then String.fromInt sn
                                    else showFrac sn sd
                                wrong1 = if sd == 1 then String.fromInt (sn + 1) else showFrac (sn + 1) sd
                                wrong2 = if sd == 1 then String.fromInt (sn - 1) else showFrac (sn - 1) sd
                                wrong3 = if sd == 1 then String.fromInt (-sn) else showFrac (-sn) sd
                                choices = shuffleChoices slopeStr [ wrong1, wrong2, wrong3 ]
                            in
                            { prompt = "Find the slope of the line through (" ++ String.fromInt x1 ++ ", " ++ String.fromInt y1val ++ ") and (" ++ String.fromInt x2 ++ ", " ++ String.fromInt y2 ++ ")."
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "Find the slope of the line through (" ++ String.fromInt x1 ++ ", " ++ String.fromInt y1val ++ ") and (" ++ String.fromInt x2 ++ ", " ++ String.fromInt y2 ++ ")."
                                , answer = slopeStr
                                , steps =
                                    [ "Slope = (y₂ - y₁) / (x₂ - x₁)"
                                    , "= (" ++ String.fromInt y2 ++ " - " ++ String.fromInt y1val ++ ") / (" ++ String.fromInt x2 ++ " - " ++ String.fromInt x1 ++ ")"
                                    , "= " ++ String.fromInt slope ++ " / " ++ String.fromInt denom ++ " = " ++ slopeStr
                                    ]
                                }
                            }
                        )
            )


genSlopeIntercept : Generator Problem
genSlopeIntercept =
    -- Given y = mx + b, find y for a given x
    Random.map3 (\m b x -> ( m, b, x )) (randInt -4 4) (randInt -5 5) (randInt 1 6)
        |> Random.map
            (\( m, b, x ) ->
                let y = m * x + b in
                { prompt = "For y = " ++ showSigned m ++ "x + " ++ showSigned b ++ ", find y when x = " ++ String.fromInt x
                , inputType = TInteger
                , answer = AInt y
                , hint =
                    { prompt = "For y = " ++ showSigned m ++ "x + " ++ showSigned b ++ ", find y when x = " ++ String.fromInt x
                    , answer = String.fromInt y
                    , steps =
                        [ "Substitute x = " ++ String.fromInt x ++ ": y = " ++ showSigned m ++ "(" ++ String.fromInt x ++ ") + " ++ showSigned b
                        , "y = " ++ String.fromInt (m * x) ++ " + " ++ showSigned b ++ " = " ++ String.fromInt y
                        ]
                    }
                }
            )


genLinearFuncValue : Generator Problem
genLinearFuncValue =
    -- f(x) = mx + b notation
    Random.map3 (\m b x -> ( m, b, x )) (randInt 1 5) (randInt 0 8) (randInt 1 8)
        |> Random.andThen
            (\( m, b, x ) ->
                let correct = m * x + b in
                wrongChoicesInt correct
                    |> Random.map
                        (\wrong ->
                            let choices = shuffleChoices (String.fromInt correct) wrong in
                            { prompt = "If f(x) = " ++ String.fromInt m ++ "x + " ++ String.fromInt b ++ ", find f(" ++ String.fromInt x ++ ")."
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "If f(x) = " ++ String.fromInt m ++ "x + " ++ String.fromInt b ++ ", find f(" ++ String.fromInt x ++ ")."
                                , answer = String.fromInt correct
                                , steps =
                                    [ "Replace x with " ++ String.fromInt x ++ ": f(" ++ String.fromInt x ++ ") = " ++ String.fromInt m ++ "(" ++ String.fromInt x ++ ") + " ++ String.fromInt b
                                    , "= " ++ String.fromInt (m * x) ++ " + " ++ String.fromInt b ++ " = " ++ String.fromInt correct
                                    ]
                                }
                            }
                        )
            )


genProportionalRelation : Generator Problem
genProportionalRelation =
    Random.int 0 1
        |> Random.andThen
            (\t ->
                if t == 0 then
                    -- Identify proportional relationship: is y/x constant?
                    Random.constant
                        { prompt = "Does the table {(1,3),(2,6),(3,9),(4,12)} show a proportional relationship?"
                        , inputType = TChoice [ "Yes — y = 3x", "No", "Yes — y = x + 2", "Cannot tell" ]
                        , answer = AChoice 0
                        , hint =
                            { prompt = "Is (1,2),(2,4),(3,6) proportional?"
                            , answer = "Yes"
                            , steps =
                                [ "Check y/x for each pair: 2/1=2, 4/2=2, 6/3=2"
                                , "y/x is constant, so it is proportional"
                                ]
                            }
                        }
                else
                    -- k = y/x direct variation
                    Random.map2 Tuple.pair (randInt 2 6) (randInt 2 8)
                        |> Random.andThen
                            (\( k, x ) ->
                                let y = k * x in
                                wrongChoicesInt y
                                    |> Random.map
                                        (\wrong ->
                                            let choices = shuffleChoices (String.fromInt y) wrong in
                                            { prompt = "y varies directly with x. When x=1, y=" ++ String.fromInt k ++ ". Find y when x=" ++ String.fromInt x ++ "."
                                            , inputType = TChoice choices
                                            , answer = AChoice 0
                                            , hint =
                                                { prompt = "y varies directly with x. When x=1, y=" ++ String.fromInt k ++ ". Find y when x=" ++ String.fromInt x ++ "."
                                                , answer = String.fromInt y
                                                , steps =
                                                    [ "Direct variation: y = kx where k = y/x"
                                                    , "k = " ++ String.fromInt k ++ " (when x=1, y=" ++ String.fromInt k ++ ")"
                                                    , "y = " ++ String.fromInt k ++ " × " ++ String.fromInt x ++ " = " ++ String.fromInt y
                                                    ]
                                                }
                                            }
                                        )
                            )
            )


-- ── UNIT 6: Geometry ──────────────────────────────────────────────────────


genAngleClassify : Generator Problem
genAngleClassify =
    Random.int 0 3
        |> Random.andThen
            (\t ->
                case t of
                    0 ->
                        Random.constant
                            { prompt = "An angle measuring 90° is called:"
                            , inputType = TChoice [ "Right", "Acute", "Obtuse", "Straight" ]
                            , answer = AChoice 0
                            , hint =
                                { prompt = "A 90° angle is called?"
                                , answer = "Right"
                                , steps = [ "Acute: < 90°, Right: = 90°, Obtuse: > 90°, Straight: 180°" ]
                                }
                            }

                    1 ->
                        -- Acute angle
                        randChoice [ 15, 30, 45, 60, 75 ] 45
                            |> Random.map
                                (\deg ->
                                    { prompt = "An angle measuring " ++ String.fromInt deg ++ "° is:"
                                    , inputType = TChoice [ "Acute", "Right", "Obtuse", "Straight" ]
                                    , answer = AChoice 0
                                    , hint =
                                        { prompt = "An angle measuring " ++ String.fromInt deg ++ "° is:"
                                        , answer = "Acute"
                                        , steps = [ "Acute angles are between 0° and 90°", String.fromInt deg ++ "° < 90°, so it is acute" ]
                                        }
                                    }
                                )

                    2 ->
                        -- Obtuse angle
                        randChoice [ 100, 110, 120, 135, 150, 165 ] 120
                            |> Random.map
                                (\deg ->
                                    { prompt = "An angle measuring " ++ String.fromInt deg ++ "° is:"
                                    , inputType = TChoice [ "Obtuse", "Acute", "Right", "Straight" ]
                                    , answer = AChoice 0
                                    , hint =
                                        { prompt = "An angle measuring " ++ String.fromInt deg ++ "° is:"
                                        , answer = "Obtuse"
                                        , steps = [ "Obtuse angles are between 90° and 180°", "90° < " ++ String.fromInt deg ++ "° < 180°, so it is obtuse" ]
                                        }
                                    }
                                )

                    _ ->
                        Random.constant
                            { prompt = "An angle measuring 180° is called:"
                            , inputType = TChoice [ "Straight", "Right", "Obtuse", "Reflex" ]
                            , answer = AChoice 0
                            , hint =
                                { prompt = "A 180° angle is called?"
                                , answer = "Straight"
                                , steps = [ "A straight angle forms a straight line and measures exactly 180°" ]
                                }
                            }
            )


genCompSuppl : Generator Problem
genCompSuppl =
    Random.int 0 1
        |> Random.andThen
            (\t ->
                if t == 0 then
                    -- Complementary: a + x = 90
                    randChoice [ 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70 ] 40
                        |> Random.andThen
                            (\a ->
                                let x = 90 - a in
                                wrongChoicesInt x
                                    |> Random.map
                                        (\wrong ->
                                            let choices = shuffleChoices (String.fromInt x ++ "°") (List.map (\w -> w ++ "°") wrong) in
                                            { prompt = "Two angles are complementary. One measures " ++ String.fromInt a ++ "°. Find the other."
                                            , inputType = TChoice choices
                                            , answer = AChoice 0
                                            , hint =
                                                { prompt = "Two angles are complementary. One measures " ++ String.fromInt a ++ "°. Find the other."
                                                , answer = String.fromInt x ++ "°"
                                                , steps =
                                                    [ "Complementary angles sum to 90°"
                                                    , "90° - " ++ String.fromInt a ++ "° = " ++ String.fromInt x ++ "°"
                                                    ]
                                                }
                                            }
                                        )
                            )
                else
                    -- Supplementary: a + x = 180
                    randChoice [ 30, 45, 60, 75, 90, 100, 110, 120, 135, 150 ] 60
                        |> Random.andThen
                            (\a ->
                                let x = 180 - a in
                                wrongChoicesInt x
                                    |> Random.map
                                        (\wrong ->
                                            let choices = shuffleChoices (String.fromInt x ++ "°") (List.map (\w -> w ++ "°") wrong) in
                                            { prompt = "Two angles are supplementary. One measures " ++ String.fromInt a ++ "°. Find the other."
                                            , inputType = TChoice choices
                                            , answer = AChoice 0
                                            , hint =
                                                { prompt = "Two angles are supplementary. One measures " ++ String.fromInt a ++ "°. Find the other."
                                                , answer = String.fromInt x ++ "°"
                                                , steps =
                                                    [ "Supplementary angles sum to 180°"
                                                    , "180° - " ++ String.fromInt a ++ "° = " ++ String.fromInt x ++ "°"
                                                    ]
                                                }
                                            }
                                        )
                            )
            )


genVerticalAngles : Generator Problem
genVerticalAngles =
    -- Vertical angles are equal
    randChoice [ 30, 45, 55, 60, 70, 80, 100, 110, 120, 135 ] 70
        |> Random.andThen
            (\a ->
                wrongChoicesInt a
                    |> Random.map
                        (\wrong ->
                            let choices = shuffleChoices (String.fromInt a ++ "°") (List.map (\w -> w ++ "°") wrong) in
                            { prompt = "Two lines intersect. One angle is " ++ String.fromInt a ++ "°. What is the vertical angle?"
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "Two lines intersect. One angle is " ++ String.fromInt a ++ "°. What is the vertical angle?"
                                , answer = String.fromInt a ++ "°"
                                , steps =
                                    [ "Vertical angles are opposite angles formed by intersecting lines"
                                    , "Vertical angles are always equal"
                                    , "Answer: " ++ String.fromInt a ++ "°"
                                    ]
                                }
                            }
                        )
            )


genTriangleSum : Generator Problem
genTriangleSum =
    -- Two angles given, find third (all sum to 180)
    Random.map2 Tuple.pair (randInt 20 80) (randInt 20 80)
        |> Random.andThen
            (\( a, b ) ->
                let
                    c = 180 - a - b
                    safeC = if c <= 0 then 30 else c
                    safeA = if c <= 0 then 80 else a
                    safeB = if c <= 0 then 70 else b
                in
                wrongChoicesInt safeC
                    |> Random.map
                        (\wrong ->
                            let choices = shuffleChoices (String.fromInt safeC ++ "°") (List.map (\w -> w ++ "°") wrong) in
                            { prompt = "A triangle has angles " ++ String.fromInt safeA ++ "° and " ++ String.fromInt safeB ++ "°. Find the third angle."
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "A triangle has angles " ++ String.fromInt safeA ++ "° and " ++ String.fromInt safeB ++ "°. Find the third angle."
                                , answer = String.fromInt safeC ++ "°"
                                , steps =
                                    [ "Triangle angles sum to 180°"
                                    , "180° - " ++ String.fromInt safeA ++ "° - " ++ String.fromInt safeB ++ "° = " ++ String.fromInt safeC ++ "°"
                                    ]
                                }
                            }
                        )
            )


genTriangleClassify : Generator Problem
genTriangleClassify =
    Random.int 0 2
        |> Random.map
            (\t ->
                case t of
                    0 ->
                        { prompt = "A triangle with all sides equal is called:"
                        , inputType = TChoice [ "Equilateral", "Isosceles", "Scalene", "Right" ]
                        , answer = AChoice 0
                        , hint =
                            { prompt = "All three sides equal?"
                            , answer = "Equilateral"
                            , steps =
                                [ "Equilateral: all 3 sides equal, all angles 60°"
                                , "Isosceles: 2 sides equal"
                                , "Scalene: no sides equal"
                                ]
                            }
                        }

                    1 ->
                        { prompt = "A triangle with exactly two equal sides is:"
                        , inputType = TChoice [ "Isosceles", "Equilateral", "Scalene", "Obtuse" ]
                        , answer = AChoice 0
                        , hint =
                            { prompt = "Exactly two equal sides?"
                            , answer = "Isosceles"
                            , steps = [ "Isosceles triangles have exactly two equal sides (and two equal base angles)" ]
                            }
                        }

                    _ ->
                        { prompt = "A triangle with angles 90°, 45°, and 45° is what type by angles?"
                        , inputType = TChoice [ "Right", "Acute", "Obtuse", "Equilateral" ]
                        , answer = AChoice 0
                        , hint =
                            { prompt = "A triangle with a 90° angle is?"
                            , answer = "Right"
                            , steps =
                                [ "Acute: all angles < 90°"
                                , "Right: one angle = 90°"
                                , "Obtuse: one angle > 90°"
                                ]
                            }
                        }
            )


genTranslation : Generator Problem
genTranslation =
    -- Translate a point by (dx, dy)
    Random.map4 (\x y dx dy -> { x = x, y = y, dx = dx, dy = dy })
        (randInt -5 5) (randInt -5 5) (randInt -4 4) (randInt -4 4)
        |> Random.andThen
            (\r ->
                let
                    nx = r.x + r.dx
                    ny = r.y + r.dy
                    correct = "(" ++ String.fromInt nx ++ ", " ++ String.fromInt ny ++ ")"
                    wrong1 = "(" ++ String.fromInt (nx + 1) ++ ", " ++ String.fromInt ny ++ ")"
                    wrong2 = "(" ++ String.fromInt nx ++ ", " ++ String.fromInt (ny + 1) ++ ")"
                    wrong3 = "(" ++ String.fromInt (r.x - r.dx) ++ ", " ++ String.fromInt (r.y - r.dy) ++ ")"
                    choices = shuffleChoices correct [ wrong1, wrong2, wrong3 ]
                in
                Random.constant
                    { prompt = "Translate point (" ++ String.fromInt r.x ++ ", " ++ String.fromInt r.y ++ ") by (" ++ showSigned r.dx ++ ", " ++ showSigned r.dy ++ "). New point?"
                    , inputType = TChoice choices
                    , answer = AChoice 0
                    , hint =
                        { prompt = "Translate point (" ++ String.fromInt r.x ++ ", " ++ String.fromInt r.y ++ ") by (" ++ showSigned r.dx ++ ", " ++ showSigned r.dy ++ "). New point?"
                        , answer = correct
                        , steps =
                            [ "Add dx to x: " ++ String.fromInt r.x ++ " + " ++ showSigned r.dx ++ " = " ++ String.fromInt nx
                            , "Add dy to y: " ++ String.fromInt r.y ++ " + " ++ showSigned r.dy ++ " = " ++ String.fromInt ny
                            , "New point: " ++ correct
                            ]
                        }
                    }
            )


-- ── UNIT 7: Measurement ───────────────────────────────────────────────────


genPerimArea : Generator Problem
genPerimArea =
    Random.int 0 2
        |> Random.andThen
            (\t ->
                case t of
                    0 ->
                        -- Perimeter of rectangle
                        Random.map2 Tuple.pair (randInt 3 12) (randInt 3 12)
                            |> Random.andThen
                                (\( w, h ) ->
                                    let correct = 2 * (w + h) in
                                    wrongChoicesInt correct
                                        |> Random.map
                                            (\wrong ->
                                                let choices = shuffleChoices (String.fromInt correct) wrong in
                                                { prompt = "Perimeter of a rectangle with width " ++ String.fromInt w ++ " and height " ++ String.fromInt h ++ "?"
                                                , inputType = TChoice choices
                                                , answer = AChoice 0
                                                , hint =
                                                    { prompt = "Perimeter of a rectangle with width " ++ String.fromInt w ++ " and height " ++ String.fromInt h ++ "?"
                                                    , answer = String.fromInt correct
                                                    , steps =
                                                        [ "P = 2(l + w)"
                                                        , "P = 2(" ++ String.fromInt w ++ " + " ++ String.fromInt h ++ ") = 2(" ++ String.fromInt (w + h) ++ ") = " ++ String.fromInt correct
                                                        ]
                                                    }
                                                }
                                            )
                                )

                    1 ->
                        -- Area of rectangle
                        Random.map2 Tuple.pair (randInt 3 12) (randInt 3 12)
                            |> Random.map
                                (\( w, h ) ->
                                    { prompt = "Area of rectangle: width=" ++ String.fromInt w ++ ", height=" ++ String.fromInt h ++ "?"
                                    , inputType = TInteger
                                    , answer = AInt (w * h)
                                    , hint =
                                        { prompt = "Area of rectangle: width=" ++ String.fromInt w ++ ", height=" ++ String.fromInt h ++ "?"
                                        , answer = String.fromInt (w * h)
                                        , steps = [ "A = l × w = " ++ String.fromInt w ++ " × " ++ String.fromInt h ++ " = " ++ String.fromInt (w * h) ]
                                        }
                                    }
                                )

                    _ ->
                        -- Area of triangle
                        Random.map2 Tuple.pair (randInt 2 8) (randInt 1 6)
                            |> Random.map
                                (\( bHalf, h ) ->
                                    let b = bHalf * 2 in
                                    { prompt = "Area of triangle: base=" ++ String.fromInt b ++ ", height=" ++ String.fromInt h ++ "?"
                                    , inputType = TInteger
                                    , answer = AInt (b * h // 2)
                                    , hint =
                                        { prompt = "Area of triangle: base=" ++ String.fromInt b ++ ", height=" ++ String.fromInt h ++ "?"
                                        , answer = String.fromInt (b * h // 2)
                                        , steps = [ "A = ½ × b × h = ½ × " ++ String.fromInt b ++ " × " ++ String.fromInt h ++ " = " ++ String.fromInt (b * h // 2) ]
                                        }
                                    }
                                )
            )


genCircleCalc : Generator Problem
genCircleCalc =
    Random.int 0 1
        |> Random.andThen
            (\t ->
                randChoice [ 3, 4, 5, 6, 7, 8, 10 ] 5
                    |> Random.map
                        (\r ->
                            if t == 0 then
                                -- Circumference
                                { prompt = "Circumference of a circle with radius " ++ String.fromInt r ++ "? (use π≈3.14)"
                                , inputType = TDecimal
                                , answer = AFloat (2.0 * 3.14 * toFloat r) 0.1
                                , hint =
                                    { prompt = "Circumference of a circle with radius " ++ String.fromInt r ++ "? (use π≈3.14)"
                                    , answer = String.fromFloat (2.0 * 3.14 * toFloat r)
                                    , steps =
                                        [ "C = 2πr"
                                        , "C = 2 × 3.14 × " ++ String.fromInt r ++ " = " ++ String.fromFloat (2.0 * 3.14 * toFloat r)
                                        ]
                                    }
                                }
                            else
                                -- Area
                                { prompt = "Area of a circle with radius " ++ String.fromInt r ++ "? (use π≈3.14)"
                                , inputType = TDecimal
                                , answer = AFloat (3.14 * toFloat r * toFloat r) 0.5
                                , hint =
                                    { prompt = "Area of a circle with radius " ++ String.fromInt r ++ "? (use π≈3.14)"
                                    , answer = String.fromFloat (3.14 * toFloat r * toFloat r)
                                    , steps =
                                        [ "A = πr²"
                                        , "A = 3.14 × " ++ String.fromInt r ++ "² = 3.14 × " ++ String.fromInt (r * r) ++ " = " ++ String.fromFloat (3.14 * toFloat r * toFloat r)
                                        ]
                                    }
                                }
                        )
            )


genSurfaceAreaRect : Generator Problem
genSurfaceAreaRect =
    -- SA = 2(lw + lh + wh)
    Random.map3 (\l w h -> ( l, w, h )) (randInt 2 8) (randInt 2 8) (randInt 2 8)
        |> Random.andThen
            (\( l, w, h ) ->
                let correct = 2 * (l * w + l * h + w * h) in
                wrongChoicesInt correct
                    |> Random.map
                        (\wrong ->
                            let choices = shuffleChoices (String.fromInt correct) wrong in
                            { prompt = "Surface area of a rectangular prism: " ++ String.fromInt l ++ "×" ++ String.fromInt w ++ "×" ++ String.fromInt h ++ "?"
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "Surface area of a rectangular prism: " ++ String.fromInt l ++ "×" ++ String.fromInt w ++ "×" ++ String.fromInt h ++ "?"
                                , answer = String.fromInt correct
                                , steps =
                                    [ "SA = 2(lw + lh + wh)"
                                    , "= 2(" ++ String.fromInt l ++ "×" ++ String.fromInt w ++ " + " ++ String.fromInt l ++ "×" ++ String.fromInt h ++ " + " ++ String.fromInt w ++ "×" ++ String.fromInt h ++ ")"
                                    , "= 2(" ++ String.fromInt (l * w) ++ " + " ++ String.fromInt (l * h) ++ " + " ++ String.fromInt (w * h) ++ ") = 2(" ++ String.fromInt (l * w + l * h + w * h) ++ ") = " ++ String.fromInt correct
                                    ]
                                }
                            }
                        )
            )


genSurfaceAreaCylinder : Generator Problem
genSurfaceAreaCylinder =
    -- SA = 2πr² + 2πrh ≈ 2×3.14×r² + 2×3.14×r×h
    randChoice [ 2, 3, 4, 5 ] 3
        |> Random.andThen
            (\r ->
                randChoice [ 3, 4, 5, 6, 8, 10 ] 5
                    |> Random.map
                        (\h ->
                            let
                                pi_ = 3.14
                                sa = 2.0 * pi_ * toFloat r * toFloat r + 2.0 * pi_ * toFloat r * toFloat h
                            in
                            { prompt = "Surface area of a cylinder with radius " ++ String.fromInt r ++ " and height " ++ String.fromInt h ++ "? (use π≈3.14)"
                            , inputType = TDecimal
                            , answer = AFloat sa 1.0
                            , hint =
                                { prompt = "Surface area of a cylinder with radius " ++ String.fromInt r ++ " and height " ++ String.fromInt h ++ "? (use π≈3.14)"
                                , answer = String.fromFloat sa
                                , steps =
                                    let
                                        topBottom = 2.0 * pi_ * toFloat r * toFloat r
                                        side = 2.0 * pi_ * toFloat r * toFloat h
                                    in
                                    [ "SA = 2πr² + 2πrh"
                                    , "= 2×3.14×" ++ String.fromInt (r * r) ++ " + 2×3.14×" ++ String.fromInt r ++ "×" ++ String.fromInt h
                                    , "= " ++ String.fromFloat topBottom ++ " + " ++ String.fromFloat side ++ " = " ++ String.fromFloat sa
                                    ]
                                }
                            }
                        )
            )


genVolumeRect : Generator Problem
genVolumeRect =
    Random.map3 (\l w h -> ( l, w, h )) (randInt 2 10) (randInt 2 10) (randInt 2 10)
        |> Random.map
            (\( l, w, h ) ->
                { prompt = "Volume of rectangular prism: " ++ String.fromInt l ++ "×" ++ String.fromInt w ++ "×" ++ String.fromInt h ++ "?"
                , inputType = TInteger
                , answer = AInt (l * w * h)
                , hint =
                    { prompt = "Volume of rectangular prism: " ++ String.fromInt l ++ "×" ++ String.fromInt w ++ "×" ++ String.fromInt h ++ "?"
                    , answer = String.fromInt (l * w * h)
                    , steps = [ "V = l × w × h", "= " ++ String.fromInt l ++ " × " ++ String.fromInt w ++ " × " ++ String.fromInt h ++ " = " ++ String.fromInt (l * w * h) ]
                    }
                }
            )


genVolumeCylinder : Generator Problem
genVolumeCylinder =
    -- V = πr²h ≈ 3.14×r²×h
    randChoice [ 2, 3, 4, 5 ] 3
        |> Random.andThen
            (\r ->
                randChoice [ 3, 4, 5, 6, 8, 10 ] 5
                    |> Random.map
                        (\h ->
                            let
                                v = 3.14 * toFloat r * toFloat r * toFloat h
                            in
                            { prompt = "Volume of a cylinder with radius " ++ String.fromInt r ++ " and height " ++ String.fromInt h ++ "? (use π≈3.14)"
                            , inputType = TDecimal
                            , answer = AFloat v 1.0
                            , hint =
                                { prompt = "Volume of a cylinder with radius " ++ String.fromInt r ++ " and height " ++ String.fromInt h ++ "? (use π≈3.14)"
                                , answer = String.fromFloat v
                                , steps =
                                    [ "V = πr²h"
                                    , "= 3.14 × " ++ String.fromInt r ++ "² × " ++ String.fromInt h
                                    , "= 3.14 × " ++ String.fromInt (r * r) ++ " × " ++ String.fromInt h ++ " = " ++ String.fromFloat v
                                    ]
                                }
                            }
                        )
            )


-- ── UNIT 8: Probability and Statistics ────────────────────────────────────


genSimpleProb : Generator Problem
genSimpleProb =
    Random.int 0 1
        |> Random.andThen
            (\t ->
                if t == 0 then
                    -- Simple probability: pick colored balls
                    Random.map2 Tuple.pair (randInt 1 4) (randInt 5 10)
                        |> Random.map
                            (\( fav, total ) ->
                                let
                                    ( rn, rd ) = reduceFraction fav total
                                in
                                { prompt = "A bag has " ++ String.fromInt total ++ " marbles. " ++ String.fromInt fav ++ " are red. What is P(red)?"
                                , inputType = TFraction
                                , answer = AFraction rn rd
                                , hint =
                                    { prompt = "A bag has " ++ String.fromInt total ++ " marbles. " ++ String.fromInt fav ++ " are red. What is P(red)?"
                                    , answer = showFrac rn rd
                                    , steps =
                                        [ "P(event) = favorable outcomes / total outcomes"
                                        , "P(red) = " ++ showFrac fav total ++ " = " ++ showFrac rn rd
                                        ]
                                    }
                                }
                            )
                else
                    -- Probability with a die
                    Random.int 0 2
                        |> Random.map
                            (\n ->
                                case n of
                                    0 ->
                                        { prompt = "A fair 6-sided die is rolled. What is P(rolling a 4)?"
                                        , inputType = TFraction
                                        , answer = AFraction 1 6
                                        , hint =
                                            { prompt = "P(rolling a 4) on a 6-sided die?"
                                            , answer = "1/6"
                                            , steps =
                                                [ "There is 1 favorable outcome (rolling 4)"
                                                , "Total outcomes: 6"
                                                , "P = 1/6"
                                                ]
                                            }
                                        }

                                    1 ->
                                        { prompt = "A fair 6-sided die is rolled. What is P(rolling an even number)?"
                                        , inputType = TFraction
                                        , answer = AFraction 1 2
                                        , hint =
                                            { prompt = "P(even) on a 6-sided die?"
                                            , answer = "1/2"
                                            , steps =
                                                [ "Even numbers: 2, 4, 6 → 3 outcomes"
                                                , "Total outcomes: 6"
                                                , "P = 3/6 = 1/2"
                                                ]
                                            }
                                        }

                                    _ ->
                                        { prompt = "A fair 6-sided die is rolled. What is P(rolling a number > 4)?"
                                        , inputType = TFraction
                                        , answer = AFraction 1 3
                                        , hint =
                                            { prompt = "P(rolling > 4) on a 6-sided die?"
                                            , answer = "1/3"
                                            , steps =
                                                [ "Numbers > 4: 5, 6 → 2 outcomes"
                                                , "Total outcomes: 6"
                                                , "P = 2/6 = 1/3"
                                                ]
                                            }
                                        }
                            )
            )


genCountingPrinciple : Generator Problem
genCountingPrinciple =
    Random.int 0 1
        |> Random.andThen
            (\t ->
                if t == 0 then
                    -- Fundamental counting principle
                    Random.map2 Tuple.pair (randInt 2 5) (randInt 2 5)
                        |> Random.andThen
                            (\( a, b ) ->
                                let correct = a * b in
                                wrongChoicesInt correct
                                    |> Random.map
                                        (\wrong ->
                                            let choices = shuffleChoices (String.fromInt correct) wrong in
                                            { prompt = "A restaurant offers " ++ String.fromInt a ++ " main dishes and " ++ String.fromInt b ++ " drinks. How many different meal combinations are possible?"
                                            , inputType = TChoice choices
                                            , answer = AChoice 0
                                            , hint =
                                                { prompt = "A restaurant offers " ++ String.fromInt a ++ " main dishes and " ++ String.fromInt b ++ " drinks. How many different meal combinations are possible?"
                                                , answer = String.fromInt correct
                                                , steps =
                                                    [ "Fundamental Counting Principle: multiply the choices"
                                                    , String.fromInt a ++ " × " ++ String.fromInt b ++ " = " ++ String.fromInt correct
                                                    ]
                                                }
                                            }
                                        )
                            )
                else
                    -- Tree diagram / 3-event counting
                    Random.map3 (\a b c -> ( a, b, c )) (randInt 2 4) (randInt 2 3) (randInt 2 3)
                        |> Random.andThen
                            (\( a, b, c ) ->
                                let correct = a * b * c in
                                wrongChoicesInt correct
                                    |> Random.map
                                        (\wrong ->
                                            let choices = shuffleChoices (String.fromInt correct) wrong in
                                            { prompt = "A shirt comes in " ++ String.fromInt a ++ " colors, " ++ String.fromInt b ++ " sizes, and " ++ String.fromInt c ++ " styles. How many different shirts are possible?"
                                            , inputType = TChoice choices
                                            , answer = AChoice 0
                                            , hint =
                                                { prompt = "A shirt comes in " ++ String.fromInt a ++ " colors, " ++ String.fromInt b ++ " sizes, and " ++ String.fromInt c ++ " styles. How many different shirts are possible?"
                                                , answer = String.fromInt correct
                                                , steps =
                                                    [ "Multiply all choices together: " ++ String.fromInt a ++ " × " ++ String.fromInt b ++ " × " ++ String.fromInt c ++ " = " ++ String.fromInt correct
                                                    ]
                                                }
                                            }
                                        )
                            )
            )


genCompoundProb : Generator Problem
genCompoundProb =
    Random.int 0 1
        |> Random.andThen
            (\t ->
                if t == 0 then
                    -- P(A and B) independent: flip coin AND roll die
                    Random.constant
                        { prompt = "You flip a fair coin and roll a 6-sided die. What is P(heads AND rolling a 3)?"
                        , inputType = TFraction
                        , answer = AFraction 1 12
                        , hint =
                            { prompt = "You flip a fair coin and roll a 6-sided die. What is P(heads AND rolling a 3)?"
                            , answer = "1/12"
                            , steps =
                                [ "For independent events: P(A and B) = P(A) × P(B)"
                                , "P(heads) = 1/2, P(rolling 3) = 1/6"
                                , "1/2 × 1/6 = 1/12"
                                ]
                            }
                        }
                else
                    -- P(A or B) mutually exclusive
                    Random.constant
                        { prompt = "A bag has 3 red and 4 blue marbles (7 total). What is P(red or blue)?"
                        , inputType = TFraction
                        , answer = AFraction 1 1
                        , hint =
                            { prompt = "A bag has 3 red and 4 blue marbles (7 total). What is P(red or blue)?"
                            , answer = "1"
                            , steps =
                                [ "Mutually exclusive: P(A or B) = P(A) + P(B)"
                                , "P(red) = 3/7, P(blue) = 4/7"
                                , "3/7 + 4/7 = 7/7 = 1"
                                , "Certain event: probability = 1"
                                ]
                            }
                        }
            )


genMeanMedianMode : Generator Problem
genMeanMedianMode =
    Random.int 0 2
        |> Random.andThen
            (\t ->
                case t of
                    0 ->
                        -- Mean
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
                                                        [ "Add all values: " ++ String.join "+" (List.map String.fromInt nums) ++ " = " ++ String.fromInt s
                                                        , "Divide by count: " ++ String.fromInt s ++ " / " ++ String.fromInt n ++ " = " ++ String.fromInt correct
                                                        ]
                                                    }
                                                }
                                            )
                                )

                    1 ->
                        -- Median
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
                                                        [ "Sort the list: " ++ numStr
                                                        , "Even count: average middle two: (" ++ String.fromInt mid1 ++ "+" ++ String.fromInt mid2 ++ ")/2 = " ++ String.fromInt correct
                                                        ]
                                                    }
                                                }
                                            )
                                )

                    _ ->
                        -- Mode
                        Random.map3 (\mode other1 other2 -> List.sort [ mode, mode, other1, other2, other1 + 1 ])
                            (randInt 5 15) (randInt 1 4) (randInt 16 20)
                            |> Random.andThen
                                (\nums ->
                                    let
                                        correct = nums |> List.head |> Maybe.withDefault 0
                                        numStr = String.join ", " (List.map String.fromInt nums)
                                    in
                                    wrongChoicesInt correct
                                        |> Random.map
                                            (\wrong ->
                                                let choices = shuffleChoices (String.fromInt correct) wrong in
                                                { prompt = "Mode of {" ++ numStr ++ "}? (most frequent)"
                                                , inputType = TChoice choices
                                                , answer = AChoice 0
                                                , hint =
                                                    { prompt = "Mode of {" ++ numStr ++ "}? (most frequent)"
                                                    , answer = String.fromInt correct
                                                    , steps =
                                                        [ "Mode = the value that appears most often"
                                                        , String.fromInt correct ++ " appears more than once in: " ++ numStr
                                                        , "Mode = " ++ String.fromInt correct
                                                        ]
                                                    }
                                                }
                                            )
                                )
            )


genBoxWhisker : Generator Problem
genBoxWhisker =
    -- Q1, Q2(median), Q3 of a sorted set
    Random.map4 (\a b c d -> List.sort [ a, b, c, d ])
        (randInt 1 10) (randInt 11 20) (randInt 21 30) (randInt 31 40)
        |> Random.andThen
            (\sorted ->
                let
                    q1 = List.head sorted |> Maybe.withDefault 0
                    q3 = List.drop 3 sorted |> List.head |> Maybe.withDefault 0
                    iqr = q3 - q1
                in
                wrongChoicesInt iqr
                    |> Random.map
                        (\wrong ->
                            let
                                numStr = String.join ", " (List.map String.fromInt sorted)
                                choices = shuffleChoices (String.fromInt iqr) wrong
                            in
                            { prompt = "For data {" ++ numStr ++ "}: Q1=" ++ String.fromInt q1 ++ ", Q3=" ++ String.fromInt q3 ++ ". Find the IQR (interquartile range)."
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "For data {" ++ numStr ++ "}: Q1=" ++ String.fromInt q1 ++ ", Q3=" ++ String.fromInt q3 ++ ". Find the IQR (interquartile range)."
                                , answer = String.fromInt iqr
                                , steps =
                                    [ "IQR = Q3 - Q1"
                                    , "IQR = " ++ String.fromInt q3 ++ " - " ++ String.fromInt q1 ++ " = " ++ String.fromInt iqr
                                    ]
                                }
                            }
                        )
            )


genStemLeaf : Generator Problem
genStemLeaf =
    -- Interpret a simple stem-and-leaf: given stem and leaf, find the number
    Random.map2 Tuple.pair (randInt 2 7) (randInt 0 9)
        |> Random.andThen
            (\( stem, leaf ) ->
                let value = stem * 10 + leaf in
                wrongChoicesInt value
                    |> Random.map
                        (\wrong ->
                            let choices = shuffleChoices (String.fromInt value) wrong in
                            { prompt = "In a stem-and-leaf plot, stem=" ++ String.fromInt stem ++ " and leaf=" ++ String.fromInt leaf ++ ". What number does this represent?"
                            , inputType = TChoice choices
                            , answer = AChoice 0
                            , hint =
                                { prompt = "In a stem-and-leaf plot, stem=" ++ String.fromInt stem ++ " and leaf=" ++ String.fromInt leaf ++ ". What number does this represent?"
                                , answer = String.fromInt value
                                , steps =
                                    [ "Stem represents the tens digit"
                                    , "Leaf represents the ones digit"
                                    , "Stem " ++ String.fromInt stem ++ ", leaf " ++ String.fromInt leaf ++ " → " ++ String.fromInt value
                                    ]
                                }
                            }
                        )
            )


-- ── HELPERS ───────────────────────────────────────────────────────────────


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
        4 -> "⁴"
        5 -> "⁵"
        6 -> "⁶"
        _ -> "^" ++ String.fromInt n


shuffleChoices : String -> List String -> List String
shuffleChoices correct wrong =
    -- Correct answer placed at index 0; view shuffles display order
    correct :: List.take 3 wrong
