const MockShowRepository = require("../mockRepositories/mockShowRepository");
const GetShow = require("../../domain/useCases/show/getShow");

const mockShowRepository = new MockShowRepository;
const getShowUseCase = new GetShow({ showRepository: mockShowRepository });


beforeEach(()=>{
    mockShowRepository.clearSpyCalls();
})

test("when no input provided, return false", async()=>{

    const payloads = ["", null, undefined, {}];

    for( const payload of payloads ){

        const showRetrived = await getShowUseCase.execute(payload);

        expect(showRetrived).toBe(false)
    }

})

test("when provided invalid Show Id, return false", async()=>{

    const invalidShowId = "INVALIDSHOWID"

    const showRetrived = await getShowUseCase.execute(invalidShowId);

    expect(mockShowRepository.findByIdSpyCall).toBe(1);
    expect(showRetrived).toBe(false);
})

test("when provided valid show id, call the findById method of show repo", async()=>{

    const showId = "BBCDDFEE";

    const showRetrived = await getShowUseCase.execute(showId);

    expect(mockShowRepository.findByIdSpyCall).toBe(1)
})

test("when provided valid show id, return the show data as an object", async()=>{

    const showId = "BBCDDFEE";

    const showRetrived = await getShowUseCase.execute(showId);

    expect(typeof(showRetrived) === "object").toBe(true)
})


test("when provided valid show id, return the show data as intended", async()=>{
    
    const showId = "BBCDDFEE"

    const expectedResult = {
            _id:"BBCDDFEE",
            starts_at: new Date("2026-08-03T09:00:00Z"),
            ends_at: new Date("2026-08-03T11:30:00Z"),
            screen_id: "AEFEEA",
            movie_id: "BBCDDFEE"
        }

    const showRetrived = await getShowUseCase.execute(showId);

    expect(showRetrived).toStrictEqual(expectedResult);
    
})