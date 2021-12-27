import React from 'react';
import Sidebar from './components/sidebar';
import NavBar from './components/navbar';
import './App.css';


function App() {
  return (
    <div className="App flex flex-row">
      <Sidebar></Sidebar>
      <div>
        <NavBar />
      </div>
    </div>
  );
}

export default App;
