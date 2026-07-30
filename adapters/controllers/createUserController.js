const CreateUser = require("../../domain/useCases/user/createUser");


class CreateUserController{

    constructor( { createUserUseCase } ){
        this.createUserUseCase = createUserUseCase;
    }

    async handleRequest(Request){

        try{

            const user = Request.body;

            const userCreated  = await this.createUserUseCase.execute(user);

            if(!userCreated){
                return {
                    statusCode: 400,
                    body: { error : "Bad request!" }
                }
            }

            return {
                statusCode: 201,
                body: { message: "User created successfully" }
            }
            


        } catch(error){
            const errorObj = {
                statusCode : 500,
                body: {error: "Internal server error"}
            }

            return errorObj;
        }
    }
}

module.exports = CreateUserController;