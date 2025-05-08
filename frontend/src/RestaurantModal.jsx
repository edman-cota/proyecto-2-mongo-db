import React, { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';

const categories = [
  'Saludable',
  'Postres y pasteles',
  'Pollo',
  'Desayunos',
  'Pizzas',
  'Hamburguesas',
  'Comida china',
  'Sándwiches',
  'Carnes',
  'Jugos y batidos',
  'Tacos',
  'Comida mexicana',
  'Helados',
  'Comida chapina',
  'Pastas',
  'Comida vegetariana',
  'Pupusas',
  'Ceviches',
  'Sopas',
  'Arepas',
  'Pescados y mariscos',
  'Empanadas',
  'Sushi',
  'Shucos',
  'Ensaladas',
  'Comida vegana',
  'Cafetería',
];

const RestaurantModal = ({ selectedIds, fetchData, initialItem, isOpen, setIsMenuPopoverOpen }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('');
  const [phone, setPhone] = useState('');
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (initialItem || selectedIds.length > 0) {
      const ids = selectedIds.length === 0 ? [initialItem._id] : selectedIds;

      const updatedRestaurant = {
        ids: ids,
        name,
        address,
        category,
        phone,
        coordinates,
      };

      try {
        await axios.put('http://localhost:5000/api/restaurants', updatedRestaurant);
      } catch (err) {
        console.error('Error fetching menu item:', err);
      }
    } else {
      const newRestaurant = {
        name,
        address,
        category,
        phone,
        coordinates,
      };

      try {
        await axios.post('http://localhost:5000/api/restaurants', newRestaurant);
      } catch (error) {
        console.error('Error adding restaurant:', error);
      }
    }

    setName('');
    setAddress('');
    setCategory('');
    setPhone('');
    setCoordinates({ latitude: 0, longitude: 0 });

    setIsMenuPopoverOpen(false);

    fetchData();
  };

  useEffect(() => {
    if (initialItem) {
      setName(initialItem.name);
      setAddress(initialItem.address);
      setCategory(initialItem.category);
      setPhone(initialItem.phone);

      if (initialItem.location) {
        setCoordinates({
          latitude: initialItem.location.coordinates[1],
          longitude: initialItem.location.coordinates[0],
        });
      } else {
        setCoordinates({ latitude: 0, longitude: 0 });
      }
    }
  }, [initialItem]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => setIsMenuPopoverOpen(open)}>
      <Dialog.Trigger asChild>
        <button title='Crear nuevo restaurante' className='DialogTrigger'>
          +
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='DialogOverlay' />
        <Dialog.Content className='DialogContent'>
          <Dialog.Title className='DialogTitle'>
            {initialItem ? 'Actualizar restaurante' : 'Crear nuevo restaurante'}
          </Dialog.Title>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 40 }}>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Nombre:</label>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} required />
              </div>

              <div>
                <label>Categoría:</label>
                <select style={{ width: 200 }} value={category} onChange={(e) => setCategory(e.target.value)}>
                  {categories.map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Teléfono:</label>
                <input type='text' value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div>
                <label>Dirección:</label>
                <input type='text' value={address} onChange={(e) => setAddress(e.target.value)} required />
              </div>
              <div>
                <label>Latitud:</label>
                <input
                  type='number'
                  placeholder='Latitude'
                  value={coordinates.latitude}
                  onChange={(e) => setCoordinates({ ...coordinates, latitude: e.target.value })}
                />
              </div>
              <div>
                <label>Longitud:</label>
                <input
                  type='number'
                  placeholder='Longitude'
                  value={coordinates.longitude}
                  onChange={(e) => setCoordinates({ ...coordinates, longitude: e.target.value })}
                />
              </div>
              <button type='submit'>{initialItem ? 'Actualizar restaurante' : 'Agregar restaurante'}</button>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default RestaurantModal;
