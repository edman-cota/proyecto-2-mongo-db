import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Table from './Table';
import { getUserData } from './util';

const headers = ['Estado', '# arículos', 'Total Q', 'Dirección de entrega'];

const Orders = () => {
  const currentUser = getUserData();

  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);

  const fetchData = () => {
    console.log('currentUser: ', currentUser);
    const userId = currentUser._id;

    if (currentUser.role === 'admin') {
      axios
        .get('http://localhost:5000/api/orders')
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => {
          console.error('Error al obtener los restaurantes', error);
        });
    } else {
      axios
        .get('http://localhost:5000/api/orders', {
          params: { userId },
        })
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => {
          console.error('Error al obtener los restaurantes', error);
        });
    }
  };

  const handleDelete = () => {};

  const handleSelect = () => {};

  const handleEdit = () => {};

  const handleCheckboxChange = (e, menuItemId) => {
    if (e.target.checked) {
      setSelectedIds([...selectedIds, menuItemId]);
    } else {
      setSelectedIds(selectedIds.filter((id) => id !== menuItemId));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <div className='navbar'>
        <h2>Ordenes</h2>
      </div>

      <div className='card'>
        <div className='header'></div>

        <Table
          headers={headers}
          data={orders}
          searchQuery={searchQuery}
          onDelete={handleDelete}
          onSelect={handleSelect}
          onEdit={handleEdit}
          handleCheckboxChange={handleCheckboxChange}
          selectedIds={selectedIds}
          isEditable={false}
        />
      </div>
    </main>
  );
};

export default Orders;
