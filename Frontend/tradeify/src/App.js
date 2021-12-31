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

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="App flex flex-row">
      <Sidebar></Sidebar>
      <div className='w-full'>
        <NavBar title={'All Tradenotes'} />
        <MainSection />
        <Link to="/login">
          <button onClick={openModal}>Open Modal</button>
        </Link>
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
          <Route path="/login" element={<Login onLoginSuccess={null} onLoginFail={null} />} />
          <Route path='/createuser' element={<CreateUser />} />
        </Routes>
      </Modal>
    </div>
  );
}

export default App;
