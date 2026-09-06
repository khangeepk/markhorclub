# VOCOGEN VOICE CONCIERGE INTEGRATION GUIDE

**Status**: ACTIVE — MODE C (HYBRID PRE-GENERATED AUDIO + WEBSPEECH FALLBACK) / MODE A & B API READY

---

## 1. Overview

The **Markhor Club Voice Concierge** integrates VocoGen text-to-speech technology to provide an audio-enabled Concierge experience for visitors inquiring about Markhor Club, membership fees, location, amenities, and site visits.

To protect voice credits, prevent arbitrary endpoint abuse, and maintain zero client-side secret exposure, the integration supports two modes:

1. **Automated REST API Mode (MODE A / MODE B)**: Activates automatically when `VOCOGEN_API_KEY` is provided in `.env.local`.
2. **Pre-generated Audio Library Mode (MODE C — Default)**: Uses pre-generated studio audio files stored locally under `/public/assets/audio/concierge/` with browser WebSpeech API as a progressive fallback for dynamic responses.

---

## 2. Production Audio Generation Workflow

If operating in **MODE C (Pre-generated Audio Library)**, follow these steps to generate high-quality audio clips using your active VocoGen account:

### Step 1: Open VocoGen Web UI
Navigate to your active VocoGen dashboard and open **Text-to-Speech** or **Voice Library**.

### Step 2: Select Voice Persona
- **English**: Select a sophisticated, warm, British or Neutral international accent (Recommended VocoGen voice: `markhor-concierge-en` or equivalent luxury voice).
- **Urdu**: Select a natural, clear Pakistani Urdu voice persona (Recommended VocoGen voice: `markhor-concierge-ur`).

### Step 3: Copy Approved Scripts
Copy the exact verified scripts from `docs/MARKHOR-VOICE-SCRIPTS.md`.

### Step 4: Synthesize & Download
Synthesize each script in VocoGen at **1.0x speed** in **MP3 (44.1kHz / 192kbps)** format.

### Step 5: Save & Rename
Save each downloaded file using the exact filenames listed in the **Asset Manifest Checklist** below:

Place files inside: `/public/assets/audio/concierge/`

---

## 3. Asset Manifest Checklist (14 Audio Files)

| File Key | Filename | Language | Topic | Required Location |
| --- | --- | --- | --- | --- |
| `welcome_en` | `welcome-en.mp3` | English | Welcome Greeting | `/public/assets/audio/concierge/welcome-en.mp3` |
| `welcome_ur` | `welcome-ur.mp3` | Urdu | Welcome Greeting | `/public/assets/audio/concierge/welcome-ur.mp3` |
| `membership_fee_en` | `membership-fee-en.mp3` | English | Membership Fee (PKR 500,000) | `/public/assets/audio/concierge/membership-fee-en.mp3` |
| `membership_fee_ur` | `membership-fee-ur.mp3` | Urdu | Membership Fee (PKR 500,000) | `/public/assets/audio/concierge/membership-fee-ur.mp3` |
| `location_en` | `location-en.mp3` | English | Khanpur Dam Location | `/public/assets/audio/concierge/location-en.mp3` |
| `location_ur` | `location-ur.mp3` | Urdu | Khanpur Dam Location | `/public/assets/audio/concierge/location-ur.mp3` |
| `amenities_en` | `amenities-en.mp3` | English | 5 Signature Amenities | `/public/assets/audio/concierge/amenities-en.mp3` |
| `amenities_ur` | `amenities-ur.mp3` | Urdu | 5 Signature Amenities | `/public/assets/audio/concierge/amenities-ur.mp3` |
| `book_visit_en` | `book-visit-en.mp3` | English | VIP Site Visit | `/public/assets/audio/concierge/book-visit-en.mp3` |
| `book_visit_ur` | `book-visit-ur.mp3` | Urdu | VIP Site Visit | `/public/assets/audio/concierge/book-visit-ur.mp3` |
| `human_support_en` | `human-support-en.mp3` | English | Live CSR Escalation | `/public/assets/audio/concierge/human-support-en.mp3` |
| `human_support_ur` | `human-support-ur.mp3` | Urdu | Live CSR Escalation | `/public/assets/audio/concierge/human-support-ur.mp3` |
| `csr_offline_en` | `csr-offline-en.mp3` | English | CSR Offline / Callback | `/public/assets/audio/concierge/csr-offline-en.mp3` |
| `csr_offline_ur` | `csr-offline-ur.mp3` | Urdu | CSR Offline / Callback | `/public/assets/audio/concierge/csr-offline-ur.mp3` |

---

## 4. Enabling Automated REST API (Optional Mode A)

If an official VocoGen developer API key is available for your account:

1. Open `.env.local`
2. Add your credentials:
```env
VOCOGEN_API_KEY="your_actual_vocogen_api_key"
VOCOGEN_BASE_URL="https://api.vocogen.ai/v1"
VOCOGEN_VOICE_ID="markhor-concierge-en"
```
3. Restart dev server (`npm run dev`). The system will automatically detect the key and upgrade to **MODE_A_API**.

---

## 5. Security & Credit Protections
- **No Autoplay**: Audio plays ONLY when the visitor explicitly clicks **Listen** or **Play**.
- **Rate Limit**: API route `POST /api/voice/synthesize` is rate-limited to **10 requests per 10 minutes** per IP.
- **Max Prompt Length**: Input text is capped at **500 characters**.
- **Zero Secret Exposure**: VocoGen credentials are read exclusively server-side.
