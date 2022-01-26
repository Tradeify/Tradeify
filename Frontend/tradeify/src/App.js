import React from 'react';
import { Route, Routes, Link } from 'react-router-dom'
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

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
  }

  function closeModal() {
    setIsOpen(false);
  }

  function loginUser(user) {
    setUser(user);
    closeModal();
  }

  return (
    <div className="App flex flex-row">
      <Sidebar user={user}></Sidebar>
      <div className='flex flex-col items-center w-full'>
        <NavBar title={'All Tradenotes'} />
        <Link to="/login">
          <button style={{ display: "none" }} onClick={openModal}>Open Modal</button>
        </Link>
        <MainSection />
      </div>
      <Modal
        className='w-96 h-fit-content bg-white rounded-md flex flex-col justify-center'
        overlayClassName='fixed inset-0 w-full flex flex-row justify-center items-center bg-slate-400 opacity-75'
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
