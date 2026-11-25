// The Funniest Toaster Error Message — make.fun bounty entry.
//
// Writes one line, at most 120 characters, to /output/entry.txt:
// the error message a kitchen toaster shows its owner when something
// goes wrong. Deadpan, apologetic in its own way, and entirely the
// toaster's own voice: it burned the toast on purpose, and it has
// no regrets — only homework for its owner.
//
// Only the Node standard library is used, so the program runs in a
// bare sandbox with no dependencies and no network.
import { mkdirSync, writeFileSync } from "node:fs";

// The entry: 80 characters, one line, no trailing newline, so the
// file holds exactly the message the judge reads.
const MESSAGE =
  "E12: I burned your toast on purpose. You needed to learn. Unplug me and reflect.";

// The gate only accepts 1 to 120 characters of non-whitespace text:
// refuse to write anything that would fail it, instead of shipping
// a file the scorer would mark invalid.
if (MESSAGE.length < 1 || MESSAGE.length > 120 || !MESSAGE.trim()) {
  throw new Error(
    `entry must be 1-120 characters, got ${MESSAGE.length}`,
  );
}

const OUT_DIR = "/output";
const OUT_PATH = `${OUT_DIR}/entry.txt`;

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_PATH, MESSAGE, "utf8");

// Read it back: the graded run must produce exactly this file.
import { readFileSync } from "node:fs";
if (readFileSync(OUT_PATH, "utf8") !== MESSAGE) {
  throw new Error("entry.txt does not match the message");
}
console.log(MESSAGE);
