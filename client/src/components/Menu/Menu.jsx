import React, { useState } from "react"
import styles from "./Menu.module.scss"
import { NavLink, Link } from "react-router-dom"

const Menu = () => {
  const [title, settitle] = useState("OM")

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
      <NavLink to='/create' className={styles.link}>
        <div>Create Object</div>
      </NavLink>
      <NavLink to='/about' className={styles.link}>
        <div>About</div>
      </NavLink>
    </div>
  )
}

export default Menu
