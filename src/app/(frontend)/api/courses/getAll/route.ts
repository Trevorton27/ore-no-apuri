import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

export async function GET() {
  try {
    const courses = await payload.find({
      collection: 'courses',
      depth: 2,
    })

    return new Response(JSON.stringify(courses), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error fetching courses:', error)
    return new Response(JSON.stringify({ error: 'Failed to fetch courses' }), { status: 500 })
  }
}
