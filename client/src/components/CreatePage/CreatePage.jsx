import { useState } from "react"
import styles from "./CreatePage.module.scss"
import { AiOutlineCamera } from "react-icons/ai"
import { MdOutlineClose } from "react-icons/md"
import InputDiv from "../InputDiv/InputDiv"

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
  apiUrl = "",
  title = "Create",
  edit = false,
}) => {
  const [objectForm, setobjectForm] = useState(initialObject)
  const [workProcess, setworkProcess] = useState(initialWorkProcess)
  const [worker, setworker] = useState("")

  const handleObjectFormChange = (e) => {
    setobjectForm({ ...objectForm, [e.target.name]: e.target.value })
  }

  const handleWorkFormChange = (e) => {
    setworkProcess({ ...workProcess, [e.target.name]: e.target.value })
    console.log(workProcess)
  }

  const addWorker = () => {
    setworkProcess({
      ...workProcess,
      workGroup: [...workProcess.workGroup, worker],
    })
    setworker("")
  }

  const removeWorker = (worker) => {
    setworkProcess({
      ...workProcess,
      workGroup: workProcess.workGroup.filter((w) => w !== worker),
    })
  }

  return (
    <div className={styles.main}>
      <div>
        <b>{title}</b>
        <div>
          {objectForm.imageUrl ? <p>There is an image</p> : <AiOutlineCamera />}
        </div>
        <b>Workers</b>
        <div className={styles.workersDiv}>
          {workProcess.workGroup.length > 0 ? (
            workProcess.workGroup.map((worker, i) => (
              <p key={i}>
                {worker}
                <MdOutlineClose
                  className={styles.removeIcon}
                  onClick={() => removeWorker(worker)}
                />
              </p>
            ))
          ) : (
            <p>No Workers</p>
          )}
        </div>

        <div className={styles.commitButton}>
          <button>Commit</button>
        </div>
        {edit && (
          <div className={styles.deleteButton}>
            <button>Delete</button>
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
            title='Solution Type'
            type='text'
            name='solutionType'
            onChange={handleWorkFormChange}
            value={workProcess.solutionType}
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
    </div>
  )
}

export default CreatePage
