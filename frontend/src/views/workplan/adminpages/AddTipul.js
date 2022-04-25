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
import { produce } from 'immer'
import { generate } from 'shortid'
import { toast } from "react-toastify";
const AddTipul = ({ match }) => {
  //react validator
  const simpleValidator = useRef(new SimpleReactValidator({
    messages: {
      default: 'נדרש למלא שדה זה'
    },
    element: message => <div style={{ background: '#F66C6C', textAlign: 'center', fontWeight: 'bold' }}>{message}</div>
  }))
  const [, forceUpdate] = useState();

  const [tipuldata, setTipulData] = useState({
    carnumber: '',
    pikod: '',
    ogda: '',
    hativa: '',
    gdod: '',
    magadal: '',
    magad: '',
    mkabaz: '',
    lastipuldate: '',
    zkaottipul: '',
    tipultype: '',
    tolarancedate: '',
    gofbizoa: '',
    //ploga: '',
    description: '',
    status: '',
  })

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
      AddTipul();
    }
  }

  function AddTipul() {//need to add logging
    const temptipul = tipuldata;
    axios.post(`http://localhost:8000/api/tipul`, temptipul)
      .then(res => {
        console.log(res.data._id)// returns current added temptraining id
        toast.success(`טיפול נוסף בהצלחה`);
        history.goBack();
      })
      .catch(error => {
      })
    console.log(temptipul);
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
  }, [])

  return (
    <Container style={{ paddingTop: '80px', direction: 'rtl' }}>

      <Row>
        <Col >
          <Card>
            <CardBody>

              <div style={{ fontSize: '18px', textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>הוספת תוכנית עבודה - מנהל</div>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>מספר צ'</div>
              <FormGroup dir="rtl" >
                <Input type="number" bsSize="lg" name="carnumber" value={tipuldata.carnumber} onChange={handleChange}
                  onBlur={() => simpleValidator.current.showMessageFor('carnumber')} />
                {simpleValidator.current.message('carnumber', tipuldata.carnumber, 'required')}
              </FormGroup>

              <Row>
                <Col xs={12} md={3}>
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>פיקוד</div>
                  <FormGroup dir="rtl" >
                    <Input type="select" name="pikod" value={tipuldata.pikod} onChange={handleChange}>
                      <option value={""}>פיקוד</option>
                      {pikods.map((pikod, index) => (
                        <option value={pikod._id}>{pikod.name}</option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col xs={12} md={3}>
                  <div style={{ textAlign: 'right', paddingTop: '10px' }}>אוגדה</div>
                  <FormGroup dir="rtl" >
                    <Input type="select" name="ogda" value={tipuldata.ogda} onChange={handleChange}>
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
                    <Input type="select" name="hativa" value={tipuldata.hativa} onChange={handleChange}>
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
                    <Input type="select" name="gdod" value={tipuldata.gdod} onChange={handleChange}>
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
                <Input type="select" bsSize="lg" name="magadal" value={tipuldata.magadal} onChange={handleChange}>
                  <option value="">בחר מאגד על</option>
                  {magadal.map((magadal, index) => (
                    <option value={magadal._id}>{magadal.name}</option>
                  ))}

                </Input>
              </FormGroup>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>מאגד</div>
              <FormGroup dir="rtl" >
                <Input type="select" bsSize="lg" name="magad" value={tipuldata.magad} onChange={handleChange}>
                  <option value="">בחר מאגד</option>
                  {magad.map((magad, index) => (
                    <option value={magad._id}>{magad.name}</option>
                  ))}
                </Input>
              </FormGroup>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>מקבץ</div>

              <FormGroup dir="rtl" >
                <Input type="select" bsSize="lg" name="mkabaz" value={tipuldata.mkabaz} onChange={handleChange}>
                  <option value="">בחר מקבץ</option>
                  {mkabaz.map((mkabaz, index) => (
                    <option value={mkabaz._id}>{mkabaz.name}</option>
                  ))}
                </Input>
              </FormGroup>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>תאריך טיפול אחרון</div>
              <FormGroup dir="rtl" >
                <Input type="date" name="lastipuldate" value={tipuldata.lastipuldate} onChange={handleChange}
                  onBlur={() => simpleValidator.current.showMessageFor('lastipuldate')} />
                {simpleValidator.current.message('lastipuldate', tipuldata.lastipuldate, 'required')}
              </FormGroup>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>סוג טיפול זכאות</div>
              <FormGroup dir="rtl" >
                <Input type="select" bsSize="lg" name="zkaottipul" value={tipuldata.zkaottipul} onChange={handleChange}>
                  <option value="">בחר סוג טיפול זכאות </option>
                  {zkaottipul.map((zkaottipul, index) => (
                    <option value={zkaottipul._id}>{zkaottipul.name}</option>
                  ))}
                </Input>
              </FormGroup>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>סוג טיפול בפועל</div>
              <FormGroup dir="rtl" >
                <Input type="select" bsSize="lg" name="tipultype" value={tipuldata.tipultype} onChange={handleChange}>
                  <option value="">בחר סוג טיפול בפועל</option>
                  {tipultype.map((tipultype, index) => (
                    <option value={tipultype._id}>{tipultype.name}</option>
                  ))}
                </Input>
              </FormGroup>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>תאריך טולרנס עליון</div>
              <FormGroup dir="rtl" >
                <Input type="date" name="tolarancedate" value={tipuldata.tolarancedate} onChange={handleChange}
                  onBlur={() => simpleValidator.current.showMessageFor('tolarancedate')} />
                {simpleValidator.current.message('tolarancedate', tipuldata.tolarancedate, 'required')}
              </FormGroup>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>גוף ביצוע</div>

              <FormGroup dir="rtl" >
                <Input type="select" bsSize="lg" name="gofbizoa" value={tipuldata.gofbizoa} onChange={handleChange}>
                  <option value="">בחר גוף ביצוע</option>
                  {gofbizoa.map((gofbizoa, index) => (
                    <option value={gofbizoa._id}>{gofbizoa.name}</option>
                  ))}
                </Input>
              </FormGroup>

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>הערות</div>

              <FormGroup dir="rtl" >
                <Input type="teatarea" bsSize="lg" name="description" value={tipuldata.description} onChange={handleChange} />

              </FormGroup>

              {/* <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>קבצים מצורפים</div>
              <FormGroup dir="rtl" >
              </FormGroup> */}

              <div style={{ textAlign: 'right', paddingTop: '10px', fontWeight: "bold" }}>סטטוס</div>
              <FormGroup dir="rtl" >
                <Input type="select" bsSize="lg" name="status" value={tipuldata.status} onChange={handleChange}>
                  {status.map((status, index) => (
                    <option value={status._id}>{status.name}</option>
                  ))}
                </Input>
              </FormGroup>

              <div style={{ textAlign: 'center' }}>
                <button className="btn btn-primary" onClick={clickSubmit}>הוסף טיפול</button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container >
  );
}
export default withRouter(AddTipul);;