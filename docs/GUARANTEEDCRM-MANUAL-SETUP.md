# GUARANTEEDCRM — MANUAL SETUP GUIDE & UNRESOLVED BLOCKERS

This document details the exact manual steps required in GuaranteedCRM for features that require UI configuration, account billing, or user assignment.

---

## 1. WHATSAPP BUSINESS ACTIVATION & E164 NUMBER

### STATUS
MANUAL SETUP REQUIRED — PENDING EXTERNAL ACTIVATION

### WHAT IS MISSING
Automated WhatsApp alert delivery requires connecting a paid WhatsApp Business Account (WABA) or LC Phone channel inside GuaranteedCRM.

### WHY IT IS REQUIRED
To deliver automated WhatsApp alerts to `+923305230888` (Admin) and automated WhatsApp notifications to applicants.

### WHERE TO CLICK
1. Log in to GuaranteedCRM / GoHighLevel dashboard.
2. Select Location **Markhor Club** (`XiafrvXc2uTJ0WzOAJFu`).
3. Click **Settings** (gear icon) → **Phone Numbers** (or **Conversations Providers**).
4. Click the **WhatsApp** tab.

### EXACT SETUP / WHAT VALUE IS REQUIRED
Connect your WhatsApp Business Account (WABA) or register phone number `+923305230888`.

### HOW TO VERIFY SUCCESS
Send a test message from the GuaranteedCRM Conversations inbox to a test mobile number.

---

## 2. MARKHOR CLUB VISIT BOOKING CALENDAR

### STATUS
MANUAL SETUP REQUIRED — VISIT BOOKING CALENDAR

### WHAT IS MISSING
Creating a booking calendar programmatically via API returned `400 No team member found` because calendar creation requires assigning at least one registered staff/team member ID in the CRM dashboard.

### WHY IT IS REQUIRED
Enables automatic online slot booking for guided 500 Kanal Khanpur Dam estate visits.

### WHERE TO CLICK
1. Go to **Settings** → **Calendars**.
2. Click **+ Create Calendar** → Select **Event Booking** or **Round Robin**.

### EXACT SETUP / WHAT VALUE IS REQUIRED
- **Calendar Name**: `Markhor Club Visit Booking`
- **Description**: `Guided 500 Kanal Estate & Luxury Amenities Tour`
- **Slot Duration**: `30 mins`
- **Assigned Team Member**: Select your active staff account in Markhor Club.

### HOW TO VERIFY SUCCESS
Copy the generated Calendar ID from the URL bar (e.g., `IbFim3K...`) and set it in `.env.local` as `GUARANTEEDCRM_VISIT_CALENDAR_ID`.

---

## 3. GUARANTEEDCRM LIVE CHAT WIDGET

### STATUS
MANUAL SETUP REQUIRED — LIVE CHAT WIDGET

### WHAT IS MISSING
Direct embed code or widget ID for GuaranteedCRM live chat inbox integration.

### WHY IT IS REQUIRED
Connects website visitors directly to a Live CSR in the GuaranteedCRM Conversations inbox.

### WHERE TO CLICK
1. Go to **Sites** → **Chat Widget**.
2. Click **+ New Chat Widget**.

### EXACT SETUP / WHAT VALUE IS REQUIRED
- **Widget Title**: `Markhor VIP Concierge`
- **Primary Accent Color**: `#C7A15A`
- **Background Surface**: `#071116`
- **Fallback Contact Routing**: WhatsApp `+923305230888`

### HOW TO VERIFY SUCCESS
Submit a message in the chat widget and verify it appears live in the GuaranteedCRM Conversations inbox.
