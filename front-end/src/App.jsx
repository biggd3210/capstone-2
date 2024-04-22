

// package imports
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
//Component imports
import Routes from './views/Routes';
import NavBar from './components/NavBar';
//CSS imports
import './App.css';

function App() {
  

  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar />
        <main>
          <Routes />
        </main>
        
        
      </BrowserRouter>
    </div>
  )
}

export default App
