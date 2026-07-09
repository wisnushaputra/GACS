# 12 - Administration

**Phase:** Administration & System Management

**Status:** NOT STARTED

**Priority:** High

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
* ✅ 09-provisioning.md
* ✅ 10-monitoring.md
* ✅ 11-notification.md

---

# Objective

Membangun Administration Module sebagai pusat konfigurasi dan pengelolaan seluruh sistem BCMS.

Semua pengaturan sistem, integrasi, keamanan, workflow, dan operasional dikelola dari satu tempat dengan kontrol akses berbasis role dan permission.

---

# Scope

* User Management
* Role & Permission
* System Configuration
* OLT Management
* GenieACS Configuration
* Workflow Administration
* Notification Administration
* Scheduler
* Vendor Mapping
* Backup & Restore
* Audit & Logs
* System Health

---

# Epic 1 — User Management

## Task 1.1

* [ ] User List

---

## Task 1.2

* [ ] Create User

---

## Task 1.3

* [ ] Update User

---

## Task 1.4

* [ ] Reset Password

---

## Task 1.5

* [ ] Lock / Unlock User

---

## Task 1.6

* [ ] Delete User

Acceptance Criteria

Seluruh perubahan tercatat pada audit log.

---

# Epic 2 — Role & Permission

## Task 2.1

* [ ] Role CRUD

---

## Task 2.2

* [ ] Permission CRUD

---

## Task 2.3

* [ ] Assign Permission

---

## Task 2.4

* [ ] Clone Role

---

## Task 2.5

* [ ] Permission Matrix

Acceptance Criteria

RBAC dapat dikelola melalui antarmuka admin.

---

# Epic 3 — OLT Management

## Task 3.1

* [ ] Register OLT

---

## Task 3.2

* [ ] Edit OLT

---

## Task 3.3

* [ ] Test Connection

---

## Task 3.4

* [ ] Sync OLT Information

---

## Task 3.5

* [ ] Enable / Disable OLT

Acceptance Criteria

Konfigurasi OLT tervalidasi sebelum disimpan.

---

# Epic 4 — GenieACS Configuration

## Task 4.1

* [ ] Configure Endpoint

---

## Task 4.2

* [ ] API Authentication

---

## Task 4.3

* [ ] Connection Test

---

## Task 4.4

* [ ] Sync Presets

---

## Task 4.5

* [ ] Sync Virtual Parameters

Acceptance Criteria

Status koneksi GenieACS dapat dipantau dari halaman administrasi.

---

# Epic 5 — Workflow Administration

## Task 5.1

* [ ] Workflow Registry Viewer

---

## Task 5.2

* [ ] Enable / Disable Workflow

---

## Task 5.3

* [ ] Retry Policy Configuration

---

## Task 5.4

* [ ] Queue Monitoring

---

## Task 5.5

* [ ] Dead Letter Queue Viewer

Acceptance Criteria

Administrator dapat mengelola perilaku workflow tanpa mengubah kode.

---

# Epic 6 — Notification Administration

## Task 6.1

* [ ] Channel Configuration

---

## Task 6.2

* [ ] SMTP Configuration

---

## Task 6.3

* [ ] Telegram Bot Configuration

---

## Task 6.4

* [ ] WhatsApp Provider Configuration

---

## Task 6.5

* [ ] Webhook Configuration

Acceptance Criteria

Setiap channel dapat diuji melalui halaman admin.

---

# Epic 7 — Vendor Mapping

## Task 7.1

* [ ] Vendor List

---

## Task 7.2

* [ ] Parameter Mapping

---

## Task 7.3

* [ ] Command Mapping

---

## Task 7.4

* [ ] Import / Export Mapping

Acceptance Criteria

Mapping vendor dapat diperbarui tanpa deploy ulang aplikasi.

---

# Epic 8 — Scheduler

## Task 8.1

* [ ] Scheduled Jobs

---

## Task 8.2

* [ ] Cron Management

---

## Task 8.3

* [ ] Manual Trigger

---

## Task 8.4

* [ ] Execution History

Acceptance Criteria

Administrator dapat mengelola dan memantau pekerjaan terjadwal.

---

# Epic 9 — Backup & Restore

## Task 9.1

* [ ] Database Backup

---

## Task 9.2

* [ ] Configuration Backup

---

## Task 9.3

* [ ] Restore Wizard

---

## Task 9.4

* [ ] Backup Schedule

Acceptance Criteria

Backup dapat dijadwalkan dan dipulihkan dengan aman.

---

# Epic 10 — Audit & Logs

## Task 10.1

* [ ] Audit Log Viewer

---

## Task 10.2

* [ ] System Log Viewer

---

## Task 10.3

* [ ] API Log Viewer

---

## Task 10.4

* [ ] Search & Filter Logs

Acceptance Criteria

Administrator dapat menelusuri seluruh aktivitas sistem.

---

# Epic 11 — System Health

## Task 11.1

* [ ] PostgreSQL Health

---

## Task 11.2

* [ ] Redis Health

---

## Task 11.3

* [ ] GenieACS Health

---

## Task 11.4

* [ ] OLT Adapter Health

---

## Task 11.5

* [ ] Worker Health

---

## Task 11.6

* [ ] Disk Usage

---

## Task 11.7

* [ ] Memory Usage

Acceptance Criteria

Status seluruh komponen sistem dapat dipantau dari satu halaman.

---

# Epic 12 — Frontend

* [ ] User Management Page
* [ ] Role & Permission Page
* [ ] OLT Management Page
* [ ] GenieACS Settings Page
* [ ] Notification Settings Page
* [ ] Workflow Settings Page
* [ ] Scheduler Page
* [ ] Vendor Mapping Page
* [ ] Backup & Restore Page
* [ ] Audit Viewer
* [ ] System Health Dashboard

---

# Epic 13 — Security

## Task 13.1

* [ ] Super Admin Permission

---

## Task 13.2

* [ ] Configuration Audit

---

## Task 13.3

* [ ] Sensitive Data Encryption

---

## Task 13.4

* [ ] Secret Masking

Acceptance Criteria

Kredensial dan data sensitif tidak pernah ditampilkan secara penuh.

---

# Epic 14 — Testing

Backend

* [ ] User Management Test
* [ ] RBAC Test
* [ ] OLT Configuration Test
* [ ] GenieACS Configuration Test
* [ ] Scheduler Test
* [ ] Backup Test

Frontend

* [ ] Administration UI Test
* [ ] System Health Test
* [ ] Audit Viewer Test

---

# Deliverables

Setelah fase ini selesai:

* Administrasi pengguna tersedia.
* Role & Permission dapat dikelola.
* Konfigurasi OLT dan GenieACS tersedia.
* Workflow dan Scheduler dapat dikontrol.
* Notification channel dapat dikonfigurasi.
* Vendor Mapping dapat diperbarui.
* Backup & Restore tersedia.
* Audit log dan System Health dapat dipantau.

---

# Acceptance Criteria

* [ ] Semua modul administrasi berfungsi.
* [ ] RBAC diterapkan pada seluruh halaman.
* [ ] Konfigurasi tersimpan dengan aman.
* [ ] Backup & Restore berjalan.
* [ ] Audit log lengkap.
* [ ] System Health menampilkan status semua komponen.
* [ ] Unit, integration, dan end-to-end test lulus.
* [ ] Dokumentasi diperbarui.

---

# Notes

* Seluruh konfigurasi sistem harus disimpan dalam database dengan validasi yang ketat.
* Password, API Key, SSH Credential, dan Secret wajib dienkripsi saat disimpan.
* Semua perubahan konfigurasi harus menghasilkan audit log dan event untuk Notification Center bila diperlukan.
* Halaman administrasi hanya dapat diakses oleh role yang memiliki permission yang sesuai.
* Integrasikan modul ini dengan `WORKFLOW_ENGINE.md`, `OLT_ADAPTER.md`, `GENIEACS_INTEGRATION.md`, `VENDOR_MAPPING.md`, dan `AI_RULES.md`.
