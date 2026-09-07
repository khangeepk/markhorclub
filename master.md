# MARKHOR CLUB — MASTER PROJECT DOCUMENTATION

## PROJECT OVERVIEW
- **Project**: Markhor Club
- **Company**: Markhor Group Pvt. Ltd.
- **Location**: Near Alexander Road, Khanpur Dam, KPK, Pakistan
- **Area**: 500 Kanal Estate
- **UAN**: 0995-111-222-333
- **Email**: info@markhourgroup.com
- **Website**: www.markhourgroup.com

---

## PHASE 1 COMPLETION RECORD & LOCK
- **Status**: COMPLETE (LOCKED)
- **Completion Date**: September 5, 2026
- **Summary**: Technical audit, workspace consolidation, design tokens, UI primitives (`Container`, `SectionWrapper`, `Typography`, `LuxuryButton`, `MediaFrame`, `StatItem`, `LuxuryCard`, `Divider`, `ScrollIndicator`, `ConceptDisclaimer`), and Lenis/GSAP setup.

---

## PHASE 2 COMPLETION RECORD & LOCK
- **Status**: COMPLETE (LOCKED)
- **Completion Date**: September 5, 2026
- **Summary**: `CinematicPreloader`, floating sticky header (>50px transition, backdrop blur, champagne hairline border, `BOOK A VISIT` CTA), dedicated mobile menu drawer (`MobileMenu.tsx`), `100svh` Hero layout with left editorial composition, directional gradient mask, line-by-line GSAP reveal, and `SCROLL TO DISCOVER` cue.

---

## PHASE 3 COMPLETION RECORD & LOCK
- **Status**: COMPLETE (LOCKED)
- **Completion Date**: September 5, 2026
- **Summary**: Brand Story / Why Markhor Club section (`BrandStory.tsx`), warm editorial environment transition (`#F4F0E8`), approved visual frame (`brand-story-visual.png`), 5 lifestyle pillars (`NATURE`, `LEISURE`, `WELLNESS`, `ADVENTURE`, `COMMUNITY`), and verified project data strip.

---

## PHASE 4 COMPLETION RECORD & LOCK
- **Status**: COMPLETE (LOCKED)
- **Completion Date**: September 5, 2026
- **Summary**: Location & Destination Experience section (`LocationDestination.tsx`), deep midnight & Khanpur water blue transition (`#071116` / `#164E63`), full-bleed Khanpur Dam visual (`location-destination-visual.jpg`), linear destination path (`PAKISTAN -> KPK -> KHANPUR DAM -> MARKHOR CLUB`), 2 KM access cue, view facing highlight, destination data stack, and abstract SVG map graphic with gold emblem pin marker.

---

## PHASE 5 COMPLETION RECORD & LOCK
- **Status**: COMPLETE (LOCKED)
- **Completion Date**: September 5, 2026
- **Summary**: The Club Experience / Luxury Amenities Showcase (`ClubExperience.tsx`), deep midnight private-club atmosphere, 5 primary amenity chapters (`01 RESTAURANTS`, `02 GYM & FITNESS`, `03 INDOOR SPORTS`, `04 JACUZZI & WELLNESS`, `05 SWIMMING POOL`), interactive sticky desktop index, right cinematic media viewport, mobile stacked chapters, and Phase 6 teaser handoff.

---

## PHASE 6 COMPLETION RECORD

- **Phase 6 Status**: COMPLETE
- **Completion Date**: September 5, 2026

### 1. Section Architecture & Environment
- **Section**: "Outdoor Adventure & Equestrian Lifestyle" (`OutdoorAdventure.tsx`)
- **Placement**: Placed directly after `<ClubExperience />` on the homepage (`src/app/page.tsx`).
- **Environment Transition**: Open Landscape & Outdoor Environment (`#071116` Deep Midnight with `#263D32` natural pine green, `#164E63` water blue, and `#C7A15A` gold accents).

### 2. Files Modified & Created
- `src/components/home/OutdoorAdventure.tsx` — [NEW] Outdoor adventure storytelling component featuring 5 outdoor chapters with editorial layout variation, Markhor wildlife visual bridge, and Phase 7 teaser handoff.
- `public/assets/images/outdoor-equestrian.jpg` — [NEW] Production asset copied from approved `horse riding 2.jpg`.
- `public/assets/images/outdoor-golf.png` — [NEW] Production asset copied from approved `Golf Club.png`.
- `public/assets/images/outdoor-boating.jpg` — [NEW] Production asset copied from approved `boating 2.jpg`.
- `public/assets/images/outdoor-water-adventure.jpg` — [NEW] Production asset copied from approved `sports 2.jpg`.
- `public/assets/images/outdoor-zipline.jpg` — [NEW] Production asset copied from approved `zip line.jpg`.
- `public/assets/images/outdoor-markhor-wildlife.jpg` — [NEW] Production asset copied from approved `markhor.jpg`.
- `src/app/page.tsx` — [MODIFY] Rendered `<OutdoorAdventure />` directly following `<ClubExperience />`.

### 3. Exactly 5 Outdoor Chapters & Copy Implemented
- **Opening Copy**:
  - *Eyebrow*: `BEYOND THE CLUBHOUSE`
  - *Headline*: `THE OUTDOORS ARE PART OF THE CLUB.`
  - *Supporting Copy*: `From horseback and fairways to open water and high-energy adventure, Markhor Club extends the experience into the landscape around it.`
  - *Micro-line*: `RIDE • PLAY • EXPLORE • DISCOVER`
- **Chapter 01 — EQUESTRIAN**: Primary Line: *RIDE WITH FREEDOM.* \| Description: *A refined riding experience envisioned around open air, movement and the timeless relationship between rider and horse.* \| Labels: `RIDING` &bull; `NATURE` &bull; `EQUESTRIAN LIFESTYLE` \| Visual: `outdoor-equestrian.jpg`
- **Chapter 02 — GOLF**: Primary Line: *A GAME OF SPACE, FOCUS AND PRESTIGE.* \| Description: *A golf experience conceived as part of Markhor Club's broader outdoor lifestyle — bringing sport, landscape and social connection together.* \| Labels: `PLAY` &bull; `FOCUS` &bull; `LANDSCAPE` \| Visual: `outdoor-golf.png`
- **Chapter 03 — BOATING**: Primary Line: *THE WATER BECOMES THE ESCAPE.* \| Description: *A relaxed water-based experience inspired by the setting of Khanpur Dam and the freedom of spending time beyond the shoreline.* \| Labels: `WATER` &bull; `LEISURE` &bull; `ESCAPE` \| Visual: `outdoor-boating.jpg`
- **Chapter 04 — WATER ADVENTURE (JET SKI)**: Primary Line: *FOR THE DAYS THAT NEED MORE ENERGY.* \| Description: *A high-energy water experience bringing speed, movement and adventure into the Markhor Club lifestyle.* \| Labels: `SPEED` &bull; `MOVEMENT` &bull; `ADVENTURE` \| Visual: `outdoor-water-adventure.jpg`
- **Chapter 05 — ZIPLINE**: Primary Line: *SEE THE LANDSCAPE FROM ANOTHER ANGLE.* \| Description: *An adventure experience imagined to introduce height, movement and a new perspective on the natural setting.* \| Labels: `HEIGHT` &bull; `MOTION` &bull; `ADVENTURE` \| Visual: `outdoor-zipline.jpg`
- **Markhor Wildlife Visual Motif Bridge**: `HERITAGE & NATURE` &bull; `SHAPED BY THE MOUNTAINS` (`outdoor-markhor-wildlife.jpg`).
- **Teaser Handoff for Phase 7**:
  - `NEXT EXPERIENCE` &bull; `A WORLD BUILT AROUND WATER.`
  - `The adventure continues with a destination created for family fun, water and unforgettable days.`
  - Teaser CTA: `DISCOVER THE AQUA EXPERIENCE`

### 4. Motion & Responsive Architecture
- **Desktop**: Varied editorial compositions per chapter (left text/right visual, full visual moments with floating typography, portrait splits), GSAP line-mask headline reveals, and image scale/fade animations.
- **Mobile**: Vertical stacked chapter format with natural scrolling, high-impact imagery, and step badges.
- **Accessibility**: `prefers-reduced-motion` supported.

### 5. Performance & Build Verification
- Verified `npm run build`: Static export compiled 100% successfully (5/5 static routes). Zero TypeScript or build errors.

---

## PHASE 7 COMPLETION RECORD & LOCK

- **Phase 7 Status**: COMPLETE & LOCKED
- **Completion Date**: September 5, 2026

### 1. Section Architecture & Environment
- **Section**: "Aqua Theme Park Signature Experience" (`AquaExperience.tsx`)
- **Placement**: Placed directly after `<OutdoorAdventure />` on the homepage (`src/app/page.tsx`).
- **Environment Transition**: Bright, refreshing aquatic luxury atmosphere (`#071116` to `#0B1C26` with `#164E63` water blue, `#0891B2` cyan highlights, and `#D6B978` champagne gold accents).

### 2. Files Modified & Created
- `src/components/home/AquaExperience.tsx` — [NEW] Aqua Experience signature component featuring 5 multi-generational family water chapters, interactive desktop index, and Phase 8 teaser handoff.
- `public/assets/images/aqua-family-play.png` — [NEW] High-res generated luxury family water play asset.
- `public/assets/images/aqua-water-adventure.png` — [NEW] High-res generated aquatic adventure slide asset.
- `src/app/page.tsx` — [MODIFY] Rendered `<AquaExperience />` following `<OutdoorAdventure />`.

### 3. Chapters & Copy Implemented
- **Opening Copy**:
  - *Eyebrow*: `SIGNATURE DESTINATION`
  - *Headline*: `A WORLD BUILT AROUND WATER.`
  - *Supporting Copy*: `Designed for family leisure, aquatic adventure, and unforgettable days under the open sky, the Aqua Experience expands Markhor Club into a premier water destination.`
- **Chapters**:
  - `01 AQUA DESTINATION`: *THE AQUATIC DESTINATION.* \| Visual: `Dam View 2.jpg` (Artist's Impression)
  - `02 FAMILY WATER PLAY`: *JOY FOR EVERY GENERATION.* \| Visual: `aqua-family-play.png` (Artist's Impression)
  - `03 WATER ADVENTURE`: *HIGH-ENERGY AQUATIC THRILLS.* \| Visual: `aqua-water-adventure.png` (Artist's Impression)
  - `04 POOLS & LEISURE`: *SERENITY BY THE SHORELINE.* \| Visual: `Swiming pool 1.jpg` (Verified Site View)
  - `05 FAMILY ESCAPE`: *MEMORIES CREATED TOGETHER.* \| Visual: `Dam View 1.jpg` (Verified Site View)
- **Phase 8 Teaser**: `THE VISION CONTINUES` &bull; `500 KANAL MASTER PLAN & ESTATE VISION` &bull; `EXPLORE THE MASTER PLAN`.

---

## PHASE 8 COMPLETION RECORD & LOCK

- **Phase 8 Status**: COMPLETE & LOCKED
- **Completion Date**: September 5, 2026

### 1. Section Architecture & Environment
- **Section**: "500 Kanal Master Plan & Community Vision" (`MasterPlan.tsx`)
- **Placement**: Placed directly after `<AquaExperience />` on the homepage (`src/app/page.tsx`).
- **Environment Transition**: Deep midnight, slate, and topographic contour styling (`#071116` to `#0A1820` with `#D6B978` gold accents, `#F4F0E8` typography, and subtle topographic grid overlay).

### 2. Files Modified & Created
- `src/components/home/MasterPlan.tsx` — [NEW] Integrated 500 Kanal Master Plan storytelling component featuring an interactive 9-zone map workbench, preview thumbnails, editorial 500 Kanal anchor, and Phase 9 teaser handoff.
- `public/assets/images/master-plan-diagram.png` — [NEW] High-end architectural conceptual master plan diagram asset.
- `src/app/page.tsx` — [MODIFY] Rendered `<MasterPlan />` following `<AquaExperience />`.

### 3. Conceptual Plan Status & Disclaimer
- **Cadastral Survey Status**: Conceptual planning presentation (no official cadastral drawing supplied).
- **Mandatory Disclaimer**: `CONCEPTUAL PLANNING DIAGRAM — ARTIST'S IMPRESSION — NOT TO SCALE` clearly integrated on visual frames and detail blocks.

### 4. 9 Lifestyle Zones Implemented
1. `01 CLUB & SOCIAL CORE`: *The social heart of the destination — envisioned around gathering, connection and an elevated private-club atmosphere.*
2. `02 DINING & HOSPITALITY`: *A curated collection of spaces envisioned around fine dining, social moments, lake-view terraces and premium hospitality.*
3. `03 WELLNESS & INDOOR RECREATION`: *Fitness, indoor sport, swimming and restorative wellness experiences brought together as part of everyday club life.*
4. `04 EQUESTRIAN & OUTDOOR SPORT`: *Open-air experiences shaped around riding movement, controlled paddocks and natural connection with the landscape.*
5. `05 GOLF EXPERIENCE`: *A landscape-led golf component envisioned to bring sport, open space and social interaction into the wider Markhor lifestyle.* *(No unsupported hole count).*
6. `06 WATER & ADVENTURE`: *A more energetic connection with the destination, inspired by water speed, boating, jet-ski excursions and zip-line elevation.*
7. `07 AQUA EXPERIENCE`: *A signature family-focused part of the destination, bringing water play, aquatic adventure and splash pools into the vision.*
8. `08 EVENTS & COMMUNITY`: *Grand spaces imagined for celebrations, gatherings, outdoor banquets and shared moments that strengthen community identity.*
9. `09 OPEN LANDSCAPE`: *The natural mountain and lake setting remains central to the vision, allowing open space to shape the overall estate experience.*

### 5. Motion, Responsive & Factual Compliance
- **Desktop**: Interactive 9-zone index, center map canvas with animated gold zone pins, and right side active zone detail card with preview imagery.
- **Mobile**: Dedicated vertical stacked rows with conceptual diagram, numbers, icons, and text highlights.
- **Strict Factual Guardrails**: 0 fake parcel boundaries, road widths, plot counts, zone acreages, legal property divisions, or residential inventory claims.
- **Phase 9 Handoff**: `NEXT EXPERIENCE — IMMERSIVE LIFESTYLE GALLERY & VISUAL STORY` &bull; `REQUEST PROJECT DETAILS`.

---

## PHASE 9 COMPLETION RECORD & LOCK

- **Phase 9 Status**: COMPLETE & LOCKED
- **Completion Date**: September 5, 2026

### 1. Section Architecture & Environment
- **Section**: "Immersive Lifestyle Gallery & Visual Story" (`LifestyleGallery.tsx`)
- **Placement**: Placed directly after `<MasterPlan />` on the homepage (`src/app/page.tsx`).
- **Environment Transition**: Deep midnight `#071116` with gold accents, editorial typography scale, text-only breathing moments, and luxury full-screen lightbox modal.

### 2. Files Modified & Created
- `src/components/home/LifestyleGallery.tsx` — [NEW] Luxury editorial visual story component featuring 6 story groups, 12 curated visual items, text pauses, lightbox viewer, and Phase 10 handoff.
- `src/app/page.tsx` — [MODIFY] Rendered `<LifestyleGallery />` following `<MasterPlan />`.

### 3. 6 Visual Story Groups Implemented
1. `01 ARRIVE`: *ARRIVE SOMEWHERE THAT FEELS DIFFERENT.* (Visuals: Khanpur Dam Panorama & Entrance Approach)
2. `02 GATHER`: *GOOD PLACES BRING PEOPLE TOGETHER.* (Visuals: Signature Dining & Members Lounge)
3. `03 RESTORE`: *MAKE ROOM FOR A SLOWER PACE.* (Visuals: Hydrotherapy Jacuzzi & Shoreline Pool)
4. `04 PLAY`: *EVERY DAY CAN MOVE DIFFERENTLY.* (Visuals: Fairways & Indoor Sports Arena)
5. `05 EXPLORE`: *FOLLOW THE EXPERIENCE BEYOND THE CLUBHOUSE.* (Visuals: Equestrian Riding & Open Water Boating)
6. `06 CELEBRATE`: *SOME MOMENTS ARE MEANT TO BE SHARED.* (Visuals: Grand Banquet & Family Aqua Play)

### 4. Interactive Lightbox & Accessibility
- **Full-Screen Lightbox**: Dark backdrop blur (`bg-black/95 backdrop-blur-xl`), category tags, title, Artist's Impression indicator, slide counter (`01 / 12`), previous/next navigation, keyboard arrow key listeners, and Escape key close.
- **Accessibility & Motion**: ARIA landmarks, `prefers-reduced-motion` compliance, 320px–1440px+ zero horizontal overflow, and dedicated mobile vertical rhythm.

### 5. Phase 10 Handoff & Guardrails Observed
- **Phase 10 Teaser**: `THE MARKHOR LIFE IS DESIGNED TO BE LIVED.` &bull; `BECOME PART OF MARKHOR`.
- **Strict Boundary Guardrails**: Membership section, membership forms, PKR 500,000 fee UI, payment workflow, contact redesign, footer redesign, and CEO message strictly unbuilt in Phase 9.

---

## PHASE 10 COMPLETION RECORD & LOCK

- **Phase 10 Status**: COMPLETE & LOCKED
- **Completion Date**: September 5, 2026

### 1. Centralized Commercial Membership Configuration
- **Single Source of Truth**: `src/config/membership.ts` (`MEMBERSHIP_CONFIG`).
- **Configured Values**: `phaseLabel`: 'Pre-launch', `feePkr`: 500000, `feeFormatted`: 'PKR 500,000', `qualifier`: 'Current pre-launch membership fee. Subject to revision.', `contactEmail`: 'info@markhourgroup.com', `uanPhone`: '0995-111-222-333'.
- **Hard-coded Zero Policy**: Zero duplicated hard-coded "PKR 500,000" strings across JSX components. All UI components and API handlers reference `MEMBERSHIP_CONFIG`.

### 2. Files Modified & Created
- `src/config/membership.ts` — [NEW] Centralized membership configuration object.
- `src/app/api/membership-enquiry/route.ts` — [NEW] Next.js API route handling server-side payload validation, honeypot spam filtering, CRM webhook integration boundary, and server-side fee snapshot creation (`membership_phase_snapshot`, `membership_fee_snapshot_pkr`).
- `src/components/home/Membership.tsx` — [NEW] Membership experience & pre-launch application component featuring editorial fee presentation, 6 lifestyle pillars, responsive application form, real-time validation, and direct UAN/Email fallback.
- `src/app/page.tsx` — [MODIFY] Rendered `<Membership />` following `<LifestyleGallery />`.

### 3. Application Form & Fee Snapshot Architecture
- **Form Fields**: Full Name (req), Mobile Number (req, default +92 formatting), Email Address (req), Preferred Contact Method (Phone/Email/WhatsApp), Membership Category (Individual/Family/Corporate/General), Message (opt), Consent Checkbox (req).
- **Sensitive Data Exclusion**: NO CNIC, passport numbers, bank credentials, income data, or DOB requested.
- **Server Fee Snapshot**: Submissions record `membership_phase_snapshot` and `membership_fee_snapshot_pkr` server-side from trusted config so user input cannot tamper with the snapshot fee.

### 4. Technical & Build Verification
- **Build Output**: `npm run build` executed with **100% success** (6/6 static & dynamic pages generated cleanly).
- **Accessibility & Motion**: ARIA labels, `aria-required`, `aria-invalid`, screen-reader status announcements, `prefers-reduced-motion` compliance, 320px–1440px+ zero horizontal overflow.
- **Strict Boundary Guardrails**: Payment gateway, bank transfers, Contact page redesign, Footer redesign, and CEO message strictly unbuilt in Phase 10.

---

## LOCALHOST DEMO CHECKPOINT

- **Status**: RUNNING
- **Date**: September 5, 2026
- **Framework**: Next.js 14.2.35 (App Router)
- **Package Manager**: `npm`
- **Command Used**: `npm run dev`
- **Localhost URL**: `http://localhost:3000`
- **Default Port**: `3000`
- **QA Verification Results (Phases 1–10)**:
  1. Header & Hero (Phases 1–2): VERIFIED & RUNNING
  2. Brand Story (Phase 3): VERIFIED & RUNNING
  3. Location & Destination (Phase 4): VERIFIED & RUNNING
  4. Club Experience / Amenities (Phase 5): VERIFIED & RUNNING
  5. Outdoor Adventure & Equestrian (Phase 6): VERIFIED & RUNNING
  6. Aqua Experience (Phase 7): VERIFIED & RUNNING
  7. 500 Kanal Master Plan (Phase 8): VERIFIED & RUNNING
  8. Lifestyle Gallery (Phase 9): VERIFIED & RUNNING
  9. Membership Experience & Fee UI (Phase 10): VERIFIED & RUNNING (PKR 500,000 sourced from `src/config/membership.ts`)
  10. Form & API Backend (`/api/membership-enquiry`): VERIFIED & RUNNING
- **Local-only Limitations**: External CRM webhook integration boundary requires `.env` `CRM_WEBHOOK_URL` setting for remote delivery; local environment gracefully records payload and snapshot with direct UAN (`0995-111-222-333`) and Email (`info@markhourgroup.com`) fallbacks.
- **Fixes Performed**: Configured TypeScript path aliases and relative module resolution for `src/config/membership.ts`. Zero blocking errors.

---

## RECOVERY R1 VISUAL ACCEPTANCE

- **Status**: PASS
- **Date**: September 5, 2026
- **Source of Truth**: Localhost Browser Output (`http://localhost:3000`)
- **Browser-Level QA Results**:
  1. **Header Acceptance**: PASS — Sharp gold logo, luxury serif/sans typography, `#071116` translucent sticky backdrop on scroll, zero default blue links, gold gradient `BOOK A VISIT` CTA.
  2. **Hero Acceptance**: PASS — High-resolution Khanpur Dam mountain lake panorama (`Dam View.png`) as primary backdrop. Required copy `MARKHOR CLUB • KHANPUR DAM • KPK`, `A NEW ALTITUDE OF CLUB LIVING`, `A 500 Kanal destination...`, `EXPLORE MARKHOR CLUB`, and `REQUEST PROJECT DETAILS` verified.
  3. **Brand Story Acceptance**: PASS — 21:9 editorial visual frame (`Dam View 1.jpg`) with generous `min-h-[380px] md:min-h-[480px]` height. Warm ivory environment (`#F4F0E8`), `THE MARKHOR VISION`, `MORE THAN A CLUB. A WAY OF LIVING.`, 5 lifestyle pillars, and 4 project facts verified.
  4. **Image Container Audit**: PASS — Explicit aspect ratios (`aspect-[16/9]`, `aspect-[21/9]`, `aspect-[4/3]`, `aspect-[16/10]`) and `min-h` bounds applied to every section. 0 thin collapsed horizontal image strips.
  5. **Section-by-Section Static Quality**: PASS — Location (`#destination`), Amenities (`#amenities`), Outdoor Adventure (`#experiences`), Aqua Park (`#aqua-park`), Master Plan (`#master-plan`), Gallery (`#gallery`), and Membership (`#contact`) verified with clean static layout rendering.
  6. **Static First Rule**: PASS — Removed static `opacity-0` defaults and simplified GSAP timeline blocks to guarantee 100% Layer 1 static layout visibility independent of animation hydration.
  7. **Global Design Coherence**: PASS — Unified design system tokens (`#071116`, `#0B1C26`, `#C7A15A`, `#D6B978`, `#F4F0E8`), Playfair Display / Inter typography stack, gold accent dividers, and button styling.
  8. **Membership Business Logic**: PASS — `MEMBERSHIP_CONFIG` retains centralized `PKR 500,000` fee configuration and server endpoint `/api/membership-enquiry`.
  9. **Mobile Responsiveness**: PASS — Visually verified at 1440px desktop, 1024px laptop, 768px tablet, 390px mobile, and 320px mobile. Zero horizontal scroll overflow.
  10. **Build Verification**: PASS — `npm run build` static export compiled 100% successfully (6/6 routes). Zero TypeScript or lint errors.

---

## NEXT AUTHORIZED SCOPE
`RECOVERY R2 — CINEMATIC MOTION & FINAL VISUAL POLISH`

(DO NOT START R2 AUTOMATICALLY. STOP AFTER REPORTING VISUAL ACCEPTANCE RESULT.)

---

## CINEMATIC INTRO — IMPLEMENTED

- **Source video used**: `Logo and Movie/markhor movie jpgs/movie.mp4`
- **Production video path**: `public/assets/video/markhor-intro.mp4`
- **Poster path**: `public/assets/video/markhor-intro-poster.jpg` (matching supplied opening frame)
- **Intro component path**: `src/components/common/CinematicIntro.tsx`
- **Session storage key**: `markhorIntroPlayed`
- **Transition architecture**: GSAP final-stage handoff with video scale `1.00 → 1.02`, opacity reduction, midnight veil, brand lift, and overlay fade. Skip and natural video completion share the same path.
- **Hero synchronization method**: `Hero.tsx` consumes `useCinematicIntro()` and starts its existing GSAP entrance timeline only when `introComplete` is true; the Hero remains hidden until that state is ready.
- **Scroll locking method**: The intro stores/restores the original body overflow, applies `markhor-intro-active`, and pauses/resumes the existing Lenis instance through `SmoothScrollProvider`.
- **Reduced-motion behavior**: `prefers-reduced-motion: reduce` bypasses the video and reveals the Hero immediately.
- **Fallback behavior**: Video `error`, rejected playback, or a seven-second startup timeout triggers the same graceful transition, so the Hero is never blocked.
- **Desktop QA**: Verified through local build and browser smoke checks at desktop viewport sizes; intro layer remains above Header, Hero, and page content.
- **Mobile QA**: Responsive `100%` viewport fill, `object-fit: cover`, 58% mobile object positioning, accessible skip control, and no horizontal overflow rules included for 390px and 320px targets.
- **Video optimization performed**: No re-encode performed because FFmpeg is unavailable in the workspace; original 9.9 MB H.264-compatible source was copied without quality loss.
- **Known limitations**: Autoplay and exact crop can vary slightly by browser/device decoder; no public replay control was added by design.

---

## STITCH-CODEX-01 — STITCH ZIP UI IMPORT

- **Status**: COMPLETE — LOCALHOST RUNNING
- **Date**: September 6, 2026
- **Source ZIP**: `stitch_markhor_club_hero_experience.zip`
- **Imported reference folders**: Hero, Section 02 Vision, Section 03 Location, Section 04 Club Experience, Section 05 Outdoor Adventure, Section 06 Aqua desktop/mobile, cinematic intro, cinematic destination opening, and `sovereign_alpine_sanctuary/DESIGN.md`.
- **Design authority applied**: Midnight surface `#0B151A` / Markhor midnight `#071116`, navy container `#0B1C26`, champagne gold `#C7A15A` / `#D6B978`, ivory `#F4F0E8`, Playfair Display display type, Plus Jakarta Sans body type, tracked uppercase labels, hairline borders, sharp editorial image frames, 1440px container and responsive 2rem/1.25rem gutters.
- **Components changed**: `src/components/layout/Header.tsx`, `src/components/layout/MobileMenu.tsx`, `src/components/home/Hero.tsx`, `BrandStory.tsx`, `LocationDestination.tsx`, `ClubExperience.tsx`, `OutdoorAdventure.tsx`, and `AquaExperience.tsx`. Existing intro provider and lower Master Plan, Gallery, Membership, Contact, and Footer sections were preserved.
- **Build dependency correction**: Added `tailwindcss` to `postcss.config.cjs`; the previous configuration left Tailwind directives uncompiled in development.
- **Images**: Stitch reference image URLs were not imported as remote dependencies. Existing approved local imagery was reused, including the Dam view, vision composite, dining, amenities, equestrian, golf, boating, zipline, and aqua assets. New Stitch-specific raster files were not generated because the supplied screens contain reference exports rather than source asset bundles.
- **Verified copy guardrail**: Hero and Sections 02–06 use the verified Markhor Club, Khanpur Dam / KPK, approx. 2 KM from Alexander Road, Khanpur Dam view facing, and 500 Kanal destination facts. Unsupported acreage, capacity, ticket, opening-date, award, coordinate, and private-enclave claims were not added to the imported sections.
- **Sections completed**: Stitch-aligned Header + Hero, Section 02 Vision, Section 03 Location, Section 04 exactly 5 club experiences, Section 05 exactly 5 outdoor experiences, and Section 06 exactly 4 aqua chapters with desktop and mobile layouts. The cinematic intro remains integrated through `CinematicIntroProvider`.
- **QA**: `npm run build` PASS (6/6 routes). Browser checks PASS at requested 1440x900, 1366x768, 1024x768, 768x1024, 390x844, 375x812, and 320x568 viewport overrides. Document width matched the viewport at all checks with no horizontal overflow; visible mobile images loaded; final tab console error check returned no errors. Untouched lower sections retain their existing content and business logic.
- **Localhost**: `http://localhost:3001/` — dev server intentionally left running for handoff.
- **Unresolved visual mismatches**: Stitch Sections 02 and 03 screen exports are failed-fetch placeholders in the ZIP, so their compositions were reconstructed from `code.html` and localized project imagery. The local hero uses the supplied Khanpur Dam panorama rather than a Stitch-only resort render. Some legacy lower-section copy and rounded card treatment remain outside the imported Stitch scope.

### NEXT AUTHORIZED PROMPT

`STITCH-CODEX-02 — COMPLETE REMAINING HOMEPAGE TO FOOTER`

(DO NOT START AUTOMATICALLY. STOP AFTER REPORTING STITCH-CODEX-01.)

---

## STITCH-CODEX-02 — FULL HOMEPAGE VISUAL COMPLETION

- **Status**: COMPLETE — LOCALHOST RUNNING
- **Date**: September 6, 2026
- **Scope completed**: Remaining homepage continuation from Section 07 Master Plan through Gallery, Membership, Contact / Book a Visit, Footer, and full destination navigation.
- **Section 07 — Master Plan & Community Vision**: Implemented a conceptual editorial planning workbench with the nine verified categories only: Club & Social Core, Dining & Hospitality, Wellness & Indoor Recreation, Equestrian & Outdoor Sport, Golf, Water & Adventure, Aqua Theme Park, Events & Community, and Open Landscape. Added the required disclaimer: `CONCEPTUAL PLANNING DIAGRAM — ARTIST'S IMPRESSION — NOT TO SCALE`. No fake plot boundaries, invented measurements, or pseudo-technical infrastructure claims were added.
- **Section 08 — Editorial Gallery**: Rebuilt as an asymmetric editorial sequence with a dominant Khanpur Dam panorama, offset supporting frames, negative-space text pauses, captions, accessible image controls, and a keyboard-operable lightbox. Facility visuals remain labelled as conceptual visualizations where appropriate.
- **Section 09 — Membership**: Preserved the existing centralized fee and enquiry workflow. UI reads `MEMBERSHIP_CONFIG.feeFormatted` from `src/config/membership.ts` (`PKR 500,000`); the form continues to submit through `/api/membership-enquiry`. No duplicated hard-coded fee strings were introduced.
- **Section 10 — Contact / Book a Visit**: Added verified contact content only: Markhor Club; Near Alexander Road, Khanpur Dam, KPK, Pakistan; approx. 2 KM from Alexander Road; Khanpur Dam View Facing; UAN `0995-111-222-333`; `info@markhourgroup.com`; `www.markhourgroup.com`.
- **Footer & navigation**: Added a quiet editorial footer with verified contact links and real anchors for CLUB, AMENITIES, EXPERIENCES, AQUA PARK, MASTER PLAN, GALLERY, MEMBERSHIP, and CONTACT. Updated desktop and mobile navigation destinations without redesigning the locked Stitch sections.
- **Files changed**: `src/components/home/MasterPlan.tsx`, `src/components/home/LifestyleGallery.tsx`, `src/components/home/Membership.tsx`, `src/components/home/Contact.tsx`, `src/components/layout/Header.tsx`, `src/components/layout/MobileMenu.tsx`, `src/components/layout/Footer.tsx`, `src/components/home/LocationDestination.tsx`, `src/app/page.tsx`, and this record.
- **QA**: `npm run build` PASS. Browser checks PASS at 1440x900, 1024x768, 768x1024, 390x844, and 320x568 viewport overrides: 10 homepage sections rendered, no horizontal overflow, visible local images loaded after hydration, and no browser console errors. Master Plan zone switching, Gallery lightbox open/close, membership validation, and mobile menu open/close were smoke-tested.
- **Localhost**: `http://localhost:3001/` — dev server intentionally left running for handoff.
- **Unresolved / intentional boundaries**: Locked Stitch sections remain unchanged except for destination links. Master Plan imagery is conceptual and not a survey. Legal footer labels remain non-routing placeholders because no verified legal-page content was supplied. External Google Fonts remain the only non-local visual dependency.

### NEXT AUTHORIZED PROMPT

`STITCH-CODEX-03 — AMALI-INSPIRED CINEMATIC MOTION PASS`

(DO NOT START AUTOMATICALLY. STOP AFTER REPORTING STITCH-CODEX-02.)

---

## POLISH-01 — SPACING & IMAGE DIVERSITY CLEANUP

- **Status**: COMPLETE — LOCALHOST RUNNING
- **Date**: September 6, 2026
- **Scope**: Visual-rhythm and approved-local-asset cleanup only. Section order, verified content, business logic, navigation destinations, typography, color system, and cinematic intro behavior were preserved.

### SPACING CLEANUP

- **Sections adjusted**: Brand Story, Location & Destination, Club Experience, Outdoor Adventure, Aqua Experience, Master Plan, Lifestyle Gallery, Membership, Contact, and Footer. The Hero remains a deliberate viewport-led opening.
- **Spacing-system decisions**: Added shared `--section-space` and `--section-space-compact` tokens in `src/app/globals.css`. Standard sections now use fluid padding that resolves to approximately 72px on small screens and 101px at the 1440px reference width. Compact editorial transitions resolve to approximately 56px on small screens and 72px at the reference width.
- **Before/after strategy**: Replaced repeated 144px desktop section padding with fluid shared rhythm; removed the Location container's bottom margin that created an accidental transition band; moved Location, Club, Outdoor, and Aqua into the tighter compact tier; reduced internal header/section gaps; shortened the Brand Story feature image from 650px to 560px at large screens; reduced large Outdoor/Aqua media frames; tightened Gallery image heights, stagger offsets, text pause margins, and final handoff spacing; changed Membership to the medium SectionWrapper tier.
- **Largest gaps removed**: Gallery was reduced from approximately 3,441px to 2,899px at 1440px; Aqua from approximately 3,385px to 2,927px; Outdoor from approximately 3,422px to 3,011px. No section was collapsed into a dense layout.
- **Pinned sections adjusted**: No active ScrollTrigger-pinned homepage section was found. Location's previous animation hook remains disabled for static QA, Lenis smooth scrolling remains intact, and no `pin-spacer`, `pinSpacing`, or artificial long `end` distance was introduced.

### IMAGE CLEANUP

- **Image usage before**: 41 homepage image references across 23 source files/variants, with 12 source URLs repeated.
- **Image usage after**: 41 homepage image references across 37 source files/variants, with only 3 repeated source URLs and 4 duplicate references beyond the first.
- **Images reassigned**: Brand Story now uses the unused `Restaurant 3.png` plate; Master Plan zone previews use unused local `Reception.jpg`, `restaurant 1.jpg`, `sports 3.jpg`, `horse riding 1.jpg`, `Golf Club.png`, `boating 1.jpg`, `restaurant 2.jpg`, and `markhor.jpg`; Gallery uses `Dam View 1.jpg`, `horse riding 2.jpg`, `boating 2.jpg`, and `Swiming Pool.jpg`; Contact uses the distinct `Dam View.jpg`; Aqua's family escape chapter uses `boating.jpg`.
- **Unused approved assets introduced**: `Reception.jpg`, `restaurant 1.jpg`, `restaurant 2.jpg`, `Restaurant 3.png`, `sports 3.jpg`, `horse riding 1.jpg`, `horse riding 2.jpg`, `Golf Club.png`, `boating 1.jpg`, `boating 2.jpg`, `boating.jpg`, `markhor.jpg`, and `Dam View.jpg` were brought into distinct editorial roles.
- **Duplicates still remaining**:
  - `aqua-family-play.png` appears three times within Aqua Experience because the same approved lead visual is used for desktop hero, mobile hero, and the first family-water chapter.
  - `master-plan-diagram.png` appears twice for the desktop/mobile responsive diagram.
  - `Swiming pool 1.jpg` appears in Aqua's pools chapter and the Master Plan Aqua Theme Park preview as an intentional cross-reference between the primary experience and its conceptual zone summary.
- **Image quality**: All replacements use existing local approved assets with `next/image`, responsive `sizes`, contained editorial frames, and `object-cover` crops. No web search, random stock imagery, stretching, or new generated asset was introduced.

### QA

- **Desktop**: PASS at 1440x900 and 1024x768; compact section rhythm, no horizontal overflow, local images loaded after hydration.
- **Tablet**: PASS at 768x1024; no horizontal overflow or clipped content.
- **Mobile**: PASS at 390x844 and 320x568; mobile spacing is visibly tighter, touch targets remain usable, and no horizontal overflow exists.
- **Animations**: PASS — cinematic intro was opened in a fresh tab, skipped, and handed off to the Hero without console errors. Existing lightweight hover/transitions remain intact.
- **Forms**: PASS — membership validation still surfaces `Please enter your full name.` and existing submit/API logic remains unchanged.
- **Interactions**: PASS — Master Plan zone switching, Gallery lightbox open/close, and mobile navigation open/close smoke-tested.
- **Console**: PASS — no critical browser console errors at the final localhost check.
- **Build**: PASS — `npm run build` completed successfully; all 6 routes generated.
- **Exact localhost URL**: `http://localhost:3001/?preview=polish01`

- **Known limitations**: The three intentional duplicate cases above remain because they represent responsive/summary cross-references within the same experience family. Some approved asset filenames contain spelling/case variants inherited from the source library. The supplied local images remain conceptual visualizations where already labelled by the homepage.

(STOP AFTER REPORTING POLISH-01. DO NOT BEGIN ANOTHER REDESIGN OR FEATURE.)

---

## CINEMATIC INTRO PLAYBACK FIX

- **Status**: COMPLETE — LOCALHOST RUNNING
- **Date**: September 6, 2026
- **Issue**: The landing-page movie could appear to skip on repeat visits because the previous `sessionStorage` gate marked the intro as already played. Playback startup also depended on a narrow ready-state/event timing window.
- **Fix**: Removed the session-level skip gate so the cinematic intro runs on every homepage load. Hardened muted inline autoplay by setting the media properties during startup, attempting playback from the earliest usable metadata state, retrying transient `play()` rejections, and retaining the existing seven-second graceful fallback for unavailable media.
- **Behavior preserved**: Cinematic overlay styling, Hero handoff, Skip Intro control, reduced-motion bypass, scroll lock, supplied MP4, poster, and fallback transition remain intact.
- **QA**: Fresh localhost load verified the movie visible and playing at 0.5s (`paused: false`, `readyState: 4`, duration approximately 10s), and still playing at 2.7s (`currentTime approximately 2.6s`). Skip Intro handed off cleanly to the Hero. No browser console errors.
- **Build**: `npm run build` PASS — all 6 routes generated successfully.
- **Exact localhost URL**: `http://localhost:3001/`

(STOP AFTER REPORTING THE CINEMATIC INTRO PLAYBACK FIX.)

---

## USER-ASSET IMAGE REPLACEMENT

- **Status**: COMPLETE — LOCALHOST RUNNING
- **Date**: September 6, 2026
- **Scope**: Integrated the 20 supplied images from `Logo and Movie/Images for Club` into the homepage's matching visual roles.
- **Replacements**: Updated Club Experience with Restaurant 3, Gym, Sports 1, and Gym 1 imagery; Outdoor Adventure with Horse riding 1, Boating, Boating 1, and Zip 2; Brand Story with Markhor Statue, Markhor Lobby, and yatch view; Gallery with horse riding 2 and Boating 1; Master Plan previews with Reception, Restaurant 3, Indoor Sports, Horse 3, Golf Club, Zip 1, Markhor Lobby, and Dam View; Contact with Dam View; Aqua pools with Gym 1.
- **Asset handling**: All 20 supplied files are present under `public/Assets/images` and are referenced through `next/image` with the existing responsive sizing and editorial crops. No external or generated imagery was added.
- **QA**: `npm run build` PASS — all 6 routes generated successfully. Fresh localhost verification confirmed the updated image URLs loaded; the only non-loaded image was an offscreen lazy-loaded brand pin, and its optimizer endpoint returns HTTP 200.
- **Exact localhost URL**: `http://localhost:3001/?preview=polish01`

---

## GCRM-00 — INTEGRATION READINESS COMPLETE

- **Status**: COMPLETE — LOCALHOST RUNNING
- **Completion Date**: September 6, 2026
- **Scope**: Integration audit, provider-neutral CRM contracts, event mapping, server-only environment preparation, local-first sync planning, and localhost verification.
- **Authorized next phase**: `GCRM-01 — GUARANTEEDCRM CONNECTION & CONTACT SYNC`
- **Boundary**: GCRM-01 is not started automatically. No GuaranteedCRM API call, SDK, webhook route, credential, or external delivery was enabled in GCRM-00.

### PROJECT ARCHITECTURE AUDIT

- **Project stack**: Next.js `14.2.35`, React `18.2.0`, TypeScript `5.2.x`, App Router, Tailwind CSS `3.4.1`, npm, Framer Motion, GSAP, Lenis, and `lucide-react`.
- **Routing**: App Router under `src/app`; the public homepage is `src/app/page.tsx`; the only API route is `POST /api/membership-enquiry`.
- **Database**: No database, ORM, migration system, or durable repository exists in the current project. The new `LocalRecordRepository` interface and local CRM metadata shape document the seam that GCRM-01 must bind to the selected Markhor database.
- **Auth**: `/login` is a simulated member-portal form that redirects to `/`; there is no server-side authentication, session, role model, or admin authorization.
- **Admin portal**: No admin portal currently exists. No admin CRM-status UI was added because the prompt limits this phase to preparation and there is no existing admin surface to extend.
- **Existing forms**: The homepage contains the membership enquiry form in `src/components/home/Membership.tsx`. It collects full name, email, mobile number, preferred contact method, membership category, optional message, and consent. No separate general-contact or book-a-visit form/API exists yet.
- **Notifications**: There is no email, WhatsApp, live-chat, or durable admin notification service. The prior optional `CRM_WEBHOOK_URL` delivery branch was removed from the membership route so this phase cannot make an undocumented external request.
- **Deployment assumptions**: Standard Next.js Node/server deployment; no database or queue service is configured. Google Fonts remain the only external visual dependency documented by prior phases.

### CRM ADAPTER ARCHITECTURE

Created `src/lib/crm/` with:

- `types.ts`: provider-neutral `CrmProvider`, contact/lead/workflow contracts, webhook types, CRM external-ID fields, sync statuses, and event types.
- `event-map.ts`: the nine-event CRM contract with source, payload, destination, direction, failure behavior, and idempotency requirement for every event.
- `local-records.ts`: Markhor-owned membership enquiry shape and `LocalRecordRepository` seam. It includes `crm_provider`, `crm_contact_id`, `crm_opportunity_id`, `crm_last_synced_at`, `crm_sync_status`, and `crm_sync_error` without changing local primary IDs.
- `sync.ts`: deterministic membership event envelopes and pending sync-job construction. Retry states are `pending`, `retrying`, `failed`, and `synced`.
- `guaranteedcrm/provider.ts`: non-networking `GuaranteedCrmProvider` skeleton with `upsertContact`, `createOpportunityOrLead`, `updateLeadStage`, `addTag`, `removeTag`, `sendWorkflowEvent`, `recordExternalId`, `getContact`, and `handleWebhook` contracts.
- `provider.ts`: server-only provider factory; importing it does not call the provider.
- `webhooks.ts`: raw-body HMAC verification boundary using `GUARANTEEDCRM_WEBHOOK_SECRET`; no webhook endpoint is enabled yet.

### CRM EVENT MAP

| Event | Source → destination | Failure behavior | Idempotency key |
| --- | --- | --- | --- |
| Membership inquiry submitted | Membership API → CRM contact + lead | Accept locally; queue pending sync; retry independently | Local enquiry id |
| General contact inquiry submitted | Future contact boundary → CRM contact + lead | Keep local inquiry; retry CRM sync | Local inquiry id |
| Book a visit submitted | Future visit boundary → CRM contact + appointment/workflow | Keep local request; retry staff-visible sync | Local visit request id |
| Inquiry converted to member | Markhor conversion workflow → CRM contact/pipeline | Complete local conversion; retry CRM stage update | Conversion event id |
| Membership payment recorded | Markhor payment ledger → CRM context/workflow only | Local payment remains committed; retry notification | Payment id |
| Member balance changed | Markhor financial ledger → CRM custom context only | Local balance is authoritative; CRM may be stale | Ledger event/version |
| Member status changed | Markhor member workflow → CRM tag/pipeline | Local status wins; retry CRM update | Member status version |
| Live chat requested | Future chat boundary ↔ CRM conversation inbox | Retain local conversation reference; retry inbound processing | Provider conversation/event id |
| Admin notification requested | Markhor internal event → notification service/optional workflow | Persist intent and retry delivery | Notification id |

### SOURCE-OF-TRUTH DECISION

- **Markhor database**: members, membership fee snapshots, payments, outstanding balances, income, expenses, financial reports, and the admin audit trail.
- **GuaranteedCRM**: lead/contact CRM, pipeline, communications, WhatsApp workflows, email workflows, conversation inbox, and automation workflows.
- **Financial boundary**: CRM may receive context or workflow events, but it must never become the primary financial ledger.
- **Sync strategy**: save locally first → create deterministic sync job → attempt provider sync in a future worker → store external IDs and sync result → retry safely. Membership POST now constructs this local record/event/job boundary and returns without requiring CRM credentials; durable persistence and a worker remain GCRM-01 work after the database is selected.

### ENVIRONMENT AND SECURITY

- Added `.env.example` with server-only placeholders: `GUARANTEEDCRM_BASE_URL`, `GUARANTEEDCRM_API_KEY`, `GUARANTEEDCRM_LOCATION_ID`, and `GUARANTEEDCRM_WEBHOOK_SECRET`.
- No real secrets were added and no `NEXT_PUBLIC_*` CRM variables were introduced.
- Provider credentials are read only by server-side modules.
- The webhook boundary verifies the raw request body with HMAC and constant-time comparison before future JSON/business processing.
- API keys, access tokens, CNIC/NIC, passwords, and other sensitive values are not logged by the new CRM layer.

### FILES CREATED/CHANGED

- **Created**: `.env.example`, `src/lib/crm/README.md`, `src/lib/crm/types.ts`, `event-map.ts`, `local-records.ts`, `sync.ts`, `provider.ts`, `guaranteedcrm/provider.ts`, `webhooks.ts`, and `index.ts`.
- **Changed**: `src/app/api/membership-enquiry/route.ts` now creates the server-authoritative local record, deterministic CRM event, and pending sync job without making an external request; this `master.md` record was added.
- **Database fields/migrations added**: No database migration was added because no database exists. The required database-neutral CRM fields are defined in `CrmExternalIdFields` and `LocalMembershipEnquiry` for the next phase.

### LOCALHOST QA

- **Command**: `npm run dev`
- **URL**: `http://localhost:3000`
- **Verified**: the existing development server is running; the homepage compiled and returned `GET / 200`; the membership API returned `200` with `crmSyncStatus: pending`; no CRM credentials are required for this phase.
- **Build**: `npm run build` PASS; all 6 routes generated and TypeScript checks passed.
- **Preserved scope**: cinematic intro, public homepage, existing membership form, and existing simulated login page were not redesigned. The membership API remains non-blocking with respect to CRM availability.
- **Not verifiable as implemented features**: no admin portal, general contact API, book-a-visit API, database, auth backend, notification service, WhatsApp integration, or live-chat integration currently exists in the repository.

### INFORMATION STILL REQUIRED FROM GUARANTEEDCRM

- Official API base URL, API version, authentication method, required headers, and rate limits.
- Location/account identifier semantics and the exact contact, opportunity/pipeline, tag, workflow, conversation, and webhook endpoints.
- Accepted field names/types for custom fields, lead stages, tags, and workflow events.
- Webhook signature algorithm/header format, replay window, event catalog, and retry behavior.
- Provider idempotency support and external-ID lookup/update semantics.
- Which CRM fields may receive membership/payment/balance context without making the CRM a financial ledger.

**GCRM-01 — GUARANTEEDCRM CONNECTION & CONTACT SYNC is the next authorized phase. STOP.**

---

## HANDOFF CHECKPOINT — ANTIGRAVITY IDE

- **Date**: September 6, 2026
- **Checkpoint**: GCRM-00 complete; project is ready to be opened in another IDE for the next authorized phase.
- **Root project**: `C:\Users\HP\Downloads\Final Markhor Website`
- **Current localhost**: `http://localhost:3000`
- **Next authorized phase**: `GCRM-01 — GUARANTEEDCRM CONNECTION & CONTACT SYNC`
- **Do not start automatically**: GuaranteedCRM connection, contact sync, payment sync, webhooks, or any external CRM API call.

### SECURITY FILES COMPLETED

- `.gitignore` created with dependency, build, environment, and log exclusions.
- `.env.local` created in the project root with empty values only for `GUARANTEEDCRM_PRIVATE_TOKEN` and `GUARANTEEDCRM_LOCATION_ID`.
- No token value was added, displayed, or committed.

### HANDOFF NOTES

- Open the entire project root in Antigravity IDE; do not open only `src`.
- Preserve the existing App Router homepage, cinematic intro, membership form, CRM adapter skeleton, and `.env.local` privacy rules.
- Read this file completely before beginning GCRM-01.
- Before connecting GuaranteedCRM, confirm its official API base URL, authentication method, location semantics, field mapping, idempotency support, and webhook signature contract.

---

## FULL PLATFORM & CRM TAKEOVER — COMPLETION RECORD

- **Status**: COMPLETE & VERIFIED
- **Date**: September 6, 2026
- **Primary Agent**: Antigravity IDE
- **Git Branch**: `automation/markhor-platform`

### 1. GUARANTEEDCRM CONNECTION & READ-ONLY AUDIT (Phase 1)
- **Status**: VERIFIED & WORKING
- **Location ID**: `XiafrvXc2uTJ0WzOAJFu`
- **Private Token**: Configured securely in `.env.local` (never committed or exposed client-side).
- **Verified Scope Tests**:
  - Contacts API: `SUCCESS` (HTTP 200)
  - Opportunities / Pipelines API: `SUCCESS` (HTTP 200)
  - Conversations API: `SUCCESS` (HTTP 200)
  - Calendars API: `SUCCESS` (HTTP 200)
  - Custom Fields API: `SUCCESS` (HTTP 200)
  - Custom Values API: `SUCCESS` (HTTP 200)

### 2. CRM PIPELINE & TAG SPECIFICATIONS (Phases 2 & 3)
- **Pipeline Name**: `MARKHOR MEMBERSHIP`
- **Stages Configured**:
  1. `01 New Inquiry`
  2. `02 Contacted`
  3. `03 Qualified`
  4. `04 Visit Scheduled`
  5. `05 Application Submitted`
  6. `06 Payment Pending`
  7. `07 Member`
  8. `08 Closed / Lost`
- **Tags Integrated**: `markhor-membership-inquiry`, `markhor-qualified-lead`, `markhor-member`, `markhor-payment-pending`, `markhor-fully-paid`, `markhor-visit-booking`, `markhor-general-contact`.
- **Manual Setup Guide**: Created `docs/GUARANTEEDCRM-MANUAL-SETUP.md` with step-by-step instructions for pipeline creation, WhatsApp Business connection, visit calendar setup, and custom fields.

### 3. DATABASE FOUNDATION (Phase 4)
- **Database Engine**: Relational SQLite via Prisma ORM (`prisma/schema.prisma`).
- **Tables Implemented & Pushed**:
  - `admin_users` (Superadmin `Markhorclub`, hashed password using bcrypt, session JWT)
  - `members` (Member details, auto-generated `MC-2026-XXXX`, fee snapshot, status, masked CNIC)
  - `membership_inquiries` (`INQ-2026-XXXX`, fee snapshot, CRM mapping, status)
  - `membership_payments` (`RCP-2026-XXXX`, fee paid, auto-recalculated outstanding balance)
  - `income_entries` (Commercial non-membership income)
  - `expenses` (Operational expenses)
  - `notification_templates`, `notification_jobs`, `notification_logs` (Multi-channel logging)
  - `faqs` (Grounded FAQ knowledge base)
  - `chat_conversations`, `chat_messages` (FAQ chatbot conversation logs)
  - `crm_sync_jobs` (Background retry queue for CRM jobs)
  - `audit_logs` (Security & admin audit trail)
  - `app_settings` (Global app configuration)
- **Seeding**: Initial superadmin `Markhorclub`, default app settings, verified FAQs, and notification templates seeded cleanly.

### 4. INQUIRY & CONTACT AUTOMATION (Phases 5 & 6)
- **Flow**: Visitor submits form → Server-side validation & rate limiting → Save locally FIRST to SQLite DB → Generate reference → Deduplicate & upsert GuaranteedCRM contact → Create opportunity in `01 New Inquiry` or `04 Visit Scheduled` stage → Apply CRM tag → Dispatch Admin Alert Notifications → Return visitor success.
- **Fail-safe Guarantee**: Local database write precedes CRM sync. CRM network errors set `crmSyncStatus: pending/failed` and queue background retry jobs without losing inquiry data.

### 5. ADMIN NOTIFICATIONS & WHATSAPP (Phases 7, 8 & 9)
- **Resend Email Integration**: Configured in `src/lib/services/notifications.ts` using `RESEND_API_KEY`, `EMAIL_FROM`, `ADMIN_ALERT_EMAIL`.
- **Admin WhatsApp Destination**: `+923305230888` via `ADMIN_ALERT_WHATSAPP_E164`. Status set to `PENDING_EXTERNAL_ACTIVATION` until paid provider activation is enabled in CRM.
- **Public Floating WhatsApp Button**: Built luxury `WhatsAppButton.tsx` (bottom right) using `NEXT_PUBLIC_WHATSAPP_CONTACT_NUMBER` and prefilled text: `"Hello Markhor Club, I would like information about membership."`

### 6. ADMIN AUTHENTICATION & PORTAL (Phases 10–19, 23–25)
- **Admin Username**: `Markhorclub`
- **Security**: Password hashed with bcrypt (`ADMIN_INITIAL_PASSWORD`), 12-hour HTTP-only JWT session cookie (`SameSite=Lax`), rate limiting, noindex header, audit logging.
- **Admin Route**: `/admin/login` and `/admin`. Added discreet `ADMIN PORTAL` navigation link in desktop & mobile header.
- **15 Portal Navigation Modules**:
  1. **Dashboard**: Un-hardcoded KPIs (Total Members, Active Status, Contract Value, Fees Received, Outstanding Balance, Income, Expenses, Net Result).
  2. **Membership Inquiries**: Table, conversion action (`Convert to Member`).
  3. **Members**: CNIC sensitive masking with reveal toggle, detail modal, payment entry.
  4. **Payments Ledger**: Real-time balance recalculation, receipt numbers (`RCP-2026-XXXX`).
  5. **Income Ledger**: Non-membership commercial revenue entry.
  6. **Expense Ledger**: Operating expenses by category and vendor.
  7. **Management Profit & Loss**: Revenue - Expenses = Net Management Result.
  8. **Notifications**: Delivery logs and channel statuses.
  9. **Live Chat**: Visitor conversation logs.
  10. **FAQs**: FAQ management.
  11. **CRM Sync**: Sync status, retry queue, connection audit.
  12. **Reports**: Data summaries.
  13. **Settings**: App config.
  14. **Audit Log**: System security trail.
  15. **Logout**: Cookie invalidation.

### 7. FAQ CHATBOT & LIVE CSR (Phases 20–22)
- **Floating Chatbot Launcher**: Built `FaqChatbot.tsx` (bottom left) with luxury Markhor Concierge styling.
- **Quick Action Pills**: `Membership Fee`, `Location`, `Amenities`, `Aqua Theme Park`, `Book a Visit`, `Speak to Live CSR`.
- **Grounded Fact Enforcement**: Strictly uses verified DB FAQs and master.md facts. Unknown queries trigger fallback: `"I don't have verified information for that yet. Would you like to speak with a Markhor Club representative?"`
- **Live CSR Link**: Direct WhatsApp connection to live CSR.

### 8. QA & LOCALHOST DEMO
- **Dev Server URL**: `http://localhost:3000`
- **Admin Portal URL**: `http://localhost:3000/admin`
- **Admin Login URL**: `http://localhost:3000/admin/login`
- **Manual Setup Guide**: `docs/GUARANTEEDCRM-MANUAL-SETUP.md`

---

## AG-VERIFY-01 — SECURITY / BUILD / CRM VERIFICATION

- **Status**: COMPLETE & VERIFIED
- **Date**: September 6, 2026
- **Git Branch**: `automation/markhor-platform` (Commit `cb61c35`)

### VERIFICATION RESULTS

- **TypeScript Status**: `PASS` — `npx tsc --noEmit` executed with 0 type errors. `tsconfig.json` paths and compiler options verified.
- **Build Status**: `PASS` — Next.js production build (`npm run build`) compiled 100% successfully. All 17 static & dynamic routes generated cleanly.
- **Environment Security**:
  - `.env.local` ignored by Git: `YES`
  - `.env.local` tracked by Git: `NO`
  - `.env.local.txt` removed: `YES` (accidental duplicate safely removed)
- **Database & Prisma Status**: `PASS` — `prisma/schema.prisma` validated via `npx prisma validate` with 0 errors. All 15 relational tables pushed and seeded.
- **Public Website QA**: `PASS` — Cinematic intro, Hero, homepage sections, WhatsApp button, FAQ chatbot, Admin Portal link, and responsive layouts verified.
- **Admin Portal QA**: `PASS` — Server-enforced session protection, `/admin/login`, `/admin` dashboard, inquiries, members, payments, income, expenses, P&L, notifications, FAQs, and CRM sync verified.
- **GuaranteedCRM Read-Only Test Results**:
  - Authentication: `PASSED (Location-level private token)`
  - Location: `FAILED (401 - Token scoped to location, not location management)`
  - Contacts API: `SUCCESS (HTTP 200)`
  - Opportunities / Pipelines API: `SUCCESS (HTTP 200)`
  - Conversations API: `SUCCESS (HTTP 200)`
  - Calendars API: `SUCCESS (HTTP 200)`
  - Custom Fields API: `SUCCESS (HTTP 200)`
- **WhatsApp & Chat Widget**:
  - WhatsApp Button: `ACTIVE` (`NEXT_PUBLIC_WHATSAPP_CONTACT_NUMBER`)
  - WhatsApp Provider Status: `PENDING_EXTERNAL_ACTIVATION`
  - Chat Widget: `ACTIVE` (Grounded FAQ engine + Live CSR WhatsApp link)
- **Git Security**: `PASS` — `git status` clean. Zero secrets staged or tracked.
- **Localhost URL**: `http://localhost:3000`
- **Next Safe Action**: Production deployment or manual GuaranteedCRM pipeline/WABA channel configuration in CRM dashboard.

---

## AG-CONTINUE-02 — GUARANTEEDCRM LIVE INTEGRATION & AUTOMATION COMPLETION

- **Status**: COMPLETE & VERIFIED
- **Date**: September 6, 2026
- **Git Branch**: `automation/markhor-platform`

### LIVE CRM DISCOVERY & PIPELINE MAPPING
- **Location ID**: `XiafrvXc2uTJ0WzOAJFu`
- **Pipeline Discovered**: `MARKHOR MEMBERSHIP` (ID: `lcc4CjRV3ENHhd68kvn0`)
- **All 8 Live Stages Verified**:
  1. `01 New Inquiry`: `5e526237-65fa-4146-8ad7-27c881765c49`
  2. `02 Contacted`: `31df0463-4f9a-4dfa-a2f2-26aff48e6ae6`
  3. `03 Qualified`: `57122bd3-4a31-4611-a206-3ede8d416e9a`
  4. `04 Visit Scheduled`: `51598a44-265d-4d12-bb53-e09fcee7c300`
  5. `05 Application Submitted`: `8d655cf9-3ec6-45de-b821-36500c99e441`
  6. `06 Payment Pending`: `d5788573-aafe-4a38-8314-9d4517cb8415`
  7. `07 Member`: `18977896-1982-49ef-90e9-588785ab6a10`
  8. `08 Closed / Lost`: `0c329835-c134-4fb4-a6b8-aa5de701ae86`

### LIVE CRM TESTS PERFORMED
- **Development Test Record**: Contact `Markhor CRM Integration Test` (`1tyD8kIMAe2t9qsT6Abk`) & Opportunity (`598beOqc20bCEzsEKG5e`) created in `01 New Inquiry` stage.
- **Website Live Inquiry Test**: Submitted inquiry `INQ-2026-3100` (`Markhor Live Website Applicant`) → Stored in local SQLite DB → CRM Contact (`K9LCJkv2powmdfn7VEEq`) & Opportunity (`c4KXquBchMAqnKwTnzXd`) created & mapped → Status `synced` logged in audit table.

### INBOUND WEBHOOK FOUNDATION
- **Endpoint**: `/api/webhooks/guaranteedcrm` with signature validation (`GUARANTEEDCRM_WEBHOOK_SECRET`). Synchronizes opportunity stage updates back to local inquiry status without altering financial ledgers.

### FINANCIAL LEDGER QA VERIFICATION
- **Verified Calculation**: PKR 500,000 fee snapshot - PKR 200,000 payment = PKR 300,000 balance; PKR 300,000 payment = PKR 0 balance. 100% accurate.

### QA & BUILD VERIFICATION
- **TypeScript**: `npx tsc --noEmit` PASS (0 errors)
- **Production Build**: `npm run build` PASS (18/18 static & dynamic routes compiled)
- **Localhost URL**: `http://localhost:3000`

---

## AG-FIX-BOOTSTRAP-01 — NEXT.JS RUNTIME RECOVERY

- **Status**: COMPLETE & VERIFIED
- **Date**: September 6, 2026
- **Git Branch**: `automation/markhor-platform`

### ROOT CAUSE DIAGNOSIS
- **Primary Cause**: Multiple concurrent background `npm run dev` / `next dev` processes (Task IDs `task-228`, `task-378`, `task-439`, `task-637`) were running simultaneously.
- **Race Condition**: The competing Next.js Webpack compiler workers raced over `.next/cache/webpack`, triggering internal Webpack cache pack corruptions (`TypeError: Cannot read properties of undefined (reading 'hasStartTime')`).
- **Runtime Impact**: The corrupted cache resulted in incomplete React Server Component (RSC) streaming script tags and failed chunk manifests, manifesting as the Next.js runtime error: `"Invariant: missing bootstrap script. This is a bug in Next.js"`.

### FIX APPLIED
1. **Process Isolation**: Identified and killed all 4 orphaned/concurrent `node`/Next.js background dev server processes using `manage_task kill` and `Stop-Process`.
2. **Clean Cache Removal**: Completely deleted stale/corrupted Next build directories `.next` and `.next-stale-gcrm00`.
3. **Git Hygiene**: Updated `.gitignore` to ignore `.next-stale*` and `*.tsbuildinfo`, and removed tracked stale cache files from Git tracking.
4. **Layout Integrity Audit**: Confirmed `src/app/layout.tsx` contains valid Next.js App Router structure `<html><body>{children}</body></html>` with proper font & script loading.
5. **Database Validation**: Verified `prisma/schema.prisma` using `npx prisma validate` (100% success).

### VERIFICATION RESULTS
- **Next.js Version**: `14.2.35` (App Router + Webpack) — Unchanged (no major framework upgrades required).
- **Node.js Version**: `v24.18.0`
- **Cache Cleanup**: COMPLETE (`.next` and `.next-stale-gcrm00` removed).
- **Dependencies**: PASS (`package-lock.json` clean and consistent).
- **TypeScript**: PASS (`npx tsc --noEmit` 0 errors).
- **Production Build**: PASS (`npm run build` 18/18 routes compiled successfully).
- **Dev Server**: PASS (`npm run dev` running single clean instance on `http://localhost:3000`).
- **Homepage (`http://localhost:3000/`)**: PASS (Loads normally with zero errors).
- **Membership Section (`http://localhost:3000/#membership`)**: PASS (Loads normally with zero errors, full form functionality intact).
- **Admin Portal (`http://localhost:3000/admin`)**: PASS (Protected routes and login intact).
- **CRM Integration**: PASS (`/api/admin/crm/test-connection` functional).
- **Browser Console**: `CLEAN` — Zero "missing bootstrap script" runtime errors.
- **Localhost URL**: `http://localhost:3000`

---

## AG-INTEGRATIONS-03 — EXTERNAL CRM SERVICES INTEGRATION

- **Status**: COMPLETE & VERIFIED
- **Date**: September 6, 2026
- **Git Branch**: `automation/markhor-platform`

### INTEGRATION & SERVICE DISCOVERY RESULTS
1. **GuaranteedCRM Pipeline Verification**: Verified `MARKHOR MEMBERSHIP` (ID: `lcc4CjRV3ENHhd68kvn0`) with all 8 live stages:
   - `01 New Inquiry` (`5e526237-65fa-4146-8ad7-27c881765c49`)
   - `02 Contacted` (`31df0463-4f9a-4dfa-a2f2-26aff48e6ae6`)
   - `03 Qualified` (`57122bd3-4a31-4611-a206-3ede8d416e9a`)
   - `04 Visit Scheduled` (`51598a44-265d-4d12-bb53-e09fcee7c300`)
   - `05 Application Submitted` (`8d655cf9-3ec6-45de-b821-36500c99e441`)
   - `06 Payment Pending` (`d5788573-aafe-4a38-8314-9d4517cb8415`)
   - `07 Member` (`18977896-1982-49ef-90e9-588785ab6a10`)
   - `08 Closed / Lost` (`0c329835-c134-4fb4-a6b8-aa5de701ae86`)
2. **Markhor Club Visit Booking Calendar**: Created live calendar **Markhor Club Visit Booking** in GuaranteedCRM (`ID: LvM2wUmbJmu7yJ3FQ96g`).
3. **Book a Visit Web Integration**: Connected POST `/api/book-visit` flow to save local `VisitBooking` DB record, upsert CRM contact, move opportunity to stage `04 Visit Scheduled`, create appointment in GuaranteedCRM calendar, and trigger admin email alert.
4. **Admin Visit Management**: Enhanced `/admin/page.tsx` with a dedicated **VIP Site Visit Requests & Calendar Appointments** management view under the Inquiries tab.
5. **Chatbot & Live CSR Handoff**: Grounded FAQ AI Concierge in `FaqChatbot.tsx` with fallback to WhatsApp & offline message logging via POST `/api/chat` (`action: leaveMessage`).
6. **Chatbot + WhatsApp UI Alignment**: Verified opposite positioning (`left-6` for AI Concierge, `right-6` for WhatsApp) with zero visual overlap on 1440px, 390px, and 320px viewports.
7. **Admin Communication Center**: Updated `/admin/page.tsx` Notifications tab to display Email (Active) and WhatsApp (`WhatsApp Business not connected — Requires Manual CRM Activation`).
8. **External Status Dashboard**: Built Integration Status grid in Admin Portal displaying live connection status for GuaranteedCRM Core, Pipeline, WhatsApp, Visit Calendar, Live Chat, and Email.

### UNRESOLVED MANUAL ACTIONS (Documentation updated in `docs/GUARANTEEDCRM-MANUAL-SETUP.md`)
1. **WhatsApp Business Account (WABA) / LC Phone Connection**: Menu Path: **Settings -> Phone Numbers -> WhatsApp**. Requires connecting WABA or registering `+923305230888`.
2. **Live CRM Chat Widget Embed**: Menu Path: **Sites -> Chat Widget**. Obtain widget ID and add `NEXT_PUBLIC_GCRM_CHAT_WIDGET_ID` to `.env.local`.

### QA & BUILD VERIFICATION
- **TypeScript**: `npx tsc --noEmit` PASS (0 errors)
- **Production Build**: `npm run build` PASS (18/18 static & dynamic routes compiled)
- **E2E Integration Tests**: PASS (Membership Inquiry, Book a Visit, Chat FAQ & Offline Message verified)
- **Localhost URL**: `http://localhost:3000`

---

## AG-GCRM-AI-04 — CRM NATIVE CONVERSATION AI ARCHITECTURE

- **Status**: COMPLETE & VERIFIED
- **Date**: September 6, 2026
- **Git Branch**: `automation/markhor-platform`

### CONVERSATION AI & KNOWLEDGE BASE ARCHITECTURE
1. **AI Agent Strategy**: Defined specification for **Markhor Club Concierge** — a digital membership and visitor concierge designed with a premium, professional, warm, concise, and hospitality-led tone.
2. **Grounded Knowledge Base**: Created `src/lib/crm/knowledge-base.ts` containing 10 verified categories (About, Location, Membership, Amenities, Outdoor, Aqua Park, Book a Visit, Contact, Payments, Human Support) and standard FAQs.
3. **Strict Anti-Hallucination Guardrails**: Programmed query engine to return `"I don't have verified information for that yet. I can connect you with a Markhor Club representative."` for unverified questions (discounts, room counts, slide counts, construction dates, investment returns, GPS).
4. **CRM Webchat Embed & Dynamic Loader**: Added dynamic loader in `FaqChatbot.tsx` for GuaranteedCRM Webchat script (`NEXT_PUBLIC_GCRM_CHAT_WIDGET_SRC` & `NEXT_PUBLIC_GCRM_CHAT_WIDGET_ID`).
5. **Resilient Local FAQ & Offline Fallback**: Retained grounded local FAQ Concierge as a resilient fallback. Integrated Live CSR handoff drawer with direct WhatsApp redirection (`wa.me/+923305230888`) and offline message logging (`action: leaveMessage`) saved locally and synced to CRM.
6. **Lead Capture Engine**: Automatic lead capture (`action: leadCapture`) in POST `/api/chat` for membership applicants — creates local DB record and upserts CRM Contact + Opportunity in `01 New Inquiry` stage (`5e526237-65fa-4146-8ad7-27c881765c49`).
7. **Floating UI Positioning**: Verified zero floating button overlap (`left-6` for AI Concierge, `right-6` for WhatsApp) on 1440px, 390px, and 320px viewports.
8. **Admin Portal Status**: Enhanced Admin Portal integration status with badges for Conversation AI (Active), Knowledge Base (Prepared - 10 Categories), CRM Webchat (Manual Setup Req), Live CSR Handoff (Fallback Ready), and WhatsApp (Pending Activation).

### UNRESOLVED MANUAL CRM ACTIONS (Documented in `docs/GUARANTEEDCRM-MANUAL-SETUP.md`)
1. **Conversation AI Agent Bot Setup**: Menu Path: **AI Agents -> Conversation AI -> Create Bot**. Bot Name: `Markhor Club Concierge`. Add the 10 Knowledge Base categories.
2. **CRM Webchat Widget Embed ID**: Menu Path: **Sites -> Chat Widget**. Obtain widget ID and add `NEXT_PUBLIC_GCRM_CHAT_WIDGET_ID` to `.env.local`.

### QA & BUILD VERIFICATION
- **TypeScript**: `npx tsc --noEmit` PASS (0 errors)
- **Production Build**: `npm run build` PASS (18/18 static & dynamic routes compiled)
- **AI QA & Intent Tests**: PASS (FAQ matching, Book a Visit intent, Live CSR intent, anti-hallucination guardrail, and Lead Capture verified)
- **Localhost URL**: `http://localhost:3000`

---

## AG-VOICE-05 — VOCOGEN VOICE CONCIERGE READINESS

- **Status**: COMPLETE & VERIFIED
- **Date**: September 6, 2026
- **Git Branch**: `automation/markhor-platform`

### VOICE ARCHITECTURE & VOCOGEN INTEGRATION
1. **Server-Side Voice Abstraction**: Built `src/lib/voice/` (`types.ts`, `vocogen.ts`, `fallback.ts`, `provider.ts`) isolating all TTS synthesis behind a clean `VoiceProvider` interface.
2. **Integration Mode Selection**:
   - Default Mode: `MODE_C_MANUAL_CACHE` (Pre-generated static audio assets + browser speech synthesis fallback).
   - Automated REST API Mode: `MODE_B_ASYNC_TTS` ready (activates automatically once `VOCOGEN_API_KEY` environment variable is set).
3. **Listen Button UI**: Added explicit **Listen** button on Markhor Concierge chatbot responses in `FaqChatbot.tsx`. Audio synthesizes or plays ONLY when clicked (never auto-plays, protecting voice credits).
4. **Normalized Audio Caching**: Implemented in-memory MD5 text hash caching (`FallbackVoiceProvider.getCacheKey`) and pre-generated static audio asset mapping (`/assets/audio/concierge/`).
5. **Language Strategy**: Added explicit language toggle (`EN` English / `UR` Urdu) in the Concierge modal header.
6. **Microphone Voice Input**: Added dictation microphone button (`Mic`) in `FaqChatbot.tsx` utilizing browser Web Speech recognition.
7. **Credit & Cost Protection Safeguards**:
   - Text prompt capped at max **500 characters** per request.
   - Rate limiting enforced on POST `/api/voice/synthesize` (**10 requests per 10 minutes** per IP).
   - Zero client-side API secrets.
8. **Live CSR Handoff**: Voice interaction seamlessly supports Live CSR handoff trigger with WhatsApp escalation and offline callback logging.

### UNRESOLVED MANUAL ACTIONS (Documented in `docs/VOCOGEN-INTEGRATION.md`)
1. **VocoGen Pre-Generated Audio Assets**: Generate audio for key FAQ responses in VocoGen UI and save to `/public/assets/audio/concierge/`.
2. **VocoGen API Key (Optional for Automated Mode B)**: Generate API key in VocoGen dashboard and add `VOCOGEN_API_KEY="your_api_key"` to `.env.local`.

### QA & BUILD VERIFICATION
- **TypeScript**: `npx tsc --noEmit` PASS (0 errors)
- **Production Build**: `npm run build` PASS (19/19 static & dynamic routes compiled)
- **Voice API QA**: PASS (`POST /api/voice/synthesize` returned `MODE_C_MANUAL_CACHE` with audio asset URL)
- **Localhost URL**: `http://localhost:3000`

---

## AG-VOICE-INTEGRATE-06 — VOCOGEN VOICE CONCIERGE PRODUCTION INTEGRATION

- **Status**: COMPLETE & VERIFIED
- **Date**: September 6, 2026
- **Git Branch**: `automation/markhor-platform`

### VOICE ARCHITECTURE & VOCOGEN INTEGRATION MODE
1. **Selected Mode**: **MODE C — HYBRID** (VocoGen pre-generated audio library + safe browser WebSpeech API system fallback for dynamic responses).
2. **Official API Verification**: NOT CONFIRMED (No official developer API key configured in `.env.local`). Automated REST API client (`VocoGenVoiceProvider` in `src/lib/voice/vocogen.ts`) is ready to auto-upgrade to **MODE A — VOCOGEN OFFICIAL API** as soon as `VOCOGEN_API_KEY` is provided.
3. **Audio Manifest Architecture**: Created `src/lib/voice/concierge-audio.ts` defining 14 mandatory audio assets across English and Urdu (`welcome`, `fee`, `location`, `amenities`, `book_visit`, `human_support`, `csr_offline`).
4. **Enhanced Chatbot Voice UX**:
   - Integrated minimal luxury Audio Player (`Play`, `Pause`, `Replay`) into `FaqChatbot.tsx`.
   - Single active audio playback enforced (playing a response automatically stops any previously active audio).
   - `EN` / `UR` language selector toggle in Concierge header.
   - Microphone dictation input (Web Speech API) with browser compatibility detection.
5. **Request a Callback Workflow**:
   - Added dedicated Callback Request tab collecting Full Name, Phone, Preferred Time (`Morning`, `Afternoon`, `Evening`), and optional notes.
   - Saves callback requests locally and syncs to GuaranteedCRM as a lead / opportunity activity note (`action: 'requestCallback'`).
6. **Admin Voice Diagnostics Panel**:
   - Added Voice Concierge Status Card in Admin Portal (`/admin`) under CRM Sync tab.
   - Displays overall status, VocoGen mode, English/Urdu asset counts, and individual file status tagged `PRESENT` or `AUDIO ASSET REQUIRED`.
7. **Production Documentation & Voice Scripts**:
   - Created `docs/MARKHOR-VOICE-SCRIPTS.md` containing official luxury concierge scripts in English and Urdu.
   - Updated `docs/VOCOGEN-INTEGRATION.md` with step-by-step production audio pre-generation workflow and complete asset manifest checklist.
8. **Security & Credit Protection**:
   - User-triggered playback only (no auto-play on load).
   - Input length capped at 500 characters max per synthesis request.
   - Rate limiting enforced on `POST /api/voice/synthesize` (10 requests per 10 minutes per IP).
   - Zero client-side API secrets.

### QA & BUILD VERIFICATION
- **TypeScript**: `npx tsc --noEmit` PASS (0 errors)
- **Production Build**: `npm run build` PASS (19/19 static & dynamic routes compiled cleanly)
- **Localhost URL**: `http://localhost:3000`

---

## AG-VOICE-ASSETS-07 — ALL 14 VOCOGEN AUDIO ASSETS INTEGRATED

- **Status**: COMPLETE & VERIFIED
- **Date**: September 6, 2026
- **Git Branch**: `automation/markhor-platform`

### AUDIO ASSET INVENTORY & DISCOVERY
1. **Scanned Directory**: `/public/assets/audio/concierge/`
2. **Integration Mode**: **`MODE_B_PREGENERATED`** (100% Pre-generated VocoGen Audio Active across English and Urdu).
3. **Manifest Classification Breakdown**:
   - **FOUND & MAPPED**: **14 / 14 assets** (`welcome-en/ur`, `membership-fee-en/ur`, `location-en/ur`, `amenities-en/ur`, `book-visit-en/ur`, `human-support-en/ur`, `csr-offline-en/ur`).
   - **MISSING ASSETS**: **0 assets** (100% manifest completion).
   - **INVALID / BROKEN ASSETS**: **0 assets**.
4. **Execution & Caching**:
   - Mapped VocoGen MP3 assets are served directly from disk without any remote API call or credit consumption.
   - Dynamic non-manifest queries use safe browser WebSpeech synthesis fallback.
5. **Language Coverage**:
   - **English (EN)**: 7 / 7 VocoGen studio voice assets active (`welcome`, `fee`, `location`, `amenities`, `book_visit`, `human_support`, `csr_offline`).
   - **Urdu (UR)**: 7 / 7 VocoGen studio voice assets active (`welcome`, `fee`, `location`, `amenities`, `book_visit`, `human_support`, `csr_offline`).
6. **Admin Portal Diagnostics**:
   - Updated Admin Portal UI under `CRM Sync` tab displaying 14/14 Mapped Assets (7/7 EN, 7/7 UR) with status badge **MODE_B_PREGENERATED / ACTIVE**.

### QA & BUILD VERIFICATION
- **TypeScript**: `npx tsc --noEmit` PASS (0 errors)
- **Production Build**: `npm run build` PASS (19/19 static & dynamic routes compiled cleanly)
- **Localhost URL**: `http://localhost:3000`

---

## AG-AUDIO-09 — SOFT AMBIENT MUSIC IMPLEMENTED

- **Status**: COMPLETE & VERIFIED
- **Date**: September 6, 2026
- **Git Branch**: `automation/markhor-platform`

### AMBIENT AUDIO ARCHITECTURE & INTEGRATION
1. **Audio Asset**: `/public/assets/audio/background/markhor-ambient.mp3` (7.72 MB verified). Mounted once in `RootLayout` with `preload="metadata"` and `loop`.
2. **Global Component**: Created `src/components/common/BackgroundAmbientAudio.tsx`. Mounted inside `CinematicIntroProvider` in `src/app/layout.tsx`.
3. **Admin Route Exclusion**: Immediately returns `null` on `/admin` and `/admin/*` routes (`pathname?.startsWith('/admin')`).
4. **Subtle Volume Scale & Fade-In**:
   - Default target volume: `0.07` (does not exceed 0.10).
   - Smooth volume ramp from `0` to `0.07` over 2.5 seconds using `requestAnimationFrame`.
5. **Autoplay Unlock Fallback**:
   - Attaches one-time window interaction listeners (`click`, `touchstart`, `keydown`, `scroll`) to unlock audio and fade in smoothly if browser autoplay policy restricts unmuted startup.
6. **Cinematic Intro Synchronization**: Consumes `useCinematicIntro()` to delay ambient music playback until `introComplete === true` (after intro completes or is skipped).
7. **Voice Concierge & Media Ducking**:
   - Listens to custom events `markhor:duck-ambient` (ducks volume from `0.07` to `0.01` when VocoGen or TTS speech begins) and `markhor:restore-ambient` (restores volume smoothly to `0.07` when speech ends).
   - Integrated into `FaqChatbot.tsx` speech start/stop handlers.
8. **Discreet Sound UI & Preference**:
   - Floating luxury Sound Toggle control (`Volume2` / `VolumeX`) with volume tooltip and hover volume slider (range 0.00 to 0.12).
   - Persists user mute preference in `localStorage.setItem('markhorAmbientSound', 'on' | 'off')`.
9. **Tab Visibility**: Pauses playback when `document.visibilityState === 'hidden'`, resumes when visible if sound preference is `'on'`.

### QA & BUILD VERIFICATION
- **TypeScript**: `npx tsc --noEmit` PASS (0 errors)
- **Production Build**: `npm run build` PASS (19/19 static & dynamic routes compiled cleanly)
- **Localhost URL**: `http://localhost:3000`

---

## AG-PROD-10 — PRODUCTION READINESS, STAGING & GO-LIVE

- **Status**: COMPLETE
- **Completion Date**: September 6, 2026

### 1. Key Accomplishments & Hardening
- **Security & Rate Limiting**:
  - Updated `.gitignore` to strictly exclude local database files (`dev.db`, `dev.db-journal`, `backups/`, `*.sqlite`).
  - Implemented IP-based brute-force rate limiting on `/api/admin/login` (max 5 failed attempts per 15 minutes per IP).
- **SEO & Indexing Security**:
  - Created dynamic `src/app/robots.ts` disallowing `/admin/` and `/api/` from search engine crawlers.
  - Created dynamic `src/app/sitemap.ts` exposing only public luxury landing sections (`/`, `/#membership`, `/#experience`, `/#visit`, `/#faq`).
- **Telemetry Adapters**:
  - Created `src/lib/analytics.ts` for privacy-conscious business event tracking with automatic PII redaction.
  - Created `src/lib/monitoring.ts` for production error capture with PII and secret scrubbing.
- **Operational Documentation**:
  - `docs/BACKUP-RESTORE.md`: Documented managed PostgreSQL PITR, `pg_dump` CLI commands, SQLite emergency fallback, and restoration workflows.
  - `docs/DEPLOYMENT.md`: Complete staging and production deployment guide including Node.js requirements, environment variables schema, and GuaranteedCRM webhook setup.
  - `docs/GO-LIVE-CHECKLIST.md`: 20-category verification checklist covering database, security, backup, CRM, communications, search indexing, and mobile readiness.

### 2. Final System Status Summary
- **Public Website**: PASS (Cinematic Intro, Stitch UI, Lenis/GSAP animations, ambient music)
- **Production Build**: PASS (24/24 routes compiled successfully, `npx tsc --noEmit` 0 errors)
- **Database**: DEV (SQLite local) / PRODUCTION READY (PostgreSQL via Prisma `DATABASE_URL`)
- **Admin Security**: PASS (HTTP-only cookies, bcrypt hashing, per-IP login rate limiting)
- **GuaranteedCRM**: PASS (Authentication, Location Access, `MARKHOR MEMBERSHIP` 8 stages verified)
- **Communications**: WhatsApp (ACTIVE floating CTA), Email (PENDING SMTP credentials), Calendar (MANUAL CONFIG)
- **Voice & Music**: VocoGen 15 MP3 pre-rendered audio working, Ambient background music ducking on speech
- **SEO & Indexing**: PASS (`robots.ts` & `sitemap.ts` configured)
- **Localhost URL**: `http://localhost:3000`

---

## AG-ADMIN-FIX-12 — ADMIN PORTAL UI, CSS & LAYOUT RECOVERY

- **Status**: COMPLETE
- **Completion Date**: September 6, 2026

### 1. Root Cause Analysis
- **Root Layout Interference**: Global `src/app/layout.tsx` previously wrapped all routes with public site components (`Header`, `Footer`, `WhatsAppButton`, `FaqChatbot`, `BackgroundAmbientAudio`, `SmoothScrollProvider`, `CinematicIntroProvider`), causing public header/footer to render around `/admin/login` and `/admin` with unstyled HTML links.
- **Tailwind Glob Expansion Issue**: Tailwind content matcher in `tailwind.config.js` did not explicitly include explicit sub-paths for `(public)` and `admin` route directories, resulting in missing utility CSS rules on admin components.

### 2. Layout & Architectural Separation
- **Root Layout (`src/app/layout.tsx`)**: Minimal document root containing `<html>`, `<body>`, font definitions, and `globals.css` import. Zero public navigation/widgets directly in root layout.
- **Public Route Group (`src/app/(public)`)**: Encapsulates `page.tsx` and public pages in `src/app/(public)/layout.tsx` alongside public `Header`, `Footer`, `SmoothScrollProvider`, `CinematicIntroProvider`, `BackgroundAmbientAudio`, `WhatsAppButton`, and `FaqChatbot`.
- **Admin Portal Layout (`src/app/admin/layout.tsx`)**: Dedicated isolated layout for `/admin` and `/admin/login` with dark luxury background (`#071116`), zero public headers/footers, and strict indexing exclusion (`noindex`).

### 3. Admin Login & Dashboard Enhancements
- **Admin Login (`src/app/admin/login/page.tsx`)**:
  - Full viewport centered luxury card (`#0B1C26` with `#C7A15A` gold hairline border).
  - Show/hide password eye toggle button.
  - Styled inputs with icons and high-contrast typography.
  - Rate-limit error banner & generic "Invalid credentials." feedback.
  - Security footer: "Authorized Personnel Only • Server Enforced Session".
- **Admin Dashboard (`src/app/admin/page.tsx`)**:
  - Added responsive mobile drawer navigation (`Menu` / `X` toggle).
  - Added dedicated `Payment Submissions` tab with TID audit, proof modal triggers, and action buttons (`Proof`, `Verify`, `Needs Info`).
  - Wrapped all data tables in responsive horizontal scroll containers (`overflow-x-auto`).

### 4. QA Verification
- **TypeScript**: `npx tsc --noEmit` PASS (0 errors)
- **Production Build**: `npm run build` PASS (21/21 static & dynamic routes compiled cleanly)
- **Localhost Visual QA**:
  - `/admin/login`: Fully styled luxury dark UI without public header/footer/blue links.
  - `/admin`: Fully styled admin sidebar, topbar, KPI cards, and data tables.
  - `/`: Public website cinematic intro, Stitch UI, header, and footer preserved with 0 regressions.
- **Localhost URL**: `http://localhost:3000`

---

## AG-PRELAUNCH-11 — PRE-LAUNCH BUSINESS AUTOMATION, PAYMENT VERIFICATION & MEMBERSHIP ACTIVATION SYSTEM

- **Status**: COMPLETE & VERIFIED
- **Completion Date**: September 6, 2026

### 1. Key Accomplishments
- **Communication & Notification Audit**:
  - Web Chat Inbound & Admin Alerts: VERIFIED (FAQ Chatbot & Live CSR handoff create CRM Conversations & notify admins).
  - WhatsApp Inbound & Admin Alerts: PENDING ACTIVATION (Requires manual WABA / LC Phone provider setup in GuaranteedCRM dashboard).
  - Email Alerts: VERIFIED (SMTP transactional alerts for inquiries and verified payments).
  - Created Notification Diagnostic Harness API (`/api/admin/test-notifications`) and Admin Integration Status Matrix (`/admin` -> Integration & Alerts Status tab).
- **Public Membership Payment Submission (`/membership/payment`)**:
  - Created luxury public submission form collecting Full Name, Phone, Email, Membership No, Inquiry Ref, Amount (PKR), Method, Bank/Provider, Payment Date, Transaction ID (TID), Payment Slip Upload (PDF/JPG/PNG max 5MB), and Consent Checkbox.
  - API endpoint `/api/membership/payment-submission`: Saves evidence securely to private directory `private_uploads/proofs/` with randomized keys. Normalizes TID and enforces duplicate TID protection. Sets initial status to `PENDING_VERIFICATION`.
- **Private Evidence Storage Security**:
  - Created authenticated streaming endpoint `/api/admin/payment-proof/[key]` enforcing admin session token check and path traversal defense (`path.basename`).
- **Payment Verification Architecture & Provider Abstraction**:
  - Implemented provider pattern in `src/lib/payments/` (`provider.ts`, `manual-transfer.ts`, `safepay.ts`, `jazzcash.ts`, `easypaisa.ts`).
  - Baseline Manual Verification Mode: Admin verifies via `/api/admin/payment-submissions` -> atomic creation of `MembershipPayment` ledger entry (`RCP-2026-XXXX`), recalculation of balance, audit log record, and confirmation message dispatch.
- **Membership Activation & Digital Membership Card**:
  - Business rule: Membership becomes eligible for activation when verified paid amount meets snapshot fee requirement (`totalPaid >= feeSnapshot`).
  - Auto-generates unique Membership Number (`MC-2026-0001`) and digital card token.
  - Created Digital Membership Card page (`/membership/card/[id]`) and public QR verification page (`/verify-member/[token]`) exposing only Member Name, Membership Number, and Status (no CNIC or financial balances).
- **Staging QA Suite**:
  - Executed automated staging test suite verifying Inquiry -> Proof Submission -> Duplicate TID Protection -> Admin Verification -> Ledger Entry -> Card Generation -> QR Retrieval (100% PASS).

### 2. Final System Status Summary
- **WHATSAPP INBOUND**: PENDING ACTIVATION
- **WHATSAPP ADMIN ALERT**: NOT VERIFIED (Manual CRM Activation Required)
- **CHAT INBOUND**: VERIFIED
- **CHAT ADMIN ALERT**: VERIFIED
- **PAYMENT SUBMISSION FORM**: PASS
- **PRIVATE SLIP STORAGE**: PASS
- **TID DUPLICATE CHECK**: PASS
- **MANUAL PAYMENT VERIFICATION**: PASS
- **AUTOMATIC PAYMENT GATEWAY**: MERCHANT SETUP REQUIRED (Safepay, JazzCash, EasyPaisa Abstraction Ready)
- **PAYMENT CONFIRMATION**: PASS
- **MEMBERSHIP ACTIVATION**: PASS
- **MEMBERSHIP NUMBER**: PASS (`MC-2026-0001` Format)
- **DIGITAL CARD**: PASS (`/membership/card/[id]`)
- **QR VERIFICATION**: PASS (`/verify-member/[token]`)
- **CRM PAYMENT SYNC**: PASS
- **FINANCIAL LEDGER**: PASS
- **BUILD**: PASS (25/25 routes compiled cleanly)
- **STAGING READINESS**: READY
- **PRODUCTION DEPLOYMENT**: NOT AUTHORIZED (Awaiting explicit user authorization)
- **LOCALHOST URL**: `http://localhost:3000`

---

## AG-ADMIN-SETTINGS-13 COMPLETION RECORD & LOCK

- **Status**: COMPLETE & LOCKED
- **Completion Date**: September 6, 2026

### 1. Key Accomplishments
- **Schema & Database Upgrade**:
  - Expanded `AdminUser` model with `phone`, `permissions` (JSON array for granular permissions), `requiresPasswordChange`, `profileImageUrl`, and `AdminSession` relation.
  - Added `PaymentAccount` model (provider, account title, number, IBAN, branch, verification mode, public display flag).
  - Executed `prisma db push` cleanly.
- **RBAC Infrastructure (`src/lib/permissions.ts` & `src/lib/rbac.ts`)**:
  - Defined 6 role levels: `SUPER_ADMIN`, `ADMIN`, `FINANCE_MANAGER`, `MEMBERSHIP_MANAGER`, `CSR_AGENT`, `VIEW_ONLY`.
  - Implemented 13 granular permission definitions and server-side verification helper `requirePermission()`.
  - Enforced server-side RBAC protection on all admin settings API routes.
- **Settings Module API Routes**:
  - `GET/PUT /api/admin/settings/club` — Club Profile (Name, Email, Phone, Address, Currency, Default Fee).
  - `POST /api/admin/settings/password` — Self-service password change with strong password validation (min 8 chars, uppercase, lowercase, number, special char) and audit logging.
  - `GET/POST /api/admin/settings/users` — Admin User list and user creation with temporary password generation.
  - `GET/PUT /api/admin/settings/users/[id]` — Single user detail update with last active `SUPER_ADMIN` protection (prevents accidental demotion/disabling).
  - `POST /api/admin/settings/users/[id]/password` — Super Admin password reset for managed accounts.
  - `GET/POST/PUT/DELETE /api/admin/settings/payment-accounts` — Payment account CRUD with account number masking in list view and soft-deactivation.
  - `GET/PUT /api/admin/settings/branding` — Branding configuration management.
  - `GET/PUT /api/admin/profile` — Self-profile update without self-role escalation.
- **Admin Settings Frontend Hub & Sub-pages**:
  - `/admin/settings` — 8-section administrative control center grid.
  - `/admin/settings/club` — Club Profile configuration form.
  - `/admin/settings/branding` — Branding asset viewer and configuration.
  - `/admin/settings/account` — Profile & Change Password tabbed manager.
  - `/admin/settings/users` — User management table, role badge indicators, temporary password modal, and RBAC matrix reference.
  - `/admin/settings/users/[id]` — Detailed user editor with granular permission check-boxes.
  - `/admin/settings/payment-accounts` — Payment Account manager with revealable account numbers and modal forms.
  - `/admin/settings/security` — Active session security audit viewer and sign-out controls.

---

## AG-PAYMENT-VERIFY-14B COMPLETION RECORD & LOCK

- **Status**: COMPLETE & LOCKED
- **Completion Date**: September 6, 2026

### 1. Preflight QA & Payment Account Configuration
- **Admin Settings Preflight**: Verified all 8 settings routes (`/admin/settings`, `/admin/settings/club`, `/admin/settings/branding`, `/admin/settings/account`, `/admin/settings/users`, `/admin/settings/payment-accounts`, `/admin/settings/security`) — 100% PASS.
- **Configured Payment Destinations**:
  - **Easypaisa**: Mobile Wallet `00923125116164` (Active, Public)
  - **UBL**: Account `0511247411492` (Active, Public)
- **Public Payment Page (`/membership/payment`)**: Dynamically connects to active and public `PaymentAccount` records.

### 2. Proof Storage & Duplicate Protection
- **Private Evidence Storage**: Uploaded slip attachments (PDF, JPG, PNG max 5MB) saved to `private_uploads/proofs/` with SHA-256 randomized storage keys. Streamed securely via `/api/admin/payment-proof/[key]`.
- **TID Normalization & Duplicate Protection**: Strips non-alphanumeric characters, upper-cases references, checks existing provider + destination account + TID combinations, and flags duplicates with `DUPLICATE` status.

### 3. Provider Abstraction & Statement Reconciliation
- **Provider Architecture (`src/lib/payments/providers/`)**: `provider.ts`, `manual.ts`, `easypaisa.ts`, `ubl.ts`, `safepay.ts`, `jazzcash.ts`.
- **API Status**:
  - **Easypaisa API**: NOT CONFIGURED (Manual & Statement Reconciliation modes active)
  - **UBL API**: NOT CONFIGURED (Manual & Statement Reconciliation modes active)
- **Statement Import & Candidate Matching (`/admin/payment-reconciliation`)**:
  - CSV Statement Import (`/api/admin/payment-reconciliation/import`) with raw row SHA-256 hashing to prevent duplicate statement rows.
  - Match Engine Matrix:
    - `EXACT_MATCH`: Same normalized TID + same amount
    - `POSSIBLE_MATCH`: Same amount, different TID
    - `CONFLICT`: Same TID, different amount (amount mismatch)
    - `NO_MATCH`: Unmatched claim

### 4. Atomic Financial Ledger & Post-Verification Workflow
- **Atomic Transaction (`prisma.$transaction`)**:
  1. Updates `PaymentSubmission` status to `VERIFIED`
  2. Creates official `MembershipPayment` ledger entry (`RCP-2026-XXXX`)
  3. Recalculates total paid & outstanding balance
  4. Upgrades member status to `active` and digital card status to `issued` when fee snapshot (PKR 500,000) is satisfied
  5. Records `AuditLog` entry
  6. Dispatches payment confirmation email and queues CRM sync.

### 5. Verified Automated Test Suite (Scenarios A, B, C)
- **Scenario A (Exact Match & Verification)**: PASS (`EXACT_MATCH` -> Receipt `RCP-2026-0002` created -> Status = `active`)
- **Scenario B (Amount Conflict)**: PASS (`CONFLICT` detected -> Auto-verification blocked)
- **Scenario C (Duplicate TID Protection)**: PASS (`DUPLICATE` detected -> Double ledger posting blocked)

---

## AG-INTRO-FIX-16 — INTRO → LANDING TRANSITION RECOVERY

- **Status**: COMPLETE
- **Date**: September 7, 2026
- **Localhost URL**: `http://localhost:3000`

### 1. Root Cause Analysis
1. **Body Scroll Lockout Trap**: `lockScroll()` set `document.body.style.overflow = 'hidden'`, but missing synchronous unmounting/unlocking or state machine sync left scroll permanently hidden if GSAP callbacks were skipped.
2. **Overlay Mounting Trap**: Fixed overlay at `z-[2000]` stayed mounted in DOM without `pointer-events: none`, blocking visitor clicks from reaching the landing page underneath.
3. **Autoplay Promise Rejections**: Unmuted video autoplay without user interaction failed silently in modern browsers without catching `.play()` rejection, leaving video paused at frame 0.
4. **Hydration Mismatch**: Inconsistent access to `sessionStorage` during server-side vs client-side render caused hydration state mismatches.

### 2. Corrected Intro Lifecycle & State Machine
- **Explicit 4-State Lifecycle**: `loading` -> `playing` -> `exiting` -> `complete`.
- **Overlay Release & Scroll Unlock**: `unlockScroll()` is called immediately upon entering `exiting` state. `pointer-events: none` is applied immediately to overlay.
- **GSAP Fade & Unmount**: Smooth 800ms GSAP opacity fade from 1 to 0. Overlay unmounts completely from DOM when status reaches `complete`.

### 3. Fail-Safe & Autoplay Fallback Mechanism
- **Autoplay Error Catching**: Catches `video.play()` promise rejections and retries muted automatically. If muted autoplay fails, falls through gracefully to landing page.
- **Fail-Safe Timeout**: Max 7.5s safety timer guarantees landing page ALWAYS loads, even on broken media stream or stalled network.
- **Media Event Listeners**: `onEnded`, `onError`, `onStalled` all invoke deterministic exit sequence.

### 4. Session Behavior & Floating UI Coordination
- **Session Storage (`markhor_intro_seen`)**: Intro plays once per browser session. Refreshing or internal page navigation checks `sessionStorage` client-side and skips intro cleanly.
- **Floating UI Coordination**: WhatsApp VIP Concierge button and Ask Markhor Chatbot stay hidden until `introComplete === true`, preventing z-index leaks.
- **Ambient Music Hand-off**: Background ambient audio starts smoothly post-intro after intro video audio is stopped.

### 5. Verification & Build
- **Browser QA**: Verified intro play, skip, exit fade, unmount, scroll unlock, Hero reveal, ambient music, floating controls, and `#membership` anchor navigation.
- **Production Build**: `npm run build` compiled successfully (42/42 static/dynamic pages).

---

## AG-INQUIRY-BRANDING-FIX-17 — INQUIRY VISIBILITY, SOFT DELETE & LIVE BRANDING UPLOAD

- **Status**: COMPLETE
- **Date**: September 7, 2026
- **Localhost URL**: `http://localhost:3000`

### 1. Root Cause Analysis — Qaiser Rana Inquiry
- **Data Pipeline Disconnect**: Qaiser Rana submitted an inquiry via the Markhor VIP Concierge Chatbot (`action: 'leaveMessage'`). The API route (`/api/chat`) created a `ChatConversation` record with status `transferred_to_csr`, but previously did NOT save to the `MembershipInquiry` table.
- **Admin Query Path**: The Admin Portal queries `MembershipInquiry`. Because the chatbot handler didn't write to `MembershipInquiry`, the record was present in local SQLite `dev.db` under `chat_conversations`, but absent from `membership_inquiries`.
- **Reconciliation & Prevention**: Executed explicit, audited database reconciliation script (`INQ-2026-QAISER`), converting the local `ChatConversation` into an active `MembershipInquiry`. Updated `/api/chat` so future chatbot inquiries create both `ChatConversation` and `MembershipInquiry` records automatically.

### 2. Inquiry Data Model & Soft-Delete Architecture
- **Prisma Schema Update**: Added `deletedAt DateTime?` and `deletedBy String?` to `MembershipInquiry`.
- **Single DB Source & Fresh Queries**: Ensured Admin Inquiry routes (`/api/admin/inquiries`) query `dev.db` dynamically with `export const dynamic = 'force-dynamic'`.
- **Soft-Delete with Confirmation**: Admin UI provides a "Delete" action with confirmation modal ("Delete this inquiry? It will be moved to archived inquiries."). Deleting sets `deletedAt` and `deletedBy` without hard-deleting database rows.
- **Trash & Restore View**: Added "Archived Trash" view tab to inspect deleted inquiries and allow authorized admins to "Restore" inquiries back to active view.
- **Search & Filtering**: Added live search across Reference Number, Applicant Name, Phone, and Email, as well as status filtering.
- **Audit Logging**: Recorded audit entries for `INQUIRY_CREATED`, `INQUIRY_UPDATED`, `INQUIRY_DELETED`, and `INQUIRY_RESTORED`.

### 3. Live Branding Logo Upload & Storage Architecture
- **Logo Upload API (`/api/admin/settings/branding/upload`)**:
  - Requires `settings.manage` RBAC permission.
  - Enforces server-side validation: MIME types (PNG, JPG, JPEG, WEBP), file size <= 2MB, random storage keys. SVG upload disabled for security.
  - Stores files in persistent storage (`public/uploads/branding/`) and updates database setting keys (`brand_logo_url`, `brand_emblem_url`, `brand_login_logo_url`).
  - Storage architecture abstraction tagged as `LOCAL_PERSISTENT_STORAGE` (ready for production S3/Blob providers).
- **Restore Default API (`/api/admin/settings/branding/restore-default`)**: Restores branding setting back to bundled official Markhor logo asset.
- **Branding UI & Dynamic Rendering**: Replaced "Logo Upload — Coming Soon" with interactive upload cards, live image previews, upload buttons, and restore default actions. Admin Portal sidebar header and `/admin/login` page dynamically render the updated logo from database settings.

### 4. End-to-End Verification
- **Automated Inquiry Lifecycle Test**: Verified creation, active listing, soft deletion, removal from active view, appearance in archived trash, and restoration (`test-inquiry-lifecycle.js` passed).
- **Production Build**: `npm run build` compiled 44/44 static/dynamic routes cleanly.

