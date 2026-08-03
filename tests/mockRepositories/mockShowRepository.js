

class MockShowRepository{

    constructor(){
        this.data = [
            {
            _id:"BBCDDFEE",
            starts_at: new Date("2026-08-03T09:00:00Z"),
            ends_at: new Date("2026-08-03T11:30:00Z"),
            screen_id: "AEFEEA",
            movie_id: "BBCDDFEE"
        },
        {
            _id:"FFAA33F",
            starts_at: new Date("2026-08-04T12:00:00Z"),
            ends_at: new Date("2026-08-04T15:00:00Z"),
            screen_id: "FFAA33F",
            movie_id: "FFAA33F"
        }
    ];
        this.createSpyCall = 0;
        this.findByIdSpyCall = 0;
        this.updateByIdSpyCall = 0;
        this.deleteByIdSpyCall = 0;
        this.findAllSpyCall = 0;
        this.findByScreenIdSpyCall = 0;
    }

    async findAll(filter){

        this.findAllSpyCall++;

        const screens = this.data;

        const results = screens.slice(filter.offset, filter.limit)

        return results;
    }


    async updateById(id, newObj){

        this.updateByIdSpyCall++

        for(const data of this.data){
            if(data._id === id){
                if(newObj.startsAt){
                    data.starts_at = newObj.startsAt
                }
                if(newObj.endsAt){
                    data.ends_at = newObj.endsAt
                }
                if(newObj.screenId){
                    data.screen_id = newObj.screenId
                }
                if(newObj.movieId){
                    data.movie_id = newObj.movieId
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

    async findByScreenId(id){

        if(!id){ return false }

        this.findByScreenIdSpyCall++

        const result = [];

        for(const data of this.data ){
            if(data.screen_id === id){
                result.push(data)
            }
        }

        return result
    }


    async create(show){

        this.createSpyCall++;

        const newData = {
            starts_at: show.startsAt,
            ends_at: show.endsAt,
            screen_id: show.screenId,
            movie_id: show.movieId,
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
        this.updateByIdSpyCall = 0;
        this.deleteByIdSpyCall = 0;
        this.findAllSpyCall = 0;
        this.findByScreenIdSpyCall = 0;
    }

    async resetData(){
        this.data = [
            {
            _id:"BBCDDFEE",
            starts_at: new Date("2026-08-03T09:00:00Z"),
            ends_at: new Date("2026-08-03T11:30:00Z"),
            screen_id: "AEFEEA",
            movie_id: "BBCDDFEE"
        },
        {
            _id:"FFAA33F",
            starts_at: new Date("2026-08-04T12:00:00Z"),
            ends_at: new Date("2026-08-04T15:00:00Z"),
            screen_id: "FFAA33F",
            movie_id: "FFAA33F"
        }
    ];
    }
    
}

module.exports = MockShowRepository;