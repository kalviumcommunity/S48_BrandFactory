const express = require('express');
const router = express.Router();
const factoryModel = require('./Models/brands.js');

// Add brand
// router.post('/addBrand', async (req, res) => {
//     const newBrandData = req.body;
//     try {
//         await factoryModel.create(newBrandData);
//         res.json({ message: 'Brand added successfully' });
//     } catch (error) {
//         console.error('Error adding brand:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// Update brand by ID
router.put('/updateBrand/:id', async (req, res) => {
    const { id } = req.params;
    const updatedBrandData = req.body;
    try {
        await factoryModel.findByIdAndUpdate(id, updatedBrandData);
        res.json({ message: 'Brand updated successfully' });
    } catch (error) {
        console.error('Error updating brand:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete brand by ID
router.delete('/deleteBrand/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await factoryModel.findByIdAndDelete(id);
        res.json({ message: 'Brand deleted successfully' });
    } catch (error) {
        console.error('Error deleting brand:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get brand by ID
router.get('/getBrand/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const brand = await factoryModel.findById(id);
        res.json(brand);
    } catch (error) {
        console.error('Error fetching brand:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
