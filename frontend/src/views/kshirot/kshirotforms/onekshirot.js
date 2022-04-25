import React, { useState, useEffect } from 'react';
import { Link, withRouter, Redirect } from "react-router-dom";

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
import OpenCard from 'components/kshirot/OpenCard/OpenCard';

const Onekshirot = (props) => {
    const [activetipuls, setActivetipuls] = useState([])
    const [kshirotsum, setKshirotSum] = useState(0);

    const loadActivetipuls = () => {
        axios.get(`http://localhost:8000/api/kshirot/${props.id}`)
            .then(response => {
                setActivetipuls(response.data);
                CalculateKshirotSum(response.data[0]);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function CalculateKshirotSum(kshirot) {//42 fields means 2.3....% every field. rn=> every field 2% mentality 18%
        const temptipul = kshirot;
        console.log(temptipul);
        if (temptipul.officersmax == 0)
            temptipul.officersmax = 1
        if (temptipul.tekenmax == 0)
            temptipul.tekenmax = 1
        if (temptipul.toolsboxmax == 0)
            temptipul.toolsboxmax = 1
        if (temptipul.bakashmax == 0)
            temptipul.bakashmax = 1
        if (temptipul.carpitermax == 0)
            temptipul.carpitermax = 1
        if (temptipul.carhatapmax == 0)
            temptipul.carhatapmax = 1
        if (temptipul.rioarrowmax == 0)
            temptipul.rioarrowmax = 1
        if (temptipul.shibozmax == 0)
            temptipul.shibozmax = 1
        if (temptipul.driversmax == 0)
            temptipul.driversmax = 1
        if (temptipul.tikshoratmax == 0)
            temptipul.tikshoratmax = 1
        if (temptipul.tkinotmax == 0)
            temptipul.tkinotmax = 1
        if (temptipul.roleholdersmax == 0)
            temptipul.roleholdersmax = 1
        if (temptipul.nokavimmax == 0)
            temptipul.nokavimmax = 1
        if (temptipul.testermax == 0)
            temptipul.testermax = 1
        if (temptipul.amountmhalafmax == 0)
            temptipul.amountmhalafmax = 1
        if (temptipul.amounthanafamax == 0)
            temptipul.amounthanafamax = 1


        var tempkshirotsum = 0;
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

        console.log(tempkshirotsum);
        setKshirotSum(50);
    }

    function check() {
        let basket = 0
        let water = 0
        console.log((basket = +basket || 0) / (water = +water || 0) * 2)
    }
    /*end of data */

    const card1healine = "פרטים כלליים";
    const card1tableheaders = [
        "יחידה",
        "שם מפקד",
        "תאריך תחילת תפקיד",
        'שם קצין טנ"א',
        "טלפון"];
    const card1tabledata = activetipuls.length > 0 ?
        [activetipuls[0].unit ? activetipuls[0].unit : '-', activetipuls[0].commandername ? activetipuls[0].commandername : '-', activetipuls[0].timeinrole ? activetipuls[0].timeinrole.slice(0, 10) : '-', activetipuls[0].name ? activetipuls[0].name : '-', activetipuls[0].phone ? activetipuls[0].phone : '-']
        : null;

    const card2healine = "כוח אדם";
    const card2tableheaders = [
        "בעלי תפקיד תקינה",
        "בעלי תפקיד מצבה",
        "בעלי מקצוע תקינה",
        "בעלי מקצוע מצבה",
    ];
    const card2tabledata = activetipuls[0] ?
        [activetipuls[0].kzinim ? activetipuls[0].kzinim : '-', activetipuls[0].kzinimmax ? activetipuls[0].kzinimmax : '-', activetipuls[0].officers ? activetipuls[0].officers : '-', activetipuls[0].officersmax ? activetipuls[0].officersmax : '-']
        : null;

    const card3healine = "מלאי";
    const card3tableheaders = [
        "אמצעי אחזקה תקן",
        "אמצעי אחזקה מצבה",
        "ארגז כלים",
        "ארגז כלים מצבה",
        "התאמת כע לסוג הצלם",
        "יכולת העמסה",
        "הילום מלאי",
        'חט"כ',
        "בק״ש",
        "בקש מצבה",
        "תאריך רענון אחרון (תוקף 8 שנים)",
        'התאמת חלפים לצל"ם-רישום מכין',
        'התאמת ערכות חלפים לצל"ם',
        "קטלוגים",
    ];
    const card3tabledata = activetipuls[0] ?
        [activetipuls[0].teken ? activetipuls[0].teken : '-', activetipuls[0].tekenmax ? activetipuls[0].tekenmax : '-', activetipuls[0].toolsbox ? activetipuls[0].toolsbox : '-', activetipuls[0].toolsboxmax ? activetipuls[0].toolsboxmax : '-', activetipuls[0].match ? activetipuls[0].match : '-', activetipuls[0].load ? activetipuls[0].load : '-', activetipuls[0].stash ? activetipuls[0].stash : '-', activetipuls[0].hatak ? activetipuls[0].hatak : '-', activetipuls[0].bakash ? activetipuls[0].bakash : '-', activetipuls[0].bakashmax ? activetipuls[0].bakashmax : '-', activetipuls[0].lastrefreshdate ? activetipuls[0].lastrefreshdate.slice(0, 10) : '-', activetipuls[0].matchmahin ? activetipuls[0].matchmahin : '-', activetipuls[0].matchswap ? activetipuls[0].matchswap : '-', activetipuls[0].catalogs ? activetipuls[0].catalogs : '-',]
        : null;

    const card4healine = "ארגון ותשתיות";
    const card4tableheaders = [
        "נגמש פיטר",
        "נגמש פיטר מצבה",
        "נגמש חטפ",
        "נגמש חטפ מצבה",
        "אמצעי ניוד מפלג טנא",
        "רכב לחח",
        "כתקל/כיתת עורב/בקש/בימל צמה",
        "ריאו חץ/עגור20",
        "ריאו חץ/עגור20 מצבה",
        "מיגון אישי",
    ];
    const card4tabledata = activetipuls[0] ?
        [activetipuls[0].carpiter ? activetipuls[0].carpiter : '-', activetipuls[0].carpitermax ? activetipuls[0].carpitermax : '-', activetipuls[0].carhatap ? activetipuls[0].carhatap : '-', activetipuls[0].carhatapmax ? activetipuls[0].carhatapmax : '-', activetipuls[0].mobilitytools ? activetipuls[0].mobilitytools : '-', activetipuls[0].carlahh ? activetipuls[0].carlahh : '-', activetipuls[0].katkal ? activetipuls[0].katkal : '-', activetipuls[0].rioarrow ? activetipuls[0].rioarrow : '-', activetipuls[0].rioarrowmax ? activetipuls[0].rioarrowmax : '-', activetipuls[0].personalprotection ? activetipuls[0].personalprotection : '-']
        : null;

    const card5healine = "אופרטיבי";
    const card5tableheaders = [
        "התאמה שיבוץ לקרבי",
        "התאמה שיבוץ לקרבי מצבה",
        "נהגים לכל פלטפורמת ניוד",
        "נהגים לכל פלטפורמת ניוד מצבה",
        "פקודות אופרטיביות",
        "תיאום רמה ממונה",
        "אישור מפקד",
        "פק''לים",
        "אמצעי קשר/תקשורת",
        "אמצעי קשר/תקשורת מצבה",
        "מצאי עמדות שוב תקינות",
        "מצאי עמדות שוב תקינות מצבה",
        "הזנת תיק נתוני יחידות פקודות ומפות במשואה",
        "בעלי תפקידים מוכשרים",
        "בעלי תפקידים מוכשרים מצבה",
        "תכולת ארגז עפ טנה 1"
    ];
    const card5tabledata = activetipuls[0] ?
        [activetipuls[0].shiboz ? activetipuls[0].shiboz : '-', activetipuls[0].shibozmax ? activetipuls[0].shibozmax : '-', activetipuls[0].drivers ? activetipuls[0].drivers : '-', activetipuls[0].driversmax ? activetipuls[0].driversmax : '-', activetipuls[0].pkodotopara ? activetipuls[0].pkodotopara : '-', activetipuls[0].tiom ? activetipuls[0].tiom : '-', activetipuls[0].commanderconf ? activetipuls[0].commanderconf : '-', activetipuls[0].pakalim ? activetipuls[0].pakalim : '-', activetipuls[0].tikshorat ? activetipuls[0].tikshorat : '-', activetipuls[0].tikshoratmax ? activetipuls[0].tikshoratmax : '-', activetipuls[0].tkinot ? activetipuls[0].tkinot : '-', activetipuls[0].tkinotmax ? activetipuls[0].tkinotmax : '-', activetipuls[0].tikim ? activetipuls[0].tikim : '-', activetipuls[0].roleholders ? activetipuls[0].roleholders : '-', activetipuls[0].roleholdersmax ? activetipuls[0].roleholdersmax : '-', activetipuls[0].boxcontent ? activetipuls[0].boxcontent : '-',]
        : null;

    const card6healine = "אימונים והכשרות";
    const card6tableheaders = [
        "אימון פלגת טנא- כמות",
        "אימון פלגת טנא- איכות",
        "תרגיל גדוד כמות",
        "תרגיל גדוד איכות",
        "אחוז מחטפים שעברו קורס מחטפים",
        "אחוז מחטפים שעברו קורס מחטפים מצבה",
        "מעוכבי שלב יחידה",
        "מעוכבי שלב יחידה מצבה",
        "תעודות בוחן",
        "תעודות בוחן מצבה",
        "כמות מוסמכי מחלף",
        "כמות מוסמכי מחלף מצבה",
        "כמות מוסמכי הנפה",
        "כמות מוסמכי הנפה מצבה"
    ];
    const card6tabledata = activetipuls[0] ?
        [activetipuls[0].trainingamount ? activetipuls[0].trainingamount.slice(0, 10) : '-', activetipuls[0].trainingquality ? activetipuls[0].trainingquality : '-', activetipuls[0].battaliondrillamount ? activetipuls[0].battaliondrillamount : '-', activetipuls[0].battaliondrillquality ? activetipuls[0].battaliondrillquality : '-', activetipuls[0].kors ? activetipuls[0].kors : '-', activetipuls[0].korsmax ? activetipuls[0].korsmax : '-', activetipuls[0].nokavim ? activetipuls[0].nokavim : '-', activetipuls[0].nokavimmax ? activetipuls[0].nokavimmax : '-', activetipuls[0].tester ? activetipuls[0].tester : '-', activetipuls[0].testermax ? activetipuls[0].testermax : '-', activetipuls[0].amountmhalaf ? activetipuls[0].amountmhalaf : '-', activetipuls[0].amountmhalafmax ? activetipuls[0].amountmhalafmax : '-', activetipuls[0].amounthanafa ? activetipuls[0].amounthanafa : '-', activetipuls[0].amounthanafamax ? activetipuls[0].amounthanafamax : '-',]
        : null;

    useEffect(() => {
        loadActivetipuls();
    }, [props.id])

    return (
        <>
            <Container>
                {props.id != null ?
                    <>
                        <Card>
                            <CardHeader style={{ direction: 'rtl' }}>
                                <CardTitle tag="h4" style={{ direction: 'rtl', textAlign: 'right' }}>ציון כללי: {kshirotsum.toString().slice(0, 4)}/100</CardTitle>
                            </CardHeader>

                            <CardBody style={{ direction: 'ltr', textAlign: 'right' }}>
                                {kshirotsum ?
                                    kshirotsum < 50 ?
                                        <Progress color="guydanger" value={kshirotsum} style={{ height: '2rem', backgroundColor: 'rgb(250 250 250)', boxShadow: '0px 0px 0px 0px rgb(0 0 0 / 30%)' }}>{kshirotsum.toString().slice(0, 4)}%</Progress>
                                        : kshirotsum < 75 ?
                                            <Progress color="guywarning" value={kshirotsum} style={{ height: '2rem', backgroundColor: 'rgb(250 250 250)', boxShadow: '0px 0px 0px 0px rgb(0 0 0 / 30%)' }}>{kshirotsum.toString().slice(0, 4)}%</Progress>
                                            : kshirotsum < 100 ?
                                                <Progress color="guysuccess" value={kshirotsum} style={{ height: '2rem', backgroundColor: 'rgb(250 250 250)', boxShadow: '0px 0px 0px 0px rgb(0 0 0 / 30%)' }}>{kshirotsum.toString().slice(0, 4)}%</Progress>
                                                : null
                                    : null}
                            </CardBody>
                        </Card>
                        <Row>
                            <Col xs={12} md={6}>
                                <OpenCard Headline={card1healine} Tableheaders={card1tableheaders} Tabledata={card1tabledata} />
                            </Col>
                            <Col xs={12} md={6}>
                                <OpenCard Headline={card2healine} Tableheaders={card2tableheaders} Tabledata={card2tabledata} />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={6}>
                                <OpenCard Headline={card3healine} Tableheaders={card3tableheaders} Tabledata={card3tabledata} />
                            </Col>
                            <Col xs={12} md={6}>
                                <OpenCard Headline={card4healine} Tableheaders={card4tableheaders} Tabledata={card4tabledata} />
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} md={6}>
                                <OpenCard Headline={card5healine} Tableheaders={card5tableheaders} Tabledata={card5tabledata} />
                            </Col>
                            <Col xs={12} md={6}>
                                <OpenCard Headline={card6healine} Tableheaders={card6tableheaders} Tabledata={card6tabledata} />
                            </Col>
                        </Row>

                        <Card>
                            <CardHeader style={{ direction: 'rtl' }}>
                                <CardTitle tag="h4" style={{ direction: 'rtl', textAlign: 'right' }}>חוסן מנטלי: {activetipuls[0] ? activetipuls[0].mentality : null}</CardTitle>
                            </CardHeader>
                        </Card>
                    </>
                    : <>
                        <Card>
                            <CardHeader style={{ direction: 'rtl' }}>
                                <CardTitle tag="h4" style={{ direction: 'rtl', textAlign: 'right' }}></CardTitle>
                            </CardHeader>
                            <CardBody style={{ direction: 'rtl', textAlign: 'right' }}>
                                <p>לא קיים לגדוד זה כשירות.</p>
                            </CardBody>
                        </Card>
                    </>}
            </Container>
        </>
    );
}
export default withRouter(Onekshirot);;

