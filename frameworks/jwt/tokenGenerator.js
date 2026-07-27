const jwt = require("jsonwebtoken");
require("dotenv").config();

class TokenGenerator{


    async sign(payload){

        const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY)

        return token;
    }

    async verify(data){

        const verified = await jwt.verify(data, process.env.JWT_SECRET_KEY);

        return verified;
    }
}

module.exports = TokenGenerator;