

class GetMovie{
    
    constructor({ movieRepository }){
        this.movieRepository = movieRepository;
    }

    async execute(movieId){

        if(!movieId || Object.keys(movieId).length === 0){ return false }

        const movie = await this.movieRepository.findById(movieId);

        if(!movie){ return false }

        return movie

    }
}

module.exports = GetMovie;