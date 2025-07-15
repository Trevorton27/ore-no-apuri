'use client'

import { useState } from 'react'

// Updated createCourse function
export async function createCourse({
  title,
  description,
  instructor,
  lessons = [],
}: {
  title: string
  description: string
  instructor: string // Payload user ID
  lessons?: {
    title: string
    content: string
  }[]
}) {
  const response = await fetch('/api/courses/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description, instructor, lessons }),
  })

  if (!response.ok) {
    throw new Error('Failed to create course')
  }

  return response.json()
}

export default function CreateCourseForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [instructor, setInstructor] = useState('')
  const [lessons, setLessons] = useState([{ title: '', content: '' }])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const course = await createCourse({ title, description, instructor, lessons })
      console.log('Course created:', course)
      alert('Course created successfully')
    } catch (err) {
      console.error(err)
      alert('Failed to create course')
    }
  }

  const handleLessonChange = (index: number, field: 'title' | 'content', value: string) => {
    const updated = [...lessons]
    updated[index][field] = value
    setLessons(updated)
  }

  const addLesson = () => {
    setLessons([...lessons, { title: '', content: '' }])
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 border rounded">
      <div>
        <label>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full border p-2"
          required
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block w-full border p-2"
          required
        />
      </div>
      <div>
        <label>Instructor ID</label>
        <input
          value={instructor}
          onChange={(e) => setInstructor(e.target.value)}
          className="block w-full border p-2"
          placeholder="Enter valid user ID"
          required
        />
      </div>

      <div>
        <label>Lessons</label>
        {lessons.map((lesson, index) => (
          <div key={index} className="space-y-2 border p-2 mb-2">
            <input
              placeholder="Lesson Title"
              value={lesson.title}
              onChange={(e) => handleLessonChange(index, 'title', e.target.value)}
              className="w-full p-2 border"
            />
            <textarea
              placeholder="Lesson Content"
              value={lesson.content}
              onChange={(e) => handleLessonChange(index, 'content', e.target.value)}
              className="w-full p-2 border"
            />
          </div>
        ))}
        <button type="button" onClick={addLesson} className="text-sm text-blue-600">
          + Add Lesson
        </button>
      </div>

      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        Create Course
      </button>
    </form>
  )
}
