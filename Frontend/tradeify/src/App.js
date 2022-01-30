import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom'
import Modal from 'react-modal';
import Login from './components/login';
import CreateUser from './components/createuser';
import Sidebar from './components/sidebar';
import NavBar from './components/navbar';
import MainSection from './components/mainsection'
import './App.css';

Modal.setAppElement('#root');

function App() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [performRequest, setPerformRequest] = React.useState(true);
  const [redirectLogin, setRedirectLogin] = React.useState(process.env.REACT_APP_FRONTEND_DOMAIN + '/');

  let navigate = useNavigate();

  function openModal() {
    setPerformRequest(false);
    navigate('../login');
    setIsOpen(true);
  }

  function afterOpenModal() {
  }

  function closeModal() {
    setIsOpen(false);
    navigate(redirectLogin);
  }

  function loginUser(user) {
    setUser(user);
    closeModal();
    setPerformRequest(true);
  }

  return (
    <div className="App flex flex-row">
      <Sidebar user={user}></Sidebar>
      <div className='flex flex-col items-center w-full'>
        <NavBar title={'All Tradenotes'} />

        <MainSection requireLogin={openModal} performRequest={performRequest} spc={setPerformRequest} path={setRedirectLogin} />
      </div>
      <Modal
        className='w-96 h-fit-content bg-white rounded-md flex flex-col justify-center'
        overlayClassName='fixed inset-0 w-full flex flex-row justify-center items-center backgroundwithOpacity'
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Login"
      >
        <Routes>
          <Route path="/login" element={<Login onLoginSuccess={loginUser} />} />
          <Route path='/createuser' element={<CreateUser />} />
        </Routes>
      </Modal>
    </div>
  );
}

export default App;
