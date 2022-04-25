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

import TipulHistorySortingTable from 'components/workplan/TipulHistorySortingTable/SortingTable'

const ActiveTipulProfile = ({ match }) => {
    const [tipuldata, setTipulData] = useState({})

    function init() {
        var tipulidtemp = match.params.tipulid.toString();
        console.log(tipulidtemp)
        axios.get(`http://localhost:8000/api/activetipulbyid/${tipulidtemp}`)//need to make a new backend route
            .then(res => {
                var temptipul = res.data[0];
                setTipulData(temptipul);
            })
            .catch(error => {
            })
    }

    useEffect(() => {
        init();
    }, [])

    return (
        <div>
            <Row>
                <h1 style={{ paddingRight: "30px", fontWeight: 'bold', fontSize: '40px' }}>מסך טיפול</h1>
            </Row>
            <Row>
            <Col xs={12} md={6}>
                    {tipuldata.car ?
                        <Card style={{ height: "90%" }}>
                            <CardHeader style={{ paddingRight: "30px" }}>
                                <Row>
                                    <h1 style={{ fontWeight: 'bold' }}>מאפייני טיפול</h1>
                                </Row>
                            </CardHeader>
                            <CardBody style={{ paddingRight: "30px" }}>
                                <Row>
                                    <Col xs={12} md={6}>
                                        <Row style={{ textAlign: 'right' }}>
                                            <Col xs={12} md={6} style={{ paddingLeft: '0px' }}>
                                                <h3>מספר מזהה:</h3>
                                            </Col>
                                            <Col xs={12} md={6} style={{ paddingRight: '0px' }}>
                                                <Input type="text" value={tipuldata._id} />
                                            </Col>
                                        </Row>
                                        <Row style={{ textAlign: 'right' }}>
                                            <Col xs={12} md={6} style={{ paddingLeft: '0px' }}>
                                                <h3>סטטוס:</h3>
                                            </Col>
                                            <Col xs={12} md={6} style={{ paddingRight: '0px' }}>
                                                <Input type="text" value={tipuldata.status.name} />
                                            </Col>
                                        </Row>
                                        <Row style={{ textAlign: 'right' }}>
                                            <Col xs={12} md={6} style={{ paddingLeft: '0px' }}>
                                                <h3>תאריך טיפול אחרון:</h3>
                                            </Col>
                                            <Col xs={12} md={6} style={{ paddingRight: '0px' }}>
                                                <Input type="text" value={tipuldata.lastipuldate.slice(0, 10).split("-").reverse().join("-")} />
                                            </Col>
                                        </Row>
                                        <Row style={{ textAlign: 'right' }}>
                                            <Col xs={12} md={6} style={{ paddingLeft: '0px' }}>
                                                <h3>תאריך טולרנס עליון:</h3>
                                            </Col>
                                            <Col xs={12} md={6} style={{ paddingRight: '0px' }}>
                                                <Input type="text" value={tipuldata.tolarancedate.slice(0, 10).split("-").reverse().join("-")} />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Row style={{ textAlign: 'right' }}>
                                            <Col xs={12} md={6} style={{ paddingLeft: '0px' }}>
                                                <h3>סוג טיפול:</h3>
                                            </Col>
                                            <Col xs={12} md={6} style={{ paddingRight: '0px' }}>
                                                <Input type="text" value={tipuldata.tipultype.name} />
                                            </Col>
                                        </Row>
                                        <Row style={{ textAlign: 'right' }}>
                                            <Col xs={12} md={6} style={{ paddingLeft: '0px' }}>
                                                <h3>סוג טיפול - זכאות:</h3>
                                            </Col>
                                            <Col xs={12} md={6} style={{ paddingRight: '0px' }}>
                                                <Input type="text" value={tipuldata.zkaottipul.name} />
                                            </Col>
                                        </Row>
                                        <Row style={{ textAlign: 'right' }}>
                                            <Col xs={12} md={6} style={{ paddingLeft: '0px' }}>
                                                <h3>גוף ביצוע:</h3>
                                            </Col>
                                            <Col xs={12} md={6} style={{ paddingRight: '0px' }}>
                                                <Input type="text" value={tipuldata.gofbizoa.name} />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card> : null}
                </Col>
                <Col xs={12} md={6}>
                    {tipuldata.car ?
                        <Card style={{ height: "90%" }}>
                            <CardHeader style={{ paddingRight: "30px" }}>
                                <Row>
                                    <h1 style={{ fontWeight: 'bold' }}>מאפייני צ'</h1>
                                </Row>
                            </CardHeader>
                            <CardBody style={{ paddingRight: "30px" }}>
                                <Row>
                                    <Col xs={12} md={6}>
                                        <Row style={{ textAlign: 'right' }}>
                                            <Col xs={12} md={4} style={{ paddingLeft: '0px' }}>
                                                <h3>מספר ציוד:</h3>
                                            </Col>
                                            <Col xs={12} md={6} style={{ paddingRight: '0px' }}>
                                                <Input type="text" value={tipuldata.car._id} />
                                            </Col>
                                        </Row>
                                        <Row style={{ textAlign: 'right' }}>
                                            <Col xs={12} md={4} style={{ paddingLeft: '0px' }}>
                                                <h3>מאגד על:</h3>
                                            </Col>
                                            <Col xs={12} md={6} style={{ paddingRight: '0px' }}>
                                                <Input type="text" value={tipuldata.car.mkat.mkabaz.magad.magadal.name} />
                                            </Col>
                                        </Row>
                                        <Row style={{ textAlign: 'right' }}>
                                            <Col xs={12} md={4} style={{ paddingLeft: '0px' }}>
                                                <h3>מאגד:</h3>
                                            </Col>
                                            <Col xs={12} md={6} style={{ paddingRight: '0px' }}>
                                                <Input type="text" value={tipuldata.car.mkat.mkabaz.magad.name} />
                                            </Col>
                                        </Row>
                                        <Row style={{ textAlign: 'right' }}>
                                            <Col xs={12} md={4} style={{ paddingLeft: '0px' }}>
                                                <h3>מקבץ:</h3>
                                            </Col>
                                            <Col xs={12} md={6} style={{ paddingRight: '0px' }}>
                                                <Input type="text" value={tipuldata.car.mkat.mkabaz.name} />
                                            </Col>
                                        </Row>
                                        <Row style={{ textAlign: 'right' }}>
                                            <Col xs={12} md={4} style={{ paddingLeft: '0px' }}>
                                                <h3>מק"ט:</h3>
                                            </Col>
                                            <Col xs={12} md={6} style={{ paddingRight: '0px' }}>
                                                <Input type="text" value={tipuldata.car.mkat.name} />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Row style={{ textAlign: 'right' }}>
                                            <Col xs={12} md={3} style={{ paddingLeft: '0px' }}>
                                                <h3>פיקוד:</h3>
                                            </Col>
                                            <Col xs={12} md={6} style={{ paddingRight: '0px' }}>
                                                <Input type="text" value={tipuldata.car._id} />
                                            </Col>
                                        </Row>
                                        <Row style={{ textAlign: 'right' }}>
                                            <Col xs={12} md={3} style={{ paddingLeft: '0px' }}>
                                                <h3>אוגדה:</h3>
                                            </Col>
                                            <Col xs={12} md={6} style={{ paddingRight: '0px' }}>
                                                <Input type="text" value={tipuldata.car.mkat.mkabaz.magad.magadal.name} />
                                            </Col>
                                        </Row>
                                        <Row style={{ textAlign: 'right' }}>
                                            <Col xs={12} md={3} style={{ paddingLeft: '0px' }}>
                                                <h3>חטיבה:</h3>
                                            </Col>
                                            <Col xs={12} md={6} style={{ paddingRight: '0px' }}>
                                                <Input type="text" value={tipuldata.car.mkat.mkabaz.magad.name} />
                                            </Col>
                                        </Row>
                                        <Row style={{ textAlign: 'right' }}>
                                            <Col xs={12} md={3} style={{ paddingLeft: '0px' }}>
                                                <h3>גדוד:</h3>
                                            </Col>
                                            <Col xs={12} md={6} style={{ paddingRight: '0px' }}>
                                                <Input type="text" value={tipuldata.car.mkat.mkabaz.name} />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card> : null}
                </Col>
            </Row>
            {tipuldata.car ?
                <>
                    <Card>
                        <CardHeader style={{ paddingRight: "30px" }}>
                            <Row>
                                <h1 style={{ fontWeight: 'bold' }}>הערות</h1>
                            </Row>
                        </CardHeader>
                        <CardBody style={{ paddingRight: "30px", direction: 'rtl' }}>
                            <Row>
                                <h4>{tipuldata.description}</h4>
                            </Row>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader style={{ paddingRight: "30px" }}>
                            <Row>
                                <h1 style={{ fontWeight: 'bold' }}>היסטורית שינויים</h1>
                            </Row>
                        </CardHeader>
                        <CardBody style={{ paddingRight: "30px", direction: 'rtl' }}>
                            <TipulHistorySortingTable isactivetipul={false} tipulid={tipuldata.originaltipulid} />
                        </CardBody>
                    </Card>
                </> : null}
        </div >
    );
}
export default withRouter(ActiveTipulProfile);;