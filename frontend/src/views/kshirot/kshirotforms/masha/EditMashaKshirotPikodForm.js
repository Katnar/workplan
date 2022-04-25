import React, { useState, useEffect, useRef } from 'react';
import { Link, withRouter, Redirect } from "react-router-dom";
import Toggle2 from 'components/kshirot/Toggle2/Toggle2'
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
import { useLocation } from 'react-router-dom'

const EditMashaKshirotPikodForm = ({ match }) => {
  const location = useLocation()
  const { pikod } = location.state
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
   //איוש כא
   officershamal: '',
   officershamaldetails: '',
   //בעלי תפקיד
   keva: '',
   kevadetails: '',
   aaz: '',
   aazdetails: '',
   miloem: '',
   miloemdetails: '',
   //חסון מנטאלי
   gimalim: '',//  גימלים
   gimalimdetails: '',
   nifkadot: '',
   nifkadotdetails: '',
   nasher: '',
   nasherdetails: '',
   himazot: '',
   himazotdetails: '',

   bizoaemonim: '',
   bizoaemonimdetails: '',

   bizoasadna: '',
   bizoasadnadeatils: '',
   yomgibush: '',
   yomgibushdetails: '',
   mentalevents: '',
   mentaleventsdetails: '',
   professionalexplanations: '',
   professionalexplanationsdetails: '',
   //ארגון 
   torattene: '',
   torattenedetails: '',

   maindesk: '',
   nahi: '', // ארגז כלים
   mishan: '',
   handasa: '',
   tifol: '', // התאמת כע לסוג הצלם
   tasha: '',
   // חלפים 
   logisticsequipment: '', // יכולת העמסה
   dedicatedequipment: '',

   //קיום ותשתיות
   loadrequired: '', // הילום מלאי
   hamal: '',

   //תורה ותפיסות
   shibozkravi: '',
   authorizedlevelapproval: '',
   subjectlevelapproval: '',
   pakalim: '',
   azarim: '',

   diamond: '',
   sap: '',
   pakal: '',
   eventsystem: '',

   //אימונים והכשרות
   executionversusplanning: '',
   qualityoftraining: '',
   numberofparticipants: '',

   mamal: '',
   operationalcontinuity: '',

   trainingadjustment: '',

   //סיכום
   sicom: '',
  })


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
      checkspecialkeys()
    }
  }

  function checkspecialkeys() {
    

      UpdateKshirot();
  
  }
  

  function UpdateKshirot() {
    var temptipul = tipuldata;
    delete temptipul._id; //cant send _id 
    delete temptipul.createdAt; //fix the date
    delete temptipul.updatedAt; //fix the date  
    axios.post(`http://localhost:8000/api/mashakshirotpikod`, temptipul)
      .then(res => {
        console.log(res.data._id)// returns current added kshirot id
        UpdateGdodsKshirot(res.data._id);
      })
      .catch(error => {

      })
  }

  function UpdateGdodsKshirot(addedkshirotid) {
    var temppikodid = match.params.pikodid;
    axios.post(`http://localhost:8000/api/pikod/updatekshirot`, [temppikodid, addedkshirotid])
      .then(res => {
        UpdateGdodsHistory(addedkshirotid);
      })
      .catch(error => {

      })
  }

  function UpdateGdodsHistory(addedkshirotid) {
    var temppikodid = match.params.pikodid;
    axios.post(`http://localhost:8000/api/pikod/updatehistory`, [temppikodid, addedkshirotid])
      .then(res => {
        toast.success(`הכשירות עודכנה בהצלחה`);
        history.goBack();
      })
      .catch(error => {

      })
  }

  function init() {
    var tipulidtemp = match.params.kshirotid;
    
    axios.get(`http://localhost:8000/api/mashakshirotpikod/${tipulidtemp}`)
      .then(res => {
        setTipulData(res.data[0]);
        setFinalSpecialKey(res.data[0].specialkey);
        setFinalSpecialKeytwo(res.data[0].specialkeytwo);       
      })
      .catch(error => {

      })
  }

  useEffect(() => {
    init();
  }, [])

  useEffect(() => { //calculate officers
   
   
    setTipulData({ ...tipuldata});
  }, [finalspecialkeytwo])

  return (
    <Container style={{ paddingTop: '80px', direction: 'rtl' }}>
    <Row>
      <Col xs={12} md={6}>
        <Card>
          <CardHeader style={{ direction: 'rtl' }}>
            <CardTitle tag="h4" style={{ direction: 'rtl', textAlign: 'center', fontWeight: "bold" }}>מדדי כשירות מפקדת מש"א</CardTitle>{/*headline*/}
          </CardHeader>

          <CardBody style={{ direction: 'rtl' }}>
            <Container>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>פרטי המפקד</div>
              <Row>
                <Col xs={12} md={6}>
                  <div style={{ textAlign: 'center', paddingTop: '10px' }}>שם מפקד</div>
                  <FormGroup dir="rtl" >
                    <Input type="text" bsSize="lg" name="commandername" value={tipuldata.commandername} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('commandername')} />
                    {simpleValidator.current.message('commandername', tipuldata.commandername, 'required')}
                  </FormGroup>
                </Col>
                <Col xs={12} md={6}>

                  <div style={{ textAlign: 'center', paddingTop: '10px' }}>זמן בתפקיד</div>
                  <FormGroup dir="rtl" >
                    <Input type="text" bsSize="lg" name="timeinrole" value={tipuldata.timeinrole} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('timeinrole')} />
                    {simpleValidator.current.message('timeinrole', tipuldata.timeinrole, 'required')}
                  </FormGroup>

                </Col>
              </Row>

              <div style={{ fontSize: '22px', textAlign: 'center', paddingTop: '10px', fontWeight: "bold" }}>מדדי כשירות בדרג א'</div>

              <div style={{ fontSize: '18px', textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>כללי</div>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>פרטים אישיים</div>

              <Row>
                <Col xs={12} md={4}>
                  <div style={{ textAlign: 'center', paddingTop: '10px' }}>יחידה</div>
                  <FormGroup dir="rtl" >
                    <Input type="text" bsSize="lg" name="unit" value={tipuldata.unit} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('unit')} />
                    {simpleValidator.current.message('unit', tipuldata.unit, 'required')}
                  </FormGroup>
                </Col>
                <Col xs={12} md={4}>
                  <div style={{ textAlign: 'center', paddingTop: '10px' }}>שם קצין טנ"א</div>
                  <FormGroup dir="rtl" >
                    <Input type="text" bsSize="lg" name="name" value={tipuldata.name} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('name')} />
                    {simpleValidator.current.message('name', tipuldata.name, 'required')}
                  </FormGroup>
                </Col>
                <Col xs={12} md={4}>
                  <div style={{ textAlign: 'center', paddingTop: '10px' }}>טלפון</div>
                  <FormGroup dir="rtl" >
                    <Input type="text" bsSize="lg" name="phone" value={tipuldata.phone} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('phone')} />
                    {simpleValidator.current.message('phone', tipuldata.phone, 'required')}
                  </FormGroup>
                </Col>
              </Row>

              <div style={{ fontSize: '22px', textAlign: 'center', paddingTop: '10px', fontWeight: "bold" }}>כוח אדם</div>
              {pikod.sadir == true ? null : (
                <>
                  <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>גרעין מומחים</div>

                  <Row>
                    <Col xs={12} md={6}>
                      <div style={{ textAlign: 'right', paddingTop: '10px' }}>סימון מקצוע</div>
                      <FormGroup dir="rtl" >
                        <Input type="number" bsSize="lg" name="experts" value={tipuldata.experts} onChange={handleChange}
                          onBlur={() => simpleValidator.current.showMessageFor('experts')} />
                        {simpleValidator.current.message('experts', tipuldata.experts, 'required')}
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={6}>
                      <div style={{ textAlign: 'right', paddingTop: '10px' }}>מצבה</div>
                      <FormGroup dir="rtl" >
                        <Input type="number" bsSize="lg" name="expertsmax" value={tipuldata.expertsmax} onChange={handleChange}
                          onBlur={() => simpleValidator.current.showMessageFor('expertsmax')} />
                        {simpleValidator.current.message('expertsmax', tipuldata.expertsmax, 'required')}
                      </FormGroup>
                    </Col>
                  </Row>
                </>
              )}

              <div style={{ fontSize: '18px', textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>איוש כ"א</div>
              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>מפקדים בחמ"ל</div>
              <Row>
                <Col xs={12} md={6}>
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>ערך</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="officershamal" value={tipuldata.officershamal} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('officershamal')} />
                    {simpleValidator.current.message('officershamal', tipuldata.officershamal, 'required')}
                  </FormGroup>
                </Col>
                <Col xs={12} md={6}>
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>הערות</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="officershamaldetails" value={tipuldata.officershamaldetails} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('officershamaldetails')} />
                    {simpleValidator.current.message('officershamaldetails', tipuldata.officershamaldetails, 'required')}
                  </FormGroup>
                </Col>
              </Row>

              <div style={{ fontSize: '18px', textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>בעלי תפקיד</div>
              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>קבע</div>
              <Row>
                <Col xs={12} md={6}>
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>ערך</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="keva" value={tipuldata.keva} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('keva')} />
                    {simpleValidator.current.message('keva', tipuldata.keva, 'required')}
                  </FormGroup>
                </Col>
                <Col xs={12} md={6}>
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>הערות</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="kevadetails" value={tipuldata.kevadetails} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('kevadetails')} />
                    {simpleValidator.current.message('kevadetails', tipuldata.kevadetails, 'required')}
                  </FormGroup>
                </Col>
              </Row>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>אע"צ</div>
              <Row>
                <Col xs={12} md={6}>
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>ערך</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="aaz" value={tipuldata.aaz} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('aaz')} />
                    {simpleValidator.current.message('aaz', tipuldata.aaz, 'required')}
                  </FormGroup>
                </Col>
                <Col xs={12} md={6}>
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>הערות</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="aazdetails" value={tipuldata.aazdetails} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('aazdetails')} />
                    {simpleValidator.current.message('aazdetails', tipuldata.aazdetails, 'required')}
                  </FormGroup>
                </Col>
              </Row>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>מילואים</div>
              <Row>
                <Col xs={12} md={6}>
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>ערך</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="miloem" value={tipuldata.miloem} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('miloem')} />
                    {simpleValidator.current.message('miloem', tipuldata.miloem, 'required')}
                  </FormGroup>
                </Col>
                <Col xs={12} md={6}>
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>הערות</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="miloemdetails" value={tipuldata.miloemdetails} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('miloemdetails')} />
                    {simpleValidator.current.message('miloemdetails', tipuldata.miloemdetails, 'required')}
                  </FormGroup>
                </Col>
              </Row>

              <div style={{ fontSize: '22px', textAlign: 'center', paddingTop: '10px', fontWeight: "bold" }}>חוסן מנטאלי</div>

              <div style={{ fontSize: '18px', textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>שייכות למסגרת</div>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>גימלים</div>
              <Row>
                <Col xs={12} md={6}>
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>ערך</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="gimalim" value={tipuldata.gimalim} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('gimalim')} />
                    {simpleValidator.current.message('gimalim', tipuldata.gimalim, 'required')}
                  </FormGroup>
                </Col>
                <Col xs={12} md={6}>
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>הערות</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="gimalimdetails" value={tipuldata.gimalimdetails} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('gimalimdetails')} />
                    {simpleValidator.current.message('gimalimdetails', tipuldata.gimalimdetails, 'required')}
                  </FormGroup>
                </Col>
              </Row>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>נפקדות</div>
              <Row>
                <Col xs={12} md={6}>
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>ערך</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="nifkadot" value={tipuldata.nifkadot} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('nifkadot')} />
                    {simpleValidator.current.message('nifkadot', tipuldata.nifkadot, 'required')}
                  </FormGroup>
                </Col>
                <Col xs={12} md={6}>
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>הערות</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="nifkadotdetails" value={tipuldata.nifkadotdetails} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('nifkadotdetails')} />
                    {simpleValidator.current.message('nifkadotdetails', tipuldata.nifkadotdetails, 'required')}
                  </FormGroup>
                </Col>
              </Row>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>נשר ביחידה</div>
              <Row>
                <Col xs={12} md={6}>
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>ערך</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="nasher" value={tipuldata.nasher} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('nasher')} />
                    {simpleValidator.current.message('nasher', tipuldata.nasher, 'required')}
                  </FormGroup>
                </Col>
                <Col xs={12} md={6}>
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>הערות</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="nasherdetails" value={tipuldata.nasherdetails} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('nasherdetails')} />
                    {simpleValidator.current.message('nasherdetails', tipuldata.nasherdetails, 'required')}
                  </FormGroup>
                </Col>
              </Row>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>הימצאות הגדרת תפקיד בחרום וסדר פעולות</div>
              <Row>
                <Col xs={12} md={6}>
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>ערך</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="himazot" value={tipuldata.himazot} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('himazot')} />
                    {simpleValidator.current.message('himazot', tipuldata.himazot, 'required')}
                  </FormGroup>
                </Col>
                <Col xs={12} md={6}>
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>הערות</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="himazotdetails" value={tipuldata.himazotdetails} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('himazotdetails')} />
                    {simpleValidator.current.message('himazotdetails', tipuldata.himazotdetails, 'required')}
                  </FormGroup>
                </Col>
              </Row>
              <div style={{ fontSize: '18px', textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>הרגשת מסוגלות</div>
              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>ביצוע אימונים</div>
              <Row>
                <Col xs={12} md={6}>
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>ערך</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="bizoaemonim" value={tipuldata.bizoaemonim} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('bizoaemonim')} />
                    {simpleValidator.current.message('bizoaemonim', tipuldata.bizoaemonim, 'required')}
                  </FormGroup>
                </Col>
                <Col xs={12} md={6}>
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>הערות</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="bizoaemonimdetails" value={tipuldata.bizoaemonimdetails} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('bizoaemonimdetails')} />
                    {simpleValidator.current.message('bizoaemonimdetails', tipuldata.bizoaemonimdetails, 'required')}
                  </FormGroup>
                </Col>
              </Row>

              <div style={{ fontSize: '18px', textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>חוזק החוסן</div>
              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>ביצוע סדנה מגן וחוסן</div>
              <Row>
                <Col xs={12} md={6}>
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>ערך</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="bizoasadna" value={tipuldata.bizoasadna} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('bizoasadna')} />
                    {simpleValidator.current.message('bizoasadna', tipuldata.bizoasadna, 'required')}
                  </FormGroup>
                </Col>
                <Col xs={12} md={6}>
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>הערות</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="bizoasadnadeatils" value={tipuldata.bizoasadnadeatils} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('bizoasadnadeatils')} />
                    {simpleValidator.current.message('bizoasadnadeatils', tipuldata.bizoasadnadeatils, 'required')}
                  </FormGroup>
                </Col>
              </Row>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>ימי גיבוש ביחידה</div>
              <Row>
                <Col xs={12} md={6}>
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>ערך</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="yomgibush" value={tipuldata.yomgibush} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('yomgibush')} />
                    {simpleValidator.current.message('yomgibush', tipuldata.yomgibush, 'required')}
                  </FormGroup>
                </Col>
                <Col xs={12} md={6}>
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>הערות</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="yomgibushdetails" value={tipuldata.yomgibushdetails} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('yomgibushdetails')} />
                    {simpleValidator.current.message('yomgibushdetails', tipuldata.yomgibushdetails, 'required')}
                  </FormGroup>
                </Col>
              </Row>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>תרחישים של אירועים מנטאליים</div>
              <Row>
                <Col xs={12} md={6}>
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>ערך</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="mentalevents" value={tipuldata.mentalevents} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('mentalevents')} />
                    {simpleValidator.current.message('mentalevents', tipuldata.mentalevents, 'required')}
                  </FormGroup>
                </Col>
                <Col xs={12} md={6}>
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>הערות</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="mentaleventsdetails" value={tipuldata.mentaleventsdetails} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('mentaleventsdetails')} />
                    {simpleValidator.current.message('mentaleventsdetails', tipuldata.mentaleventsdetails, 'required')}
                  </FormGroup>
                </Col>
              </Row>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>הסברות מקצועיות</div>
              <Row>
                <Col xs={12} md={6}>
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>ערך</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="professionalexplanations" value={tipuldata.professionalexplanations} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('professionalexplanations')} />
                    {simpleValidator.current.message('professionalexplanations', tipuldata.professionalexplanations, 'required')}
                  </FormGroup>
                </Col>
                <Col xs={12} md={6}>
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>הערות</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="professionalexplanationsdetails" value={tipuldata.professionalexplanationsdetails} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('professionalexplanationsdetails')} />
                    {simpleValidator.current.message('professionalexplanationsdetails', tipuldata.professionalexplanationsdetails, 'required')}
                  </FormGroup>
                </Col>
              </Row>


              <div style={{ fontSize: '22px', textAlign: 'center', paddingTop: '10px', fontWeight: "bold" }}> ארגון</div>

              <div style={{ fontSize: '18px', textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>חלפים </div>

              <div style={{ fontSize: '18px', textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>ספרות מקצועית</div>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>תורת טנ"א</div>

              <Row>
                <Col xs={12} md={6}>
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>ערך</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="torattene" value={tipuldata.torattene} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('torattene')} />
                    {simpleValidator.current.message('torattene', tipuldata.torattene, 'required')}
                  </FormGroup>
                </Col>
                <Col xs={12} md={6}>
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>הערות</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="torattenedetails" value={tipuldata.torattenedetails} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('torattenedetails')} />
                    {simpleValidator.current.message('torattenedetails', tipuldata.torattenedetails, 'required')}
                  </FormGroup>
                </Col>
              </Row>
              <div style={{ fontSize: '18px', textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>ארגון החמ"ל </div>
              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>שולחן מרכזי</div>

              <Row>
                <Col xs={12} >
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>ערך</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="maindesk" value={tipuldata.maindesk} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('maindesk')} />
                    {simpleValidator.current.message('maindesk', tipuldata.maindesk, 'required')}
                  </FormGroup>
                </Col>
              </Row>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>מכלול נה"י</div>

              <Row>
                <Col xs={12} >
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>ערך</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="nahi" value={tipuldata.nahi} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('nahi')} />
                    {simpleValidator.current.message('nahi', tipuldata.nahi, 'required')}
                  </FormGroup>
                </Col>
              </Row>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>מכלול משא"ן</div>

              <Row>
                <Col xs={12} >
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>ערך</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="mishan" value={tipuldata.mishan} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('mishan')} />
                    {simpleValidator.current.message('mishan', tipuldata.mishan, 'required')}
                  </FormGroup>
                </Col>
              </Row>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>מכלול הנדסה</div>

              <Row>
                <Col xs={12} >
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>ערך</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="handasa" value={tipuldata.handasa} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('handasa')} />
                    {simpleValidator.current.message('handasa', tipuldata.handasa, 'required')}
                  </FormGroup>
                </Col>
              </Row>


              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>מכלול תפעול</div>

              <Row>
                <Col xs={12} >
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>ערך</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="tifol" value={tipuldata.tifol} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('tifol')} />
                    {simpleValidator.current.message('tifol', tipuldata.tifol, 'required')}
                  </FormGroup>
                </Col>
              </Row>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>מכלול תש"א</div>

              <Row>
                <Col xs={12} >
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>ערך</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="tasha" value={tipuldata.tasha} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('tasha')} />
                    {simpleValidator.current.message('tasha', tipuldata.tasha, 'required')}
                  </FormGroup>
                </Col>
              </Row>
              <div style={{ fontSize: '18px', textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>מוכנות לוגיסטית לקליטת ימ"חים</div>
              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>ציוד לוגיסטי</div>

              <Row>
                <Col xs={12} >
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>ערך</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="logisticsequipment" value={tipuldata.logisticsequipment} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('logisticsequipment')} />
                    {simpleValidator.current.message('logisticsequipment', tipuldata.logisticsequipment, 'required')}
                  </FormGroup>
                </Col>
              </Row>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>ציוד ייעודי</div>

              <Row>
                <Col xs={12} >
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>ערך</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="dedicatedequipment" value={tipuldata.dedicatedequipment} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('dedicatedequipment')} />
                    {simpleValidator.current.message('dedicatedequipment', tipuldata.dedicatedequipment, 'required')}
                  </FormGroup>
                </Col>
              </Row>

              <div style={{ fontSize: '22px', textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>קיום ותשתיות</div>
              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>הימצאות גנרטור גיבוי לפי עומס נדרש</div>
              <Row>
                <Col xs={12} >
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>ערך</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="loadrequired" value={tipuldata.loadrequired} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('loadrequired')} />
                    {simpleValidator.current.message('loadrequired', tipuldata.loadrequired, 'required')}
                  </FormGroup>
                </Col>
              </Row>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>הימצאות חמ"ל ממוגן</div>
              <Row>
                <Col xs={12} >
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>ערך</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="hamal" value={tipuldata.hamal} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('hamal')} />
                    {simpleValidator.current.message('hamal', tipuldata.hamal, 'required')}
                  </FormGroup>
                </Col>
              </Row>


            </Container>
          </CardBody>
        </Card>
      </Col>
      <Col xs={12} md={6}>
        <Card>
          <CardBody>
            <Container>
              <div style={{ fontSize: '22px', textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>תורה ותפיסות</div>
              <div style={{ fontSize: '18px', textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>שבצ"ק</div>
              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>שיבוץ קרבי</div>
              <Row>
                <Col xs={12} >
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>ערך</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="shibozkravi" value={tipuldata.shibozkravi} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('shibozkravi')} />
                    {simpleValidator.current.message('shibozkravi', tipuldata.shibozkravi, 'required')}
                  </FormGroup>
                </Col>
              </Row>

              <div style={{ fontSize: '18px', textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>תוכנית אופרטיבית</div>
              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>אישור רמה ממונה</div>
              <Row>
                <Col xs={12} >
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>ערך</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="authorizedlevelapproval" value={tipuldata.authorizedlevelapproval} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('authorizedlevelapproval')} />
                    {simpleValidator.current.message('authorizedlevelapproval', tipuldata.authorizedlevelapproval, 'required')}
                  </FormGroup>
                </Col>
              </Row>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>אישור לרמה כפופה</div>
              <Row>
                <Col xs={12} >
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>ערך</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="subjectlevelapproval" value={tipuldata.subjectlevelapproval} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('subjectlevelapproval')} />
                    {simpleValidator.current.message('subjectlevelapproval', tipuldata.subjectlevelapproval, 'required')}
                  </FormGroup>
                </Col>
              </Row>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>פק"לים</div>
              <Row>
                <Col xs={12} >
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>ערך</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="pakalim" value={tipuldata.pakalim} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('pakalim')} />
                    {simpleValidator.current.message('pakalim', tipuldata.pakalim, 'required')}
                  </FormGroup>
                </Col>
              </Row>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>עזרים עפ"י תו"ל</div>
              <Row>
                <Col xs={12} >
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>ערך</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="azarim" value={tipuldata.azarim} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('azarim')} />
                    {simpleValidator.current.message('azarim', tipuldata.azarim, 'required')}
                  </FormGroup>
                </Col>
              </Row>

              <div style={{ fontSize: '22px', textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>אמל"ח וטכנולוגיה</div>
              <div style={{ fontSize: '18px', textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>מערכות ממוחשבות</div>
              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>מערכת יהלום</div>
              <Row>
                <Col xs={12} >
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>ערך</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="diamond" value={tipuldata.diamond} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('diamond')} />
                    {simpleValidator.current.message('diamond', tipuldata.diamond, 'required')}
                  </FormGroup>
                </Col>
              </Row>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>מערכת SAP</div>
              <Row>
                <Col xs={12} >
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>ערך</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="sap" value={tipuldata.sap} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('sap')} />
                    {simpleValidator.current.message('sap', tipuldata.sap, 'required')}
                  </FormGroup>
                </Col>
              </Row>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>אמצעי תקשוב עפ"י פק"ל</div>
              <Row>
                <Col xs={12} >
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>ערך</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="pakal" value={tipuldata.pakal} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('pakal')} />
                    {simpleValidator.current.message('pakal', tipuldata.pakal, 'required')}
                  </FormGroup>
                </Col>
              </Row>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>מערכת אירועים</div>
              <Row>
                <Col xs={12} >
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>ערך</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="eventsystem" value={tipuldata.eventsystem} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('eventsystem')} />
                    {simpleValidator.current.message('eventsystem', tipuldata.eventsystem, 'required')}
                  </FormGroup>
                </Col>
              </Row>

              <div style={{ fontSize: '22px', textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>אימונים והכשרות</div>
              <div style={{ fontSize: '18px', textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>אימוני חמ"ל המפעל</div>
              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>ביצוע מול תכנון עפ"י מודל חילי</div>
              <Row>
                <Col xs={12} >
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>ערך</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="executionversusplanning" value={tipuldata.executionversusplanning} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('executionversusplanning')} />
                    {simpleValidator.current.message('executionversusplanning', tipuldata.executionversusplanning, 'required')}
                  </FormGroup>
                </Col>
              </Row>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>איכות האימון</div>
              <Row>
                <Col xs={12} >
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>ערך</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="qualityoftraining" value={tipuldata.qualityoftraining} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('qualityoftraining')} />
                    {simpleValidator.current.message('qualityoftraining', tipuldata.qualityoftraining, 'required')}
                  </FormGroup>
                </Col>
              </Row>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>כמות משתתפים</div>
              <Row>
                <Col xs={12} >
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>ערך</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="numberofparticipants" value={tipuldata.numberofparticipants} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('numberofparticipants')} />
                    {simpleValidator.current.message('numberofparticipants', tipuldata.numberofparticipants, 'required')}
                  </FormGroup>
                </Col>
              </Row>

              <div style={{ fontSize: '18px', textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>תרגילים משלימים</div>
              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>מעמ"ל</div>
              <Row>
                <Col xs={12} >
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>ערך</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="mamal" value={tipuldata.mamal} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('mamal')} />
                    {simpleValidator.current.message('mamal', tipuldata.mamal, 'required')}
                  </FormGroup>
                </Col>
              </Row>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>רציפות תפקודית</div>
              <Row>
                <Col xs={12} >
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>ערך</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="operationalcontinuity" value={tipuldata.operationalcontinuity} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('operationalcontinuity')} />
                    {simpleValidator.current.message('operationalcontinuity', tipuldata.operationalcontinuity, 'required')}
                  </FormGroup>
                </Col>
              </Row>

            
              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>התאמת הכשרת יהלו"ם</div>
              <Row>
                <Col xs={12} >
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>ערך</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="trainingadjustment" value={tipuldata.trainingadjustment} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('trainingadjustment')} />
                    {simpleValidator.current.message('trainingadjustment', tipuldata.trainingadjustment, 'required')}
                  </FormGroup>
                </Col>
              </Row>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>סיכום</div>
              <Row>
                <Col xs={12} >
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>ערך</div>
                  <FormGroup dir="rtl" >
                    <Input type="number" bsSize="lg" name="sicom" value={tipuldata.sicom} onChange={handleChange}
                      onBlur={() => simpleValidator.current.showMessageFor('sicom')} />
                    {simpleValidator.current.message('sicom', tipuldata.sicom, 'required')}
                  </FormGroup>
                </Col>
              </Row>

             
           

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
export default withRouter(EditMashaKshirotPikodForm);;