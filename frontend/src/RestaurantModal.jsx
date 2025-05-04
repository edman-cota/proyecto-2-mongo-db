import React, { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';

const RestaurantModal = ({ selectedIds, fetchData, initialItem, isOpen, setIsMenuPopoverOpen }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('');
  const [phone, setPhone] = useState('');

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

    setIsMenuPopoverOpen(false);

    fetchData();
  };

  useEffect(() => {
    if (initialItem) {
      console.log('initialItem: ', initialItem);
      setName(initialItem.name);
      setAddress(initialItem.address);
      setCategory(initialItem.category);
      setPhone(initialItem.phone);
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
                <label>Dirección:</label>
                <input type='text' value={address} onChange={(e) => setAddress(e.target.value)} required />
              </div>
              <div>
                <label>Categoría:</label>
                <input type='text' value={category} onChange={(e) => setCategory(e.target.value)} required />
              </div>
              <div>
                <label>Teléfono:</label>
                <input type='text' value={phone} onChange={(e) => setPhone(e.target.value)} />
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
