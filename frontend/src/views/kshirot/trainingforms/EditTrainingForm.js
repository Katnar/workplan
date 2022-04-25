import React, { useState, useEffect,useRef } from 'react';
import { Link, withRouter, Redirect } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator';
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
const EditTrainingForm = ({ match }) => {
   //react validator
   const simpleValidator = useRef(new SimpleReactValidator({
    messages:{
      default: 'נדרש למלא שדה זה'
    },
    element: message => <div style={{background:'#F66C6C',textAlign:'center', fontWeight:'bold'}}>{message}</div>
  }))
  const [, forceUpdate] = useState();
  const [finalspecialkey, setFinalSpecialKey] = useState([])
  const [trainingdata, setTrainingData] = useState({
    // כללי 
    details: '', //פרטים כללים
    goals: '',// מטרות אימון
    training: '',//פרטי הסגל המתאמן

    // מדדי סף לאימון
    maflag: 'בוצע', // התייצבות מפלג קטא
    kata: 'בוצע',// התייצבות קטא
    kitathalafim: 'בוצע',// התייצבות  מפקד כיתת חלפים
    kitatnaot: 'בוצע',// התייצבות מפקד כיתת נאות
    kitacala: 'בוצע',// התייצבות  מפקד כיתה קלה
    //יציאת כלי טנ"א לתרגיל 
    a: 'בוצע',// 19 א 
    b: 'בוצע', // 19 ב
    d: 'בוצע',//19 ד

    //ביצוע נוהק סדור הכולל  
    nispach: 'בוצע',// כיתבת נספח טנ"א
    nohak: 'בוצע',// הכנת תלקון נוהק
    nihok: 'בוצע',// הכנת תלקון ניהוק
    azarim: 'בוצע',// הכנת עזרים
    //נוהק עג משואה
    pkodotmasoa: 'בוצע', //הזנת פקודות טנ"א במשואה  
    sadak: 'בוצע', // הזנת סדכ כלים וכשירות

    // ביצוע תדריך לקרב 
    tadrich: 'בוצע', // ביצוע תדריך מפלג
    //נוהל קרב
    //ביצוע הערכת מצב
    pkodotahzaka: 'בוצע', // קבלת פקודות טנ"א 
    bkiot: '1', // רמת בקיאות בגזרת הליחמה
    bkiotsadac: '1', // רמת בקיאות בסדכ  

    // תהליך ביצוע נוהל קרב
    ramatnispach: '1', //רמת כתיבת נספח טנ"א 
    tiom: 'בוצע',// תיאום תוכנית הטנ"א 
    azarimquality: '1', //איכות הכנת עזרים
    aishor: 'בוצע',// אישור תוכניות 
    //תכנון מענה אחזקתי
    zlm: '1', // רמת השליטה בנתוני צלם
    shika: '1', // ביצוע חישובי שחיקה
    bkiotmikom: '1',// הבקיאות במיקום כוחות שכנים
    bkiotbgdod: '1',// הבקיאות ביעולות מערך הטנ"א בגדוד
    //ציד בנוהק 
    shimosbashob: 'בוצע', //שימוש במעקכת השוב
    bkiotbashob: '1', // רמת בקיאות ושליטה במערכת שוב
    //ניהול קרב
    // מענה אחזקתי לרציפות הלחימה 
    ramatshlita: '1', // רמת השליטה בכוחות קטנים 
    razifot: '1', // רציפות במענה אחזקתי
    ramattiom: '1', // שליטה ותיאום בכוחות אגם והאזחקה

    //בניית תמצ וביצוע הערכת מצב מתמשכת 
    shlitabmazav: '1', // שליטה בתמונת מצב
    midathatama: '1',// מידת התאמת מאמץ הטנ"א לתמונת מצב
    nihol: '1',// ניהול עזרים
    midatkabala: '1', // מידת קבלה ומסירה של דוחות עיתיים
    hafakat: '1', // הפקת משמעויות מהערכת מצב מתמשכת
    // יחסי גומלין
    ehot: '1', // איכות יחסי הגומלין בתוך מערכי הטנ"א 
    ehotplogot: '1',// איכות יחסי הגומלין עם הפלוגות 
    ehotmfkada: '1', // איכות יחסי הגומלין עם מפקדת הגדוד 
    // ציד בניהוק
    shimosbashob2: 'בוצע', // שימוש במערכת השוב
    bkiotbashob2: '1',// שימוש במערכת השוב במכלול
    //סיכום
    // למידה והפקת לקחים
    lamida: '1', // רמת בניית עקומת למידה 
    sicombainaim: '1',// ביצוע סיכומי ביניים
    rama: '1', // מבחני רמה למפקדים
    sicomimon: 'בוצע',// סיכום האימון בסיום האימון
    imonhiloz: '1', // אימון משטח חילוץ
    // לקחים עפ מרכבי בניין הכוח
    lkhaimtene: '', // לקחים טנה 
    lkhaimamlah: '', // לקחים לאמצעי אמלח
    lkhaimadam: '', // לקחים לכוח אדם
    lkhaimlimon: '', // לקחים לאימונים והכשרות
    lkhaimlirgon: '', // לקחים לארגון ותקינה
    // נקודות לשיפור שימור
    shipor: '', // הקודות לשיפור
    shimor: '', // הקודות לשימור
    // סיכום
    sicomhonach: '', // סיכום חונך הטנ"א
    sicomhmitaman: '', // סיכום המתאמן 
    namehonach: '', // שם החונך  
    tafkidhonach: '', // תפקיד החונך 
    masherhonach: '', // מאשר החונך 
  })

  function handleChange(evt) {
    const value = evt.target.value;
    setTrainingData({ ...trainingdata, [evt.target.name]: value });
  }

  const clickSubmit = event => {
    CheckTrainingData();
  }

  function CheckTrainingData() {
    const temptraining = trainingdata;
    var IsValidTipul = true;
    var ErrorReason = '';

    if ((temptraining.details == "") || (temptraining.goals == "") || (temptraining.lkhaimtene == "") || (temptraining.lkhaimamlah == "")
      || (temptraining.lkhaimadam == "") || (temptraining.lkhaimlimon == "") || (temptraining.lkhaimlirgon == "") || (temptraining.shipor == "") || (temptraining.shimor == "") || (temptraining.sicomhonach == "") || (temptraining.sicomhmitaman == "") || (temptraining.namehonach == "") ||
      (temptraining.tafkidhonach == "") || (temptraining.masherhonach == "")) 
      {
      IsValidTipul = false;
      ErrorReason += 'אחד או יותר מהשדות ריק \n'
    }
    
    if (IsValidTipul == true) {
      UpdateTraining();
    }
    else {
      toast.warning(ErrorReason);
    }
  }

  function UpdateTraining() {
    var temptraining = trainingdata;
    delete temptraining._id; //cant send _id 
    delete temptraining.createdAt; //fix the date
    delete temptraining.updatedAt; //fix the date  
    axios.post(`http://localhost:8000/api/training`, temptraining)
      .then(res => {
        console.log(res.data._id)// returns current added training id
        UpdateGdodsTraining(res.data._id);
      })
      .catch(error => {

      })
  }

  function UpdateGdodsTraining(addedtrainingid) {
    var tempgdodid = match.params.gdodid;
    axios.post(`http://localhost:8000/api/gdod/updatetraining`, [tempgdodid, addedtrainingid])
      .then(res => {
        UpdateGdodsTrainingHistory(addedtrainingid);
      })
      .catch(error => {

      })
  }

  function UpdateGdodsTrainingHistory(addedtrainingid) {
    var tempgdodid = match.params.gdodid;
    axios.post(`http://localhost:8000/api/gdod/updatetraininghistory`, [tempgdodid, addedtrainingid])
      .then(res => {
        toast.success(`האימון עודכן בהצלחה`);
        history.goBack();
      })
      .catch(error => {

      })
  }

  function init() {
    var trainingidtemp = match.params.trainingid;
    axios.get(`http://localhost:8000/api/training/${trainingidtemp}`)
      .then(res => {
        setTrainingData(res.data[0]);
        setFinalSpecialKey(res.data[0].training);
      })
      .catch(error => {

      })
  }

  useEffect(() => {
    init();
  }, [])

  useEffect(() => {
    setTrainingData({ ...trainingdata, training: finalspecialkey });
  }, [finalspecialkey])

  return (
    <Container style={{ paddingTop: '80px', direction: 'rtl' }}>
      <Row>
        <Card>
          <CardHeader style={{ direction: 'rtl' }}>
            <CardTitle tag="h4" style={{ direction: 'rtl', textAlign: 'center', fontWeight: "bold" }}>דו"ח אימון פלגת טנ"א גדודית</CardTitle>{/*headline*/}
          </CardHeader>

          <CardBody style={{ direction: 'rtl' }}>
            <Container>
              <div style={{ fontSize: '18px', textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>כללי</div>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>ציין פרטים כלליים</div>

              <FormGroup dir="rtl" >
                <Input type="textarea" bsSize="lg" name="details" value={trainingdata.details} onChange={handleChange}
                 onBlur={()=>simpleValidator.current.showMessageFor('details')} />
                 {simpleValidator.current.message('details', trainingdata.details, 'required')}
              </FormGroup>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>ציין את מטרות האימון</div>

              <FormGroup dir="rtl" >
                <Input type="textarea" bsSize="lg" name="goals" value={trainingdata.goals} onChange={handleChange} 
                 onBlur={()=>simpleValidator.current.showMessageFor('goals')} />
                 {simpleValidator.current.message('goals', trainingdata.goals, 'required')}
              </FormGroup>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>פרטי הסגל המתאמן</div>

              <Row>
                {finalspecialkey.length == 0 ?
                  <>
                    <Button style={{ float: "right" }} type="button" onClick={() => {
                      setFinalSpecialKey(currentSpec => [
                        ...currentSpec,
                        {
                          id: generate(),
                          tafkid: "",
                          dargaandname: "",
                          vetek: "",
                          prevtafkid: "",
                          trainingdays: "",
                          description: "",
                        }
                      ])
                    }}>
                      הוסף
</Button>
                  </>
                  :
                  finalspecialkey.map((p, index) => {
                    return (
                      <div>
                        {index == 0 ?
                          <Row>
                            <Button style={{ float: "right" }} type="button" onClick={() => {
                              setFinalSpecialKey(currentSpec => [
                                ...currentSpec,
                                {
                                  id: generate(),
                                  tafkid: "",
                                  dargaandname: "",
                                  vetek: "",
                                  prevtafkid: "",
                                  trainingdays: "",
                                  description: "",
                                }
                              ])
                            }}>
                              הוסף
     </Button>
                          </Row>
                          : null}

                        <Row>
                          <Col xs={12} md={4}>
                            <div>
                              <p style={{ margin: '0px', float: 'right' }}>תפקיד</p>
                              <Input onChange={(e) => {
                                const tafkid = e.target.value
                                setFinalSpecialKey(currentSpec =>
                                  produce(currentSpec, v => {
                                    v[index].tafkid = tafkid
                                  })
                                )
                              }}
                                value={p.tafkid} type="text" placeholder="תפקיד" />
                            </div>
                          </Col>
                          <Col xs={12} md={4}>
                            <div>
                              <p style={{ margin: '0px', float: 'right' }}>דרגה,שם+משפחה</p>
                              <Input onChange={(e) => {
                                const dargaandname = e.target.value
                                setFinalSpecialKey(currentSpec =>
                                  produce(currentSpec, v => {
                                    v[index].dargaandname = dargaandname
                                  })
                                )
                              }}
                                value={p.dargaandname} type="text" placeholder="דרגה,שם+משפחה" />
                            </div>
                          </Col>
                          <Col xs={12} md={4}>
                            <div>
                              <p style={{ margin: '0px', float: 'right' }}>וותק בתפקיד</p>
                              <Input onChange={(e) => {
                                const vetek = e.target.value
                                setFinalSpecialKey(currentSpec =>
                                  produce(currentSpec, v => {
                                    v[index].vetek = vetek
                                  })
                                )
                              }}
                                value={p.vetek} type="text" placeholder="וותק בתפקיד" />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12} md={4}>
                            <div>
                              <p style={{ margin: '0px', float: 'right' }}>תפקיד קודם</p>
                              <Input onChange={(e) => {
                                const prevtafkid = e.target.value
                                setFinalSpecialKey(currentSpec =>
                                  produce(currentSpec, v => {
                                    v[index].prevtafkid = prevtafkid
                                  })
                                )
                              }}
                                value={p.prevtafkid} type="text" placeholder="תפקיד קודם" />
                            </div>
                          </Col>
                          <Col xs={12} md={4}>
                            <div>
                              <p style={{ margin: '0px', float: 'right' }}>מספר ימים באימון</p>
                              <Input onChange={(e) => {
                                const trainingdays = e.target.value
                                setFinalSpecialKey(currentSpec =>
                                  produce(currentSpec, v => {
                                    v[index].trainingdays = trainingdays
                                  })
                                )
                              }}
                                value={p.trainingdays} type="text" placeholder="מספר ימים באימון" />
                            </div>
                          </Col>
                          <Col xs={12} md={4}>
                            <div>
                              <p style={{ margin: '0px', float: 'right' }}>הערות</p>
                              <Input onChange={(e) => {
                                const description = e.target.value
                                setFinalSpecialKey(currentSpec =>
                                  produce(currentSpec, v => {
                                    v[index].description = description
                                  })
                                )
                              }}
                                value={p.description} type="text" placeholder="הערות" />
                            </div>
                          </Col>
                        </Row>

                        <Button type="button" onClick={() => {
                          setFinalSpecialKey(currentSpec => currentSpec.filter(x => x.id !== p.id))
                        }

                        }>
                          x</Button>
                      </div>
                    )
                  })
                }
              </Row>

            </Container>
          </CardBody>
        </Card>
      </Row>
      <Row>
        <Col xs={12} md={6}>
          <Card>
            <CardBody style={{ direction: 'rtl' }}>
              <Container>

                <div style={{ fontSize: '18px', textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>מדדי סף לאימון</div>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>התייצבות בע"ת</div>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>התייצבות מפל"ג/קט"א</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="maflag" value={trainingdata.maflag} onChange={handleChange}>
                    <option value="בוצע">בוצע</option>
                    <option value="לא בוצע">לא בוצע</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>התייצבות קט"א/מנהל עבודה</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="kata" value={trainingdata.kata} onChange={handleChange}>
                    <option value="בוצע">בוצע</option>
                    <option value="לא בוצע">לא בוצע</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>התייצבות מפקד כיתת חלפים</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="kitathalafim" value={trainingdata.kitathalafim} onChange={handleChange}>
                    <option value="בוצע">בוצע</option>
                    <option value="לא בוצע">לא בוצע</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>התייצבות מפקד כיתת נאו"ת</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="kitatnaot" value={trainingdata.kitatnaot} onChange={handleChange}>
                    <option value="בוצע">בוצע</option>
                    <option value="לא בוצע">לא בוצע</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>התייצבות מפקד כיתה קלה (רכב)</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="kitacala" value={trainingdata.kitacala} onChange={handleChange}>
                    <option value="בוצע">בוצע</option>
                    <option value="לא בוצע">לא בוצע</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>יציאת כלי טנ"א לתרגיל</div>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>19/19 א'</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="a" value={trainingdata.a} onChange={handleChange}>
                    <option value="בוצע">בוצע</option>
                    <option value="לא בוצע">לא בוצע</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>19 ב'</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="b" value={trainingdata.b} onChange={handleChange}>
                    <option value="בוצע">בוצע</option>
                    <option value="לא בוצע">לא בוצע</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>19 ד'</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="d" value={trainingdata.d} onChange={handleChange}>
                    <option value="בוצע">בוצע</option>
                    <option value="לא בוצע">לא בוצע</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>ביצוע נוה"ק סדור הכולל</div>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>כתיבת נספח טנ"א</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="nispach" value={trainingdata.nispach} onChange={handleChange}>
                    <option value="בוצע">בוצע</option>
                    <option value="לא בוצע">לא בוצע</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>הכנת תלקון נוה"ק</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="nohak" value={trainingdata.nohak} onChange={handleChange}>
                    <option value="בוצע">בוצע</option>
                    <option value="לא בוצע">לא בוצע</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>הכנת תלקון ניהו"ק</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="nihok" value={trainingdata.nihok} onChange={handleChange}>
                    <option value="בוצע">בוצע</option>
                    <option value="לא בוצע">לא בוצע</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>הכנת עזרים (שוב"ך)</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="azarim" value={trainingdata.azarim} onChange={handleChange}>
                    <option value="בוצע">בוצע</option>
                    <option value="לא בוצע">לא בוצע</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>נוה"ק ע"ג משואה</div>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>הזנת פקודות טנ"א במשואה</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="pkodotmasoa" value={trainingdata.pkodotmasoa} onChange={handleChange}>
                    <option value="בוצע">בוצע</option>
                    <option value="לא בוצע">לא בוצע</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>הזנת סד"כ כלים וכשירות</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="sadak" value={trainingdata.sadak} onChange={handleChange}>
                    <option value="בוצע">בוצע</option>
                    <option value="לא בוצע">לא בוצע</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>ביצוע תדריך לקרב</div>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>ביצוע תדריך מפל"ג</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="tadrich" value={trainingdata.tadrich} onChange={handleChange}>
                    <option value="בוצע">בוצע</option>
                    <option value="לא בוצע">לא בוצע</option>
                  </Input>
                </FormGroup>

                <div style={{ fontSize: '18px', textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>נוהל הקרב</div>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>ביצוע הערכת מצב</div>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>קבלת פקודת טנ"א מרמה ממונה</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="pkodotahzaka" value={trainingdata.pkodotahzaka} onChange={handleChange}>
                    <option value="בוצע">בוצע</option>
                    <option value="לא בוצע">לא בוצע</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>רמת בקיאות בגזרת הלחימה</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="bkiot" value={trainingdata.bkiot} onChange={handleChange}>
                    <option value="1">1- לא מספיק</option>
                    <option value="2">2- נמוך</option>
                    <option value="3">3- בינוני</option>
                    <option value="4">4- טוב</option>
                    <option value="5">5- טוב מאוד</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>רמת בקיאות בסד"כ, משימות ויכולות</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="bkiotsadac" value={trainingdata.bkiotsadac} onChange={handleChange}>
                    <option value="1">1- לא מספיק</option>
                    <option value="2">2- נמוך</option>
                    <option value="3">3- בינוני</option>
                    <option value="4">4- טוב</option>
                    <option value="5">5- טוב מאוד</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>תהליך ביצוע נוהל קרב</div>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>רמת כתיבת נספח טנ"א</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="ramatnispach" value={trainingdata.ramatnispach} onChange={handleChange}>
                    <option value="1">1- לא מספיק</option>
                    <option value="2">2- נמוך</option>
                    <option value="3">3- בינוני</option>
                    <option value="4">4- טוב</option>
                    <option value="5">5- טוב מאוד</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>תיאום תוכניות הטנ"א ע"י קט"א חטיבה</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="tiom" value={trainingdata.tiom} onChange={handleChange}>
                    <option value="בוצע">בוצע</option>
                    <option value="לא בוצע">לא בוצע</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>איכות הכנת עזרים</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="azarimquality" value={trainingdata.azarimquality} onChange={handleChange}>
                    <option value="1">1- לא מספיק</option>
                    <option value="2">2- נמוך</option>
                    <option value="3">3- בינוני</option>
                    <option value="4">4- טוב</option>
                    <option value="5">5- טוב מאוד</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>אישור תוכניות ע"י המג"ד</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="aishor" value={trainingdata.aishor} onChange={handleChange}>
                    <option value="בוצע">בוצע</option>
                    <option value="לא בוצע">לא בוצע</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>תכנון מענה אחזקתי</div>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>רמת השליטה בנתוני צל"ם לטנ"א</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="zlm" value={trainingdata.zlm} onChange={handleChange}>
                    <option value="1">1- לא מספיק</option>
                    <option value="2">2- נמוך</option>
                    <option value="3">3- בינוני</option>
                    <option value="4">4- טוב</option>
                    <option value="5">5- טוב מאוד</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>רמת ביצוע חישובי שחיקה</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="shika" value={trainingdata.shika} onChange={handleChange}>
                    <option value="1">1- לא מספיק</option>
                    <option value="2">2- נמוך</option>
                    <option value="3">3- בינוני</option>
                    <option value="4">4- טוב</option>
                    <option value="5">5- טוב מאוד</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>רמת הבקיאות במיקום כוחות שכנים</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="bkiotmikom" value={trainingdata.bkiotmikom} onChange={handleChange}>
                    <option value="1">1- לא מספיק</option>
                    <option value="2">2- נמוך</option>
                    <option value="3">3- בינוני</option>
                    <option value="4">4- טוב</option>
                    <option value="5">5- טוב מאוד</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>רמת הבקיאות ביכולות מערך הטנ"א בגדוד, בחטיבה ובכוחות הטנ"א המרחביים</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="bkiotbgdod" value={trainingdata.bkiotbgdod} onChange={handleChange}>
                    <option value="1">1- לא מספיק</option>
                    <option value="2">2- נמוך</option>
                    <option value="3">3- בינוני</option>
                    <option value="4">4- טוב</option>
                    <option value="5">5- טוב מאוד</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>צי"ד בנוה"ק - משואה</div>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>שימוש במערכת השו"ב</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="shimosbashob" value={trainingdata.shimosbashob} onChange={handleChange}>
                    <option value="בוצע">בוצע</option>
                    <option value="לא בוצע">לא בוצע</option>
                  </Input>
                </FormGroup>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>רמת הבקיאות והשליטה במערכת השו"ב</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="bkiotbashob" value={trainingdata.bkiotbashob} onChange={handleChange}>
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

              <div style={{ fontSize: '18px', textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>ניהול הקרב</div>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>מענה אחזקתי לרציפות הלחימה</div>

              <div style={{ textAlign: 'right', paddingTop: '10px' }}>רמת השליטה בכוחות קטנים</div>
              <FormGroup dir="rtl" >
                <Input type="select" bsSize="lg" name="ramatshlita" value={trainingdata.ramatshlita} onChange={handleChange}>
                  <option value="1">1- לא מספיק</option>
                  <option value="2">2- נמוך</option>
                  <option value="3">3- בינוני</option>
                  <option value="4">4- טוב</option>
                  <option value="5">5- טוב מאוד</option>
                </Input>
              </FormGroup>

              <div style={{ textAlign: 'right', paddingTop: '10px' }}>מידת הרציפות במענה האחזקתי</div>
              <FormGroup dir="rtl" >
                <Input type="select" bsSize="lg" name="razifot" value={trainingdata.razifot} onChange={handleChange}>
                  <option value="1">1- לא מספיק</option>
                  <option value="2">2- נמוך</option>
                  <option value="3">3- בינוני</option>
                  <option value="4">4- טוב</option>
                  <option value="5">5- טוב מאוד</option>
                </Input>
              </FormGroup>

              <div style={{ textAlign: 'right', paddingTop: '10px' }}>רמת התיאום והשליטה בתנועה ובמיקום כוחות אג"ם טנ"א</div>
              <FormGroup dir="rtl" >
                <Input type="select" bsSize="lg" name="ramattiom" value={trainingdata.ramattiom} onChange={handleChange}>
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
                <Input type="select" bsSize="lg" name="shlitabmazav" value={trainingdata.shlitabmazav} onChange={handleChange}>
                  <option value="1">1- לא מספיק</option>
                  <option value="2">2- נמוך</option>
                  <option value="3">3- בינוני</option>
                  <option value="4">4- טוב</option>
                  <option value="5">5- טוב מאוד</option>
                </Input>
              </FormGroup>

              <div style={{ textAlign: 'right', paddingTop: '10px' }}>מידת התאמת מאמץ הטנ"א לתמונת המצב</div>
              <FormGroup dir="rtl" >
                <Input type="select" bsSize="lg" name="midathatama" value={trainingdata.midathatama} onChange={handleChange}>
                  <option value="1">1- לא מספיק</option>
                  <option value="2">2- נמוך</option>
                  <option value="3">3- בינוני</option>
                  <option value="4">4- טוב</option>
                  <option value="5">5- טוב מאוד</option>
                </Input>
              </FormGroup>

              <div style={{ textAlign: 'right', paddingTop: '10px' }}>ניהול העזרים</div>
              <FormGroup dir="rtl" >
                <Input type="select" bsSize="lg" name="nihol" value={trainingdata.nihol} onChange={handleChange}>
                  <option value="1">1- לא מספיק</option>
                  <option value="2">2- נמוך</option>
                  <option value="3">3- בינוני</option>
                  <option value="4">4- טוב</option>
                  <option value="5">5- טוב מאוד</option>
                </Input>
              </FormGroup>

              <div style={{ textAlign: 'right', paddingTop: '10px' }}>מידת קבלה ומסירה של דוחות עיתיים</div>
              <FormGroup dir="rtl" >
                <Input type="select" bsSize="lg" name="midatkabala" value={trainingdata.midatkabala} onChange={handleChange}>
                  <option value="1">1- לא מספיק</option>
                  <option value="2">2- נמוך</option>
                  <option value="3">3- בינוני</option>
                  <option value="4">4- טוב</option>
                  <option value="5">5- טוב מאוד</option>
                </Input>
              </FormGroup>

              <div style={{ textAlign: 'right', paddingTop: '10px' }}>הפקת משמעויות מהערכת מצב מתמשכת</div>
              <FormGroup dir="rtl" >
                <Input type="select" bsSize="lg" name="hafakat" value={trainingdata.hafakat} onChange={handleChange}>
                  <option value="1">1- לא מספיק</option>
                  <option value="2">2- נמוך</option>
                  <option value="3">3- בינוני</option>
                  <option value="4">4- טוב</option>
                  <option value="5">5- טוב מאוד</option>
                </Input>
              </FormGroup>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>יחסי גומלין</div>

              <div style={{ textAlign: 'right', paddingTop: '10px' }}>איכות יחסי הגומלין בתוך מערכי הטנ"א</div>
              <FormGroup dir="rtl" >
                <Input type="select" bsSize="lg" name="ehot" value={trainingdata.ehot} onChange={handleChange}>
                  <option value="1">1- לא מספיק</option>
                  <option value="2">2- נמוך</option>
                  <option value="3">3- בינוני</option>
                  <option value="4">4- טוב</option>
                  <option value="5">5- טוב מאוד</option>
                </Input>
              </FormGroup>

              <div style={{ textAlign: 'right', paddingTop: '10px' }}>איכות יחסי הגומלין עם הפלגות</div>
              <FormGroup dir="rtl" >
                <Input type="select" bsSize="lg" name="ehotplogot" value={trainingdata.ehotplogot} onChange={handleChange}>
                  <option value="1">1- לא מספיק</option>
                  <option value="2">2- נמוך</option>
                  <option value="3">3- בינוני</option>
                  <option value="4">4- טוב</option>
                  <option value="5">5- טוב מאוד</option>
                </Input>
              </FormGroup>

              <div style={{ textAlign: 'right', paddingTop: '10px' }}>איכות יחסי הגומלין עם מפקדת הגדוד</div>
              <FormGroup dir="rtl" >
                <Input type="select" bsSize="lg" name="ehotmfkada" value={trainingdata.ehotmfkada} onChange={handleChange}>
                  <option value="1">1- לא מספיק</option>
                  <option value="2">2- נמוך</option>
                  <option value="3">3- בינוני</option>
                  <option value="4">4- טוב</option>
                  <option value="5">5- טוב מאוד</option>
                </Input>
              </FormGroup>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>צי"ד בניהו"ק - משואה</div>

              <div style={{ textAlign: 'right', paddingTop: '10px' }}>שימוש במערכת שו"ב בניהול הקרב</div>
              <FormGroup dir="rtl" >
                <Input type="select" bsSize="lg" name="shimosbashob2" value={trainingdata.shimosbashob2} onChange={handleChange}>
                  <option value="בוצע">בוצע</option>
                  <option value="לא בוצע">לא בוצע</option>
                </Input>
              </FormGroup>

              <div style={{ textAlign: 'right', paddingTop: '10px' }}>רמת השימוש במערכת השו"ב במכלול המנהלה תוך כדי ניהול הקרב</div>
              <FormGroup dir="rtl" >
                <Input type="select" bsSize="lg" name="bkiotbashob2" value={trainingdata.bkiotbashob2} onChange={handleChange}>
                  <option value="1">1- לא מספיק</option>
                  <option value="2">2- נמוך</option>
                  <option value="3">3- בינוני</option>
                  <option value="4">4- טוב</option>
                  <option value="5">5- טוב מאוד</option>
                </Input>
              </FormGroup>

              <div style={{ fontSize: '18px', textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>סיכום</div>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>למידה והפקת לקחים</div>

              <div style={{ textAlign: 'right', paddingTop: '10px' }}>רמת בניית עקומת למידה</div>
              <FormGroup dir="rtl" >
                <Input type="select" bsSize="lg" name="lamida" value={trainingdata.lamida} onChange={handleChange}>
                  <option value="1">1- לא מספיק</option>
                  <option value="2">2- נמוך</option>
                  <option value="3">3- בינוני</option>
                  <option value="4">4- טוב</option>
                  <option value="5">5- טוב מאוד</option>
                </Input>
              </FormGroup>

              <div style={{ textAlign: 'right', paddingTop: '10px' }}>רמת ביצוע סיכומי ביניים</div>
              <FormGroup dir="rtl" >
                <Input type="select" bsSize="lg" name="sicombainaim" value={trainingdata.sicombainaim} onChange={handleChange}>
                  <option value="1">1- לא מספיק</option>
                  <option value="2">2- נמוך</option>
                  <option value="3">3- בינוני</option>
                  <option value="4">4- טוב</option>
                  <option value="5">5- טוב מאוד</option>
                </Input>
              </FormGroup>

              <div style={{ textAlign: 'right', paddingTop: '10px' }}>ביצוע מבחני רמה למפקדים</div>
              <FormGroup dir="rtl" >
                <Input type="select" bsSize="lg" name="rama" value={trainingdata.rama} onChange={handleChange}>
                  <option value="1">1- לא מספיק</option>
                  <option value="2">2- נמוך</option>
                  <option value="3">3- בינוני</option>
                  <option value="4">4- טוב</option>
                  <option value="5">5- טוב מאוד</option>
                </Input>
              </FormGroup>

              <div style={{ textAlign: 'right', paddingTop: '10px' }}>ביצוע סיכום האימון בסיום האימון</div>
              <FormGroup dir="rtl" >
                <Input type="select" bsSize="lg" name="sicomimon" value={trainingdata.sicomimon} onChange={handleChange}>
                  <option value="בוצע">בוצע</option>
                  <option value="לא בוצע">לא בוצע</option>
                </Input>
              </FormGroup>

              <div style={{ textAlign: 'right', paddingTop: '10px' }}>ביצוע אימון משטח חילוץ</div>
              <FormGroup dir="rtl" >
                <Input type="select" bsSize="lg" name="imonhiloz" value={trainingdata.imonhiloz} onChange={handleChange}>
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
                <Input type="textarea" bsSize="lg" name="lkhaimtene" value={trainingdata.lkhaimtene} onChange={handleChange} 
                 onBlur={()=>simpleValidator.current.showMessageFor('lkhaimtene')} />
                 {simpleValidator.current.message('lkhaimtene', trainingdata.lkhaimtene, 'required')}
              </FormGroup>

              <div style={{ textAlign: 'right', paddingTop: '10px' }}>לקחים לאמצעים ואמל"ח</div>
              <FormGroup dir="rtl" >
                <Input type="textarea" bsSize="lg" name="lkhaimamlah" value={trainingdata.lkhaimamlah} onChange={handleChange} 
                  onBlur={()=>simpleValidator.current.showMessageFor('lkhaimamlah')} />
                  {simpleValidator.current.message('lkhaimamlah', trainingdata.lkhaimamlah, 'required')}
              </FormGroup>

              <div style={{ textAlign: 'right', paddingTop: '10px' }}>לקחים לכוח אדם</div>
              <FormGroup dir="rtl" >
                <Input type="textarea" bsSize="lg" name="lkhaimadam" value={trainingdata.lkhaimadam} onChange={handleChange} 
                 onBlur={()=>simpleValidator.current.showMessageFor('lkhaimadam')} />
                 {simpleValidator.current.message('lkhaimadam', trainingdata.lkhaimadam, 'required')}
              </FormGroup>

              <div style={{ textAlign: 'right', paddingTop: '10px' }}>לקחים לאימונים והכשרות</div>
              <FormGroup dir="rtl" >
                <Input type="textarea" bsSize="lg" name="lkhaimlimon" value={trainingdata.lkhaimlimon} onChange={handleChange} 
                onBlur={()=>simpleValidator.current.showMessageFor('lkhaimlimon')} />
                {simpleValidator.current.message('lkhaimlimon', trainingdata.lkhaimlimon, 'required')}
              </FormGroup>

              <div style={{ textAlign: 'right', paddingTop: '10px' }}>לקחים לארגון ותקינה</div>
              <FormGroup dir="rtl" >
                <Input type="textarea" bsSize="lg" name="lkhaimlirgon" value={trainingdata.lkhaimlirgon} onChange={handleChange} 
                  onBlur={()=>simpleValidator.current.showMessageFor('lkhaimlirgon')} />
                  {simpleValidator.current.message('lkhaimlirgon', trainingdata.lkhaimlirgon, 'required')}
              </FormGroup>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>נקודות לשימור ושיפור</div>

              <div style={{ textAlign: 'right', paddingTop: '10px' }}>נקודות לשיפור</div>
              <FormGroup dir="rtl" >
                <Input type="textarea" bsSize="lg" name="shipor" value={trainingdata.shipor} onChange={handleChange} 
                 onBlur={()=>simpleValidator.current.showMessageFor('shipor')} />
                 {simpleValidator.current.message('shipor', trainingdata.shipor, 'required')}
              </FormGroup>

              <div style={{ textAlign: 'right', paddingTop: '10px' }}>נקודות לשימור</div>
              <FormGroup dir="rtl" >
                <Input type="textarea" bsSize="lg" name="shimor" value={trainingdata.shimor} onChange={handleChange} 
                    onBlur={()=>simpleValidator.current.showMessageFor('shimor')} />
                    {simpleValidator.current.message('shimor', trainingdata.shimor, 'required')}
              </FormGroup>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>סיכום</div>

              <div style={{ textAlign: 'right', paddingTop: '10px' }}>סיכום חונך טנ"א</div>
              <FormGroup dir="rtl" >
                <Input type="textarea" bsSize="lg" name="sicomhonach" value={trainingdata.sicomhonach} onChange={handleChange} 
                onBlur={()=>simpleValidator.current.showMessageFor('sicomhonach')} />
                {simpleValidator.current.message('sicomhonach', trainingdata.sicomhonach, 'required')}
              </FormGroup>

              <div style={{ textAlign: 'right', paddingTop: '10px' }}>סיכום המתאמן</div>
              <FormGroup dir="rtl" >
                <Input type="textarea" bsSize="lg" name="sicomhmitaman" value={trainingdata.sicomhmitaman} onChange={handleChange} 
                onBlur={()=>simpleValidator.current.showMessageFor('sicomhmitaman')} />
                {simpleValidator.current.message('sicomhmitaman', trainingdata.sicomhmitaman, 'required')}
              </FormGroup>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>פרטי החונך</div>

              <Row>
                <Col xs={12} md={4}>
                  <div style={{ textAlign: 'center', paddingTop: '10px' }}>שם מלא</div>
                  <FormGroup dir="rtl" >
                    <Input type="text" bsSize="lg" name="namehonach" value={trainingdata.namehonach} onChange={handleChange} 
                      onBlur={()=>simpleValidator.current.showMessageFor('namehonach')} />
                      {simpleValidator.current.message('namehonach', trainingdata.namehonach, 'required')}
                  </FormGroup>
                </Col>
                <Col xs={12} md={4}>
                  <div style={{ textAlign: 'center', paddingTop: '10px' }}>תפקיד</div>
                  <FormGroup dir="rtl" >
                    <Input type="text" bsSize="lg" name="tafkidhonach" value={trainingdata.tafkidhonach} onChange={handleChange} 
                          onBlur={()=>simpleValidator.current.showMessageFor('tafkidhonach')} />
                          {simpleValidator.current.message('tafkidhonach', trainingdata.tafkidhonach, 'required')}
                  </FormGroup>
                </Col>
                <Col xs={12} md={4}>
                  <div style={{ textAlign: 'center', paddingTop: '10px' }}>מאשר</div>
                  <FormGroup dir="rtl" >
                    <Input type="text" bsSize="lg" name="masherhonach" value={trainingdata.masherhonach} onChange={handleChange} 
                         onBlur={()=>simpleValidator.current.showMessageFor('masherhonach')} />
                         {simpleValidator.current.message('masherhonach', trainingdata.masherhonach, 'required')}
                  </FormGroup>
                </Col>
              </Row>

              <div style={{ textAlign: 'center' }}>
                <button className="btn" onClick={clickSubmit}>הוסף אימון</button>
              </div>

            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
export default withRouter(EditTrainingForm);;