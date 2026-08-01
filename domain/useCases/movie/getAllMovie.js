

class GetAllMovie{

    constructor({ movieRepository }){
        this.movieRepository = movieRepository;
    }

    async execute(pagination){

        const filter = {
            offset:0,
            limit:10
        }

        if(pagination){
            filter.offset = pagination.offset;
            filter.limit = pagination.limit;
        }

        const moviesRetrieved = await this.movieRepository.findAll(filter);
        
        return moviesRetrieved;

    }
}

module.exports = GetAllMovie;