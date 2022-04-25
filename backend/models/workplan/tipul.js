const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema


const tipulSchema = new mongoose.Schema({
carnumber:{type:String},
lastipuldate:{type:Date},
zkaottipul:{type:String},
tipultype:{type:String},
tolarancedate:{type:Date},
gofbizoa:{type:String},
description:{type:String},
carteam: {type:ObjectId, ref:"CarTeam", default: null },
sadnabizoa: {type:ObjectId, ref:"SadnaBizoa", default: null},
gdodbizoa: {type:ObjectId, ref:"GdodBizoa", default: null},
confirm:{type:String},
//files
status:{type:String, default:'ממתין'}
}, {timestamps: true});

const Tipul = mongoose.model('Tipul', tipulSchema);

module.exports = Tipul;