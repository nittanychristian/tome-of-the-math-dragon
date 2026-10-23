module Game.Elementary exposing (Topic, bossName, ending, generatorFor, introduction, questsFor, title, topicsFor)

import Game.Problem.Common exposing (pickGen)
import Game.Problem.Elementary as E
import Random exposing (Generator)
import Types exposing (Problem, QuestDef)


type alias Topic =
    { quest : QuestDef
    , generators : List (Generator Problem)
    }


topic : String -> String -> List (Generator Problem) -> Topic
topic name story generators =
    { quest = { name = name, story = story, minCorrect = max 3 (List.length generators) }
    , generators = generators
    }


title : Int -> String
title grade =
    case grade of
        1 ->
            "The Lantern Seed"

        2 ->
            "The Wisp's Workshop"

        3 ->
            "The Bridge of Many Parts"

        4 ->
            "The Keep of Patterns"

        _ ->
            "The Gate to the Valley"


bossName : Int -> String
bossName grade =
    case grade of
        1 ->
            "Lantern Wisp"

        2 ->
            "Workshop Wisp"

        3 ->
            "Bridge Wisp"

        4 ->
            "Keeper Wisp"

        _ ->
            "Gate Wisp"


introduction : Int -> String
introduction grade =
    case grade of
        1 ->
            "Long before the dragon quest, a small light wakes in your village. A friendly Scroll Wisp asks you to help it grow. Count, build, and share to light the first lantern."

        2 ->
            "Your lantern leads you to the Wisp's workshop. The village needs tools, supplies, and a map. Help the Wisp repair the workshop and prepare for the road ahead."

        3 ->
            "The road ends at a broken bridge. Friends on both banks want to trade again. Build equal groups, share supplies, and measure the pieces to bring everyone together."

        4 ->
            "Beyond the bridge stands an old keep. Its library holds the first pages of the Tome. Restore the rooms and learn the patterns that protect the path to the Valley of Digits."

        _ ->
            "The restored Tome shows a gate to the Valley of Digits. The Number Golem guards that valley, and a distant Decimal Drake stirs. Pack your skills and help the Wisp open the gate."


ending : Int -> String
ending grade =
    case grade of
        1 ->
            "Your lantern shines! The Wisp carries it to an old workshop. Together you will make the tools for a bigger journey."

        2 ->
            "The workshop is ready! With tools and a map, you follow the Wisp toward a broken bridge. New friends need your help on the other side."

        3 ->
            "The bridge is whole again! Your friends can cross safely. On the hill beyond it, an old keep waits with pages of a forgotten Tome."

        4 ->
            "The keep's library glows again! The Tome reveals a gate to the Valley of Digits. The Wisp invites you to prepare for the greatest journey yet."

        _ ->
            "The gate opens! The Wisp gives you the Tome. Ahead lies the Valley of Digits, where the Number Golem guards the road. Your Course 1 adventure begins there; the Decimal Drake waits beyond."


questsFor : Int -> List QuestDef
questsFor grade =
    List.map .quest (topicsFor grade)


generatorFor : Int -> Int -> Int -> Generator Problem
generatorFor grade questIndex variant =
    let
        topics =
            topicsFor grade

        generators =
            if questIndex < 0 then
                List.concatMap .generators topics

            else
                topics |> List.drop questIndex |> List.head |> Maybe.map .generators |> Maybe.withDefault []
    in
    if questIndex < 0 then
        case generators of
            first :: rest ->
                Random.uniform first rest |> Random.andThen identity

            [] ->
                E.countObjects

    else
        pickGen variant E.countObjects generators


topicsFor : Int -> List Topic
topicsFor grade =
    case grade of
        1 ->
            grade1

        2 ->
            grade2

        3 ->
            grade3

        4 ->
            grade4

        5 ->
            grade5

        _ ->
            []


grade1 : List Topic
grade1 =
    [ topic "Count and Read to 120" "The Wisp wakes beside a row of stars. Count them, then read the numbers on the lantern path." [ E.countObjects, E.countOn ]
    , topic "Make Ten" "The lantern has ten little spaces for light seeds. Find how many more seeds will fill it." [ E.makeTen ]
    , topic "Add within 20" "More fireflies join the Wisp. Add them to see how bright the lantern will glow." [ E.add 10, E.add 20 ]
    , topic "Subtract within 20" "Some fireflies fly home. Count how many stay to light your way." [ E.subtract 10, E.subtract 20 ]
    , topic "Missing Numbers and Equals" "Two sides of the lantern must balance. Find the missing number so both sides match." [ E.missingAdd 20, E.missingSubtract, E.equalEquation ]
    , topic "Three Numbers and Number Stories" "Gather apples and seeds for the village. Put groups together and take some away." [ E.threeAddends, E.storyAdd 1, E.storySubtract 1 ]
    , topic "Tens and Ones" "Bundle sticks into tens for the lantern frame. Loose sticks are ones." [ E.placeValue 10, E.expandedTwoDigits ]
    , topic "Compare Numbers" "The Wisp finds two baskets of light seeds. Tell which basket holds more, or whether they match." [ E.compareNumbers 100 ]
    , topic "Add Tens and Ones" "Help build the lantern posts. Add tens and ones, trading ten ones for a ten when needed." [ E.twoDigitPlusOne, E.addTens ]
    , topic "Ten More, Ten Less" "One bundle of ten lights arrives, then one leaves. Keep track of the light seeds." [ E.tenMore, E.tenLess, E.subtractTens ]
    , topic "Measure and Compare Lengths" "Line up the lantern ribbons. Use equal cubes with no gaps to measure and compare them." [ E.lengthCompare, E.lengthUnits, E.orderLengths ]
    , topic "Hours and Half Hours" "The Wisp lights the village clock. Read the hour and the half hour to know when to meet." [ E.clock 0, E.clock 30, E.halfHourMinutes ]
    , topic "Sort and Read Data" "The village sorts fruit into three baskets. Read the counts and compare the groups." [ E.readData, E.dataDifference ]
    , topic "Flat and Solid Shapes" "Choose strong shapes for the lantern house. Look at sides, corners, and round surfaces." [ E.shapeSides, E.shapeAttributes, E.shapeSolid, E.solidFaces ]
    , topic "Build Shapes and Equal Shares" "Join tiles for the lantern floor. Share a snack in equal halves or fourths before the final light test." [ E.composeShapes, E.partition 2, E.partition 4 ]
    ]


grade2 : List Topic
grade2 =
    [ topic "Count by 2, 5, 10 and 100" "The workshop shelves are full of supplies. Count groups to check that nothing is missing." [ E.skipCount 2, E.skipCount 5, E.skipCount 10, E.skipCount 100 ]
    , topic "Hundreds, Tens and Ones" "The Wisp labels big crates, small bundles, and loose tools. Read each place in the supply number." [ E.placeValue 100, E.expanded 1, E.placeValue 10 ]
    , topic "Compare to 1000" "Two wagons arrive at the workshop. Compare their supply counts before unloading." [ E.compareNumbers 1000 ]
    , topic "Fluent Facts within 20" "Warm up your workshop skills with quick sums and differences." [ E.add 20, E.subtract 20, E.missingAdd 20 ]
    , topic "Add within 100" "Count the tools from two benches. Regroup ten ones into a ten when you need to." [ E.add 100, E.regroupAdd ]
    , topic "Subtract within 100" "Find how many tools remain after the helpers borrow some. Trade a ten for ones when needed." [ E.subtract 100, E.regroupSubtract ]
    , topic "Add and Subtract within 1000" "The whole village sends supplies. Add deliveries and subtract what the workshop uses." [ E.add 1000, E.subtract 1000, E.expanded 1 ]
    , topic "Multiply by 0" "The Wisp opens an empty tool box. Learn why zero groups always have zero tools." [ E.timesTable 0, E.groupedTimesTable 0 ]
    , topic "Multiply by 1" "One helper packs one group of tools. Count what stays the same when you multiply by one." [ E.timesTable 1, E.groupedTimesTable 1 ]
    , topic "Multiply by 2" "Two helpers pack matching groups of supplies. Add the equal groups to practice multiplying by two." [ E.timesTable 2, E.groupedTimesTable 2 ]
    , topic "Multiply by 3" "Three benches need matching supplies. Practice counting three equal groups with the Wisp." [ E.timesTable 3, E.groupedTimesTable 3 ]
    , topic "Multiply by 4" "Four wagons carry matching loads. Practice counting four equal groups for the journey." [ E.timesTable 4, E.groupedTimesTable 4 ]
    , topic "Multiply by 5" "Five village helpers pack equal bags. Practice five equal groups until you know the facts." [ E.timesTable 5, E.groupedTimesTable 5 ]
    , topic "Mental Tens and Hundreds" "Move full bundles and crates without counting every piece. Think in tens and hundreds." [ E.tenMore, E.tenLess, E.hundredMore, E.hundredLess ]
    , topic "Four Addends" "Four helpers bring parts for the wagon. Add all four groups to check the total." [ E.fourAddends ]
    , topic "One- and Two-Step Stories" "Pack apples for the road, plant new seeds, and solve a workshop task with two steps." [ E.storyAdd 5, E.storySubtract 5, E.twoStepAddSubtract ]
    , topic "Odd and Even" "Pair up the workshop gloves. Does each glove have a partner?" [ E.parity ]
    , topic "Arrays and Equal Groups" "Arrange plants in neat rows outside the workshop. Count equal rows without skipping a plant." [ E.arrayTotal ]
    , topic "Measure with Standard Units" "Measure boards with a ruler. Choose length units and compare the boards." [ E.measureUnits, E.lengthUnits, E.lengthCompare, E.measureTwice ]
    , topic "Number Line Lengths" "Mark the road on a number line. Jump forward to add distances and back to subtract." [ E.numberLine, E.numberLineBack ]
    , topic "Time to Five Minutes" "Set the workshop clock for departure. Read minutes by counting fives around the clock." [ E.clockMinutes 5, E.clockAmPm ]
    , topic "Coins, Dollars and Change" "Buy nails for the wagon. Count coins and check the change from one dollar." [ E.money, E.moneyCoins, E.moneyChange ]
    , topic "Picture Graphs, Bars and Line Plots" "Record the helpers' votes and board lengths. Each symbol or mark stands for one item." [ E.readData, E.dataDifference, E.wholeLinePlot ]
    , topic "Shapes and Faces" "Sort tiles and boxes by their sides and faces. Shape names stay the same when you turn them." [ E.shapeSides, E.solidFaces, E.shapeAttributes ]
    , topic "Rows of Square Tiles" "Cover the wagon floor with equal square tiles. Count the rows and columns." [ E.arrayTotal ]
    , topic "Halves, Thirds and Fourths" "Share the travel snacks fairly. The Wisp reminds you that equal shares can look different." [ E.partition 2, E.partition 3, E.partition 4, E.equalShares ]
    ]


grade3 : List Topic
grade3 =
    [ topic "Multiplication and Arrays" "The broken bridge needs rows of new planks. Count equal groups to order the wood." [ E.multiply 10, E.arrayTotal ]
    , topic "Single-Digit Times Tables" "Practice your multiplication facts with the Wisp. Turn on continuous practice to keep going as long as you like." [ E.multiplyFacts ]
    , topic "Division Facts" "Share equal groups with the bridge crew. Practice until your division facts feel familiar." [ E.divideFacts ]
    , topic "Division and Missing Factors" "Share the bridge supplies fairly. Use multiplication to check each share." [ E.divide 10, E.factorQuestion ]
    , topic "Properties and Fact Strategies" "Split big groups into smaller ones. The Wisp shows how the same planks can make different arrays." [ E.distributive, E.equalEquation, E.zeroOneFacts ]
    , topic "Multiply and Divide Stories" "Bring equal bags of pegs and share them among the bridge builders." [ E.groupStory, E.shareStory ]
    , topic "Patterns in Facts" "The bridge rails follow a pattern. Count the next groups and explain the rule." [ E.skipCount 3, E.skipCount 4, E.skipCount 6, E.patternRule ]
    , topic "Add and Subtract within 1000" "Track the planks delivered and used by the bridge crew." [ E.add 1000, E.subtract 1000 ]
    , topic "Round to Tens and Hundreds" "Estimate how many supplies fit on the cart before making an exact count." [ E.roundTo 10, E.roundTo 100 ]
    , topic "Multiply by Tens" "The builders pack pegs in tens. Use place value to count the full supply." [ E.multiplyTens ]
    , topic "Two-Step Problems" "Pack the supplies, make equal groups, and subtract what you use. One careful step follows another." [ E.multiStep, E.twoStepAddSubtract ]
    , topic "Fractions as Equal Parts" "The bridge map is torn into equal parts. Name a part and put the map together." [ E.fractionModel, E.unitFraction ]
    , topic "Fractions on a Number Line" "Mark each crossing on the bridge path. Equal steps can lead past one whole." [ E.fractionLine, E.wholeAsFraction ]
    , topic "Equivalent Fractions" "Different map pieces can cover the same distance. Find matching fractions." [ E.basicEquivalent ]
    , topic "Compare Fractions" "Compare fair shares of the same whole. Think about the number and size of the parts." [ E.compareFractions, E.compareUnitFractions ]
    , topic "Time to the Minute and Elapsed Time" "The builders work in shifts. Read exact times and find how long a shift lasts." [ E.readMinuteTime, E.elapsedClock ]
    , topic "Liquid Volume and Mass" "Measure water for the crew and weigh supplies for the bridge cart." [ E.liquidMass, E.measureUnits ]
    , topic "Scaled Picture and Bar Graphs" "The crew's supply chart uses a key. Each mark stands for several items." [ E.scaledData, E.scaledDataDifference ]
    , topic "Measurement Line Plots" "The Wisp sorts board lengths on a line plot. Read marks at halves and fourths." [ E.linePlot ]
    , topic "Area and Unit Squares" "Cover the bridge rest platform with square tiles. Find its area by rows and columns." [ E.area, E.compositeArea ]
    , topic "Perimeter and Missing Sides" "Build a fence around the rest platform. Count the outside distance and find missing lengths." [ E.perimeter, E.missingSide ]
    , topic "Shape Families and Equal Areas" "Sort the bridge tiles into shape families. Divide them into parts with equal area." [ E.shapeClass, E.partition 4, E.shapeAttributes ]
    ]


grade4 : List Topic
grade4 =
    [ topic "Place Value to a Million" "The keep's library has a huge catalog. Read the value of every digit." [ E.placeValue 100000, E.expanded 1000, E.placeValueRelation ]
    , topic "Compare and Round Whole Numbers" "Estimate the keep's supplies, then compare exact counts to plan the repairs." [ E.compareNumbers 1000000, E.roundTo 1000, E.roundTo 100000 ]
    , topic "Multi-Digit Addition and Subtraction" "Track the stone blocks used to repair the keep walls." [ E.add 1000000, E.subtract 1000000 ]
    , topic "Multiply Larger Numbers" "The masons need many rows of stone. Break numbers into place values to multiply." [ E.multiply 9999, E.multiDigitMultiply ]
    , topic "Divide Larger Numbers" "Share the keep's supplies among repair crews, keeping track of leftovers." [ E.divide 999, E.divideRemainder ]
    , topic "Remainders in Real Life" "Send every helper safely across the river. Decide when a leftover needs another boat." [ E.interpretRemainder ]
    , topic "Multiplicative Comparisons" "Compare one tower's supply with another's. Times as many is different from more than." [ E.multiplicativeComparison, E.groupStory ]
    , topic "Multi-Step Word Problems" "Repair the keep in stages. Read each clue, calculate, and check whether your answer makes sense." [ E.multiStep, E.twoStepAddSubtract, E.interpretRemainder ]
    , topic "Factors and Multiples" "The library locks open with factor pairs and repeating multiples." [ E.factorQuestion, E.multipleQuestion, E.bridgeFactors ]
    , topic "Prime and Composite Numbers" "Sort the number stones by their factors to reveal a hidden shelf." [ E.primeComposite ]
    , topic "Number and Shape Patterns" "A pattern runs around the library walls. Find the rule and predict what comes next." [ E.patternRule, E.skipCount 7, E.shapePattern ]
    , topic "Equivalent and Compared Fractions" "Restore the torn Tome pages. Different equal parts can describe the same amount." [ E.equivalentFraction, E.compareFractions, E.compareUnlikeFractions ]
    , topic "Add and Subtract Like Fractions" "Combine pieces of a page, or remove a damaged part. Keep track of the equal-sized pieces." [ E.fractionAdd False, E.fractionAdd True, E.fractionLikeStory ]
    , topic "Mixed Numbers" "Some supplies fill whole crates and part of another. Connect mixed numbers with fractions." [ E.mixedNumber, E.mixedAddSubtract False, E.mixedAddSubtract True ]
    , topic "Whole Numbers Times Fractions" "Each room needs the same fraction of a roll of cloth. Find the total for all the rooms." [ E.fractionTimesWhole, E.fractionOfSet ]
    , topic "Tenths and Hundredths" "The keep's measuring tools use fractions and decimals. Read both forms of the same length." [ E.decimalFraction 10, E.decimalFraction 100, E.tenthsHundredths, E.tenthsPlusHundredths ]
    , topic "Compare Decimals" "Compare the repaired tools' lengths. A zero at the end does not change a decimal's value." [ E.decimalCompare ]
    , topic "Convert Measurement Units" "Read the keep's old supply labels and convert them to smaller units." [ E.convert 100 "meters" "centimeters", E.convert 1000 "kilograms" "grams", E.convert 60 "hours" "minutes", E.convert 12 "feet" "inches", E.convert 16 "pounds" "ounces", E.convert 4 "gallons" "quarts" ]
    , topic "Fraction Measurement Data" "The Wisp records ribbon lengths on a line plot. Add their lengths as fractions." [ E.linePlot, E.fractionData ]
    , topic "Area and Perimeter Applications" "Repair the courtyard floor and fence. Decide whether to cover the inside or measure around it." [ E.area, E.perimeter, E.missingSide ]
    , topic "Angles and Additive Angles" "Measure the library's broken corners. Put angle parts together to make a right angle." [ E.angle, E.angleSum ]
    , topic "Lines and Triangle Classes" "Follow parallel halls and right-angle turns. Sort the triangular roof tiles." [ E.parallel, E.triangleClass, E.rightTriangle ]
    , topic "Line Symmetry" "Restore the keep's crest by finding mirror lines that make its halves match." [ E.symmetry ]
    ]


grade5 : List Topic
grade5 =
    [ topic "Decimal Place Value to Thousandths" "Pack the Tome's measuring tools for the gate journey. Read each decimal place carefully." [ E.decimalPlace, E.thousandthsPlace, E.placeValueRelation ]
    , topic "Powers of Ten" "The gate's lanterns grow ten times brighter with each step. Read powers of ten and scale numbers." [ E.powerTen False, E.powerTen True, E.decimalScale ]
    , topic "Compare and Round Decimals" "Choose the right supplies by comparing decimal measures and rounding estimates." [ E.decimalCompare, E.decimalRound, E.thousandthsRound ]
    , topic "Multi-Digit Whole Number Operations" "The village sends its final supplies. Add, subtract, multiply, and divide with confidence." [ E.add 1000000, E.subtract 1000000, E.largeMultiply, E.multiDigitDivide ]
    , topic "Add and Subtract Decimals" "Keep the travel account accurate to the hundredth. Align the places before calculating." [ E.decimalOperation "+", E.decimalOperation "-", E.decimalMoney ]
    , topic "Multiply and Divide Decimals" "Measure and share the journey's supplies using decimal amounts." [ E.decimalOperation "x", E.decimalOperation "/", E.decimalWholeDivision ]
    , topic "Numerical Expressions and Grouping" "The gate's instructions use brackets and parentheses. Follow the order to light each rune." [ E.orderOperations, E.parentheses, E.brackets, E.associative, E.distributive ]
    , topic "Two Patterns and Tables" "Two lantern paths grow together. Compare their rules and match their values." [ E.patternRule, E.patternPairs, E.patternTable ]
    , topic "Equivalent Fractions and Simplifying" "The Tome's fraction key must fit every lock. Find equivalent forms and reduce to simplest terms." [ E.equivalentFraction, E.simplifyFraction, E.compareUnlikeFractions ]
    , topic "Add and Subtract Unlike Fractions" "Combine travel distances measured in different fractional parts. Find a common unit first." [ E.unlikeFractions False, E.unlikeFractions True, E.unrelatedFractions False, E.unrelatedFractions True ]
    , topic "Mixed Number Operations" "Combine whole and partial supplies without losing a piece. Regroup when subtracting." [ E.mixedNumber, E.mixedAddSubtract False, E.mixedAddSubtract True, E.mixedUnlike ]
    , topic "Fraction Word Problems" "Help the Wisp tally walking distances and shared supplies. Check that each result has a sensible size." [ E.fractionWord, E.fractionOfSet, E.fractionEstimate ]
    , topic "Multiply Fractions and Mixed Numbers" "Find parts of parts and the area of fractional rectangles to finish the gate map." [ E.fractionTimesWhole, E.fractionTimesFraction, E.fractionArea, E.mixedMultiply ]
    , topic "Multiplication as Scaling" "The Wisp scales the map up and down. Predict whether a product is larger or smaller." [ E.fractionSize, E.scalingGreater ]
    , topic "Divide Unit Fractions and Whole Numbers" "Share a small ration equally, then count how many small scoops fit in the supplies." [ E.fractionDivision False, E.fractionDivision True, E.fractionDivisionStory ]
    , topic "Convert Units in Problems" "Finish packing with matching measurement units. Convert lengths, masses, volumes, and time." [ E.convert 1000 "liters" "milliliters", E.convert 1000 "kilometers" "meters", E.convert 60 "minutes" "seconds", E.fractionUnitConvert ]
    , topic "Line Plots with Fraction Measures" "Read the final supply plot and calculate with its fractional measurements." [ E.fractionData, E.linePlot ]
    , topic "Volume with Unit Cubes" "Build supply boxes from layers of cubes. Measure the space inside in cubic units." [ E.volume, E.volumeMissingDimension ]
    , topic "Add Volumes of Joined Boxes" "The gate's storage room has two joined sections. Add their volumes without counting space twice." [ E.compositeVolume ]
    , topic "Coordinates in the First Quadrant" "The gate map starts at (0, 0). Move right, then up, to find each lantern." [ E.coordinate True, E.coordinate False, E.coordinateTravel, E.patternCoordinate ]
    , topic "Classify Shape Families" "Match the gate's shape seals by their properties. A shape can belong to more than one family." [ E.shapeClass, E.quadrilateralHierarchy, E.triangleClass ]
    , topic "Readiness: Factors, Multiples and Primes" "The Wisp checks your number keys for the Valley of Digits. List factors, find common ones, and spot primes." [ E.bridgeFactors, E.primeComposite, E.bridgeGcf, E.bridgeLcm, E.commonFactorStory, E.commonMultipleStory ]
    , topic "Readiness: Divisibility and Powers" "The Number Golem's valley uses divisibility and repeated factors. Try these ideas before you enter." [ E.divisibility, E.bridgeExponent, E.bridgeCube, E.primeFactorIntro ]
    , topic "Readiness: Fractions, Decimals and Percents" "The gate shows the same amount in several forms. Connect fractions and decimals to out of 100." [ E.decimalFraction 100, E.bridgePercent, E.percentFraction ]
    , topic "Readiness: Numbers below Zero" "A cold wind blows from beyond the valley. Meet the numbers to the left of zero before your next adventure." [ E.bridgeInteger, E.signedNumberLine ]
    , topic "Readiness: Expressions and Equations" "The Tome replaces boxes with letters. Use what you know about missing numbers to read the new symbols." [ E.bridgeExpression, E.missingAdd 100, E.bridgeInequality ]
    , topic "Readiness: Ratios and Fair Shares" "Pack a recipe in equal ratios and share the supplies fairly. These patterns return in Course 1." [ E.bridgeRatio, E.bridgeStats, E.dataRange ]
    , topic "The Valley Gate Review" "The Wisp smiles. You have the tools for the Number Golem's road: calculate, compare, measure, and explain. Light the gate!" [ E.multiStep, E.unrelatedFractions False, E.volume, E.orderOperations ]
    ]
