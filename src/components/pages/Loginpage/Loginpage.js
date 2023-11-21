import LoginForm from "../../LoginForm/LoginForm"

import { useNavigate } from "react-router"
import useAuth from "../../hooks/useAuth"
import { useEffect } from "react"

const Loginpage = () => {
    const navigate = useNavigate()
    const {isLogged} = useAuth()

    useEffect(() => {
        if(isLogged) {
            navigate('/', {replace: true})
        }
    }, [isLogged, navigate])

    return(
        <section className="login-page">
            <h1>Авторизация пользователя</h1>
            <LoginForm/>
        </section>
    )
}

export default Loginpage