const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema


const gofbizoaSchema = new mongoose.Schema({
    _id:{type:String},
    name:{type:String},
   
   
});

const Gofbizoa = mongoose.model('Gofbizoa', gofbizoaSchema);

module.exports = Gofbizoa;

