import React from "react"

const InputDiv = ({ title, type, name, onChange, value }) => {
  return (
    <div>
      <p>{title}</p>
      <input
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        min='1'
        max='100'
      />
    </div>
  )
}

export default InputDiv
