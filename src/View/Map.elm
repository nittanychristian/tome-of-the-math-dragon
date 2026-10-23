module View.Map exposing (viewMap)

import Game.Curriculum as Curriculum
import Game.Elementary as Elementary
import Html exposing (Html, button, div, option, p, select, text)
import Html.Attributes exposing (disabled, selected, style, value)
import Html.Events exposing (onClick, onInput)
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
        , select
            [ onInput (\raw -> String.toInt raw |> Maybe.andThen (\i -> List.drop i Curriculum.allCourses |> List.head) |> Maybe.map GoToAct |> Maybe.withDefault NoOp)
            , style "width" "100%"
            , style "padding" "10px"
            , style "background" T.bgDark
            , style "color" T.cream
            , style "font-family" T.fontFamily
            , style "font-size" "11px"
            , Html.Attributes.attribute "aria-label" "Choose your grade or course"
            ]
            (List.indexedMap (\i c -> option [ value (String.fromInt i), selected (c == course), disabled (not (Curriculum.isUnlocked (Curriculum.firstUnit c) highestUnlocked)) ] [ text (Curriculum.courseName c) ]) Curriculum.allCourses)
        , case course of
            Elementary grade ->
                p [ style "color" T.cream, style "font-size" "11px", style "line-height" "1.8", style "margin" "0" ] [ text (Elementary.introduction grade) ]

            _ ->
                text ""
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
        adjacent offset =
            Curriculum.allCourses
                |> List.indexedMap Tuple.pair
                |> List.filter (\( _, c ) -> c == course)
                |> List.head
                |> Maybe.andThen
                    (\( i, _ ) ->
                        if i + offset < 0 then
                            Nothing

                        else
                            List.drop (i + offset) Curriculum.allCourses |> List.head
                    )

        prevCourse =
            adjacent -1

        nextCourse =
            adjacent 1

        actUnlocked c =
            Curriculum.isUnlocked (Curriculum.firstUnit c) highestUnlocked

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
        Elementary grade ->
            "GRADE " ++ String.fromInt grade

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
            Curriculum.isUnlocked uid highestUnlocked

        isCompleted uid =
            compareUnits uid highestUnlocked == LT
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
                unitButton uid (isUnlocked uid) (isCompleted uid)
            )
            units
        )


chapterPrefix : UnitId -> String
chapterPrefix uid =
    case ( uid.course, uid.unit ) of
        ( Elementary grade, _ ) ->
            "Grade " ++ String.fromInt grade ++ ": "

        ( _, Unit n ) ->
            "Ch." ++ String.fromInt n ++ ": "

        ( _, MegaBoss ) ->
            "MEGA: "


unitButton : UnitId -> Bool -> Bool -> Html Msg
unitButton uid unlocked completed =
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
    div
        [ style "display" "flex"
        , style "gap" "6px"
        , style "align-items" "stretch"
        ]
        [ button
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
             , style "flex" "1"
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
        , if completed then
            button
                [ onClick (StartBoss uid)
                , style "background" T.bgDark
                , style "color" T.gold
                , style "font-family" T.fontFamily
                , style "font-size" (String.fromInt (T.fontSizeSmall - 1) ++ "px")
                , style "border" ("2px solid " ++ T.gold)
                , style "padding" "6px 8px"
                , style "cursor" "pointer"
                , style "white-space" "nowrap"
                ]
                [ text "⚔ BOSS" ]

          else
            text ""
        ]


compareUnits : UnitId -> UnitId -> Order
compareUnits =
    Curriculum.compareUnits
