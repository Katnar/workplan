const mongoose = require('mongoose');



const zkaottipulSchema = new mongoose.Schema({
    _id:{type:String},
    name:{type:String},
   
});

const Zkaottipul = mongoose.model('Zkaottipul', zkaottipulSchema);

module.exports = Zkaottipul;

