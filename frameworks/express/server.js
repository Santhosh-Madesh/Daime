
const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const adaptRoute = require("./expressRouteAdapter");
const adaptMiddleware = require("./expressMiddlewareAdapter");

const userModel = require("../models/userModel");
const MongoUserRepository = require("../repositories/MongoUserRepository");

const cityModel = require("../models/cityModel");
const MongoCityRepository = require("../repositories/MongoCityRepository");

const theatreModel = require("../models/theatreModel");
const MongoTheatreRepository = require("../repositories/MongoTheatreRepository");

const screenModel = require("../models/screenModel");
const MongoScreenRepository = require("../repositories/MongoScreenRepository");

const movieModel = require("../models/movieModel");
const MongoMovieRepository = require("../repositories/MongoMovieRepository");

const showModel = require("../models/showModel");
const MongoShowRepository = require("../repositories/MongoShowRepository");

const GetAllUsers = require("../../domain/useCases/user/getAllUsers");
const CreateUser = require("../../domain/useCases/user/createUser");
const LoginUser = require("../../domain/useCases/user/loginUser");
const GetUserProfile = require("../../domain/useCases/user/getUserProfile");

const GetAllUsersController = require("../../adapters/controllers/getAllUsersController");
const CreateUserController = require("../../adapters/controllers/createUserController");
const LoginUserController = require("../../adapters/controllers/loginUserController");
const GetUserProfileController = require("../../adapters/controllers/getUserProfileController");

const AuthMiddleware = require("../middlewares/authMiddleware");

const UserRoutes = require("../../adapters/routes/userRoutes");

const Hasher = require("../bcrypt/hasher");
const TokenGenerator = require("../jwt/tokenGenerator");

const dns = require("node:dns");
dns.setServers(["1.1.1.1"]);

async function startServer(){

    await mongoose.connect(`mongodb+srv://roxine359_db_user:${process.env.DB_PASSWORD}.mongodb.net/?appName=${process.env.DB_NAME}`);

    const userRepository = new MongoUserRepository({ userModel: userModel });
    const cityRepository = new MongoCityRepository({ cityModel: cityModel });
    const theatreRepository = new MongoTheatreRepository({ theatreModel: theatreModel });
    const screenRepository = new MongoScreenRepository({ screenModel: screenModel });
    const movieRepository = new MongoMovieRepository({ movieModel: movieModel });
    const showRepository = new MongoShowRepository({ showModel: showModel });

    const hasher = new Hasher;
    const tokenGenerator = new TokenGenerator;

    const getAllUsersUseCase = new GetAllUsers({ userRepository });
    const createUserUseCase = new CreateUser({ userRepository, hasher});
    const loginUserUseCase = new LoginUser({ userRepository, hasher, tokenGenerator });
    const getUserProfileUseCase = new GetUserProfile({ userRepository });

    const getAllUsersController = new GetAllUsersController({ getAllUsersUseCase });
    const createUserController = new CreateUserController({ createUserUseCase });
    const loginUserController = new LoginUserController({ loginUserUseCase });
    const getUserProfileController = new GetUserProfileController({ getUserProfileUseCase });

    const authMiddleware = new AuthMiddleware({ tokenGenerator});

    const userRoutes = new UserRoutes({ getAllUsersController, createUserController, loginUserController, getUserProfileController, authMiddleware });

    const app = express();
    app.use(express.json());

    const routes = userRoutes.getRoutes();

    for( const route of routes ){
        if(route.method === "GET"){
            app.get(route.path, ...route.middlewares.map(adaptMiddleware), adaptRoute(route.handler))
        } else if (route.method === "POST"){
            app.post(route.path, ...route.middlewares.map(adaptMiddleware), adaptRoute(route.handler))
        }
    }
    
    

    app.listen(3000, ()=>{
        console.log("Server is up & running in port 3000")
    })
}

startServer().catch(console.error);