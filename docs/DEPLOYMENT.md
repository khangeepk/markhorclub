# Markhor Club — Staging & Production Deployment Guide

## System Requirements
- **Node.js**: `v18.x` or `v20.x` (LTS recommended)
- **Package Manager**: `npm` (v9+)
- **Database**: PostgreSQL (Production) / SQLite (Dev)
- **Deployment Platform**: Vercel, AWS Amplify, Docker, or Node Server

---

## 1. Environment Configuration

Copy `.env.example` to create your environment configuration:

```bash
# General Application
NEXT_PUBLIC_SITE_URL=https://markhorclub.com
NODE_ENV=production

# Database Connection (PostgreSQL)
DATABASE_URL="postgresql://markhor_user:secure_password@db-host:5432/markhor_prod?sslmode=require"

# Admin Authentication
JWT_SECRET="generate-a-strong-random-jwt-secret-key-min-32-chars"
ADMIN_INITIAL_USERNAME="admin"
ADMIN_INITIAL_PASSWORD="rotate-this-password-in-admin-portal-immediately"

# GuaranteedCRM Credentials
GCRM_LOCATION_ID="v4oJ0l67T9m4T4jR5S9R"
GCRM_PRIVATE_TOKEN="pit-your-guaranteedcrm-private-key"
GCRM_WEBHOOK_SECRET="whsec_your_gcrm_webhook_signing_secret"
NEXT_PUBLIC_GCRM_CHAT_WIDGET_ID="widget_markhor_live_chat_id"

# VocoGen Audio / Voice Concierge
VOCOGEN_API_KEY="voc_live_your_vocogen_api_key"

# Email SMTP Provider
SMTP_HOST="smtp.mailgun.org"
SMTP_PORT="587"
SMTP_USER="postmaster@mg.markhorclub.com"
SMTP_PASS="smtp_secure_password"
SMTP_FROM="Markhor Club <concierge@markhorclub.com>"
```

---

## 2. Build & Launch Commands

### Installation
```bash
npm ci
```

### Prisma Client Generation & Database Migration
```bash
npx prisma generate
npx prisma db push
```

### Build Production Bundle
```bash
npm run build
```

### Start Production Server
```bash
npm run start
```

---

## 3. Webhook Registration (GuaranteedCRM)

Register the following webhook endpoint in GuaranteedCRM Location Settings:

- **Target URL**: `https://markhorclub.com/api/crm/webhook`
- **Events**:
  - `ContactUpdate`
  - `OpportunityStageUpdate`
  - `InboundMessage`

---

## 4. Admin Security Post-Deploy Checklist
1. Log into `/admin` with initial credentials.
2. Navigate to **Settings** and update default password.
3. Confirm HTTPS HTTP-only cookie secure flags are active (`__Host-` or `Secure`).
