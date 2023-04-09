import { useRef, useState, useEffect } from "react"
import styles from "./CreatePage.module.scss"
import { AiOutlineCamera } from "react-icons/ai"
import { MdOutlineClose } from "react-icons/md"
import InputDiv from "../InputDiv/InputDiv"
import { useHttp } from "../../hooks/http.hook"
import { Link } from "react-router-dom"
import { serverUrl } from "../../config"

const CreatePage = ({
  initialObject = {
    imageUrl: "",
    name: "",
    country: "",
    district: "",
    address: "",
    square: "",
    type: "",
    owner: "",
    state: 0,
  },
  initialWorkProcess = {
    problemType: "",
    solutionType: "",
    dateAppear: "",
    solutionTerm: "",
    solutionDateNominal: "",
    solutionDateFact: "",
    workGroup: [],
  },
  initialWorkGroup = [],
  apiUrl = `api/objects`,
  title = "Create",
  edit = false,
}) => {
  const { loading, error, request, clearError } = useHttp()
  const [objectForm, setobjectForm] = useState(initialObject)
  const [workProcess, setworkProcess] = useState(initialWorkProcess)
  const [workGroup, setworkGroup] = useState(initialWorkGroup)
  const [worker, setworker] = useState("")
  const [imageUrl, setimageUrl] = useState(initialObject.imageUrl)

  const goToRoot = useRef(null)
  const inputFileRef = useRef(null)

  const handleObjectFormChange = (e) => {
    setobjectForm({ ...objectForm, [e.target.name]: e.target.value })
  }

  const handleWorkFormChange = (e) => {
    setworkProcess({ ...workProcess, [e.target.name]: e.target.value })
  }

  const addWorker = async () => {
    try {
      const { userId, login } = await request(`api/users/${worker}`)
      setworkProcess({
        ...workProcess,
        workGroup: [...workProcess.workGroup, userId],
      })
      setworkGroup([...workGroup, { userId, login }])
      setworker("")
    } catch (e) {
      alert(e.message)
    }
  }

  const removeWorker = (workerId) => {
    setworkProcess({
      ...workProcess,
      workGroup: workProcess.workGroup.filter((w) => w !== workerId),
    })
    setworkGroup(workGroup.filter((w) => w.userId !== workerId))
  }

  const commitObject = async () => {
    try {
      const { result, message } = checkValid()
      if (!result) {
        alert(message)
        return
      }
      if (edit) {
        await request("../api/objects/update", "POST", {
          object: { ...objectForm, imageUrl, workProcess: workProcess },
        })
      } else {
        await request(apiUrl, "POST", {
          object: { ...objectForm, imageUrl, workProcess: workProcess },
        })
      }
      goToRoot.current.click()
    } catch (e) {}
  }

  const deleteObject = async () => {
    try {
      await request(`../api/objects/${objectForm._id}`, "DELETE")
      goToRoot.current.click()
    } catch (e) {}
  }

  const checkValid = () => {
    if (objectForm.state > 2 || objectForm.state < 0) {
      return { result: false, message: "Wrong state" }
    }
    if (workGroup.length == 0) {
      return { result: false, message: "No workers" }
    }
    if (!objectForm.name) {
      return { result: false, message: "No name" }
    }
    if (!workProcess.problemType) {
      return { result: false, message: "No problem to solve" }
    }
    if (!objectForm.address) {
      return { result: false, message: "No address" }
    }
    if (!objectForm.country) {
      return { result: false, message: "No country" }
    }

    return { result: true }
  }

  const fileChangeHandler = async (e) => {
    try {
      const formData = new FormData()
      const file = e.target.files[0]
      formData.append("image", file)

      const data = await request("/upload", "POST", formData, {}, true)
      console.log("Image url: " + data.url)
      setimageUrl(data.url)
    } catch (error) {
      console.error("Getting url error " + error)
    }
  }

  useEffect(() => {}, [])

  return (
    <div className={styles.main}>
      <div>
        <b>{title}</b>
        <div onClick={() => inputFileRef.current.click()}>
          {imageUrl ? (
            <img src={`${serverUrl}${imageUrl}`} alt='ObjectImage' />
          ) : (
            <AiOutlineCamera />
          )}
          <input
            ref={inputFileRef}
            type='file'
            hidden
            onChangeCapture={fileChangeHandler}
          />
        </div>
        <b>Workers</b>
        <div className={styles.workersDiv}>
          {workGroup.length > 0 ? (
            workGroup.map((worker, i) => (
              <p key={i}>
                {!edit ? worker.login : worker}
                <MdOutlineClose
                  className={styles.removeIcon}
                  onClick={() => removeWorker(worker.userId)}
                />
              </p>
            ))
          ) : (
            <p>No Workers</p>
          )}
        </div>

        <div className={styles.commitButton} onClick={commitObject}>
          <button>Commit</button>
        </div>
        {edit && (
          <div className={styles.deleteButton}>
            <button onClick={deleteObject}>Delete</button>
          </div>
        )}
      </div>
      <div>
        <b>Object</b>
        <>
          <InputDiv
            title='Name'
            type='text'
            name='name'
            onChange={handleObjectFormChange}
            value={objectForm.name}
          />
          <InputDiv
            title='Country'
            type='text'
            name='country'
            onChange={handleObjectFormChange}
            value={objectForm.country}
          />
          <InputDiv
            title='District'
            type='text'
            name='district'
            onChange={handleObjectFormChange}
            value={objectForm.district}
          />
          <InputDiv
            title='Address'
            type='text'
            name='address'
            onChange={handleObjectFormChange}
            value={objectForm.address}
          />
          <InputDiv
            title='Square'
            type='number'
            name='square'
            onChange={handleObjectFormChange}
            value={objectForm.square}
          />
          <InputDiv
            title='Owner'
            type='text'
            name='owner'
            onChange={handleObjectFormChange}
            value={objectForm.owner}
          />
          <InputDiv
            title='State'
            type='number'
            name='state'
            min='0'
            max='2'
            onChange={handleObjectFormChange}
            value={objectForm.state}
          />
        </>
        <b>Work Process</b>
        <>
          <InputDiv
            title='Problem Type'
            type='text'
            name='problemType'
            onChange={handleWorkFormChange}
            value={workProcess.problemType}
          />
          <InputDiv
            title='Solution Term (days)'
            type='number'
            name='solutionTerm'
            onChange={handleWorkFormChange}
            value={workProcess.solutionTerm}
          />
          <InputDiv
            title='Appear Date'
            type='date'
            name='dateAppear'
            onChange={handleWorkFormChange}
            value={workProcess.dateAppear}
          />
          <InputDiv
            title='Nominal Solution Date'
            type='date'
            name='solutionDateNominal'
            onChange={handleWorkFormChange}
            value={workProcess.solutionDateNominal}
          />
          <InputDiv
            title='Fact Solution Date'
            type='date'
            name='solutionDateFact'
            onChange={handleWorkFormChange}
            value={workProcess.solutionDateFact}
          />
        </>
        <div className={styles.worker}>
          <p>Worker</p>
          <input
            type='text'
            name='workers'
            onChange={(e) => setworker(e.target.value)}
            on
            value={worker}
          />
          <button onClick={addWorker}>Add</button>
        </div>
      </div>
      <Link to='/' ref={goToRoot} />
    </div>
  )
}

export default CreatePage
