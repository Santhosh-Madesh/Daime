
class MockTheatreRepository{

    constructor(){
        this.data = [
            {
            _id:"AFF23FF",
            name: "AGS Cinemas",
            cityId: "AFFAB2812BA",
        }
    ];
        this.createSpyCall = 0;
        this.findByIdSpyCall = 0;
        this.findByCityIdSpyCall = 0;
        this.updateByIdSpyCall = 0;
        this.deleteByIdSpyCall = 0;
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

    async findByCityId(cityId){

        this.findByCityIdSpyCall++

        const result = [];

        for( const data of this.data ){
            if(data.cityId === cityId){ 
                result.push(data);
             }
        }

        return result;
    }

    async updateById(id, newObj){

        this.updateByIdSpyCall++

        for(const data of this.data){
            if(data._id === id){
                if(newObj.name){
                    data.name = newObj.name
                }
                if(newObj.cityId){
                    data.cityId = newObj.cityId
                }

                return data
            }
        }

        return false


    }

    async findById(id){
        
        if(!id){return false}

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

    async deleteById(id){

        this.deleteByIdSpyCall++

        for(const data of this.data){

            if(data._id === id){

                const deleteIndex = this.data.indexOf(data);
                this.data.slice(deleteIndex, 1);

                return true
            }
        }

        return false;
    }

    async clearSpyCalls(){
        this.createSpyCall = 0;
        this.findByIdSpyCall = 0;
        this.findByCityIdSpyCall = 0;
        this.updateByIdSpyCall = 0;
        this.deleteByIdSpyCall = 0;
    }
}


module.exports = MockTheatreRepository;