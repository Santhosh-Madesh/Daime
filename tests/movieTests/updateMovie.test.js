const MockMovieRepository = require("../mockRepositories/mockMovieRepository");
const UpdateMovie = require("../../domain/useCases/movie/updateMovie");

const mockMovieRepository = new MockMovieRepository;
const updateMovieUseCase = new UpdateMovie({ movieRepository: mockMovieRepository });

beforeEach(()=>{
    mockMovieRepository.clearSpyCalls();
    mockMovieRepository.resetData();
})



test("when no data provided, return false", async()=>{

    const payloads = ["", null, undefined, {}];

    for( const payload of payloads ){
        
        const movieUpdated = await updateMovieUseCase.execute(payload);

        expect(movieUpdated).toBe(false)
    }
})


test("when invalid movie Id provided, must call findById method and return false", async()=>{

    const payload = {
        movieId:"INVALIDID",
        newObj:{
            name: "Spider-Man: Brand New Day"
        }
    }

    const movieUpdated = await updateMovieUseCase.execute(payload.movieId, payload.newObj);

    expect(mockMovieRepository.findByIdSpyCall).toBe(1);
    expect(movieUpdated).toBe(false);
})


test("when provided valid ID but no newObj data, return false", async()=>{

    const payload = {
        movieId:"BBCDDFEE",
        newObj:{
            
        }
    }

    const movieUpdated = await updateMovieUseCase.execute(payload.movieId, payload.newObj);

    expect(movieUpdated).toBe(false)
})

test("when provided valid ID and newObj, should call updateById of movie repo", async()=>{

    const payload = {
        movieId:"BBCDDFEE",
        newObj:{
            name:"Spider-Man: Brand New Day"
        }
    }

    const movieUpdated = await updateMovieUseCase.execute(payload.movieId, payload.newObj);

    expect(mockMovieRepository.updateByIdSpyCall).toBe(1)
})

test("when provided valid ID and newObj, return the updated data object", async()=>{

    const payload = {
        movieId:"BBCDDFEE",
        newObj:{
            name:"Spider-Man: Brand New Day"
        }
    }

    const movieUpdated = await updateMovieUseCase.execute(payload.movieId, payload.newObj);

    const result = {
        name : payload.newObj.name,
        duration: 2.5,
        genre: "action",
        description: "Peter parker is entering adulthood so does spiderman, both facing a new problem that only they could solve it",
        banner: "/src/movie_posters/BrandNewDay/brandnewday1.png"

    }
    expect(movieUpdated).toStrictEqual(result)
})
