import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RestaurantModal from './RestaurantModal';
import RestaurantList from './RestaurantList';
import Table from './Table';

const Restaurants = () => {
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
      <div className='navbar'></div>

      <div className='header'>
        <h2>Restaurantes</h2>

        <RestaurantModal fetchData={fetchData} />
      </div>

      <div className='card'>
        <div className='search'>
          <input
            type='text'
            placeholder='Buscar restaurante'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Buscar</button>
        </div>

        <Table data={restaurants} searchQuery={searchQuery} onDelete={handleDelete} />
      </div>
    </main>
  );
};

export default Restaurants;
