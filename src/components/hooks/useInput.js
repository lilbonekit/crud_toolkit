import { useState } from "react"

export const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue)
    const [errorMsg, setErrorMsg] = useState(null)
    const [error, setError] = useState(false)

    const syncValue = (e) => {

        const trimmedValue = e.target.value.trim();
        setValue((prevValue) => {
            if (trimmedValue.length === 0) {
                setError(true);
            } else if (prevValue.trim().length === 0) {
                setError(false);
            }
            return trimmedValue;
        });
        setErrorMsg(null);
    }

    const trimValidation = (msg = '') => {
        if (value.trim().length === 0) {
            setErrorMsg(msg)
            setError(true)
        } else {
            setErrorMsg(null)
        }
    }

    const clearError = () => {
        setError(false)
        setErrorMsg(null)
    }

    const setToInitialValue = () => {
        setValue(initialValue)
    }

    return {
            value, 
            syncValue, 
            setToInitialValue, 
            trimValidation, 
            errorMsg, 
            clearError,
            error
        }
}