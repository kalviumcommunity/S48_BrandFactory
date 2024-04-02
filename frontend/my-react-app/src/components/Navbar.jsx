// Navbar.js
import React, { useState } from 'react';
import './Navbar.css'; // Import CSS file for styling
import Modal from './Profile.jsx'; // Import Modal component

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to toggle modal state
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">BRAND FACTORY</div>
       
        <div className="icons">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828970.png"
            className="icon"
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/1946/1946488.png"
            className="icon"
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
            className="icon"
            onClick={toggleModal} // Open modal on click
          />
        </div>
      </div>
      {/* Render modal if isModalOpen is true */}
      {isModalOpen && <Modal closeModal={toggleModal} />}
    </nav>
  );
}

export default Navbar;