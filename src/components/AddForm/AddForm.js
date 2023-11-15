import { useInput } from "../hooks/useInput"
import { useDispatch, useSelector } from "react-redux"
import { postData } from "../store/postsSlice"
import './Addform.scss'

const AddForm = () => {
    const dispatch = useDispatch()
    const {status} = useSelector(state => state.posts)

    const {value, syncValue, setToInitialValue} = useInput('')

    const onHandleSubmit = () => {
        if(value.trim().length) {
            dispatch(postData(value))
            setToInitialValue()
        }
    }

    return(
        <div className="add-panel">
            <textarea
                value={value}
                onChange={syncValue}
                placeholder="Напишите свой пост"/>
                <button
                    disabled={status !== 'idle'} 
                    onClick={onHandleSubmit}>
                    Отправить пост
                </button>
        </div>
    )
}

export default AddForm