

class LoginUser{

    constructor( { userRepository, hasher, tokenGenerator } ){
        this.userRepository = userRepository;
        this.hasher = hasher;
        this.tokenGenerator = tokenGenerator;
    }

    async execute(user){

        const emailExists = user.email;
        const passwordExists = user.password;

        if(!emailExists || !passwordExists){ return false }

        const foundUser = await this.userRepository.findByEmail(user.email);
        if( !foundUser ) { return false }

        
        const passwordMatches = await this.hasher.compare(user.password, foundUser.password);
        if(!passwordMatches) { return false }

        const payload = {
            userId: foundUser.id
        }
        const token = await this.tokenGenerator.sign(payload);

        return token;

    }
}


module.exports = LoginUser;