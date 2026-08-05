const MockShowRepository = require("../mockRepositories/mockShowRepository");
const MockMovieRepository = require("../mockRepositories/mockMovieRepository");
const MockScreenRepository = require("../mockRepositories/mockScreenRepository");

const CreateShow = require("../../domain/useCases/show/createShow");

const mockShowRepository = new MockShowRepository;
const mockMovieRepository = new MockMovieRepository;
const mockScreenRepository = new MockScreenRepository;

const createShowUseCase = new CreateShow({ showRepository: mockShowRepository, movieRepository: mockMovieRepository, screenRepository: mockScreenRepository });

beforeEach(()=>{
    mockShowRepository.clearSpyCalls();
    mockShowRepository.resetData();
})

test("when no inputs provided, return false", async()=>{

    const payloads = ["", null, undefined, {}];

    for( const payload of  payloads ){

        const showCreated = await createShowUseCase.execute(payload);

        expect(showCreated).toBe(false);

    }
})

test("when not all necessary inputs are provided, return false", async()=>{

    const payloads =[
        {
            startsAt: new Date("2026-08-05T09:00:00Z"),
            screenId: "FFAA33F",
            movieId :"FFAA33F"
        },
        {
            endsAt: new Date("2026-08-05T12:00:00Z"),
            screenId: "FFAA33F",
            movieId :"FFAA33"
        },
        {
            startsAt: new Date("2026-08-05T09:00:00Z"),
            endsAt: new Date("2026-08-05T12:00:00Z"),
            screenId: "FFAA33F",
        },
        {
            startsAt: new Date("2026-08-05T09:00:00Z"),
            endsAt: new Date("2026-08-05T12:00:00Z"),
            movieId :"FFAA33"
        }
    ]

    for( const payload of payloads ){

        const showCreated = await createShowUseCase.execute(payload);

        expect(showCreated).toBe(false);
    }
})

test("when provided endsAt is before startAt including both date and time, return false", async()=>{

    const payload = {
        startsAt: new Date("2026-08-05T09:00:00Z"),
        endsAt: new Date("2026-08-05T08:00:00Z"),
        screenId: "FFAA33F",
        movieId :"FFAA33F"
    }

    const showCreated = await createShowUseCase.execute(payload);

    expect(showCreated).toBe(false)
})

test("when provided a screen ID that does not exists, return false", async()=>{

    const payload = {
        startsAt: new Date("2026-08-05T09:00:00Z"),
        endsAt: new Date("2026-08-05T12:00:00Z"),
        screenId: "INVALIDSCREENID",
        movieId :"FFAA33F"
    }

    const showCreated = await createShowUseCase.execute(payload);

    expect(showCreated).toBe(false)
})

test("when provided a movie ID that does not exists, return false", async()=>{

    const payload =  {
        startsAt: new Date("2026-08-05T09:00:00Z"),
        endsAt: new Date("2026-08-05T12:00:00Z"),
        screenId: "FFAA33F",
        movieId :"INVALIDMOVIEID"
    }

    const showCreated = await createShowUseCase.execute(payload);

    expect(showCreated).toBe(false)
})

test("when the movie duration does not match the start and end duration, return false", async()=>{

    const payload =  {
        startsAt: new Date("2026-08-05T09:00:00Z"),
        endsAt: new Date("2026-08-05T11:30:00Z"),
        screenId: "FFAA33F",
        movieId :"FFAA33F"
    }

    const showCreated = await createShowUseCase.execute(payload);

    expect(showCreated).toBe(false)

})

test("if there exist another show at the same screen that is in between the current start and end time, return false", async()=>{

    const payloads = [
        
        {
            startsAt: new Date("2026-08-03T09:00:00Z"),
            endsAt: new Date("2026-08-03T11:30:00Z"),
            screenId: "AEFEEA",
            movieId: "BBCDDFEE"
        },
        {
            startsAt: new Date("2026-08-03T09:30:00Z"),
            endsAt: new Date("2026-08-03T12:00:00Z"),
            screenId: "AEFEEA",
            movieId: "BBCDDFEE"
        },
        {
            startsAt: new Date("2026-08-03T08:30:00Z"),
            endsAt: new Date("2026-08-03T11:00:00Z"),
            screenId: "AEFEEA",
            movieId: "BBCDDFEE"
        },
    ]

    for( const payload of payloads ){

        const showCreated = await createShowUseCase.execute(payload);
        expect(showCreated).toBe(false)

    }
    

    
    
})

test("when provided valid data, call the create method of show repo", async()=>{

    const payload = {
        startsAt: new Date("2027-08-05T09:30:00Z"),
        endsAt: new Date("2027-08-05T12:00:00Z"),
        screenId: "AEFEEA",
        movieId: "BBCDDFEE"
    }

    const showCreated = await createShowUseCase.execute(payload);

    expect(mockShowRepository.createSpyCall).toBe(1)
})

test("when provided a valid data, return the payload", async()=>{

    const payload = {
        startsAt: new Date("2027-08-05T09:00:00Z"),
        endsAt: new Date("2027-08-05T12:00:00Z"),
        screenId: "FFAA33F",
        movieId :"FFAA33F"
    }

    const showCreated = await createShowUseCase.execute(payload);

    expect(showCreated).toStrictEqual({
        startsAt: new Date("2027-08-05T09:00:00Z"),
        endsAt: new Date("2027-08-05T12:00:00Z"),
        screenId: "FFAA33F",
        movieId :"FFAA33F"
    })
})


test("when the show is in the past, return false", async()=>{

    const payload = {
        startsAt: new Date("2026-08-03T09:00:00Z"),
        endsAt: new Date("2026-08-03T12:00:00Z"),
        screenId: "FFAA33F",
        movieId :"FFAA33F"
    }

    const showCreated = await createShowUseCase.execute(payload);

    expect(showCreated).toBe(false)
})