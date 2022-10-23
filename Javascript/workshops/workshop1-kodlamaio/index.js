import Category from "./model/CategoryModel.js";
import Instructor from "./model/InstructorModel.js";
import Course from "./model/CourseModel.js";
import CategoryService from "./services/CategoryService.js";
import CourseService from "./services/CourseService.js";
import InstructorService from "./services/InstructorService.js";
import {
  CategoryLogger,
  InstructorLogger,
  CourseLogger,
} from "./services/LoggerService.js";

//* LOGGERS
const categoryLogger = new CategoryLogger();
const instructorLogger = new InstructorLogger();
const courseLogger = new CourseLogger();

//* SERVICES
const categoryService = new CategoryService(categoryLogger);
const instructorService = new InstructorService(instructorLogger);
const courseService = new CourseService(courseLogger);

//* CATEGORY CREATION
const categoryProgramming = new Category(1, "Programming");
const categoryEnglish = new Category(2, "English");
console.log(
  "------------------------ LOGS THAT COME FROM WHEN WE CREATE CATEGORIES ------------------------ "
);
categoryService.addCategory(categoryProgramming);
categoryService.addCategory(categoryEnglish);

//* INSTRUCTOR CREATION
const instructorHalitKalayci = new Instructor(1, "Halit", "Kalayci", "Picture");
const instructorAhmetCetinkaya = new Instructor(
  2,
  "Ahmet",
  "Cetinkaya",
  "Picture"
);
const instructorEnginDemirog = new Instructor(3, "Engin", "Demirog", "Picture");
console.log(
  "------------------------ LOGS THAT COME FROM WHEN WE CREATE INSTRUCTORS ------------------------ "
);
instructorService.addInstructor(instructorHalitKalayci);
instructorService.addInstructor(instructorAhmetCetinkaya);
instructorService.addInstructor(instructorEnginDemirog);

//* COURSE CREATION
const courseJavascript = new Course(
  1,
  categoryProgramming,
  "Javascript Course",
  "This course will teach Javascript ",
  instructorHalitKalayci,
  "Free",
  "Picture"
);
const courseAngular = new Course(
  2,
  categoryProgramming,
  "Angular Course",
  "This course will teach Angular ",
  instructorAhmetCetinkaya,
  "Free",
  "Picture"
);
const courseEnglish = new Course(
  3,
  categoryEnglish,
  "English Course",
  "This course will teach English ",
  instructorEnginDemirog,
  "Free",
  "Picture"
);

console.log(
  "------------------------ LOGS THAT COME FROM WHEN WE CREATE COURSES ------------------------ "
);
courseService.addCourse(courseJavascript);
courseService.addCourse(courseAngular);
courseService.addCourse(courseEnglish);

console.log(
  "------------------------ LOG ALL THE COURSES  ------------------------"
);
const currentCourses = courseService.getCourses();
for (const course of currentCourses) {
  console.log(course);
}

console.log(
  "------------------------ LOG PROGRAMMING COURSES  ------------------------"
);
const programmingCourses = courseService.getCourses(
  (course) => course.courseCategory === categoryProgramming
);
console.log(programmingCourses);

console.log(
  "------------------------ LOGS OF COURSES THAT INSTRUCTED BY ENGIN DEMIROG  ------------------------"
);
const enginDemirogCourses = courseService.getCourses(
  (course) => course.courseInstructor === instructorEnginDemirog
);
console.log(enginDemirogCourses);

console.log(
  "------------------------ UPDATED COURSE LOG  ------------------------"
);
courseService.updateCourse(3, { courseFee: "Non-Free" });
console.log(courseService.getCourses((course) => course.courseId === 3));

console.log(
  "------------------------ UPDATED INSTRUCTOR LOG  ------------------------"
);
instructorService.updateInstructor(1, { instructorName: "Halit Enes" });
console.log(
  instructorService.getInstructors(
    (instructor) => instructor.instructorId === 1
  )
);

console.log(
  "------------------------ UPDATED CATEGORY LOG  ------------------------"
);
categoryService.updateCategory(1, { categoryName: "Advanced English" });
console.log(
  categoryService.getCategories((category) => category.categoryId === 1)
);
