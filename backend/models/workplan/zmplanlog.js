const mongoose = require('mongoose');

const zmplanlogSchema = new mongoose.Schema({
date:{type:Date},
time:{type:Date},
zadik:{type:Number},
zadik_des:{type:String},
Designation:{type:Number},
Designation_des:{type:String},
meaged_al:{type:String},
meaged_al_des:{type:String},
meaged:{type:String},
meaged_des:{type:String},
mekabete:{type:String},
mekabete_des:{type:String},
makat:{type:Number},
makat_des:{type:String},
message_num:{type:Number},
message_des:{type:String},
policy_category:{type:String},
previous_policy:{type:String},
new_policy:{type:String},
previous_maamad:{type:Number},
new_maamad:{type:Number},
plan_number:{type:Number}
//files
}, {timestamps: true});

const Zmplanlog = mongoose.model('Zmplanlog', zmplanlogSchema);

module.exports = Zmplanlog;