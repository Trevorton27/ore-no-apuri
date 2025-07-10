import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

export  function getCourses() {
  const response = payload.find({ collection: 'courses' })
  return response;
}

export  function getInquiries() {
  const response = payload.find({ collection: 'inquiries' })
  return response;
}

export  function getLessons() {
  const response = payload.find({ collection: 'lessons' })
  return response;
}

export  function getMedia() {
  const response = payload.find({ collection: 'media' })
  return response;
}

export  function getUsers() {
  const response = payload.find({ collection: 'users' })
  return response;
}