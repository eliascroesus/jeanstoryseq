# Jean's Story Sequence Machine

This repo has one job: turning a short prompt ("make a soft sequence for X") into a finished Instagram story sequence for Jean. That means copy, design, and PNG frames ready to post, in both soft-CTA and hard-CTA styles.

Everything here is either **input** (the asset folders and `brand.md`) or **output** (`sequences/`).

## The library

| Path | What's in it | How to use it |
|---|---|---|
| `00-brand-docs/` | Avatar sheets (Marcus), buyer beliefs, competitor research | Read before writing any copy |
| `brand.md` | Who Jean is, audience, voice, offers, lead magnets, learnings | Read it first, every time. It is the machine's memory. |
| `01-inspiration/soft-cta/` | Reference soft-CTA story sequences (design + copy) | Study before every soft sequence |
| `01-inspiration/hard-cta/` | Reference hard-CTA story sequences (design + copy) | Study before every hard sequence |
| `01-inspiration/` (top level) | Unsorted or general design references | Useful for either type |
| `02-results/` | Real client results: DMs, testimonials, revenue/stat screenshots, before/afters | The **only** source of proof |
| `03-backgrounds-larp/backgrounds/` | Textures, gradients, scenes to put text on | Frame backgrounds |
| `03-backgrounds-larp/larp/` | Lifestyle / aspirational shots of Jean | Story and day-in-the-life frames, credibility |
| `sequences/` | Finished sequences, one folder each | Output |
| `tools/render.js` | Renders HTML frames to 1080×1920 PNGs + a preview sheet | See step 4 |

References can also be text: a `.md` or `.txt` file of copy in `01-inspiration/` counts as a reference too.

### Catalogs

Each asset folder's `README.md` ends with a **Catalog** section: one line per file saying what it is and what's useful about it. At the start of every job:

1. `ls` the asset folders and compare against the catalogs.
2. Open every file that isn't catalogued yet and add a line for it. For results, note the number or claim it proves. For inspiration, note the hook, structure and design moves worth stealing. For backgrounds and LARP, note the mood and where text fits.
3. Use the catalogs to shortlist assets, then **open the actual images** you're about to use or imitate. A catalog line is no substitute for looking.

If uploads arrive as HEIC, convert them so the browser can render them: `convert in.HEIC out.jpg` (ImageMagick reads HEIC here). Keep the original unless the user says otherwise. Never delete or rename the user's uploads without asking.

## When the user asks for a sequence

### 1. Pin down the brief

Pull out:
- **Angle**: the "X". What is this sequence about?
- **CTA type**: soft or hard. If it isn't stated, choose the one that fits and say which you chose.
- **Destination**: what the CTA leads to (lead magnet, offer, call, waitlist, application) and how people get it (DM keyword, link sticker, reply to the story, poll then DM).
- **Urgency**, if any: deadline, limited spots, price change, bonus expiring.
- **Length**, if given. Otherwise let the arc decide; soft usually runs 3–7 frames and hard 5–10.

Check `brand.md` for the destination first. If it's missing there and the user didn't give it, ask once, in one short bundled message: what it is, the keyword or link, and anything time-bound. If the user says "just go", use clearly marked placeholders like `[KEYWORD]` and list them when you deliver.

Whenever the user describes a new lead magnet, offer, or fact about Jean, add it to `brand.md` so they never have to repeat it.

### 2. Study the references

- Open several inspiration images of the matching CTA type, picking the ones the catalog says are closest to this angle. Note hook style, frame count, text density, how proof is shown, how the CTA is worded and placed, and the type and colour treatment.
- Borrow structure and techniques. Don't copy another creator's exact wording, handle or branding.
- Pick results from `02-results/` that prove *this* sequence's claim.
- Pick backgrounds and LARP shots that fit the mood.
- Read the **Learnings** in `brand.md`: past feedback beats general rules.

### 3. Write the copy first

Copy `sequences/_template/sequence.md` into a new folder `sequences/YYYY-MM-DD_soft_<slug>/` (or `_hard_`) and fill it in: brief, the arc in one line per frame, then each frame's copy, visual direction, assets, and what to add in the Instagram app (stickers, links, music). Get the arc right before you design anything.

### 4. Design and render the frames

- One HTML file per frame: `frames/01.html`, `frames/02.html`, … each a 1080×1920 canvas. Shared CSS in `frames/style.css` is fine.
- Reference assets with relative paths. From `sequences/<name>/frames/` the root is `../../../`, e.g. `../../../02-results/client-win.png`.
- Google Fonts work (`<link>` in the head). Installed locally: Inter, Inter Display, JetBrains Mono, Liberation, DejaVu, Noto Color Emoji.
- Render with:
  ```bash
  node tools/render.js sequences/<name>
  ```
  This writes `export/01.png …` plus `export/_preview.png`, a contact sheet of the whole sequence.
- **Open every exported PNG and check it.** Look for text that's cut off or overflowing, content crowding the safe zones, weak contrast over photos, result screenshots too small to read, typos, and frames that look unrelated to the rest. Fix and re-render until it's clean.

There is **no house template.** Each sequence's look comes from the references, the brief, and Jean's brand notes. Keep one visual system *within* a sequence, but don't let every sequence look the same.

### 5. Deliver

Commit `sequence.md`, `frames/` and `export/`, then push. Reply with:
- the link to the sequence's `export/` folder on GitHub, and the preview image;
- the arc in a few lines;
- exactly what to add in the app when posting (which frame gets the poll, question box, link sticker or keyword);
- any placeholders still left.

To revise, edit in place (git keeps the history). For an alternate take, create a `-v2` folder.

## Craft: what makes these work

These are starting points, not templates.

**Soft CTA.** The goal is a reply, DM, or other engagement, with low pressure. The viewer gets value whether or not they act, and the CTA usually offers something free via a DM keyword, or asks them to answer a poll or question box. Arcs that work:
- Personal story → lesson → "want my [thing]? DM me 'KEYWORD'"
- Hot take or myth → why it's wrong → what to do instead → free resource
- Poll ("do you struggle with X?") → empathy → one useful tip → resource
- Behind the scenes / day in the life (LARP) → what made it work → resource
- Client result → what they did differently → the resource that teaches it

**Hard CTA.** The goal is a sale, application, or booked call, and it's direct. Name the offer, who it's for, what they get, the proof, why now, and exactly what to do. Arcs that work:
- Problem → cost of leaving it → the offer → proof → what's inside → why now → CTA
- Result stack (several proof frames in a row) → "this is what [offer] does" → CTA
- Objections ("but I don't have time…") → answer each → CTA
- Announcement (doors open, price going up, last spots) → details → CTA repeated on the last two frames

**Copy for stories**
- Frame 1 decides everything. The hook gets about ten words and has to stop the tap-forward. Use a callout ("if you're X…"), a specific number, a strong opinion, a pattern interrupt, or an open loop.
- One idea per frame. Most frames stay under ~25 words, because people give each frame a few seconds.
- Write it like a DM from Jean, not an ad: short lines, "you", plain words, Jean's voice from `brand.md`.
- Every frame earns the next tap. End frames on a turn ("but here's the part nobody tells you…").
- Specific beats vague: "$4,200 in 9 days" beats "amazing results".
- Each CTA asks for one action, spelled out exactly ("DM me 'GUIDE'"), and the keyword is visually unmissable. Soft sequences usually need one CTA at the end; hard ones can repeat it.
- Use interactive stickers on purpose. Polls and question boxes early in soft sequences lift replies and reach. Link stickers belong in hard CTAs, or when the lead magnet is a link.

**Proof**
- Use only real material from `02-results/`. Never invent numbers, names, testimonials, screenshots, or results. If nothing fits the claim, say so and either drop the proof frame or leave a placeholder.
- Crop or zoom to the part that matters, and add a one-line caption saying what it shows.
- By default, blur or crop other people's names and profile photos. Skip that only when the user says they're fine to show.

## Technical guardrails (these aren't style rules)

- The canvas is 1080×1920. Keep text and key visuals out of the top ~250px and bottom ~300px, where Instagram's header and reply bar sit.
- Leave clear space where a sticker will go and note it in `sequence.md`. Don't draw fake polls or link stickers; real ones get added in the app and real ones get the taps.
- Text has to be readable on a phone: body copy around 44px or larger, headlines much bigger, and a scrim or overlay on busy photos.
- PNG, JPG and WebP render fine. Convert HEIC first (see Catalogs).

## Keeping the machine sharp

- Catalog new uploads (see above).
- Put new facts, offers and lead magnets in `brand.md`.
- When the user gives feedback ("too salesy", "love frame 3", "this one got 40 DMs"), add a dated line to **Learnings** in `brand.md`. Read Learnings before every new sequence.
