

class DeleteScreen{

    constructor({ screenRepository, theatreRepository }){
        this.screenRepository = screenRepository;
        this.theatreRepository = theatreRepository;
    }


    async execute(screenId){

        if(!screenId || Object.keys(screenId).length === 0){ return false }

        const screen = await this.screenRepository.findById(screenId);

        if(!screen){ return false }

        const deleteScreen = await this.screenRepository.deleteById(screenId);

        return deleteScreen;

    }
}


module.exports = DeleteScreen;