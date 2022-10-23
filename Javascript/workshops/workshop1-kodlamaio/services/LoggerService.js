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

export class InstructorLogger extends BaseLogger {
  log(message, data) {
    console.log(`${this.getTime()} Instructor Logger`, message, data);
  }
}

export class CourseLogger extends BaseLogger {
  log(message, data) {
    console.log(`${this.getTime()} Course Logger`, message, data);
  }
}
