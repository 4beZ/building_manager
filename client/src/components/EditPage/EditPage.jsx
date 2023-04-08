import React from "react"
import CreatePage from "../CreatePage/CreatePage"
import { testObject, testWorkProcess } from "../../testObject/testObject"
import { useParams } from "react-router-dom"

const EditPage = () => {
  const { id } = useParams()
  return (
    <CreatePage
      initialObject={testObject}
      initialWorkProcess={testWorkProcess}
      title='Edit'
    />
  )
}

export default EditPage
