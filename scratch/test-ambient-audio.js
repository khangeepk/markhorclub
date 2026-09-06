const fs = require('fs')
const path = require('path')

function testAmbientAudioAsset() {
  console.log('=== TEST AMBIENT AUDIO ASSET ===')
  const audioPath = path.join(process.cwd(), 'public', 'assets', 'audio', 'background', 'markhor-ambient.mp3')
  const exists = fs.existsSync(audioPath)
  console.log('File Path:', audioPath)
  console.log('Exists:', exists)

  if (exists) {
    const stat = fs.statSync(audioPath)
    console.log('Size:', (stat.size / (1024 * 1024)).toFixed(2), 'MB')
  } else {
    console.error('AUDIO ASSET MISSING')
  }
}

testAmbientAudioAsset()
