# Run and verify

From this feature worktree:

```sh
nix develop -c just dev
```

Start a new game, enter a name, and choose Grade 1–5 or Course 1 from the map's
selector. Later middle school courses retain their existing progression locks.
Each elementary grade has one chapter, with single-quest practice available.

For continuous times tables, choose **Grade 3 → The Bridge of Many Parts**, turn
**CONTINUOUS PRACTICE** on, then choose **Single-Digit Times Tables**. Both factors
are 0–9. The quest continues indefinitely. The active quest also has a toggle;
turn it off to finish after the normal target, or return to the chapter at any
time. This works in all quest modes, including the old middle school content.
Boss victory conditions are unchanged.

```sh
nix develop -c just verify
nix build path:.#default
```

The dependency-free Elm worker verifies old passcodes, progression, all elementary
quest variants over 100 deterministic seeds, answer checking and continuous
practice. Its Node runner checks syllabus coverage and independently computes
arithmetic and fraction answers. No npm install or new Elm packages are needed.

Optional browser regression, in separate terminals:

```sh
nix shell --inputs-from . nixpkgs#chromium -c chromium --headless --disable-gpu --remote-debugging-port=19323 --user-data-dir=/tmp/mathdragon-browser-check about:blank
nix develop -c node tests/browser.cjs
```

The browser runner serves the local `src` files on a temporary loopback port and
checks real navigation, twelve continuous answers, completion after disabling,
and a legacy passcode. It writes screenshots to `/tmp/mathdragon-*.png`.

The tracked `src/elm.js` is rebuilt for direct use by `src/index.html`. The Nix
package compiles its own optimized bundle.

In a fontless container, Chromium needs `FONTCONFIG_FILE` pointing to a fontconfig
XML file whose `<dir>` names this worktree's `src` directory (containing the
checked-in font). Use a writable `<cachedir>` under `/tmp`. This is unnecessary
when the host already provides a working font configuration.

Grade 2 quests 8–13 are **Multiply by 0** through **Multiply by 5**, between
**Add and Subtract within 1000** and **Mental Tens and Hundreds**. The first factor
stays fixed, while the second ranges from 0–9. Number-only facts alternate with
outlined groups of counters. Turn on continuous practice to stay in one table.

For input/output work, choose **Grade 5 → The Gate to the Valley → Two Patterns
and Tables**. Supplied-rule questions use a table with a missing output;
discovery questions show complete rows and ask which rule fits every row.
