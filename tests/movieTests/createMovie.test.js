const MockMovieRepository = require("../mockRepositories/mockMovieRepository");
const CreateMovie = require("../../domain/useCases/movie/createMovie");

const mockMovieRepository = new MockMovieRepository;
const createMovieUseCase = new CreateMovie({ movieRepository: mockMovieRepository });

beforeEach(()=>{
    mockMovieRepository.clearSpyCalls();
    mockMovieRepository.resetData();
})


test("when no data is passed, return false", async()=>{

    const payloads = ["", null, undefined, {}];

    for( const payload of payloads ){

        const movieCreated = await createMovieUseCase.execute(payload);

        expect(movieCreated).toBe(false);
    }
})

test("when not all mandatory data passed, return false", async()=>{

    const payloads = [
        {
        name: "Dooms Day",
        duration: 3,
        genre:"action",
        description:"Dr Doom about to Doom"
    },
    {
        name: "Dooms Day",
        duration: 3,
        genre:"action",
        banner:"/src/movie/DOOMSDAY/dooms1.png"
    },
    {
        name: "Dooms Day",
        duration: 3,
        description:"Dr Doom about to Doom",
        banner:"/src/movie/DOOMSDAY/dooms1.png"
    },
    {
        name: "Dooms Day",
        genre:"action",
        description:"Dr Doom about to Doom",
        banner:"/src/movie/DOOMSDAY/dooms1.png"
    },
    {
        duration:3,
        genre:"action",
        description:"Dr Doom about to Doom",
        banner:"/src/movie/DOOMSDAY/dooms1.png"
    }
]


    for( const payload of payloads ){

        const movieCreated = await createMovieUseCase.execute(payload);
        
        expect(movieCreated).toBe(false)
    }

})


test("when provided valid data, should call the create method of movie repo", async()=>{

    const payload = {
        name: "DoomsDay",
        duration:3,
        genre:"action",
        description:"Dr Doom about to Doom",
        banner:"/src/movie/DOOMSDAY/dooms1.png"
    }

    const movieCreatd = await createMovieUseCase.execute(payload);

    expect(mockMovieRepository.createSpyCall).toBe(1);
})


test("when provided valid data, should return the payload object back", async()=>{

    const payload = {
        name: "DoomsDay",
        duration:3,
        genre:"action",
        description:"Dr Doom about to Doom",
        banner:"/src/movie/DOOMSDAY/dooms1.png"
    }

    const movieCreated = await createMovieUseCase.execute(payload);

    expect(movieCreated).toStrictEqual(payload);

})

test("when provided an existing movie, should return false", async()=>{

    const payload = {
        name: "Spiderman: Brand New Day",
        duration: 2.5,
        genre: "action",
        description: "Peter parker is entering adulthood so does spiderman, both facing a new problem that only they could solve it",
        banner: "/src/movie_posters/BrandNewDay/brandnewday1.png",
    }

    const movieCreated = await createMovieUseCase.execute(payload);

    expect(movieCreated).toBe(false);

})