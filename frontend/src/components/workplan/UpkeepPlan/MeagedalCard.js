import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {
    Button,
    Card,
    CardHeader,
    CardBody,
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
    Col,
    Table
} from "reactstrap";

import ReactSpeedometer from "react-d3-speedometer"
import Collapse from 'reactstrap/lib/Collapse';

function CardMeagedal(props) {
    //most important
    const [magadal, setMagadal] = useState([])

    const [tipuls, setTipuls] = useState([])
    const [tipulsinprogress, setTipulsInprogress] = useState([])
    const [tipulscompleted, setTipulsCompleted] = useState([])

    const [magadfilter, setMagadFilter] = useState([]);
    const [mkabazfilter, setMkabazFilter] = useState([]);

    const [magad, setMagad] = useState([]);
    const [mkabaz, setMkabaz] = useState([]);

    const [allmagadals, setAllmagadals] = useState([])

    const [collapseTitle, setCollapseTitle] = useState(false)
    const [collapseTitle2, setCollapseTitle2] = useState(false)

    function handleChangemagad(evt) {
        const value = evt.target.value;
        if (value == "undefined") {
            setMagadFilter([]);
        }
        else {
            setMagadFilter([value]);
        }
    }

    function handleChangemkabaz(evt) {
        const value = evt.target.value;
        if (value == "undefined") {
            setMkabazFilter([]);
        }
        else {
            setMkabazFilter([value]);
        }
    }

    async function handleChangemagadals(evt) {
        const value = evt.target.value;
        if (value != 'undefined') {
            await axios.get(`http://localhost:8000/api/magadal/${value}`)
                .then(response => {
                    setMagadal(response.data[0]);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        else{
            setMagadal([props.magadal]);
        }
    }

    const getAllmagadals = async () => {
        await axios.get(`http://localhost:8000/api/magadal`)
            .then(response => {
                setAllmagadals(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const getMagads = async () => {
        await axios.get(`http://localhost:8000/api/magadsbymagadal/${magadal._id}`)
            .then(response => {
                setMagad(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const getMkabaz = async () => {
        await axios.get(`http://localhost:8000/api/mkabazsbymagad/${magadfilter}`)
            .then(response => {
                setMkabaz(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    async function getCardData() {
       getTipulsDatawithdates()
    }

    async function getCardDatawithdates() {
        getTipulsDatawithdates()
    }

    const tipulfilters = {
        pikodid: props.pikodsid,
        ogdaid: props.ogdasid,
        hativaid: props.hativasid,
        gdodid: props.gdodsid,
        //
        magadalid: [magadal._id],
        magadid: magadfilter,
        mkabazid: mkabazfilter,
        mkatid: [],
        carid: [],
        //
        gofbizoaid: props.gofbizoasid,
        statusid: props.statussid,
        tipultypeid: props.tipultypesid,
        zkaottipulid: props.zkaottipulsid,
        //
        startdate: props.startdate,
        enddate: props.enddate,
    }

    const getTipulsDatawithdates = async () => {
        var tempactivetipuls = [];
        var temptipulsandactive = [];
        //
        let res = await axios.post(`http://localhost:8000/api/smartactivetipulsbydates3`, tipulfilters)
        temptipulsandactive = res.data;
        tempactivetipuls = res.data;
        let res2 = await axios.post(`http://localhost:8000/api/smarttipulsbydates3`, tipulfilters)
        let data2 = res2.data;
        for (var i = 0; i < data2.length; i++) {
            var bool = true;
            for (var j = 0; j < tempactivetipuls.length; j++) {
                if (data2[i]._id == tempactivetipuls[j].originaltipulid) {
                    bool = false;
                }
            }
            if (bool == true) {
                temptipulsandactive.push(data2[i]);
            }
        }
        // temptipulsandactive full
        var tempinprogresstipuls = [];
        var tempcompletedtipuls = [];
    
        for (var i = 0; i < temptipulsandactive.length; i++) {
            if (temptipulsandactive[i].status._id == "s002") {
                tempinprogresstipuls.push(temptipulsandactive[i])
            }
            if (temptipulsandactive[i].status._id == "s001") {
                tempcompletedtipuls.push(temptipulsandactive[i])
            }
        }
        setTipuls(temptipulsandactive)
        setTipulsInprogress(tempinprogresstipuls)
        setTipulsCompleted(tempcompletedtipuls)

        // console.log(temptipulsandactive)
        // console.log(tempinprogresstipuls)
        // console.log(tempcompletedtipuls)
    }

    const toggleCollapse = () => {
        setCollapseTitle(!collapseTitle);
    };

    const toggleCollapse2 = () => {
        setCollapseTitle2(!collapseTitle2);
    };

    useEffect(() => {
        if ((magadal._id != "000") && (magadal._id != undefined)) {
            if (((props.startdate != undefined) && (props.enddate != undefined)) && ((props.startdate != '') && (props.enddate != ''))) {
                getCardDatawithdates();
            }
            else {
                getCardData();
            }
        }
    }, [props.startdate, props.enddate, props.tipultypesid, props.zkaottipulsid, props.gofbizoasid, magadfilter, mkabazfilter, magadal, props.gdodsid, props.hativasid, props.ogdasid, props.pikodsid]);

    const finalgrade = tipuls.length != 0 ? (tipulscompleted.length / tipuls.length * 100) : 0;

    useEffect(() => {
        if (magadfilter.length == 0) {
            setMkabaz([]);
            setMkabazFilter([]);
        }
        else {
            getMkabaz();
        }
    }, [magadfilter]);

    useEffect(() => {
        getMagads();
    }, [magadal]);

    useEffect(() => {
        setMagadal(props.magadal)
        getAllmagadals()
    }, [props.magadal]);

    return (
        <>
            {magadal.length != 0 ?
                <>
                    <Card style={{ marginBottom: '10px' }}>
                        <CardHeader>
                            <h4 style={{ direction: "rtl", textAlign: "center", margin: '0px', fontWeight: 'bold', cursor: 'pointer' }} onClick={toggleCollapse}>{magadal.name}</h4>
                            <Collapse isOpen={collapseTitle}>
                                <Input type="select" bsSize="lg" onChange={handleChangemagadals}>
                                    <option value="undefined">בחר מאגד על</option>
                                    {allmagadals.map((magadal, index) => (
                                        <option value={magadal._id}>{magadal.name}</option>
                                    ))}
                                </Input>
                            </Collapse>
                        </CardHeader>
                        <CardBody style={{ direction: "rtl" }}>
                            <Row>
                                <Col xs={12} md={6} style={{ justifyContent: 'right', alignContent: 'right', textAlign: 'right' }}>
                                    <h6 style={{ direction: "rtl", textAlign: "center", cursor: 'pointer' }} onClick={toggleCollapse2}>מאגד</h6>
                                    <Collapse isOpen={collapseTitle2}>
                                        <Input type="select" bsSize="lg" name="magad" onChange={handleChangemagad}>
                                            <option value="undefined">בחר מאגד</option>
                                            {magad.map((magad, index) => (
                                                <option value={magad._id}>{magad.name}</option>
                                            ))}
                                        </Input>
                                    </Collapse>
                                </Col>
                                {magadfilter.length>0 ?
                                    <Col xs={12} md={6} style={{ justifyContent: 'right', alignContent: 'right', textAlign: 'right' }}>
                                        <h6 style={{ direction: "rtl", textAlign: "center", cursor: 'pointer' }} onClick={toggleCollapse2}>מקבץ</h6>
                                        <Collapse isOpen={collapseTitle2}>
                                            <Input type="select" bsSize="lg" name="mkabaz" onChange={handleChangemkabaz}>
                                                <option value="undefined">בחר מקבץ</option>
                                                {mkabaz ? mkabaz.map((mkabaz, index) => (
                                                    <option value={mkabaz._id}>{mkabaz.name}</option>
                                                )) : null}
                                            </Input>
                                        </Collapse>
                                    </Col>
                                    :
                                    <Col xs={12} md={6} style={{ justifyContent: 'right', alignContent: 'right', textAlign: 'right' }}>
                                        <h6 style={{ direction: "rtl", textAlign: "center", cursor: 'pointer' }} onClick={toggleCollapse2}>מקבץ</h6>
                                        <Collapse isOpen={collapseTitle2}>
                                            <Input type="select" bsSize="lg" name="mkabaz" onChange={handleChangemkabaz} disabled>
                                                <option value="undefined">בחר מקבץ</option>
                                            </Input>
                                        </Collapse>
                                    </Col>}
                            </Row>
                            <Row style={{ justifyContent: 'center', paddingTop: '10px' }}>
                                <ReactSpeedometer
                                    needleHeightRatio={0.7}
                                    minValue={0}
                                    maxValue={100}
                                    value={finalgrade}
                                    width={300}
                                    height={200}
                                    customSegmentStops={[0, 33, 66, 100]}
                                    segmentColors={['#cc3232', '#e7b416', '#2dc937']}
                                    currentValueText={"הספק באחוזים: " + finalgrade.toFixed(2) + '%'}
                                    customSegmentLabels={[
                                        {
                                            text: 'טעון שיפור',
                                            position: 'OUTSIDE',
                                            color: '#555',
                                        },
                                        {
                                            text: 'בינוני',
                                            position: 'OUTSIDE',
                                            color: '#555',
                                        },
                                        {
                                            text: 'טוב',
                                            position: 'OUTSIDE',
                                            color: '#555',
                                        },
                                    ]}
                                    ringWidth={47}
                                    needleTransitionDuration={1000}
                                    needleTransition="easeQuadIn"
                                    needleColor={'#90f2ff'}
                                />
                            </Row>
                            <Row style={{ justifyContent: 'center' }}>
                                <Col xs={12} md={4}>
                                    <h4 style={{ textAlign: 'center' }}>תכנון</h4>
                                    <input type="text" value={tipuls.length} style={{ width: 'inherit', textAlign: 'center' }} />
                                </Col>
                                <Col xs={12} md={4}>
                                    <h4 style={{ textAlign: 'center' }}>בתהליך</h4>
                                    <input type="text" value={tipulsinprogress.length} style={{ width: 'inherit', textAlign: 'center' }} />
                                </Col>
                                <Col xs={12} md={4}>
                                    <h4 style={{ textAlign: 'center' }}>ביצוע</h4>
                                    <input type="text" value={tipulscompleted.length} style={{ width: 'inherit', textAlign: 'center' }} />
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </> : <h4 style={{ textAlign: 'center' }}>something went wrong</h4>}
        </>
    )
}
export default CardMeagedal