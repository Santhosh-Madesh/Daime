

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
        ],

        this.findByIdSpyCall = 0;
    }


    async findAll(){

        const cities = this.data;

        return cities;
    }

    async findById(cityId){

        this.findByIdSpyCall++

        const cities = this.data;

        for( const city of cities ){
            if(cityId === city._id){ return city }
        }
    }

    async clearSpyCalls(){
        this.findByIdSpyCall = 0;
    }
}

module.exports = MockCityRepository;