
class ListTheatreByCity{

    constructor({ theatreRepository, cityRepository }){
        this.theatreRepository = theatreRepository;
        this.cityRepository = cityRepository;
    }

    async execute(cityId){

        if(!cityId){ return false }

        const city = await this.cityRepository.findById(cityId);

        if(!city){ return false };

        const theatres = await this.theatreRepository.findByCityId(cityId);

        return theatres;
    }
}

module.exports = ListTheatreByCity;