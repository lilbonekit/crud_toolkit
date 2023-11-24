import './Settingspage.scss'

import useAuth from '../../hooks/useAuth'
import { Exit, Spinner } from '../../SVG/Spinner'

import { patchUser, clearExtraMessage, clearUser } from '../../store/currentUserSlice'
import { useDispatch, useSelector } from 'react-redux'

import { useInput } from '../../hooks/useInput'
import { useState } from 'react'

const Settingspage = () => {
    const [showPasswordPanel, setShowPasswordPanel] = useState(false)
    const dispatch = useDispatch()
    const {extraMessage, status} = useSelector(state => state.currentUser)

    const newPassword = useInput('')

    const {user} = useAuth()

    const handlePasswordChange = () => {

        newPassword.clearError()
        newPassword.trimValidation('Строка пароля не должна быть пустой!')

        if(newPassword.value.trim().length !== 0) {
            dispatch(patchUser({id : user.id, newPassword : newPassword.value}))
            newPassword.setToInitialValue()
        }
    }

    const togglePanel = () => {
        setShowPasswordPanel(!showPasswordPanel)
        if (extraMessage && showPasswordPanel) {
            dispatch(clearExtraMessage())
        }
    }


    return(
        <section className="settings-page">
            <h2>Информация о пользователе</h2>
            <div className="info-block">
                <div>
                    <p>Логин</p>
                    <h3>{user.username}</h3>
                </div>
                <div>
                    <p>ID пользователя</p>
                    <h3>{user.id}</h3>
                </div>
                <div className="buttons">
                    <label className="change-password">
                        <p className="toggler" onClick={togglePanel}>Сменить пароль</p>
                        {
                            showPasswordPanel ?
                            <>
                                <input 
                                    type="text"
                                    onChange={newPassword.syncValue} 
                                    placeholder="Введите новый пароль"
                                    value={newPassword.value}/>
                                <button onClick={handlePasswordChange}>Сменить пароль</button>
                                <p className="error-msg">{newPassword.errorMsg}</p>
                                {
                                    extraMessage ?
                                    <p className="succes-msg">{extraMessage}</p> :
                                    null
                                }
                                {
                                    status === 'loading' ?
                                    <Spinner/> :
                                    null
                                }

                            </> :
                            null
                        }
                    </label>

                    <div className="extra-buttons">
                        <button className="red" onClick={() => dispatch(clearUser())}>
                            <Exit/>
                            Выйти с аккаунта
                        </button>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Settingspage