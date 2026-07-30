
class CreateScreen{

    constructor({ screenRepository, theatreRepository }){
        this.screenRepository = screenRepository;
        this.theatreRepository = theatreRepository;
    }

    async execute(screen){
        
        if(!screen || Object.keys(screen).length === 0){ return false }

        if(!screen.no || !screen.totalSeats || !screen.theatreId || !screen.seatLayout){ return false }

        const theatre = await this.theatreRepository.findById(screen.theatreId);

        if(!theatre){ return false }

        if(!(["A","B", "C"].includes(screen.seatLayout))){ return false }

        const retrivedScreens = await this.screenRepository.findByTheatreId(screen.theatreId);

        for(const retrivedScreen of retrivedScreens){
            if(retrivedScreen.no === screen.no){ return false }
        }

        const screenCreated = await this.screenRepository.create(screen);

        const result = {
            no: screenCreated.no,
            totalSeats: screenCreated.total_seats,
            theatreId: screenCreated.theatre_id,
            seatLayout: screenCreated.seat_layout
        }

        return result
    }
}

module.exports = CreateScreen