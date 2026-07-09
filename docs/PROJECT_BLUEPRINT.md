# PROJECT_BLUEPRINT.md

# Broadband Customer Monitoring System (BCMS)

## Master Project Blueprint

Version 1.0

---

# Vision

BCMS adalah OSS (Operation Support System) untuk ISP berbasis FTTH yang mengintegrasikan monitoring OLT, ONU, dan GenieACS ke dalam satu dashboard realtime.

Tujuan utama:

* Monitoring realtime status pelanggan.
* Provisioning ONU.
* Replace ONU.
* Push PPPoE.
* Push WiFi.
* Monitoring LOS & Dying Gasp.
* Dashboard NOC.
* Audit seluruh aktivitas.
* Mendukung multi vendor OLT.

---

# Technology Stack

## Backend

* Node.js 22 LTS
* Fastify
* TypeScript
* Drizzle ORM
* PostgreSQL
* Redis
* BullMQ
* Socket.IO
* Zod
* Pino Logger

---

## Frontend

* React
* Vite
* TypeScript
* TailwindCSS
* TanStack Query
* Zustand
* React Router
* Socket.IO Client
* Recharts

---

## Infrastructure

* Docker
* Docker Compose
* Nginx
* PostgreSQL
* Redis

Future

* Prometheus
* Grafana
* Loki

---

# Core Architecture

```text
                       React UI
                          │
                   REST / Socket.IO
                          │
                    Fastify Backend
                          │
                  Business Service
                          │
                  Workflow Engine
                          │
             ┌────────────┼────────────┐
             ▼            ▼            ▼
      OLT Adapter   GenieACS Adapter   Notification Adapter
             │            │
             ▼            ▼
        Huawei/ZTE     GenieACS
```

---

# Request Flow

```text
React

↓

API Service

↓

Fastify Controller

↓

Business Service

↓

Workflow Engine

↓

Adapter

↓

External System
```

---

# Event Flow

```text
OLT

↓

OLT Adapter

↓

Workflow Engine

↓

Event Bus

↓

Redis

↓

Socket Gateway

↓

Frontend
```

---

# Folder Structure

```text
backend/

src/

app.ts

server.ts

config/

db/

plugins/

middleware/

shared/

socket/

workflow/

modules/

adapter/

worker/

frontend/

src/

components/

pages/

layouts/

hooks/

stores/

services/

routes/

utils/

types/
```

---

# Backend Modules

Core

* auth
* users
* roles
* permissions

Monitoring

* dashboard
* monitoring
* events
* alarms

Customer

* customers
* onus
* olts

Provision

* provision
* replace
* pppoe
* wifi

Infrastructure

* workflow
* socket
* notification
* adapter

---

# Adapter Modules

```text
adapter/

olt/

genieacs/

notification/

storage/

billing/

radius/

mikrotik/

snmp/
```

Semua adapter menggunakan interface.

---

# Worker Modules

Worker bertanggung jawab menjalankan task asynchronous.

Queue

* Register ONU
* Replace ONU
* Push PPPoE
* Push WiFi
* Refresh Device
* Backup Config
* Restore Config
* Notification

---

# Event Bus

Semua event berasal dari Event Bus.

Tidak boleh publish langsung ke Socket.IO.

Flow

```text
Business Service

↓

Event Bus

↓

Redis

↓

Socket Gateway
```

---

# Database

PostgreSQL digunakan untuk:

* Master Data
* Customer
* User
* OLT
* ONU
* Audit
* Event History
* Task History

Redis digunakan untuk:

* Cache
* Queue
* Socket
* Presence
* Dashboard Summary

---

# GenieACS Responsibilities

* Read Device
* Read Parameter
* Push PPPoE
* Push WiFi
* Refresh
* Reboot
* Factory Reset
* Device Discovery

Tidak menangani registrasi ONU di OLT.

---

# OLT Adapter Responsibilities

* Register ONU
* Delete ONU
* Replace ONU
* Assign Profile
* Assign VLAN
* Read Optical Power
* Read Alarm
* Read LOS
* Read Dying Gasp
* Reboot ONU dari OLT

---

# Workflow Engine

Workflow wajib digunakan untuk operasi kompleks.

Workflow

* Register ONU
* Replace ONU
* Customer Activation
* Customer Suspension
* Provision
* Rollback

Setiap workflow terdiri dari langkah-langkah yang dapat dipantau dan diulang jika diperlukan.

---

# Realtime

Socket.IO Namespace

* /dashboard
* /device
* /events
* /tasks
* /notification
* /system

Semua event menggunakan format:

```text
resource:action
```

---

# API Standard

Base URL

```text
/api/v1
```

Response

Success

```json
{
  "success": true,
  "message": "",
  "data": {},
  "meta": {}
}
```

Error

```json
{
  "success": false,
  "error": {
    "code": "",
    "message": ""
  }
}
```

---

# Coding Standards

Backend

* Clean Architecture
* SOLID
* Repository Pattern
* Adapter Pattern
* Factory Pattern
* Dependency Injection

Frontend

* Feature-based Structure
* Custom Hooks
* React Query
* Zustand
* Reusable Components

---

# Security

* JWT Authentication
* Refresh Token
* RBAC
* Permission Middleware
* Helmet
* Rate Limiter
* Audit Log

---

# Logging

Gunakan Pino.

Semua request dan operasi penting wajib memiliki:

* Request ID
* Correlation ID
* User ID
* Device ID (jika ada)
* Duration

---

# Testing Strategy

Minimal:

* Unit Test
* Integration Test
* Adapter Test
* Workflow Test

Coverage target:

* 80% Service
* 90% Adapter

---

# Performance Target

API Response

< 200 ms

Dashboard

< 2 detik

Socket Latency

< 1 detik

Support

* 100+ concurrent user
* 100.000+ ONU (dengan scaling horizontal)

---

# Development Phases

## Phase 1

Foundation

* Setup Monorepo
* Docker
* PostgreSQL
* Redis
* Fastify
* React
* Authentication
* User Management

---

## Phase 2

Dashboard

* Dashboard Summary
* Monitoring
* Customer Search
* Device Detail
* Realtime Socket

---

## Phase 3

GenieACS Integration

* Device Discovery
* Refresh
* PPPoE
* WiFi
* Reboot
* Factory Reset

---

## Phase 4

OLT Adapter

* Huawei
* ZTE
* Fiberhome
* VSOL
* Register ONU
* Delete ONU
* Replace ONU

---

## Phase 5

Workflow Engine

* Register Workflow
* Replace Workflow
* Rollback
* Queue Processing

---

## Phase 6

Advanced Features

* Notification
* Telegram
* WhatsApp
* Email
* Reporting
* Export

---

## Phase 7

Production Ready

* Monitoring
* Metrics
* Grafana
* Prometheus
* Loki
* Backup
* HA

---

# Module Dependency Rules

Allowed:

```text
Controller
    ↓
Service
    ↓
Repository
```

```text
Service
    ↓
Workflow
    ↓
Adapter
```

Forbidden:

* Controller → Repository
* Controller → Adapter
* React → Database
* React → Redis
* Repository → Adapter
* Repository → Socket
* Adapter → Database

---

# Dependency Graph

```text
React
   │
API
   │
Controller
   │
Service
   ├──────────────┐
   ▼              ▼
Repository     Workflow
   │              │
PostgreSQL     Adapter
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
   OLT Adapter      GenieACS Adapter
```

---

# CI/CD Pipeline

1. Install dependencies.
2. Lint.
3. Type check.
4. Unit test.
5. Build backend.
6. Build frontend.
7. Build Docker image.
8. Push registry.
9. Jalankan migration.
10. Deploy.
11. Health check.
12. Smoke test.

---

# AI Development Workflow

Saat AI mengimplementasikan fitur baru, urutan pengerjaan wajib:

1. Buat schema database (jika diperlukan).
2. Buat DTO dan validasi Zod.
3. Implementasikan repository.
4. Implementasikan service.
5. Tambahkan workflow (jika operasi kompleks).
6. Implementasikan adapter (jika perlu integrasi eksternal).
7. Tambahkan endpoint Fastify.
8. Tambahkan event ke Event Bus.
9. Tambahkan Socket.IO event (jika realtime).
10. Implementasikan React Query service.
11. Implementasikan halaman React.
12. Tambahkan unit test.
13. Perbarui dokumentasi.

---

# Definition of Ready

Sebuah fitur boleh mulai dikembangkan jika:

* Requirement tersedia.
* API telah didefinisikan.
* Database telah dirancang.
* Workflow telah ditentukan.
* Event telah diidentifikasi.
* Adapter yang diperlukan sudah tersedia.

---

# Definition of Done

Fitur dianggap selesai apabila:

* Build berhasil.
* Test lulus.
* Lint lulus.
* TypeScript tanpa error.
* Dokumentasi diperbarui.
* Docker dapat dijalankan.
* Logging tersedia.
* Audit log tersedia.
* Event realtime berfungsi.
* Mengikuti seluruh aturan di AI_RULES.md.

---

# Future Roadmap

BCMS dirancang agar dapat berkembang menjadi platform OSS/BSS lengkap.

Integrasi yang direncanakan:

* FreeRADIUS
* MikroTik
* PPPoE Server
* DHCP Server
* Billing System
* Payment Gateway
* WhatsApp Gateway
* Telegram Bot
* Grafana
* Prometheus
* LibreNMS
* Zabbix
* SNMP Trap Receiver
* Inventory Management
* Fiber Management
* GIS Map
* Trouble Ticket
* Mobile App (Android/iOS)

Dengan blueprint ini, seluruh pengembangan harus tetap konsisten terhadap arsitektur, mudah diuji, mudah diskalakan, dan siap digunakan pada lingkungan ISP skala produksi.
