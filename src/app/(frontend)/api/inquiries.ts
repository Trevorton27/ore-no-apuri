
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

export  function getInquiries() {
  const response = payload.find({ collection: 'inquiries' })
  return response;
}

//to be added:
//put, delete, create, get by id