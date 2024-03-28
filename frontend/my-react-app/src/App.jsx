// App.js
import React from 'react';
import './App.css'; 
// import Data from './Components/Data';
import axios from 'axios'
import { useState, useEffect } from 'react';

function App() {
  let  [data, setData] = useState()

  useEffect(()=>{
    axios.get('http://localhost:8000/getBrands').then(res => setData(res.data)).catch(err => console.error(err))
  })
  return (
    <div>
      <h1 className='welcome'>Welcome to BrandFactory</h1>
      {/* <Data /> */}
      <div>{data && data.map((item)=>{
        return(
          <div key={item._id} className="main">
            <h2>{item.BrandName}</h2>
            <h4>Description : {item.Description}</h4>
            <h4>History : {item.History}</h4>
            <h4>Founders : {item.Founders}</h4>
            <h4>Mission Statement : {item.MissionStatement}</h4>
            <h4>Selling Point : {item.SellingPoint}</h4>
            <h4>Quality Standards : {item.QualityStandards}</h4>
            <h4>Web Link : {item.WebLink}</h4>
          </div>
        )
      })}</div>
    </div>
  );
}

export default App;