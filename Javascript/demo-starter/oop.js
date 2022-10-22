//* OOP - Object Oriented Programming

export default class House {
  constructor(roomNumber, flatNumber, side, condoFee, rent) {
    this.roomNumber = roomNumber;
    this.flat = flatNumber;
    this.side = side;
    this.condoFee = condoFee;
    this.rent = rent;
  }

  introduce() {
    console.log(this);
  }

  introduce() {
    console.log("introduce 2", this);
  }
}

export const house1 = new House(3, 2, "North", 500, 5000);
house1.introduce();

function createHouse(room, flat, side, condoFee, rent) {
  {
    this.room = room;
    this.flat = flat;
    this.side = side;
    this.condoFee = condoFee;
    this.rent = rent;
  }
}
createHouse.prototype.introduce = function () {
  console.log(this);
};
const house2 = new createHouse(3, 2, "North", 500, 5000);
house2.introduce();
