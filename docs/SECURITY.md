# SECURITY.md

# BCMS Security Architecture

Version: 1.0

---

# Overview

Dokumen ini mendefinisikan standar keamanan untuk seluruh komponen BCMS.

Tujuan utama:

* Confidentiality
* Integrity
* Availability
* Accountability
* Least Privilege
* Defense in Depth

---

# Security Principles

BCMS menerapkan prinsip:

* Least Privilege
* Zero Trust
* Secure by Default
* Defense in Depth
* Fail Secure
* Principle of Least Knowledge

---

# Security Layers

```text
Internet
    │
Cloudflare / WAF (Opsional)
    │
Nginx
    │
Rate Limiter
    │
JWT Authentication
    │
RBAC Authorization
    │
Application
    │
Workflow Engine
    │
GenieACS
    │
OLT Adapter
    │
Database
```

---

# Authentication

Menggunakan:

* JWT Access Token
* Refresh Token
* Password Hash (Argon2id atau bcrypt dengan parameter yang kuat)
* Session Revocation

Access Token memiliki masa berlaku singkat.

Refresh Token memiliki masa berlaku lebih panjang dan dapat dicabut.

---

# Authorization

Menggunakan RBAC.

Role contoh:

* Super Admin
* Administrator
* NOC
* Helpdesk
* Provisioning
* Technician
* Viewer

Permission bersifat granular.

Contoh:

```text
customer.read
customer.create
customer.update
customer.delete

onu.register
onu.replace

workflow.execute

monitoring.view

notification.send
```

---

# Password Policy

Minimal:

* 12 karakter
* Huruf besar
* Huruf kecil
* Angka
* Karakter khusus

Larangan:

* Password umum
* Password sama dengan username

---

# Multi-Factor Authentication

Disarankan untuk akun administrator.

Metode:

* TOTP Authenticator

Recovery code harus disediakan.

---

# Session Management

Logout harus:

* Mencabut refresh token
* Mengakhiri sesi aktif
* Mencatat audit log

---

# API Security

Seluruh endpoint:

* HTTPS only
* JWT Protected (kecuali endpoint publik)
* Input Validation
* Output Sanitization
* Rate Limiting

---

# Input Validation

Gunakan Zod pada seluruh request.

Validasi dilakukan sebelum logika bisnis dijalankan.

---

# Output Sanitization

Jangan mengirim:

* Password
* Hash Password
* API Key
* SSH Credential
* Secret
* Internal Stack Trace

---

# Secret Management

Rahasia aplikasi tidak boleh disimpan di source code.

Contoh:

* JWT Secret
* Database Password
* Redis Password
* SMTP Credential
* Telegram Token
* GenieACS Credential
* OLT Credential

Gunakan environment variable atau secret manager sesuai lingkungan deployment.

---

# OLT Credentials

Credential OLT harus:

* Disimpan terenkripsi saat berada di database (encryption at rest)
* Didekripsi hanya saat diperlukan
* Tidak pernah ditampilkan penuh di UI
* Tidak dicatat di log

---

# GenieACS Security

Gunakan akun layanan dengan hak akses minimum.

Batasi akses API hanya dari backend BCMS jika memungkinkan.

---

# Database Security

* Gunakan akun database dengan hak akses minimum.
* Aktifkan koneksi terenkripsi jika didukung.
* Backup harus dienkripsi.
* Jangan menggunakan akun superuser untuk aplikasi.

---

# Redis Security

* Gunakan autentikasi.
* Jangan mengekspos Redis ke internet.
* Batasi akses hanya dari jaringan internal.

---

# Socket.IO Security

* Wajib autentikasi saat koneksi.
* Validasi permission sebelum bergabung ke room.
* Tolak event dari klien yang tidak dikenal.
* Batasi ukuran payload.

---

# File Upload

Jika fitur upload tersedia:

* Batasi ukuran file.
* Validasi tipe file.
* Simpan di lokasi non-eksekusi.
* Ganti nama file secara acak.

---

# Logging Security

Log tidak boleh berisi:

* Password
* Token
* Secret
* Credential
* Informasi sensitif lainnya

Gunakan masking untuk data yang perlu dikenali sebagian, misalnya serial number atau username bila diperlukan.

---

# Audit Trail

Catat minimal:

* Login
* Logout
* Register ONU
* Replace ONU
* Push PPPoE
* Push WiFi
* Delete Customer
* Update Role
* Update Vendor Mapping
* Perubahan konfigurasi penting

Audit tidak boleh dapat diubah melalui antarmuka aplikasi.

---

# Rate Limiting

Minimal diterapkan pada:

* Login
* Refresh Token
* Password Reset
* Endpoint publik
* Socket handshake

---

# HTTP Security Headers

Gunakan header keamanan yang sesuai, misalnya:

* Content Security Policy (CSP)
* X-Content-Type-Options
* Referrer-Policy
* Permissions-Policy
* HSTS (untuk HTTPS)

---

# CORS

Batasi origin yang diizinkan.

Jangan gunakan wildcard (`*`) pada lingkungan produksi untuk endpoint yang membutuhkan autentikasi.

---

# Dependency Security

Sebelum rilis:

* Audit dependency
* Perbarui library yang memiliki kerentanan
* Hapus dependency yang tidak digunakan

---

# Container Security

* Jalankan container sebagai non-root.
* Gunakan image minimal.
* Jangan menyimpan secret di image.
* Terapkan resource limit.
* Perbarui base image secara berkala.

---

# Network Security

Pisahkan jaringan:

* Reverse Proxy
* Backend
* Database
* Redis
* GenieACS
* OLT Adapter

Database dan Redis tidak boleh dapat diakses langsung dari internet.

---

# Backup Security

Backup harus:

* Dienkripsi
* Diverifikasi secara berkala
* Memiliki retensi yang jelas
* Disimpan di lokasi yang aman

---

# Monitoring & Alerting

Pantau kejadian seperti:

* Login gagal berulang
* Lonjakan error autentikasi
* Upaya akses tanpa izin
* Perubahan role
* Perubahan konfigurasi penting
* Aktivitas administratif yang tidak biasa

---

# Incident Response

Jika terjadi insiden:

1. Identifikasi.
2. Isolasi.
3. Analisis.
4. Perbaikan.
5. Pemulihan.
6. Dokumentasi.

---

# Secure Coding Guidelines

Developer wajib:

* Menggunakan query terparameterisasi melalui ORM.
* Memvalidasi seluruh input.
* Tidak menyimpan secret di repository.
* Tidak menggunakan `eval` atau pola serupa.
* Menangani error melalui global error handler.
* Menulis log yang aman.

---

# AI Coding Rules

AI wajib mengikuti aturan berikut:

1. Semua endpoint harus memeriksa autentikasi dan otorisasi yang diperlukan.
2. Jangan pernah menghasilkan kode yang menampilkan secret ke UI atau log.
3. Validasi seluruh input menggunakan schema.
4. Gunakan prinsip least privilege pada akses ke layanan eksternal.
5. Jangan membuat kredensial default yang mudah ditebak.
6. Jangan mengembalikan stack trace ke pengguna.
7. Gunakan HTTPS pada lingkungan produksi.
8. Terapkan rate limiting pada endpoint sensitif.
9. Gunakan penyimpanan token yang sesuai dengan arsitektur yang dipilih.
10. Semua aksi administratif penting harus menghasilkan audit log.

---

# Security Checklist

* [ ] HTTPS aktif.
* [ ] JWT tervalidasi.
* [ ] RBAC diterapkan.
* [ ] Input tervalidasi.
* [ ] Output disanitasi.
* [ ] Secret tidak berada di repository.
* [ ] Rate limiting aktif.
* [ ] Security headers aktif.
* [ ] Audit log aktif.
* [ ] Backup terenkripsi.
* [ ] Dependency telah diaudit.
* [ ] Container berjalan sebagai non-root.

---

# Summary

BCMS menerapkan pendekatan **Security by Design** dengan autentikasi berbasis JWT, otorisasi RBAC, validasi input yang ketat, pengelolaan secret yang aman, audit trail, enkripsi data sensitif, serta perlindungan pada API, Socket.IO, integrasi GenieACS, dan OLT Adapter. Standar ini menjadi acuan seluruh proses pengembangan agar keamanan menjadi bagian dari arsitektur, bukan fitur tambahan.
