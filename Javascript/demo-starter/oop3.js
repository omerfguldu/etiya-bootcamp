export class BaseLogger {
  getTimeNow() {
    return new Date().toISOString();
  }
  log(message, data) {
    throw new Error("log methodu implemente edilmedi.");
  }
}

export class FileLogger extends BaseLogger {
  log(message, data) {
    console.log(`${this.getTimeNow()} File Logger`, message, data);
  }
}

export class SmsLogger extends BaseLogger {
  log(message, data) {
    console.log(`${this.getTimeNow()} Sms Logger`, message, data);
  }
}

export class EmailLogger extends BaseLogger {
  log(message, data) {
    console.log(`${this.getTimeNow()} Email Logger`, message, data);
  }
}
