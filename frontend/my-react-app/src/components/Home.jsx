import React from 'react'
import './styles.css'
import Imagelogo from '../assets/Imagelogo.png'
import Imagename from '../assets/Imagename.png'
import Signup from './Signup';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div id='logo'>
      <img id='imglogo' src={Imagelogo} alt="" />
      <img id='imgname' src={Imagename} alt="" />
      <div className="top-bar">
        <Link to="/Signup" className="login-signup-btn">SignUp/Login</Link>
      </div>
    </div>
  )
}
