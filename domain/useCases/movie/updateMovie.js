
class UpdateMovie{

    constructor({ movieRepository }){
        this.movieRepository = movieRepository;
    }

    async execute(movieId, newObj){

        if(!movieId || !newObj || Object.keys(movieId).length === 0 || Object.keys(newObj).length === 0){
            return false
        }

        const movie = await this.movieRepository.findById(movieId);

        if(!movie){ return false }

        const movieUpdated = await this.movieRepository.updateById(movieId, newObj);

        const result = {
            name: movieUpdated.name,
            duration: movieUpdated.duration,
            genre: movieUpdated.genre,
            description: movieUpdated.description,
            banner: movieUpdated.banner
        }

        return result
    }


}

module.exports = UpdateMovie;