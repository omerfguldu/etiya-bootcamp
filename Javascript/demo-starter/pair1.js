// * TASKS
// * Get products that contains the name sent to the function
// * Get the first product that contains the name sent to the function
// * Get product if product unit price is less than the value sent to function
// * Get product if product unit price is more than the value sent to function
// * Get products that has discount
// * Add new product to array
// * Remove product from the array according to the name value that sent to function
// * Get all products

let products = [
  {
    unitPrice: 100,
    productName: "Urun 1",
    discount: true,
    rate: 15,
  },
  {
    unitPrice: 150,
    productName: "Urun 2",
    discount: false,
    rate: 0,
  },
  {
    unitPrice: 250,
    productName: "Urun 3",
    discount: true,
    rate: 2.5,
  },
];

// = FUNCTIONS START

// * TASK 1 = Get products that contains the name sent to the function
const getProductsByName = (name) => {
  return products.filter((product) => product.productName.includes(name));
};
console.log(
  "---------------------- getProductsByName Function Log ----------------------"
);
console.log(getProductsByName("Urun"));

// * TASK 2 = Get the first product that contains the name sent to the function
const getFirstProductByName = (name) => {
  return products.find((product) => product.productName.includes(name));
};
console.log(
  "---------------------- getFirstProductByName Function Log ----------------------"
);
console.log(getFirstProductByName("Urun"));

// * TASK 3 = Get product if product unit price is less than the value sent to function
const getProductsLessThanPrice = (price) => {
  return products.filter((product) => product.unitPrice < price);
};
console.log(
  "---------------------- getProductsLessThanPrice Function Log ----------------------"
);
console.log(getProductsLessThanPrice(200));

// * TASK 4 = Get product if product unit price is more than the value sent to function
const getProductsGreaterThanPrice = (price) => {
  return products.filter((product) => product.unitPrice > price);
};
console.log(
  "---------------------- getProductsGreaterThanPrice Function Log ----------------------"
);
console.log(getProductsGreaterThanPrice(200));

// * TASK 5 = Get products that has discount
const getDiscountedProducts = (productArray) => {
  return productArray.filter((product) => product.discount);
};
console.log(
  "---------------------- getDiscountedProducts Function Log ----------------------"
);
console.log(getDiscountedProducts(products));

// * TASK 6 = Add new product to array
const addProduct = (newProduct) => {
  products.push(newProduct);
};
console.log(
  "---------------------- addProduct Function Log ----------------------"
);
addProduct({
  unitPrice: 400,
  productName: "Urun 4",
  discount: false,
  rate: 20,
});
console.log(products);

// * TASK 7 = Remove product from the array according to the name value that sent to function
const removeByName = (name) => {
  products = products.filter((product) => product.productName !== name);
};
removeByName("Urun 2");
console.log(
  "---------------------- removeByName Function Log ----------------------"
);
console.log(products);

// * TASK 8 = Get all products
const getAllProducts = (productsArray) => {
  for (let product of productsArray) {
    console.log(
      `productPrice: ${product.unitPrice}, productName: ${product.productName}, discount: ${product.discount}, rate: ${product.rate}`
    );
  }
};
console.log(
  "---------------------- getAllProducts Function Log ----------------------"
);
getAllProducts(products);
