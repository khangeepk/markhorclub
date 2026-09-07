import { NextRequest, NextResponse } from 'next/server'
import { requirePermission } from '@/lib/rbac'
import { PERMISSIONS } from '@/lib/permissions'
import { db } from '@/lib/db'
import path from 'path'
import fs from 'fs/promises'
import crypto from 'crypto'

const ALLOWED_MIME_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB

export async function POST(request: NextRequest) {
  const { user, error } = await requirePermission(PERMISSIONS.SETTINGS_MANAGE)
  if (error) return error

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const targetKey = (formData.get('targetKey') as string)?.trim() || 'brand_logo_url'

    if (!file) {
      return NextResponse.json({ success: false, error: 'No image file uploaded.' }, { status: 400 })
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid file format: ${file.type}. Allowed formats: PNG, JPG, JPEG, WEBP. (SVG upload is disabled for security).`,
        },
        { status: 400 }
      )
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: 'File size exceeds maximum 2 MB limit.' },
        { status: 400 }
      )
    }

    // Determine extension safely from mime type
    let ext = 'png'
    if (file.type.includes('jpeg') || file.type.includes('jpg')) ext = 'jpg'
    else if (file.type.includes('webp')) ext = 'webp'

    const randomName = `logo-${targetKey.replace(/[^a-z0-9_]/gi, '')}-${Date.now()}-${crypto.randomBytes(4).toString('hex')}.${ext}`

    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'branding')
    await fs.mkdir(uploadsDir, { recursive: true })

    const filePath = path.join(uploadsDir, randomName)
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    await fs.writeFile(filePath, buffer)

    const publicUrl = `/uploads/branding/${randomName}`

    // Persist branding setting in DB
    await db.appSetting.upsert({
      where: { key: targetKey },
      update: { value: publicUrl },
      create: {
        key: targetKey,
        value: publicUrl,
        description: `Branding logo asset for ${targetKey}`,
      },
    })

    // Write audit log
    await db.auditLog.create({
      data: {
        actorUsername: user.username,
        action: 'BRANDING_LOGO_UPLOADED',
        entityType: 'Settings',
        details: JSON.stringify({
          targetKey,
          filename: randomName,
          sizeBytes: file.size,
          mimeType: file.type,
          publicUrl,
        }),
      },
    })

    return NextResponse.json({
      success: true,
      url: publicUrl,
      targetKey,
      storageProvider: 'LOCAL_PERSISTENT_STORAGE',
      message: 'Logo uploaded and branding settings updated successfully.',
    })
  } catch (err: any) {
    console.error('Logo upload error:', err)
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to upload logo file.' },
      { status: 500 }
    )
  }
}
