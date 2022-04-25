const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
_id:{type:String},
mkat:{type:String},
gdod:{type:String},
ploga:{type:String}
//files
}, {timestamps: true});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;