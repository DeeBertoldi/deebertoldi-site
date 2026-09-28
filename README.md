# Dee Bertoldi — Sound, Systems, Performance

Personal site for Dee Bertoldi: music producer, composer and live electronic artist based in Miami.

**Live:** https://deebertoldi.netlify.app

## Pages
- `index.html` — home: hero, links to each area, about, contact
- `producer.html` — production work for artists
- `live.html` — live hypnotic techno sets and Mascarados
- `systems.html` — Database of Dreams, data sonification, live performance systems, concepts in research
- `film.html` — film and commercial work, clients, credits, link to Sounds For Visuals

## Built with
- HTML, CSS and vanilla JavaScript, no framework or build step
- `styles.css` shared by every page, `main.js` for the waveform, mobile menu and video previews
- YouTube hover previews: 15-second muted loop on hover, full video on click
- Structured data (schema.org Person), sitemap and robots.txt for search and AI discovery
- Deployed on Netlify from the `main` branch

## Adding a video preview
Find the video box in the page and fill in two attributes:

```html
<div class="video" data-yt="VIDEO_ID" data-start="760" data-title="Live at [venue]"></div>
```

- `data-yt` is the part after `watch?v=` in the YouTube link
- `data-start` is where the preview begins, in seconds (12:40 = 12 × 60 + 40 = 760)

## Run locally
Open `index.html` in a browser.

© 2026 Dee Bertoldi
