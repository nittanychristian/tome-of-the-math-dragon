module Sprite.Quest exposing (questSprite)

import Types exposing (BossSprite)


-- Scroll Wisp — friendly quest guardian
-- Round floating body, open book/scroll in front, bright curious eyes
-- Warm parchment/gold tones, clearly non-threatening
-- pixelSize=7 makes it slightly smaller/less imposing than act bosses
questSprite : BossSprite
questSprite =
    { name = "Scroll Wisp"
    , palette =
        [ ( 'P', "#f0d080" )  -- parchment gold body
        , ( 'D', "#c8a040" )  -- darker parchment shadow
        , ( 'L', "#fff8d0" )  -- light parchment highlight
        , ( 'W', "#ffffff" )  -- white eye
        , ( 'E', "#44aaff" )  -- bright curious blue iris
        , ( 'K', "#1166aa" )  -- eye pupil
        , ( 'B', "#bb8833" )  -- book cover brown
        , ( 'N', "#996622" )  -- book dark spine
        , ( 'G', "#e8f4d0" )  -- book page cream
        , ( 'T', "#ddaa44" )  -- tendril/wisp tail
        ]
    , pixelSize = 7
    , frameA =
        [ "........PPPPP........."
        , "......PPPPPPPPPPP....."
        , ".....PPPPPPPPPPPPP...."
        , "....PPPPPPPPPPPPPPP..."
        , "....PPLDDDPPPDDLLPP..."
        , "....PPLDDPPPPPDDLPP..."
        , "....PPPPPPPPPPPPPPP..."
        , "....PPWWPPPPPPWWPPP..."
        , "....PPWEPPPPPPPEPPP..."
        , "....PPWKWPPPPWKWPPP..."
        , "....PPWEPPPPPPPEPPP..."
        , "....PPWWPPPPPPWWPPP..."
        , "....PPPPPPPPPPPPPPP..."
        , "....PPPPPPPPPPPPPPP..."
        , "....PBBBBBBBBBBBBPP..."
        , "....PBNGGGGGGGGNNPP..."
        , "....PBNGGGGGGGGNNPP..."
        , "....PBBBBBBBBBBBBPP..."
        , "....PPPPPPPPPPPPPPP..."
        , ".....TPPPPPPPPPPT....."
        , "......TPPPPPPPT......."
        , ".......TPPPPPPT......."
        , "........TTTTTT........"
        , "......................  "
        ]
    , frameB =
        [ "........PPPPP........."
        , "......PPPPPPPPPPP....."
        , ".....PPPPPPPPPPPPP...."
        , "....PPPPPPPPPPPPPPP..."
        , "....PPLDDDPPPDDLLPP..."
        , "....PPLDDPPPPPDDLPP..."
        , "....PPPPPPPPPPPPPPP..."
        , "....PPWWPPPPPPWWPPP..."
        , "....PPWEPPPPPPPEPPP..."
        , "....PPWKWPPPPWKWPPP..."
        , "....PPWEPPPPPPPEPPP..."
        , "....PPWWPPPPPPWWPPP..."
        , "....PPPPPPPPPPPPPPP..."
        , "....PPPPPPPPPPPPPPP..."
        , "....PBBBBBBBBBBBBPP..."
        , "....PBNGGGGGGGGNNPP..."
        , "....PBNGGGGGGGGNNPP..."
        , "....PBBBBBBBBBBBBPP..."
        , "....PPPPPPPPPPPPPPP..."
        , "......TPPPPPPPT......."
        , ".......TPPPPPPT......."
        , "........TTPPTT........"
        , ".........TTTT........."
        , "......................  "
        ]
    }
