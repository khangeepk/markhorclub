# CRM integration readiness

This directory is the server-side integration boundary for GuaranteedCRM.

- `types.ts` defines provider-neutral contracts and local CRM metadata fields.
- `event-map.ts` is the GCRM-00 event contract.
- `local-records.ts` defines the Markhor-owned record shape and repository seam.
- `sync.ts` creates deterministic event envelopes and retryable pending jobs.
- `guaranteedcrm/provider.ts` is an intentionally non-networking provider skeleton.
- `webhooks.ts` contains the raw-body HMAC verification boundary for a future route.

GCRM-00 does not call GuaranteedCRM and does not assume an undocumented API or
authentication scheme. The project has no database yet; GCRM-01 must connect
`LocalRecordRepository` and a durable sync queue to the selected Markhor store.
