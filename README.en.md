# Japonisme: Before and After

[日本語](README.md)

**▶ [Explore in 3D](https://lanni007.github.io/japonisme-universe/?lang=en) · [Compare categories](https://lanni007.github.io/japonisme-universe/timeline-lanes.html?lang=en) · [Read as cards](https://lanni007.github.io/japonisme-universe/timeline.html?lang=en) · [Previous version](https://lanni007.github.io/japonisme-universe/previous/?lang=en)**

This edition includes regional 3D views and two timelines. The previous public version is preserved in previous/.

**Terms: viewing and link sharing are welcome. Newly published project material requires prior written permission for redistribution, commercial reuse, and other reuse. Earlier MIT / CC BY 4.0 grants and third-party licenses remain valid. See [LICENSE](LICENSE).**

An interactive 3D network tracing how Japanese art and culture traveled overseas, influenced artists around the world, and returned to Japan in new forms. It connects early cultural exchanges and trade through Dejima with Impressionism, Art Nouveau, and postwar film and animation.

Open `index.html` for 3D or `timeline.html` for a reading view. Keep the adjacent `data/` and `images/` folders. Illustrations for 58 records are stored as WebP files. The timeline lazily loads 320px thumbnails; full images open on request. Original sources, creators and licenses remain accessible. Three.js is included; fallback fonts work offline.

Use **日本語 / English** at the top right to switch the interface, node descriptions, story guides, torii chapter names, and image captions. Switching languages preserves your place in the ride and your current selection. The choice is remembered when browser storage is available; `?lang=en` and `?lang=ja` links take priority. Without a language link or saved preference, the default is Japanese.

## How to explore

- Select **Read the timeline** for the vertical reading view, then **View in 3D** on a record to open that record in the universe.
- Regional orbs change their names and groupings over time; registered artist movements use activity locations.
- Select **Explore stories** to follow connected events in sequence.
- Select **Ride the golden rail** to travel through time along the yellow rail. Nine red torii gates mark the transitions between chapters.
- The current year appears in large text at the top right. Past nodes and networks remain by default. Images appear sequentially for about four seconds. After pausing to read, select **Resume journey from [year]** to continue.
- Adjust the playback speed from **0.25× to 3.00×** with the speed slider. Adjust image size from **60% to 160%** (or **25% to 200%** in the enlarged view) with the image slider; images also fit automatically within the screen.
- Select an image or a node to read its description, explore its connections, and check the image creator, license, and original source.
- See [LICENSE](LICENSE) and [LICENSE-DATA.md](LICENSE-DATA.md) for terms; earlier releases and third-party images retain their terms.
- On a computer, drag to rotate and scroll to zoom. On a touch screen, drag with one finger to rotate and pinch with two fingers to zoom.

## Work in progress

The content and interface are still being developed. Translations preserve the distinctions between historical evidence, widely repeated accounts, and the project's interpretations; they do not constitute a new verification of every historical claim. Corrections and better sources are welcome through Issues.

## What is included

The images include Katsushika Hokusai, Utagawa Hiroshige, Claude Monet, Edgar Degas, Vincent van Gogh, Alphonse Mucha, international exhibitions, Japanese swords, lacquerware, and Imari ceramics. The postwar chapter also includes Akira Kurosawa, Kenji Mizoguchi, Hayao Miyazaki, and the Academy Award for *Spirited Away*.

Image captions distinguish portraits, artworks, representative objects, and present-day photographs of buildings. The date of an image's creation or photography may differ from the date of its associated event or node; check the caption and the node description for each date.

## Historical evidence and interpretation

Connections are grouped into seven types:

| Japanese label | Meaning |
|---|---|
| 影響 | Influence |
| 人の縁 | Personal connections |
| 時代の力 | Historical forces |
| 証言 | Testimony |
| 共通の型 | Shared patterns |
| 仮説 | Hypotheses |
| 後世の見方 | Later perspectives |

Shared patterns and hypotheses include the project's interpretations. Widely repeated accounts and interpretations are identified as such in the descriptions. Please open an Issue if you find an error or a better source.

## Inspiration

This project was inspired by Yusuke Narita's essay “一字が万事（中編）,” the tenth installment of his column “書く気がおきない,” in *Numéro TOKYO*, November 2026, p. 140. Its starting point was the idea that Meiji-era Japan expressed its identity through single concepts such as “tea,” “nothingness,” and “bushidō.”

This project is not affiliated with or endorsed by Yusuke Narita. He has not reviewed or approved its contents, and the project does not reproduce the text of his essay.

## Files

- [`index.html`](index.html): the 3D visualization.
- [`timeline.html`](timeline.html): the vertical reading view.
- `data/`: shared records, relationships, stories, translations and image metadata.
- `images/`: WebP illustrations, with small versions in `thumb/`.
- [`README.md`](README.md): the Japanese guide.
- [`README.en.md`](README.en.md): this English guide.
- [`IMAGE-CREDITS.md`](IMAGE-CREDITS.md): the sources, creators, and licenses for the illustrations for 58 records, plus references for the postwar film section.
- [`CREDITS.md`](CREDITS.md): inspiration, reference materials, libraries, and fonts.
- [`LICENSE`](LICENSE): reserved-rights terms for new material, with exceptions for earlier releases and third-party material.
- [`LICENSE-DATA.md`](LICENSE-DATA.md): terms for new data, descriptions, and translations.
- [`licenses/`](licenses/): the earlier MIT and CC BY 4.0 notices.

## GitHub Pages

Live site: **[Japonisme: Before and After](https://lanni007.github.io/japonisme-universe/?lang=en)**

The site is published from the root of the `main` branch. After an update, allow GitHub Pages to finish deploying, then reload the page.

## Licenses

Rights are reserved in newly published project material. Viewing and sharing links are permitted; redistribution, adaptation, commercial reuse, and other reuse of the new material require prior written permission. Earlier MIT / CC BY 4.0 grants remain valid, including for those older parts included in later versions. See [LICENSE](LICENSE) and [LICENSE-DATA.md](LICENSE-DATA.md).

Third-party images, fonts, and libraries retain their individual licenses. No exclusive rights are claimed over historical facts, ideas, or public-domain material. See `IMAGE-CREDITS.md` and the image details for image attribution and reuse conditions.

The project was originally created with Claude, then refined through dialogue with Codex to improve its controls, display, and images.

## Reading the timeline

The main timeline contains all 217 records. Explicit chapter membership takes priority; a record present in multiple chapters appears in the first one. Other dated records are assigned by chapter start dates, so chapter ranges overlap. Undated shared-pattern records appear at the end. Choose among 11 stories, jump to related records using labeled connections, or open a record in 3D. A connection to a hidden record switches to the main timeline before jumping. Tap an illustration to see its source, creator, license and larger image.

Existing descriptions, translations and relationships are carried forward, with the scope and chapter-label revisions noted below. Both pages read the same data. Copy the whole folder when moving this edition; the previous single-file version is kept separately.

## Compare categories (prototype)

[timeline-lanes.html](timeline-lanes.html?lang=en) places dates vertically and roles horizontally. Its 193 dated records use six columns: external context, internal pressure, Japanese art, mediators and exhibitions, people, and styles and works. The last column, Changes in Japan, adds 15 notes drawn from existing descriptions. Later changes are labeled separately from their trigger year. Bigot and Loti are labeled Views from abroad; interpretive relationships and retrospective readings use dashed lines.

The 24 undated shared patterns are available through the toolbar and supplements on related records, including when date or region filters are active. Records from the same year share a row; year spacing is unequal. Select a record to highlight its connections or isolate its neighborhood. Filter by geographic region, date or story. Historical names and documented activity places use each record’s date. On phones, scroll within the chart or jump to a column. Original descriptions and shared data are preserved. The card view remains at timeline.html, and the previous public version is preserved in previous/.

## Editorial scope review

Chagall, García Núñez and the Buenos Aires architecture entry are excluded from current views pending evidence of their relationship to Japanese art. This is not proof that influence never existed. The previous edition is archived separately.

## This update

The regional universe and golden-rail journey now include both a category timeline and a card reading view. The chapter Artists make it their own includes painting, architecture and crafts. The previous public edition is preserved in previous/ and the tag before-regional-2026-10-02 (commit b7b5bdaa6322cf19c8c5814d65a6fa6d71371eec).
