import './404.scss'
import { Link } from 'react-router-dom'

const NotFoundpage = () => {
    return(
        <section className="not-found">
            <div>
                <h1>404</h1>
                <p>Страница не найдена</p>
                <Link to="/" className="back-btn">Вернуться на главную</Link>
            </div>
        </section>
    )
}

export default NotFoundpage