# 02 - Master Data

**Phase:** Core Data

**Status:** NOT STARTED

**Priority:** High

**Dependencies:**

* ✅ 00-project-setup.md
* ✅ 01-authentication.md

---

# Objective

Membangun seluruh master data yang menjadi fondasi operasional BCMS.

Semua data harus sudah dapat dikelola melalui API dan antarmuka web, serta siap digunakan oleh Workflow Engine, GenieACS Integration, dan OLT Adapter.

---

# Scope

Modul yang dikerjakan:

* Customer
* OLT
* PON Port
* ONU
* Vendor
* Profile
* Region
* POP
* VLAN
* Service Profile

---

# Epic 1 — Customer

## Task 1.1

* [ ] Create Customer Database Schema

Acceptance Criteria

* UUID
* Customer Code
* Full Name
* Identity Number (Opsional)
* Phone
* Email
* Address
* Region
* POP
* Status
* Created At
* Updated At

---

## Task 1.2

* [ ] Customer Repository

---

## Task 1.3

* [ ] Customer Service

---

## Task 1.4

* [ ] Customer CRUD API

Endpoints

```http
GET    /api/v1/customers
GET    /api/v1/customers/:id
POST   /api/v1/customers
PUT    /api/v1/customers/:id
DELETE /api/v1/customers/:id
```

---

## Task 1.5

* [ ] Customer Search

Acceptance Criteria

Search berdasarkan:

* Customer Code
* Nama
* Nomor Telepon
* Serial ONU

---

## Task 1.6

* [ ] Pagination

---

## Task 1.7

* [ ] Customer Detail Page

---

# Epic 2 — OLT

## Task 2.1

* [ ] OLT Database Schema

Acceptance Criteria

* Name
* Vendor
* Model
* IP Address
* Port
* Username
* Encrypted Password
* Transport
* Status
* Region
* POP

---

## Task 2.2

* [ ] OLT CRUD API

---

## Task 2.3

* [ ] OLT Connection Test

Acceptance Criteria

Pengguna dapat menguji koneksi ke OLT sebelum disimpan.

---

## Task 2.4

* [ ] Encrypt Credential

Acceptance Criteria

Password OLT tidak disimpan dalam bentuk plain text.

---

## Task 2.5

* [ ] OLT Detail Page

---

# Epic 3 — PON Port

## Task 3.1

* [ ] PON Port Schema

---

## Task 3.2

* [ ] Generate Default PON Port

Acceptance Criteria

Saat OLT dibuat, sistem dapat membuat daftar PON berdasarkan konfigurasi OLT (misalnya 16/32/64 port).

---

## Task 3.3

* [ ] PON Port API

---

## Task 3.4

* [ ] PON Port Utilization

Acceptance Criteria

Menampilkan jumlah ONU terpakai dan slot yang masih tersedia.

---

# Epic 4 — ONU

## Task 4.1

* [ ] ONU Database Schema

Acceptance Criteria

* Serial Number
* Vendor
* Model
* Firmware
* Status
* RX Power
* TX Power
* Temperature
* Bias Current
* Voltage
* Customer
* OLT
* PON Port

---

## Task 4.2

* [ ] ONU CRUD API

---

## Task 4.3

* [ ] ONU Search

Acceptance Criteria

Pencarian berdasarkan:

* Serial Number
* Customer
* Vendor
* OLT
* Status

---

## Task 4.4

* [ ] ONU Detail Page

---

## Task 4.5

* [ ] ONU Status Badge

Status

* Online
* Offline
* LOS
* Dying Gasp
* Disabled
* Unknown

---

# Epic 5 — Vendor

## Task 5.1

* [ ] Vendor Schema

---

## Task 5.2

* [ ] Vendor Seeder

Acceptance Criteria

Vendor bawaan:

* Huawei
* ZTE
* Fiberhome
* VSOL
* Nokia
* Raisecom

---

## Task 5.3

* [ ] Vendor Management API

---

# Epic 6 — Service Profile

## Task 6.1

* [ ] Line Profile Schema

---

## Task 6.2

* [ ] Service Profile Schema

---

## Task 6.3

* [ ] DBA Profile Schema

---

## Task 6.4

* [ ] VLAN Profile Schema

---

## Task 6.5

* [ ] CRUD Profile

Acceptance Criteria

Profile dapat dipilih saat workflow Register ONU.

---

# Epic 7 — Region & POP

## Task 7.1

* [ ] Region Schema

---

## Task 7.2

* [ ] POP Schema

---

## Task 7.3

* [ ] Region CRUD

---

## Task 7.4

* [ ] POP CRUD

---

## Task 7.5

* [ ] Mapping OLT ke POP

---

# Epic 8 — Frontend

## Customer

* [ ] Customer List
* [ ] Customer Detail
* [ ] Customer Form

---

## OLT

* [ ] OLT List
* [ ] OLT Detail
* [ ] OLT Form

---

## ONU

* [ ] ONU List
* [ ] ONU Detail
* [ ] ONU Form

---

## Profile

* [ ] Profile List
* [ ] Profile Form

---

# Epic 9 — Validation

## Task 9.1

* [ ] Zod Validation

---

## Task 9.2

* [ ] Duplicate Customer Validation

---

## Task 9.3

* [ ] Duplicate OLT Validation

---

## Task 9.4

* [ ] Duplicate ONU Validation

Acceptance Criteria

Serial Number ONU harus unik.

---

# Epic 10 — Testing

Backend

* [ ] Repository Test
* [ ] Service Test
* [ ] API Test

---

Frontend

* [ ] Customer Page Test
* [ ] OLT Page Test
* [ ] ONU Page Test

---

# Deliverables

Setelah fase ini selesai:

* CRUD Customer tersedia.
* CRUD OLT tersedia.
* CRUD ONU tersedia.
* CRUD Vendor tersedia.
* CRUD Profile tersedia.
* CRUD Region & POP tersedia.
* PON Port dapat dikelola.
* API terdokumentasi.
* Frontend siap digunakan untuk administrasi data master.

---

# Acceptance Criteria

Fase Master Data dianggap selesai apabila:

* [ ] Seluruh tabel master telah dibuat.
* [ ] Seluruh migration berhasil dijalankan.
* [ ] Semua endpoint CRUD berfungsi.
* [ ] Validasi data aktif.
* [ ] Pencarian dan pagination tersedia.
* [ ] Frontend dapat mengelola seluruh master data.
* [ ] Unit test dan integration test lulus.
* [ ] Dokumentasi diperbarui.

---

# Notes

* Semua endpoint harus menggunakan JWT dan Permission Middleware.
* Gunakan soft delete untuk Customer, OLT, dan ONU jika sesuai kebutuhan operasional.
* Password OLT harus dienkripsi sebelum disimpan.
* Semua response mengikuti `API_SPEC.md`.
* Struktur database harus tetap mengacu pada `DATABASE.md`.
* Mapping vendor harus mengikuti `VENDOR_MAPPING.md`.
