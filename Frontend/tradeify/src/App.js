import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom'
import Modal from 'react-modal';

import Login from './components/login';
import CreateUser from './components/createuser';
import Sidebar from './components/sidebar';
import NavBar from './components/navbar';
import MainSection from './components/mainsection'
import ForceLoginModal from './components/forceLoginModal'
import './App.css';

Modal.setAppElement('#root');

function App() {
  let navigate = useNavigate();
  const [user, setUser] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  function openLoginModal() {
    setModalOpen(true);
  }

  function onLoginSuccess(user) {
    setUser(user);
    closeLoginModal();
    navigate('../');
  }

  function closeLoginModal() {
    setModalOpen(false);
  }

  //// Get All Tradenotes
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
        console.log(result)
        return result;
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
          user == null ?
            <ForceLoginModal onLoginAction={openLoginModal} /> :
            <MainSection alltradenotes={[]} />
        }
      </div>
      <Modal
        className='w-96 h-fit-content bg-white rounded-md flex flex-col justify-center'
        overlayClassName='fixed inset-0 w-full flex flex-row justify-center items-center backgroundwithOpacity'
        isOpen={modalOpen}
        onAfterOpen={null}
        onRequestClose={null}
        contentLabel="Login"
      >
        <Routes>
          <Route path="/login" element={<Login onLoginSuccess={onLoginSuccess} />} />
          <Route path='/createuser' element={<CreateUser onCreateSuccess={onLoginSuccess} />} />
        </Routes>
      </Modal>
    </div>
  );
}

export default App;
