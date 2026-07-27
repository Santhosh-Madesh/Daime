

class AuthMiddleware{

    constructor({ tokenGenerator }){
        this.tokenGenerator = tokenGenerator;
    }


    async handleRequest(Request){

        const authHeaders = Request.headers.authorization;

        if(!authHeaders || !authHeaders.startsWith("Bearer ")){ return false }

        const token = authHeaders.split(" ")[1];

        const verifiedData = await this.tokenGenerator.verify(token);

        if(!verifiedData){ return false };

        return verifiedData.userId;

    }

}

module.exports = AuthMiddleware;