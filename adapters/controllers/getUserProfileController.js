

class GetUserProfileController{

    constructor({ getUserProfileUseCase }){
        this.getUserProfileUseCase = getUserProfileUseCase;
    }

    async handleRequest(Request){

        const userId  = Request.userId;

        const retrivedUserProfile = await this.getUserProfileUseCase.execute(userId);

        if(!retrivedUserProfile){ 
            const response = {
                statusCode: 500,
                body: { error: "Internal server error"}
            }

            return response
        }

        const response = {
            statusCode: 200,
            body: { retrivedUserProfile }
        }

        return response;
    }
}

module.exports = GetUserProfileController;