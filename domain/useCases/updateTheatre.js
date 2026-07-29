

class UpdateTheatre{

    constructor({ theatreRepository }){
        this.theatreRepository = theatreRepository;
    }


    async execute(theatreId, newData){

        if(!theatreId || !newData || Object.keys(newData).length === 0){ return false }

        const theatre = await this.theatreRepository.findById(theatreId);

        if(!theatre){ return false };

        const theatreUpdated = await this.theatreRepository.updateById(theatreId, newData);

        return {
            name: theatreUpdated.name,
            cityId: theatreUpdated.cityId
        }
        
    }
}


module.exports = UpdateTheatre;