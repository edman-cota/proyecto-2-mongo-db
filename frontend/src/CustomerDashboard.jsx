import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerDashboard = () => {
  const [menus, setMenus] = useState([]);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/menu-items');
      setMenus(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  console.log('menus: ', menus);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return <div>CustomerDashboard</div>;
};

export default CustomerDashboard;
