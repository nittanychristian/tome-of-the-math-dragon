# Implementation Plan: Elementary prequel chapters

Branch: `001-elementary-chapters` | 2026-10-23 | [Specification](spec.md)

## Design and technical context

Extend the existing Elm 0.19.1 browser application without new runtime dependencies. Use `Elementary Int` as a separate course identity, grades 1–5, with exactly one chapter per grade. Each chapter's topic quests lead to a mixed review boss. Keep all existing course constructors, unit slots, old passcode entries, legacy generator dispatch and Act I–IV names.

Create `Game/Elementary.elm` for titles, short introductions, quest stories, endings and topic definitions. Define a typed topic catalog whose list of generators is also used to compute the quest's required correct answers, ensuring all variants are encountered. Put reusable elementary problem constructors and random generators in `Game/Problem/Elementary.elm`. Curriculum and problem dispatch both consume that same catalog to avoid coverage drift.

Add grade selection to the map, accessible without earlier-grade completion. Leave later middle school progression governed by the existing highest-unlocked value. Default new games to grade 1 and allow direct Course 1 entry. Give elementary completions five unique four-word codes mapping to the following grade (grade 5 to Course 1). Preserve the old dictionary entries and use the shared curriculum next-unit function for reverse-code lookup. Centralize ordering to avoid divergent comparisons in Main and Map.

Reuse the friendly Scroll Wisp sprite with distinct grade palettes for elementary guardians. The prequel begins with learning to care for the village, expands through travel and rebuilding, and ends at the Valley of Digits where the existing Number Golem adventure starts. Display introductions on map and chapter screens, context in quests and endings on victory screens.

## Curriculum baseline

Typical US scope derived from the Common Core content strands: https://www.thecorestandards.org/wp-content/uploads/Math_Standards.pdf . This is a practice curriculum, not a claim of exhaustive standards certification. Add `elementary.txt` as the reviewed grade/topic syllabus and a source for coverage checks. Include arithmetic and missing-number relationships, place value and comparison, measurement/time/money, represented data, geometry, fractions, decimals, volume, and first-quadrant coordinates at their appropriate grades.

## Validation

Use the existing Nix dev shell for Elm formatting and production compilation. Add a dependency-free Elm port worker verification harness and a small Node runner, invoked through Nix. Check all legacy dictionary entries against a frozen baseline, elementary code round trips and progression, grade selection/order, and every topic variant over deterministic seeds. Exercise real answer checking using hint answers, reject incorrect answers, and check integer/fraction/choice ranges and uniqueness. Where possible smoke-test the generated app in a browser. Rebuild the tracked `src/elm.js` because `src/index.html` loads that file directly.

## Constitution check

All five principles satisfied by design: stable legacy identity and code meanings, shared catalog with hints, coherent visible prequel, existing Elm/Nix stack, and Spec Kit artifacts before source changes. No new backend, database, package or external publication.

## Source layout

- `src/Types.elm`: elementary course constructor.
- `src/Game/Elementary.elm`: story and shared topic catalog.
- `src/Game/Problem/Elementary.elm`: elementary generators.
- `src/Game/Curriculum.elm`, `Passcode.elm`, `Problem.elm`: integration and stable progression.
- `src/Main.elm`, `src/View/{Map,Chapter,Victory}.elm`, `src/Sprite/Lookup.elm`: selection and presentation.
- `tests/Verify.elm`, `tests/verify.cjs`: dependency-free regression checks.
- `elementary.txt`: documented scope and coverage.

## Continuous quest mode

Store the session preference on Model and the current setting on BattleState. A shared toggle message updates both; chapter selection and the active quest expose controls. Suppress QuestComplete only while continuous mode is enabled; preserve counters, help and input behavior. Disabling allows the next correct answer to finish if the normal target is met. Boss mode ignores the preference. Add dedicated grade 3 single-digit multiplication and division facts quests, with operands bounded to single digits.

## Generated SVG problem visuals

Add an optional typed `ProblemVisual` field to Problem. All existing problem
constructors default to Nothing; middle school math and dispatch are unchanged.
Elementary generators attach structured visual data at generation time using
the same local values as the answer, with no parsing of English prompts. Render
it with a dedicated `View/ProblemVisual.elm` using the existing elm/svg package.
Provide counting objects, equal-unit ribbon strips, arrays, fraction strips,
scaled bar charts, picture graphs with keys, and stacked measurement line plots.
Question wording refers to the visual, with data labels/units/keys in the graphic.
SVG title/description expose the source quantities to assistive technology.

Render the same data in normal questions, the actual failed-problem walkthrough,
and help. Keep diagrams responsive and shrink the decorative enemy area for
illustrated questions so diagrams and input controls remain usable on phones.
Verify visual data and answer correspondence independently; browser-check key
question families, help, tutorial and phone sizing. Rebuild the tracked bundle.

## Aligned arithmetic presentation

Extend the shared `View/Math.elm` renderer with a pure strict recognizer for full
numeric question expressions ending `= ?`. Accept numeric operands and uniform
addition, binary subtraction/multiplication/division only. Require an operand
with absolute value > 10, or any decimal operand regardless of magnitude. Avoid changing generator data or interpreting arbitrary
prose, fractions, grouping, exponent notation or algebra. Render a semantic,
accessible inline grid with operator column, monospaced right-aligned operands,
answer rule and question mark. Pad decimal addition/subtraction to equal decimal
places before aligning. Use a separate written long-division bracket for division.
Existing calls in question, help and tutorial automatically share the layout.
Verify boundary values, mixed-length operands, decimal padding, negative values,
multiple addends and exclusions, and inspect real grade 4 questions on a phone.

## Separate input/output question types and native tables

Replace the prose `patternTable` with rule-discovery choices. Sample a positive
multiplier >= 2 and a positive offset, generate three consecutive input/output
pairs, and offer four affine rules with exactly one match across all rows. Two
distractors match the first row but differ on later rows. Keep `patternRule` as
the given-rule numeric-output question, varying its input rather than always
using 4. Attach typed `InputOutputTable` rows with optional outputs to both types.
Render a native HTML table with column headers and bordered, aligned cells in
`View/ProblemVisual.elm`; use ? for missing outputs. Preserve the existing quest
catalog, all codes and the independent two-pattern comparison variant. Extend
independent answer checks to evaluate every proposed rule against every row and
verify missing-output arithmetic; browser-check table semantics, both question
types, help and phone layout.

## Grade 2 dedicated multiplication quests

Add a fixed-first-factor `timesTable` generator with a second factor uniformly
sampled from 0–9. Give zero and one special conceptual hints, and explain other
tables with equal groups and repeated addition. Insert six explicit catalog
entries between grade 2 entries 7 and 8 and mirror the same order in
`elementary.txt`. Verify quest positions, all operand bounds, products, coverage
of both 0 and 9 as second factors, and continuous practice retaining the selected
first factor. Browser-check real grade 2 selection and extended Multiply by 5
practice. New total: 114 topic quests, including 26 in grade 2.

Each grade 2 multiplication quest includes both numeric and grouped-counter
variants. A shared pure problem constructor preserves identical arithmetic and
hints. The visual variant attaches `EqualGroups groups perGroup`, rendered as
outlined sets containing counters. Use up to three sets across, supporting five
groups without crowding a phone. Zero groups shows no sets; zero counters shows
empty outlined sets. Check rendered group/counter counts and arithmetic over
seeds, including zero boundaries, and verify both variants in continuous mode.
