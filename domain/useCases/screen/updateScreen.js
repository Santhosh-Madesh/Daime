

class UpdateScreen{
    
    constructor({ screenRepository  }){
        this.screenRepository = screenRepository;
    }

    async execute(screenId, newObj){

        if(!screenId || !newObj || Object.keys(screenId).length === 0 || Object.keys(newObj).length === 0){ return false }

        const screen = await this.screenRepository.findById(screenId);

        if(!screen){ return false }

        if(newObj.no){
            
            const screensBytheatre = await this.screenRepository.findByTheatreId(screen.theatre_id);

            for(const screen of screensBytheatre){
                if(screen.no === newObj.no){ return false } 
            }

        }

        const screenUpdated = await this.screenRepository.updateById(screenId, newObj)

        const result = {
            no: screenUpdated.no,
            total_seats: screenUpdated.total_seats,
            theatre_id: screenUpdated.theatre_id,
            seat_layout: screenUpdated.seat_layout
        }

        return result

        
    }
}


module.exports = UpdateScreen;