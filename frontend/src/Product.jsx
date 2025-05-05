import Image from '../src/assets/images.jpg';
import { getTotalQuality } from './util';

const Product = ({ product, orderItems, increaseItem, decreaseItem }) => {
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
            <button
              disabled={getTotalQuality(product, orderItems) <= 0}
              onClick={() => decreaseItem(product)}
            >
              -
            </button>
            <p>{getTotalQuality(product, orderItems)}</p>
            <button onClick={() => increaseItem(product)}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
