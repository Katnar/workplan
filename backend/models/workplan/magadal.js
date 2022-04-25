const mongoose = require('mongoose');



const magadalSchema = new mongoose.Schema({
    name:{type:String},
    _id:{type:String},
});

const Magadal = mongoose.model('Magadal', magadalSchema);

module.exports = Magadal;

