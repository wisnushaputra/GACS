# OBSERVABILITY.md

# BCMS Observability

Version: 1.0

---

# Overview

BCMS menerapkan **Observability by Design** untuk memastikan seluruh sistem dapat dipantau, dianalisis, dan ditelusuri secara efektif.

Observability terdiri dari tiga pilar utama:

* Logs
* Metrics
* Traces

Komponen pendukung:

* Health Check
* Alerting
* Dashboards
* Correlation ID

---

# Goals

* Mempermudah troubleshooting
* Mengurangi MTTR (Mean Time To Recovery)
* Menyediakan visibilitas end-to-end
* Memantau performa sistem
* Mendeteksi anomali lebih awal

---

# High Level Architecture

```text
                Frontend
                    │
                    ▼
              Fastify API
                    │
      ┌─────────────┼─────────────┐
      ▼             ▼             ▼
 Workflow      Socket.IO      BullMQ
      │             │             │
      ▼             ▼             ▼
 OLT Adapter    GenieACS     PostgreSQL
      │
      ▼
 Structured Logs
      │
      ▼
 Log Storage

 Metrics
      │
      ▼
 Prometheus

 Traces
      │
      ▼
 OpenTelemetry

 Dashboards
      │
      ▼
 Grafana
```

---

# Observability Stack

| Component       | Recommendation   |
| --------------- | ---------------- |
| Logging         | Pino             |
| Metrics         | Prometheus       |
| Dashboard       | Grafana          |
| Tracing         | OpenTelemetry    |
| Log Aggregation | Loki / ELK       |
| Alerting        | Grafana Alerting |

---

# Correlation ID

Setiap request harus memiliki **Correlation ID**.

Contoh:

```text
X-Correlation-ID

8b3f25b9...
```

Correlation ID diteruskan ke:

* HTTP
* BullMQ
* Workflow
* Socket.IO
* GenieACS Integration
* OLT Adapter
* Audit Log

---

# Structured Logging

Gunakan format JSON.

Contoh:

```json
{
  "timestamp": "...",
  "level": "info",
  "correlationId": "...",
  "module": "workflow",
  "action": "onu.register",
  "duration": 420,
  "result": "success"
}
```

---

# Log Levels

| Level | Usage                           |
| ----- | ------------------------------- |
| TRACE | Debug sangat detail             |
| DEBUG | Informasi pengembangan          |
| INFO  | Aktivitas normal                |
| WARN  | Kondisi yang perlu diperhatikan |
| ERROR | Kegagalan operasi               |
| FATAL | Sistem tidak dapat melanjutkan  |

---

# Logging Rules

Selalu log:

* Login
* Logout
* Workflow
* Job Queue
* API Error
* OLT Command
* GenieACS Call
* Notification
* Cache Miss
* Retry

Jangan log:

* Password
* JWT
* Secret
* API Key
* SSH Credential

---

# Metrics

Pantau metrik berikut.

## API

* Request Count
* Request Duration
* Error Rate
* Success Rate

---

## Database

* Query Duration
* Active Connection
* Slow Query
* Failed Query

---

## Redis

* Memory Usage
* Hit Rate
* Miss Rate
* Connected Clients

---

## BullMQ

* Waiting Jobs
* Active Jobs
* Failed Jobs
* Retry Count
* Queue Latency

---

## Workflow

* Running Workflow
* Failed Workflow
* Retry Workflow
* Average Duration

---

## GenieACS

* API Latency
* Failed Request
* Success Rate
* Device Sync Count

---

## OLT Adapter

* SSH/API Connection Count
* Command Latency
* Timeout Count
* Failed Commands

---

## Monitoring

* ONU Online
* ONU Offline
* LOS Count
* Dying Gasp Count
* OLT Reachability

---

## Notification

* Sent Count
* Failed Count
* Retry Count

---

# Distributed Tracing

Seluruh alur request harus dapat ditelusuri.

Contoh:

```text
HTTP Request
      │
      ▼
Workflow
      │
      ▼
BullMQ
      │
      ▼
OLT Adapter
      │
      ▼
GenieACS
      │
      ▼
Socket.IO
```

Semua span menggunakan Correlation ID yang sama.

---

# Health Check

Sediakan endpoint:

```text
GET /health
GET /ready
GET /live
```

## /health

Memeriksa:

* PostgreSQL
* Redis
* BullMQ
* GenieACS
* OLT Adapter

---

## /ready

Mengembalikan status kesiapan aplikasi menerima traffic.

---

## /live

Mengembalikan status bahwa proses aplikasi masih berjalan.

---

# Dashboard

Grafana minimal menampilkan:

* API Latency
* Workflow Status
* Queue Status
* Monitoring Summary
* OLT Status
* GenieACS Status
* Redis
* PostgreSQL
* Socket.IO Connections

---

# Alerting

Alert dibuat untuk:

* API Error Rate tinggi
* Redis tidak tersedia
* PostgreSQL tidak tersedia
* Queue menumpuk
* Workflow gagal berulang
* GenieACS tidak merespons
* OLT tidak dapat diakses
* LOS meningkat drastis
* Dying Gasp meningkat drastis

---

# Performance Targets (SLO)

Contoh target awal:

| Metric              | Target         |
| ------------------- | -------------- |
| API Availability    | ≥ 99.9%        |
| API Response (P95)  | < 300 ms       |
| Workflow Completion | ≥ 95% berhasil |
| Queue Waiting Time  | < 5 detik      |
| Dashboard Refresh   | < 2 detik      |
| Monitoring Update   | < 10 detik     |

Target dapat disesuaikan berdasarkan kapasitas infrastruktur dan kebutuhan operasional.

---

# Error Tracking

Setiap error mencatat:

* Correlation ID
* Module
* Stack Trace (internal)
* User
* Workflow ID (jika ada)
* Job ID (jika ada)

Stack trace hanya tersedia di log internal, bukan dikirim ke frontend.

---

# Audit Integration

Observability tidak menggantikan Audit Log.

Perbedaannya:

| Audit               | Observability                 |
| ------------------- | ----------------------------- |
| Siapa melakukan apa | Bagaimana sistem bekerja      |
| Fokus kepatuhan     | Fokus operasional             |
| Tidak dapat diubah  | Dapat diproses untuk analisis |

---

# AI Coding Rules

AI wajib mengikuti aturan berikut:

1. Gunakan structured logging.
2. Seluruh request memiliki Correlation ID.
3. Jangan mencetak secret ke log.
4. Gunakan log level yang sesuai.
5. Publikasikan metrics untuk komponen utama.
6. Gunakan distributed tracing untuk proses lintas layanan.
7. Implementasikan endpoint `/health`, `/ready`, dan `/live`.
8. Tambahkan metrik untuk API, Queue, Redis, Database, Workflow, OLT, dan GenieACS.
9. Error harus dapat ditelusuri menggunakan Correlation ID.
10. Dashboard operasional harus menampilkan metrik utama secara realtime.

---

# Production Checklist

* [ ] Structured logging aktif.
* [ ] Correlation ID diterapkan.
* [ ] Metrics diekspor ke Prometheus.
* [ ] Dashboard Grafana tersedia.
* [ ] Health endpoint aktif.
* [ ] Alerting dikonfigurasi.
* [ ] Tracing lintas layanan aktif.
* [ ] Log sensitif telah dimasking.
* [ ] Queue metrics tersedia.
* [ ] Workflow metrics tersedia.

---

# Summary

BCMS menerapkan Observability by Design dengan structured logging, metrics, distributed tracing, health checks, dan alerting. Setiap request menggunakan Correlation ID sehingga alur dari REST API, Workflow Engine, BullMQ, OLT Adapter, GenieACS, hingga Socket.IO dapat ditelusuri secara menyeluruh. Standar ini memastikan sistem mudah dipantau, dianalisis, dan dipelihara pada lingkungan produksi 24/7.
