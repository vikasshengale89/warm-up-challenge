# Implementation Plan: warm-up-challenge

> Created: 2026-04-25
> Challenge: Intelligent Learning Assistant
> Time Budget: Hackathon

---

## 1. Overview

We are building an intelligent, adaptive learning assistant that breaks down complex topics into bite-sized, personalized modules. The app features a stunning Glassmorphism UI and a unique ambient idle mode.

## 2. Architecture

### System Diagram

```
[Angular 19 SPA] <--- REST API ---> [Node.js/Express Backend]
(Zoneless, Signals)                 (Stateless Learning Logic)
```

### Key Design Decisions

| Decision           | Choice           | Rationale                    |
|--------------------|------------------|------------------------------|
| Frontend Framework | Angular 19       | Modern features, signals, zoneless |
| Backend Framework  | Node.js/Express  | Fast, lightweight API layer |
| Database           | In-memory/Mocks  | Firebase Spark Plan constraint |
| Styling            | Vanilla CSS      | Full control over Glassmorphism UI |

## 3. Data Model

| Entity    | Fields                                      | Types                           |
|-----------|---------------------------------------------|---------------------------------|
| Concept   | id, title, description, difficulty          | string, string, string, string  |
| Module    | id, conceptId, content, quizQuestions       | string, string, string, array   |
| Question  | id, text, options, correctAnswerIndex       | string, string, array, number   |

## 4. API Endpoints

| Method | Path                        | Purpose                          | Auth Required |
|--------|-----------------------------|----------------------------------|---------------|
| POST   | /api/v1/concepts            | Generate learning modules        | No            |
| GET    | /api/v1/modules/:id         | Get specific module content      | No            |
| POST   | /api/v1/quiz/evaluate       | Evaluate quiz answers            | No            |

## 5. Files to Create/Modify

| File                                               | Action | Purpose                                   |
|----------------------------------------------------|--------|-------------------------------------------|
| frontend/src/styles.css                            | Modify | Global Glassmorphism tokens & meshes      |
| frontend/src/app/features/learning/learning.ts     | Create | Main learning dashboard component         |
| frontend/src/app/core/services/api.service.ts      | Create | API communication                         |
| backend/src/controllers/learning.controller.ts     | Create | Handles module generation logic           |
| backend/src/routes/learning.routes.ts              | Create | API routes for learning                   |

## 6. Dependencies

| Package         | Version | Purpose                       |
|-----------------|---------|-------------------------------|
| express         | ^4.18.2 | Backend web framework         |
| cors            | ^2.8.5  | Cross-origin resource sharing |

## 7. Build Order (Phased)

### Phase 1: Foundation (MVP)
1. Setup global CSS for Glassmorphism (mesh gradient background, frosted glass utilities).
2. Build Node.js health endpoint and API scaffolding.
3. Create simple Angular layout and API service to connect to backend.

### Phase 2: Core Features
1. Implement Backend `/api/v1/concepts` logic with mock data to generate modules.
2. Build Frontend Concept Input component.
3. Build Frontend Module Viewer and Quiz component.

### Phase 3: Polish & Quality
1. Implement accessibility (A11y) improvements (ARIA, contrast checks).
2. Refactor to ensure performance (lazy loading, caching).
3. Audit for linter errors and security best practices.

### Phase 4: WOW FACTOR
1. Implement Real-time ambient idle mode with CSS particle animations.
2. Add an event countdown when the user is inactive.
3. Integrate idle detection logic in the Angular app.

## 8. Security Considerations

- [x] No hardcoded secrets
- [x] Input validation on all endpoints
- [x] CORS configured
- [x] Safe HTML rendering in Angular

## 9. Testing Strategy

- [x] API endpoints tested via curl/jest
- [x] UI tested via browser preview
- [x] Edge cases identified and handled

## 10. Time Allocation

| Phase              | Estimated Time |
|--------------------|----------------|
| Planning           | 10m            |
| Backend Setup      | 15m            |
| Frontend Setup     | 25m            |
| Core Features      | 30m            |
| Polish & WOW       | 20m            |
| **Total**          | 100m           |
