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

---

## 3. MARKHOR CLUB CONVERSATION AI & KNOWLEDGE BASE

### STATUS
`MANUAL SETUP REQUIRED — CONVERSATION AI AGENT`

### WHAT IS MISSING
Native GuaranteedCRM Conversation AI Agent configuration for automated lead capture and knowledge base Q&A directly inside the CRM.

### WHY IT IS REQUIRED
Routes visitor webchat and WhatsApp conversations through GuaranteedCRM's native AI engine before escalating to a human CSR. The website currently runs a local grounded AI engine (`src/lib/crm/knowledge-base.ts`) as a resilient fallback.

### MENU PATH
1. Log in to GuaranteedCRM / GoHighLevel dashboard.
2. Go to **AI Agents** (or **Automation**) → **Conversation AI**.
3. Click **Create Bot** (or **+ Add Bot**).

### EXACT SETUP / WHAT VALUES ARE REQUIRED
- **Bot Name**: `Markhor Club Concierge`
- **Role**: Digital membership & visitor concierge for Markhor Club.
- **Primary Purpose**: Answer verified FAQs, capture membership leads, assist with VIP site visit requests, and route to a live representative.
- **Tone**: Premium, professional, warm, concise, hospitality-led.
- **Knowledge Base Categories**: Add the 10 verified categories defined in `src/lib/crm/knowledge-base.ts`:
  1. `01 ABOUT MARKHOR CLUB` (500 Kanal luxury estate destination by Markhor Group)
  2. `02 LOCATION & ACCESS` (Near Alexander Road, Khanpur Dam, KPK, approx. 2 KM)
  3. `03 MEMBERSHIP & PRICING` (Pre-launch fee PKR 500,000, locked upon application)
  4. `04 CLUBHOUSE & AMENITIES` (Restaurants, Gym, Indoor Sports, Jacuzzi, Pools)
  5. `05 OUTDOOR & EQUESTRIAN` (Horse Riding, Golf, Boating, Jet Ski, Zipline)
  6. `06 AQUA THEME PARK` (Multi-generational water park destination)
  7. `07 BOOK A VISIT` (VIP site visit tours for the 500 Kanal estate)
  8. `08 CONTACT` (UAN 0995-111-222-333, info@markhourgroup.com, WhatsApp +923305230888)
  9. `09 PAYMENTS` (Bank Transfer, Cash, Cheque, Card with official receipt numbers)
  10. `10 HUMAN SUPPORT` (Live CSR handoff & offline callback logging)

### HOW TO VERIFY CONNECTION
1. Send a message to the CRM Webchat or WhatsApp channel.
2. Ask: *"What is the membership fee?"* -> Bot responds: *"The current pre-launch membership fee for Markhor Club is PKR 500,000."*
3. Ask unverified query: *"How many rooms does the resort have?"* -> Bot responds: *"I don't have verified information for that yet. I can connect you with a Markhor Club representative."*


