

class MongoUserRepository{

    constructor( { userModel }){
        this.userModel = userModel;
    }

    async findAll(){

        const users = await this.userModel.find().lean();

        return users.map((user)=>({
            id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }))
    }

    async findByEmail(email){

        const user = await this.userModel.findOne({email: email});

        return user;
    }

    async findById(userId){

        const user = await this.userModel.findOne({_id:userId});

        return {
            name: user.name,
            email: user.email
        }
    }

    async findByUsername(name){

        const user = await this.userModel.findOne({name: name})

        return user;
    }

    async create(user){

        const userCreated = await this.userModel.create({
            name: user.name,
            email: user.email,
            password: user.password
        })

        return userCreated;
    }
}

module.exports = MongoUserRepository;