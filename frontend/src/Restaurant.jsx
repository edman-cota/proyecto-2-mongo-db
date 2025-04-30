import React, { useState } from 'react';
import Table from './Table';
import MenuItemModal from './MenuItemModal';
import { useParams } from 'react-router';

const Restaurant = () => {
  const params = useParams();

  console.log('params: ', params);

  const [menus, setMenus] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchMenus = () => {};

  const handleEdit = () => {};
  const handleDelete = () => {};
  const handleSelect = () => {};

  return (
    <main>
      <div className='navbar'>
        <h2>Restaurantes</h2>
      </div>

      <div className='card'>
        <div className='header'>
          <div className='search'>
            {/* <input
              type='text'
              placeholder='Buscar menú'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Buscar</button> */}
          </div>

          <MenuItemModal id={params.id} fetchData={fetchMenus} />
        </div>

        <Table data={menus} searchQuery={searchQuery} onDelete={handleDelete} onSelect={handleSelect} />
      </div>
    </main>
  );
};

export default Restaurant;
