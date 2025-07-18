// src/lib/payloadClient.ts
import payload from 'payload'
import config from '@payload-config'

export const getPayloadClient = async () => {
  await payload.init({
    config,
  })
  return payload
}
