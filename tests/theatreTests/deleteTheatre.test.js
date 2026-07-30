const MockTheatreRepository = require("../mockRepositories/mockTheatreRepository");
const DeleteTheatre = require("../../domain/useCases/theatre/deleteTheatre");

const mockTheatreRepository = new MockTheatreRepository;
const deleteTheatreUseCase = new DeleteTheatre({ theatreRepository: mockTheatreRepository });


beforeEach(()=>{
    mockTheatreRepository.clearSpyCalls();
})


test("when provided no theatre id, should return false", async()=>{

    const theatreIds = ["", null, undefined, {}];

    for(const theatreId of theatreIds){

        const theatreDeleted = await deleteTheatreUseCase.execute(theatreId);

        expect(theatreDeleted).toBe(false);
    }
})

test("when provided invalid Theatre ID, should return false", async()=>{

    const invalidTheatreId = "WOAHIAMSOINVALAID"

    const theatreDeleted = await deleteTheatreUseCase.execute(invalidTheatreId);

    expect(theatreDeleted).toBe(false);
})


test("when provided valid theatre ID, should call the deleteById method of theatre repo", async()=>{

    const theatreId = "AFF23FF";

    const theatreDeleted = await deleteTheatreUseCase.execute(theatreId);

    expect(mockTheatreRepository.deleteByIdSpyCall).toBe(1)
})

test("when provided valid theatre ID, should return true", async()=>{

    const theatreId = "AFF23FF";

    const theatreDeleted = await deleteTheatreUseCase.execute(theatreId);

    expect(theatreDeleted).toBe(true)
})