
class GetAllScreens{

    constructor({ screenRepository, theatreRepository }){
        this.screenRepository = screenRepository;
        this.theatreRepository = theatreRepository;
    }

    async execute(theatreId){

        if(!theatreId || Object.keys(theatreId).length === 0){ return false }

        const theatre = await this.theatreRepository.findById(theatreId);

        if(!theatre){ return false }

        const screensRetrived = await this.screenRepository.findByTheatreId(theatreId);

        return screensRetrived;
    }
}

module.exports = GetAllScreens;