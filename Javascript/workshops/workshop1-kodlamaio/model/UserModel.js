export default class User {
  constructor(
    userId,
    userName,
    userLastname,
    userEmail,
    userPassword,
    userPicture,
    registeredCourses
  ) {
    this.userId = userId;
    this.userName = userName;
    this.userLastname = userLastname;
    this.userEmail = userEmail;
    this.userPassword = userPassword;
    this.userPicture = userPicture;
    this.registeredCourses = registeredCourses;
  }
}
