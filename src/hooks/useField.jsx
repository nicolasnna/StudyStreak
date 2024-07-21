import { useState } from "react"

const useField = () => {
  const [value, setValue] = useState("")

  const changeValue = (e) => {
    e.preventDefault()
    setValue(e.target.value)
  }

  const clean = () => {
    setValue("")
  }

  return {
    value,
    changeValue,
    clean 
  }

}

export default useField