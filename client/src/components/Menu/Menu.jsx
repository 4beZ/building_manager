import React, { useContext, useState } from "react"
import styles from "./Menu.module.scss"
import { NavLink, Link } from "react-router-dom"
import { Context } from "../../context/Context"

const Menu = () => {
  const [title, settitle] = useState("OM")
  const { isAdmin } = useContext(Context)

  return (
    <div className={styles.menu}>
      <Link to='/'>
        <p
          onMouseEnter={() => settitle("OBJECTS MANAGER")}
          onMouseLeave={() => settitle("OM")}>
          {title}
        </p>
      </Link>
      <NavLink to='/' className={styles.link}>
        <div>Objects</div>
      </NavLink>
      {isAdmin && (
        <NavLink to='/create' className={styles.link}>
          <div>Create Object</div>
        </NavLink>
      )}
      <NavLink to='/about' className={styles.link}>
        <div>About</div>
      </NavLink>
      <button>Logout</button>
    </div>
  )
}

export default Menu
