// //* Global Scope
// // var variable = 1;

// //* Function Scope
// function func() {
//   variable = 10; //* global scope da variable degiskeno yoksa `var variable = 10` seklinde bir tanimlama yapar
//   console.log(variable); // = 10
//   //* Function Scope
// }
// func();

// console.log(variable); // = 10

//! ---------------------------------------------

var value1 = 40;
let value2 = 50;
const value3 = 60;

if (true) {
  //* Block Scope
  var value4 = 70;
  // var value1 = 30;
  let value5 = 80;
  console.log(value4, value5); // = 70 80
}

console.log(value1, value2, value3, value4); // = 40 50 60 70
// console.log(valule5); // = error

console.log(value1, value2, value3);
