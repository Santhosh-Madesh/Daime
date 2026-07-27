

class GetUserProfile{

    constructor({ userRepository }){
        this.userRepository = userRepository;
    }


    async execute(userId){

        if(!userId) { return false }

        const userRetrived = await this.userRepository.findById(userId);

        if(!userRetrived){ return false }

        return {
            name: userRetrived.name,
            email: userRetrived.email,
            role: userRetrived.role
        }

    }
}

module.exports = GetUserProfile;