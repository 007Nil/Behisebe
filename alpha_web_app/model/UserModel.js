const User = class {
    constructor(id,firstName,lastName,email) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}

module.exports = User;