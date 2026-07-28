const mongoose = require("mongoose");

const theatreSchema = new mongoose.Schema({

    name:
    { 
        type: String,
        required:true,
        unique:true
     },

    city_id: 
    { 
        type: mongoose.Schema.Types.ObjectId,
        ref:"City"
    },
},
{
    timestamps:true
})

const theatreModel = mongoose.model("Theatre", theatreSchema);


module.exports = theatreModel;
