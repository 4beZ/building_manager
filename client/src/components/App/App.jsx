import "./App.scss"
import { userRoutes } from "../../routes"
import { BrowserRouter } from "react-router-dom"

function App() {
  const routes = userRoutes(true, false)

  return (
    <BrowserRouter>
      <div className='App'>
        {routes}
        {/* <div></div>
        <div></div> */}
      </div>
    </BrowserRouter>
  )
}

export default App
