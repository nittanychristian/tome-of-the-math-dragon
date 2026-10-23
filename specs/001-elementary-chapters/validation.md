# Validation — 2026-10-23

- `nix develop -c just verify`: PASS. 30,126 Elm assertions, 29,500 generated
  quest/boss problems over deterministic seeds, 6,601 independent arithmetic
  checks, all 114 syllabus topics, and 63 distinct single-digit multiplication
  facts in the 100-seed sample.
- All 40 legacy resume codes: original destinations, original preceding-unit
  awards, normalization and actual Main update navigation verified. Final trophy
  award preserved. Five elementary award/resume round trips verified.
- All existing middle school regular-unit and quest dispatch routes match their
  original generators with deterministic inputs. Existing generator math and
  sprites are preserved; constructors add empty visual defaults. The existing
  mega-boss generator implementation is unchanged.
- Continuous mode: 100 correct answers stay in the same quest; turning off restores
  completion; enabling on a completed quest resumes it; mistakes, tutorial, help,
  retry and exit preserve expected state; full-chapter and old middle school
  quest modes work; boss victory remains normal.
- `nix develop -c node tests/browser.cjs`: PASS against headless Chromium 149.
  Actual UI checks: new game, grade order, direct grade 2 entry, chapter practice
  toggle, twelve multiplication answers without completion, toggle-off completion,
  and old passcode resume. Grade 2 phone-width map and active continuous practice
  screenshots visually inspected.
- `nix build path:.#default`: PASS, optimized production compilation and static
  package including the font.
- Formatting validation and `git diff --check`: PASS.

The random-problem checks found a duplicated multiple-choice distractor in a
measurement question. The shared choice builder now removes duplicate labels.
The rerun passes. The headless browser needed an explicit fontconfig file pointing
to the repository font; this was a test environment setting, not an app change.

No deployment, push, merge or commit was performed. Work is in the numbered sibling
feature worktree. All stages and the readiness review are available under this
spec directory.

## Generated visuals follow-up

Added optional typed problem diagrams and SVG rendering for counting stars,
unit-cube ribbon lengths, equal-square arrays, shaded fraction strips, bar charts,
picture graphs with keys, and stacked measurement line plots. Graph prompts now
ask for interpretation without narrating every data value. Help and wrong-answer
walkthroughs retain the actual problem's diagram. Illustrated questions use a
smaller decorative sprite to leave room for the question, graph and controls.

`just verify` passes all previous checks plus 3,472 independently computed
visual-data/answer comparisons across nine visual families (at least 100
samples per family). This includes scaled chart keys and axes, ribbon colors and
lengths, plot counts versus fractional total lengths, array dimensions and
shaded fraction counts, input/output tables and equal groups. Browser checks pass for all nine types, phone sizing,
help/tutorial diagram identity, continuous facts practice and old code resume.
Screenshots of ribbons, unit cubes, votes and fraction line plots were visually
reviewed; crowded axis labels were spaced out while retaining every unit tick.
The optimized browser bundle was rebuilt and the production Nix package passes.

Existing middle school problem constructors now default `visual` to `Nothing`.
Their generator math, text and answer behavior are preserved; the source was
compared with master after removing those defaults and normalizing formatting.

## Aligned arithmetic follow-up

The shared math renderer recognizes complete numeric questions ending `= ?` and
uses written columns when an operand's magnitude exceeds 10 or any operand has
a decimal point, including values below 1 and 10. Multi-addend sums,
binary subtraction and multiplication align on the right. Decimal addition and
subtraction pad trailing zeros to align decimal points. Division uses a written
bracket, with the divisor outside and dividend inside. Small facts, fractions,
grouped/mixed operations, missing-number equations and word problems retain their
normal presentation. Generators, answers and progression are unchanged.

Verification passes: 30,126 Elm checks including 29 explicit layout fixtures,
plus generated arithmetic layout/operand checks. Fixtures cover the exact
threshold, mixed lengths, decimals, negative values, multiple addends, division
and excluded syntax. Decimal fixtures cover small decimals, mixed decimal/whole
operands, trailing zeros, addition, subtraction, multiplication and division.
Chromium measured decimal-point alignment on actual grade 5 decimal questions
with both operands below 10. Chromium also verified real grade 4 addition columns share the
same right edge at 375px width, the same question remains vertical in help, and
larger-number division shows its bracket. Both phone screenshots were inspected.
All existing diagram, continuous-practice and passcode browser checks pass. The
optimized tracked bundle, production Nix build, formatter and whitespace checks
pass.

## Rule discovery, native tables, and grade 2 multiplication

The existing Patterns and Tables quest now distinguishes applying a supplied
multiply-then-add rule from discovering a rule that fits every displayed pair.
Both use native HTML input/output tables with column headers and bordered cells.
The given-rule type varies the input and shows a missing output; the discovery
type supplies three complete pairs and four candidate rules. Independent checks
confirm exactly one candidate fits every row, including distractors that fit the
first row but fail later ones. The 1→9, 2→15, 3→21 example correctly selects
multiply by 6, then add 3. The two-pattern comparison variant remains available.
Browser checks exercise both types, choose the correct rule from actual rows,
verify missing-output arithmetic and retain the actual table in help.

Grade 2 now has 26 quests. Positions 8–13 are Multiply by 0 through Multiply by 5,
inserted exactly between Add and Subtract within 1000 and Mental Tens and Hundreds.
Each fixes its first factor and chooses its second from 0–9. Numeric and equal-
group visual variants alternate. Groups show individual counters, no groups when
the first factor is zero, and empty groups when the second factor is zero.
Generated checks cover every second factor in all six quests, products and visual
group/counter counts. A 60-answer model check and 12-answer browser run confirm
continuous Multiply by 5 never changes table or completes. Chromium checks exact
quest positions and actual rendered group/counter counts, including zero groups.
Phone screenshots of both input/output types and grouped multiplication were
visually reviewed. Existing codes and middle school content remain compatible.
