module Sprite.Act2 exposing (spriteFor)

import Types exposing (BossSprite, Course(..), UnitId, UnitSlot(..))


spriteFor : UnitId -> BossSprite
spriteFor uid =
    case ( uid.course, uid.unit ) of
        ( Course2, Unit 1 ) -> senseGolem
        ( Course2, Unit 2 ) -> monomialBeast
        ( Course2, Unit 3 ) -> equationShade
        ( Course2, Unit 4 ) -> ratioWraith
        ( Course2, Unit 5 ) -> slopeSpecter
        ( Course2, Unit 6 ) -> angleFiend
        ( Course2, Unit 7 ) -> volumeTitan
        ( Course2, Unit 8 ) -> probabilityLich
        ( Course2, MegaBoss ) -> proportionHydra
        _ -> senseGolem


-- Sense Golem — Unit 1 (same frames as numberGolem, blue/slate palette)
-- Palette: G=blue-grey body, D=dark shadow, W=white eyes, R=red pupils, B=slate base, Y=accent
senseGolem : BossSprite
senseGolem =
    { name = "Sense Golem"
    , palette =
        [ ( 'G', "#5577aa" )
        , ( 'D', "#334466" )
        , ( 'W', "#ddeeff" )
        , ( 'R', "#2244cc" )
        , ( 'B', "#334455" )
        , ( 'Y', "#6699cc" )
        ]
    , pixelSize = 8
    , frameA =
        [ ".......GGGGGGGG........"
        , "......GGGGGGGGGGG......"
        , ".....GGGDDGGGDDGGG....."
        , ".....GGGDDGGGDDGGG....."
        , "....GGGGGGGGGGGGGGGG..."
        , "....GGYWWGGGGGWWYGGG..."
        , "....GGWRRWGGGGWRRWGG..."
        , "....GGWRRWGGGGWRRWGG..."
        , "....GGYWWGGGGGWWYGG...."
        , "....GGGGGGGGGGGGGGGG..."
        , "....GGGDDDDDDDDGGGGG..."
        , ".....GGGGGGGGGGGGG....."
        , "......DDDGGGGGDDD......"
        , ".....GGGGGGGGGGGGG....."
        , "....GGGGGGGGGGGGGGG...."
        , "...DDGGGGGGGGGGGGGDD..."
        , "...GGGGGDDDDDDDGGGGG..."
        , "...GGGDDDDDDDDDDDGG...."
        , "...BBBGGGGGGGGGGGBBB..."
        , "...BBBDDDDDDDDDDDBB...."
        , "....BBBBBBBBBBBBBBB...."
        , ".....BBBBBBBBBBBBB....."
        , "......DDDDDDDDDDD......"
        , "......................  "
        ]
    , frameB =
        [ ".......GGGGGGGG........"
        , "......GGGGGGGGGGG......"
        , ".....GGGDDGGGDDGGG....."
        , ".....GGGDDGGGDDGGG....."
        , "....GGGGGGGGGGGGGGGG..."
        , "....GGYWWGGGGGWWYGGG..."
        , "....GGWDDWGGGGWDDWGG..."
        , "....GGWDDWGGGGWDDWGG..."
        , "....GGYWWGGGGGWWYGG...."
        , "....GGGGGGGGGGGGGGGG..."
        , "....GGGDDDDDDDDGGGGG..."
        , ".....GGGGGGGGGGGGG....."
        , "......DDDGGGGGDDD......"
        , ".....GGGGGGGGGGGGG....."
        , "....GGGGGGGGGGGGGGG...."
        , "...DDGGGGGGGGGGGGGDD..."
        , "...GGGGGDDDDDDDGGGGG..."
        , "...GGGDDDDDDDDDDDGG...."
        , "...BBBGGGGGGGGGGGBBB..."
        , "...BBBDDDDDDDDDDDBB...."
        , "....BBBBBBBBBBBBBBB...."
        , ".....BBBBBBBBBBBBB....."
        , "......DDDDDDDDDDD......"
        , "......................  "
        ]
    }


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


-- Monomial Beast — Unit 2 (dark brown, red eyes)
monomialBeast : BossSprite
monomialBeast =
    beast "Monomial Beast"
        [ ( 'B', "#553322" )
        , ( 'D', "#332211" )
        , ( 'E', "#ffcccc" )
        , ( 'P', "#cc2200" )
        , ( 'C', "#221100" )
        , ( 'F', "#eebbaa" )
        , ( 'S', "#442211" )
        ]


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


-- Equation Shade — Unit 3 (dark grey, pale green glow)
equationShade : BossSprite
equationShade =
    ghost "Equation Shade"
        [ ( 'B', "#445544" )
        , ( 'S', "#223322" )
        , ( 'E', "#aaccaa" )
        , ( 'W', "#eeffee" )
        , ( 'P', "#44ff88" )
        , ( 'T', "#112211" )
        ]


-- Ratio Wraith — Unit 4 (dark blue/black, red pupils)
ratioWraith : BossSprite
ratioWraith =
    ghost "Ratio Wraith"
        [ ( 'B', "#1a1a44" )
        , ( 'S', "#0a0a22" )
        , ( 'E', "#6688bb" )
        , ( 'W', "#aabbdd" )
        , ( 'P', "#cc2222" )
        , ( 'T', "#050510" )
        ]


-- Slope Specter — Unit 5 (pale blue, white glow)
slopeSpecter : BossSprite
slopeSpecter =
    ghost "Slope Specter"
        [ ( 'B', "#88aacc" )
        , ( 'S', "#446688" )
        , ( 'E', "#ddeeff" )
        , ( 'W', "#ffffff" )
        , ( 'P', "#aaddff" )
        , ( 'T', "#224466" )
        ]


-- FIEND shape — horned demonic humanoid, bat wings, clawed hands raised, glowing eyes
-- B=body, S=shadow, W=wing, H=horn, E=eye, R=eye glow, C=claw, D=dark detail
fiend : String -> List ( Char, String ) -> BossSprite
fiend name palette =
    { name = name
    , palette = palette
    , pixelSize = 8
    , frameA =
        [ "....H.........H........"
        , "....HH.......HH........"
        , "...HHHBBBBBHHH........."
        , "...BBBBBBBBBBBB........"
        , "..WBBBBBBBBBBBBBW......"
        , "..WBBEPPEBBBEPPED......"
        , "..WBBPRRPBBBPRRPD......"
        , "..WBBEPPEBBBEPPED......"
        , "..WBBBBBBBBBBBBBW......"
        , "..WWBBBBBBBBBBBWW......"
        , "..WWWBBBBBBBBBWWWW....."
        , "...WWWBBBBBBBBWWW......"
        , "...CBBBBBBBBBBBBC......"
        , "...CBBSBBBBBBSBC......."
        , "....BBBBBBBBBBBB......."
        , "....BBBBBBBBBBBB......."
        , "....BBBBBBBBBBBBB......"
        , "...CBBBB.....BBBBC....."
        , "..CCBBBB.....BBBBCC...."
        , "..CCSSBB.....BBSSCC...."
        , "..CCBBBB.....BBBBCC...."
        , "..CCCBB.......BBCCC...."
        , "...CCCC.......CCCC....."
        , "......................."
        ]
    , frameB =
        [ "....H.........H........"
        , "....HH.......HH........"
        , "...HHHBBBBBHHH........."
        , "...BBBBBBBBBBBB........"
        , "..WBBBBBBBBBBBBBW......"
        , "..WBBEPPEBBBEPPED......"
        , "..WBBPBBPBBBPBBPD......"
        , "..WBBEPPEBBBEPPED......"
        , "..WBBBBBBBBBBBBBW......"
        , "..WWBBBBBBBBBBBWW......"
        , "..WWWWBBBBBBBWWWWW....."
        , "...WWWWBBBBBBWWWW......"
        , "...CBBBBBBBBBBBBC......"
        , "...CBBSBBBBBBSBC......."
        , "....BBBBBBBBBBBB......."
        , "....BBBBBBBBBBBB......."
        , "....BBBBBBBBBBBBB......"
        , "...CBBBB.....BBBBC....."
        , "..CCBBBB.....BBBBCC...."
        , "..CCSSBB.....BBSSCC...."
        , "..CCBBBB.....BBBBCC...."
        , "..CCCBB.......BBCCC...."
        , "...CCCC.......CCCC....."
        , "......................."
        ]
    }


-- Angle Fiend — Unit 6 (crimson/dark-red, orange eyes)
angleFiend : BossSprite
angleFiend =
    fiend "Angle Fiend"
        [ ( 'B', "#881111" )
        , ( 'S', "#440000" )
        , ( 'W', "#661100" )
        , ( 'H', "#330000" )
        , ( 'E', "#ffddaa" )
        , ( 'R', "#ff6600" )
        , ( 'C', "#220000" )
        , ( 'D', "#550000" )
        , ( 'P', "#ff4400" )
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


-- Volume Titan — Unit 7 (dark green/olive, unarmored)
volumeTitan : BossSprite
volumeTitan =
    titan "Volume Titan"
        [ ( 'B', "#446633" )
        , ( 'S', "#223311" )
        , ( 'M', "#558844" )
        , ( 'E', "#ccffcc" )
        , ( 'P', "#33aa44" )
        , ( 'T', "#112200" )
        , ( 'C', "#111100" )
        ]


-- LICH/MAGE shape — tall pointed hat, narrow shoulders, wide robe hem, staff arm
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


-- Probability Lich — Unit 8 (dark purple/bone)
probabilityLich : BossSprite
probabilityLich =
    lich "Probability Lich"
        [ ( 'B', "#3a1a55" )
        , ( 'S', "#1a0a2a" )
        , ( 'H', "#2a0a44" )
        , ( 'F', "#ccbbdd" )
        , ( 'E', "#eeddff" )
        , ( 'R', "#bb44ff" )
        , ( 'T', "#100820" )
        ]


-- HYDRA MegaBoss — three-headed serpentine creature, pixelSize=9
-- B=body, D=dark scales, H=head, E=eye, N=neck, S=shadow, T=tail tip
proportionHydra : BossSprite
proportionHydra =
    { name = "Proportion Hydra"
    , palette =
        [ ( 'B', "#116655" )
        , ( 'D', "#0a3d33" )
        , ( 'H', "#228866" )
        , ( 'E', "#ffee00" )
        , ( 'N', "#1a5544" )
        , ( 'S', "#062820" )
        , ( 'T', "#083828" )
        ]
    , pixelSize = 9
    , frameA =
        [ "..H....HHHHH....H......"
        , ".HHH..HHHHHHH..HHH....."
        , ".HEHN.HHHEHHHH.NHEH...."
        , ".HHHNN.HHHHHH.NNHHH...."
        , "..HNNN.BHHHHB.NNNHH...."
        , "..BNNNBBHHHBBBNNNB....."
        , "...BNNNBBDBBBNNNB......"
        , "..DBBNNNNBBBNNNNBBD...."
        , ".DDBBBNNNNBNNNNBBBD...."
        , "DDDBBBBBNNBNNBBBBBDDD.."
        , "DBBBBBBBBBBBBBBBBBBBD.."
        , ".BDBDBDBDBBBDBDBDBDB..."
        , "..BDBDBDBBBBDBDBDB....."
        , "...BDBDBBBBBDBDB......."
        , "....BDBBBBBBBDB........"
        , "....DBBBBBBBBD........."
        , "....DBBBBBBBD.........."
        , "....TBBBBBBBBT........."
        , "....TBBDDBBBBT........."
        , "....TBBDDBBBBT........."
        , ".....TBBBBBBT.........."
        , ".....TTBBBBTT.........."
        , "......TTSSTT..........."
        , "......................."
        ]
    , frameB =
        [ "..H....HHHHH....H......"
        , ".HHH..HHHHHHH..HHH....."
        , ".HENHN.HHHEHH.NHENH...."
        , ".HHHNN.HHHHHH.NNHHH...."
        , "..HNNNN.HHHHB.NNHHH...."
        , "..BNNNNBHHHBBBNNNNB...."
        , "...BNNNNBBDBBNNNNB....."
        , "..DBBNNNNNBBNNNNNBBD..."
        , ".DDBBBNNNNBNNNNBBBD...."
        , "DDDBBBBBNNBNNBBBBBDDD.."
        , "DBBBBBBBBBBBBBBBBBBBD.."
        , ".BDBDBDBDBBBDBDBDBDB..."
        , "..BDBDBDBBBBDBDBDB....."
        , "...BDBDBBBBBDBDB......."
        , "....BDBBBBBBBDB........"
        , "....DBBBBBBBBD........."
        , "....DBBBBBBBD.........."
        , "....TBBBBBBBBT........."
        , "....TBBDDBBBBT........."
        , "....TBBDDBBBBT........."
        , ".....TBBBBBBT.........."
        , ".....TTBBBBTT.........."
        , "......TTSSTT..........."
        , "......................."
        ]
    }
