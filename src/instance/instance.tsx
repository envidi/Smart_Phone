import axios from 'axios'

const instance = axios.create({
    baseURL : 'https://envidi-be-smartphone.onrender.com/api/'
})
export default instance