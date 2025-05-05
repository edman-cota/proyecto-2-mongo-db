export const getUserData = () => {
  const currentUser = window.localStorage.getItem('user');

  return JSON.parse(currentUser);
};

export const getTotalQuality = (product, orderItems) => {
  const currentProduct = orderItems.find((item) => item._id === product._id);
  if (currentProduct) {
    return currentProduct.quantity;
  } else {
    return 0;
  }
};

export const getCartTotalProducts = (orderItems) => {
  return orderItems.reduce((acc, item) => acc + item.quantity, 0);
};
