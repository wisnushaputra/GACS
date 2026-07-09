# DESIGN_SYSTEM.md

# BCMS Design System

Version: 1.0

---

# Design Principles

BCMS merupakan aplikasi operasional (OSS/NOC), sehingga desain harus mengutamakan:

* Fast
* Clean
* Consistent
* Data First
* Accessible
* Responsive
* Enterprise Ready

Prioritas utama adalah informasi, bukan dekorasi.

---

# Design Language

Inspirasi:

* Grafana
* GitHub
* Proxmox VE
* LibreNMS
* Linear

Karakteristik:

* Flat Design
* Soft Border
* Medium Rounded Corner
* Minimal Shadow
* High Information Density

---

# Color Palette

## Primary

```text
Primary 50
Primary 100
Primary 200
Primary 300
Primary 400
Primary 500
Primary 600
Primary 700
Primary 800
Primary 900
```

Default Primary:

Blue

---

## Neutral

```text
Gray 50

Gray 100

Gray 200

Gray 300

Gray 400

Gray 500

Gray 600

Gray 700

Gray 800

Gray 900
```

---

## Semantic Color

Success

Green

Warning

Amber

Danger

Red

Info

Blue

Secondary

Slate

---

# Status Color

ONLINE

Green

OFFLINE

Gray

LOS

Red

DYING GASP

Orange

REGISTERING

Blue

PROVISIONING

Purple

ERROR

Red

UNKNOWN

Gray

---

# Alarm Severity

Critical

Dark Red

Major

Red

Minor

Orange

Warning

Yellow

Info

Blue

Acknowledged

Gray

Resolved

Green

---

# Typography

Heading 1

32px

Bold

Heading 2

28px

Bold

Heading 3

24px

SemiBold

Heading 4

20px

SemiBold

Heading 5

18px

Medium

Body

14px

Regular

Caption

12px

Regular

Code

JetBrains Mono

---

# Border Radius

Small

6px

Medium

8px

Large

12px

Dialog

16px

---

# Shadow

Default

Soft

Hover

Medium

Dialog

Large

---

# Spacing

Base unit

4px

Common spacing

```text
4

8

12

16

20

24

32

40

48

64
```

---

# Layout

Sidebar

280px

Collapsed

72px

Header

64px

Content Padding

24px

Card Gap

16px

---

# Responsive Breakpoints

Mobile

640

Tablet

768

Laptop

1024

Desktop

1280

Wide

1536

---

# Icon

Gunakan:

Lucide React

Ukuran:

16

18

20

24

Jangan mencampur library icon.

---

# Button

Variant

Primary

Secondary

Outline

Ghost

Danger

Success

Ukuran

Small

Medium

Large

Loading

Disabled

Icon Button

Semua tombol memiliki state:

Hover

Focus

Active

Disabled

Loading

---

# Input

Semua input memiliki:

Label

Placeholder

Helper Text

Error Message

Prefix

Suffix

Loading

Disabled

---

# Select

Support:

Single

Multiple

Search

Async

---

# Checkbox

Support:

Checked

Unchecked

Indeterminate

---

# Radio

Horizontal

Vertical

---

# Switch

Active

Inactive

Loading

---

# Badge

Jenis badge:

Status

Severity

Vendor

Role

Workflow

Customer

---

# Card

Card terdiri dari:

Header

Body

Footer

Action

---

# Table

Seluruh tabel wajib mendukung:

Pagination

Sorting

Filtering

Search

Column Visibility

Export

Sticky Header

Responsive

Loading

Empty State

Error State

---

# Dialog

Ukuran:

Small

Medium

Large

Fullscreen

Support:

Confirm

Alert

Wizard

---

# Drawer

Posisi:

Right

Left

Support:

Detail View

Edit Form

Quick Action

---

# Tabs

Default

Underline

Segmented

---

# Breadcrumb

Home

↓

Module

↓

Detail

---

# Search

Global Search

Module Search

Debounce

Autocomplete

---

# Loading

Gunakan:

Skeleton

Progress

Spinner

Jangan menggunakan loading kosong.

---

# Empty State

Harus memiliki:

Icon

Title

Description

Primary Action

---

# Error State

Harus memiliki:

Icon

Error Message

Retry

Back Button

---

# Toast

Jenis:

Success

Warning

Error

Info

Posisi:

Top Right

Auto Close

Manual Close

---

# Notification Drawer

Menampilkan:

Unread

Read

Filter

Search

Grouping

---

# Dashboard Widgets

Gunakan kartu:

Customer Online

Customer Offline

LOS

Dying Gasp

OLT Online

ONU Online

Workflow Running

Alarm Active

---

# Monitoring Cards

ONU Status

Optical Power

Temperature

CPU

Memory

Uptime

Vendor

Firmware

---

# Workflow Stepper

Status:

Pending

Running

Success

Failed

Rollback

Retry

---

# Charts

Gunakan:

Recharts

Jenis:

Line

Area

Bar

Pie

Donut

Gauge

Heatmap (opsional)

---

# Topology View

Tree Layout

OLT

↓

PON

↓

Splitter

↓

ONU

↓

Customer

Support:

Expand

Collapse

Search

Highlight

---

# Animation

Gunakan animasi seperlunya:

Fade

Slide

Scale

Duration:

150–250 ms

Hindari animasi yang mengganggu operasional.

---

# Accessibility

* Kontras warna memenuhi standar WCAG.
* Semua komponen dapat diakses menggunakan keyboard.
* Focus indicator selalu terlihat.
* Ikon harus memiliki label jika berdiri sendiri.

---

# Dark Mode

Harus mendukung:

Light

Dark

System

Seluruh warna menggunakan token, bukan nilai hardcode.

---

# Design Tokens

Gunakan token seperti:

```text
color.primary

color.success

color.warning

color.danger

color.background

color.surface

color.border

spacing.md

radius.lg

font.body

shadow.sm
```

Jangan menggunakan nilai warna langsung di komponen.

---

# AI Design Rules

AI wajib mengikuti aturan berikut:

1. Gunakan komponen reusable sebelum membuat komponen baru.
2. Jangan membuat warna hardcode.
3. Semua warna berasal dari design token.
4. Semua halaman memiliki loading, empty, dan error state.
5. Gunakan badge untuk status perangkat.
6. Gunakan dialog untuk aksi destruktif.
7. Gunakan drawer untuk detail cepat.
8. Gunakan tabel untuk data besar.
9. Gunakan card untuk ringkasan metrik.
10. Konsisten menggunakan spacing berbasis kelipatan 4px.
11. Prioritaskan keterbacaan data dibanding dekorasi visual.
12. Pastikan tampilan tetap nyaman pada dark mode.

---

# UI Consistency Checklist

* [ ] Typography konsisten.
* [ ] Warna berasal dari design token.
* [ ] Status menggunakan badge standar.
* [ ] Semua form tervalidasi.
* [ ] Semua tabel mengikuti standar.
* [ ] Semua dialog mengikuti pola yang sama.
* [ ] Semua halaman memiliki loading, empty, dan error state.
* [ ] Semua ikon berasal dari Lucide React.
* [ ] Dark mode tervalidasi.
* [ ] Responsive pada seluruh breakpoint.

---

# Summary

BCMS Design System menyediakan pedoman visual dan interaksi yang konsisten untuk seluruh aplikasi. Dengan pendekatan berbasis design token, komponen reusable, dan pola UI yang seragam, pengembangan frontend menjadi lebih cepat, mudah dipelihara, serta menghasilkan pengalaman pengguna yang konsisten pada modul Dashboard, Monitoring, Provisioning, Workflow, hingga Administration.
