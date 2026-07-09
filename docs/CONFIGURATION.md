# CONFIGURATION.md

# BCMS Configuration Management

Version: 1.0

---

# Overview

BCMS menggunakan **Centralized Configuration Management**.

Seluruh konfigurasi aplikasi berasal dari:

* Environment Variables
* Configuration Module
* Database (untuk runtime settings tertentu)
* Secret Manager (Production)

Konfigurasi **tidak boleh di-hardcode** di dalam source code.

---

# Configuration Principles

BCMS menerapkan prinsip:

* Configuration as Code
* Typed Configuration
* Environment Based
* Validation on Startup
* Fail Fast
* Immutable Configuration (untuk konfigurasi aplikasi)

---

# Configuration Sources

Prioritas konfigurasi:

```text
Environment Variables
        │
        ▼
Configuration Module
        │
        ▼
Database Runtime Settings
        │
        ▼
Default Values
```

---

# Environment

Environment yang didukung:

```text
development

testing

staging

production
```

---

# Configuration Categories

BCMS membagi konfigurasi menjadi beberapa domain.

* Application
* Database
* Redis
* Authentication
* Socket.IO
* GenieACS
* OLT Adapter
* Workflow
* Monitoring
* Notification
* Cache
* Logging
* Security
* Feature Flags
* Scheduler

---

# Application Configuration

Contoh:

```text
APP_NAME

APP_VERSION

APP_PORT

APP_HOST

APP_ENV

BASE_URL
```

---

# Database Configuration

```text
POSTGRES_HOST

POSTGRES_PORT

POSTGRES_DATABASE

POSTGRES_USER

POSTGRES_PASSWORD

POSTGRES_SSL
```

---

# Redis Configuration

```text
REDIS_HOST

REDIS_PORT

REDIS_PASSWORD

REDIS_DB
```

---

# Authentication

```text
JWT_SECRET

JWT_EXPIRES

REFRESH_EXPIRES

PASSWORD_HASH_ALGORITHM
```

Gunakan secret yang kuat dan jangan pernah menyimpan nilai ini di repository.

---

# Socket.IO

```text
SOCKET_PORT

SOCKET_NAMESPACE

SOCKET_PING_INTERVAL

SOCKET_PING_TIMEOUT
```

---

# GenieACS

```text
GENIEACS_URL

GENIEACS_USERNAME

GENIEACS_PASSWORD

GENIEACS_TIMEOUT
```

---

# OLT Adapter

```text
OLT_CONNECTION_TIMEOUT

OLT_COMMAND_TIMEOUT

OLT_RETRY

OLT_MAX_CONCURRENT_SESSION
```

Vendor-specific override dapat ditambahkan jika diperlukan.

---

# Workflow Engine

```text
WORKFLOW_TIMEOUT

WORKFLOW_MAX_RETRY

WORKFLOW_STEP_TIMEOUT
```

---

# Monitoring

```text
MONITORING_INTERVAL

OPTICAL_POWER_INTERVAL

DEVICE_SYNC_INTERVAL

HEALTH_CHECK_INTERVAL
```

---

# Cache

```text
CACHE_DEFAULT_TTL

CACHE_DASHBOARD_TTL

CACHE_CUSTOMER_TTL

CACHE_MONITORING_TTL
```

---

# Job Queue

```text
QUEUE_CONCURRENCY

QUEUE_RETRY

QUEUE_BACKOFF

QUEUE_REMOVE_ON_COMPLETE

QUEUE_REMOVE_ON_FAIL
```

---

# Notification

```text
SMTP_HOST

SMTP_PORT

SMTP_USERNAME

SMTP_PASSWORD

TELEGRAM_TOKEN

TELEGRAM_CHAT_ID
```

---

# Logging

```text
LOG_LEVEL

LOG_FORMAT

LOG_RETENTION_DAYS

LOG_MAX_SIZE
```

---

# Security

```text
RATE_LIMIT

LOGIN_MAX_ATTEMPTS

ACCOUNT_LOCK_DURATION

CORS_ORIGINS

TRUST_PROXY
```

---

# Scheduler

```text
SYNC_GENIEACS_CRON

SYNC_OLT_CRON

BACKUP_CRON

CLEANUP_CRON
```

Gunakan format cron yang tervalidasi.

---

# Feature Flags

Feature dapat diaktifkan atau dinonaktifkan tanpa mengubah kode.

Contoh:

```text
ENABLE_TELEGRAM

ENABLE_EMAIL

ENABLE_SMS

ENABLE_AUDIT

ENABLE_MONITORING

ENABLE_REPORT

ENABLE_DEBUG_MODE
```

---

# Runtime Configuration

Konfigurasi berikut dapat diubah saat aplikasi berjalan melalui antarmuka administrasi (sesuai kebutuhan):

* Polling Interval
* Dashboard Refresh Interval
* Optical Threshold
* Alarm Threshold
* Notification Rules

Perubahan runtime harus:

* Diaudit
* Divalidasi
* Dipublikasikan melalui Event Bus bila memengaruhi komponen lain

---

# Validation

Seluruh konfigurasi harus divalidasi saat startup.

Jika konfigurasi wajib tidak tersedia:

* Aplikasi gagal dijalankan (*fail fast*).
* Tampilkan pesan error yang jelas pada log.
* Jangan menggunakan nilai kosong untuk secret.

---

# Secrets

Data berikut diperlakukan sebagai secret:

* JWT Secret
* Database Password
* Redis Password
* SMTP Password
* Telegram Token
* GenieACS Password
* OLT Credential

Secret tidak boleh:

* Dicetak ke log
* Dikirim ke frontend
* Disimpan di repository

---

# Configuration Reload

Konfigurasi aplikasi yang bersifat tetap dibaca saat startup.

Konfigurasi runtime yang berasal dari database:

* Menggunakan cache dengan TTL yang sesuai.
* Dapat diperbarui melalui event atau mekanisme reload yang terkendali.
* Tidak memerlukan restart jika memang dirancang untuk berubah saat runtime.

---

# Configuration Service

Semua modul mengakses konfigurasi melalui Configuration Service.

Contoh:

```text
ConfigurationService

↓

get("CACHE_DEFAULT_TTL")

↓

Return Value
```

Modul tidak membaca environment variable secara langsung.

---

# Configuration Hierarchy

```text
Application

↓

Module

↓

Feature

↓

Component
```

---

# Environment Example

Contoh struktur:

```text
.env.development

.env.testing

.env.staging

.env.production
```

Setiap environment memiliki nilai yang berbeda sesuai kebutuhan.

---

# Audit

Perubahan konfigurasi runtime harus mencatat:

* User
* Nilai lama
* Nilai baru
* Timestamp
* Alasan perubahan (opsional namun disarankan)

---

# AI Coding Rules

AI wajib mengikuti aturan berikut:

1. Jangan melakukan hardcode terhadap nilai konfigurasi.
2. Seluruh konfigurasi dibaca melalui Configuration Service.
3. Validasi seluruh environment variable saat startup.
4. Gunakan konfigurasi bertipe (typed configuration).
5. Secret tidak boleh ditampilkan ke log atau frontend.
6. Pisahkan konfigurasi tetap dan runtime.
7. Gunakan feature flag untuk fitur opsional.
8. Konfigurasi runtime harus diaudit.
9. Jangan membaca environment variable langsung dari business logic.
10. Terapkan prinsip fail fast jika konfigurasi wajib tidak tersedia.

---

# Configuration Checklist

* [ ] Semua environment variable terdokumentasi.
* [ ] Startup memvalidasi konfigurasi.
* [ ] Secret tidak berada di repository.
* [ ] Feature flag terdokumentasi.
* [ ] Scheduler menggunakan konfigurasi.
* [ ] Timeout dan retry berasal dari konfigurasi.
* [ ] Polling interval dapat dikonfigurasi.
* [ ] Perubahan runtime menghasilkan audit log.

---

# Summary

BCMS menggunakan **Centralized Configuration Management** dengan konfigurasi bertipe, validasi saat startup, dan pemisahan antara konfigurasi aplikasi, runtime, serta secret. Seluruh modul mengakses konfigurasi melalui Configuration Service sehingga perubahan dapat dikelola secara konsisten, aman, dan mudah dipelihara di berbagai environment (development, testing, staging, dan production).
