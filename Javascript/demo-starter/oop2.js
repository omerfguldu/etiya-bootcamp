import House, { house1 } from "./oop.js";
import { BaseLogger, SmsLogger, EmailLogger, FileLogger } from "./oop3.js";

class HouseService {
  constructor(logger) {
    this.houses = [];
    this.logger = logger;
  }

  list(filterCb) {
    // callback
    console.log(filterCb ? this.houses.filter(filterCb) : this.houses);
  }

  add(house) {
    this.houses.push(house);
    this.logger.log("Yeni bir ev eklendi", house);
  }
}
console.log("------------------- OOP2.JS LOGS -------------------");

//* configuration
const logger = new FileLogger(); //* PnP = Plug and Play mimarisi
//* configration ends
const houseService = new HouseService(logger);
// console.log(houseService.list());
const newHouse = new House(2, 4, "Northwest", 900, 6500);
houseService.add(newHouse);
// const newHouse2 = new House(2, 4, "South", 900, 6500);
// houseService.add(newHouse2);
houseService.list((house) => house.side === "South");
houseService.list();
