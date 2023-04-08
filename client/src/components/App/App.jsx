import "./App.scss"
import { userRoutes } from "../../routes"
import { BrowserRouter } from "react-router-dom"
import { Context } from "../../context/Context"
import { useAuth } from "../../hooks/auth.hook"

function App() {
  const { login, logout, token, userId, isAdmin } = useAuth()
  const isAuthenticated = !!token
  const routes = userRoutes(isAuthenticated, isAdmin)

  return (
    <Context.Provider
      value={{ token, userId, login, logout, isAuthenticated, isAdmin }}>
      <BrowserRouter>
        <div className='App'>{routes}</div>
      </BrowserRouter>
    </Context.Provider>
  )
}

export default App
