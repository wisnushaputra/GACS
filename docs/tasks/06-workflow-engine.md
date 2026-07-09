# 06 - Workflow Engine

**Phase:** Workflow Orchestration

**Status:** NOT STARTED

**Priority:** Critical

**Dependencies:**

* ✅ 00-project-setup.md
* ✅ 01-authentication.md
* ✅ 02-master-data.md
* ✅ 03-operational-data.md
* ✅ 04-dashboard.md
* ✅ 05-realtime.md

---

# Objective

Membangun Workflow Engine sebagai pusat orkestrasi seluruh proses bisnis BCMS.

Workflow Engine bertanggung jawab menjalankan proses multi-step, mengelola status, retry, rollback, progress, logging, audit, dan realtime event.

---

# Scope

* Workflow Engine
* Workflow Registry
* Workflow Factory
* Workflow Context
* Workflow Runner
* Workflow State Machine
* BullMQ Integration
* Retry Policy
* Rollback Engine
* Compensation Action
* Progress Tracking

---

# Epic 1 — Workflow Core

## Task 1.1

* [ ] Create Workflow Engine

---

## Task 1.2

* [ ] Create Workflow Registry

---

## Task 1.3

* [ ] Create Workflow Factory

---

## Task 1.4

* [ ] Create Workflow Context

---

## Task 1.5

* [ ] Create Workflow Runner

Acceptance Criteria

Workflow dapat dijalankan melalui registry.

---

# Epic 2 — Workflow State Machine

## Task 2.1

* [ ] Workflow Status Enum

Status

* Created
* Queued
* Running
* Waiting
* Completed
* Failed
* Retry
* Rollback
* Cancelled

---

## Task 2.2

* [ ] State Transition Validation

---

## Task 2.3

* [ ] Invalid Transition Protection

Acceptance Criteria

Status tidak dapat berubah secara tidak valid.

---

# Epic 3 — Workflow Step

## Task 3.1

* [ ] Base Workflow Step Interface

---

## Task 3.2

* [ ] Execute Step

---

## Task 3.3

* [ ] Rollback Step

---

## Task 3.4

* [ ] Timeout Handler

---

## Task 3.5

* [ ] Step Logging

Acceptance Criteria

Setiap step memiliki durasi dan status.

---

# Epic 4 — Queue Integration

## Task 4.1

* [ ] BullMQ Queue

---

## Task 4.2

* [ ] Queue Worker

---

## Task 4.3

* [ ] Queue Processor

---

## Task 4.4

* [ ] Dead Letter Queue

---

## Task 4.5

* [ ] Delayed Job

---

## Task 4.6

* [ ] Priority Queue

Acceptance Criteria

Workflow dijalankan melalui queue.

---

# Epic 5 — Retry Policy

## Task 5.1

* [ ] Retry Strategy

---

## Task 5.2

* [ ] Exponential Backoff

---

## Task 5.3

* [ ] Retry Counter

---

## Task 5.4

* [ ] Retry Logging

Acceptance Criteria

Retry hanya dilakukan untuk error yang bersifat sementara.

---

# Epic 6 — Rollback Engine

## Task 6.1

* [ ] Rollback Manager

---

## Task 6.2

* [ ] Compensation Action

---

## Task 6.3

* [ ] Rollback Event

---

## Task 6.4

* [ ] Rollback History

Acceptance Criteria

Workflow dapat dipulihkan jika terjadi kegagalan.

---

# Epic 7 — Progress Tracking

## Task 7.1

* [ ] Progress Calculator

---

## Task 7.2

* [ ] Step Duration

---

## Task 7.3

* [ ] Estimated Completion

---

## Task 7.4

* [ ] Live Progress Event

Acceptance Criteria

Frontend dapat menampilkan progress secara realtime.

---

# Epic 8 — Workflow Types

## Task 8.1

* [ ] Register ONU Workflow

---

## Task 8.2

* [ ] Replace ONU Workflow

---

## Task 8.3

* [ ] Push PPPoE Workflow

---

## Task 8.4

* [ ] Push WiFi Workflow

---

## Task 8.5

* [ ] Reboot ONU Workflow

---

## Task 8.6

* [ ] Factory Reset Workflow

---

## Task 8.7

* [ ] Refresh Parameter Workflow

Acceptance Criteria

Semua workflow terdaftar di Workflow Registry.

---

# Epic 9 — Workflow Monitoring

## Task 9.1

* [ ] Workflow History API

---

## Task 9.2

* [ ] Workflow Detail API

---

## Task 9.3

* [ ] Workflow Search

---

## Task 9.4

* [ ] Workflow Statistics

---

## Task 9.5

* [ ] Workflow Timeline

---

# Epic 10 — Event Integration

## Task 10.1

* [ ] Publish workflow:created

---

## Task 10.2

* [ ] Publish workflow:started

---

## Task 10.3

* [ ] Publish workflow:progress

---

## Task 10.4

* [ ] Publish workflow:completed

---

## Task 10.5

* [ ] Publish workflow:failed

---

## Task 10.6

* [ ] Publish workflow:rollback

Acceptance Criteria

Seluruh event mengikuti `SOCKET_EVENTS.md`.

---

# Epic 11 — Frontend

## Task 11.1

* [ ] Workflow History Page

---

## Task 11.2

* [ ] Workflow Detail Page

---

## Task 11.3

* [ ] Workflow Progress Component

---

## Task 11.4

* [ ] Workflow Timeline

---

## Task 11.5

* [ ] Retry Workflow Action

---

## Task 11.6

* [ ] Cancel Workflow Action

---

# Epic 12 — Security

## Task 12.1

* [ ] Workflow Permission

---

## Task 12.2

* [ ] Workflow Audit

---

## Task 12.3

* [ ] Correlation ID

Acceptance Criteria

Seluruh workflow memiliki Correlation ID untuk tracing.

---

# Epic 13 — Testing

Backend

* [ ] Workflow Engine Test
* [ ] State Machine Test
* [ ] Retry Test
* [ ] Rollback Test
* [ ] Queue Test
* [ ] Registry Test

Frontend

* [ ] Workflow History Test
* [ ] Progress Component Test

---

# Deliverables

Setelah fase ini selesai:

* Workflow Engine aktif.
* Workflow berjalan melalui BullMQ.
* Retry dan rollback berfungsi.
* Progress dapat dipantau secara realtime.
* Seluruh workflow tercatat dalam histori.
* Event workflow dipublikasikan melalui Socket.IO.

---

# Acceptance Criteria

* [ ] Workflow Engine dapat menjalankan workflow.
* [ ] Workflow Registry aktif.
* [ ] State Machine tervalidasi.
* [ ] Queue berjalan normal.
* [ ] Retry policy aktif.
* [ ] Rollback engine aktif.
* [ ] Progress realtime tersedia.
* [ ] Workflow history dapat diakses.
* [ ] Workflow timeline tersedia.
* [ ] Unit dan integration test lulus.
* [ ] Dokumentasi diperbarui.

---

# Notes

* Semua operasi provisioning harus dipicu melalui Workflow Engine, bukan langsung dari controller.
* Workflow harus bersifat idempotent.
* Gunakan Saga Pattern untuk proses multi-step yang melibatkan OLT, GenieACS, dan database.
* Pisahkan logika bisnis (Service) dari langkah eksekusi (Workflow Step).
* Pastikan setiap step memiliki mekanisme timeout, retry, dan rollback jika memungkinkan.
* Seluruh implementasi harus mengikuti `WORKFLOW_ENGINE.md`, `ADAPTER_ARCHITECTURE.md`, `SOCKET_EVENTS.md`, dan `VENDOR_MAPPING.md`.
