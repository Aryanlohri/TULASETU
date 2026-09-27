# TulaSetu — Online Verification System for Weighing & Measuring Instruments

> **Smart India Hackathon 2026** · Problem Statement SIH26036 · Team CODEXX, VIT Bhopal

TulaSetu digitizes India's Legal Metrology instrument verification lifecycle with **blockchain-anchored certificate verification**. Every certificate is hashed and recorded on a Hyperledger Fabric ledger, making it tamper-proof and publicly verifiable.

## 🏗 Architecture

```
┌──────────────┐   ┌──────────────┐   ┌───────────────┐
│  Next.js     │   │  Offline PWA │   │   Citizen     │
│  Dashboard   │   │  (Inspector) │   │   Verify Page │
└──────┬───────┘   └──────┬───────┘   └───────┬───────┘
       │                  │                    │
       └──────────┬───────┘────────────────────┘
                  │
          ┌───────▼────────┐
          │  Django REST   │
          │  API (JWT+RBAC)│
          └───┬────────┬───┘
              │        │
    ┌─────────▼──┐  ┌──▼──────────────┐
    │ PostgreSQL │  │ Fabric Sidecar  │
    │ + Redis    │  │ (Node.js bridge)│
    └────────────┘  └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │ Hyperledger     │
                    │ Fabric Ledger   │
                    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 20+ (for local frontend dev)
- Python 3.12+ (for local backend dev)

### One-Command Start (Docker)
```bash
# 1. Clone and configure
cp .env.example .env

# 2. Start all services
docker-compose up --build

# 3. Run migrations and seed demo data
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py seed_demo
```

### Access Points
| Service | URL |
|---------|-----|
| Frontend (Next.js) | http://localhost:3000 |
| Backend API | http://localhost:8000/api |
| Citizen Verification | http://localhost:3000/verify |
| PWA Inspector | http://localhost:8080 |
| Fabric Sidecar | http://localhost:3001 |

### Demo Credentials
| Role | Email | Password |
|------|-------|----------|
| Trader | trader@tulasetu.in | demo1234 |
| LMO Officer | lmo@tulasetu.in | demo1234 |
| GATC Officer | gatc@tulasetu.in | demo1234 |
| Citizen | citizen@tulasetu.in | demo1234 |

## 🎯 Demo Flow (5 minutes)

1. **Trader registers** and adds an instrument (weighing scale)
2. **Trader submits** a verification application
3. **Officer logs in**, sees the application, schedules inspection
4. **Officer opens PWA** → turns off WiFi → conducts inspection → turns WiFi on → data syncs
5. **Officer issues certificate** → system hashes it → anchors to Hyperledger Fabric → generates QR
6. **Citizen scans QR** on the verify page → sees LIVE blockchain verification ✅

## 🔐 Security & Privacy

- **No PII on-chain**: Only `{certificateId, SHA-256 hash, timestamp, issuerId}` goes to the ledger
- **JWT + RBAC**: Every endpoint enforces role-based access
- **State partitioning**: PostgreSQL Row-Level Security by `state_id`
- **Certificate hashing**: SHA-256 of canonical JSON (sorted keys, deterministic)

## 📁 Project Structure

```
tulasetu/
├── backend/          # Django REST API
├── frontend/         # Next.js + Tailwind CSS
├── blockchain/       # Hyperledger Fabric (chaincode + sidecar + network)
├── pwa-inspector/    # Offline-first field inspection PWA
├── docker-compose.yml
└── .env.example
```

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 + Tailwind CSS 3 |
| Backend | Django 5 + DRF |
| Auth | JWT (simplejwt) + RBAC |
| Database | PostgreSQL 16 |
| Cache | Redis 7 |
| Blockchain | Hyperledger Fabric 2.5 |
| Offline App | PWA (Service Workers + IndexedDB) |
| Containerization | Docker Compose |

## 📜 License

Built for Smart India Hackathon 2026. Team CODEXX, VIT Bhopal.
