import fs from 'fs'
import path from 'path'
import { VoiceLanguage } from './types'

export interface AudioAssetItem {
  id: string
  key: string
  filename: string
  language: VoiceLanguage
  label: string
  description: string
  scriptEn: string
  scriptUr: string
  path: string
  status: 'FOUND' | 'AUDIO_ASSET_REQUIRED' | 'INVALID_AUDIO_ASSET'
  sizeBytes?: number
}

export interface UnrecognizedFileItem {
  filename: string
  sizeBytes: number
  path: string
}

export const CONCIERGE_AUDIO_MANIFEST: Omit<AudioAssetItem, 'status' | 'sizeBytes'>[] = [
  {
    id: 'welcome_en',
    key: 'welcome',
    filename: 'welcome-en.mp3',
    language: 'en',
    label: 'Welcome Greeting (EN)',
    description: 'Initial greeting when launching Markhor Concierge',
    scriptEn: 'Welcome to Markhor Club Concierge. How may I assist you today?',
    scriptUr: 'مارخور کلب کونسئیرج میں خوش آمدید۔ آج میں آپ کی کیا مدد کر سکتا ہوں؟',
    path: '/assets/audio/concierge/welcome-en.mp3',
  },
  {
    id: 'welcome_ur',
    key: 'welcome',
    filename: 'welcome-ur.mp3',
    language: 'ur',
    label: 'Welcome Greeting (UR)',
    description: 'Urdu initial greeting when launching Markhor Concierge',
    scriptEn: 'Welcome to Markhor Club Concierge. How may I assist you today?',
    scriptUr: 'مارخور کلب کونسئیرج میں خوش آمدید۔ آج میں آپ کی کیا مدد کر سکتا ہوں؟',
    path: '/assets/audio/concierge/welcome-ur.mp3',
  },
  {
    id: 'membership_fee_en',
    key: 'fee',
    filename: 'membership-fee-en.mp3',
    language: 'en',
    label: 'Membership Fee (EN)',
    description: 'Pre-launch membership fee overview',
    scriptEn: 'The current pre-launch membership fee for Markhor Club is PKR 500,000. This is a limited pre-launch fee subject to revision.',
    scriptUr: 'مارخور کلب کی موجودہ پری لانچ ممبرشپ فیس 500,000 روپے ہے۔ یہ ایک محدود وقت کی فیس ہے جو بعد میں تبدیل ہو سکتی ہے۔',
    path: '/assets/audio/concierge/membership-fee-en.mp3',
  },
  {
    id: 'membership_fee_ur',
    key: 'fee',
    filename: 'membership-fee-ur.mp3',
    language: 'ur',
    label: 'Membership Fee (UR)',
    description: 'Urdu pre-launch membership fee overview',
    scriptEn: 'The current pre-launch membership fee for Markhor Club is PKR 500,000. This is a limited pre-launch fee subject to revision.',
    scriptUr: 'مارخور کلب کی موجودہ پری لانچ ممبرشپ فیس 500,000 روپے ہے۔ یہ ایک محدود وقت کی فیس ہے جو بعد میں تبدیل ہو سکتی ہے۔',
    path: '/assets/audio/concierge/membership-fee-ur.mp3',
  },
  {
    id: 'location_en',
    key: 'location',
    filename: 'location-en.mp3',
    language: 'en',
    label: 'Location & Destination (EN)',
    description: 'Khanpur Dam location details',
    scriptEn: 'Markhor Club is located near Khanpur Dam, KPK, approximately 2 kilometers from Alexander Road with a direct view of Khanpur Dam.',
    scriptUr: 'مارخور کلب خانپور ڈیم، خیبر پختونخوا کے قریب، الیگزینڈر روڈ سے تقریباً 2 کلومیٹر کے فاصلے پر خانپور ڈیم کے خوبصورت منظر کے ساتھ واقع ہے۔',
    path: '/assets/audio/concierge/location-en.mp3',
  },
  {
    id: 'location_ur',
    key: 'location',
    filename: 'location-ur.mp3',
    language: 'ur',
    label: 'Location & Destination (UR)',
    description: 'Urdu Khanpur Dam location details',
    scriptEn: 'Markhor Club is located near Khanpur Dam, KPK, approximately 2 kilometers from Alexander Road with a direct view of Khanpur Dam.',
    scriptUr: 'مارخور کلب خانپور ڈیم، خیبر پختونخوا کے قریب، الیگزینڈر روڈ سے تقریباً 2 کلومیٹر کے فاصلے پر خانپور ڈیم کے خوبصورت منظر کے ساتھ واقع ہے۔',
    path: '/assets/audio/concierge/location-ur.mp3',
  },
  {
    id: 'amenities_en',
    key: 'amenities',
    filename: 'amenities-en.mp3',
    language: 'en',
    label: 'Club Amenities (EN)',
    description: 'Overview of 5 signature amenities',
    scriptEn: 'Markhor Club features fine dining restaurants, a state-of-the-art gym, indoor sports arena, hydrotherapy jacuzzi, and a shoreline swimming pool.',
    scriptUr: 'مارخور کلب میں بہترین ریسٹورنٹس، جدید ترین جمنیزیم، انڈور اسپورٹس، ہائیڈرو تھراپی جیکوزی اور خوبصورت سوئمنگ پول شامل ہیں۔',
    path: '/assets/audio/concierge/amenities-en.mp3',
  },
  {
    id: 'amenities_ur',
    key: 'amenities',
    filename: 'amenities-ur.mp3',
    language: 'ur',
    label: 'Club Amenities (UR)',
    description: 'Urdu overview of 5 signature amenities',
    scriptEn: 'Markhor Club features fine dining restaurants, a state-of-the-art gym, indoor sports arena, hydrotherapy jacuzzi, and a shoreline swimming pool.',
    scriptUr: 'مارخور کلب میں بہترین ریسٹورنٹس، جدید ترین جمنیزیم، انڈور اسپورٹس، ہائیڈرو تھراپی جیکوزی اور خوبصورت سوئمنگ پول شامل ہیں۔',
    path: '/assets/audio/concierge/amenities-ur.mp3',
  },
  {
    id: 'book_visit_en',
    key: 'book_visit',
    filename: 'book-visit-en.mp3',
    language: 'en',
    label: 'Book a Visit (EN)',
    description: 'VIP site visit scheduling response',
    scriptEn: 'We would be delighted to host you for a VIP site visit at Khanpur Dam. You can schedule your visit directly through our calendar or contact concierge.',
    scriptUr: 'ہمیں خانپور ڈیم میں آپ کا VIP وزٹ کرنے پر بے حد خوشی ہوگی۔ آپ ویب سائٹ یا ہمارے نمائندے کے ذریعے اپنا وزٹ شیڈول کر سکتے ہیں۔',
    path: '/assets/audio/concierge/book-visit-en.mp3',
  },
  {
    id: 'book_visit_ur',
    key: 'book_visit',
    filename: 'book-visit-ur.mp3',
    language: 'ur',
    label: 'Book a Visit (UR)',
    description: 'Urdu VIP site visit scheduling response',
    scriptEn: 'We would be delighted to host you for a VIP site visit at Khanpur Dam. You can schedule your visit directly through our calendar or contact concierge.',
    scriptUr: 'ہمیں خانپور ڈیم میں آپ کا VIP وزٹ کرنے پر بے حد خوشی ہوگی۔ آپ ویب سائٹ یا ہمارے نمائندے کے ذریعے اپنا وزٹ شیڈول کر سکتے ہیں۔',
    path: '/assets/audio/concierge/book-visit-ur.mp3',
  },
  {
    id: 'human_support_en',
    key: 'human_support',
    filename: 'human-support-en.mp3',
    language: 'en',
    label: 'Human Support / Live CSR (EN)',
    description: 'Escalation to live representative',
    scriptEn: 'Connecting you with a Markhor Club representative. You can connect via WhatsApp or request an immediate callback.',
    scriptUr: 'آپ کو مارخور کلب کے نمائندے سے منسلک کیا جا رہا ہے۔ آپ واٹس ایپ کے ذریعے یا کال بیک کی درخواست کر کے بات کر سکتے ہیں۔',
    path: '/assets/audio/concierge/human-support-en.mp3',
  },
  {
    id: 'human_support_ur',
    key: 'human_support',
    filename: 'human-support-ur.mp3',
    language: 'ur',
    label: 'Human Support / Live CSR (UR)',
    description: 'Urdu escalation to live representative',
    scriptEn: 'Connecting you with a Markhor Club representative. You can connect via WhatsApp or request an immediate callback.',
    scriptUr: 'آپ کو مارخور کلب کے نمائندے سے منسلک کیا جا رہا ہے۔ آپ واٹس ایپ کے ذریعے یا کال بیک کی درخواست کر کے بات کر سکتے ہیں۔',
    path: '/assets/audio/concierge/human-support-ur.mp3',
  },
  {
    id: 'csr_offline_en',
    key: 'csr_offline',
    filename: 'csr-offline-en.mp3',
    language: 'en',
    label: 'CSR Offline / Callback (EN)',
    description: 'Offline representative notification',
    scriptEn: 'Our live representatives are currently assisting other guests. Please leave a message or request a callback and we will contact you shortly.',
    scriptUr: 'ہمارے نمائندے اس وقت دیگر مہمانوں کی رہنمائی کر رہے ہیں۔ براہ کرم اپنا پیغام چھوڑیں یا کال بیک کی درخواست کریں۔',
    path: '/assets/audio/concierge/csr-offline-en.mp3',
  },
  {
    id: 'csr_offline_ur',
    key: 'csr_offline',
    filename: 'csr-offline-ur.mp3',
    language: 'ur',
    label: 'CSR Offline / Callback (UR)',
    description: 'Urdu offline representative notification',
    scriptEn: 'Our live representatives are currently assisting other guests. Please leave a message or request a callback and we will contact you shortly.',
    scriptUr: 'ہمارے نمائندے اس وقت دیگر مہمانوں کی رہنمائی کر رہے ہیں۔ براہ کرم اپنا پیغام چھوڑیں یا کال بیک کی درخواست کریں۔',
    path: '/assets/audio/concierge/csr-offline-ur.mp3',
  },
]

export interface ManifestDiagnostics {
  totalAssets: number
  foundCount: number
  missingCount: number
  unrecognizedCount: number
  brokenCount: number
  enCount: number
  urCount: number
  assets: AudioAssetItem[]
  unrecognizedFiles: UnrecognizedFileItem[]
  mode: 'MODE_A_API' | 'MODE_B_PREGENERATED' | 'MODE_C_HYBRID'
}

export function getAudioManifestDiagnostics(): ManifestDiagnostics {
  const publicDir = path.join(process.cwd(), 'public')
  const conciergeDir = path.join(publicDir, 'assets', 'audio', 'concierge')

  // 1. Readdir directory scan
  let diskFiles: string[] = []
  try {
    if (fs.existsSync(conciergeDir)) {
      diskFiles = fs.readdirSync(conciergeDir).filter((f) => !f.startsWith('.'))
    }
  } catch {
    diskFiles = []
  }

  const manifestFilenames = new Set(CONCIERGE_AUDIO_MANIFEST.map((m) => m.filename))

  // 2. Classify manifest items
  const assets: AudioAssetItem[] = CONCIERGE_AUDIO_MANIFEST.map((item) => {
    const fullPath = path.join(publicDir, item.path)
    let isPresent = fs.existsSync(fullPath)
    let sizeBytes: number | undefined = undefined
    let status: AudioAssetItem['status'] = 'AUDIO_ASSET_REQUIRED'

    if (isPresent) {
      try {
        const stat = fs.statSync(fullPath)
        sizeBytes = stat.size
        if (sizeBytes > 100) {
          status = 'FOUND'
        } else {
          status = 'INVALID_AUDIO_ASSET'
        }
      } catch {
        status = 'INVALID_AUDIO_ASSET'
      }
    }

    return {
      ...item,
      status,
      sizeBytes,
    }
  })

  // 3. Classify unrecognized files (files in dir that are not in manifest)
  const unrecognizedFiles: UnrecognizedFileItem[] = []
  diskFiles.forEach((file) => {
    if (!manifestFilenames.has(file) && file.endsWith('.mp3')) {
      const fullPath = path.join(conciergeDir, file)
      let sizeBytes = 0
      try {
        sizeBytes = fs.statSync(fullPath).size
      } catch {}

      unrecognizedFiles.push({
        filename: file,
        sizeBytes,
        path: `/assets/audio/concierge/${file}`,
      })
    }
  })

  const totalAssets = assets.length
  const foundCount = assets.filter((a) => a.status === 'FOUND').length
  const missingCount = totalAssets - foundCount
  const brokenCount = assets.filter((a) => a.status === 'INVALID_AUDIO_ASSET').length
  const enCount = assets.filter((a) => a.language === 'en' && a.status === 'FOUND').length
  const urCount = assets.filter((a) => a.language === 'ur' && a.status === 'FOUND').length
  const unrecognizedCount = unrecognizedFiles.length

  const hasApiKey = Boolean(process.env.VOCOGEN_API_KEY && process.env.VOCOGEN_API_KEY.trim() !== '')

  let mode: ManifestDiagnostics['mode'] = 'MODE_C_HYBRID'
  if (hasApiKey) {
    mode = 'MODE_A_API'
  } else if (missingCount === 0) {
    mode = 'MODE_B_PREGENERATED'
  }

  return {
    totalAssets,
    foundCount,
    missingCount,
    unrecognizedCount,
    brokenCount,
    enCount,
    urCount,
    assets,
    unrecognizedFiles,
    mode,
  }
}
