const userRepo = require("../repository/UserRepo");

async function addUser(userObj) {
    await userRepo.addUser(userObj);
}



async function findUserByEmail(userEmail) {
    return (await userRepo.findUserByEmail(userEmail));
}

module.exports = { findUserByEmail, addUser };