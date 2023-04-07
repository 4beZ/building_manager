import React, { useState, useEffect, useCallback } from "react"
import styles from "./ObjectsPage.module.scss"
import { useHttp } from "../../hooks/http.hook"
import Object from "../Object/Object"
import { VscListSelection } from "react-icons/vsc"

const ObjectsPage = () => {
  const [objects, setobjects] = useState([])
  const { loading, error, request } = useHttp()

  const getObjects = useCallback(async () => {
    try {
      const data = await request("https://jsonplaceholder.typicode.com/users")
      setobjects(data)
      console.log(data)
    } catch (e) {
      console.error(e)
    }
  }, [request])

  useEffect(() => {
    getObjects()
  }, [getObjects])

  return (
    <>
      {loading ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        <div className={styles.objects}>
          <div className={styles.options}>
            <div>
              <input placeholder='Search' />
            </div>
            <div>
              <VscListSelection />
            </div>
          </div>
          {objects.map((object) => (
            <Object object={object} key={object.id} />
          ))}
        </div>
      )}
    </>
  )
}

export default ObjectsPage
