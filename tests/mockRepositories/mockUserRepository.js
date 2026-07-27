

class MockUserRepository{

    constructor(){
        const data = [
            {
                _id: "9281498AFES",
                name: "Valid User",
                email: "validemail@gmail.com",
                // hashedVersionOfPassword - it is what actually gets stored
                // actual password - validuserpassword
                password: "$2b$10$98aDaoR9W8uQEorZmK7cG.qy./SdoWXB.uEy/YYR37Zk6Tbksx8Ny" 
            },
            {
                _id:"39295ETSE",
                name: "Achilles",
                email: "randomUser@gmail.com",
                password: "randomPassword"
            },
            {
                _id:"6a5891f2108f563a0d7a2f53",
                name:"Alan turing",
                email:"alanturing@gmail.com",
                password:"$2b$10$21YECAYVlOKKjXky2Vuuxu9NpOTILfBKNzcEKZScNvLrmrlIXrIwK"
            }
        ]

        this.database = data;
    }

    async findAll(){

        const users = this.database;

        return users.map((user)=>({
            id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }))
    }

    async findById(userId){

        for( const data of this.database ){
            if(data._id === userId){
                return {
                    name: data.name,
                    email: data.email
                }
            }
        }
    }

    async findByEmail(email){

        for(const data of this.database){
            if(data.email === email){
                return data;
            }
        }


        return false;
    }

    async findByUsername(name){

        for(const data of this.database){
            if(data.name === name){
                return data;
            }
        }

        return false;
    }

    async create(user){

        this.database.push({
            _id: Math.random()*1000,
            name: user.name,
            email: user.email,
            password: user.password
        })

        return this.database.at(-1);
    }
}

module.exports = MockUserRepository;