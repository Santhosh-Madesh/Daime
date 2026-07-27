
class GetAllUsers{

    constructor({ userRepository }){
        this.userRepository = userRepository;
    }

    async execute(){
        const userData = await this.userRepository.findAll();

        return userData.map((userData)=>({
            id: userData.id,
            name: userData.name,
            email: userData.email,
            createdAt: userData.createdAt,
            updatedAt: userData.updatedAt
        }))
    }
}

module.exports = GetAllUsers