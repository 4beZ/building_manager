import { useContext, useState } from "react"
import styles from "./AuthPage.module.scss"
import { useHttp } from "../../hooks/http.hook"
import { Context } from "../../context/Context"

const AuthPage = () => {
  const { isAuthenticated, login } = useContext(Context)
  const { loading, error, request, clearError } = useHttp()
  const [loginForm, setloginForm] = useState({
    login: "",
    password: "",
  })

  const handleLoginFormChange = (e) => {
    setloginForm({ ...loginForm, [e.target.name]: e.target.value })
  }

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", {
        ...loginForm,
      })
      login(data.token, data.userId, data.isAdmin)
      console.log("Data: " + data)
      console.log("isAuthenticated: " + isAuthenticated)
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div className={styles.main}>
      <div className={styles.win}>
        <div>Sign in</div>
        <div>
          <input
            type='text'
            name='login'
            placeholder='Name'
            value={loginForm.name}
            onChange={handleLoginFormChange}
          />
        </div>
        <div>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={loginForm.password}
            onChange={handleLoginFormChange}
          />
        </div>
        <div>
          <button onClick={loginHandler}>GO</button>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
