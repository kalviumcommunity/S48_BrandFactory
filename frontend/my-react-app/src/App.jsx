import React, { useState, useEffect } from 'react';
import './App.css'; 
import Navbar from './components/Navbar';
import axios from 'axios';
import UpdateBrand from './components/UpdateBrand'; // Import UpdateBrand component

function App() {
  const [data, setData] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedBrandId, setSelectedBrandId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/getBrands')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  // Function to handle brand update
  const handleUpdate = (id) => {
    setIsUpdateModalOpen(true);
    setSelectedBrandId(id);
  };

  // Function to handle brand deletion
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this brand?');
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:8000/deleteBrand/${id}`);
        console.log(response.data);
        axios.get('http://localhost:8000/getBrands')
          .then(res => setData(res.data))
          .catch(err => console.error(err));
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
      {isUpdateModalOpen && <UpdateBrand closeModal={handleCloseUpdateModal} brandId={selectedBrandId} />}
      <h1 className='welcome'>Welcome to BrandFactory</h1>
      <div>
        {data.map((item) => (
          <div key={item._id} className="main">
            <h2>{item.BrandName}</h2>
            <h4>Description : {item.Description}</h4>
            <h4>History : {item.History}</h4>
            <h4>Founders : {item.Founders}</h4>
            <h4>Mission Statement : {item.MissionStatement}</h4>
            <h4>Selling Point : {item.SellingPoint}</h4>
            <h4>Quality Standards : {item.QualityStandards}</h4>
            <h4>Web Link : {item.WebLink}</h4>
            <button className="update-btn" onClick={() => handleUpdate(item._id)}>Update</button>
            <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
