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
          ErrorReason += '???? ?????? \n'
        }
        if (data.lastname == "") {
          flag = false;
          ErrorReason += '???? ?????????? ?????? \n'
        }
        if (data.personalnumber == "") {
          flag = false;
          ErrorReason += '???? ???????? ?????? \n'
        }
        if (data.password == "") {
          flag = false;
          ErrorReason += '?????????? ???????? \n'
        }
        if (data.role == "") {
          flag = false;
          ErrorReason += '?????????? ???????? \n'
        }
        else{
          if (data.role === "0") {
    
          }
          if (data.role === "1") {
            if (data.gdodid === "") {
              flag = false;
              ErrorReason += '???????? ?????? \n'
            }
          }
          if (data.role === "2") {
            if (data.hativaid === "") {
              flag = false;
              ErrorReason += '?????????? ???????? \n'
            }
          }
          if (data.role === "3") {
            if (data.ogdaid === "") {
              flag = false;
              ErrorReason += '?????????? ???????? \n'
            }
          }
          if (data.role === "4") {
            if (data.pikodid === "") {
              flag = false;
              ErrorReason += '?????????? ?????? \n'
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
                toast.success(`???????????? ?????????? ????????????`);
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
                                <CardTitle tag="h4" style={{ direction: 'rtl', textAlign: 'right' }}>???????? ??????????: {data.name} {data.lastname}</CardTitle>{/*headline*/}
                            </CardHeader>

                            <CardBody >
                                <Container>
                                    <Form role="form" style={{ direction: 'rtl' }}>

                                        <div style={{ textAlign: 'right', paddingTop: '10px' }}>???? ????????</div>
                                        <FormGroup>
                                            <Input placeholder="???? ????????" type="string" name="name" value={data.name} onChange={handleChange} />
                                        </FormGroup>

                                        <div style={{ textAlign: 'right', paddingTop: '10px' }}>???? ??????????</div>
                                        <FormGroup>
                                            <Input placeholder="???? ??????????" type="string" name="lastname" value={data.lastname} onChange={handleChange} />
                                        </FormGroup>

                                        <div style={{ textAlign: 'right', paddingTop: '10px' }}>???????? ????????</div>
                                        <FormGroup >
                                            <Input placeholder="???????? ????????" type="string" name="personalnumber" value={data.personalnumber} onChange={handleChange} />
                                        </FormGroup>

                                        {/*<div style={{ textAlign: 'right', paddingTop: '10px' }}>??????????</div>
                                        <FormGroup>
                                            <Input placeholder="?????????? (??????????????????)" type="password" name="password" value={data.password} onChange={handleChange} />
                                        </FormGroup>*/}

                                        <div style={{ textAlign: 'right', paddingTop: '10px' }}>??????????</div>
                                        <FormGroup dir="rtl" >
                                            <Input type="select" name="role" value={data.role} onChange={handleChange}>
                                                <option value="">??????????</option>
                                                <option value="0">???????? ??????????</option>
                                                <option value="1">?????????? ????????</option>
                                                <option value="2">?????????? ??????????</option>
                                                <option value="3">?????????? ??????????</option>
                                                <option value="4">?????????? ??????????</option>
                                            </Input>
                                        </FormGroup>

                                        {data.role === '0' ?
                    <div>???????? ??????????</div>
                    : data.role === '1' ?
                      <>
                        <div style={{ textAlign: 'right', paddingTop: '10px' }}>????????</div>
                        <FormGroup dir="rtl" >
                          <Input type="select" name="gdodid" value={data.gdodid} onChange={handleChange}>
                            <option value={""}>????????</option>
                            {gdods.map((gdod, index) => (
                              <option value={gdod._id}>{gdod.name}</option>
                            ))}
                          </Input>
                        </FormGroup>
                      </>
                      : data.role === '2' ?
                      <>
                      <div style={{ textAlign: 'right', paddingTop: '10px' }}>??????????</div>
                      <FormGroup dir="rtl" >
                        <Input type="select" name="hativaid" value={data.hativaid} onChange={handleChange}>
                          <option value={""}>??????????</option>
                          {hativas.map((hativa, index) => (
                            <option value={hativa._id}>{hativa.name}</option>
                          ))}
                        </Input>
                      </FormGroup>
                    </>
                        : data.role === '3' ?
                        <>
                        <div style={{ textAlign: 'right', paddingTop: '10px' }}>??????????</div>
                        <FormGroup dir="rtl" >
                          <Input type="select" name="ogdaid" value={data.ogdaid} onChange={handleChange}>
                            <option value={""}>??????????</option>
                            {ogdas.map((ogda, index) => (
                              <option value={ogda._id}>{ogda.name}</option>
                            ))}
                          </Input>
                        </FormGroup>
                      </>
                          : data.role === '4' ?
                          <>
                          <div style={{ textAlign: 'right', paddingTop: '10px' }}>??????????</div>
                          <FormGroup dir="rtl" >
                            <Input type="select" name="pikodid" value={data.pikodid} onChange={handleChange}>
                              <option value={""}>??????????</option>
                              {pikods.map((pikod, index) => (
                                <option value={pikod._id}>{pikod.name}</option>
                              ))}
                            </Input>
                          </FormGroup>
                        </>
                            : data.role === '' ?
                              <div>???? ???????????? ??????????</div> : null}

                                        <div style={{ textAlign: 'right', paddingTop: '10px' }}>??????????/???? ?????????? ??????????</div>
                                        <FormGroup>
                                            <Input type="select" name="validated" value={data.validated} onChange={handleChange}>
                                                <option value={true}>??????????</option>
                                                <option value={false}>???? ??????????</option>
                                            </Input>
                                        </FormGroup>

                                        <Row>
                     
                     <Col>
                      
                         <div style={{ textAlign: "right", paddingTop: "10px" }}>
                           ????????????
                         </div>
                         <FormGroup dir="rtl">
                         <Input
                         type="select"
                         name="zminot"
                         value={data.zminot}
                         onChange={handleChange}
                       >
                         <option value="">?????? ??????????</option>
                         <option value="0">????????</option>
                         <option value="1">??????????</option>
                         <option value="2">???? ????????</option>
                         
                       </Input>
                         </FormGroup>
   
                         <div style={{ textAlign: "right", paddingTop: "10px" }}>
                           ????????????
                         </div>
                         <FormGroup dir="rtl">
                         <Input
                         type="select"
                         name="kshirot"
                         value={data.kshirot}
                         onChange={handleChange}
                       >
                         <option value="">?????? ??????????</option>
                         <option value="0">????????</option>
                         <option value="1">??????????</option>
                         <option value="2">???? ????????</option>
                         
                       </Input>
                         </FormGroup>
                         </Col>
                         <Col>
                         <div style={{ textAlign: "right", paddingTop: "10px" }}>
                           ???????????? ??????????
                         </div>
                         <FormGroup dir="rtl">
                         <Input
                         type="select"
                         name="workplan"
                         value={data.workplan}
                         onChange={handleChange}
                       >
                         <option value="">?????? ??????????</option>
                         <option value="0">????????</option>
                         <option value="1">??????????</option>
                         <option value="2">???? ????????</option>
                         
                       </Input>
                         </FormGroup>
   
                         <div style={{ textAlign: "right", paddingTop: "10px" }}>
                           ?????? ??????
                         </div>
                         <FormGroup dir="rtl">
                         <Input
                         type="select"
                         name="adam"
                         value={data.adam}
                         onChange={handleChange}
                       >
                         <option value="">?????? ??????????</option>
                         <option value="0">????????</option>
                         <option value="1">??????????</option>
                         <option value="2">???? ????????</option>
                         
                       </Input>
                         </FormGroup>
                         </Col>
                       </Row>
                                        <div className="text-center">
                                            <button onClick={clickSubmit} className="btn btn-primary">????????</button>
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
