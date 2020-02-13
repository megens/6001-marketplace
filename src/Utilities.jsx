let getDesignPriceAndSize = designParts => {
  const quantity = item => {
    return item.quantity;
  };

  const sum = (a, b) => {
    return a + b;
  };

  let totalParts = designParts.map(quantity).reduce(sum, 0);

  let price = 1.0;
  let size = "small";

  if (totalParts > 50) {
    price = 1.5;
    size = "medium";
  }
  if (totalParts > 100) {
    price = 2.0;
    size = "large";
  }

  const designPriceSize = [price, size];
  return designPriceSize;
};

export { getDesignPriceAndSize };
