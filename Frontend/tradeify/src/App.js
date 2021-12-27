import React from 'react';
import Sidebar from './components/sidebar';
import './App.css';


function App() {
  return (
    <div className="App flex flex-row">
      <Sidebar></Sidebar>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
