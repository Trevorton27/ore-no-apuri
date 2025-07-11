'use client'

import { useState } from 'react'

export default function UpdateCourseForm() {
  const [id, setId] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [instructor, setInstructor] = useState('')
  const [lessons, setLessons] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
 const instructorId = Number(instructor)
    const res = await fetch('/api/courses/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        title,
        description,
        instructorId,
       // lessons: lessons.split(',').map((l) => l.trim()), // comma-separated lesson IDs
      }),
    })

    const data = await res.json()

    if (res.ok) {
      setMessage('Course updated successfully.')
    } else {
      setMessage(`Error: ${data.error || 'Failed to update course.'}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md w-full max-w-md">
      <h2 className="text-xl font-semibold">Update Course</h2>

      <input
        type="text"
        placeholder="Course ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />

      <input
        type="text"
        placeholder="New Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />

      <textarea
        placeholder="New Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />

      <input
        type="text"
        placeholder="Instructor ID"
        value={instructor}
        onChange={(e) => setInstructor(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />

      <input
        type="text"
        placeholder="Lesson IDs (comma-separated)"
        value={lessons}
        onChange={(e) => setLessons(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Update Course
      </button>

      {message && <p className="text-sm text-gray-700">{message}</p>}
    </form>
  )
}
