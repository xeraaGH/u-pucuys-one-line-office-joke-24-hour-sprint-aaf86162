import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line office joke: the manager's "take more ownership" taken literally.
// Setup: corporate jargon everyone has heard in a review. Punchline: the
// most literal possible compliance — the good chair, the one piece of office
// furniture everyone quietly covets, now lives at home.
const JOKE =
  "My manager told me to take more ownership, so I took the office's good chair home.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only white space, on a single line. Fail loudly instead of writing
// an entry the scorer would refuse.
const chars = [...JOKE];
if (JOKE.trim().length === 0 || chars.length > 200) {
  throw new Error(`joke must be 1-200 characters, got ${chars.length}`);
}
if (JOKE.includes("\n") || JOKE.includes("\r")) {
  throw new Error("joke must be a single line");
}

const out = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(out, { recursive: true });
writeFileSync(join(out, "entry.txt"), JOKE, "utf8");
console.log(`wrote ${chars.length}-character joke to ${join(out, "entry.txt")}`);
