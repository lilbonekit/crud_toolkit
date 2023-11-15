import { useSelector } from "react-redux/es/hooks/useSelector"
import Spinner from "../Spinner/Spinner"

import PostItem from "../PostItem/PostItem"

import './PostsList.scss'

const PostsList = () => {
    const posts = useSelector(state => state.posts.posts)
    const {status, error} = useSelector(state => state.posts)

    return(
        <ul className="posts-list">
            {status === 'pending' && <Spinner/>} 
            {error && <h2 style={{textAlign: 'center'}}>{error}</h2>}
            {[...posts].reverse().map(post => <PostItem key={post.id} {...post}/>)}
        </ul>
    )
}

export default PostsList