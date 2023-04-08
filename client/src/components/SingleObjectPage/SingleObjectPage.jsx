import { useContext } from "react"
import styles from "./SingleObjectPage.module.scss"
import { useParams } from "react-router-dom"
import { AiOutlineCamera } from "react-icons/ai"
import InfoDiv from "../InfoDiv/InfoDiv"
import { testObject, testWorkProcess } from "../../testObject/testObject"
import { Context } from "../../context/Context"

const SingleObjectPage = () => {
  const { id } = useParams()
  const { isAdmin } = useContext(Context)

  const { imageUrl, name, country, district, address, square, type, owner } =
    testObject
  const {
    problemType,
    solutionType,
    dateAppear,
    solutionTerm,
    solutionDateNominal,
    solutionDateFact,
    workGroup,
  } = testWorkProcess

  return (
    <div className={styles.main}>
      <div>
        <b>{name}</b>
        <div>{imageUrl ? <p>Image</p> : <AiOutlineCamera />}</div>
        <b>Workers</b>
        <div className={styles.workersDiv}>
          {workGroup.length > 0 ? (
            workGroup.map((worker, i) => <p key={i}>{worker}</p>)
          ) : (
            <p>No Workers</p>
          )}
        </div>
      </div>
      <div>
        <b>Information</b>
        <>
          <InfoDiv title='Country' value={country} />
          <InfoDiv title='District' value={district} />
          <InfoDiv title='Address' value={address} />
          <InfoDiv title='Square' value={square} />
        </>
        <b>Work Process</b>
        <>
          <InfoDiv title='Problem Type' value={problemType} />
          <InfoDiv title='Solution Type' value={solutionType} />
          <InfoDiv title='Solution Term (days)' value={solutionTerm} />
          <InfoDiv title='Appear Date' value={dateAppear} />
          <InfoDiv title='Nominal Solution Date' value={solutionDateNominal} />
          <InfoDiv title='Fact Solution Date' value={solutionDateFact} />
        </>
        {isAdmin && (
          <div className={styles.editButton}>
            <button>Edit</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SingleObjectPage
