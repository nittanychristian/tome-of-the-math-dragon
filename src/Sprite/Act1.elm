module Sprite.Act1 exposing
    ( numberGolem
    , integerImp
    , fractionPhantom
    , expressionElemental
    , equationKnight
    , ratioSerpent
    , geometryGargoyle
    , statsSphinx
    , act1MegaBoss
    , spriteFor
    )

import Types exposing (BossSprite, Course(..), UnitId, UnitSlot(..))


spriteFor : UnitId -> BossSprite
spriteFor uid =
    case ( uid.course, uid.unit ) of
        ( Course1, Unit 1 ) -> numberGolem
        ( Course1, Unit 2 ) -> integerImp
        ( Course1, Unit 3 ) -> fractionPhantom
        ( Course1, Unit 4 ) -> expressionElemental
        ( Course1, Unit 5 ) -> equationKnight
        ( Course1, Unit 6 ) -> ratioSerpent
        ( Course1, Unit 7 ) -> geometryGargoyle
        ( Course1, Unit 8 ) -> statsSphinx
        ( Course1, MegaBoss ) -> act1MegaBoss
        _ -> numberGolem


-- Number Golem — Unit 1 boss (keep as-is)
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


-- IMP shape — small mischievous creature with pointy horns, claws, curling tail
-- B=body, S=dark shadow, H=horn, E=eye white, P=pupil, C=claw/tail, F=face
imp : String -> List ( Char, String ) -> BossSprite
imp name palette =
    { name = name
    , palette = palette
    , pixelSize = 8
    , frameA =
        [ "..H...........H........"
        , "..HH.........HH........"
        , "...HH.......HH........."
        , "...HBBBBBBBBH.........."
        , "...BBBBBBBBBBB........."
        , "..BBBBBBBBBBBBB........"
        , "..BBEPPEBBBEPPED......."
        , "..BBPSSPBBBPSSPB......."
        , "..BBEPPEBBBEPPED......."
        , "..BBBBBBBBBBBBB........"
        , "..BBBBBBBBBBBBBB......."
        , "...SSBBBBBBBBSS........"
        , "...BBBBFBBBBBB........."
        , "....BBBBBBBBB.........."
        , "....BBBBBBBBB.......C.."
        , "....BBBBBBBBBBBBBBCC..."
        , "...CBBBB....BBBBBBBC..."
        , "..CCBB........BBCC....."
        , "..CCBB........BBCC....."
        , "..CBBB........BBBC....."
        , "..CCBB........BBCC....."
        , "..CSBB........BBSC....."
        , "..CCCC........CCCC....."
        , "......................."
        ]
    , frameB =
        [ "..H...........H........"
        , "..HH.........HH........"
        , "...HH.......HH........."
        , "...HBBBBBBBBH.........."
        , "...BBBBBBBBBBB........."
        , "..BBBBBBBBBBBBB........"
        , "..BBEPPEBBBEPPED......."
        , "..BBPBBPBBBPBBPB......."
        , "..BBEPPEBBBEPPED......."
        , "..BBBBBBBBBBBBB........"
        , "..BBBBBBBBBBBBBB......."
        , "...SSBBBBBBBBSS........"
        , "...BBBBFBBBBBB........."
        , "....BBBBBBBBB.........."
        , ".....BBBBBBBBB......C.."
        , "....BBBBBBBBBBBBBBCC..."
        , "...CBBBB....BBBBBBBC..."
        , "..CCBB........BBCC....."
        , "..CCBB........BBCC....."
        , "..CBBB........BBBC....."
        , "..CCBB........BBCC....."
        , "..CSBB........BBSC....."
        , "..CCCC........CCCC....."
        , "......................."
        ]
    }


-- Integer Imp — Unit 2 (red body, yellow eyes, dark horns)
integerImp : BossSprite
integerImp =
    imp "Integer Imp"
        [ ( 'B', "#cc3322" )
        , ( 'S', "#881100" )
        , ( 'H', "#332200" )
        , ( 'E', "#ffee88" )
        , ( 'P', "#ddaa00" )
        , ( 'C', "#881100" )
        , ( 'F', "#ff6655" )
        , ( 'D', "#882200" )
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


-- Fraction Phantom — Unit 3 (purple/lavender, pink pupils)
fractionPhantom : BossSprite
fractionPhantom =
    ghost "Fraction Phantom"
        [ ( 'B', "#9966cc" )
        , ( 'S', "#553388" )
        , ( 'E', "#eeccff" )
        , ( 'W', "#ffffff" )
        , ( 'P', "#ff88ff" )
        , ( 'T', "#331166" )
        ]


-- ELEMENTAL shape — swirling asymmetric energy mass, core + radiating wisps
-- C=core, B=bright inner, W=wisp outer, S=shadow/dark wisp, G=glow accent
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


-- Expression Elemental — Unit 4 (electric blue/cyan)
expressionElemental : BossSprite
expressionElemental =
    elemental "Expression Elemental"
        [ ( 'C', "#ffffff" )
        , ( 'G', "#aaffff" )
        , ( 'B', "#44bbff" )
        , ( 'W', "#0077cc" )
        , ( 'S', "#003366" )
        ]


-- KNIGHT shape — armored humanoid, distinct helmet, broad pauldrons, wide stance
-- B=armor body, S=shadow/dark, H=helm, E=eye slit, R=eye glow, P=pauldron, T=boot
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


-- Equation Knight — Unit 5 (silver/steel armor, blue visor glow)
equationKnight : BossSprite
equationKnight =
    knight "Equation Knight"
        [ ( 'B', "#aabbcc" )
        , ( 'S', "#667788" )
        , ( 'H', "#889aaa" )
        , ( 'E', "#cce0ff" )
        , ( 'R', "#4499ff" )
        , ( 'P', "#99aabb" )
        , ( 'T', "#334455" )
        ]


-- SERPENT shape — coiled snake, diamond head, forked tongue, scale pattern
-- B=body scale A, D=body scale B (alternating), H=head, E=eye, T=tongue, S=shadow
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


-- Ratio Serpent — Unit 6 (green/dark-green, yellow eyes)
ratioSerpent : BossSprite
ratioSerpent =
    serpent "Ratio Serpent"
        [ ( 'B', "#226633" )
        , ( 'D', "#115522" )
        , ( 'H', "#338844" )
        , ( 'E', "#ffee00" )
        , ( 'T', "#ff4444" )
        , ( 'S', "#113322" )
        ]


-- GARGOYLE shape — crouching stone creature, wings spread wide, horned head
-- B=stone body, D=dark stone, W=wing membrane, E=eye, G=glow, H=horn, C=claw
gargoyle : String -> List ( Char, String ) -> BossSprite
gargoyle name palette =
    { name = name
    , palette = palette
    , pixelSize = 8
    , frameA =
        [ "W.....HBBBBBH.....W...."
        , "WW....BBBBBBBB....WW..."
        , "WWW..BBBBBBBBBBB..WWW.."
        , "WWWWBBBBBBBBBBBBWWWWW.."
        , "WWWWBBBDDBBBDDBBWWWW..."
        , "WWWWBBBDDBBBDDBBWWWWW.."
        , "WWWBBBBBBBBBBBBBBBWWW.."
        , "WWWBBEGBBBBBBGEBWWWW..."
        , "WWWBBGGGBBBBBGGGBWWWW.."
        , "WWWBBEGBBBBBBGEBWWWW..."
        , "WWWBBBBBBBBBBBBBBBWWW.."
        , "WWWWBBBBBBBBBBBBWWWW..."
        , "WWWWWBBBBBBBBBBWWWWWW.."
        , ".WWWWWBBBBBBBBBWWWWW..."
        , "..WWWWBBBBBBBBWWWWW...."
        , "...WWWBBBBBBBWWWWW....."
        , ".....CBBBBBBBBC........"
        , ".....CBBDDDBBBC........"
        , "....CCBBDDDBBBBCC......"
        , "....CCBBDBBDBBCC......."
        , "....CCCBBBBBBBCCC......"
        , ".....CCCBBBBBCCC......."
        , "......CCCDDDDCCC......."
        , "......................."
        ]
    , frameB =
        [ "W.....HBBBBBH.....W...."
        , "WW....BBBBBBBB....WW..."
        , "WWW..BBBBBBBBBBB..WWW.."
        , "WWWWBBBBBBBBBBBBWWWWW.."
        , "WWWWBBBDDBBBDDBBWWWW..."
        , "WWWWBBBDDBBBDDBBWWWWW.."
        , "WWWBBBBBBBBBBBBBBBWWW.."
        , "WWWBBEGBBBBBBGEBWWWW..."
        , "WWWBBGBBBBBBBBGBBWWWW.."
        , "WWWBBEGBBBBBBGEBWWWW..."
        , "WWWBBBBBBBBBBBBBBBWWW.."
        , "WWWWBBBBBBBBBBBBWWWWW.."
        , "WWWWWBBBBBBBBBBWWWWWWW."
        , ".WWWWWBBBBBBBBBWWWWWW.."
        , "..WWWWBBBBBBBBWWWWWW..."
        , "...WWWBBBBBBBWWWWWW...."
        , ".....CBBBBBBBBC........"
        , ".....CBBDDDBBBC........"
        , "....CCBBDDDBBBBCC......"
        , "....CCBBDBBDBBCC......."
        , "....CCCBBBBBBBCCC......"
        , ".....CCCBBBBBCCC......."
        , "......CCCDDDDCCC......."
        , "......................."
        ]
    }


-- Geometry Gargoyle — Unit 7 (grey stone, blue glow eyes)
geometryGargoyle : BossSprite
geometryGargoyle =
    gargoyle "Geometry Gargoyle"
        [ ( 'B', "#778899" )
        , ( 'D', "#445566" )
        , ( 'W', "#aabbcc" )
        , ( 'E', "#cceeff" )
        , ( 'G', "#55ccff" )
        , ( 'H', "#334455" )
        , ( 'C', "#223344" )
        ]


-- SPHINX shape — wide cat body, human head at top, paws extended, regal pose
-- B=body fur, D=dark shadow, H=head skin, E=eye, P=pupil, W=wing suggestion, F=face feature
sphinx : String -> List ( Char, String ) -> BossSprite
sphinx name palette =
    { name = name
    , palette = palette
    , pixelSize = 8
    , frameA =
        [ ".........HHH..........."
        , "........HHHHH.........."
        , "........HEHEH.........."
        , "........HPPHH.........."
        , "........HHHHH.........."
        , ".......BHHHHHHB........"
        , "......BBBHHHHBBBB......"
        , ".....BBBBBBBBBBBBB....."
        , "....BBBBBBBBBBBBBBB...."
        , "...BBBBBBBBBBBBBBBBBB.."
        , "...BBBBDBBBBBBBDBBBBB.."
        , "...BBBBDBBBBBBBDBBBBB.."
        , "...BBBBBBBBBBBBBBBBBB.."
        , "..BBBBBBBBBBBBBBBBBBBB."
        , "..BBBBBBBBBBBBBBBBBBBB."
        , "..BBBBDDDBBBBBBDDDBBBB."
        , "..BBBBBBBBBBBBBBBBBBBB."
        , "..BBBBBBBBBBBBBBBBBBBB."
        , ".PBBBB...........BBBBP."
        , ".PBBBBB.........BBBBBP."
        , ".PBBBBBB.......BBBBBBP."
        , ".PPBBBBBB.....BBBBBBPP."
        , "..PPPPBBBB...BBBBPPPP.."
        , "......................."
        ]
    , frameB =
        [ ".........HHH..........."
        , "........HHHHH.........."
        , "........HEHEH.........."
        , "........HHHPH.........."
        , "........HHHHH.........."
        , ".......BHHHHHHB........"
        , "......BBBHHHHBBBB......"
        , ".....BBBBBBBBBBBBB....."
        , "....BBBBBBBBBBBBBBB...."
        , "...BBBBBBBBBBBBBBBBBB.."
        , "...BBBBDBBBBBBBDBBBBB.."
        , "...BBBBDBBBBBBBDBBBBB.."
        , "...BBBBBBBBBBBBBBBBBB.."
        , "..BBBBBBBBBBBBBBBBBBBB."
        , "..BBBBBBBBBBBBBBBBBBBB."
        , "..BBBBDDDBBBBBBDDDBBBB."
        , "..BBBBBBBBBBBBBBBBBBBB."
        , "..BBBBBBBBBBBBBBBBBBBB."
        , ".PBBBB...........BBBBP."
        , ".PBBBBB.........BBBBBP."
        , ".PBBBBBB.......BBBBBBP."
        , ".PPBBBBBB.....BBBBBBPP."
        , "..PPPPBBBB...BBBBPPPP.."
        , "......................."
        ]
    }


-- Stats Sphinx — Unit 8 (sandy gold, amber eyes)
statsSphinx : BossSprite
statsSphinx =
    sphinx "Stats Sphinx"
        [ ( 'B', "#cc9944" )
        , ( 'D', "#885522" )
        , ( 'H', "#ffcc88" )
        , ( 'E', "#ffddaa" )
        , ( 'P', "#884400" )
        , ( 'W', "#ddbb66" )
        , ( 'F', "#aa6600" )
        ]


-- Act 1 MegaBoss — Chaos Wyrm (keep as-is, same shape as before but gold wyrm palette)
act1MegaBoss : BossSprite
act1MegaBoss =
    { name = "Chaos Wyrm"
    , palette =
        [ ( 'B', "#b89000" )
        , ( 'S', "#664400" )
        , ( 'E', "#fff8cc" )
        , ( 'W', "#ffffff" )
        , ( 'R', "#ff6600" )
        , ( 'T', "#332200" )
        , ( 'P', "#aa7700" )
        , ( 'H', "#553300" )
        , ( 'D', "#997700" )
        ]
    , pixelSize = 8
    , frameA =
        [ "......PPPPPPPPPPP......"
        , ".....PPPPPPPPPPPPP....."
        , "....PPPPPHHHHHHPPPPP..."
        , "....PPPPHHHHHHHPPPP...."
        , ".....PPHHHHHHHHHPP....."
        , ".....PPHEEEEEEHPP......"
        , ".....PPHERRRREHPP......"
        , ".....PPHEEEEEEHPP......"
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
        , ".....PPHEEEEEEHPP......"
        , ".....PPHEDDDDEHPP......"
        , ".....PPHEEEEEEHPP......"
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
