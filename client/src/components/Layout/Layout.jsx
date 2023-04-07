import React from "react"
import { Outlet } from "react-router-dom"
import styles from "./Layout.module.scss"
import Menu from "../Menu/Menu"

const Layout = () => {
  return (
    <>
      <Menu />

      <div className={styles.outlet}>
        <Outlet />
      </div>
    </>
  )
}

export default Layout
