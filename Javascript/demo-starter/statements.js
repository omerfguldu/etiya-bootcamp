console.log("Statements Start");

// KOSUL BLOKLARI
// true - false
// 1 == 1 => 1 esittir 1
console.log(1 == 1);
console.log(1 != 1);
console.log(1 >= 1); // > >= || =< <

// == sadece deger kontrolu yap
// === tip ve deger kontrolu yap
console.log(1 === "1");
console.log(1 !== "1");

// condition true ise blogunu calistirir degilse calistirmaz.
if (1 == 2) {
  console.log("If icerisi calisti");
} else if (2 == 2) {
  console.log("Iki ikiye esittir.");
} else {
  console.log("Else blogu calisti.");
}

let dolarKurDun = 18.74;
let dolarKurBugun = 18.8;

// dolarKurBugun daha fazla veya esit ise console'a fazla
// daha az ise daha az yazdir.
if (dolarKurBugun > dolarKurDun) {
  console.log("Dolar bugun dune gore daha fazla");
} else if (dolarKurBugun === dolarKurDun) {
  console.log("Dolar kurunda oynama yok.");
} else {
  console.log("Dolar bugun dune gore daha az");
}

// ternacy operator
// tek satirlik if - one line if statement
// kosul ? kod1: kod2
// kod1 => kosul true
// kod2 => kosul false
dolarKurBugun >= dolarKurDun
  ? console.log("Dolar bugun dune gore daha fazla")
  : console.log("Dolar bugun dune gore daha az");

// switch-case
let toplamBakiye = 100;
let secilenKur = "EUR";

switch (secilenKur) {
  case "USD":
    toplamBakiye *= 17;
    break;
  case "EUR":
    toplamBakiye *= 20;
  default:
    console.warn("Bilinmeyen kur turu");
    break;
}

console.log(`Toplam Bakiye: ${toplamBakiye}`);

// secilenKredi
// krediTutari

// secilen kredi Tasit ise 2 ile Ihtiyac ise 1.5 ile Konut ise 2.5 ile
// hic biri degilse hata bas
// krediTutarini yazdir.

let secilenKredi = "Konut";
let krediTutari = 150000;

switch (secilenKredi) {
  case "Tasit":
    krediTutari *= 2;
    break;
  case "Ihtiyac":
    krediTutari *= 1.5;
    break;
  case "Konut":
    krediTutari *= 2.5;
    break;
  default:
    console.warn("Lutfen gecerli bir kredi turu seciniz.");
    break;
}
console.log(`Toplam kredi tutari: ${krediTutari}`);

// girilen sayi cift ise cift tek ise tek yazalim
let sayi = 27;
sayi % 2 === 0 ? console.log("cift") : console.log("tek");
