console.log("functions.js");

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
    unitPrice: 200,
    productName: "Urun 3",
    discount: true,
    rate: 2.5,
  },
];

// let searchText = "Urun";
// * 10 farkli yerde productName'e gore urun getirme modulu mevcut.

// * parametre
// * default value
function getProductsByName(productName = "Urun") {
  let productsResult = products.filter((product) =>
    product.productName.includes(productName)
  );
  console.log(`Arama sonucunda bulunan urun sayisi: ${productsResult.length}`);
}
getProductsByName();

getProductsByName(`1`);

getProductsByName(`asdasd`);

getProductsByName(`3`);

// * constant => degisken tanimlama keywordu
// * degiskenlerin degeri degismez

// * ARROW FUNCTION

const getProductsByUnitPrice = (unitPrice) => {
  let filteredProducts = products.filter(
    (product) => product.unitPrice > unitPrice
  );
  console.log(filteredProducts);
};

getProductsByUnitPrice(100);
