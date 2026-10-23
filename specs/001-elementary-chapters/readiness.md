# Elementary to Course 1 handoff

The five chapters cover the normal elementary progression. Grade 5 also has
explicit bridge quests for ideas that the current Course 1 introduces. These are
previews with worked hints, not a replacement for the existing middle school
lessons. Cross-check source: the repository's `course1.txt` and Course 1 quest
catalog, particularly its opening Whole Numbers chapter.

| Course 1 opening topic | Elementary preparation / grade 5 review |
| --- | --- |
| Place value, standard and expanded forms, comparison, rounding | Grades 1–4 build from tens/ones to a million; grade 5 decimal place value, comparison and rounding extend the same base-ten system. |
| Whole-number addition and subtraction | Grade 1 within 20 and tens/ones; grade 2 through 1000; grade 4 multi-digit operations; grade 5 whole-number review. |
| Whole-number multiplication and division | Grade 2 arrays; grade 3 facts and equal sharing; grade 4 larger products and remainder interpretation; grade 5 multi-digit multiplication and two-digit divisors. |
| Divisibility rules | Grade 2 parity; grade 4 factors; grade 5 Readiness: Divisibility and Powers explains and practices the digit-sum rule for 3. |
| Whole-number applications | Word problems every grade; grade 5 multi-step review and factor/multiple applications. |
| Powers and exponents; perfect squares and cubes | Grades 3–4 arrays/area; grade 5 powers of ten and volume, then explicit square/cube notation and examples in readiness. |
| Order of operations | Grade 5 Numerical Expressions and Grouping: multiplication before addition, parentheses, nested brackets. |
| Commutative, associative and distributive properties | Grade 1 equal equations / reversed addends; grade 3 splitting products; grade 5 regrouping and distributive expression review. |
| Primes, composites and prime factorization | Grade 4 prime/composite classification; grade 5 factor lists and explicit decomposition of a composite into prime factors. |
| GCF and LCM | Grade 4 factors, multiples and equivalent fractions; grade 5 explicit common-factor and common-multiple worked examples. |
| GCF and LCM applications | Grade 5 identical bead bags and two flashing-lantern cycles. |

The remaining Course 1 chapters begin with the following established foundations:

| Course 1 chapter | Elementary foundation |
| --- | --- |
| Integer Operations | Number lines and subtraction throughout; grade 5 readiness introduces negative numbers through temperature and moves left of zero. Integer operation rules and four-quadrant graphing remain Course 1 teaching. |
| Rational Numbers | Grade 3 fraction models/number lines; grade 4 equivalents, comparison, like-denominator operations and mixed numbers; grade 5 unlike-denominator operations, multiplication, unit-fraction division, decimals through thousandths, and all four decimal operations. General fraction division and negative rationals remain Course 1 teaching. |
| Algebraic Expressions | Missing numbers and equality from grade 1; properties, pattern rules/tables and grouped expressions; grade 5 substitutes into a letter expression. Combining algebraic terms and factoring expressions remain Course 1 teaching. |
| Equations and Inequalities | Missing-addend, subtraction and factor equations; grade 5 introduces an inequality through comparisons and a gate condition. Formal equation/inequality transformations remain Course 1 teaching. |
| Proportional Relationships | Equal groups, multiplicative comparisons and unit conversions; grade 5 two-pattern tables, recipe ratios, percent-as-hundredths and percent/fraction conversion. Unit rates, proportional graphs and general percent problems remain Course 1 teaching. |
| Area and Volume | Shapes and attributes from grade 1; rectangle area/perimeter and composite areas; angles, parallel/perpendicular lines and symmetry; grade 5 shape hierarchies, fractional rectangle area, first-quadrant coordinates and rectangular/composite volumes. Circle formulas, surface area and other polygon area formulas remain Course 1 teaching. |
| Statistics | Category counts, comparison, picture/bar graphs and scaled keys; measurement line plots including fraction calculations; grade 5 fair-share mean and data range previews. Formal measures of center/spread and distribution plots remain Course 1 teaching. |

## Coverage audit

`elementary.txt` lists the independently reviewed reachable quests. The verification
runner compares its list, in order, against the actual catalog for every grade.
Each catalog topic holds both its quest and generators; completion requires at
least as many correct answers as there are variants. This ensures no variant is
skipped in a normal quest run. Continuous mode cycles those same variants without
completion. Elementary bosses randomly sample the entire chapter's generator
pool. The legacy mega-boss pool and middle school generators are unchanged.
