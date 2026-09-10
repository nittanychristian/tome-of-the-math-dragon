module Sprite.Act3 exposing (spriteFor)

import Types exposing (BossSprite, Course(..), UnitId, UnitSlot(..))


spriteFor : UnitId -> BossSprite
spriteFor uid =
    case ( uid.course, uid.unit ) of
        ( PreAlgebra, Unit 1 ) -> rootRevenant
        ( PreAlgebra, Unit 2 ) -> polyPhantom
        ( PreAlgebra, Unit 3 ) -> multiStepMage
        ( PreAlgebra, Unit 4 ) -> percentPredator
        ( PreAlgebra, Unit 5 ) -> slopeStalker
        ( PreAlgebra, Unit 6 ) -> systemSerpent
        ( PreAlgebra, Unit 7 ) -> theoremTroll
        ( PreAlgebra, Unit 8 ) -> volumeViper
        ( PreAlgebra, Unit 9 ) -> scatterShade
        ( PreAlgebra, MegaBoss ) -> preAlgebraLich
        _ -> preAlgebraLich


-- GHOST shape — wide domed head, large glowing eyes, wispy tendrils
-- B=body, S=shadow, E=eye surround, W=eye white, P=pupil, T=tendril
ghost : String -> List ( Char, String ) -> BossSprite
ghost name palette =
    { name = name
    , palette = palette
    , pixelSize = 8
    , frameA =
        [ "........BBBBB.........."
        , "......BBBBBBBBBBB......"
        , ".....BBBBBBBBBBBBB....."
        , "....BBBBBBBBBBBBBBB...."
        , "....BBBBSSBBBBBSSBBBB.."
        , "....BBBBSSBBBBBSSBBBB.."
        , "...BBBBBBBBBBBBBBBBB..."
        , "...BBEWWBBBBBBWWEBBB..."
        , "...BBWPPWBBBBWPPWBBB..."
        , "...BBWPPWBBBBWPPWBBB..."
        , "...BBEWWBBBBBBWWEBBB..."
        , "...BBBBBBBBBBBBBBBBB..."
        , "....BBBBBBBBBBBBBBB...."
        , "....BBBBSSSSSSBBBB....."
        , "....BBBBBBBBBBBBB......"
        , ".....BBBBBBBBBBB......."
        , "...BBBB.....BBBB......."
        , "..TBBBB.......BBBBT...."
        , "..TBBB.........BBBT...."
        , "...TBB..........BT....."
        , "....TB..........BT....."
        , ".....TT.........TT....."
        , "......TT.......TT......"
        , "......................."
        ]
    , frameB =
        [ "........BBBBB.........."
        , "......BBBBBBBBBBB......"
        , ".....BBBBBBBBBBBBB....."
        , "....BBBBBBBBBBBBBBB...."
        , "....BBBBSSBBBBBSSBBBB.."
        , "....BBBBSSBBBBBSSBBBB.."
        , "...BBBBBBBBBBBBBBBBB..."
        , "...BBEWWBBBBBBWWEBBB..."
        , "...BBWBBWBBBBWBBWBBB..."
        , "...BBWBBWBBBBWBBWBBB..."
        , "...BBEWWBBBBBBWWEBBB..."
        , "...BBBBBBBBBBBBBBBBB..."
        , "....BBBBBBBBBBBBBBB...."
        , "....BBBBSSSSSSBBBB....."
        , "....BBBBBBBBBBBBB......"
        , ".....BBBBBBBBBBB......."
        , "....BBBB.....BBBB......"
        , "...TBBBB.......BBBBT..."
        , "...TBBB.........BBBT..."
        , "....TBB..........BT...."
        , ".....TB..........BT...."
        , "......TT........TT....."
        , ".......TT......TT......"
        , "......................."
        ]
    }


-- Root Revenant — Unit 1 (dark green/black, red glow eyes)
rootRevenant : BossSprite
rootRevenant =
    ghost "Root Revenant"
        [ ( 'B', "#1a3322" )
        , ( 'S', "#0a1a0a" )
        , ( 'E', "#886655" )
        , ( 'W', "#cc9977" )
        , ( 'P', "#ff3300" )
        , ( 'T', "#050a05" )
        ]


-- Poly Phantom — Unit 2 (violet/mauve, white pupils)
polyPhantom : BossSprite
polyPhantom =
    ghost "Poly Phantom"
        [ ( 'B', "#7755aa" )
        , ( 'S', "#442266" )
        , ( 'E', "#ddbbee" )
        , ( 'W', "#ffffff" )
        , ( 'P', "#eeddff" )
        , ( 'T', "#220044" )
        ]


-- LICH/MAGE shape — tall pointed hat, narrow shoulders, wide robe hem
-- B=robe body, S=shadow, H=hat, F=face/bone, E=eye socket, R=iris, T=hem trim
lich : String -> List ( Char, String ) -> BossSprite
lich name palette =
    { name = name
    , palette = palette
    , pixelSize = 8
    , frameA =
        [ "..........HHH.........."
        , ".........HHHHH........."
        , "........HHHHHHH........"
        , ".......HHHHHHHHH......."
        , "......HHHHHHHHHHH......"
        , ".......HHHFFHHHH......."
        , "......HHFFFFFFF........"
        , "......HFFERREFFE......."
        , "......HFFRRRRFFE......."
        , "......HFFERREFFE......."
        , ".......HFFFFFFF........"
        , "......BBBBBBBBBB......."
        , ".....BBBBBBBBBBBB......"
        , ".....BBSBBBBBBBSBB....."
        , "....BBBSBBBBBBBBSBB...."
        , "....BBBBBBBBBBBBBBB...."
        , "....BBBBBBBBBBBBBBB...."
        , "...BBBBBBBBBBBBBBBBB..."
        , "...BBBBBBBBBBBBBBBBBB.."
        , "..BBBBBBBBBBBBBBBBBBB.."
        , "..TBBBBBBBBBBBBBBBBBT.."
        , ".TTBBBBBBBBBBBBBBBBBTT."
        , ".TTTTTTTTTTTTTTTTTTTTT."
        , "......................."
        ]
    , frameB =
        [ "..........HHH.........."
        , ".........HHHHH........."
        , "........HHHHHHH........"
        , ".......HHHHHHHHH......."
        , "......HHHHHHHHHHH......"
        , ".......HHHFFHHHH......."
        , "......HHFFFFFFF........"
        , "......HFFESFEFE........"
        , "......HFFSSSSFE........"
        , "......HFFESFEFE........"
        , ".......HFFFFFFF........"
        , "......BBBBBBBBBB......."
        , ".....BBBBBBBBBBBB......"
        , ".....BBSBBBBBBBSBB....."
        , "....BBBSBBBBBBBBSBB...."
        , "....BBBBBBBBBBBBBBB...."
        , "....BBBBBBBBBBBBBBB...."
        , "...BBBBBBBBBBBBBBBBB..."
        , "...BBBBBBBBBBBBBBBBBB.."
        , "..BBBBBBBBBBBBBBBBBBB.."
        , "..TBBBBBBBBBBBBBBBBBT.."
        , ".TTBBBBBBBBBBBBBBBBBTT."
        , ".TTTTTTTTTTTTTTTTTTTTT."
        , "......................."
        ]
    }


-- Multi-Step Mage — Unit 3 (royal blue/gold trim)
multiStepMage : BossSprite
multiStepMage =
    lich "Multi-Step Mage"
        [ ( 'B', "#223388" )
        , ( 'S', "#111155" )
        , ( 'H', "#1a2266" )
        , ( 'F', "#ffeecc" )
        , ( 'E', "#fff5dd" )
        , ( 'R', "#ffcc00" )
        , ( 'T', "#660022" )
        ]


-- BEAST/PREDATOR shape — hunched four-legged predator, low stance, claws, fangs
-- B=body fur, D=dark fur, E=eye, P=pupil, C=claw, F=fang, S=shadow/underbelly
beast : String -> List ( Char, String ) -> BossSprite
beast name palette =
    { name = name
    , palette = palette
    , pixelSize = 8
    , frameA =
        [ "....BBBBB.............."
        , "...BBBBBBBBB..........."
        , "..BBBBBDDBBB..........."
        , "..BBBBDDDBBB..........."
        , "..BBBBBBBBBBB.........."
        , ".BBBEPPEBBBBBB........."
        , ".BBBPSSPBBBBDBB........"
        , ".BBBEPPEBBBBDBB........"
        , ".BBBBBBBBBBBBBB........"
        , ".BBBBBBBBBBBBBBB......."
        , "CBBBBBBBBBBBBBBBBB....."
        , "CBBBBBBBBBBBBBBBBBB...."
        , "CBBDDBBBBBBBBBBBBBB...."
        , ".BBDDBBBBBBBBBBBBBC...."
        , ".BBBBBBBBBBBBBBBBC....."
        , ".CBBBBBBBBBBBBBBC......"
        , "..BBBBBBBBBBBBBBB......"
        , "..SBBBB.....BBBBS......"
        , "..SBBBB.....BBBBS......"
        , "..CSBBB.....BBBSC......"
        , "..CCBB.......BBCC......"
        , "..CCSS.......SSCC......"
        , "...FFF.......FFF......."
        , "......................."
        ]
    , frameB =
        [ "......BBBBB............"
        , ".....BBBBBBBBB........."
        , "....BBBBBDDBBB........."
        , "....BBBBDDDBBB........."
        , "....BBBBBBBBBBB........"
        , "...BBBEPPEBBBBBB......."
        , "...BBBPSSPBBBBDBB......"
        , "...BBBEPPEBBBBDBB......"
        , "...BBBBBBBBBBBBBB......"
        , "...BBBBBBBBBBBBBBB....."
        , "..CBBBBBBBBBBBBBBBBB..."
        , "..CBBBBBBBBBBBBBBBBBB.."
        , "..CBBDDBBBBBBBBBBBBBB.."
        , "...BBDDBBBBBBBBBBBBBC.."
        , "...BBBBBBBBBBBBBBBBC..."
        , "...CBBBBBBBBBBBBBBC...."
        , "....BBBBBBBBBBBBBBB...."
        , "....SBBBB.....BBBBS...."
        , "....SBBBB.....BBBBS...."
        , "....CSBBB.....BBBSC...."
        , "....CCBB.......BBCC...."
        , "....CCSS.......SSCC...."
        , ".....FFF.......FFF....."
        , "......................."
        ]
    }


-- Percent Predator — Unit 4 (tawny orange, amber eyes)
percentPredator : BossSprite
percentPredator =
    beast "Percent Predator"
        [ ( 'B', "#aa6622" )
        , ( 'D', "#663311" )
        , ( 'E', "#ffeeaa" )
        , ( 'P', "#cc8800" )
        , ( 'C', "#331100" )
        , ( 'F', "#ffddbb" )
        , ( 'S', "#773300" )
        ]


-- Slope Stalker — Unit 5 (dark grey, pale eyes)
slopeStalker : BossSprite
slopeStalker =
    beast "Slope Stalker"
        [ ( 'B', "#444455" )
        , ( 'D', "#222233" )
        , ( 'E', "#ccdde0" )
        , ( 'P', "#99bbcc" )
        , ( 'C', "#111122" )
        , ( 'F', "#aabbcc" )
        , ( 'S', "#333344" )
        ]


-- SERPENT shape — coiled snake, diamond head, forked tongue, scale pattern
-- B=body scale A, D=body scale B, H=head, E=eye, T=tongue, S=shadow
serpent : String -> List ( Char, String ) -> BossSprite
serpent name palette =
    { name = name
    , palette = palette
    , pixelSize = 8
    , frameA =
        [ ".....HHHHHHH..........."
        , "....HHHHHHHHHH........."
        , "...HHHEHHHHHHHHH......."
        , "...HHHEHHHHHHHHHH......"
        , "...HHHHHHHHHHHHHH......"
        , "....HHHHHHHHHHHHH......"
        , "....HHHTTHHHHHHH......."
        , ".....HHTTHHHHHH........"
        , "......BDBDBBBB........."
        , ".....BDBDBDBDBBB......."
        , "....BDBDBDBDBDBBB......"
        , "....BDBDBDBDBDBDBB....."
        , "...BDBDBDBDBDBDBDBB...."
        , "...BDBDBDBDBDBDBDBB...."
        , "....BDBDBDBDBDBDBB....."
        , ".....BDBDBDBDBBB......."
        , "......BDBDBDBB........."
        , ".......BDBDBB.........."
        , ".......SSBDB..........."
        , "........SSSBD.........."
        , ".........SSBD.........."
        , "..........SSD.........."
        , "...........SS.........."
        , "......................."
        ]
    , frameB =
        [ ".....HHHHHHH..........."
        , "....HHHHHHHHHH........."
        , "...HHHEHHHHHHHHH......."
        , "...HHHEHHHHHHHHHH......"
        , "...HHHHHHHHHHHHHH......"
        , "....HHHHHHHHHHHHH......"
        , "....HHHTTHHHHHHH......."
        , ".....HTTHHHHHH........."
        , "......BDBDBBBB........."
        , ".....BDBDBDBDBBB......."
        , "....BDBDBDBDBDBBB......"
        , "....BDBDBDBDBDBDBB....."
        , "...BDBDBDBDBDBDBDBB...."
        , "...BDBDBDBDBDBDBDBB...."
        , "....BDBDBDBDBDBDBB....."
        , ".....BDBDBDBDBBB......."
        , "......BDBDBDBB........."
        , "......SBDBDBB.........."
        , ".......SSSBD..........."
        , "........SSSB..........."
        , ".........SSBD.........."
        , "..........SSD.........."
        , "...........SS.........."
        , "......................."
        ]
    }


-- System Serpent — Unit 6 (orange/copper, amber eyes)
systemSerpent : BossSprite
systemSerpent =
    serpent "System Serpent"
        [ ( 'B', "#bb6611" )
        , ( 'D', "#883300" )
        , ( 'H', "#cc7722" )
        , ( 'E', "#ffcc44" )
        , ( 'T', "#dd2200" )
        , ( 'S', "#441100" )
        ]


-- TITAN/OGRE shape — wide brutish unarmored humanoid, massive arms, small head
-- B=body, S=shadow, M=muscle highlight, E=eye, P=pupil, T=leg, C=claw/knuckle
titan : String -> List ( Char, String ) -> BossSprite
titan name palette =
    { name = name
    , palette = palette
    , pixelSize = 8
    , frameA =
        [ "......BBBBBBBBB........"
        , ".....BBBBBBBBBBB......."
        , "....BBBBBBBBBBBBB......"
        , "....BBBMMBBBBBMMBB....."
        , "....BBBMMBBBBBMMBB....."
        , "...BBBBBBBBBBBBBBBBB..."
        , "..BBBBBBBBBBBBBBBBBBB.."
        , "..BBBBBEPPEBBBEPPED...."
        , "..BBBBBPSSPBBBPSSPB...."
        , "..BBBBBEPPEBBBEPPED...."
        , "..BBBBBBBBBBBBBBBBBBB.."
        , ".BBBBBBBBBBBBBBBBBBBB.."
        , "CBBBBBBBBBBBBBBBBBBBBC."
        , "CBBBBBBBBBBBBBBBBBBBBC."
        , "CBBBBBBBBBBBBBBBBBBBC.."
        , ".CBBBBBBBBBBBBBBBBBBC.."
        , "..BBBBBBBBBBBBBBBBBBB.."
        , "..SBBBBBBBBBBBBBBBBBS.."
        , "..SBBBB.....SBBBBSS...."
        , "..TBBBB.....BBBBT......"
        , "..TSBBB.....BBBST......"
        , "..TTSBB.....BBSTT......"
        , "...TTTT.....TTTT......."
        , "......................."
        ]
    , frameB =
        [ "......BBBBBBBBB........"
        , ".....BBBBBBBBBBB......."
        , "....BBBBBBBBBBBBB......"
        , "....BBBMMBBBBBMMBB....."
        , "....BBBMMBBBBBMMBB....."
        , "...BBBBBBBBBBBBBBBBB..."
        , "..BBBBBBBBBBBBBBBBBBB.."
        , "..BBBBBEPPEBBBEPPED...."
        , "..BBBBBPBBPBBBPBBPB...."
        , "..BBBBBEPPEBBBEPPED...."
        , "..BBBBBBBBBBBBBBBBBBB.."
        , ".BBBBBBBBBBBBBBBBBBBB.."
        , "CBBBBBBBBBBBBBBBBBBBBC."
        , "CBBBBBBBBBBBBBBBBBBBBC."
        , "CBBBBBBBBBBBBBBBBBBBC.."
        , ".CBBBBBBBBBBBBBBBBBBC.."
        , "..BBBBBBBBBBBBBBBBBBB.."
        , "..SBBBBBBBBBBBBBBBBBS.."
        , "..SBBBB.....SBBBBSS...."
        , "..TBBBB.....BBBBT......"
        , "..TSBBB.....BBBST......"
        , "..TTSBB.....BBSTT......"
        , "...TTTT.....TTTT......."
        , "......................."
        ]
    }


-- Theorem Troll — Unit 7 (mossy green/brown, unarmored)
theoremTroll : BossSprite
theoremTroll =
    titan "Theorem Troll"
        [ ( 'B', "#446633" )
        , ( 'S', "#223311" )
        , ( 'M', "#668844" )
        , ( 'E', "#ffeecc" )
        , ( 'P', "#996622" )
        , ( 'T', "#331100" )
        , ( 'C', "#221100" )
        ]


-- Volume Viper — Unit 8 (purple/dark-purple, orange eyes)
volumeViper : BossSprite
volumeViper =
    serpent "Volume Viper"
        [ ( 'B', "#551188" )
        , ( 'D', "#330066" )
        , ( 'H', "#7722aa" )
        , ( 'E', "#ff8800" )
        , ( 'T', "#ff4400" )
        , ( 'S', "#220044" )
        ]


-- Scatter Shade — Unit 9 (grey/silver, cyan glow eyes)
scatterShade : BossSprite
scatterShade =
    ghost "Scatter Shade"
        [ ( 'B', "#778899" )
        , ( 'S', "#445566" )
        , ( 'E', "#aaffff" )
        , ( 'W', "#eeffff" )
        , ( 'P', "#00ddff" )
        , ( 'T', "#223344" )
        ]


-- Act 3 MegaBoss — Pre-Algebra Lich (keep as-is — full dark purple/bone, raised staff arm)
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
        [ "...........HHH........."
        , "..........HHHHH........"
        , ".........HHHHHHH......."
        , "........HHHHHHHHH......"
        , ".......HHHHHHHHHHH....."
        , "........HHHFFHHH......."
        , ".......HHFFFFFFFF......"
        , "..M....HFFEERREFFE....."
        , "..MA...HFFRRRRRRFE....."
        , "..MA...HFFEERREFFE....."
        , "..M....HFFFFFFFF......."
        , "..AAA..BBBBBBBBBBB....."
        , "..AAA.BBBBBBBBBBBBB...."
        , ".....BBBSBBBBBBBSBB...."
        , "....BBBSBBBBBBBBSBB...."
        , "....BBBBBBBBBBBBBBB...."
        , "....BBBBBBBBBBBBBBB...."
        , "...BBBBBBBBBBBBBBBBB..."
        , "...BBBBBBBBBBBBBBBBBB.."
        , "..BBBBBBBBBBBBBBBBBBB.."
        , "..TBBBBBBBBBBBBBBBBBT.."
        , ".TTBBBBBBBBBBBBBBBBBTT."
        , ".TTTTTTTTTTTTTTTTTTTTT."
        , "......................  "
        ]
    , frameB =
        [ "...........HHH........."
        , "..........HHHHH........"
        , ".........HHHHHHH......."
        , "........HHHHHHHHH......"
        , ".......HHHHHHHHHHH....."
        , "........HHHFFHHH......."
        , ".......HHFFFFFFFF......"
        , "..M....HFFEESFEFE...."
        , "..MA...HFFSSSSFFE...."
        , "..MA...HFFEESFEFE...."
        , "..M....HFFFFFFFF......."
        , "..AAA..BBBBBBBBBBB....."
        , "..AAA.BBBBBBBBBBBBB...."
        , ".....BBBSBBBBBBBSBB...."
        , "....BBBSBBBBBBBBSBB...."
        , "....BBBBBBBBBBBBBBB...."
        , "....BBBBBBBBBBBBBBB...."
        , "...BBBBBBBBBBBBBBBBB..."
        , "...BBBBBBBBBBBBBBBBBB.."
        , "..BBBBBBBBBBBBBBBBBBB.."
        , "..TBBBBBBBBBBBBBBBBBT.."
        , ".TTBBBBBBBBBBBBBBBBBTT."
        , ".TTTTTTTTTTTTTTTTTTTTT."
        , "......................  "
        ]
    }
