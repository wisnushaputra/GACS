# ADAPTER_ARCHITECTURE.md

# Broadband Customer Monitoring System (BCMS)

## External Adapter Architecture

Version 1.0

---

# Purpose

Dokumen ini mendefinisikan standar integrasi seluruh sistem eksternal yang digunakan BCMS.

Business Layer **tidak boleh mengetahui** detail implementasi vendor maupun protokol.

Semua integrasi dilakukan melalui **Adapter Layer**.

---

# High Level Architecture

```text
                React Dashboard
                       │
                 REST / Socket.IO
                       │
                Fastify Controller
                       │
                 Business Service
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
   GenieACS      OLT Adapter     Notification
    Adapter          Layer          Adapter
        │              │              │
        ▼              ▼              ▼
   GenieACS      Huawei/ZTE/...   Telegram/Email
```

Business Service hanya mengenal **Interface**.

Tidak boleh melakukan HTTP Request, SSH, SNMP, ataupun CLI secara langsung.

---

# Adapter Layer Responsibilities

Adapter Layer bertanggung jawab untuk:

* Komunikasi dengan sistem eksternal
* Mapping request
* Mapping response
* Retry
* Timeout
* Authentication
* Error Translation
* Logging
* Metrics
* Circuit Breaker
* Vendor Detection

Business Rule **tidak boleh berada di Adapter**.

---

# Adapter Categories

```
adapter/

genieacs/

olt/

radius/

mikrotik/

billing/

notification/

storage/

snmp/
```

Semua kategori memiliki struktur yang sama.

---

# Standard Folder Structure

```text
adapter/

genieacs/

GenieACSAdapter.ts

GenieACSClient.ts

mapper.ts

types.ts

errors.ts

factory.ts

olt/

OLTAdapter.ts

factory.ts

Huawei/

ZTE/

Fiberhome/

VSOL/

notification/

TelegramAdapter.ts

EmailAdapter.ts

WebhookAdapter.ts
```

---

# Dependency Flow

```text
Controller

↓

Business Service

↓

Adapter Interface

↓

Concrete Adapter

↓

Transport

↓

External System
```

Controller tidak boleh memanggil adapter.

Repository tidak boleh memanggil adapter.

---

# Adapter Interface Example

```ts
interface Adapter<TRequest, TResponse> {

connect()

disconnect()

health()

execute(request:TRequest)

}
```

Semua adapter mengikuti pola yang sama.

---

# Adapter Factory

Semua adapter dibuat melalui Factory.

Contoh

```ts
const adapter = OLTFactory.create(vendor)
```

atau

```ts
const adapter = NotificationFactory.create(provider)
```

Business Layer tidak pernah membuat object adapter secara langsung.

---

# Transport Layer

Adapter tidak langsung menggunakan Axios atau SSH.

Gunakan transport abstraction.

```
Transport

↓

HTTP

↓

SSH

↓

NETCONF

↓

SNMP

↓

REST
```

Contoh

```
HttpTransport

SSHTransport

NetconfTransport

SNMPTransport
```

---

# Vendor Adapter

Huawei

```
HuaweiAdapter

↓

HuaweiCommandBuilder

↓

SSHTransport
```

---

ZTE

```
ZTEAdapter

↓

NetconfBuilder

↓

NetconfTransport
```

---

VSOL

```
VSOLAdapter

↓

REST Builder

↓

HTTP Transport
```

---

# Mapping Layer

External Response

↓

Mapper

↓

Internal DTO

Contoh

Huawei

```
display ont info
```

↓

Huawei Parser

↓

ONUModel

---

GenieACS

```
DeviceInfo.SerialNumber
```

↓

Mapper

↓

DeviceModel

---

# Business Model

Business Layer hanya mengenal model internal.

Contoh

```ts
interface ONU {

id

serialNumber

status

rxPower

txPower

firmware

manufacturer

}
```

Huawei maupun GenieACS wajib menghasilkan model ini.

---

# Retry Policy

Semua adapter menggunakan retry.

```
Max Retry

3
```

Delay

```
1000 ms
```

Retry hanya untuk error yang bersifat sementara (timeout, koneksi terputus, HTTP 5xx). Error validasi atau autentikasi tidak diulang.

---

# Timeout

```
HTTP

15 detik

SSH

10 detik

NETCONF

20 detik
```

---

# Circuit Breaker

Jika adapter gagal berulang kali

↓

Open Circuit

↓

Reject Request

↓

Retry Background

↓

Close Circuit

Menggunakan library seperti **Opossum** atau implementasi internal.

---

# Logging

Semua adapter wajib mencatat:

```
Request ID

Correlation ID

Adapter

Vendor

Method

Duration

Status

Error
```

Credential dan data sensitif tidak boleh dicatat.

---

# Metrics

Adapter wajib menghasilkan metric.

```
Request Count

Success Count

Failure Count

Latency

Timeout

Retry

Circuit Breaker
```

Prometheus

↓

Grafana

---

# Event Flow

Adapter menghasilkan event.

Contoh

```
ONU_REGISTERED

ONU_REBOOT

LOS

DYING_GASP

DEVICE_ONLINE

DEVICE_OFFLINE
```

Event

↓

Redis

↓

Socket.IO

↓

Dashboard

---

# Error Translation

Vendor Error

↓

Adapter Error

↓

Business Error

↓

API Response

Contoh

Huawei

```
ONU already exists
```

↓

```
ONU_ALREADY_EXISTS
```

↓

HTTP 409

---

# Configuration

Semua konfigurasi berasal dari

```
.env
```

atau

```
Database
```

Tidak boleh hardcoded.

---

# Dependency Injection

Semua adapter didaftarkan sebagai service.

```
Container

↓

Factory

↓

Service
```

Tidak boleh menggunakan

```
new HuaweiAdapter()
```

di Business Layer.

---

# Interface Segregation

Pisahkan interface berdasarkan domain.

Contoh

```
MonitoringAdapter

ProvisionAdapter

ConfigurationAdapter

AlarmAdapter
```

Jangan membuat satu interface yang terlalu besar.

---

# Asynchronous Task Flow

Operasi yang memerlukan waktu lama (register ONU, replace ONU, push konfigurasi) tidak dieksekusi langsung di request HTTP.

Flow:

```text
Client

↓

API

↓

Task Queue

↓

Worker

↓

Adapter

↓

External System

↓

Update Task

↓

Socket.IO

↓

Frontend
```

Queue yang direkomendasikan:

* BullMQ
* Redis Streams
* RabbitMQ (future)

---

# Adapter Lifecycle

```
Initialize

↓

Health Check

↓

Ready

↓

Execute

↓

Retry

↓

Complete

↓

Dispose
```

---

# Adapter Result Format

Semua adapter mengembalikan hasil yang seragam.

```ts
interface AdapterResult<T> {

success:boolean

data?:T

error?:AdapterError

duration:number

requestId:string

}
```

---

# Security

Semua komunikasi eksternal harus:

* HTTPS jika tersedia
* SSH Key lebih diutamakan dibanding password
* Secret disimpan di `.env` atau Secret Manager
* Validasi sertifikat TLS jika menggunakan HTTPS
* Audit log untuk seluruh operasi perubahan konfigurasi

---

# Testing Strategy

Setiap adapter wajib memiliki:

* Unit Test
* Mock Transport
* Integration Test
* Contract Test

Transport (HTTP/SSH/NETCONF) harus dapat dimock agar tidak bergantung pada perangkat fisik saat CI/CD.

---

# Future Adapters

Arsitektur ini dirancang untuk memudahkan penambahan integrasi baru tanpa mengubah Business Layer.

Contoh:

```
GenieACS

OLT

MikroTik

FreeRADIUS

UISP

UNMS

Grafana

Prometheus

Zabbix

LibreNMS

WhatsApp

Telegram

Discord

Slack

Email

Webhook

S3 Storage

MinIO

Google Drive
```

Semua cukup mengimplementasikan interface dan didaftarkan pada factory masing-masing.

---

# Design Principles

1. **Dependency Inversion Principle**: Business Service bergantung pada interface, bukan implementasi.
2. **Open/Closed Principle**: Menambah vendor atau layanan baru tidak mengubah kode yang sudah ada.
3. **Strategy Pattern**: Memilih implementasi adapter berdasarkan vendor/protokol.
4. **Factory Pattern**: Seluruh adapter dibuat melalui factory.
5. **Adapter Pattern**: Menyamakan perilaku berbagai sistem eksternal ke model internal BCMS.
6. **Transport Abstraction**: HTTP, SSH, NETCONF, SNMP, dan REST diperlakukan sebagai lapisan transport yang dapat dipertukarkan.
7. **Observable by Default**: Semua adapter menghasilkan log, metric, tracing, dan event sehingga mudah dipantau dan di-debug.
