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
        if (temptipul.match == 'קיים')
            tempkshirotsum += 2;
        if (temptipul.load == 'קיים')
            tempkshirotsum += 2;
        if (temptipul.stash == 'בוצע')
            tempkshirotsum += 2;
        if (temptipul.hatak == 'קיים')
            tempkshirotsum += 2;
        if (temptipul.lastrefreshdate == 'עומד')
            tempkshirotsum += 2;
        if (temptipul.matchmahin == 'קיים')
            tempkshirotsum += 2;
        if (temptipul.matchswap == 'קיים')
            tempkshirotsum += 2;
        if (temptipul.catalogs == 'קיים')
            tempkshirotsum += 2;
        if (temptipul.mobilitytools == 'קיים')
            tempkshirotsum += 2;
        if (temptipul.carlahh == 'קיים')
            tempkshirotsum += 2;
        if (temptipul.katkal == 'קיים')
            tempkshirotsum += 2;
        if (temptipul.personalprotection == 'קיים')
            tempkshirotsum += 2;
        if (temptipul.pkodotopara == 'קיים')
            tempkshirotsum += 2;
        if (temptipul.tiom == 'קיים')
            tempkshirotsum += 2;
        if (temptipul.commanderconf == 'קיים')
            tempkshirotsum += 2;
        if (temptipul.pakalim == 'קיים')
            tempkshirotsum += 2;
        if (temptipul.tikim == 'בוצע')
            tempkshirotsum += 2;
        if (temptipul.boxcontent == 'קיים')
            tempkshirotsum += 2;
        if (temptipul.battaliondrillamount == 'בוצע')
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
        if (temptraining.emon == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.maflag == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.kata == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.kitathalafim == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.kitatnaot == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.kitacala == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.a == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.b == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.d == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.nispach == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.nohak == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.nihok == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.azarim == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.pkodotmasoa == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.sadak == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.tadrich == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.pkodotahzaka == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.tiom == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.aishor == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.shimosbashob == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.shimosbashob2 == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.sicomimon == 'בוצע')
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
                                <h5 style={{ color: '#56758f' }}>&#9632; ציון כשירויות</h5>
                            </Col>
                            <Col xs={12} md={6}>
                                <h5 style={{ color: '#92a9bd' }}>&#9632; ציון אימונים</h5>
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

                        <h4 style={{ color: "#56758f" }}>{gdodkshirotsum}:ציון כשירות</h4>
                        <div className="chart-area">
                            <GdodKshirotHistoryGraph gdodid={id} />
                        </div>

                        <h4 style={{ color: "#92a9bd" }}>{gdodtrainingsum}:ציון אימון</h4>
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
                                <h5 style={{ color: '#56758f' }}>&#9632; ציון כשירויות</h5>
                            </Col>
                            <Col xs={12} md={6}>
                                <h5 style={{ color: '#92a9bd' }}>&#9632; ציון אימונים</h5>
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

