const MockScreenRepository = require("../mockRepositories/mockScreenRepository");

const UpdateScreen = require("../../domain/useCases/updateScreen");

const mockScreenRepository = new MockScreenRepository;

const updateScreenUseCase = new UpdateScreen({ screenRepository: mockScreenRepository });


beforeEach(()=>{
    mockScreenRepository.clearSpyCalls();
    mockScreenRepository.resetData();
})


test("when no data provided, return false", async()=>{

    const payloads = ["", null, undefined, {}];

    for(const payload of payloads ){

        const updatedTheatre = await updateScreenUseCase.execute(payload);

        expect(updatedTheatre).toBe(false);
    }
})


test("when provided invalid screenId, should return false", async()=>{

    const payload = {
        screenId: "InvalidEHH",
        newObj:{
            no: 4,
            total_seats: 200,
            theatre_id:"AFF23FF",
            seat_layout:"A"
        }
    }

    const updatedScreen = await updateScreenUseCase.execute(payload.screenId, payload.newObj);

    expect(updatedScreen).toBe(false);
})

test("when provided one data not other, should return false", async()=>{

    const payloads = [
        {
            screenId:"",
            newObj:{}
        },
        {
            screenId:"FFAA33F",
            newObj:{}
        },
        {
            screenId:"",
            newObj:{
                no: 4,
                total_seats: 200,
                theatre_id:"AFF23FF",
                seat_layout:"A"
            }
        },
        {
            screenId:'',
            newObj:{}
        },
    ]

    for( const payload of payloads ){

        const updatedScreen = await updateScreenUseCase.execute(payload.screenId, payload.newObj)

        expect(updatedScreen).toBe(false)
    }
})

test("when updating a screen no to a no that already exists in the theatre, return false", async()=>{

    const payload = {
        screenId: "AEFEEA",
        newObj: {
            no:1,
        }
    }

    const screenUpdated = await updateScreenUseCase.execute(payload.screenId, payload.newObj);

    expect(screenUpdated).toBe(false);

})


test("when provided valid data, should call updateById method of screen repo", async()=>{

    const payload = {
        screenId: "FFAA33F",
        newObj:{
            no: 4,
            total_seats: 200,
            theatre_id:"AFF23FF",
            seat_layout:"A"
        }
    }

    const screenUpdated = await updateScreenUseCase.execute(payload.screenId, payload.newObj);

    expect(mockScreenRepository.updateByIdSpyCall).toBe(1);
})


test("when provided valid data, should return the payload newObj", async()=>{

    const payload = {
        screenId: "FFAA33F",
        newObj:{
            no: 4,
            total_seats: 200,
            theatre_id:"AFF23FF",
            seat_layout:"A"
        }
    }

    const screenUpdated = await updateScreenUseCase.execute(payload.screenId, payload.newObj);

    expect(screenUpdated).toStrictEqual(payload.newObj);
})