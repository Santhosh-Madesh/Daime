
class MockTheatreRepository{

    constructor(){
        this.data = [
            {
            name: "AGS Cinemas",
            cityId: "AFFAB2812BA" 
        }
    ];
        this.createSpyCall = 0;
    }

    async findAll(){

        const theatres = this.data;

        return theatres;
    }

    async findByName(name){

        for( const data of this.data ){
            if(data.name === name){ return data }
        }

        return false
    }


    async create(theatre){

        this.createSpyCall++;

        const newData = {
            name: theatre.name,
            city_id: theatre.cityId
        }

        this.data.push(newData);

        return this.data.at(-1);

    }
}


module.exports = MockTheatreRepository;