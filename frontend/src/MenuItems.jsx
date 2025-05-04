import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RestaurantModal from './RestaurantModal';
import RestaurantList from './RestaurantList';
import Table from './Table';

const headers = ['Nombre', 'Categoría', 'Dirección', 'Reseñas'];

const MenuItems = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = () => {
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
      await axios.delete(`http://localhost:5000/api/restaurants/${id}`);

      setRestaurants(restaurants.filter((restaurant) => restaurant._id !== id));

      alert('Restaurant deleted successfully');
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      alert('Failed to delete the restaurant');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <div className='navbar'>
        <h2>Menú</h2>
      </div>

      <div className='card'>
        <div className='header'>
          <div className='search'>
            <input
              type='text'
              placeholder='Buscar menú'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Buscar</button>
          </div>

          <RestaurantModal fetchData={fetchData} />
        </div>
        <Table headers={headers} data={restaurants} searchQuery={searchQuery} onDelete={handleDelete} />
      </div>
    </main>
  );
};

export default MenuItems;
