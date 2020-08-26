import axios from 'axios'

const cmsAPI = axios.create({
  baseURL: 'http://localhost:3000'
})

export default cmsAPI
