const MockMovieRepository = require("../mockRepositories/mockMovieRepository");
const GetAllMovie = require("../../domain/useCases/movie/getAllMovie");

const mockMovieRepository = new MockMovieRepository;
const getAllMovieUseCase = new GetAllMovie({ movieRepository: mockMovieRepository});


beforeEach(()=>{
    mockMovieRepository.clearSpyCalls();
})

test("should call the find all method of movie repo", async()=>{

    const moviesRetrieved = await getAllMovieUseCase.execute();

    expect(mockMovieRepository.findAllSpyCall).toBe(1);
})


test("should return an array", async()=>{

    const moviesRetrieved = await getAllMovieUseCase.execute();

    expect(Array.isArray(moviesRetrieved)).toBe(true);
})

test("if pagination provided, the returned arrray length should be of the pagination limit's value", async()=>{

    const pagination = {
        offset:0,
        limit:1,
    }
    const moviesRetrived = await getAllMovieUseCase.execute(pagination);

    expect(moviesRetrived.length).toBe(pagination.limit)
})