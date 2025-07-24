// src/app/api/clerk-webhook/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { getPayloadClient } from '@/lib/payloadClient'
import config from '@/payload.config'
import crypto from 'crypto'

const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET!

function verifySignature(payload: string, signature: string) {
  const hmac = crypto.createHmac('sha256', CLERK_WEBHOOK_SECRET)
  hmac.update(payload, 'utf8')
  const digest = hmac.digest('hex')
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature))
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text()
  const signature = (await (await headers()).get('clerk-signature')) || ''

  if (!verifySignature(rawBody, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 403 })
  }

  const event = JSON.parse(rawBody)

  if (event.type === 'user.created') {
    const { id: clerkId, email_addresses, public_metadata } = event.data
    const email = email_addresses[0]?.email_address || ''

    const payload = await getPayloadClient({ config })
    const body = await req.json()
    const user = body.data

    console.log('Webhook body:', JSON.stringify(body, null, 2))

    try {
      await payload.create({
        collection: 'users',
        data: {
          email,
          name: user?.first_name + ' ' + user?.last_name || 'Clerk User', // fallback if names are missing
          clerkId,
          role: public_metadata?.role || 'student',
          authProvider: 'clerk',
        },
      })

      return NextResponse.json({ message: 'User synced to Payload' }, { status: 201 })
    } catch (err) {
      console.error('Failed to create user in Payload:', err)
      return NextResponse.json({ error: 'Failed to create user in Payload' }, { status: 500 })
    }
  }

  return NextResponse.json({ message: 'Unhandled event' }, { status: 200 })
}
