let urunler = [
  {
    fiyat: 100,
    ad: "Urun 1",
    indirim: true,
    oran: 15,
  },
  {
    fiyat: 150,
    ad: "Urun 2",
    indirim: false,
    oran: 0,
  },
  {
    fiyat: 200,
    ad: "Urun 3",
    indirim: true,
    oran: 2.5,
  },
];

// filter
// array.prototype.filter

let filtrelenmisUrunler = urunler.filter((urun) => {
  return urun.fiyat > 160;
});
console.log(filtrelenmisUrunler);

// map => forEach ile ayni FARKI map yeni bir array olusturur ve doner.

let maplenmisArray = urunler.map((urun) => {
  return {
    fiyat: urun.fiyat * 2,
    ad: "Maplenmis Ad",
    indirim: urun.indirim,
    oran: urun.oran,
  };
});
console.log("Maplenmis array:", maplenmisArray);

// Map kullanarak
// indirim ve oran konsolda gozukmeyecek
// indirim true ise oran kadar fiyat dusecek
// kullaniciya sadece fiyat, ad ve indirim tutari

let newUrunler = urunler.map((urun) => {
  return {
    fiyat: urun.indirim
      ? urun.fiyat - (urun.fiyat * urun.oran) / 100
      : urun.fiyat,
    ad: urun.ad,
    indirimTutari: urun.indirim ? (urun.fiyat * urun.oran) / 100 : 0,
  };
});
console.log("Yeni urunler: ", newUrunler);

let cart = [
  { id: 1, productName: "product 1", quantity: 3, unitPrice: 3000 },
  { id: 2, productName: "product 2", quantity: 2, unitPrice: 1000 },
  { id: 3, productName: "product 3", quantity: 1, unitPrice: 500 },
];

// sepetteki tum urunleri gez adet * unitPrice ile toplam fiyati bul
// kullaniciya goster {totalPrice: 300, totalProductCount: 6}
let total = { price: 0, quantity: 0 };
cart.forEach((cart) => {
  total.price += cart.unitPrice;
  total.quantity += cart.quantity;
});
console.log(total);

// reduce fonksiyonu

let totalPrice = cart.reduce((acc, cur) => (acc += cur.unitPrice), 0);
let totalProductCount = cart.reduce((acc, cur) => (acc += cur.quantity), 0);
console.log({ totalPrice, totalProductCount });

let totals = cart.reduce(
  (acc, product) => {
    return {
      totalPrice: acc.totalPrice + product.unitPrice * product.quantity,
      totalProductCount: acc.totalProductCount + product.quantity,
    };
  },
  {
    totalPrice: 0,
    totalProductCount: 0,
  }
);
console.log(totals);
