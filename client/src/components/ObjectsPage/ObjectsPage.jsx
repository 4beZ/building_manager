import React, { useState, useEffect, useCallback, useContext } from "react"
import styles from "./ObjectsPage.module.scss"
import { useHttp } from "../../hooks/http.hook"
import Object from "../Object/ObjectOne"
import { VscListSelection } from "react-icons/vsc"
import { Context } from "../../context/Context"

const ObjectsPage = () => {
  const { isAdmin } = useContext(Context)
  const [searchValue, setsearchValue] = useState("")
  const [objects, setobjects] = useState([])
  const [sortWindow, setsortWindow] = useState(false)
  const { loading, request } = useHttp()

  const toggleSortWindow = () => {
    setsortWindow((s) => !s)
  }

  const getObjects = useCallback(async () => {
    try {
      if (isAdmin) {
        const data = await request("/api/objects/all")
        setobjects(data)
      } else {
        const data = await request("/api/objects")
        setobjects(data)
      }
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
              <Object object={object} key={object._id} />
            ))}
        </div>
      )}
    </>
  )
}

export default ObjectsPage
