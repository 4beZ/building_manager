import "./App.scss"
import { userRoutes } from "../../routes"
import { BrowserRouter } from "react-router-dom"
import { Context } from "../../context/Context"

function App() {
  const routes = userRoutes(true, false)

  return (
    <Context.Provider value={{ token: "asdsad" }}>
      <BrowserRouter>
        <div className='App'>{routes}</div>
      </BrowserRouter>
    </Context.Provider>
  )
}

export default App
