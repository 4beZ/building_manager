import React from "react"

const InfoDiv = ({ title, value = "value" }) => {
  return (
    <div>
      <p>{title}</p>
      <p>{value}</p>
    </div>
  )
}

export default InfoDiv
