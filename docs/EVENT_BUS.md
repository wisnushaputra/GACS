# Event Bus Architecture

Version: 1.0

---

# Overview

BCMS menggunakan **Event Driven Architecture (EDA)**.

Seluruh perubahan status sistem dikomunikasikan menggunakan Event Bus.

Event Bus menjadi media komunikasi antar module tanpa membuat module saling bergantung.

---

# Goals

* Loose Coupling
* High Scalability
* Easy Integration
* Realtime
* Audit Friendly
* Retryable
* Observable

---

# Architecture

```text
                  REST API
                     │
                     ▼
              Workflow Engine
                     │
          publish(Event Bus)
                     │
      ┌──────────────┼───────────────┐
      │              │               │
      ▼              ▼               ▼
 Monitoring     Notification     Audit Log
      │
      ▼
 Redis Pub/Sub
      │
      ▼
 Socket.IO
      │
      ▼
 Frontend
```

---

# Event Naming Convention

Gunakan format berikut.

```
module.resource.action
```

Contoh

```
customer.created

customer.updated

customer.deleted

onu.registered

onu.replaced

onu.online

onu.offline

onu.los

onu.dying_gasp

workflow.started

workflow.completed

workflow.failed

workflow.retry

workflow.rollback

notification.created

notification.sent

notification.failed

alarm.created

alarm.updated

alarm.resolved

dashboard.updated

monitoring.updated
```

Gunakan huruf kecil dan pemisah titik (`.`).

---

# Event Structure

Semua event menggunakan struktur berikut.

```json
{
  "id": "uuid",
  "name": "onu.online",
  "timestamp": "2026-01-01T10:00:00Z",
  "correlationId": "uuid",
  "source": "workflow-engine",
  "version": 1,
  "payload": {}
}
```

---

# Required Fields

| Field         | Required |
| ------------- | -------- |
| id            | Yes      |
| name          | Yes      |
| timestamp     | Yes      |
| correlationId | Yes      |
| source        | Yes      |
| version       | Yes      |
| payload       | Yes      |

---

# Correlation ID

Semua event harus membawa Correlation ID.

Contoh:

```
Workflow

↓

OLT Adapter

↓

GenieACS

↓

Notification

↓

Socket.IO
```

Seluruh proses memiliki Correlation ID yang sama.

---

# Event Categories

## Customer

```
customer.created

customer.updated

customer.deleted

customer.suspended

customer.activated
```

---

## ONU

```
onu.discovered

onu.registered

onu.deleted

onu.replaced

onu.enabled

onu.disabled

onu.rebooted

onu.factory_reset
```

---

## ONU Status

```
onu.online

onu.offline

onu.los

onu.dying_gasp

onu.optical.updated

onu.wan.connected

onu.wan.disconnected
```

---

## OLT

```
olt.created

olt.updated

olt.deleted

olt.connected

olt.disconnected

olt.health.updated
```

---

## Monitoring

```
monitoring.updated

monitoring.synced

monitoring.failed
```

---

## Dashboard

```
dashboard.updated
```

---

## Workflow

```
workflow.started

workflow.step.started

workflow.step.completed

workflow.step.failed

workflow.retry

workflow.rollback

workflow.completed

workflow.failed
```

---

## Notification

```
notification.created

notification.sent

notification.failed

notification.read
```

---

## Alarm

```
alarm.created

alarm.updated

alarm.acknowledged

alarm.resolved
```

---

## Authentication

```
user.login

user.logout

user.token.refresh
```

---

## Administration

```
settings.updated

vendor.mapping.updated

role.updated

permission.updated
```

---

# Payload Standard

Payload hanya berisi data bisnis.

Contoh

```json
{
    "customerId":"CUS001",
    "onuId":"ONU123",
    "serialNumber":"48575443ABCD",
    "status":"ONLINE"
}
```

Jangan memasukkan:

* Stack Trace
* Password
* JWT
* SSH Password
* Secret

---

# Publisher Rules

Publisher:

* tidak mengetahui subscriber
* hanya publish event

Contoh

Workflow

↓

publish

↓

selesai

---

# Subscriber Rules

Subscriber:

* hanya mendengarkan event
* tidak memanggil publisher secara langsung

---

# Event Flow

Register ONU

```
workflow.started

↓

onu.registered

↓

genieacs.device.synced

↓

workflow.completed

↓

dashboard.updated

↓

notification.created

↓

socket.dashboard.updated
```

---

# LOS Flow

```
OLT

↓

onu.los

↓

alarm.created

↓

dashboard.updated

↓

notification.created

↓

socket.alarm.created
```

---

# Dying Gasp Flow

```
ONU

↓

onu.dying_gasp

↓

alarm.created

↓

workflow.optional

↓

notification.created

↓

socket.dashboard.updated
```

---

# Socket Mapping

Backend Event

↓

Socket Event

```
dashboard.updated

↓

dashboard:update
```

```
alarm.created

↓

alarm:new
```

```
notification.created

↓

notification:new
```

---

# Retry Policy

Retry diperbolehkan untuk:

* Redis Error
* Notification Error
* External Service Error

Retry menggunakan exponential backoff.

---

# Dead Letter Queue

Jika event gagal diproses setelah retry.

↓

Masuk ke

Dead Letter Queue

Administrator dapat:

* melihat
* retry
* discard

---

# Event Ordering

Event dalam workflow yang sama harus diproses sesuai urutan.

Gunakan Workflow ID + Correlation ID untuk menjaga konsistensi.

---

# Event Versioning

Gunakan:

```
version=1
```

Jika payload berubah.

↓

Naikkan versi.

Contoh

```
onu.online

v1

↓

v2
```

Jangan mengubah payload lama secara langsung.

---

# Logging

Semua publish dan subscribe dicatat.

Minimal:

* Event Name
* Timestamp
* Module
* Correlation ID
* Processing Time
* Result

---

# Monitoring

Dashboard System Health menampilkan:

* Publish Rate
* Subscribe Rate
* Queue Size
* Failed Event
* Retry Count
* DLQ Count

---

# Event Bus Implementation

Gunakan:

```
Application Layer

↓

Redis Pub/Sub

↓

BullMQ

↓

Socket.IO
```

Redis digunakan sebagai media distribusi event.

BullMQ digunakan untuk pekerjaan asynchronous.

---

# AI Coding Rules

AI wajib mengikuti aturan berikut:

1. Gunakan Event Bus untuk komunikasi antar module.
2. Jangan memanggil module lain secara langsung jika komunikasi dapat dilakukan melalui event.
3. Gunakan nama event sesuai konvensi `module.resource.action`.
4. Semua event memiliki Correlation ID.
5. Semua event memiliki versi.
6. Payload hanya berisi data bisnis.
7. Jangan mengirim data sensitif pada payload.
8. Log seluruh publish dan subscribe.
9. Gunakan retry untuk subscriber yang gagal.
10. Gunakan Dead Letter Queue untuk event yang gagal permanen.

---

# Summary

BCMS menggunakan Event Bus sebagai fondasi komunikasi antar module. Workflow Engine, Monitoring, Notification, Dashboard, OLT Adapter, GenieACS, dan Socket.IO berinteraksi melalui event yang memiliki kontrak baku, versioning, Correlation ID, serta mekanisme retry dan Dead Letter Queue. Pendekatan ini menghasilkan sistem yang lebih modular, mudah dikembangkan, mudah diobservasi, dan siap untuk skala enterprise.
