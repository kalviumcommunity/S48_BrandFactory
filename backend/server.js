const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const routes = require('./routes');
const {factoryModel,factoryValidationSchema} = require('./Models/brands.js');
const mongoose = require('mongoose');

require('dotenv').config();

const uri = process.env.mongoURi;
const {userModel,userValidationSchema} = require('./Models/users.js');

app.use(cors());
app.use(express.json());

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.use('/', routes);

// Create a new Brand
app.post('/addBrand', async (req, res) => {
    try {
      const validationResult = await factoryValidationSchema.validateAsync(req.body);
      console.log(req.body.createdby)
      const data = await factoryModel.create(validationResult);
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: 'Validation Error' });
    }
  });
  

// Update brand by ID
app.put('/updateBrand/:id', async (req, res) => {
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
app.delete('/deleteBrand/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await factoryModel.findByIdAndDelete(id);
        res.json({ message: 'Brand deleted successfully' });
    } catch (error) {
        console.error('Error deleting brand:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/getBrands', (req, res) => {
    factoryModel.find()
        .then(brands => res.json(brands))
        .catch(err => res.json(err))
});

app.post('/postUserData', async (req, res) => {
    try{
      const validationResult = await userValidationSchema.validateAsync(req.body);
      const data = await userModel.create(validationResult);
      res.json(data);
    }catch(err){
      console.error(err);
      res.status(400).json({ error: 'Validation Error' });
    }
  });

app.get('/getUserData', (req, res) => {
    userModel.find()
        .then(users => res.json(users))
        .catch(err => res.json(err))
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`🚀 server running on PORT: ${port}`);
    });
}

module.exports = app;
