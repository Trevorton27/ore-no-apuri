import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

export async function PUT(req: Request) {
  try {
    const body = await req.json()

    const { id, title, description, instructorId, lessons } = body

    if (!id) {
      return new Response(JSON.stringify({ error: 'Missing course ID' }), {
        status: 400,
      })
    }

    const updatedCourse = await payload.update({
      collection: 'courses',
      id,
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(instructorId && {instructorId })
       // ...(lessons && { lessons }),
      },
    })

    return new Response(JSON.stringify(updatedCourse), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Update course error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to update course', details: error }),
      { status: 500 }
    )
  }
}
