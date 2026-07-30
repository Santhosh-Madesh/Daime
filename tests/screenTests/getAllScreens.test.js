const MockScreenRepository = require("../mockRepositories/mockScreenRepository");
const MockTheatreRepository = require("../mockRepositories/mockTheatreRepository");

const GetAllScreens = require("../../domain/useCases/screen/getAllScreens");

const mockScreenRepository = new MockScreenRepository;
const mockTheatreRepository = new MockTheatreRepository;

const getAllScreensUseCase = new GetAllScreens({ screenRepository: mockScreenRepository, theatreRepository: mockTheatreRepository});


beforeEach(()=>{
    mockScreenRepository.clearSpyCalls();
})

test("when provided no data, should return false", async()=>{

    const payloads = ["", null, undefined, {}];

    for( const payload of payloads ){

        const screenRetrived = await getAllScreensUseCase.execute(payload);

        expect(screenRetrived).toBe(false);
    }
})

test("when provided invalid theatre ID, should return false", async()=>{

    const invalidTheatreId = "INVALIDID";

    const screenRetrived = await getAllScreensUseCase.execute(invalidTheatreId);

    expect(screenRetrived).toBe(false)
})


test("when provided valid theatreId, should call findByTheatreId method of screen repo", async()=>{

    const theatreId = "AFF23FF";

    const screensRetrived = await getAllScreensUseCase.execute(theatreId);

    expect(mockScreenRepository.findByTheatreIdSpyCall).toBe(1);
})


test("when provided valid theatreId, return an Array", async()=>{

    const theatreId = "AFF23FF";

    const screensRetrived = await getAllScreensUseCase.execute(theatreId);

    expect(Array.isArray(screensRetrived)).toBe(true);
})