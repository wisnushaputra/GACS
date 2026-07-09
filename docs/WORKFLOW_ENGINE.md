# WORKFLOW_ENGINE.md

# Broadband Customer Monitoring System (BCMS)

## Workflow Engine Specification

Version 1.0

---

# Purpose

Workflow Engine mengatur seluruh proses bisnis yang terdiri dari beberapa langkah (multi-step process).

Workflow digunakan ketika suatu operasi:

* membutuhkan lebih dari satu langkah
* melibatkan lebih dari satu adapter
* membutuhkan rollback
* membutuhkan retry
* membutuhkan monitoring progress
* berjalan secara asynchronous

---

# High Level Architecture

```text
API Request
      │
      ▼
Business Service
      │
      ▼
Workflow Engine
      │
      ├──────────────┐
      ▼              ▼
Workflow Step    Event Bus
      │              │
      ▼              ▼
Adapter       Socket.IO
```

---

# Workflow Lifecycle

```
CREATED

↓

QUEUED

↓

RUNNING

↓

WAITING

↓

COMPLETED
```

atau

```
RUNNING

↓

FAILED

↓

RETRYING

↓

RUNNING
```

atau

```
RUNNING

↓

FAILED

↓

ROLLBACK

↓

ROLLED_BACK
```

---

# Workflow State

Enum

```
CREATED

QUEUED

RUNNING

WAITING

COMPLETED

FAILED

CANCELLED

RETRYING

ROLLBACK

ROLLED_BACK
```

---

# Workflow Table

Database

```
workflows
```

Kolom

```
id

type

status

current_step

progress

created_by

started_at

finished_at

metadata

error

retry_count
```

---

# Workflow Step Table

```
workflow_steps
```

Kolom

```
workflow_id

step_name

status

started_at

finished_at

duration

error
```

---

# Workflow Types

Supported

```
REGISTER_ONU

REPLACE_ONU

DELETE_ONU

PUSH_PPPOE

PUSH_WIFI

FACTORY_RESET

REBOOT

CUSTOMER_ACTIVATION

CUSTOMER_SUSPEND

BACKUP_CONFIG

RESTORE_CONFIG
```

---

# Register ONU Workflow

```
Validate Request

↓

Find OLT

↓

Find Free ONU ID

↓

Register ONU

↓

Verify ONU

↓

Wait Online

↓

Discover GenieACS

↓

Push PPPoE

↓

Push WiFi

↓

Refresh Parameter

↓

Save Database

↓

Publish Event

↓

Completed
```

---

# Replace ONU Workflow

```
Validate

↓

Backup Config

↓

Delete Old ONU

↓

Register New ONU

↓

Wait Online

↓

Restore Config

↓

Verify

↓

Update Database

↓

Publish Event

↓

Completed
```

---

# Push PPPoE Workflow

```
Validate

↓

Get Customer

↓

Get Device

↓

Push PPPoE

↓

Refresh WAN

↓

Verify

↓

Completed
```

---

# Push WiFi Workflow

```
Validate

↓

Push SSID

↓

Push Password

↓

Refresh

↓

Verify

↓

Completed
```

---

# Rollback Strategy

Register ONU

Rollback

```
Delete ONU
```

---

Replace ONU

Rollback

```
Restore Old ONU
```

---

Push PPPoE

Rollback

```
Restore Previous PPPoE
```

---

Push WiFi

Rollback

```
Restore Previous SSID
```

---

# Retry Policy

Retry

```
3
```

Delay

```
1

2

5 detik
```

Retry hanya dilakukan untuk:

* Timeout
* Network Error
* Temporary Failure

Tidak melakukan retry untuk:

* Validation Error
* Authentication Error
* Duplicate Data

---

# Workflow Step Interface

```ts
interface WorkflowStep {

name:string

execute()

rollback()

}
```

---

# Workflow Interface

```ts
interface Workflow {

execute()

cancel()

rollback()

}
```

---

# Progress

Workflow memiliki progress.

Contoh

```
10%

20%

50%

75%

100%
```

Progress dikirim melalui Socket.IO.

---

# Socket Event

Workflow menghasilkan event.

```
workflow:created

workflow:started

workflow:progress

workflow:completed

workflow:failed

workflow:rollback
```

---

# Workflow Context

Semua step menggunakan context.

```ts
interface WorkflowContext{

workflowId

customerId

deviceId

oltId

metadata

}
```

Step tidak boleh saling bergantung secara langsung.

---

# Event Flow

```
Workflow

↓

Event Bus

↓

Redis

↓

Socket Gateway

↓

Frontend
```

---

# Logging

Setiap workflow mencatat

```
Workflow ID

Step

Duration

Status

Retry

Rollback
```

---

# Monitoring

Dashboard menampilkan

```
Running Workflow

Completed

Failed

Retry

Rollback
```

---

# Timeout

Per Step

```
30 detik
```

Workflow

```
10 menit
```

---

# Queue

Workflow berjalan melalui

```
BullMQ
```

Flow

```
API

↓

Queue

↓

Worker

↓

Workflow

↓

Adapter
```

---

# Parallel Step

Workflow dapat menjalankan beberapa step secara paralel.

Contoh

```
Push PPPoE

||

Push WiFi
```

↓

```
Wait All

↓

Refresh
```

---

# Compensation

Jika rollback tidak memungkinkan

↓

Compensation Action

Contoh

```
Send Notification

Create Incident

Manual Intervention
```

---

# Workflow Result

```ts
interface WorkflowResult{

success:boolean

status

duration

error

}
```

---

# Error Code

```
STEP_FAILED

TIMEOUT

ROLLBACK_FAILED

VALIDATION_ERROR

QUEUE_ERROR

UNKNOWN_ERROR
```

---

# Folder Structure

```
workflow/

engine/

WorkflowEngine.ts

WorkflowRunner.ts

WorkflowContext.ts

WorkflowRegistry.ts

WorkflowFactory.ts

steps/

RegisterONU/

ReplaceONU/

PushPPPoE/

PushWiFi/

Backup/

Restore/

shared/

events/

types/

errors/
```

---

# Workflow Registry

Semua workflow didaftarkan pada registry.

```
REGISTER_ONU

↓

RegisterONUWorkflow
```

Business Service tidak membuat workflow secara langsung.

---

# Metrics

Workflow menghasilkan metric:

* Total Workflow
* Success Rate
* Failure Rate
* Average Duration
* Retry Count
* Rollback Count

---

# Security

Semua workflow harus:

* memiliki User ID
* memiliki Audit Log
* memiliki Permission Check
* memiliki Correlation ID

---

# Testing

Minimal:

* Unit Test setiap Step
* Unit Test Workflow
* Mock Adapter Test
* Rollback Test
* Retry Test
* Timeout Test

---

# Future Enhancements

* Workflow Scheduler
* Conditional Branching
* Human Approval Step
* Visual Workflow Builder
* Workflow Versioning
* Workflow Template
* Distributed Workflow Execution
* Saga Pattern
* Event Sourcing

---

# Design Principles

1. Business Service hanya memulai workflow.
2. Workflow terdiri dari step-step kecil yang independen.
3. Setiap step harus bersifat idempotent.
4. Setiap step memiliki rollback jika memungkinkan.
5. Workflow harus dapat dipantau secara realtime.
6. Workflow berjalan asynchronous melalui queue.
7. Seluruh perubahan status dipublikasikan melalui Event Bus.
8. Workflow tidak bergantung pada vendor, hanya menggunakan Adapter Interface.
