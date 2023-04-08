import { useContext } from "react"
import styles from "./Object.module.scss"
import houseImage from "../../images/house.jpg"
import { TbListDetails, TbBallpen } from "react-icons/tb"
import { Link } from "react-router-dom"
import { Context } from "../../context/Context"

const Object = () => {
  const { isAdmin } = useContext(Context)

  return (
    <div className={styles.object}>
      <div className={styles.image}>
        <img src={houseImage} alt='objectImage' />
      </div>
      <div className={styles.info}>
        {/* <p>{name}</p>
        <p>
          Address: {address.city}, {address.street}
        </p>
        <p>Phone: {phone}</p>
        <p>Company: {company.name}</p> */}
      </div>
      <div className={styles.options}>
        <div>
          {/* <Link to={`/object/${id}`}>
            <TbListDetails />
          </Link> */}
        </div>
        <div>
          {/* {isAdmin && (
            <Link to={`/edit/${id}`}>
              <TbBallpen />
            </Link>
          )} */}
        </div>
        <div></div>
        <div></div>
        <div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default Object
