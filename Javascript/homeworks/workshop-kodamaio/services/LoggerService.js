export class BaseLogger {
  getTime() {
    return new Date().toISOString();
  }

  log() {
    throw new Error("Log methodu implemente edilmedi.");
  }
}

export class CategoryLogger extends BaseLogger {
  log(message, data) {
    console.log(`${this.getTime()} Category Logger`, message, data);
  }
}
