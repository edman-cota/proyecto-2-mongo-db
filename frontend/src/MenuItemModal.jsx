import React, { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';

const MenuItemModal = ({ id, selectedIds, fetchData, initialItem, isOpen, setIsMenuPopoverOpen }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price) {
      alert('Please fill in all fields');
      return;
    }

    if (initialItem || selectedIds.length > 0) {
      const ids = selectedIds.length === 0 ? [initialItem._id] : selectedIds;

      const menuItem = {
        ids: ids,
        name,
        description,
        price: parseFloat(price),
        restaurantId: id,
      };

      try {
        await axios.put('http://localhost:5000/api/menu-items', menuItem);
      } catch (err) {
        console.error('Error fetching menu item:', err);
      }
    } else {
      const menuItem = {
        name,
        description,
        price: parseFloat(price),
        restaurantId: id,
      };

      try {
        await axios.post('http://localhost:5000/api/menu-items', menuItem);
      } catch (error) {
        console.error('Error adding menu item:', error);
        alert('Failed to add menu item');
      }
    }

    fetchData();

    setName('');
    setDescription('');
    setPrice('');
    setIsMenuPopoverOpen(false);
  };

  useEffect(() => {
    if (initialItem) {
      setName(initialItem.name);
      setDescription(initialItem.description);
      setPrice(initialItem.price);
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
            {initialItem ? 'Actualizar menú' : 'Crear nuevo menú'}{' '}
          </Dialog.Title>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 40 }}>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Nombre:</label>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div>
                <label>Descripción:</label>
                <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div>
                <label>Precio Q:</label>
                <input
                  type='number'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  min='0'
                />
              </div>
              <button type='submit'>{initialItem ? 'Actualizar menú' : 'Agregar menú'} </button>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MenuItemModal;
