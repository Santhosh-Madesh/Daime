const MockTheatreRepository = require("../mockRepositories/mockTheatreRepository");
const UpdateTheatre = require("../../domain/useCases/theatre/updateTheatre");


const mockTheatreRepository = new MockTheatreRepository;
const updateTheatreUseCase = new UpdateTheatre({ theatreRepository:mockTheatreRepository });


beforeEach(()=>{
    mockTheatreRepository.clearSpyCalls();
})


test("when provided no data, should return false", async()=>{

    const payload = ["", null, undefined, {}];

    for(const input of payload){

        const theatreUpdated = await updateTheatreUseCase.execute(payload);

        expect(theatreUpdated).toBe(false);
    }
})

test("when provided only one data and not other, should return false", async()=>{

    const payload = [
        {
            theatreId:"AFF23FF",
            newObj:{}
        },
        {
            theatreId:"",
            newObj:{
                name:"AGS Cinemas Tnagar"
            }
        }
    ]

    for(const input of payload){

        const theatreUpdated = await updateTheatreUseCase.execute(input.theatreId, input.newObj);

        expect(theatreUpdated).toBe(false)
    }
})


test("when provided Invalid Theatre ID, should return false", async()=>{

    const payload = {
        theatreId:"InvalidEHHHH",
        newObj:{
            name:"AGS Cinemas Tnagar"
        }
    }

    const theatreUpdated = await updateTheatreUseCase.execute(payload.theatreId, payload.newObj);

    expect(theatreUpdated).toBe(false)
})

test("when provided valid theatre id, should call the updateById method", async()=>{

    const payload = {
        theatreId:"AFF23FF",
        newObj:{
            name:"AGS Cinemas Tnagar"
        }
    }

    const theatreUpdated = await updateTheatreUseCase.execute(payload.theatreId, payload.newObj);

    expect(mockTheatreRepository.updateByIdSpyCall).toBe(1)
})


test("when provided valid theatre id, should return the updated name and cityId as object", async()=>{

    const payload = {
        theatreId:"AFF23FF",
        newObj:{
            name:"AGS Cinemas Tnagar"
        }
    }

    const theatreUpdated = await updateTheatreUseCase.execute(payload.theatreId, payload.newObj);

    expect(theatreUpdated).toStrictEqual({
        name:"AGS Cinemas Tnagar",
        cityId:"AFFAB2812BA"
    })
})
