# 00 - Project Setup

**Phase:** Foundation

**Status:** COMPLETED

**Priority:** Critical

---

# Objective

Membangun fondasi proyek BCMS agar seluruh developer dan AI coding agent bekerja pada struktur, tooling, dan standar yang sama.

Setelah fase ini selesai, project harus dapat dijalankan menggunakan Docker dan siap untuk implementasi fitur berikutnya.

---

# Prerequisites

Tidak ada.

Ini adalah fase pertama.

---

# Epic 1 — Repository

## Task 1.1

* [x] Create Git Repository

Acceptance Criteria

* Repository berhasil dibuat
* Branch `main` tersedia

---

## Task 1.2

* [x] Create PNPM Workspace

Acceptance Criteria

* Workspace aktif
* Backend dapat dikenali
* Frontend dapat dikenali
* Worker dapat dikenali
* Shared packages dapat dikenali

---

## Task 1.3

* [x] Create Monorepo Structure

Acceptance Criteria

Folder berikut tersedia:

```text
apps/
packages/
docs/
docker/
scripts/
.github/
tasks/
```

---

## Task 1.4

* [x] Configure .gitignore

Acceptance Criteria

Minimal mengabaikan:

```text
node_modules
dist
coverage
.env
*.log
```

---

## Task 1.5

* [x] Create README.md

Acceptance Criteria

README berisi:

* Project Overview
* Stack
* Installation
* Development
* Docker
* License

---

# Epic 2 — Backend Bootstrap

## Task 2.1

* [x] Create Fastify Project

Acceptance Criteria

Backend berhasil dijalankan.

---

## Task 2.2

* [x] Configure TypeScript

Acceptance Criteria

* strict mode
* path alias
* build berhasil

---

## Task 2.3

* [x] Configure ESLint

Acceptance Criteria

Tidak ada lint error.

---

## Task 2.4

* [x] Configure Prettier

Acceptance Criteria

Seluruh source mengikuti format yang sama.

---

## Task 2.5

* [x] Configure Pino Logger

Acceptance Criteria

Logger dapat digunakan secara global.

---

## Task 2.6

* [x] Configure Environment Loader

Acceptance Criteria

`.env` berhasil dibaca.

---

## Task 2.7

* [x] Create Health Endpoint

Acceptance Criteria

```http
GET /health
```

mengembalikan HTTP 200.

---

## Task 2.8

* [x] Configure Global Error Handler

Acceptance Criteria

Semua error menggunakan format API yang telah ditentukan.

---

# Epic 3 — Frontend Bootstrap

## Task 3.1

* [x] Create React Project

Acceptance Criteria

React berhasil dijalankan.

---

## Task 3.2

* [x] Install Tailwind CSS

Acceptance Criteria

Tailwind dapat digunakan.

---

## Task 3.3

* [x] Configure React Router

Acceptance Criteria

Routing dasar tersedia.

---

## Task 3.4

* [x] Configure TanStack Query

Acceptance Criteria

Provider aktif.

---

## Task 3.5

* [x] Configure Zustand

Acceptance Criteria

Store dasar tersedia.

---

## Task 3.6

* [x] Create Base Layout

Acceptance Criteria

Layout terdiri dari:

* Sidebar
* Header
* Content
* Footer

---

## Task 3.7

* [x] Configure Theme

Acceptance Criteria

* Light Mode
* Dark Mode

---

# Epic 4 — Shared Packages

## Task 4.1

* [x] Create shared-types package

Acceptance Criteria

Package dapat di-import oleh backend, frontend, dan worker.

---

## Task 4.2

* [x] Create shared-utils package

Acceptance Criteria

Utility dapat digunakan bersama.

---

## Task 4.3

* [x] Create socket-contracts package

Acceptance Criteria

Seluruh event Socket.IO menggunakan contract yang sama.

---

# Epic 5 — Worker

## Task 5.1

* [x] Create Worker Project

Acceptance Criteria

Worker dapat dijalankan.

---

## Task 5.2

* [x] Configure BullMQ

Acceptance Criteria

Worker berhasil terhubung ke Redis.

---

## Task 5.3

* [x] Create Queue Base

Acceptance Criteria

Queue berhasil dibuat.

---

# Epic 6 — Docker

## Task 6.1

* [x] Create Dockerfile Backend

Acceptance Criteria

Backend dapat dibuild.

---

## Task 6.2

* [x] Create Dockerfile Frontend

Acceptance Criteria

Frontend dapat dibuild.

---

## Task 6.3

* [x] Create Dockerfile Worker

Acceptance Criteria

Worker dapat dibuild.

---

## Task 6.4

* [x] Configure PostgreSQL Container

Acceptance Criteria

Database berjalan.

---

## Task 6.5

* [x] Configure Redis Container

Acceptance Criteria

Redis berjalan.

---

## Task 6.6

* [x] Configure Nginx

Acceptance Criteria

Frontend dan backend dapat diakses melalui Nginx.

---

## Task 6.7

* [x] Create docker-compose.yml

Acceptance Criteria

Seluruh service dapat dijalankan dengan:

```bash
docker compose up
```

---

# Epic 7 — CI/CD

## Task 7.1

* [x] Configure GitHub Actions

Acceptance Criteria

Workflow berjalan otomatis.

---

## Task 7.2

* [x] Build Backend

Acceptance Criteria

Build berhasil.

---

## Task 7.3

* [x] Build Frontend

Acceptance Criteria

Build berhasil.

---

## Task 7.4

* [x] Lint

Acceptance Criteria

Lint berhasil.

---

## Task 7.5

* [x] Type Check

Acceptance Criteria

Tidak ada TypeScript error.

---

# Epic 8 — Documentation

## Task 8.1

* [x] Copy all documents to folder docs

Acceptance Criteria

Semua dokumen tersedia.

---

## Task 8.2

* [x] Verify seluruh link antar dokumen

Acceptance Criteria

Tidak ada referensi yang rusak.

---

## Task 8.3

* [x] Create CHANGELOG.md

Acceptance Criteria

Changelog menggunakan format Keep a Changelog.

---

# Final Acceptance Criteria

Fase Project Setup dianggap selesai apabila:

* [x] Monorepo selesai.
* [x] Backend dapat dijalankan.
* [x] Frontend dapat dijalankan.
* [x] Worker dapat dijalankan.
* [x] PostgreSQL aktif.
* [x] Redis aktif.
* [x] Docker Compose berjalan.
* [x] Health endpoint aktif.
* [x] CI/CD berjalan.
* [x] Lint bersih.
* [x] TypeScript tanpa error.
* [x] Dokumentasi lengkap.

---
  
## Current Status (as of build completion)

- **Monorepo**: Successfully initialized with proper structure (`apps/`, `packages/`, `docker/`).
- **Backend Service**: Can be built and runs on port 3000. Health endpoint `/api/health` functional.
- **Frontend Service**: Builds successfully with Vite and runs on port 8080 via Nginx.
- **Worker Service**: Built and runs via BullMQ with Redis connection.
- **Database Services**: PostgreSQL and Redis containers active and running.
- **Docker Compose**: All services (backend, frontend, worker, db, redis, nginx) successfully orchestrated.
- **Health Endpoint**: `/health` endpoint accessible and returns 200 OK from within container.
- **TypeScript**: No compilation errors across all packages.
- **Linting**: All linting rules pass with no errors.
- **CI/CD**: GitHub Actions workflow configured and commits detected.
- **Documentation**: All project documentation is current and up-to-date.

> **Project Setup Phase Completed Successfully**
> 
> All acceptance criteria have been met. The infrastructure is production-ready and foundation is established for Phase 2 implementation (**01-backend.md**).

---

# Deliverables

* Monorepo siap digunakan.
* Docker environment siap.
* Backend bootstrap selesai.
* Frontend bootstrap selesai.
* Worker bootstrap selesai.
* Shared packages siap.
* CI/CD dasar tersedia.
* Seluruh fondasi proyek siap untuk memasuki fase berikutnya (**01-backend.md**).
