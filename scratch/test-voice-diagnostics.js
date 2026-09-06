const { getAudioManifestDiagnostics } = require('./src/lib/voice/concierge-audio')
const { voiceService } = require('./src/lib/voice/provider')

async function testVoiceIntegration() {
  console.log('=== TEST VOICE INTEGRATION ===')
  
  const mode = voiceService.getIntegrationMode()
  console.log('Integration Mode:', mode)

  const diagnostics = getAudioManifestDiagnostics()
  console.log('Total Assets:', diagnostics.totalAssets)
  console.log('Present Count:', diagnostics.presentCount)
  console.log('Missing Count:', diagnostics.missingCount)
  console.log('EN Count:', diagnostics.enCount)
  console.log('UR Count:', diagnostics.urCount)
  
  console.log('=== ASSETS LIST ===')
  diagnostics.assets.slice(0, 4).forEach((a) => {
    console.log(`- [${a.language.toUpperCase()}] ${a.label}: ${a.status} (${a.filename})`)
  })
}

testVoiceIntegration().catch(console.error)
