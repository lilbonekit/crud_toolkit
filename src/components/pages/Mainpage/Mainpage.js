import AddForm from '../../AddForm/AddForm';
import PostsList from '../../PostsList/PostsList';

import './Mainpage.scss'

const Mainpage = () => {
    return(
        <section className="main-page">
            <AddForm/>
            <PostsList/>
        </section>
    )
}

export default Mainpage