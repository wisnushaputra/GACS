# ERROR_HANDLING.md

# BCMS Error Handling Standard

Version: 1.0

---

# Overview

Dokumen ini mendefinisikan standar penanganan error untuk seluruh komponen BCMS agar konsisten, mudah ditelusuri, dan mudah diobservasi.

Semua error harus:

* Type Safe
* Structured
* Logged
* Audited (jika relevan)
* Traceable menggunakan Correlation ID
* Aman untuk ditampilkan ke pengguna

---

# Error Categories

## Validation Error

Kesalahan input dari pengguna.

Contoh:

* Field wajib kosong
* Format email salah
* Serial Number tidak valid
* VLAN tidak valid

HTTP

400 Bad Request

---

## Authentication Error

Pengguna belum login atau token tidak valid.

HTTP

401 Unauthorized

---

## Authorization Error

Pengguna tidak memiliki permission.

HTTP

403 Forbidden

---

## Not Found Error

Data tidak ditemukan.

HTTP

404 Not Found

---

## Conflict Error

Terjadi konflik data.

Contoh:

* Username sudah digunakan
* Serial Number sudah terdaftar
* ONU sudah ada

HTTP

409 Conflict

---

## Business Rule Error

Melanggar aturan bisnis.

Contoh:

* PON penuh
* OLT Offline
* Customer Suspended
* Profile tidak cocok

HTTP

422 Unprocessable Entity

---

## External Service Error

Kesalahan dari sistem eksternal.

Contoh:

* GenieACS
* OLT
* SMTP
* Telegram

HTTP

502 Bad Gateway

---

## Timeout Error

Permintaan ke sistem lain melebihi batas waktu.

HTTP

504 Gateway Timeout

---

## Internal Error

Kesalahan aplikasi.

HTTP

500 Internal Server Error

---

# Standard Error Response

Semua endpoint harus mengembalikan format berikut.

```json
{
  "success": false,
  "error": {
    "code": "OLT_OFFLINE",
    "message": "OLT tidak dapat dihubungi.",
    "category": "BUSINESS",
    "correlationId": "9d7b9e42-a34b-4d65-8bb4-62fb7b2c18d1",
    "details": {}
  }
}
```

---

# Error Object

Field wajib:

* code
* message
* category
* correlationId

Field opsional:

* details
* stack (development only)

---

# Error Code Convention

Gunakan format:

```text
MODULE_ERROR_NAME
```

Contoh:

```text
AUTH_INVALID_TOKEN

AUTH_TOKEN_EXPIRED

CUSTOMER_NOT_FOUND

CUSTOMER_ALREADY_EXISTS

OLT_OFFLINE

OLT_TIMEOUT

ONU_ALREADY_REGISTERED

ONU_NOT_FOUND

WORKFLOW_FAILED

WORKFLOW_TIMEOUT

GENIEACS_REQUEST_FAILED

GENIEACS_DEVICE_NOT_FOUND

REDIS_UNAVAILABLE

DATABASE_ERROR

SOCKET_DISCONNECTED

VALIDATION_ERROR
```

Error code harus stabil dan tidak bergantung pada bahasa.

---

# Custom Error Classes

Setiap jenis error memiliki kelas sendiri.

Contoh:

* ValidationError
* AuthenticationError
* AuthorizationError
* NotFoundError
* ConflictError
* BusinessRuleError
* ExternalServiceError
* TimeoutError
* InternalServerError

Semua mewarisi `BaseError`.

---

# Error Middleware

Seluruh error diproses oleh global error handler.

Alur:

```text
Request
   │
Controller
   │
Service
   │
Throw Error
   │
Global Error Handler
   │
Logger
   │
Response
```

Controller tidak boleh menangani error secara manual kecuali ada kebutuhan khusus.

---

# Validation Errors

Gunakan Zod.

Respons:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validasi gagal.",
    "details": {
      "field": "serialNumber",
      "reason": "Required"
    }
  }
}
```

---

# Workflow Errors

Workflow harus memiliki status:

* Pending
* Running
* Completed
* Failed
* Retrying
* Rolled Back

Jika gagal:

* Simpan histori langkah.
* Simpan penyebab kegagalan.
* Simpan waktu.
* Simpan correlationId.

---

# GenieACS Errors

Contoh kode:

```text
GENIEACS_TIMEOUT

GENIEACS_UNAVAILABLE

GENIEACS_DEVICE_NOT_FOUND

GENIEACS_TASK_FAILED
```

Gunakan retry dengan exponential backoff jika memungkinkan.

---

# OLT Adapter Errors

Contoh:

```text
OLT_CONNECTION_FAILED

OLT_AUTH_FAILED

OLT_COMMAND_FAILED

OLT_PARSE_FAILED

OLT_TIMEOUT

OLT_VENDOR_NOT_SUPPORTED
```

Jangan meneruskan pesan mentah dari vendor ke pengguna.

---

# Socket.IO Errors

Contoh:

```text
SOCKET_AUTH_FAILED

SOCKET_DISCONNECTED

SOCKET_ROOM_NOT_FOUND

SOCKET_EVENT_FAILED
```

Frontend harus mencoba reconnect sesuai kebijakan.

---

# Database Errors

Contoh:

```text
DATABASE_CONNECTION_FAILED

DATABASE_CONSTRAINT

DATABASE_TIMEOUT
```

Detail teknis hanya dicatat pada log, bukan dikirim ke pengguna.

---

# Queue Errors

Contoh:

```text
QUEUE_JOB_FAILED

QUEUE_TIMEOUT

QUEUE_RETRY_EXCEEDED
```

Job harus mendukung retry dan dead-letter queue bila diperlukan.

---

# Logging

Setiap error harus dicatat dengan informasi minimal:

* Timestamp
* Level
* Module
* Error Code
* Message
* Correlation ID
* User ID (jika ada)
* Workflow ID (jika ada)
* Request Path

---

# Audit

Aksi yang mengubah data penting harus menghasilkan audit log meskipun terjadi kegagalan.

Contoh:

* Register ONU
* Replace ONU
* Push PPPoE
* Hapus Customer
* Ubah Role

---

# Retry Policy

Boleh di-retry:

* Timeout
* External Service
* Queue
* Socket Reconnect

Tidak boleh di-retry:

* Validation Error
* Authentication Error
* Authorization Error
* Duplicate Data

---

# Rollback

Workflow yang gagal harus mendukung rollback jika:

* Operasi bersifat multi-langkah.
* Sebagian langkah telah berhasil.

Rollback wajib mencatat hasil setiap langkah.

---

# Frontend Error Handling

Gunakan pola berikut:

* Loading State
* Empty State
* Error State
* Retry Button

Jangan menampilkan stack trace kepada pengguna.

---

# User-Friendly Messages

Backend mengembalikan error code.

Frontend bertugas memetakan error code menjadi pesan yang mudah dipahami sesuai bahasa yang dipilih pengguna.

Contoh:

```text
ONU_ALREADY_REGISTERED
```

↓

"ONU sudah terdaftar pada sistem."

---

# Correlation ID

Setiap request menghasilkan Correlation ID.

Correlation ID harus diteruskan ke:

* Workflow Engine
* OLT Adapter
* GenieACS Service
* Queue
* Notification
* Logger

Sehingga seluruh proses dapat ditelusuri dari awal hingga akhir.

---

# Security

Jangan pernah mengirim:

* Stack Trace
* SQL Query
* Password
* Token
* API Key
* SSH Credential

ke frontend.

---

# AI Coding Rules

AI wajib mengikuti aturan berikut:

1. Gunakan custom error class, jangan melempar string biasa.
2. Semua error memiliki `code` yang stabil.
3. Semua endpoint mengembalikan format respons yang sama.
4. Gunakan global error handler.
5. Jangan menampilkan detail internal ke pengguna.
6. Gunakan Correlation ID untuk semua request.
7. Log semua error sesuai level yang tepat.
8. Gunakan retry hanya untuk error yang bersifat sementara.
9. Gunakan rollback pada workflow multi-langkah.
10. Semua error dari sistem eksternal harus dipetakan ke error internal BCMS.

---

# Error Flow

```text
Client Request
      │
      ▼
Controller
      │
      ▼
Service
      │
      ▼
Workflow / OLT / GenieACS / Database
      │
      ▼
Throw BaseError
      │
      ▼
Global Error Handler
      │
      ├── Structured Logger
      ├── Audit Log (jika relevan)
      ├── Notification (critical)
      └── HTTP Response
```

---

# Summary

BCMS menggunakan pendekatan **Unified Error Handling** dengan custom error class, format respons yang konsisten, correlation ID, logging terstruktur, serta integrasi dengan Workflow Engine, Notification Center, dan Audit Log. Pendekatan ini memastikan seluruh error mudah dilacak, aman ditampilkan kepada pengguna, dan mendukung kebutuhan operasional pada lingkungan produksi.
