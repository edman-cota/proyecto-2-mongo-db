import axios from 'axios';
import { useNavigate } from 'react-router';
import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { GrFormPrevious } from 'react-icons/gr';
import { GrNext } from 'react-icons/gr';

import RestaurantModal from './RestaurantModal';
import Table from './Table';

const headers = ['Nombre', 'Categoría', 'Dirección', 'Reseñas'];

const Restaurants = () => {
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(250);
  const [totalDocuments, setTotalDocuments] = useState(0);

  const [selectedIds, setSelectedIds] = useState([]);
  const [initialItem, setInitialItem] = useState(undefined);
  const [isMenuPopoverOpen, setIsMenuPopoverOpen] = useState(false);

  const fetchData = () => {
    setInitialItem(undefined);

    axios
      .get('http://localhost:5000/api/restaurants', {
        params: {
          page: currentPage,
          limit: 250,
        },
      })
      .then((response) => {
        setRestaurants(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        setTotalDocuments(response.data.pagination.totalRestaurants);
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

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

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

      <div className='Pagination'>
        {(currentPage - 1) * perPage + 1} a {Math.min(currentPage * perPage, totalDocuments)} de{' '}
        {totalDocuments}
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          <GrFormPrevious />
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          <GrNext />
        </button>
      </div>
    </main>
  );
};

export default Restaurants;
