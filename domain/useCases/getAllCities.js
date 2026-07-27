

class GetAllCitiesUseCase{

    constructor({ cityRepository }){
        this.cityRepository = cityRepository;
    }

    async execute(){

        const cities = await this.cityRepository.findAll();

        return cities
    }


}


module.exports = GetAllCitiesUseCase;