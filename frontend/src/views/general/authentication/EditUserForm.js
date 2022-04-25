import React, { useState, useEffect } from 'react';
import { withRouter, Redirect } from "react-router-dom";

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
import ToggleButton from "react-toggle-button";
import axios from 'axios';
import history from 'history.js'
import { toast } from "react-toastify";

const EditUserForm = ({ match }) => {
    const [data, setData] = useState({
        name: '',
        lastname: '',
        personalnumber: '',
        password: '',
        validated: '',
        gdodid: '',
        hativaid: '',
        ogdaid: '',
        pikodid: '',
        zminot:"",
        kshirot:"",
        adam:"",
        workplan:"",
    })
  
    const [gdods, setGdods] = useState([]);
    const [hativas, setHativas] = useState([]);
    const [ogdas, setOgdas] = useState([]);
    const [pikods, setPikods] = useState([]);

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

    function handleChange(evt) {
        const value = evt.target.value;
        setData({ ...data, [evt.target.name]: value });
    }

    const clickSubmit = event => {
        CheckSignUpForm(event)
    }

    const CheckSignUpForm = (event) => {
        event.preventDefault();
        var flag = true;
        var ErrorReason = '';
        if (data.name == "") {
          flag = false;
          ErrorReason += 'שם ריק \n'
        }
        if (data.lastname == "") {
          flag = false;
          ErrorReason += 'שם משפחה ריק \n'
        }
        if (data.personalnumber == "") {
          flag = false;
          ErrorReason += 'מס אישי ריק \n'
        }
        if (data.password == "") {
          flag = false;
          ErrorReason += 'סיסמא ריקה \n'
        }
        if (data.role == "") {
          flag = false;
          ErrorReason += 'הרשאה ריקה \n'
        }
        else{
          if (data.role === "0") {
    
          }
          if (data.role === "1") {
            if (data.gdodid === "") {
              flag = false;
              ErrorReason += 'גדוד ריק \n'
            }
          }
          if (data.role === "2") {
            if (data.hativaid === "") {
              flag = false;
              ErrorReason += 'חטיבה ריקה \n'
            }
          }
          if (data.role === "3") {
            if (data.ogdaid === "") {
              flag = false;
              ErrorReason += 'אוגדה ריקה \n'
            }
          }
          if (data.role === "4") {
            if (data.pikodid === "") {
              flag = false;
              ErrorReason += 'פיקוד ריק \n'
            }
          }
        }
        
        if (flag == true) {
          FixUser(event);
        }
        else {
         toast.error(ErrorReason)
        }
      }

      const FixUser = (event) => { //doesnt work on edit.. need to figure out what to do
        event.preventDefault();
        if (data.role === '0') {
          delete data.gdodid;
          delete data.hativaid;
          delete data.ogdaid;
          delete data.pikodid;
        }
        if (data.role === '1') {
          delete data.hativaid;
          delete data.ogdaid;
          delete data.pikodid;
        }
        if (data.role === '2') {
          delete data.gdodid;
          delete data.ogdaid;
          delete data.pikodid;
        }
        if (data.role === '3') {
          delete data.gdodid;
          delete data.hativaid;
          delete data.pikodid;
        }
        if (data.role === '4') {
          delete data.gdodid;
          delete data.hativaid;
          delete data.ogdaid;
        }
        UpdateUser(event);
      }

      const UpdateUser = () => {
        var userid = match.params.userid;
        const user = {
          name: data.name,
          lastname: data.lastname,
          password: data.password,
          personalnumber: data.personalnumber,
          validated: data.validated,
          pikod: data.pikod,
          ogda: data.ogda,
          hativa: data.hativa,
          gdodid: data.gdodid,
          hativaid: data.hativaid,
          ogdaid: data.ogdaid,
          pikodid: data.pikodid,
          role: data.role,
          zminot: data.zminot,
          kshirot: data.kshirot,
          adam: data.adam,
          workplan: data.workplan,
        };
        axios.put(`http://localhost:8000/api/user/update/${userid}`, user)
            .then(response => {
                console.log(response);
                toast.success(`המשתמש עודכן בהצלחה`);
                history.push(`/manageusers`);
            })
            .catch((error) => {
                console.log(error);
            })
      }

    const init = () => {
        var userid = match.params.userid;
        axios.post("http://localhost:8000/api/getuserbyid", { userid })
            .then(response => {
                setData(response.data);
                // setAdam(response.data.adam)
                // setKshirot(response.data.kshirot)
                // setZminot(response.data.zminot)
                // setWorkplan(response.data.workplan)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        init();
        loadGdods();
        loadHativas();
        loadOgdas();
        loadPikods();
    }, [])

    useEffect(() => {
        setData({ ...data, password: data.personalnumber });
    }, [data.personalnumber])

    return (
        <div className="">
            <Container>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader style={{ direction: 'rtl' }}>
                                <CardTitle tag="h4" style={{ direction: 'rtl', textAlign: 'right' }}>ערוך משתמש: {data.name} {data.lastname}</CardTitle>{/*headline*/}
                            </CardHeader>

                            <CardBody >
                                <Container>
                                    <Form role="form" style={{ direction: 'rtl' }}>

                                        <div style={{ textAlign: 'right', paddingTop: '10px' }}>שם פרטי</div>
                                        <FormGroup>
                                            <Input placeholder="שם פרטי" type="string" name="name" value={data.name} onChange={handleChange} />
                                        </FormGroup>

                                        <div style={{ textAlign: 'right', paddingTop: '10px' }}>שם משפחה</div>
                                        <FormGroup>
                                            <Input placeholder="שם משפחה" type="string" name="lastname" value={data.lastname} onChange={handleChange} />
                                        </FormGroup>

                                        <div style={{ textAlign: 'right', paddingTop: '10px' }}>מספר אישי</div>
                                        <FormGroup >
                                            <Input placeholder="מספר אישי" type="string" name="personalnumber" value={data.personalnumber} onChange={handleChange} />
                                        </FormGroup>

                                        {/*<div style={{ textAlign: 'right', paddingTop: '10px' }}>סיסמא</div>
                                        <FormGroup>
                                            <Input placeholder="סיסמא (אופציונלי)" type="password" name="password" value={data.password} onChange={handleChange} />
                                        </FormGroup>*/}

                                        <div style={{ textAlign: 'right', paddingTop: '10px' }}>הרשאה</div>
                                        <FormGroup dir="rtl" >
                                            <Input type="select" name="role" value={data.role} onChange={handleChange}>
                                                <option value="">הרשאה</option>
                                                <option value="0">מנהל מערכת</option>
                                                <option value="1">הרשאת גדוד</option>
                                                <option value="2">הרשאת חטיבה</option>
                                                <option value="3">הרשאת אוגדה</option>
                                                <option value="4">הרשאת פיקוד</option>
                                            </Input>
                                        </FormGroup>

                                        {data.role === '0' ?
                    <div>מנהל מערכת</div>
                    : data.role === '1' ?
                      <>
                        <div style={{ textAlign: 'right', paddingTop: '10px' }}>גדוד</div>
                        <FormGroup dir="rtl" >
                          <Input type="select" name="gdodid" value={data.gdodid} onChange={handleChange}>
                            <option value={""}>גדוד</option>
                            {gdods.map((gdod, index) => (
                              <option value={gdod._id}>{gdod.name}</option>
                            ))}
                          </Input>
                        </FormGroup>
                      </>
                      : data.role === '2' ?
                      <>
                      <div style={{ textAlign: 'right', paddingTop: '10px' }}>חטיבה</div>
                      <FormGroup dir="rtl" >
                        <Input type="select" name="hativaid" value={data.hativaid} onChange={handleChange}>
                          <option value={""}>חטיבה</option>
                          {hativas.map((hativa, index) => (
                            <option value={hativa._id}>{hativa.name}</option>
                          ))}
                        </Input>
                      </FormGroup>
                    </>
                        : data.role === '3' ?
                        <>
                        <div style={{ textAlign: 'right', paddingTop: '10px' }}>אוגדה</div>
                        <FormGroup dir="rtl" >
                          <Input type="select" name="ogdaid" value={data.ogdaid} onChange={handleChange}>
                            <option value={""}>אוגדה</option>
                            {ogdas.map((ogda, index) => (
                              <option value={ogda._id}>{ogda.name}</option>
                            ))}
                          </Input>
                        </FormGroup>
                      </>
                          : data.role === '4' ?
                          <>
                          <div style={{ textAlign: 'right', paddingTop: '10px' }}>פיקוד</div>
                          <FormGroup dir="rtl" >
                            <Input type="select" name="pikodid" value={data.pikodid} onChange={handleChange}>
                              <option value={""}>פיקוד</option>
                              {pikods.map((pikod, index) => (
                                <option value={pikod._id}>{pikod.name}</option>
                              ))}
                            </Input>
                          </FormGroup>
                        </>
                            : data.role === '' ?
                              <div>נא להכניס הרשאה</div> : null}

                                        <div style={{ textAlign: 'right', paddingTop: '10px' }}>מאושר/לא מאושר מערכת</div>
                                        <FormGroup>
                                            <Input type="select" name="validated" value={data.validated} onChange={handleChange}>
                                                <option value={true}>מאושר</option>
                                                <option value={false}>לא מאושר</option>
                                            </Input>
                                        </FormGroup>

                                        <Row>
                     
                     <Col>
                      
                         <div style={{ textAlign: "right", paddingTop: "10px" }}>
                           זמינות
                         </div>
                         <FormGroup dir="rtl">
                         <Input
                         type="select"
                         name="zminot"
                         value={data.zminot}
                         onChange={handleChange}
                       >
                         <option value="">סוג הרשאה</option>
                         <option value="0">רשאי</option>
                         <option value="1">צפייה</option>
                         <option value="2">לא רשאי</option>
                         
                       </Input>
                         </FormGroup>
   
                         <div style={{ textAlign: "right", paddingTop: "10px" }}>
                           כשירות
                         </div>
                         <FormGroup dir="rtl">
                         <Input
                         type="select"
                         name="kshirot"
                         value={data.kshirot}
                         onChange={handleChange}
                       >
                         <option value="">סוג הרשאה</option>
                         <option value="0">רשאי</option>
                         <option value="1">צפייה</option>
                         <option value="2">לא רשאי</option>
                         
                       </Input>
                         </FormGroup>
                         </Col>
                         <Col>
                         <div style={{ textAlign: "right", paddingTop: "10px" }}>
                           תוכנית עבודה
                         </div>
                         <FormGroup dir="rtl">
                         <Input
                         type="select"
                         name="workplan"
                         value={data.workplan}
                         onChange={handleChange}
                       >
                         <option value="">סוג הרשאה</option>
                         <option value="0">רשאי</option>
                         <option value="1">צפייה</option>
                         <option value="2">לא רשאי</option>
                         
                       </Input>
                         </FormGroup>
   
                         <div style={{ textAlign: "right", paddingTop: "10px" }}>
                           כוח אדם
                         </div>
                         <FormGroup dir="rtl">
                         <Input
                         type="select"
                         name="adam"
                         value={data.adam}
                         onChange={handleChange}
                       >
                         <option value="">סוג הרשאה</option>
                         <option value="0">רשאי</option>
                         <option value="1">צפייה</option>
                         <option value="2">לא רשאי</option>
                         
                       </Input>
                         </FormGroup>
                         </Col>
                       </Row>
                                        <div className="text-center">
                                            <button onClick={clickSubmit} className="btn btn-primary">עדכן</button>
                                        </div>
                                    </Form>
                                </Container>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default withRouter(EditUserForm);;
