# 08 - OLT Adapter

**Phase:** OLT Integration Layer

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
* ✅ 07-genieacs.md

---

# Objective

Membangun OLT Adapter Layer sebagai abstraksi komunikasi dengan berbagai vendor OLT.

Seluruh operasi terhadap Huawei, ZTE, FiberHome, VSOL, Nokia, dan vendor lainnya dilakukan melalui interface yang sama sehingga Workflow Engine dan service bisnis tidak bergantung pada implementasi vendor tertentu.

---

# Scope

* Adapter Interface
* Adapter Registry
* Vendor Factory
* CLI Engine
* SSH/Telnet Transport
* SNMP Client
* Command Parser
* Event Bridge
* Configuration Backup
* Health Monitoring

---

# Epic 1 — Adapter Core

## Task 1.1

* [ ] Create OLT Adapter Interface

Acceptance Criteria

Seluruh adapter mengimplementasikan interface yang sama.

---

## Task 1.2

* [ ] Create Adapter Registry

---

## Task 1.3

* [ ] Create Adapter Factory

---

## Task 1.4

* [ ] Auto Detect Vendor

---

## Task 1.5

* [ ] Dependency Injection

Acceptance Criteria

Adapter dipilih otomatis berdasarkan vendor OLT.

---

# Epic 2 — Transport Layer

## Task 2.1

* [ ] SSH Client

---

## Task 2.2

* [ ] Telnet Client

---

## Task 2.3

* [ ] SNMP Client

---

## Task 2.4

* [ ] Connection Pool

---

## Task 2.5

* [ ] Connection Retry

---

## Task 2.6

* [ ] Session Management

Acceptance Criteria

Koneksi dapat digunakan ulang untuk meningkatkan performa.

---

# Epic 3 — Common Operations

## Task 3.1

* [ ] Test Connection

---

## Task 3.2

* [ ] Get System Information

---

## Task 3.3

* [ ] Get OLT Status

---

## Task 3.4

* [ ] Get PON Port Information

---

## Task 3.5

* [ ] Get ONU List

---

## Task 3.6

* [ ] Get ONU Detail

---

## Task 3.7

* [ ] Get Optical Information

Acceptance Criteria

Semua vendor mengembalikan format data yang sama.

---

# Epic 4 — ONU Provisioning

## Task 4.1

* [ ] Register ONU

---

## Task 4.2

* [ ] Delete ONU

---

## Task 4.3

* [ ] Replace ONU

---

## Task 4.4

* [ ] Enable ONU

---

## Task 4.5

* [ ] Disable ONU

---

## Task 4.6

* [ ] Reboot ONU

Acceptance Criteria

Workflow Engine cukup memanggil Adapter Interface tanpa mengetahui vendor.

---

# Epic 5 — Configuration

## Task 5.1

* [ ] Push Line Profile

---

## Task 5.2

* [ ] Push Service Profile

---

## Task 5.3

* [ ] Push VLAN

---

## Task 5.4

* [ ] Push DBA Profile

---

## Task 5.5

* [ ] Remove Configuration

---

# Epic 6 — Monitoring

## Task 6.1

* [ ] Read Optical Power

---

## Task 6.2

* [ ] Read Temperature

---

## Task 6.3

* [ ] Read Voltage

---

## Task 6.4

* [ ] Read Bias Current

---

## Task 6.5

* [ ] Read ONU Status

---

## Task 6.6

* [ ] Read Alarm

Acceptance Criteria

Data dipetakan ke format internal BCMS.

---

# Epic 7 — Vendor Adapter

## Huawei

* [ ] Huawei Adapter
* [ ] Huawei CLI Parser

---

## ZTE

* [ ] ZTE Adapter
* [ ] ZTE CLI Parser

---

## FiberHome

* [ ] FiberHome Adapter
* [ ] FiberHome CLI Parser

---

## VSOL

* [ ] VSOL Adapter
* [ ] VSOL CLI Parser

---

## Nokia

* [ ] Nokia Adapter
* [ ] Nokia CLI Parser

Acceptance Criteria

Setiap adapter mengimplementasikan kontrak yang sama.

---

# Epic 8 — Event Bridge

## Task 8.1

* [ ] Device Online Event

---

## Task 8.2

* [ ] Device Offline Event

---

## Task 8.3

* [ ] LOS Event

---

## Task 8.4

* [ ] Dying Gasp Event

---

## Task 8.5

* [ ] Optical Update Event

Acceptance Criteria

Semua event diteruskan ke Event Bus.

---

# Epic 9 — Backup & Restore

## Task 9.1

* [ ] Configuration Backup

---

## Task 9.2

* [ ] Configuration Restore

---

## Task 9.3

* [ ] Scheduled Backup

---

# Epic 10 — Frontend

## Task 10.1

* [ ] OLT Detail Page

---

## Task 10.2

* [ ] ONU Discovery

---

## Task 10.3

* [ ] Optical Information

---

## Task 10.4

* [ ] OLT Health

---

## Task 10.5

* [ ] Connection Test UI

---

# Epic 11 — Security

## Task 11.1

* [ ] Permission: olt:read

---

## Task 11.2

* [ ] Permission: olt:manage

---

## Task 11.3

* [ ] Credential Encryption

---

## Task 11.4

* [ ] Audit OLT Command

Acceptance Criteria

Seluruh eksekusi perintah tercatat pada audit log.

---

# Epic 12 — Testing

Backend

* [ ] Adapter Interface Test
* [ ] Huawei Adapter Test
* [ ] ZTE Adapter Test
* [ ] FiberHome Adapter Test
* [ ] VSOL Adapter Test
* [ ] Nokia Adapter Test
* [ ] Parser Test
* [ ] Transport Layer Test

Frontend

* [ ] OLT Detail Test
* [ ] Discovery Test
* [ ] Optical Information Test

---

# Deliverables

Setelah fase ini selesai:

* Semua vendor OLT didukung melalui interface yang seragam.
* Operasi provisioning dapat dijalankan tanpa mengetahui vendor.
* Monitoring OLT dan ONU tersedia.
* Event diteruskan ke Workflow Engine dan Dashboard.
* Konfigurasi dapat dibackup dan dipulihkan.

---

# Acceptance Criteria

* [ ] Adapter Interface selesai.
* [ ] Registry dan Factory aktif.
* [ ] Transport Layer stabil.
* [ ] Minimal lima vendor didukung.
* [ ] Monitoring berjalan.
* [ ] Provisioning berjalan.
* [ ] Event Bridge aktif.
* [ ] Backup & Restore berfungsi.
* [ ] Unit dan integration test lulus.
* [ ] Dokumentasi diperbarui.

---

# Notes

* Seluruh implementasi harus mengikuti `OLT_ADAPTER.md`, `ADAPTER_ARCHITECTURE.md`, dan `VENDOR_MAPPING.md`.
* Jangan pernah memanggil SSH/Telnet/SNMP langsung dari controller atau service bisnis; semua akses harus melalui Adapter Interface.
* Gunakan parser terpisah untuk setiap vendor agar perubahan format CLI tidak memengaruhi modul lain.
* Simpan kredensial OLT dalam bentuk terenkripsi dan gunakan connection pool untuk mengurangi overhead koneksi.
* Semua operasi mutasi (register, replace, delete ONU, perubahan profil) harus dijalankan melalui `Workflow Engine`.
