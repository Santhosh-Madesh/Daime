

class CreateTheatre{
    
    constructor({ theatreRepository, cityRepository }){
        this.theatreRepository = theatreRepository;
        this.cityRepository = cityRepository;
    }

    async execute(payload){

        if(!payload || Object.keys(payload).length === 0 || !payload.name || !payload.cityId){ return false }

        const theatreName = await this.theatreRepository.findByName(payload.name);
        const city = await this.cityRepository.findById(payload.cityId);


        if(!city){ return false }

        if(theatreName){
            const theatreCity = await this.cityRepository.findById(theatreName.cityId)
            return !(city.name === theatreCity.name)
        }

        const theatreCreated = await this.theatreRepository.create(payload);

        const result = {
            name: theatreCreated.name,
            cityId: theatreCreated.city_id
        }

        return result;
    }
}

module.exports = CreateTheatre;