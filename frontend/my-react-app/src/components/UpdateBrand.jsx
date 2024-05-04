import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateBrand({ closeModal, brandId }) {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/getBrand/${brandId}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching brand data:', error);
      }
    };
    fetchBrandData();
  }, [brandId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:8000/updateBrand/${brandId}`, formData);
      alert('Brand updated successfully!');
      closeModal();
    } catch (error) {
      console.error('Error updating brand:', error);
    }
    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className='log'>Update Brand</h2>
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
          <button type="button" onClick={handleUpdate} disabled={loading}>{loading ? 'Updating...' : 'Update Brand'}</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateBrand;
