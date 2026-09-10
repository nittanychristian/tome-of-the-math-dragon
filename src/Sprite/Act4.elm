module Sprite.Act4 exposing (spriteFor)

import Types exposing (BossSprite, Course(..), UnitId, UnitSlot(..))


spriteFor : UnitId -> BossSprite
spriteFor uid =
    case ( uid.course, uid.unit ) of
        ( Algebra1, Unit 1 ) -> algebraOgre
        ( Algebra1, Unit 2 ) -> equationWraith
        ( Algebra1, Unit 3 ) -> functionFiend
        ( Algebra1, Unit 4 ) -> linearLeviathan
        ( Algebra1, Unit 5 ) -> systemSpecter
        ( Algebra1, Unit 6 ) -> exponentElemental
        ( Algebra1, Unit 7 ) -> polyPredator
        ( Algebra1, Unit 8 ) -> quadraShade
        ( Algebra1, Unit 9 ) -> regressionRevenant
        ( Algebra1, Unit 10 ) -> rationalReaper
        ( Algebra1, Unit 11 ) -> radicalRider
        ( Algebra1, Unit 12 ) -> varianceViper
        ( Algebra1, MegaBoss ) -> algebraTitan
        _ -> algebraTitan


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


-- Algebra Ogre — Unit 1 (sickly yellow-green, unarmored)
algebraOgre : BossSprite
algebraOgre =
    titan "Algebra Ogre"
        [ ( 'B', "#778833" )
        , ( 'S', "#445511" )
        , ( 'M', "#99bb44" )
        , ( 'E', "#ffeecc" )
        , ( 'P', "#aacc00" )
        , ( 'T', "#223300" )
        , ( 'C', "#112200" )
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


-- Equation Wraith — Unit 2 (blood red/crimson, pale eyes)
equationWraith : BossSprite
equationWraith =
    ghost "Equation Wraith"
        [ ( 'B', "#881122" )
        , ( 'S', "#440011" )
        , ( 'E', "#ffcccc" )
        , ( 'W', "#ffeeee" )
        , ( 'P', "#ddcccc" )
        , ( 'T', "#220000" )
        ]


-- FIEND shape — horned demonic humanoid, bat wings, clawed hands raised, glowing eyes
-- B=body, S=shadow, W=wing, H=horn, E=eye, R=eye glow, C=claw, D=dark detail, P=pupil
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


-- Function Fiend — Unit 3 (emerald/black, white eyes)
functionFiend : BossSprite
functionFiend =
    fiend "Function Fiend"
        [ ( 'B', "#115522" )
        , ( 'S', "#002211" )
        , ( 'W', "#002200" )
        , ( 'H', "#001100" )
        , ( 'E', "#eeffee" )
        , ( 'R', "#ffffff" )
        , ( 'C', "#001100" )
        , ( 'D', "#003311" )
        , ( 'P', "#aaffaa" )
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


-- Linear Leviathan — Unit 4 (deep navy/dark-blue, cyan eyes)
linearLeviathan : BossSprite
linearLeviathan =
    serpent "Linear Leviathan"
        [ ( 'B', "#112266" )
        , ( 'D', "#0a1144" )
        , ( 'H', "#1a3388" )
        , ( 'E', "#00eeff" )
        , ( 'T', "#0088cc" )
        , ( 'S', "#050a22" )
        ]


-- System Specter — Unit 5 (bone white/cream, grey pupils)
systemSpecter : BossSprite
systemSpecter =
    ghost "System Specter"
        [ ( 'B', "#ddddcc" )
        , ( 'S', "#aaaaaa" )
        , ( 'E', "#ffffff" )
        , ( 'W', "#ffffff" )
        , ( 'P', "#999999" )
        , ( 'T', "#888888" )
        ]


-- ELEMENTAL shape — swirling asymmetric energy mass, core + radiating wisps
-- C=core glow, B=bright inner, W=wisp outer, S=shadow/dark wisp, G=glow accent
elemental : String -> List ( Char, String ) -> BossSprite
elemental name palette =
    { name = name
    , palette = palette
    , pixelSize = 8
    , frameA =
        [ "..........W............"
        , ".........WWW..........."
        , "......WWWWWWWWWW......."
        , ".....WWWWBBBBWWWWW....."
        , "....WWWWBBBBBBWWWWW...."
        , "....WWWBBBCCCBBBWWW...."
        , "...WWWBBBCCGCCBBBWWWW.."
        , "...WWWBBBCCGCCBBBWWW..."
        , "...WWWWBBBCCCBBBWWWWW.."
        , "....WWWWBBBBBBBWWWWW..."
        , ".....WWWWWWWWWWWWWW...."
        , "......WWWWWWWWWWWWWW..."
        , ".....SWWWWWWWWWWWWS...."
        , "....SWWWWWWWWWWWWWSS..."
        , "....SWWWWWWWWWWWWSS...."
        , ".....SWWWWWWWWWWSS....."
        , "......SWWWWWWWWSS......"
        , ".....SSSWWWWWWSSS......"
        , "....SSWWW...WWWSS......"
        , "...SSW.........WSS....."
        , "..SS............SS....."
        , "...SS..........SS......"
        , "....SSS......SSS......."
        , "......................."
        ]
    , frameB =
        [ "............W.........."
        , "...........WWW........."
        , "......WWWWWWWWWWW......"
        , ".....WWWWBBBBWWWWW....."
        , "....WWWWBBBBBBWWWWWW..."
        , "....WWWBBBCCCBBBWWWW..."
        , "...WWWWBBBCCGCCBBBWWW.."
        , "...WWWBBBCCGCCBBBWWWWW."
        , "...WWWWBBBCCCBBBWWWWW.."
        , "....WWWWBBBBBBBWWWWW..."
        , ".....WWWWWWWWWWWWWWW..."
        , "......WWWWWWWWWWWWWWW.."
        , ".....SWWWWWWWWWWWWSS..."
        , "....SWWWWWWWWWWWWSS...."
        , "....SWWWWWWWWWWWSS....."
        , ".....SWWWWWWWWSS......."
        , "......SWWWWWWSS........"
        , ".....SSWWWWWWSS........"
        , "....SSWWW...WWSS......."
        , "...SSW.........WSS....."
        , "..SS............SS....."
        , "...SS..........SS......"
        , "....SSS......SSS......."
        , "......................."
        ]
    }


-- Exponent Elemental — Unit 6 (orange/gold fire)
exponentElemental : BossSprite
exponentElemental =
    elemental "Exponent Elemental"
        [ ( 'C', "#ffffff" )
        , ( 'G', "#ffff88" )
        , ( 'B', "#ffaa00" )
        , ( 'W', "#cc5500" )
        , ( 'S', "#662200" )
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


-- Poly Predator — Unit 7 (dark purple, yellow eyes)
polyPredator : BossSprite
polyPredator =
    beast "Poly Predator"
        [ ( 'B', "#442266" )
        , ( 'D', "#220044" )
        , ( 'E', "#ffeeaa" )
        , ( 'P', "#ffcc00" )
        , ( 'C', "#110022" )
        , ( 'F', "#ccbbee" )
        , ( 'S', "#331155" )
        ]


-- Quadra Shade — Unit 8 (pitch black, red slit eyes)
quadraShade : BossSprite
quadraShade =
    ghost "Quadra Shade"
        [ ( 'B', "#111111" )
        , ( 'S', "#050505" )
        , ( 'E', "#440000" )
        , ( 'W', "#880000" )
        , ( 'P', "#ff0000" )
        , ( 'T', "#020202" )
        ]


-- Regression Revenant — Unit 9 (dark teal, pale glow)
regressionRevenant : BossSprite
regressionRevenant =
    ghost "Regression Revenant"
        [ ( 'B', "#115544" )
        , ( 'S', "#082a22" )
        , ( 'E', "#88ddcc" )
        , ( 'W', "#ccffee" )
        , ( 'P', "#aaddcc" )
        , ( 'T', "#041510" )
        ]


-- REAPER shape — skeletal robed figure, scythe, hollow eyes, flowing robe
-- B=robe, S=shadow/dark, F=bone/face, E=eye socket, H=hood, K=scythe blade, L=scythe handle
reaper : String -> List ( Char, String ) -> BossSprite
reaper name palette =
    { name = name
    , palette = palette
    , pixelSize = 8
    , frameA =
        [ ".....HHHHHHHH.........."
        , "....HHHHHHHHHH........."
        , "....HHHFFFHHHH........."
        , "....HHFFFFFFF.........."
        , "....HHFFEEFFF.........."
        , "....HHFFEEFFF.........."
        , ".....HHFFFFFF.........."
        , ".....HHHHHHHHH........."
        , ".K...BBBBBBBBBB........"
        , "KK...BBBBBBBBBBB......."
        , "KKKK.BBBBBBBBBBB......."
        , ".LKKKBBBSBBBBBBB......."
        , "..LLL.BBBSBBBBBB......."
        , "...LLL.BBBBBBBBBB......"
        , "....LL..BBBBBBBBB......"
        , "....LL..BBBBBBBBB......"
        , "....LL..BBBBBBBBB......"
        , ".....L..BBBSBBBB......."
        , ".....L.BBBBBBBBB......."
        , "......BBBBBBBBBB......."
        , "......SBBBBBBBBB......."
        , ".....SSBBBBBBBBBB......"
        , "....SSSSSSSSSSSSS......"
        , "......................."
        ]
    , frameB =
        [ ".....HHHHHHHH.........."
        , "....HHHHHHHHHH........."
        , "....HHHFFFHHHH........."
        , "....HHFFFFFFF.........."
        , "....HHFFBBFFF.........."
        , "....HHFFBBFFF.........."
        , ".....HHFFFFFF.........."
        , ".....HHHHHHHHH........."
        , ".K...BBBBBBBBBB........"
        , "KK...BBBBBBBBBBB......."
        , "KKKK.BBBBBBBBBBB......."
        , ".LKKKBBBSBBBBBBB......."
        , "..LLL.BBBSBBBBBB......."
        , "...LLL.BBBBBBBBBB......"
        , "....LL..BBBBBBBBB......"
        , "....LL..BBBBBBBBB......"
        , "....LL..BBBBBBBBB......"
        , ".....L..BBBSBBBB......."
        , ".....L.BBBBBBBBB......."
        , "......BBBBBBBBBB......."
        , "......SBBBBBBBBB......."
        , ".....SSBBBBBBBBBB......"
        , "....SSSSSSSSSSSSS......"
        , "......................."
        ]
    }


-- Rational Reaper — Unit 10 (bone/dark-grey, green glow eyes)
rationalReaper : BossSprite
rationalReaper =
    reaper "Rational Reaper"
        [ ( 'B', "#333322" )
        , ( 'S', "#1a1a11" )
        , ( 'F', "#ccbb99" )
        , ( 'E', "#00ff88" )
        , ( 'H', "#221100" )
        , ( 'K', "#ccccaa" )
        , ( 'L', "#886644" )
        ]


-- KNIGHT shape — armored humanoid, distinct helmet, broad pauldrons, wide stance
-- B=armor body, S=shadow, H=helm, E=eye slit, R=eye glow, P=pauldron, T=boot
knight : String -> List ( Char, String ) -> BossSprite
knight name palette =
    { name = name
    , palette = palette
    , pixelSize = 8
    , frameA =
        [ "......PPPPPPPPPPP......"
        , ".....PPPPPPPPPPPPP....."
        , "....PPPPPHHHHHHPPPPP..."
        , "....PPPPHHHHHHHPPPP...."
        , ".....PPHHHHHHHHHPP....."
        , ".....PPHEEEEEEEHPP....."
        , ".....PPHERRRREHPP......"
        , ".....PPHEEEEEEEHPP....."
        , ".....PPHHHHHHHHHPP....."
        , "....BBBBBBBBBBBBBBBB..."
        , "...BBBBBBBBBBBBBBBBBB.."
        , "...BBBSSBBBBBBSSBBBB..."
        , "...BBBBBBBBBBBBBBBB...."
        , "...BBBBBBBBBBBBBBBBB..."
        , "....BBBBBBBBBBBBBBB...."
        , "....BBBBBBBBBBBBBBB...."
        , "....BBBSSSSSSSSBBBB...."
        , "....BBBBBBBBBBBBBB....."
        , "....TBBBB.....BBBBT...."
        , "....TBBBB.....BBBBT...."
        , "....TSSBB.....BSSST...."
        , "....TTTBB.....BBBTT...."
        , ".....TTTT.....TTTT....."
        , "......................."
        ]
    , frameB =
        [ "......PPPPPPPPPPP......"
        , ".....PPPPPPPPPPPPP....."
        , "....PPPPPHHHHHHPPPPP..."
        , "....PPPPHHHHHHHPPPP...."
        , ".....PPHHHHHHHHHPP....."
        , ".....PPHEEEEEEEHPP....."
        , ".....PPHEBBBBEHPP......"
        , ".....PPHEEEEEEEHPP....."
        , ".....PPHHHHHHHHHPP....."
        , "....BBBBBBBBBBBBBBBB..."
        , "...BBBBBBBBBBBBBBBBBB.."
        , "...BBBSSBBBBBBSSBBBB..."
        , "...BBBBBBBBBBBBBBBB...."
        , "...BBBBBBBBBBBBBBBBB..."
        , "....BBBBBBBBBBBBBBB...."
        , "....BBBBBBBBBBBBBBB...."
        , "....BBBSSSSSSSSBBBB...."
        , "....BBBBBBBBBBBBBB....."
        , "....TBBBB.....BBBBT...."
        , "....TBBBB.....BBBBT...."
        , "....TSSBB.....BSSST...."
        , "....TTTBB.....BBBTT...."
        , ".....TTTT.....TTTT....."
        , "......................."
        ]
    }


-- Radical Rider — Unit 11 (black/silver, purple glow)
radicalRider : BossSprite
radicalRider =
    knight "Radical Rider"
        [ ( 'B', "#222233" )
        , ( 'S', "#111122" )
        , ( 'H', "#333344" )
        , ( 'E', "#ddbbff" )
        , ( 'R', "#aa44ff" )
        , ( 'P', "#444455" )
        , ( 'T', "#000011" )
        ]


-- Variance Viper — Unit 12 (crimson/dark, orange eyes)
varianceViper : BossSprite
varianceViper =
    serpent "Variance Viper"
        [ ( 'B', "#881122" )
        , ( 'D', "#550011" )
        , ( 'H', "#aa1133" )
        , ( 'E', "#ff8800" )
        , ( 'T', "#ff4400" )
        , ( 'S', "#330000" )
        ]


-- Act 4 MegaBoss — Algebra Titan (keep as-is — dark iron with red glow, widest shoulders)
algebraTitan : BossSprite
algebraTitan =
    { name = "Algebra Titan"
    , palette =
        [ ( 'B', "#333344" )
        , ( 'S', "#111122" )
        , ( 'P', "#445566" )
        , ( 'H', "#222233" )
        , ( 'E', "#ffaaaa" )
        , ( 'R', "#ff2222" )
        , ( 'T', "#000011" )
        , ( 'G', "#cc3300" )
        , ( 'X', "#551100" )
        ]
    , pixelSize = 8
    , frameA =
        [ "..PPPP..BBBB..PPPP...."
        , ".PPPPPPBBBBBBPPPPPP..."
        , ".PPPPPPBBBBBBPPPPPP..."
        , ".PPPPPPBBBBBBPPPPPP..."
        , "..PPPSSBBBBBBSSPPP...."
        , "...SSSBHHHHHHBSSS....."
        , "....BBHHHHHHHHHBB....."
        , "....BHEEEEEEEEHB......"
        , "....BHERRRRRREHB......"
        , "....BHEEEEEEEEHB......"
        , "....BBHHHHHHHHHBB....."
        , "....BBBBBBBBBBBBBB...."
        , "...BBBBBBBBBBBBBBBB..."
        , "...BBBGXBBBBBXGBBB...."
        , "...BBBBBBBBBBBBBBB...."
        , "...BBBBBBBBBBBBBBB...."
        , "...BBBBGGGGGGGBBBB...."
        , "....BBBBBBBBBBBBBB...."
        , "....XBBB......BBBX...."
        , "...XXBBB......BBBXX..."
        , "...XXBBB......BBBXX..."
        , "...XXSSS......SSSXX..."
        , "....XXXX......XXXX...."
        , "......................  "
        ]
    , frameB =
        [ "..PPPP..BBBB..PPPP...."
        , ".PPPPPPBBBBBBPPPPPP..."
        , ".PPPPPPBBBBBBPPPPPP..."
        , ".PPPPPPBBBBBBPPPPPP..."
        , "..PPPSSBBBBBBSSPPP...."
        , "...SSSBHHHHHHBSSS....."
        , "....BBHHHHHHHHHBB....."
        , "....BHEEEEEEEEHB......"
        , "....BHESSSSSEHB......."
        , "....BHEEEEEEEEHB......"
        , "....BBHHHHHHHHHBB....."
        , "....BBBBBBBBBBBBBB...."
        , "...BBBBBBBBBBBBBBBB..."
        , "...BBBGXBBBBBXGBBB...."
        , "...BBBBBBBBBBBBBBB...."
        , "...BBBBBBBBBBBBBBB...."
        , "...BBBBGGGGGGGBBBB...."
        , "....BBBBBBBBBBBBBB...."
        , "....XBBB......BBBX...."
        , "...XXBBB......BBBXX..."
        , "...XXBBB......BBBXX..."
        , "...XXSSS......SSSXX..."
        , "....XXXX......XXXX...."
        , "......................  "
        ]
    }
