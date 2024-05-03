import React, { useState } from 'react';
import './Navbar.css';
import Modal from './AddItem.jsx'; 
import Profile from './Profile.jsx';
function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileopen, setIsProfileOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileopen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">BRAND FACTORY</div>
       
        <div className="icons">
          <img
            src="https://cdn-icons-png.flaticon.com/512/992/992651.png"
            className="icon"
            onClick={toggleModal} 
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/1946/1946488.png"
            className="icon"
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
            className="icon"
            onClick={toggleProfile}
          />
        </div>
      </div>
      {isModalOpen && <Modal closeModal={toggleModal} />}
      {isProfileopen && <Profile closeModal={toggleProfile} />}
    </nav>
  );
}

export default Navbar;
