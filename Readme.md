## Programming the Web — Final Project

A small static web project containing a single-page site built with HTML, CSS, and JavaScript. This repository includes the markup, styles, and client-side logic for the final project of the "Programming the Web" course.

### What this is

- Simple, self-contained front-end project.
- No build tools or dependencies required — just a browser.

### Files

- `index.html` — the main HTML page.
- `style.css` — project styles.
- `script.js` — client-side JavaScript (interaction and behavior).
- `Readme.md` — this file.

### How to run

1. Easiest (no tools needed): open `index.html` in your browser by double-clicking it or using your editor's "Open in Browser" feature.

2. Recommended for development (serves files via a local HTTP server):

	 - If you have Python installed, run this in PowerShell from the project folder:

		 ```powershell
		 python -m http.server 8000
		 ```

		 Then open http://localhost:8000 in your browser.

	 - Or use VS Code with the Live Server extension and click "Go Live".

### Usage

- The page is a static HTML UI backed by `script.js`. Edit the files directly to change content, styles, or behavior.
- For quick testing, use your browser DevTools (F12) to inspect and debug JavaScript and CSS.

### Development notes & tips

- Keep HTML semantic and add IDs or classes for elements that `script.js` manipulates.
- For larger changes, consider splitting JavaScript into modules and adding a simple build step later.

### Edge cases & testing

- Test in multiple browsers (Chrome, Firefox, Edge) to ensure consistent behavior.
- If your app fetches remote data (none by default), be mindful of CORS when using a local file — use an HTTP server to avoid issues.

