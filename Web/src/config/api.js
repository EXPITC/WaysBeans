import axios from 'axios';

export const API = axios.create({
    baseURL: "http://localhost:5000/api/v1/",
})

// export const setAuthToken = (token) => {
//     if (token) {
//         API.defaults.headers.common['Authorization'] = `Bearer ${token}`
//     } else {
//         delete API.defaults.headers.common['Authorization']
//     }
// }

export const handleError = (err) => {
    if (err.response) {
        console.log(err.response.data)
        console.log(err.response.data.message)
        console.log(err.response.status)
    }
    if (err.response?.status === 401) {
         alert(err.response.data.err)
    }
    if (err.response === 404) {
        console.log('page not found')
    } else if (err.request) {
        console.error(err.request)
        console.error(err.massage)
    }
}