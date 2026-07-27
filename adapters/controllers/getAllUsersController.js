
class getAllUsersController{

    constructor({ getAllUsersUseCase }){
        this.getAllUsersUseCase = getAllUsersUseCase;
    }


    async handleRequest(request){

        try{

            const users = await this.getAllUsersUseCase.execute();

            const responseObj = {
                statusCode: 200,
                body: { users }
            }

            return responseObj;

        } catch(error){

            const errorObj = {
                statusCode : 500,
                body: {
                    error: "Internal server error"
                }
            }
            return errorObj;
        }
    }
}

module.exports = getAllUsersController;