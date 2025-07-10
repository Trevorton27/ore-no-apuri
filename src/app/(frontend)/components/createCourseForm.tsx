'use client'

import { useState } from 'react'
//import { createCourse } from '@/lib/courses/createCourse'

// src/lib/courses/createCourse.ts
export async function createCourse({
  title,
  description,
  instructor,
}: {
  title: string
  description: string
  instructor: string // Payload user ID
}) {
  const response = await fetch('/api/courses/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description, instructor }),
  })

  if (!response.ok) {
    throw new Error('Failed to create course')
  }

  return response.json()
}


export default function CreateCourseForm() {

  
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [instructor, setInstructor] = useState('') // Use actual user ID here

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const course = await createCourse({ title, description, instructor })
      console.log('Course created:', course)
      alert('Course created successfully')
    } catch (err) {
      console.error(err)
      alert('Failed to create course')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 border rounded">
      <div>
        <label>Title</label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="block w-full border p-2"
          required
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="block w-full border p-2"
          required
        />
      </div>
      <div>
        <label>Instructor ID</label>
        <input
          value={instructor}
          onChange={e => setInstructor(e.target.value)}
          className="block w-full border p-2"
          placeholder="Enter valid user ID"
          required
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        Create Course
      </button>
    </form>
  )
}
