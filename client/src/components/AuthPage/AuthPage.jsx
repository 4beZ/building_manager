import { useState } from "react"
import styles from "./AuthPage.module.scss"

const AuthPage = () => {
  const [loginForm, setloginForm] = useState({
    name: "",
    password: "",
  })

  const handleLoginFormChange = (e) => {
    setloginForm({ ...loginForm, [e.target.name]: e.target.value })
  }

  return (
    <div className={styles.main}>
      <div className={styles.win}>
        <div>Sign in</div>
        <div>
          <input
            type='text'
            name='name'
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
          <button>GO</button>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
