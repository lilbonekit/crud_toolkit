import './LoginForm.scss'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useInput } from '../hooks/useInput'
import { getUser } from '../store/currentUserSlice'
import { Spinner } from '../SVG/Spinner'

const LoginForm = () => {
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

        if(!username.error && !password.error && username.value && password.value) {

            const newUser = {
                username : username.value,
                password : password.value,
            }
            
            const isLogged = true
        
            dispatch(getUser({newUser, isLogged}))
    
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
                           placeholder="Введите имя пользователя"
                           value={username.value}
                           onChange={username.syncValue}/>
                           <p className="error-msg">{username.errorMsg}</p>
                </label>
                <label>
                    <input type="password"
                           placeholder="Введите пароль"
                           className={password.errorMsg ? "input-error" : null} 
                           value={password.value}
                           onChange={password.syncValue}/>
                           <p className="error-msg">{password.errorMsg}</p>
                </label>
                {error ? <p className="error-msg">{error}</p> : null}
                <input
                    disabled={status === 'loading'}  
                    type="submit" 
                    value="Авторизироваться"/>
                    {status === 'loading' ? <Spinner/> : null}
                <Link to="/registration" className="login-btn">Нет аккаунта?</Link>
            </form>
        </>
    )
}

export default LoginForm