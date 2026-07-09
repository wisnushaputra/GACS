# FRONTEND_ARCHITECTURE.md

# Frontend Architecture

Version: 1.0

---

# Overview

Frontend BCMS dibangun menggunakan:

* React 19+
* TypeScript
* Vite
* Tailwind CSS
* React Router
* TanStack Query
* Zustand
* React Hook Form
* Zod
* Socket.IO Client
* Axios

Frontend menggunakan **Feature-Based Architecture**, sehingga setiap fitur memiliki folder, service, hooks, components, types, dan API sendiri.

---

# Goals

Frontend harus:

* Modular
* Reusable
* Type Safe
* Fast
* Scalable
* Easy to Maintain
* Offline Friendly (Partial)
* Responsive
* Enterprise Ready

---

# High Level Architecture

```text
Browser
      │
      ▼
React App
      │
      ├── Router
      │
      ├── Authentication
      │
      ├── Layout
      │
      ├── Modules
      │
      ├── Shared Components
      │
      ├── API Client
      │
      ├── Socket Client
      │
      ├── Global Store
      │
      └── Query Cache
```

---

# Folder Structure

```text
src/

    app/
        providers/
        router/

    assets/

    components/
        ui/
        common/

    layouts/

    modules/

        auth/

        dashboard/

        customer/

        olt/

        onu/

        monitoring/

        provisioning/

        workflow/

        notification/

        administration/

    hooks/

    services/

    stores/

    lib/

    types/

    utils/

    styles/

    constants/
```

---

# Module Structure

Setiap module wajib mengikuti struktur berikut.

```text
modules/

    customer/

        api/

        components/

        hooks/

        pages/

        schemas/

        services/

        store/

        types/

        utils/
```

Tidak diperbolehkan melakukan import langsung antar module kecuali melalui service atau shared component.

---

# Layer Architecture

```text
Page

↓

Feature Component

↓

Custom Hook

↓

Service

↓

API Client

↓

Backend API
```

Page tidak boleh memanggil Axios secara langsung.

---

# Routing

Menggunakan React Router.

```text
/

login

dashboard

customers

olt

onu

monitoring

workflow

notification

administration

settings

profile
```

Semua route menggunakan lazy loading.

---

# Layout

Layout dipisahkan menjadi:

```text
Auth Layout

Dashboard Layout

Blank Layout
```

Dashboard Layout terdiri dari:

* Sidebar
* Header
* Notification
* Breadcrumb
* Content
* Footer

---

# State Management

Gunakan Zustand hanya untuk:

* Authentication
* Sidebar
* Theme
* User Preferences
* Socket Connection
* Notification Badge

Jangan menggunakan Zustand untuk data API.

---

# Server State

Gunakan TanStack Query.

Semua request API harus menggunakan Query atau Mutation.

Contoh:

* Customer List
* ONU List
* OLT Detail
* Dashboard
* Monitoring
* Alarm
* Workflow

---

# API Layer

Semua request melalui:

```text
services/

    api.ts

    customer.service.ts

    monitoring.service.ts

    workflow.service.ts
```

Tidak boleh menggunakan fetch() secara langsung di component.

---

# Socket Architecture

```text
Socket Provider

↓

Socket Hook

↓

Module Hook

↓

Component
```

Socket hanya dibuat satu koneksi.

Tidak boleh membuat koneksi Socket.IO pada setiap halaman.

---

# Authentication

Menggunakan JWT.

Flow

```text
Login

↓

Access Token

↓

Axios Interceptor

↓

Refresh Token

↓

Retry Request
```

---

# Permission

Menggunakan RBAC.

```text
Permission Guard

↓

Role

↓

Permission

↓

Component
```

Contoh

```tsx
<Permission permission="customer:create">
    <Button />
</Permission>
```

---

# Form Management

Gunakan

React Hook Form

*

Zod

Semua validasi dilakukan menggunakan schema.

---

# Validation

Seluruh form memiliki schema.

Contoh

```text
customer.schema.ts

onu.schema.ts

workflow.schema.ts
```

---

# UI Components

Komponen dibagi menjadi

```text
ui/

Button

Card

Input

Table

Dialog

Drawer

Badge

Tabs

Tooltip

Select
```

dan

```text
common/

CustomerCard

OpticalCard

WorkflowCard

AlarmCard

StatusBadge

SearchBar
```

---

# Styling

Menggunakan Tailwind CSS.

Tidak diperbolehkan:

* Inline Style
* CSS Module
* Styled Component

Semua styling menggunakan utility class Tailwind.

---

# Theme

Support

* Light
* Dark
* System

Disimpan pada Local Storage.

---

# Error Handling

Gunakan Error Boundary.

Semua request API memiliki:

* Loading
* Empty State
* Error State
* Retry Button

---

# Loading Strategy

Gunakan:

* Skeleton
* Spinner
* Progress Bar

Hindari halaman kosong saat data dimuat.

---

# Table Standard

Semua tabel mendukung:

* Pagination
* Sorting
* Search
* Filter
* Export
* Column Visibility
* Row Selection

---

# Search

Gunakan debounce 300–500 ms.

Search dilakukan di server untuk dataset besar.

---

# Notification

Semua notifikasi berasal dari Notification Center.

Gunakan:

* Toast
* Drawer
* Badge Counter

---

# Realtime

Socket.IO digunakan untuk:

* Dashboard
* Monitoring
* Workflow Progress
* Notification
* Alarm
* Customer Status

---

# Performance

Gunakan:

* Lazy Loading
* React.memo
* useMemo
* useCallback
* Virtual Scrolling
* Code Splitting

---

# Accessibility

Semua komponen wajib:

* Keyboard Accessible
* Focus Ring
* ARIA Label
* Semantic HTML

---

# Security

* Sanitasi input sebelum ditampilkan.
* Jangan menyimpan token pada local state komponen.
* Validasi permission sebelum merender aksi.
* Jangan mengekspos informasi sensitif di frontend.

---

# Testing

Gunakan:

* Vitest
* React Testing Library
* Playwright

Minimal pengujian:

* Component
* Hook
* Page
* Navigation
* Form
* Permission
* Socket Integration

---

# AI Coding Rules

AI harus mengikuti aturan berikut:

1. Gunakan TypeScript secara ketat (`strict`).
2. Gunakan Feature-Based Architecture.
3. Hindari prop drilling; gunakan custom hooks atau context bila diperlukan.
4. Semua request API melalui service.
5. Semua data server melalui TanStack Query.
6. Semua form menggunakan React Hook Form + Zod.
7. Jangan menulis logika bisnis di komponen presentasi.
8. Komponen maksimal memiliki satu tanggung jawab utama.
9. Pisahkan komponen presentasional dan container jika kompleksitas meningkat.
10. Gunakan reusable component sebelum membuat komponen baru.
11. Semua halaman harus mendukung loading, empty, dan error state.
12. Semua perubahan status realtime berasal dari Socket.IO, bukan polling kecuali benar-benar diperlukan.

---

# Frontend Data Flow

```text
Backend API
        │
        ▼
Axios Client
        │
        ▼
TanStack Query
        │
        ▼
Feature Hook
        │
        ▼
Feature Component
        │
        ▼
Page
```

---

# Socket Data Flow

```text
Backend Event

↓

Redis Pub/Sub

↓

Socket.IO Server

↓

Socket Provider

↓

Feature Hook

↓

UI Update
```

---

# Summary

Frontend BCMS mengadopsi pendekatan **Feature-Based Architecture** dengan pemisahan yang jelas antara UI, state, service, dan komunikasi API. Seluruh interaksi data dilakukan melalui TanStack Query dan Socket.IO, sedangkan Zustand digunakan hanya untuk state global yang bersifat UI atau sesi pengguna. Pendekatan ini menjaga kode tetap modular, mudah diuji, mudah dikembangkan, dan siap menangani kebutuhan aplikasi monitoring dan provisioning broadband berskala enterprise.
