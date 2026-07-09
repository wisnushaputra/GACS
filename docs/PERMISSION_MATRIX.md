# PERMISSION_MATRIX.md

# BCMS Permission Matrix

Version: 1.0

---

# Overview

BCMS menggunakan **Role-Based Access Control (RBAC)** dengan pendekatan **Permission First**.

Struktur:

```text
User
   │
   ▼
Role
   │
   ▼
Permissions
   │
   ▼
Application Features
```

Role hanyalah kumpulan permission.

Seluruh validasi akses dilakukan berdasarkan permission, bukan nama role.

---

# Permission Naming Convention

Gunakan format berikut.

```text
module.resource.action
```

Contoh:

```text
customer.read

customer.create

customer.update

customer.delete

onu.register

onu.replace

workflow.execute

monitoring.view

notification.send
```

Gunakan huruf kecil dan pemisah titik (`.`).

---

# CRUD Permission Standard

Semua module minimal memiliki permission berikut.

```text
read

create

update

delete
```

Jika diperlukan:

```text
export

import

approve

execute

retry

rollback

assign

acknowledge

resolve
```

---

# Modules

BCMS memiliki module berikut.

* Dashboard
* Customer
* Subscription
* ONU
* OLT
* Vendor Mapping
* Workflow
* Monitoring
* Notification
* Alarm
* Report
* User
* Role
* System Settings
* Audit Log

---

# Permission List

## Dashboard

```text
dashboard.view
```

---

## Customer

```text
customer.read

customer.create

customer.update

customer.delete

customer.export

customer.import
```

---

## Subscription

```text
subscription.read

subscription.create

subscription.update

subscription.delete

subscription.activate

subscription.suspend

subscription.terminate
```

---

## ONU

```text
onu.read

onu.register

onu.replace

onu.delete

onu.reboot

onu.factory_reset

onu.push_pppoe

onu.push_wifi

onu.refresh

onu.sync
```

---

## OLT

```text
olt.read

olt.create

olt.update

olt.delete

olt.connect

olt.disconnect

olt.backup

olt.restore

olt.command.execute
```

---

## Workflow

```text
workflow.read

workflow.execute

workflow.retry

workflow.rollback

workflow.cancel
```

---

## Monitoring

```text
monitoring.view

monitoring.refresh

monitoring.export
```

---

## Alarm

```text
alarm.read

alarm.acknowledge

alarm.resolve

alarm.export
```

---

## Notification

```text
notification.read

notification.send

notification.delete
```

---

## Report

```text
report.read

report.generate

report.export
```

---

## User

```text
user.read

user.create

user.update

user.delete

user.reset_password
```

---

## Role

```text
role.read

role.create

role.update

role.delete
```

---

## System

```text
system.read

system.update

system.backup

system.restore
```

---

## Audit

```text
audit.read

audit.export
```

---

# Default Roles

BCMS menyediakan role bawaan berikut.

* Super Admin
* Administrator
* NOC
* Provisioning
* Technician
* Helpdesk
* Viewer

Role dapat disesuaikan sesuai kebutuhan organisasi.

---

# Permission Matrix

| Permission            | Super Admin | Administrator | NOC | Provisioning | Technician | Helpdesk | Viewer |
| --------------------- | :---------: | :-----------: | :-: | :----------: | :--------: | :------: | :----: |
| dashboard.view        |      ✅      |       ✅       |  ✅  |       ✅      |      ✅     |     ✅    |    ✅   |
| customer.read         |      ✅      |       ✅       |  ✅  |       ✅      |      ✅     |     ✅    |    ✅   |
| customer.create       |      ✅      |       ✅       |  ❌  |       ✅      |      ❌     |     ❌    |    ❌   |
| customer.update       |      ✅      |       ✅       |  ❌  |       ✅      |      ❌     |     ✅    |    ❌   |
| customer.delete       |      ✅      |       ✅       |  ❌  |       ❌      |      ❌     |     ❌    |    ❌   |
| subscription.activate |      ✅      |       ✅       |  ❌  |       ✅      |      ❌     |     ❌    |    ❌   |
| subscription.suspend  |      ✅      |       ✅       |  ✅  |       ✅      |      ❌     |     ✅    |    ❌   |
| onu.register          |      ✅      |       ✅       |  ❌  |       ✅      |      ✅     |     ❌    |    ❌   |
| onu.replace           |      ✅      |       ✅       |  ❌  |       ✅      |      ✅     |     ❌    |    ❌   |
| onu.reboot            |      ✅      |       ✅       |  ✅  |       ✅      |      ✅     |     ❌    |    ❌   |
| onu.factory_reset     |      ✅      |       ✅       |  ❌  |       ✅      |      ✅     |     ❌    |    ❌   |
| onu.push_pppoe        |      ✅      |       ✅       |  ❌  |       ✅      |      ✅     |     ❌    |    ❌   |
| onu.push_wifi         |      ✅      |       ✅       |  ❌  |       ✅      |      ✅     |     ❌    |    ❌   |
| workflow.execute      |      ✅      |       ✅       |  ❌  |       ✅      |      ❌     |     ❌    |    ❌   |
| workflow.retry        |      ✅      |       ✅       |  ❌  |       ✅      |      ❌     |     ❌    |    ❌   |
| workflow.rollback     |      ✅      |       ✅       |  ❌  |       ✅      |      ❌     |     ❌    |    ❌   |
| monitoring.view       |      ✅      |       ✅       |  ✅  |       ✅      |      ✅     |     ✅    |    ✅   |
| monitoring.refresh    |      ✅      |       ✅       |  ✅  |       ✅      |      ✅     |     ❌    |    ❌   |
| alarm.acknowledge     |      ✅      |       ✅       |  ✅  |       ❌      |      ❌     |     ❌    |    ❌   |
| alarm.resolve         |      ✅      |       ✅       |  ✅  |       ❌      |      ❌     |     ❌    |    ❌   |
| report.generate       |      ✅      |       ✅       |  ✅  |       ✅      |      ❌     |     ❌    |    ❌   |
| report.export         |      ✅      |       ✅       |  ✅  |       ✅      |      ❌     |     ❌    |    ❌   |
| user.create           |      ✅      |       ✅       |  ❌  |       ❌      |      ❌     |     ❌    |    ❌   |
| user.update           |      ✅      |       ✅       |  ❌  |       ❌      |      ❌     |     ❌    |    ❌   |
| user.delete           |      ✅      |       ❌       |  ❌  |       ❌      |      ❌     |     ❌    |    ❌   |
| role.update           |      ✅      |       ❌       |  ❌  |       ❌      |      ❌     |     ❌    |    ❌   |
| system.update         |      ✅      |       ❌       |  ❌  |       ❌      |      ❌     |     ❌    |    ❌   |
| system.backup         |      ✅      |       ✅       |  ❌  |       ❌      |      ❌     |     ❌    |    ❌   |
| audit.read            |      ✅      |       ✅       |  ✅  |       ❌      |      ❌     |     ❌    |    ❌   |

---

# Backend Enforcement

Semua endpoint harus memeriksa permission.

Contoh:

```text
POST /api/v1/onu/register

Required Permission:

onu.register
```

Controller tidak boleh hanya memeriksa role.

---

# Frontend Enforcement

Frontend menggunakan permission untuk:

* Menampilkan menu.
* Menampilkan tombol.
* Mengaktifkan aksi.
* Menentukan akses halaman.

Contoh:

```text
Permission:

onu.replace

↓

Button Replace ONU

Visible
```

Jika tidak memiliki permission:

* Tombol disembunyikan atau dinonaktifkan sesuai pedoman UI.
* Backend tetap melakukan validasi sebagai sumber kebenaran.

---

# Workflow Permission

Workflow tertentu memerlukan permission khusus.

Contoh:

```text
workflow.execute

workflow.rollback

workflow.retry
```

---

# API Mapping

Contoh:

| Endpoint               | Permission       |
| ---------------------- | ---------------- |
| GET /customers         | customer.read    |
| POST /customers        | customer.create  |
| PUT /customers/:id     | customer.update  |
| DELETE /customers/:id  | customer.delete  |
| POST /onu/register     | onu.register     |
| POST /onu/replace      | onu.replace      |
| POST /workflow/execute | workflow.execute |

---

# Audit

Perubahan berikut wajib diaudit:

* Role Assignment
* Permission Assignment
* Role Update
* Permission Update

---

# Future Extension

Mendukung:

* Custom Role
* Dynamic Permission
* Feature Toggle
* Tenant-specific Permission (jika multi-tenant diterapkan)

---

# AI Coding Rules

AI wajib mengikuti aturan berikut:

1. Validasi akses berdasarkan permission, bukan nama role.
2. Gunakan format `module.resource.action`.
3. Backend selalu menjadi sumber kebenaran untuk otorisasi.
4. Frontend menggunakan permission untuk mengatur tampilan UI, bukan sebagai mekanisme keamanan utama.
5. Jangan melakukan hardcode nama role pada business logic.
6. Semua endpoint memiliki permission yang terdokumentasi.
7. Semua perubahan role dan permission dicatat pada Audit Log.
8. Permission baru harus mengikuti konvensi penamaan yang sama.
9. Gunakan middleware atau guard untuk pemeriksaan permission.
10. Role adalah kumpulan permission yang dapat dikonfigurasi.

---

# Summary

BCMS menerapkan RBAC berbasis **Permission First**, di mana setiap fitur dan endpoint dipetakan ke permission yang spesifik. Role hanya berfungsi sebagai kumpulan permission, sehingga sistem lebih fleksibel, mudah dikembangkan, dan konsisten antara backend, frontend, Workflow Engine, serta Audit Log.
