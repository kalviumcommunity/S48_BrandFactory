const express = require('express');
const app = express();

const port = 8000;
const cors = require('cors');
const { MongoClient } = require("mongodb");
const routes = require('./routes');
const factoryModel = require('./Models/brands.js')
require("dotenv").config();
const uri = process.env.mongoURi;
const mongoose = require('mongoose')

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app.use(cors())
  app.use(express.json())
  
  mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
  })
  
  app.use('/', routes); 
  
  app.get('/getBrands',(req,res)=>{
      factoryModel.find()
    .then(brands => res.json(brands))
    .catch(err => res.json(err))
  })
  
  
  if (require.main === module) {
    app.listen(port, () => {
      console.log(`🚀 server running on PORT: ${port}`);
    });
  }
  
  module.exports = app;