import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://e-commerce-firawz.herokuapp.com/'
})

export default instance
