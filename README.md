# Part 12 — Containers

Exercises for [Full Stack Open](https://fullstackopen.com) part 12
(CSM141084): packaging and orchestrating apps with Docker.

## Contents

| Path | Topic |
| --- | --- |
| `todo-app/` | the todo app split into `todo-backend/` (Express + Mongo + Redis) and `todo-frontend/` (Vite), each with dev and prod Dockerfiles, nginx reverse proxy and dev/prod compose files |
| `todo-tests/` | Playwright e2e suite for the containerized app |
| `answers/` | written answers to the part 12 exercises |

## Run

```bash
cd todo-app
docker compose -f docker-compose.dev.yml up --build   # dev: hot reload, Mongo + Redis
docker compose up --build                             # prod-style: nginx on http://localhost:8080
```

## Test

```bash
cd todo-tests && npm install && npm run test:e2e   # expects the app on http://localhost:8080
```

## Test in CI

`.github/workflows/e2e-tests.yml` builds both images, starts the
compose stack, waits for nginx, and runs the Playwright suite on every
push and pull request. This directory is self-contained — copy its
contents into a new repository and CI works without any extra setup.
