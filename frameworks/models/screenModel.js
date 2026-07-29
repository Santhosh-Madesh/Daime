
const mongoose = require("mongoose");

const screenSchema = new mongoose.Schema({
    no : { type: Number, required: true },
    total_seats: { type: Number, required: true},
    theatre_id: { type: mongoose.Schema.ObjectId, required:true },

},
{
    timestamps: true
})

screenSchema.index({ no : 1, theatre_id : 1 }, { unique: true });

const screenModel = mongoose.model("Screen", screenSchema);

module.exports = screenModel;