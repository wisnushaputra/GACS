# 01 - Authentication

**Phase:** Core Security

**Status:** NOT STARTED

**Priority:** Critical

**Dependencies:**

* ✅ 00-project-setup.md

---

# Objective

Membangun sistem autentikasi dan otorisasi yang aman sebagai fondasi seluruh aplikasi BCMS.

Seluruh endpoint setelah fase ini harus menggunakan JWT Authentication dan Role Based Access Control (RBAC).

---

# Scope

Modul yang dikerjakan:

* Authentication
* Authorization
* User Management
* Role Management
* Permission Management
* Session Management
* Audit Login

---

# Epic 1 — Database

## Task 1.1

* [ ] Create users table

Acceptance Criteria

* UUID Primary Key
* Username
* Email
* Password Hash
* Status
* Created At
* Updated At

---

## Task 1.2

* [ ] Create roles table

Acceptance Criteria

* Admin
* NOC
* Technician
* Customer Service
* Viewer

---

## Task 1.3

* [ ] Create permissions table

Acceptance Criteria

Permission menggunakan format:

```text
module:action
```

Contoh

```text
customer:read
customer:create
customer:update
customer:delete

workflow:execute

olt:manage

genieacs:manage
```

---

## Task 1.4

* [ ] Create role_permissions table

Acceptance Criteria

Many-to-many relation.

---

## Task 1.5

* [ ] Create user_roles table

Acceptance Criteria

Many-to-many relation.

---

## Task 1.6

* [ ] Create refresh_tokens table

Acceptance Criteria

* Token Hash
* User
* Expired At
* Revoked At
* IP Address
* User Agent

---

## Task 1.7

* [ ] Create audit_login table

Acceptance Criteria

Menyimpan:

* Login
* Logout
* Failed Login
* Refresh Token

---

# Epic 2 — Repository

## Task 2.1

* [ ] User Repository

---

## Task 2.2

* [ ] Role Repository

---

## Task 2.3

* [ ] Permission Repository

---

## Task 2.4

* [ ] Refresh Token Repository

---

## Task 2.5

* [ ] Audit Repository

---

# Epic 3 — Backend Authentication

## Task 3.1

* [ ] Login API

```http
POST /api/v1/auth/login
```

---

## Task 3.2

* [ ] Refresh Token API

```http
POST /api/v1/auth/refresh
```

---

## Task 3.3

* [ ] Logout API

```http
POST /api/v1/auth/logout
```

---

## Task 3.4

* [ ] Current User API

```http
GET /api/v1/auth/me
```

---

## Task 3.5

* [ ] Change Password API

---

## Task 3.6

* [ ] Reset Password API (Admin)

---

# Epic 4 — JWT

## Task 4.1

* [ ] Access Token

Acceptance Criteria

* JWT
* 15 menit

---

## Task 4.2

* [ ] Refresh Token

Acceptance Criteria

* 7 hari

---

## Task 4.3

* [ ] JWT Middleware

Acceptance Criteria

Seluruh endpoint private terlindungi.

---

# Epic 5 — Authorization

## Task 5.1

* [ ] Role Middleware

---

## Task 5.2

* [ ] Permission Middleware

---

## Task 5.3

* [ ] Route Protection

Acceptance Criteria

Permission diperiksa sebelum Controller dijalankan.

---

# Epic 6 — User Management

## Task 6.1

* [ ] List User

---

## Task 6.2

* [ ] Create User

---

## Task 6.3

* [ ] Update User

---

## Task 6.4

* [ ] Delete User

---

## Task 6.5

* [ ] Assign Role

---

## Task 6.6

* [ ] Enable / Disable User

---

# Epic 7 — Role Management

## Task 7.1

* [ ] List Role

---

## Task 7.2

* [ ] Create Role

---

## Task 7.3

* [ ] Update Role

---

## Task 7.4

* [ ] Delete Role

---

## Task 7.5

* [ ] Assign Permission

---

# Epic 8 — Permission Management

## Task 8.1

* [ ] List Permission

---

## Task 8.2

* [ ] Seeder Default Permission

---

## Task 8.3

* [ ] Permission Cache

Acceptance Criteria

Permission disimpan di Redis untuk mempercepat otorisasi.

---

# Epic 9 — Frontend

## Task 9.1

* [ ] Login Page

---

## Task 9.2

* [ ] Protected Route

---

## Task 9.3

* [ ] Auth Store (Zustand)

---

## Task 9.4

* [ ] Auth API Service

---

## Task 9.5

* [ ] Login Form Validation

---

## Task 9.6

* [ ] User Profile Menu

---

## Task 9.7

* [ ] Logout Button

---

# Epic 10 — Session

## Task 10.1

* [ ] Session Tracking

---

## Task 10.2

* [ ] Revoke Session

---

## Task 10.3

* [ ] Auto Refresh Token

---

## Task 10.4

* [ ] Auto Logout

Acceptance Criteria

Jika refresh token tidak valid, pengguna otomatis keluar.

---

# Epic 11 — Audit

## Task 11.1

* [ ] Login Audit

---

## Task 11.2

* [ ] Logout Audit

---

## Task 11.3

* [ ] Failed Login Audit

---

## Task 11.4

* [ ] Password Change Audit

---

# Epic 12 — Testing

## Backend

* [ ] Authentication Service Test
* [ ] JWT Middleware Test
* [ ] RBAC Test
* [ ] Repository Test

---

## Frontend

* [ ] Login Page Test
* [ ] Protected Route Test
* [ ] Auth Store Test

---

# Deliverables

Setelah fase ini selesai:

* Login berfungsi.
* Logout berfungsi.
* Refresh Token berfungsi.
* RBAC aktif.
* Permission aktif.
* CRUD User tersedia.
* CRUD Role tersedia.
* CRUD Permission tersedia.
* Session Management aktif.
* Audit Login aktif.
* Frontend memiliki halaman login.
* Protected Route aktif.
* Seluruh endpoint private terlindungi JWT.

---

# Acceptance Criteria

Fase Authentication dianggap selesai apabila:

* [ ] JWT Authentication aktif.
* [ ] Refresh Token berjalan.
* [ ] Role Based Access Control aktif.
* [ ] Permission Based Access Control aktif.
* [ ] CRUD User selesai.
* [ ] CRUD Role selesai.
* [ ] CRUD Permission selesai.
* [ ] Audit Login tersedia.
* [ ] Session Management berjalan.
* [ ] Login UI selesai.
* [ ] Unit test lulus.
* [ ] Dokumentasi diperbarui.

---

# Notes

* Password harus menggunakan bcrypt/Argon2 (sesuai keputusan teknis proyek).
* Password tidak boleh dicatat pada log.
* Refresh token disimpan dalam bentuk hash.
* Endpoint autentikasi menerapkan rate limiting.
* Seluruh input divalidasi menggunakan Zod.
* Semua response mengikuti standar API pada `API_SPEC.md`.
