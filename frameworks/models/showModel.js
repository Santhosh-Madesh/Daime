const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({

    starts_at: { 
        type: Date,
        required: true
     },

    ends_at: { 
        type: Date,
        required: true
     },

    screen_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Screen",
        required: true
     },

    movie_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true
     }
},
{
    timestamps: true
})


const showModel = mongoose.model("Show", showSchema);

module.exports = showModel;