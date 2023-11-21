import './PostItem.scss'
import classNames from 'classnames';
import { patchData, deletePost } from '../store/postsSlice'
import { useDispatch } from 'react-redux'
import useAuth from '../hooks/useAuth';
import { useRef } from 'react'


const PostItem = ({id, username, comment, reactions : {lol, like, angry}, currentReaction}) => {

    const state = useAuth()
    
    //Мне нужны изначальные значения, потому что я буду откатываться к ним
    const referalValues = useRef({lol, like, angry}).current  
    const dispatch = useDispatch()


    // Функция для инкремента
    const increaseReaction = (reaction, values) => {
        values[reaction]++;
    };

    const handleReaction = (e) => {
        let clickedDataReaction = e.target.getAttribute('data-reaction')

        if(clickedDataReaction === currentReaction) {
            clickedDataReaction = null
        }

        const newReactionsObject = { ...referalValues };

        // Намного лучше, чем большой switch case
        if (['lol', 'angry', 'like'].includes(clickedDataReaction)) {
            increaseReaction(clickedDataReaction, newReactionsObject);
        }

        // Патчим данные на сервер, а потом в стейт
        dispatch(patchData({id, clickedDataReaction, newReactionsObject}))
    }

    const getButtonClasses = (reactionType) => {
        return classNames('reaction__item', {
          'reaction__item-active': currentReaction === reactionType,
        });
      };

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
                        // установил библиотеку classnames для оптимизации
                            className={getButtonClasses('lol')}
                            data-reaction="lol"
                            onClick={handleReaction}>🤣 
                            {lol}
                        </button>
                        <button
                            className={getButtonClasses('like')} 
                            data-reaction="like"
                            onClick={handleReaction}>❤️
                            {like}
                        </button>
                        <button 
                            className={getButtonClasses('angry')} 
                            data-reaction="angry"
                            onClick={handleReaction}>😡 
                            {angry}
                        </button>
                    </div>
                </div>
            </div>
            {username === state.user.username ?
                <button 
                className="reaction__item delete"
                onClick={() => dispatch(deletePost({id}))}>
                    🗑️ Удалить свой пост
                </button> :
                null
            }
        </li>
    )
}

export default PostItem