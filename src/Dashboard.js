import {React, useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Retrieve the token from local storage or a secure cookie
    const token = localStorage.getItem('token');
    
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7178/api/Product/ProductsList', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
      {data.map((item) => (
  <li key={item.productId}>
    <strong>{item.productName}</strong>: {item.productDescription}<br/>
    Cost: {item.productCost}<br/>
    Stock: {item.productStock}
  </li>
))}

      </ul>
    </div>
  );
}

export default Dashboard;
