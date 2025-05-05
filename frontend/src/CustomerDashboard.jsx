import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoCart } from 'react-icons/io5';

import Product from './Product';
import { getCartTotalProducts, getUserData } from './util';

const CustomerDashboard = () => {
  const currentUser = getUserData();

  const [menus, setMenus] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/menu-items');
      setMenus(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const increaseItem = (product) => {
    let currentItems = [...orderItems];
    let currentProduct = orderItems.find((item) => item._id === product._id);

    if (currentProduct) {
      currentProduct = { ...currentProduct, quantity: currentProduct.quantity + 1 };

      currentItems = currentItems.map((item) => (item._id === currentProduct._id ? currentProduct : item));

      setOrderItems(currentItems);
    } else {
      currentItems.push({ ...product, quantity: 1 });

      setOrderItems(currentItems);
    }
  };

  const decreaseItem = (product) => {
    let currentItems = [...orderItems];
    let currentProduct = orderItems.find((item) => item._id === product._id);

    if (currentProduct) {
      currentProduct = { ...currentProduct, quantity: currentProduct.quantity - 1 };

      currentItems = currentItems.map((item) => (item._id === currentProduct._id ? currentProduct : item));

      setOrderItems(currentItems);
    }
  };

  const handlePlaceOrder = async () => {
    const userId = currentUser._id;

    const items = orderItems.map((item) => ({
      itemId: item._id,
      quantity: item.quantity,
    }));

    await axios.post('http://localhost:5000/api/orders', {
      userId,
      items,
    });

    setOrderItems([]);
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        gap: 20,
        padding: 20,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'flex-end' }}>
        {getCartTotalProducts(orderItems)}
        <IoCart />

        <button
          disabled={getCartTotalProducts(orderItems) <= 0}
          className='orderButton'
          onClick={() => handlePlaceOrder()}
        >
          Ordenar
        </button>
      </div>

      {menus.map((menu, index) => (
        <Product
          key={index}
          product={menu}
          orderItems={orderItems}
          increaseItem={increaseItem}
          decreaseItem={decreaseItem}
        />
      ))}
    </div>
  );
};

export default CustomerDashboard;
