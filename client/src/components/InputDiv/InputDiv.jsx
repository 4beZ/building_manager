import React from "react"

const InputDiv = ({
  title,
  type,
  name,
  onChange,
  value,
  min = "1",
  max = "100",
}) => {
  return (
    <div>
      <p>{title}</p>
      <input
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        min={min}
        max={max}
      />
    </div>
  )
}

export default InputDiv
