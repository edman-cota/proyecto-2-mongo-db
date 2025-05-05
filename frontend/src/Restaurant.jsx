import React, { useState, useEffect } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useParams } from 'react-router';

import Table from './Table';
import MenuItemModal from './MenuItemModal';
import axios from 'axios';
import Metrics from './Metrics';
import { getUserData } from './util';
import ReviewModal from './ReviewModal';

const menuItemsheaders = ['Menú', 'Descripción', 'Precio'];
const metrics = [
  { main: 0, label: 'Ordenes Pendientes' },
  { main: 0, label: 'Ordenes En Progreso' },
  { main: 0, label: 'Ordenes Completados' },
  { main: 0, label: 'Ordenes Cancelados' },
];

const Restaurant = () => {
  const params = useParams();
  const currentUser = getUserData();

  const [menus, setMenus] = useState([]);
  const [menusearch, setMenuSearch] = useState('');

  const [selectedIds, setSelectedIds] = useState([]);
  const [initialItem, setInitialItem] = useState(undefined);

  const [isMenuPopoverOpen, setIsMenuPopoverOpen] = useState(false);
  const [isReviewPopoverOpen, setIsReviewPopopverOpen] = useState(false);

  const fetchMenuItems = async () => {
    setInitialItem(undefined);
    const restaurantId = params.id;

    try {
      const response = await axios.get('http://localhost:5000/api/menu-items', {
        params: { restaurantId },
      });
      setMenus(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const handleMenuSearch = async (e) => {
    e.preventDefault();

    if (menusearch === '') {
      fetchMenuItems();
    } else {
      try {
        const response = await axios.get(`http://localhost:5000/api/menu-items/search?query=${menusearch}`);
        console.log('response: ', response);
        setMenus(response.data);
      } catch (err) {
        console.error('Error searching menu items:', err);
      }
    }
  };

  const handleEdit = (id) => {
    const currentMenu = menus.find((menu) => menu._id === id);

    setInitialItem(currentMenu);
    setIsMenuPopoverOpen(true);
  };

  const handleDeleteSingleMenu = async (id) => {
    try {
      await axios.delete('http://localhost:5000/api/menu-items', {
        data: { ids: [id] },
      });

      setMenus(menus.filter((menu) => menu._id !== id));
    } catch {
      alert('Failed to delete the menu item');
    }
  };

  const handleDeleteMany = async () => {
    try {
      await axios.delete('http://localhost:5000/api/menu-items', {
        data: { ids: selectedIds },
      });

      setSelectedIds([]);
      fetchMenuItems();
    } catch {
      alert('Failed to delete the menu items');
    }
  };

  const handleEditMany = () => {
    setIsMenuPopoverOpen(true);
  };

  const handleSelect = () => {};

  const handleCheckboxChange = (e, menuItemId) => {
    if (e.target.checked) {
      setSelectedIds([...selectedIds, menuItemId]);
    } else {
      setSelectedIds(selectedIds.filter((id) => id !== menuItemId));
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return (
    <main>
      <div className='navbar'>
        <h2>Restaurante</h2>
      </div>

      {currentUser && currentUser.role === 'admin' && <Metrics metrics={metrics} />}

      <div className='card'>
        <div className='header'>
          <div className='search'>
            <input
              type='text'
              placeholder='Buscar menú'
              value={menusearch}
              onChange={(e) => setMenuSearch(e.target.value)}
            />
            <button onClick={handleMenuSearch}>Buscar</button>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            {selectedIds.length > 0 && (
              <>
                <button title='Editar' className='editButton' onClick={() => handleEditMany()}>
                  <MdEdit />
                </button>

                <button title='Eliminar' className='deleteButton' onClick={() => handleDeleteMany()}>
                  <MdDelete />
                </button>
              </>
            )}

            <MenuItemModal
              id={params.id}
              selectedIds={selectedIds}
              initialItem={initialItem}
              fetchData={fetchMenuItems}
              isOpen={isMenuPopoverOpen}
              setIsMenuPopoverOpen={setIsMenuPopoverOpen}
            />
          </div>
        </div>

        <Table
          headers={menuItemsheaders}
          data={menus}
          searchQuery={menusearch}
          onDelete={handleDeleteSingleMenu}
          onSelect={handleSelect}
          onEdit={handleEdit}
          handleCheckboxChange={handleCheckboxChange}
          selectedIds={selectedIds}
        />
      </div>

      {currentUser && currentUser.role === 'customer' && (
        <ReviewModal
          isOpen={isReviewPopoverOpen}
          restaurantId={params.id}
          setIsReviewPopopverOpen={setIsReviewPopopverOpen}
        />
      )}
    </main>
  );
};

export default Restaurant;
