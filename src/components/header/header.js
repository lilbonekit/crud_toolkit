import './header.scss'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { Profile } from '../SVG/Spinner'

import { Link, NavLink } from 'react-router-dom'

const Header = () => {
    const state = useSelector(state => state.currentUser)

    return(
        <header>
            <Link to="/" className="logo"><h1>В toolkit'e</h1></Link>
            <nav>
                <NavLink to="/">Главная</NavLink>
                {
                    state.isLogged ?
                        <Link to={`settings/${state.user.id}`} className="username"><Profile/> {state.user.username}</Link> :
                        <>
                            <NavLink to="login">Логин</NavLink>
                            <NavLink to="registration">Регистрация</NavLink>
                        </>
                }
            </nav>
        </header>
    )
}

export default Header