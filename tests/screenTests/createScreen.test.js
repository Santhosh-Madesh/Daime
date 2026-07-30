const MockScreenRepository = require("../mockRepositories/mockScreenRepository");
const MockTheatreRepository = require("../mockRepositories/mockTheatreRepository");
const CreateScreen = require("../../domain/useCases/createScreen");

const mockScreenRepository = new MockScreenRepository;
const mockTheatreRepository = new MockTheatreRepository;
const createScreenUseCase = new CreateScreen({ screenRepository: mockScreenRepository, theatreRepository: mockTheatreRepository });

beforeEach(()=>{
    mockScreenRepository.clearSpyCalls();
    mockScreenRepository.resetData();
})

test("when no data provided, return false", async()=>{

    const payloads = ["", null, undefined, {}];

    for( const payload of payloads ){

        const screenCreated = await createScreenUseCase.execute(payload);

        expect(screenCreated).toBe(false)
    }
})

test("when not all required data is provided, return false", async()=>{

    const payloads = [
        {
            no:1,
            totalSeats:190,
        },
        {
            no:1,
            theatreId:"AFF23FF"
        },
        {
            totalSeats:200,
            theatreId:"AFF23FF"
        },
        {
            no:2,
            totalSeats:100,
            theatreId:"AFF23FF"
        },
        {
            totalSeats:100,
            theatreId:"AFF23FF",
            seatLayout: "A"   
        }
    ]

    for(const payload of payloads){

        const screenCreated = await createScreenUseCase.execute(payload)

        expect(screenCreated).toBe(false)

    }

} )


test("when provided invalid theatre id, return false", async()=>{

    const payload = {
        no:1,
        totalSeats:150,
        seatLayout:"A",
        theatreId:"INVALIDIDEH"
    }

    const screenCreated = await createScreenUseCase.execute(payload);

    expect(screenCreated).toBe(false);
})

test("when provided valid data, should call the create method of screen repo", async()=>{

    const payload = {
        no:3,
        totalSeats:250,
        theatreId:"AFF23FF",
        seatLayout:"A"
    }

    const screenCreated = await createScreenUseCase.execute(payload);

    expect(mockScreenRepository.createSpyCall).toBe(1);

})

test("when provided valid data, return the payload object itself", async()=>{

    const payload = {
        no:3,
        totalSeats:250,
        theatreId:"AFF23FF",
        seatLayout:"B"
    }

    const screenCreated = await createScreenUseCase.execute(payload);

    expect(screenCreated).toStrictEqual(payload);

})

test("when invalid seat layout is provided, return false", async()=>{

    const payload = {
        no:2,
        totalSeats:250,
        theatreId:"AFF23FF",
        seatLayout:"D"
    }

    const screenCreated = await createScreenUseCase.execute(payload);

    expect(screenCreated).toBe(false)
})

test("when already existing no for a theatre is given, return false", async()=>{

    const payload = {
        no:1,
        totalSeats:250,
        theatreId:"AFF23FF",
        seatLayout:"A"
    }

    const screenCreated = await createScreenUseCase.execute(payload);

    expect(screenCreated).toBe(false);
})