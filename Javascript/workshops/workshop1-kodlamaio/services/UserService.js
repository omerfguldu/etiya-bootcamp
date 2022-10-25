export default class UserService {
  constructor(logger) {
    this.users = [];
    this.logger = logger;
  }

  getUsers(filterCallback) {
    return filterCallback ? this.users.filter(filterCallback) : this.users;
  }

  addUser(newUser) {
    this.users.push(newUser);
    this.logger.log("New user added: ", newUser);
  }

  deleteUser(userId) {
    this.users = this.users.filter((user) => user.userId !== userId);
    this.logger.log("ID of the deleted user is", userId);
  }

  updateUser(userId, updatedData) {
    this.users = this.users.map((user) => {
      if (user.userId === userId) {
        return { ...user, ...updatedData };
      }
      return user;
    });
  }
}
