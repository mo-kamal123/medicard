import axios from 'axios'
import i18n from '../config/i18n/i18n'

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

httpClient.interceptors.request.use((config) => {
  config.headers['accept-language'] = i18n.language
  return config
})

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error.response?.data
    let message = error.message ?? 'Something went wrong'

    if (data?.errors) {
      message = Object.values(data.errors).flat().join(", ")
    } else if (data?.message) {
      message = data.message
    }

    return Promise.reject(new Error(message))
  },
)
