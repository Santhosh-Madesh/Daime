

class EmptyMockCityRepository{

    constructor(){
        this.data = []
    }


    async findAll(){

        const cities = this.data;

        return cities;
    }
}

module.exports = EmptyMockCityRepository;