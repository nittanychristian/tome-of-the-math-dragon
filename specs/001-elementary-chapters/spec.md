# Feature Specification: Elementary prequel chapters

Branch: `001-elementary-chapters` | Created: 2026-10-23 | Status: Specified

## User stories and acceptance

### US1 — A younger learner can play their grade (P1)

As a grade 1–5 learner, I can choose a chapter for my grade and practice its usual math topics in the same adventure as my older sibling.

- Given a new game, when I view chapters, then grades 1, 2, 3, 4 and 5 appear individually before the existing middle school chapters.
- Given any elementary chapter, when I open it, then its quests span that grade's number sense, operations, measurement, data and geometry expectations.
- Given a quest, when I answer correctly or request help, then its answer is accepted and its hints explain the actual generated problem.
- Given a second grader, when they start their grade, then completion of grade 1 is not required.

### US2 — Existing players keep their progress (P1)

As an existing player, I can enter any previously issued code and resume the same middle school content.

- Given each old code, when entered, then its chapter, completion state and next available content match the original application.
- Given middle school chapters, when elementary chapters are inserted ahead of them, then old chapter and quest identifiers and problem dispatch remain unchanged.
- Given a new elementary code, when entered, then it resumes the correct chapter and progress without colliding with an old code.

### US3 — The story grows with the learner (P2)

As a learner, I follow five connected prequel stories that prepare the world and the hero for the existing sixth grade story.

- Given each elementary chapter, when I begin, progress and finish, then the introduction, quest context and conclusion advance a consistent story.
- Given the grade 5 ending, when I continue into existing Course 1, then the transition agrees with the existing setting, characters and conflict.

## Requirements

- FR-001: Add five separately selectable chapters in ascending grade order before existing chapters.
- FR-002: Provide a documented typical US elementary scope, using Common Core math content as a baseline rather than claiming accredited or exhaustive classroom instruction.
- FR-003: Every documented topic must have a reachable quest and implemented generator; no fallback to middle school exercises.
- FR-004: Keep early arithmetic nonnegative and within grade-appropriate ranges; avoid division by zero and ambiguous choices. Fractions and decimals must fit existing answer widgets.
- FR-005: Preserve every legacy passcode and its meaning; retain access to all existing content independently of elementary completion.
- FR-006: Support elementary chapter progress, replay, boss encounters, help and victory using the existing game loop.
- FR-007: Use short, clear text for younger readers, supportive hints and concrete examples.
- FR-008: Connect five prequel story arcs to the actual existing Course 1 story.
- FR-009: Verify ordering, codes, progression, generator correctness and topic coverage in addition to a production compilation.

## Edge cases

New game defaults; starting directly in grade 2; switching between grades; final elementary victory leading into Course 1; all previous codes including final completion; invalid codes; elementary final completion; boss replay and mixed questions; zero in subtraction; equivalent fractions; money and decimal precision; multiple-choice uniqueness.

## Success criteria

- Five elementary chapters are selectable and playable, each with full documented topic coverage.
- Every legacy code retains its original semantic result.
- Every new elementary quest produces valid, answerable problems with useful hints.
- All five story arcs are visible in gameplay and the final arc connects to Course 1.
- Production Elm compilation and targeted regression checks pass through Nix.

## Assumptions

“Each its own chapter” means one top-level chapter per grade, with topic quests beneath it. Typical US scope is appropriate; local school sequences differ. This is math practice with instruction through hints, and supplements classroom learning. Existing saved codes are a compatibility contract. No external publication is requested.

## Clarifications from 2026-10-23

- Grade 5 must bridge to all starting middle school material without prerequisite gaps. Include a documented handoff to Course 1, with introductory bridge quests for notation or concepts introduced there; these supplement the full grade 5 scope.
- US4 (P1): A learner can toggle continuous quest practice, especially a dedicated single-digit multiplication facts quest. While enabled, correct answers continue generating questions in the same quest without completion or automatic progression. Turning it off restores normal completion. Help, mistakes, practice replay and leaving the quest remain available. Boss progression remains unchanged.
- FR-010: Show and allow changing continuous mode on the chapter screen and during quest practice. Respect it for full-chapter quests and single-quest practice across all courses, preserving the choice through help and retry within the session.

## US5 — Read generated pictures and graphs (P1)

A learner sees actual visuals for elementary data and measurement questions,
including ribbons, unit cubes, votes, picture/bar graphs and measurement line
plots. Each diagram is generated from the same values used to calculate the
answer. Prompts ask the question without restating all graph values. Labels,
units, equal scales and pictograph keys remain readable on a phone. Diagrams
also appear for the same problem in help and wrong-answer explanations. Existing
middle school answers, passcodes and continuous practice retain their behavior.

Acceptance: generated counts, bar lengths, ribbon lengths, marks and keys match
the underlying quantities over deterministic seeds; the learner can answer from
the visible graph; visuals are accessible through textual descriptions; charts
fit the question area without blocking controls; text-only questions still work.

## US6 — Read arithmetic in aligned columns (P1)

Straightforward numeric addition, subtraction and multiplication questions use a
vertical written layout when any operand's magnitude is greater than 10 or any
operand contains a decimal point, including numbers below 1 or 10. Align
place values; align decimal points for decimal addition/subtraction. Numeric
division uses a long-division bracket with divisor outside and dividend inside.
Keep small fact drills inline. Preserve grouped expressions, fractions, algebra,
word problems, answers, codes and continuous practice. Use the same layout for
the question shown in help and wrong-answer walkthroughs. Multi-addend sums must
also align correctly. Layout must remain readable at phone widths.

## US7 — Discover a rule versus apply a rule (P1)

Split input/output practice into two distinct problem types in the existing
Patterns and Tables quest. Rule discovery displays input/output pairs in a real
table and asks which offered rule fits every row, without revealing the rule in
the prompt. Exactly one offered rule must match all rows; distractors may fit
one row so checking the whole table matters. Applying a rule gives the multiply-
then-add rule and asks for an output for a varied input, with a missing-output
table row. Hints explain either deriving the rule or applying the supplied rule.
Both types retain actual table data in help/tutorial and continuous practice.

## US8 — Grade 2 multiplication tables (P1)

Insert six separately selectable grade 2 quests immediately after current quest 7
(Add and Subtract within 1000) and before current quest 8 (Mental Tens and
Hundreds). New quests 8–13 are Multiply by 0, 1, 2, 3, 4 and 5, in that order.
Each fixes its named multiplier as the first operand and randomly chooses the
second operand from 0–9 inclusive. Include 5 x 9; never generate 6 x 9 in these
quests. Continuous practice stays within the selected table. Preserve all existing
grade 2 topics, later-grade facts, chapter IDs and passcodes.

Grade 2 multiplication clarification: each of the six quests alternates numeric
facts with visual equal-group problems. The first factor is the number of groups;
the second is the number of counters in each group. Show zero groups and empty
groups accurately. Keep the same operand bounds and continuous-practice behavior.
