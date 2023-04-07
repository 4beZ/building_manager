import React from "react"
import styles from "./Object.module.scss"
import houseImage from "../../images/house.jpg"

const Object = ({ object: { name, address, phone, company } }) => {
  return (
    <div className={styles.object}>
      <div className={styles.image}>
        <img src={houseImage} alt='objectImage' />
      </div>
      <div className={styles.info}>
        <p>{name}</p>
        <p>
          Address: {address.city}, {address.street}
        </p>
        <p>Phone: {phone}</p>
        <p>Company: {company.name}</p>
      </div>
      <div className={styles.options}></div>
    </div>
  )
}

export default Object
