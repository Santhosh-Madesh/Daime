
class GetShowsByMovie{

    constructor({ showRepository, movieRepository }){
        this.showRepository = showRepository;
        this.movieRepository = movieRepository;
    }

    async execute(movieId){

        if(!movieId || typeof(movieId) === "object"){ return false }

        const movie = await this.movieRepository.findById(movieId);
        if(!movie){ return false }

        const shows = await this.showRepository.findByMovieId(movieId);

        return shows
    }
}


module.exports = GetShowsByMovie;