const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const routes = require('./routes');
const factoryModel = require('./Models/brands.js')
require('dotenv').config();

const uri = process.env.mongoURi;
const mongoose = require('mongoose')
const userModel = require('./Models/users.js');

app.use(cors())
app.use(express.json())

mongoose.connect(uri,{
  useNewUrlParser:true,
  useUnifiedTopology:true
})

.then(() => {
  console.log('MongoDB connected successfully');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});


app.use('/', routes); 

app.get('/getBrands',(req,res)=>{
    factoryModel.find()
  .then(brands => res.json(brands))
  .catch(err => res.json(err))
})

app.post('/postUserData', (req, res) => { // Change to app.post for handling POST request
  let userData = req.body; // No need to wrap req.body in an object
  userModel.create(userData)
    .then(UserModel => res.json(UserModel))
    .catch(err => res.json(err))
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