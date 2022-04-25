import React, { useState, useEffect } from 'react';
import { Link, withRouter, Redirect } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Container,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Alert,
  Spinner,
  Label,
  Col
} from "reactstrap";
import axios from 'axios';
import history from 'history.js'
import { produce } from 'immer'
import { generate } from 'shortid'
import { toast } from "react-toastify";

const AddMatagForm = ({ match }) => {

  const [matagdata, setMatagData] = useState({
    // כללי
    klali: '', //פרטים כלליים
    target: '',// מטרות האימון 
    // פרטי מבצע סיכום
    name: '', // ממלא הטופס
    //מדדי סף לכשירות המטאגים 
    // התייצבות בעמ
    kata: 'בוצע',// התייצבות קט"א חטיבה וקט"א גדודי בכל גדוד מהחטיבה
    matag: 'בוצע',//התייצבות מטאג
    mhtapim: 'בוצע',//התייצבות 70% מחטפים מכלל החטיבות
    nagadim: 'בוצע',//התייצבות 70% מכלל נגדי החטיבה
    nohak: 'בוצע', //ביצוע נוה"ק מלא עד רמת תיאום תכנית ע"י קט"א חטיבה לכל גדוד
    nihok: 'בוצע',// תרגול ניהו"ק
    // סדכ כר
    car: 'בוצע', // רכב/נגמ"ש 25א'
    nagmashzid: 'בוצע', //נגמ"ש צי"ד 15 א'
    nagmashkatkd: 'בוצע',// נגמ"ש כתק"ד 19 אחד לכל גדוד
    nagmashhatap: 'בוצע', // נגמ"ש חט"פ 9 אחד לכל גדוד
    nagmashkatkl: 'בוצע', //נגמ"ש כתק"ל 19 ב' אחד לכל גדוד
    // מערכת הכנות לאימון
    emon: '', // אחוז ההתיצבות לאימון
    maracht: '1', // רמת מערכת ההכנות
    limod: '1',// מידת הגדרת נושאי חי"ח ללימוד ותרגול
    natonim: '1', // הזנת נתונים ונספח אחזקה במשואה
    //נוהל הקרב 
    //תהליך ביצוע נוהל הקרב 
    kabalatpkodot: 'בוצע', // קבלת פקודות אחזקה רמה ממונה 
    ramatbkiot: '1', // רמת בקיאות
    bkiotbasadak: '1', // רמת בקיאות בסדכ
    ramatktiva: '1', // רמת כתיבת נספח אחזקה
    tiomtohnit: 'בוצע',// תיאום תוכנית האחזקה ע"י קט"א חטיבה
    ehotazarim: '1', // איכות הכנת עזרים
    //תכנון מענה אחזקתי
    ramathashlita: '1', // רמת השליטה בנתוני צל"ם לאחזקה
    ramatbizoa: '1', // רמת ביצוע חישובי שחיקה
    ramatbkiotkhot: '1', // רמת הבקיאות במיקום כוחות שכנים
    //ניהול הקרב
    //מענה אחזקתי לרציפות הלחימה
    midatrazifot: '1',// מידת הרציפות במענה האחזקתי
    ramathatiomkhot: '1', // רמת התיאום והשליטה בתנועה ובמיקום כוחות אג"ם ואחזקה
    tirgolpinoi: '1', // תרגול פינוי פצועים במסגרת החט"פ
    // בניית תמ"צ וביצוע הערכת מצב מתמשכת
    ramathashlitabtmona: '1', //רמת השליטה בתמונת המצב
    ramathabakara: '1', // רמת הבקרה על ביצוע תוכנית האחזקה
    midathakabaladohot: '1', // מידת קבלה ומסירה של דוחות עיתיים
    ramatbizoamtmasht: '1', // רמת ביצוע הערכת מצב מתמשכת
    //יחסי גומלין
    ehotgomlin: '1', // איכות יחסי הגומלין בתוך מערכי האחזקה
    ehotgomlinplogot: '1', // איכות יחסי הגומלין עם הפלוגות
    //למידה והפקת לקחים
    sikombnaim: '1', // רמת ביצוע סיכומי ביניים
    lkahim: '1', // מידת יישום לקחים מאימונים קודמים
    sikomemon: 'בוצע', // ביצוע סיכום האימון בסיום האימון
    hafaza: '1', // הפצת סיכום אימון ותוכנית עבודה לשיפור הליקויים שנתגלו
    bizoambhnim: '1', // ביצוע מבחני רמה לקט"אי גדוד, ממטא"גים, מנהלי עבודה, מחטפ"ים, אחראי ניהול מלאי
    //סיכום
    //חוות דעת מאמן
    mashov: '1', // חוו"ד מאמן
    // לקחים ע"פ מרכיבי בניין הכוח
    lkahimtene: '', // לקחים לתורה, טנ"ה ואופרטיבי
    lkahimergon: '', // לקחים לארגון ותקינה
    lkahimadam: '', //לקחים לכוח אדם
    lkahimemon: '', // לקחים לאימונים והכשרות
    lkahimamlah: '', // לקחים לאמצעים ואמל"ח
    // נקודות לשימור ושיפור
    shipor: '', // נקודות לשיפור
    shimor: '', // נקודות לשימור

    //  סיכום
    sicommamn: '', // סיכום המאמן
    sicommitaman: '', //  סיכום המתאמן
  })
  const [temphativaid, setTempHativaId] = useState([]); // temp value of select input

  function init() {
    var hativaidtemp = match.params.hativaid;
    setTempHativaId(hativaidtemp)
  }

  function handleChange(evt) {
    const value = evt.target.value;
    setMatagData({ ...matagdata, [evt.target.name]: value });
  }

  const clickSubmit = event => {
    CheckMatagData();
  }

  function CheckMatagData() {
    // const temptraining = trainingdata;
    var IsValidMatag = true;
    /* var ErrorReason = '';
 
     if ((temptraining.details == "") || (temptraining.goals == "") || (temptraining.lkhaimtene == "") || (temptraining.lkhaimamlah == "")
       || (temptraining.lkhaimadam == "") || (temptraining.lkhaimlimon == "") || (temptraining.lkhaimlirgon == "") || (temptraining.shipor == "") || (temptraining.shimor == "") || (temptraining.sicomhonach == "") || (temptraining.sicomhmitaman == "") || (temptraining.namehonach == "") ||
       (temptraining.tafkidhonach == "") || (temptraining.masherhonach == "")) 
       {
       IsValidTipul = false;
       ErrorReason += 'אחד או יותר מהשדות ריק \n'
     }*/

    if (IsValidMatag == true) {
      AddMatagToDb();
    }
    /* else {
       toast.warning(ErrorReason);
     }*/
  }

  function AddMatagToDb() {
    const tempmatag = matagdata;
    axios.post(`http://localhost:8000/api/matag`, tempmatag)
      .then(res => {
        console.log(res.data._id)// returns current added matag id
        UpdateHativasMatag(res.data._id);
      })
      .catch(error => {

      })
    console.log(tempmatag);
  }

  function UpdateHativasMatag(addedmatagid) {
    axios.post(`http://localhost:8000/api/hativa/updatematag`, [temphativaid, addedmatagid])
      .then(res => {
        UpdateHativasMatagHistory(addedmatagid);
      })
      .catch(error => {

      })
  }

  function UpdateHativasMatagHistory(addedmatagid) {
    axios.post(`http://localhost:8000/api/hativa/updatemataghistory`, [temphativaid, addedmatagid])
      .then(res => {
        toast.success(`מטא"ג נוסף בהצלחה`);
        history.goBack();
      })
      .catch(error => {

      })
  }

  useEffect(() => {
    init();
  }, [])

  return (
    <Container style={{ paddingTop: '80px', direction: 'rtl' }}>
      <Row>
        <Card>
          <CardHeader style={{ direction: 'rtl' }}>
            <CardTitle tag="h4" style={{ direction: 'rtl', textAlign: 'center', fontWeight: "bold" }}>דו"ח אימון מטא"גים חטיבתי</CardTitle>{/*headline*/}
          </CardHeader>

          <CardBody style={{ direction: 'rtl' }}>
            <Container>
              <div style={{ fontSize: '18px', textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>כללי</div>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>ציין פרטים כלליים</div>

              <FormGroup dir="rtl" >
                <Input type="textarea" bsSize="lg" name="klali" value={matagdata.klali} onChange={handleChange} />
              </FormGroup>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>ציין את מטרות האימון</div>

              <FormGroup dir="rtl" >
                <Input type="textarea" bsSize="lg" name="target" value={matagdata.target} onChange={handleChange} />
              </FormGroup>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>פרטי מבצע סיכום</div>

              <div style={{ textAlign: 'right', paddingTop: '10px' }}>ממלא הטופס</div>
              <FormGroup dir="rtl" >
                <Input type="text" bsSize="lg" name="name" value={matagdata.name} onChange={handleChange} />
              </FormGroup>

            </Container>
          </CardBody>
        </Card>
      </Row>
      <Row>
        <Col xs={12} md={6}>
          <Card>
            <CardBody style={{ direction: 'rtl' }}>
              <Container>

                <div style={{ fontSize: '18px', textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>מדדי סף לכשירות המטא"גים כחלק מאימון חטיבה</div>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>התייצבות בע"ת</div>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>התייצבות קט"א חטיבה וקט"א גדודי בכל גדוד מהחטיבה</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="kata" value={matagdata.kata} onChange={handleChange}>
                    <option value="בוצע">בוצע</option>
                    <option value="לא בוצע">לא בוצע</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>התייצבות ממטא"ג/מנהל עבודה בכל גדוד מהחטיבה</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="matag" value={matagdata.matag} onChange={handleChange}>
                    <option value="בוצע">בוצע</option>
                    <option value="לא בוצע">לא בוצע</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>התייצבות 70 אחוזים מחט"פים מכלל החטיבות</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="mhtapim" value={matagdata.mhtapim} onChange={handleChange}>
                    <option value="בוצע">בוצע</option>
                    <option value="לא בוצע">לא בוצע</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>התייצבות 70 אחוזים מכלל נגדי החטיבה</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="nagadim" value={matagdata.nagadim} onChange={handleChange}>
                    <option value="בוצע">בוצע</option>
                    <option value="לא בוצע">לא בוצע</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>ביצוע נוה"ק מלא עד רמת תיאום תכנית ע"י קט"א חטיבה לכל גדוד</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="nohak" value={matagdata.nohak} onChange={handleChange}>
                    <option value="בוצע">בוצע</option>
                    <option value="לא בוצע">לא בוצע</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>תרגול ניהו"ק</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="nihok" value={matagdata.nihok} onChange={handleChange}>
                    <option value="בוצע">בוצע</option>
                    <option value="לא בוצע">לא בוצע</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>סד"כ כ"ר/רק"ם מינימלי לאימון</div>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>רכב/נגמ"ש 25א'</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="car" value={matagdata.car} onChange={handleChange}>
                    <option value="בוצע">בוצע</option>
                    <option value="לא בוצע">לא בוצע</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>נגמ"ש צי"ד 15 א'</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="nagmashzid" value={matagdata.nagmashzid} onChange={handleChange}>
                    <option value="בוצע">בוצע</option>
                    <option value="לא בוצע">לא בוצע</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>נגמ"ש כתק"ד 19 אחד לכל גדוד</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="nagmashkatkd" value={matagdata.nagmashkatkd} onChange={handleChange}>
                    <option value="בוצע">בוצע</option>
                    <option value="לא בוצע">לא בוצע</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>נגמ"ש חט"פ 9 אחד לכל גדוד</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="nagmashhatap" value={matagdata.nagmashhatap} onChange={handleChange}>
                    <option value="בוצע">בוצע</option>
                    <option value="לא בוצע">לא בוצע</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>נגמ"ש כתק"ל 19 ב' אחד לכל גדוד</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="nagmashkatkl" value={matagdata.nagmashkatkl} onChange={handleChange}>
                    <option value="בוצע">בוצע</option>
                    <option value="לא בוצע">לא בוצע</option>
                  </Input>
                </FormGroup>

                <div style={{ fontSize: '18px', textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>מערכת הכנות לאימון</div>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>אחוז התייצבות בעלי תפקידים לאימון</div>
                <FormGroup dir="rtl" >
                  <Input type="number" min="0" bsSize="lg" name="emon" value={matagdata.emon} onChange={handleChange} />
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>רמת מערכת ההכנות שבוצעה לקראת האימון</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="maracht" value={matagdata.maracht} onChange={handleChange}>
                    <option value="1">1- לא מספיק</option>
                    <option value="2">2- נמוך</option>
                    <option value="3">3- בינוני</option>
                    <option value="4">4- טוב</option>
                    <option value="5">5- טוב מאוד</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>מידת הגדרת נושאי חי"ח ללימוד ותרגול</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="limod" value={matagdata.limod} onChange={handleChange}>
                    <option value="1">1- לא מספיק</option>
                    <option value="2">2- נמוך</option>
                    <option value="3">3- בינוני</option>
                    <option value="4">4- טוב</option>
                    <option value="5">5- טוב מאוד</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>הזנת נתונים ונספח אחזקה במשואה</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="natonim" value={matagdata.natonim} onChange={handleChange}>
                    <option value="1">1- לא מספיק</option>
                    <option value="2">2- נמוך</option>
                    <option value="3">3- בינוני</option>
                    <option value="4">4- טוב</option>
                    <option value="5">5- טוב מאוד</option>
                  </Input>
                </FormGroup>

                <div style={{ fontSize: '18px', textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>נוהל הקרב</div>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>תהליך ביצוע נוהל הקרב</div>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>קבלת פקודת אחזקה מרמה ממונה</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="kabalatpkodot" value={matagdata.kabalatpkodot} onChange={handleChange}>
                    <option value="בוצע">בוצע</option>
                    <option value="לא בוצע">לא בוצע</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>רמת בקיאות בגזרת הלחימה</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="ramatbkiot" value={matagdata.ramatbkiot} onChange={handleChange}>
                    <option value="1">1- לא מספיק</option>
                    <option value="2">2- נמוך</option>
                    <option value="3">3- בינוני</option>
                    <option value="4">4- טוב</option>
                    <option value="5">5- טוב מאוד</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>רמת בקיאות בסד"כ, משימות ויכולות</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="bkiotbasadak" value={matagdata.bkiotbasadak} onChange={handleChange}>
                    <option value="1">1- לא מספיק</option>
                    <option value="2">2- נמוך</option>
                    <option value="3">3- בינוני</option>
                    <option value="4">4- טוב</option>
                    <option value="5">5- טוב מאוד</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>רמת כתיבת נספח אחזקה</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="ramatktiva" value={matagdata.ramatktiva} onChange={handleChange}>
                    <option value="1">1- לא מספיק</option>
                    <option value="2">2- נמוך</option>
                    <option value="3">3- בינוני</option>
                    <option value="4">4- טוב</option>
                    <option value="5">5- טוב מאוד</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>תיאום תוכנית האחזקה ע"י קט"א חטיבה</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="tiomtohnit" value={matagdata.tiomtohnit} onChange={handleChange}>
                    <option value="בוצע">בוצע</option>
                    <option value="לא בוצע">לא בוצע</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>איכות הכנת עזרים</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="ehotazarim" value={matagdata.ehotazarim} onChange={handleChange}>
                    <option value="1">1- לא מספיק</option>
                    <option value="2">2- נמוך</option>
                    <option value="3">3- בינוני</option>
                    <option value="4">4- טוב</option>
                    <option value="5">5- טוב מאוד</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>תכנון מענה אחזקתי</div>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>רמת השליטה בנתוני צל"ם לאחזקה</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="ramathashlita" value={matagdata.ramathashlita} onChange={handleChange}>
                    <option value="1">1- לא מספיק</option>
                    <option value="2">2- נמוך</option>
                    <option value="3">3- בינוני</option>
                    <option value="4">4- טוב</option>
                    <option value="5">5- טוב מאוד</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>רמת ביצוע חישובי שחיקה</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="ramatbizoa" value={matagdata.ramatbizoa} onChange={handleChange}>
                    <option value="1">1- לא מספיק</option>
                    <option value="2">2- נמוך</option>
                    <option value="3">3- בינוני</option>
                    <option value="4">4- טוב</option>
                    <option value="5">5- טוב מאוד</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>רמת הבקיאות במיקום כוחות שכנים</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="ramatbkiotkhot" value={matagdata.ramatbkiotkhot} onChange={handleChange}>
                    <option value="1">1- לא מספיק</option>
                    <option value="2">2- נמוך</option>
                    <option value="3">3- בינוני</option>
                    <option value="4">4- טוב</option>
                    <option value="5">5- טוב מאוד</option>
                  </Input>
                </FormGroup>

              </Container>
            </CardBody>
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card>
            <CardBody>
              <Container>

                <div style={{ fontSize: '18px', textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>ניהול הקרב</div>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>מענה אחזקתי לרציפות הלחימה</div>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>מידת הרציפות במענה האחזקתי</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="midatrazifot" value={matagdata.midatrazifot} onChange={handleChange}>
                    <option value="1">1- לא מספיק</option>
                    <option value="2">2- נמוך</option>
                    <option value="3">3- בינוני</option>
                    <option value="4">4- טוב</option>
                    <option value="5">5- טוב מאוד</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>רמת התיאום והשליטה בתנועה ובמיקום כוחות אג"ם ואחזקה</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="ramathatiomkhot" value={matagdata.ramathatiomkhot} onChange={handleChange}>
                    <option value="1">1- לא מספיק</option>
                    <option value="2">2- נמוך</option>
                    <option value="3">3- בינוני</option>
                    <option value="4">4- טוב</option>
                    <option value="5">5- טוב מאוד</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>תרגול פינוי פצועים במסגרת החט"פ</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="tirgolpinoi" value={matagdata.tirgolpinoi} onChange={handleChange}>
                    <option value="1">1- לא מספיק</option>
                    <option value="2">2- נמוך</option>
                    <option value="3">3- בינוני</option>
                    <option value="4">4- טוב</option>
                    <option value="5">5- טוב מאוד</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>בניית תמ"צ וביצוע הערכת מצב מתמשכת</div>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>רמת השליטה בתמונת המצב</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="ramathashlitabtmona" value={matagdata.ramathashlitabtmona} onChange={handleChange}>
                    <option value="1">1- לא מספיק</option>
                    <option value="2">2- נמוך</option>
                    <option value="3">3- בינוני</option>
                    <option value="4">4- טוב</option>
                    <option value="5">5- טוב מאוד</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>רמת הבקרה על ביצוע תוכנית האחזקה</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="ramathabakara" value={matagdata.ramathabakara} onChange={handleChange}>
                    <option value="1">1- לא מספיק</option>
                    <option value="2">2- נמוך</option>
                    <option value="3">3- בינוני</option>
                    <option value="4">4- טוב</option>
                    <option value="5">5- טוב מאוד</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>מידת קבלה ומסירה של דוחות עיתיים</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="midathakabaladohot" value={matagdata.midathakabaladohot} onChange={handleChange}>
                    <option value="1">1- לא מספיק</option>
                    <option value="2">2- נמוך</option>
                    <option value="3">3- בינוני</option>
                    <option value="4">4- טוב</option>
                    <option value="5">5- טוב מאוד</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>רמת ביצוע הערכת מצב מתמשכת</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="ramatbizoamtmasht" value={matagdata.ramatbizoamtmasht} onChange={handleChange}>
                    <option value="1">1- לא מספיק</option>
                    <option value="2">2- נמוך</option>
                    <option value="3">3- בינוני</option>
                    <option value="4">4- טוב</option>
                    <option value="5">5- טוב מאוד</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>יחסי גומלין</div>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>איכות יחסי הגומלין בתוך מערכי האחזקה</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="ehotgomlin" value={matagdata.ehotgomlin} onChange={handleChange}>
                    <option value="1">1- לא מספיק</option>
                    <option value="2">2- נמוך</option>
                    <option value="3">3- בינוני</option>
                    <option value="4">4- טוב</option>
                    <option value="5">5- טוב מאוד</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>איכות יחסי הגומלין עם הפלוגות</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="ehotgomlinplogot" value={matagdata.ehotgomlinplogot} onChange={handleChange}>
                    <option value="1">1- לא מספיק</option>
                    <option value="2">2- נמוך</option>
                    <option value="3">3- בינוני</option>
                    <option value="4">4- טוב</option>
                    <option value="5">5- טוב מאוד</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>למידה והפקת לקחים</div>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>רמת ביצוע סיכומי ביניים</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="sikombnaim" value={matagdata.sikombnaim} onChange={handleChange}>
                    <option value="1">1- לא מספיק</option>
                    <option value="2">2- נמוך</option>
                    <option value="3">3- בינוני</option>
                    <option value="4">4- טוב</option>
                    <option value="5">5- טוב מאוד</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>מידת יישום לקחים מאימונים קודמים</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="lkahim" value={matagdata.lkahim} onChange={handleChange}>
                    <option value="1">1- לא מספיק</option>
                    <option value="2">2- נמוך</option>
                    <option value="3">3- בינוני</option>
                    <option value="4">4- טוב</option>
                    <option value="5">5- טוב מאוד</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>ביצוע סיכום האימון בסיום האימון</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="sikomemon" value={matagdata.sikomemon} onChange={handleChange}>
                    <option value="בוצע">בוצע</option>
                    <option value="לא בוצע">לא בוצע</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>הפצת סיכום אימון ותוכנית עבודה לשיפור הליקויים שנתגלו</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="hafaza" value={matagdata.hafaza} onChange={handleChange}>
                    <option value="1">1- לא מספיק</option>
                    <option value="2">2- נמוך</option>
                    <option value="3">3- בינוני</option>
                    <option value="4">4- טוב</option>
                    <option value="5">5- טוב מאוד</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>ביצוע מבחני רמה לקט"אי גדוד, ממטא"גים, מנהלי עבודה, מחטפ"ים, אחראי ניהול מלאי</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="bizoambhnim" value={matagdata.bizoambhnim} onChange={handleChange}>
                    <option value="1">1- לא מספיק</option>
                    <option value="2">2- נמוך</option>
                    <option value="3">3- בינוני</option>
                    <option value="4">4- טוב</option>
                    <option value="5">5- טוב מאוד</option>
                  </Input>
                </FormGroup>

                <div style={{ fontSize: '18px', textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>סיכום</div>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>חוות דעת מאמן</div>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>חוו"ד מאמן</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="mashov" value={matagdata.mashov} onChange={handleChange}>
                    <option value="1">1- לא מספיק</option>
                    <option value="2">2- נמוך</option>
                    <option value="3">3- בינוני</option>
                    <option value="4">4- טוב</option>
                    <option value="5">5- טוב מאוד</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>לקחים ע"פ מרכיבי בניין הכוח</div>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>לקחים לתורה, טנ"ה ואופרטיבי</div>
                <FormGroup dir="rtl" >
                  <Input type="textarea" bsSize="lg" name="lkahimtene" value={matagdata.lkahimtene} onChange={handleChange} />
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>לקחים לארגון ותקינה</div>
                <FormGroup dir="rtl" >
                  <Input type="textarea" bsSize="lg" name="lkahimergon" value={matagdata.lkahimergon} onChange={handleChange} />
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>לקחים לכוח אדם</div>
                <FormGroup dir="rtl" >
                  <Input type="textarea" bsSize="lg" name="lkahimadam" value={matagdata.lkahimadam} onChange={handleChange} />
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>לקחים לאימונים והכשרות</div>
                <FormGroup dir="rtl" >
                  <Input type="textarea" bsSize="lg" name="lkahimemon" value={matagdata.lkahimemon} onChange={handleChange} />
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>לקחים לאמצעים ואמל"ח</div>
                <FormGroup dir="rtl" >
                  <Input type="textarea" bsSize="lg" name="lkahimamlah" value={matagdata.lkahimamlah} onChange={handleChange} />
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>נקודות לשימור ושיפור</div>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>נקודות לשיפור</div>
                <FormGroup dir="rtl" >
                  <Input type="textarea" bsSize="lg" name="shipor" value={matagdata.shipor} onChange={handleChange} />
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>נקודות לשימור</div>
                <FormGroup dir="rtl" >
                  <Input type="textarea" bsSize="lg" name="shimor" value={matagdata.shimor} onChange={handleChange} />
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>סיכום</div>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>סיכום המאמן</div>
                <FormGroup dir="rtl" >
                  <Input type="textarea" bsSize="lg" name="sicommamn" value={matagdata.sicommamn} onChange={handleChange} />
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>סיכום המתאמן</div>
                <FormGroup dir="rtl" >
                  <Input type="textarea" bsSize="lg" name="sicommitaman" value={matagdata.sicommitaman} onChange={handleChange} />
                </FormGroup>

                <div style={{ textAlign: 'center' }}>
                  <button className="btn" onClick={clickSubmit}>הוסף אימון חטיבתי</button>
                </div>

              </Container>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
export default withRouter(AddMatagForm);;