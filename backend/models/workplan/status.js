const mongoose = require('mongoose');



const statusSchema = new mongoose.Schema({
    _id:{type:String},
    name:{type:String},
   
});

const Status = mongoose.model('Status', statusSchema);

module.exports = Status;

