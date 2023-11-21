import './Settingspage.scss'

import useAuth from '../../hooks/useAuth'
import { Exit, Trash } from '../../SVG/Spinner'

const Settingspage = () => {
    const {user} = useAuth()
    console.log(user)
    // const id = useParams()
    // console.log(id)

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
                    <label>
                        <p>Сменить пароль</p>
                        <input type="text" placeholder="Введите новый пароль"/>
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