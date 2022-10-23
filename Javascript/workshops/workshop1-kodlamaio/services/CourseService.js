export default class CourseService {
  constructor(logger) {
    this.courses = [];
    this.logger = logger;
  }

  getCourses() {
    return this.courses;
  }

  addCourse(newCourse) {
    this.courses.push(newCourse);
    this.logger.log("New course added: ", newCourse);
  }

  deleteCourse(courseId) {
    this.courses = this.courses.filter(
      (course) => course.courseId !== courseId
    );
    this.logger.log("ID of the deleted course is", courseId);
  }
}
