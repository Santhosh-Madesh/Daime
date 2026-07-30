

class GetTheatre{

    constructor({ theatreRepository }){
        this.theatreRepository = theatreRepository;
    }


    async execute(theatreId){


        if(!theatreId){ return false }


        const theatre = await this.theatreRepository.findById(theatreId);

        if(!theatre){ return false }


        return theatre;
    }
}


module.exports = GetTheatre;