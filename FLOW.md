# FLOW

## Architecture Diagram
```
[User Browser] --(HTTP/REST)--> [Angular 19 SPA] --(HTTP)--> [Node.js Express API]
```

## Startup Sequence
1. Angular starts (Zoneless, standalone)
2. Loads app.routes.ts, lazy loads LearningComponent.

## Application State Flow
User inputs topic -> Angular Signal updates -> POST /api/v1/concepts -> Express parses -> Mock logic generates -> Returns JSON -> Angular Signal sets modules -> UI updates.

## API Contract Table
| Method | Path | Request | Response |
|---|---|---|---|
| POST | /api/v1/concepts | { topic, difficulty } | { modules: [...] } |
| GET | /api/v1/modules/:id | N/A | { title, content, quizQuestions } |
| POST | /api/v1/quiz/evaluate | { moduleId, answers } | { passed, score, total } |
