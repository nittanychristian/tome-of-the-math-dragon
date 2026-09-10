module Sprite.Act4 exposing (spriteFor)

import Types exposing (BossSprite, Course(..), UnitId, UnitSlot(..))


spriteFor : UnitId -> BossSprite
spriteFor uid =
    case ( uid.course, uid.unit ) of
        ( Algebra1, Unit 1 ) -> polynomialPharaoh
        ( Algebra1, Unit 2 ) -> quadraticColossus
        ( Algebra1, Unit 3 ) -> radicalRuler
        ( Algebra1, Unit 4 ) -> exponentialEmperor
        ( Algebra1, Unit 5 ) -> systemSovereign
        ( Algebra1, Unit 6 ) -> functionForge
        ( Algebra1, MegaBoss ) -> algebraTitan
        _ -> algebraTitan


-- Armored titan silhouette: very wide shoulders, compact head, thick legs
-- Distinct from golem (medium), ghost (round dome), lich (tall thin)
-- Key: wide pauldrons extend far left/right, small helmeted head center
-- B=armor body, S=dark shadow, P=pauldron plate, H=helm, E=eye slit, R=eye glow, T=leg/boot
titan : String -> List ( Char, String ) -> BossSprite
titan name palette =
    { name = name
    , palette = palette
    , pixelSize = 8
    , frameA =
        [ "....PPPP.BBBB.PPPP...."
        , "...PPPPPPBBBBPPPPPP..."
        , "...PPPPPPBBBBPPPPPP..."
        , "....PPPP.BBBB.PPPP...."
        , ".....SSSBHHHHBSSS....."
        , "......BBHHHHHHHBB....."
        , "......BHEEEEEEHB......"
        , "......BHEREREHB......"
        , "......BHEEEEEEHB......"
        , "......BBHHHHHHHBB....."
        , ".....BBBBBBBBBBBB....."
        , "....BBBBBBBBBBBBBB...."
        , "....BBBBBBBBBBBBBBB..."
        , "....BBBSSBBBBSSBBBB..."
        , "....BBBBBBBBBBBBBB...."
        , "....BBBBBBBBBBBBBB...."
        , "....BBBBSSSSSSBBBB...."
        , ".....BBBBBBBBBBBBB...."
        , ".....TBBB.....BBBT...."
        , "....TTBBB.....BBBTT..."
        , "....TTBBB.....BBBTT..."
        , "....TTSSS.....SSSTT..."
        , ".....TTTT.....TTTT...."
        , "......................  "
        ]
    , frameB =
        [ "....PPPP.BBBB.PPPP...."
        , "...PPPPPPBBBBPPPPPP..."
        , "...PPPPPPBBBBPPPPPP..."
        , "....PPPP.BBBB.PPPP...."
        , ".....SSSBHHHHBSSS....."
        , "......BBHHHHHHHBB....."
        , "......BHEEEEEEHB......"
        , "......BHESSSEHB......"
        , "......BHEEEEEEHB......"
        , "......BBHHHHHHHBB....."
        , ".....BBBBBBBBBBBB....."
        , "....BBBBBBBBBBBBBB...."
        , "....BBBBBBBBBBBBBBB..."
        , "....BBBSSBBBBSSBBBB..."
        , "....BBBBBBBBBBBBBB...."
        , "....BBBBBBBBBBBBBB...."
        , "....BBBBSSSSSSBBBB...."
        , ".....BBBBBBBBBBBBB...."
        , ".....TBBB.....BBBT...."
        , "....TTBBB.....BBBTT..."
        , "....TTBBB.....BBBTT..."
        , "....TTSSS.....SSSTT..."
        , ".....TTTT.....TTTT...."
        , "......................  "
        ]
    }


-- Act 4 Unit 1 — Polynomial Pharaoh (gold iron titan)
polynomialPharaoh : BossSprite
polynomialPharaoh =
    titan "Polynomial Pharaoh"
        [ ( 'B', "#886600" )
        , ( 'S', "#443300" )
        , ( 'P', "#aa8800" )
        , ( 'H', "#664400" )
        , ( 'E', "#ffeeaa" )
        , ( 'R', "#ffcc00" )
        , ( 'T', "#332200" )
        ]


-- Act 4 Unit 2 — Quadratic Colossus (dark blue titan)
quadraticColossus : BossSprite
quadraticColossus =
    titan "Quadratic Colossus"
        [ ( 'B', "#224488" )
        , ( 'S', "#112244" )
        , ( 'P', "#335599" )
        , ( 'H', "#112266" )
        , ( 'E', "#aabbff" )
        , ( 'R', "#4488ff" )
        , ( 'T', "#001133" )
        ]


-- Act 4 Unit 3 — Radical Ruler (green-black titan)
radicalRuler : BossSprite
radicalRuler =
    titan "Radical Ruler"
        [ ( 'B', "#224433" )
        , ( 'S', "#112211" )
        , ( 'P', "#336644" )
        , ( 'H', "#113322" )
        , ( 'E', "#aaffcc" )
        , ( 'R', "#33ff88" )
        , ( 'T', "#001111" )
        ]


-- Act 4 Unit 4 — Exponential Emperor (crimson titan)
exponentialEmperor : BossSprite
exponentialEmperor =
    titan "Exponential Emperor"
        [ ( 'B', "#882222" )
        , ( 'S', "#441111" )
        , ( 'P', "#993333" )
        , ( 'H', "#660011" )
        , ( 'E', "#ffcccc" )
        , ( 'R', "#ff4444" )
        , ( 'T', "#220000" )
        ]


-- Act 4 Unit 5 — System Sovereign (silver-grey titan)
systemSovereign : BossSprite
systemSovereign =
    titan "System Sovereign"
        [ ( 'B', "#667788" )
        , ( 'S', "#334455" )
        , ( 'P', "#889aaa" )
        , ( 'H', "#445566" )
        , ( 'E', "#ddeeff" )
        , ( 'R', "#88ccff" )
        , ( 'T', "#223344" )
        ]


-- Act 4 Unit 6 — Function Forge (orange-iron titan)
functionForge : BossSprite
functionForge =
    titan "Function Forge"
        [ ( 'B', "#774422" )
        , ( 'S', "#442211" )
        , ( 'P', "#995533" )
        , ( 'H', "#552211" )
        , ( 'E', "#ffddbb" )
        , ( 'R', "#ff8844" )
        , ( 'T', "#221100" )
        ]


-- Act 4 MegaBoss — Algebra Titan (dark iron with red glow, widest shoulders)
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
        , "....BHESSSSSEHB......"
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
