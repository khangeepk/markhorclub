import { crmClient } from './client'
import { db } from '../db'

export interface PipelineStageConfig {
  pipelineId: string
  pipelineName: string
  stages: Record<string, { id: string; name: string; position: number }>
}

let cachedPipelineConfig: PipelineStageConfig | null = null

export async function discoverAndStoreMarkhorPipeline(): Promise<PipelineStageConfig | null> {
  try {
    const pipelines = await crmClient.getPipelines()
    if (!pipelines || pipelines.length === 0) return null

    const markhorPipeline = pipelines.find((p: any) =>
      p.name?.toLowerCase().includes('markhor') || p.name?.toLowerCase().includes('membership')
    ) || pipelines[0]

    if (!markhorPipeline) return null

    const stageMap: Record<string, { id: string; name: string; position: number }> = {}

    if (markhorPipeline.stages) {
      markhorPipeline.stages.forEach((s: any) => {
        const key = s.name.trim()
        stageMap[key] = {
          id: s.id,
          name: s.name,
          position: s.position ?? 0,
        }
      })
    }

    const config: PipelineStageConfig = {
      pipelineId: markhorPipeline.id,
      pipelineName: markhorPipeline.name,
      stages: stageMap,
    }

    cachedPipelineConfig = config

    // Persist in app_settings table (non-secret metadata)
    await db.appSetting.upsert({
      where: { key: 'crm_markhor_pipeline_config' },
      update: {
        value: JSON.stringify(config),
        description: 'Discovered GuaranteedCRM Markhor Membership Pipeline & Stages config',
      },
      create: {
        key: 'crm_markhor_pipeline_config',
        value: JSON.stringify(config),
        description: 'Discovered GuaranteedCRM Markhor Membership Pipeline & Stages config',
      },
    }).catch(() => {})

    return config
  } catch (err: any) {
    console.error('Error discovering Markhor pipeline:', err?.message)
    return null
  }
}

export async function getMarkhorPipelineConfig(): Promise<PipelineStageConfig | null> {
  if (cachedPipelineConfig) return cachedPipelineConfig

  // Try DB
  try {
    const setting = await db.appSetting.findUnique({ where: { key: 'crm_markhor_pipeline_config' } })
    if (setting?.value) {
      cachedPipelineConfig = JSON.parse(setting.value)
      return cachedPipelineConfig
    }
  } catch {}

  // Discover live
  return discoverAndStoreMarkhorPipeline()
}

export function mapStatusToStageName(status: string): string {
  const norm = status.toLowerCase().trim()

  if (norm.includes('new') || norm === '01') return '01 New Inquiry'
  if (norm.includes('contacted') || norm === '02') return '02 Contacted'
  if (norm.includes('qualified') || norm === '03') return '03 Qualified'
  if (norm.includes('visit') || norm.includes('scheduled') || norm === '04') return '04 Visit Scheduled'
  if (norm.includes('application') || norm.includes('submitted') || norm === '05') return '05 Application Submitted'
  if (norm.includes('payment') || norm.includes('pending') || norm === '06') return '06 Payment Pending'
  if (norm.includes('member') || norm.includes('active') || norm === '07') return '07 Member'
  if (norm.includes('closed') || norm.includes('lost') || norm.includes('cancelled') || norm === '08') return '08 Closed / Lost'

  return '01 New Inquiry'
}

export async function getStageIdForStatus(status: string): Promise<{ pipelineId: string; stageId: string } | null> {
  const config = await getMarkhorPipelineConfig()
  if (!config) return null

  const targetStageName = mapStatusToStageName(status)
  let matchedStage = config.stages[targetStageName]

  if (!matchedStage) {
    // Search substring match
    const foundKey = Object.keys(config.stages).find((k) => k.toLowerCase().includes(targetStageName.toLowerCase().slice(3)))
    if (foundKey) {
      matchedStage = config.stages[foundKey]
    }
  }

  const fallbackFirstStage = Object.values(config.stages)[0]
  const finalStageId = matchedStage?.id || fallbackFirstStage?.id

  if (!finalStageId) return null

  return {
    pipelineId: config.pipelineId,
    stageId: finalStageId,
  }
}
