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
import history from '../../history'
import { toast } from "react-toastify";

import CarTipulsSortingTable from 'components/workplan/CarTipulsSortingTable/SortingTable'
import { isAuthenticated } from "auth/index";
const CarProfile = ({ match }) => {
    const { user } = isAuthenticated();
    const [cardata, setCarData] = useState({})
    const [ploga, setPloga] = useState()
    const clickSubmit = event => {
        UpdateCar();
      }

      const GetUpdatedCar = () => {
        var caridtemp = match.params.carid.toString();
        console.log(caridtemp)
        axios.get(`http://localhost:8000/api/carbyid/${caridtemp}`)//need to make a new backend route
            .then(res => {
                var tempcar = res.data[0];
                setCarData(tempcar);
                console.log(tempcar.ploga)
                setPloga(`${tempcar.ploga}`)
                
                
            })
            .catch(error => {
            })
      }

      function UpdateCar() {
        var caridtemp = match.params.carid.toString();
        const tempcarid = cardata._id;
        const tempcardata = {
            mkat:cardata.mkat._id,
            gdod:cardata.gdod._id,
            ploga:ploga
        };
        console.log(tempcardata)
        axios.post(`http://localhost:8000/api/car/update/${caridtemp}`, {tempcardata})
          .then(res => {
            // GetUpdatedCar();
          })
          .catch(error => {
            toast.error(`נא לבחור גדוד`);
          })
      }

    function init() {
        
        GetUpdatedCar()
       
    }

    useEffect(() => {
        init();
      
       
    }, [])


    return (
        <div>
            <Row>
                <h1 style={{ paddingRight: "30px", fontWeight: 'bold', fontSize: '40px'}}>מסך ניהול צ'</h1>
            </Row>
            <Row>
                <Col xs={12} md={6}>
                    <Card style={{outline: 'none !important',boxShadow: '0 0 10px lightBlue', borderRadius: '15px'}}>
                        <CardHeader style={{ paddingRight: "30px" }}>
                            <Row>
                                <h1 style={{fontWeight: 'bold'}}>צ'</h1>
                            </Row>
                        </CardHeader>
                        <CardBody style={{ paddingRight: "30px", borderRadius: '5p' }}>
                            <Row style={{ textAlign: 'right' }}>
                                <Col xs={12} md={2} style={{ paddingLeft: '0px' }}>
                                    <h3>מספר ציוד:</h3>
                                </Col>
                                <Col xs={12} md={4} style={{ paddingRight: '0px' }}>
                                    <Input type="text" value={cardata._id} style={{outline: 'none !important', borderWidth: '3px 3px 3px', borderColor: 'lightBlue'}} disabled/>
                                </Col>
                            </Row>
                            <Row style={{ textAlign: 'right' }}>
                                <Col xs={12} md={2} style={{ paddingLeft: '0px' }}>
                                    <h3>מספר רישוי:</h3>
                                </Col>
                                <Col xs={12} md={4} style={{ paddingRight: '0px' }}>
                                    <Input type="text" value={cardata.name} style={{outline: 'none !important', borderWidth: '3px 3px 3px', borderColor: 'lightBlue'}} disabled/>
                                </Col>
                            </Row>
                            <Row style={{ textAlign: 'right' }}>
                                <Col xs={12} md={2} style={{ paddingLeft: '0px' }}>
                                    <h3>סטטוס:</h3>
                                </Col>
                                <Col xs={12} md={4} style={{ paddingRight: '0px' }}>
                                    <Input type="text" value={cardata.name} style={{outline: 'none !important', borderWidth: '3px 3px 3px', borderColor: 'lightBlue'}} disabled/>
                                </Col>
                            </Row>
                            <Row style={{ textAlign: 'right' }}>
                                <Col xs={12} md={2} style={{ paddingLeft: '0px' }}>
                                    <h3>מעמד:</h3>
                                </Col>
                                <Col xs={12} md={4} style={{ paddingRight: '0px' }}>
                                    <Input type="text" value={cardata.name} style={{outline: 'none !important', borderWidth: '3px 3px 3px', borderColor: 'lightBlue'}} disabled/>
                                </Col>
                            </Row>
                            <Row style={{ textAlign: 'right' }}>
                                <Col xs={12} md={2} style={{ paddingLeft: '0px' }}>
                                    <h3>כיסוי הח"י:</h3>
                                </Col>
                                <Col xs={12} md={4} style={{ paddingRight: '0px' }}>
                                    <Input type="text" value={cardata.name} style={{outline: 'none !important', borderWidth: '3px 3px 3px', borderColor: 'lightBlue'}} disabled/>
                                </Col>
                            </Row>
                            <Row style={{ textAlign: 'right' }}>
                                <Col xs={12} md={2} style={{ paddingLeft: '0px' }}>
                                    <h3>קוד יעוד כלי:</h3>
                                </Col>
                                <Col xs={12} md={4} style={{ paddingRight: '0px' }}>
                                    <Input type="text" value={cardata.name} style={{outline: 'none !important', borderWidth: '3px 3px 3px', borderColor: 'lightBlue'}} disabled/>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs={12} md={6}>
                <Card style={{outline: 'none !important',boxShadow: '0 0 10px lightBlue', borderRadius: '15px'}}>
                        <CardHeader style={{ paddingRight: "30px" }}>
                            <Row>
                                <h1 style={{fontWeight: 'bold'}}>מאפייני צ'</h1>
                            </Row>
                        </CardHeader>
                        <CardBody style={{ paddingRight: "30px" }}>
                            {cardata.mkat ?
                                <>
                                    <Row>
                                        <Col xs={12} md={6}>
                                            <Row style={{ textAlign: 'right' }}>
                                                <Col xs={12} md={6} style={{ paddingLeft: '0px' }}>
                                                    <h3>מאגד על:</h3>
                                                </Col>
                                                <Col xs={12} md={6} style={{ paddingRight: '0px' }}>
                                                    <Input type="text" value={cardata.mkat.mkabaz.magad.magadal.name} style={{outline: 'none !important', borderWidth: '3px 3px 3px', borderColor: 'lightBlue'}} disabled/>
                                                </Col>
                                            </Row>
                                            <Row style={{ textAlign: 'right' }}>
                                                <Col xs={12} md={6} style={{ paddingLeft: '0px' }}>
                                                    <h3>מאגד:</h3>
                                                </Col>
                                                <Col xs={12} md={6} style={{ paddingRight: '0px' }}>
                                                    <Input type="text" value={cardata.mkat.mkabaz.magad.name} style={{outline: 'none !important', borderWidth: '3px 3px 3px', borderColor: 'lightBlue'}} disabled/>
                                                </Col>
                                            </Row>
                                            <Row style={{ textAlign: 'right' }}>
                                                <Col xs={12} md={6} style={{ paddingLeft: '0px' }}>
                                                    <h3>מקבץ:</h3>
                                                </Col>
                                                <Col xs={12} md={6} style={{ paddingRight: '0px' }}>
                                                    <Input type="text" value={cardata.mkat.mkabaz.name} style={{outline: 'none !important', borderWidth: '3px 3px 3px', borderColor: 'lightBlue'}}disabled/>
                                                </Col>
                                            </Row>
                                            <Row style={{ textAlign: 'right' }}>
                                                <Col xs={12} md={6} style={{ paddingLeft: '0px' }}>
                                                    <h3>מק"ט:</h3>
                                                </Col>
                                                <Col xs={12} md={6} style={{ paddingRight: '0px' }}>
                                                    <Input type="text" value={cardata.mkat.name} style={{outline: 'none !important', borderWidth: '3px 3px 3px', borderColor: 'lightBlue'}} disabled/>
                                                </Col>
                                            </Row>
                                            <Row style={{ textAlign: 'right' }}>
                                                <Col xs={12} md={6} style={{ paddingLeft: '0px' }}>
                                                    <h3>קבוצת הפשרה:</h3>
                                                </Col>
                                                <Col xs={12} md={6} style={{ paddingRight: '0px' }}>
                                                    <Input type="text" value={cardata.name} style={{outline: 'none !important', borderWidth: '3px 3px 3px', borderColor: 'lightBlue'}} disabled/>
                                                </Col>
                                            </Row>
                                            <Row style={{ textAlign: 'right' }}>
                                                <Col xs={12} md={6} style={{ paddingLeft: '0px' }}>
                                                    <h3></h3>
                                                </Col>
                                            </Row>
                                            <Row style={{ textAlign: 'right' }}>
                                                <Col xs={12} md={6} style={{ paddingLeft: '0px' }}>
                                                    <h3></h3>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <Row style={{ textAlign: 'right' }}>
                                                <Col xs={12} md={6} style={{ paddingLeft: '0px' }}>
                                                    <h3>פיקוד:</h3>
                                                </Col>
                                                <Col xs={12} md={6} style={{ paddingRight: '0px' }}>
                                                    <Input type="text" value={cardata.gdod.hativa.ogda.pikod.name} style={{outline: 'none !important', borderWidth: '3px 3px 3px', borderColor: 'lightBlue'}} disabled/>
                                                </Col>
                                            </Row>
                                            <Row style={{ textAlign: 'right' }}>
                                                <Col xs={12} md={6} style={{ paddingLeft: '0px' }}>
                                                    <h3>אוגדה:</h3>
                                                </Col>
                                                <Col xs={12} md={6} style={{ paddingRight: '0px' }}>
                                                    <Input type="text" value={cardata.gdod.hativa.ogda.name} style={{outline: 'none !important', borderWidth: '3px 3px 3px', borderColor: 'lightBlue'}} disabled/>
                                                </Col>
                                            </Row>
                                            <Row style={{ textAlign: 'right' }}>
                                                <Col xs={12} md={6} style={{ paddingLeft: '0px' }}>
                                                    <h3>חטיבה:</h3>
                                                </Col>
                                                <Col xs={12} md={6} style={{ paddingRight: '0px' }}>
                                                    <Input type="text" value={cardata.gdod.hativa.name} style={{outline: 'none !important', borderWidth: '3px 3px 3px', borderColor: 'lightBlue'}} disabled/>
                                                </Col>
                                            </Row>
                                            <Row style={{ textAlign: 'right' }}>
                                                <Col xs={12} md={6} style={{ paddingLeft: '0px' }}>
                                                    <h3>גדוד:</h3>
                                                </Col>
                                                <Col xs={12} md={6} style={{ paddingRight: '0px' }}>
                                                    <Input type="text" value={cardata.gdod.name} style={{outline: 'none !important', borderWidth: '3px 3px 3px', borderColor: 'lightBlue'}}disabled />
                                                </Col>
                                            </Row>
                                            <Row style={{ textAlign: 'right' }}>
                                                <Col xs={12} md={6} style={{ paddingLeft: '0px' }}>
                                                    <h3>פלוגה:</h3>
                                                </Col>
                                                <Col xs={12} md={6} style={{ paddingRight: '0px' }}>
                                                    <Input type="text"  value={ploga} style={{outline: 'none !important', borderWidth: '3px 3px 3px', borderColor: 'lightBlue'}} onChange={e => setPloga(e.target.value)}/>
                                                </Col>
                                            </Row>
                                            <Row style={{ textAlign: 'right' }}>
                                                <Col xs={12} md={6} style={{ paddingLeft: '0px' }}>
                                                    <h3>תאריך ניפוק:</h3>
                                                </Col>
                                                <Col xs={12} md={6} style={{ paddingRight: '0px' }}>
                                                    <Input type="text" value={cardata.name} style={{outline: 'none !important', borderWidth: '3px 3px 3px', borderColor: 'lightBlue'}}disabled/>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </> : null}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
{user.workplan === "1" ? null :    
            <div style={{ textAlign: 'left', paddingBottom: '40px' }}>
              <button className="btn btn-info" onClick={clickSubmit} style={{outline: 'none !important', boxShadow: '0 0 10px lightBlue', borderRadius: '25px', backgroundColor: 'lightblue'}}>עדכן צ'</button>
            </div>}
       

            <Card style={{outline: 'none !important',boxShadow: '0 0 10px lightBlue', borderRadius: '15px'}}>
                <CardHeader style={{ paddingRight: "30px" }}>
                    <Row>
                        <h1 style={{fontWeight: 'bold'}}>טיפולים לצ'</h1>
                    </Row>
                </CardHeader>
                <CardBody style={{ paddingRight: "30px",direction:'rtl' }}>
                    <CarTipulsSortingTable carid={cardata._id}/>
                </CardBody>
            </Card>
        </div >
    );
}
export default withRouter(CarProfile);;