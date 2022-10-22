import { cevaplariniz } from "./restAndSpread.js";

console.log("------------------- DESTRUCTRING.JS LOGS -------------------");
console.log(cevaplariniz);
// const first = cevaplariniz[0];
// const second = cevaplariniz[1];
const [first, second, ...others] = cevaplariniz;

console.log(first);
console.log(second);
console.log(others);

const [
  icAnadolu,
  marmara,
  ege,
  akdeniz,
  [icAnadoluSehirleri, marmaraSehirleri, ...digerSehirler],
] = [
  { name: "Ic Anadolu", population: "1000000" },
  { name: "Marmara", population: "2000000" },
  { name: "Ege", population: "3000000" },
  { name: "Akdeniz", population: "4000000" },
  [
    ["Ankara", "Konya"],
    ["Istanbul", "Bursa"],
    ["Izmir", "Manisa"],
    ["Antalya", "Mersin"],
  ],
];

console.log(icAnadolu);
console.log(...icAnadoluSehirleri);
console.log(...marmaraSehirleri);
console.log(...digerSehirler.flat(2));
