const mongoose = require('mongoose');

const zshigraSchema = new mongoose.Schema({
policy:{type:String},
policy_des:{type:String},
package:{type:Number},
package_value:{type:Number},
cycle:{type:Number},
units:{type:String},
descreption:{type:String},
hierarchy:{type:Number},
type_of_treatment:{type:Number},
lower_tolerance:{type:Number},
upper_tolerance:{type:Number},
//files
}, {timestamps: true});

const Zshigra = mongoose.model('Zshigra', zshigraSchema);

module.exports = Zshigra;