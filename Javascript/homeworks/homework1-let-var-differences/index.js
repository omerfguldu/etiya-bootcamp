console.log("DIFFERENCES BETWEEN LET AND VAR");

// * LET VARIABLES ARE SCOPED TO THE IMMEDIATE ENCLOSING DENOTED BY {}
// ! VAR KEYWORD ARE SCOPED TO THE IMMEDIATE FUNCTION BODY

function scope() {
  var name = "Omer";
  let surname = "Guldu";
  console.log(name, surname); // = Omer Guldu

  {
    var age = 25;
    let city = "Istanbul";
    console.log(age, city); // = 25 Istanbul
  }
  console.log(age); // = 25
  console.log(city); // = ReferenceError
}
// scope();

// * LET VARIABLES ARE NOT INITIALIZED UNTIL THEIR DEFINITION IS EVALUATED. ACCESSING THEM BEFORE THE INITIALIZATION RESULTS IN A REFERENCEERROR.
// ! VAR VARIABLES ARE HOISTED (INITIALIZED WITH UNDEFINED). THEY ARE ACCESSIBLE IN THEIR ENCLOSING SCOPE EVEN BEFORE THEY ARE DECLARED.

function hoisting() {
  console.log(name); // = undefined
  var name = "Faruk";
  console.log(name); // = Faruk
}

function letHoisting() {
  console.log(name); // = ReferenceError
  let name = "Faruk";
  console.log(name); // = Faruk
}
// hoisting();
// letHoisting();

// * LET DOES NOT CREATE A PROPERTY ON THE GLOBAL OBJECT
// ! VAR CREATES A PROPERTY ON THE GLOBAL OBJECT

var name = "Omer";
let surname = "Guldu";

console.log(window.name); // = Omer
console.log(window.surname); // = undefined

// * LET WON'T LET YOU REDECLARE THE SAME VARIABLE IN THE SAME SCOPE
// ! VAR LET YOU REDECLARE THE SAME VARIABLE

var name = "Faruk"; // = We declared name variable twice. Its new value is Faruk
// let surname = "Guldu"; // = SyntaxError: Identifier 'surname' has already been declared
