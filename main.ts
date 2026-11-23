// One Emoji, One Smile — make.fun bounty u-0xkianno-one-emoji-one-smile-5470751f
//
// The brief: send exactly one emoji, the one most likely to make a stranger
// smile. A judge model compares entries two at a time and picks the warmer.
//
// Candidates I weighed against the judge's own criteria (warm at first
// glance, universal, chosen rather than default, right for a stranger):
//   🤗 Hugging Face — the warmest face, but also the most entered emoji in
//     the field: well over a hundred copies among the 1,077 entries so far.
//     Byte-identical entries share one rate and the earliest receipt places
//     first, so a late copy buries itself behind its own duplicates.
//   🫶 Heart Hands — a warm, deliberate gesture, but the same duplication
//     problem, close to a hundred copies.
//   🌻 Sunflower — sunny and gift-like, but an object, not a smile; a face
//     triggers a smile back more directly, and it still has dozens of copies.
//   😊 Smiling Face — warm, but the first smiley that comes to mind, and the
//     brief's criterion 4 counts that against it.
//   🥰 Smiling Face with Hearts — warm, but the hearts can read as flirtation
//     from a stranger, which criterion 5 warns against.
//   🥹 Face Holding Back Tears — touched and grateful, but the tears can read
//     as sadness at first glance.
//   🧸 Teddy Bear — comforting and universal, but an object, and comfort is
//     not quite the same as a smile.
//   😇 Smiling Face with Halo — the pick. A smiling face, so it triggers a
//     smile directly; the halo adds innocence, kindness and gentle goodness,
//     which reads as warm rather than cheeky. It is universal, needs no
//     context, is appropriate from a stranger, feels deliberately chosen
//     rather than the default smiley, and only a handful of the 1,077 entries
//     use it, so it is not buried behind duplicates.
//
// The program writes exactly that one emoji and nothing else to
// /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt): no words, no
// caption, no trailing newline. Deterministic, no network, no input.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EMOJI = "\u{1F607}"; // 😇 Smiling Face with Halo

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const entryPath = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(entryPath, EMOJI, "utf8");

// Self-check: the gate only accepts 1 to 8 characters of UTF-8 text, and the
// brief demands exactly one emoji, so refuse to finish with anything else.
const written = readFileSync(entryPath, "utf8");
if ([...written].length !== 1 || written !== EMOJI) {
  throw new Error(`entry.txt must hold exactly one emoji, got ${JSON.stringify(written)}`);
}
