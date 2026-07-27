
const MockCityRepository = require("../mockRepositories/mockCityRepository");
const EmptyMockCityRepository = require("../mockRepositories/emptyMockCityRepository");
const GetAllCities = require("../../domain/useCases/getAllCities");

const mockCityRepository = new MockCityRepository
const emptyMockCityRepository = new EmptyMockCityRepository;

const getAllCitiesUseCase = new GetAllCities({ cityRepository:mockCityRepository })
const emptyGetAllCitiesUseCase = new GetAllCities({ cityRepository: emptyMockCityRepository });




test("should return empty array when no data exists", async()=>{

    const allCities = await emptyGetAllCitiesUseCase.execute();

    expect(allCities).toStrictEqual([])
})


test("should return type array when data when data exists", async()=>{

    const allCities = await getAllCitiesUseCase.execute();

    expect(Array.isArray(allCities)).toBe(true);
})


test("should return the data when data exists", async()=>{

    const expectedData = [
            {
                "_id" : "AFFAB2812BA",
                "name" : "chennai",
            },
            {
                "_id" : "AFFAB2812BBBC",
                "name" : "mumbai",
            },
            {
                "_id" : "AFFAB2812BABBFC",
                "name" : "delhi",
            },
        ]


    const allCities = await getAllCitiesUseCase.execute();


    expect(allCities).toStrictEqual(expectedData);

})
