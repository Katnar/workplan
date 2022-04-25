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

const DisplayPikodCard = ({ id }) => {
    const { user } = isAuthenticated();
    const [pikod, setPikod] = useState([]);


    const [pikodkshirot, setPikodKshirot] = useState(0);
    const [pikodtraining, setPikodTraining] = useState(0);
    const [pikodmatag, setPikodMatag] = useState(0);

    function init() {
        getPikod();
    }

    function getPikod() {
        axios.post(`http://localhost:8000/api/pikod/pikodbyid`, [id])
            .then(response => {
                setPikod(response.data[0]);
                findPikodData(response.data[0]._id);
            })
            .catch(error => {

            })
    }

    const findPikodData = async (pikodid) => {
        let gdodswithkshirotindex = 0;
        let gdodswithtrainingindex = 0;
        let hativaswithmatagindex = 0;

        let temppikodkshirot = 0;
        let temppikodtraining = 0;
        let temppikodmatag = 0;

        let res = await axios.post(`http://localhost:8000/api/ogda/ogdasbypikodid`, { pikod: pikodid })
        let data = res.data;
        for (let i = 0; i < data.length; i++) {
            let res1 = await axios.post(`http://localhost:8000/api/hativa/hativasbyogdaid`, { ogda: data[i]._id })
            let data1 = res1.data;
            for (let j = 0; j < data1.length; j++) {
                if(data1[j].matag)
                {
                hativaswithmatagindex += 1;
                temppikodmatag += await loadhativamatag(data1[j].matag)
                }
                let res2 = await axios.post(`http://localhost:8000/api/gdod/gdodsbyhativaid`, { hativa: data1[j]._id })
                let data2 = res2.data;
                for (let k = 0; k < data2.length; k++) {
                    if(data2[k].kshirot)
                    {
                        gdodswithkshirotindex += 1;
                        temppikodkshirot += await loadgdodkshirot(data2[k].kshirot)
                    }
                    if(data2[k].training)
                    {
                        gdodswithtrainingindex += 1;
                        temppikodtraining += await loadgdodtraining(data2[k].training)
                    }
                }
            }
        }
        if(gdodswithkshirotindex!=0)
        temppikodkshirot = temppikodkshirot / gdodswithkshirotindex

        if(gdodswithtrainingindex!=0)
        temppikodtraining = temppikodtraining / gdodswithtrainingindex

        if(hativaswithmatagindex!=0)
        temppikodmatag = temppikodmatag / hativaswithmatagindex

        setPikodKshirot(temppikodkshirot)
        setPikodTraining(temppikodtraining)
        setPikodMatag(temppikodmatag)
    };

    async function loadgdodkshirot(kshirotid) {
        if (kshirotid != undefined) {
            let res = await axios.get(`http://localhost:8000/api/kshirot/${kshirotid}`)
            let data = res.data[0];
            return (CalculateKshirotSum(data));
        }
        else {
            return (0)
        }
    }

    async function loadgdodtraining(trainingid) {
        if (trainingid != undefined) {
            let res = await axios.get(`http://localhost:8000/api/training/${trainingid}`)
            let data = res.data[0];
            return (CalculateTrainingSum(data));
        }
        else {
            return (0)
        }
    }

    async function loadhativamatag(matagid) {
        if (matagid != undefined) {
            let res = await axios.get(`http://localhost:8000/api/matag/${matagid}`)
            let data = res.data[0];
            return (CalculateMatagSum(data));
        }
        else {
            return (0)
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

    function CalculateMatagSum(matag) {//46 fields means 2.17% every field. rn=> 
        const tempmatag = matag;
        var tempmatagsum = 0;
        if (tempmatag.kata == 'בוצע')
            tempmatagsum += 2;
        if (tempmatag.matag == 'בוצע')
            tempmatagsum += 2;
        if (tempmatag.mhtapim == 'בוצע')
            tempmatagsum += 2;
        if (tempmatag.nagadim == 'בוצע')
            tempmatagsum += 2;
        if (tempmatag.nohak == 'בוצע')
            tempmatagsum += 2;
        if (tempmatag.nihok == 'בוצע')
            tempmatagsum += 2;
        if (tempmatag.car == 'בוצע')
            tempmatagsum += 2;
        if (tempmatag.nagmashzid == 'בוצע')
            tempmatagsum += 2;
        if (tempmatag.nagmashkatkd == 'בוצע')
            tempmatagsum += 2;
        if (tempmatag.nagmashhatap == 'בוצע')
            tempmatagsum += 2;
        if (tempmatag.nagmashkatkl == 'בוצע')
            tempmatagsum += 2;
        if (tempmatag.kabalatpkodot == 'בוצע')
            tempmatagsum += 2;
        if (tempmatag.tiomtohnit == 'בוצע')
            tempmatagsum += 2;
        if (tempmatag.sikomemon == 'בוצע')
            tempmatagsum += 2;

        // console.log(tempmatagsum);//i=14 =>max 28
        var temparr = [];
        temparr.push(
            tempmatag.maracht,
            tempmatag.limod,
            tempmatag.natonim,
            tempmatag.ramatbkiot,
            tempmatag.bkiotbasadak,
            tempmatag.ramatktiva,
            tempmatag.ehotazarim,
            tempmatag.ramathashlita,
            tempmatag.ramatbizoa,
            tempmatag.ramatbkiotkhot,
            tempmatag.midatrazifot,
            tempmatag.ramathatiomkhot,
            tempmatag.tirgolpinoi,
            tempmatag.ramathashlitabtmona,
            tempmatag.ramathabakara,
            tempmatag.midathakabaladohot,
            tempmatag.ramatbizoamtmasht,
            tempmatag.ehotgomlin,
            tempmatag.ehotgomlinplogot,
            tempmatag.sikombnaim,
            tempmatag.lkahim,
            tempmatag.hafaza,
            tempmatag.bizoambhnim,
            tempmatag.mashov,
        )
        for (var i = 0; i < temparr.length; i++) //i=24 => max 48pts
        {
            if (temparr[i] == 1) {
                tempmatagsum += 0;
            }
            if (temparr[i] == 2) {
                tempmatagsum += 1;
            }
            if (temparr[i] == 3) {
                tempmatagsum += 1;
            }
            if (temparr[i] == 4) {
                tempmatagsum += 1;
            }
            if (temparr[i] == 5) {
                tempmatagsum += 2;
            }
        }
        //28pts+48pts=76+24=100
        tempmatagsum += 24;
        return (tempmatagsum);
    }

    /*end of data */

    useEffect(() => {
        init();
    }, [id])

    return (
        <>
            {id != null ?
                <>
                <Link style={{ color: "black" }} to={`/userpikodeditpage/${pikod._id}`}>
                    <Card>
                        <CardHeader style={{ direction: 'rtl' }}>
                            <CardTitle tag="h4" style={{ direction: 'rtl', textAlign: 'right' }}>{pikod.name}</CardTitle>
                        </CardHeader>

                        <CardBody style={{ direction: 'ltr', textAlign: 'right' }}>
                            <Row style={{ direction: 'rtl', textAlign: 'center' }}>
                                <Col xs={12} md={4}>
                                    <h5 style={{ color: '#56758f' }}>&#9632; ציון כשירויות</h5>
                                </Col>
                                <Col xs={12} md={4}>
                                    <h5 style={{ color: '#92a9bd' }}>&#9632; ציון אימונים</h5>
                                </Col>
                                <Col xs={12} md={4}>
                                    <h5 style={{ color: '#A7C7E7' }}>&#9632; ציון מטא"ג בפיקוד</h5>
                                </Col>
                            </Row>
                            <Container style={{ width: "60%" }}>
                                <CircularProgressbarWithChildren
                                    value={pikodkshirot}
                                    strokeWidth={10}
                                    styles={buildStyles({
                                        pathColor: "#56758f",
                                        trailColor: "#cfdae2"
                                    })}
                                >
                                    <div style={{ width: "78%" }}>
                                        <CircularProgressbarWithChildren
                                            value={pikodtraining}
                                            strokeWidth={13}
                                            styles={buildStyles({
                                                pathColor: "#92a9bd",
                                                trailColor: "#cfd9e2"
                                            })}
                                        >
                                            <div style={{ width: "72%" }}>
                                                <CircularProgressbarWithChildren
                                                    value={pikodmatag}
                                                    strokeWidth={17}
                                                    styles={buildStyles({
                                                        pathColor: "#A7C7E7",
                                                        trailColor: "#d7e6f4"
                                                    })}
                                                ></CircularProgressbarWithChildren>
                                            </div>
                                        </CircularProgressbarWithChildren>
                                    </div>
                                </CircularProgressbarWithChildren>
                            </Container>
                            {pikodkshirot != 'NaN' ?
                                <h4 style={{ color: "#56758f", margin: '0px' }}>{pikodkshirot.toFixed(2)}:ציון כשירות גדודים בפיקוד</h4>
                                : <h4 style={{ color: "#56758f", margin: '0px' }}>:ציון כשירות גדודים בפיקוד</h4>
                            }
                            {pikodtraining != 'NaN' ?
                                <h4 style={{ color: "#92a9bd", margin: '0px' }}>{pikodtraining.toFixed(2)}:ציון אימוני גדוד בפיקוד</h4>
                                : <h4 style={{ color: "#92a9bd", margin: '0px' }}>:ציון אימוני גדוד בפיקוד</h4>
                            }
                            <h4 style={{ color: "#A7C7E7", margin: '0px' }}>{pikodmatag.toFixed(2)}:ציון מטא"ג בפיקוד</h4>
                        </CardBody>
                    </Card>
                    </Link>
                </>
                : <>
                    <Card>
                        <CardHeader style={{ direction: 'rtl' }}>
                            <CardTitle tag="h4" style={{ direction: 'rtl', textAlign: 'right' }}></CardTitle>
                        </CardHeader>
                        <CardBody style={{ direction: 'rtl', textAlign: 'right' }}>
                            <p>שגיאה בקריאת אוגדה</p>
                        </CardBody>
                    </Card>
                    
                </>}
        </>
    );
}
export default withRouter(DisplayPikodCard);;

