# 05 - Realtime

**Phase:** Realtime Communication

**Status:** NOT STARTED

**Priority:** Critical

**Dependencies:**

* ✅ 00-project-setup.md
* ✅ 01-authentication.md
* ✅ 02-master-data.md
* ✅ 03-operational-data.md
* ✅ 04-dashboard.md

---

# Objective

Membangun sistem komunikasi realtime menggunakan Socket.IO agar seluruh perubahan status perangkat, alarm, workflow, dan dashboard diperbarui secara otomatis tanpa perlu melakukan refresh halaman.

---

# Scope

* Socket.IO Gateway
* Authentication
* Redis Adapter
* Namespace
* Room
* Event Broadcasting
* Reconnection
* Presence
* Dashboard Live Update
* Workflow Live Progress
* Alarm Live Update
* Notification Live Update

---

# Epic 1 — Socket Gateway

## Task 1.1

* [ ] Create Socket.IO Gateway

Acceptance Criteria

Socket server dapat menerima koneksi client.

---

## Task 1.2

* [ ] Configure Redis Adapter

Acceptance Criteria

Socket dapat berjalan pada multi-instance backend.

---

## Task 1.3

* [ ] Configure CORS

---

## Task 1.4

* [ ] Heartbeat

Acceptance Criteria

Client yang terputus dapat terdeteksi.

---

# Epic 2 — Authentication

## Task 2.1

* [ ] JWT Authentication

Acceptance Criteria

Socket hanya menerima koneksi dengan JWT yang valid.

---

## Task 2.2

* [ ] Permission Validation

---

## Task 2.3

* [ ] Disconnect Unauthorized Client

---

# Epic 3 — Namespace

## Task 3.1

* [ ] Dashboard Namespace

```text id="ns-dashboard"
/dashboard
```

---

## Task 3.2

* [ ] Device Namespace

```text id="ns-device"
/devices
```

---

## Task 3.3

* [ ] Workflow Namespace

```text id="ns-workflow"
/workflow
```

---

## Task 3.4

* [ ] Notification Namespace

```text id="ns-notification"
/notification
```

---

## Task 3.5

* [ ] System Namespace

```text id="ns-system"
/system
```

---

# Epic 4 — Room Management

## Task 4.1

* [ ] Room by User

---

## Task 4.2

* [ ] Room by Region

---

## Task 4.3

* [ ] Room by POP

---

## Task 4.4

* [ ] Room by OLT

---

## Task 4.5

* [ ] Room by Customer

Acceptance Criteria

Event hanya dikirim ke client yang membutuhkan.

---

# Epic 5 — Dashboard Realtime

## Task 5.1

* [ ] Live Summary Counter

---

## Task 5.2

* [ ] Live Customer Count

---

## Task 5.3

* [ ] Live ONU Status

---

## Task 5.4

* [ ] Live Alarm Counter

---

## Task 5.5

* [ ] Live Workflow Counter

Acceptance Criteria

Dashboard berubah tanpa refresh browser.

---

# Epic 6 — Device Events

## Task 6.1

* [ ] ONU Online Event

---

## Task 6.2

* [ ] ONU Offline Event

---

## Task 6.3

* [ ] LOS Event

---

## Task 6.4

* [ ] Dying Gasp Event

---

## Task 6.5

* [ ] Optical Power Update

---

## Task 6.6

* [ ] Parameter Update

---

# Epic 7 — Workflow Events

## Task 7.1

* [ ] Workflow Created

---

## Task 7.2

* [ ] Workflow Started

---

## Task 7.3

* [ ] Workflow Progress

---

## Task 7.4

* [ ] Workflow Completed

---

## Task 7.5

* [ ] Workflow Failed

---

## Task 7.6

* [ ] Workflow Rollback

---

# Epic 8 — Notification Events

## Task 8.1

* [ ] Notification Created

---

## Task 8.2

* [ ] Notification Read

---

## Task 8.3

* [ ] Notification Badge Counter

---

# Epic 9 — Frontend Socket Client

## Task 9.1

* [ ] Create Socket Client

---

## Task 9.2

* [ ] Auto Reconnect

---

## Task 9.3

* [ ] Connection Status Indicator

---

## Task 9.4

* [ ] Global Socket Store (Zustand)

---

## Task 9.5

* [ ] Socket Hooks

Acceptance Criteria

* useDashboardSocket()
* useWorkflowSocket()
* useDeviceSocket()
* useNotificationSocket()

---

# Epic 10 — Performance

## Task 10.1

* [ ] Event Throttling

---

## Task 10.2

* [ ] Event Batching

---

## Task 10.3

* [ ] Deduplicate Events

---

## Task 10.4

* [ ] Compression

---

# Epic 11 — Reliability

## Task 11.1

* [ ] Automatic Reconnect

---

## Task 11.2

* [ ] Exponential Backoff

---

## Task 11.3

* [ ] Event Retry

---

## Task 11.4

* [ ] Lost Connection Recovery

Acceptance Criteria

Client dapat kembali sinkron setelah koneksi pulih.

---

# Epic 12 — Security

## Task 12.1

* [ ] Rate Limit

---

## Task 12.2

* [ ] Event Validation

---

## Task 12.3

* [ ] Namespace Permission

---

## Task 12.4

* [ ] Audit Socket Connection

---

# Epic 13 — Testing

Backend

* [ ] Socket Gateway Test
* [ ] Namespace Test
* [ ] Authentication Test
* [ ] Redis Adapter Test

Frontend

* [ ] Socket Client Test
* [ ] Reconnect Test
* [ ] Live Dashboard Test

---

# Deliverables

Setelah fase ini selesai:

* Dashboard diperbarui secara realtime.
* Status ONU berubah secara otomatis.
* Alarm muncul secara langsung.
* Workflow menampilkan progress realtime.
* Notifikasi muncul tanpa refresh.
* Socket.IO berjalan pada multi-instance menggunakan Redis Adapter.

---

# Acceptance Criteria

* [ ] Socket.IO Gateway aktif.
* [ ] JWT Authentication pada socket berjalan.
* [ ] Namespace berfungsi.
* [ ] Room Management berfungsi.
* [ ] Dashboard menerima update realtime.
* [ ] Workflow menerima progress realtime.
* [ ] Alarm muncul secara realtime.
* [ ] Notification realtime berjalan.
* [ ] Reconnect berjalan otomatis.
* [ ] Unit test lulus.
* [ ] Dokumentasi diperbarui.

---

# Notes

* Gunakan event yang telah didefinisikan pada `SOCKET_EVENTS.md`.
* Seluruh event berasal dari Event Bus atau Workflow Engine, bukan langsung dari controller.
* Hindari mengirim payload besar; kirim hanya data yang diperlukan agar frontend dapat memperbarui state secara efisien.
* Gunakan Redis Pub/Sub sebagai media distribusi event antar instance backend.
* Semua koneksi socket wajib menggunakan JWT dan mengikuti aturan RBAC/PBAC yang telah dibuat pada fase Authentication.
