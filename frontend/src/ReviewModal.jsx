import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';
import { getUserData } from './util';

const ReviewModal = ({ restaurantId, isOpen, setIsReviewPopopverOpen }) => {
  const { _id: userId } = getUserData();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !comment) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);

    try {
      await axios.post('http://localhost:5000/api/reviews', {
        userId,
        restaurantId,
        rating,
        comment,
      });

      setIsReviewPopopverOpen(false);
    } catch {
      console.log('Error creating review');
    }

    setLoading(false);
  };

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
            <form onSubmit={handleSubmit}>
              <div>
                <label>Puntuación:</label>
                <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                  {[1, 2, 3, 4, 5].map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
              </div>
              <br />
              <div>
                <label>Comentario:</label>
                <textarea value={comment} rows={4} onChange={(e) => setComment(e.target.value)} required />
              </div>
              <button type='submit' disabled={loading}>
                {loading ? 'Agregando...' : 'Agregar reseña'}
              </button>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ReviewModal;
