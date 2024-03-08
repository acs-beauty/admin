import axios from "axios"

const { VITE_API_BASE_URL } = import.meta.env

export const instance = axios.create({
  baseURL: VITE_API_BASE_URL,
  withCredentials: true,
})

// instance.interceptors.request.use(config => {
//   config.headers.authorization = `Bearer ${VITE_API_AUTH_TOKEN}`
//   return config
// })

instance.interceptors.response.use(
  config => config,
  async error => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest?._isRetry) {
      originalRequest._isRetry = true
      try {
        await axios.get(`${VITE_API_BASE_URL}user/refresh`)
        return instance.request(originalRequest)
      } catch (error) {
        console.log("Not authorized")
      }
    }
    throw error
  }
)
