'use client'

import { useState } from 'react'

export default function DeleteCourseForm() {
  const [courseId, setCourseId] = useState<number | undefined>()

   const handleDelete = async () => {
    if (!courseId) return alert('Enter a course ID')

    const res = await fetch('/api/courses/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: courseId }),
    })

    const data = await res.json()

    if (data.success) {
      alert('Course deleted successfully!')
    } else {
      alert(`Failed to delete course: ${data.error}`)
    }
  }

  return (
    <div>
      <input
        type="number"
        value={courseId || ''}
        onChange={(e) => setCourseId(Number(e.target.value))}
        placeholder="Enter Course ID"
      />
      <button onClick={handleDelete}>Delete Course</button>
    </div>
  )
}
