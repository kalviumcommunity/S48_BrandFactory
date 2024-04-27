const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const routes = require('./routes');
const { factoryModel, factoryValidationSchema } = require('./Models/brands.js');
const { userModel, userValidationSchema } = require('./Models/users.js');
require('dotenv').config();

const app = express();
const port = 8000;

// MongoDB URI from environment variables
const uri = process.env.mongoURi;

// Middleware
app.use(cors());
app.use(express.json());
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));

// Database connection
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Routes
app.use('/', routes);

// Brand Endpoints
app.post('/addBrand', async (req, res) => {
    try {
      const validationResult = await factoryValidationSchema.validateAsync(req.body);
      const data = await factoryModel.create(validationResult);
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: 'Validation Error' });
    }
});

app.put('/updateBrand/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await factoryModel.findByIdAndUpdate(id, req.body);
        res.json({ message: 'Brand updated successfully' });
    } catch (error) {
        console.error('Error updating brand:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

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

// User Endpoints
app.post('/postUserData', async (req, res) => {
    try {
      const validationResult = await userValidationSchema.validateAsync(req.body);
      const data = await userModel.create(validationResult);
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: 'Validation Error' });
    }
});

app.get('/getUserData', (req, res) => {
    userModel.find()
        .then(users => res.json(users))
        .catch(err => res.json(err))
});

app.post('/register', async (req, res) => {
    try {
      const { value, error } = userValidationSchema.validate(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });

      const existingUser = await userModel.findOne({ Email: value.Email });
      if (existingUser) {
        return res.status(409).json({ message: "Email already in use" });
      }

      const user = new userModel(value);
      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/login', async (req, res) => {
    const { Email, Password } = req.body;
    const user = await userModel.findOne({ Email });
    if (user && await bcrypt.compare(Password, user.Password)) {
        req.session.userId = user._id;  // Set user session
        res.json({ message: "Logged in successfully" });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

app.get('/logout', function (req, res) {
  req.session.destroy(() => {
    res.json({ message: "Logged out successfully" });
  });
});

// Middleware to check if user is logged in
function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        return next();
    }
    res.status(401).json({ error: 'Unauthorized' });
}

// Start server
if (require.main === module) {
    app.listen(port, () => {
        console.log(`🚀 server running on PORT: ${port}`);
    });
}

module.exports = app;
