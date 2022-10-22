// console.log("Merhaba Kodlamaio 2");

// // degiskenler ve turleri
// // variable var
// // JAVASCRIPT TIP GUVENLI DEGILDIR
// // TYPESCRIPT tip guvenli

// // number
// let dolarKur = 10;
// console.log(dolarKur);

// // string = metinsel ifade
// let euroKur = "15";
// console.log(euroKur);

// // matematiksel operator
// console.log(dolarKur + 5);
// console.log(euroKur + 10); // string oldugundan dolayi yanlis calisti.

// // var kullanilmiyor
// // let
// // let ve var arasindaki farklar aciklanacak. -- ODEV

// // boolean = true ya da false
// let euroYukselis = true;
// console.log(euroYukselis);

// // number ondalikli sayi olabilir.
// dolarKur = 12.5;
// console.log(dolarKur);

// // koleksiyonlar
// // array = dizi
// let krediler = ["Ihtiyac", "Tasit", "Konut"];
// console.log(krediler);
// console.log(krediler[0]);

// // object
// // JSON => Javascript Object Notation
// // KEY - VALUE
// // aylikOdeme => 415.53

// // Naming Convention
// // camelCase
// let odemeBilgileri = {
//   aylikOdeme: 415.53,
//   faizOrani: 1.89,
//   toplamGeriOdeme: 14950.42,
//   krediTipi: "Ihtiyac Kredisi",
// };
// console.log(odemeBilgileri);

//* Deger Tiper
//* numbers, boolean, undefined, null, char
//* "string" => 6 karakterli bir dizi gibidir. Bu yuzden normalde referans tip fakat cok sık kullildigi icin deger tip olarak calismasi saglanmis
let number1 = 10;
let number2 = 20;
number1 = number2;
number2 = 100;
console.log(number1); // = 20

//* Referans Tipler
//* array, object
let product1 = { id: 1, name: "Laptop", unitPrice: 15000 };
let product2 = { id: 2, name: "Mouse", unitPrice: 150 };
product1 = product2;
product2.name = "Keyboard";
console.log(product1);
