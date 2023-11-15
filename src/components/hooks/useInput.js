import { useState } from "react"

export const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue)

    const syncValue = (e) => {
        setValue(e.target.value)
    }

    const setToInitialValue = () => {
        setValue(initialValue)
    }

    return {value, syncValue, setToInitialValue}
}