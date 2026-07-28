

class MockCityRepository{

    constructor(){
        this.data = [
            {
                "_id" : "AFFAB2812BA",
                "name" : "chennai",
            },
            {
                "_id" : "AFFAB2812BBBC",
                "name" : "mumbai",
            },
            {
                "_id" : "AFFAB2812BABBFC",
                "name" : "delhi",
            },
        ]
    }


    async findAll(){

        const cities = this.data;

        return cities;
    }

    async findById(cityId){

        const cities = this.data;

        for( const city of cities ){
            if(cityId === city._id){ return city }
        }
    }
}

module.exports = MockCityRepository;