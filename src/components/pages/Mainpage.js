import AddForm from '../../components/AddForm/AddForm';
import PostsList from '../../components/PostsList/PostsList';

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