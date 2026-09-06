# VOCOGEN VOICE CONCIERGE INTEGRATION GUIDE

This document details the technical integration architecture and operational guide for using **VocoGen** as the voice output layer for the Markhor Club Concierge.

---

## 1. INTEGRATION STATUS & MODE

### CURRENT STATUS
`MODE C — MANUAL / PRE-GENERATED AUDIO CACHE`

### ARCHITECTURE SUMMARY
The Markhor website voice layer (`src/lib/voice/`) implements a provider abstraction that supports:
- **Server-Side VocoGen REST API Client** (`src/lib/voice/vocogen.ts`)
- **Normalized Audio Hash Cache & Pre-Generated Assets** (`src/lib/voice/fallback.ts`)
- **Browser Web Speech Synthesis Fallback**

Because VocoGen account API credentials (`VOCOGEN_API_KEY`) are not yet configured in `.env.local`, the application runs safely in **MODE C**, utilizing local pre-generated audio assets and browser speech synthesis without attempting unauthorized web scraping or browser cookie hacks.

---

## 2. PRE-GENERATED AUDIO WORKFLOW (RECOMMENDED)

To utilize your existing VocoGen subscription credits immediately without code changes:

1. Log in to your **VocoGen Account Dashboard**.
2. Select your preferred luxury concierge voice model (e.g. warm, hospitality-led tone).
3. Generate audio for the following 5 key Markhor Club verified responses:

### AUDIO ASSET MAP
| FAQ Response | Wording | Local File Path |
| :--- | :--- | :--- |
| **Membership Fee** | *"The current pre-launch membership fee for Markhor Club is PKR 500,000. Fee terms are locked upon application submission."* | `/public/assets/audio/concierge/membership-fee.mp3` |
| **Location** | *"Markhor Club is located near Alexander Road, Khanpur Dam, KPK, Pakistan, approximately 2 KM from Alexander Road."* | `/public/assets/audio/concierge/location-khanpur.mp3` |
| **Amenities** | *"Amenities include Signature Restaurants, Fitness Gym, Indoor Sports, Hydrotherapy Jacuzzi, and Shoreline Swimming Pools."* | `/public/assets/audio/concierge/amenities-overview.mp3` |
| **Aqua Theme Park** | *"The Aqua Theme Park is a multi-generational water park destination featuring aquatic adventure slides and family leisure facilities."* | `/public/assets/audio/concierge/aqua-theme-park.mp3` |
| **Book a Visit** | *"We would be delighted to host you for a VIP tour of our 500 Kanal Khanpur Dam estate."* | `/public/assets/audio/concierge/book-a-visit.mp3` |

4. Download the generated `.mp3` files from VocoGen and place them in:
   `public/assets/audio/concierge/`

The Markhor Concierge Listen button will immediately serve these pre-generated VocoGen audio files!

---

## 3. UPGRADING TO AUTOMATED REST API (MODE B)

When your VocoGen account API key is generated, activate server-side TTS by adding these keys to `.env.local`:

```env
# VocoGen API Credentials (SERVER-SIDE ONLY - NEVER EXPOSE TO CLIENT)
VOCOGEN_API_KEY="your_vocogen_api_key_here"
VOCOGEN_BASE_URL="https://api.vocogen.ai/v1"
VOCOGEN_VOICE_ID="markhor-concierge-en"
```

Once set, `src/lib/voice/provider.ts` will automatically switch to **MODE B — ASYNCHRONOUS TTS READY**, sending server-side requests to VocoGen's official `/text-to-speech` endpoint!

---

## 4. COST PROTECTION & SAFEGUARDS

To protect your VocoGen credit balance:
1. **No Autoplay**: Audio is synthesized ONLY when a user explicitly clicks the **Listen** button.
2. **Text Normalization & Caching**: Identical FAQ answers return cached audio hashes without calling the API again.
3. **Input Length Limit**: Server-side request text is capped at max **500 characters**.
4. **Rate Limiting**: `/api/voice/synthesize` enforces a limit of **10 requests per 10 minutes** per IP.
