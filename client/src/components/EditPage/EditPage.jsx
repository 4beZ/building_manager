import { useCallback, useEffect, useState } from "react"
import CreatePage from "../CreatePage/CreatePage"
import { useParams } from "react-router-dom"
import { useHttp } from "../../hooks/http.hook"

const EditPage = () => {
  const { id } = useParams()
  const [object, setobject] = useState({})
  const [workProcess, setworkProcess] = useState({})
  const [workGroup, setworkGroup] = useState([])
  const { loading, request } = useHttp()

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
    <p>Loading</p>
  ) : (
    <CreatePage
      initialObject={object}
      initialWorkProcess={workProcess}
      initialWorkGroup={workGroup}
      title='Edit'
      edit={true}
    />
  )
}

export default EditPage
