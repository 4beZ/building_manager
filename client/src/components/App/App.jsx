import "./App.scss"
import { userRoutes } from "../../routes"
import { BrowserRouter } from "react-router-dom"
import { Context } from "../../context/Context"

function App() {
  const routes = userRoutes(true, true)

  return (
    <Context.Provider value={{ token: "asdsad", isAdmin: true }}>
      <BrowserRouter>
        <div className='App'>{routes}</div>
      </BrowserRouter>
    </Context.Provider>
  )
}

export default App
