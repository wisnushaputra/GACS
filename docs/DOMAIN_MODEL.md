# DOMAIN_MODEL.md

# BCMS Domain Model

Version: 1.0

---

# Overview

BCMS (Broadband Customer Management System) dibangun menggunakan pendekatan **Domain-Driven Design (DDD)**.

Dokumen ini mendefinisikan:

* Ubiquitous Language
* Bounded Context
* Aggregate Root
* Entity
* Value Object
* Domain Event
* Business Rules
* Relationship antar domain

Tujuan utamanya adalah memastikan seluruh developer menggunakan istilah dan model bisnis yang sama.

---

# High Level Domain

```text
                    BCMS
                      │
 ┌────────────────────┼────────────────────┐
 │                    │                    │
 ▼                    ▼                    ▼
 Customer         Infrastructure      Provisioning
 │                    │                    │
 ▼                    ▼                    ▼
 Monitoring      Workflow Engine     Notification
 │                    │                    │
 └────────────────────┼────────────────────┘
                      ▼
              Administration
```

---

# Bounded Context

BCMS dibagi menjadi beberapa bounded context.

| Context        | Responsibility                   |
| -------------- | -------------------------------- |
| Customer       | Data pelanggan & layanan         |
| Infrastructure | OLT, PON, ONU                    |
| Provisioning   | Aktivasi & konfigurasi perangkat |
| Workflow       | Orkestrasi proses                |
| Monitoring     | Status perangkat & alarm         |
| Notification   | Pengiriman notifikasi            |
| Authentication | User & RBAC                      |
| Administration | Konfigurasi sistem               |
| Reporting      | Laporan & statistik              |

---

# Ubiquitous Language

| Term            | Meaning                              |
| --------------- | ------------------------------------ |
| Customer        | Pelanggan ISP                        |
| Subscription    | Layanan internet milik customer      |
| ONU             | Optical Network Unit                 |
| OLT             | Optical Line Terminal                |
| PON             | Passive Optical Network Port         |
| Service Profile | Profil layanan internet              |
| Workflow        | Rangkaian langkah provisioning       |
| Alarm           | Gangguan perangkat                   |
| Vendor Mapping  | Pemetaan perintah vendor             |
| Inform          | Sinkronisasi perangkat dari GenieACS |
| LOS             | Loss of Signal                       |
| Dying Gasp      | Alarm kehilangan daya dari ONU       |

---

# Aggregate Root

## Customer Aggregate

Aggregate Root:

Customer

Children:

* Subscription
* Contact
* Address

Rule:

Customer tidak boleh dihapus jika masih memiliki Subscription aktif.

---

## Subscription Aggregate

Aggregate Root:

Subscription

Children:

* PPPoE Profile
* Service Plan
* ONU Binding

Rule:

Satu Subscription hanya memiliki satu ONU aktif.

---

## Infrastructure Aggregate

Aggregate Root:

OLT

Children:

* Board
* PON
* ONU

Rule:

ONU hanya boleh berada pada satu PON.

---

## Workflow Aggregate

Aggregate Root:

Workflow

Children:

* Workflow Step
* Workflow Log

Rule:

Workflow selesai jika seluruh step berhasil atau telah di-rollback.

---

## Alarm Aggregate

Aggregate Root:

Alarm

Children:

* Alarm History

Rule:

Alarm hanya memiliki satu status aktif pada satu waktu.

---

## Notification Aggregate

Aggregate Root:

Notification

Children:

* Delivery History

---

## User Aggregate

Aggregate Root:

User

Children:

* Session
* Role Assignment

---

# Core Entities

## Customer

Representasi pelanggan ISP.

Field utama:

* Customer ID
* Name
* Status
* Address
* Contact

---

## Subscription

Representasi layanan internet.

Field:

* Service Plan
* VLAN
* PPPoE Username
* PPPoE Profile
* Status

---

## ONU

Representasi perangkat pelanggan.

Field:

* Serial Number
* Vendor
* Model
* Firmware
* Status
* Optical Power

---

## OLT

Representasi perangkat sentral GPON.

Field:

* Name
* Vendor
* IP Address
* Location

---

## PON

Representasi port GPON.

Field:

* Slot
* Port
* Capacity
* Used ONU

---

## Workflow

Representasi proses provisioning.

Field:

* Workflow Type
* Status
* Started At
* Finished At

---

## Alarm

Representasi kejadian gangguan.

Field:

* Severity
* Status
* Source
* Message

---

## Notification

Representasi pesan sistem.

Field:

* Type
* Channel
* Status

---

# Value Objects

Value Object tidak memiliki identitas sendiri.

Contoh:

Address

```text
Province

City

District

Postal Code
```

---

Optical Power

```text
RX

TX
```

---

Location

```text
Latitude

Longitude
```

---

PPPoE Credential

```text
Username

Profile
```

Password disimpan secara aman dan tidak diperlakukan sebagai value object biasa dalam model domain.

---

# Entity Relationship

```text
Customer
    │
    ▼
Subscription
    │
    ▼
ONU
    │
    ▼
PON
    │
    ▼
OLT
```

---

Workflow

```text
Workflow

↓

Workflow Step

↓

Workflow Log
```

---

Alarm

```text
OLT

↓

ONU

↓

Alarm

↓

Notification
```

---

# Domain Events

Customer

* customer.created
* customer.updated
* customer.deleted

Subscription

* subscription.created
* subscription.updated
* subscription.suspended

ONU

* onu.discovered
* onu.registered
* onu.replaced
* onu.deleted
* onu.online
* onu.offline
* onu.los
* onu.dying_gasp

OLT

* olt.connected
* olt.disconnected
* olt.health.updated

Workflow

* workflow.started
* workflow.completed
* workflow.failed
* workflow.rollback

Alarm

* alarm.created
* alarm.acknowledged
* alarm.resolved

Notification

* notification.created
* notification.sent
* notification.failed

---

# Business Rules

## Customer

* Customer wajib memiliki minimal satu kontak.
* Customer dapat memiliki banyak subscription.
* Customer dapat dinonaktifkan tanpa dihapus.

---

## Subscription

* Hanya satu ONU aktif.
* VLAN wajib valid.
* PPPoE Profile harus tersedia.

---

## ONU

* Serial Number unik.
* Hanya terhubung ke satu PON.
* Tidak boleh diregistrasi dua kali.

---

## OLT

* Harus memiliki Vendor Adapter.
* Dapat memiliki banyak Board.
* Dapat memiliki banyak PON.

---

## PON

* Memiliki kapasitas maksimum ONU.
* Tidak boleh melebihi kapasitas.

---

## Workflow

* Seluruh step dieksekusi berurutan.
* Step gagal dapat di-retry.
* Workflow dapat di-rollback.

---

## Alarm

* Severity wajib ditentukan.
* Alarm dapat di-acknowledge.
* Alarm dapat di-resolve.

---

# Domain Services

Domain Service digunakan jika logika melibatkan lebih dari satu aggregate.

Contoh:

* ONU Registration Service
* ONU Replacement Service
* PPPoE Provisioning Service
* Workflow Execution Service
* Optical Power Evaluation Service
* Alarm Correlation Service

---

# Repositories

Setiap aggregate memiliki repository.

Contoh:

* CustomerRepository
* SubscriptionRepository
* ONURepository
* OLTRepository
* WorkflowRepository
* AlarmRepository
* NotificationRepository
* UserRepository

---

# Invariants

Harus selalu benar:

* Serial Number ONU unik.
* Customer ID unik.
* Workflow hanya memiliki satu status aktif.
* Alarm hanya memiliki satu status aktif.
* Subscription hanya memiliki satu ONU aktif.
* ONU hanya berada pada satu PON.
* PON tidak melebihi kapasitas.

---

# Cross Context Interaction

```text
Customer
      │
      ▼
Provisioning
      │
      ▼
Workflow
      │
      ▼
OLT Adapter
      │
      ▼
GenieACS
      │
      ▼
Monitoring
      │
      ▼
Notification
```

Interaksi antar context dilakukan melalui Event Bus atau Application Service, bukan akses langsung ke entity context lain.

---

# AI Coding Rules

AI wajib mengikuti aturan berikut:

1. Jangan mengakses database langsung dari entity.
2. Semua perubahan data dilakukan melalui Aggregate Root.
3. Gunakan Domain Service untuk logika lintas aggregate.
4. Jangan melanggar invariant domain.
5. Gunakan Domain Event untuk komunikasi antar bounded context.
6. Pisahkan Entity dan Value Object.
7. Repository hanya untuk Aggregate Root.
8. Jangan mencampur logika bisnis dengan infrastruktur.
9. Gunakan istilah yang konsisten sesuai Ubiquitous Language.
10. Database adalah implementasi penyimpanan, bukan model domain.

---

# Summary

BCMS menggunakan pendekatan Domain-Driven Design dengan bounded context yang jelas, aggregate root yang terdefinisi, domain event untuk komunikasi antar context, serta aturan bisnis yang menjaga konsistensi data. Domain Model ini menjadi referensi utama bagi implementasi backend, frontend, workflow, database, dan integrasi eksternal sehingga seluruh tim menggunakan bahasa dan konsep bisnis yang sama.
