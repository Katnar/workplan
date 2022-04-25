import React, { useState, useEffect, useRef } from 'react';
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
import history from '../../../history'
import { toast } from "react-toastify";
const EditTipul = ({ match }) => {
  //react validator
  const simpleValidator = useRef(new SimpleReactValidator({
    messages: {
      default: 'נדרש למלא שדה זה'
    },
    element: message => <div style={{ background: '#F66C6C', textAlign: 'center', fontWeight: 'bold' }}>{message}</div>
  }))
  const [, forceUpdate] = useState();

  const [tipuldata, setTipulData] = useState({})
  const [historytipuldata, setHistoryTipulData] = useState({})

  const [gdods, setGdods] = useState([]);
  const [hativas, setHativas] = useState([]);
  const [ogdas, setOgdas] = useState([]);
  const [pikods, setPikods] = useState([]);
  const [magad, setMagad] = useState([]);
  const [magadal, setMagadal] = useState([]);
  const [mkabaz, setMkabaz] = useState([]);
  const [status, setStatus] = useState([]);
  const [tipultype, setTipultype] = useState([]);
  const [zkaottipul, setZakaottipul] = useState([]);
  const [gofbizoa, setGofbizoa] = useState([]);
  const [sadnabizoa, setSadnabizoa] = useState([]);
  const [gdodbizoa, setGdodbizoa] = useState([]);
  const [carteam, setCarteam] = useState([]);

  const loadGdods = () => {
    axios.get("http://localhost:8000/api/gdod")
      .then(response => {
        setGdods(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }


  const loadHativas = () => {
    axios.get("http://localhost:8000/api/hativa",)
      .then(response => {
        setHativas(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const loadOgdas = () => {
    axios.get("http://localhost:8000/api/ogda",)
      .then(response => {
        setOgdas(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const loadPikods = () => {
    axios.get("http://localhost:8000/api/pikod",)
      .then(response => {
        setPikods(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }
  const loadMagad = () => {
    axios.get("http://localhost:8000/api/magad")
      .then(response => {
        setMagad(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }
  const loadMagadal = () => {
    axios.get("http://localhost:8000/api/magadal")
      .then(response => {
        setMagadal(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }


  const loadMkabaz = () => {
    axios.get("http://localhost:8000/api/mkabaz")
      .then(response => {
        setMkabaz(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }
  const loadStatus = () => {
    axios.get("http://localhost:8000/api/status")
      .then(response => {
        setStatus(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }
  const loadTipultype = () => {
    axios.get("http://localhost:8000/api/tipultype")
      .then(response => {
        setTipultype(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }
  const loadZakaottipul = () => {
    axios.get("http://localhost:8000/api/zkaottipul")
      .then(response => {
        setZakaottipul(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }
  const loadGofbizoa = () => {
    axios.get("http://localhost:8000/api/gofbizoa")
      .then(response => {
        setGofbizoa(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }
  const loadGdodbizoa = () => {
    axios.get("http://localhost:8000/api/gdodbizoa")
      .then(response => {
        setGdodbizoa(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const loadSadnabizoa = () => {
    axios.get("http://localhost:8000/api/sadnabizoa")
      .then(response => {
        setSadnabizoa(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const loadCarTeam = () => {
    axios.get("http://localhost:8000/api/carteam")
      .then(response => {
        setCarteam(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function handleChange(evt) {
    const value = evt.target.value;
    setTipulData({ ...tipuldata, [evt.target.name]: value });
  }

  const clickSubmit = event => {
    const formValid = simpleValidator.current.allValid()
    if (!formValid) {
      simpleValidator.current.showMessages()
      forceUpdate(1)
    } else {
      UpdateTipul();
    }
  }
  const arr = {
    
  }

  async function UpdateTipul() {//need to add logging
    var temptipul = tipuldata;
    var temphistorytipul = historytipuldata;
    var tipulidtemp = match.params.tipulid;

    temphistorytipul.originaltipulid = tipuldata._id;
    delete temphistorytipul._id; //cant send _id 
    delete temphistorytipul.createdAt; //fix the date
    delete temphistorytipul.updatedAt; //fix the date  
    await axios.post(`http://localhost:8000/api/historytipul`, temphistorytipul)
      .then(res => {
        console.log(res.data)
      })
      .catch(error => {

      })

      if(temptipul.carteam = [""]){
        temptipul.carteam = null
      }
      if(temptipul.sadnabizoa = [""]){
        temptipul.sadnabizoa = null
      }
      if(temptipul.gdodbizoa = [""]){
        temptipul.gdodbizoa = null
      }
      

    temptipul.originaltipulid = tipulidtemp;
    delete temptipul._id; //cant send _id 
    delete temptipul.createdAt; //fix the date
    delete temptipul.updatedAt; //fix the date  
    
    console.log(temptipul)
    await axios.post(`http://localhost:8000/api/activetipul`, temptipul)
      .then(res => {
        toast.success(`הטיפול עודכן בהצלחה`);
        history.goBack();
      })
      .catch(error => {

      })
  }

  function init() {
    var tipulidtemp = match.params.tipulid;
    axios.get(`http://localhost:8000/api/tipulbyid/${tipulidtemp}`)//need to make a new backend route
      .then(res => {
        var temptipul = res.data[0];
        temptipul.lastipuldate = temptipul.lastipuldate.slice(0, 10);
        temptipul.tolarancedate = temptipul.tolarancedate.slice(0, 10);
        setTipulData(temptipul);
        setHistoryTipulData(temptipul);
      })
      .catch(error => {

      })
  }

  useEffect(() => {
    loadGdods();
    loadHativas();
    loadOgdas();
    loadPikods();
    loadMagad();
    loadMagadal();
    loadMkabaz();
    loadStatus();
    loadTipultype();
    loadZakaottipul();
    loadGofbizoa();
    loadGdodbizoa();
    loadSadnabizoa();
    loadCarTeam();
  }, [])

  useEffect(() => {
    init();
  }, [])

  return (
    <Container style={{ paddingTop: '40px', direction: 'rtl' }}>
      <Card>
        <CardBody>

          <div style={{ fontSize: '18px', textAlign: 'center', paddingTop: '10px', fontWeight: "bold" }}>עריכת טיפול</div>

          <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>מספר צ'</div>
          <FormGroup dir="rtl" >
            <Input type="text" bsSize="lg" name="carnumber" value={tipuldata.carnumber} onChange={handleChange}
              onBlur={() => simpleValidator.current.showMessageFor('carnumber')} disabled />
            {simpleValidator.current.message('carnumber', tipuldata.carnumber, 'required')}
          </FormGroup>
          {tipuldata.car ?
            <>
              <Row>
                <Col xs={12} md={3}>
                  <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>פיקוד</div>
                  <FormGroup dir="rtl" >
                    <Input type="select" name="pikod" value={tipuldata.car.gdod.hativa.ogda.pikod._id} onChange={handleChange} disabled>
                      <option value={""}>פיקוד</option>
                      {pikods.map((pikod, index) => (
                        <option value={pikod._id}>{pikod.name}</option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col xs={12} md={3}>
                  <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>אוגדה</div>
                  <FormGroup dir="rtl" >
                    <Input type="select" name="ogda" value={tipuldata.car.gdod.hativa.ogda._id} onChange={handleChange} disabled>
                      <option value={""}>אוגדה</option>
                      {ogdas.map((ogda, index) => (
                        <option value={ogda._id}>{ogda.name}</option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col xs={12} md={3}>
                  <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>חטיבה</div>
                  <FormGroup dir="rtl" >
                    <Input type="select" name="hativa" value={tipuldata.car.gdod.hativa._id} onChange={handleChange} disabled>
                      <option value={""}>חטיבה</option>
                      {hativas.map((hativa, index) => (
                        <option value={hativa._id}>{hativa.name}</option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col xs={12} md={3}>
                  <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>גדוד</div>
                  <FormGroup dir="rtl" >
                    <Input type="select" name="gdod" value={tipuldata.car.gdod._id} onChange={handleChange} disabled>
                      <option value={""}>גדוד</option>
                      {gdods.map((gdod, index) => (
                        <option value={gdod._id}>{gdod.name}</option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>מאגד על</div>
              <FormGroup dir="rtl" >
                <Input type="select" bsSize="lg" name="magadal" value={tipuldata.car.mkat.mkabaz.magad.magadal._id} onChange={handleChange} disabled>
                  <option value="">בחר מאגד על</option>
                  {magadal.map((magadal, index) => (
                    <option value={magadal._id}>{magadal.name}</option>
                  ))}

                </Input>
              </FormGroup>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>מאגד</div>
              <FormGroup dir="rtl" >
                <Input type="select" bsSize="lg" name="magad" value={tipuldata.car.mkat.mkabaz.magad._id} onChange={handleChange} disabled>
                  <option value="">בחר מאגד</option>
                  {magad.map((magad, index) => (
                    <option value={magad._id}>{magad.name}</option>
                  ))}
                </Input>
              </FormGroup>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>מקבץ</div>

              <FormGroup dir="rtl" >
                <Input type="select" bsSize="lg" name="mkabaz" value={tipuldata.car.mkat.mkabaz._id} onChange={handleChange} disabled>
                  <option value="">בחר מקבץ</option>
                  {mkabaz.map((mkabaz, index) => (
                    <option value={mkabaz._id}>{mkabaz.name}</option>
                  ))}
                </Input>
              </FormGroup>
            </> : null}

          <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>תאריך טיפול אחרון</div>
          <FormGroup dir="rtl" >
            <Input type="date" name="lastipuldate" value={tipuldata.lastipuldate} onChange={handleChange}
              onBlur={() => simpleValidator.current.showMessageFor('lastipuldate')} />
            {simpleValidator.current.message('lastipuldate', tipuldata.lastipuldate, 'required')}
          </FormGroup>

          {tipuldata.zkaottipul ?
            <>
              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>סוג טיפול זכאות</div>
              <FormGroup dir="rtl" >
                <Input type="select" bsSize="lg" name="zkaottipul" value={tipuldata.zkaottipul._id} onChange={handleChange}>
                  <option value="">בחר סוג טיפול זכאות </option>
                  {zkaottipul.map((zkaottipul, index) => (
                    <option value={zkaottipul._id}>{zkaottipul.name}</option>
                  ))}
                </Input>
              </FormGroup>
            </> :
            <>
              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>סוג טיפול זכאות</div>
              <FormGroup dir="rtl" >
                <Input type="select" bsSize="lg" name="zkaottipul" onChange={handleChange}>
                  <option value="">בחר סוג טיפול זכאות </option>
                  {zkaottipul.map((zkaottipul, index) => (
                    <option value={zkaottipul._id}>{zkaottipul.name}</option>
                  ))}
                </Input>
              </FormGroup>
            </>}

          {tipuldata.tipultype ?
            <>
              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>סוג טיפול בפועל</div>
              <FormGroup dir="rtl" >
                <Input type="select" bsSize="lg" name="tipultype" value={tipuldata.tipultype._id} onChange={handleChange}>
                  <option value="">בחר סוג טיפול בפועל</option>
                  {tipultype.map((tipultype, index) => (
                    <option value={tipultype._id}>{tipultype.name}</option>
                  ))}
                </Input>
              </FormGroup>
            </> :
            <>
              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>סוג טיפול בפועל</div>
              <FormGroup dir="rtl" >
                <Input type="select" bsSize="lg" name="tipultype" onChange={handleChange}>
                  <option value="">בחר סוג טיפול בפועל</option>
                  {tipultype.map((tipultype, index) => (
                    <option value={tipultype._id}>{tipultype.name}</option>
                  ))}
                </Input>
              </FormGroup>
            </>}

          <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>תאריך טולרנס עליון</div>
          <FormGroup dir="rtl" >
            <Input type="date" name="tolarancedate" value={tipuldata.tolarancedate} onChange={handleChange}
              onBlur={() => simpleValidator.current.showMessageFor('tolarancedate')} />
            {simpleValidator.current.message('tolarancedate', tipuldata.tolarancedate, 'required')}
          </FormGroup>

          {tipuldata.gofbizoa ?
            <>
              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>גוף ביצוע</div>
              <FormGroup dir="rtl" >
                <Input type="select" bsSize="lg" name="gofbizoa" value={tipuldata.gofbizoa._id} onChange={handleChange}>
                  <option value="">בחר גוף ביצוע</option>
                  {gofbizoa.map((gofbizoa, index) => (
                    <option value={gofbizoa._id}>{gofbizoa.name}</option>
                  ))}
                </Input>
              </FormGroup>
            </> :
            <>
              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>גוף ביצוע</div>
              <FormGroup dir="rtl" >
                <Input type="select" bsSize="lg" name="gofbizoa" onChange={handleChange}>
                  <option value="">בחר גוף ביצוע</option>
                  {gofbizoa.map((gofbizoa, index) => (
                    <option value={gofbizoa._id}>{gofbizoa.name}</option>
                  ))}
                </Input>
              </FormGroup>
            </>}

          <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>הערות</div>
          <FormGroup dir="rtl" >
            <Input type="teatarea" bsSize="lg" name="description" value={tipuldata.description} onChange={handleChange} />
          </FormGroup>

          {/* <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>קבצים מצורפים</div>
            <FormGroup dir="rtl" >
            </FormGroup> */}

          {tipuldata.status ?
            <>
              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>סטטוס</div>
              <FormGroup dir="rtl" >
                <Input type="select" bsSize="lg" name="status" value={tipuldata.status._id} onChange={handleChange}>
                  <option value="">בחר סטטוס</option>
                  {status.map((status, index) => (
                    <option value={status._id}>{status.name}</option>
                  ))}
                </Input>
              </FormGroup>
            </> :
            <>
              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>סטטוס</div>
              <FormGroup dir="rtl" >
                <Input type="select" bsSize="lg" name="status" onChange={handleChange}>
                  <option value="">בחר סטטוס</option>
                  {status.map((status, index) => (
                    <option value={status._id}>{status.name}</option>
                  ))}
                </Input>
              </FormGroup>
            </>}

          {tipuldata.gdodbizoa ?
            <>
              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>גדוד לביצוע</div>
              <FormGroup dir="rtl" >
                <Input type="select" bsSize="lg" name="gdodbizoa" value={tipuldata.gdodbizoa} onChange={handleChange}>
                  <option value="">בחר גדוד</option>
                  {gdodbizoa.map((data, index) => (
                    <option value={data._id}>{data.name}</option>
                  ))}
                </Input>
              </FormGroup>
            </>
            : <>
              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>גדוד לביצוע</div>
              <FormGroup dir="rtl" >
                <Input type="select" bsSize="lg" name="gdodbizoa" value={arr} onChange={handleChange}>
                  <option value="">בחר גדוד</option>
                  {gdodbizoa.map((data, index) => (
                    <option value={data._id}>{data.name}</option>
                  ))}
                </Input>
              </FormGroup>
            </>}

          {tipuldata.sadnabizoa ?
            <>
              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>סדנא לביצוע</div>
              <FormGroup dir="rtl" >
                <Input type="select" bsSize="lg" name="sadnabizoa" value={tipuldata.sadnabizoa} onChange={handleChange}>
                  <option value="">בחר סדנא</option>
                  {sadnabizoa.map((data, index) => (
                    <option value={data._id}>{data.name}</option>
                  ))}
                </Input>
              </FormGroup>
            </>
            : <>
              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>סדנא לביצוע</div>
              <FormGroup dir="rtl" >
                <Input type="select" bsSize="lg" name="sadnabizoa" value={arr} onChange={handleChange}>
                  <option value="">בחר סדנא</option>
                  {sadnabizoa.map((data, index) => (
                    <option value={data._id}>{data.name}</option>
                  ))}
                </Input>
              </FormGroup>
            </>}

          {tipuldata.carteam ?
            <>
              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>קבוצת רכבים</div>
              <FormGroup dir="rtl" >
                <Input type="select" bsSize="lg" name="carteam" value={tipuldata.carteam} onChange={handleChange}>
                  <option value="">בחר קבוצת רכבים</option>
                  {carteam.map((data, index) => (
                    <option value={data._id}>{data.name}</option>
                  ))}
                </Input>
              </FormGroup>
            </>
            : <>
              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>קבוצת רכבים</div>
              <FormGroup dir="rtl" >
                <Input type="select" bsSize="lg" name="carteam" value={arr} onChange={handleChange}>
                  <option value="">בחר קבוצת רכבים</option>
                  {carteam.map((data, index) => (
                    <option value={data._id}>{data.name}</option>
                  ))}
                </Input>
              </FormGroup>
            </>}
          <div style={{ textAlign: 'center' }}>
            <button className="btn btn-primary" onClick={clickSubmit}>ערוך טיפול</button>
          </div>
        </CardBody>
      </Card>
    </Container >
  );
}
export default withRouter(EditTipul);;