const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema


const historytipulSchema = new mongoose.Schema({
    originaltipulid: {type:ObjectId, ref:"Tipul"},

    carnumber: { type: String },
    lastipuldate: { type: Date },
    zkaottipul: { type: String },
    tipultype: { type: String },
    tolarancedate: { type: Date },
    gofbizoa: { type: String },
    description: { type: String },
   
    //files
    status: { type: String, default: 'ממתין' }
}, { timestamps: true });

const Historytipul = mongoose.model('Historytipul', historytipulSchema);

module.exports = Historytipul;