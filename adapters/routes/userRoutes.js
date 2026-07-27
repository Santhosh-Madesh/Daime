
class UserRoutes{

    constructor({ getAllUsersController, createUserController, loginUserController, getUserProfileController, authMiddleware }){
        this.getAllUsersController = getAllUsersController;
        this.createUserController = createUserController;
        this.loginUserController = loginUserController;
        this.getUserProfileController = getUserProfileController;
        this.authMiddleware = authMiddleware;
    }


    getRoutes(){
        return [{
            method: "GET",
            path: "/users",
            middlewares: [],
            handler: this.getAllUsersController    
        },
        {
            method: "POST",
            path: "/user/signup",
            middlewares: [],
            handler: this.createUserController
        },
        {
            method: "POST",
            path: "/user/login",
            middlewares: [],
            handler: this.loginUserController
        },
        {
            method: "GET",
            path: "/user/me",
            middlewares: [
                this.authMiddleware
            ],
            handler: this.getUserProfileController
        }
    ]
    }
}

module.exports = UserRoutes;