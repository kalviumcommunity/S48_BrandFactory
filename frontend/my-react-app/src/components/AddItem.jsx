import React, { useState } from 'react';
import axios from 'axios';
import './AddItem.css'; 

function Profile({ closeModal }) {
  const [formData, setFormData] = useState({ BrandName: '', Description: '', History: '', Founders: [], MissionStatement: '', SellingPoint: [], QualityStandards: [], WebLink: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddBrand = async () => {
    try {
      // Send the form data to the specified API endpoint
      await axios.post('http://localhost:8000/addBrand', formData);
      alert('Brand added successfully!');
      closeModal();

      // Fetch the updated brand list after adding
      const brandDataResponse = await axios.get('http://localhost:8000/getBrands');
      console.log('Brand data:', brandDataResponse.data);
    } catch (error) {
      console.error('Error adding brand:', error);
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className='log'>Add New Brand</h2>
        <form>
          <div className="form-group">
            <label htmlFor="BrandName">Brand Name:</label>
            <input type="text" id="BrandName" name="BrandName" value={formData.BrandName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="Description">Description:</label>
            <input type="text" id="Description" name="Description" value={formData.Description} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="History">History:</label>
            <input type="text" id="History" name="History" value={formData.History} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="Founders">Founders:</label>
            <input type="text" id="Founders" name="Founders" value={formData.Founders} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="MissionStatement">Mission Statement:</label>
            <input type="text" id="MissionStatement" name="MissionStatement" value={formData.MissionStatement} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="SellingPoint">Selling Point:</label>
            <input type="text" id="SellingPoint" name="SellingPoint" value={formData.SellingPoint} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="QualityStandards">Quality Standards:</label>
            <input type="text" id="QualityStandards" name="QualityStandards" value={formData.QualityStandards} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="WebLink">Web Link:</label>
            <input type="text" id="WebLink" name="WebLink" value={formData.WebLink} onChange={handleChange} />
          </div>
          <button type="button" onClick={handleAddBrand}>Add Brand</button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
