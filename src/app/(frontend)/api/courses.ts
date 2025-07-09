
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

export  function getCourses() {
  const response = payload.find({ collection: 'courses' })
  return response;
}

//to be added:
//put, delete, create, get by id