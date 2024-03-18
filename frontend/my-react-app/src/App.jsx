import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  return(
    <div>
      <Routes>
        <Route path="/" element={<About />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/Login" element={<Login />}></Route>
      </Routes>
    </div>
  )
}

export default App;