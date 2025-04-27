import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RestaurantModal from './RestaurantModal';
import RestaurantList from './RestaurantList';
import Table from './Table';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

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

  const [searchQuery, setSearchQuery] = useState(''); // Estado para el campo de búsqueda
  // const [restaurants, setRestaurants] = useState([]); // Estado para los restaurantes encontrados

  const handleSearch = async () => {
    try {
      // Realizar la solicitud GET al backend para buscar restaurantes por nombre
      const response = await axios.get(`http://localhost:5000/api/restaurants/search?name=${searchQuery}`);
      setRestaurants(response.data); // Guardar los restaurantes encontrados en el estado
    } catch (error) {
      console.error('Error al buscar restaurantes:', error);
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

      <div>
        <h2>Search for Restaurants</h2>
        <input
          type='text'
          placeholder='Enter restaurant name'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Actualizar el estado cuando el usuario escribe
        />
        <button onClick={handleSearch}>Search</button>

        {restaurants.length > 0 && (
          <div>
            <h3>Search Results:</h3>
            <ul>
              {restaurants.map((restaurant) => (
                <li key={restaurant._id}>
                  <strong>{restaurant.name}</strong>
                  <br />
                  Address: {restaurant.address}
                  <br />
                  Category: {restaurant.category}
                </li>
              ))}
            </ul>
          </div>
        )}

        {restaurants.length === 0 && searchQuery && <p>No restaurants found.</p>}
      </div>

      <div className='card'>
        <Table data={restaurants} />
      </div>
    </main>
  );
};

export default Restaurants;
