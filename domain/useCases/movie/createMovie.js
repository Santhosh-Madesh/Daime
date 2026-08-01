

class CreateMovie{

    constructor({ movieRepository }){
        this.movieRepository = movieRepository;
    }

    async execute(movie){

        if(!movie || Object.keys(movie).length === 0){ return false}

        if(!movie.name || !movie.duration || !movie.genre || !movie.description || !movie.banner){
            return false 
        }

        const movieExist = await this.movieRepository.findByName(movie.name);

        if(movieExist){ return false }

        const movieCreated = await this.movieRepository.create(movie);

        const result = {
            name : movieCreated.name,
            duration: movieCreated.duration,
            genre: movieCreated.genre,
            description: movieCreated.description,
            banner: movieCreated.banner
        }

        return result;
    }
}

module.exports = CreateMovie;