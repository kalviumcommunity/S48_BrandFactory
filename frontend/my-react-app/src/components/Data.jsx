import React from 'react';
import '../App.css'; 

const Data = () => {
  const data = [
    {
        BrandName: "Puma",
        Description: "Puma is a German multinational corporation that designs and manufactures athletic and casual footwear, apparel, and accessories.",
        History: "Puma was founded in 1948 by Rudolf Dassler after he split from his brother who founded Adidas. The company rapidly gained popularity for its innovative designs and high-performance sports gear.",
        Founders: ["Rudolf Dassler"],
        MissionStatemen: "To be the Fastest Sports Brand in the world.",
        SellingPoint: ["Innovative designs", "High-performance gear", "Celebrity endorsements"],
        QualityStandards: ["High-quality materials", "Stringent quality control processes"],
        WebLink: "https://www.puma.com"
    },
    {
        BrandName: "H&M",
        Description: "H&M, Hennes & Mauritz AB, is a Swedish multinational clothing retail company known for its fast-fashion clothing for men, women, teenagers, and children.",
        History: "H&M was founded in 1947 by Erling Persson in Västerås, Sweden. It originally sold women's clothing but later expanded to include men's clothing, children's clothing, and home decor.",
        Founders: ["Erling Persson"],
        MissionStatement: "To offer fashion and quality at the best price in a sustainable way.",
        SellingPoint: ["Affordable fashion", "Wide range of styles and sizes", "Trendy designs"],
        QualityStandards: ["Commitment to sustainable sourcing and production", "Quality control measures"],
        WebLink: "https://www.hm.com"
    }      
  ];

  return (
    <div className='data'>
      {data.map((item, index) => (
        <div className="card" key={index}>
          <h2>{item.BrandName}</h2>
          <p>{item.Description}</p>
          <p>{item.History}</p>
          <p>{item.Founders}</p>
          <p>{item.MissionStatemen}</p>
          <p>{item.SellingPoint}</p>
          <p>{item.QualityStandards}</p>
          <p>{item.WebLink}</p>
        </div>
      ))}
    </div>
  );
};

export default Data;