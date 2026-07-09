# PRD.md

# Broadband Customer Monitoring System (BCMS)

## Version

v1.0

---

# Project Overview

## Project Name

Broadband Customer Monitoring System (BCMS)

## Goal

Membangun dashboard monitoring customer broadband berbasis web yang terintegrasi dengan GenieACS sehingga NOC maupun teknisi dapat melakukan monitoring status ONU secara realtime tanpa harus membuka GenieACS secara langsung.

Aplikasi harus memiliki tampilan modern, ringan, responsive, realtime, dan mudah dikembangkan.

---

# Tech Stack

## Backend

* Node.js
* Fastify
* TypeScript
* Drizzle ORM
* PostgreSQL
* Redis
* Socket.IO
* JWT Authentication
* Zod Validation

## Frontend

* React
* Vite
* TypeScript
* TailwindCSS
* React Router
* React Query (TanStack Query)
* Zustand
* Socket.IO Client
* Recharts

## Database

PostgreSQL

## Cache

Redis

## Deployment

Docker

Docker Compose

Nginx Reverse Proxy

## External Integration

GenieACS API

---

# User Roles

## Administrator

Full Access

* User Management
* Device Management
* OLT Management
* ONU Registration
* PPPoE Push
* Replace ONU
* Monitoring
* Logs
* Dashboard

---

## NOC

Can

* Monitoring
* Search Customer
* View Logs
* Push PPPoE
* Reboot ONU

Cannot

* Delete Data
* Manage Users

---

## Technician

Can

* Register ONU
* Replace ONU
* Configure SSID
* Configure PPPoE

Cannot

* User Management
* System Configuration

---

# Main Features

## 1 Dashboard Realtime

Dashboard harus realtime menggunakan Socket.IO.

Widget:

* Total Customer
* Online Customer
* Offline Customer
* LOS
* Dying Gasp
* Power Off
* Unknown
* Total OLT
* Total ONU

Chart

* Online Trend
* LOS Trend
* Dying Gasp Trend

Card Status per OLT

Example

OLT A

Online : 1200

LOS : 23

Dying Gasp : 8

Offline : 30

---

## 2 Monitoring ONU

Table

Columns

* Serial Number
* Customer Name
* OLT
* PON
* ONU ID
* PPPoE Username
* IP Address
* RX Power
* TX Power
* Uptime
* Status
* Last Inform
* Last Contact
* SSID
* Firmware

Filter

* OLT
* Status
* Customer
* SN
* PPPoE

Realtime update.

---

## 3 Customer Search

Search by

* Name
* SN
* PPPoE
* ONU ID
* OLT
* VLAN

Result menampilkan

Customer Detail

ONU Information

Realtime Status

History

Signal

Configuration

---

## 4 LOS Monitoring

Realtime event

Information

* ONU
* Customer
* Time
* Duration
* OLT
* Port

Color

Critical

---

## 5 Dying Gasp Monitoring

Realtime

Information

* ONU
* Customer
* Time
* OLT
* Duration

Notification

Sound

Toast

Socket.IO

---

## 6 OLT Monitoring

List semua OLT

Card

Information

* Name
* Vendor
* Total ONU
* Online
* Offline
* LOS
* CPU
* Memory

Future Support

Huawei

ZTE

Fiberhome

Raisecom

VSOL

---

## 7 ONU Registration

Workflow

Input

* Serial Number

AI akan mengambil informasi dari GenieACS.

Operator memilih

* OLT
* PON
* ONU ID
* Profile
* VLAN

Kemudian

Provision

Create Device

Push Config

Success

---

## 8 Push PPPoE

Input

* Username
* Password

Push ke GenieACS.

Show Progress.

Result

Success

Failed

---

## 9 Replace ONU

Workflow

Old SN

↓

New SN

↓

Validate

↓

Copy Config

↓

Push Config

↓

Reboot

↓

Done

Semua setting harus ikut

* PPPoE
* VLAN
* WiFi
* SSID
* Password
* TR069

---

## 10 WiFi Configuration

Configure

SSID

Password

Channel

Bandwidth

Hide SSID

Guest WiFi

Apply

Realtime

---

## 11 Device Detail

Tabs

Overview

WAN

LAN

WiFi

Signal

History

Events

Tasks

Logs

---

## 12 Event Log

Store semua event

LOS

DyingGasp

Provision

Factory Reset

Inform

Connection Request

Authentication

---

## 13 User Management

CRUD

User

Role

Password

Permission

---

# Dashboard UI

Layout

Sidebar

Topbar

Content

Right Notification

Dark Mode

Modern Glass UI

---

# Realtime Event

Socket.IO

Events

customer-online

customer-offline

los

dying-gasp

reboot

inform

task-progress

olt-update

dashboard-update

device-update

---

# API Structure

/api

/auth

/users

/dashboard

/monitoring

/customers

/devices

/events

/olt

/tasks

/provision

/pppoe

/wifi

/replace

---

# Authentication

JWT

Refresh Token

Role Based Access

Permission Middleware

---

# Database

users

roles

permissions

customers

olts

onus

device_status

events

tasks

wifi_profiles

pppoe_profiles

audit_logs

refresh_tokens

---

# Redis Usage

Cache Dashboard

Realtime Queue

Session

Socket State

Rate Limit

---

# GenieACS Integration

API

Devices

Tasks

Faults

Presets

Provisions

Connection Request

Refresh Object

Get Parameter Values

Set Parameter Values

Reboot

Factory Reset

Download

Upload

---

# Notification

Toast

Realtime

Sound Alert

Desktop Notification

Telegram (Future)

WhatsApp (Future)

Email (Future)

---

# Audit Log

Semua aktivitas disimpan

Login

Logout

Provision

Replace ONU

Push PPPoE

SSID Change

Delete

Role Change

---

# Security

Helmet

Rate Limit

CORS

JWT

Password Hash

Input Validation

SQL Injection Protection

XSS Protection

CSRF

---

# Folder Structure

backend/

src/

modules/

auth/

dashboard/

customers/

devices/

events/

olt/

pppoe/

wifi/

replace/

provision/

socket/

plugins/

middleware/

lib/

routes/

db/

frontend/

src/

pages/

components/

layouts/

hooks/

services/

stores/

types/

utils/

styles/

---

# UI Pages

Login

Dashboard

Monitoring

Customer

OLT

Device Detail

ONU Registration

Replace ONU

Push PPPoE

WiFi

Logs

Users

Settings

Profile

---

# KPI Dashboard

Online %

Offline %

LOS %

Dying Gasp %

Average RX

Average TX

Active OLT

Total ONU

Realtime Inform/sec

---

# Non Functional Requirements

Response API

<200 ms

Dashboard Load

<2 sec

Realtime Delay

<1 sec

Support

10.000+ ONU

Concurrent User

100+

---

# Coding Standard

* Clean Architecture
* SOLID
* Repository Pattern
* Service Layer
* DTO Pattern
* Typed API
* ESLint
* Prettier
* Husky
* Conventional Commit

---

# AI Coding Rules (Vibe Coding)

Semua kode harus mengikuti aturan berikut:

* Gunakan TypeScript strict mode.
* Tidak boleh menggunakan any.
* Semua endpoint menggunakan Fastify plugin.
* Semua query database menggunakan Drizzle ORM.
* Semua validasi memakai Zod.
* Semua endpoint wajib memiliki DTO.
* Semua error menggunakan custom error handler.
* Semua response mengikuti format yang konsisten.
* Semua halaman React menggunakan functional component.
* Gunakan custom hooks.
* Gunakan React Query untuk data fetching.
* Gunakan Zustand untuk global state.
* Tidak boleh ada logic bisnis di React component.
* Semua konfigurasi berada di file .env.
* Semua fitur harus mendukung Docker.
* Semua fitur harus memiliki logging.
* Semua fitur harus memiliki unit test minimal pada service layer.
* Semua fitur harus reusable dan modular.
* Semua event realtime menggunakan Socket.IO namespace.
* Semua integrasi GenieACS dibungkus dalam service khusus agar mudah diganti apabila API berubah.

---

# Roadmap

## Phase 1

Authentication

Dashboard

Realtime

Monitoring

Customer Search

## Phase 2

ONU Registration

Push PPPoE

Replace ONU

WiFi Configuration

## Phase 3

Logs

Audit

Notification

Reporting

## Phase 4

Multi OLT

Telegram Notification

WhatsApp Notification

SNMP Integration

Grafana

Prometheus

High Availability

---

# Definition of Done

Suatu fitur dianggap selesai apabila:

* UI selesai.
* API selesai.
* Database migration tersedia.
* Validasi berjalan.
* Realtime berjalan.
* Docker dapat dijalankan.
* Logging tersedia.
* Unit test lulus.
* Dokumentasi endpoint diperbarui.
* Terintegrasi dengan GenieACS.
