# CACHE_STRATEGY.md

# BCMS Cache Strategy

Version: 1.0

---

# Overview

BCMS menggunakan **Redis** sebagai komponen multi-fungsi untuk:

* Application Cache
* Distributed Cache
* Pub/Sub
* BullMQ Backend
* Distributed Lock
* Rate Limiting
* Temporary Storage

Tujuan utama:

* Mengurangi beban PostgreSQL
* Mempercepat dashboard
* Mendukung realtime
* Mengurangi polling yang tidak perlu
* Menjaga konsistensi data

---

# Cache Principles

BCMS menggunakan pola:

* Cache Aside
* Event-based Invalidation
* Short TTL untuk data dinamis
* Long TTL untuk data referensi
* Never Cache Sensitive Data

---

# Cache Architecture

```text id="8m3qpa"
Browser
    │
REST API
    │
Cache Check
    │
 ┌── Hit ─────────► Redis
 │
 └── Miss
        │
 PostgreSQL
        │
 Save Cache
        │
 Redis
```

---

# Cache Layers

## Layer 1

Frontend Cache

TanStack Query

TTL pendek

---

## Layer 2

Backend Redis Cache

Semua query berat.

---

## Layer 3

Database

Source of Truth.

---

# Cache Key Convention

Gunakan format:

```text id="r6b0af"
module:resource:id
```

Contoh:

```text id="hn0k6g"
customer:123

onu:456

olt:OLT01

dashboard:summary

monitoring:onu:123

workflow:789
```

Untuk daftar:

```text id="nv4w3r"
customer:list

onu:list

olt:list
```

---

# TTL Strategy

| Data                  | TTL         |
| --------------------- | ----------- |
| Dashboard Summary     | 10–30 detik |
| Dashboard Chart       | 30–60 detik |
| Monitoring ONU Status | 5–10 detik  |
| Optical Power         | 10–30 detik |
| OLT Health            | 15–30 detik |
| Customer Detail       | 5 menit     |
| Customer List         | 1 menit     |
| Vendor Mapping        | 1 jam       |
| Roles & Permissions   | 15 menit    |
| System Settings       | 15 menit    |

TTL dapat disesuaikan berdasarkan hasil pengujian dan kebutuhan operasional.

---

# Dashboard Cache

Cache:

* Customer Online
* Customer Offline
* LOS
* Dying Gasp
* Active Alarm
* OLT Online
* ONU Online

Update dilakukan melalui Event Bus saat memungkinkan.

---

# Monitoring Cache

Cache:

* ONU Status
* Optical Power
* CPU
* Memory
* Temperature
* Uptime

Monitoring tidak selalu membaca langsung dari OLT.

---

# Customer Cache

Cache:

* Detail
* PPPoE Profile
* ONU
* Service Plan

Invalidasi:

* Customer Updated
* Customer Deleted

---

# OLT Cache

Cache:

* OLT Detail
* Board
* PON
* Port
* Firmware
* Health

---

# GenieACS Cache

Cache:

* Device Summary
* Device Parameter
* Last Inform
* Last Sync

---

# Workflow Cache

Cache:

* Workflow Status
* Progress
* Current Step

Dihapus setelah workflow selesai atau kedaluwarsa sesuai kebijakan.

---

# Notification Cache

Cache:

* Unread Count
* Latest Notification

---

# Authentication Cache

Simpan:

* Refresh Token (jika diperlukan)
* Session Metadata
* Token Blacklist / Revocation List

Jangan menyimpan password.

---

# Distributed Lock

Gunakan Redis Lock untuk operasi yang tidak boleh berjalan bersamaan.

Contoh:

* Register ONU
* Replace ONU
* Push PPPoE
* Factory Reset

Contoh key:

```text id="hlj9q7"
lock:onu:SN12345678

lock:customer:1001

lock:workflow:WF001
```

---

# Pub/Sub

Redis Pub/Sub digunakan untuk:

* Dashboard Update
* Monitoring Update
* Alarm
* Notification
* Workflow Update

---

# BullMQ

Redis juga digunakan untuk:

* Queue
* Delayed Job
* Retry
* Dead Letter Queue

Pisahkan namespace Redis antara cache dan queue bila memungkinkan.

---

# Cache Invalidation

Jangan menghapus cache secara manual dari UI.

Gunakan event.

Contoh:

```text id="igjn7r"
customer.updated

↓

invalidate

↓

customer:123
```

atau

```text id="cys20o"
onu.registered

↓

invalidate

↓

dashboard:summary
```

---

# Event Integration

Event yang memicu invalidasi cache, misalnya:

* customer.created
* customer.updated
* customer.deleted
* onu.registered
* onu.replaced
* onu.deleted
* monitoring.updated
* dashboard.updated

---

# Cache Warmup

Saat aplikasi mulai:

* Vendor Mapping
* Roles
* Permissions
* System Settings

dapat dipanaskan (*warm up*) ke cache.

---

# Cache Stampede Prevention

Untuk data yang sering diakses:

* Gunakan TTL yang bervariasi (*TTL jitter*).
* Gunakan distributed lock saat membangun ulang cache.
* Hindari banyak proses membangun cache yang sama secara bersamaan.

---

# Cache Consistency

Database tetap menjadi **Source of Truth**.

Cache hanya salinan sementara.

Urutan:

```text id="ynf0wg"
Update Database

↓

Publish Event

↓

Invalidate Cache

↓

Next Read

↓

Rebuild Cache
```

---

# Monitoring

Pantau metrik berikut:

* Hit Rate
* Miss Rate
* Memory Usage
* Key Count
* Expired Keys
* Evicted Keys
* Lock Contention

---

# Security

Jangan menyimpan pada cache:

* Password
* SSH Credential
* Secret
* API Key
* Private Key

Jika harus menyimpan token, gunakan TTL yang sesuai dan mekanisme pencabutan.

---

# AI Coding Rules

AI wajib mengikuti aturan berikut:

1. Gunakan Redis sebagai cache, bukan sumber data utama.
2. Terapkan pola Cache Aside.
3. Invalidasi cache menggunakan event, bukan penghapusan acak.
4. Gunakan TTL pada seluruh key cache.
5. Jangan menyimpan data sensitif di Redis tanpa perlindungan yang memadai.
6. Gunakan distributed lock untuk operasi provisioning yang kritis.
7. Pisahkan namespace untuk cache, pub/sub, dan BullMQ.
8. Jangan mengakses Redis langsung dari frontend.
9. Pantau metrik cache secara berkala.
10. Database tetap menjadi sumber data utama.

---

# Redis Namespace

Contoh namespace:

```text id="v7ik9r"
cache:customer:*

cache:onu:*

cache:dashboard:*

cache:monitoring:*

cache:workflow:*

lock:*

pubsub:*

bull:*
```

---

# Summary

BCMS menggunakan Redis sebagai platform cache dan koordinasi yang mendukung cache aplikasi, Pub/Sub, BullMQ, distributed lock, serta rate limiting. Strategi Cache Aside dengan invalidasi berbasis event menjaga data tetap konsisten, sementara TTL, namespace yang terpisah, dan monitoring cache memastikan performa tetap optimal pada lingkungan produksi.
