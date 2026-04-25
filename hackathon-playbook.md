# Hackathon Playbook — warm-up-challenge

> **Auto-generated on 2026-04-25 by hackathon-go.sh**
> Angular 19 + Node.js + Firebase Hosting (Spark Plan)

---

## Challenge Description

Create an intelligent assistant that helps users learn new concepts effectively. The system should personalize content and adapt to user pace and understanding.

---

## Firebase Spark Plan Constraints

| Resource | Spark Limit |
|----------|-------------|
| Hosting Storage | 10 GB |
| Data Transfer | 360 MB/day |
| Cloud Functions | **NOT available** |
| Firestore | 1 GB storage, 50K reads/day |
| Authentication | 10K MAU |

---

## GitHub Deploy Key Setup

Your SSH deploy key has been generated. To push code to GitHub:

1. Create a repo on GitHub: `warm-up-challenge`
2. Go to repo **Settings → Deploy keys → Add deploy key**
3. Paste this public key:

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIFYEzROAV2h0iBZU0Ka6VQgR3q0JeI7NOG/WLjRSD8Z3 deploy@warm-up-challenge
```

4. Check **"Allow write access"**
5. Then push:

```bash
cd projects/warm-up-challenge
git init && git branch -M main
eval "$(ssh-agent -s)" && ssh-add .deploy_key
git remote add origin git@github.com:vikasshengale89/warm-up-challenge.git
git add . && git commit -m "feat: initial commit"
git push -u origin main
```

---

## Execution Steps

| # | Step | Status |
|---|------|--------|
| 1 | Project initialized | Done |
| 2 | SSH deploy key generated | Done |
| 3 | AGENTS.md created | Done |
| 4 | Folder structure created | Pending |
| 5 | Requirements & plan generated | Pending |
| 6 | Phase 1 (MVP) built | Pending |
| 7 | Phase 2 (Features) built | Pending |
| 8 | Phase 3 (Polish + Wow Factor) built | Pending |
| 9 | Tests passed & issues fixed | Pending |
| 10 | Flow document generated | Pending |
| 11 | Firebase configured | Pending |
| 12 | Pushed to GitHub | Pending |
| 13 | Deployed to Firebase | Pending |
| 14 | Presentation README generated | Pending |
| 15 | LinkedIn post generated | Pending |

---

## Quick Commands

```bash
# Frontend dev server
cd projects/warm-up-challenge/frontend && ng serve --proxy-config proxy.conf.json

# Backend dev server
cd projects/warm-up-challenge/backend && npm run dev

# Production build
cd projects/warm-up-challenge/frontend && ng build --configuration=production
cd projects/warm-up-challenge/backend && npm run build

# Firebase deploy
cd projects/warm-up-challenge && firebase deploy --only hosting

# Tests
cd projects/warm-up-challenge/frontend && ng test --watch=false
cd projects/warm-up-challenge/backend && npm test

# GitHub push (with deploy key)
cd projects/warm-up-challenge
eval "$(ssh-agent -s)" && ssh-add .deploy_key
git add . && git commit -m "update" && git push
```
