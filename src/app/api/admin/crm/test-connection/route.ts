import { NextResponse } from 'next/server'
import { crmClient } from '@/lib/crm/client'

export async function GET() {
  try {
    if (!crmClient.isConfigured()) {
      return NextResponse.json({
        success: false,
        message: 'GUARANTEEDCRM_PRIVATE_TOKEN or GUARANTEEDCRM_LOCATION_ID missing in environment.',
        status: 'UNCONFIGURED',
      }, { status: 400 })
    }

    const testResults = await crmClient.testReadPermissions()

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      locationId: testResults.configuredLocationId,
      authentication: testResults.authentication,
      tests: testResults.tests,
      pipelinesCount: testResults.rawPipelines.length,
      pipelines: testResults.rawPipelines.map((p: any) => ({
        id: p.id,
        name: p.name,
        stages: p.stages?.map((s: any) => ({ id: s.id, name: s.name })),
      })),
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error?.message || 'Failed to perform read-only CRM test',
    }, { status: 500 })
  }
}
