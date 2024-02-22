const express = require('express');
const router = express.Router();

let brands = [
    { id: 1, name: 'H&M', website:'https://www2.hm.com/en_in/index.html' },
    { id: 2, name: 'HRX', website:'https://hrxbrand.com/home' }
];

// GET all brands
router.get('/brands', (req, res) => {
    res.json(brands);
});

// GET a single brand by ID
router.get('/brands/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const brand = brands.find(brand => brand.id === id);
    if (brand) {
      res.json(brand);
    } else {
      res.status(404).json({ message: 'Brand not found' });
    }
});

// Create (POST) a new user
router.post('/brands', (req, res) => {
    const { name, website } = req.body;
    const newBrand = {
        id: brands.length + 1, 
        name : 'ZARA',
        website: 'https://www.zara.com/in/'
    };
    brands.push(newBrand);
    res.status(201).json(newBrand);
});

// Update (PUT) an existing user
router.put('/brands/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = brands.findIndex(brand => brand.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Brand not found' });
    }
    const { name, website } = req.body;
    brands[index].name = name;
    brands[index].website = website;
    res.json(brands[index]);
});


// Delete (DELETE) a user by ID
router.delete('/brands/:id', (req, res) => {
    const id = parseInt(req.params.id);
    brands = brands.filter(brand => brand.id !== id);
    res.json({ message: 'Brand deleted successfully' });
});

module.exports = router;