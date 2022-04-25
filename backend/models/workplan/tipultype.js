const mongoose = require('mongoose');



const tipultypeSchema = new mongoose.Schema({
    _id:{type:String},
    name:{type:String},
   
});

const Tipultype = mongoose.model('Tipultype', tipultypeSchema);

module.exports = Tipultype;

