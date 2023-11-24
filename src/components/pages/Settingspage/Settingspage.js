import './Settingspage.scss'

import useAuth from '../../hooks/useAuth'
import { Exit, Trash } from '../../SVG/Spinner'

import { useInput } from '../../hooks/useInput'

const Settingspage = () => {
    const newPassword = useInput('')
    // value, 
    // syncValue, 
    // setToInitialValue, 
    // trimValidation, 
    // errorMsg, 
    // clearError,
    // error

    const {user} = useAuth()
    console.log(user)

    const handlePasswordChange = () => {

        newPassword.clearError()
        newPassword.trimValidation('Строка пароля не должна быть пустой!')
        
        
        newPassword.setToInitialValue()
        // У меня для смены пароля уже написан pathcUser, только его нужно чуток поправить
        // Вернусь к этому функционалу, когда юзер будет в ЛС
        // dispatch(patchUser({userID, newPassword}))
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
                        <p>Сменить пароль</p>
                            <input 
                                type="text"
                                onChange={newPassword.syncValue} 
                                placeholder="Введите новый пароль"
                                value={newPassword.value}/>
                            <button onClick={handlePasswordChange}>Сменить пароль</button>
                            <p className="error-msg">{newPassword.errorMsg}</p>
                    </label>

                    <div className="extra-buttons">
                        <button className="delete">
                            <Trash/>
                            Удалить аккаунт
                        </button>
                        <button>
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