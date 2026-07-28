const MockTheatreRepository = require("../mockRepositories/mockTheatreRepository");
const GetTheatre = require("../../domain/useCases/getTheatre");

const mockTheatreRepository = new MockTheatreRepository;
const getTheatreUseCase = new GetTheatre({ theatreRepository:mockTheatreRepository });

beforeEach(()=>{
    mockTheatreRepository.clearSpyCalls();
})

test("when provided empty or null theatre Id, should return false", async()=>{

    const theatreIds = ["", null, undefined];


    for( const theatreId of theatreIds){
        
        const theatre = await getTheatreUseCase.execute(theatreId);

        expect(theatre).toBe(false);

    }
    
})


test("when provided a fake or Invalid ID, should return false", async()=>{

    const theatreId = "FAKEIDEHHH"

    const theatre = await getTheatreUseCase.execute(theatreId);

    expect(theatre).toBe(false);
    expect(mockTheatreRepository.findByIdSpyCall).toBe(1);
})


test("when valid theatre ID provided, should return theatre data", async()=>{

    const theatreId = "AFF23FF"

    const theatre = await getTheatreUseCase.execute(theatreId);

    expect(theatre).toStrictEqual({
            _id:"AFF23FF",
            name: "AGS Cinemas",
            cityId: "AFFAB2812BA" 
        })
})

test("when valid theatre ID provided, should call the findById method", async()=>{

    const theatreId = "AFF23FF"

    const theatre = await getTheatreUseCase.execute(theatreId);

    expect(mockTheatreRepository.findByIdSpyCall).toBe(1);
})