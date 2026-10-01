# Japonisme: Before and After

[日本語](README.md)

**▶ [Explore the visualization](https://lanni007.github.io/japonisme-universe/)**

An interactive 3D network tracing how Japanese art and culture traveled overseas, influenced artists around the world, and returned to Japan in new forms. It connects early cultural exchanges and trade through Dejima with Impressionism, Art Nouveau, and postwar film and animation.

Open `index.html` in a browser to use the visualization. All 49 images are embedded in the HTML, and each illustrated item includes its image source, creator, and license. An internet connection is needed to load Three.js and the fonts.

The interface and the descriptions inside the visualization are currently in Japanese. The guide below includes the Japanese button labels so you can find each control.

## How to explore

- Switch between **宇宙** (Space), **年表** (Timeline), and **地図** (Map) to change the layout.
- Select **物語で見る** (Explore a story) to follow connected events in sequence.
- Select **金の幹に乗る** (Ride the golden rail) to travel through time along the yellow rail. Nine red torii gates mark the transitions between chapters.
- The current year appears in large text at the top right. During the ride, nodes and images associated with the current century appear along the route.
- Adjust the playback speed from **0.25× to 3.00×** with the speed slider. Adjust image size from **25% to 200%** with the image slider; images also fit automatically within the screen.
- Select an image or a node to read its description, explore its connections, and check the image creator, license, and original source.
- On a computer, drag to pan, right-drag to rotate, and use the mouse wheel to zoom. On a touch screen, drag with one finger to pan and use two fingers to zoom and rotate.

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

- [`index.html`](index.html): the interactive visualization, provided as a static HTML file with no build step.
- [`README.md`](README.md): the Japanese guide.
- [`README.en.md`](README.en.md): this English guide.
- [`IMAGE-CREDITS.md`](IMAGE-CREDITS.md): the sources, creators, and licenses for all 49 images, plus references for the postwar film section.
- [`CREDITS.md`](CREDITS.md): inspiration, reference materials, libraries, and fonts.
- [`LICENSE`](LICENSE): the MIT License for the code.
- [`LICENSE-DATA.md`](LICENSE-DATA.md): the CC BY 4.0 license for the data and descriptive text.

## GitHub Pages

Live site: **[Japonisme: Before and After](https://lanni007.github.io/japonisme-universe/)**

The site is published from the root of the `main` branch. After an update, allow GitHub Pages to finish deploying, then reload the page.

## Licenses

The code is licensed under the MIT License. The project's data and descriptive text are licensed under CC BY 4.0. External images, fonts, and libraries retain their individual licenses. See `IMAGE-CREDITS.md` and the image details inside the visualization for image attribution and reuse conditions.

The project was originally created with Claude, then refined through dialogue with Codex to improve its controls, display, and images.
