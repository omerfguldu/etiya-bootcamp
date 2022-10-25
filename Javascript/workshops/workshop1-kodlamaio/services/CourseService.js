export default class CourseService {
  constructor(logger, user) {
    this.courses = [];
    this.logger = logger;
    this.user = user;
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

  registerUser(courseId, user) {
    let courseName = "";
    this.courses.filter((course) => {
      if (course.courseId === courseId) {
        courseName = course.courseTitle;
        course.registeredUsers.push(user);
        this.user.users.filter((u) => {
          if (u.userId === user.userId) {
            u.registeredCourses.push(course);
          }
        });
      }
    });
    this.logger.log(`${courseName} has a new member`, user);
  }
}
