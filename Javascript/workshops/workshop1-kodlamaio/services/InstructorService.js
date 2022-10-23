export default class InstructorService {
  constructor(logger) {
    this.logger = logger;
    this.instructors = [];
  }

  getInstructors() {
    return this.instructors;
  }

  addInstructor(newInstructor) {
    this.instructors.push(newInstructor);
    this.logger.log("New instructor added: ", newInstructor);
  }

  deleteCategory(instructorId) {
    this.instructors = this.instructors.filter(
      (instructor) => instructor.instructorId !== instructorId
    );
    this.logger.log("ID of the deleted instructor is", instructorId);
  }
}
