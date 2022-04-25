const mongoose = require('mongoose');



const kshirotSchema = new mongoose.Schema({
// פרטי מפקד
commandername:{type: String}, //שם מפקד
timeinrole:{type: Date},// זמן בתפקיד
// פרטי ממלא
unit:{type: String}, // יחידה
name:{type: String}, // שם
phone:{type: String},// מספר פלאםון
//בעלי תפקיד
experts:{type:String},
expertsmax:{type:String},
officers:{type: Number},// בעלי מקצוע
officersmax:{type: Number},
officersdetails:{type: String},

kzinim: {type: Number},//  קצינים
kzinimmax: {type: Number},
kzinimdetails:{type: String},

//אמצעי אחזקה
teken:{type:Number}, //תקן מול מצבה
tekenmax:{type:Number},
tekendetails:{type:String},
toolsbox:{type:Number}, // ארגז כלים
toolsboxmax:{type:Number},
toolsboxdetails:{type:String},
match:{type:String}, // התאמת כע לסוג הצלם
matchdetails:{type:String},
// חלפים 
load:{type:String}, // יכולת העמסה
loaddeatils:{type:String},
stash:{type:String}, // הילום מלאי
stashdetails:{type:String},
hatak:{type:String}, // חטכ
hatakdetails:{type:String},
bakash:{type:Number}, // בקש
bakashmax:{type:Number},
bakashdetails:{type:String},
bakashniod:{type:String},
bakashnioddetails:{type:String},
lastrefreshdate:{type:Date}, // תאריך רענון אחרון
lastrefreshdatedetails:{type:String},
matchmahin:{type:String}, // התאמת חלפים לצלם רישום מכין
matchmahindetails:{type:String},
matchswap:{type:String}, // התאמת ערכות חלפים לצלמ
matchswapdetails:{type:String},
catalogs:{type:String}, // קטלוגים
catalogsdetails:{type:String},
// אמצעי ניוד
carpiter:{type:Number}, // נגמש פיטר
carpitermax:{type:Number},
carpitedetails:{type:String},
carhatap:{type:Number}, // נגמש חטפ 
carhatapmax:{type:Number},
carhatapdetails:{type:String},
mobilitytools:{type:String}, // אמצעי ניוד מפלג טנא
mobilitytoolsdetails:{type:String},
carlahh:{type:String}, // רכב לחח
carlahhdetails:{type:String},
katkal:{type:String}, // כתקל/כיתת עורב/בקש/בימל צמה
katkaldetails:{type:String},
rioarrow:{type:Number},// ריאו חץ/עגור20
rioarrowmax:{type:Number},
rioarrowdetails:{type:String},
personalprotection:{type:String}, // מיגון אישי
personalprotectiondetails:{type:String},
// שבצק
shiboz:{type:Number}, //התאמץ שיבוץ לקרבי
shibozmax:{type:Number},
shibozdetails:{type:String},
drivers:{type:Number}, // נהגים לכל פלטפורמת ניוד
driversmax:{type:Number},
driversdetails:{type:String},
//פקודות מבצע
pkodotopara:{type:String}, // פקודות אופרטיביות
pkodotoparadetails:{type:String},
tikshorat:{type:Number}, // אמצעי קשר/תקשורת
tikshoratmax:{type:Number},
tikshoratdetails:{type:String},
teneclass:{type:Number},
teneclassmax:{type:Number},
teneclassdeatils:{type:String},
//פקלים
pkodotmashlimot:{type:String}, //המצאות פקודות משלימות מחייבות
pkodotmashlimotdetails:{type:String},
tiom:{type:String}, // תיאום רמה ממונה
tiomdetails:{type:String},
commanderconf:{type:String}, // אישור מפקד 
commanderconfdetails:{type:String},
//מערכות שוב ממוחשבות
tkinot:{type:Number}, // מצאי עמדות שוב תקינות
tkinotmax:{type:Number},
tkinotdetails:{type:String},
tikim:{type:String}, // הזנת תיק נתוני יחידות פקודות ומפות במשואה
tikimdetails:{type:String},
roleholders:{type:Number}, // בעלי תפקידים מוכשרים
roleholdersmax:{type:Number},
roleholdersdetails:{type:String},
//דיווח ושליטה
boxcontent:{type:String}, // תכולת ארגז עפ טנה 1
boxcontentdetails:{type:String},
//אימונים והכשרות
trainingamount:{type:Date},// אימון פלגת טנא- כמות
trainingamountdetails:{type:String},
trainingquality:{type:Number},// אימון פלגת טנא- איכות
trainingqualitydetails:{type:String},
// תרגילים
battaliondrillamount:{type:String}, // תרגיל גדוד כמות
battaliondrillamountdetails:{type:String},
battaliondrillquality:{type:Number}, // תרגיל גדוד איכות
battaliondrillqualitydetails:{type:String},
// הכשרות
kors:{type:Number}, // אחוז מחטפים שעברו קורס מחטפים
korsmax:{type:Number},
korsdetails:{type:String},
nokavim:{type:Number}, // מועכבי שלב יחידה
nokavimmax:{type:Number},
nokavimdetails:{type:String},
tester:{type:Number}, // תעודות בוחן
testermax:{type:Number},
testerdetails:{type:String},
amountmhalaf:{type:Number}, // כמות מוסמכי מחלף
amountmhalafmax:{type:Number},
amountmhalafdetails:{type:String},
amounthanafa:{type:Number}, // כמות מוסמכי הנפה
amounthanafamax:{type:Number},
amounthanafadetails:{type:String},
// רוח יחידה
mentality:{type:Number}, // חוסן מנטלאי
specialkey:{type:Array},
specialkeytwo:{type:Array},
finalgrade:{type:Number},

}, {timestamps: true});

const Kshirot = mongoose.model('Kshirot', kshirotSchema);

module.exports = Kshirot;