import { useContext, useState, useEffect, useCallback, useRef } from "react"
import styles from "./SingleObjectPage.module.scss"
import { useParams, Link } from "react-router-dom"
import { AiOutlineCamera } from "react-icons/ai"
import InfoDiv from "../InfoDiv/InfoDiv"
import { Context } from "../../context/Context"
import { useHttp } from "../../hooks/http.hook"
import { serverUrl } from "../../config"

const SingleObjectPage = () => {
  const { id } = useParams()
  const { isAdmin } = useContext(Context)
  const [object, setobject] = useState({})
  const [workProcess, setworkProcess] = useState({})
  const [workGroup, setworkGroup] = useState([])
  const { loading, request } = useHttp()

  const goToEdit = useRef(null)

  const getObject = useCallback(async () => {
    try {
      const data = await request(`/api/objects/${id}`)
      setworkProcess(data.workProcess)
      setworkGroup(data.workProcess.workGroup)
      setobject(data)
    } catch (e) {
      alert(e.message)
    }
  }, [request])

  useEffect(() => {
    getObject()
  }, [getObject])

  return loading ? (
    <p>loading</p>
  ) : (
    <div className={styles.main}>
      <div>
        <b>{object.name}</b>
        <div>
          {object.imageUrl ? (
            <img src={`${serverUrl}${object.imageUrl}`} alt='ObjectImage' />
          ) : (
            <AiOutlineCamera />
          )}
        </div>
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
          <InfoDiv title='Country' value={object.country} />
          <InfoDiv title='District' value={object.district} />
          <InfoDiv title='Address' value={object.address} />
          <InfoDiv title='Square' value={object.square} />
        </>
        <b>Work Process</b>
        <>
          <InfoDiv title='Problem Type' value={workProcess.problemType} />
          <InfoDiv title='Solution Type' value={workProcess.solutionType} />
          <InfoDiv
            title='Solution Term (days)'
            value={workProcess.solutionTerm}
          />
          <InfoDiv title='Appear Date' value={workProcess.dateAppear} />
          <InfoDiv
            title='Nominal Solution Date'
            value={workProcess.solutionDateNominal}
          />
          <InfoDiv
            title='Fact Solution Date'
            value={workProcess.solutionDateFact}
          />
        </>
        {isAdmin && (
          <div className={styles.editButton}>
            <button onClick={() => goToEdit.current.click()}>Edit</button>
          </div>
        )}
        <Link to={`/edit/${object._id}`} hidden ref={goToEdit} />
      </div>
    </div>
  )
}

export default SingleObjectPage
