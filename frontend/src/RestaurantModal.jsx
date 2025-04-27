import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';

const RestaurantModal = ({ fetchData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('');
  const [phone, setPhone] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar recarga de la página

    // Datos del restaurante a enviar
    const newRestaurant = {
      name,
      address,
      category,
      phone,
    };

    try {
      // Hacer una solicitud POST al backend para agregar el restaurante
      const response = await axios.post('http://localhost:5000/api/restaurants', newRestaurant);

      // Si la solicitud es exitosa, mostrar mensaje o hacer algo con la respuesta
      console.log('Restaurant added:', response.data);
      // Limpiar el formulario después de la inserción exitosa
      setName('');
      setAddress('');
      setCategory('');
      setPhone('');

      setIsOpen(false);

      fetchData();
    } catch (error) {
      console.error('Error adding restaurant:', error);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <Dialog.Trigger asChild>
        <button className='DialogTrigger'>+</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='DialogOverlay' />
        <Dialog.Content className='DialogContent'>
          <Dialog.Title className='DialogTitle'>Crear nuevo restaurante</Dialog.Title>

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
              <button type='submit'>Add Restaurant</button>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default RestaurantModal;
