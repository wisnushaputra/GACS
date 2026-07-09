# JOB_QUEUE.md

# BCMS Job Queue Architecture

Version: 1.0

---

# Overview

BCMS menggunakan **BullMQ** dengan **Redis** sebagai sistem antrean pekerjaan (*job queue*) untuk menangani seluruh proses asynchronous, workflow, retry, scheduling, dan background processing.

Job Queue menjadi fondasi bagi Workflow Engine agar operasi yang melibatkan OLT, GenieACS, monitoring, dan notifikasi dapat diproses secara andal tanpa membebani request HTTP.

---

# Goals

* Asynchronous Processing
* Reliability
* Retry Mechanism
* Scalability
* Priority Queue
* Scheduled Jobs
* Observability
* Fault Tolerance

---

# High Level Architecture

```text
                HTTP Request
                      │
                      ▼
              Workflow Engine
                      │
                Create Job
                      │
               BullMQ Queue
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
 Provision Worker  Monitoring   Notification
        │            Worker        Worker
        │              │             │
        ▼              ▼             ▼
 OLT Adapter      GenieACS      SMTP / Telegram
        │
        ▼
 Database + Event Bus
```

---

# Queue Categories

BCMS menggunakan queue terpisah berdasarkan domain.

---

## provisioning.queue

Operasi provisioning pelanggan.

Job:

* Register ONU
* Replace ONU
* Push PPPoE
* Push SSID
* Reboot ONU
* Factory Reset
* Delete ONU

Priority:

High

---

## monitoring.queue

Monitoring perangkat.

Job:

* Poll OLT
* Sync ONU Status
* Sync Optical Power
* Sync CPU
* Sync Memory
* Sync Temperature

Priority:

Medium

---

## genieacs.queue

Sinkronisasi dengan GenieACS.

Job:

* Refresh Device
* Push Parameter
* Get Parameter
* Add Task
* Remove Task

Priority:

High

---

## olt.queue

Eksekusi perintah ke OLT.

Job:

* Execute CLI
* Execute API
* Backup Config
* Discovery ONU
* Read VLAN
* Read Service Port

Priority:

High

---

## workflow.queue

Menjalankan workflow multi-langkah.

Job:

* Execute Workflow
* Retry Workflow
* Rollback Workflow

Priority:

High

---

## notification.queue

Pengiriman notifikasi.

Job:

* Email
* Telegram
* WebSocket Broadcast
* Push Notification

Priority:

Low

---

## reporting.queue

Pembuatan laporan.

Job:

* PDF
* Excel
* CSV

Priority:

Low

---

## scheduler.queue

Pekerjaan terjadwal.

Job:

* Daily Backup
* Device Sync
* Cleanup
* Metrics Aggregation

Priority:

Low

---

## audit.queue

Penyimpanan audit log.

Priority:

Low

---

# Queue Naming Convention

Gunakan format:

```text
module.queue
```

Contoh:

```text
provisioning.queue

workflow.queue

monitoring.queue

notification.queue

olt.queue

genieacs.queue
```

---

# Job Naming Convention

Gunakan format:

```text
module.action
```

Contoh:

```text
onu.register

onu.replace

onu.delete

onu.reboot

workflow.execute

workflow.rollback

genieacs.sync

notification.send
```

---

# Job Structure

Semua job memiliki struktur berikut.

```json
{
    "id":"uuid",
    "name":"onu.register",
    "priority":1,
    "correlationId":"uuid",
    "payload":{},
    "createdAt":"",
    "retry":0
}
```

---

# Job States

```text
Waiting

↓

Active

↓

Completed
```

atau

```text
Waiting

↓

Active

↓

Failed

↓

Retry

↓

Completed
```

atau

```text
Waiting

↓

Active

↓

Failed

↓

Dead Letter Queue
```

---

# Priority

Gunakan prioritas berikut.

| Priority | Description                                        |
| -------- | -------------------------------------------------- |
| Critical | Gangguan layanan yang memerlukan penanganan segera |
| High     | Provisioning dan workflow utama                    |
| Medium   | Monitoring dan sinkronisasi                        |
| Low      | Laporan, notifikasi non-kritis, audit              |

---

# Retry Policy

Retry hanya dilakukan untuk error sementara (*transient*), seperti:

* Timeout
* Redis Error
* OLT Busy
* GenieACS Timeout
* Network Error

Jangan retry untuk:

* Validation Error
* Duplicate Data
* Permission Error
* Business Rule Error

---

# Backoff Strategy

Gunakan **Exponential Backoff** dengan batas maksimum retry yang ditentukan per jenis pekerjaan.

Contoh:

```text
Retry 1

↓

Retry 2

↓

Retry 3

↓

Dead Letter Queue
```

---

# Dead Letter Queue (DLQ)

Job yang gagal setelah seluruh retry dipindahkan ke DLQ.

Administrator dapat:

* Melihat detail kegagalan
* Retry manual
* Menghapus job
* Mengekspor riwayat

---

# Worker Responsibilities

Worker hanya:

* Mengambil job
* Memproses job
* Memperbarui status
* Mempublikasikan event
* Menulis log

Worker tidak boleh menangani request HTTP secara langsung.

---

# Workflow Integration

Contoh alur Register ONU.

```text
HTTP Request

↓

workflow.execute

↓

workflow.queue

↓

olt.queue

↓

genieacs.queue

↓

notification.queue

↓

workflow.completed

↓

dashboard.updated
```

---

# Event Bus Integration

Setiap perubahan status job harus mempublikasikan event.

Contoh:

```text
job.started

job.completed

job.failed

job.retry

job.cancelled
```

---

# Monitoring Queue

Pantau metrik berikut:

* Waiting Jobs
* Active Jobs
* Completed Jobs
* Failed Jobs
* Retry Count
* Processing Time
* Queue Throughput
* DLQ Size

---

# Logging

Setiap job mencatat:

* Job ID
* Queue
* Job Name
* Correlation ID
* Workflow ID (jika ada)
* Worker
* Duration
* Result
* Error Code (jika gagal)

---

# Idempotency

Job harus dirancang agar aman dijalankan lebih dari satu kali bila memungkinkan.

Contoh:

* Register ONU tidak membuat data ganda jika job diproses ulang.
* Push PPPoE memeriksa konfigurasi saat ini sebelum menerapkan perubahan.

---

# Concurrency

Atur jumlah worker berdasarkan karakteristik pekerjaan.

Contoh:

* Provisioning: rendah hingga sedang, agar tidak membebani OLT.
* Monitoring: lebih tinggi untuk proses paralel.
* Notification: tinggi karena umumnya bersifat ringan.

Nilai spesifik ditentukan melalui konfigurasi dan pengujian performa.

---

# Scheduling

Gunakan scheduler untuk:

* Polling OLT
* Sync GenieACS
* Cleanup
* Backup
* Report
* Metrics Aggregation

---

# Security

* Validasi payload sebelum diproses.
* Jangan menyimpan secret dalam payload.
* Gunakan Correlation ID.
* Batasi siapa yang dapat membuat atau mengulang job administratif.

---

# AI Coding Rules

AI wajib mengikuti aturan berikut:

1. Semua proses yang memerlukan waktu lama dijalankan melalui Job Queue.
2. Jangan menjalankan provisioning langsung di request HTTP.
3. Pisahkan queue berdasarkan domain.
4. Gunakan retry hanya untuk error sementara.
5. Gunakan Dead Letter Queue untuk kegagalan permanen.
6. Publikasikan event pada setiap perubahan status job.
7. Gunakan Correlation ID di seluruh job.
8. Rancang job agar idempotent bila memungkinkan.
9. Jangan menyimpan data sensitif pada payload job.
10. Catat metrik dan log setiap eksekusi job.

---

# Summary

BCMS menggunakan BullMQ dan Redis sebagai fondasi pemrosesan asynchronous. Seluruh operasi provisioning, monitoring, sinkronisasi GenieACS, komunikasi OLT, notifikasi, dan workflow dijalankan melalui Job Queue yang mendukung retry, scheduling, observability, dan Dead Letter Queue. Arsitektur ini meningkatkan keandalan, skalabilitas, dan kemampuan pemulihan sistem pada lingkungan produksi.
