# 07 - GenieACS Integration

**Phase:** GenieACS Service Layer

**Status:** NOT STARTED

**Priority:** Critical

**Dependencies:**

* ✅ 00-project-setup.md
* ✅ 01-authentication.md
* ✅ 02-master-data.md
* ✅ 03-operational-data.md
* ✅ 04-dashboard.md
* ✅ 05-realtime.md
* ✅ 06-workflow-engine.md

---

# Objective

Membangun GenieACS Service Layer sebagai abstraksi penuh terhadap GenieACS API sehingga seluruh fitur provisioning, monitoring, dan management ONU menggunakan interface internal BCMS.

Workflow Engine hanya berkomunikasi dengan `GenieACSService`, bukan langsung dengan REST API GenieACS.

---

# Scope

* GenieACS Client
* Device Discovery
* Parameter Management
* Task Management
* Virtual Parameters
* Preset Management
* Fault Management
* File Management
* Cache
* Event Integration

---

# Epic 1 — Client

## Task 1.1

* [ ] Create GenieACS HTTP Client

Acceptance Criteria

* Base URL
* API Key / Authentication
* Timeout
* Retry
* Logging

---

## Task 1.2

* [ ] Error Handler

---

## Task 1.3

* [ ] Response Mapper

---

## Task 1.4

* [ ] Retry Strategy

---

# Epic 2 — Device Management

## Task 2.1

* [ ] Discover Device

---

## Task 2.2

* [ ] Get Device

---

## Task 2.3

* [ ] Search Device

---

## Task 2.4

* [ ] Delete Device

---

## Task 2.5

* [ ] Refresh Device

Acceptance Criteria

Perangkat dapat ditemukan berdasarkan Serial Number atau Device ID.

---

# Epic 3 — Parameter Management

## Task 3.1

* [ ] Get Parameter

---

## Task 3.2

* [ ] Set Parameter

---

## Task 3.3

* [ ] Refresh Parameter

---

## Task 3.4

* [ ] Batch Parameter Read

---

## Task 3.5

* [ ] Batch Parameter Write

Acceptance Criteria

Operasi batch mengurangi jumlah request ke GenieACS.

---

# Epic 4 — Common Operations

## Task 4.1

* [ ] Push PPPoE

---

## Task 4.2

* [ ] Push WiFi SSID

---

## Task 4.3

* [ ] Push WiFi Password

---

## Task 4.4

* [ ] Reboot Device

---

## Task 4.5

* [ ] Factory Reset

---

## Task 4.6

* [ ] Refresh WAN Status

---

## Task 4.7

* [ ] Refresh Optical Parameters

---

## Task 4.8

* [ ] Refresh Device Information

Acceptance Criteria

Semua operasi dapat dipanggil melalui `GenieACSService`.

---

# Epic 5 — Task Management

## Task 5.1

* [ ] Create Task

---

## Task 5.2

* [ ] Cancel Task

---

## Task 5.3

* [ ] Retry Task

---

## Task 5.4

* [ ] Task Status

---

## Task 5.5

* [ ] Task History

Acceptance Criteria

Status task dapat dipantau oleh Workflow Engine.

---

# Epic 6 — Preset & Virtual Parameters

## Task 6.1

* [ ] Get Preset

---

## Task 6.2

* [ ] Apply Preset

---

## Task 6.3

* [ ] Virtual Parameter Support

---

## Task 6.4

* [ ] Preset Synchronization

---

# Epic 7 — Fault Management

## Task 7.1

* [ ] Read Fault

---

## Task 7.2

* [ ] Clear Fault

---

## Task 7.3

* [ ] Fault History

---

# Epic 8 — File Management

## Task 8.1

* [ ] Firmware Upload

---

## Task 8.2

* [ ] Configuration Upload

---

## Task 8.3

* [ ] Configuration Download

---

## Task 8.4

* [ ] Firmware Upgrade

Acceptance Criteria

Operasi firmware menggunakan Workflow Engine.

---

# Epic 9 — Cache

## Task 9.1

* [ ] Redis Cache

---

## Task 9.2

* [ ] Cache Device

---

## Task 9.3

* [ ] Cache Parameter

---

## Task 9.4

* [ ] Cache Invalidation

Acceptance Criteria

Parameter yang sering dibaca di-cache untuk mengurangi beban GenieACS.

---

# Epic 10 — Event Integration

## Task 10.1

* [ ] Publish Device Online

---

## Task 10.2

* [ ] Publish Device Offline

---

## Task 10.3

* [ ] Publish Parameter Changed

---

## Task 10.4

* [ ] Publish Task Completed

---

## Task 10.5

* [ ] Publish Fault Event

Acceptance Criteria

Semua event diteruskan ke Event Bus dan Socket Gateway.

---

# Epic 11 — Frontend

## Task 11.1

* [ ] GenieACS Device Detail

---

## Task 11.2

* [ ] Parameter Explorer

---

## Task 11.3

* [ ] Execute GenieACS Action

---

## Task 11.4

* [ ] Task History

---

## Task 11.5

* [ ] Device Refresh

---

# Epic 12 — Security

## Task 12.1

* [ ] Permission: genieacs:read

---

## Task 12.2

* [ ] Permission: genieacs:manage

---

## Task 12.3

* [ ] Audit GenieACS Action

---

# Epic 13 — Testing

Backend

* [ ] HTTP Client Test
* [ ] Device API Test
* [ ] Parameter API Test
* [ ] Task API Test
* [ ] Cache Test
* [ ] Error Mapping Test

Frontend

* [ ] Parameter Explorer Test
* [ ] Device Detail Test

---

# Deliverables

Setelah fase ini selesai:

* GenieACS terintegrasi penuh.
* Device dapat ditemukan dan dikelola.
* Parameter dapat dibaca dan diubah.
* Task GenieACS dapat dipantau.
* Preset dapat diterapkan.
* Firmware dan konfigurasi dapat dikelola.
* Event diteruskan ke Workflow Engine dan Dashboard.

---

# Acceptance Criteria

* [ ] HTTP Client stabil.
* [ ] Device Management berfungsi.
* [ ] Parameter Management berfungsi.
* [ ] Task Management berfungsi.
* [ ] Preset Management tersedia.
* [ ] Cache Redis aktif.
* [ ] Event Integration berjalan.
* [ ] Permission diterapkan.
* [ ] Unit dan integration test lulus.
* [ ] Dokumentasi diperbarui.

---

# Notes

* Seluruh komunikasi dengan GenieACS hanya dilakukan melalui `GenieACSService`.
* Workflow Engine tidak boleh mengakses REST API GenieACS secara langsung.
* Gunakan retry dan timeout untuk semua request.
* Semua operasi mutasi harus dicatat pada audit log.
* Mapping parameter TR-069 harus disentralisasi agar mudah mendukung berbagai vendor ONU.
* Ikuti spesifikasi pada `GENIEACS_INTEGRATION.md`, `WORKFLOW_ENGINE.md`, `SOCKET_EVENTS.md`, dan `VENDOR_MAPPING.md`.
