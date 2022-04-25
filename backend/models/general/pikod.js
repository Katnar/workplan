const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema


const pikodSchema = new mongoose.Schema({
    _id:{type:String},
    name:{type:String},
    type:{type:String},
    sadir:{type:Boolean},
    ogda:[{type:String}],
    kshirot:{type:ObjectId , ref:'MashaKshirotPikod'},
    history:[
        {type:ObjectId,ref:'MashaKshirotPikod'}
    ],

});

const Pikod = mongoose.model('Pikod', pikodSchema);


module.exports = Pikod;