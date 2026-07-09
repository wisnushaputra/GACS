# 09 - Provisioning

**Phase:** Service Provisioning

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
* ✅ 08-olt-adapter.md

---

# Objective

Membangun seluruh proses provisioning layanan broadband secara end-to-end menggunakan Workflow Engine.

Seluruh provisioning harus dapat dipantau secara realtime, memiliki histori, mendukung retry/rollback, dan menghasilkan audit log lengkap.

---

# Scope

* Register ONU
* Replace ONU
* Push PPPoE
* Push WiFi
* Push VLAN
* Push Service Profile
* Push Line Profile
* Factory Reset
* Reboot ONU
* Discovery ONU
* Batch Provisioning

---

# Epic 1 — Register ONU

## Task 1.1

* [ ] Validasi Customer

---

## Task 1.2

* [ ] Validasi OLT

---

## Task 1.3

* [ ] Cari PON Port

---

## Task 1.4

* [ ] Cari ONU ID Kosong

---

## Task 1.5

* [ ] Registrasi ONU melalui OLT Adapter

---

## Task 1.6

* [ ] Sinkronisasi ke GenieACS

---

## Task 1.7

* [ ] Push Line Profile

---

## Task 1.8

* [ ] Push Service Profile

---

## Task 1.9

* [ ] Push VLAN

---

## Task 1.10

* [ ] Push PPPoE

---

## Task 1.11

* [ ] Push WiFi SSID & Password

---

## Task 1.12

* [ ] Refresh Parameter

---

## Task 1.13

* [ ] Simpan ke Database

---

## Task 1.14

* [ ] Publish Event

Acceptance Criteria

ONU berhasil terdaftar dan muncul pada dashboard.

---

# Epic 2 — Replace ONU

## Task 2.1

* [ ] Validasi Customer

---

## Task 2.2

* [ ] Backup Konfigurasi Lama

---

## Task 2.3

* [ ] Hapus ONU Lama

---

## Task 2.4

* [ ] Registrasi ONU Baru

---

## Task 2.5

* [ ] Restore Konfigurasi

---

## Task 2.6

* [ ] Sinkronisasi Database

---

## Task 2.7

* [ ] Publish Event

Acceptance Criteria

Penggantian ONU tidak mengubah konfigurasi layanan pelanggan.

---

# Epic 3 — Push PPPoE

## Task 3.1

* [ ] Validasi Akun PPPoE

---

## Task 3.2

* [ ] Push Username

---

## Task 3.3

* [ ] Push Password

---

## Task 3.4

* [ ] Verifikasi WAN

---

## Task 3.5

* [ ] Simpan Histori

Acceptance Criteria

Status WAN berubah menjadi Connected setelah provisioning berhasil.

---

# Epic 4 — Push WiFi

## Task 4.1

* [ ] Push SSID

---

## Task 4.2

* [ ] Push Password

---

## Task 4.3

* [ ] Push Encryption Mode

---

## Task 4.4

* [ ] Push Channel

---

## Task 4.5

* [ ] Verifikasi Parameter

---

# Epic 5 — Profile Provisioning

## Task 5.1

* [ ] Push Line Profile

---

## Task 5.2

* [ ] Push Service Profile

---

## Task 5.3

* [ ] Push DBA Profile

---

## Task 5.4

* [ ] Push VLAN Profile

Acceptance Criteria

Profil yang diterapkan sesuai master data.

---

# Epic 6 — Device Actions

## Task 6.1

* [ ] Reboot ONU

---

## Task 6.2

* [ ] Factory Reset

---

## Task 6.3

* [ ] Refresh Parameter

---

## Task 6.4

* [ ] Refresh Optical Information

---

## Task 6.5

* [ ] Refresh Device Information

---

# Epic 7 — Batch Provisioning

## Task 7.1

* [ ] Upload CSV

---

## Task 7.2

* [ ] Validasi Data

---

## Task 7.3

* [ ] Queue Batch Job

---

## Task 7.4

* [ ] Progress Tracking

---

## Task 7.5

* [ ] Error Report

Acceptance Criteria

Batch provisioning dapat memproses banyak ONU secara bertahap tanpa menghentikan proses lain.

---

# Epic 8 — Frontend

## Register ONU

* [ ] Wizard Register ONU

---

## Replace ONU

* [ ] Replace ONU Wizard

---

## PPPoE

* [ ] PPPoE Form

---

## WiFi

* [ ] WiFi Form

---

## Batch

* [ ] Batch Upload Page

---

## Progress

* [ ] Workflow Progress Dialog

---

# Epic 9 — Realtime

## Task 9.1

* [ ] Register Progress

---

## Task 9.2

* [ ] Replace Progress

---

## Task 9.3

* [ ] Batch Progress

---

## Task 9.4

* [ ] Live Result Notification

Acceptance Criteria

Operator dapat melihat progres provisioning secara realtime melalui Socket.IO.

---

# Epic 10 — Validation

## Task 10.1

* [ ] Duplicate Serial Number Validation

---

## Task 10.2

* [ ] Duplicate PPPoE Validation

---

## Task 10.3

* [ ] OLT Capacity Validation

---

## Task 10.4

* [ ] PON Capacity Validation

---

## Task 10.5

* [ ] Profile Compatibility Validation

Acceptance Criteria

Kesalahan divalidasi sebelum workflow dijalankan.

---

# Epic 11 — Audit

## Task 11.1

* [ ] Provisioning Audit

---

## Task 11.2

* [ ] Workflow Audit

---

## Task 11.3

* [ ] User Audit

---

## Task 11.4

* [ ] Device Audit

Acceptance Criteria

Semua aksi provisioning dapat ditelusuri.

---

# Epic 12 — Testing

Backend

* [ ] Register ONU Workflow Test
* [ ] Replace ONU Workflow Test
* [ ] PPPoE Provisioning Test
* [ ] WiFi Provisioning Test
* [ ] Batch Provisioning Test

Frontend

* [ ] Register Wizard Test
* [ ] Replace Wizard Test
* [ ] Batch Upload Test

---

# Deliverables

Setelah fase ini selesai:

* Register ONU berjalan end-to-end.
* Replace ONU berjalan tanpa kehilangan konfigurasi.
* PPPoE dapat dipush ke ONU.
* WiFi dapat dikonfigurasi.
* Profile dapat diterapkan.
* Batch provisioning tersedia.
* Progress provisioning tampil secara realtime.
* Histori dan audit provisioning tersedia.

---

# Acceptance Criteria

* [ ] Semua workflow provisioning berjalan melalui Workflow Engine.
* [ ] OLT Adapter digunakan untuk operasi OLT.
* [ ] GenieACS digunakan untuk konfigurasi perangkat.
* [ ] Dashboard menerima update setelah provisioning selesai.
* [ ] Socket.IO menampilkan progres secara realtime.
* [ ] Retry dan rollback bekerja.
* [ ] Audit log lengkap.
* [ ] Unit, integration, dan end-to-end test lulus.
* [ ] Dokumentasi diperbarui.

---

# Notes

* Tidak ada proses provisioning yang boleh dipanggil langsung dari controller.
* Seluruh operasi harus melalui `Workflow Engine`.
* Interaksi dengan OLT dilakukan melalui `OLT Adapter`.
* Interaksi dengan TR-069 dilakukan melalui `GenieACSService`.
* Setiap workflow harus memiliki `Correlation ID`, status, histori langkah, dan mekanisme retry.
* Semua payload harus divalidasi menggunakan Zod sebelum workflow dimulai.
* Seluruh event provisioning mengikuti kontrak pada `SOCKET_EVENTS.md` dan seluruh operasi harus tercatat pada `audit_logs`.
