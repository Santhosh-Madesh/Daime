const LoginUser = require("../../domain/useCases/loginUser");
const MockUserRepository = require("../mockRepositories/mockUserRepository");
const Hasher = require("../../frameworks/bcrypt/hasher");
const TokenGenerator = require("../../frameworks/jwt/tokenGenerator");

const mockedUserRepository = new MockUserRepository;
const hasher = new Hasher;
const tokenGenerator = new TokenGenerator;
const loginUserUseCase = new LoginUser({ userRepository:mockedUserRepository, hasher:hasher, tokenGenerator:tokenGenerator });


test("when email is not provided, should return false", async()=>{

    const userPayload = {
        email: "",
        password: "somerandompassword"
    }

    const userLoggedIn = await loginUserUseCase.execute(userPayload);

    expect(userLoggedIn).toBe(false);

})


test("when password is not provided, should return false", async()=>{

    const userPayload = {
        email: "validemail@gmail.com",
        password: ""
    }

    const userLoggedIn = await loginUserUseCase.execute(userPayload);
    
    expect(userLoggedIn).toBe(false);
})


test("when email does not exist, return false", async()=>{

    const userPayload = {
        email: "idontexisst@gmail.com",
        password: "validuserpassword"
    }

    const userLoggedIn = await loginUserUseCase.execute(userPayload);

    expect(userLoggedIn).toBe(false);
})


test("when email exists but the password doesnt match, return false", async()=>{

    const userPayload = {
        email: "validemail@gmail.com",
        password: "invaliduserpassword"
    }

    const userLoggedIn = await loginUserUseCase.execute(userPayload);

    expect(userLoggedIn).toBe(false);
})


test("when email & password exists and valid and matches, return token - a string", async()=>{

    const userPayload = {
        email: "alanturing@gmail.com",
        password: "alanturingtest"
    }

    const userLoggedIn = await loginUserUseCase.execute(userPayload);

    expect(typeof(userLoggedIn)).toBe("string");
})