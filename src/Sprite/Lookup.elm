module Sprite.Lookup exposing (questSpriteFor, spriteFor)

import Sprite.Act1 as Act1
import Sprite.Act2 as Act2
import Sprite.Act3 as Act3
import Sprite.Act4 as Act4
import Sprite.Quest as Quest
import Types exposing (BossSprite, Course(..), UnitId)


spriteFor : UnitId -> BossSprite
spriteFor uid =
    case uid.course of
        Elementary grade ->
            let
                wisp =
                    Quest.questSprite

                colors =
                    [ "#a8e890", "#8cdbef", "#eab0df", "#c0b0f0", "#f0d080" ]

                color =
                    List.drop (grade - 1) colors |> List.head |> Maybe.withDefault "#f0d080"
            in
            { wisp
                | palette =
                    List.map
                        (\( key, value ) ->
                            ( key
                            , if key == 'P' then
                                color

                              else
                                value
                            )
                        )
                        wisp.palette
            }

        Course1 ->
            Act1.spriteFor uid

        Course2 ->
            Act2.spriteFor uid

        PreAlgebra ->
            Act3.spriteFor uid

        Algebra1 ->
            Act4.spriteFor uid


questSpriteFor : UnitId -> BossSprite
questSpriteFor _ =
    Quest.questSprite
