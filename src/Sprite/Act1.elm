module Sprite.Act1 exposing
    ( numberGolem
    , fractionPhantom
    , decimalDrake
    , expressionEel
    , equationEttin
    , ratioRaven
    , geometryGargoyle
    , dataDigger
    , act1MegaBoss
    , spriteFor
    )

import Types exposing (AnimFrame(..), BossSprite, Course(..), UnitId, UnitSlot(..))


spriteFor : UnitId -> BossSprite
spriteFor uid =
    case ( uid.course, uid.unit ) of
        ( Course1, Unit 1 ) -> numberGolem
        ( Course1, Unit 2 ) -> fractionPhantom
        ( Course1, Unit 3 ) -> decimalDrake
        ( Course1, Unit 4 ) -> expressionEel
        ( Course1, Unit 5 ) -> equationEttin
        ( Course1, Unit 6 ) -> ratioRaven
        ( Course1, Unit 7 ) -> geometryGargoyle
        ( Course1, Unit 8 ) -> dataDigger
        ( Course1, MegaBoss ) -> act1MegaBoss
        _ -> numberGolem


-- Number Golem — Unit 1 boss (20×24 pixel grid, px=8)
-- Palette: G=grey body, D=dark grey shadow, W=white eyes, R=red pupils, B=brown base
numberGolem : BossSprite
numberGolem =
    { name = "Number Golem"
    , palette =
        [ ( 'G', "#888899" )
        , ( 'D', "#555566" )
        , ( 'W', "#f5f5dc" )
        , ( 'R', "#cc2200" )
        , ( 'B', "#664433" )
        , ( 'Y', "#c8a000" )
        ]
    , pixelSize = 8
    , frameA =
        [ ".......GGGGGGGG......."
        , "......GGGGGGGGGGG....."
        , ".....GGGDDGGGDDGGG...."
        , ".....GGGDDGGGDDGGG...."
        , "....GGGGGGGGGGGGGGGG.."
        , "....GGYWWGGGGGWWYGGG.."
        , "....GGWRRWGGGGWRRWGG.."
        , "....GGWRRWGGGGWRRWGG.."
        , "....GGYWWGGGGGWWYGG..."
        , "....GGGGGGGGGGGGGGGG.."
        , "....GGGDDDDDDDDGGGGG.."
        , ".....GGGGGGGGGGGGG...."
        , "......DDDGGGGGDDD....."
        , ".....GGGGGGGGGGGGG...."
        , "....GGGGGGGGGGGGGGG..."
        , "...DDGGGGGGGGGGGGGDD.."
        , "...GGGGGDDDDDDDGGGGG.."
        , "...GGGDDDDDDDDDDDGG..."
        , "...BBBGGGGGGGGGGGBBB.."
        , "...BBBDDDDDDDDDDDBB..."
        , "....BBBBBBBBBBBBBBB..."
        , ".....BBBBBBBBBBBBB...."
        , "......DDDDDDDDDDD....."
        , "......................  "
        ]
    , frameB =
        [ ".......GGGGGGGG......."
        , "......GGGGGGGGGGG....."
        , ".....GGGDDGGGDDGGG...."
        , ".....GGGDDGGGDDGGG...."
        , "....GGGGGGGGGGGGGGGG.."
        , "....GGYWWGGGGGWWYGGG.."
        , "....GGWDDWGGGGWDDWGG.."
        , "....GGWDDWGGGGWDDWGG.."
        , "....GGYWWGGGGGWWYGG..."
        , "....GGGGGGGGGGGGGGGG.."
        , "....GGGDDDDDDDDGGGGG.."
        , ".....GGGGGGGGGGGGG...."
        , "......DDDGGGGGDDD....."
        , ".....GGGGGGGGGGGGG...."
        , "....GGGGGGGGGGGGGGG..."
        , "...DDGGGGGGGGGGGGGDD.."
        , "...GGGGGDDDDDDDGGGGG.."
        , "...GGGDDDDDDDDDDDGG..."
        , "...BBBGGGGGGGGGGGBBB.."
        , "...BBBDDDDDDDDDDDBB..."
        , "....BBBBBBBBBBBBBBB..."
        , ".....BBBBBBBBBBBBB...."
        , "......DDDDDDDDDDD....."
        , "......................  "
        ]
    }


-- Generic helper for color-swapped boss variants
genericBoss : String -> List ( Char, String ) -> BossSprite
genericBoss name palette =
    { name = name
    , palette = palette
    , pixelSize = 8
    , frameA =
        [ "........BBBBBBBB......"
        , ".......BBBBBBBBBBB...."
        , "......BBBSSBBBSSBBB..."
        , "......BBBSSBBBSSBBB..."
        , ".....BBBBBBBBBBBBBBBB."
        , ".....BBEWWBBBBBWWEBBB."
        , ".....BBWRRWBBBWRRWBBB."
        , ".....BBWRRWBBBWRRWBBB."
        , ".....BBEWWBBBBBWWEBB.."
        , ".....BBBBBBBBBBBBBBBB."
        , ".....BBBSSSSSSSSBBBB.."
        , "......BBBBBBBBBBBBB..."
        , ".......SSSBBBBSSS....."
        , "......BBBBBBBBBBBBB..."
        , ".....BBBBBBBBBBBBBBB.."
        , "....SSBBBBBBBBBBBBBSS."
        , "....BBBBBSSSSSSSBBBB.."
        , "....BBBSSSSSSSSSSSBB.."
        , "....TTTBBBBBBBBBBTTT.."
        , "....TTTSSSSSSSSSSTTT.."
        , ".....TTTTTTTTTTTTTTT.."
        , "......TTTTTTTTTTTTT..."
        , ".......SSSSSSSSSSS...."
        , "...................... "
        ]
    , frameB =
        [ "........BBBBBBBB......"
        , ".......BBBBBBBBBBB...."
        , "......BBBSSBBBSSBBB..."
        , "......BBBSSBBBSSBBB..."
        , ".....BBBBBBBBBBBBBBBB."
        , ".....BBEWWBBBBBWWEBBB."
        , ".....BBWSSWBBBWSSWBBB."
        , ".....BBWSSWBBBWSSWBBB."
        , ".....BBEWWBBBBBWWEBB.."
        , ".....BBBBBBBBBBBBBBBB."
        , ".....BBBSSSSSSSSBBBB.."
        , "......BBBBBBBBBBBBB..."
        , ".......SSSBBBBSSS....."
        , "......BBBBBBBBBBBBB..."
        , ".....BBBBBBBBBBBBBBB.."
        , "....SSBBBBBBBBBBBBBSS."
        , "....BBBBBSSSSSSSBBBB.."
        , "....BBBSSSSSSSSSSSBB.."
        , "....TTTBBBBBBBBBBTTT.."
        , "....TTTSSSSSSSSSSTTT.."
        , ".....TTTTTTTTTTTTTTT.."
        , "......TTTTTTTTTTTTT..."
        , ".......SSSSSSSSSSS...."
        , "...................... "
        ]
    }


-- Fraction Phantom — Unit 2 boss (purple ghost)
fractionPhantom : BossSprite
fractionPhantom =
    genericBoss "Fraction Phantom"
        [ ( 'B', "#8844cc" )
        , ( 'S', "#553388" )
        , ( 'E', "#ddbbff" )
        , ( 'W', "#ffffff" )
        , ( 'R', "#ff44ff" )
        , ( 'T', "#553388" )
        ]


-- Decimal Drake — Unit 3 boss (teal dragon)
decimalDrake : BossSprite
decimalDrake =
    genericBoss "Decimal Drake"
        [ ( 'B', "#228877" )
        , ( 'S', "#115544" )
        , ( 'E', "#aaffee" )
        , ( 'W', "#ffffff" )
        , ( 'R', "#00ffcc" )
        , ( 'T', "#664400" )
        ]


-- Expression Eel — Unit 4 boss (blue serpent)
expressionEel : BossSprite
expressionEel =
    genericBoss "Expression Eel"
        [ ( 'B', "#2244aa" )
        , ( 'S', "#112266" )
        , ( 'E', "#aabbff" )
        , ( 'W', "#ffffff" )
        , ( 'R', "#4488ff" )
        , ( 'T', "#334488" )
        ]


-- Equation Ettin — Unit 5 boss (two-headed red ogre)
equationEttin : BossSprite
equationEttin =
    genericBoss "Equation Ettin"
        [ ( 'B', "#aa2222" )
        , ( 'S', "#661111" )
        , ( 'E', "#ffbbbb" )
        , ( 'W', "#ffffff" )
        , ( 'R', "#ff4444" )
        , ( 'T', "#883311" )
        ]


-- Ratio Raven — Unit 6 boss (black bird)
ratioRaven : BossSprite
ratioRaven =
    genericBoss "Ratio Raven"
        [ ( 'B', "#222233" )
        , ( 'S', "#111122" )
        , ( 'E', "#aaaacc" )
        , ( 'W', "#ffffff" )
        , ( 'R', "#8844ff" )
        , ( 'T', "#444455" )
        ]


-- Geometry Gargoyle — Unit 7 boss (stone grey with wing hints)
geometryGargoyle : BossSprite
geometryGargoyle =
    genericBoss "Geometry Gargoyle"
        [ ( 'B', "#778899" )
        , ( 'S', "#445566" )
        , ( 'E', "#ddeeff" )
        , ( 'W', "#ffffff" )
        , ( 'R', "#44aaff" )
        , ( 'T', "#556677" )
        ]


-- Data Digger — Unit 8 boss (brown mole)
dataDigger : BossSprite
dataDigger =
    genericBoss "Data Digger"
        [ ( 'B', "#885533" )
        , ( 'S', "#553311" )
        , ( 'E', "#ffddbb" )
        , ( 'W', "#ffffff" )
        , ( 'R', "#ff8844" )
        , ( 'T', "#442211" )
        ]


-- Act 1 MegaBoss — Chaos Wyrm (gold/dark, bigger presence)
act1MegaBoss : BossSprite
act1MegaBoss =
    genericBoss "Chaos Wyrm"
        [ ( 'B', "#c8a000" )
        , ( 'S', "#664400" )
        , ( 'E', "#fff8cc" )
        , ( 'W', "#ffffff" )
        , ( 'R', "#ff6600" )
        , ( 'T', "#882200" )
        ]
