import { useInput } from "../hooks/useInput"
import { useDispatch, useSelector } from "react-redux"
import { postData } from "../store/postsSlice"
import useAuth from "../hooks/useAuth"
import './Addform.scss'
import { useState } from "react"

const AddForm = () => {

    const dispatch = useDispatch()
    const {status} = useSelector(state => state.posts)
    const {username} = useSelector(state => state.currentUser.user)

    const {isLogged} = useAuth()

    // Не подошёл сюда кастомный инпут
    const [value, setValue] = useState('')
    console.log(value)

    const onHandleSubmit = () => {
        if(value.trim().length !== 0 && value.length < 50) {
            dispatch(postData({value, username}))
            setValue('')
        }
    }

    return(
        <div className="add-panel">
            {
                isLogged ?
                <>
                    <textarea
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Напишите свой пост"/>
                    {
                        value.length > 50 ?
                        <p className="error-msg">Длина поста не может быть больше 50 символов!</p> :
                        null
                    }
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