import React, { useState } from 'react';

import Image from '../src/assets/images.jpg';

const Product = ({ product, orderItems, increaseItem, decreaseItem }) => {
  const [quantity, setQuantity] = useState(0);

  const getTotalQuality = () => {
    console.log('orderItems: ', orderItems);

    const currentProduct = orderItems.find((item) => item._id === product._id);
    console.log('currentProduct: ', currentProduct);
    if (currentProduct) {
      return currentProduct.quantity;
    } else {
      return 0;
    }
  };

  return (
    <div className='Product'>
      <div>
        <img src={Image} height={120} />
      </div>
      <div className='ProductBody'>
        <div>
          <p>{product.name}</p>

          <div>
            <p>Precio Q: {product.price}</p>
          </div>
        </div>

        <div>
          <div>
            <p className='RestaurantName'>{product.restaurant.name}</p>
          </div>
          <div className='ProductQuantity'>
            <button disabled={getTotalQuality() <= 0} onClick={() => decreaseItem(product)}>
              -
            </button>
            <p>{getTotalQuality()}</p>
            <button onClick={() => increaseItem(product)}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
