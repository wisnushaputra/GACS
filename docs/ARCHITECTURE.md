# ARCHITECTURE.md

# Broadband Customer Monitoring System (BCMS)

Version 1.0

---

# Architecture Overview

BCMS menggunakan arsitektur **Modular Monolith** dengan prinsip **Clean Architecture**, sehingga setiap modul memiliki tanggung jawab yang jelas, mudah diuji, dan mudah dipisahkan menjadi microservice di masa depan.

```
                +----------------------+
                |      React UI        |
                |  React + Vite        |
                +----------+-----------+
                           |
                    REST API / Socket.IO
                           |
                +----------v-----------+
                |   Fastify Backend    |
                |    TypeScript        |
                +----------+-----------+
                           |
          +----------------+----------------+
          |                                 |
   PostgreSQL                        Redis Cache
          |                                 |
          +----------------+----------------+
                           |
                    GenieACS Service
                           |
                   GenieACS REST API
                           |
                      OLT / ONU Devices
```

---

# Architecture Principles

Semua kode harus mengikuti prinsip berikut:

* Clean Architecture
* SOLID Principle
* DRY
* KISS
* Repository Pattern
* Service Layer
* Dependency Injection
* Single Responsibility
* Modular Design
* Feature First

---

# Layer Architecture

Setiap module memiliki struktur yang sama.

```
Controller
      │
      ▼
Service
      │
      ▼
Repository
      │
      ▼
Database
```

External Service

```
Controller
      │
      ▼
Service
      │
      ▼
GenieACS Client
```

Business logic hanya boleh berada di Service Layer.

Controller tidak boleh berisi business logic.

Repository hanya bertanggung jawab terhadap database.

---

# High Level Modules

```
Auth

Dashboard

Monitoring

Customers

Devices

OLT

Provision

PPPoE

WiFi

Replace ONU

Events

Logs

Users

Settings

Socket

GenieACS

Notification
```

Setiap module berdiri sendiri.

Module tidak boleh mengakses database module lain secara langsung.

Komunikasi dilakukan melalui service.

---

# Backend Folder Structure

```
backend
│
├── src
│
├── app.ts
│
├── server.ts
│
├── config
│
├── db
│   ├── schema
│   ├── migrations
│   └── index.ts
│
├── plugins
│
├── middleware
│
├── lib
│
├── socket
│
├── utils
│
├── types
│
├── modules
│
│   ├── auth
│   │
│   ├── dashboard
│   │
│   ├── monitoring
│   │
│   ├── customers
│   │
│   ├── devices
│   │
│   ├── olt
│   │
│   ├── provision
│   │
│   ├── pppoe
│   │
│   ├── wifi
│   │
│   ├── replace
│   │
│   ├── logs
│   │
│   ├── users
│   │
│   ├── settings
│   │
│   └── genieacs
│
└── shared
```

---

# Module Structure

Contoh:

```
customers

├── controller.ts

├── routes.ts

├── service.ts

├── repository.ts

├── schema.ts

├── dto.ts

├── mapper.ts

├── types.ts

├── validation.ts

└── index.ts
```

---

# Shared Folder

```
shared

constants

errors

logger

cache

auth

socket

database

response

validator

config

helpers
```

Shared hanya berisi kode reusable.

Tidak boleh ada business logic.

---

# Frontend Architecture

```
frontend

src

assets

components

layouts

pages

hooks

services

stores

contexts

routes

types

utils

styles

constants

icons
```

---

# React Folder Strategy

```
pages

Dashboard

Monitoring

Customer

Device

OLT

Provision

ReplaceONU

PPPoE

WiFi

Users

Settings
```

Reusable Component

```
components

Table

Card

Button

Input

Select

Modal

Drawer

Badge

Toast

Loading

Pagination

Chart

Sidebar

Navbar
```

---

# State Management

Gunakan Zustand.

Store dipisah berdasarkan fitur.

Contoh

```
authStore

dashboardStore

deviceStore

socketStore

notificationStore
```

Server state menggunakan React Query.

---

# API Layer

Frontend tidak boleh memanggil fetch secara langsung.

Semua request melalui folder

```
services/api
```

Contoh

```
dashboard.api.ts

customer.api.ts

device.api.ts

wifi.api.ts
```

---

# Database Layer

Menggunakan Drizzle ORM.

```
Service

↓

Repository

↓

Drizzle

↓

PostgreSQL
```

Repository tidak boleh memanggil Redis.

---

# Redis Layer

Redis digunakan untuk

Dashboard Cache

Session

JWT Blacklist

Realtime Counter

Socket Presence

Temporary Task

Rate Limiter

---

# Socket.IO Architecture

Namespace

```
/dashboard

/device

/events

/notification

/tasks
```

Events

```
dashboard:update

dashboard:summary

device:update

device:online

device:offline

device:los

device:dyinggasp

task:update

notification:new
```

---

# GenieACS Layer

Semua komunikasi ke GenieACS melalui

```
GenieACSClient
```

Tidak boleh ada request langsung dari controller.

Flow

```
Controller

↓

Service

↓

GenieACSClient

↓

GenieACS REST API
```

---

# Monitoring Flow

```
ONU

↓

Inform

↓

GenieACS

↓

BCMS Polling/Webhook

↓

Redis

↓

Socket.IO

↓

Dashboard
```

---

# Provision Flow

```
Input Serial Number

↓

Search Device

↓

Validate

↓

Create Task

↓

Push Provision

↓

Monitor Progress

↓

Success
```

---

# Replace ONU Flow

```
Old SN

↓

Read Configuration

↓

Backup Configuration

↓

Replace Serial Number

↓

Push Config

↓

Reboot

↓

Verify

↓

Complete
```

---

# PPPoE Flow

```
Input Username

↓

Input Password

↓

Create GenieACS Task

↓

Push WAN Config

↓

Refresh

↓

Verify

↓

Success
```

---

# WiFi Configuration Flow

```
Read Current Config

↓

Edit

↓

Validate

↓

Create Task

↓

Apply

↓

Refresh

↓

Success
```

---

# Authentication Flow

```
Login

↓

JWT Access Token

↓

Refresh Token

↓

Redis Session

↓

API Access
```

---

# Authorization

RBAC

```
Admin

↓

NOC

↓

Technician

↓

Viewer
```

Permission menggunakan middleware.

---

# Logging

Semua request harus dicatat.

```
Request Log

API Log

Task Log

Provision Log

Authentication Log

Audit Log

Error Log
```

Gunakan Pino sebagai logger.

---

# Error Handling

Gunakan global error handler.

Response

```
{
  success: false,
  error: {
    code: "DEVICE_NOT_FOUND",
    message: "ONU not found"
  }
}
```

---

# API Response Format

Success

```
{
  success: true,
  data: {},
  meta: {}
}
```

Error

```
{
  success: false,
  error: {
    code: "",
    message: ""
  }
}
```

---

# Deployment

```
Internet

↓

Nginx

↓

Frontend

↓

Backend

↓

Redis

↓

PostgreSQL

↓

GenieACS

↓

OLT
```

---

# Docker Containers

```
nginx

frontend

backend

postgres

redis
```

Future

```
grafana

prometheus

loki

node-exporter

cadvisor
```

---

# Scalability

Backend bersifat stateless.

Socket.IO menggunakan Redis Adapter sehingga dapat dijalankan lebih dari satu instance.

Semua cache berada di Redis.

Semua session berada di Redis.

---

# Security

Helmet

Rate Limiter

JWT

bcrypt

CORS

HTTPS

Input Validation

SQL Injection Protection

XSS Protection

Audit Log

Refresh Token Rotation

---

# Coding Rules

* Gunakan TypeScript strict mode.
* Dilarang menggunakan `any`.
* Semua endpoint menggunakan Fastify Plugin.
* Semua validasi menggunakan Zod.
* Semua database query melalui Repository.
* Semua business logic berada di Service.
* Semua external API melalui Client Layer.
* Semua konfigurasi menggunakan `.env`.
* Semua dependency diinjeksikan melalui constructor atau plugin.
* Semua response mengikuti format standar.
* Setiap module wajib memiliki unit test.
* Setiap perubahan penting harus tercatat di audit log.

---

# Future Architecture

Apabila jumlah perangkat melebihi **100.000 ONU**, arsitektur dapat dipecah menjadi beberapa microservice tanpa mengubah struktur kode secara signifikan.

Contoh pemisahan:

* Auth Service
* Monitoring Service
* GenieACS Integration Service
* Notification Service
* Provision Service
* Dashboard Service
* Event Processing Service

Komunikasi antar service dapat menggunakan:

* RabbitMQ
* NATS
* Apache Kafka

Namun untuk tahap awal, seluruh fitur dijalankan sebagai **Modular Monolith** agar deployment lebih sederhana dan biaya operasional lebih rendah.
