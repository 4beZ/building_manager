import { useState, useCallback, useContext } from "react"
import { AuthContext } from "../context/Context"

export const useHttp = () => {
  const { token } = useContext(AuthContext)
  const [loading, setloading] = useState(false)
  const [error, setError] = useState(null)
  const request = useCallback(
    async (
      url,
      method = "GET",
      body = null,
      headers = {},
      formData = false
    ) => {
      setloading(true)
      try {
        if (body) {
          if (!formData) {
            body = JSON.stringify(body)
            headers["Content-Type"] = "application/json"
          }
        }
        headers.authorization = token

        const response = await fetch(url, {
          method,
          body,
          headers,
        })
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || "Something went wrong")
        }

        setloading(false)

        return data
      } catch (e) {
        setloading(false)
        setError(e.message)
        throw e
      }
    },
    [token]
  )

  const clearError = useCallback(() => setError(null), [])

  return { loading, request, error, clearError }
}
