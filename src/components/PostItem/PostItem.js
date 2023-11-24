import './PostItem.scss'

import classNames from 'classnames'

import { patchData, deleteData } from '../store/postsSlice'

import { useDispatch } from 'react-redux'
import useAuth from '../hooks/useAuth'

import { useState, useEffect } from 'react'


const PostItem = ({id, username, comment, reactions : {lol, like, angry}}) => {

    const state = useAuth()
    const currentUsername = state.user.username

    const dispatch = useDispatch()

    const [localCurrentReaction, setLocalCurrentReaction] = useState(null);

    useEffect(() => {
        if(like.includes(currentUsername)) {
            setLocalCurrentReaction('like')
        } else if(lol.includes(currentUsername)) {
            setLocalCurrentReaction('lol')
        } else if(angry.includes(currentUsername)) {
            setLocalCurrentReaction('angry')
        }
    }, [])

    const getButtonClasses = (reactionsArray) => {
        return classNames('reaction__item', {
          'reaction__item-active': reactionsArray && reactionsArray.includes(currentUsername),
        });
      };
      


    // Меняем этот функционал
    // Передаём реакцию, логин пользователя и id поста
    // Если в массиве реакции есть такой пользователь, то удаляем его от туда
    // Если его нет, то записываем юзернейм в массив реакции
    // Вытаскиваем длинну массива с реакциями
    // Текущая реакция тоже записывается в стейт (пользователя), 
    // чтобы в UI отобразить класс активности, только конкретному пользователю
    const handleReaction = (e) => {
        let clickedDataReaction = e.target.getAttribute('data-reaction')

        if (clickedDataReaction === localCurrentReaction) {
            clickedDataReaction = null
        }
      
        // Обновляем локальный state
        setLocalCurrentReaction(clickedDataReaction)

        dispatch(patchData({id, clickedDataReaction, currentUsername}))
    }

    return(
        <li className="post" key={id}>
            <div className="content">
                <div className="avatar"></div>
                <div>
                    <div className="text">
                        <h4>{username}</h4>
                        <p>{comment}</p>
                    </div>
                    <div className="reaction__wrapper">
                        <button
                            disabled={!state.isLogged} 
                        // установил библиотеку classnames для оптимизации
                            className={getButtonClasses(lol)}
                            data-reaction="lol"
                            onClick={handleReaction}>🤣 
                            {lol.length}
                        </button>
                        <button
                            disabled={!state.isLogged}
                            className={getButtonClasses(like)} 
                            data-reaction="like"
                            onClick={handleReaction}>❤️
                            {like.length}
                        </button>
                        <button
                            disabled={!state.isLogged} 
                            className={getButtonClasses(angry)} 
                            data-reaction="angry"
                            onClick={handleReaction}>😡 
                            {angry.length}
                        </button>
                    </div>
                </div>
            </div>
            {username === state.user.username ?
                <button 
                className="reaction__item delete"
                onClick={() => dispatch(deleteData({id}))}>
                    🗑️ Удалить свой пост
                </button> :
                null
            }
        </li>
    )
}

export default PostItem