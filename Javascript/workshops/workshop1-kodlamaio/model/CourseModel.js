export default class Course {
  constructor(
    courseId,
    courseCategory,
    courseTitle,
    courseDescripton,
    courseInstructor,
    courseFee,
    coursePicture
  ) {
    this.courseId = courseId;
    this.courseCategory = courseCategory;
    this.courseTitle = courseTitle;
    this.courseDescripton = courseDescripton;
    this.courseInstructor = courseInstructor;
    this.courseFee = courseFee;
    this.coursePicture = coursePicture;
  }
}
