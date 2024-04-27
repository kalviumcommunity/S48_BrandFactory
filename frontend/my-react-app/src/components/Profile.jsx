import React, { useState } from 'react';
import axios from 'axios';
import './Profile.css';
import { useAuth } from '../AuthContext'; // Ensure AuthContext is correctly defined and exported in AuthContext.js
import Cookies from 'js-cookie';
function Profile({ closeModal }) {
  const [formData, setFormData] = useState({ UserName: '', Email: '', Password: '' });
  const [errors, setErrors] = useState({});
  const { login } = useAuth(); // Use login from context

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the form data to the specified API endpoint
      await axios.post('http://localhost:8000/postUserData', formData);
      alert('User profile saved successfully!');
      login(); // Set login state to true
      Cookies.set('username',formData.Email)
      closeModal();

      // Optionally fetch user data right after saving
      const userDataResponse = await axios.get('http://localhost:8000/getUserData');
      console.log('User data:', userDataResponse.data);
    } catch (error) {
      console.error('Error saving user profile:', error);
      // Handle errors more gracefully here
      // e.g., setErrors({ global: "Failed to save user profile" });
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className='log'>Login or Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="UserName" value={formData.UserName} onChange={handleChange} />
            {errors.UserName && <span className="error">{errors.UserName}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="Email">Email:</label>
            <input type="email" id="Email" name="Email" value={formData.Email} onChange={handleChange} />
            {errors.Email && <span className="error">{errors.Email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="Password">Password:</label>
            <input type="password" id="Password" name="Password" value={formData.Password} onChange={handleChange} />
            {errors.Password && <span className="error">{errors.Password}</span>}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
