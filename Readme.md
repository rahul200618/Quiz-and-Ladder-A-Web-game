A small static web project containing a single-page site built with HTML, CSS, and JavaScript. This repository includes the markup, styles, and client-side logic for the final project of the "Programming the Web" course.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE) [![Live demo](https://img.shields.io/badge/Live-Demo-blue?logo=github)](https://rahul200618.github.io/Quiz-and-Ladder-A-Web-game/)

# Quiz-and-Ladder-A-Web-game

A fun and interactive Snakes & Ladders style game with a quiz twist. Players roll a dice and move along a 1–100 board; landing on a ladder or snake triggers a quiz question. Correct answers help you climb or avoid sliding — combining learning with play.

Live demo: https://rahul200618.github.io/Quiz-and-Ladder-A-Web-game/
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

---

## About this game

Quiz & Ladder is a two-player web implementation of the classic Snakes & Ladders board with a quiz twist.

- Players take turns to roll a six-sided dice and move their marker across the 1–100 board.
- Landing on a ladder or a snake triggers a multiple-choice quiz question.
	- Ladder: answer correctly to climb to the ladder's top; a wrong answer leaves you on the ladder's base.
	- Snake: answer correctly to avoid sliding down; a wrong answer sends you down the snake.
- First player to reach square 100 wins.

This behavior is implemented in `script.js` and uses live question data from the Open Trivia Database (OpenTDB).

### Screenshot

![Game board screenshot](./board.jpg)

### How to play (rules)

1. Click the "Roll" button to roll the dice. The game uses a random number generator to produce values 1–6.
2. Your marker moves forward by the number rolled. If the move would pass 100, the marker bounces back from 100 (e.g., 99 + 4 -> 97).
3. If you land on a ladder or snake, a quiz modal appears with a multiple-choice question.
	 - For ladders: a correct answer moves you up to the ladder's destination; a wrong answer keeps you where you landed.
	 - For snakes: a correct answer keeps you in place; a wrong answer moves you down to the snake's tail.
4. Players alternate turns. The first to land exactly on square 100 wins.

### Controls

- Roll: Click the "Roll" button (or tap on mobile) to roll the dice.
- Reset: Click the "Reset" button to restart the game.
- Answering: Click one of the four choices in the quiz modal to submit your answer.

### Online requirements

- The game fetches quiz questions from OpenTDB (https://opentdb.com/) and uses random.org for dice values. Both require an internet connection. If either service is unavailable, the game shows an error message when rolling.

### Files

- `index.html` — main page and DOM for the board and UI.
- `style.css` — styles for the board, modal, and layout.
- `script.js` — game logic (dice, movement, quiz, snakes/ladders mapping).
- `LICENSE` — MIT license.
- `board.jpg`, `player1.svg`, `player2.svg`, etc. — game assets and images.

### Development & customization

- Questions: `script.js` requests 5 questions at a time from OpenTDB. You can change the `amount` parameter or replace the endpoint with your own question source.
- Dice: the code uses random.org for true randomness; to use a local PRNG instead, replace the fetch in `roll()` with `Math.floor(Math.random() * 6) + 1`.
- Line endings: this project runs on Windows and you may see LF↔CRLF warnings from Git; adding a `.gitattributes` can enforce normalization.

### Run locally

1. Clone the repo or download the files.
2. Serve the folder via a simple HTTP server (recommended) or open `index.html` directly in your browser. Example using Python from the project folder:

```powershell
python -m http.server 8000

# then open http://localhost:8000
```

### Contributing

- Bug reports, fixes, and improvements are welcome. Please open an issue or a pull request.

---

If you'd like, I can also:

- Add an embedded screenshot resize and caption to the README.
- Add a license badge image that links to GitHub's license detection (instead of the local `LICENSE`).
- Commit and push this README update for you (I'll do that next if you'd like). 


