module Sprite.Act2 exposing (spriteFor)

import Sprite.Act1 as Act1
import Types exposing (BossSprite, Course(..), UnitId, UnitSlot(..))


spriteFor : UnitId -> BossSprite
spriteFor _ =
    -- TODO: design Act 2 sprites
    Act1.numberGolem
