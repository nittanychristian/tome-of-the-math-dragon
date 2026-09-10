module Game.Battle exposing
    ( checkAnswer
    , defaultInput
    , initialBattleState
    , initialPracticeState
    , initialQuestState
    )

import Config
import Game.Curriculum as Curriculum
import Types exposing (..)


initialBattleState : UnitId -> Problem -> BattleState
initialBattleState uid problem =
    { unit = uid
    , mode = BossMode
    , playerHp = Config.playerMaxHp
    , bossHp = Curriculum.bossHpFor uid
    , bossMaxHp = Curriculum.bossHpFor uid
    , streak = 0
    , correctInQuest = 0
    , problemsDone = 0
    , problem = problem
    , input = defaultInput problem.inputType
    , phase = Idle
    , animFrame = FrameA
    , practice = False
    }


initialQuestState : UnitId -> Int -> Problem -> BattleState
initialQuestState uid questIndex problem =
    { unit = uid
    , mode = QuestMode questIndex
    , playerHp = Config.playerMaxHp
    , bossHp = 0
    , bossMaxHp = 0
    , streak = 0
    , correctInQuest = 0
    , problemsDone = 0
    , problem = problem
    , input = defaultInput problem.inputType
    , phase = QuestIntro
    , animFrame = FrameA
    , practice = False
    }


initialPracticeState : UnitId -> Int -> Problem -> BattleState
initialPracticeState uid questIndex problem =
    { unit = uid
    , mode = QuestMode questIndex
    , playerHp = Config.playerMaxHp
    , bossHp = 0
    , bossMaxHp = 0
    , streak = 0
    , correctInQuest = 0
    , problemsDone = 0
    , problem = problem
    , input = defaultInput problem.inputType
    , phase = QuestIntro
    , animFrame = FrameA
    , practice = True
    }


defaultInput : InputType -> AnswerInput
defaultInput it =
    case it of
        TInteger ->
            IInt ""

        TDecimal ->
            IDecimal ""

        TFraction ->
            IFraction { num = "", den = "" }

        TChoice _ ->
            IChoice Nothing

        TInequality ->
            IInequality { dir = Nothing, val = "" }

        TSystem ->
            ISystem { x = "", y = "" }

        TRoots ->
            IRoots { r1 = "", r2 = "" }


checkAnswer : AnswerInput -> CorrectAnswer -> Bool
checkAnswer input correct =
    case ( input, correct ) of
        ( IInt s, AInt n ) ->
            String.toInt s == Just n

        ( IDecimal s, AFloat v tol ) ->
            case String.toFloat s of
                Just f ->
                    abs (f - v) <= tol

                Nothing ->
                    False

        ( IFraction { num, den }, AFraction cn cd ) ->
            case ( String.toInt num, String.toInt den ) of
                ( Just n, Just d ) ->
                    d /= 0 && n * cd == cn * d

                _ ->
                    False

        ( IChoice (Just idx), AChoice ci ) ->
            idx == ci

        ( IInequality { dir, val }, AInequality cd cv ) ->
            case ( dir, String.toFloat val ) of
                ( Just d, Just v ) ->
                    d == cd && abs (v - cv) < 0.01

                _ ->
                    False

        ( ISystem { x, y }, ASystem cx cy ) ->
            case ( String.toFloat x, String.toFloat y ) of
                ( Just fx, Just fy ) ->
                    abs (fx - cx) < 0.01 && abs (fy - cy) < 0.01

                _ ->
                    False

        ( IRoots { r1, r2 }, ARoots cr1 cr2 ) ->
            case ( String.toFloat r1, String.toFloat r2 ) of
                ( Just f1, Just f2 ) ->
                    (abs (f1 - cr1) < 0.01 && abs (f2 - cr2) < 0.01)
                        || (abs (f1 - cr2) < 0.01 && abs (f2 - cr1) < 0.01)

                _ ->
                    False

        _ ->
            False
