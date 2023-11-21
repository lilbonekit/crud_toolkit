import { useInput } from "../hooks/useInput"
import { useDispatch, useSelector } from "react-redux"
import { postData } from "../store/postsSlice"
import useAuth from "../hooks/useAuth"
import './Addform.scss'

const AddForm = () => {

    const dispatch = useDispatch()
    const {status} = useSelector(state => state.posts)
    const {username} = useSelector(state => state.currentUser.user)

    const {isLogged} = useAuth()

    const {value, syncValue, setToInitialValue} = useInput('')

    const onHandleSubmit = () => {
        if(value.trim().length) {
            dispatch(postData({value, username}))
            setToInitialValue()
        }
    }

    return(
        <div className="add-panel">
            {
                isLogged ?
                <>
                    <textarea
                        value={value}
                        onChange={syncValue}
                        placeholder="Напишите свой пост"/>
                    <button
                        disabled={status !== 'idle'} 
                        onClick={onHandleSubmit}>
                        Отправить пост
                    </button>
                </> :
                <h2>Авторизируйтесь, чтобы оставлять посты</h2>
            }
        </div>
    )
}

export default AddForm