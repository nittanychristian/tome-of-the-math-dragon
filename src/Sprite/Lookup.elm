module Sprite.Lookup exposing (spriteFor)

import Sprite.Act1 as Act1
import Sprite.Act2 as Act2
import Sprite.Act3 as Act3
import Sprite.Act4 as Act4
import Types exposing (BossSprite, Course(..), UnitId)


spriteFor : UnitId -> BossSprite
spriteFor uid =
    case uid.course of
        Course1 ->
            Act1.spriteFor uid

        Course2 ->
            Act2.spriteFor uid

        PreAlgebra ->
            Act3.spriteFor uid

        Algebra1 ->
            Act4.spriteFor uid
