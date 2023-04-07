import { Route, Routes, Navigate } from "react-router-dom"
import AuthPage from "./components/AuthPage/AuthPage"
import CreatePage from "./components/CreatePage/CreatePage"
import Layout from "./components/Layout/Layout"
import ObjectsPage from "./components/ObjectsPage/ObjectsPage"

export const userRoutes = (isAuth, isAdmin) => {
  if (isAdmin) {
    return (
      <Routes>
        <Route path='/create' element={<CreatePage />} />
      </Routes>
    )
  }

  if (isAuth) {
    return (
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/create' element={<CreatePage />} />
          <Route index element={<ObjectsPage />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Route>
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path='/' element={<AuthPage />} />
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  )
}
