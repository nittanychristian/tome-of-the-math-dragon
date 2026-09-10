module Game.Passcode exposing
    ( codeForUnit
    , unitForCode
    )

import Dict exposing (Dict)
import Types exposing (..)


-- Each entry: completing `uid` awards this code, which unlocks `nextUid`.
-- The code IS the key; it maps to the unit it UNLOCKS (where you resume).


table : Dict String UnitId
table =
    Dict.fromList
        -- Course 1 completions
        [ ( "stone wall paper crow",   { course = Course1, unit = Unit 2 } )
        , ( "lamp silver torch pine",  { course = Course1, unit = Unit 3 } )
        , ( "river moon apple salt",   { course = Course1, unit = Unit 4 } )
        , ( "forge blade iron dust",   { course = Course1, unit = Unit 5 } )
        , ( "brass kettle march wind", { course = Course1, unit = Unit 6 } )
        , ( "castle door seven noon",  { course = Course1, unit = Unit 7 } )
        , ( "bridge quill amber frost",{ course = Course1, unit = Unit 8 } )
        , ( "thunder helm deep pool",  { course = Course1, unit = MegaBoss } )
        , ( "crystal peak ember song", { course = Course2, unit = Unit 1 } )
        -- Course 2 completions
        , ( "shore lantern black twig",{ course = Course2, unit = Unit 2 } )
        , ( "crown vale copper ring",  { course = Course2, unit = Unit 3 } )
        , ( "hollow branch smoke bell",{ course = Course2, unit = Unit 4 } )
        , ( "dusk arrow leather drum", { course = Course2, unit = Unit 5 } )
        , ( "glacier hound swift mast",{ course = Course2, unit = Unit 6 } )
        , ( "oak shield bright lens",  { course = Course2, unit = Unit 7 } )
        , ( "cliff powder veil chalk", { course = Course2, unit = Unit 8 } )
        , ( "harbor comet flint straw",{ course = Course2, unit = MegaBoss } )
        , ( "silver bloom arch tide",  { course = PreAlgebra, unit = Unit 1 } )
        -- Pre-Algebra completions
        , ( "wolf timber shade beam",  { course = PreAlgebra, unit = Unit 2 } )
        , ( "raven cloak north gate",  { course = PreAlgebra, unit = Unit 3 } )
        , ( "ember flask coin tower",  { course = PreAlgebra, unit = Unit 4 } )
        , ( "marsh swift peak dawn",   { course = PreAlgebra, unit = Unit 5 } )
        , ( "frost pine wheel sail",   { course = PreAlgebra, unit = Unit 6 } )
        , ( "vale arrow smoke helm",   { course = PreAlgebra, unit = Unit 7 } )
        , ( "ridge torch copper gale", { course = PreAlgebra, unit = Unit 8 } )
        , ( "dune mirror pale drift",  { course = PreAlgebra, unit = Unit 9 } )
        , ( "iron bell moss quay",     { course = PreAlgebra, unit = MegaBoss } )
        , ( "storm veil amber crest",  { course = Algebra1, unit = Unit 1 } )
        -- Algebra 1 completions
        , ( "blaze chalk quill tide",  { course = Algebra1, unit = Unit 2 } )
        , ( "thorn gate river mist",   { course = Algebra1, unit = Unit 3 } )
        , ( "crest flame loom salt",   { course = Algebra1, unit = Unit 4 } )
        , ( "sand crown night oar",    { course = Algebra1, unit = Unit 5 } )
        , ( "hinge dark well shore",   { course = Algebra1, unit = Unit 6 } )
        , ( "plume brass swift knot",  { course = Algebra1, unit = Unit 7 } )
        , ( "grove seal pale drum",    { course = Algebra1, unit = Unit 8 } )
        , ( "wren coil deep flint",    { course = Algebra1, unit = Unit 9 } )
        , ( "anvil ember moon pool",   { course = Algebra1, unit = Unit 10 } )
        , ( "cleft bower shade ring",  { course = Algebra1, unit = Unit 11 } )
        , ( "spark reed dawn lens",    { course = Algebra1, unit = Unit 12 } )
        , ( "bone vault swift bloom",  { course = Algebra1, unit = MegaBoss } )
        ]


-- Reverse table: UnitId → code awarded upon completing it


reverseTable : Dict String String
reverseTable =
    -- key: unitIdKey uid  value: code
    Dict.foldl
        (\code uid acc ->
            -- The code unlocks `uid`, meaning it was awarded for completing the
            -- unit BEFORE `uid`. We store uid→code so victory screen can look up.
            Dict.insert (unitIdKey uid) code acc
        )
        Dict.empty
        table


unitIdKey : UnitId -> String
unitIdKey uid =
    let
        c =
            case uid.course of
                Course1 -> "c1"
                Course2 -> "c2"
                PreAlgebra -> "pa"
                Algebra1 -> "a1"

        u =
            case uid.unit of
                Unit n -> String.fromInt n
                MegaBoss -> "mega"
    in
    c ++ "-" ++ u


unitForCode : String -> Maybe UnitId
unitForCode raw =
    Dict.get (String.toLower (String.trim raw)) table


{-| Code awarded to the player after completing `uid`.
Returns Nothing for the very last boss (game complete trophy code instead).
-}
codeForUnit : UnitId -> Maybe String
codeForUnit uid =
    case nextUnitKey uid of
        Just key ->
            Dict.get key reverseTable

        Nothing ->
            -- Final boss: return the trophy code
            Just "shard peak fire arch"


nextUnitKey : UnitId -> Maybe String
nextUnitKey uid =
    case ( uid.course, uid.unit ) of
        ( Course1, Unit n ) ->
            if n < 8 then Just (unitIdKey { course = Course1, unit = Unit (n + 1) })
            else Just (unitIdKey { course = Course1, unit = MegaBoss })

        ( Course1, MegaBoss ) ->
            Just (unitIdKey { course = Course2, unit = Unit 1 })

        ( Course2, Unit n ) ->
            if n < 8 then Just (unitIdKey { course = Course2, unit = Unit (n + 1) })
            else Just (unitIdKey { course = Course2, unit = MegaBoss })

        ( Course2, MegaBoss ) ->
            Just (unitIdKey { course = PreAlgebra, unit = Unit 1 })

        ( PreAlgebra, Unit n ) ->
            if n < 9 then Just (unitIdKey { course = PreAlgebra, unit = Unit (n + 1) })
            else Just (unitIdKey { course = PreAlgebra, unit = MegaBoss })

        ( PreAlgebra, MegaBoss ) ->
            Just (unitIdKey { course = Algebra1, unit = Unit 1 })

        ( Algebra1, Unit n ) ->
            if n < 12 then Just (unitIdKey { course = Algebra1, unit = Unit (n + 1) })
            else Just (unitIdKey { course = Algebra1, unit = MegaBoss })

        ( Algebra1, MegaBoss ) ->
            Nothing
