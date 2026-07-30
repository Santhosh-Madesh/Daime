const MockTheatreRepository = require("../mockRepositories/mockTheatreRepository");
const CreateTheatre = require("../../domain/useCases/theatre/createTheatre");
const MockCityRepository = require("../mockRepositories/mockCityRepository");

const mockTheatreRepository = new MockTheatreRepository;
const mockCityRepository = new MockCityRepository;
const createTheatreUseCase = new CreateTheatre({ theatreRepository:mockTheatreRepository, cityRepository:mockCityRepository });

test("when provided no data, should return false", async()=>{
    
    const payload = {};

    const theatreCreated = await createTheatreUseCase.execute(payload);
    
    expect(theatreCreated).toBe(false);
})


test("when provided valid data, should return the payload object itself & must have called the create method of the repo", async()=>{

    const payload = {
        name: "PVR Cinemas",
        cityId: "AFFAB2812BA" // Valid Mock City ID for chennai
    }

    const theatreCreated = await createTheatreUseCase.execute(payload);

    expect(theatreCreated).toStrictEqual(payload);
    
    expect(mockTheatreRepository.createSpyCall).toBe(1);
})


test("when provided invalid city id, should return false", async()=>{

    const payload = {
        name: "PVR Cinemas",
        cityId: "WEEEEWEEEE" // Invalid ID
    }

    const theatreCreated = await createTheatreUseCase.execute(payload);

    expect(theatreCreated).toBe(false);
})


test("when provided a duplicate data, should return false", async()=>{

    const payload = {
        name: "AGS Cinemas",
        cityId: "AFFAB2812BA" 
    }  // A duplicate
    

    const theatre = await createTheatreUseCase.execute(payload);

    expect(theatre).toBe(false);
    
})


test("when only the cityId is provided, should return false", async()=>{

    const payload = {
        cityId:"AFFAB2812BA"
    }

    const theatre = await createTheatreUseCase.execute(payload);

    expect(theatre).toBe(false);
})