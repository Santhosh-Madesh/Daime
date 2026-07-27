
const GetUserProfile = require("../../domain/useCases/getUserProfile");
const MockRepository = require("../mockRepositories/mockUserRepository");

const mockedRepository = new MockRepository;
const getUserProfileUseCase = new GetUserProfile({ userRepository: mockedRepository });

test("when provided no input or null, should return false", async()=>{

    const userId = null;

    const userRetrived = await getUserProfileUseCase.execute(userId);

    expect(userRetrived).toBe(false);

})

test("when provided a valid input / userId , should return an object ( user obj )", async()=>{

    const userId = "9281498AFES";

    const userRetrived = await getUserProfileUseCase.execute(userId);

    expect(typeof(userRetrived)).toBe("object");
})

test("when provided a valid user Id, should return an object with expected fields name and email", async()=>{

    const validUsers = [
        {
            id: "9281498AFES",
            name: "Valid User",
            email: "validemail@gmail.com"
        },
        {
            id:"39295ETSE",
            name: "Achilles",
            email: "randomUser@gmail.com"
        },
        {
            id:"6a5891f2108f563a0d7a2f53",
            name:"Alan turing",
            email:"alanturing@gmail.com"
        }
    ]

    for( const user of validUsers ){

        const userId = user.id;

        const userRetrived = await getUserProfileUseCase.execute(userId);

        expect(userRetrived).toStrictEqual({
            name: user.name,
            email: user.email
        })
    }
})

test("when provided an invalid user Id, should return false", async()=>{

    const userId = "ABCDEFGHIJKLMNOP" //Invalid User Id

    const userRetrived = await getUserProfileUseCase.execute(userId);

    expect(userRetrived).toBe(false);

})