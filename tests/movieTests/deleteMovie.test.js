const MockMovieRepository = require("../mockRepositories/mockMovieRepository");
const DeleteMovie = require("../../domain/useCases/movie/deleteMovie");

const mockMovieRepository = new MockMovieRepository;
const deleteMovieUseCase = new DeleteMovie({ movieRepository: mockMovieRepository });


beforeEach(()=>{
    mockMovieRepository.clearSpyCalls(),
    mockMovieRepository.resetData()
})


test("when no data provided, return false", async()=>{

    const payloads = ["", null, undefined, {}];

    for( const payload of payloads ){

        const movieDeleted = await deleteMovieUseCase.execute(payload);

        expect(movieDeleted).toBe(false);
    }
})

test("when provided invalid ID, return false", async()=>{

    const invalidId = "InvallidIDDD"

    const movieDeleted = await deleteMovieUseCase.execute(invalidId);

    expect(movieDeleted).toBe(false);
})

test("when provided valid ID, call deleteById method of movie repo", async()=>{

    const movieId = "BBCDDFEE";

    const movieDeleted = await deleteMovieUseCase.execute(movieId);

    expect(mockMovieRepository.deleteByIdSpyCall).toBe(1)
})


test("when provided valid ID, should return true", async()=>{

    const movieId = "BBCDDFEE"

    const movieDeleted = await deleteMovieUseCase.execute(movieId);

    expect(movieDeleted).toBe(true)
})