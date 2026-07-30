

class MockScreenRepository{

    constructor(){
        this.data = [
            {
            _id:"FFAA33F",
            no: 1,
            total_seats: 170,
            theatre_id:"AFF23FF",
            seat_layout:"A"
        },
        {
            _id:"AEFEEA",
            no: 2,
            total_seats: 185,
            theatre_id:"AFF23FF",
            seat_layout:"B"
        }
    ];
        this.createSpyCall = 0;
        this.findByIdSpyCall = 0;
        this.findByTheatreIdSpyCall = 0;
        this.updateByIdSpyCall = 0;
        this.deleteByIdSpyCall = 0;
    }

    async findAll(){

        const screens = this.data;

        return screens;
    }

    async findByName(name){

        for( const data of this.data ){
            if(data.name === name){ return data }
        }

        return false
    }

    async findByTheatreId(theatreId){

        this.findByTheatreIdSpyCall++

        const result = [];

        for( const data of this.data ){
            if(data.theatre_id === theatreId){ 
                result.push(data);
             }
        }

        return result;
    }

    async updateById(id, newObj){

        this.updateByIdSpyCall++

        for(const data of this.data){
            if(data._id === id){
                if(newObj.no){
                    data.no = newObj.no
                }
                if(newObj.total_seats){
                    data.total_seats = newObj.total_seats
                }
                if(newObj.theatre_id){
                    data.theatre_id = newObj.theatre_id
                }
                if(newObj.seat_layout){
                    data.seat_layout = newObj.seat_layout
                }
                return data
            }
        }

        return false


    }

    async findById(id){
        
        if(!id){return false}

        this.findByIdSpyCall++

        for( const data of this.data ){
            if(data._id === id){ return data }
        }

        return false
    }


    async create(screen){

        this.createSpyCall++;

        const newData = {
            no: screen.no,
            theatre_id: screen.theatreId,
            total_seats: screen.totalSeats,
            seat_layout: screen.seatLayout
        }

        this.data.push(newData);

        return this.data.at(-1);

    }

    async deleteById(id){

        this.deleteByIdSpyCall++

        for(const data of this.data){

            if(data._id === id){

                const deleteIndex = this.data.indexOf(data);
                this.data.slice(deleteIndex, 1);

                return true
            }
        }

        return false;
    }

    async clearSpyCalls(){
        this.createSpyCall = 0;
        this.findByIdSpyCall = 0;
        this.findByTheatreIdSpyCall = 0;
        this.updateByIdSpyCall = 0;
        this.deleteByIdSpyCall = 0;
    }

    async resetData(){
        this.data = [
            {
            _id:"FFAA33F",
            no: 1,
            total_seats: 170,
            theatre_id:"AFF23FF",
            seat_layout:"A"
        },
        {
            _id:"AEFEEA",
            no: 2,
            total_seats: 185,
            theatre_id:"AFF23FF",
            seat_layout:"B"
        }
        ]
    }
    
}

module.exports = MockScreenRepository;