
const MockTheatreRepository = require("../mockRepositories/mockTheatreRepository");
const MockCityRepository = require("../mockRepositories/mockCityRepository");

const ListTheatreByCity =  require("../../domain/useCases/theatre/listTheatreByCity");

const mockTheatreRepository = new MockTheatreRepository;
const mockCityRepository = new MockCityRepository;

const listTheatreByCityUseCase = new ListTheatreByCity({ theatreRepository:mockTheatreRepository, cityRepository:mockCityRepository });

beforeEach(()=>{
    mockTheatreRepository.clearSpyCalls();
    mockCityRepository.clearSpyCalls();
})

test("when provided no city id, should return false", async()=>{

    const cityIds = ["", null, undefined];

    for(const cityId of cityIds){

        const theatres = await listTheatreByCityUseCase.execute(cityId);

        expect(theatres).toBe(false);
    }
})


test("when provided Invalid City ID, should return false", async()=>{

    const InvalidCityId = "INVALIDEHHH"

    const theatres = await listTheatreByCityUseCase.execute(InvalidCityId);

    expect(theatres).toBe(false);
})

test("when provided Invalid City ID, should have called findById method of city repo", async()=>{

    const InvalidCityId = "INVALIDEHHH"

    const theatres = await listTheatreByCityUseCase.execute(InvalidCityId);

    expect(mockCityRepository.findByIdSpyCall).toBe(1);
})

test("when provided Valid City ID, the return object should be an Array", async()=>{

    const cityId = "AFFAB2812BA";

    const theatres = await listTheatreByCityUseCase.execute(cityId);

    expect(Array.isArray(theatres)).toBe(true);

})

test("when provided Valid City ID, should have called the findByCityId method in theatre repo", async()=>{

    const cityId = "AFFAB2812BA";

    const theatres = await listTheatreByCityUseCase.execute(cityId);

    expect(mockTheatreRepository.findByCityIdSpyCall).toBe(1);

})