import React from "react"
import styles from "./Object.module.scss"
import houseImage from "../../images/house.jpg"

const Object = ({ object }) => {
  return (
    <div className={styles.object}>
      <div className={styles.image}>
        <img src={houseImage} alt='objectImage' />
      </div>
      <div className={styles.info}>
        <p>{object.name}</p>
      </div>
      <div className={styles.options}></div>
    </div>
  )
}

export default Object
