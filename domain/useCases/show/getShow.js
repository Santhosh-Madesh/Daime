

class GetShow{

    constructor({ showRepository }){
        this.showRepository = showRepository;
    }


    async execute(showId){

        if(!showId || typeof(showId) === "object"){ return false }

        const show = await this.showRepository.findById(showId);
        if(!show){ return false }

        return show;
    }
}


module.exports = GetShow