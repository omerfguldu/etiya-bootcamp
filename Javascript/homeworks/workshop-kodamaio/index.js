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

const categoryLogger = new CategoryLogger();
const instructorLogger = new InstructorLogger();
const courseLogger = new CourseLogger();

const categoryService = new CategoryService(categoryLogger);
const instructorService = new InstructorService(instructorLogger);
const courseService = new CourseService(courseLogger);

const categoryProgramming = new Category(1, "Programming");
const categoryEnglish = new Category(2, "English");
categoryService.addCategory(categoryProgramming);
categoryService.addCategory(categoryEnglish);

const instructorHalitKalayci = new Instructor(1, "Halit", "Kalayci", "Picture");
const instructorAhmetCetinkaya = new Instructor(
  2,
  "Ahmet",
  "Cetinkaya",
  "Picture"
);
const instructorEnginDemirog = new Instructor(3, "Engin", "Demirog", "Picture");
instructorService.addInstructor(instructorHalitKalayci);
instructorService.addInstructor(instructorAhmetCetinkaya);
instructorService.addInstructor(instructorEnginDemirog);

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
courseService.addCourse(courseJavascript);
courseService.addCourse(courseAngular);
courseService.addCourse(courseEnglish);

// console.log(categoryService.getCategories());
// categoryService.deleteCategory(categoryEnglish.categoryId);
// console.log(categoryService.getCategories());

const currentCourses = courseService.getCourses();
for (const course of currentCourses) {
  console.log(course.courseInstructor);
}
