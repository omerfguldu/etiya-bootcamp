export function sizCevapVerin() {
  return [10, 20, 30, 40, 50];
}

//* Rest Operator
//* parametreleri bir diziye donusturur.
function sum(...numbers) {
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum;
}

function avg(cevapVerenKisiSayisi, ...numbers) {
  return sum(...numbers) / cevapVerenKisiSayisi;
}

// const result = sum(10, 20, null); // = 30
// const result = sum(10, 20); // = hata

// const result = sum(10, 20, 30, 40, 50);

//* Spread Operator
//* dizi elemanlarini tek tek parametre olarak gonderir, yani birbirinden ayristirir.
export const cevaplariniz = sizCevapVerin();
const result = avg(26, ...cevaplariniz);
console.log("ortalama: ", result);
console.log(Math.max(...cevaplariniz));

function sayMyName(...letters) {
  console.log(letters);
  for (const letter of letters) {
    console.log(letter);
  }
}
// const nameLetters = sayMyName(..."Heisenberg");
sayMyName(...Object.values({ first: "w", second: "a" }));
sayMyName(...Object.keys({ first: "w", second: "a" }));

let instructor = {
  firstName: "Ahmet",
  lastName: "Cetinkaya",
};
let student = {
  firstName: "Omer",
  lastName: "Guldu",
};
const learningTopic = {
  topic: ["JavaScript"],
};
student = {
  ...student,
  ...learningTopic,
};
// Object.assign(student, learningTopic) //* spred operatorle yapilan isin aynisi
learningTopic.topic.push("Angular");
console.log(instructor);
console.log(student);
