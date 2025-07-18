import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payloadClient'
import { getAuth } from '@clerk/nextjs/server'

export async function POST(req: NextRequest) {
  const payload = await getPayloadClient()
  const { userId, getToken } = getAuth(req)

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { title, description } = body

  try {
    const course = await payload.create({  
      collection: 'courses',
      data: {
        title,
        description,
        instructor: Number(userId),
      },
      user: {
        id: userId,
      },
    })

    return NextResponse.json(course, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Course creation failed' }, { status: 500 })
  }
}
