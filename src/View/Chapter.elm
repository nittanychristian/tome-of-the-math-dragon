module View.Chapter exposing (viewChapter)

import Game.Curriculum as Curriculum
import Html exposing (Html, button, div, p, text)
import Html.Attributes exposing (style)
import Html.Events exposing (onClick)
import Types exposing (Msg(..), QuestDef, UnitId, UnitSlot(..))
import View.Theme as T
import View.Window as W


viewChapter : UnitId -> List QuestDef -> Html Msg
viewChapter uid quests =
    let
        chapterNum =
            case uid.unit of
                Unit n ->
                    String.fromInt n

                MegaBoss ->
                    "M"

        chapterTitle =
            "Chapter " ++ chapterNum ++ ": " ++ Curriculum.unitName uid
    in
    div
        [ style "background" T.bgBlack
        , style "display" "flex"
        , style "flex-direction" "column"
        , style "height" "100%"
        , style "padding" "16px"
        , style "gap" "10px"
        ]
        [ div
            [ style "font-family" T.fontFamily
            , style "font-size" "14px"
            , style "color" T.gold
            , style "letter-spacing" "1px"
            ]
            [ text chapterTitle ]
        , div
            [ style "font-family" T.fontFamily
            , style "font-size" "10px"
            , style "color" T.cream
            ]
            [ text ("Boss: " ++ Curriculum.bossName uid) ]
        , button (primaryBtnAttrs ++ [ onClick (StartUnit uid) ])
            [ text "▶  RUN FULL CHAPTER" ]
        , div
            [ style "font-family" T.fontFamily
            , style "font-size" "9px"
            , style "color" T.streakEmpty
            , style "text-align" "center"
            , style "letter-spacing" "1px"
            ]
            [ text "— or practice a single quest —" ]
        , div
            [ style "display" "flex"
            , style "flex-direction" "column"
            , style "gap" "6px"
            , style "overflow-y" "auto"
            , style "flex" "1"
            ]
            (List.indexedMap (questButton uid) quests)
        , div [ style "display" "flex", style "justify-content" "space-between", style "align-items" "center" ]
            [ button
                [ onClick BackToMap
                , style "background" T.bgBlack
                , style "color" T.cream
                , style "font-family" T.fontFamily
                , style "font-size" (String.fromInt T.fontSizeSmall ++ "px")
                , style "border" ("2px solid " ++ T.cream)
                , style "padding" "8px 14px"
                , style "cursor" "pointer"
                , style "letter-spacing" "1px"
                ]
                [ text "← BACK TO MAP" ]
            , exitBtn
            ]
        ]


exitBtn : Html Msg
exitBtn =
    button
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


questButton : UnitId -> Int -> QuestDef -> Html Msg
questButton uid qi quest =
    button
        [ onClick (PracticeQuest uid qi)
        , style "background" T.bgDark
        , style "color" T.cream
        , style "font-family" T.fontFamily
        , style "font-size" (String.fromInt T.fontSizeSmall ++ "px")
        , style "border" ("1px solid " ++ T.cream)
        , style "padding" "8px 12px"
        , style "text-align" "left"
        , style "cursor" "pointer"
        , style "letter-spacing" "1px"
        ]
        [ text ("Quest " ++ String.fromInt (qi + 1) ++ ": " ++ quest.name) ]


primaryBtnAttrs : List (Html.Attribute msg)
primaryBtnAttrs =
    [ style "background" T.bgDark
    , style "color" T.gold
    , style "font-family" T.fontFamily
    , style "font-size" (String.fromInt T.fontSizeNormal ++ "px")
    , style "border" ("3px double " ++ T.cream)
    , style "padding" "10px 20px"
    , style "cursor" "pointer"
    , style "letter-spacing" "1px"
    ]
