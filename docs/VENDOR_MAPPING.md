# VENDOR_MAPPING.md

# Broadband Customer Monitoring System (BCMS)

## Vendor Mapping Specification

Version 1.0

---

# Purpose

Dokumen ini mendefinisikan bagaimana BCMS menerjemahkan perbedaan antar vendor menjadi satu model internal yang konsisten.

Business Layer hanya mengenal model BCMS.

Semua perbedaan vendor ditangani oleh Adapter dan Mapper.

---

# Supported Vendors

## OLT

* Huawei MA5600
* Huawei MA5800
* ZTE C300
* ZTE C320
* Fiberhome AN5506
* VSOL
* Nokia ISAM
* Raisecom

---

## ONU

* Huawei
* ZTE
* Fiberhome
* VSOL
* TP-Link
* Nokia
* Dasan
* C-DATA
* Intelbras

---

# Internal Device Model

Semua vendor dipetakan menjadi model berikut.

```ts
interface DeviceModel {

id

serialNumber

vendor

model

firmware

status

rxPower

txPower

temperature

voltage

biasCurrent

wan

wifi

}
```

---

# ONU Status Mapping

Internal Status

```
ONLINE

OFFLINE

LOS

DYING_GASP

DISABLED

UNKNOWN
```

---

Huawei

| Huawei     | Internal   |
| ---------- | ---------- |
| online     | ONLINE     |
| offline    | OFFLINE    |
| los        | LOS        |
| dying-gasp | DYING_GASP |

---

ZTE

| ZTE       | Internal |
| --------- | -------- |
| working   | ONLINE   |
| power-off | OFFLINE  |
| los       | LOS      |

---

Fiberhome

| Fiberhome | Internal |
| --------- | -------- |
| active    | ONLINE   |
| inactive  | OFFLINE  |

---

VSOL

| VSOL | Internal |
| ---- | -------- |
| up   | ONLINE   |
| down | OFFLINE  |

---

# Optical Information Mapping

Internal

```text
rxPower

txPower

temperature

voltage

biasCurrent
```

Huawei

```text
Rx Optical Power

Tx Optical Power
```

ZTE

```text
Rx Power

Tx Power
```

Fiberhome

```text
Optical Rx

Optical Tx
```

Semua dipetakan ke field internal.

---

# Alarm Mapping

Internal

```
LOS

DYING_GASP

LOFI

LOSI

POWER_FAIL

OPTICAL_LOW

ONU_OFFLINE

ONU_ONLINE
```

Vendor-specific alarm diterjemahkan ke enum internal tersebut.

---

# TR-069 / TR-181 Mapping

Internal Parameter

```
serialNumber
```

Huawei

```
Device.DeviceInfo.SerialNumber
```

TR-098

```
InternetGatewayDevice.DeviceInfo.SerialNumber
```

---

Manufacturer

TR-181

```
Device.DeviceInfo.Manufacturer
```

TR-098

```
InternetGatewayDevice.DeviceInfo.Manufacturer
```

---

Firmware

TR-181

```
Device.DeviceInfo.SoftwareVersion
```

TR-098

```
InternetGatewayDevice.DeviceInfo.SoftwareVersion
```

---

Model

TR-181

```
Device.DeviceInfo.ModelName
```

TR-098

```
InternetGatewayDevice.DeviceInfo.ModelName
```

---

# PPPoE Mapping

Internal

```
username

password

enabled
```

Vendor Adapter bertanggung jawab memetakan parameter TR-069 yang sesuai dengan model ONU.

---

# WiFi Mapping

Internal

```
ssid

password

hidden

channel

band

security
```

TR-181

```
Device.WiFi.SSID.*

Device.WiFi.AccessPoint.*
```

TR-098

```
InternetGatewayDevice.LANDevice.*

WLANConfiguration.*
```

---

# WAN Mapping

Internal

```
ip

gateway

dns

connectionStatus
```

Vendor Adapter menerjemahkan parameter WAN ke model internal.

---

# Register ONU Mapping

Internal Request

```json
{
  "serialNumber":"",
  "lineProfile":"",
  "serviceProfile":"",
  "vlan":100
}
```

Huawei

↓

CLI/NETCONF

---

ZTE

↓

NETCONF/API

---

VSOL

↓

REST

---

# Replace ONU Mapping

Internal

```
oldSerial

newSerial
```

Adapter menerjemahkan menjadi command vendor.

---

# Command Mapping

Semua command dikelola pada Command Builder.

Contoh

Huawei

```
display ont info
```

↓

Internal

```
GET_ONU_INFORMATION
```

---

Huawei

```
ont add
```

↓

Internal

```
REGISTER_ONU
```

---

Huawei

```
ont delete
```

↓

Internal

```
DELETE_ONU
```

---

ZTE

↓

Command berbeda

↓

Tetap menghasilkan command internal yang sama.

---

# Capability Matrix

| Capability                | Huawei | ZTE            | Fiberhome      | VSOL |
| ------------------------- | ------ | -------------- | -------------- | ---- |
| Register ONU              | ✔      | ✔              | ✔              | ✔    |
| Replace ONU               | ✔      | ✔              | ✔              | ✔    |
| Delete ONU                | ✔      | ✔              | ✔              | ✔    |
| Read Optical              | ✔      | ✔              | ✔              | ✔    |
| Read Alarm                | ✔      | ✔              | ✔              | ✔    |
| Push PPPoE (via GenieACS) | ✔      | ✔              | ✔              | ✔    |
| Push WiFi (via GenieACS)  | ✔      | ✔              | ✔              | ✔    |
| NETCONF                   | ✔      | ✔              | ✖              | ✖    |
| REST API                  | ✖      | Beberapa Model | Beberapa Model | ✔    |
| SSH CLI                   | ✔      | ✔              | ✔              | ✔    |

---

# Mapper Responsibilities

Mapper hanya bertugas:

* menerjemahkan request internal ke vendor
* menerjemahkan response vendor ke model internal
* menerjemahkan error vendor ke error internal

Mapper tidak boleh menjalankan business logic.

---

# Error Mapping

Huawei

```
ONU already exists
```

↓

```
ONU_ALREADY_EXISTS
```

---

ZTE

```
Duplicate ONU
```

↓

```
ONU_ALREADY_EXISTS
```

---

Internal Error

```
ONU_ALREADY_EXISTS
```

---

# Transport Mapping

Vendor

↓

Protocol

| Vendor    | Preferred Transport |
| --------- | ------------------- |
| Huawei    | NETCONF → SSH       |
| ZTE       | NETCONF → SSH       |
| Fiberhome | SSH                 |
| VSOL      | REST → SSH          |
| Nokia     | NETCONF             |
| Raisecom  | SSH                 |

Transport dipilih oleh adapter berdasarkan kemampuan perangkat.

---

# Configuration Mapping

Internal Configuration

```
lineProfile

serviceProfile

dbaProfile

nativeVlan

internetVlan

voiceVlan

managementVlan
```

Setiap adapter menerjemahkan konfigurasi tersebut ke format vendor masing-masing.

---

# Event Mapping

Vendor Event

↓

Internal Event

Contoh

Huawei

```
ONU LOS
```

↓

```
onu:los
```

---

Huawei

```
ONU Dying Gasp
```

↓

```
onu:dyinggasp
```

Semua event Socket.IO menggunakan event internal.

---

# Naming Convention

Internal BCMS menggunakan istilah berikut:

* ONU
* OLT
* Customer
* Workflow
* Device
* Alarm
* Event
* Profile

Istilah vendor tidak boleh bocor ke Business Layer.

---

# Future Vendor Support

Dokumen ini harus diperbarui ketika vendor baru ditambahkan.

Contoh:

* BDCOM
* Dasan
* C-DATA
* Ubiquiti UFiber OLT
* TP-Link OLT
* Edgecore

Vendor baru harus:

1. Mengimplementasikan interface adapter.
2. Menambahkan mapper.
3. Menambahkan command builder.
4. Menambahkan capability matrix.
5. Menambahkan pengujian (unit & integration).

---

# Design Principles

1. Business Layer hanya mengenal model internal BCMS.
2. Seluruh perbedaan vendor ditangani oleh Adapter dan Mapper.
3. Hindari penggunaan `if/else` berdasarkan vendor di Business Service.
4. Gunakan enum dan model internal untuk seluruh status, alarm, dan event.
5. Tambahkan vendor baru tanpa mengubah workflow atau business logic yang sudah ada.
6. Pisahkan Command Builder, Mapper, dan Transport agar mudah dipelihara.
