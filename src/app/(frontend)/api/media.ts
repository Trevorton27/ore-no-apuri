
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

export  function getMedia() {
  const response = payload.find({ collection: 'media' })
  return response;
}

//to be added:
//put, delete, create, get by id