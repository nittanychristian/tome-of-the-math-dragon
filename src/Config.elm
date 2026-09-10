module Config exposing (..)


playerMaxHp : Int
playerMaxHp =
    100


baseDamage : Int
baseDamage =
    15


bossCounterDamage : Int
bossCounterDamage =
    20


minProblems : Int
minProblems =
    5


flashDurationMs : Float
flashDurationMs =
    150.0


animIntervalMs : Float
animIntervalMs =
    600.0


multiplierFor : Int -> ( Int, Int )
multiplierFor streak =
    if streak >= 7 then
        ( 3, 1 )

    else if streak >= 5 then
        ( 2, 1 )

    else if streak >= 3 then
        ( 3, 2 )

    else
        ( 1, 1 )


applyMultiplier : Int -> Int -> Int
applyMultiplier streak base =
    let
        ( num, den ) =
            multiplierFor streak
    in
    (base * num) // den


multiplierLabel : Int -> String
multiplierLabel streak =
    case multiplierFor streak of
        ( 3, 1 ) ->
            "3x"

        ( 2, 1 ) ->
            "2x"

        ( 3, 2 ) ->
            "1.5x"

        _ ->
            "1x"
