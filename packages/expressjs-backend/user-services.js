import User from "./user.js";

function getUsers() {
  return User.find();
}

function findUserByName(name) {
  return User.find({ name });
}

function findUserByJob(job) {
  return User.find({ job });
}

function findUserByNameAndJob(name, job) {
  return User.find({ name, job });
}

function findUserById(id) {
  return User.findById(id);
}

function addUser(user) {
  const newUser = new User(user);
  return newUser.save();
}

function deleteUserById(id) {
  return User.findByIdAndDelete(id);
}

export {
  getUsers,
  findUserByName,
  findUserByJob,
  findUserByNameAndJob,
  findUserById,
  addUser,
  deleteUserById,
};