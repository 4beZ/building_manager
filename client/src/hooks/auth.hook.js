import { useCallback, useState, useEffect } from "react"

const storageName = "userData"

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const [isAdmin, setisAdmin] = useState(false)

  const login = useCallback((jwtToken, id, isAdmin) => {
    setisAdmin(isAdmin)
    setToken(jwtToken)
    setUserId(id)

    localStorage.setItem(
      storageName,
      JSON.stringify({
        userId: id,
        token: jwtToken,
      })
    )
  }, [])
  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    setisAdmin(false)

    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data && data.token) {
      login(data.token, data.userId)
    }
  }, [login])

  return { login, logout, token, userId, isAdmin }
}
