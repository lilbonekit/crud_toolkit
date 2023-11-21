import './App.scss';

import Layout from './components/Layout/Layout';
import Mainpage from './components/pages/Mainpage/Mainpage';
import Regpage from './components/pages/Regpage/Regpage';
import Loginpage from './components/pages/Loginpage/Loginpage';
import NotFoundpage from './components/pages/404/404';
import Settingspage from './components/pages/Settingspage/Settingspage';

import { Routes, Route } from 'react-router';
import { useDispatch } from 'react-redux';
import { fetchPosts } from './components/store/postsSlice';
import { useEffect } from 'react';

import RequireAuth from './components/hocs/RequireAuth';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Mainpage/>}/>
          <Route path="login" element={<Loginpage/>}/>
          <Route path="registration" element={<Regpage/>}/>
          <Route path="*" element={<NotFoundpage/>}/>
          <Route path="settings/:id" element={
            <RequireAuth>
              <Settingspage/>
            </RequireAuth>
          }/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
