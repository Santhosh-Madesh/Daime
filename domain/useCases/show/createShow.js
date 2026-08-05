
class CreateShow{

    constructor({ showRepository, movieRepository, screenRepository }){
        this.showRepository = showRepository;
        this.movieRepository = movieRepository;
        this.screenRepository = screenRepository;
    }

    async execute(show){

        if(!show || !show.startsAt || !show.endsAt || !show.screenId || !show.movieId ){ return false }

        if(show.startsAt.getTime() >= show.endsAt.getTime()){ return false }
        if(new Date() > show.startsAt){ return false }
        if(new Date().getTime() > show.startsAt.getTime()){ return false }

        const movie = await this.movieRepository.findById(show.movieId);
        if(!movie){ return false }

        const movieDuration = movie.duration;
        const showDuration = (show.endsAt - show.startsAt)/3600000;

        if(showDuration !== movieDuration){ return false }

        const screen = await this.screenRepository.findById(show.screenId);
        if(!screen){ return false }


        const showsOfScreen = await this.showRepository.findByScreenId(show.screenId);

        for( const oneShow of showsOfScreen ){

            if(oneShow.starts_at.getDate() != show.startsAt.getDate()){
                continue
            }

            const showStarts = show.startsAt.getHours();
            const showEnds = show.endsAt.getHours();

            if(showStarts >= oneShow.starts_at.getHours() && showStarts <= oneShow.ends_at.getHours()){ return false }
            if(showEnds >= oneShow.starts_at.getHours() && showEnds <= oneShow.ends_at.getHours()){ return false }

            if(oneShow.starts_at.getHours() >= showStarts && oneShow.starts_at.getHours() <= showEnds){ return false }
            if(oneShow.ends_at.getHours() >= showStarts && oneShow.ends_at.getHours() <= showEnds){ return false }

        }

        const showCreated = await this.showRepository.create(show);

        const result = {
            startsAt: showCreated.starts_at,
            endsAt: showCreated.ends_at,
            screenId: showCreated.screen_id,
            movieId: showCreated.movie_id
        }

        return result
    }


}


module.exports = CreateShow;