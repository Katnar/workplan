const mongoose = require('mongoose');



const mkabazSchema = new mongoose.Schema({
    name:{type:String},
    _id:{type:String},
    //mkat:[{type:String}],
    magad:{type:String},
});

const Mkabaz = mongoose.model('Mkabaz', mkabazSchema);

module.exports = Mkabaz;

