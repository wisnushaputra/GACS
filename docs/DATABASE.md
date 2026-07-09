# DATABASE.md

# Broadband Customer Monitoring System (BCMS)

Version 1.0

---

# Database Overview

BCMS menggunakan **PostgreSQL** sebagai database utama.

Database hanya menyimpan:

* Data Customer
* Data OLT
* Mapping ONU
* User
* Role
* Audit Log
* Event History
* Task History
* WiFi Profile
* PPPoE Profile

Status realtime seperti:

* Online
* LOS
* Dying Gasp
* RX Power
* TX Power
* Last Inform

tidak disimpan permanen, tetapi diambil dari GenieACS dan di-cache di Redis.

---

# Entity Relationship Diagram

```
Users
  │
  ├──── Roles
  │
  └──── AuditLogs

Customers
     │
     ├──── ONU
     │       │
     │       ├──── OLT
     │       ├──── DeviceStatus
     │       ├──── DeviceEvents
     │       ├──── PPPoEProfile
     │       └──── WifiProfile
     │
     └──── Tasks
```

---

# Tables

## users

| Column        | Type      |
| ------------- | --------- |
| id            | uuid      |
| username      | varchar   |
| fullname      | varchar   |
| email         | varchar   |
| password_hash | varchar   |
| role_id       | uuid      |
| is_active     | boolean   |
| created_at    | timestamp |
| updated_at    | timestamp |

---

## roles

| Column      | Type    |
| ----------- | ------- |
| id          | uuid    |
| name        | varchar |
| description | text    |

Example

```
Admin

NOC

Technician

Viewer
```

---

## permissions

| Column      | Type    |
| ----------- | ------- |
| id          | uuid    |
| name        | varchar |
| description | text    |

Example

```
dashboard.view

onu.register

onu.replace

wifi.update

pppoe.update

users.manage
```

---

## role_permissions

Many to Many

```
role_id

permission_id
```

---

# OLT

## olts

| Column      | Type      |
| ----------- | --------- |
| id          | uuid      |
| name        | varchar   |
| vendor      | varchar   |
| ip_address  | inet      |
| location    | varchar   |
| description | text      |
| enabled     | boolean   |
| created_at  | timestamp |

Vendor

Huawei

ZTE

Fiberhome

VSOL

Raisecom

---

# Customers

## customers

| Column        | Type      |
| ------------- | --------- |
| id            | uuid      |
| customer_code | varchar   |
| full_name     | varchar   |
| phone         | varchar   |
| address       | text      |
| email         | varchar   |
| status        | varchar   |
| created_at    | timestamp |
| updated_at    | timestamp |

Status

```
Active

Suspended

Inactive
```

---

# ONU

## onus

| Column          | Type      |
| --------------- | --------- |
| id              | uuid      |
| customer_id     | uuid      |
| olt_id          | uuid      |
| serial_number   | varchar   |
| genie_device_id | varchar   |
| pon_port        | varchar   |
| onu_id          | integer   |
| profile_name    | varchar   |
| vlan            | integer   |
| firmware        | varchar   |
| model           | varchar   |
| manufacturer    | varchar   |
| registered_at   | timestamp |

Unique

```
serial_number

genie_device_id
```

---

# Device Status

## device_status

Realtime snapshot terakhir yang berhasil disimpan.

| Column       | Type      |
| ------------ | --------- |
| id           | uuid      |
| onu_id       | uuid      |
| status       | varchar   |
| rx_power     | numeric   |
| tx_power     | numeric   |
| uptime       | bigint    |
| ip_address   | inet      |
| last_inform  | timestamp |
| last_contact | timestamp |
| updated_at   | timestamp |

Status

```
ONLINE

OFFLINE

LOS

DYING_GASP

UNKNOWN
```

---

# Device Events

## device_events

History seluruh event ONU.

| Column      | Type      |
| ----------- | --------- |
| id          | uuid      |
| onu_id      | uuid      |
| event_type  | varchar   |
| description | text      |
| created_at  | timestamp |

Event

```
ONLINE

OFFLINE

LOS

DYING_GASP

BOOT

REBOOT

FACTORY_RESET

INFORM

CONFIG_CHANGE

REGISTER

REPLACE
```

---

# PPPoE Profile

## pppoe_profiles

| Column       | Type      |
| ------------ | --------- |
| id           | uuid      |
| onu_id       | uuid      |
| username     | varchar   |
| password     | varchar   |
| service_vlan | integer   |
| created_at   | timestamp |
| updated_at   | timestamp |

---

# WiFi Profile

## wifi_profiles

| Column        | Type      |
| ------------- | --------- |
| id            | uuid      |
| onu_id        | uuid      |
| ssid          | varchar   |
| password      | varchar   |
| encryption    | varchar   |
| channel       | integer   |
| bandwidth     | varchar   |
| hidden        | boolean   |
| guest_enabled | boolean   |
| updated_at    | timestamp |

---

# Provision Tasks

## provision_tasks

| Column      | Type      |
| ----------- | --------- |
| id          | uuid      |
| onu_id      | uuid      |
| task_type   | varchar   |
| status      | varchar   |
| progress    | integer   |
| started_at  | timestamp |
| finished_at | timestamp |
| message     | text      |

Task Type

```
REGISTER

PPPOE

REBOOT

FACTORY_RESET

REFRESH

WIFI

REPLACE
```

Status

```
WAITING

RUNNING

SUCCESS

FAILED
```

---

# Audit Logs

## audit_logs

| Column     | Type      |
| ---------- | --------- |
| id         | uuid      |
| user_id    | uuid      |
| action     | varchar   |
| entity     | varchar   |
| entity_id  | uuid      |
| ip_address | inet      |
| user_agent | text      |
| created_at | timestamp |

Example

```
LOGIN

CREATE_USER

REGISTER_ONU

UPDATE_WIFI

PUSH_PPPOE

DELETE_CUSTOMER

REPLACE_ONU
```

---

# Login Sessions

## refresh_tokens

| Column     | Type      |
| ---------- | --------- |
| id         | uuid      |
| user_id    | uuid      |
| token      | text      |
| expires_at | timestamp |
| revoked    | boolean   |
| created_at | timestamp |

---

# Notification Queue

## notifications

| Column     | Type      |
| ---------- | --------- |
| id         | uuid      |
| title      | varchar   |
| message    | text      |
| level      | varchar   |
| is_read    | boolean   |
| created_at | timestamp |

Level

```
INFO

WARNING

CRITICAL
```

---

# Settings

## settings

| Column      | Type    |
| ----------- | ------- |
| id          | uuid    |
| key         | varchar |
| value       | text    |
| description | text    |

Example

```
dashboard_refresh

socket_timeout

default_vlan

company_name
```

---

# Suggested Index

customers

```
customer_code

full_name
```

onus

```
serial_number

genie_device_id

olt_id

customer_id
```

device_status

```
onu_id

status
```

device_events

```
onu_id

event_type

created_at
```

audit_logs

```
user_id

created_at
```

---

# Foreign Keys

```
roles

↓

users

customers

↓

onus

olts

↓

onus

onus

↓

device_status

onus

↓

device_events

onus

↓

wifi_profiles

onus

↓

pppoe_profiles

onus

↓

provision_tasks

users

↓

audit_logs
```

---

# Redis Keys

Dashboard

```
dashboard:summary

dashboard:online

dashboard:offline

dashboard:los

dashboard:dyinggasp
```

Device

```
device:{serial}

device:{deviceId}
```

Socket

```
socket:users

socket:dashboard

socket:device
```

Cache

```
customer:{id}

olt:{id}
```

---

# Data Retention Policy

| Data            | Retention |
| --------------- | --------- |
| Device Status   | 7 hari    |
| Device Events   | 1 tahun   |
| Audit Logs      | 2 tahun   |
| Provision Tasks | 6 bulan   |
| Notifications   | 30 hari   |
| Refresh Tokens  | 30 hari   |

---

# Drizzle ORM Naming Convention

Schema

```
users.ts

roles.ts

customers.ts

onus.ts

olts.ts

deviceStatus.ts

deviceEvents.ts

wifiProfiles.ts

pppoeProfiles.ts

auditLogs.ts

settings.ts
```

Seluruh tabel menggunakan:

* UUID Primary Key
* `created_at`
* `updated_at` (kecuali tabel log)
* Foreign Key Constraint
* Index pada kolom pencarian
* Soft delete **hanya** untuk data master (customers, onus, olts, users) menggunakan `deleted_at TIMESTAMP NULL`. Data log dan event tidak menggunakan soft delete agar jejak audit tetap utuh.

---

# Database Migration Rules

* Semua perubahan schema dibuat menggunakan Drizzle Migration.
* Tidak diperbolehkan mengubah tabel langsung di PostgreSQL Production.
* Semua migration harus dapat di-*rollback*.
* Seeder dipisahkan dari migration.
* Gunakan transaksi (`transaction`) untuk operasi yang mengubah lebih dari satu tabel.

---

# Future Tables

Untuk pengembangan berikutnya dapat ditambahkan:

* `service_packages`
* `customer_subscriptions`
* `billing_accounts`
* `snmp_devices`
* `snmp_traps`
* `telegram_notifications`
* `whatsapp_notifications`
* `grafana_dashboards`
* `performance_metrics`
* `fiber_routes`
* `olt_ports`
* `onu_backups`
* `firmware_versions`
* `scheduled_tasks`
