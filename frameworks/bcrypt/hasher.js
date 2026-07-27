const bcrypt = require("bcrypt");

class Hasher{

    async hash(toBeHashed, salt){

        const hashedData = await bcrypt.hash(toBeHashed, salt);

        return hashedData;
    }

    async compare(data, encryptedData){

        const comparedData = await bcrypt.compare(data, encryptedData)

        return comparedData;
    }
}

module.exports = Hasher;