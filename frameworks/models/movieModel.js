
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({

    name: { type: String, required: true },
    duration : { type: Number, required: true },
    genre : { type: String, enum: ["romance", "comedy", "action", "thriller", "horror"], required: true },
    descreption: { type: String, required: true },
    banner: { type: String, required: true },

},
{
    timestamps:true
}
)


const movieModel = mongoose.model("Movie", movieSchema);

module.exports = movieModel;