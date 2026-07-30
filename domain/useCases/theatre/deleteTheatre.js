

class DeleteTheatre{

    constructor({ theatreRepository }){

        this.theatreRepository = theatreRepository;

    }

    async execute(theatreId){

        if(!theatreId || Object.keys(theatreId).length === 0){ return false }

        const theatre = await this.theatreRepository.findById(theatreId);

        if(!theatre){ return false }

        const theatreDeleted = await this.theatreRepository.deleteById(theatreId);

        return theatreDeleted;

    }
}


module.exports = DeleteTheatre;