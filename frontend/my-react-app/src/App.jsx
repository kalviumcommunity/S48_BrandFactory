import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import UpdateBrand from './components/UpdateBrand';
import axios from 'axios';
import { useAuth } from './AuthContext';
import Cookies from 'js-cookie'

function App() {
  const [data, setData] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const { isLoggedIn, logout } = useAuth();
  const [users,setUsers] = useState([])

  useEffect(()=>{
    axios.get("http://localhost:8000/getUserData")
    .then(
      users=>{
        setUsers(users.data)}
    )
    .catch(err=>
      console.log(err)
    )
  },[])

  const username=Cookies.get('username')
  const [selectedUser , setSelectedUser] = useState(username)
  const handleSelectChange=(e)=>{
    setSelectedUser(e.target.value)
  }

  useEffect(() => {
    if (isLoggedIn) {
      axios.get('http://localhost:8000/getBrands')
        .then(res => setData(res.data))
        .catch(err => console.error(err));
    } else {
      setData([]);
    }
  }, [isLoggedIn]);

  const handleUpdate = (id) => {
    setIsUpdateModalOpen(true);
    setSelectedBrandId(id);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this brand?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8000/deleteBrand/${id}`);
        setData(data.filter(item => item._id !== id));
      } catch (error) {
        console.error('Error deleting brand:', error);
      }
    }
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedBrandId(null);
  };

  return (
    <div className='app'>
      <Navbar />
      {isLoggedIn ? (
        <>
          {isUpdateModalOpen && <UpdateBrand closeModal={handleCloseUpdateModal} brandId={selectedBrandId} />}
          <h1 className='welcome'>Welcome to BrandFactory</h1>
          <div align="center">
              <select  value={selectedUser} onChange={handleSelectChange}>
              {users.map((user,i)=>(
                <option key={i} value={user.Email}>{user.UserName}</option>
              ))}
            </select>
          </div>

          <div>
            {data.filter(brand=>brand.created_by==selectedUser).map((item) => (
              <div key={item._id} className="main">
                <h2>{item.BrandName}</h2>
                <h4>Description: {item.Description}</h4>
                <h4>History: {item.History}</h4>
                <h4>Founders: {item.Founders}</h4>
                <h4>Mission Statement: {item.MissionStatement}</h4>
                <h4>Selling Point: {item.SellingPoint}</h4>
                <h4>Quality Standards: {item.QualityStandards}</h4>
                <h4>Web Link: {item.WebLink}</h4>
                <button className="update-btn" onClick={() => handleUpdate(item._id)}>Update</button>
                <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
              </div>
            ))}
          </div>
          <div className='logout'>
            <button id='logout' onClick={()=>{logout();Cookies.remove('username');Cookies.remove('token')}}>LOGOUT</button>
          </div>
        </>
      ) : (
        <p id='notify'>Please log in to view brands</p>
      )}
    </div>
  );
}

export default App;
