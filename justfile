dev:
    elm-live src/Main.elm --open --dir=src --start-page=index.html -- --output=src/elm.js

verify:
    #!/usr/bin/env bash
    set -euo pipefail
    verification_dir="$(mktemp -d)"
    trap 'rm -rf "$verification_dir"' EXIT
    elm make tests/Verify.elm --optimize --output="$verification_dir/verify.js"
    node tests/verify.cjs "$verification_dir/verify.js"
    elm make src/Main.elm --optimize --output="$verification_dir/elm.js"
