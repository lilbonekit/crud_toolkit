import './App.scss';
import Mainpage from './components/pages/Mainpage';
import Header from './components/header/header';
import { useDispatch } from 'react-redux';
import { fetchPosts } from './components/store/postsSlice';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])
  
  return (
    <div className="App">
      <Header/>
      <Mainpage/>
    </div>
  );
}

export default App;
