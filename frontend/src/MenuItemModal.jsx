import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';

const MenuItemModal = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que los campos sean correctos
    if (!name || !price) {
      alert('Please fill in all fields');
      return;
    }

    const newMenuItem = {
      name,
      description,
      price: parseFloat(price),
      restaurantId: id,
    };

    try {
      // Enviar la solicitud POST al backend para crear el MenuItem
      const response = await axios.post('http://localhost:5000/api/menu-items', newMenuItem);

      // Llamar a la función onAdd para actualizar el estado en el componente principal
      //   onAdd(response.data);
      alert('Menu item added successfully');

      // Limpiar el formulario
      setName('');
      setDescription('');
      setPrice('');
    } catch (error) {
      console.error('Error adding menu item:', error);
      alert('Failed to add menu item');
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <Dialog.Trigger asChild>
        <button title='Crear nuevo restaurante' className='DialogTrigger'>
          +
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='DialogOverlay' />
        <Dialog.Content className='DialogContent'>
          <Dialog.Title className='DialogTitle'>Crear nuevo restaurante</Dialog.Title>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 40 }}>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Name:</label>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div>
                <label>Description:</label>
                <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div>
                <label>Price:</label>
                <input
                  type='number'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  min='0'
                />
              </div>
              <button type='submit'>Add Menu Item</button>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MenuItemModal;
