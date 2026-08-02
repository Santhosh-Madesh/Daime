

class DeleteMovie{

    constructor({ movieRepository }){
        this.movieRepository = movieRepository;
    }

    async execute(movieId){

        if(!movieId || Object.keys(movieId).length === 0){ return false }

        const movie = await this.movieRepository.findById(movieId);

        if(!movie){ return false }

        const movieDeleted = await this.movieRepository.deleteById(movieId);

        return movieDeleted;
    }
}

module.exports = DeleteMovie;