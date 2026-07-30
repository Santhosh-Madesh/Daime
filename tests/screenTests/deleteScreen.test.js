const MockScreenRepository = require("../mockRepositories/mockScreenRepository");
const MockTheatreRepository = require("../mockRepositories/mockTheatreRepository");

const DeleteScreen = require("../../domain/useCases/deleteScreen");

const mockScreenRepository = new MockScreenRepository;
const mockTheatreRepository = new MockTheatreRepository;

const deleteScreenUseCase = new DeleteScreen({ screenRepository: mockScreenRepository, theatreRepository:mockTheatreRepository });


beforeEach(()=>{
    mockScreenRepository.clearSpyCalls();
    mockScreenRepository.resetData();
})

test("when provided no data , return false", async()=>{

    const screenIds = ["", null, undefined, {}];

    for( const screenId of screenIds ){

        const screenDeleted = await deleteScreenUseCase.execute(screenId);

        expect(screenDeleted).toBe(false);
    }
})

test("when provided invalid screen id, return false", async()=>{

    const invalidScreenId = "INVALIDEHHHH"

    const screenDeleted = await deleteScreenUseCase.execute(invalidScreenId);

    expect(screenDeleted).toBe(false);

})

test("when valid screen id, call the deleteById method of screen repo", async()=>{

    const screenId = "FFAA33F";

    const screenDeleted = await deleteScreenUseCase.execute(screenId);

    expect(mockScreenRepository.deleteByIdSpyCall).toBe(1);
})

test("when valid screen id, delete and return true", async()=>{

    const screenId = "FFAA33F";

    const screenDeleted = await deleteScreenUseCase.execute(screenId);

    expect(screenDeleted).toBe(true);
})