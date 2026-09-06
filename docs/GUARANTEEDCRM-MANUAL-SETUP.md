# GUARANTEEDCRM — MANUAL SETUP GUIDE & EXTERNAL BLOCKERS

This document details the exact manual steps required in GuaranteedCRM for features that require UI configuration or administrator scope.

---

## 1. MARKHOR MEMBERSHIP PIPELINE SETUP

### BLOCKER
The Private Integration API token has read access to Opportunities & Pipelines, but lacks full administrative scope to programmatically create new pipelines (`POST /opportunities/pipelines` returned `401 Unauthorized for scope`).

### WHY IT IS REQUIRED
To organize incoming Markhor Club membership inquiries, qualify leads, schedule visits, track applications, pending payments, and converted members.

### EXACT MENU PATH
1. Log in to GuaranteedCRM / GoHighLevel dashboard.
2. Ensure you are in the **Markhor Club** Location (`XiafrvXc2uTJ0WzOAJFu`).
3. Click **CRM Settings** (bottom left gear icon) → **Pipelines**.
4. Click the **+ Create new pipeline** button in the top right.

### EXACT VALUES TO ENTER
- **Pipeline Name**: `MARKHOR MEMBERSHIP`
- **Stages**:
  1. `01 New Inquiry`
  2. `02 Contacted`
  3. `03 Qualified`
  4. `04 Visit Scheduled`
  5. `05 Application Submitted`
  6. `06 Payment Pending`
  7. `07 Member`
  8. `08 Closed / Lost`

### HOW TO VERIFY SUCCESS
Go to **Opportunities** in the main navigation menu. Select `MARKHOR MEMBERSHIP` from the pipeline dropdown. All 8 stages should appear sequentially from left to right.

---

## 2. WHATSAPP BUSINESS ACTIVATION & E164 NUMBER

### BLOCKER
WhatsApp notification sending via GuaranteedCRM requires paid WhatsApp API / LC Phone / Twilio WhatsApp channel activation.

### WHY IT IS REQUIRED
To deliver instant admin alerts to `+923305230888` and automated member messaging via WhatsApp.

### EXACT MENU PATH
1. Go to **Settings** → **Phone Numbers** (or **Conversations Providers**).
2. Click **WhatsApp** tab.
3. Connect your WhatsApp Business Account (WABA) or register phone number `+923305230888`.

### HOW TO VERIFY SUCCESS
Send a test WhatsApp message from the Conversations inbox to a test mobile number.

---

## 3. MARKHOR CALENDAR FOR "BOOK A VISIT"

### BLOCKER
Creating a new booking calendar programmatically requires calendar admin scope.

### WHY IT IS REQUIRED
Allows visitors on the website to select available time slots to visit the 500 Kanal Khanpur Dam estate.

### EXACT MENU PATH
1. Go to **Settings** → **Calendars**.
2. Click **+ Create Calendar** → Select **Event Booking** or **Round Robin**.
3. Name: `Markhor Club Visit Booking`.
4. Description: `Guided 500 Kanal Estate & Luxury Amenities Tour`.

### HOW TO VERIFY SUCCESS
The calendar will have a unique Calendar ID available in the URL bar, which can be set in `.env.local` as `GUARANTEEDCRM_VISIT_CALENDAR_ID`.

---

## 4. CUSTOM FIELDS CREATION (OPTIONAL / RECOMMENDED)

### EXACT MENU PATH
1. Go to **Settings** → **Custom Fields**.
2. Add the following fields to Contacts:
   - `Markhor Member ID` (Single Line Text)
   - `Membership Number` (Single Line Text)
   - `Membership Status` (Dropdown: Inquiry, Qualified, Active Member, Suspended, Expired)
   - `Membership Fee Snapshot` (Monetary / Text, e.g. PKR 500,000)
   - `Fee Paid` (Monetary / Text)
   - `Outstanding Balance` (Monetary / Text)
