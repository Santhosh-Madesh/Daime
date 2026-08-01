

class MockMovieRepository{

    constructor(){
        this.data = [
            {
            _id:"BBCDDFEE",
            name: "Spiderman: Brand New Day",
            duration: 2.5,
            genre: "action",
            description: "Peter parker is entering adulthood so does spiderman, both facing a new problem that only they could solve it",
            banner: "/src/movie_posters/BrandNewDay/brandnewday1.png",
        },
        {
            _id:"FFAA33F",
            name: "The Odyssey",
            duration: 3,
            genre: "action",
            description: "The journey of odysseus finding home after the victorious trojan war",
            banner: "/src/movie_posters/TheOdyssey/theodyssey1.png",
        }
    ];
        this.createSpyCall = 0;
        this.findByIdSpyCall = 0;
        this.findByGenreSpyCall = 0;
        this.updateByIdSpyCall = 0;
        this.deleteByIdSpyCall = 0;
        this.findAllSpyCall = 0;
    }

    async findAll(filter){

        this.findAllSpyCall++;

        const screens = this.data;

        const results = screens.slice(filter.offset, filter.limit)

        return results;
    }

    async findByName(name){

        for( const data of this.data ){
            if(data.name === name){ return data }
        }

        return false
    }

    async findByGenre(genre){

        this.findByGenreSpyCall++

        const result = [];

        for( const data of this.data ){
            if(data.genre === genre){ 
                result.push(data);
             }
        }

        return result;
    }

    async updateById(id, newObj){

        this.updateByIdSpyCall++

        for(const data of this.data){
            if(data._id === id){
                if(newObj.name){
                    data.name = newObj.name
                }
                if(newObj.duration){
                    data.duration = newObj.duration
                }
                if(newObj.genre){
                    data.genre = newObj.genre
                }
                if(newObj.description){
                    data.description = newObj.description
                }
                if(newObj.banner){
                    data.banner = newObj.banner
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


    async create(movie){

        this.createSpyCall++;

        const newData = {
            name: movie.name,
            duration: movie.duration,
            genre: movie.genre,
            description: movie.description,
            banner: movie.banner
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
        this.findAllSpyCall = 0;
    }

    async resetData(){
        this.data = [
            {
            _id:"BBCDDFEE",
            name: "Spiderman: Brand New Day",
            duration: 2.5,
            genre: "action",
            description: "Peter parker is entering adulthood so does spiderman, both facing a new problem that only they could solve it",
            banner: "/src/movie_posters/BrandNewDay/brandnewday1.png",
        },
        {
            _id:"FFAA33F",
            name: "The Odyssey",
            duration: 3,
            genre: "action",
            description: "The journey of odysseus finding home after the victorious trojan war",
            banner: "/src/movie_posters/TheOdyssey/theodyssey1.png",
        }
    ];
    }
    
}

module.exports = MockMovieRepository;