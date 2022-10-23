export default class CourseService {
  constructor(logger) {
    this.courses = [];
    this.logger = logger;
  }

  getCourses(filterCallback) {
    return filterCallback ? this.courses.filter(filterCallback) : this.courses;
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

  updateCourse(courseId, updatedData) {
    this.courses = this.courses.map((course) => {
      if (course.courseId === courseId) {
        return { ...course, ...updatedData };
      }
      return course;
    });
  }
}
