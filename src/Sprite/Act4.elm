module Sprite.Act4 exposing (spriteFor)

import Sprite.Act1 as Act1
import Types exposing (BossSprite, Course(..), UnitId, UnitSlot(..))


spriteFor : UnitId -> BossSprite
spriteFor _ =
    -- TODO: design Act 4 sprites
    Act1.numberGolem
