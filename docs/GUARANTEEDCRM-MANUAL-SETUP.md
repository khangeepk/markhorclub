# GUARANTEEDCRM — MANUAL SETUP GUIDE & UNRESOLVED MANUAL ACTIONS

This document details the exact manual steps required in GuaranteedCRM for features that require UI configuration, account billing, or third-party channel authorization.

---

## 1. WHATSAPP BUSINESS ACTIVATION & E164 NUMBER

### STATUS
`MANUAL SETUP REQUIRED — PENDING EXTERNAL ACTIVATION`

### WHAT IS MISSING
Automated WhatsApp alert delivery requires connecting a paid WhatsApp Business Account (WABA) or LC Phone channel inside GuaranteedCRM.

### WHY IT IS REQUIRED
To deliver automated outbound WhatsApp alerts to `+923305230888` (Admin) and automated WhatsApp notifications to applicants.

### MENU PATH
1. Log in to GuaranteedCRM / GoHighLevel dashboard.
2. Select Location **Markhor Club** (`XiafrvXc2uTJ0WzOAJFu`).
3. Click **Settings** (gear icon) → **Phone Numbers** (or **Conversations Providers**).
4. Click the **WhatsApp** tab.

### BUTTON TO CLICK
- Click **+ Connect WhatsApp Business Account** or **Add Number**.

### EXACT SETUP / WHAT VALUE IS REQUIRED
- **Business Account**: Select Markhor Group Pvt. Ltd. Meta Business Manager.
- **Phone Number to Connect**: Register phone number `+923305230888`.
- **Subscription Charge**: Standard Meta WABA per-conversation messaging rates apply.

### HOW TO VERIFY CONNECTION
1. Send a test message from the GuaranteedCRM Conversations inbox to a test mobile number.
2. What Antigravity should test afterward: Submit a test inquiry on `http://localhost:3000/#membership` and verify outbound log changes to `sent`.

---

## 2. GUARANTEEDCRM LIVE CHAT WIDGET EMBED

### STATUS
`MANUAL SETUP REQUIRED — LIVE CHAT EMBED`

### WHAT IS MISSING
GuaranteedCRM Chat Widget embed script URL (`NEXT_PUBLIC_GCRM_CHAT_WIDGET_SRC`) or widget ID (`NEXT_PUBLIC_GCRM_CHAT_WIDGET_ID`).

### WHY IT IS REQUIRED
Connects website visitors directly to a Live CSR in the GuaranteedCRM Conversations inbox. The website currently uses a grounded FAQ AI Concierge with fallback to WhatsApp & offline message logging.

### MENU PATH
1. Go to **Sites** → **Chat Widget**.
2. Select or Click **+ New Chat Widget**.

### BUTTON TO CLICK
- Click **Get Code** / **Embed Script**.

### EXACT SETUP / WHAT VALUE IS REQUIRED
- **Widget Title**: `Markhor VIP Concierge`
- **Primary Accent Color**: `#C7A15A` (Champagne Gold)
- **Background Surface**: `#071116` (Deep Midnight)
- **Environment Variables**: Add to `.env.local`:
  ```env
  NEXT_PUBLIC_GCRM_CHAT_WIDGET_SRC="https://widgets.leadconnectorhq.com/loader.js"
  NEXT_PUBLIC_GCRM_CHAT_WIDGET_ID="<your_widget_id>"
  ```

### HOW TO VERIFY CONNECTION
1. Submit a message in the chat widget on `http://localhost:3000/`.
2. What Antigravity should test afterward: Verify the message appears live in the GuaranteedCRM Conversations inbox.

