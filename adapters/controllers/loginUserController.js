

class LoginUserController {

    constructor({ loginUserUseCase }){
        this.loginUserUseCase = loginUserUseCase;
    }

    async handleRequest(Request){

        const { email, password } = Request.body;

        const user = {
            email: email,
            password: password
        }

        const userToken = await this.loginUserUseCase.execute(user);

        if(!userToken){
            const response = {
                statusCode: 400,
                body: { error: "Bad request!" }
            }

            return response
        }

        const response = {
            statusCode: 200,
            body: { 
                message: "User Successfully logged in",
                token: userToken,
            }
        }

        return response;

    }
}

module.exports = LoginUserController;