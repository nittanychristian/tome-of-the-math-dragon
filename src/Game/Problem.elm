module Game.Problem exposing (generatorFor)

import Game.Problem.Algebra1 as Algebra1
import Game.Problem.Common exposing (pickGen)
import Game.Problem.Course1 as Course1
import Game.Problem.Course2 as Course2
import Game.Problem.PreAlgebra as PreAlgebra
import Random exposing (Generator)
import Types exposing (Course(..), Problem, UnitId, UnitSlot(..))


-- questIndex: 0-based quest index; -1 = boss battle (full unit mix)
-- variant: cycles through sub-generators within a quest (use correctInQuest)
generatorFor : UnitId -> Int -> Int -> Generator Problem
generatorFor uid questIndex variant =
    case uid.unit of
        MegaBoss ->
            megaBossGenerator variant

        Unit unitNum ->
            case uid.course of
                Course1 ->
                    if questIndex < 0 then
                        Course1.generatorFor unitNum
                    else
                        Course1.generatorForQuest unitNum questIndex variant

                Course2 ->
                    if questIndex < 0 then
                        Course2.generatorFor unitNum
                    else
                        Course2.generatorForQuest unitNum questIndex variant

                PreAlgebra ->
                    if questIndex < 0 then
                        PreAlgebra.generatorFor unitNum
                    else
                        PreAlgebra.generatorForQuest unitNum questIndex variant

                Algebra1 ->
                    if questIndex < 0 then
                        Algebra1.generatorFor unitNum
                    else
                        Algebra1.generatorForQuest unitNum questIndex variant


-- Draws from every unit across all four courses, cycling by variant (problemsDone)
megaBossGenerator : Int -> Generator Problem
megaBossGenerator variant =
    let
        gens =
            List.map Course1.generatorFor (List.range 1 8)
                ++ List.map Course2.generatorFor (List.range 1 8)
                ++ List.map PreAlgebra.generatorFor (List.range 1 9)
                ++ List.map Algebra1.generatorFor (List.range 1 12)
    in
    pickGen variant (Course1.generatorFor 1) gens
