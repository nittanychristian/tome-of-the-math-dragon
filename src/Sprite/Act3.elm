module Sprite.Act3 exposing (spriteFor)

import Types exposing (BossSprite, Course(..), UnitId, UnitSlot(..))


spriteFor : UnitId -> BossSprite
spriteFor uid =
    case ( uid.course, uid.unit ) of
        ( PreAlgebra, Unit 1 ) -> equationShadow
        ( PreAlgebra, Unit 2 ) -> radicalRevenant
        ( PreAlgebra, Unit 3 ) -> systemSorcerer
        ( PreAlgebra, Unit 4 ) -> geometryGrim
        ( PreAlgebra, Unit 5 ) -> inequalityInquisitor
        ( PreAlgebra, Unit 6 ) -> functionFiend
        ( PreAlgebra, MegaBoss ) -> preAlgebraLich
        _ -> preAlgebraLich


-- Lich/mage silhouette: tall pointed hat, narrow shoulders, wide robe hem
-- Distinct from golem (squat/broad) and ghost (dome+tendrils)
-- Hat = tall triangle at top, face = narrow, robe = widens toward base
-- B=robe body, S=shadow/dark robe, H=hat, F=face/bone, E=eye socket, R=iris, T=hem trim
lich : String -> List ( Char, String ) -> BossSprite
lich name palette =
    { name = name
    , palette = palette
    , pixelSize = 8
    , frameA =
        [ "..........HHH........."
        , ".........HHHHH........"
        , "........HHHHHHH......."
        , ".......HHHHHHHHH......"
        , "......HHHHHHHHHHH....."
        , ".......HHHFFHHHH......"
        , "......HHFFFFFFF........."
        , "......HFFERREFFE......"
        , "......HFFRRRRFFE......"
        , "......HFFERREFFE......"
        , ".......HFFFFFFF......."
        , "......BBBBBBBBBB......"
        , ".....BBBBBBBBBBBB....."
        , ".....BBSBBBBBBBSBB...."
        , "....BBBSBBBBBBBBSBB..."
        , "....BBBBBBBBBBBBBBB..."
        , "....BBBBBBBBBBBBBBB..."
        , "...BBBBBBBBBBBBBBBBB.."
        , "...BBBBBBBBBBBBBBBBBB."
        , "..BBBBBBBBBBBBBBBBBBB."
        , "..TBBBBBBBBBBBBBBBBBT."
        , ".TTBBBBBBBBBBBBBBBBBTT"
        , ".TTTTTTTTTTTTTTTTTTTTT"
        , "......................  "
        ]
    , frameB =
        [ "..........HHH........."
        , ".........HHHHH........"
        , "........HHHHHHH......."
        , ".......HHHHHHHHH......"
        , "......HHHHHHHHHHH....."
        , ".......HHHFFHHHH......"
        , "......HHFFFFFFF........."
        , "......HFFESFEFE......"
        , "......HFFSSSSFE......"
        , "......HFFESFEFE......"
        , ".......HFFFFFFF......."
        , "......BBBBBBBBBB......"
        , ".....BBBBBBBBBBBB....."
        , ".....BBSBBBBBBBSBB...."
        , "....BBBSBBBBBBBBSBB..."
        , "....BBBBBBBBBBBBBBB..."
        , "....BBBBBBBBBBBBBBB..."
        , "...BBBBBBBBBBBBBBBBB.."
        , "...BBBBBBBBBBBBBBBBBB."
        , "..BBBBBBBBBBBBBBBBBBB."
        , "..TBBBBBBBBBBBBBBBBBT."
        , ".TTBBBBBBBBBBBBBBBBBTT"
        , ".TTTTTTTTTTTTTTTTTTTTT"
        , "......................  "
        ]
    }


-- Act 3 Unit 1 — Equation Shadow (dark violet lich)
equationShadow : BossSprite
equationShadow =
    lich "Equation Shadow"
        [ ( 'B', "#442266" )
        , ( 'S', "#221133" )
        , ( 'H', "#331155" )
        , ( 'F', "#ccbbdd" )
        , ( 'E', "#ffddff" )
        , ( 'R', "#ff00ff" )
        , ( 'T', "#220044" )
        ]


-- Act 3 Unit 2 — Radical Revenant (bone-white lich)
radicalRevenant : BossSprite
radicalRevenant =
    lich "Radical Revenant"
        [ ( 'B', "#335544" )
        , ( 'S', "#112233" )
        , ( 'H', "#224433" )
        , ( 'F', "#ddeedd" )
        , ( 'E', "#eeffee" )
        , ( 'R', "#44ff88" )
        , ( 'T', "#112211" )
        ]


-- Act 3 Unit 3 — System Sorcerer (ice blue lich)
systemSorcerer : BossSprite
systemSorcerer =
    lich "System Sorcerer"
        [ ( 'B', "#224466" )
        , ( 'S', "#112233" )
        , ( 'H', "#113355" )
        , ( 'F', "#ccddef" )
        , ( 'E', "#ddeeff" )
        , ( 'R', "#44aaff" )
        , ( 'T', "#001133" )
        ]


-- Act 3 Unit 4 — Geometry Grim (slate lich)
geometryGrim : BossSprite
geometryGrim =
    lich "Geometry Grim"
        [ ( 'B', "#445566" )
        , ( 'S', "#223344" )
        , ( 'H', "#334455" )
        , ( 'F', "#ddeeff" )
        , ( 'E', "#eef8ff" )
        , ( 'R', "#aaddff" )
        , ( 'T', "#112233" )
        ]


-- Act 3 Unit 5 — Inequality Inquisitor (crimson lich)
inequalityInquisitor : BossSprite
inequalityInquisitor =
    lich "Inequality Inquisitor"
        [ ( 'B', "#661122" )
        , ( 'S', "#330011" )
        , ( 'H', "#550011" )
        , ( 'F', "#ffcccc" )
        , ( 'E', "#ffdddd" )
        , ( 'R', "#ff4444" )
        , ( 'T', "#220000" )
        ]


-- Act 3 Unit 6 — Function Fiend (gold-dark lich)
functionFiend : BossSprite
functionFiend =
    lich "Function Fiend"
        [ ( 'B', "#665500" )
        , ( 'S', "#332200" )
        , ( 'H', "#554400" )
        , ( 'F', "#ffeebb" )
        , ( 'E', "#fffacc" )
        , ( 'R', "#ffcc00" )
        , ( 'T', "#221100" )
        ]


-- Act 3 MegaBoss — Pre-Algebra Lich (full dark purple/bone, most detailed)
-- Adds a raised staff arm for extra silhouette distinction
preAlgebraLich : BossSprite
preAlgebraLich =
    { name = "Pre-Algebra Lich"
    , palette =
        [ ( 'B', "#331155" )
        , ( 'S', "#110033" )
        , ( 'H', "#220044" )
        , ( 'F', "#ddc8ee" )
        , ( 'E', "#ffffff" )
        , ( 'R', "#cc44ff" )
        , ( 'T', "#110022" )
        , ( 'M', "#9955dd" )
        , ( 'A', "#663399" )
        ]
    , pixelSize = 8
    , frameA =
        [ "...........HHH........"
        , "..........HHHHH......."
        , ".........HHHHHHH......"
        , "........HHHHHHHHH....."
        , ".......HHHHHHHHHHH...."
        , "........HHHFFHHH......"
        , ".......HHFFFFFFFF....."
        , "..M....HFFEERREFFE...."
        , "..MA...HFFRRRRRRFE...."
        , "..MA...HFFEERREFFE...."
        , "..M....HFFFFFFFF......"
        , "..AAA..BBBBBBBBBBB...."
        , "..AAA.BBBBBBBBBBBBB..."
        , ".....BBBSBBBBBBBSBB..."
        , "....BBBSBBBBBBBBSBB..."
        , "....BBBBBBBBBBBBBBB..."
        , "....BBBBBBBBBBBBBBB..."
        , "...BBBBBBBBBBBBBBBBB.."
        , "...BBBBBBBBBBBBBBBBBB."
        , "..BBBBBBBBBBBBBBBBBBB."
        , "..TBBBBBBBBBBBBBBBBBT."
        , ".TTBBBBBBBBBBBBBBBBBTT"
        , ".TTTTTTTTTTTTTTTTTTTTT"
        , "......................  "
        ]
    , frameB =
        [ "...........HHH........"
        , "..........HHHHH......."
        , ".........HHHHHHH......"
        , "........HHHHHHHHH....."
        , ".......HHHHHHHHHHH...."
        , "........HHHFFHHH......"
        , ".......HHFFFFFFFF....."
        , "..M....HFFEESFEFE...."
        , "..MA...HFFSSSSFFE...."
        , "..MA...HFFEESFEFE...."
        , "..M....HFFFFFFFF......"
        , "..AAA..BBBBBBBBBBB...."
        , "..AAA.BBBBBBBBBBBBB..."
        , ".....BBBSBBBBBBBSBB..."
        , "....BBBSBBBBBBBBSBB..."
        , "....BBBBBBBBBBBBBBB..."
        , "....BBBBBBBBBBBBBBB..."
        , "...BBBBBBBBBBBBBBBBB.."
        , "...BBBBBBBBBBBBBBBBBB."
        , "..BBBBBBBBBBBBBBBBBBB."
        , "..TBBBBBBBBBBBBBBBBBT."
        , ".TTBBBBBBBBBBBBBBBBBTT"
        , ".TTTTTTTTTTTTTTTTTTTTT"
        , "......................  "
        ]
    }
