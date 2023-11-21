import './Regpage.scss'
import RegForm from '../../RegForm/RegForm'
import { useNavigate } from 'react-router'
import useAuth from '../../hooks/useAuth'
import { useEffect } from 'react'

const Regpage = () => {
    const navigate = useNavigate()
    const {isLogged} = useAuth()

    useEffect(() => {
        if(isLogged) {
            navigate('/', {replace: true})
        }
    }, [isLogged, navigate])

    return(
        <section className="reg-page">
            <h1>Регистрация пользователя</h1>
            <RegForm/>
        </section>
    )
}

export default Regpage