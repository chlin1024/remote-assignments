function avg(data) {
  const productCount = data.products.length;
  const priceSum = data.products.reduce((sum, product) => {
      return sum + product.price;
  }, 0);
  return priceSum / productCount;
}

console.log(
avg({
  size: 3,
  products: [
      {
          name: 'Product 1',
          price: 100,
      },
      {
          name: 'Product 2',
          price: 700,
      },
      {
          name: 'Product 3',
          price: 250,
      },
     ],
    })
);

