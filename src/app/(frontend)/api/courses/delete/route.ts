import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { id } = await req.json()
  const payload = await getPayload({ config })

  try {
    const result = await payload.delete({
      collection: 'courses',
      id,
    })

    return NextResponse.json({ success: true, result })
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 })
  }
}
/*
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })


//to be added:
//put, delete, create, get by id

export function deleteCourse(id: number) {
const result = payload.delete({
  collection: 'courses', // required
  id: id, // required
  depth: 2
})
}
*/