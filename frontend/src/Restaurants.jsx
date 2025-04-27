import React from 'react';
import RestaurantModal from './RestaurantModal';

const Restaurants = () => {
  return (
    <main>
      <div className='navbar'></div>

      <div className='header'>
        <h2>Restaurantes</h2>

        <RestaurantModal />
      </div>
    </main>
  );
};

export default Restaurants;
