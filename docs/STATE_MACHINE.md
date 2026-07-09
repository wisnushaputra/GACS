# STATE_MACHINE.md

# BCMS State Machine

Version: 1.0

---

# Overview

Dokumen ini mendefinisikan seluruh **state machine** pada BCMS.

Tujuan:

* Menjamin transisi status yang valid.
* Mencegah inkonsistensi data.
* Menjadi acuan backend, frontend, workflow, dan audit.
* Mendukung implementasi Workflow Engine dan Event Bus.

Setiap perubahan state harus:

* Divalidasi.
* Dicatat pada Audit Log.
* Menghasilkan Domain Event bila diperlukan.

---

# General Rules

1. State hanya boleh berubah melalui Service atau Workflow.
2. Entity tidak boleh berpindah ke state yang tidak valid.
3. Seluruh transisi menghasilkan timestamp.
4. State bersifat eksplisit, tidak menggunakan boolean.
5. Gunakan enum pada backend dan frontend.

---

# ONU State Machine

## States

```text id="onu_states"
DISCOVERED

↓

REGISTERING

↓

REGISTERED

↓

PROVISIONING

↓

ONLINE
```

State lain:

```text id="onu_alt_states"
OFFLINE

LOS

DYING_GASP

DISABLED

FAILED

REPLACED
```

---

## Allowed Transition

| From         | To           |
| ------------ | ------------ |
| DISCOVERED   | REGISTERING  |
| REGISTERING  | REGISTERED   |
| REGISTERED   | PROVISIONING |
| PROVISIONING | ONLINE       |
| ONLINE       | OFFLINE      |
| ONLINE       | LOS          |
| ONLINE       | DYING_GASP   |
| OFFLINE      | ONLINE       |
| LOS          | ONLINE       |
| DYING_GASP   | ONLINE       |
| ONLINE       | DISABLED     |
| DISABLED     | ONLINE       |
| REGISTERED   | REPLACED     |
| FAILED       | REGISTERING  |

---

## Invalid Transition

Contoh:

```text id="onu_invalid"
DISCOVERED

↓

ONLINE
```

Tidak diperbolehkan.

---

## Events

* onu.discovered
* onu.registered
* onu.online
* onu.offline
* onu.los
* onu.dying_gasp
* onu.disabled
* onu.replaced

---

# Workflow State Machine

## States

```text id="workflow_states"
PENDING

↓

RUNNING

↓

COMPLETED
```

State lain:

```text id="workflow_alt"
FAILED

RETRYING

ROLLING_BACK

ROLLED_BACK

CANCELLED
```

---

## Allowed Transition

| From         | To           |
| ------------ | ------------ |
| PENDING      | RUNNING      |
| RUNNING      | COMPLETED    |
| RUNNING      | FAILED       |
| FAILED       | RETRYING     |
| RETRYING     | RUNNING      |
| FAILED       | ROLLING_BACK |
| ROLLING_BACK | ROLLED_BACK  |
| PENDING      | CANCELLED    |

---

## Events

* workflow.started
* workflow.completed
* workflow.failed
* workflow.retry
* workflow.rollback

---

# Alarm State Machine

## States

```text id="alarm_states"
OPEN

↓

ACKNOWLEDGED

↓

RESOLVED
```

---

## Allowed Transition

| From         | To           |
| ------------ | ------------ |
| OPEN         | ACKNOWLEDGED |
| OPEN         | RESOLVED     |
| ACKNOWLEDGED | RESOLVED     |

---

## Events

* alarm.created
* alarm.acknowledged
* alarm.resolved

---

# Customer State Machine

## States

```text id="customer_states"
PENDING

↓

ACTIVE

↓

SUSPENDED

↓

TERMINATED
```

---

## Allowed Transition

| From      | To         |
| --------- | ---------- |
| PENDING   | ACTIVE     |
| ACTIVE    | SUSPENDED  |
| SUSPENDED | ACTIVE     |
| ACTIVE    | TERMINATED |
| SUSPENDED | TERMINATED |

---

# Subscription State Machine

## States

```text id="subscription_states"
PENDING

↓

PROVISIONING

↓

ACTIVE
```

State lain:

```text id="subscription_alt"
SUSPENDED

TERMINATED

FAILED
```

---

## Allowed Transition

| From         | To           |
| ------------ | ------------ |
| PENDING      | PROVISIONING |
| PROVISIONING | ACTIVE       |
| PROVISIONING | FAILED       |
| ACTIVE       | SUSPENDED    |
| SUSPENDED    | ACTIVE       |
| ACTIVE       | TERMINATED   |
| FAILED       | PROVISIONING |

---

# OLT State Machine

## States

```text id="olt_states"
CONNECTING

↓

CONNECTED
```

State lain:

```text id="olt_alt"
DISCONNECTED

UNREACHABLE

MAINTENANCE
```

---

## Allowed Transition

| From         | To           |
| ------------ | ------------ |
| CONNECTING   | CONNECTED    |
| CONNECTED    | DISCONNECTED |
| DISCONNECTED | CONNECTING   |
| CONNECTED    | MAINTENANCE  |
| MAINTENANCE  | CONNECTED    |
| DISCONNECTED | UNREACHABLE  |
| UNREACHABLE  | CONNECTING   |

---

# Notification State Machine

## States

```text id="notification_states"
PENDING

↓

SENDING

↓

SENT
```

State lain:

```text id="notification_alt"
FAILED

READ
```

---

## Allowed Transition

| From    | To      |
| ------- | ------- |
| PENDING | SENDING |
| SENDING | SENT    |
| SENDING | FAILED  |
| FAILED  | SENDING |
| SENT    | READ    |

---

# Job Queue State Machine

## States

```text id="job_states"
WAITING

↓

ACTIVE

↓

COMPLETED
```

State lain:

```text id="job_alt"
FAILED

RETRYING

DELAYED

CANCELLED

DEAD_LETTER
```

---

## Allowed Transition

| From     | To          |
| -------- | ----------- |
| WAITING  | ACTIVE      |
| ACTIVE   | COMPLETED   |
| ACTIVE   | FAILED      |
| FAILED   | RETRYING    |
| RETRYING | ACTIVE      |
| FAILED   | DEAD_LETTER |
| WAITING  | CANCELLED   |
| DELAYED  | WAITING     |

---

# User Session State Machine

## States

```text id="session_states"
ACTIVE

↓

EXPIRED
```

State lain:

```text id="session_alt"
REVOKED
```

---

## Allowed Transition

| From   | To      |
| ------ | ------- |
| ACTIVE | EXPIRED |
| ACTIVE | REVOKED |

---

# Generic State Transition Flow

```text id="generic_flow"
Current State

↓

Validate Transition

↓

Execute Business Logic

↓

Persist

↓

Audit Log

↓

Publish Domain Event

↓

Invalidate Cache

↓

Socket Broadcast
```

---

# Transition Validation

Semua perubahan state harus melalui State Validator.

Contoh:

```text id="validator"
StateMachine.canTransition(
    currentState,
    targetState
)
```

Jika tidak valid:

* Tolak perubahan.
* Catat audit log.
* Kembalikan Business Rule Error.

---

# Audit Requirements

Setiap transisi menyimpan:

* Entity ID
* Previous State
* New State
* User / System
* Timestamp
* Correlation ID
* Workflow ID (jika ada)

---

# Event Integration

Setiap transisi dapat menghasilkan Domain Event.

Contoh:

```text id="event_flow"
ONU

ONLINE

↓

onu.online

↓

Dashboard Update

↓

Notification

↓

Socket Broadcast
```

---

# AI Coding Rules

AI wajib mengikuti aturan berikut:

1. Semua perubahan status harus divalidasi melalui State Machine.
2. Jangan mengubah status langsung dari Controller.
3. Gunakan enum yang sama pada backend dan frontend.
4. Tolak transisi yang tidak valid.
5. Catat seluruh transisi pada Audit Log.
6. Publikasikan Domain Event setelah transisi berhasil.
7. Jangan menggunakan boolean untuk merepresentasikan status kompleks.
8. Pisahkan logika transisi dari Entity dan Controller.
9. Gunakan State Machine sebagai sumber kebenaran untuk alur status.
10. Pastikan seluruh workflow mengikuti state yang telah didefinisikan.

---

# Summary

BCMS menggunakan State Machine sebagai mekanisme utama untuk mengontrol perubahan status pada ONU, Workflow, Alarm, Customer, Subscription, OLT, Notification, Job Queue, dan Session. Setiap transisi divalidasi, diaudit, dan dapat menghasilkan Domain Event sehingga seluruh sistem tetap konsisten, mudah dilacak, dan siap diintegrasikan dengan Workflow Engine, Event Bus, serta Dashboard Realtime.
