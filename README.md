# Warm-Up Challenge

> Your Intelligent Learning Assistant

## Problem Statement
Learning complex topics can be overwhelming and unguided. We built an intelligent assistant that adapts to your pace, breaking down concepts into bite-sized, interactive modules to ensure high retention and focused learning.

## Features
- **Adaptive Pacing**: Generates custom learning paths based on difficulty.
- **Interactive Quizzes**: Knowledge checks ensure understanding before moving on.
- **Glassmorphism UI**: Beautiful, premium, and highly responsive user interface.
- **WOW FACTOR**: Ambient Idle Mode with CSS particle animations for deep focus.

## Tech Stack
| Layer | Technology | Why |
|---|---|---|
| Frontend | Angular 19 | Modern, Signals, Zoneless, High Performance |
| Backend | Node.js / Express | Fast, scalable API layer |
| Hosting | Firebase Spark | Free, reliable global CDN |

## Architecture
```
[User Browser] --(HTTP/REST)--> [Angular 19 SPA] --(HTTP)--> [Node.js Express API]
```

## Quick Start
```bash
git clone git@github.com:vikasshengale89/warm-up-challenge.git
cd warm-up-challenge/backend
npm install && npm run build
cd ../frontend
npm install && npm start
```

## Security & Performance
- No hardcoded secrets.
- XSS prevention and CORS configured.
- Fully accessible UI (WCAG 2.1 AA).
- Lazy loading for fast <2s Time to Interactive.

## Future Roadmap
- Integration with LLMs (e.g., Gemini) for dynamic content generation.
- Spaced repetition algorithm.
- Social sharing and progress export.

---
*Built for Google Antigravity PromptWars Competition*
