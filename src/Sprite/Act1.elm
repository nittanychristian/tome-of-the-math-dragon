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


-- Course 1 Unit Boss shape: a hunched stone beast — broad head, stumpy legs, rocky texture
-- Used as the base shape for units 2-8, with palette swaps
stoneCreature : String -> List ( Char, String ) -> BossSprite
stoneCreature name palette =
    { name = name
    , palette = palette
    , pixelSize = 8
    , frameA =
        [ "......BBBBBBBBBBBB...."
        , ".....BBBBBBBBBBBBBB..."
        , "....BBBBSSBBBSSBBBBB.."
        , "....BBBSSSBBBBSSSBBB.."
        , "....BBBBBBBBBBBBBBBB.."
        , "....BBEWWBBBBBWWEBBB.."
        , "....BBWRRWBBBWRRWBBB.."
        , "....BBWRRWBBBWRRWBBB.."
        , "....BBEWWBBBBBWWEBB..."
        , "....BBBBBBBBBBBBBBBB.."
        , "...SBBBBBBBBBBBBBBBS.."
        , "...SBBBBBBBBBBBBBBBS.."
        , "....BBSSBBBBBBSSBB...."
        , "....BBBBBBBBBBBBBBB..."
        , "...BBBBBBBBBBBBBBBBB.."
        , "...BBBBSSSSSSSSBBBBB.."
        , "....BBBSSSSSSSSBBB...."
        , ".....BBBBBBBBBBBBB...."
        , "....TTBBBBBBBBBBBTT..."
        , "....TTTSSSSSSSSTTTT..."
        , "....TTTTTTTTTTTTTT...."
        , ".....TTTTTTTTTTTTT...."
        , "......SSSSSSSSSSSS...."
        , "......................  "
        ]
    , frameB =
        [ "......BBBBBBBBBBBB...."
        , ".....BBBBBBBBBBBBBB..."
        , "....BBBBSSBBBSSBBBBB.."
        , "....BBBSSSBBBBSSSBBB.."
        , "....BBBBBBBBBBBBBBBB.."
        , "....BBEWWBBBBBWWEBBB.."
        , "....BBWSSWBBBWSSWBBB.."
        , "....BBWSSWBBBWSSWBBB.."
        , "....BBEWWBBBBBWWEBB..."
        , "....BBBBBBBBBBBBBBBB.."
        , "...SBBBBBBBBBBBBBBBS.."
        , "...SBBBBBBBBBBBBBBBS.."
        , "....BBSSBBBBBBSSBB...."
        , "....BBBBBBBBBBBBBBB..."
        , "...BBBBBBBBBBBBBBBBB.."
        , "...BBBBSSSSSSSSBBBBB.."
        , "....BBBSSSSSSSSBBB...."
        , ".....BBBBBBBBBBBBB...."
        , "....TTBBBBBBBBBBBTT..."
        , "....TTTSSSSSSSSTTTT..."
        , "....TTTTTTTTTTTTTT...."
        , ".....TTTTTTTTTTTTT...."
        , "......SSSSSSSSSSSS...."
        , "......................  "
        ]
    }


-- Fraction Phantom — Unit 2 boss (split-color purple/gold stone creature)
fractionPhantom : BossSprite
fractionPhantom =
    stoneCreature "Fraction Phantom"
        [ ( 'B', "#7744bb" )
        , ( 'S', "#441177" )
        , ( 'E', "#eeccff" )
        , ( 'W', "#ffffff" )
        , ( 'R', "#ff44ff" )
        , ( 'T', "#332266" )
        ]


-- Decimal Drake — Unit 3 boss (teal stone creature with cyan accents)
decimalDrake : BossSprite
decimalDrake =
    stoneCreature "Decimal Drake"
        [ ( 'B', "#117766" )
        , ( 'S', "#005544" )
        , ( 'E', "#aaffdd" )
        , ( 'W', "#ffffff" )
        , ( 'R', "#00ffaa" )
        , ( 'T', "#003322" )
        ]


-- Expression Eel — Unit 4 boss (deep blue stone creature)
expressionEel : BossSprite
expressionEel =
    stoneCreature "Expression Eel"
        [ ( 'B', "#223399" )
        , ( 'S', "#111155" )
        , ( 'E', "#aabbff" )
        , ( 'W', "#ffffff" )
        , ( 'R', "#5599ff" )
        , ( 'T', "#112277" )
        ]


-- Equation Ettin — Unit 5 boss (two-headed crimson stone creature)
equationEttin : BossSprite
equationEttin =
    stoneCreature "Equation Ettin"
        [ ( 'B', "#aa2222" )
        , ( 'S', "#661111" )
        , ( 'E', "#ffcccc" )
        , ( 'W', "#ffffff" )
        , ( 'R', "#ff5555" )
        , ( 'T', "#440000" )
        ]


-- Ratio Raven — Unit 6 boss (obsidian black stone creature)
ratioRaven : BossSprite
ratioRaven =
    stoneCreature "Ratio Raven"
        [ ( 'B', "#222233" )
        , ( 'S', "#111122" )
        , ( 'E', "#aaaadd" )
        , ( 'W', "#ffffff" )
        , ( 'R', "#aa88ff" )
        , ( 'T', "#000011" )
        ]


-- Geometry Gargoyle — Unit 7 boss (slate grey stone creature)
geometryGargoyle : BossSprite
geometryGargoyle =
    stoneCreature "Geometry Gargoyle"
        [ ( 'B', "#667788" )
        , ( 'S', "#334455" )
        , ( 'E', "#cceeff" )
        , ( 'W', "#ffffff" )
        , ( 'R', "#55ccff" )
        , ( 'T', "#223344" )
        ]


-- Data Digger — Unit 8 boss (earthy brown stone creature)
dataDigger : BossSprite
dataDigger =
    stoneCreature "Data Digger"
        [ ( 'B', "#775533" )
        , ( 'S', "#443311" )
        , ( 'E', "#ffddaa" )
        , ( 'W', "#ffffff" )
        , ( 'R', "#ff9944" )
        , ( 'T', "#221100" )
        ]


-- Act 1 MegaBoss — Chaos Wyrm (gold/dark, bigger presence)
act1MegaBoss : BossSprite
act1MegaBoss =
    stoneCreature "Chaos Wyrm"
        [ ( 'B', "#b89000" )
        , ( 'S', "#664400" )
        , ( 'E', "#fff8cc" )
        , ( 'W', "#ffffff" )
        , ( 'R', "#ff6600" )
        , ( 'T', "#332200" )
        ]
