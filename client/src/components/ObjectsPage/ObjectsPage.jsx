import React, { useState, useEffect, useCallback } from "react"
import styles from "./ObjectsPage.module.scss"
import { useHttp } from "../../hooks/http.hook"
import Object from "../Object/Object"
import { VscListSelection } from "react-icons/vsc"

const ObjectsPage = () => {
  const [searchValue, setsearchValue] = useState("")
  const [objects, setobjects] = useState([])
  const [sortWindow, setsortWindow] = useState(false)
  const { loading, error, request } = useHttp()

  const toggleSortWindow = () => {
    setsortWindow((s) => !s)
    console.log(sortWindow)
  }

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
              <input
                placeholder='Search'
                value={searchValue}
                onChange={(e) => setsearchValue(e.target.value)}
              />
            </div>
            <div>
              <VscListSelection onClick={toggleSortWindow} />
            </div>
            {sortWindow && (
              <div className={styles.sort}>
                <div>1</div>
                <div>2</div>
                <div>3</div>
              </div>
            )}
          </div>
          {objects
            .filter((obj) => obj.name.toLowerCase().includes(searchValue))
            .map((object) => (
              <Object object={object} key={object.id} />
            ))}
        </div>
      )}
    </>
  )
}

export default ObjectsPage
