# Jean: Story Sequence Machine

Content engine for Jean's Instagram story sequences. You fill the three folders below with references, results and images, then ask Claude for a sequence. You get back the copy plus finished 1080×1920 frames ready to post.

## ⬆ Upload links

Each link opens GitHub's upload page for that folder. Drag in as many images as you want (up to 100 per upload, 25 MB each), then press **Commit changes**.

| Folder | What goes in it | Upload |
|---|---|---|
| **01 · Inspiration: soft CTA** | Story sequences you like that end in a soft ask (freebie, "DM me 'X'", poll) | [⬆ Upload](https://github.com/eliascroesus/jeanstoryseq/upload/claude/lucid-curie-18bajj/01-inspiration/soft-cta) |
| **01 · Inspiration: hard CTA** | Story sequences you like that sell directly (offer, launch, apply, deadline) | [⬆ Upload](https://github.com/eliascroesus/jeanstoryseq/upload/claude/lucid-curie-18bajj/01-inspiration/hard-cta) |
| **01 · Inspiration: highlights** | Highlight covers and the stories inside highlights you like | [⬆ Upload](https://github.com/eliascroesus/jeanstoryseq/upload/claude/lucid-curie-18bajj/01-inspiration/highlights) |
| **01 · Inspiration: general** | Not sure which, or design you like in general | [⬆ Upload](https://github.com/eliascroesus/jeanstoryseq/upload/claude/lucid-curie-18bajj/01-inspiration) |
| **02 · Results** | Client wins, DMs, testimonials, revenue/stat screenshots | [⬆ Upload](https://github.com/eliascroesus/jeanstoryseq/upload/claude/lucid-curie-18bajj/02-results) |
| **03 · Backgrounds** | Textures, gradients, scenes for text to sit on | [⬆ Upload](https://github.com/eliascroesus/jeanstoryseq/upload/claude/lucid-curie-18bajj/03-backgrounds-larp/backgrounds) |
| **03 · Unprofitable era** | Photos and videos from before Jean was profitable (blown accounts, old setup, early days) | [⬆ Upload](https://github.com/eliascroesus/jeanstoryseq/upload/claude/lucid-curie-18bajj/03-backgrounds-larp/unprofitable-era) |
| **03 · LARP** | Lifestyle shots of Jean | [⬆ Upload](https://github.com/eliascroesus/jeanstoryseq/upload/claude/lucid-curie-18bajj/03-backgrounds-larp/larp) |

Filenames don't matter much; Claude looks at every image. Descriptive names (`sarah-first-10k-month.png`) still help it pick the right proof faster.

## Making a sequence

Start a Claude Code session on this repo and just ask, for example:

> Make a soft sequence for "why most people quit in week 2"

> Hard sequence: doors close Friday on the coaching program, 3 spots left

Claude will:
1. Read `brand.md` and ask (once, briefly) for anything missing, usually the lead magnet or offer and the DM keyword or link.
2. Study the matching references, pick real results and images from the folders.
3. Write the copy frame by frame, then design and render every frame.
4. Check its own frames, fix problems, and push them to `sequences/<date>_<soft|hard>_<topic>/export/`.

There's no fixed template. Each sequence's look comes from your references and the brief.

## Teach it once

Put Jean's details in **[`brand.md`](brand.md)**: who Jean is, audience, voice, lead magnets, offers. Claude also adds to it whenever you mention a new lead magnet or offer, or give feedback like "too salesy" or "this one got 40 DMs". It gets sharper every sequence.

## What's where

```
01-inspiration/        reference sequences (soft-cta/, hard-cta/, highlights/)
02-results/            real client proof
03-backgrounds-larp/   backgrounds/ and larp/ images
brand.md               Jean's brand memory: voice, offers, lead magnets, learnings
sequences/             finished sequences (export/ = PNGs to post)
CLAUDE.md              the machine: Claude's instructions for building sequences
tools/render.js        turns designed frames into PNGs
```
