const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema


const ogdaSchema = new mongoose.Schema({
    name:{type:String},
    type:{type:String},
    sadir:{type:Boolean},
    pikod:{type:String},
    _id:{type:String},
    hativa:[{type:String}],

});

const Ogda = mongoose.model('Ogda', ogdaSchema);

module.exports = Ogda;