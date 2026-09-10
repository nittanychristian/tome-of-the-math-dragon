module Sprite.Renderer exposing (renderSprite)

import Dict
import Svg exposing (Svg, rect, svg)
import Svg.Attributes as A
import Types exposing (AnimFrame(..), BossSprite)


renderSprite : BossSprite -> AnimFrame -> List (Svg msg)
renderSprite sprite frame =
    let
        rows =
            case frame of
                FrameA -> sprite.frameA
                FrameB -> sprite.frameB

        colorMap =
            Dict.fromList sprite.palette

        px =
            sprite.pixelSize
    in
    List.indexedMap
        (\rowIdx rowStr ->
            String.toList rowStr
                |> List.indexedMap
                    (\colIdx ch ->
                        if ch == '.' then
                            Nothing

                        else
                            case Dict.get ch colorMap of
                                Nothing ->
                                    Nothing

                                Just color ->
                                    Just
                                        (rect
                                            [ A.x (String.fromInt (colIdx * px))
                                            , A.y (String.fromInt (rowIdx * px))
                                            , A.width (String.fromInt px)
                                            , A.height (String.fromInt px)
                                            , A.fill color
                                            ]
                                            []
                                        )
                    )
                |> List.filterMap identity
        )
        rows
        |> List.concat
