module View.Map exposing (viewMap)

import Game.Curriculum as Curriculum
import Html exposing (Html, button, div, text)
import Html.Attributes exposing (style)
import Html.Events exposing (onClick)
import Types exposing (Course(..), Msg(..), UnitId, UnitSlot(..))
import View.Theme as T


viewMap : String -> Course -> UnitId -> Html Msg
viewMap playerName course highestUnlocked =
    div
        [ style "background" T.bgBlack
        , style "display" "flex"
        , style "flex-direction" "column"
        , style "height" "100%"
        , style "padding" "16px"
        , style "gap" "12px"
        ]
        [ header playerName course highestUnlocked
        , unitList course highestUnlocked
        , div [ style "display" "flex", style "justify-content" "flex-end" ]
            [ button
                [ onClick RequestExit
                , style "background" T.bgBlack
                , style "color" T.cream
                , style "font-family" T.fontFamily
                , style "font-size" (String.fromInt T.fontSizeSmall ++ "px")
                , style "border" ("1px solid " ++ T.cream)
                , style "padding" "8px 14px"
                , style "cursor" "pointer"
                , style "letter-spacing" "1px"
                ]
                [ text "EXIT" ]
            ]
        ]


header : String -> Course -> UnitId -> Html Msg
header playerName course highestUnlocked =
    let
        prevCourse =
            case course of
                Course1 -> Nothing
                Course2 -> Just Course1
                PreAlgebra -> Just Course2
                Algebra1 -> Just PreAlgebra

        nextCourse =
            case course of
                Course1 -> Just Course2
                Course2 -> Just PreAlgebra
                PreAlgebra -> Just Algebra1
                Algebra1 -> Nothing

        actUnlocked c =
            compareUnits (Curriculum.firstUnit c) highestUnlocked /= GT

        navBtn label maybeCourse =
            case maybeCourse of
                Nothing ->
                    div [ style "width" "48px" ] []

                Just c ->
                    if actUnlocked c then
                        button
                            [ onClick (GoToAct c)
                            , style "background" "transparent"
                            , style "color" T.gold
                            , style "font-family" T.fontFamily
                            , style "font-size" (String.fromInt T.fontSizeLarge ++ "px")
                            , style "border" "none"
                            , style "cursor" "pointer"
                            , style "padding" "0 4px"
                            ]
                            [ text label ]
                    else
                        div [ style "width" "48px" ] []
    in
    div
        [ style "display" "flex"
        , style "justify-content" "space-between"
        , style "align-items" "center"
        ]
        [ div
            [ style "display" "flex"
            , style "align-items" "center"
            , style "gap" "8px"
            ]
            [ navBtn "◀" prevCourse
            , div
                [ style "font-family" T.fontFamily
                , style "font-size" (String.fromInt T.fontSizeLarge ++ "px")
                , style "color" T.gold
                ]
                [ text (courseLabel course) ]
            , navBtn "▶" nextCourse
            ]
        , div
            [ style "font-family" T.fontFamily
            , style "font-size" (String.fromInt T.fontSizeSmall ++ "px")
            , style "color" T.cream
            ]
            [ text playerName ]
        ]


courseLabel : Course -> String
courseLabel course =
    case course of
        Course1 ->
            "ACT I"

        Course2 ->
            "ACT II"

        PreAlgebra ->
            "ACT III"

        Algebra1 ->
            "ACT IV"


unitList : Course -> UnitId -> Html Msg
unitList course highestUnlocked =
    let
        units =
            Curriculum.unitsForCourse course

        isUnlocked uid =
            compareUnits uid highestUnlocked /= GT
    in
    div
        [ style "display" "flex"
        , style "flex-direction" "column"
        , style "gap" "8px"
        , style "overflow-y" "auto"
        , style "flex" "1"
        ]
        (List.map
            (\uid ->
                unitButton uid (isUnlocked uid)
            )
            units
        )


chapterPrefix : UnitId -> String
chapterPrefix uid =
    case uid.unit of
        Unit n ->
            "Ch." ++ String.fromInt n ++ ": "

        MegaBoss ->
            "MEGA: "


unitButton : UnitId -> Bool -> Html Msg
unitButton uid unlocked =
    let
        label =
            chapterPrefix uid ++ Curriculum.unitName uid

        bossLabel =
            "vs " ++ Curriculum.bossName uid

        ( textColor, borderColor, bgColor ) =
            if unlocked then
                ( T.cream, T.cream, T.bgDark )

            else
                ( T.streakEmpty, T.streakEmpty, T.bgBlack )
    in
    button
        ([ style "background" bgColor
         , style "color" textColor
         , style "font-family" T.fontFamily
         , style "font-size" (String.fromInt T.fontSizeSmall ++ "px")
         , style "border" ("2px solid " ++ borderColor)
         , style "padding" "10px 12px"
         , style "text-align" "left"
         , style "display" "flex"
         , style "justify-content" "space-between"
         , style "align-items" "center"
         ]
            ++ (if unlocked then
                    [ onClick (ViewChapter uid), style "cursor" "pointer" ]

                else
                    [ style "cursor" "not-allowed" ]
               )
        )
        [ text label
        , div
            [ style "font-size" (String.fromInt (T.fontSizeSmall - 1) ++ "px")
            , style "color"
                (if unlocked then
                    T.gold

                 else
                    T.streakEmpty
                )
            ]
            [ text
                (if unlocked then
                    bossLabel

                 else
                    "LOCKED"
                )
            ]
        ]


compareUnits : UnitId -> UnitId -> Order
compareUnits a b =
    let
        courseRank c =
            case c of
                Course1 -> 0
                Course2 -> 1
                PreAlgebra -> 2
                Algebra1 -> 3

        slotRank s =
            case s of
                Unit n -> n
                MegaBoss -> 99
    in
    case compare (courseRank a.course) (courseRank b.course) of
        EQ ->
            compare (slotRank a.unit) (slotRank b.unit)

        other ->
            other
