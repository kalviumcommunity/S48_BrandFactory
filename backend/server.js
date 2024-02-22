const express = require('express');
const app = express();
const port = process.env.PUBLIC_PORT || 3000;
require('dotenv').config()
console.log(process.env)

const mongoose=require('mongoose');
mongoose.connect(process.env.mongoURI,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
});
const db=mongoose.connection;

const routes = require('./routes');

app.use(express.json());
app.use('/', routes);

app.get('/',(req,res)=>{
  res.send(`${db.readyState===1?'Connected':'Disconnected'}`);
});

app.get('/ping', (req, res) => {
  res.json({message: 'pong'});
})

if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 server running on PORT: ${port}`);
  });
}

module.exports = app;
