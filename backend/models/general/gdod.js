const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema


const gdodSchema = new mongoose.Schema({
    name:{type:String},
    type:{type:String},
    sadir:{type:Boolean},
    _id:{type:String},
    hativa:{type:String},
    kshirot:{type:ObjectId , ref:'Kshirot'},
    history:[
        {type:ObjectId,ref:'Kshirot'}
    ],
    training:{type:ObjectId , ref:'Training'},
    traininghistory:[
        {type:ObjectId,ref:'Training'}
    ],
});

const Gdod = mongoose.model('Gdod', gdodSchema);

module.exports = Gdod;

