# 10 - Monitoring

**Phase:** Network Monitoring

**Status:** NOT STARTED

**Priority:** Critical

**Dependencies:**

* ✅ 00-project-setup.md
* ✅ 01-authentication.md
* ✅ 02-master-data.md
* ✅ 03-operational-data.md
* ✅ 04-dashboard.md
* ✅ 05-realtime.md
* ✅ 06-workflow-engine.md
* ✅ 07-genieacs.md
* ✅ 08-olt-adapter.md
* ✅ 09-provisioning.md

---

# Objective

Membangun modul monitoring jaringan broadband secara realtime untuk memantau kondisi OLT, PON Port, ONU, layanan pelanggan, alarm, kualitas optik, serta kesehatan sistem.

Modul ini menjadi pusat operasional bagi tim NOC dan teknisi lapangan.

---

# Scope

* Network Monitoring
* Device Monitoring
* Optical Monitoring
* Alarm Monitoring
* Event Timeline
* Customer Monitoring
* OLT Monitoring
* Performance Monitoring
* Topology View
* Historical Analysis

---

# Epic 1 — Customer Monitoring

## Task 1.1

* [ ] Customer Status Dashboard

---

## Task 1.2

* [ ] Customer Detail Page

---

## Task 1.3

* [ ] Customer Timeline

---

## Task 1.4

* [ ] Connected Device Summary

Acceptance Criteria

Menampilkan:

* Online
* Offline
* LOS
* Dying Gasp
* Last Seen
* Last IP
* Last PPPoE

---

# Epic 2 — ONU Monitoring

## Task 2.1

* [ ] ONU Live Status

---

## Task 2.2

* [ ] Optical Power

---

## Task 2.3

* [ ] Temperature

---

## Task 2.4

* [ ] Voltage

---

## Task 2.5

* [ ] Bias Current

---

## Task 2.6

* [ ] Firmware Version

---

## Task 2.7

* [ ] Uptime

---

## Task 2.8

* [ ] WAN Status

Acceptance Criteria

Parameter diperbarui secara realtime melalui Socket.IO.

---

# Epic 3 — OLT Monitoring

## Task 3.1

* [ ] OLT Health Dashboard

---

## Task 3.2

* [ ] CPU Usage

---

## Task 3.3

* [ ] Memory Usage

---

## Task 3.4

* [ ] Fan Status

---

## Task 3.5

* [ ] Power Supply Status

---

## Task 3.6

* [ ] PON Port Utilization

---

## Task 3.7

* [ ] ONU Capacity

Acceptance Criteria

Semua data diambil melalui OLT Adapter.

---

# Epic 4 — Alarm Monitoring

## Task 4.1

* [ ] Active Alarm Table

---

## Task 4.2

* [ ] Alarm Detail

---

## Task 4.3

* [ ] Alarm Acknowledge

---

## Task 4.4

* [ ] Alarm Resolve

---

## Task 4.5

* [ ] Alarm Timeline

---

## Task 4.6

* [ ] Alarm Correlation

Acceptance Criteria

Alarm yang berkaitan pada OLT/PON yang sama dapat dikelompokkan.

---

# Epic 5 — Optical Monitoring

## Task 5.1

* [ ] RX Power Monitoring

---

## Task 5.2

* [ ] TX Power Monitoring

---

## Task 5.3

* [ ] Optical Trend Chart

---

## Task 5.4

* [ ] Optical Threshold

---

## Task 5.5

* [ ] Optical Alert

Acceptance Criteria

Sistem memberikan peringatan jika nilai melewati ambang batas.

---

# Epic 6 — Event Timeline

## Task 6.1

* [ ] Device Event Timeline

---

## Task 6.2

* [ ] Workflow Timeline

---

## Task 6.3

* [ ] Alarm Timeline

---

## Task 6.4

* [ ] User Activity Timeline

---

## Task 6.5

* [ ] Unified Timeline View

Acceptance Criteria

Semua event dapat dilihat secara kronologis.

---

# Epic 7 — Search & Filter

## Task 7.1

* [ ] Search Customer

---

## Task 7.2

* [ ] Search ONU

---

## Task 7.3

* [ ] Search OLT

---

## Task 7.4

* [ ] Filter Region

---

## Task 7.5

* [ ] Filter POP

---

## Task 7.6

* [ ] Filter Vendor

---

## Task 7.7

* [ ] Filter Status

---

## Task 7.8

* [ ] Date Range Filter

---

# Epic 8 — Topology

## Task 8.1

* [ ] OLT Tree View

---

## Task 8.2

* [ ] PON Port Tree

---

## Task 8.3

* [ ] ONU Hierarchy

---

## Task 8.4

* [ ] Customer Mapping

Acceptance Criteria

Operator dapat menelusuri hubungan OLT → PON → ONU → Customer.

---

# Epic 9 — Realtime Monitoring

## Task 9.1

* [ ] Live ONU Status

---

## Task 9.2

* [ ] Live Alarm

---

## Task 9.3

* [ ] Live Optical Update

---

## Task 9.4

* [ ] Live Workflow

---

## Task 9.5

* [ ] Live Notification

Acceptance Criteria

Seluruh data diperbarui tanpa refresh halaman.

---

# Epic 10 — Frontend

## Monitoring Dashboard

* [ ] Monitoring Overview

---

## Device Detail

* [ ] ONU Detail Page

---

## OLT Detail

* [ ] OLT Detail Page

---

## Alarm

* [ ] Alarm Center

---

## Timeline

* [ ] Timeline Viewer

---

## Topology

* [ ] Topology Explorer

---

# Epic 11 — Performance

## Task 11.1

* [ ] Virtual Scrolling

---

## Task 11.2

* [ ] Infinite Pagination

---

## Task 11.3

* [ ] Redis Cache

---

## Task 11.4

* [ ] Query Optimization

Acceptance Criteria

Monitoring tetap responsif untuk puluhan ribu ONU.

---

# Epic 12 — Testing

Backend

* [ ] Monitoring API Test
* [ ] Alarm Test
* [ ] Optical Monitoring Test
* [ ] Search Test

Frontend

* [ ] Monitoring Page Test
* [ ] Alarm Center Test
* [ ] Timeline Test

---

# Deliverables

Setelah fase ini selesai:

* Monitoring pelanggan tersedia.
* Monitoring ONU tersedia.
* Monitoring OLT tersedia.
* Monitoring optical tersedia.
* Alarm Center tersedia.
* Timeline tersedia.
* Topology Explorer tersedia.
* Monitoring realtime berjalan.
* Pencarian dan filter lengkap.

---

# Acceptance Criteria

* [ ] Monitoring seluruh perangkat berfungsi.
* [ ] Alarm realtime berjalan.
* [ ] Optical monitoring aktif.
* [ ] Timeline lengkap.
* [ ] Topology Explorer tersedia.
* [ ] Dashboard monitoring realtime.
* [ ] Performa tetap baik pada skala besar.
* [ ] Unit, integration, dan end-to-end test lulus.
* [ ] Dokumentasi diperbarui.

---

# Notes

* Semua status perangkat berasal dari `Operational Data Layer`, bukan query langsung ke OLT atau GenieACS setiap kali halaman dibuka.
* Pembaruan status dilakukan melalui Event Bus → Redis Pub/Sub → Socket.IO.
* Parameter optik dan perangkat harus mengikuti pemetaan pada `VENDOR_MAPPING.md`.
* Gunakan virtual scrolling dan pagination server-side untuk daftar ONU yang besar.
* Halaman monitoring harus menjadi alat operasional utama bagi tim NOC, dengan fokus pada kecepatan akses, filter yang kuat, dan tampilan realtime.
