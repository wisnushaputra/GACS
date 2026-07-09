# GENIEACS_INTEGRATION.md

# Broadband Customer Monitoring System (BCMS)

## GenieACS Integration Specification

Version 1.0

---

# Overview

BCMS tidak berkomunikasi langsung dengan ONU.

Seluruh komunikasi dilakukan melalui **GenieACS REST API**.

```
ONU
   │
TR-069
   │
OLT
   │
Internet
   │
GenieACS
   │
REST API
   │
BCMS Backend
   │
React Dashboard
```

BCMS hanya menjadi orchestration layer.

Semua provisioning dilakukan melalui GenieACS Task API.

---

# Integration Principles

Seluruh komunikasi ke GenieACS harus melalui

```
GenieACSClient
```

Tidak boleh ada HTTP Request langsung dari Controller maupun Service lain.

Semua request menggunakan

* Axios
* Retry
* Timeout
* Logging

---

# Environment Variables

```env
GENIEACS_BASE_URL=http://genieacs:7557

GENIEACS_USERNAME=admin

GENIEACS_PASSWORD=password

GENIEACS_TIMEOUT=15000

GENIEACS_RETRY=3
```

---

# Folder Structure

```
modules

genieacs

client.ts

device.service.ts

task.service.ts

parameter.service.ts

fault.service.ts

provision.service.ts

preset.service.ts

mapper.ts

types.ts

constants.ts
```

---

# Authentication

Jika GenieACS menggunakan Basic Authentication

Header

```
Authorization

Basic Base64(username:password)
```

Jika tidak menggunakan auth

Header tidak diperlukan.

---

# GenieACS API

BCMS menggunakan endpoint berikut.

## Devices

```
GET /devices
```

List seluruh device.

---

```
GET /devices/{deviceId}
```

Detail Device.

---

```
DELETE /devices/{deviceId}
```

Delete Device.

---

# Tasks

```
POST /devices/{deviceId}/tasks
```

Digunakan untuk

* Refresh
* Reboot
* Factory Reset
* Download
* Upload
* Set Parameter
* Get Parameter

---

# Faults

```
GET /faults
```

Daftar fault.

---

# Presets

```
GET /presets
```

Daftar preset.

---

# Provisions

```
GET /provisions
```

List Provision.

---

# Ping

```
GET /ping
```

Health Check.

---

# Device Discovery

Flow

```
Input Serial Number

↓

GET Devices

↓

Find Matching Device

↓

Return DeviceID
```

---

# Device Mapper

Data dari GenieACS dipetakan menjadi format internal.

Contoh

GenieACS

```
InternetGatewayDevice.DeviceInfo.SerialNumber
```

↓

BCMS

```
serialNumber
```

---

GenieACS

```
DeviceID.ID
```

↓

```
deviceId
```

---

GenieACS

```
InternetGatewayDevice.DeviceInfo.SoftwareVersion
```

↓

```
firmware
```

---

GenieACS

```
InternetGatewayDevice.DeviceInfo.Manufacturer
```

↓

```
manufacturer
```

---

# Standard Parameter Mapping

## Device Information

| BCMS          | GenieACS                                         |
| ------------- | ------------------------------------------------ |
| Serial Number | InternetGatewayDevice.DeviceInfo.SerialNumber    |
| Manufacturer  | InternetGatewayDevice.DeviceInfo.Manufacturer    |
| Model         | InternetGatewayDevice.DeviceInfo.ModelName       |
| Firmware      | InternetGatewayDevice.DeviceInfo.SoftwareVersion |
| Hardware      | InternetGatewayDevice.DeviceInfo.HardwareVersion |

---

## WAN

| BCMS              | TR069 Parameter                                                                     |
| ----------------- | ----------------------------------------------------------------------------------- |
| PPP Username      | InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Username |
| PPP Password      | InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Password |
| Connection Status | InternetGatewayDevice.WANDevice.1.WANPPPConnection.1.ConnectionStatus               |

---

## WiFi

| BCMS     | TR069 Parameter                                                                    |
| -------- | ---------------------------------------------------------------------------------- |
| SSID     | InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.SSID                         |
| Password | InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.PreSharedKey.1.KeyPassphrase |
| Channel  | InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.Channel                      |
| Enable   | InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.Enable                       |

---

## Optical Information

Vendor tertentu dapat menggunakan path berbeda.

Contoh

```
RX Power

TX Power

Temperature

Voltage

Optical Status
```

harus dipetakan melalui

```
Vendor Mapping
```

---

# Vendor Mapping

```
Huawei

ZTE

Fiberhome

VSOL

Nokia

Raisecom

BDCOM
```

Setiap vendor memiliki

```
parameterMap.ts
```

Contoh

```
vendors

huawei.ts

zte.ts

fiberhome.ts

vsol.ts
```

BCMS tidak boleh menggunakan hardcoded parameter.

---

# Refresh Parameter

Flow

```
User

↓

Refresh

↓

Create Task

↓

wait()

↓

Read Parameter

↓

Update Redis

↓

Socket.IO

↓

Dashboard
```

---

# Reboot ONU

Task

```
reboot
```

Flow

```
POST Task

↓

Wait

↓

Success
```

---

# Factory Reset

Task

```
factoryReset
```

---

# Push PPPoE

Task

```
setParameterValues
```

Parameter

```
Username

Password
```

Flow

```
Validate

↓

Task

↓

Refresh

↓

Verify

↓

Success
```

---

# Update WiFi

Task

```
setParameterValues
```

Parameter

```
SSID

Password

Channel

Enable
```

---

# Replace ONU

Workflow

```
Old SN

↓

Read All Parameter

↓

Backup Configuration

↓

Find New ONU

↓

Copy Parameter

↓

Push Parameter

↓

Refresh

↓

Verify

↓

Success
```

---

# Register ONU

Workflow

```
Discover Device

↓

Validate

↓

Apply Preset

↓

Apply PPPoE

↓

Apply WiFi

↓

Refresh

↓

Verify
```

---

# Get Device Status

Read

```
Last Inform

Uptime

WAN Status

Optical Status

Signal
```

Status Mapping

```
ONLINE

OFFLINE

LOS

DYING_GASP

UNKNOWN
```

---

# Event Detection

Event berasal dari

```
Inform Event

Fault

Connection Request

Periodic Inform
```

BCMS mengubah menjadi

```
ONLINE

OFFLINE

LOS

DYING_GASP

REBOOT

REGISTER

FACTORY RESET
```

---

# Polling Strategy

Dashboard

```
30 detik
```

Device Detail

```
10 detik
```

Task Progress

```
5 detik
```

Health Check

```
60 detik
```

Jika webhook tersedia, gunakan webhook sebagai prioritas dan polling sebagai fallback.

---

# Redis Cache

```
device:{id}

device:status:{id}

dashboard:summary

task:{id}

events
```

TTL

```
30 detik
```

---

# Error Handling

Jika GenieACS tidak tersedia

Response

```json
{
    "success": false,
    "error": {
        "code": "GENIEACS_UNAVAILABLE",
        "message": "Cannot connect to GenieACS"
    }
}
```

Retry

```
3 kali

Delay

1 detik
```

---

# Timeout

Maximum Request

```
15 detik
```

Jika timeout

```
Retry

↓

Failed

↓

Log

↓

Notification
```

---

# Logging

Semua request dicatat.

Log

```
Request

Response

Duration

Status Code

DeviceID

TaskID

User
```

---

# Security

Semua credential GenieACS berada di

```
.env
```

Tidak boleh hardcoded.

Password tidak boleh muncul pada log.

---

# Unit Test

Minimal test

* Get Device
* Create Task
* Refresh
* Reboot
* Set Parameter
* Replace ONU
* PPPoE Push
* WiFi Push
* Error Handling

Coverage minimal

```
80%
```

---

# Future Integration

Tahap berikutnya dapat ditambahkan:

* Webhook GenieACS → BCMS (real-time event tanpa polling)
* Vendor-specific parameter auto detection
* Auto Provision menggunakan Preset
* Backup konfigurasi ONU sebelum perubahan
* Sinkronisasi massal perangkat
* Integrasi SNMP Trap untuk korelasi alarm dengan status TR-069

---

# Important Implementation Notes

1. **Jangan mengandalkan satu path TR-069 untuk semua ONU.** Huawei, ZTE, Fiberhome, VSOL, Nokia, dan vendor lain sering menggunakan struktur parameter yang berbeda.

2. Gunakan **Vendor Parameter Registry** sehingga setiap vendor memiliki file mapping sendiri.

3. Semua operasi yang mengubah konfigurasi (PPPoE, WiFi, Replace ONU, Reboot) harus:

   * Membuat Task di GenieACS.
   * Memantau status task.
   * Memverifikasi hasil dengan membaca ulang parameter.
   * Mengirim event melalui Socket.IO.

4. Jangan pernah menyimpan password PPPoE atau WiFi dalam log aplikasi.

5. Semua komunikasi dengan GenieACS harus melewati `GenieACSClient` agar mudah diuji, dimock, dan diganti jika API berubah di masa depan.
