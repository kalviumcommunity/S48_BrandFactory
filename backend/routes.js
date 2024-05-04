const express = require('express');
const router = express.Router();
const {factoryModel,factoryValidationSchema} = require('./Models/brands.js');

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