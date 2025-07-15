// src/app/api/courses/create/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(req: NextRequest) {
  const payload = await getPayload({ config })
  const body = await req.json()
  console.log('req body: ', body.title, body.description, body.instructor)
  try {
    const course = await payload.create({
      collection: 'courses',
      data: {
        title: body.title,
        description: body.description,
        instructor: Number(body.instructor), // must be a valid user ID as string
      },
    })
    console.log('Instructor ID:', body.instructor)
    return NextResponse.json(course, { status: 201 })
  } catch (error) {
    console.error('Create course error:', error)
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 })  
  }
}
