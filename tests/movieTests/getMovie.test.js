const MockMovieRepository = require("../mockRepositories/mockMovieRepository");
const GetMovie = require("../../domain/useCases/movie/getMovie");

const mockMovieRepository = new MockMovieRepository;

const getMovieUseCase = new GetMovie({ movieRepository: mockMovieRepository });


beforeEach(()=>{
    mockMovieRepository.clearSpyCalls();
})


test("when provided no movie ID, should return false", async()=>{

    const payloads = ["", null, undefined, {}];

    for( const payload of payloads ){

        const movieFound = await getMovieUseCase.execute(payload);

        expect(movieFound).toBe(false);

    }
})

test("when provided Invalid Movie ID, return false", async()=>{

    const InvalidMovieId = "THISISINVALID";

    const movieFound = await getMovieUseCase.execute(InvalidMovieId);

    expect(mockMovieRepository.findByIdSpyCall).toBe(1);
    expect(movieFound).toBe(false);
})

test("when provided valid movie ID, call the findById method of movie repo", async()=>{

    const movieId = "BBCDDFEE";

    const movieFound = await getMovieUseCase.execute(movieId);

    expect(mockMovieRepository.findByIdSpyCall).toBe(1);
})

test("when provided valid movie ID, return movie object", async()=>{

    const movieId = "BBCDDFEE";

    const simulatedResult = {
        
            _id:"BBCDDFEE",
            name: "Spiderman: Brand New Day",
            duration: 2.5,
            genre: "action",
            description: "Peter parker is entering adulthood so does spiderman, both facing a new problem that only they could solve it",
            banner: "/src/movie_posters/BrandNewDay/brandnewday1.png",
        
    }

    const movieFound = await getMovieUseCase.execute(movieId);

    expect(movieFound).toStrictEqual(simulatedResult);
})
