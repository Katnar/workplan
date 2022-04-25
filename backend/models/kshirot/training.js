const mongoose = require('mongoose');



const trainingSchema = new mongoose.Schema({
// כללי 
details:{type: String}, //פרטים כללים
goals:{type: String},// מטרות אימון
training:{type:Array},//פרטי הסגל המתאמן

// מדדי סף לאימון
maflag:{type: String}, // התייצבות מפלג קטא
kata:{type: String},// התייצבות קטא
kitathalafim:{type: String},// התייצבות  מפקד כיתת חלפים
kitatnaot:{type: String},// התייצבות מפקד כיתת נאות
kitacala:{type: String},// התייצבות  מפקד כיתה קלה
//יציאת כלי אחזקה לתרגיל 
a:{type: String},// 19 א 
b:{type: String}, // 19 ב
d:{type: String},//19 ד

//ביצוע נוהק סדור הכולל  
nispach:{type: String},// כיתבת נספח אחזקה
nohak:{type: String},// הכנת תלקון נוהק
nihok:{type: String},// הכנת תלקון ניהוק
azarim:{type: String},// הכנת עזרים
//נוהק עג משואה
pkodotmasoa:{type:String}, //הזנת פקודות אחזקה במשואה  
sadak:{type:String}, // הזנת סדכ כלים וכשירות

// ביצוע תדריך לקרב 
tadrich:{type:String}, // ביצוע תדריך מפלג
//נוהל קרב
//ביצוע הערכת מצב
pkodotahzaka:{type:String}, // קבלת פקודות אחזקה 
bkiot:{type:String}, // רמת בקיאות בגזרת הליחמה
bkiotsadac:{type:String}, // רמת בקיאות בסדכ  

// תהליך ביצוע נוהל קרב
ramatnispach:{type:String}, //רמת כתיבת נספח אחזקה 
tiom:{type:String},// תיאום תוענית האחזקה 
azarimquality:{type:String}, //איכות הכנת עזרים
aishor:{type:String},// אישור תוכניות 
//תכנון מענה אחזקתי
zlm:{type:String}, // רמת השליטה בנתוני צלם
shika:{type:String}, // ביצוע חישובי שחיקה
bkiotmikom:{type:String},// הבקיאות במיקום כוחות שכנים
bkiotbgdod:{type:String},// הבקיאות ביעולות מערך האחזקה בגדוד
//ציד בנוהק 
shimosbashob:{type:String}, //שימוש במעקכת השוב
bkiotbashob:{type:String}, // רמת בקיאות ושליטה במערכת שוב
//ניהול קרב
// מענה אחזקתי לרציפות הלחימה 
ramatshlita:{type:String}, // רמת השליטה בכוחות קטנים 
razifot:{type:String}, // רציפות במענה אחזקתי
ramattiom:{type:String}, // שליטה ותיאום בכוחות אגם והאזחקה

//בניית תמצ וביצוע הערכת מצב מתמשכת 
shlitabmazav:{type:String}, // שליטה בתמונת מצב
midathatama:{type:String},// מידת התאמת מאמץ האחזקה לתמונת מצב
nihol:{type:String},// ניהול עזרים
midatkabala:{type:String}, // מידת קבלה ומסירה של דוחות עיתיים
hafakat:{type:String}, // הפקת משמעויות מהערכת מצב מתמשכת
// יחסי גומלין
ehot:{type:String}, // איכות יחסי הגומלין בתוך מערכי האחזקה 
ehotplogot:{type:String},// איכות יחסי הגומלין עם הפלוגות 
ehotmfkada:{type:String}, // איכות יחסי הגומלין עם מפקדת הגדוד 
// ציד בניהוק
shimosbashob2:{type:String}, // שימוש במערכת השוב
bkiotbashob2:{type:String},// שימוש במערכת השוב במכלול
//סיכום
// למידה והפקת לקחים
lamida:{type:String}, // רמת בניית עקומת למידה 
sicombainaim:{type:String},// ביצוע סיכומי ביניים
rama:{type:String}, // מבחני רמה למפקדים
sicomimon:{type:String},// סיכום האימון בסיום האימון
imonhiloz:{type:String}, // אימון משטח חילוץ
// לקחים עפ מרכבי בניין הכוח
lkhaimtene:{type:String}, // לקחים טנה 
lkhaimamlah:{type:String}, // לקחים לאמצעי אמלח
lkhaimadam:{type:String}, // לקחים לכוח אדם
lkhaimlimon:{type:String}, // לקחים לאימונים והכשרות
lkhaimlirgon:{type:String}, // לקחים לארגון ותקינה
// נקודות לשיפור שימור
shipor:{type:String}, // הקודות לשיפור
shimor:{type:String}, // הקודות לשימור
// סיכום
sicomhonach:{type:String}, // סיכום חונך האחזקה
sicomhmitaman:{type:String}, // סיכום המתאמן 
namehonach:{type:String}, // פרטי החונך  
tafkidhonach:{type:String}, // פרטי החונך  
masherhonach:{type:String}, // פרטי החונך  
}, {timestamps: true});

const Training = mongoose.model('Training', trainingSchema);

module.exports = Training;