

class MongoCityRepository{

    constructor({ cityModel }){
        this.cityModel = cityModel;
    }


    async findAll(){

        const cities = await this.cityModel.find();

        return cities;
    }
}

module.exports = MongoCityRepository;