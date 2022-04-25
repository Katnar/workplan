const mongoose = require('mongoose');



const magadSchema = new mongoose.Schema({
    name:{type:String},
    _id:{type:String},
    //mkabaz:[{type:String}],
    magadal:{type:String},
});

const Magad = mongoose.model('Magad', magadSchema);

module.exports = Magad;

