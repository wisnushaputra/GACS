# AI_RULES.md

# Broadband Customer Monitoring System (BCMS)

## AI Development Constitution

Version 1.0

---

# Purpose

Dokumen ini berisi aturan yang **WAJIB** dipatuhi oleh AI saat menghasilkan kode untuk proyek BCMS.

Semua keputusan implementasi harus mengikuti dokumen berikut:

1. PRD.md
2. ARCHITECTURE.md
3. DATABASE.md
4. API_SPEC.md
5. GENIEACS_INTEGRATION.md
6. OLT_ADAPTER.md
7. ADAPTER_ARCHITECTURE.md
8. SOCKET_EVENTS.md
9. DOCKER.md

Jika terjadi konflik, prioritas mengikuti urutan di atas.

---

# Golden Rules

AI **TIDAK BOLEH**

* Mengubah arsitektur.
* Membuat dependency baru tanpa alasan.
* Menggunakan library yang tidak diperlukan.
* Mengubah struktur folder.
* Mengubah response API.
* Mengubah schema database.
* Menulis business logic di Controller.
* Menulis query database di Controller.
* Mengakses Redis dari React.
* Memanggil GenieACS langsung dari Controller.
* Memanggil OLT Adapter langsung dari Controller.
* Memanggil HTTP API langsung dari React Component.

---

# Architecture Rules

Seluruh flow harus mengikuti

```text
React

↓

React Query

↓

API Service

↓

Fastify Controller

↓

Business Service

↓

Repository

↓

Database
```

External System

```text
Business Service

↓

Adapter

↓

Transport

↓

Vendor
```

Tidak boleh ada shortcut.

---

# Layer Responsibilities

## Controller

Hanya

* Validasi Request
* Memanggil Service
* Return Response

Tidak boleh

* Business Logic
* SQL
* Redis
* HTTP Request
* Parsing

---

## Service

Hanya

* Business Logic
* Workflow
* Transaction
* Event Publish

Tidak boleh

* SQL langsung
* CLI
* HTTP Request langsung

---

## Repository

Hanya

* Query Database
* Drizzle ORM

Tidak boleh

* Business Logic
* HTTP
* Redis
* Socket

---

## Adapter

Hanya

* Integrasi eksternal
* Retry
* Mapping
* Authentication
* Timeout

Tidak boleh

* Business Rule
* Database

---

## React Component

Hanya

* UI
* Event
* Render

Tidak boleh

* Fetch API langsung
* Business Logic
* Socket langsung

---

# Folder Rules

Semua fitur berada di

```text
modules/

feature/

controller.ts

service.ts

repository.ts

routes.ts

schema.ts

dto.ts

mapper.ts

types.ts

index.ts
```

Tidak boleh membuat folder baru tanpa alasan.

---

# TypeScript Rules

Wajib

```text
strict=true
```

Dilarang

```ts
any
```

Gunakan

```ts
unknown
```

atau Generic.

Seluruh function wajib memiliki return type.

---

# Fastify Rules

Gunakan

* Fastify Plugin
* Fastify Route
* Fastify Decorator

Tidak menggunakan Express Middleware.

---

# Database Rules

Gunakan

Drizzle ORM

Tidak boleh

Raw SQL

kecuali

* Migration
* Performance Critical Query

---

# Validation Rules

Seluruh Request

↓

Zod

Tidak boleh validasi manual.

---

# Response Rules

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

Tidak boleh membuat format lain.

---

# Logging Rules

Gunakan

Pino

Log

* API
* Adapter
* Queue
* Socket
* Workflow

Password tidak boleh dicatat.

---

# Socket Rules

Socket hanya digunakan untuk

* Dashboard
* Monitoring
* Notification
* Task

Component React tidak boleh membuat koneksi Socket sendiri.

Gunakan Socket Service.

---

# Redis Rules

Redis digunakan untuk

* Cache
* Queue
* Session
* Socket Adapter
* Presence

Tidak boleh menyimpan data permanen.

---

# React Rules

Gunakan

* Functional Component
* Hooks
* React Query
* Zustand

Tidak menggunakan Class Component.

---

# Styling Rules

Gunakan

TailwindCSS

Tidak menggunakan

CSS Framework lain.

---

# API Rules

Semua API

```text
/api/v1
```

RESTful.

Gunakan HTTP Method yang benar.

---

# Authentication Rules

JWT

Refresh Token

Role Based Access

Permission Based Access

Tidak menggunakan Session Login tradisional.

---

# Event Rules

Semua perubahan status

↓

Event Bus

↓

Redis

↓

Socket

↓

Frontend

Controller tidak boleh mengirim event langsung.

---

# Queue Rules

Task berikut harus asynchronous

* Register ONU
* Replace ONU
* Push PPPoE
* Push WiFi
* Backup
* Restore

Gunakan BullMQ.

---

# Adapter Rules

Business Layer hanya mengenal Interface.

Tidak boleh

```ts
new HuaweiAdapter()
```

Gunakan

Factory.

---

# Error Handling

Gunakan

Custom Error

Contoh

```ts
DeviceNotFoundError

OLTConnectionError

ValidationError
```

Tidak menggunakan Error biasa.

---

# Environment Rules

Seluruh konfigurasi berada di

```text
.env
```

Tidak boleh hardcoded.

---

# Dependency Rules

AI tidak boleh menambah package baru kecuali benar-benar diperlukan.

Jika ingin menambah package, AI harus menjelaskan:

* Alasan
* Manfaat
* Dampak
* Alternatif

---

# Testing Rules

Minimal

* Unit Test Service
* Adapter Test
* Repository Test

Coverage

```text
80%
```

---

# Documentation Rules

Setiap module wajib memiliki

README.md

Berisi

* Purpose
* Endpoint
* Flow

---

# Git Rules

Gunakan Conventional Commit

Contoh

```text
feat(auth): login endpoint

feat(dashboard): realtime counter

fix(socket): reconnect issue

refactor(repository): drizzle optimization
```

---

# Performance Rules

Target

API

<200ms

Dashboard

<2 detik

Socket Delay

<1 detik

---

# Security Rules

Helmet

Rate Limit

HTTPS

JWT

bcrypt

Input Validation

Audit Log

Tidak boleh menyimpan password plaintext.

---

# AI Code Generation Rules

Saat menghasilkan kode, AI wajib:

1. Menggunakan TypeScript strict.
2. Menggunakan SOLID.
3. Menggunakan Clean Architecture.
4. Menggunakan Repository Pattern.
5. Menggunakan Adapter Pattern.
6. Menggunakan Factory Pattern.
7. Menggunakan DTO.
8. Menggunakan Mapper.
9. Menggunakan Dependency Injection.
10. Menggunakan Async/Await.
11. Menggunakan Pino Logger.
12. Menggunakan Zod Validation.
13. Menggunakan Drizzle ORM.
14. Menggunakan React Query.
15. Menggunakan Zustand.
16. Menggunakan TailwindCSS.
17. Menggunakan Socket.IO.
18. Menggunakan BullMQ untuk task asynchronous.

---

# Code Style

* Nama file menggunakan `kebab-case`.
* Nama class menggunakan `PascalCase`.
* Nama interface diawali huruf `I` hanya jika benar-benar diperlukan; lebih disarankan menggunakan nama deskriptif tanpa prefix.
* Nama type menggunakan `PascalCase`.
* Nama function menggunakan `camelCase`.
* Nama konstanta menggunakan `UPPER_SNAKE_CASE`.
* Hindari singkatan yang tidak jelas.

---

# Naming Convention

Gunakan istilah domain yang konsisten:

* ONU
* OLT
* Customer
* Device
* Provision
* Workflow
* Adapter
* Event
* Alarm
* Task

Jangan mencampur istilah seperti `Client`, `User`, dan `Subscriber` jika yang dimaksud adalah `Customer`.

---

# Pull Request Checklist

Setiap perubahan harus memenuhi:

* Build berhasil.
* Lint berhasil.
* Test berhasil.
* Tidak ada TypeScript error.
* Tidak ada `console.log`.
* Tidak ada `TODO` yang tertinggal.
* Dokumentasi diperbarui jika ada perubahan API atau arsitektur.
* Migration disertakan jika schema database berubah.

---

# Definition of Done

Sebuah fitur dianggap selesai jika:

* Mengikuti arsitektur.
* Mengikuti standar coding.
* Memiliki validasi.
* Memiliki unit test.
* Memiliki logging.
* Memiliki error handling.
* Memiliki dokumentasi.
* Menghasilkan event jika diperlukan.
* Mendukung Docker.
* Tidak melanggar aturan pada dokumen ini.

---

# AI Self Review Checklist

Sebelum menyelesaikan implementasi, AI harus memeriksa:

* Apakah business logic berada di Service?
* Apakah Controller hanya mengorkestrasi request/response?
* Apakah query database hanya melalui Repository?
* Apakah integrasi eksternal melalui Adapter?
* Apakah semua input divalidasi dengan Zod?
* Apakah response mengikuti standar?
* Apakah error menggunakan custom error?
* Apakah event dipublikasikan melalui Event Bus?
* Apakah kode dapat diuji (testable)?
* Apakah kode mengikuti prinsip SOLID?

Jika salah satu jawaban adalah **tidak**, implementasi harus diperbaiki sebelum dianggap selesai.
