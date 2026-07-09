# 03 - Operational Data

**Phase:** Operational Data Layer

**Status:** NOT STARTED

**Priority:** Critical

**Dependencies:**

* ✅ 00-project-setup.md
* ✅ 01-authentication.md
* ✅ 02-master-data.md

---

# Objective

Membangun lapisan data operasional yang menyimpan seluruh aktivitas perangkat, alarm, workflow, histori parameter, dan event. Data ini akan menjadi sumber utama untuk Dashboard, Monitoring, Workflow Engine, dan Notification.

---

# Scope

Modul yang dikerjakan:

* Device Status
* Device Parameters
* Alarm
* Event Log
* Workflow History
* Optical History
* Task Queue History
* Notification History
* Audit Log
* System Metrics

---

# Epic 1 — Device Status

## Task 1.1

* [ ] Create device_status table

Acceptance Criteria

Menyimpan status terakhir perangkat:

* Online
* Offline
* LOS
* Dying Gasp
* Disabled
* Unknown

---

## Task 1.2

* [ ] Device Status Repository

---

## Task 1.3

* [ ] Device Status API

```http
GET /api/v1/device-status
GET /api/v1/device-status/:deviceId
```

---

# Epic 2 — Device Parameters

## Task 2.1

* [ ] Create device_parameters table

Acceptance Criteria

Menyimpan snapshot parameter:

* RX Power
* TX Power
* Temperature
* Voltage
* Bias Current
* WAN Status
* IP Address
* Firmware Version
* Uptime

---

## Task 2.2

* [ ] Parameter History API

---

## Task 2.3

* [ ] Parameter Retention Policy

Acceptance Criteria

Parameter lama dapat dipurge berdasarkan konfigurasi.

---

# Epic 3 — Alarm

## Task 3.1

* [ ] Create alarms table

Acceptance Criteria

Alarm yang didukung:

* LOS
* Dying Gasp
* Optical Low
* ONU Offline
* ONU Online
* Power Failure

---

## Task 3.2

* [ ] Alarm CRUD API

---

## Task 3.3

* [ ] Alarm Acknowledge

---

## Task 3.4

* [ ] Alarm Resolve

---

## Task 3.5

* [ ] Alarm Severity

Level:

* Critical
* Major
* Minor
* Warning
* Info

---

# Epic 4 — Event Log

## Task 4.1

* [ ] Create event_logs table

---

## Task 4.2

* [ ] Event Logger Service

---

## Task 4.3

* [ ] Event Search API

Acceptance Criteria

Filter berdasarkan:

* Customer
* ONU
* OLT
* Workflow
* Tanggal
* Jenis Event

---

# Epic 5 — Workflow History

## Task 5.1

* [ ] Create workflows table

---

## Task 5.2

* [ ] Create workflow_steps table

---

## Task 5.3

* [ ] Workflow History API

---

## Task 5.4

* [ ] Workflow Detail API

---

# Epic 6 — Optical History

## Task 6.1

* [ ] Create optical_history table

---

## Task 6.2

* [ ] Optical History API

---

## Task 6.3

* [ ] Retention Policy

Acceptance Criteria

Data historis dapat diarsipkan sesuai konfigurasi.

---

# Epic 7 — Notification History

## Task 7.1

* [ ] Create notifications table

---

## Task 7.2

* [ ] Notification History API

---

## Task 7.3

* [ ] Read / Unread Status

---

# Epic 8 — Queue & Job History

## Task 8.1

* [ ] Create jobs table

---

## Task 8.2

* [ ] Queue History API

---

## Task 8.3

* [ ] Retry History

---

# Epic 9 — Audit Log

## Task 9.1

* [ ] Create audit_logs table

---

## Task 9.2

* [ ] Audit Service

---

## Task 9.3

* [ ] Audit Search

Acceptance Criteria

Filter berdasarkan:

* User
* Modul
* Action
* IP Address
* Tanggal

---

# Epic 10 — Metrics

## Task 10.1

* [ ] Create system_metrics table

---

## Task 10.2

* [ ] Metrics Collector

Acceptance Criteria

Menyimpan:

* Workflow Count
* Active Device
* Alarm Count
* Queue Length
* API Response Time

---

# Epic 11 — Frontend

## Device Status

* [ ] Device Status Table
* [ ] Device Detail Timeline

---

## Alarm

* [ ] Alarm List
* [ ] Alarm Detail
* [ ] Alarm Filter

---

## Event

* [ ] Event Timeline
* [ ] Event Search

---

## Workflow

* [ ] Workflow History
* [ ] Workflow Detail

---

# Epic 12 — Testing

Backend

* [ ] Repository Test
* [ ] Service Test
* [ ] API Test

Frontend

* [ ] Device Status Page Test
* [ ] Alarm Page Test
* [ ] Workflow History Page Test

---

# Deliverables

Setelah fase ini selesai:

* Data status perangkat tersimpan.
* Histori parameter tersedia.
* Alarm dapat dicatat, diakui, dan diselesaikan.
* Event log dapat ditelusuri.
* Histori workflow tersedia.
* Histori optical tersedia.
* Histori notifikasi tersedia.
* Audit log lengkap.
* System metrics tersedia.

---

# Acceptance Criteria

* [ ] Semua tabel operasional dibuat.
* [ ] API operasional berfungsi.
* [ ] Histori dapat ditelusuri.
* [ ] Filter dan pencarian tersedia.
* [ ] Retention policy berjalan.
* [ ] Frontend dapat menampilkan data operasional.
* [ ] Unit dan integration test lulus.
* [ ] Dokumentasi diperbarui.

---

# Notes

* Pisahkan data operasional dari master data untuk menjaga performa.
* Gunakan indeks pada kolom yang sering digunakan untuk pencarian (device_id, customer_id, workflow_id, created_at).
* Terapkan kebijakan retensi agar tabel histori tidak tumbuh tanpa batas.
* Semua endpoint harus menggunakan JWT dan Permission Middleware.
* Seluruh event dan status harus mengikuti standar pada `SOCKET_EVENTS.md`, `WORKFLOW_ENGINE.md`, dan `VENDOR_MAPPING.md`.
