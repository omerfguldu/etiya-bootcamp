console.log("Loops Start");

// dinamik olacak
let krediler = ["Ihtiyac", "Tasit", "Arac"];

// donguler
// iterate, iteration
console.log("<ul>");
for (let i = 0; i < krediler.length; i++) {
  console.log(`<li>${krediler[i]}</li>`);
}
console.log("</ul>");

krediler.forEach((kredi) => {
  console.log(kredi);
});

let urunler = [
  {
    fiyat: 100,
    ad: "Urun 1",
    discount: true,
    rate: 15,
  },
  {
    fiyat: 150,
    ad: "Urun 2",
    discount: false,
    rate: 0,
  },
  {
    fiyat: 200,
    ad: "Urun 3",
    discount: true,
    rate: 2.5,
  },
];
// tum urunleri gez fiyati %10 indirimli olarak yazdir.
// %10 indirimli hali 150tl ustunde ise pahali yaz

urunler.forEach((urun) => {
  // const indirimliFiyat = urun.fiyat - (urun.fiyat * 10) / 100;
  // console.log(indirimliFiyat > 150 ? "pahali" : "");

  let indirimliFiyat = urun.fiyat - (urun.rate * 10) / 100;
  urun.discount ? console.log(indirimliFiyat) : console.log(urun.fiyat);
});

// Urunlerden sadece 160 tl uzerindeki urunleri getir
urunler.forEach((urun) => {
  if (urun.fiyat > 160) console.log(urun);
});
