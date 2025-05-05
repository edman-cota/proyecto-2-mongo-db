import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';

const ReviewModal = ({ isOpen, setIsReviewPopopverOpen }) => {
  const handleSubmit = () => {};

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => setIsReviewPopopverOpen(open)}>
      <Dialog.Trigger asChild>
        <button title='Crear nuevo restaurante' className='ReviewDialogTrigger'>
          Tu opinión es muy importante para nosotros
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='DialogOverlay' />
        <Dialog.Content className='DialogContent'>
          <Dialog.Title className='DialogTitle'>Tu opinión es muy importante para nosotros</Dialog.Title>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 40 }}>
            {/* <form onSubmit={handleSubmit}>
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
          </form> */}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ReviewModal;
