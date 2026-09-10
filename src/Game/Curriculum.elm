module Game.Curriculum exposing
    ( QuestDef
    , UnitMeta
    , allCourses
    , bossHpFor
    , bossName
    , courseName
    , firstUnit
    , nextUnit
    , questsFor
    , unitMeta
    , unitName
    , unitsForCourse
    )

import Types exposing (..)


type alias UnitMeta =
    { id : UnitId
    , name : String
    , bossName : String
    , bossHp : Int
    , problemCount : Int
    }


-- COURSE INFO


courseName : Course -> String
courseName c =
    case c of
        Course1 ->
            "Course 1"

        Course2 ->
            "Course 2"

        PreAlgebra ->
            "Pre-Algebra"

        Algebra1 ->
            "Algebra 1"


allCourses : List Course
allCourses =
    [ Course1, Course2, PreAlgebra, Algebra1 ]


firstUnit : Course -> UnitId
firstUnit c =
    { course = c, unit = Unit 1 }


-- UNIT COUNTS PER COURSE


regularUnitCount : Course -> Int
regularUnitCount c =
    case c of
        Course1 ->
            8

        Course2 ->
            8

        PreAlgebra ->
            9

        Algebra1 ->
            12


unitsForCourse : Course -> List UnitId
unitsForCourse c =
    List.map (\n -> { course = c, unit = Unit n })
        (List.range 1 (regularUnitCount c))
        ++ [ { course = c, unit = MegaBoss } ]


-- NEXT UNIT (returns Nothing at end of game)


nextUnit : UnitId -> Maybe UnitId
nextUnit uid =
    case uid.unit of
        Unit n ->
            if n < regularUnitCount uid.course then
                Just { uid | unit = Unit (n + 1) }

            else
                Just { uid | unit = MegaBoss }

        MegaBoss ->
            case uid.course of
                Course1 ->
                    Just { course = Course2, unit = Unit 1 }

                Course2 ->
                    Just { course = PreAlgebra, unit = Unit 1 }

                PreAlgebra ->
                    Just { course = Algebra1, unit = Unit 1 }

                Algebra1 ->
                    Nothing


-- UNIT METADATA


unitName : UnitId -> String
unitName uid =
    case ( uid.course, uid.unit ) of
        -- Course 1
        ( Course1, Unit 1 ) ->
            "Whole Numbers"

        ( Course1, Unit 2 ) ->
            "Integer Operations"

        ( Course1, Unit 3 ) ->
            "Rational Numbers"

        ( Course1, Unit 4 ) ->
            "Algebraic Expressions"

        ( Course1, Unit 5 ) ->
            "Equations & Inequalities"

        ( Course1, Unit 6 ) ->
            "Proportional Relationships"

        ( Course1, Unit 7 ) ->
            "Area & Volume"

        ( Course1, Unit 8 ) ->
            "Statistics"

        ( Course1, MegaBoss ) ->
            "The Decimal Drake"

        -- Course 2
        ( Course2, Unit 1 ) ->
            "Number Sense"

        ( Course2, Unit 2 ) ->
            "Expressions"

        ( Course2, Unit 3 ) ->
            "Equations & Inequalities"

        ( Course2, Unit 4 ) ->
            "Ratios & Percents"

        ( Course2, Unit 5 ) ->
            "Functions & Graphing"

        ( Course2, Unit 6 ) ->
            "Geometry"

        ( Course2, Unit 7 ) ->
            "Area & Volume"

        ( Course2, Unit 8 ) ->
            "Probability"

        ( Course2, MegaBoss ) ->
            "The Proportion Hydra"

        -- Pre-Algebra
        ( PreAlgebra, Unit 1 ) ->
            "The Real Numbers"

        ( PreAlgebra, Unit 2 ) ->
            "Algebraic Expressions"

        ( PreAlgebra, Unit 3 ) ->
            "Equations & Inequalities"

        ( PreAlgebra, Unit 4 ) ->
            "Ratios & Percents"

        ( PreAlgebra, Unit 5 ) ->
            "Linear Functions"

        ( PreAlgebra, Unit 6 ) ->
            "Systems of Equations"

        ( PreAlgebra, Unit 7 ) ->
            "Geometry"

        ( PreAlgebra, Unit 8 ) ->
            "Measurement"

        ( PreAlgebra, Unit 9 ) ->
            "Probability & Statistics"

        ( PreAlgebra, MegaBoss ) ->
            "The Linear Lich"

        -- Algebra 1
        ( Algebra1, Unit 1 ) ->
            "Algebra Basics"

        ( Algebra1, Unit 2 ) ->
            "Multi-Step Equations"

        ( Algebra1, Unit 3 ) ->
            "Relations & Functions"

        ( Algebra1, Unit 4 ) ->
            "Linear Equations"

        ( Algebra1, Unit 5 ) ->
            "Systems of Equations"

        ( Algebra1, Unit 6 ) ->
            "Exponents"

        ( Algebra1, Unit 7 ) ->
            "Polynomials"

        ( Algebra1, Unit 8 ) ->
            "Quadratic Equations"

        ( Algebra1, Unit 9 ) ->
            "Functions"

        ( Algebra1, Unit 10 ) ->
            "Rational Expressions"

        ( Algebra1, Unit 11 ) ->
            "Radical Expressions"

        ( Algebra1, Unit 12 ) ->
            "Statistics"

        ( Algebra1, MegaBoss ) ->
            "The Quadratic Dragon"

        _ ->
            "???"


bossName : UnitId -> String
bossName uid =
    case ( uid.course, uid.unit ) of
        ( Course1, Unit 1 ) ->  "Number Golem"
        ( Course1, Unit 2 ) ->  "Integer Imp"
        ( Course1, Unit 3 ) ->  "Fraction Phantom"
        ( Course1, Unit 4 ) ->  "Expression Elemental"
        ( Course1, Unit 5 ) ->  "Equation Knight"
        ( Course1, Unit 6 ) ->  "Ratio Serpent"
        ( Course1, Unit 7 ) ->  "Geometry Gargoyle"
        ( Course1, Unit 8 ) ->  "Stats Sphinx"
        ( Course1, MegaBoss ) -> "Decimal Drake"
        ( Course2, Unit 1 ) ->  "Sense Golem"
        ( Course2, Unit 2 ) ->  "Monomial Beast"
        ( Course2, Unit 3 ) ->  "Equation Shade"
        ( Course2, Unit 4 ) ->  "Ratio Wraith"
        ( Course2, Unit 5 ) ->  "Slope Specter"
        ( Course2, Unit 6 ) ->  "Angle Fiend"
        ( Course2, Unit 7 ) ->  "Volume Titan"
        ( Course2, Unit 8 ) ->  "Probability Lich"
        ( Course2, MegaBoss ) -> "Proportion Hydra"
        ( PreAlgebra, Unit 1 ) ->  "Root Revenant"
        ( PreAlgebra, Unit 2 ) ->  "Poly Phantom"
        ( PreAlgebra, Unit 3 ) ->  "Multi-Step Mage"
        ( PreAlgebra, Unit 4 ) ->  "Percent Predator"
        ( PreAlgebra, Unit 5 ) ->  "Slope Stalker"
        ( PreAlgebra, Unit 6 ) ->  "System Serpent"
        ( PreAlgebra, Unit 7 ) ->  "Theorem Troll"
        ( PreAlgebra, Unit 8 ) ->  "Volume Viper"
        ( PreAlgebra, Unit 9 ) ->  "Scatter Shade"
        ( PreAlgebra, MegaBoss ) -> "Linear Lich"
        ( Algebra1, Unit 1 ) ->  "Algebra Ogre"
        ( Algebra1, Unit 2 ) ->  "Equation Wraith"
        ( Algebra1, Unit 3 ) ->  "Function Fiend"
        ( Algebra1, Unit 4 ) ->  "Linear Leviathan"
        ( Algebra1, Unit 5 ) ->  "System Specter"
        ( Algebra1, Unit 6 ) ->  "Exponent Elemental"
        ( Algebra1, Unit 7 ) ->  "Poly Predator"
        ( Algebra1, Unit 8 ) ->  "Quadra Shade"
        ( Algebra1, Unit 9 ) ->  "Regression Revenant"
        ( Algebra1, Unit 10 ) -> "Rational Reaper"
        ( Algebra1, Unit 11 ) -> "Radical Rider"
        ( Algebra1, Unit 12 ) -> "Variance Viper"
        ( Algebra1, MegaBoss ) -> "Quadratic Dragon"
        _ -> "Unknown"


bossHpFor : UnitId -> Int
bossHpFor uid =
    case ( uid.course, uid.unit ) of
        ( _, MegaBoss ) ->
            350

        ( Course1, _ ) ->
            280

        ( Course2, _ ) ->
            280

        ( PreAlgebra, _ ) ->
            280

        ( Algebra1, _ ) ->
            280


unitMeta : UnitId -> UnitMeta
unitMeta uid =
    { id = uid
    , name = unitName uid
    , bossName = bossName uid
    , bossHp = bossHpFor uid
    , problemCount = 7
    }


-- QUESTS


type alias QuestDef =
    { name : String
    , story : String
    , minCorrect : Int
    }


questsFor : UnitId -> List QuestDef
questsFor uid =
    case ( uid.course, uid.unit ) of
        -- ── Course 1 ──────────────────────────────────────────────────────────

        ( Course1, Unit 1 ) ->
            [ { name = "Place Value & Rounding"
              , story = "The Number Golem guards the Valley of Digits, hurling boulders carved with numerals. Show him you can read the land by rounding and comparing the stones he throws."
              , minCorrect = 3
              }
            , { name = "Adding & Subtracting"
              , story = "A bridge over the Chasm of Sums has crumbled, and monsters lurk below. Prove your strength by adding and subtracting your way to the other side."
              , minCorrect = 3
              }
            , { name = "Multiplying & Dividing"
              , story = "Goblin raiders have split the royal treasure into equal piles and scattered them. Multiply your speed and divide your enemies to reclaim what is lost."
              , minCorrect = 3
              }
            , { name = "Divisibility Rules"
              , story = "The Iron Gate of the dungeon only opens when the correct number is spoken. Master the secret rules of divisibility to pass through unharmed."
              , minCorrect = 3
              }
            , { name = "Whole Number Applications"
              , story = "The village elder needs supplies divided among the townsfolk, and monsters threaten unless the math is right. Solve these real-world whole-number problems before the siege begins."
              , minCorrect = 3
              }
            , { name = "Powers & Exponents"
              , story = "A dragon's roar grows with every echo — each shout squared, each breath cubed. Learn the law of perfect powers before the beast's might overwhelms you."
              , minCorrect = 3
              }
            , { name = "Perfect Squares"
              , story = "The Crystal Golem's armour is arranged in perfect square formations. Only by naming each square number exactly can you find the cracks in its defenses."
              , minCorrect = 3
              }
            , { name = "Perfect Cubes"
              , story = "Deep in the dungeon, the Cube Warden stacks stone in cubic towers of increasing power. Master the perfect cubes to predict and topple each tower."
              , minCorrect = 3
              }
            , { name = "Order of Operations"
              , story = "The wizard's spell book is written in a precise order; cast the steps wrong and the magic turns on you. Follow the order of operations to defeat the Arcane Sentinel."
              , minCorrect = 3
              }
            , { name = "Properties of Numbers"
              , story = "The Commutative Cultists rearrange the dungeon tiles to confuse heroes. Show them that no matter the order or grouping, your arithmetic cannot be tricked."
              , minCorrect = 3
              }
            , { name = "Prime Factorization"
              , story = "The Stone Golem is made of composite boulders that crumble only when broken into their prime factors. Shatter each number to its irreducible core."
              , minCorrect = 3
              }
            , { name = "GCF & LCM"
              , story = "Two rival clans meet at the crossroads, and only the warrior who finds the greatest common bond or the least common meeting time can broker peace. Master GCF and LCM to end the feud."
              , minCorrect = 4
              }
            , { name = "GCF & LCM Applications"
              , story = "The dungeon quartermaster must distribute rations in equal groups with nothing left over. Solve these real-world GCF and LCM problems before the army starves."
              , minCorrect = 3
              }
            ]

        ( Course1, Unit 2 ) ->
            [ { name = "Intro to Integers"
              , story = "You step beyond the walls of the village into the Frozen Tundra, where temperatures plunge below zero. Plot your position on the number line to survive the bitter cold."
              , minCorrect = 3
              }
            , { name = "Adding Integers"
              , story = "The Integer Imp steals your gold and then hands some back — sometimes you gain, sometimes you lose. Add the imp's transactions to keep track of your coin."
              , minCorrect = 3
              }
            , { name = "Subtracting Integers"
              , story = "The Frost Wraith strikes from the left side of zero, driving your score deep into negative territory. Subtract your way back to safety before the cold claims you."
              , minCorrect = 3
              }
            , { name = "Multiplying Integers"
              , story = "The cursed mirror doubles every negative curse cast upon you. Understand how multiplying negatives flips the sign, and turn the curse back on your enemies."
              , minCorrect = 3
              }
            , { name = "Dividing Integers"
              , story = "The dungeon spoils must be split equally among surviving warriors, even when debt is shared. Divide integers correctly to claim your rightful share."
              , minCorrect = 3
              }
            , { name = "Integer Applications"
              , story = "The kingdom sends you to chart the depths of the Abyss Mine and the peaks of the Skyreach Tower. Use integers to solve real-world problems of elevation, temperature, and debt."
              , minCorrect = 3
              }
            , { name = "Order of Operations"
              , story = "The Arcane Forge demands its enchantments be applied in a strict sequence. Get the order wrong and the magic backfires — solve integer expressions with full order-of-operations rules."
              , minCorrect = 3
              }
            , { name = "Coordinate Plane"
              , story = "The Dragon's treasure map uses a mysterious grid of axes. Navigate the four quadrants, identify hidden landmarks, and plot your route to the hoard."
              , minCorrect = 3
              }
            ]

        ( Course1, Unit 3 ) ->
            [ { name = "Simplifying Fractions"
              , story = "The Fraction Phantom wears a disguise of unreduced form. Strip away its mask by simplifying each fraction to reveal the true creature beneath."
              , minCorrect = 3
              }
            , { name = "Equivalent Fractions"
              , story = "The Phantom multiplies its illusions — many fractions that look different but are secretly the same. Identify the equivalent forms to see through its tricks."
              , minCorrect = 3
              }
            , { name = "Adding Fractions (Like Denominators)"
              , story = "The Fraction Phantom has split the healing potion into equal-sized shards. Combine the pieces with the same denominator before your party falls."
              , minCorrect = 3
              }
            , { name = "Adding Fractions (Unlike Denominators)"
              , story = "The potion shards come in mismatched sizes this time. Find a common vessel — the LCD — and pour them together to restore the healing draught."
              , minCorrect = 3
              }
            , { name = "Subtracting Fractions"
              , story = "A curse has eaten away at your shield piece by piece. Subtract the fractional damage and calculate how much protection remains."
              , minCorrect = 3
              }
            , { name = "Multiplying Fractions"
              , story = "The enchanted scroll grants only a fraction of its power for each fraction of the ritual completed. Multiply the fractions to reveal the spell's true strength."
              , minCorrect = 3
              }
            , { name = "Dividing Fractions"
              , story = "The ancient bridge is one-half of a league long, but your steps cover only a fraction of that. Divide to learn exactly how many steps stand between you and the other shore."
              , minCorrect = 3
              }
            , { name = "Fraction Applications"
              , story = "The castle cook must portion out fractional amounts of each ingredient for the victory feast. Solve these real-world fraction problems before the guests arrive."
              , minCorrect = 3
              }
            , { name = "Decimal Place Value & Rounding"
              , story = "The royal treasurer records all taxes to the nearest tenth and hundredth. Master decimal place value and rounding to audit the books before the tax revolt."
              , minCorrect = 3
              }
            , { name = "Adding & Subtracting Decimals"
              , story = "The merchant's ledger records every coin in decimals, and bandits have tampered with the totals. Add and subtract the columns correctly to expose the fraud."
              , minCorrect = 3
              }
            , { name = "Multiplying Decimals"
              , story = "Each arrow in the quiver costs a fraction of a gold piece, and you need dozens for the siege. Multiply the decimals to tally the true cost before the armorer closes."
              , minCorrect = 3
              }
            , { name = "Dividing by Whole Numbers"
              , story = "The spoils of battle must be shared equally among the warriors, down to the last tenth of a gold coin. Divide each decimal prize without error."
              , minCorrect = 3
              }
            , { name = "Dividing Decimals"
              , story = "The alchemist's recipe calls for a precise decimal portion divided into equal doses. Divide without error or the potion becomes poison."
              , minCorrect = 4
              }
            , { name = "Negative Rational Numbers"
              , story = "The dungeon plunges below sea level where temperatures and debts both turn negative. Add and subtract negative fractions and decimals to navigate safely."
              , minCorrect = 3
              }
            ]

        ( Course1, Unit 4 ) ->
            [ { name = "Variables & Expressions"
              , story = "The Expression Elemental hides its true form behind unknown symbols. Learn to read the language of variables and expose the creature for what it is."
              , minCorrect = 3
              }
            , { name = "Evaluating Expressions"
              , story = "The dungeon door's lock changes with every visit, its combination stored in an expression. Substitute the given values and turn the tumblers to open the way forward."
              , minCorrect = 3
              }
            , { name = "Combining Like Terms"
              , story = "Scattered potion bottles litter the wizard's chamber — potions of the same kind must be gathered before the battle begins. Combine like terms to simplify your arsenal."
              , minCorrect = 3
              }
            , { name = "Distributive Property"
              , story = "The Elemental surrounds itself with identical minions at every corner. Use the distributive law to sweep them all away in one decisive strike."
              , minCorrect = 3
              }
            , { name = "Translating Expressions"
              , story = "The village oracle speaks only in riddles of words, but the wizard demands pure algebra. Translate the oracle's phrases into expressions before the spell expires."
              , minCorrect = 3
              }
            , { name = "Simplifying Expressions"
              , story = "The Elemental's form is tangled — distribute its outer shell and combine what remains. Simplify the expression completely to reveal its true power level."
              , minCorrect = 3
              }
            , { name = "Factoring Expressions"
              , story = "The dungeon door is locked behind a factored expression. Pull out the common factor from each term and the lock will yield to your hand."
              , minCorrect = 3
              }
            , { name = "Algebraic Properties"
              , story = "The ancient runes on the wall display the fundamental laws of algebra. Name each property correctly and the runes will light the path to the boss chamber."
              , minCorrect = 3
              }
            ]

        ( Course1, Unit 5 ) ->
            [ { name = "One-Step Equations (Add/Sub)"
              , story = "The Equation Knight has stolen a number and hidden it behind a wall of addition. Undo his trick with a single reverse operation to reclaim the unknown."
              , minCorrect = 3
              }
            , { name = "One-Step Equations (Mul/Div)"
              , story = "A troll has multiplied the curse tenfold to confuse you. Divide both sides of the enchantment to isolate the truth and break the hex."
              , minCorrect = 3
              }
            , { name = "Two-Step Equations"
              , story = "The Equation Knight fights in two phases, first adding poison then multiplying his strength. Unravel both steps in order to land the finishing blow."
              , minCorrect = 4
              }
            , { name = "Inequalities"
              , story = "The bridge troll allows only heroes whose strength exceeds a certain threshold to pass. Solve the inequality and prove you are greater than what he demands."
              , minCorrect = 3
              }
            , { name = "Writing Equations"
              , story = "The royal scribe has left word problems in plain speech, but the dungeon gate requires pure algebra. Translate each scenario into an equation and solve for the unknown."
              , minCorrect = 3
              }
            , { name = "Inequality Solutions"
              , story = "The Knight posts a list of numbers at the castle gate, claiming only some satisfy his challenge. Identify which values make the inequality true and call his bluff."
              , minCorrect = 3
              }
            , { name = "Solving Inequalities"
              , story = "The Equation Knight returns with a range of demands rather than a single value. Solve the inequality completely and graph your answer to claim victory."
              , minCorrect = 3
              }
            ]

        ( Course1, Unit 6 ) ->
            [ { name = "Ratios"
              , story = "The Ratio Serpent guards a recipe for the antidote written in parts — get the proportion wrong and the cure becomes a curse. Master ratios to brew it right."
              , minCorrect = 3
              }
            , { name = "Equivalent Ratios"
              , story = "The Serpent hides among identical-looking potions that are secretly the same ratio in disguise. Find the equivalent forms before you drink the wrong one."
              , minCorrect = 3
              }
            , { name = "Unit Rates"
              , story = "The goblin courier charges by the league, but you need to know the cost per step to budget your gold. Calculate the unit rate before the courier vanishes."
              , minCorrect = 3
              }
            , { name = "Proportions"
              , story = "The Serpent's lair is a scaled map of the dungeon, and wrong proportions send heroes into walls. Set up and solve the proportion to navigate safely to the exit."
              , minCorrect = 3
              }
            , { name = "Converting Fractions, Decimals & Percents"
              , story = "The dungeon merchant posts prices in three different forms and refuses to accept the wrong one. Convert between fractions, decimals, and percents before the deal falls through."
              , minCorrect = 3
              }
            , { name = "Percents"
              , story = "The dragon's hoard is taxed by the king, and the tax collectors quote only percentages. Find the true amount owed or lose your share of the plunder."
              , minCorrect = 3
              }
            , { name = "Percent of a Number"
              , story = "The wizard's potion restores only a percentage of your maximum health. Calculate the exact amount healed before the next monster strikes."
              , minCorrect = 3
              }
            ]

        ( Course1, Unit 7 ) ->
            [ { name = "Perimeter"
              , story = "The castle wall must be reinforced with iron bands, and the blacksmith needs the exact perimeter of each section. Measure the boundary before the siege engines arrive."
              , minCorrect = 3
              }
            , { name = "Area of Rectangles & Parallelograms"
              , story = "The Geometry Gargoyle has sealed the throne room with stone tiles, and you must count every square inch to know where to strike. Calculate the area before the door closes forever."
              , minCorrect = 3
              }
            , { name = "Area of Triangles"
              , story = "The dungeon floor is split into triangular traps, each charged with a different amount of dark energy proportional to its area. Find each triangle's area to disarm the grid."
              , minCorrect = 3
              }
            , { name = "Area of Trapezoids"
              , story = "The Gargoyle rearranges the floor into trapezoidal sections to confuse your footing. Calculate each trapezoid's area to find the safe squares before you step."
              , minCorrect = 3
              }
            , { name = "Circumference & Area of Circles"
              , story = "A circular rune on the dungeon floor pulses with power, and the wizard needs its exact circumference and area to contain it. Measure the rune before the pulse explodes."
              , minCorrect = 3
              }
            , { name = "Surface Area"
              , story = "To coat the stone prison with warding magic, the mage must know every outer surface of the rectangular prism. Calculate the surface area or leave a gap for evil to seep through."
              , minCorrect = 3
              }
            , { name = "Volume of Prisms"
              , story = "The Gargoyle fills stone prism traps with poison gas — knowing the volume tells you how long you have before the air runs out. Calculate the volume and time your escape."
              , minCorrect = 4
              }
            ]

        ( Course1, Unit 8 ) ->
            [ { name = "Mean"
              , story = "The Stats Sphinx demands you prove your worth by finding the average number of monsters slain by your party. Compute the mean or become its next riddle."
              , minCorrect = 3
              }
            , { name = "Median & Mode"
              , story = "The Sphinx poses two more riddles — find the middle value of the battle scores and the score that appears most often. Solve both to earn passage to the next chamber."
              , minCorrect = 3
              }
            , { name = "Range"
              , story = "The Sphinx tests how wildly your party's skills vary from the weakest to the strongest warrior. Find the range and show that you understand the full spread of power."
              , minCorrect = 3
              }
            , { name = "Interpreting Graphs"
              , story = "The dungeon archives hold battle records charted in cryptic bar graphs and line plots. Read the charts correctly to reveal the enemy's weakness before the final assault."
              , minCorrect = 3
              }
            , { name = "Quartiles & IQR"
              , story = "The Sphinx reveals a deeper secret: the spread within the middle half of the data. Find the quartiles and the interquartile range to unlock the inner sanctum."
              , minCorrect = 3
              }
            , { name = "Mean Absolute Deviation"
              , story = "The final riddle of the Stats Sphinx asks how far each warrior strays from the average. Calculate the mean absolute deviation to prove you understand true variability."
              , minCorrect = 3
              }
            ]

        ( Course1, MegaBoss ) ->
            []

        -- ── Course 2 (stubs) ──────────────────────────────────────────────────

        ( Course2, Unit 1 ) ->
            [ { name = "Adding & Subtracting Positives"
              , story = "The Sense Golem pelts the village gate with numbered boulders, each carved with a sum or difference. Prove your addition and subtraction to hold the gate."
              , minCorrect = 3
              }
            , { name = "Adding & Subtracting Negatives"
              , story = "Frost wraiths descend from the north with negative energy blasts. Only a hero who can add and subtract across zero can drive them back."
              , minCorrect = 3
              }
            , { name = "Multiplying & Dividing Integers"
              , story = "The Golem spawns cursed twins — multiplied negatives that flip signs and divide the party. Master integer multiplication and division to restore order."
              , minCorrect = 3
              }
            , { name = "Simplifying Fractions"
              , story = "The Golem wears armour disguised as unsimplified fractions, each piece hiding a simpler truth. Reduce every fraction to expose its weakest form."
              , minCorrect = 3
              }
            , { name = "Adding & Subtracting Fractions"
              , story = "Healing potions arrive in fractional doses with mismatched labels. Add and subtract across unlike denominators before the party's health runs dry."
              , minCorrect = 3
              }
            , { name = "Multiplying & Dividing Fractions"
              , story = "The dungeon recipe for the antidote multiplies and divides fractional ingredients. Get the math wrong and the cure becomes a curse."
              , minCorrect = 3
              }
            , { name = "Fractions, Decimals & Percents"
              , story = "Three merchants block the road, each quoting the toll in a different form — fraction, decimal, and percent. Convert between them all to pay and pass."
              , minCorrect = 3
              }
            , { name = "Exponents & Square Roots"
              , story = "The Golem's final shield is inscribed with exponents and square roots. Calculate each value to shatter the shield and defeat the creature."
              , minCorrect = 3
              }
            ]

        ( Course2, Unit 2 ) ->
            [ { name = "Order of Operations"
              , story = "The Monomial Beast attacks in a precise sequence — wrong order means wrong answer and certain doom. Follow PEMDAS to survive the onslaught."
              , minCorrect = 3
              }
            , { name = "Translating & Evaluating Expressions"
              , story = "The beast's ransom demands are written in plain speech, but the dungeon gate reads only algebra. Translate each phrase and evaluate to open the way."
              , minCorrect = 3
              }
            , { name = "Combining Like Terms"
              , story = "Scattered potion bottles litter the beast's lair — matching types must be gathered before the battle begins. Combine like terms to simplify your arsenal."
              , minCorrect = 3
              }
            , { name = "Distributive Property"
              , story = "The beast surrounds itself with identical minions at every corner. Use the distributive law to sweep them all away in one decisive strike."
              , minCorrect = 3
              }
            , { name = "Simplifying Expressions"
              , story = "The beast's form is tangled with redundant layers. Distribute and combine until the expression stands in its simplest, most vulnerable shape."
              , minCorrect = 3
              }
            , { name = "Factoring Expressions"
              , story = "The beast's armour is bound together by a common factor. Pull out the GCF and the pieces fall apart, leaving the creature exposed."
              , minCorrect = 3
              }
            , { name = "Monomial Operations"
              , story = "Swarms of monomials multiply, divide, and raise each other to powers. Master the exponent rules to predict and counter every transformation."
              , minCorrect = 3
              }
            ]

        ( Course2, Unit 3 ) ->
            [ { name = "One-Step Equations"
              , story = "The Equation Shade vanishes behind a single veil of mystery. Peel it back with one inverse operation to reveal the hidden variable."
              , minCorrect = 3
              }
            , { name = "Two-Step Equations"
              , story = "The Shade retreats behind two layers of operations — first addition, then multiplication. Undo each step in reverse order to corner the creature."
              , minCorrect = 3
              }
            , { name = "Multi-Step Equations"
              , story = "The Shade wraps itself in layer upon layer of operations to elude you. Distribute, combine, then isolate until the unknown stands exposed."
              , minCorrect = 4
              }
            , { name = "One-Step Inequalities"
              , story = "The Shade posts guards with a single condition: only heroes stronger than a threshold may pass. Solve the one-step inequality to prove your worth."
              , minCorrect = 3
              }
            , { name = "Two-Step Inequalities"
              , story = "The Shade demands two tests of valor before yielding. Solve both steps of the inequality and map the full range of heroes who qualify."
              , minCorrect = 3
              }
            ]

        ( Course2, Unit 4 ) ->
            [ { name = "Ratio Riddles"
              , story = "The Ratio Wraith shifts its form to match any proportion it chooses, confusing all who pursue it. Simplify the ratio to predict the Wraith's true shape."
              , minCorrect = 3
              }
            , { name = "Rates & Unit Rates"
              , story = "The Wraith charges tolls by the league, but the fine print lists only total fees. Calculate the unit rate to expose the true cost at every checkpoint."
              , minCorrect = 3
              }
            , { name = "Solving Proportions"
              , story = "The Wraith seals a door with a missing value in a proportion. Cross-multiply to find the unknown and force the door open."
              , minCorrect = 3
              }
            , { name = "Scale Drawings & Models"
              , story = "The Wraith's lair is mapped at a fraction of true scale, and wrong conversions send heroes into walls. Use the map scale to find real distances."
              , minCorrect = 3
              }
            , { name = "Similar Figures"
              , story = "The Wraith conjures a shadow twin of the dungeon in a different size. Identify the scale factor between similar figures to expose the real passage."
              , minCorrect = 3
              }
            , { name = "Percent Proportion"
              , story = "The Wraith demands a percentage of the party's gold at each gate. Set up the percent proportion to calculate exactly how much you owe."
              , minCorrect = 3
              }
            , { name = "Discounts, Mark-Ups & Tips"
              , story = "The dungeon market fluctuates wildly — prices drop with discounts and rise with mark-ups. Calculate the final price before the Wraith claims the difference."
              , minCorrect = 3
              }
            , { name = "Simple Interest"
              , story = "The Wraith loans gold at interest, then vanishes before heroes realize the true cost. Compute the simple interest owed to escape the debt trap."
              , minCorrect = 3
              }
            ]

        ( Course2, Unit 5 ) ->
            [ { name = "Parts of the Coordinate Plane"
              , story = "The Slope Specter leaves coordinate clues across the grid-patterned dungeon floor. Identify each quadrant correctly to trace the specter's path."
              , minCorrect = 3
              }
            , { name = "Relations & Functions"
              , story = "The Specter surrounds itself with relations — some true functions, some imposters. Apply the definition to expose every fake and find the real creature."
              , minCorrect = 3
              }
            , { name = "Slope from Two Points"
              , story = "The Specter climbs walls at a constant angle only a true mathematician can measure. Calculate the slope from two points to intercept it at the summit."
              , minCorrect = 3
              }
            , { name = "Slope-Intercept Form"
              , story = "The dungeon map charts the Specter's patrol in y = mx + b form. Evaluate the function to pinpoint the creature's location at any moment."
              , minCorrect = 3
              }
            , { name = "Linear Function Values"
              , story = "The Specter's speed is encoded in f(x) notation on a crumbling scroll. Evaluate the function at key values to predict every waypoint on its route."
              , minCorrect = 3
              }
            , { name = "Proportional Relationships"
              , story = "The Specter moves at a constant rate — a perfect proportional relationship. Find the constant of variation and project the beast's next position."
              , minCorrect = 3
              }
            ]

        ( Course2, Unit 6 ) ->
            [ { name = "Classifying Angles"
              , story = "The Angle Fiend carves angles into every dungeon wall to disorient heroes. Classify each angle as acute, right, obtuse, or straight to navigate safely."
              , minCorrect = 3
              }
            , { name = "Complementary & Supplementary Angles"
              , story = "The Fiend splits corridors at angles that must sum to 90° or 180°. Find the missing angle to straighten the path and advance."
              , minCorrect = 3
              }
            , { name = "Vertical Angles"
              , story = "The Fiend stands at the intersection of two blades, claiming the angles are different. Prove they are equal — vertical angles never lie."
              , minCorrect = 3
              }
            , { name = "Triangle Sum Theorem"
              , story = "The Fiend hides behind triangular shields with one angle concealed. Use the triangle angle sum to reveal the hidden measure and shatter the shield."
              , minCorrect = 3
              }
            , { name = "Classifying Triangles"
              , story = "The Fiend morphs between equilateral, isosceles, and scalene forms. Name each triangle type correctly to strip away its disguise."
              , minCorrect = 3
              }
            , { name = "Translations"
              , story = "The Fiend slides across the dungeon grid, always moving by a fixed vector. Track the translation to find exactly where the creature will reappear."
              , minCorrect = 3
              }
            ]

        ( Course2, Unit 7 ) ->
            [ { name = "Perimeter & Area"
              , story = "The Volume Titan seals the treasure room with stone tiles, and you must calculate every edge and square unit to find the hidden lever. Measure precisely before the door closes."
              , minCorrect = 3
              }
            , { name = "Circumference & Area of Circles"
              , story = "Circular runes pulsing on the dungeon floor hold the Titan's power. Calculate their circumference and area to contain the energy before it explodes."
              , minCorrect = 3
              }
            , { name = "Surface Area of Rectangular Prisms"
              , story = "The Titan wraps itself in stone armour shaped like a rectangular prism. Calculate the total surface area to know exactly how much magic coating to apply."
              , minCorrect = 3
              }
            , { name = "Surface Area of Cylinders"
              , story = "The Titan's cylindrical traps must be sealed with warding metal. Compute the full surface area so the blacksmith can cut the right amount of steel."
              , minCorrect = 3
              }
            , { name = "Volume of Rectangular Prisms"
              , story = "The Titan fills rectangular chambers with poison gas. Knowing the volume tells you how long you have before the air runs out — calculate it and run."
              , minCorrect = 3
              }
            , { name = "Volume of Cylinders"
              , story = "Cylindrical cisterns scattered across the Titan's lair hold the flooding water. Find each cylinder's volume to predict when the chamber will overflow."
              , minCorrect = 3
              }
            ]

        ( Course2, Unit 8 ) ->
            [ { name = "Simple Probability"
              , story = "The Probability Lich casts spells at random, and only by knowing the true odds can you dodge them in time. Calculate the probability of each attack."
              , minCorrect = 3
              }
            , { name = "Counting Principle"
              , story = "The Lich locks its phylactery behind a combination of choices — shirt, color, and key. Use the counting principle to enumerate every possibility."
              , minCorrect = 3
              }
            , { name = "Compound Probability"
              , story = "The Lich attacks with two spells at once — independent events chained together. Multiply the probabilities to find the true odds of both landing."
              , minCorrect = 3
              }
            , { name = "Mean, Median & Mode"
              , story = "The dungeon archives hold centuries of battle records. Find the mean, median, and mode of the data to reveal the Lich's hidden pattern of attack."
              , minCorrect = 3
              }
            , { name = "Box-and-Whisker Plots"
              , story = "The Lich's damage records spread across a wide range. Find the IQR from the quartiles to measure the true spread of its power."
              , minCorrect = 3
              }
            , { name = "Stem-and-Leaf Plots"
              , story = "The Lich's attack log is recorded on ancient scrolls in stem-and-leaf form. Decode each entry to reconstruct the data set and predict the next strike."
              , minCorrect = 3
              }
            ]

        ( Course2, MegaBoss ) ->
            []

        -- ── Pre-Algebra ───────────────────────────────────────────────────────

        ( PreAlgebra, Unit 1 ) ->
            [ { name = "Absolute Value"
              , story = "The Root Revenant dwells at zero on the number line, casting curses of equal strength in both directions. Master absolute value to measure the true distance of each curse and turn it back on the beast."
              , minCorrect = 3
              }
            , { name = "Simplifying Fractions"
              , story = "The Revenant hides behind fractions in their most complex disguise, each one reducible to a simpler truth. Strip them down to lowest terms and expose the creature's real form."
              , minCorrect = 3
              }
            , { name = "Fraction Operations"
              , story = "The dungeon vault is sealed by a lock that only opens when the correct fractional sum is entered. Add, subtract, multiply, and divide fractions to crack the combination."
              , minCorrect = 3
              }
            , { name = "Zero & Negative Exponents"
              , story = "The Revenant flips its power to the dark side, wielding negative and zero exponents as shields. Learn the rules of inverted powers to strip away its defence."
              , minCorrect = 3
              }
            , { name = "Square Roots"
              , story = "The dungeon walls are carved with square rune locks — each rune is a perfect square whose root unlocks a door. Extract each square root before the corridor collapses."
              , minCorrect = 3
              }
            , { name = "Cube Roots"
              , story = "Deeper in the dungeon, cubic rune vaults demand their cube roots before granting passage. Solve each cubic lock to reveal the hidden chambers beyond."
              , minCorrect = 3
              }
            , { name = "Scientific Notation"
              , story = "The archive of the Revenant's ancient wars records casualties in numbers too vast to write in full. Rewrite them in scientific notation to fit the enchanted stone tablets."
              , minCorrect = 3
              }
            , { name = "Order of Operations"
              , story = "The Revenant scrambles the order of spells to maximize chaos, but a true mathematician knows the sequence. Apply the correct order of operations to unravel each enchantment."
              , minCorrect = 3
              }
            ]

        ( PreAlgebra, Unit 2 ) ->
            [ { name = "Translating Expressions"
              , story = "The Poly Phantom speaks in riddles of words that must be decoded into algebra. Translate each phrase into a proper expression or the Phantom's power will compound unchecked."
              , minCorrect = 3
              }
            , { name = "Combining Like Terms"
              , story = "Spectral monomials float loose in the dungeon hall, and only by gathering the like ones can you weaken the Phantom's form. Combine the terms and strip the creature of its layers."
              , minCorrect = 3
              }
            , { name = "Distribute & Combine"
              , story = "The Phantom cloaks itself in parentheses that must be opened before the like terms within can be gathered. Distribute the factor, then combine to simplify the expression completely."
              , minCorrect = 3
              }
            , { name = "Factoring Linear Expressions"
              , story = "The Phantom's bindings are written as expanded expressions — factor out the greatest common factor to collapse the binding and weaken the creature."
              , minCorrect = 3
              }
            , { name = "Monomial Operations"
              , story = "The Phantom's limbs are monomials that multiply and divide in combat. Apply the exponent rules to predict the outcome of each exchange and stay one step ahead."
              , minCorrect = 3
              }
            , { name = "Adding & Subtracting Polynomials"
              , story = "Two spectral polynomial armies collide in the dungeon hall. Combine their like terms to merge the forces under one banner and march on the Phantom's lair."
              , minCorrect = 3
              }
            ]

        ( PreAlgebra, Unit 3 ) ->
            [ { name = "One-Step Equations"
              , story = "The Multi-Step Mage opens with a simple trick — a single-operation equation designed to lower your guard. Solve each one cleanly before the Mage escalates the assault."
              , minCorrect = 3
              }
            , { name = "Rational Equations"
              , story = "The Mage hides the variable beneath a fraction, daring you to multiply through and expose it. Isolate x and break the Mage's fractional shield."
              , minCorrect = 3
              }
            , { name = "Two-Step Equations"
              , story = "The Mage attacks in two phases — first adding a constant to confuse, then multiplying to conceal. Undo both operations in reverse order to find the hidden value."
              , minCorrect = 4
              }
            , { name = "Solving by Square Roots"
              , story = "The Mage squares the variable and dares you to unsquare it. Take the square root of both sides to reveal what was hidden beneath the exponent."
              , minCorrect = 3
              }
            , { name = "Multi-Step Equations"
              , story = "The Mage layers operations three deep — distribute, combine, then isolate. Work through every step without error to bring the creature to its knees."
              , minCorrect = 4
              }
            , { name = "Equations with Fractions"
              , story = "The Mage encloses the variable in a fractional cage and sets a condition on the whole. Clear the denominator to open the cage and solve for x."
              , minCorrect = 3
              }
            , { name = "Two-Step Inequalities"
              , story = "The Mage sets not a single target but a range of forbidden values. Solve the two-step inequality and identify the full territory the hero may safely occupy."
              , minCorrect = 3
              }
            ]

        ( PreAlgebra, Unit 4 ) ->
            [ { name = "Simplifying Ratios"
              , story = "The Percent Predator guards the market in disguise, quoting prices in unsimplified ratios to confuse buyers. Simplify each ratio to expose the true exchange rate and foil the creature."
              , minCorrect = 3
              }
            , { name = "Unit Rates"
              , story = "The Predator charges by the batch but hides the per-unit cost to overcharge heroes. Divide the total by the quantity to find the true unit rate before paying up."
              , minCorrect = 3
              }
            , { name = "Solving Proportions"
              , story = "The Predator's lair is mapped in scaled proportions, and crossing the wrong threshold means a trap. Set up and solve the cross-multiplication to navigate safely."
              , minCorrect = 3
              }
            , { name = "Similar Figures"
              , story = "The Predator projects illusions of itself at different scales to confuse the eye. Use the scale factor between similar figures to determine the true size of each image."
              , minCorrect = 3
              }
            , { name = "Percent Proportion"
              , story = "The Predator taxes every transaction in the dungeon market at a percentage rate. Apply the percent proportion to calculate each levy before it empties your coin pouch."
              , minCorrect = 3
              }
            , { name = "Percent of Change"
              , story = "The Predator raises and lowers prices at will to confuse merchants. Calculate the percent increase or decrease to track the creature's scheme and stay solvent."
              , minCorrect = 3
              }
            , { name = "Simple Interest"
              , story = "The Predator loans gold at a fixed annual rate, then demands full repayment before heroes realize how much they owe. Compute the simple interest to expose the trap in time."
              , minCorrect = 3
              }
            ]

        ( PreAlgebra, Unit 5 ) ->
            [ { name = "Functions & Domain/Range"
              , story = "The Slope Stalker patrols only within specific input and output boundaries. Determine the domain and range of each relation to map the creature's territory before pursuing it."
              , minCorrect = 3
              }
            , { name = "Slope from Two Points"
              , story = "Two scouts reported the Stalker's position at different times. Use those two coordinates to calculate the slope of its path and predict where it will strike next."
              , minCorrect = 3
              }
            , { name = "The Slope Formula"
              , story = "The dungeon surveyor has marked two waypoints along the Stalker's route. Apply the slope formula to determine the exact steepness of its approach."
              , minCorrect = 3
              }
            , { name = "Slope-Intercept Form"
              , story = "The Stalker's full trajectory is encoded in y = mx + b. Read the slope and y-intercept directly from the equation and use them to predict every position on the path."
              , minCorrect = 3
              }
            , { name = "Writing Linear Equations"
              , story = "A scout witnessed the Stalker pass two landmarks. Write the linear equation from those two points to project the creature's destination before it vanishes."
              , minCorrect = 4
              }
            , { name = "Direct Variation"
              , story = "The Stalker's speed varies directly with the phase of the moon — a perfect proportional relationship. Use the constant of variation to predict its pace under any moon."
              , minCorrect = 3
              }
            , { name = "Identifying Slope & Intercept"
              , story = "The Stalker leaves equations carved in stone at each campsite. Read each equation in slope-intercept form and extract the slope and y-intercept to reconstruct its route."
              , minCorrect = 3
              }
            ]

        ( PreAlgebra, Unit 6 ) ->
            [ { name = "Systems by Substitution"
              , story = "The System Serpent's two heads patrol paths that can be related by a single substitution. Fold one equation into the other to reduce the system and strike at the convergence point."
              , minCorrect = 4
              }
            , { name = "Systems by Elimination"
              , story = "Neither of the Serpent's heads can be caught alone, but their paths add to a perfect cancellation. Eliminate one variable by combining the equations and isolate the truth."
              , minCorrect = 4
              }
            , { name = "System Word Problems"
              , story = "Villagers report two numbers whose sum and difference are known but whose individual values remain hidden. Set up and solve the system to unmask each number and claim your reward."
              , minCorrect = 3
              }
            , { name = "Systems Challenge"
              , story = "The Serpent's final form demands mastery of all system-solving techniques. Choose your method wisely and find the exact point of intersection before the creature regenerates."
              , minCorrect = 4
              }
            ]

        ( PreAlgebra, Unit 7 ) ->
            [ { name = "Angle Types"
              , story = "The Theorem Troll sets sentinels at every angle of the dungeon — acute guards at sharp bends, obtuse ones at wide passages, and a right-angle golem at the central gate. Name each type to command passage."
              , minCorrect = 3
              }
            , { name = "Angle Relationships"
              , story = "The Troll chains pairs of angles together with enchanted links — complementary bonds summing to 90° and supplementary bonds summing to 180°. Break the link by finding the unknown angle."
              , minCorrect = 3
              }
            , { name = "Triangle Sum Theorem"
              , story = "The Troll's triangular fortress conceals one angle in shadow. Apply the triangle sum theorem — all three angles sum to 180° — to reveal the hidden angle and breach the wall."
              , minCorrect = 3
              }
            , { name = "Pythagorean Theorem"
              , story = "A right-angle bridge spans the chasm guarding the Troll's lair, and one side is missing from the blueprint. Apply the Pythagorean theorem to find the unknown length before the bridge is built wrong."
              , minCorrect = 3
              }
            , { name = "Interior Angles of Polygons"
              , story = "The Troll's outer walls are polygons of many sides, each interior angle locked by a ward. Use the polygon interior-angle formula to calculate the total and disable every ward at once."
              , minCorrect = 3
              }
            , { name = "Reflections & Translations"
              , story = "The Troll uses reflection and translation spells to reposition its guards instantly. Track each transformed coordinate to locate the guard's new post and position your counter-strike."
              , minCorrect = 3
              }
            , { name = "Dilations"
              , story = "The Troll shrinks and enlarges its minions at will using dilation magic. Apply the scale factor to each coordinate to predict the new size and position of the transformed creature."
              , minCorrect = 3
              }
            ]

        ( PreAlgebra, Unit 8 ) ->
            [ { name = "Area & Perimeter"
              , story = "The Volume Viper seals passages with rectangular and triangular stone slabs enchanted by area. Calculate the area of each slab to know exactly how much warding dust is needed to dissolve it."
              , minCorrect = 3
              }
            , { name = "Circle Area & Circumference"
              , story = "Circular rune seals pulsate on the dungeon floor, each demanding its exact area and circumference before it can be safely deactivated. Calculate both measurements to defuse every seal."
              , minCorrect = 3
              }
            , { name = "Composite Figures"
              , story = "The Viper's chamber is floored with composite shapes — rectangles capped with triangles and circles merged with squares. Add the parts together to find the total area before the Viper returns."
              , minCorrect = 3
              }
            , { name = "Volume of Prisms"
              , story = "The Viper stores its venom in rectangular prism vaults sealed with a volume lock. Calculate the volume of each prism to know the correct amount of antidote needed to fill the space."
              , minCorrect = 3
              }
            , { name = "Volume of Cones"
              , story = "The Viper's lairs are conical pits filling with rising acid. Find each cone's volume to determine how long you have before the acid overflows and blocks the exit."
              , minCorrect = 3
              }
            , { name = "Surface Area of Prisms"
              , story = "Sealing the Viper's rectangular vaults requires coating every face with warding stone. Compute the total surface area of each prism so the stonecutters prepare exactly the right amount."
              , minCorrect = 3
              }
            , { name = "Volume of Spheres"
              , story = "The Viper rolls spherical boulders down the corridor, each one a sealed poison vessel. Compute the volume of each sphere to determine the danger level and calculate the required countermeasure."
              , minCorrect = 3
              }
            ]

        ( PreAlgebra, Unit 9 ) ->
            [ { name = "Simple Probability"
              , story = "The Scatter Shade draws attacks at random from a bag of cursed tokens. Calculate the probability of each outcome to know the odds before you commit to a defensive stance."
              , minCorrect = 3
              }
            , { name = "Counting Outcomes"
              , story = "The Shade locks each treasure chest with a combination of choices from several categories. Apply the counting principle to tally every possible combination and narrow down the one that opens the lock."
              , minCorrect = 3
              }
            , { name = "Compound Probability"
              , story = "The Shade chains events together, each independent of the last. Multiply the individual probabilities to find the chance that all outcomes align in the worst-case scenario."
              , minCorrect = 3
              }
            , { name = "Measures of Center"
              , story = "Scouts return with conflicting damage reports, and the commander needs a single representative value. Find the mean, median, or range to distill the data into the one number that guides the next decision."
              , minCorrect = 3
              }
            , { name = "Mean Absolute Deviation"
              , story = "The Shade's attack strength varies unpredictably, and the strategist needs a measure of that variability. Compute the mean absolute deviation to quantify how wildly the Shade's power fluctuates."
              , minCorrect = 3
              }
            , { name = "Two-Way Tables"
              , story = "Informants have filed battle reports sorted by faction and outcome in a two-way table. Read the data correctly to answer the commander's questions and plan the final assault."
              , minCorrect = 3
              }
            ]

        ( PreAlgebra, MegaBoss ) ->
            []

        -- ── Algebra 1 ─────────────────────────────────────────────────────────

        ( Algebra1, Unit 1 ) ->
            [ { name = "Order of Operations"
              , story = "The Algebra Ogre mixes up the order of attacks to batter heroes into submission. Demonstrate perfect order-of-operations discipline to weather the assault."
              , minCorrect = 3
              }
            , { name = "Evaluating Expressions"
              , story = "The Ogre's fortress is sealed by an algebraic lock — substitute the given value and evaluate the expression before the gate slams shut forever."
              , minCorrect = 3
              }
            , { name = "Absolute Value"
              , story = "The Ogre hurls boulders from both sides of zero. No matter the direction, absolute value measures the true distance — master it to predict every impact."
              , minCorrect = 3
              }
            , { name = "Combining Like Terms"
              , story = "The Ogre's armour is made of redundant layers of like terms. Strip them away by combining coefficients and find the core you must pierce."
              , minCorrect = 3
              }
            , { name = "Translating Expressions"
              , story = "Village elders speak of the Ogre's weaknesses only in riddles. Translate each word phrase into algebraic language to decode the secret of its defeat."
              , minCorrect = 3
              }
            , { name = "Two-Step Equations"
              , story = "The Ogre guards the dungeon behind a two-stage lock. Undo each operation in reverse order to peel open the gate and step inside."
              , minCorrect = 4
              }
            , { name = "Two-Step Inequalities"
              , story = "The Ogre will only let heroes of a certain strength range pass. Solve the two-step inequality to prove you fall within the acceptable limits."
              , minCorrect = 3
              }
            ]

        ( Algebra1, Unit 2 ) ->
            [ { name = "Multi-Step Equations"
              , story = "The Equation Wraith attacks through multiple phases of increasing complexity. Solve each step in turn and deny it the power to advance."
              , minCorrect = 4
              }
            , { name = "Variables on Both Sides"
              , story = "The Wraith mirrors your every move, placing variables on both sides of the battlefield. Collect like terms and isolate the truth to break the stalemate."
              , minCorrect = 4
              }
            , { name = "Algebraic Proportions"
              , story = "The Wraith hides inside a ratio, balancing two fractions across an invisible fulcrum. Cross-multiply to topple its equilibrium and drag it into the open."
              , minCorrect = 3
              }
            , { name = "Absolute Value Equations"
              , story = "The Wraith exists in two mirror dimensions simultaneously. Solve the absolute value equation to locate it in both dimensions at once."
              , minCorrect = 3
              }
            , { name = "Literal Equations"
              , story = "The Wraith's true name is hidden in a multi-variable formula. Rearrange the literal equation to isolate the name and speak it aloud."
              , minCorrect = 3
              }
            , { name = "Multi-Step Inequalities"
              , story = "The Wraith declares only heroes within a certain power range may face it. Solve the multi-step inequality to confirm your eligibility before the duel begins."
              , minCorrect = 3
              }
            ]

        ( Algebra1, Unit 3 ) ->
            [ { name = "Domain & Range"
              , story = "The Function Fiend lurks only within certain bounds of input and output. Identify the domain and range to know exactly where to search for the creature."
              , minCorrect = 3
              }
            , { name = "Identifying Functions"
              , story = "The Fiend surrounds itself with relations — some true functions, some imposters. Expose every fake by checking whether each x-value maps to a unique output."
              , minCorrect = 3
              }
            , { name = "Function Notation"
              , story = "The Fiend communicates in f(x) notation that baffles common folk. Learn to read and evaluate function notation to understand its commands."
              , minCorrect = 3
              }
            , { name = "Function Tables"
              , story = "The Fiend leaves a table of encrypted values at every checkpoint. Fill in the missing outputs by applying the function rule to each input."
              , minCorrect = 3
              }
            , { name = "Arithmetic Sequences"
              , story = "The Fiend marches in perfectly spaced waves, each arriving at a predictable interval. Identify the common difference and name the next term before the wave arrives."
              , minCorrect = 3
              }
            ]

        ( Algebra1, Unit 4 ) ->
            [ { name = "Slope from Two Points"
              , story = "The Linear Leviathan rises at a constant rate from the ocean floor. Given two points on its trajectory, calculate the slope before it breaches the surface."
              , minCorrect = 3
              }
            , { name = "Slope-Intercept Form"
              , story = "The Leviathan patrols along a line described in slope-intercept form. Read the slope and y-intercept directly from the equation to chart its exact course."
              , minCorrect = 4
              }
            , { name = "Y-Intercepts"
              , story = "The Leviathan surfaces where the ocean floor meets the y-axis. Set x = 0 in the standard-form equation to pinpoint the landing zone."
              , minCorrect = 3
              }
            , { name = "X-Intercepts"
              , story = "The Leviathan dives at the x-axis, leaving a mark exactly where y = 0. Solve for x to find the dive point before it vanishes beneath the waves."
              , minCorrect = 3
              }
            , { name = "Point-Slope Equations"
              , story = "A lookout spotted the Leviathan at one coordinate moving at a known slope. Write the equation from a single point and the rate to predict its next position."
              , minCorrect = 3
              }
            , { name = "Parallel Lines"
              , story = "The Leviathan carves parallel channels through the seafloor — lines that never meet. Recognize that parallel lines share the same slope to navigate around them."
              , minCorrect = 3
              }
            , { name = "Perpendicular Lines"
              , story = "The Leviathan leaves perpendicular scars that cut channels at right angles. Find the negative reciprocal slope to identify each crossing cut."
              , minCorrect = 3
              }
            ]

        ( Algebra1, Unit 5 ) ->
            [ { name = "Systems by Substitution"
              , story = "One patrol's position is fully determined by the other. Substitute and collapse the system into a single equation to corner the reunited Specter."
              , minCorrect = 4
              }
            , { name = "Systems by Elimination"
              , story = "Neither patrol can be caught alone, but their combined equations contain a cancellation. Eliminate a variable to expose the Specter's hiding place."
              , minCorrect = 4
              }
            , { name = "System Word Problems"
              , story = "The Specter has split the dungeon loot into two unknown piles and left only clues about their sum and difference. Set up and solve the system to reclaim every coin."
              , minCorrect = 3
              }
            , { name = "Identifying System Solutions"
              , story = "The Specter offers several coordinates as its supposed location — only one satisfies both patrol equations. Test each pair and call out the truth."
              , minCorrect = 3
              }
            , { name = "Systems by Graphing"
              , story = "The System Specter splits into two ghostly patrols on intersecting paths. Graph both equations and mark the intersection to summon the Specter into one vulnerable form."
              , minCorrect = 3
              }
            , { name = "Systems of Inequalities"
              , story = "The Specter can roam freely within a shaded region where two inequality conditions overlap. Solve the system of inequalities to fence it inside the smallest possible area."
              , minCorrect = 3
              }
            ]

        ( Algebra1, Unit 6 ) ->
            [ { name = "Product Rule"
              , story = "The Exponent Elemental multiplies its power cores together, growing stronger in an instant. Apply the product rule to add exponents and predict the final magnitude."
              , minCorrect = 3
              }
            , { name = "Quotient Rule"
              , story = "The Elemental sheds power cores at each encounter. Apply the quotient rule to subtract exponents and track how much energy remains."
              , minCorrect = 3
              }
            , { name = "Power of a Power"
              , story = "The Elemental raises itself to a higher power every time you fail to strike. Use the power-of-a-power rule — multiply the exponents — to keep pace."
              , minCorrect = 3
              }
            , { name = "Negative Exponents"
              , story = "The Elemental vanishes toward zero and flips into a fraction when struck with a negative exponent. Master this to reduce it to nearly nothing."
              , minCorrect = 3
              }
            , { name = "Scientific Notation"
              , story = "The Elemental records its energy in numbers too vast for normal scrolls. Rewrite each quantity in scientific notation before the ink runs dry."
              , minCorrect = 3
              }
            , { name = "Exponential Growth & Decay"
              , story = "The Elemental's army either doubles each hour or dwindles by half. Model the growth and decay to know when to strike for maximum effect."
              , minCorrect = 3
              }
            , { name = "Simplifying Radicals"
              , story = "The Elemental hides its true magnitude beneath nested roots. Factor out perfect squares from each radical to reveal the simplified form."
              , minCorrect = 3
              }
            ]

        ( Algebra1, Unit 7 ) ->
            [ { name = "Adding & Subtracting Polynomials"
              , story = "The Poly Predator assembles itself from scattered monomials it finds on the dungeon floor. Combine like terms to counter each new form it takes."
              , minCorrect = 3
              }
            , { name = "Monomial × Polynomial"
              , story = "The Predator coats its body in a common factor and flings it outward. Distribute the monomial across every term to neutralize the expansion."
              , minCorrect = 3
              }
            , { name = "Multiplying Binomials (FOIL)"
              , story = "The Predator spawns new terms by multiplying its own limbs together. Use FOIL — First, Outer, Inner, Last — to predict and neutralize each spawn."
              , minCorrect = 4
              }
            , { name = "Factoring GCF"
              , story = "The Predator's outer shell is held together by a greatest common factor. Pull it out from every term to crack the shell and expose the weakness inside."
              , minCorrect = 3
              }
            , { name = "Difference of Squares"
              , story = "The Predator presents a perfect square minus another perfect square, believing it cannot be factored. Apply the difference-of-squares identity to prove it wrong."
              , minCorrect = 3
              }
            , { name = "Factoring Trinomials"
              , story = "The Predator's strength comes from the trinomial that binds it together. Find the factor pair that multiplies to c and adds to b to unravel the binding completely."
              , minCorrect = 4
              }
            ]

        ( Algebra1, Unit 8 ) ->
            [ { name = "Axis of Symmetry"
              , story = "The Quadra Shade sails in a perfect parabolic arc, and its axis of symmetry reveals the peak. Calculate x = −b/(2a) to find the line it mirrors itself across."
              , minCorrect = 3
              }
            , { name = "The Discriminant"
              , story = "Before solving, the wise mage checks b²−4ac to know how many roots the Shade has. Compute the discriminant to prepare the right counterstrike."
              , minCorrect = 3
              }
            , { name = "Solving by Factoring"
              , story = "The Shade's arc is described by a quadratic that factors cleanly. Find the factors and set each to zero to discover both landing sites."
              , minCorrect = 4
              }
            , { name = "Solving by Square Roots"
              , story = "When the quadratic has no middle term, the square-root method cuts straight to the answer. Isolate x² and take the positive and negative roots."
              , minCorrect = 3
              }
            , { name = "The Quadratic Formula"
              , story = "When the Shade's arc cannot be factored, only the ancient quadratic formula can reveal its roots. Recite the formula and solve for both landing sites."
              , minCorrect = 4
              }
            , { name = "Vertex Form"
              , story = "The Shade's path is encoded in vertex form, hiding the peak and turning point. Read h and k from the equation to expose the vertex instantly."
              , minCorrect = 3
              }
            ]

        ( Algebra1, Unit 9 ) ->
            [ { name = "Identifying Function Types"
              , story = "The Regression Revenant shifts between linear, quadratic, and exponential forms to confuse trackers. Study each equation and classify the function type to predict its next shape."
              , minCorrect = 3
              }
            , { name = "Piecewise Functions"
              , story = "The Revenant behaves differently in different regions of the dungeon. Evaluate the piecewise function correctly for each zone to track its true location."
              , minCorrect = 3
              }
            , { name = "Classifying from Equations"
              , story = "The Revenant has left three equations on the dungeon wall, one for each of its forms. Identify which is linear, which is quadratic, and which is exponential to unmask it."
              , minCorrect = 3
              }
            , { name = "Evaluating Piecewise Functions"
              , story = "The Revenant activates different rules depending on which corridor it occupies. Substitute the given input into the correct piece of the function to find its power level."
              , minCorrect = 3
              }
            ]

        ( Algebra1, Unit 10 ) ->
            [ { name = "Simplifying Rational Expressions"
              , story = "The Rational Reaper's armour is made of unsimplified fractions that clink and drag it down. Cancel the common factors to strip away the armour piece by piece."
              , minCorrect = 3
              }
            , { name = "Multiplying Rational Expressions"
              , story = "The Reaper fuses its fractional shields together in battle, multiplying them at will. Multiply numerators and denominators then simplify to see the true reduced form."
              , minCorrect = 4
              }
            , { name = "Dividing Rational Expressions"
              , story = "The Reaper splits its shields apart, dividing fractions to confuse you. Flip the second fraction and multiply to cut through the confusion."
              , minCorrect = 3
              }
            , { name = "Adding Rational Expressions"
              , story = "The Reaper fights on two fronts, combining fractions from different directions. Find the common denominator and add the expressions to consolidate the defence."
              , minCorrect = 4
              }
            ]

        ( Algebra1, Unit 11 ) ->
            [ { name = "Simplifying Radicals"
              , story = "The Radical Rider charges on a mount whose speed is measured in nested roots. Simplify each radical to calculate the true speed and plan your interception."
              , minCorrect = 3
              }
            , { name = "Adding & Subtracting Radicals"
              , story = "The Rider hurls radical javelins from multiple angles. Combine like radicals — those with the same radicand — to tally the total force of the barrage."
              , minCorrect = 3
              }
            , { name = "Multiplying Radicals"
              , story = "Two radical projectiles collide mid-air and merge into one. Multiply the radicands together and simplify the result before it explodes."
              , minCorrect = 3
              }
            , { name = "Radical Equations"
              , story = "The Rider's battle cry is a radical equation that locks the dungeon gate. Isolate the radical, square both sides, and solve to break the seal."
              , minCorrect = 4
              }
            , { name = "Advanced Radical Equations"
              , story = "The Rider returns with harder equations — the radical buried deeper inside. Isolate, square, and check for extraneous solutions to fully defeat the curse."
              , minCorrect = 4
              }
            ]

        ( Algebra1, Unit 12 ) ->
            [ { name = "Mean & Spread"
              , story = "The Variance Viper's poison affects heroes differently — the mean and spread of damage tell you who is most at risk. Calculate both to prioritize healing."
              , minCorrect = 3
              }
            , { name = "Z-Scores"
              , story = "The Viper's venom strength follows a normal distribution the alchemist has catalogued. Compute the z-score to determine how extreme each dose is compared to the average."
              , minCorrect = 3
              }
            , { name = "Variance"
              , story = "The Viper's strike timing varies around a mean — the variance measures how chaotic the pattern is. Compute variance from the deviations to predict the most dangerous window."
              , minCorrect = 3
              }
            , { name = "Normal Distribution"
              , story = "The Viper's attacks cluster in a bell curve — most strikes near the centre, few at the extremes. Apply normal distribution knowledge to identify the safe zones."
              , minCorrect = 3
              }
            ]

        ( Algebra1, MegaBoss ) ->
            []

        -- ── Fallback ──────────────────────────────────────────────────────────

        _ ->
            []
