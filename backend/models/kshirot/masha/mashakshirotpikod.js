const mongoose = require('mongoose');



const mashakshirotpikodSchema = new mongoose.Schema({
// פרטי מפקד
commandername:{type: String}, //שם מפקד
timeinrole:{type: String},// זמן בתפקיד
// פרטי ממלא
unit:{type: String}, // יחידה
name:{type: String}, // שם
phone:{type: String},// מספר פלאםון
//איוש כא
officershamal:{type:String},
officershamaldetails:{type:String},
//בעלי תפקיד
keva:{type:String},
kevadetails:{type:String},
aaz:{type:String},
aazdetails:{type:String},
miloem:{type: String},
miloemdetails:{type: String},
//חסון מנטאלי
gimalim: {type: String},//  גימלים
gimalimdetails: {type: String},
nifkadot: {type: String},
nifkadotdetails: {type: String},
nasher:{type: String},
nasherdetails:{type: String},
himazot:{type: String},
himazotdetails:{type: String},

bizoaemonim:{type:String},
bizoaemonimdetails:{type:String},

bizoasadna:{type:String},
bizoasadnadeatils:{type:String},
yomgibush:{type:String},
yomgibushdetails:{type:String},
mentalevents:{type:String},
mentaleventsdetails:{type:String},
professionalexplanations:{type:String},
professionalexplanationsdetails:{type:String},
//ארגון 
torattene:{type:String}, 
torattenedetails:{type:String},

maindesk:{type:String},
nahi:{type:String}, // ארגז כלים
mishan:{type:String},
handasa:{type:String},
tifol:{type:String}, // התאמת כע לסוג הצלם
tasha:{type:String},
// חלפים 
logisticsequipment:{type:String}, // יכולת העמסה
dedicatedequipment:{type:String},

//קיום ותשתיות
loadrequired:{type:String}, // הילום מלאי
hamal:{type:String},

//תורה ותפיסות
shibozkravi:{type:String},
authorizedlevelapproval:{type:String},
subjectlevelapproval:{type:String},
pakalim:{type:String},
azarim:{type:String},

diamond:{type:String},
sap:{type:String},
pakal:{type:String},
eventsystem:{type:String},

//אימונים והכשרות
executionversusplanning:{type:String},
qualityoftraining:{type:String},
numberofparticipants:{type:String},

mamal:{type:String},
operationalcontinuity:{type:String},

trainingadjustment:{type:String},

//סיכום
sicom:{type:String},


}, {timestamps: true});

const MashaKshirotPikod = mongoose.model('MashaKshirotPikod', mashakshirotpikodSchema);

module.exports = MashaKshirotPikod;