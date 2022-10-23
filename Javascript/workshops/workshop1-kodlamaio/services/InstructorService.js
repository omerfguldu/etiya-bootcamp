export default class InstructorService {
  constructor(logger) {
    this.logger = logger;
    this.instructors = [];
  }

  getInstructors(filterCallback) {
    return filterCallback
      ? this.instructors.filter(filterCallback)
      : this.instructors;
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

  updateInstructor(instructorId, updatedData) {
    this.instructors = this.instructors.map((instructor) => {
      if (instructor.instructorId === instructorId) {
        return { ...instructor, ...updatedData };
      }
      return instructor;
    });
  }
}
