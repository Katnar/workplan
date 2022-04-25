import React, { useState, useEffect, useRef } from 'react';
import { Link, withRouter, Redirect } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator';
import Toggle2 from 'components/kshirot/Toggle2/Toggle2'
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
import { useLocation } from 'react-router-dom'
const AddTipulForm = ({ match }) => {
  const location = useLocation()
  const { gdod } = location.state
 console.log(gdod)
  //react validator
  const simpleValidator = useRef(new SimpleReactValidator({
    messages:{
      default: 'נדרש למלא שדה זה'
    },
    element: message => <div style={{background:'#F66C6C',textAlign:'center', fontWeight:'bold'}}>{message}</div>
  }))
  const [, forceUpdate] = useState();
  
  const [finalspecialkey, setFinalSpecialKey] = useState([])
  const [finalspecialkeytwo, setFinalSpecialKeytwo] = useState([])

  const [tipuldata, setTipulData] = useState({
    // פרטי מפקד
    commandername: '', //שם מפקד
    timeinrole: '',// זמן בתפקיד
    // פרטי ממלא
    unit: '', // יחידה
    name: '', // שם
    phone: '',// מספר פלאםון
    //בעלי תפקיד
    experts:0,
    expertsmax:0,
    officers: 0,// בעלי מקצוע
    officersmax: 0,
    officersdetails:'',
    kzinim: 0,//  קצינים
    kzinimmax: 0,
    kzinimdetails:'',

    //אמצעי אחזקה
    teken: 0, //תקן מול מצבה
    tekenmax: 0,
    tekendetails: '',
    toolsbox: 0, // ארגז כלים
    toolsboxmax: 0,
    toolsboxdetails: '',
    match: 'קיים', // התאמת כע לסוג הצלם
    matchdetails: '',
    // חלפים 
    load: 'קיים', // יכולת העמסה
    loaddeatils: '',
    stash: 'בוצע', // הילום מלאי
    stashdetails: '',
    hatak: 'קיים', // חטכ
    hatakdetails: '',
    bakash: 0, // בקש
    bakashmax: 0,
    bakashdetails: '',
    bakashniod:'קיים',
    bakashnioddetails:'',
    lastrefreshdate: 'עומד', // תאריך רענון אחרון
    lastrefreshdatedetails: '',
    matchmahin: 'קיים', // התאמת חלפים לצלם רישום מכין
    matchmahindetails: '',
    matchswap: 'קיים', // התאמת ערכות חלפים לצלמ
    matchswapdetails: '',
    catalogs: 'קיים', // קטלוגים
    catalogsdetails: '',
    // אמצעי ניוד
    carpiter: 0, // נגמש פיטר
    carpitermax: 0,
    carpitedetails: '',
    carhatap: 0, // נגמש חטפ 
    carhatapmax: 0,
    carhatapdetails: '',
    mobilitytools: 'קיים', // אמצעי ניוד מפלג טנא
    mobilitytoolsdetails: '',
    carlahh: 'קיים', // רכב לחח
    carlahhdetails: '',
    katkal: 'קיים', // כתקל/כיתת עורב/בקש/בימל צמה
    katkaldetails: '',
    rioarrow: 0,// ריאו חץ/עגור20
    rioarrowmax: 0,
    rioarrowdetails: '',
    personalprotection: 'קיים', // מיגון אישי
    personalprotectiondetails: '',
    // שבצק
    shiboz: 0, //התאמץ שיבוץ לקרבי
    shibozmax: 0,
    shibozdetails: '',
    drivers: 0, // נהגים לכל פלטפורמת ניוד
    driversmax: 0,
    driversdetails: '',
    //פקודות מבצע
    pkodotopara: 'קיים', // פקודות אופרטיביות
    pkodotoparadetails: '',
    tikshorat: 0, // אמצעי קשר/תקשורת
    tikshoratmax: 0,
    tikshoratdetails: '',
    teneclass:0,
    teneclassmax:0,
    teneclassdetails:'',

    //פקלים
    tiom: 'קיים', // תיאום רמה ממונה
    tiomdetails: '',
    commanderconf: 'קיים', // אישור מפקד  
    commanderconfdetails: '',
    pkodotmashlimot: 'קיים',// פקודות משלימות
    pkodotmashlimotdetails: '',
    //מערכות שוב ממוחשבות
    tkinot: 0, // מצאי עמדות שוב תקינות
    tkinotmax: 0,
    tkinotdetails: '',
    tikim: 'בוצע', // הזנת תיק נתוני יחידות פקודות ומפות במשואה
    tikimdetails: '',
    roleholders: 0, // בעלי תפקידים מוכשרים
    roleholdersmax: 0,
    roleholdersdetails: '',
    //דיווח ושליטה
    boxcontent: 'קיים', // תכולת ארגז עפ טנה 1
    boxcontentdetails: '',
    //אימונים והכשרות
    trainingamount: '',// אימון פלגת טנא- כמות
    trainingamountdetails: '',
    trainingquality: '',// אימון פלגת טנא- איכות
    trainingqualitydetails: '',
    // תרגילים
    battaliondrillamount: 'בוצע', // תרגיל גדוד כמות
    battaliondrillamountdetails: '',
    battaliondrillquality: '', // תרגיל גדוד איכות
    battaliondrillqualitydetails: '',
    // הכשרות
    kors: 0, // כמות מחטפים שעברו קורס מחטפים
    korsmax: 0,
    korsdetails: '',
    nokavim: 0, // מועכבי שלב יחידה
    nokavimmax: 0,
    nokavimdetails: '',
    tester: 0, // תעודות בוחן
    testermax: 0,
    testerdetails: '',
    amountmhalaf: 0, // גמות מוסמכי מחלף
    amountmhalafmax: 0,
    amountmhalafdetails: '',
    amounthanafa: 0, // כמות מוסמכי הנפה
    amounthanafamax: 0,
    amounthanafadetails: '',
    // רוח יחידה
    mentality: '', // חוסן מנטלאי
    specialkey: '',
    specialkeytwo: ''
  })
  const [tempgdodid, setTempGdodId] = useState([]); // temp value of select input

  //handling newspecname arrays
  const newArayy = [...finalspecialkey]
  tipuldata.specialkey = newArayy

  const newArayytwo = [...finalspecialkeytwo]
  tipuldata.specialkeytwo = newArayytwo

  function init() {
    var gdodidtemp = match.params.gdodid;
    setTempGdodId(gdodidtemp)
  }

  function handleChange(evt) {
    const value = evt.target.value;
    setTipulData({ ...tipuldata, [evt.target.name]: value });
  }

  const clickSubmit = event => {//CheckTipulData->AddKshirotToDb->UpdateGdodsKshirot->UpdateGdodsHistory
    const formValid = simpleValidator.current.allValid()
    if (!formValid) {
      simpleValidator.current.showMessages()
      forceUpdate(1)
    } else{
      AddKshirotToDb();
    }
  }

  function AddKshirotToDb() {
    const temptipul = tipuldata;
    axios.post(`http://localhost:8000/api/kshirot`, temptipul)
      .then(res => {
        console.log(res.data._id)// returns current added kshirot id
        UpdateGdodsKshirot(res.data._id);
      })
      .catch(error => {

      })
    console.log(temptipul);
  }

  function UpdateGdodsKshirot(addedkshirotid) {
    axios.post(`http://localhost:8000/api/gdod/updatekshirot`, [tempgdodid, addedkshirotid])
      .then(res => {
        UpdateGdodsHistory(addedkshirotid);
      })
      .catch(error => {

      })
  }

  function UpdateGdodsHistory(addedkshirotid) {
    axios.post(`http://localhost:8000/api/gdod/updatehistory`, [tempgdodid, addedkshirotid])
      .then(res => {
        toast.success(`כשירות נוספה בצלחה`);
        history.goBack();
      })
      .catch(error => {

      })
  }

  useEffect(() => {
    init();
  }, [])

  useEffect(() => { //calculate officers
    var tempofficers = 0;
    var tempofficersmax = 0;

    for (let i = 0; i < finalspecialkey.length; i++) {
      tempofficers += parseInt(finalspecialkey[i].teken);
      tempofficersmax += parseInt(finalspecialkey[i].matzva);
    }
    setTipulData({ ...tipuldata, officers: tempofficers, officersmax: tempofficersmax });
  }, [finalspecialkey])

  useEffect(() => { //calculate kzinim
    var tempkzinim = 0;
    var tempkzinimmax = 0;

    for (let i = 0; i < finalspecialkeytwo.length; i++) {
      tempkzinim += parseInt(finalspecialkeytwo[i].teken);
      tempkzinimmax += parseInt(finalspecialkeytwo[i].matzva);
    }
    setTipulData({ ...tipuldata, kzinim: tempkzinim, kzinimmax: tempkzinimmax });
  }, [finalspecialkeytwo])

  return (
    
    <Container style={{ paddingTop: '80px', direction: 'rtl'}}>
            <div style={{textAlign:'center', fontWeight:'bold',fontSize:'22px', paddingBottom:'10px'}}>{gdod.name}</div>
          
              <div  style={{ direction: 'rtl', textAlign: 'center', fontWeight: "bold", paddingBottom:'5px' }}>הערכת כשירות טנא</div>{/*headline*/}
          

      <Row>
        <Col xs={12} md={6}>
          <Card>
      
           
            <CardBody style={{ direction: 'rtl' }}>
              <Container>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>פרטי המפקד</div>
                <Row>
                  <Col xs={12} md={6}>
                    <div style={{ textAlign: 'center', paddingTop: '10px' }}>שם מפקד</div>
                    <FormGroup dir="rtl" >
                      <Input type="text" bsSize="lg" name="commandername" value={tipuldata.commandername} onChange={handleChange}
                       onBlur={()=>simpleValidator.current.showMessageFor('commandername')} />
                      {simpleValidator.current.message('commandername', tipuldata.commandername, 'required')}
                    </FormGroup>
                  </Col>
                  <Col xs={12} md={6}>

                    <div style={{ textAlign: 'center', paddingTop: '10px' }}>תאריך תחילת תפקיד</div>
                    <FormGroup dir="rtl" >
                      <Input type="date" bsSize="lg" name="timeinrole" value={tipuldata.timeinrole} onChange={handleChange} style={{ lineHeight: 'inherit' }}  
                        onBlur={()=>simpleValidator.current.showMessageFor('timeinrole')} />
                      {simpleValidator.current.message('timeinrole', tipuldata.timeinrole, 'required')}
                    </FormGroup>
                     
                  </Col>
                </Row>

                {/* <div style={{ fontSize: '22px', textAlign: 'center', paddingTop: '10px', fontWeight: "bold" }}>מדדי כשירות</div> */}

                <div style={{ fontSize: '18px', textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>כללי</div>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>פרטים אישיים</div>

                <Row>
                  <Col xs={12} md={4}>
                    <div style={{ textAlign: 'center', paddingTop: '10px' }}>יחידה</div>
                    <FormGroup dir="rtl" >
                      <Input type="text" bsSize="lg" name="unit" value={tipuldata.unit} onChange={handleChange}
                        onBlur={()=>simpleValidator.current.showMessageFor('unit')} />
                      {simpleValidator.current.message('unit', tipuldata.unit, 'required')}
                    </FormGroup>
                  </Col>
                  <Col xs={12} md={4}>
                    <div style={{ textAlign: 'center', paddingTop: '10px' }}>שם קצין טנ"א</div>
                    <FormGroup dir="rtl" >
                      <Input type="text" bsSize="lg" name="name" value={tipuldata.name} onChange={handleChange} 
                           onBlur={()=>simpleValidator.current.showMessageFor('name')} />
                      {simpleValidator.current.message('name', tipuldata.name, 'required')}
                    </FormGroup>
                  </Col>
                  <Col xs={12} md={4}>
                    <div style={{ textAlign: 'center', paddingTop: '10px' }}>טלפון</div>
                    <FormGroup dir="rtl" >
                      <Input type="text" bsSize="lg" name="phone" value={tipuldata.phone} onChange={handleChange} pattern="\d*" maxlength="11"
                           onBlur={()=>simpleValidator.current.showMessageFor('phone')} />
                      {simpleValidator.current.message('phone', tipuldata.phone, 'required')}
                    </FormGroup>
                  </Col>
                </Row>
                </Container>
            </CardBody>
          </Card>

          <Card>
              <CardBody style={{ direction: 'rtl' }}>
                  <Container>

                              <div style={{ fontSize: '22px', textAlign: 'center', paddingTop: '10px', fontWeight: "bold" }}>כוח אדם</div>
              {gdod.sadir == true ? null : (
                <>
                  <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>גרעין מומחים</div>

                  <Row>
                    <Col xs={12} md={6}>
                      <div style={{ textAlign: 'right', paddingTop: '10px' }}>סימון מקצוע</div>
                      <FormGroup dir="rtl" >
                        <Input type="number" bsSize="lg" name="experts" value={tipuldata.experts} onChange={handleChange} 
                          onBlur={()=>simpleValidator.current.showMessageFor('experts')} />
                          {simpleValidator.current.message('experts', tipuldata.experts, 'required')}
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={6}>
                      <div style={{ textAlign: 'right', paddingTop: '10px' }}>מצבה</div>
                      <FormGroup dir="rtl" >
                        <Input type="number" bsSize="lg" name="expertsmax" value={tipuldata.expertsmax} onChange={handleChange} 
                        onBlur={()=>simpleValidator.current.showMessageFor('expertsmax')} />
                        {simpleValidator.current.message('expertsmax', tipuldata.tekenmax, 'required')}
                      </FormGroup>
                    </Col>
                  </Row>
              </>
              ) }
                
                

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>בעלי תפקיד(קצינים,מנהלי עבודה,מחטפים)</div>

                <Row>
                  {finalspecialkeytwo.length == 0 ?
                    <>
                      <Button style={{ float: "right" }} type="button" onClick={() => {
                        setFinalSpecialKeytwo(currentSpec => [
                          ...currentSpec,
                          {
                            id: generate(),
                            name: "",
                            teken: 0,
                            matzva: 0,
                          }
                        ])
                      }}>
                        הוסף בעל תפקיד
                      </Button>
                    </>
                    :
                    finalspecialkeytwo.map((p, index) => {
                      return (
                        <div>
                          {index == 0 ?
                            <Row>
                              <Button style={{ float: "right" }} type="button" onClick={() => {
                                setFinalSpecialKeytwo(currentSpec => [
                                  ...currentSpec,
                                  {
                                    id: generate(),
                                    name: "",
                                    teken: 0,
                                    matzva: 0,
                                  }
                                ])
                              }}>
                                הוסף בעל תפקיד
                              </Button>
                            </Row>
                            : null}

                          <Row>
                            <Col xs={12} md={4}>
                              <div>
                                <p style={{ margin: '0px', float: 'right' }}>תפקיד</p>
                                <Input onChange={(e) => {
                                  const name = e.target.value
                                  setFinalSpecialKeytwo(currentSpec =>
                                    produce(currentSpec, v => {
                                      v[index].name = name
                                    })
                                  )
                                }}
                                  value={p.name} type="text" placeholder="תפקיד"/>
                              </div>
                            </Col>
                            <Col xs={12} md={4}>
                              <div>
                                <p style={{ margin: '0px', float: 'right' }}>תקן</p>
                                <Input onChange={(e) => {
                                  const teken = e.target.value
                                  setFinalSpecialKeytwo(currentSpec =>
                                    produce(currentSpec, v => {
                                      v[index].teken = teken
                                    })
                                  )
                                }}
                                  value={p.teken} type="number" placeholder="תקן" min="0"/>
                              </div>
                            </Col>
                            <Col xs={12} md={4}>
                              <div>
                                <p style={{ margin: '0px', float: 'right' }}>מצבה</p>
                                <Input onChange={(e) => {
                                  const matzva = e.target.value
                                  setFinalSpecialKeytwo(currentSpec =>
                                    produce(currentSpec, v => {
                                      v[index].matzva = matzva
                                    })
                                  )
                                }}
                                  value={p.matzva} type="number" placeholder="מצבה" min="0"/>
                              </div>
                            </Col>
                          </Row>

                          <Button type="button" onClick={() => {
                            setFinalSpecialKeytwo(currentSpec => currentSpec.filter(x => x.id !== p.id))
                          }

                          }>
                            x</Button>
                        </div>
                      )
                    })
                  }
                </Row>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>סה"כ בעלי תפקיד</div>

                <Row>
                  <Col xs={12} md={6}>
                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>תקינה</div>
                    <FormGroup dir="rtl" >
                      <Input type="number" min="0" bsSize="lg" name="kzinim" value={tipuldata.kzinim} onChange={handleChange} disabled 
                           onBlur={()=>simpleValidator.current.showMessageFor('kzinim')} />
                           {simpleValidator.current.message('kzinim', tipuldata.kzinim, 'required')}
                    </FormGroup>
                  </Col>
                  <Col xs={12} md={6}>
                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>מצבה</div>
                    <FormGroup dir="rtl" >
                      <Input type="number" min="0" bsSize="lg" name="kzinimmax" value={tipuldata.kzinimmax} onChange={handleChange} disabled 
                      onBlur={()=>simpleValidator.current.showMessageFor('kzinimmax')} />
                      {simpleValidator.current.message('kzinimmax', tipuldata.kzinimmax, 'required')}
                    </FormGroup>
                  </Col>
                </Row>

                <Toggle2 btnName='הוסף הערות' name="kzinimdetails" value={tipuldata.kzinimdetails} onChange={handleChange} />
                 

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>בעלי מקצוע</div>

                <Row>
                  {finalspecialkey.length == 0 ?
                    <>
                      <Button style={{ float: "right" }} type="button" onClick={() => {
                        setFinalSpecialKey(currentSpec => [
                          ...currentSpec,
                          {
                            id: generate(),
                            numbermikzoa: 0,
                            name: "",
                            teken: 0,
                            matzva: 0,
                            tafkiddetails: ''
                          }
                        ])
                      }}>
                        הוסף בעל מקצוע
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
                                    numbermikzoa: 0,
                                    name: "",
                                    teken: 0,
                                    matzva: 0,
                                    tafkiddetails: ''
                                  }
                                ])
                              }}>
                                הוסף בעל תפקיד
                              </Button>
                            </Row>
                            : null}

                          <Row>
                            <Col xs={12} md={6}>
                              <div>
                                <p style={{ margin: '0px', float: 'right' }}>מס' מקצוע</p>
                                <Input onChange={(e) => {
                                  const numbermikzoa = e.target.value
                                  setFinalSpecialKey(currentSpec =>
                                    produce(currentSpec, v => {
                                      v[index].numbermikzoa = numbermikzoa
                                    })
                                  )
                                }}
                                  value={p.numbermikzoa} type="number" placeholder="מס' מקצוע" min="0" />
                              </div>
                            </Col>
                            <Col xs={12} md={6}>
                              <div>
                                <p style={{ margin: '0px', float: 'right' }}>שם מקצוע</p>
                                <Input onChange={(e) => {
                                  const name = e.target.value
                                  setFinalSpecialKey(currentSpec =>
                                    produce(currentSpec, v => {
                                      v[index].name = name
                                    })
                                  )
                                }}
                                  value={p.name} type="text" placeholder="שם מקצוע" />
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={12} md={4}>
                              <div>
                                <p style={{ margin: '0px', float: 'right' }}>תקן</p>
                                <Input onChange={(e) => {
                                  const teken = e.target.value
                                  setFinalSpecialKey(currentSpec =>
                                    produce(currentSpec, v => {
                                      v[index].teken = teken
                                    })
                                  )
                                }}
                                  value={p.teken} type="number" placeholder="תקן" min="0" />
                              </div>
                            </Col>
                            <Col xs={12} md={4}>
                              <div>
                                <p style={{ margin: '0px', float: 'right' }}>מצבה</p>
                                <Input onChange={(e) => {
                                  const matzva = e.target.value
                                  setFinalSpecialKey(currentSpec =>
                                    produce(currentSpec, v => {
                                      v[index].matzva = matzva
                                    })
                                  )
                                }}
                                  value={p.matzva} type="number" placeholder="מצבה" min="0" />
                              </div>
                            </Col>
                            <Col xs={12} md={4}>
                              <div>
                                <p style={{ margin: '0px', float: 'right' }}>הערות</p>
                                <Input onChange={(e) => {
                                  const tafkiddetails = e.target.value
                                  setFinalSpecialKey(currentSpec =>
                                    produce(currentSpec, v => {
                                      v[index].tafkiddetails = tafkiddetails
                                    })
                                  )
                                }}
                                  value={p.tafkiddetails} type="select" placeholder="הערות">
                                     <option value="חובה">חובה</option>
                                     <option value="ראשוני">ראשוני</option>
                                     <option value="מובהק">מובהק</option>
                                     <option value="מילואים">מילואים</option>
                            </Input>
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

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>סה"כ בעלי מקצוע</div>

                <Row>
                  <Col xs={12} md={6}>
                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>תקינה</div>
                    <FormGroup dir="rtl" >
                      <Input type="number" min="0" bsSize="lg" name="officers" value={tipuldata.officers} onChange={handleChange} disabled 
                           onBlur={()=>simpleValidator.current.showMessageFor('officers')} />
                           {simpleValidator.current.message('officers', tipuldata.officers, 'required')}
                    </FormGroup>
                  </Col>
                  <Col xs={12} md={6}>
                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>מצבה</div>
                    <FormGroup dir="rtl" >
                      <Input type="number" min="0" bsSize="lg" name="officersmax" value={tipuldata.officersmax} onChange={handleChange} disabled 
                       onBlur={()=>simpleValidator.current.showMessageFor('officersmax')} />
                       {simpleValidator.current.message('officersmax', tipuldata.officersmax, 'required')}
                    </FormGroup>
                  </Col>
                </Row>

                <Toggle2 btnName='הוסף הערות' name="officersdetails" value={tipuldata.officersdetails} onChange={handleChange} 
                   onBlur={()=>simpleValidator.current.showMessageFor('officersdetails')} />
                   {simpleValidator.current.message('officersdetails', tipuldata.officersdetails, 'officersdetails')}
                   </Container>
            </CardBody>
          </Card>
          <Card>
              <CardBody style={{ direction: 'rtl' }}>
                  <Container>
                <div style={{ fontSize: '22px', textAlign: 'center', paddingTop: '10px', fontWeight: "bold" }}>מלאי</div>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>אמצעי אחזקה</div>

                <Row>
                  <Col xs={12} md={6}>
                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>תקן</div>
                    <FormGroup dir="rtl" >
                      <Input type="number" bsSize="lg" name="teken" value={tipuldata.teken} onChange={handleChange} 
                        onBlur={()=>simpleValidator.current.showMessageFor('teken')} />
                        {simpleValidator.current.message('teken', tipuldata.teken, 'required')}
                    </FormGroup>
                  </Col>
                  <Col xs={12} md={6}>
                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>מצבה</div>
                    <FormGroup dir="rtl" >
                      <Input type="number" bsSize="lg" name="tekenmax" value={tipuldata.tekenmax} onChange={handleChange} 
                       onBlur={()=>simpleValidator.current.showMessageFor('tekenmax')} />
                       {simpleValidator.current.message('tekenmax', tipuldata.tekenmax, 'required')}
                    </FormGroup>
                  </Col>
                </Row>

                <Toggle2 btnName='הוסף הערות' name="tekendetails" value={tipuldata.tekendetails} onChange={handleChange}/> 
               
                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>ארגז כלים לכל בעל מקצוע</div>
                <Row>
                  <Col xs={12} md={6}>
                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>תקן</div>
                    <FormGroup dir="rtl" >
                      <Input type="number" bsSize="lg" name="toolsbox" value={tipuldata.toolsbox} onChange={handleChange} 
                             onBlur={()=>simpleValidator.current.showMessageFor('toolsbox')} />
                             {simpleValidator.current.message('toolsbox', tipuldata.toolsbox, 'required')}
                    </FormGroup>
                  </Col>
                  <Col xs={12} md={6}>
                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>מצבה</div>
                    <FormGroup dir="rtl" >
                      <Input type="number" bsSize="lg" name="toolsboxmax" value={tipuldata.toolsboxmax} onChange={handleChange} 
                       onBlur={()=>simpleValidator.current.showMessageFor('toolsboxmax')} />
                       {simpleValidator.current.message('toolsboxmax', tipuldata.toolsboxmax, 'required')}
                    </FormGroup>
                  </Col>
                </Row>
        
                <Toggle2 btnName='הוסף הערות' name="toolsboxdetails" value={tipuldata.toolsboxdetails} onChange={handleChange}/>
                 

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>התאמת כ"ע לסוג הצל"ם</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="match" value={tipuldata.match} onChange={handleChange}  onBlur={()=>simpleValidator.current.showMessageFor('match')}>
                
                    <option value="קיים">קיים</option>
                    <option value="לא קיים">לא קיים</option>
                    
                  </Input>
                  {simpleValidator.current.message('match', tipuldata.match, 'required')}
                </FormGroup>

                <Toggle2 btnName='הוסף הערות' name="matchdetails" value={tipuldata.matchdetails} onChange={handleChange}
                  onBlur={()=>simpleValidator.current.showMessageFor('matchdetails')} />
                  {simpleValidator.current.message('matchdetails', tipuldata.matchdetails, 'matchdetails')}

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>חלפים</div>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>יכולת העמסה</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="load" value={tipuldata.load} onChange={handleChange} onBlur={()=>simpleValidator.current.showMessageFor('load')}>
                    <option value="קיים">קיים</option>
                    <option value="חלקי">חלקי</option>
                    <option value="לא קיים">לא קיים</option>
                  </Input>
                  {simpleValidator.current.message('load', tipuldata.load, 'required')}
                </FormGroup>
                
                <Toggle2 btnName='הוסף הערות' name="loaddeatils" value={tipuldata.loaddeatils} onChange={handleChange}/>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>הילום המלאי</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="stash" value={tipuldata.stash} onChange={handleChange}>
                    <option value="בוצע">בוצע</option>
                    <option value="לא בוצע">לא בוצע</option>
                  </Input>
                </FormGroup>
                
                <Toggle2 btnName='הוסף הערות' name="stashdetails" value={tipuldata.stashdetails} onChange={handleChange}/>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>חט"כ</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="hatak" value={tipuldata.hatak} onChange={handleChange}>
                    <option value="קיים">קיים</option>
                    <option value="לא קיים">לא קיים</option>
                  </Input>
                </FormGroup>
                
                <Toggle2 btnName='הוסף הערות' name="hatakdetails" value={tipuldata.hatakdetails} onChange={handleChange}/>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>בק״ש</div>
                <Row>
                  <Col xs={12} md={6}>
                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>תקן</div>
                    <FormGroup dir="rtl" >
                      <Input type="number" bsSize="lg" name="bakash" value={tipuldata.bakash} onChange={handleChange} 
                          onBlur={()=>simpleValidator.current.showMessageFor('bakash')}/>
                          {simpleValidator.current.message('bakash', tipuldata.bakash, 'required')}
                    </FormGroup>
                  </Col>
                  <Col xs={12} md={6}>
                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>מצבה</div>
                    <FormGroup dir="rtl" >
                      <Input type="number" bsSize="lg" name="bakashmax" value={tipuldata.bakashmax} onChange={handleChange} 
                         onBlur={()=>simpleValidator.current.showMessageFor('bakashmax')}/>
                         {simpleValidator.current.message('bakashmax', tipuldata.bakashmax, 'required')}
                    </FormGroup>
                  </Col>
                </Row>
                
                <Toggle2 btnName='הוסף הערות' name="bakashdetails" value={tipuldata.bakashdetails} onChange={handleChange}/>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>תאריך רענון אחרון (תוקף 8 שנים)</div>
                <FormGroup dir="rtl" >
                  <Input type="date" bsSize="lg" name="lastrefreshdate" value={tipuldata.lastrefreshdate} onChange={handleChange} style={{ lineHeight: 'inherit' }} 
                   onBlur={()=>simpleValidator.current.showMessageFor('lastrefreshdate')}/>
                   {simpleValidator.current.message('lastrefreshdate', tipuldata.lastrefreshdate, 'required')}
                </FormGroup>

                <Toggle2 btnName='הוסף הערות' name="lastrefreshdatedetails" value={tipuldata.lastrefreshdatedetails} onChange={handleChange}/>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>התאמת חלפים לצל"ם-רישום מכין</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="matchmahin" value={tipuldata.matchmahin} onChange={handleChange}>
                    <option value="קיים">קיים</option>
                    <option value="חלקי">חלקי</option>
                    <option value="לא קיים">לא קיים</option>
                  </Input>
                </FormGroup>

                <Toggle2 btnName='הוסף הערות' name="matchmahindetails" value={tipuldata.matchmahindetails} onChange={handleChange}/>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>התאמת ערכות חלפים לצל"ם</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="matchswap" value={tipuldata.matchswap} onChange={handleChange}>
                    <option value="קיים">קיים</option>
                    <option value="חלקי">חלקי</option>
                    <option value="לא קיים">לא קיים</option>
                  </Input>
                </FormGroup>

                <Toggle2 btnName='הוסף הערות' name="matchswapdetails" value={tipuldata.matchswapdetails} onChange={handleChange}/>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>קטלוגים</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="catalogs" value={tipuldata.catalogs} onChange={handleChange}>
                    <option value="קיים">קיים</option>
                    <option value="חלקי">חלקי</option>
                    <option value="לא קיים">לא קיים</option>
                  </Input>
                </FormGroup>

                <Toggle2 btnName='הוסף הערות' name="catalogsdetails" value={tipuldata.catalogsdetails} onChange={handleChange}/>
                </Container>
            </CardBody>
          </Card>
          <Card>
              <CardBody style={{ direction: 'rtl' }}>
                  <Container>

                <div style={{ fontSize: '22px', textAlign: 'center', paddingTop: '10px', fontWeight: "bold" }}>ארגון ותשתיות</div>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>אמצעי ניוד</div>
{gdod.type === 'חטמר'  || gdod.type === 'איסוף' || gdod.type === 'חיר קל' ? null : 
(
<>
<div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>נגמ״ש פיטר</div>
                <Row>
                  <Col xs={12} md={6}>
                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>תקן</div>
                    <FormGroup dir="rtl" >
                      <Input type="number" bsSize="lg" name="carpiter" value={tipuldata.carpiter} onChange={handleChange} 
                      onBlur={()=>simpleValidator.current.showMessageFor('carpiter')}/>
                         {simpleValidator.current.message('carpiter', tipuldata.carpiter, 'required')}
                    </FormGroup>
                  </Col>
                  <Col xs={12} md={6}>
                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>מצבה</div>
                    <FormGroup dir="rtl" >
                      <Input type="number" bsSize="lg" name="carpitermax" value={tipuldata.carpitermax} onChange={handleChange} 
                       onBlur={()=>simpleValidator.current.showMessageFor('carpitermax')}/>
                       {simpleValidator.current.message('carpitermax', tipuldata.carpitermax, 'required')}
                    </FormGroup>
                  </Col>
                </Row>

                <Toggle2 btnName='הוסף הערות' name="carpitedetails" value={tipuldata.carpitedetails} onChange={handleChange}/>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>נגמ״ש חט״פ</div>
                <Row>
                  <Col xs={12} md={6}>
                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>תקן</div>
                    <FormGroup dir="rtl" >
                      <Input type="number" bsSize="lg" name="carhatap" value={tipuldata.carhatap} onChange={handleChange} 
                          onBlur={()=>simpleValidator.current.showMessageFor('carhatap')}/>
                          {simpleValidator.current.message('carhatap', tipuldata.carhatap, 'required')}
                    </FormGroup>
                  </Col>
                  <Col xs={12} md={6}>
                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>מצבה</div>
                    <FormGroup dir="rtl" >
                      <Input type="number" bsSize="lg" name="carhatapmax" value={tipuldata.carhatapmax} onChange={handleChange} 
                        onBlur={()=>simpleValidator.current.showMessageFor('carhatapmax')}/>
                        {simpleValidator.current.message('carhatapmax', tipuldata.carhatapmax, 'required')}
                    </FormGroup>
                  </Col>
                </Row>

                <Toggle2 btnName='הוסף הערות' name="carhatapdetails" value={tipuldata.carhatapdetails} onChange={handleChange}/>


                <div style={{ textAlign: 'right', paddingTop: '10px' }}>רכב לח"ח-אמצעי ניוד ח"ח קלה/חצי כבדה</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="carlahh" value={tipuldata.carlahh} onChange={handleChange}>
                    <option value="קיים">קיים</option>
                    <option value="לא קיים">לא קיים</option>
                  </Input>
                </FormGroup>
                
                <Toggle2 btnName='הוסף הערות' name="carlahhdetails" value={tipuldata.carlahhdetails} onChange={handleChange}/>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>מיגון אישי - אמצעי ניוד ח"ח כבדה/אמצעי ניוד בק"ש</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="personalprotection" value={tipuldata.personalprotection} onChange={handleChange}>
                    <option value="קיים">קיים</option>
                    <option value="חלקי">חלקי</option>
                    <option value="לא קיים">לא קיים</option>
                  </Input>
                </FormGroup>
                
                <Toggle2 btnName='הוסף הערות' name="personalprotectiondetails" value={tipuldata.personalprotectiondetails} onChange={handleChange}/>
</>
)}
               

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>אמצעי ניוד מפל"ג טנ"א</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="mobilitytools" value={tipuldata.mobilitytools} onChange={handleChange}>
                    <option value="קיים">קיים</option>
                    <option value="לא קיים">לא קיים</option>
                  </Input>
                </FormGroup>

                <Toggle2 btnName='הוסף הערות' name="mobilitytoolsdetails" value={tipuldata.mobilitytoolsdetails} onChange={handleChange}/>

               

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>כתק"ל</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="katkal" value={tipuldata.katkal} onChange={handleChange}>
                    <option value="קיים">קיים</option>
                    <option value="לא קיים">לא קיים</option>
                  </Input>
                </FormGroup>
                
                <Toggle2 btnName='הוסף הערות' name="katkaldetails" value={tipuldata.katkaldetails} onChange={handleChange}/>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>אמצעי ניוד בק״ש</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="bakashniod" value={tipuldata.bakashniod} onChange={handleChange}>
                    <option value="קיים">קיים</option>
                    <option value="חלקי">חלקי</option>
                    <option value="לא קיים">לא קיים</option>
                  </Input>
                </FormGroup>
                
                <Toggle2 btnName='הוסף הערות' name="bakashnioddetails" value={tipuldata.bakashnioddetails} onChange={handleChange}/>

             {gdod.type === 'איסוף' || gdod.type === 'חיר קל' ? null : (
               <>
                  <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>ריאו חץ/עגור 20 - אמצעי הנפה </div>
                  <Row>
                    <Col xs={12} md={6}>
                      <div style={{ textAlign: 'right', paddingTop: '10px' }}>תקן</div>
                      <FormGroup dir="rtl" >
                        <Input type="number" bsSize="lg" name="rioarrow" value={tipuldata.rioarrow} onChange={handleChange} 
                           onBlur={()=>simpleValidator.current.showMessageFor('rioarrow')}/>
                           {simpleValidator.current.message('rioarrow', tipuldata.rioarrow, 'required')}
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={6}>
                      <div style={{ textAlign: 'right', paddingTop: '10px' }}>מצבה</div>
                      <FormGroup dir="rtl" >
                        <Input type="number" bsSize="lg" name="rioarrowmax" value={tipuldata.rioarrowmax} onChange={handleChange} 
                                 onBlur={()=>simpleValidator.current.showMessageFor('rioarrowmax')}/>
                                 {simpleValidator.current.message('rioarrowmax', tipuldata.rioarrowmax, 'required')}
                      </FormGroup>
                    </Col>
                  </Row>
                  
                  <Toggle2 btnName='הוסף הערות' name="rioarrowdetails" value={tipuldata.rioarrowdetails} onChange={handleChange}/>
  </>
                 
             )}

</Container>
            </CardBody>
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card>
            <CardBody>
              <Container>
                <div style={{ fontSize: '22px', textAlign: 'center', paddingTop: '10px', fontWeight: "bold" }}>אופרטיבי</div>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>שבצ"ק</div>
                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>התאמת שיבוץ קרבי</div>
                <Row>
                  <Col xs={12} md={6}>
                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>תקן</div>
                    <FormGroup dir="rtl" >
                      <Input type="number" bsSize="lg" name="shiboz" value={tipuldata.shiboz} onChange={handleChange} 
                       onBlur={()=>simpleValidator.current.showMessageFor('shiboz')}/>
                       {simpleValidator.current.message('shiboz', tipuldata.shiboz, 'required')}
                    </FormGroup>
                  </Col>
                  <Col xs={12} md={6}>
                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>מצבה</div>
                    <FormGroup dir="rtl" >
                      <Input type="number" bsSize="lg" name="shibozmax" value={tipuldata.shibozmax} onChange={handleChange} 
                         onBlur={()=>simpleValidator.current.showMessageFor('shibozmax')}/>
                         {simpleValidator.current.message('shibozmax', tipuldata.shibozmax, 'required')}
                    </FormGroup>
                  </Col>
                </Row>
                
                <Toggle2 btnName='הוסף הערות' name="shibozdetails" value={tipuldata.shibozdetails} onChange={handleChange}/>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>נהגים לכל פלטפורמת ניוד</div>
                <Row>
                  <Col xs={12} md={6}>
                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>תקן</div>
                    <FormGroup dir="rtl" >
                      <Input type="number" bsSize="lg" name="drivers" value={tipuldata.drivers} onChange={handleChange} 
                        onBlur={()=>simpleValidator.current.showMessageFor('drivers')}/>
                        {simpleValidator.current.message('drivers', tipuldata.drivers, 'required')}
                    </FormGroup>
                  </Col>
                  <Col xs={12} md={6}>
                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>מצבה</div>
                    <FormGroup dir="rtl" >
                      <Input type="number" bsSize="lg" name="driversmax" value={tipuldata.driversmax} onChange={handleChange} 
                        onBlur={()=>simpleValidator.current.showMessageFor('driversmax')}/>
                        {simpleValidator.current.message('driversmax', tipuldata.driversmax, 'required')}
                    </FormGroup>
                  </Col>
                </Row>
                
                <Toggle2 btnName='הוסף הערות' name="driversdetails" value={tipuldata.driversdetails} onChange={handleChange}/>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>פקודות מבצע</div>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>המצאות פקודות אופרטיביות מחויבות</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="pkodotopara" value={tipuldata.pkodotopara} onChange={handleChange}>
                    <option value="קיים">קיים</option>
                    <option value="לא קיים">לא קיים</option>
                  </Input>
                </FormGroup>

                <Toggle2 btnName='הוסף הערות' name="pkodotoparadetails" value={tipuldata.pkodotoparadetails} onChange={handleChange}/>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>אמצעי קשר/תקשורת</div>
                <Row>
                  <Col xs={12} md={6}>
                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>תקן</div>
                    <FormGroup dir="rtl" >
                      <Input type="number" bsSize="lg" name="tikshorat" value={tipuldata.tikshorat} onChange={handleChange} 
                       onBlur={()=>simpleValidator.current.showMessageFor('tikshorat')}/>
                       {simpleValidator.current.message('tikshorat', tipuldata.tikshorat, 'required')}
                    </FormGroup>
                  </Col>
                  <Col xs={12} md={6}>
                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>מצבה</div>
                    <FormGroup dir="rtl" >
                      <Input type="number" bsSize="lg" name="tikshoratmax" value={tipuldata.tikshoratmax} onChange={handleChange} 
                         onBlur={()=>simpleValidator.current.showMessageFor('tikshoratmax')}/>
                         {simpleValidator.current.message('tikshoratmax', tipuldata.tikshoratmax, 'required')}
                    </FormGroup>
                  </Col>
                </Row>
                
                <Toggle2 btnName='הוסף הערות' name="tikshoratdetails" value={tipuldata.tikshoratdetails} onChange={handleChange}/>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>כמות כיתות טנ״א כשירות</div>
                <Row>
                  <Col xs={12} md={6}>
                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>תקן</div>
                    <FormGroup dir="rtl" >
                      <Input type="number" bsSize="lg" name="teneclass" value={tipuldata.teneclass} onChange={handleChange} 
                       onBlur={()=>simpleValidator.current.showMessageFor('teneclass')}/>
                       {simpleValidator.current.message('teneclass', tipuldata.teneclass, 'required')}
                    </FormGroup>
                  </Col>
                  <Col xs={12} md={6}>
                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>מצבה</div>
                    <FormGroup dir="rtl" >
                      <Input type="number" bsSize="lg" name="teneclassmax" value={tipuldata.teneclassmax} onChange={handleChange} 
                         onBlur={()=>simpleValidator.current.showMessageFor('teneclassmax')}/>
                         {simpleValidator.current.message('teneclassmax', tipuldata.teneclassmax, 'required')}
                    </FormGroup>
                  </Col>
                </Row>
                
                <Toggle2 btnName='הוסף הערות' name="teneclassdetails" value={tipuldata.teneclassdetails} onChange={handleChange}/>


                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>פק״לים</div>
                <Row>
                  <Col xs={12} md={6}>
                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>תיאום רמת ממונה</div>
                    <FormGroup dir="rtl" >
                      <Input type="select" bsSize="lg" name="tiom" value={tipuldata.tiom} onChange={handleChange}>
                        <option value="קיים">קיים</option>
                        <option value="לא קיים">לא קיים</option>
                      </Input>
                    </FormGroup>

                    <Toggle2 btnName='הוסף הערות' name="tiomdetails" value={tipuldata.tiomdetails} onChange={handleChange}/>

                  </Col>
                  <Col xs={12} md={6}>

                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>אישור מפקד</div>
                    <FormGroup dir="rtl" >
                      <Input type="select" bsSize="lg" name="commanderconf" value={tipuldata.commanderconf} onChange={handleChange}>
                        <option value="קיים">קיים</option>
                        <option value="לא קיים">לא קיים</option>
                      </Input>
                    </FormGroup>
                    
                    <Toggle2 btnName='הוסף הערות' name="commanderconfdetails" value={tipuldata.commanderconfdetails} onChange={handleChange}/>

                  </Col>
                </Row>
                <div style={{ textAlign: 'right', paddingTop: '10px' }}>פקודות משלימות</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="pkodotmashlimot" value={tipuldata.pkodotmashlimot} onChange={handleChange}>
                    <option value="קיים">קיים</option>
                    <option value="לא קיים">לא קיים</option>
                  </Input>
                </FormGroup>
                
                <Toggle2 btnName='הוסף הערות' name="pkodotmashlimotdetails" value={tipuldata.pkodotmashlimotdetails} onChange={handleChange}/>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>מערכות שו"ב ממוחשבות</div>
                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>מצאי עמדות שו"ב תקינות</div>
                <Row>
                  <Col xs={12} md={6}>
                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>תקן</div>
                    <FormGroup dir="rtl" >
                      <Input type="number" bsSize="lg" name="tkinot" value={tipuldata.tkinot} onChange={handleChange} 
                      onBlur={()=>simpleValidator.current.showMessageFor('tkinot')}/>
                      {simpleValidator.current.message('tkinot', tipuldata.tkinot, 'required')}
                    </FormGroup>
                  </Col>
                  <Col xs={12} md={6}>
                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>מצבה</div>
                    <FormGroup dir="rtl" >
                      <Input type="number" bsSize="lg" name="tkinotmax" value={tipuldata.tkinotmax} onChange={handleChange} 
                          onBlur={()=>simpleValidator.current.showMessageFor('tkinotmax')}/>
                          {simpleValidator.current.message('tkinotmax', tipuldata.tkinotmax, 'required')}
                    </FormGroup>
                  </Col>
                </Row>
                
                <Toggle2 btnName='הוסף הערות' name="tkinotdetails" value={tipuldata.tkinotdetails} onChange={handleChange}/>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>הזנת תיק נתוני יחידות פקודות ומפות במשואה</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="tikim" value={tipuldata.tikim} onChange={handleChange}>
                    <option value="בוצע">בוצע</option>
                    <option value="לא בוצע">לא בוצע</option>
                  </Input>
                </FormGroup>
                
                <Toggle2 btnName='הוסף הערות' name="tikimdetails" value={tipuldata.tikimdetails} onChange={handleChange}/>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>בעלי תפקידים מוכשרים</div>
                <Row>
                  <Col xs={12} md={6}>
                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>תקן</div>
                    <FormGroup dir="rtl" >
                      <Input type="number" bsSize="lg" name="roleholders" value={tipuldata.roleholders} onChange={handleChange} 
                         onBlur={()=>simpleValidator.current.showMessageFor('roleholders')}/>
                         {simpleValidator.current.message('roleholders', tipuldata.roleholders, 'required')}
                    </FormGroup>
                  </Col>
                  <Col xs={12} md={6}>
                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>מצבה</div>
                    <FormGroup dir="rtl" >
                      <Input type="number" bsSize="lg" name="roleholdersmax" value={tipuldata.roleholdersmax} onChange={handleChange}
                       onBlur={()=>simpleValidator.current.showMessageFor('roleholdersmax')}/>
                       {simpleValidator.current.message('roleholdersmax', tipuldata.roleholdersmax, 'required')}
                    </FormGroup>
                  </Col>
                </Row>
                
                <Toggle2 btnName='הוסף הערות' name="roleholdersdetails" value={tipuldata.roleholdersdetails} onChange={handleChange}/>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>דיווח ושליטה ארגז מפל"ג טנ"א</div>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>תכולת ארגז ע"פ טנ"ה 1</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="boxcontent" value={tipuldata.boxcontent} onChange={handleChange}>
                    <option value="קיים">קיים</option>
                    <option value="חלקי">חלקי</option>
                    <option value="לא קיים">לא קיים</option>
                  </Input>
                </FormGroup>
                
                <Toggle2 btnName='הוסף הערות' name="boxcontentdetails" value={tipuldata.boxcontentdetails} onChange={handleChange}/>
                </Container>
            </CardBody>
          </Card>
          <Card>
              <CardBody style={{ direction: 'rtl' }}>
                  <Container>
         
                <div style={{ fontSize: '22px', textAlign: 'center', paddingTop: '10px', fontWeight: "bold" }}>אימונים והכשרות</div>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>אימוני מסגרת - פלגת טנא אימון טקטי</div>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>אימון פלגת טנ"א - כמות (תאריך ביצוע אחרון)</div>
                <FormGroup dir="rtl" >
                  <Input type="date" name="trainingamount" value={tipuldata.trainingamount} onChange={handleChange} 
                     onBlur={()=>simpleValidator.current.showMessageFor('trainingamount')}/>
                     {simpleValidator.current.message('trainingamount', tipuldata.trainingamount, 'required')}
                </FormGroup>
                
                <Toggle2 btnName='הוסף הערות' name="trainingamountdetails" value={tipuldata.trainingamountdetails} onChange={handleChange}/>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>אימון פלגת טנ"א - איכות (ציון בין 0-100)</div>
                <FormGroup dir="rtl" >
                  <Input type="number" name="trainingquality" value={tipuldata.trainingquality} onChange={handleChange} InputProps={{ inputProps: { max: 100, min: 10 } }}
                   onBlur={()=>simpleValidator.current.showMessageFor('trainingquality')}/>
                   {simpleValidator.current.message('trainingquality', tipuldata.trainingquality, 'required')}
                </FormGroup>
                
                <Toggle2 btnName='הוסף הערות' name="trainingqualitydetails" value={tipuldata.trainingqualitydetails} onChange={handleChange}/>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>תרגילים</div>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>תרגיל גדוד בשנה האחרונה</div>
                <FormGroup dir="rtl" >
                  <Input type="select" bsSize="lg" name="battaliondrillamount" value={tipuldata.battaliondrillamount} onChange={handleChange}>
                    <option value="בוצע">בוצע</option>
                    <option value="לא בוצע">לא בוצע</option>
                  </Input>
                </FormGroup>
                
                <Toggle2 btnName='הוסף הערות' name="battaliondrillamountdetails" value={tipuldata.battaliondrillamountdetails} onChange={handleChange}/>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>תרגיל גדוד - איכות (ציון בין 0-100)</div>
                <FormGroup dir="rtl" >
                  <Input type="number" name="battaliondrillquality" value={tipuldata.battaliondrillquality} onChange={handleChange} InputProps={{ inputProps: { max: 100, min: 10 } }}
                   onBlur={()=>simpleValidator.current.showMessageFor('battaliondrillquality')}/>
                   {simpleValidator.current.message('battaliondrillquality', tipuldata.battaliondrillquality, 'required')}
                </FormGroup>
                
                <Toggle2 btnName='הוסף הערות' name="battaliondrillqualitydetails" value={tipuldata.battaliondrillqualitydetails} onChange={handleChange}/>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>מקצועיות כ"א</div>
                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>הכשרות</div>
                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>כמות מחט"פים שעברו קורס מחט"פים</div>
                <Row>
                  <Col xs={12} md={6}>
                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>כמות</div>
                    <FormGroup dir="rtl" >
                      <Input type="number" bsSize="lg" name="kors" value={tipuldata.kors} onChange={handleChange} 
                       onBlur={()=>simpleValidator.current.showMessageFor('kors')}/>
                       {simpleValidator.current.message('kors', tipuldata.kors, 'required')}
                    </FormGroup>
                  </Col>
                  <Col xs={12} md={6}>
                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>אחוז</div>
                    <FormGroup dir="rtl" >
                      <Input type="number" bsSize="lg" value={(parseInt(tipuldata.kors)/tipuldata.officers)*100} disabled="true"/>
                    </FormGroup>
                  </Col>
                </Row>

                <Toggle2 btnName='הוסף הערות' name="korsdetails" value={tipuldata.korsdetails} onChange={handleChange}/>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>מעוכבי שלב ביחידה</div>
                <Row>
                  <Col xs={12} md={6}>
                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>תקן</div>
                    <FormGroup dir="rtl" >
                      <Input type="number" bsSize="lg" name="nokavim" value={tipuldata.nokavim} onChange={handleChange} 
                          onBlur={()=>simpleValidator.current.showMessageFor('nokavim')}/>
                          {simpleValidator.current.message('nokavim', tipuldata.nokavim, 'required')}
                    </FormGroup>
                  </Col>
                  <Col xs={12} md={6}>
                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>מצבה</div>
                    <FormGroup dir="rtl" >
                      <Input type="number" bsSize="lg" name="nokavimmax" value={tipuldata.nokavimmax} onChange={handleChange} 
                         onBlur={()=>simpleValidator.current.showMessageFor('nokavimmax')}/>
                         {simpleValidator.current.message('nokavimmax', tipuldata.nokavimmax, 'required')}
                    </FormGroup>
                  </Col>
                </Row>
                
                <Toggle2 btnName='הוסף הערות' name="nokavimdetails" value={tipuldata.nokavimdetails} onChange={handleChange}/>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>תעודות בוחן</div>
                <Row>
                  <Col xs={12} md={6}>
                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>תקן</div>
                    <FormGroup dir="rtl" >
                      <Input type="number" bsSize="lg" name="tester" value={tipuldata.tester} onChange={handleChange}
                       onBlur={()=>simpleValidator.current.showMessageFor('tester')}/>
                       {simpleValidator.current.message('tester', tipuldata.tester, 'required')}
                    </FormGroup>
                  </Col>
                  <Col xs={12} md={6}>
                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>מצבה</div>
                    <FormGroup dir="rtl" >
                      <Input type="number" bsSize="lg" name="testermax" value={tipuldata.testermax} onChange={handleChange}
                       onBlur={()=>simpleValidator.current.showMessageFor('testermax')}/>
                       {simpleValidator.current.message('testermax', tipuldata.testermax, 'required')}
                    </FormGroup>
                  </Col>
                </Row>

                <Toggle2 btnName='הוסף הערות' name="testerdetails" value={tipuldata.testerdetails} onChange={handleChange}/>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>כמות מוסמכי מחלץ</div>
                <Row>
                  <Col xs={12} md={6}>
                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>תקן</div>
                    <FormGroup dir="rtl" >
                      <Input type="number" bsSize="lg" name="amountmhalaf" value={tipuldata.amountmhalaf} onChange={handleChange} 
                       onBlur={()=>simpleValidator.current.showMessageFor('amountmhalaf')}/>
                       {simpleValidator.current.message('amountmhalaf', tipuldata.amountmhalaf, 'required')}
                    </FormGroup>
                  </Col>
                  <Col xs={12} md={6}>
                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>מצבה</div>
                    <FormGroup dir="rtl" >
                      <Input type="number" bsSize="lg" name="amountmhalafmax" value={tipuldata.amountmhalafmax} onChange={handleChange} 
                        onBlur={()=>simpleValidator.current.showMessageFor('amountmhalafmax')}/>
                        {simpleValidator.current.message('amountmhalafmax', tipuldata.amountmhalafmax, 'required')}
                    </FormGroup>
                  </Col>
                </Row>

                <Toggle2 btnName='הוסף הערות' name="amountmhalafdetails" value={tipuldata.amountmhalafdetails} onChange={handleChange}/>

                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>כמות מוסמכי הנפה</div>
                <Row>
                  <Col xs={12} md={6}>
                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>תקן</div>
                    <FormGroup dir="rtl" >
                      <Input type="number" bsSize="lg" name="amounthanafa" value={tipuldata.amounthanafa} onChange={handleChange} 
                         onBlur={()=>simpleValidator.current.showMessageFor('amounthanafa')}/>
                         {simpleValidator.current.message('amounthanafa', tipuldata.amounthanafa, 'required')}
                    </FormGroup>
                  </Col>
                  <Col xs={12} md={6}>
                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>מצבה</div>
                    <FormGroup dir="rtl" >
                      <Input type="number" bsSize="lg" name="amounthanafamax" value={tipuldata.amounthanafamax} onChange={handleChange} 
                       onBlur={()=>simpleValidator.current.showMessageFor('amounthanafamax')}/>
                       {simpleValidator.current.message('amounthanafamax', tipuldata.amounthanafamax, 'required')}
                    </FormGroup>
                  </Col>
                </Row>

                <Toggle2 btnName='הוסף הערות' name="amounthanafadetails" value={tipuldata.amounthanafadetails} onChange={handleChange}/>
                </Container>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Container>
                <div style={{ fontSize: '22px', textAlign: 'center', paddingTop: '10px', fontWeight: "bold" }}>סיכום</div>
                <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>רוח היחידה</div>

                <div style={{ textAlign: 'right', paddingTop: '10px' }}>חוסן מנטאלי (ציון בין 1-5)</div>
                <FormGroup dir="rtl" >
                  <Input type="number" name="mentality" value={tipuldata.mentality} onChange={handleChange} 
                   onBlur={()=>simpleValidator.current.showMessageFor('mentality')}/>
                   {simpleValidator.current.message('mentality', tipuldata.mentality, 'required')}
                </FormGroup>

                <div style={{ textAlign: 'center' }}>
                  <button className="btn" onClick={clickSubmit}>עדכן כשירות</button>
                </div>
                </Container>
            </CardBody>
          </Card>
        </Col>
      </Row>
      
    </Container>
  );
}
export default withRouter(AddTipulForm);;