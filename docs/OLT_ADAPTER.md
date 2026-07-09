# OLT_ADAPTER.md

# Broadband Customer Monitoring System (BCMS)

## OLT Adapter Specification

Version 1.0

---

# Overview

OLT Adapter adalah lapisan abstraksi yang bertanggung jawab untuk seluruh komunikasi dengan perangkat OLT.

Business Service **tidak boleh mengetahui** bagaimana Huawei, ZTE, Fiberhome, VSOL, Nokia, atau vendor lain bekerja.

Semua komunikasi dilakukan melalui interface yang sama.

```
React UI
     │
Fastify API
     │
Business Service
     │
OLT Adapter Interface
     │
Factory
     │
┌───────────────┬──────────────┬───────────────┐
│ HuaweiAdapter │ ZTEAdapter   │ VSOLAdapter   │
│ Fiberhome     │ NokiaAdapter │ Raisecom      │
└───────────────┴──────────────┴───────────────┘
```

---

# Supported Vendors

Initial

* Huawei MA5600
* Huawei MA5800
* ZTE C300
* ZTE C320
* Fiberhome AN5506
* VSOL V1600
* Raisecom
* Nokia ISAM

Future

* BDCOM
* Dasan
* Ubiquiti
* TP-Link OLT
* C-DATA

---

# Supported Protocol

Vendor dapat menggunakan protokol berbeda.

Priority

1. NETCONF
2. REST API
3. SSH CLI
4. Telnet (Legacy)
5. SNMP

Business Service tidak mengetahui protokol yang digunakan.

---

# Folder Structure

```text
modules/

adapter/

olt/

base/

OLTAdapter.ts

factory.ts

types.ts

errors.ts

Huawei/

HuaweiAdapter.ts

HuaweiParser.ts

HuaweiCommand.ts

HuaweiMapper.ts

HuaweiNetconf.ts

HuaweiSSH.ts

ZTE/

ZTEAdapter.ts

ZTEParser.ts

ZTECommand.ts

VSOL/

VSOLAdapter.ts

Fiberhome/

FiberhomeAdapter.ts
```

---

# Base Interface

```ts
interface OLTAdapter {

connect()

disconnect()

health()

getSystemInfo()

getPonList()

getONUList()

getONU()

registerONU()

replaceONU()

deleteONU()

authorizeONU()

deauthorizeONU()

rebootONU()

factoryResetONU()

configureONU()

getOpticalInfo()

getSignal()

getMAC()

getIPAddress()

findBySerial()

findByONUID()

findByCustomer()

getLOS()

getDyingGasp()

getAlarm()

clearAlarm()

backupConfig()

restoreConfig()

}
```

Semua vendor wajib mengimplementasikan interface ini.

---

# Factory Pattern

```
OLTFactory

↓

Vendor

↓

HuaweiAdapter

↓

Return Adapter
```

Example

```ts
const adapter = OLTFactory.create(vendor)
```

Business layer hanya mengenal

```
OLTAdapter
```

---

# Configuration

```env
OLT_PROTOCOL=ssh

OLT_TIMEOUT=10000

OLT_RETRY=3

OLT_PORT=22
```

Per OLT

```
IP

Username

Password

Vendor

Protocol

Port
```

disimpan di database.

---

# Register ONU

Flow

```
Input SN

↓

Validate

↓

Check Duplicate

↓

Find Free ONU ID

↓

Create ONU

↓

Assign Line Profile

↓

Assign Service Profile

↓

Assign VLAN

↓

Commit

↓

Verify

↓

Return
```

Response

```json
{
  "success": true,
  "onuId": 12,
  "ponPort": "0/1/2",
  "status": "REGISTERED"
}
```

---

# Replace ONU

Flow

```
Backup Config

↓

Delete ONU Lama

↓

Register ONU Baru

↓

Restore Config

↓

Verify

↓

Success
```

---

# Delete ONU

Flow

```
Validate

↓

Delete

↓

Commit

↓

Verify
```

---

# Authorize ONU

Flow

```
SN

↓

Whitelist

↓

Apply

↓

Success
```

---

# Reboot ONU

```
ONU ID

↓

CLI/API

↓

Wait

↓

Verify
```

---

# Configure ONU

Parameter

```
Line Profile

Service Profile

DBA Profile

Native VLAN

Voice VLAN

Internet VLAN

TR069 VLAN

Management VLAN
```

---

# Optical Information

Return

```json
{
  "rxPower": -22.3,
  "txPower": 2.1,
  "temperature": 46,
  "voltage": 3.31,
  "biasCurrent": 14.2
}
```

---

# ONU Status

Enum

```
ONLINE

OFFLINE

LOS

DYING_GASP

POWER_OFF

DISABLED

UNKNOWN
```

Mapping vendor dilakukan di masing-masing adapter.

---

# Alarm

Supported

```
LOS

DYING_GASP

LOSI

LOFI

POWER_FAIL

OPTICAL_LOW

ONU_OFFLINE

ONU_ONLINE
```

---

# Search ONU

Search By

```
Serial Number

ONU ID

PON

Customer Code

Description
```

---

# Backup Configuration

Backup

```
Line Profile

Service Profile

DBA

VLAN

Description

Native VLAN

TR069

Voice

Internet

Binding
```

Disimpan di

```
onu_backups
```

---

# Restore Configuration

Flow

```
Read Backup

↓

Apply

↓

Commit

↓

Verify
```

---

# Batch Operation

Support

```
Batch Register

Batch Delete

Batch Reboot

Batch Refresh

Batch Replace
```

Return

```
Success

Failed

Skipped
```

---

# Error Code

```
OLT_CONNECTION_FAILED

ONU_NOT_FOUND

ONU_ALREADY_EXIST

PON_NOT_FOUND

NO_FREE_ONU_ID

PROFILE_NOT_FOUND

VLAN_NOT_FOUND

COMMAND_TIMEOUT

COMMAND_FAILED

AUTH_FAILED
```

---

# Retry Policy

Retry

```
3 kali
```

Delay

```
1 detik
```

Timeout

```
10 detik
```

---

# Logging

Log

```
Command

Execution Time

OLT

Vendor

PON

ONU

User

Result
```

Password tidak boleh disimpan.

---

# Security

Credential dienkripsi di database.

Gunakan SSH Key bila memungkinkan.

Batasi hak akses akun OLT.

Audit semua perubahan konfigurasi.

---

# Monitoring

Polling

```
30 detik
```

Data

```
ONU Status

LOS

DyingGasp

Optical

Temperature

CPU

Memory

PON Utilization
```

Jika vendor mendukung push notification atau SNMP Trap, gunakan mekanisme tersebut sebagai prioritas.

---

# Adapter Result Format

Semua adapter mengembalikan format yang sama.

```json
{
  "success": true,
  "vendor": "Huawei",
  "data": {},
  "executionTime": 235
}
```

---

# Business Rules

* Tidak boleh ada perintah CLI di Service Layer.
* Tidak boleh ada parsing output CLI di Controller.
* Parsing hanya dilakukan di adapter vendor.
* Semua adapter harus mengembalikan model internal BCMS.
* Semua operasi konfigurasi harus melakukan verifikasi setelah commit.
* Backup konfigurasi wajib dilakukan sebelum Replace ONU atau perubahan besar.

---

# Testing

Minimal Unit Test

* Connect
* Get ONU
* Register ONU
* Delete ONU
* Replace ONU
* Reboot ONU
* Get Optical Info
* Get Alarm
* Get Signal
* Backup Config
* Restore Config

Gunakan mock untuk protokol (SSH, REST, NETCONF) agar pengujian tidak bergantung pada perangkat fisik.

---

# Future Enhancements

* Auto Detect Vendor
* Auto Detect Firmware
* NETCONF First Strategy
* SNMP Trap Listener
* CLI Template Engine
* Multi-thread Batch Provisioning
* Auto ONU Discovery
* GPON & XGSPON Support
* High Availability OLT Connection Pool
* Vendor Capability Registry

---

# Design Principles

1. **Vendor Agnostic**: Business Service hanya mengenal `OLTAdapter`.
2. **Single Responsibility**: Setiap adapter hanya menangani satu vendor.
3. **Open/Closed Principle**: Menambah vendor baru tidak mengubah kode yang sudah ada.
4. **Strategy + Factory Pattern**: Pemilihan implementasi adapter dilakukan melalui factory berdasarkan vendor dan protokol.
5. **Idempotent Operations**: Operasi seperti register atau replace harus aman jika dijalankan ulang setelah kegagalan parsial.
6. **Observable**: Semua operasi menghasilkan log, metric, dan event agar mudah dipantau.
