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

const OneTraining = ({ id }) => {
    const [training, setTraining] = useState([])
    const [trainingsum, setTrainingSum] = useState(0);

    const [isOpen, setIsOpen] = useState(false);
    function togglePanel(e) {
        setIsOpen(!isOpen);
    }

    const loadTraining = () => {
        axios.get(`http://localhost:8000/api/training/${id}`)
            .then(response => {
                setTraining(response.data);
                CalculateTrainingSum(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function CalculateTrainingSum(training) {//46 fields means 2.17% every field. rn=> 
        const temptraining = training[0];
        console.log(temptraining);
        var temptrainingsum = 0;
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
        setTrainingSum(temptrainingsum);
    }

    const card1healine = "פרטים כלליים";
    const card1tableheaders = [
        "פרטים כללים",
        "מטרות האימון",
        "פרטי הסגל המתאמן",
    ];
    const card1tabledata = training[0] ?
    [training[0].details,training[0].goals,"----"]
    : null;

    const card2healine = "מדדי סף לאימון";
    const card2tableheaders = [
        "התייצבות מפל''ג/קט''א",
        "התייצבות קט''א/מנהל עבודה",
        "התייצבות מפקד כיתת חלפים",
        "התייצבות מפקד כיתת נאו''ת",
        "התייצבות מפקד כיתה קלה (רכב)",
        "19/19 א'",
        "19 ב'",
        "19 ד'",
        "כתיבת נספח אחזקה",
        "הכנת תלקון נוה''ק",
        "הכנת תלקון ניהו''ק",
        "הכנת עזרים (שוב''ך)",
        "הזנת פקודות אחזקה במשואה",
        "הזנת סד''כ כלים וכשירות",
        "ביצוע תדריך מפל''ג"
    ];
    const card2tabledata = training[0] ?
    [training[0].maflag,training[0].kata,training[0].kitathalafim,training[0].kitatnaot,training[0].kitacala,training[0].a,training[0].b,training[0].d,training[0].nispach,training[0].nohak,training[0].nihok,training[0].azarim,training[0].pkodotmasoa,training[0].sadak,training[0].tadrich]
    : null;

    const card3healine = "נוהל הקרב";
    const card3tableheaders = [
        "קבלת פקודת אחזקה מרמה ממונה",
        "רמת בקיאות בגזרת הלחימה",
        "רמת בקיאות בסד''כ, משימות ויכולות",
        "רמת כתיבת נספח אחזקה",
        "תיאום תוכניות האחזקה ע''י קט''א חטיבה",
        "איכות הכנת עזרים",
        "אישור תוכניות ע''י המג''ד",
        "רמת השליטה בנתוני צל''ם לאחזקה",
        "רמת ביצוע חישובי שחיקה",
        "רמת הבקיאות במיקום כוחות שכנים",
        "רמת הבקיאות ביכולות מערך האחזקה בגדוד, בחטיבה ובכוחות האחזקה המרחביים",
        "שימוש במערכת השו''ב",
        "רמת הבקיאות והשליטה במערכת השו''ב"
    ];
    const card3tabledata = training[0] ?
    [training[0].pkodotahzaka,training[0].bkiot+'/5',training[0].bkiotsadac+'/5',training[0].ramatnispach+'/5',training[0].tiom,training[0].azarimquality+'/5',training[0].aishor,training[0].zlm+'/5',training[0].shika+'/5',training[0].bkiotmikom+'/5',training[0].bkiotbgdod+'/5',training[0].shimosbashob,training[0].bkiotbashob+'/5']
    : null;

    const card4healine = "ניהול הקרב";
    const card4tableheaders = [
        "רמת השליטה בכוחות קטנים",
        "מידת הרציפות במענה האחזקתי",
        "רמת התיאום והשליטה בתנועה ובמיקום כוחות אג''ם אחזקה",
        "רמת השליטה בתמונת המצב",
        "מידת התאמת מאמץ האחזקה לתמונת המצב",
        "ניהול העזרים",
        "מידת קבלה ומסירה של דוחות עיתיים",
        "הפקת משמעויות מהערכת מצב מתמשכת",
        "איכות יחסי הגומלין בתוך מערכי האחזקה",
        "איכות יחסי הגומלין עם הפלגות",
        "איכות יחסי הגומלין עם מפקדת הגדוד",
        "שימוש במערכת שו''ב בניהול הקרב",
        "רמת השימוש במערכת השו''ב במכלול המנהלה תוך כדי ניהול הקרב"
    ];
    const card4tabledata = training[0] ?
    [training[0].ramatshlita+'/5',training[0].razifot+'/5',training[0].ramattiom+'/5',training[0].shlitabmazav+'/5',training[0].midathatama+'/5',training[0].nihol+'/5',training[0].midatkabala+'/5',training[0].hafakat+'/5',training[0].ehot+'/5',training[0].ehotplogot+'/5',training[0].ehotmfkada+'/5',training[0].shimosbashob2,training[0].bkiotbashob2+'/5']
    : null;

    useEffect(() => {
        loadTraining();
    }, [id])

    return (
        <>
            <Container>
                {id != null ?
                    <>
                        <Card>
                            <CardHeader style={{ direction: 'rtl' }}>
                                <CardTitle tag="h4" style={{ direction: 'rtl', textAlign: 'right' }}>ציון כללי: {trainingsum.toString().slice(0, 4)}/100</CardTitle>{/*headline*/}
                            </CardHeader>

                            <CardBody style={{ direction: 'ltr', textAlign: 'right' }}>
                            {trainingsum ?
                                    trainingsum < 50 ?
                                        <Progress color="guydanger" value={trainingsum} style={{height:'2rem',backgroundColor:'rgb(250 250 250)',boxShadow:'0px 0px 0px 0px rgb(0 0 0 / 30%)'}}>{trainingsum.toString().slice(0, 4)}%</Progress>
                                        : trainingsum < 75 ?
                                            <Progress color="guywarning" value={trainingsum} style={{height:'2rem',backgroundColor:'rgb(250 250 250)',boxShadow:'0px 0px 0px 0px rgb(0 0 0 / 30%)'}}>{trainingsum.toString().slice(0, 4)}%</Progress>
                                            : trainingsum < 100 ?
                                                <Progress color="guysuccess" value={trainingsum} style={{height:'2rem',backgroundColor:'rgb(250 250 250)',boxShadow:'0px 0px 0px 0px rgb(0 0 0 / 30%)'}}>{trainingsum.toString().slice(0, 4)}%</Progress>
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
                            <Col xs={12} md={12}>
                                <Card>
                                    <CardHeader onClick={(e) => togglePanel(e)} style={{ direction: "rtl", cursor: 'pointer' }}>
                                        <h4 style={{ direction: "rtl", textAlign: "start", margin: '0px' }}>סיכום</h4>
                                    </CardHeader>
                                    {isOpen ? ( //card is open
                                        <CardBody style={{ direction: "rtl" }}>
                                          {training.map((training, i) => (
                                            training ?
                                                <dl>
                                                    <dt>רמת בניית עקומת למידה: {training.lamida}/5</dt>
                                                    <dt>רמת ביצוע סיכומי ביניים: {training.sicombainaim}/5</dt>
                                                    <dt>ביצוע מבחני רמה למפקדים: {training.rama}/5</dt>
                                                    <dt>ביצוע סיכום האימון בסיום האימון: {training.sicomimon}</dt>
                                                    <dt>ביצוע אימון משטח חילוץ: {training.imonhiloz}/5</dt>
                                                    <dt>לקחים לתורה, טנ"ה ואופרטיבי: {training.lkhaimtene}</dt>
                                                    <dt>לקחים לאמצעים ואמל"ח: {training.lkhaimamlah}</dt>
                                                    <dt>לקחים לכוח אדם: {training.lkhaimadam}</dt>
                                                    <dt>לקחים לאימונים והכשרות: {training.lkhaimlimon}</dt>
                                                    <dt>לקחים לארגון ותקינה: {training.lkhaimlirgon}</dt>
                                                    <dt>נקודות לשיפור: {training.shipor}</dt>
                                                    <dt>נקודות לשימור: {training.shimor}</dt>
                                                    <dt>סיכום חונך אחזקה: {training.sicomhonach}</dt>
                                                    <dt>סיכום המתאמן: {training.sicomhmitaman}</dt>
                                                </dl> : null
                                        ))}
                                        </CardBody>
                                    )
                                        : null /*card is closed*/}
                                </Card>
                            </Col>
                        </Row>
                    </>
                    : <>
                        <Card>
                            <CardHeader style={{ direction: 'rtl' }}>
                                <CardTitle tag="h4" style={{ direction: 'rtl', textAlign: 'right' }}></CardTitle>{/*headline*/}
                            </CardHeader>
                            <CardBody style={{ direction: 'rtl', textAlign: 'right' }}>
                                <p>לא קיים לגדוד זה אימון.</p>
                            </CardBody>
                        </Card>
                    </>}
            </Container>
        </>
    );
}
export default withRouter(OneTraining);;

