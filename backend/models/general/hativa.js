const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema


const hativaSchema = new mongoose.Schema({
    name:{type:String},
    type:{type:String},
    sadir:{type:Boolean},
    ogda:{type:String},
    _id:{type:String},
    gdod:[{type:String}],
    matag:{type:ObjectId , ref:'Matag'},
    mataghistory:[
        {type:ObjectId,ref:'Matag'}
    ],
});

const Hativa = mongoose.model('Hativa', hativaSchema);

module.exports = Hativa;