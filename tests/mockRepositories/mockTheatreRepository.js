
class MockTheatreRepository{

    constructor(){
        this.data = [
            {
            _id:"AFF23FF",
            name: "AGS Cinemas",
            cityId: "AFFAB2812BA" 
        }
    ];
        this.createSpyCall = 0;
        this.findByIdSpyCall = 0;
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

    async findById(id){

        this.findByIdSpyCall++

        for( const data of this.data ){
            if(data._id === id){ return data }
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

    async clearSpyCalls(){
        this.createSpyCall = 0;
        this.findByIdSpyCall = 0;
    }
}


module.exports = MockTheatreRepository;