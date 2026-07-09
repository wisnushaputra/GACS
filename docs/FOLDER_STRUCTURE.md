# FOLDER_STRUCTURE.md

# Broadband Customer Monitoring System (BCMS)

## Project Folder Structure

Version 1.0

---

# Monorepo Structure

```text
bcms/

docs/
    PRD.md
    ARCHITECTURE.md
    DATABASE.md
    API_SPEC.md
    GENIEACS_INTEGRATION.md
    OLT_ADAPTER.md
    ADAPTER_ARCHITECTURE.md
    SOCKET_EVENTS.md
    WORKFLOW_ENGINE.md
    VENDOR_MAPPING.md
    DOCKER.md
    AI_RULES.md
    PROJECT_BLUEPRINT.md
    FOLDER_STRUCTURE.md

backend/

frontend/

docker/

scripts/

.github/

.env.example

docker-compose.yml

README.md
```

---

# Backend Structure

```text
backend/

src/

app.ts
server.ts

config/
    env.ts
    logger.ts
    database.ts
    redis.ts
    socket.ts

shared/

    constants/
    enums/
    errors/
    dto/
    types/
    utils/
    validators/
    middleware/
    plugins/

db/

    schema/
    migrations/
    seed/
    drizzle.config.ts

modules/

adapter/
workflow/
socket/
worker/

auth/
users/
roles/
permissions/

dashboard/
monitoring/
events/
alarms/

customers/
devices/
onus/
olts/

provision/
replace/
pppoe/
wifi/
notification/

tests/
```

---

# Module Structure

Semua module mengikuti struktur yang sama.

```text
module-name/

index.ts

routes.ts

controller.ts

service.ts

repository.ts

schema.ts

dto.ts

mapper.ts

types.ts

errors.ts

events.ts

permissions.ts

README.md
```

---

# Controller

Hanya bertanggung jawab untuk:

* Request
* Response
* Validation
* Authentication

Tidak boleh:

* SQL
* HTTP Request
* Redis
* Business Logic

---

# Service

Hanya:

* Business Logic
* Workflow
* Event Publish

Tidak boleh:

* SQL langsung
* CLI
* HTTP langsung

---

# Repository

Hanya:

* Drizzle ORM
* Query Database

Tidak boleh:

* Redis
* Socket
* HTTP

---

# Adapter Structure

```text
adapter/

olt/

base/
    OLTAdapter.ts
    types.ts
    errors.ts
    factory.ts

Huawei/
    HuaweiAdapter.ts
    HuaweiCommandBuilder.ts
    HuaweiMapper.ts
    HuaweiParser.ts
    HuaweiTransport.ts

ZTE/
Fiberhome/
VSOL/

genieacs/

GenieACSClient.ts
DeviceAdapter.ts
TaskAdapter.ts
ProvisionAdapter.ts
ParameterAdapter.ts
Mapper.ts
Types.ts

notification/
storage/
radius/
mikrotik/
snmp/
```

---

# Workflow Structure

```text
workflow/

engine/

WorkflowEngine.ts
WorkflowRunner.ts
WorkflowFactory.ts
WorkflowRegistry.ts
WorkflowContext.ts

steps/

register-onu/
replace-onu/
push-pppoe/
push-wifi/
backup-config/
restore-config/

shared/

events/
types/
errors/
```

---

# Worker Structure

```text
worker/

queues/
processors/
jobs/
scheduler/

index.ts
```

Queue Processor

* register-onu.processor.ts
* replace-onu.processor.ts
* pppoe.processor.ts
* wifi.processor.ts
* notification.processor.ts

---

# Socket Structure

```text
socket/

gateway.ts

namespaces/

dashboard.ts
device.ts
events.ts
tasks.ts
system.ts

handlers/
middleware/
events/
types/
```

---

# Frontend Structure

```text
frontend/

src/

main.tsx
App.tsx

assets/

components/

common/
layout/
forms/
tables/
charts/
dialogs/

features/

auth/
dashboard/
customers/
devices/
olts/
onus/
monitoring/
events/
notification/
workflow/
settings/

hooks/

stores/

services/

socket/

routes/

layouts/

utils/

types/

constants/

styles/
```

---

# Feature Structure (Frontend)

```text
feature/

api/

components/

hooks/

pages/

store/

types/

utils/

index.ts
```

Contoh

```text
dashboard/

api/
components/
hooks/
pages/
store/
types/

index.ts
```

---

# React Components

Gunakan

```text
components/

Button.tsx

Card.tsx

Table.tsx

Modal.tsx

Input.tsx
```

Reusable.

---

# API Service

```text
services/

api.ts

auth.ts

dashboard.ts

device.ts

workflow.ts

customer.ts
```

Tidak boleh fetch langsung dari component.

---

# Zustand Store

```text
stores/

auth.store.ts

dashboard.store.ts

notification.store.ts

socket.store.ts
```

---

# Socket Service

```text
socket/

client.ts

dashboard.ts

device.ts

events.ts
```

React Component tidak boleh menggunakan Socket.IO langsung.

---

# Hooks

```text
hooks/

useAuth.ts

useSocket.ts

useDashboard.ts

useWorkflow.ts
```

---

# Types

Global

```text
types/

api.ts

user.ts

device.ts

workflow.ts
```

Feature-specific types berada di dalam folder feature masing-masing.

---

# Assets

```text
assets/

images/

icons/

logo/

fonts/
```

---

# Testing Structure

Backend

```text
tests/

unit/

integration/

adapter/

workflow/
```

Frontend

```text
src/

tests/

components/

hooks/

pages/
```

---

# Naming Rules

Folder

kebab-case

File

kebab-case

Class

PascalCase

Function

camelCase

Interface

PascalCase

Enum

PascalCase

Constant

UPPER_SNAKE_CASE

---

# File Responsibility

Setiap file hanya memiliki satu tanggung jawab.

Contoh

```text
dashboard.service.ts
```

↓

Hanya business dashboard.

Bukan monitoring.

---

# Import Rules

Gunakan absolute import.

Contoh

```ts
import { DashboardService } from "@/modules/dashboard/service";
```

Hindari relative import yang terlalu panjang.

---

# Documentation Rules

Setiap module wajib memiliki:

```text
README.md
```

Berisi:

* Tujuan module
* Endpoint
* Workflow
* Event
* Dependency

---

# Forbidden Structure

Jangan membuat folder seperti:

```text
helpers/

misc/

temp/

old/

utils2/

new/

backup/
```

Nama folder harus jelas dan sesuai domain.

---

# Dependency Rules

Controller

↓

Service

↓

Repository

↓

Database

Service

↓

Workflow

↓

Adapter

↓

Vendor

Tidak boleh melompati layer.

---

# Configuration Files

```text
backend/

tsconfig.json

eslint.config.js

prettier.config.js

drizzle.config.ts

vitest.config.ts
```

Frontend

```text
vite.config.ts

tailwind.config.ts

tsconfig.json

eslint.config.js

vitest.config.ts
```

---

# Build Output

Backend

```text
dist/
```

Frontend

```text
dist/
```

Folder hasil build tidak boleh dikomit ke Git.

---

# Git Ignore

Minimal:

```text
node_modules/
dist/
coverage/
.env
.env.local
*.log
```

---

# Design Principles

1. Feature-first organization.
2. Modular Monolith.
3. Satu module memiliki satu domain bisnis.
4. Tidak ada circular dependency.
5. Adapter dipisahkan dari Business Logic.
6. Workflow dipisahkan dari Service.
7. Shared hanya untuk utilitas yang benar-benar umum.
8. Struktur backend dan frontend harus konsisten agar mudah dipahami AI maupun developer.
