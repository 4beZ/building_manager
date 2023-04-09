import { useContext, useState, useEffect } from "react"
import styles from "./Object.module.scss"
import houseImage from "../../images/house.jpg"
import { TbListDetails, TbBallpen } from "react-icons/tb"
import { Link } from "react-router-dom"
import { Context } from "../../context/Context"
import { serverUrl } from "../../config"

const ObjectOne = ({
  object: {
    name,
    country,
    imageUrl,
    district,
    address,
    _id,
    state,
    owner,
    workProcess,
  },
}) => {
  const { isAdmin } = useContext(Context)
  const [color, setcolor] = useState("")

  useEffect(() => {
    if (state == 0) {
      setcolor("red")
    } else if (state == 1) {
      setcolor("blue")
    } else if (state == 2) {
      setcolor("green")
    }
  }, [])

  return (
    <div className={styles.object}>
      <div className={styles.image}>
        {imageUrl ? (
          <img src={`${serverUrl}${imageUrl}`} alt='objectImage' />
        ) : (
          <img src={houseImage} alt='objectImage' />
        )}
      </div>
      <div className={styles.info}>
        <p>{name}</p>
        <p>Country: {country}</p>
        <p>District: {district}</p>
        <p>Address: {address}</p>
        <p>Owner: {owner}</p>
        <p>Problem: {workProcess.problemType}</p>
      </div>
      <div className={styles.options}>
        <div>
          <Link to={`/object/${_id}`}>
            <TbListDetails />
          </Link>
        </div>
        <div>
          {isAdmin && (
            <Link to={`/edit/${_id}`}>
              <TbBallpen />
            </Link>
          )}
        </div>
        <div></div>
        <div></div>
        <div>
          <div id={`${color}`}></div>
        </div>
      </div>
    </div>
  )
}

export default ObjectOne
