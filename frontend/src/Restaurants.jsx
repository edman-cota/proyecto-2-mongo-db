import axios from 'axios';
import { useNavigate } from 'react-router';
import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';

import RestaurantModal from './RestaurantModal';
import Table from './Table';

const headers = ['Nombre', 'Categoría', 'Dirección', 'Reseñas'];

const Restaurants = () => {
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedIds, setSelectedIds] = useState([]);
  const [initialItem, setInitialItem] = useState(undefined);
  const [isMenuPopoverOpen, setIsMenuPopoverOpen] = useState(false);

  const fetchData = () => {
    setInitialItem(undefined);

    axios
      .get('http://localhost:5000/api/restaurants')
      .then((response) => {
        setRestaurants(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los restaurantes', error);
      });
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/restaurants/search?name=${searchQuery}`);
      setRestaurants(response.data);
    } catch (error) {
      console.error('Error al buscar restaurantes:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete('http://localhost:5000/api/restaurants');

      setRestaurants(restaurants.filter((restaurant) => restaurant._id !== id));

      alert('Restaurant deleted successfully');
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      alert('Failed to delete the restaurant');
    }
  };

  const handleEdit = async (id) => {
    const currentMenu = restaurants.find((menu) => menu._id === id);

    setInitialItem(currentMenu);
    setIsMenuPopoverOpen(true);
  };

  const onSelect = (id) => {
    navigate(`/restaurant/${id}`);
  };

  const handleDeleteMany = async () => {
    try {
      await axios.delete('http://localhost:5000/api/restaurants', {
        data: { ids: selectedIds },
      });

      setSelectedIds([]);
      fetchData();
    } catch {
      alert('Failed to delete the menu items');
    }
  };

  const handleEditMany = () => {
    setIsMenuPopoverOpen(true);
  };

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
        <h2>Restaurantes</h2>
      </div>

      <div className='card'>
        <div className='header'>
          <div className='search'>
            <input
              type='text'
              placeholder='Buscar restaurante'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Buscar</button>
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

            <RestaurantModal
              fetchData={fetchData}
              selectedIds={selectedIds}
              initialItem={initialItem}
              isOpen={isMenuPopoverOpen}
              setIsMenuPopoverOpen={setIsMenuPopoverOpen}
            />
          </div>
        </div>
        <Table
          headers={headers}
          data={restaurants}
          searchQuery={searchQuery}
          onDelete={handleDelete}
          onSelect={onSelect}
          onEdit={handleEdit}
          handleCheckboxChange={handleCheckboxChange}
          selectedIds={selectedIds}
        />
      </div>
    </main>
  );
};

export default Restaurants;
