// src/lib/payloadClient.ts
import payload from 'payload'
import config from '@payload-config'

export const getPayloadClient = async (p0: unknown) => {
  await payload.init({
    config,
  })
  return payload
}
