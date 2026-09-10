module Types exposing (..)


-- MESSAGES


type Msg
    = NoOp
    | SetNameDraft String
    | SubmitName
    | SetPasscodeDraft String
    | SubmitPasscode
    | GoToTitle
    | StartUnit UnitId
    | ViewChapter UnitId
    | PracticeQuest UnitId Int
    | GotProblem Problem
    | UpdateInput AnswerInput
    | SubmitAnswer
    | AnimTick
    | FlashDone
    | BeginQuest
    | AskForHelp
    | NextHelpStep
    | ExitHelp
    | NextQuest
    | NextTutorialStep
    | DismissTutorial
    | BackToMap
    | RetryUnit
    | RequestExit
    | CancelExit
    | GoToAct Course


-- SCREENS


type Screen
    = TitleScreen
    | NameEntryScreen { draft : String, destination : Maybe UnitId }
    | PasscodeScreen { draft : String, error : Bool }
    | MapScreen { course : Course }
    | ChapterScreen UnitId
    | BattleScreen BattleState
    | HelpScreen HelpState BattleState
    | VictoryScreen VictoryState
    | GameOverScreen UnitId


-- BATTLE


type alias BattleState =
    { unit : UnitId
    , mode : BattleMode
    , playerHp : Int
    , bossHp : Int
    , bossMaxHp : Int
    , streak : Int
    , correctInQuest : Int
    , problemsDone : Int
    , problem : Problem
    , input : AnswerInput
    , phase : BattlePhase
    , animFrame : AnimFrame
    , practice : Bool
    }


type BattleMode
    = QuestMode Int
      -- ^ quest index (0-based)
    | BossMode


type BattlePhase
    = Idle
    | ShowResult HitOutcome
    | ShowTutorial Problem Int
      -- ^ wrong-answer walkthrough: the actual failed problem + steps revealed so far
    | QuestIntro
      -- ^ shown before first problem of a quest (displays quest story)
    | QuestComplete
    | BattleWon
    | BattleLost


type HitOutcome
    = CorrectHit
    | WrongHit


type AnimFrame
    = FrameA
    | FrameB


-- PROBLEMS


type alias Problem =
    { prompt : String
    , inputType : InputType
    , answer : CorrectAnswer
    , hint : HintData
    }


type InputType
    = TInteger
    | TDecimal
    | TFraction
    | TChoice (List String)
    | TInequality
    | TSystem
    | TRoots


type CorrectAnswer
    = AInt Int
    | AFloat Float Float
      -- ^ value, ± tolerance
    | AFraction Int Int
      -- ^ reduced numerator, denominator
    | AChoice Int
      -- ^ index into choice list
    | AInequality InequalityDir Float
    | ASystem Float Float
      -- ^ x, y (both must match)
    | ARoots Float Float
      -- ^ unordered pair


type InequalityDir
    = ILt
    | ILte
    | IGt
    | IGte


type AnswerInput
    = IInt String
    | IDecimal String
    | IFraction { num : String, den : String }
    | IChoice (Maybe Int)
    | IInequality { dir : Maybe InequalityDir, val : String }
    | ISystem { x : String, y : String }
    | IRoots { r1 : String, r2 : String }


-- HINTS


type alias HintData =
    { prompt : String
    , answer : String
    , steps : List String
    }


type alias HelpState =
    { hint : HintData
    , stepShown : Int
    }


-- NAVIGATION


type alias UnitId =
    { course : Course
    , unit : UnitSlot
    }


type Course
    = Course1
    | Course2
    | PreAlgebra
    | Algebra1


type UnitSlot
    = Unit Int
    | MegaBoss


-- QUESTS


type alias QuestDef =
    { name : String
    , story : String
    , minCorrect : Int
    }


-- SPRITES


type alias BossSprite =
    { name : String
    , palette : List ( Char, String )
    , frameA : List String
    , frameB : List String
    , pixelSize : Int
    }


-- VICTORY


type alias VictoryState =
    { unit : UnitId
    , code : String
    , isLast : Bool
    }
