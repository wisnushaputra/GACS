# SOCKET_EVENTS.md

# Broadband Customer Monitoring System (BCMS)

## Realtime Event Architecture

Version 1.0

---

# Overview

BCMS menggunakan **Socket.IO** sebagai mekanisme komunikasi realtime antara backend dan frontend.

Semua perubahan status perangkat, task, alarm, dan dashboard dikirim melalui event.

REST API hanya digunakan untuk:

* Login
* CRUD
* Configuration
* Search
* Report

Semua update realtime menggunakan Socket.IO.

---

# Architecture

```
OLT Adapter
      │
      │
GenieACS Adapter
      │
      ▼
Workflow Engine
      │
      ▼
Event Bus
      │
      ▼
Redis Pub/Sub
      │
      ▼
Socket Gateway
      │
      ▼
Frontend
```

---

# Event Flow

```
ONU LOS

↓

OLT Adapter

↓

Alarm Event

↓

Redis

↓

Socket.IO

↓

Dashboard
```

---

# Namespace

```
/dashboard

/device

/events

/tasks

/notification

/system
```

---

# Authentication

Semua namespace menggunakan JWT.

Connection

```
socket.handshake.auth.token
```

Jika token invalid

↓

Disconnect

---

# Dashboard Namespace

```
/dashboard
```

Events

```
dashboard:summary

dashboard:counter

dashboard:chart

dashboard:olt

dashboard:refresh
```

---

## dashboard:summary

Payload

```json
{
    "online":3200,
    "offline":120,
    "los":32,
    "dyingGasp":5,
    "unknown":8
}
```

---

## dashboard:olt

```json
[
    {
        "oltId":"1",
        "name":"OLT-01",
        "online":1000,
        "offline":10,
        "los":2
    }
]
```

---

# Device Namespace

```
/device
```

Room

```
device:{deviceId}
```

Events

```
device:update

device:status

device:signal

device:wifi

device:pppoe

device:firmware

device:reboot

device:refresh
```

---

## device:update

```json
{
    "deviceId":"",
    "status":"ONLINE"
}
```

---

## device:signal

```json
{
    "deviceId":"",
    "rxPower":-21.3,
    "txPower":2.1,
    "temperature":45
}
```

---

## device:wifi

```json
{
    "deviceId":"",
    "ssid":"HOME_WIFI",
    "hidden":false
}
```

---

# Monitoring Namespace

```
/events
```

Events

```
onu:online

onu:offline

onu:los

onu:dyinggasp

onu:registered

onu:deleted

onu:replaced

onu:updated
```

---

## onu:los

```json
{
    "deviceId":"",
    "serialNumber":"",
    "customer":"John Doe",
    "olt":"OLT-01",
    "pon":"0/1/1",
    "time":"2026-01-01T12:00:00Z"
}
```

---

## onu:dyinggasp

```json
{
    "deviceId":"",
    "serialNumber":"",
    "customer":"John Doe",
    "duration":3
}
```

---

# Task Namespace

```
/tasks
```

Room

```
task:{taskId}
```

Events

```
task:created

task:running

task:progress

task:completed

task:failed
```

---

## task:progress

```json
{
    "taskId":"",
    "progress":45,
    "step":"Push PPPoE"
}
```

---

## task:completed

```json
{
    "taskId":"",
    "status":"SUCCESS"
}
```

---

# Notification Namespace

```
/notification
```

Events

```
notification:new

notification:read
```

---

## notification:new

```json
{
    "title":"LOS Alarm",
    "message":"Customer ABC mengalami LOS",
    "level":"CRITICAL"
}
```

---

# System Namespace

```
/system
```

Events

```
system:health

system:database

system:redis

system:genieacs

system:olt

system:worker
```

---

## system:health

```json
{
    "database":"UP",
    "redis":"UP",
    "genieacs":"UP",
    "worker":"UP"
}
```

---

# Event Priority

Critical

```
LOS

DYING_GASP

ONU_OFFLINE
```

High

```
REGISTER

REPLACE

DELETE

REBOOT
```

Normal

```
SSID_UPDATE

PPPOE_UPDATE

REFRESH
```

Low

```
Dashboard Refresh

Statistic Update
```

---

# Room Strategy

Dashboard

```
dashboard
```

OLT

```
olt:{oltId}
```

Device

```
device:{deviceId}
```

Task

```
task:{taskId}
```

User

```
user:{userId}
```

Role

```
role:{roleName}
```

---

# Event Source

```
OLT Adapter

↓

Workflow Engine

↓

Redis Event Bus

↓

Socket Gateway

↓

Client
```

atau

```
GenieACS Adapter

↓

Redis Event Bus

↓

Socket Gateway
```

---

# Redis Channels

```
dashboard

device

events

notification

task

system
```

---

# Connection Lifecycle

```
Connect

↓

Authenticate

↓

Join Rooms

↓

Receive Events

↓

Heartbeat

↓

Disconnect

↓

Reconnect
```

---

# Heartbeat

Ping

```
25 detik
```

Timeout

```
60 detik
```

---

# Reconnect Strategy

Retry

```
5 kali
```

Delay

```
1

2

5

10

30 detik
```

Exponential Backoff.

---

# Rate Limit

Dashboard

```
1 event / detik
```

Device

```
5 event / detik
```

Notification

```
Unlimited
```

Task

```
10 event / detik
```

Jika event terlalu banyak, backend melakukan batching untuk dashboard dan statistik.

---

# Event Envelope

Semua event mengikuti format berikut.

```json
{
    "id":"uuid-v7",
    "event":"onu:los",
    "namespace":"/events",
    "timestamp":"2026-01-01T12:00:00Z",
    "source":"olt-adapter",
    "payload":{}
}
```

---

# Event Ordering

* Gunakan `timestamp` UTC ISO-8601.
* Sertakan `sequence` per perangkat jika urutan sangat penting.
* Hindari asumsi bahwa event selalu diterima dalam urutan yang sama pada jaringan yang tidak stabil.

---

# Frontend Event Handling

Semua event diproses melalui Zustand Store.

```
Socket

↓

Socket Service

↓

Event Dispatcher

↓

Store

↓

React Component
```

Komponen React tidak boleh menangani event Socket.IO secara langsung.

---

# Offline Strategy

Jika koneksi Socket terputus:

1. Tampilkan indikator "Realtime Disconnected".
2. Simpan event lokal yang belum terkirim (jika ada).
3. Setelah reconnect, panggil endpoint REST sinkronisasi (`GET /monitoring/realtime`) untuk memastikan data kembali konsisten.

---

# Security

* JWT wajib pada saat handshake.
* Validasi role sebelum bergabung ke room.
* Namespace `/system` hanya untuk Admin.
* Informasi sensitif (password PPPoE/WiFi) tidak boleh dikirim melalui Socket.IO.

---

# Monitoring & Metrics

Catat metrik berikut:

* Total Active Connections
* Events Published/sec
* Events Delivered/sec
* Average Delivery Latency
* Failed Deliveries
* Reconnect Count
* Redis Pub/Sub Lag

---

# Future Enhancements

* Redis Adapter untuk multi-instance Socket.IO
* Kafka/NATS Event Bus
* Server-Sent Events (SSE) fallback
* Push Notification ke Mobile
* Event Replay
* Persistent Event Store

---

# Event Naming Convention

Gunakan format:

```
resource:action
```

Contoh:

```
onu:online

onu:offline

onu:los

onu:dyinggasp

task:progress

task:completed

dashboard:summary

notification:new

system:health
```

Hindari nama event yang ambigu seperti `update`, `change`, atau `data`.

---

# Design Principles

1. Semua event harus immutable (tidak diubah setelah dipublikasikan).
2. Payload harus sekecil mungkin dan hanya memuat data yang diperlukan.
3. Gunakan room untuk mengurangi broadcast yang tidak perlu.
4. Event berasal dari Event Bus, bukan langsung dari controller.
5. Socket Gateway hanya bertugas mendistribusikan event, bukan menjalankan business logic.
6. Dashboard menggunakan event agregasi, sedangkan halaman detail perangkat menggunakan event spesifik perangkat.
