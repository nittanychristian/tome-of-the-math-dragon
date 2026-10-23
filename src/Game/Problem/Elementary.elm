module Game.Problem.Elementary exposing (..)

import Game.Problem.Common exposing (reduceFraction)
import Random exposing (Generator)
import Types exposing (..)


s : Int -> String
s =
    String.fromInt


withVisual : ProblemVisual -> Problem -> Problem
withVisual visual problem =
    { problem | visual = Just visual }


integer : String -> Int -> List String -> Problem
integer prompt answer steps =
    { prompt = prompt
    , visual = Nothing
    , inputType = TInteger
    , answer = AInt answer
    , hint = { prompt = prompt, answer = s answer, steps = steps ++ [ "Answer: " ++ s answer ] }
    }


fraction : String -> Int -> Int -> List String -> Problem
fraction prompt numerator denominator steps =
    let
        ( n, d ) =
            reduceFraction numerator denominator

        answer =
            s n ++ "/" ++ s d
    in
    { prompt = prompt
    , visual = Nothing
    , inputType = TFraction
    , answer = AFraction n d
    , hint = { prompt = prompt, answer = answer, steps = steps ++ [ "Answer: " ++ answer ] }
    }


decimal : String -> Int -> Int -> List String -> Problem
decimal prompt numerator denominator steps =
    let
        answer =
            toFloat numerator / toFloat denominator
    in
    { prompt = prompt
    , visual = Nothing
    , inputType = TDecimal
    , answer = AFloat answer 0.00001
    , hint = { prompt = prompt, answer = String.fromFloat answer, steps = steps ++ [ "Answer: " ++ String.fromFloat answer ] }
    }


choice : String -> String -> List String -> List String -> Generator Problem
choice prompt answer wrong steps =
    let
        choices =
            (answer :: List.filter ((/=) answer) wrong)
                |> List.foldl
                    (\label unique ->
                        if List.member label unique then
                            unique

                        else
                            unique ++ [ label ]
                    )
                    []
    in
    Random.int 0 (List.length choices - 1)
        |> Random.map
            (\offset ->
                { prompt = prompt
                , visual = Nothing
                , inputType = TChoice (List.drop offset choices ++ List.take offset choices)
                , answer = AChoice (modBy (List.length choices) (List.length choices - offset))
                , hint = { prompt = prompt, answer = answer, steps = steps ++ [ "Answer: " ++ answer ] }
                }
            )


sample : (Int -> Int -> Int -> Problem) -> Generator Problem
sample build =
    Random.map3 build (Random.int 1 9) (Random.int 1 9) (Random.int 1 9)


chooseSample : (Int -> Int -> Int -> Generator Problem) -> Generator Problem
chooseSample build =
    Random.map3 (\a b c -> ( a, b, c )) (Random.int 1 9) (Random.int 1 9) (Random.int 1 9)
        |> Random.andThen (\( a, b, c ) -> build a b c)


add : Int -> Generator Problem
add limit =
    Random.int 0 limit |> Random.andThen (\a -> Random.int 0 (limit - a) |> Random.map (\b -> integer (s a ++ " + " ++ s b ++ " = ?") (a + b) [ "Start at " ++ s a ++ ". Count on " ++ s b ++ ".", "Add ones first, then tens and hundreds. Trade 10 of a place for 1 of the next place." ]))


subtract : Int -> Generator Problem
subtract limit =
    Random.int 0 limit |> Random.andThen (\a -> Random.int 0 a |> Random.map (\b -> integer (s a ++ " - " ++ s b ++ " = ?") (a - b) [ "Start with " ++ s a ++ ". Take away " ++ s b ++ ".", "Subtract matching places. If needed, trade 1 ten for 10 ones." ]))


missingAdd : Int -> Generator Problem
missingAdd limit =
    Random.int 0 limit |> Random.andThen (\total -> Random.int 0 total |> Random.map (\a -> integer (s a ++ " + ? = " ++ s total) (total - a) [ "Find how many more make " ++ s total ++ ".", s total ++ " - " ++ s a ++ " = " ++ s (total - a) ]))


multiply : Int -> Generator Problem
multiply limit =
    Random.map2 (\a b -> integer (s a ++ " x " ++ s b ++ " = ?") (a * b) [ "Make " ++ s a ++ " equal groups of " ++ s b ++ ".", "Add " ++ s b ++ " a total of " ++ s a ++ " times." ]) (Random.int 0 limit) (Random.int 0 10)


timesTable : Int -> Generator Problem
timesTable factor =
    Random.int 0 9
        |> Random.map (timesTableProblem factor)


groupedTimesTable : Int -> Generator Problem
groupedTimesTable factor =
    Random.int 0 9
        |> Random.map (\second -> timesTableProblem factor second |> withVisual (EqualGroups factor second))


timesTableProblem : Int -> Int -> Problem
timesTableProblem factor second =
    integer (s factor ++ " x " ++ s second ++ " = ?")
        (factor * second)
        (case factor of
            0 ->
                [ "Zero groups means there is nothing to count.", "0 times any number is 0." ]

            1 ->
                [ "One group of " ++ s second ++ " has " ++ s second ++ " objects.", "1 times any number is that number." ]

            _ ->
                [ "Make " ++ s factor ++ " equal groups of " ++ s second ++ ".", String.join " + " (List.repeat factor (s second)) ++ " = " ++ s (factor * second) ]
        )


divide : Int -> Generator Problem
divide limit =
    Random.map2 (\a b -> integer (s (a * b) ++ " / " ++ s b ++ " = ?") a [ "Share " ++ s (a * b) ++ " equally into " ++ s b ++ " groups.", s b ++ " x " ++ s a ++ " = " ++ s (a * b) ]) (Random.int 0 limit) (Random.int 1 10)


compareNumbers : Int -> Generator Problem
compareNumbers limit =
    Random.map2 Tuple.pair (Random.int 0 limit) (Random.int 0 limit)
        |> Random.andThen
            (\( a, b ) ->
                choice (s a ++ " ? " ++ s b)
                    (if a < b then
                        "<"

                     else if a > b then
                        ">"

                     else
                        "="
                    )
                    [ "<", ">", "=" ]
                    [ "Compare the biggest place first. If it matches, compare the next place.", "< means less than. > means greater than. = means equal." ]
            )


placeValue : Int -> Generator Problem
placeValue place =
    let
        placeName =
            case place of
                10 ->
                    "tens"

                100 ->
                    "hundreds"

                100000 ->
                    "hundred thousands"

                _ ->
                    s place ++ "s"
    in
    sample (\a b _ -> integer ("In " ++ s (a * place + b * (place // 10)) ++ ", what is the value of the digit " ++ s a ++ " in the " ++ placeName ++ " place?") (a * place) [ "The digit in the " ++ placeName ++ " place counts groups of " ++ s place ++ ".", s a ++ " groups of " ++ s place ++ " = " ++ s (a * place) ])


roundTo : Int -> Generator Problem
roundTo place =
    sample
        (\a b c ->
            let
                n =
                    a * place + b * (place // 10) + modBy (max 1 (place // 10)) c
            in
            integer ("Round " ++ s n ++ " to the nearest " ++ s place ++ ".") (((n + place // 2) // place) * place) [ "Look at the digit just to the right of the rounding place.", "If it is 5 or more, round up. Otherwise keep the rounding digit. Replace following digits with zeros." ]
        )


storyAdd : Int -> Generator Problem
storyAdd scale =
    sample (\a b _ -> integer ("You pack " ++ s (a * scale) ++ " apples and find " ++ s (b * scale) ++ " more. How many apples now?") ((a + b) * scale) [ "More apples join the group. Add the two amounts.", s (a * scale) ++ " + " ++ s (b * scale) ++ " = " ++ s ((a + b) * scale) ])


storySubtract : Int -> Generator Problem
storySubtract scale =
    sample (\a b _ -> integer ("You have " ++ s ((a + b) * scale) ++ " seeds. You plant " ++ s (b * scale) ++ ". How many are left?") (a * scale) [ "Take the planted seeds away from all the seeds.", s ((a + b) * scale) ++ " - " ++ s (b * scale) ++ " = " ++ s (a * scale) ])


countObjects : Generator Problem
countObjects =
    Random.int 1 10 |> Random.map (\n -> integer "How many stars do you see?" n [ "Point to each star once. Say the next number each time." ] |> withVisual (CountingObjects "stars" n))


countOn : Generator Problem
countOn =
    Random.int 1 117 |> Random.map (\n -> integer ("Count on: " ++ s n ++ ", " ++ s (n + 1) ++ ", " ++ s (n + 2) ++ ", ?") (n + 3) [ "Each number is 1 more than the last.", "Add 1 to " ++ s (n + 2) ++ "." ])


skipCount : Int -> Generator Problem
skipCount step =
    sample (\a _ _ -> integer ("Count by " ++ s step ++ ": " ++ s (a * step) ++ ", " ++ s ((a + 1) * step) ++ ", " ++ s ((a + 2) * step) ++ ", ?") ((a + 3) * step) [ "Add " ++ s step ++ " each time.", s ((a + 2) * step) ++ " + " ++ s step ++ " = " ++ s ((a + 3) * step) ])


tenMore : Generator Problem
tenMore =
    Random.int 10 89 |> Random.map (\n -> integer ("What is 10 more than " ++ s n ++ "?") (n + 10) [ "Add one ten. The ones stay the same.", s n ++ " + 10 = " ++ s (n + 10) ])


tenLess : Generator Problem
tenLess =
    Random.int 10 99 |> Random.map (\n -> integer ("What is 10 less than " ++ s n ++ "?") (n - 10) [ "Take away one ten. The ones stay the same.", s n ++ " - 10 = " ++ s (n - 10) ])


makeTen : Generator Problem
makeTen =
    Random.int 0 10 |> Random.map (\n -> integer (s n ++ " + ? = 10") (10 - n) [ "Think of a frame with 10 spaces.", s (10 - n) ++ " more fill the frame." ])


threeAddends : Generator Problem
threeAddends =
    Random.map3 (\a b c -> integer (s a ++ " + " ++ s b ++ " + " ++ s c ++ " = ?") (a + b + c) [ "Add two numbers first, then add the third.", s a ++ " + " ++ s b ++ " = " ++ s (a + b) ]) (Random.int 0 6) (Random.int 0 6) (Random.int 0 8)


equalEquation : Generator Problem
equalEquation =
    sample (\a b _ -> integer (s a ++ " + " ++ s b ++ " = ? + " ++ s a) b [ "Both sides of = must have the same value.", "Changing the order of addition does not change the sum." ])


lengthCompare : Generator Problem
lengthCompare =
    sample (\a b _ -> integer "How many cubes longer is the blue ribbon than the red ribbon?" b [ "Both ribbons start at zero. Each box is one cube long.", "Subtract the red ribbon's length from the blue ribbon's length." ] |> withVisual (RibbonLengths [ ( "Blue", a + b ), ( "Red", a ) ]))


clock : Int -> Generator Problem
clock minute =
    Random.int 1 12
        |> Random.map
            (\hour ->
                integer
                    ("The short hand points "
                        ++ (if minute == 30 then
                                "halfway past "

                            else
                                "to "
                           )
                        ++ s hour
                        ++ ". The long hand points to "
                        ++ (if minute == 30 then
                                "6"

                            else
                                "12"
                           )
                        ++ ". What hour is it?"
                    )
                    hour
                    [ "The short hand tells the hour."
                    , "The long hand at "
                        ++ (if minute == 30 then
                                "6 means 30 minutes, or half past."

                            else
                                "12 means 0 minutes, or o'clock."
                           )
                    ]
            )


clockMinutes : Int -> Generator Problem
clockMinutes step =
    Random.int 0 (55 // step) |> Random.map (\a -> integer ("A clock's minute hand points to " ++ s (a * step // 5) ++ ". How many minutes past the hour?") (a * step) [ "Each number on the clock stands for 5 minutes.", s (a * step // 5) ++ " x 5 = " ++ s (a * step) ])


shapeSides : Generator Problem
shapeSides =
    Random.int 0 3
        |> Random.map
            (\index ->
                let
                    ( name, sides ) =
                        case index of
                            0 ->
                                ( "triangle", 3 )

                            1 ->
                                ( "rectangle", 4 )

                            2 ->
                                ( "pentagon", 5 )

                            _ ->
                                ( "hexagon", 6 )
                in
                integer ("How many straight sides does a " ++ name ++ " have?") sides [ "Count each straight edge once.", "Triangles have 3, rectangles 4, pentagons 5, and hexagons 6 sides." ]
            )


shapeSolid : Generator Problem
shapeSolid =
    choice "Which solid is shaped like a ball?" "sphere" [ "cube", "cone", "cylinder" ] [ "A sphere is round in every direction. It has no flat faces." ]


partition : Int -> Generator Problem
partition parts =
    choice ("A whole is split into " ++ s parts ++ " equal parts. What is one part called?")
        (if parts == 2 then
            "one half"

         else if parts == 3 then
            "one third"

         else
            "one fourth"
        )
        [ "one half", "one third", "one fourth", "one whole" ]
        [ "The parts must be equal in size.", "The name of each part tells how many equal parts make the whole." ]


readData : Generator Problem
readData =
    sample (\a b c -> integer "Read the fruit graph. How many fruits are there in all?" (a + b + c) [ "The key shows one fruit for each star.", "Count the stars in each row, then add all three counts." ] |> withVisual (PictureGraph "fruit" 1 [ ( "Apples", a ), ( "Pears", b ), ( "Plums", c ) ]))


dataDifference : Generator Problem
dataDifference =
    sample (\a b _ -> integer "How many more votes are there for red than for blue?" b [ "Read the end of each bar using the votes axis.", s (a + b) ++ " - " ++ s a ++ " = " ++ s b ] |> withVisual (BarChart "Color votes" "votes" 1 [ ( "Red", a + b ), ( "Blue", a ) ]))


parity : Generator Problem
parity =
    Random.int 1 20
        |> Random.andThen
            (\n ->
                choice ("Is " ++ s n ++ " odd or even?")
                    (if modBy 2 n == 0 then
                        "even"

                     else
                        "odd"
                    )
                    [ "odd", "even" ]
                    [ "Make pairs. If no one is left over, the number is even.", "If one is left without a partner, the number is odd." ]
            )


arrayTotal : Generator Problem
arrayTotal =
    Random.map2 (\rows cols -> integer "How many plants are in this garden array?" (rows * cols) [ "Each green square stands for one plant. Each row has the same number.", "Add " ++ s cols ++ " for each of the " ++ s rows ++ " rows." ] |> withVisual (ObjectArray rows cols)) (Random.int 1 5) (Random.int 1 5)


money : Generator Problem
money =
    sample (\a b _ -> integer (s a ++ " dimes and " ++ s b ++ " pennies. How many cents?") (10 * a + b) [ "A dime is 10 cents. A penny is 1 cent.", s a ++ " x 10 + " ++ s b ++ " = " ++ s (10 * a + b) ])


moneyChange : Generator Problem
moneyChange =
    Random.int 1 99 |> Random.map (\cost -> integer ("A snack costs " ++ s cost ++ " cents. Pay 1 dollar. How many cents change?") (100 - cost) [ "1 dollar is 100 cents.", "Subtract the price from 100." ])


measureUnits : Generator Problem
measureUnits =
    choice "Which unit would you use for the length of a pencil?" "centimeters" [ "liters", "kilograms", "hours" ] [ "Centimeters measure length. Liters measure liquid. Kilograms measure mass. Hours measure time." ]


numberLine : Generator Problem
numberLine =
    sample (\a b _ -> integer ("Start at " ++ s a ++ " on a number line. Jump " ++ s b ++ " spaces right. Where do you land?") (a + b) [ "Moving right adds. Each space is 1.", s a ++ " + " ++ s b ++ " = " ++ s (a + b) ])


expanded : Int -> Generator Problem
expanded scale =
    sample (\a b c -> integer (s (a * 100 * scale) ++ " + " ++ s (b * 10 * scale) ++ " + " ++ s (c * scale) ++ " = ?") ((a * 100 + b * 10 + c) * scale) [ "Each term gives the value of a place.", "Put the digits into their matching places and add." ])


elapsed : Generator Problem
elapsed =
    Random.map2 (\start duration -> integer ("A trip starts at " ++ s start ++ ":00 and takes " ++ s duration ++ " minutes. How many minutes after " ++ s start ++ ":00 does it end?") duration [ "Elapsed time is the amount of time that passes.", "Count forward from the start by " ++ s duration ++ " minutes." ]) (Random.int 1 10) (Random.int 5 55)


elapsedClock : Generator Problem
elapsedClock =
    Random.map2
        (\start end ->
            integer
                ("Training starts at 2:"
                    ++ (if start < 10 then
                            "0"

                        else
                            ""
                       )
                    ++ s start
                    ++ " and ends at 3:"
                    ++ (if end < 10 then
                            "0"

                        else
                            ""
                       )
                    ++ s end
                    ++ ". How many minutes pass?"
                )
                (60 - start + end)
                [ "Count " ++ s (60 - start) ++ " minutes to 3:00.", "Then add " ++ s end ++ " more minutes." ]
        )
        (Random.int 0 59)
        (Random.int 0 59)


perimeter : Generator Problem
perimeter =
    sample (\a b _ -> integer ("A rectangle is " ++ s a ++ " cm long and " ++ s b ++ " cm wide. What is its perimeter in cm?") (2 * (a + b)) [ "Perimeter is the distance all the way around.", s a ++ " + " ++ s b ++ " + " ++ s a ++ " + " ++ s b ++ " = " ++ s (2 * (a + b)) ])


area : Generator Problem
area =
    sample (\a b _ -> integer "What is this rectangle's area in square units?" (a * b) [ "Each square has area 1 square unit. Count the rows and columns.", s a ++ " x " ++ s b ++ " = " ++ s (a * b) ] |> withVisual (ObjectArray a b))


fractionModel : Generator Problem
fractionModel =
    Random.int 2 8 |> Random.andThen (\d -> Random.int 1 d |> Random.map (\n -> fraction "What fraction of the strip is shaded?" n d [ "The denominator counts all the equal parts.", "The numerator counts the shaded parts." ] |> withVisual (FractionStrip n d)))


fractionLine : Generator Problem
fractionLine =
    Random.int 2 8 |> Random.andThen (\d -> Random.int 1 (2 * d) |> Random.map (\n -> fraction ("A number line has " ++ s d ++ " equal steps from 0 to 1. What number is at step " ++ s n ++ " from 0?") n d [ "Each step is 1/" ++ s d ++ ".", "Count " ++ s n ++ " of these equal steps. You may go past 1." ]))


equivalentFraction : Generator Problem
equivalentFraction =
    sample (\a b c -> integer (s a ++ "/" ++ s (a + b) ++ " = ?/" ++ s ((a + b) * (c + 1))) (a * (c + 1)) [ "Multiply top and bottom by the same number.", "The bottom was multiplied by " ++ s (c + 1) ++ ", so multiply the top by that too." ])


compareFractions : Generator Problem
compareFractions =
    chooseSample
        (\a b c ->
            let
                d =
                    a + b + c
            in
            choice (s a ++ "/" ++ s d ++ " ? " ++ s b ++ "/" ++ s d)
                (if a < b then
                    "<"

                 else if a > b then
                    ">"

                 else
                    "="
                )
                [ "<", ">", "=" ]
                [ "The denominators match, so the pieces have equal size.", "Compare the numerators to see which has more pieces." ]
        )


compareUnitFractions : Generator Problem
compareUnitFractions =
    chooseSample
        (\a b _ ->
            choice ("1/" ++ s (a + 1) ++ " ? 1/" ++ s (b + 1))
                (if a > b then
                    "<"

                 else if a < b then
                    ">"

                 else
                    "="
                )
                [ "<", ">", "=" ]
                [ "When the same whole has more equal pieces, each piece is smaller.", "For unit fractions, the larger denominator gives the smaller fraction." ]
        )


fractionAdd : Bool -> Generator Problem
fractionAdd subtracting =
    sample
        (\a b c ->
            let
                d =
                    a + b + c
            in
            fraction
                (s
                    (if subtracting then
                        a + b

                     else
                        a
                    )
                    ++ "/"
                    ++ s d
                    ++ (if subtracting then
                            " - "

                        else
                            " + "
                       )
                    ++ s b
                    ++ "/"
                    ++ s d
                    ++ " = ?"
                )
                (if subtracting then
                    a

                 else
                    a + b
                )
                d
                [ "The pieces have the same size. Keep the denominator.", "Add or subtract the number of pieces in the numerators. Simplify if possible." ]
        )


unlikeFractions : Bool -> Generator Problem
unlikeFractions subtracting =
    Random.map2
        (\a b ->
            let
                d =
                    2 * b
            in
            fraction
                (s a
                    ++ "/"
                    ++ s b
                    ++ (if subtracting then
                            " - 1/"

                        else
                            " + 1/"
                       )
                    ++ s d
                    ++ " = ?"
                )
                (2
                    * a
                    + (if subtracting then
                        -1

                       else
                        1
                      )
                )
                d
                [ "Find a common denominator: " ++ s d ++ ".", s a ++ "/" ++ s b ++ " = " ++ s (2 * a) ++ "/" ++ s d ++ ". Now combine the numerators." ]
        )
        (Random.int 1 5)
        (Random.int 2 6)


fractionOfSet : Generator Problem
fractionOfSet =
    sample (\a b c -> integer ("What is " ++ s a ++ "/" ++ s (a + b) ++ " of " ++ s ((a + b) * c) ++ " berries?") (a * c) [ "Divide the berries into " ++ s (a + b) ++ " equal groups: " ++ s c ++ " in each.", "Take " ++ s a ++ " groups: " ++ s a ++ " x " ++ s c ++ "." ])


fractionTimesWhole : Generator Problem
fractionTimesWhole =
    sample (\a b c -> fraction (s c ++ " x " ++ s a ++ "/" ++ s (a + b) ++ " = ?") (c * a) (a + b) [ "Multiply the numerator by the whole number. Keep the denominator.", "This adds the same fraction " ++ s c ++ " times." ])


fractionTimesFraction : Generator Problem
fractionTimesFraction =
    sample (\a b c -> fraction (s a ++ "/" ++ s (a + b) ++ " x 1/" ++ s (c + 1) ++ " = ?") a ((a + b) * (c + 1)) [ "Multiply the numerators. Multiply the denominators.", "The result is a part of a part. Simplify the fraction." ])


fractionDivision : Bool -> Generator Problem
fractionDivision wholeFirst =
    sample
        (\a b _ ->
            if wholeFirst then
                integer (s a ++ " / (1/" ++ s (b + 1) ++ ") = ?") (a * (b + 1)) [ "Each whole holds " ++ s (b + 1) ++ " pieces of size 1/" ++ s (b + 1) ++ ".", "Count the pieces in " ++ s a ++ " wholes by multiplying." ]

            else
                fraction ("(1/" ++ s (b + 1) ++ ") / " ++ s a ++ " = ?") 1 ((b + 1) * a) [ "Split one unit fraction into " ++ s a ++ " equal smaller parts.", "The number of equal pieces in a whole becomes " ++ s ((b + 1) * a) ++ "." ]
        )


mixedNumber : Generator Problem
mixedNumber =
    sample (\a b c -> fraction ("Write " ++ s a ++ " and " ++ s b ++ "/" ++ s (b + c) ++ " as one fraction.") (a * (b + c) + b) (b + c) [ "Each whole has " ++ s (b + c) ++ " pieces.", "Multiply the whole number by the denominator, then add the numerator." ])


decimalFraction : Int -> Generator Problem
decimalFraction denominator =
    Random.int 1 (denominator - 1) |> Random.map (\n -> decimal ("Write " ++ s n ++ "/" ++ s denominator ++ " as a decimal.") n denominator [ "The denominator tells the place: 10 means tenths, 100 means hundredths.", "Divide the numerator by " ++ s denominator ++ "." ])


decimalOperation : String -> Generator Problem
decimalOperation op =
    sample
        (\a b c ->
            let
                left =
                    a * 100 + b * 10 + c

                right =
                    b * 100 + c * 10 + a
            in
            case op of
                "+" ->
                    decimal (String.fromFloat (toFloat left / 100) ++ " + " ++ String.fromFloat (toFloat right / 100) ++ " = ?") (left + right) 100 [ "Line up the decimal points. Add hundredths to hundredths, tenths to tenths, and ones to ones.", "Regroup 10 of any place as 1 of the next place." ]

                "-" ->
                    decimal (String.fromFloat (toFloat (left + right) / 100) ++ " - " ++ String.fromFloat (toFloat right / 100) ++ " = ?") left 100 [ "Line up the decimal points. Subtract matching places.", "Trade 1 tenth for 10 hundredths, or 1 one for 10 tenths, if needed." ]

                "x" ->
                    decimal (String.fromFloat (toFloat (a * 10 + c) / 10) ++ " x " ++ String.fromFloat (toFloat b / 10) ++ " = ?") ((a * 10 + c) * b) 100 [ "Multiply the digits as whole numbers.", "Tenths times tenths give hundredths: place two decimal digits in the product." ]

                _ ->
                    decimal (String.fromFloat (toFloat ((a * 10 + c) * b) / 100) ++ " / " ++ String.fromFloat (toFloat b / 10) ++ " = ?") (a * 10 + c) 10 [ "Multiply both numbers by 10 to make the divisor whole.", "Divide the scaled dividend by " ++ s b ++ "." ]
        )


decimalCompare : Generator Problem
decimalCompare =
    chooseSample
        (\a b c ->
            let
                left =
                    a * 10 + b
            in
            choice (String.fromFloat (toFloat left / 100) ++ " ? " ++ String.fromFloat (toFloat c / 10))
                (if left < c * 10 then
                    "<"

                 else if left > c * 10 then
                    ">"

                 else
                    "="
                )
                [ "<", ">", "=" ]
                [ "Write both numbers in hundredths. Add a trailing zero if needed.", "Compare the tenths, then the hundredths." ]
        )


decimalPlace : Generator Problem
decimalPlace =
    sample (\a b c -> decimal ("In " ++ s a ++ "." ++ s b ++ s c ++ ", what is the value of the digit " ++ s c ++ " in the hundredths place?") c 100 [ "The first place after the point is tenths. The second is hundredths.", "The digit represents " ++ s c ++ " hundredths." ])


decimalRound : Generator Problem
decimalRound =
    sample
        (\a b c ->
            decimal ("Round " ++ s a ++ "." ++ s b ++ s c ++ " to the nearest tenth.")
                (a
                    * 10
                    + b
                    + (if c >= 5 then
                        1

                       else
                        0
                      )
                )
                10
                [ "Look at the hundredths digit, " ++ s c ++ ".", "If it is at least 5, increase the tenths by 1. Drop the hundredths digit." ]
        )


convert : Int -> String -> String -> Generator Problem
convert factor large small =
    sample (\a _ _ -> integer (s a ++ " " ++ large ++ " = how many " ++ small ++ "?") (a * factor) [ "1 " ++ large ++ " = " ++ s factor ++ " " ++ small ++ ".", "Multiply by " ++ s factor ++ " to change to the smaller unit." ])


volume : Generator Problem
volume =
    sample (\a b c -> integer ("A box is " ++ s a ++ " units long, " ++ s b ++ " wide, and " ++ s c ++ " high. What is its volume in cubic units?") (a * b * c) [ "One layer has " ++ s (a * b) ++ " unit cubes.", "Multiply by the " ++ s c ++ " layers: length x width x height." ])


compositeArea : Generator Problem
compositeArea =
    sample (\a b c -> integer ("A garden is made of two rectangles with no overlap: " ++ s a ++ " by " ++ s b ++ ", and " ++ s a ++ " by " ++ s c ++ ". What is the total area?") (a * (b + c)) [ "Find each rectangle's area separately.", s (a * b) ++ " + " ++ s (a * c) ++ " = " ++ s (a * (b + c)) ])


compositeVolume : Generator Problem
compositeVolume =
    sample (\a b c -> integer ("Two boxes do not overlap. Their volumes are " ++ s (a * b) ++ " and " ++ s (a * c) ++ " cubic units. What is their combined volume?") (a * (b + c)) [ "Volumes of nonoverlapping solids add.", s (a * b) ++ " + " ++ s (a * c) ++ " = " ++ s (a * (b + c)) ])


patternRule : Generator Problem
patternRule =
    sample (\a b input -> integer ("Rule: multiply by " ++ s a ++ ", then add " ++ s b ++ ". What is the output for input " ++ s input ++ "?") (input * a + b) [ "Start with input " ++ s input ++ ". Apply the steps in the given order.", s input ++ " x " ++ s a ++ " = " ++ s (input * a) ++ ".", "Then add " ++ s b ++ ": " ++ s (input * a) ++ " + " ++ s b ++ " = " ++ s (input * a + b) ++ "." ] |> withVisual (InputOutputTable [ ( input, Nothing ) ]))


coordinate : Bool -> Generator Problem
coordinate askX =
    sample
        (\a b _ ->
            integer
                ("A point is ("
                    ++ s a
                    ++ ", "
                    ++ s b
                    ++ "). How many steps "
                    ++ (if askX then
                            "right"

                        else
                            "up"
                       )
                    ++ " from (0, 0)?"
                )
                (if askX then
                    a

                 else
                    b
                )
                [ "An ordered pair is (x, y). Start at the origin (0, 0).", "The first number moves right. The second moves up." ]
        )


scaledData : Generator Problem
scaledData =
    sample (\a b _ -> integer "Read the picture graph and its key. How many books?" (a * b) [ "Read the key: one symbol means " ++ s b ++ " books.", "Multiply the number of symbols by the value of each symbol." ] |> withVisual (PictureGraph "books" b [ ( "Books", a ) ]))


linePlot : Generator Problem
linePlot =
    sample (\a b _ -> integer "How many measurements are shown on this line plot?" (a + b) [ "Each X represents one measurement, even when its length is a fraction.", "Count the X marks above both positions and add." ] |> withVisual (MeasurementPlot "meters" 4 [ ( 2, a ), ( 3, b ) ]))


fractionData : Generator Problem
fractionData =
    sample (\a b _ -> fraction "Each X is one ribbon. What is the total length of the ribbons, in meters?" (2 * a + b) 4 [ "Count the ribbons at 1/2 meter and at 1/4 meter.", "Change halves to fourths: " ++ s a ++ " halves = " ++ s (2 * a) ++ " fourths.", "Add the fourths from both groups." ] |> withVisual (MeasurementPlot "meters" 4 [ ( 2, a ), ( 1, b ) ]))


orderOperations : Generator Problem
orderOperations =
    sample (\a b c -> integer (s a ++ " + " ++ s b ++ " x " ++ s c ++ " = ?") (a + b * c) [ "Multiply before adding.", s b ++ " x " ++ s c ++ " = " ++ s (b * c) ++ ". Then add " ++ s a ++ "." ])


parentheses : Generator Problem
parentheses =
    sample (\a b c -> integer ("(" ++ s a ++ " + " ++ s b ++ ") x " ++ s c ++ " = ?") ((a + b) * c) [ "Do the parentheses first.", s a ++ " + " ++ s b ++ " = " ++ s (a + b) ++ ". Then multiply by " ++ s c ++ "." ])


factorQuestion : Generator Problem
factorQuestion =
    sample (\a b _ -> integer ("Find the missing factor: " ++ s (a + 1) ++ " x ? = " ++ s ((a + 1) * b)) b [ "Factors multiply to make a product.", "Divide " ++ s ((a + 1) * b) ++ " by " ++ s (a + 1) ++ "." ])


multipleQuestion : Generator Problem
multipleQuestion =
    sample (\a b _ -> integer ("What is the " ++ s b ++ "th positive multiple of " ++ s (a + 1) ++ "?") ((a + 1) * b) [ "The first positive multiple is the number itself.", "Multiply " ++ s (a + 1) ++ " by " ++ s b ++ "." ])


primeComposite : Generator Problem
primeComposite =
    Random.uniform ( 7, "prime" ) [ ( 11, "prime" ), ( 13, "prime" ), ( 17, "prime" ), ( 21, "composite" ), ( 24, "composite" ), ( 27, "composite" ), ( 35, "composite" ) ]
        |> Random.andThen (\( n, answer ) -> choice ("Is " ++ s n ++ " prime or composite?") answer [ "prime", "composite" ] [ "A prime has exactly two positive factors: 1 and itself.", "A composite has another factor pair. Test 2, 3, 5, and 7 as needed." ])


divideRemainder : Generator Problem
divideRemainder =
    sample (\a b _ -> integer ("Share " ++ s (a * (b + 1) + 1) ++ " beads into groups of " ++ s (b + 1) ++ ". How many full groups?") a [ s a ++ " groups use " ++ s (a * (b + 1)) ++ " beads.", "There is 1 left over. Only count full groups." ])


interpretRemainder : Generator Problem
interpretRemainder =
    sample (\a b _ -> integer (s (a * (b + 1) + 1) ++ " children need boats. Each boat seats " ++ s (b + 1) ++ ". How many boats are needed?") (a + 1) [ s a ++ " boats seat " ++ s (a * (b + 1)) ++ " children.", "One child remains, so you need one more boat." ])


multiStep : Generator Problem
multiStep =
    sample (\a b c -> integer ("You pack " ++ s a ++ " bags with " ++ s (b + c) ++ " apples each. Give away " ++ s a ++ " apples. How many remain?") (a * (b + c) - a) [ "First multiply bags by apples per bag.", "Then subtract the apples you gave away: " ++ s (a * (b + c)) ++ " - " ++ s a ++ "." ])


multiDigitMultiply : Generator Problem
multiDigitMultiply =
    sample
        (\a b c ->
            let
                left =
                    10 * a + b
            in
            integer (s left ++ " x " ++ s (10 + c) ++ " = ?") (left * (10 + c)) [ "Break " ++ s (10 + c) ++ " into 10 + " ++ s c ++ ".", s left ++ " x 10 = " ++ s (left * 10) ++ "; " ++ s left ++ " x " ++ s c ++ " = " ++ s (left * c) ++ ". Add the partial products." ]
        )


multiDigitDivide : Generator Problem
multiDigitDivide =
    sample
        (\a b c ->
            let
                divisor =
                    10 * a + b
            in
            integer (s (divisor * (10 + c)) ++ " / " ++ s divisor ++ " = ?") (10 + c) [ "Use place value and multiplication to find the quotient.", s divisor ++ " x 10 = " ++ s (divisor * 10) ++ ". The rest is " ++ s (divisor * c) ++ ", or " ++ s c ++ " more groups." ]
        )


powerTen : Bool -> Generator Problem
powerTen dividing =
    sample
        (\a b c ->
            let
                n =
                    10 * a + b
            in
            if dividing then
                decimal (s n ++ " / 10^" ++ s (modBy 3 c + 1) ++ " = ?") n (10 ^ (modBy 3 c + 1)) [ "10^n means multiply n tens together.", "Dividing by 10 makes each digit's value one tenth as large. Repeat for each power." ]

            else
                integer (s n ++ " x 10^" ++ s (modBy 3 c + 1) ++ " = ?") (n * 10 ^ (modBy 3 c + 1)) [ "10^n means multiply n tens together.", "Each multiplication by 10 moves every digit one place to a value 10 times as large." ]
        )


fractionWord : Generator Problem
fractionWord =
    sample (\a b _ -> fraction ("You walk " ++ s a ++ "/2 km, then " ++ s b ++ "/4 km. How far in all, in km?") (2 * a + b) 4 [ "Use fourths for both distances.", s a ++ "/2 = " ++ s (2 * a) ++ "/4. Add the numerators." ])


fractionArea : Generator Problem
fractionArea =
    sample (\a b _ -> fraction ("A rectangle is " ++ s a ++ "/2 m long and " ++ s b ++ "/3 m wide. What is its area in square meters?") (a * b) 6 [ "Area is length times width, even for fractional lengths.", "Multiply numerators and denominators: " ++ s a ++ " x " ++ s b ++ " over 2 x 3." ])


fractionSize : Generator Problem
fractionSize =
    choice "Multiplying a positive number by 1/2 makes it..." "smaller" [ "larger", "unchanged" ] [ "One half of a positive amount is less than the full amount.", "Multiplication by a number less than 1 scales the amount down." ]


shapeClass : Generator Problem
shapeClass =
    choice "A square has 4 right angles. Is every square also a rectangle?" "yes" [ "no" ] [ "A rectangle is a quadrilateral with 4 right angles.", "A square meets that definition and also has 4 equal sides." ]


shapeAttributes : Generator Problem
shapeAttributes =
    choice "Which fact must be true for every triangle?" "It has 3 straight sides" [ "It has 3 equal sides", "It is always large", "It is always red" ] [ "Sides and corners define a shape.", "Color, size and turning a shape do not change its name." ]


composeShapes : Generator Problem
composeShapes =
    choice "Two equal squares touch along one full side. What shape is their outside edge?" "rectangle" [ "triangle", "circle", "pentagon" ] [ "Put one square beside the other.", "The outside has 4 right angles and 4 straight sides: a rectangle." ]


solidFaces : Generator Problem
solidFaces =
    choice "Which solid has 6 square faces?" "cube" [ "sphere", "cylinder", "cone" ] [ "A cube has a square on the top, bottom, front, back and both sides." ]


symmetry : Generator Problem
symmetry =
    choice "How many lines of symmetry does a square have?" "4" [ "1", "2", "3" ] [ "A symmetry line folds the shape into matching halves.", "A square has one vertical, one horizontal, and two diagonal symmetry lines." ]


angle : Generator Problem
angle =
    Random.uniform ( 45, "acute" ) [ ( 90, "right" ), ( 120, "obtuse" ), ( 30, "acute" ), ( 150, "obtuse" ) ]
        |> Random.andThen (\( degrees, name ) -> choice ("An angle measures " ++ s degrees ++ " degrees. What kind of angle is it?") name [ "acute", "right", "obtuse" ] [ "A right angle is 90 degrees.", "Acute is less than 90. Obtuse is more than 90 and less than 180." ])


angleSum : Generator Problem
angleSum =
    Random.int 10 80 |> Random.map (\a -> integer ("A right angle is split into " ++ s a ++ " degrees and a missing angle. How many degrees are missing?") (90 - a) [ "Adjacent parts of an angle add to the whole angle.", "Subtract the known part from 90 degrees." ])


parallel : Generator Problem
parallel =
    choice "Two straight lines stay the same distance apart and never meet. They are..." "parallel" [ "perpendicular", "intersecting" ] [ "Parallel lines never meet.", "Perpendicular lines meet at a right angle." ]


triangleClass : Generator Problem
triangleClass =
    choice "A triangle has exactly 2 equal sides. What is it called?" "isosceles" [ "equilateral", "scalene", "rectangle" ] [ "Isosceles means at least two equal sides. Equilateral means three.", "Scalene triangles have no equal sides." ]


patternPairs : Generator Problem
patternPairs =
    sample (\a b _ -> integer ("Two patterns start at 0. One adds " ++ s a ++ " each step; the other adds " ++ s (a * b) ++ ". At the same step, the second is how many times the first (after step 0)?") b [ "Compare the amounts added each step.", s (a * b) ++ " / " ++ s a ++ " = " ++ s b ++ ". Each pair has that relationship." ])


bridgeExponent : Generator Problem
bridgeExponent =
    Random.int 2 5 |> Random.map (\n -> integer (s n ++ "^2 means " ++ s n ++ " x " ++ s n ++ ". What is its value?") (n * n) [ "An exponent counts repeated equal factors.", "A square has the same number of rows and columns." ])


bridgeFactors : Generator Problem
bridgeFactors =
    choice "Which list gives every positive factor of 12?" "1, 2, 3, 4, 6, 12" [ "1, 2, 6, 12", "2, 4, 6, 8, 10, 12", "12, 24, 36" ] [ "Find factor pairs: 1 x 12, 2 x 6, 3 x 4.", "List each factor once. Multiples are different: 12, 24, 36..." ]


bridgeGcf : Generator Problem
bridgeGcf =
    choice "Factors of 8: 1, 2, 4, 8. Factors of 12: 1, 2, 3, 4, 6, 12. What is the greatest common factor?" "4" [ "2", "8", "12" ] [ "Common factors are on both lists: 1, 2, 4.", "Choose the greatest: 4. This helps simplify fractions." ]


bridgeLcm : Generator Problem
bridgeLcm =
    choice "Multiples of 3: 3, 6, 9, 12. Multiples of 4: 4, 8, 12. What is the least common multiple?" "12" [ "3", "4", "24" ] [ "Find the first positive number on both lists.", "12 is the least common multiple. It can be a common denominator." ]


bridgeInteger : Generator Problem
bridgeInteger =
    choice "A thermometer is at 0. It drops 3 degrees. Which number names the temperature?" "-3" [ "3", "0", "30" ] [ "Numbers below zero have a minus sign.", "Move left 3 steps from zero on the number line to reach -3." ]


bridgeRatio : Generator Problem
bridgeRatio =
    sample (\a b _ -> integer ("A recipe uses 2 cups of water for each cup of rice. For " ++ s a ++ " cups of rice, how many cups of water?") (2 * a) [ "Each cup of rice needs its own 2 cups of water.", "Multiply the number of cups of rice by 2. This is a ratio relationship." ])


bridgePercent : Generator Problem
bridgePercent =
    Random.int 1 99 |> Random.map (\n -> integer (s n ++ "% means " ++ s n ++ " out of 100. How many squares are shaded in a 100-square grid showing " ++ s n ++ "%?") n [ "Percent means out of 100.", "The numerator of a fraction with denominator 100 is the percent." ])


bridgeExpression : Generator Problem
bridgeExpression =
    sample (\a b _ -> integer ("A letter stands for a number: n = " ++ s a ++ ". What is n + " ++ s b ++ "?") (a + b) [ "Replace n with " ++ s a ++ ".", "Then add " ++ s b ++ ". Letters work like the missing-number boxes you already know." ])


bridgeStats : Generator Problem
bridgeStats =
    sample (\a b _ -> integer ("Three piles have " ++ s a ++ ", " ++ s (a + b) ++ ", and " ++ s (a + 2 * b) ++ " stones. Share them equally into 3 piles. How many in each?") (a + b) [ "Add the stones from all three piles.", "Divide by 3 to find the fair share. This is called the mean." ])


expandedTwoDigits : Generator Problem
expandedTwoDigits =
    sample (\a b _ -> integer (s a ++ " tens and " ++ s b ++ " ones make what number?") (10 * a + b) [ "Each ten is 10 ones.", s (10 * a) ++ " + " ++ s b ++ " = " ++ s (10 * a + b) ])


twoDigitPlusOne : Generator Problem
twoDigitPlusOne =
    Random.int 10 99
        |> Random.andThen
            (\number ->
                Random.int 0 (min 9 (100 - number))
                    |> Random.map
                        (\ones -> integer (s number ++ " + " ++ s ones ++ " = ?") (number + ones) [ "Add the ones first.", "If there are 10 or more ones, trade 10 ones for a ten. Keep the other tens." ])
            )


addTens : Generator Problem
addTens =
    Random.map2 (\a b -> integer (s (a * 10) ++ " + " ++ s (b * 10) ++ " = ?") ((a + b) * 10) [ "Add the number of tens, then write a zero in the ones place.", s a ++ " tens + " ++ s b ++ " tens = " ++ s (a + b) ++ " tens." ]) (Random.int 0 5) (Random.int 0 5)


subtractTens : Generator Problem
subtractTens =
    Random.int 1 9 |> Random.andThen (\a -> Random.int 0 a |> Random.map (\b -> integer (s (a * 10) ++ " - " ++ s (b * 10) ++ " = ?") ((a - b) * 10) [ "Subtract the number of tens. There are no loose ones.", s a ++ " tens - " ++ s b ++ " tens = " ++ s (a - b) ++ " tens." ]))


lengthUnits : Generator Problem
lengthUnits =
    Random.int 2 12 |> Random.map (\n -> integer "How many cubes long is this ribbon?" n [ "Use the same sized unit for every part of the length.", "Count each cube once from one end to the other." ] |> withVisual (RibbonLengths [ ( "Ribbon", n ) ]))


orderLengths : Generator Problem
orderLengths =
    chooseSample (\a b c -> choice "Which ribbon is longest?" "green" [ "red", "blue" ] [ "All ribbons start at the same zero.", "The ribbon that reaches farthest to the right is longest." ] |> Random.map (withVisual (RibbonLengths [ ( "Red", a ), ( "Blue", a + b ), ( "Green", a + b + c ) ])))


halfHourMinutes : Generator Problem
halfHourMinutes =
    choice "The minute hand points to 6. What kind of time is it?" "half past the hour" [ "exactly on the hour", "a whole day later" ] [ "A full trip around the clock is 60 minutes.", "At 6, the hand is halfway around: 30 minutes, or half past." ]


regroupAdd : Generator Problem
regroupAdd =
    Random.map2
        (\a b ->
            let
                left =
                    a * 10 + 8
            in
            integer (s left ++ " + " ++ s b ++ " = ?") (left + b) [ "Add the ones: 8 + " ++ s b ++ " = " ++ s (8 + b) ++ ".", "Trade 10 ones for 1 ten. Keep the remaining ones." ]
        )
        (Random.int 1 8)
        (Random.int 2 9)


regroupSubtract : Generator Problem
regroupSubtract =
    Random.map2
        (\a b ->
            let
                left =
                    a * 10 + 2
            in
            integer (s left ++ " - " ++ s b ++ " = ?") (left - b) [ "2 ones is too few. Trade 1 ten for 10 ones to have 12 ones.", "Subtract " ++ s b ++ " from 12 ones and keep " ++ s (a - 1) ++ " tens." ]
        )
        (Random.int 1 9)
        (Random.int 3 9)


hundredMore : Generator Problem
hundredMore =
    Random.int 100 899 |> Random.map (\n -> integer ("What is 100 more than " ++ s n ++ "?") (n + 100) [ "Add one hundred. The tens and ones stay the same." ])


hundredLess : Generator Problem
hundredLess =
    Random.int 100 999 |> Random.map (\n -> integer ("What is 100 less than " ++ s n ++ "?") (n - 100) [ "Take away one hundred. The tens and ones stay the same." ])


fourAddends : Generator Problem
fourAddends =
    sample (\a b c -> integer (s a ++ " + " ++ s b ++ " + " ++ s c ++ " + 12 = ?") (a + b + c + 12) [ "Add two numbers, then the next, then the last.", s a ++ " + " ++ s b ++ " = " ++ s (a + b) ++ ". Then add " ++ s c ++ " and 12." ])


twoStepAddSubtract : Generator Problem
twoStepAddSubtract =
    sample (\a b c -> integer ("You have " ++ s (a + c) ++ " pegs, get " ++ s b ++ " more, and use " ++ s c ++ ". How many are left?") (a + b) [ "First add the new pegs to the pegs you had.", "Then subtract the pegs you used: " ++ s (a + b + c) ++ " - " ++ s c ++ "." ])


measureTwice : Generator Problem
measureTwice =
    sample (\a _ _ -> integer ("A board is " ++ s a ++ " long units long. Each long unit is 2 short units. How many short units long is it?") (2 * a) [ "Smaller units need a larger count to measure the same length.", "Count 2 short units for each long unit." ])


numberLineBack : Generator Problem
numberLineBack =
    sample (\a b _ -> integer ("Start at " ++ s (a + b) ++ ". Jump " ++ s b ++ " spaces left. Where do you land?") a [ "Moving left subtracts.", s (a + b) ++ " - " ++ s b ++ " = " ++ s a ])


clockAmPm : Generator Problem
clockAmPm =
    choice "Breakfast is at 7 in the morning. Is that 7 a.m. or 7 p.m.?" "7 a.m." [ "7 p.m." ] [ "a.m. is from midnight until before noon.", "p.m. is from noon until before midnight." ]


moneyCoins : Generator Problem
moneyCoins =
    sample (\a b _ -> integer (s a ++ " quarters and " ++ s b ++ " nickels. How many cents?") (25 * a + 5 * b) [ "A quarter is 25 cents; a nickel is 5 cents.", "Multiply each count by its value, then add." ])


wholeLinePlot : Generator Problem
wholeLinePlot =
    sample (\a b _ -> integer "Each X is one board. How many boards are 6 cm long?" b [ "An X stands for one board.", "Only count the X marks above 6 cm." ] |> withVisual (MeasurementPlot "cm" 1 [ ( 5, a ), ( 6, b ) ]))


equalShares : Generator Problem
equalShares =
    choice "Two same-size squares are each split into 2 equal parts in different ways. Is each part still one half of its square?" "yes" [ "no" ] [ "A half is one of two equal parts of a whole.", "Equal shares of same-size wholes have the same area even if their shapes differ." ]


distributive : Generator Problem
distributive =
    sample (\a b c -> integer ("Fill the blank: " ++ s a ++ " x (" ++ s b ++ " + " ++ s c ++ ") = " ++ s (a * b) ++ " + ?") (a * c) [ "Multiply each part inside the parentheses by " ++ s a ++ ".", s a ++ " x " ++ s c ++ " = " ++ s (a * c) ])


zeroOneFacts : Generator Problem
zeroOneFacts =
    Random.int 0 1 |> Random.andThen (\factor -> Random.int 0 100 |> Random.map (\n -> integer (s n ++ " x " ++ s factor ++ " = ?") (n * factor) [ "Any number times 0 is 0.", "Any number times 1 is itself." ]))


groupStory : Generator Problem
groupStory =
    sample (\a b _ -> integer (s a ++ " bags each hold " ++ s b ++ " pegs. How many pegs in all?") (a * b) [ "Equal groups can be multiplied.", s a ++ " x " ++ s b ++ " = " ++ s (a * b) ])


shareStory : Generator Problem
shareStory =
    sample (\a b _ -> integer ("Share " ++ s (a * b) ++ " pegs equally among " ++ s b ++ " builders. How many pegs does each get?") a [ "Divide all the pegs by the number of builders.", "Check with multiplication: " ++ s b ++ " x " ++ s a ++ " = " ++ s (a * b) ])


multiplyTens : Generator Problem
multiplyTens =
    sample (\a b _ -> integer (s a ++ " x " ++ s (b * 10) ++ " = ?") (a * b * 10) [ "First find " ++ s a ++ " x " ++ s b ++ " = " ++ s (a * b) ++ ".", "The second factor counts tens, so multiply the product by 10." ])


unitFraction : Generator Problem
unitFraction =
    Random.int 2 8 |> Random.map (\d -> fraction ("One whole is split into " ++ s d ++ " equal parts. What fraction is one part?") 1 d [ "The denominator is the number of equal parts in the whole.", "One selected part gives numerator 1." ])


wholeAsFraction : Generator Problem
wholeAsFraction =
    sample (\a b _ -> integer (s a ++ " wholes = ?/" ++ s (b + 1)) (a * (b + 1)) [ "Each whole has " ++ s (b + 1) ++ " parts of this size.", "Multiply the number of wholes by the denominator." ])


readMinuteTime : Generator Problem
readMinuteTime =
    Random.int 0 59
        |> Random.map
            (\minutes ->
                integer
                    ("A clock reads 4:"
                        ++ (if minutes < 10 then
                                "0"

                            else
                                ""
                           )
                        ++ s minutes
                        ++ ". How many minutes after 4:00 is it?"
                    )
                    minutes
                    [ "In hour:minute notation, the number after the colon tells the minutes.", "A full hour has 60 minutes." ]
            )


liquidMass : Generator Problem
liquidMass =
    chooseSample (\a b _ -> choice ("A jug holds " ++ s a ++ " liters. Add " ++ s b ++ " liters. Which is the new amount?") (s (a + b) ++ " liters") [ s (a + b) ++ " kilograms", s (a * b) ++ " liters", s (a + b + 1) ++ " liters" ] [ "Liters measure liquid volume. Grams and kilograms measure mass.", "Add the volumes and keep the same unit." ])


scaledDataDifference : Generator Problem
scaledDataDifference =
    sample (\a b c -> integer "Read the bar graph's scale. How many more votes are there for red?" (b * c) [ "Each interval on the axis stands for " ++ s c ++ " votes.", "Read both bar values and subtract the blue votes from the red votes." ] |> withVisual (BarChart "Color votes" "votes" c [ ( "Red", (a + b) * c ), ( "Blue", a * c ) ]))


missingSide : Generator Problem
missingSide =
    sample (\a b _ -> integer ("A rectangle has perimeter " ++ s (2 * (a + b)) ++ " cm and length " ++ s a ++ " cm. What is its width in cm?") b [ "Half the perimeter is length + width.", "Divide by 2, then subtract the length." ])


placeValueRelation : Generator Problem
placeValueRelation =
    choice "How many times as large is the value of a digit when it moves one place to the left?" "10" [ "1", "100", "1000" ] [ "Our number system groups in tens.", "For example, 3 hundreds = 300 and 3 tens = 30. 300 / 30 = 10." ]


multiplicativeComparison : Generator Problem
multiplicativeComparison =
    sample (\a b _ -> integer ("One tower has " ++ s a ++ " flags. A second has " ++ s b ++ " times as many. How many on the second tower?") (a * b) [ "Times as many means multiply, not add.", s a ++ " x " ++ s b ++ " = " ++ s (a * b) ])


shapePattern : Generator Problem
shapePattern =
    choice "A tile pattern repeats triangle, square, square. What is the 7th tile?" "triangle" [ "square", "circle" ] [ "Each block has 3 tiles.", "Tiles 1, 4, and 7 start a new block, so each is a triangle." ]


compareUnlikeFractions : Generator Problem
compareUnlikeFractions =
    chooseSample
        (\a b _ ->
            choice (s a ++ "/3 ? " ++ s b ++ "/4")
                (if a * 4 < b * 3 then
                    "<"

                 else if a * 4 > b * 3 then
                    ">"

                 else
                    "="
                )
                [ "<", ">", "=" ]
                [ "Use a common denominator of 12.", s a ++ "/3 = " ++ s (4 * a) ++ "/12 and " ++ s b ++ "/4 = " ++ s (3 * b) ++ "/12. Compare the numerators." ]
        )


mixedAddSubtract : Bool -> Generator Problem
mixedAddSubtract subtracting =
    sample
        (\a b c ->
            let
                d =
                    b + c + 1
            in
            fraction
                (s (a + 1)
                    ++ " "
                    ++ s b
                    ++ "/"
                    ++ s d
                    ++ (if subtracting then
                            " - "

                        else
                            " + "
                       )
                    ++ "1 "
                    ++ s (b + c)
                    ++ "/"
                    ++ s d
                    ++ " = ?"
                )
                ((a + 1)
                    * d
                    + b
                    + (if subtracting then
                        -(d + b + c)

                       else
                        d + b + c
                      )
                )
                d
                [ "Change each mixed number into one fraction: whole x denominator + numerator.", "Keep the common denominator and combine the numerators. Simplify." ]
        )


tenthsHundredths : Generator Problem
tenthsHundredths =
    Random.int 1 9 |> Random.map (\n -> integer (s n ++ "/10 = ?/100") (n * 10) [ "100 is 10 times 10.", "Multiply both numerator and denominator by 10." ])


rightTriangle : Generator Problem
rightTriangle =
    choice "A triangle has one 90-degree angle. What kind of triangle is it?" "right triangle" [ "acute triangle", "obtuse triangle" ] [ "A 90-degree angle is a right angle.", "A triangle with a right angle is a right triangle." ]


thousandthsPlace : Generator Problem
thousandthsPlace =
    sample (\a b c -> decimal ("In 2." ++ s a ++ s b ++ s c ++ ", what is the value of the digit in the thousandths place?") c 1000 [ "After the decimal come tenths, hundredths, then thousandths.", "The third digit after the point is " ++ s c ++ ", so its value is " ++ s c ++ "/1000." ])


decimalScale : Generator Problem
decimalScale =
    sample (\a b _ -> decimal (String.fromFloat (toFloat (a * 10 + b) / 100) ++ " x 10 = ?") (a * 10 + b) 10 [ "Every digit becomes worth 10 times as much.", "Hundredths become tenths and tenths become ones." ])


thousandthsRound : Generator Problem
thousandthsRound =
    sample
        (\a b c ->
            decimal ("Round 2." ++ s a ++ s b ++ s c ++ " to the nearest hundredth.")
                (200
                    + a
                    * 10
                    + b
                    + (if c >= 5 then
                        1

                       else
                        0
                      )
                )
                100
                [ "Look at the thousandths digit, " ++ s c ++ ".", "If it is at least 5, increase the hundredths by 1. Regroup if needed." ]
        )


decimalMoney : Generator Problem
decimalMoney =
    sample (\a b _ -> decimal ("You pay $" ++ s (a + 1) ++ ".00 for a snack costing $" ++ s a ++ "." ++ s b ++ "5. How much change in dollars?") (100 - b * 10 - 5) 100 [ "Write both amounts in cents.", "Subtract the price from the amount paid, then divide cents by 100 for dollars." ])


decimalWholeDivision : Generator Problem
decimalWholeDivision =
    sample (\a b c -> decimal (String.fromFloat (toFloat ((a * 10 + b) * c) / 100) ++ " / " ++ s c ++ " = ?") (a * 10 + b) 100 [ "Share the hundredths equally into " ++ s c ++ " groups.", "Divide as whole numbers, keeping the decimal places aligned." ])


brackets : Generator Problem
brackets =
    sample (\a b c -> integer ("[" ++ s a ++ " + (" ++ s b ++ " x " ++ s c ++ ")] x 2 = ?") ((a + b * c) * 2) [ "Work from the innermost parentheses outward: multiply " ++ s b ++ " by " ++ s c ++ ".", "Add " ++ s a ++ " inside the brackets. Then multiply the bracket result by 2." ])


patternTable : Generator Problem
patternTable =
    chooseSample (\a b _ -> ruleFromTable (a + 1) b)


ruleFromTable : Int -> Int -> Generator Problem
ruleFromTable multiplier offset =
    let
        describe factor addend =
            "Multiply by " ++ s factor ++ ", then add " ++ s addend

        rows =
            List.range 1 3 |> List.map (\input -> ( input, Just (input * multiplier + offset) ))
    in
    choice "Which rule matches every row in this input/output table?"
        (describe multiplier offset)
        [ describe (multiplier + 1) (offset - 1)
        , describe (multiplier - 1) (offset + 1)
        , describe multiplier (offset + 2)
        ]
        [ "When the input increases by 1, the output increases by " ++ s multiplier ++ ". Try multiplying the input by " ++ s multiplier ++ "."
        , "For input 1, multiplication gives " ++ s multiplier ++ ", but the output is " ++ s (multiplier + offset) ++ ". Add " ++ s offset ++ " to make them match."
        , "Check every row: 1 x " ++ s multiplier ++ " + " ++ s offset ++ " = " ++ s (multiplier + offset) ++ "; 2 x " ++ s multiplier ++ " + " ++ s offset ++ " = " ++ s (2 * multiplier + offset) ++ "; 3 x " ++ s multiplier ++ " + " ++ s offset ++ " = " ++ s (3 * multiplier + offset) ++ "."
        ]
        |> Random.map (withVisual (InputOutputTable rows))


simplifyFraction : Generator Problem
simplifyFraction =
    sample (\a b c -> fraction ("Write " ++ s (a * (c + 1)) ++ "/" ++ s ((a + b) * (c + 1)) ++ " in simplest form.") a (a + b) [ "A common factor divides both numerator and denominator.", "Divide both by the greatest common factor until only 1 divides both." ])


unrelatedFractions : Bool -> Generator Problem
unrelatedFractions subtracting =
    sample
        (\a b _ ->
            fraction
                (s
                    (if subtracting then
                        a + b

                     else
                        a
                    )
                    ++ "/3"
                    ++ (if subtracting then
                            " - "

                        else
                            " + "
                       )
                    ++ s b
                    ++ "/4 = ?"
                )
                (4
                    * (if subtracting then
                        a + b

                       else
                        a
                      )
                    + (if subtracting then
                        -3 * b

                       else
                        3 * b
                      )
                )
                12
                [ "Use a common denominator of 12: multiply thirds by 4/4 and fourths by 3/3.", "Combine the new numerators, keep denominator 12, then simplify." ]
        )


mixedUnlike : Generator Problem
mixedUnlike =
    sample (\a b _ -> fraction (s a ++ " 1/2 + " ++ s b ++ " 1/3 = ?") ((a + b) * 6 + 5) 6 [ "Add the whole numbers.", "1/2 = 3/6 and 1/3 = 2/6. Their sum is 5/6." ])


fractionEstimate : Generator Problem
fractionEstimate =
    choice "Which whole number is closest to 7/8 + 5/6?" "2" [ "0", "1", "4" ] [ "Each addend is close to 1 but slightly less.", "The sum is 41/24, between 1 and 2, and closer to 2." ]


mixedMultiply : Generator Problem
mixedMultiply =
    sample (\a b _ -> fraction (s a ++ " 1/2 x " ++ s b ++ " 1/3 = ?") ((2 * a + 1) * (3 * b + 1)) 6 [ "Change mixed numbers to fractions: " ++ s (2 * a + 1) ++ "/2 and " ++ s (3 * b + 1) ++ "/3.", "Multiply the numerators and denominators, then simplify." ])


scalingGreater : Generator Problem
scalingGreater =
    choice "Multiplying a positive number by 3/2 makes it..." "larger" [ "smaller", "unchanged" ] [ "3/2 is greater than 1.", "Multiplying by a factor greater than 1 scales a positive amount up." ]


fractionDivisionStory : Generator Problem
fractionDivisionStory =
    sample (\a b _ -> integer ("You have " ++ s a ++ " liters of water. Each cup holds 1/" ++ s (b + 1) ++ " liter. How many cups can you fill?") (a * (b + 1)) [ "Each liter fills " ++ s (b + 1) ++ " cups.", "Multiply liters by cups per liter. This is whole number / unit fraction." ])


fractionUnitConvert : Generator Problem
fractionUnitConvert =
    Random.int 1 7 |> Random.map (\n -> integer (s n ++ "/4 meter = how many centimeters?") (n * 25) [ "1 meter is 100 centimeters, so 1/4 meter is 25 centimeters.", "Multiply " ++ s n ++ " by 25." ])


volumeMissingDimension : Generator Problem
volumeMissingDimension =
    sample (\a b c -> integer ("A box has volume " ++ s (a * b * c) ++ " cubic cm. Its base is " ++ s a ++ " cm by " ++ s b ++ " cm. What is its height in cm?") c [ "Volume = base area x height.", "Divide " ++ s (a * b * c) ++ " by the base area " ++ s (a * b) ++ "." ])


coordinateTravel : Generator Problem
coordinateTravel =
    sample (\a b c -> integer ("Start at (" ++ s a ++ ", " ++ s b ++ "). Move " ++ s c ++ " units up. What is the new y-coordinate?") (b + c) [ "Moving up changes y; moving right changes x.", "The new point is (" ++ s a ++ ", " ++ s (b + c) ++ ")." ])


patternCoordinate : Generator Problem
patternCoordinate =
    sample (\a b _ -> integer ("Plot the rule y = " ++ s a ++ " times x in the first quadrant. What is y when x = " ++ s b ++ "?") (a * b) [ "The rule multiplies the x-coordinate to find y.", "Multiply " ++ s a ++ " by " ++ s b ++ ". Plot (" ++ s b ++ ", " ++ s (a * b) ++ ")." ])


quadrilateralHierarchy : Generator Problem
quadrilateralHierarchy =
    choice "Every rectangle has two pairs of parallel opposite sides. Is every rectangle a parallelogram?" "yes" [ "no" ] [ "A parallelogram is a quadrilateral with two pairs of parallel opposite sides.", "A rectangle has this property and also has four right angles." ]


divisibility : Generator Problem
divisibility =
    chooseSample
        (\a b _ ->
            let
                n =
                    a * 10 + b
            in
            choice ("Is " ++ s n ++ " divisible by 3 with no remainder?")
                (if modBy 3 n == 0 then
                    "yes"

                 else
                    "no"
                )
                [ "yes", "no" ]
                [ "Add the digits: " ++ s a ++ " + " ++ s b ++ " = " ++ s (a + b) ++ ".", "If that sum is divisible by 3, so is the original number." ]
        )


bridgeCube : Generator Problem
bridgeCube =
    Random.int 2 4 |> Random.map (\n -> integer (s n ++ "^3 means " ++ s n ++ " x " ++ s n ++ " x " ++ s n ++ ". What is its value?") (n * n * n) [ "A cube has three equal dimensions.", "First square " ++ s n ++ " to get " ++ s (n * n) ++ ", then multiply by " ++ s n ++ " again." ])


primeFactorIntro : Generator Problem
primeFactorIntro =
    choice "12 = 3 x 4, and 4 = 2 x 2. Which writes 12 using only prime factors?" "2 x 2 x 3" [ "3 x 4", "2 x 6", "1 x 12" ] [ "Break composite factors into smaller factors.", "2 and 3 are prime. 2 x 2 x 3 = 12." ]


percentFraction : Generator Problem
percentFraction =
    Random.int 1 99 |> Random.map (\n -> fraction ("Write " ++ s n ++ "% as a fraction.") n 100 [ "Percent means out of 100.", "Write " ++ s n ++ "/100 and simplify if possible." ])


signedNumberLine : Generator Problem
signedNumberLine =
    Random.int 1 9 |> Random.map (\n -> integer ("Start at 0 and move " ++ s n ++ " steps left. What number do you reach?") -n [ "Left of zero are negative numbers.", "The distance is " ++ s n ++ " and the direction is negative, so write -" ++ s n ++ "." ])


bridgeInequality : Generator Problem
bridgeInequality =
    chooseSample (\a _ _ -> choice ("A gate opens for numbers greater than " ++ s a ++ ". Does " ++ s (a + 1) ++ " open it?") "yes" [ "no" ] [ "Greater than means farther right on the number line.", s (a + 1) ++ " > " ++ s a ++ ". This is an inequality." ])


dataRange : Generator Problem
dataRange =
    sample (\a b c -> integer ("Travel times are " ++ s a ++ ", " ++ s (a + b) ++ ", and " ++ s (a + b + c) ++ " minutes. What is the range?") (b + c) [ "Range is greatest minus least.", s (a + b + c) ++ " - " ++ s a ++ " = " ++ s (b + c) ])


multiplyFacts : Generator Problem
multiplyFacts =
    Random.map2 (\a b -> integer (s a ++ " x " ++ s b ++ " = ?") (a * b) [ "Think of " ++ s a ++ " equal groups of " ++ s b ++ ".", "Use a known fact, or add " ++ s b ++ " repeatedly. Zero groups means zero." ]) (Random.int 0 9) (Random.int 0 9)


divideFacts : Generator Problem
divideFacts =
    Random.map2 (\a b -> integer (s (a * b) ++ " / " ++ s b ++ " = ?") a [ "Which number times " ++ s b ++ " makes " ++ s (a * b) ++ "?", "Multiplication and division are inverse operations." ]) (Random.int 0 9) (Random.int 1 9)


missingSubtract : Generator Problem
missingSubtract =
    Random.int 0 20 |> Random.andThen (\total -> Random.int 0 total |> Random.map (\left -> integer (s total ++ " - ? = " ++ s left) (total - left) [ "Find how many were taken away.", "Count up from " ++ s left ++ " to " ++ s total ++ ", or subtract the amount left from the starting amount." ]))


basicEquivalent : Generator Problem
basicEquivalent =
    Random.int 2 4 |> Random.andThen (\d -> Random.int 1 d |> Random.map (\n -> integer (s n ++ "/" ++ s d ++ " = ?/" ++ s (d * 2)) (n * 2) [ "Split each piece into two equal smaller pieces.", "Multiply both the top and the bottom by 2. The amount stays the same." ]))


fractionLikeStory : Generator Problem
fractionLikeStory =
    sample (\a b _ -> fraction ("You use " ++ s a ++ "/8 roll of cloth for one room and " ++ s b ++ "/8 for another. How many rolls in all?") (a + b) 8 [ "Both amounts are measured in eighths.", "Add their numerators and keep denominator 8. Simplify if possible." ])


tenthsPlusHundredths : Generator Problem
tenthsPlusHundredths =
    sample (\a b _ -> fraction (s a ++ "/10 + " ++ s b ++ "/100 = ?") (a * 10 + b) 100 [ "Change tenths to hundredths by multiplying numerator and denominator by 10.", s a ++ "/10 = " ++ s (a * 10) ++ "/100. Now add the numerators." ])


largeMultiply : Generator Problem
largeMultiply =
    Random.map2 (\a b -> integer (s a ++ " x " ++ s b ++ " = ?") (a * b) [ "Multiply by the ones digit: " ++ s a ++ " x " ++ s (modBy 10 b) ++ " = " ++ s (a * modBy 10 b) ++ ".", "Multiply by the tens value: " ++ s a ++ " x " ++ s (b // 10 * 10) ++ " = " ++ s (a * (b // 10 * 10)) ++ ". Add these partial products." ]) (Random.int 100 9999) (Random.int 10 99)


associative : Generator Problem
associative =
    choice "Which expression equals (2 + 3) + 4 by regrouping the addends?" "2 + (3 + 4)" [ "2 + (3 x 4)", "2 + 3 - 4", "2 x 3 + 4" ] [ "The associative property changes the grouping of addition or multiplication without changing the result.", "Both addition expressions equal 9. Regrouping does not change any operation." ]


commonFactorStory : Generator Problem
commonFactorStory =
    choice "Pack 8 red and 12 blue beads into as many identical bags as possible. No beads left over. How many bags?" "4" [ "2", "8", "12" ] [ "The number of bags must divide both 8 and 12.", "Their common factors are 1, 2, 4. Four bags each hold 2 red and 3 blue beads." ]


commonMultipleStory : Generator Problem
commonMultipleStory =
    choice "One lantern flashes every 3 minutes, another every 4. Both flash now. How many minutes until they next flash together?" "12" [ "3", "4", "7" ] [ "List positive multiples of 3 and of 4.", "The first shared time is 12, the least common multiple." ]
