import React from 'react';
import Modal from 'react-modal';
import Login from './components/login';
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
        <button onClick={openModal}>Open Modal</button>
      </div>
      <Modal
        className='w-96 h-fit-content bg-white rounded-md flex flex-col justify-center'
        overlayClassName='fixed inset-0 w-full flex flex-row justify-center items-center bg-slate-400 opacity-75'
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Login"
      >
        <Login onLoginSuccess={null} onLoginFail={null} />
      </Modal>
    </div>
  );
}

export default App;
