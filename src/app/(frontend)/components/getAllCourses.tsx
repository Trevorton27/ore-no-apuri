'use client'

import { useState } from 'react'

export default function GetCoursesButton() {
  const [courses, setCourses] = useState<any[]>([])

  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/courses/getAll')
      if (!res.ok) throw new Error('Failed to fetch courses')

      const data = await res.json()
      setCourses(data.docs) // Payload returns { docs: [...] }
      console.log('Courses:', data.docs)
    } catch (error) {
      console.error('Error fetching courses:', error)
    }
  }

  return (
    <div>
      <button
        onClick={fetchCourses}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
      >
        Load Courses
      </button>

      {courses.length > 0 && (
        <ul className="mt-4 space-y-2">
          {courses.map((course) => (
            <li key={course.id}>
              <strong>{course.title}</strong> – {course.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
