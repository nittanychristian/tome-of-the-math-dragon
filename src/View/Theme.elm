module View.Theme exposing (..)


-- CANVAS


canvasW : Int
canvasW =
    480


canvasH : Int
canvasH =
    640


-- PALETTE
-- NES-inspired, strict constraints


bgBlack : String
bgBlack =
    "#0f0f1a"


bgDark : String
bgDark =
    "#1a1a2e"


cream : String
cream =
    "#f5f5dc"


gold : String
gold =
    "#c8a000"


hpGreen : String
hpGreen =
    "#2a7a2a"


hpRed : String
hpRed =
    "#8b0000"


hpLow : String
hpLow =
    "#cc2200"


streakGem : String
streakGem =
    "#d4a017"


streakEmpty : String
streakEmpty =
    "#3a3a4a"


flashWhite : String
flashWhite =
    "#ffffff"


flashRed : String
flashRed =
    "#ff2222"


-- Per-act primary palettes (boss sprite main color)


act1Primary : String
act1Primary =
    "#6a6a7a"


act1Accent : String
act1Accent =
    "#c8a000"


act2Primary : String
act2Primary =
    "#4a2a8a"


act2Accent : String
act2Accent =
    "#8888ff"


act3Primary : String
act3Primary =
    "#1a5a2a"


act3Accent : String
act3Accent =
    "#44cc66"


act4Primary : String
act4Primary =
    "#7a1a1a"


act4Accent : String
act4Accent =
    "#ff6600"


-- WINDOW CHROME


windowBorderOuter : String
windowBorderOuter =
    cream


windowBg : String
windowBg =
    bgDark


windowBorderInner : String
windowBorderInner =
    cream


-- TYPOGRAPHY


fontFamily : String
fontFamily =
    "'Press Start 2P', monospace"


fontSizeNormal : Int
fontSizeNormal =
    10


fontSizeSmall : Int
fontSizeSmall =
    8


fontSizeLarge : Int
fontSizeLarge =
    14


fontSizeTitle : Int
fontSizeTitle =
    18


-- PIXEL SIZES


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


maxProblems : Int
maxProblems =
    10


-- STREAK multiplier thresholds (streak count → numerator, denominator)


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


applyMultiplier : Int -> Int -> Int
applyMultiplier streak base =
    let
        ( num, den ) =
            multiplierFor streak
    in
    (base * num) // den
