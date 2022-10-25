console.log("Hello from typescript file");
function sayHello(name) {
    console.log("Hello ".concat(name));
}
sayHello("Omer Faruk");
var sumFunction = function (a1, a2) {
    return a1 + a2;
};
var sumOfNumbers = sumFunction(5, 6);
console.log(sumOfNumbers);
var Greeter = /** @class */ (function () {
    function Greeter(name) {
        this.name = name;
    }
    Greeter.prototype.sayHi = function () {
        console.log("Hello ".concat(this.name));
        this.sayWhatsUp();
    };
    Greeter.prototype.sayWhatsUp = function () {
        console.log("What's up?");
    };
    return Greeter;
}());
var greeter = new Greeter("Omer");
greeter.sayHi();
//* userService classi olusturalim.
//* string[] olarak getUserNames fonksiyonu olusturalim.
//* string name alan bir ekleme metodu
//* classin icinde bir array ile tutalim. Ancak bu arraya disardan ulasim yasak.
var UserService = /** @class */ (function () {
    function UserService() {
        this.userArray = [];
    }
    UserService.prototype.getUsers = function () {
        return this.userArray;
    };
    UserService.prototype.addUser = function (user) {
        this.userArray.push(user);
    };
    return UserService;
}());
var userService = new UserService();
console.log(userService.getUsers());
userService.addUser({ name: "Omer", surname: "Guldu", age: 26 });
console.log(userService.getUsers());
export {};
