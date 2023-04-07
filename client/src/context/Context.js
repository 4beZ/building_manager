import { createContext } from "react"

const noop = () => {}

export const Context = createContext({
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  isAuthenticated: false,
})
