# API_SPEC.md

# Broadband Customer Monitoring System (BCMS)

Version 1.0

---

# API Overview

## Base URL

```
/api/v1
```

Semua endpoint menggunakan format JSON.

Content-Type

```
application/json
```

Authentication

```
Authorization: Bearer <JWT_TOKEN>
```

---

# Standard Response

## Success

```json
{
  "success": true,
  "message": "Success",
  "data": {},
  "meta": {}
}
```

---

## Error

```json
{
  "success": false,
  "error": {
    "code": "DEVICE_NOT_FOUND",
    "message": "ONU not found"
  }
}
```

---

# Authentication

## POST /auth/login

Login User

Body

```json
{
  "username": "admin",
  "password": "password"
}
```

Response

```json
{
  "accessToken": "",
  "refreshToken": "",
  "expiresIn": 3600,
  "user": {}
}
```

---

## POST /auth/refresh

Generate Access Token Baru

Body

```json
{
  "refreshToken": ""
}
```

---

## POST /auth/logout

Logout

---

## GET /auth/profile

Profile Login

---

# Dashboard

## GET /dashboard/summary

Response

```json
{
  "totalCustomers": 3000,
  "online": 2800,
  "offline": 120,
  "los": 50,
  "dyingGasp": 30,
  "unknown": 10,
  "totalOLT": 5,
  "totalONU": 3200
}
```

---

## GET /dashboard/trend

Query

```
range=24h

range=7d

range=30d
```

Response

```json
[
  {
    "time": "",
    "online": 100,
    "offline": 20
  }
]
```

---

## GET /dashboard/olt-summary

Response

```json
[
  {
    "oltId": "",
    "name": "OLT-01",
    "online": 1000,
    "offline": 25,
    "los": 5,
    "dyingGasp": 2
  }
]
```

---

# Customers

## GET /customers

Query

```
page

limit

keyword

status

oltId
```

---

## GET /customers/{id}

Detail Customer

---

## POST /customers

Tambah Customer

---

## PUT /customers/{id}

Update Customer

---

## DELETE /customers/{id}

Soft Delete

---

# ONU

## GET /onus

Query

```
page

limit

status

oltId

serialNumber

customerName
```

---

## GET /onus/{id}

Detail ONU

Response

```json
{
  "customer": {},
  "device": {},
  "wifi": {},
  "pppoe": {},
  "signal": {},
  "events": []
}
```

---

## GET /onus/{id}/status

Realtime Status

---

## GET /onus/{id}/events

History Event

---

## GET /onus/{id}/signal

Signal History

---

# Monitoring

## GET /monitoring/realtime

Realtime Snapshot

---

## GET /monitoring/online

---

## GET /monitoring/offline

---

## GET /monitoring/los

---

## GET /monitoring/dying-gasp

---

## GET /monitoring/unknown

---

# OLT

## GET /olts

List OLT

---

## GET /olts/{id}

Detail OLT

---

## POST /olts

Tambah OLT

---

## PUT /olts/{id}

Update OLT

---

## DELETE /olts/{id}

Delete OLT

---

## GET /olts/{id}/onus

Semua ONU pada OLT

---

# Provision

## POST /provision/register

Register ONU

Body

```json
{
  "serialNumber": "",
  "oltId": "",
  "ponPort": "1/1/1",
  "onuId": 10,
  "profile": "Bridge",
  "vlan": 100
}
```

Response

```json
{
  "taskId": "",
  "status": "RUNNING"
}
```

---

## GET /provision/tasks

List Task

---

## GET /provision/tasks/{id}

Task Detail

---

# PPPoE

## POST /pppoe/push

Body

```json
{
  "onuId": "",
  "username": "",
  "password": ""
}
```

Response

```json
{
  "taskId": ""
}
```

---

# WiFi

## POST /wifi/update

Body

```json
{
  "onuId": "",
  "ssid": "",
  "password": "",
  "channel": 6,
  "bandwidth": "40MHz",
  "hidden": false
}
```

---

## GET /wifi/{onuId}

Read WiFi

---

# Replace ONU

## POST /replace

Body

```json
{
  "oldSerialNumber": "",
  "newSerialNumber": ""
}
```

Response

```json
{
  "taskId": ""
}
```

---

# Device

## POST /device/reboot

```json
{
  "onuId": ""
}
```

---

## POST /device/factory-reset

```json
{
  "onuId": ""
}
```

---

## POST /device/refresh

Refresh Parameters

---

## POST /device/connection-request

Connection Request

---

# Events

## GET /events

Query

```
page

limit

event

oltId

customer

from

to
```

---

## GET /events/{id}

Event Detail

---

# Notifications

## GET /notifications

---

## PUT /notifications/{id}/read

Mark Read

---

# User Management

## GET /users

---

## GET /users/{id}

---

## POST /users

---

## PUT /users/{id}

---

## DELETE /users/{id}

---

# Roles

## GET /roles

---

## POST /roles

---

## PUT /roles/{id}

---

# Settings

## GET /settings

---

## PUT /settings

---

# Audit Log

## GET /audit

Query

```
page

limit

user

action

from

to
```

---

## GET /audit/{id}

---

# Search

## GET /search

Query

```
keyword
```

Search

* Customer
* ONU
* PPPoE
* Serial Number
* Device ID

---

# Health Check

## GET /health

Response

```json
{
  "status": "UP",
  "database": "UP",
  "redis": "UP",
  "genieacs": "UP",
  "socket": "UP"
}
```

---

# Metrics

## GET /metrics

Prometheus Endpoint

---

# HTTP Status Code

| Code | Description           |
| ---- | --------------------- |
| 200  | OK                    |
| 201  | Created               |
| 204  | No Content            |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Not Found             |
| 409  | Conflict              |
| 422  | Validation Error      |
| 429  | Too Many Requests     |
| 500  | Internal Server Error |

---

# Error Codes

```
AUTH_INVALID_CREDENTIAL

AUTH_TOKEN_EXPIRED

AUTH_FORBIDDEN

CUSTOMER_NOT_FOUND

ONU_NOT_FOUND

OLT_NOT_FOUND

GENIEACS_UNAVAILABLE

TASK_FAILED

VALIDATION_ERROR

DATABASE_ERROR

CACHE_ERROR

UNKNOWN_ERROR
```

---

# Pagination

Query

```
?page=1&limit=20
```

Response

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 250,
    "totalPages": 13
  }
}
```

---

# Filtering

```
status=ONLINE

status=LOS

status=OFFLINE

oltId=

customer=

serialNumber=

from=

to=
```

---

# Sorting

```
sort=createdAt

order=asc

order=desc
```

---

# API Versioning

Seluruh endpoint menggunakan prefix:

```
/api/v1
```

Versi berikutnya:

```
/api/v2
```

Tidak mengubah endpoint lama selama masa deprecation.

---

# Security

* JWT Authentication
* Refresh Token Rotation
* Role-Based Access Control (RBAC)
* Permission Middleware
* Helmet
* CORS
* Rate Limiter
* Request Validation menggunakan Zod
* Audit Logging untuk seluruh endpoint yang mengubah data

---

# Realtime Integration

REST API digunakan untuk operasi CRUD dan task management.

Socket.IO digunakan untuk:

* dashboard:update
* dashboard:summary
* device:update
* device:online
* device:offline
* device:los
* device:dyinggasp
* task:update
* notification:new

Client harus melakukan autentikasi Socket.IO menggunakan JWT sebelum bergabung ke namespace yang sesuai.

---

# OpenAPI Compatibility

Spesifikasi ini dirancang agar dapat dikonversi langsung ke **OpenAPI 3.1**, sehingga dokumentasi Swagger dapat dihasilkan secara otomatis dari schema Zod/Fastify dan digunakan untuk pengujian maupun integrasi pihak ketiga.
