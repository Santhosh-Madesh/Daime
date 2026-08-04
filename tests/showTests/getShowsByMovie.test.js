const MockShowRepository = require("../mockRepositories/mockShowRepository");
const MockMovieRepository = require("../mockRepositories/mockMovieRepository");

const GetShowsByMovie = require("../../domain/useCases/show/getShowsByMovie");

const mockShowRepository = new MockShowRepository;
const mockMovieRepository = new MockMovieRepository;

const getShowsByMovieUseCase = new GetShowsByMovie({ showRepository: mockShowRepository, movieRepository: mockMovieRepository });

beforeEach(()=>{
    mockShowRepository.clearSpyCalls();
})

test("when no input provided, return false", async()=>{

    const payloads = ["", null, undefined, {}];

    for( const payload of payloads ){

        const showsRetrived = await getShowsByMovieUseCase.execute(payload);

        expect(showsRetrived).toBe(false);
    }
})


test("when provided invalid movie ID, return false", async()=>{

    const invalidMovieId = "INVALIDMOVIEID"

    const showsRetrived = await getShowsByMovieUseCase.execute(invalidMovieId);

    expect(mockMovieRepository.findByIdSpyCall).toBe(1);
    expect(showsRetrived).toBe(false)
})

test("when provided valid movie ID, should call the findByMovieId method of show repo", async()=>{

    const movieId = "FFAA33F";

    const showRetrived = await getShowsByMovieUseCase.execute(movieId);

    expect(mockShowRepository.findByMovieIdSpyCall).toBe(1);
})

test("when provided valid movie ID, returned data should be an Array", async()=>{

    const movieId = "FFAA33F";

    const showRetrived = await getShowsByMovieUseCase.execute(movieId);

    expect(Array.isArray(showRetrived)).toBe(true);
})