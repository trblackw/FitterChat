class User {
  constructor() {
    this.users = [];
  }
  //addUser
  joinChat(id, name, room) {
    const user = { id, name, room };
    this.users.push(user);
    console.log(users);
    return user;
  }

  //removeUser
  leaveChat(id) {
     const user = this.getUser(id);
     if (user) {
        this.users = this.users.filter(user => user.id !== id)
     }
  }

  getUser(id) {
    const user = this.users.filter(user => user.id === id);
  }

  //pointless
  getUserList() {
    const users = this.users.filter(user => user.room === room);
    const namesArray = users.map(user => user.name);
    return namesArray;
  }
}

module.exports = { User };
