const mongoose = require('mongoose');



const matagSchema = new mongoose.Schema({
// כללי
klali:{type:String}, //פרטים כלליים
target:{type:String},// מטרות האימון 
// פרטי מבצע סיכום
name:{type:String}, // ממלא הטופס
//מדדי סף לכשירות המטאגים 
// התייצבות בעמ
kata:{type:String},// התייצבות קט"א חטיבה וקט"א גדודי בכל גדוד מהחטיבה
matag:{type:String},//התייצבות מטאג
mhtapim:{type:String},//התייצבות 70% מחטפים מכלל החטיבות
nagadim:{type:String},//התייצבות 70% מכלל נגדי החטיבה
nohak:{type:String}, //ביצוע נוה"ק מלא עד רמת תיאום תכנית ע"י קט"א חטיבה לכל גדוד
nihok:{type:String},// תרגול ניהו"ק
// סדכ כר
car:{type:String}, // רכב/נגמ"ש 25א'
nagmashzid:{type:String}, //נגמ"ש צי"ד 15 א'
nagmashkatkd:{type:String},// נגמ"ש כתק"ד 19 אחד לכל גדוד
nagmashhatap:{type:String}, // נגמ"ש חט"פ 9 אחד לכל גדוד
nagmashkatkl:{type:String}, //נגמ"ש כתק"ל 19 ב' אחד לכל גדוד
// מערכת הכנות לאימון
emon:{type:String}, // אחוז ההתיצבות לאימון
maracht:{type:String}, // רמת מערכת ההכנות
limod:{type:String},// מידת הגדרת נושאי חי"ח ללימוד ותרגול
natonim:{type:String}, // הזנת נתונים ונספח אחזקה במשואה
//נוהל הקרב 
//תהליך ביצוע נוהל הקרב 
kabalatpkodot:{type:String}, // קבלת פקודות אחזקה רמה ממונה 
ramatbkiot:{type:String}, // רמת בקיאות
bkiotbasadak:{type:String}, // רמת בקיאות בסדכ
ramatktiva:{type:String}, // רמת כתיבת נספח אחזקה
tiomtohnit:{type:String},// תיאום תוכנית האחזקה ע"י קט"א חטיבה
ehotazarim:{type:String}, // איכות הכנת עזרים
//תכנון מענה אחזקתי
ramathashlita:{type:String}, // רמת השליטה בנתוני צל"ם לאחזקה
ramatbizoa:{type:String}, // רמת ביצוע חישובי שחיקה
ramatbkiotkhot:{type:String}, // רמת הבקיאות במיקום כוחות שכנים
//ניהול הקרב
//מענה אחזקתי לרציפות הלחימה
midatrazifot:{type:String},// מידת הרציפות במענה האחזקתי
ramathatiomkhot:{type:String}, // רמת התיאום והשליטה בתנועה ובמיקום כוחות אג"ם ואחזקה
tirgolpinoi:{type:String}, // תרגול פינוי פצועים במסגרת החט"פ
// בניית תמ"צ וביצוע הערכת מצב מתמשכת
ramathashlitabtmona:{type:String}, //רמת השליטה בתמונת המצב
ramathabakara:{type:String}, // רמת הבקרה על ביצוע תוכנית האחזקה
midathakabaladohot:{type:String}, // מידת קבלה ומסירה של דוחות עיתיים
ramatbizoamtmasht:{type:String}, // רמת ביצוע הערכת מצב מתמשכת
//יחסי גומלין
ehotgomlin:{type:String}, // איכות יחסי הגומלין בתוך מערכי האחזקה
ehotgomlinplogot:{type:String}, // איכות יחסי הגומלין עם הפלוגות
//למידה והפקת לקחים
sikombnaim:{type:String}, // רמת ביצוע סיכומי ביניים
lkahim:{type:String}, // מידת יישום לקחים מאימונים קודמים
sikomemon:{type:String}, // ביצוע סיכום האימון בסיום האימון
hafaza:{type:String}, // הפצת סיכום אימון ותוכנית עבודה לשיפור הליקויים שנתגלו
bizoambhnim:{type:String}, // ביצוע מבחני רמה לקט"אי גדוד, ממטא"גים, מנהלי עבודה, מחטפ"ים, אחראי ניהול מלאי
//סיכום
//חוות דעת מאמן
mashov:{type:String}, // חוו"ד מאמן
// לקחים ע"פ מרכיבי בניין הכוח
lkahimtene:{type:String}, // לקחים לתורה, טנ"ה ואופרטיבי
lkahimergon:{type:String}, // לקחים לארגון ותקינה
lkahimadam:{type:String}, //לקחים לכוח אדם
lkahimemon:{type:String}, // לקחים לאימונים והכשרות
lkahimamlah:{type:String}, // לקחים לאמצעים ואמל"ח
// נקודות לשימור ושיפור
shipor:{type:String}, // נקודות לשיפור
shimor:{type:String}, // נקודות לשימור

//  סיכום
sicommamn:{type:String}, // סיכום המאמן
sicommitaman:{type:String}, //  סיכום המתאמן


}, {timestamps: true});

const Matag = mongoose.model('Matag', matagSchema);

module.exports = Matag;