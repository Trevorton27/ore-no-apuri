
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

export  function getUsers() {
  const response = payload.find({ collection: 'users' })
  return response;
}

//to be added:
//put, delete, create, get by id