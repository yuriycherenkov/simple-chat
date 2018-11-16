import users from '../db/users';
import helpers from '../helpers';

class Users {
  constructor(usersData) {
    this.users = usersData;
  }

  getUsers() {
    return this.users;
  }

  getCurrentUser(id) {
    return this.users.find(user => user.id === id);
  }

  addUser(name) {
    const newUser = { name, id: helpers.createUniqueId('userId') };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(name, id) {
    const currentUser = this.getCurrentUser(id);

    if (!currentUser) return false;

    currentUser.name = name;

    return currentUser;
  }
}

const allUsers = new Users(users);

export default allUsers;
