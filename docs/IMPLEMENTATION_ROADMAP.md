# IMPLEMENTATION_ROADMAP.md

# Broadband Customer Monitoring System (BCMS)

## Implementation Roadmap

Version 1.0

---

# Development Principles

Setiap milestone harus memenuhi:

* Build berhasil.
* Lint berhasil.
* Unit test lulus.
* Docker dapat dijalankan.
* Tidak ada TypeScript error.
* Dokumentasi diperbarui.

Tidak boleh melanjutkan ke milestone berikutnya sebelum milestone saat ini selesai.

---

# Phase 1 — Project Foundation

Target: Menyiapkan fondasi proyek.

### Milestone 1 — Monorepo Setup

* Struktur folder backend/frontend.
* Konfigurasi TypeScript.
* ESLint.
* Prettier.
* PNPM Workspace.
* Git Ignore.
* README.

Deliverable

* Project dapat di-clone dan dijalankan.

---

### Milestone 2 — Docker Environment

* Docker Compose.
* PostgreSQL.
* Redis.
* Backend.
* Frontend.
* Nginx.

Deliverable

* `docker compose up` menjalankan seluruh service.

---

### Milestone 3 — Backend Bootstrap

* Fastify.
* Plugin.
* Config.
* Logger.
* Health Check.
* Error Handler.

Deliverable

* API `/health`.

---

### Milestone 4 — Database

* Drizzle ORM.
* Migration.
* Seeder.
* Repository Base.

Deliverable

* Database siap digunakan.

---

### Milestone 5 — Frontend Bootstrap

* React.
* Vite.
* Tailwind CSS.
* React Router.
* TanStack Query.
* Zustand.
* Layout dasar.

Deliverable

* Dashboard kosong dapat diakses.

---

# Phase 2 — Authentication & Authorization

Target: Sistem keamanan aplikasi.

### Milestone 6

Authentication

* Login.
* Refresh Token.
* Logout.

---

### Milestone 7

RBAC

* Roles.
* Permissions.
* Middleware.

---

### Milestone 8

User Management

* CRUD User.
* CRUD Role.
* CRUD Permission.
* Audit Login.

Deliverable

* Sistem autentikasi lengkap.

---

# Phase 3 — Core Master Data

Target: Data referensi utama.

### Milestone 9

OLT Module

* CRUD OLT.
* Credential.
* Connection Test.

---

### Milestone 10

Customer Module

* CRUD Customer.
* Search.
* Pagination.

---

### Milestone 11

ONU Module

* CRUD ONU.
* Status.
* Assignment.

Deliverable

* Master data siap.

---

# Phase 4 — Dashboard & Realtime

Target: Monitoring dasar.

### Milestone 12

Dashboard Summary

* Total Customer.
* Online.
* Offline.
* LOS.
* Dying Gasp.

---

### Milestone 13

Socket.IO

* Namespace.
* Authentication.
* Reconnect.
* Presence.

---

### Milestone 14

Realtime Dashboard

* Live Counter.
* Live Event.
* Auto Refresh.

Deliverable

* Dashboard realtime.

---

# Phase 5 — Workflow Engine

Target: Mesin orkestrasi.

### Milestone 15

Workflow Engine

* Registry.
* Runner.
* Context.
* State Machine.

---

### Milestone 16

BullMQ

* Queue.
* Worker.
* Retry.
* Dead Letter Queue.

---

### Milestone 17

Workflow Monitoring

* Progress.
* Logs.
* History.

Deliverable

* Workflow Engine siap digunakan.

---

# Phase 6 — GenieACS Integration

Target: Integrasi ACS.

### Milestone 18

GenieACS Client

* Authentication.
* HTTP Client.
* Retry.
* Timeout.

---

### Milestone 19

Device Discovery

* Sync Device.
* Refresh.
* Parameter Read.

---

### Milestone 20

Provision

* Push PPPoE.
* Push WiFi.
* Reboot.
* Factory Reset.

Deliverable

* Integrasi GenieACS selesai.

---

# Phase 7 — OLT Adapter

Target: Integrasi perangkat OLT.

### Milestone 21

OLT Base Adapter

* Interface.
* Factory.
* Transport.

---

### Milestone 22

Huawei Adapter

* Register ONU.
* Delete ONU.
* Read Optical.
* Alarm.

---

### Milestone 23

ZTE Adapter

* Register.
* Delete.
* Alarm.
* Optical.

---

### Milestone 24

Vendor Expansion

* Fiberhome.
* VSOL.
* Nokia (opsional).

Deliverable

* Multi-vendor OLT.

---

# Phase 8 — Provisioning Workflow

Target: Provisioning end-to-end.

### Milestone 25

Register ONU Workflow

* Register.
* Verify.
* Save DB.
* Event.

---

### Milestone 26

Replace ONU Workflow

* Backup.
* Replace.
* Restore.
* Rollback.

---

### Milestone 27

Push PPPoE Workflow

* Queue.
* Verify.
* History.

---

### Milestone 28

Push WiFi Workflow

* SSID.
* Password.
* Verification.

Deliverable

* Seluruh provisioning berjalan melalui Workflow Engine.

---

# Phase 9 — Monitoring & Alarm

Target: Monitoring operasional.

### Milestone 29

Alarm Engine

* LOS.
* Dying Gasp.
* ONU Offline.
* ONU Online.

---

### Milestone 30

Notification

* In-App.
* Telegram.
* Email (opsional).

---

### Milestone 31

Audit Log

* User Action.
* Workflow.
* Adapter.
* API.

Deliverable

* Sistem monitoring lengkap.

---

# Phase 10 — Production Ready

Target: Hardening aplikasi.

### Milestone 32

Performance

* Cache.
* Query Optimization.
* Lazy Loading.
* Compression.

---

### Milestone 33

Observability

* Prometheus.
* Grafana.
* Loki.
* Health Metrics.

---

### Milestone 34

Backup & Recovery

* Database Backup.
* Redis Persistence.
* Restore Procedure.

---

### Milestone 35

Production Release

* Security Review.
* Load Test.
* Smoke Test.
* Documentation Review.
* Final Deployment.

Deliverable

* BCMS siap digunakan di lingkungan produksi.

---

# Milestone Dependencies

```text id="roadmap-flow"
Phase 1
    ↓
Phase 2
    ↓
Phase 3
    ↓
Phase 4
    ↓
Phase 5
    ↓
Phase 6 + Phase 7
        ↓
Phase 8
        ↓
Phase 9
        ↓
Phase 10
```

Phase 6 (GenieACS) dan Phase 7 (OLT Adapter) dapat dikembangkan secara paralel setelah Workflow Engine tersedia.

---

# Acceptance Criteria

Setiap milestone harus memiliki:

* Source code.
* Unit test.
* Dokumentasi.
* API endpoint (jika ada).
* Migration (jika diperlukan).
* Docker support.
* Logging.
* Error handling.
* Permission check.

---

# Git Branch Strategy

* `main` → Production.
* `develop` → Integration.
* `feature/<feature-name>` → Pengembangan fitur.
* `release/<version>` → Persiapan rilis.
* `hotfix/<issue>` → Perbaikan produksi.

Gunakan **Conventional Commits** untuk seluruh perubahan.

---

# Release Strategy

Versi disarankan menggunakan Semantic Versioning:

* `v0.x.x` → Development.
* `v1.0.0` → Production pertama.
* `v1.x.x` → Penambahan fitur kompatibel.
* `v2.0.0` → Perubahan besar yang tidak kompatibel.

---

# Quality Gates

Sebelum berpindah fase:

* Semua test lulus.
* Tidak ada error lint.
* Tidak ada TypeScript error.
* Dokumentasi sinkron.
* Tidak ada dependency yang tidak digunakan.
* Tidak ada TODO kritis yang tertunda.

---

# Future Roadmap (Post v1.0)

Setelah rilis pertama, pengembangan dapat dilanjutkan dengan:

* Integrasi FreeRADIUS.
* Integrasi MikroTik.
* Billing System.
* Payment Gateway.
* WhatsApp Gateway.
* Mobile App (Android/iOS).
* Fiber Inventory & GIS.
* Trouble Ticket System.
* SLA Monitoring.
* AI Assistant untuk NOC.
* Multi-tenant ISP.
* High Availability (HA) Deployment.

---

# Definition of Success

BCMS dianggap berhasil apabila:

* Mampu memonitor status pelanggan secara realtime.
* Mendukung provisioning multi-vendor OLT melalui Adapter.
* Mengelola konfigurasi ONU melalui GenieACS.
* Menjalankan workflow yang dapat dipantau, diulang, dan di-*rollback*.
* Memberikan pengalaman pengguna yang cepat, konsisten, dan aman.
* Mudah dipelihara serta mudah dikembangkan untuk kebutuhan ISP di masa depan.
