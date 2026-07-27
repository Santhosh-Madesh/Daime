

class CreateUser{

    constructor( { userRepository, hasher }){
        this.userRepository = userRepository;
        this.hasher = hasher;
    }

    async execute(user){

        const { name, email, password } = user;

        if(!name || !email || !password){ return false };

        // check if email or username exists
        const emailExists = await this.userRepository.findByEmail(user.email);
        const usernameExists = await this.userRepository.findByUsername(user.name);

        // if true then return false
        if(emailExists || usernameExists){
            return false;
        }
        
        // hash the password
        const salt=10;
        const hashedPassword = await this.hasher.hash(user.password, salt);

        // save the user object -> name, email, password
        const userCreated = await this.userRepository.create(
            {
                name: user.name,
                email: user.email,
                password: hashedPassword
            }
        )

        // return true
        return userCreated;
    }
}


module.exports = CreateUser;