import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom'
import Modal from 'react-modal';

import Login from './components/login';
import CreateUser from './components/createuser';
import Sidebar from './components/sidebar';
import NavBar from './components/navbar';
import MainSection from './components/mainsection'
import ForceLoginModal from './components/forceLoginModal'
import useTradenoteStore from './globalStates/tradenoteState';
import './App.css';
import PageSwitcher from './components/pageswitcher';
import NewTradenote from './components/newtradenote';

Modal.setAppElement('#root');

function App() {
  let navigate = useNavigate();
  const [isLoggedIn, setLogin] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const tradenotes = useTradenoteStore((state) => state.tradenotes);
  const setTradenotes = useTradenoteStore((state) => state.setTradenotes);

  function onLoginSuccess(user) {
    setUser(user);
    navigate('../app');
    GetAllTradenotes()
  }

  function onLoginAction() {
    navigate('../login')
    setLogin(true);
  }

  function GetAllTradenotes() {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      credentials: 'include'
    };

    return fetch(process.env.REACT_APP_DJANGO_API + "get_all_tradenotes", requestOptions)
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 401) {
          return null
        }
      })
      .then(result => {
        setTradenotes(result.Tradenotes);
      })
      .catch(error => {
        console.log('error', error)
        return null;
      });
  }

  return (
    <div className="App flex flex-row">
      <Sidebar user={user}></Sidebar>
      <div className='flex flex-col items-center w-full'>
        <NavBar title={'All Tradenotes'} />
        {
          /* isLoggedIn */ true ?
            <Routes>
              <Route path='/' element={<PageSwitcher />}>
                <Route path="/login" element={<Login onLoginSuccess={onLoginSuccess} />} />
                <Route path='/createuser' element={<CreateUser onCreateSuccess={onLoginSuccess} />} />
                <Route path='/app' element={<PageSwitcher />}>
                  <Route path='' element={<MainSection tradenotes={tradenotes} />} />
                  <Route path='new' element={<NewTradenote />} />
                </Route>
              </Route>
            </Routes>
            :
            <ForceLoginModal onLoginAction={onLoginAction} />
        }
      </div>
    </div>
  );
}


export default App;
