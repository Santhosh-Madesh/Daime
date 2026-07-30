const MockRepository = require("../mockRepositories/mockUserRepository");
const Hasher = require("../../frameworks/bcrypt/hasher");
const CreateUser = require("../../domain/useCases/user/createUser");

const mockedRepository = new MockRepository;
const hasher = new Hasher;

const createUserUseCase = new CreateUser({ userRepository: mockedRepository, hasher: hasher});



test("when provided invalid inputs, should return false", async()=>{


    const payloads = [
        {
            name: "",
            email: "",
            password: ""
        },
        {
            name: "valid1username",
            email: "",
            password: ""
        },
        {
            name: "",
            email: "valid1email@gmail.com",
            password: ""
        },
        {
            name: "",
            email: "",
            password: "validpassword"
        },
        {
            name: "validusername",
            email: "valid1email@gmail.com",
            password: ""
        },
        {
            name: "valid1username",
            email: "",
            password: "validpassword"
        },
        {
            name: "",
            email: "valid1email@gmail.com",
            password: "validpassword"
        },

    ]

    for(const payload of payloads){
        let userCreated = await createUserUseCase.execute(payload);

        expect(userCreated).toBe(false);
    }
})



test("when provided valid inputs, should return true", async()=>{

    const payloads = [
        {
            name: "validuser2",
            email: "validuser2@gmail.com",
            password: "validuser2password"
        },
        {
            name: "valid3username",
            email: "validuser3@gmail.com",
            password: "validuser3password"
        },
        {
            name: "validuser4",
            email: "valid4email@gmail.com",
            password: "validuser4password"
        },
        {
            name: "validuser5",
            email: "validuser5@gmail.com",
            password: "validuser5password"
        },
        {
            name: "validuser6name",
            email: "valid6email@gmail.com",
            password: "validuser6password"
        },
        {
            name: "valid7username",
            email: "validuser7@gmail.com",
            password: "validuser7password"
        },
        {
            name: "validuser8name",
            email: "valid8email@gmail.com",
            password: "validpassword"
        },

    ]

    for(const payload of payloads){

        let userCreated = await createUserUseCase.execute(payload);

        expect(typeof(userCreated)).toBe("object");
    }
})



test("when provided existing user data, should return false", async()=>{

    const payload = {
        name:"Valid user",
        email:"validemail@gmail.com",
        password:"validuserpassword"
    }

    const userCreated = await createUserUseCase.execute(payload);

    expect(userCreated).toBe(false);
})


test("when provided a valid data, the given password should not be the same as the one saved in the database", async()=>{

    const payload = {
        name: "newUsername",
        email: "newEmail@gmail.com",
        password: "newPassword"
    }

    const userCreated = await createUserUseCase.execute(payload);

    expect(userCreated.password).not.toBe(payload.password);
})