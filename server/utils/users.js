class User {
  constructor() {
    this.users = [];
  }
  //addUser
  joinChat(id, name, room) {
    const user = { id, name, room };
    this.users.push(user);;
    return user;
  }

  //removeUser
  leaveChat(id) {
     const user = this.getUser(id);
     if (user) {
        this.users = this.users.filter(user => user.id !== id)
     }
     return user;
  }

  getUser(id) {
    return this.users.filter(user => user.id === id)[0];
  }

  //pointless
  getUserList(room) {
    const users = this.users.filter(user => user.room === room);
    const namesArray = users.map(user => user.name);
    return namesArray;
  }
}

module.exports = { User };
