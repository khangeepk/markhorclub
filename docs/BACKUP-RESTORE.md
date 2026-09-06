# Markhor Club — Database Backup & Disaster Recovery Guide

## Overview
This document outlines the backup, retention, and disaster recovery procedures for the **Markhor Club** production database.

---

## 1. Managed Database Backups (PostgreSQL)

When deployed to production with managed PostgreSQL (e.g., Supabase, Neon, AWS RDS, DigitalOcean Managed PostgreSQL):

- **Automated Point-in-Time Recovery (PITR)**: Enable 7-day or 14-day continuous WAL archiving.
- **Daily Automated Snapshots**: Taken daily at 02:00 UTC.
- **Retention Period**: 30 days retention for daily snapshots.

> [!IMPORTANT]
> Verify in your cloud dashboard (e.g., Supabase / Neon / AWS RDS) that automated backups are enabled prior to DNS switchover.

---

## 2. Manual CLI Backup Procedure (PostgreSQL)

To create an immediate full database snapshot using `pg_dump`:

```bash
# Set environment variables
export DATABASE_URL="postgresql://user:password@host:5432/markhor_db?sslmode=require"

# Create timestamped compressed dump
pg_dump "$DATABASE_URL" -Fc -f "backups/markhor_prod_$(date +%Y%m%d_%H%M%S).dump"
```

---

## 3. SQLite Local/Development Backup Procedure

If operating in local preview or emergency SQLite fallback mode:

```bash
# SQLite online safe backup
sqlite3 dev.db ".backup 'backups/dev_backup_$(date +%Y%m%d_%H%M%S).db'"
```

---

## 4. Disaster Recovery & Restore Procedure

### PostgreSQL Restoration
1. Provision target database instance if recovering from catastrophic loss.
2. Run Prisma migration to establish baseline schema:
   ```bash
   npx prisma db push
   ```
3. Restore data dump:
   ```bash
   pg_restore --clean --no-acl --no-owner -d "$DATABASE_URL" backups/markhor_prod_YYYYMMDD_HHMMSS.dump
   ```
4. Verify database connectivity:
   ```bash
   npx prisma studio
   ```

---

## 5. Verification Schedule
- **Weekly Backup Audit**: Check backup file sizes and automated snapshot completion in database cloud console.
- **Quarterly Recovery Drill**: Test restoring a production backup snapshot to a staging database.
