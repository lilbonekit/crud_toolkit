import './RegForm.scss'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useInput } from '../hooks/useInput'
import { createUser } from '../store/currentUserSlice'
import { Spinner } from '../SVG/Spinner'

const RegForm = () => {
    const dispatch = useDispatch()

    const {error, status} = useSelector(state => state.currentUser)

    const username = useInput('')
    const password = useInput('')

    const handleSubmit = (e) => {
        e.preventDefault()

        username.clearError()
        password.clearError()

        username.trimValidation('Строка логина не должна быть пустой!')
        password.trimValidation('Строка пароля не должна быть пустой!')

        const id = Math.random() + new Date().toISOString()

        if(!username.error && !password.error && username.value && password.value) {
            const newUser = {
                username : username.value,
                password : password.value,
                id,
                interactedPostsID: [],
                currentReaction: null
            }
            
            const isLogged = true
        
            dispatch(createUser({newUser, isLogged}))
    
            username.setToInitialValue()
            password.setToInitialValue()
        }

    }

    return(
        <>
            <form className="regForm" onSubmit={handleSubmit}>
                <label>
                    <input type="text"
                           className={username.errorMsg ? "input-error" : null} 
                           placeholder="Придумайте логин"
                           value={username.value}
                           onChange={username.syncValue}/>
                           <p className="error-msg">{username.errorMsg}</p>
                </label>
                <label>
                    <input type="password"
                           placeholder="Придумайте пароль"
                           className={password.errorMsg ? "input-error" : null} 
                           value={password.value}
                           onChange={password.syncValue}/>
                           <p className="error-msg">{password.errorMsg}</p>
                </label>
                {error ? <p className="error-msg">{error}</p> : null}
                <input
                    disabled={status === 'loading'} 
                    type="submit" 
                    value="Зарегистироваться"/>
                    {status === 'loading' ? <Spinner/> : null}
                <Link to="/login" className="login-btn">Уже есть аккаунт?</Link>
            </form>
        </>
    )
}

export default RegForm