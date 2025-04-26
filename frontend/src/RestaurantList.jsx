import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RestaurantList = () => {
  const [restaurantes, setRestaurantes] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/restaurants')
      .then((response) => {
        setRestaurantes(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los restaurantes', error);
      });
  }, []);

  return (
    <div>
      <h2>Lista de Restaurantes</h2>
      <ul>
        {restaurantes.map((restaurante) => (
          <li key={restaurante._id}>{restaurante.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;
