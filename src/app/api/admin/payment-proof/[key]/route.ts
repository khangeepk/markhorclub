import { NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/auth'
import fs from 'fs'
import path from 'path'

export async function GET(
  request: Request,
  { params }: { params: { key: string } }
) {
  try {
    // 1. Verify Admin Authentication Session
    const session = await verifyAdminSession()

    if (!session) {
      return new NextResponse('Unauthorized: Admin authentication required to access payment evidence.', { status: 401 })
    }

    // 2. Prevent Directory Traversal
    const safeKey = path.basename(params.key)
    const filePath = path.join(process.cwd(), 'private_uploads', 'proofs', safeKey)

    if (!fs.existsSync(filePath)) {
      return new NextResponse('Payment proof file not found.', { status: 404 })
    }

    const fileBuffer = fs.readFileSync(filePath)
    const ext = path.extname(safeKey).toLowerCase()

    let contentType = 'application/octet-stream'
    if (ext === '.pdf') contentType = 'application/pdf'
    else if (ext === '.png') contentType = 'image/png'
    else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg'

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `inline; filename="${safeKey}"`,
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
      },
    })
  } catch (error: any) {
    return new NextResponse('Server error loading evidence file.', { status: 500 })
  }
}
