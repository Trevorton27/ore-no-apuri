import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payloadClient'
import config from '@/payload.config'

export async function POST(req: NextRequest) {
  const payload = await getPayloadClient({ config })
  const body = await req.json()
  const { email, password } = body

  try {
    const user = await payload.login({
      collection: 'users',
      data: {
        email,
        password,
      },
    })

    // Optionally, set a cookie or token here if needed
    return NextResponse.json({ user }, { status: 200 })
  } catch (err) {
    console.error('Admin login failed:', err)
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
}
