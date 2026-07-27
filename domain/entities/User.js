
class User{

    constructor({id, name, email, createdAt, updatedAt}){

        if(!id) throw new Error("User id is required");
        if(!name) throw new Error("User name is required");
        if(!email) throw new Error("User email is required");

        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }
}

module.exports = User;