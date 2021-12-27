import React from 'react';
import Sidebar from './components/sidebar';
import NavBar from './components/navbar';
import './App.css';


function App() {
  return (
    <div className="App flex flex-row">
      <Sidebar></Sidebar>
      <div className='w-full'>
        <NavBar title={'All Tradenotes'}/>
      </div>
    </div>
  );
}

export default App;
