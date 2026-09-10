module Sprite.Act3 exposing (spriteFor)

import Sprite.Act1 as Act1
import Types exposing (BossSprite, Course(..), UnitId, UnitSlot(..))


spriteFor : UnitId -> BossSprite
spriteFor _ =
    -- TODO: design Act 3 sprites
    Act1.numberGolem
