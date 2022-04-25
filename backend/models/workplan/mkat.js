const mongoose = require('mongoose');



const mkatSchema = new mongoose.Schema({
    name:{type:String},
    _id:{type:String},
    mkabaz:{type:String},
});

const Mkat = mongoose.model('Mkat', mkatSchema);

module.exports = Mkat;

