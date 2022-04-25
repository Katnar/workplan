const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema


const activetipulSchema = new mongoose.Schema({
    originaltipulid: {type:ObjectId, ref:"Tipul"},

    carnumber: { type: String },
    lastipuldate: { type: Date },
    zkaottipul: { type: String },
    tipultype: { type: String },
    tolarancedate: { type: Date },
    gofbizoa: { type: String },
    description: { type: String },
    carteam: {type:ObjectId, ref:"CarTeam"},
sadnabizoa: {type:ObjectId, ref:"SadnaBizoa"},
gdodbizoa: {type:ObjectId, ref:"GdodBizoa"},
    //files
    status: { type: String, default: 'ממתין' }
}, { timestamps: true });

const Activetipul = mongoose.model('Activetipul', activetipulSchema);

module.exports = Activetipul;