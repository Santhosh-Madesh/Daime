

class MongoTheatreRepository{

    constructor({ theatreModel }){
        this.theatreModel = theatreModel;
    }

    async findAll(){

        const theatres = await this.theatreModel.find();

        return theatres;
    }
}



module.exports = MongoTheatreRepository;