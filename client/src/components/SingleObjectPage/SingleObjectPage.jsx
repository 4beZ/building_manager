import React from "react"
import styles from "./SingleObjectPage.module.scss"
import { useParams } from "react-router-dom"

const SingleObjectPage = () => {
  const { id } = useParams()

  return <div className={styles.main}>{id}</div>
}

export default SingleObjectPage
