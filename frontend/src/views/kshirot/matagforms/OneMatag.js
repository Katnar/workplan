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

const OneMatag = ({ id }) => {
    const [matag, setMatag] = useState([])
    const [matagsum, setMatagSum] = useState(0);

    const [isOpen, setIsOpen] = useState(false);
    function togglePanel(e) {
        setIsOpen(!isOpen);
    }

    const loadMatag = () => {
        axios.get(`http://localhost:8000/api/matag/${id}`)
            .then(response => {
                setMatag(response.data);
                CalculateMatagSum(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function CalculateMatagSum(matag) {//46 fields means 2.17% every field. rn=> 
        const tempmatag = matag[0];
        console.log(tempmatag);
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
        setMatagSum(30);
    }

    /*end of data */

    const card1healine = "כללי";
    const card1tableheaders = [
        "פרטים כלליים",
        "מטרות האימון",
        "ממלא הטופס",];
    const card1tabledata = matag[0] ?
        [matag[0].klali, matag[0].target, matag[0].name]
        : null;

    const card2healine = "מדדי סף לכשירות המטאגים";
    const card2tableheaders = [
        "התייצבות קט''א חטיבה וקט''א גדודי בכל גדוד מהחטיבה",
        "התייצבות מטאג",
        "התייצבות 70% מחטפים מכלל החטיבות",
        "התייצבות 70% מכלל נגדי החטיבה",
        "ביצוע נוה''ק מלא עד רמת תיאום תכנית ע''י קט''א חטיבה לכל גדוד",
        "תרגול ניהו''ק",
        " רכב/נגמ''ש 25א'",
        "נגמ''ש צי''ד 15 א'",
        "נגמ''ש כתק''ד 19 אחד לכל גדוד",
        "נגמ''ש חט''פ 9 אחד לכל גדוד",
        "נגמ''ש כתק''ל 19 ב' אחד לכל גדוד",
        "אחוז ההתיצבות לאימון",
        "רמת מערכת ההכנות",
        "מידת הגדרת נושאי חי''ח ללימוד ותרגול",
        "הזנת נתונים ונספח אחזקה במשואה",
    ];
    const card2tabledata = matag[0] ?
        [matag[0].kata, matag[0].matag, matag[0].mhtapim, matag[0].nagadim, matag[0].nohak, matag[0].nihok, matag[0].car, matag[0].nagmashzid, matag[0].nagmashkatkd, matag[0].nagmashhatap, matag[0].nagmashkatkl, matag[0].emon, matag[0].maracht+'/5', matag[0].limod+'/5', matag[0].natonim+'/5']
        : null;

    const card3healine = "נוהל הקרב";
    const card3tableheaders = [
        "קבלת פקודות אחזקה רמה ממונה",
        "רמת בקיאות",
        "רמת בקיאות בסדכ",
        "רמת כתיבת נספח אחזקה",
        "תיאום תוכנית האחזקה ע''י קט''א חטיבה",
        "איכות הכנת עזרים",
        "רמת השליטה בנתוני צל''ם לאחזקה",
        "רמת ביצוע חישובי שחיקה",
        "רמת הבקיאות במיקום כוחות שכנים",
    ];
    const card3tabledata = matag[0] ?
        [matag[0].kabalatpkodot, matag[0].ramatbkiot+'/5', matag[0].bkiotbasadak+'/5', matag[0].ramatktiva+'/5', matag[0].tiomtohnit, matag[0].ehotazarim+'/5', matag[0].ramathashlita+'/5', matag[0].ramatbizoa+'/5', matag[0].ramatbkiotkhot+'/5']
        : null;

    const card4healine = "ניהול הקרב";
    const card4tableheaders = [
        "מידת הרציפות במענה האחזקתי",
        "רמת התיאום והשליטה בתנועה ובמיקום כוחות אג''ם ואחזקה",
        "תרגול פינוי פצועים במסגרת החט''פ",
        "רמת השליטה בתמונת המצב",
        "רמת הבקרה על ביצוע תוכנית האחזקה",
        "מידת קבלה ומסירה של דוחות עיתיים",
        "רמת ביצוע הערכת מצב מתמשכת",
        "איכות יחסי הגומלין בתוך מערכי האחזקה",
        "איכות יחסי הגומלין עם הפלוגות",
        "רמת ביצוע סיכומי ביניים",
        "מידת יישום לקחים מאימונים קודמים",
        "ביצוע סיכום האימון בסיום האימון",
        "הפצת סיכום אימון ותוכנית עבודה לשיפור הליקויים שנתגלו",
        "ביצוע מבחני רמה לקט''אי גדוד, ממטא''גים, מנהלי עבודה, מחטפ''ים, אחראי ניהול מלאי",
    ];
    const card4tabledata = matag[0] ?
        [matag[0].midatrazifot+'/5', matag[0].ramathatiomkhot+'/5', matag[0].tirgolpinoi+'/5', matag[0].ramathashlitabtmona+'/5', matag[0].ramathabakara+'/5', matag[0].midathakabaladohot+'/5', matag[0].ramatbizoamtmasht+'/5', matag[0].ehotgomlin+'/5', matag[0].ehotgomlinplogot+'/5', matag[0].sikombnaim+'/5', matag[0].lkahim+'/5', matag[0].sikomemon, matag[0].hafaza+'/5', matag[0].bizoambhnim+'/5']
        : null;

    useEffect(() => {
        loadMatag();
    }, [id])

    return (
        <>
            <Container>
                {/*id*/}
                {id != null ?
                    <>
                        <Card>
                            <CardHeader style={{ direction: 'rtl' }}>
                                <CardTitle tag="h4" style={{ direction: 'rtl', textAlign: 'right' }}>ציון כללי: {matagsum.toString().slice(0, 4)}/100</CardTitle>{/*headline*/}
                            </CardHeader>

                            <CardBody style={{ direction: 'ltr', textAlign: 'right' }}>
                            {matagsum ?
                                    matagsum < 50 ?
                                        <Progress color="guydanger" value={matagsum} style={{height:'2rem',backgroundColor:'rgb(250 250 250)',boxShadow:'0px 0px 0px 0px rgb(0 0 0 / 30%)'}}>{matagsum.toString().slice(0, 4)}%</Progress>
                                        : matagsum < 75 ?
                                            <Progress color="guywarning" value={matagsum} style={{height:'2rem',backgroundColor:'rgb(250 250 250)',boxShadow:'0px 0px 0px 0px rgb(0 0 0 / 30%)'}}>{matagsum.toString().slice(0, 4)}%</Progress>
                                            : matagsum < 100 ?
                                                <Progress color="guysuccess" value={matagsum} style={{height:'2rem',backgroundColor:'rgb(250 250 250)',boxShadow:'0px 0px 0px 0px rgb(0 0 0 / 30%)'}}>{matagsum.toString().slice(0, 4)}%</Progress>
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
                                          {matag.map((matag, i) => (
                                            matag ?
                                                <dl>
                                                    <dt>חוו''ד מאמן: {matag.mashov}/5</dt>
                                                    <dt>לקחים לתורה, טנ''ה ואופרטיבי: {matag.lkahimtene}</dt>
                                                    <dt>לקחים לארגון ותקינה: {matag.lkahimergon}</dt>
                                                    <dt>לקחים לכוח אדם: {matag.lkahimadam}</dt>
                                                    <dt>לקחים לאימונים והכשרות: {matag.lkahimemon}</dt>
                                                    <dt>לקחים לאמצעים ואמל''ח: {matag.lkahimamlah}</dt>
                                                    <dt>נקודות לשיפור: {matag.shipor}</dt>
                                                    <dt>נקודות לשימור: {matag.shimor}</dt>
                                                    <dt>סיכום המאמן: {matag.sicommamn}</dt>
                                                    <dt>סיכום המתאמן: {matag.sicommitaman}</dt>
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
                                <p>לא קיים אימון חטיבתי לחטיבה זו.</p>
                            </CardBody>
                        </Card>
                    </>}
            </Container>
        </>
    );
}
export default withRouter(OneMatag);;

