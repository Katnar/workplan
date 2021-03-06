import React, { useState, useEffect } from 'react';
import { Link, withRouter, Redirect } from "react-router-dom";
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
    Button,
    ButtonGroup,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    CardFooter,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    Label,
    FormGroup,
    Input,
    Table,
    Row,
    Col,
    Container,
    UncontrolledTooltip,
    Progress,
} from "reactstrap";
import axios from 'axios';
import { isAuthenticated } from 'auth/index';

import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import GdodKshirotHistoryGraph from 'components/kshirot/GdodKshirotHistoryGraph/GdodKshirotHistoryGraph';
import GdodTrainingHistoryGraph from 'components/kshirot/GdodTrainingHistoryGraph/GdodTrainingHistoryGraph';

import downarrowpic from "assets/img/downarrow.png";

const DisplayGdodCard = ({ id }) => {
    const { user } = isAuthenticated();
    const [gdod, setGdod] = useState([]);
    const [gdodkshirotsum, setGdodKshirotSum] = useState([]);
    const [gdodtrainingsum, setGdodTrainingSum] = useState([]);

    const [isOpen, setIsOpen] = useState(false);
    function togglePanel(e) {
        setIsOpen(!isOpen);
    }

    function init() {
        getGdod();
    }

    function getGdod() {
        axios.post(`http://localhost:8000/api/gdod/gdodbyid`, [id])
            .then(response => {
                setGdod(response.data[0]);
                loadgdodkshirot(response.data[0].kshirot);
                loadgdodtraining(response.data[0].training);
            })
            .catch(error => {

            })
    }

    function loadgdodkshirot(kshirotid) {
        if (kshirotid != undefined) {
            axios.get(`http://localhost:8000/api/kshirot/${kshirotid}`)
                .then(response => {
                    setGdodKshirotSum(CalculateKshirotSum(response.data[0]).toString().slice(0, 5));
                })
                .catch(error => {

                })
        }
    }

    function loadgdodtraining(trainingid) {
        if (trainingid != undefined) {
            axios.get(`http://localhost:8000/api/training/${trainingid}`)
                .then(response => {
                    setGdodTrainingSum(CalculateTrainingSum(response.data[0]).toString().slice(0, 5));
                })
                .catch(error => {

                })
        }
    }

    function CalculateKshirotSum(kshirot) {//42 fields means 2.3....% every field. rn=> every field 2% mentality 18%
        const temptipul = kshirot;
        console.log(temptipul);
        var tempkshirotsum = 0;

        if(temptipul.officersmax == 0)
        temptipul.officersmax = 1
        if(temptipul.tekenmax == 0)
        temptipul.tekenmax = 1
        if(temptipul.toolsboxmax == 0)
        temptipul.toolsboxmax = 1
        if(temptipul.bakashmax == 0)
        temptipul.bakashmax = 1
        if(temptipul.carpitermax == 0 )
        temptipul.carpitermax = 1
        if(temptipul.carhatapmax == 0)
        temptipul.carhatapmax = 1
        if(temptipul.rioarrowmax == 0)
        temptipul.rioarrowmax = 1
        if(temptipul.shibozmax == 0)
        temptipul.shibozmax = 1
        if(temptipul.driversmax == 0)
        temptipul.driversmax = 1
        if(temptipul.tikshoratmax == 0)
        temptipul.tikshoratmax = 1
        if(temptipul.tkinotmax == 0)
        temptipul.tkinotmax = 1
        if(temptipul.roleholdersmax == 0)
        temptipul.roleholdersmax = 1
        if(temptipul.nokavimmax == 0)
        temptipul.nokavimmax = 1
        if(temptipul.testermax == 0)
        temptipul.testermax = 1
        if(temptipul.amountmhalafmax == 0)
        temptipul.amountmhalafmax = 1
        if(temptipul.amounthanafamax == 0)
        temptipul.amounthanafamax = 1
        tempkshirotsum = (temptipul.officers / temptipul.officersmax * 2)
            + (temptipul.teken / temptipul.tekenmax * 2) + (temptipul.toolsbox / temptipul.toolsboxmax * 2) + (temptipul.bakash / temptipul.bakashmax * 2) + (temptipul.carpiter / temptipul.carpitermax * 2) +
            (temptipul.carhatap / temptipul.carhatapmax * 2) + (temptipul.rioarrow / temptipul.rioarrowmax * 2) + (temptipul.shiboz / temptipul.shibozmax * 2) + (temptipul.drivers / temptipul.driversmax * 2) +
            (temptipul.tikshorat / temptipul.tikshoratmax * 2) + (temptipul.tkinot / temptipul.tkinotmax * 2) + (temptipul.roleholders / temptipul.roleholdersmax * 2) +
            (temptipul.nokavim / temptipul.nokavimmax * 2) + (temptipul.tester / temptipul.testermax * 2) + (temptipul.amountmhalaf / temptipul.amountmhalafmax * 2) +
            (temptipul.amounthanafa / temptipul.amounthanafamax * 2);
        //console.log(tempkshirotsum);//good so far 19*2=38
        if (temptipul.match == '????????')
            tempkshirotsum += 2;
        if (temptipul.load == '????????')
            tempkshirotsum += 2;
        if (temptipul.stash == '????????')
            tempkshirotsum += 2;
        if (temptipul.hatak == '????????')
            tempkshirotsum += 2;
        if (temptipul.lastrefreshdate == '????????')
            tempkshirotsum += 2;
        if (temptipul.matchmahin == '????????')
            tempkshirotsum += 2;
        if (temptipul.matchswap == '????????')
            tempkshirotsum += 2;
        if (temptipul.catalogs == '????????')
            tempkshirotsum += 2;
        if (temptipul.mobilitytools == '????????')
            tempkshirotsum += 2;
        if (temptipul.carlahh == '????????')
            tempkshirotsum += 2;
        if (temptipul.katkal == '????????')
            tempkshirotsum += 2;
        if (temptipul.personalprotection == '????????')
            tempkshirotsum += 2;
        if (temptipul.pkodotopara == '????????')
            tempkshirotsum += 2;
        if (temptipul.tiom == '????????')
            tempkshirotsum += 2;
        if (temptipul.commanderconf == '????????')
            tempkshirotsum += 2;
        if (temptipul.pakalim == '????????')
            tempkshirotsum += 2;
        if (temptipul.tikim == '????????')
            tempkshirotsum += 2;
        if (temptipul.boxcontent == '????????')
            tempkshirotsum += 2;
        if (temptipul.battaliondrillamount == '????????')
            tempkshirotsum += 2;
        // console.log(tempkshirotsum);//good so far 19*2=38+38=76
        switch (temptipul.mentality) {
            case 1:
                tempkshirotsum += 10;
                break;
            case 2:
                tempkshirotsum += 12;
                break;
            case 3:
                tempkshirotsum += 14;
                break;
            case 4:
                tempkshirotsum += 16;
                break;
            case 5:
                tempkshirotsum += 18;
                break;
            default:
                tempkshirotsum += 0;
        }
        if ((temptipul.trainingquality >= 0) && (temptipul.trainingquality <= 100)) {
            tempkshirotsum += (temptipul.trainingquality * 0.01) * 2;
        }
        else {
            tempkshirotsum += 0;
        }
        if ((temptipul.battaliondrillquality >= 0) && (temptipul.battaliondrillquality <= 100)) {
            tempkshirotsum += (temptipul.battaliondrillquality * 0.01) * 2;
        }
        else {
            tempkshirotsum += 0;
        }
        tempkshirotsum += 2;//not sure about the date stuff..
        return (tempkshirotsum);
    }

    function CalculateTrainingSum(training) {//46 fields means 2.17% every field. rn=> 
        const temptraining = training;
        var temptrainingsum = 0;
        if (temptraining.emon == '????????')
            temptrainingsum += 2;
        if (temptraining.maflag == '????????')
            temptrainingsum += 2;
        if (temptraining.kata == '????????')
            temptrainingsum += 2;
        if (temptraining.kitathalafim == '????????')
            temptrainingsum += 2;
        if (temptraining.kitatnaot == '????????')
            temptrainingsum += 2;
        if (temptraining.kitacala == '????????')
            temptrainingsum += 2;
        if (temptraining.a == '????????')
            temptrainingsum += 2;
        if (temptraining.b == '????????')
            temptrainingsum += 2;
        if (temptraining.d == '????????')
            temptrainingsum += 2;
        if (temptraining.nispach == '????????')
            temptrainingsum += 2;
        if (temptraining.nohak == '????????')
            temptrainingsum += 2;
        if (temptraining.nihok == '????????')
            temptrainingsum += 2;
        if (temptraining.azarim == '????????')
            temptrainingsum += 2;
        if (temptraining.pkodotmasoa == '????????')
            temptrainingsum += 2;
        if (temptraining.sadak == '????????')
            temptrainingsum += 2;
        if (temptraining.tadrich == '????????')
            temptrainingsum += 2;
        if (temptraining.pkodotahzaka == '????????')
            temptrainingsum += 2;
        if (temptraining.tiom == '????????')
            temptrainingsum += 2;
        if (temptraining.aishor == '????????')
            temptrainingsum += 2;
        if (temptraining.shimosbashob == '????????')
            temptrainingsum += 2;
        if (temptraining.shimosbashob2 == '????????')
            temptrainingsum += 2;
        if (temptraining.sicomimon == '????????')
            temptrainingsum += 2;

        // console.log(temptrainingsum);//i=22 =>max 44
        var temparr = [];
        temparr.push(temptraining.bkiot,
            temptraining.bkiotsadac,
            temptraining.ramatnispach,
            temptraining.azarimquality,
            temptraining.zlm,
            temptraining.shika,
            temptraining.bkiotmikom,
            temptraining.bkiotbgdod,
            temptraining.bkiotbashob,
            temptraining.ramatshlita,
            temptraining.razifot,
            temptraining.ramattiom,
            temptraining.shlitabmazav,
            temptraining.midathatama,
            temptraining.nihol,
            temptraining.midatkabala,
            temptraining.hafakat,
            temptraining.ehot,
            temptraining.ehotplogot,
            temptraining.ehotmfkada,
            temptraining.bkiotbashob2,
            temptraining.lamida,
            temptraining.sicombainaim,
            temptraining.rama,
            temptraining.imonhiloz)
        for (var i = 0; i < temparr.length; i++) //i=25 => max 50pts
        {
            if (temparr[i] == 1) {
                temptrainingsum += 0;
            }
            if (temparr[i] == 2) {
                temptrainingsum += 1;
            }
            if (temparr[i] == 3) {
                temptrainingsum += 1;
            }
            if (temparr[i] == 4) {
                temptrainingsum += 1;
            }
            if (temparr[i] == 5) {
                temptrainingsum += 2;
            }
        }
        temptrainingsum += 6;
        return (temptrainingsum);
    }
    /*end of data */

    useEffect(() => {
        init();
    }, [id])

    return (
        <>
            {isOpen ? ( //card is open
            
                <Card>
                    <Link style={{ color: "black" }} to={`/usergdodeditpage/${gdod._id}`}>
                    <CardHeader style={{ direction: 'rtl' }} onClick={(e) => togglePanel(e)} style={{ direction: "rtl", cursor: 'pointer', textAlign: 'center' }}>
                        <CardTitle tag="h4" style={{ direction: 'rtl', textAlign: 'right' }}>{gdod.name}</CardTitle>
                    </CardHeader>
                    </Link>
                    <CardBody style={{ direction: 'ltr', textAlign: 'right' }} onClick={(e) => togglePanel(e)} style={{ direction: "rtl", cursor: 'pointer', textAlign: 'center' }}>
                        <Row style={{ direction: 'rtl', textAlign: 'center' }}>
                            <Col xs={12} md={6}>
                                <h5 style={{ color: '#56758f' }}>&#9632; ???????? ????????????????</h5>
                            </Col>
                            <Col xs={12} md={6}>
                                <h5 style={{ color: '#92a9bd' }}>&#9632; ???????? ??????????????</h5>
                            </Col>
                        </Row>
                        <Container style={{ width: "60%" }}>
                            <CircularProgressbarWithChildren
                                value={gdodkshirotsum}
                                strokeWidth={10}
                                styles={buildStyles({
                                    pathColor: "#56758f",
                                    trailColor: "#fdcedb"
                                })}
                            >
                                {/* Width here needs to be (100 - 2 * strokeWidth)% in order to fit exactly inside the outer progressbar.*/}
                                <div style={{ width: "78%" }}>
                                    <CircularProgressbarWithChildren
                                        value={gdodtrainingsum}
                                        strokeWidth={13}
                                        styles={buildStyles({
                                            pathColor: "#92a9bd",
                                            trailColor: "#ccfdff"
                                        })}
                                    >
                                    </CircularProgressbarWithChildren>
                                </div>
                            </CircularProgressbarWithChildren>
                        </Container>

                        <h4 style={{ color: "#56758f" }}>{gdodkshirotsum}:???????? ????????????</h4>
                        <div className="chart-area">
                            <GdodKshirotHistoryGraph gdodid={id} />
                        </div>

                        <h4 style={{ color: "#92a9bd" }}>{gdodtrainingsum}:???????? ??????????</h4>
                        <div className="chart-area">
                            <GdodTrainingHistoryGraph gdodid={id} />
                        </div>
                    </CardBody>
                    <CardFooter onClick={(e) => togglePanel(e)} style={{ direction: "rtl", cursor: 'pointer', textAlign: 'center' }}>
                    </CardFooter>
                </Card>
              
            )
                :
               
                <Card>
                     <Link style={{ color: "black" }} to={`/usergdodeditpage/${gdod._id}`}>
                    <CardHeader style={{ direction: 'rtl' }} onClick={(e) => togglePanel(e)} style={{ direction: "rtl", cursor: 'pointer', textAlign: 'center' }}>
                        <CardTitle tag="h4" style={{ direction: 'rtl', textAlign: 'right' }}>{gdod.name}</CardTitle>
                    </CardHeader>
                    </Link>
                   
                    <CardBody style={{ direction: 'ltr', textAlign: 'right' }} onClick={(e) => togglePanel(e)} style={{ direction: "rtl", cursor: 'pointer', textAlign: 'center' }}>
                        <Row style={{ direction: 'rtl', textAlign: 'center' }}>
                            <Col xs={12} md={6}>
                                <h5 style={{ color: '#56758f' }}>&#9632; ???????? ????????????????</h5>
                            </Col>
                            <Col xs={12} md={6}>
                                <h5 style={{ color: '#92a9bd' }}>&#9632; ???????? ??????????????</h5>
                            </Col>
                        </Row>
                        <Container style={{ width: "60%" }}>
                            <CircularProgressbarWithChildren
                                value={gdodkshirotsum}
                                strokeWidth={10}
                                styles={buildStyles({
                                    pathColor: "#56758f",
                                    trailColor: "#cfdae2"
                                })}
                            >
                                {/* Width here needs to be (100 - 2 * strokeWidth)% in order to fit exactly inside the outer progressbar.*/}
                                <div style={{ width: "78%" }}>
                                    <CircularProgressbarWithChildren
                                        value={gdodtrainingsum}
                                        strokeWidth={13}
                                        styles={buildStyles({
                                            pathColor: "#92a9bd",
                                            trailColor: "#cfd9e2"
                                        })}
                                    >
                                    </CircularProgressbarWithChildren>
                                </div>
                            </CircularProgressbarWithChildren>
                        </Container>
                    </CardBody>
                 
                    <CardFooter onClick={(e) => togglePanel(e)} style={{ direction: "rtl", cursor: 'pointer', textAlign: 'center', paddingBottom: '0px' }}>
                        <img onClick={(e) => togglePanel(e)} src={downarrowpic} alt="downarrow" style={{ marginTop: '-16px', cursor: 'pointer', height: '2rem' }} />
                    </CardFooter>
                </Card>
             /*card is closed*/}
        </>
    );
}
export default withRouter(DisplayGdodCard);;

