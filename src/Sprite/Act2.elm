module Sprite.Act2 exposing (spriteFor)

import Types exposing (BossSprite, Course(..), UnitId, UnitSlot(..))


spriteFor : UnitId -> BossSprite
spriteFor uid =
    case ( uid.course, uid.unit ) of
        ( Course2, Unit 1 ) -> fractionShard
        ( Course2, Unit 2 ) -> integerWraith
        ( Course2, Unit 3 ) -> expressionSpecter
        ( Course2, Unit 4 ) -> proportionPoltergeist
        ( Course2, Unit 5 ) -> graphGhast
        ( Course2, Unit 6 ) -> inequalityImp
        ( Course2, MegaBoss ) -> fractionPhantom
        _ -> fractionPhantom


-- Ghost/specter shape: wide domed head, wispy tendrils at the base
-- The key silhouette: broad at top, tapers to wavy tendrils
-- B=body, S=shadow/dark, E=eye ring, W=eye white, R=iris glow, T=tendril tip
ghost : String -> List ( Char, String ) -> BossSprite
ghost name palette =
    { name = name
    , palette = palette
    , pixelSize = 8
    , frameA =
        [ "........BBBBBB........."
        , "......BBBBBBBBBBBB....."
        , ".....BBBBBBBBBBBBBB...."
        , "....BBBBBBBBBBBBBBBB..."
        , "....BBBSSBBBBBSSBBBB..."
        , "....BBBSSBBBBBSSBBB...."
        , "...BBBBBBBBBBBBBBBBB..."
        , "...BBEWWBBBBBBWWEBBB..."
        , "...BBWRRWBBBBBWRRWBB..."
        , "...BBWRRWBBBBBWRRWBB..."
        , "...BBEWWBBBBBBWWEBBB..."
        , "...BBBBBBBBBBBBBBBBB..."
        , "...BBBBBBBBBBBBBBBB...."
        , "....BBBBSSSSSSBBBB....."
        , "....BBBBBBBBBBBBB......"
        , "....BBBBBBBBBBBB......."
        , "...BBBBB.....BBBBB....."
        , "..SBBBB.......BBBBS...."
        , "..SBBB.........BBBS...."
        , "...SBB..........BS....."
        , "....SBB........BS......"
        , ".....SB........BS......"
        , "......SS......SS......."
        , "......................  "
        ]
    , frameB =
        [ "........BBBBBB........."
        , "......BBBBBBBBBBBB....."
        , ".....BBBBBBBBBBBBBB...."
        , "....BBBBBBBBBBBBBBBB..."
        , "....BBBSSBBBBBSSBBBB..."
        , "....BBBSSBBBBBSSBBB...."
        , "...BBBBBBBBBBBBBBBBB..."
        , "...BBEWWBBBBBBWWEBBB..."
        , "...BBWSSWBBBBBWSSWBB..."
        , "...BBWSSWBBBBBWSSWBB..."
        , "...BBEWWBBBBBBWWEBBB..."
        , "...BBBBBBBBBBBBBBBBB..."
        , "...BBBBBBBBBBBBBBBB...."
        , "....BBBBSSSSSSBBBB....."
        , "....BBBBBBBBBBBBB......"
        , ".....BBBBBBBBBB........"
        , "....BBBBB.....BBBBB...."
        , "...SBBBB.......BBBBS..."
        , "...SBBB.........BBBS..."
        , "....SBB..........BS...."
        , ".....SBB........BS....."
        , "......SB........BS....."
        , ".......SS......SS......"
        , "......................  "
        ]
    }


-- Act 2 Unit 1 — Fraction Shard (crimson ghost, fraction-themed)
fractionShard : BossSprite
fractionShard =
    ghost "Fraction Shard"
        [ ( 'B', "#992266" )
        , ( 'S', "#551133" )
        , ( 'E', "#ffbbdd" )
        , ( 'W', "#ffffff" )
        , ( 'R', "#ff4499" )
        , ( 'T', "#330011" )
        ]


-- Act 2 Unit 2 — Integer Wraith (deep blue ghost)
integerWraith : BossSprite
integerWraith =
    ghost "Integer Wraith"
        [ ( 'B', "#223388" )
        , ( 'S', "#111144" )
        , ( 'E', "#aabbff" )
        , ( 'W', "#ffffff" )
        , ( 'R', "#4477ff" )
        , ( 'T', "#000033" )
        ]


-- Act 2 Unit 3 — Expression Specter (teal ghost)
expressionSpecter : BossSprite
expressionSpecter =
    ghost "Expression Specter"
        [ ( 'B', "#116666" )
        , ( 'S', "#003333" )
        , ( 'E', "#aaffee" )
        , ( 'W', "#ffffff" )
        , ( 'R', "#00ffcc" )
        , ( 'T', "#002222" )
        ]


-- Act 2 Unit 4 — Proportion Poltergeist (gold ghost)
proportionPoltergeist : BossSprite
proportionPoltergeist =
    ghost "Proportion Poltergeist"
        [ ( 'B', "#997700" )
        , ( 'S', "#554400" )
        , ( 'E', "#ffeeaa" )
        , ( 'W', "#ffffff" )
        , ( 'R', "#ffcc00" )
        , ( 'T', "#332200" )
        ]


-- Act 2 Unit 5 — Graph Ghast (slate ghost)
graphGhast : BossSprite
graphGhast =
    ghost "Graph Ghast"
        [ ( 'B', "#445566" )
        , ( 'S', "#223344" )
        , ( 'E', "#ccddef" )
        , ( 'W', "#ffffff" )
        , ( 'R', "#88ccff" )
        , ( 'T', "#112233" )
        ]


-- Act 2 Unit 6 — Inequality Imp (orange ghost)
inequalityImp : BossSprite
inequalityImp =
    ghost "Inequality Imp"
        [ ( 'B', "#994400" )
        , ( 'S', "#552200" )
        , ( 'E', "#ffccaa" )
        , ( 'W', "#ffffff" )
        , ( 'R', "#ff8833" )
        , ( 'T', "#331100" )
        ]


-- Act 2 MegaBoss — Fraction Phantom (large purple/violet ghost, most imposing)
-- Same ghost silhouette but with richer, more detailed palette
fractionPhantom : BossSprite
fractionPhantom =
    { name = "Fraction Phantom"
    , palette =
        [ ( 'B', "#8844cc" )
        , ( 'S', "#441188" )
        , ( 'E', "#ddbbff" )
        , ( 'W', "#ffffff" )
        , ( 'R', "#ff44ff" )
        , ( 'T', "#220055" )
        , ( 'G', "#bb88ff" )
        ]
    , pixelSize = 8
    , frameA =
        [ ".......BBBBBBBBB......"
        , ".....BBBBBBBBBBBBB...."
        , "....BBBBBBBBBBBBBBB..."
        , "...BBBBBBBBBBBBBBBBB.."
        , "...BBBSSBBBBBBBSSBBBB."
        , "...BBBSSBBBBBBBSSBBB.."
        , "..BBBBBBBBBBBBBBBBBB.."
        , "..BBBBBBBBBBBBBBBBBB.."
        , "..BBEWWBBBGGGBWWEBBB.."
        , "..BBWRRWBBGGGBWRRWBB.."
        , "..BBWRRWBBGGGBWRRWBB.."
        , "..BBEWWBBBGGGBWWEBBB.."
        , "..BBBBBBBBGGGBBBBBB..."
        , "..BBBBBBBBBBBBBBBBBB.."
        , "...BBBBBSSSSSSSBBBBB.."
        , "...BBBBBBBBBBBBBBBBB.."
        , "....BBBBBBBBBBBBBBBB.."
        , "....BBBBB....BBBBBB..."
        , "...SBBBB......BBBBS..."
        , "...SBBB........BBBS..."
        , "....SBB...SS...BS....."
        , ".....SBB..SS..BS......"
        , "......SS......SS......"
        , "......................  "
        ]
    , frameB =
        [ ".......BBBBBBBBB......"
        , ".....BBBBBBBBBBBBB...."
        , "....BBBBBBBBBBBBBBB..."
        , "...BBBBBBBBBBBBBBBBB.."
        , "...BBBSSBBBBBBBSSBBBB."
        , "...BBBSSBBBBBBBSSBBB.."
        , "..BBBBBBBBBBBBBBBBBB.."
        , "..BBBBBBBBBBBBBBBBBB.."
        , "..BBEWWBBBGGGBWWEBBB.."
        , "..BBWSSWBBGGGBWSSWBB.."
        , "..BBWSSWBBGGGBWSSWBB.."
        , "..BBEWWBBBGGGBWWEBBB.."
        , "..BBBBBBBBGGGBBBBBB..."
        , "..BBBBBBBBBBBBBBBBBB.."
        , "...BBBBBSSSSSSSBBBBB.."
        , "...BBBBBBBBBBBBBBBBB.."
        , "....BBBBBBBBBBBBBBBB.."
        , ".....BBBBB....BBBBB..."
        , "....SBBBB......BBBBS.."
        , "....SBBB........BBBS.."
        , ".....SBB...SS...BS...."
        , "......SBB..SS..BS....."
        , ".......SS......SS....."
        , "......................  "
        ]
    }
