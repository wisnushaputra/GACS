# DOCKER.md

# Broadband Customer Monitoring System (BCMS)

## Docker & Deployment Guide

Version 1.0

---

# Overview

Seluruh komponen BCMS dijalankan menggunakan Docker.

Target deployment:

* Linux (Ubuntu Server/Debian)
* Docker Engine
* Docker Compose
* Nginx Reverse Proxy

---

# Deployment Architecture

```text
                    Internet
                        │
                        ▼
                 Nginx Reverse Proxy
                        │
          ┌─────────────┴─────────────┐
          │                           │
          ▼                           ▼
   Frontend (React)            Backend (Fastify)
                                       │
                 ┌─────────────────────┼─────────────────────┐
                 ▼                     ▼                     ▼
            PostgreSQL              Redis             Worker Service
                                                          │
                                           ┌──────────────┴──────────────┐
                                           ▼                             ▼
                                    GenieACS Adapter              OLT Adapter
                                           │                             │
                                           ▼                             ▼
                                       GenieACS                     OLT Devices
```

---

# Containers

BCMS terdiri dari beberapa container.

| Service  | Purpose           |
| -------- | ----------------- |
| nginx    | Reverse Proxy     |
| frontend | React + Vite      |
| backend  | Fastify API       |
| worker   | Background Worker |
| postgres | Database          |
| redis    | Cache & Queue     |

Future

| Service       |
| ------------- |
| grafana       |
| prometheus    |
| loki          |
| cadvisor      |
| node-exporter |

---

# Docker Network

```text
bcms-network

↓

frontend

backend

worker

postgres

redis
```

Semua container berada pada network yang sama.

---

# Folder Structure

```text
project/

backend/

frontend/

docker/

nginx/

postgres/

redis/

compose/

docker-compose.yml

docker-compose.prod.yml

.env

.env.production
```

---

# Backend Dockerfile

Requirements

* Node 22 LTS
* pnpm
* TypeScript Build
* Production Image
* Multi Stage Build

Flow

```text
Install

↓

Build

↓

Copy Dist

↓

Run
```

---

# Frontend Dockerfile

Requirements

* Node 22
* Vite Build
* Static Assets

Output

```text
dist/
```

Disajikan melalui Nginx.

---

# Worker Container

Worker menjalankan:

* Provision Queue
* Replace ONU Queue
* PPPoE Queue
* WiFi Queue
* Notification Queue
* Scheduled Jobs
* Health Check

Worker **tidak** membuka HTTP Port.

---

# PostgreSQL

Volume

```text
postgres_data
```

Port

```text
5432
```

Backup

```text
daily
```

Restore

```text
manual
```

---

# Redis

Digunakan untuk:

* Cache
* Queue
* Socket Adapter
* Session
* Rate Limit

Volume

```text
redis_data
```

Port

```text
6379
```

Persistence

```text
AOF
```

---

# Nginx

Responsibilities

* SSL Termination
* Reverse Proxy
* Static File
* Compression
* HTTP/2
* WebSocket Proxy
* Security Header

Routes

```text
/

↓

Frontend

/api

↓

Backend

/socket.io

↓

Backend WebSocket
```

---

# Environment Variables

Backend

```env
NODE_ENV=production

PORT=3000

DATABASE_URL=

REDIS_URL=

JWT_SECRET=

JWT_REFRESH_SECRET=

GENIEACS_BASE_URL=

GENIEACS_USERNAME=

GENIEACS_PASSWORD=
```

Frontend

```env
VITE_API_URL=https://example.com/api/v1

VITE_SOCKET_URL=https://example.com
```

---

# Health Check

Backend

```text
GET /health
```

Worker

```text
Internal Health Endpoint
```

Database

```text
pg_isready
```

Redis

```text
redis-cli ping
```

---

# Startup Order

```text
PostgreSQL

↓

Redis

↓

Backend

↓

Worker

↓

Frontend

↓

Nginx
```

Gunakan health check agar service hanya berjalan ketika dependensi siap.

---

# Docker Compose Services

```text
nginx

frontend

backend

worker

postgres

redis
```

Semua service menggunakan restart policy:

```text
unless-stopped
```

---

# Volumes

```text
postgres_data

redis_data

backend_logs

worker_logs
```

---

# Logging

Semua container menulis log ke stdout/stderr.

Docker menangani log.

Production

Direkomendasikan menggunakan:

* Loki
* Grafana
* Fluent Bit

---

# Resource Recommendation

## Development

| Service    | CPU      | RAM    |
| ---------- | -------- | ------ |
| Backend    | 1 Core   | 512 MB |
| Worker     | 1 Core   | 512 MB |
| PostgreSQL | 1 Core   | 1 GB   |
| Redis      | 0.5 Core | 256 MB |
| Frontend   | 0.5 Core | 256 MB |

---

## Production (5.000 ONU)

| Service    | CPU    | RAM    |
| ---------- | ------ | ------ |
| Backend    | 2 Core | 2 GB   |
| Worker     | 2 Core | 2 GB   |
| PostgreSQL | 4 Core | 4 GB   |
| Redis      | 2 Core | 2 GB   |
| Frontend   | 1 Core | 512 MB |

---

## Production (50.000+ ONU)

Backend dapat dijalankan beberapa instance.

```text
Nginx

↓

Backend x4

↓

Redis Adapter

↓

Socket.IO
```

---

# Scaling

Horizontal

```text
Backend

↓

Socket.IO Redis Adapter
```

Worker

```text
Worker xN
```

Queue memastikan task hanya diproses satu worker.

---

# Queue

BullMQ

↓

Redis

↓

Worker

Task

* Register ONU
* Replace ONU
* Push PPPoE
* Push WiFi
* Reboot
* Refresh

---

# Secrets

Jangan menyimpan:

* Password Database
* Password OLT
* Password GenieACS
* JWT Secret

di repository.

Gunakan:

* `.env.production`
* Docker Secrets (opsional)
* Secret Manager (future)

---

# Security

* Non-root user pada container
* Read-only filesystem jika memungkinkan
* Minimal Linux capability
* Health check aktif
* Image resmi (Official Images)
* Update image secara berkala

---

# Backup Strategy

PostgreSQL

* Daily Full Backup
* Hourly WAL Archive (future)

Redis

* AOF Enabled
* Snapshot harian

Backup disimpan di storage terpisah.

---

# Monitoring Stack (Future)

```text
Prometheus

↓

Grafana

↓

Loki

↓

Alertmanager
```

Metrik yang dipantau:

* CPU
* RAM
* Disk
* Queue Length
* Active Socket
* Redis Memory
* PostgreSQL Connections
* API Latency
* Worker Throughput

---

# CI/CD Pipeline

Flow

```text
Git Push

↓

Lint

↓

Unit Test

↓

Build

↓

Docker Image

↓

Push Registry

↓

Deploy

↓

Health Check

↓

Smoke Test
```

---

# Production Checklist

* HTTPS aktif
* Firewall dikonfigurasi
* Backup otomatis
* Monitoring aktif
* Log aggregation aktif
* Environment variable aman
* Database migration dijalankan
* Seeder production (opsional)
* Queue worker aktif
* Redis persistence aktif
* Health check lulus

---

# Disaster Recovery

Jika Backend gagal:

* Restart container.

Jika Worker gagal:

* Queue tetap tersimpan di Redis.
* Worker baru melanjutkan task.

Jika PostgreSQL gagal:

* Restore dari backup terakhir.
* Jalankan migration bila diperlukan.

Jika Redis gagal:

* Cache dibangun ulang.
* Queue dipulihkan dari persistence (AOF).

---

# Docker Best Practices

1. Gunakan **multi-stage build** untuk backend dan frontend.
2. Jangan menjalankan proses sebagai `root`.
3. Gunakan image resmi dan versi yang dipin (misalnya `node:22-alpine`, `postgres:16`, `redis:7`).
4. Simpan konfigurasi di `.env`, bukan di Dockerfile.
5. Gunakan volume untuk data PostgreSQL dan Redis.
6. Pisahkan compose untuk development (`docker-compose.yml`) dan production (`docker-compose.prod.yml`).
7. Jalankan migration database sebagai langkah deployment sebelum backend menerima traffic.

---

# Future Deployment

Tahap berikutnya BCMS dapat dijalankan di:

* Docker Swarm
* Kubernetes
* Nomad
* OpenShift

Dengan perubahan minimal karena seluruh service telah dipisahkan menjadi container independen.
