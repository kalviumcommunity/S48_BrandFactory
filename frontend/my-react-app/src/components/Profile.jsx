import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuth } from '../AuthContext';
import './Profile.css';

function Profile({ closeModal }) {
  const [formData, setFormData] = useState({ UserName: '', Email: '', Password: '' });
  const [isLogin, setIsLogin] = useState(true);
  const [errors, setErrors] = useState({});
  const { login } = useAuth(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:8000/${isLogin ? 'login' : 'register'}`;

    try {
      const response = await axios.post(url, formData);
      alert(response.data.message);

      if (isLogin) {
        login();
        Cookies.set('username', formData.Email);
        Cookies.set('token', response.data.accesstoken);
      } else {
      }

      closeModal();
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : "Network Error");
      setErrors(error.response ? error.response.data : { global: "Network Error" });
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className='log'>{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="UserName">Name:</label>
              <input type="text" id="UserName" name="UserName" value={formData.UserName} onChange={handleChange} />
              {errors.UserName && <span className="error">{errors.UserName}</span>}
            </div>
          )}
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
          <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
          <button type="button" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Need to register?' : 'Already have an account?'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
