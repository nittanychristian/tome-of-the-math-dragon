// App regression runner: no npm dependencies. Compile tests/Verify.elm first.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const bundle = process.argv[2];
assert(bundle, 'Usage: node tests/verify.cjs /absolute/path/to/verify.js');
const { Elm } = require(path.resolve(bundle));
const app = Elm.Verify.init({ flags: null });
const timeout = setTimeout(() => { throw new Error('Verification worker timed out'); }, 30000);
app.ports.report.subscribe(result => {
  clearTimeout(timeout);
  assert.deepEqual(result.failures, [], result.failures.slice(0, 20).join('\n'));
  const syllabus = fs.readFileSync(path.join(__dirname, '../elementary.txt'), 'utf8');
  let topicCount = 0;
  for (const entry of result.catalog) {
    const section = syllabus.split(`Grade ${entry.grade} — `)[1].split(/\nGrade \d|\nContinuous practice/)[0];
    const topics = section.split('\n').filter(line => line.startsWith('- ')).map(line => line.slice(2));
    assert.deepEqual(entry.topics, topics, `Grade ${entry.grade} coverage differs from syllabus`);
    topicCount += topics.length;
  }
  const grade2Topics = result.catalog.find(entry => entry.grade === 2).topics;
  assert.deepEqual(grade2Topics.slice(6, 14), ['Add and Subtract within 1000', ...Array.from({ length: 6 }, (_, factor) => `Multiply by ${factor}`), 'Mental Tens and Hundreds']);
  const grade2Factors = new Map(Array.from({ length: 6 }, (_, factor) => [factor, new Set()]));
  let arithmeticChecks = 0;
  let placeValueChecks = 0;
  let repeatedDigitChecks = 0;
  let visualChecks = 0;
  const visualKinds = new Set();
  const visualCounts = new Map();
  let facts = new Set();
  const fractionValue = (n, d) => Number(n) / Number(d);
  for (const p of result.samples) {
    const location = `Grade ${p.grade}, quest ${p.quest}, variant ${p.variant}: ${p.prompt}`;
    if (p.visual) {
      const v = p.visual;
      visualKinds.add(v.kind);
      visualCounts.set(v.kind, (visualCounts.get(v.kind) || 0) + 1);
      let visualAnswer;
      if (v.kind === 'objects') visualAnswer = v.count;
      else if (v.kind === 'groups') {
        assert(v.groups >= 0 && v.groups <= 5 && v.perGroup >= 0 && v.perGroup <= 9, location);
        visualAnswer = v.groups * v.perGroup;
      }
      else if (v.kind === 'array') visualAnswer = v.rows * v.columns;
      else if (v.kind === 'fraction') {
        assert(v.total > 0 && v.shaded >= 0 && v.shaded <= v.total, location);
        visualAnswer = v.shaded / v.total;
      } else if (v.kind === 'pictures') {
        assert(v.perSymbol > 0, location);
        visualAnswer = v.rows.reduce((sum, row) => sum + row.value * v.perSymbol, 0);
      } else if (v.kind === 'bars') {
        assert(v.step > 0 && v.rows.every(row => row.value % v.step === 0), location);
        visualAnswer = v.rows[0].value - v.rows[1].value;
      } else if (v.kind === 'ribbons') {
        visualAnswer = p.type === 'choice'
          ? v.rows.reduce((longest, row) => row.value > longest.value ? row : longest).name.toLowerCase()
          : v.rows.length === 1 ? v.rows[0].value : v.rows[0].value - v.rows[1].value;
      } else if (v.kind === 'plot') {
        assert(v.denominator > 0 && v.marks.every(mark => mark.count > 0), location);
        visualAnswer = p.prompt.includes('total length')
          ? v.marks.reduce((sum, mark) => sum + mark.value / v.denominator * mark.count, 0)
          : p.prompt.includes('6 cm') ? v.marks.find(mark => mark.value === 6).count
          : v.marks.reduce((sum, mark) => sum + mark.count, 0);
      } else if (v.kind === 'table') {
        if (p.type === 'choice') {
          assert(v.rows.length >= 3 && v.rows.every(row => row.output !== null), location);
          assert(!p.prompt.toLowerCase().includes('multiply'), 'Discovery prompt must not give away the rule');
          const matches = (rule, rows) => {
            const parsed = rule.match(/^Multiply by (\d+), then add (\d+)$/);
            return parsed && rows.every(row => row.input * Number(parsed[1]) + Number(parsed[2]) === row.output);
          };
          const correct = p.choices.filter(rule => matches(rule, v.rows));
          assert.equal(correct.length, 1, `Exactly one offered rule must match every row: ${location}`);
          assert(p.choices.filter(rule => matches(rule, [v.rows[0]])).length >= 3, 'Distractors should require checking more than the first row');
          visualAnswer = correct[0];
        } else {
          const rule = p.prompt.match(/^Rule: multiply by (\d+), then add (\d+)\. What is the output for input (\d+)\?$/);
          assert(rule && v.rows.length === 1 && v.rows[0].output === null, location);
          assert.equal(v.rows[0].input, Number(rule[3]), location);
          visualAnswer = v.rows[0].input * Number(rule[1]) + Number(rule[2]);
        }
      } else assert.fail(`Unknown visual: ${v.kind}`);
      if (typeof visualAnswer === 'number') assert(Math.abs(p.answer - visualAnswer) < 0.000001, `Diagram/answer mismatch: ${location}`);
      else assert.equal(p.answer, visualAnswer, location);
      visualChecks++;
    }
    if (/^In \d+, what is the value of the digit \d/.test(p.prompt)) {
      const match = p.prompt.match(/^In (\d+), what is the value of the digit (\d) in the (tens|hundreds|hundred thousands) place\?$/);
      assert(match, `Whole-number place-value questions must identify the position: ${location}`);
      const [, number, digit, name] = match;
      const place = { tens: 10, hundreds: 100, 'hundred thousands': 100000 }[name];
      assert.equal(Math.floor(Number(number) / place) % 10, Number(digit), location);
      assert.equal(p.answer, Number(digit) * place, location);
      placeValueChecks++;
      if (number.split(digit).length > 2) repeatedDigitChecks++;
    }
    let match = p.prompt.match(/^(-?\d+(?:\.\d+)?) ([+x/\-]) (-?\d+(?:\.\d+)?) = \?$/);
    let expected;
    if (match && p.type !== 'choice') {
      const [, left, op, right] = match;
      const a = Number(left), b = Number(right);
      expected = op === '+' ? a + b : op === '-' ? a - b : op === 'x' ? a * b : a / b;
      if (Math.abs(a) > 10 || Math.abs(b) > 10 || left.includes('.') || right.includes('.')) {
        assert(p.layout, `Missing vertical arithmetic: ${location}`);
        assert.equal(p.layout.operator, op, location);
        assert.deepEqual(p.layout.operands.map(Number), [a, b], location);
        if (op === '+' || op === '-') {
          const decimalPlaces = p.layout.operands.map(number => (number.split('.')[1] || '').length);
          assert.equal(decimalPlaces[0], decimalPlaces[1], `Decimal columns must align: ${location}`);
        }
      } else assert.equal(p.layout, null, `Small facts should stay inline: ${location}`);
      if (p.grade === 1) assert(expected >= 0 && expected <= 100, `Grade 1 arithmetic range: ${location}`);
    }
    match = p.prompt.match(/^(\d+)\/(\d+) ([+x\-]) (\d+)\/(\d+) = \?$/);
    if (match) {
      const [, n, d, op, n2, d2] = match;
      const a = fractionValue(n, d), b = fractionValue(n2, d2);
      expected = op === '+' ? a + b : op === '-' ? a - b : a * b;
    }
    match = p.prompt.match(/^(\d+) (\d+)\/(\d+) ([+x\-]) (\d+) (\d+)\/(\d+) = \?$/);
    if (match) {
      const [, whole, n, d, op, whole2, n2, d2] = match;
      const a = Number(whole) + fractionValue(n, d), b = Number(whole2) + fractionValue(n2, d2);
      expected = op === '+' ? a + b : op === '-' ? a - b : a * b;
    }
    if (expected !== undefined) {
      assert(Number.isFinite(expected), location);
      assert(Math.abs(p.answer - expected) < 0.000001, `${location}: got ${p.answer}, expected ${expected}`);
      arithmeticChecks++;
    }
    const factsIndex = result.catalog.find(entry => entry.grade === 3).topics.indexOf('Single-Digit Times Tables');
    if (p.grade === 2 && p.quest >= 7 && p.quest <= 12) {
      const match = p.prompt.match(/^([0-5]) x (\d) = \?$/);
      assert(match, `Grade 2 factors must stay in range: ${location}`);
      const factor = p.quest - 7;
      assert.equal(Number(match[1]), factor, location);
      assert.equal(p.answer, factor * Number(match[2]), location);
      assert.equal(p.layout, null, 'These single-digit facts should remain inline');
      if (p.variant === 1) {
        assert(p.visual && p.visual.kind === 'groups', 'Second variant must show equal groups');
        assert.equal(p.visual.groups, factor);
        assert.equal(p.visual.perGroup, Number(match[2]));
      } else assert.equal(p.visual, null, 'First variant is the number-only fact');
      grade2Factors.get(factor).add(Number(match[2]));
    }
    if (p.grade === 3 && p.quest === factsIndex) {
      const match = p.prompt.match(/^(\d) x (\d) = \?$/);
      assert(match, `Facts must use single digits: ${p.prompt}`);
      assert.equal(p.answer, Number(match[1]) * Number(match[2]));
      facts.add(p.prompt);
    }
  }
  assert(arithmeticChecks > 3000, 'Independent arithmetic oracle must cover substantial samples');
  assert(facts.size >= 40, 'Facts practice must generate varied questions');
  assert(placeValueChecks >= 400 && repeatedDigitChecks > 0, 'Place-value regression must cover repeated digits');
  assert.equal(visualKinds.size, 9, 'All nine visual families must be exercised');
  for (const [factor, seconds] of grade2Factors) assert.equal(seconds.size, 10, `Multiply by ${factor} must cover every second factor from 0 to 9`);
  for (const [kind, count] of visualCounts) assert(count >= 100, `${kind} must be checked over at least 100 generated samples`);
  console.log(`PASS: ${result.checks} Elm checks; ${result.samples.length} generated problems; ${arithmeticChecks} independent arithmetic checks; ${topicCount} syllabus topics; ${facts.size} distinct multiplication facts; ${placeValueChecks} explicit place-value prompts (${repeatedDigitChecks} with repeated digits); ${visualChecks} diagram/answer checks across ${visualKinds.size} visual families.`);
});
