import Unittablerow from "./Unittablerow"
import React, { useEffect, useState } from 'react';
import axios from 'axios'
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

import { Link, withRouter, Redirect } from "react-router-dom";

import MeagedalCard from "components/workplan/UpkeepPlan/MeagedalCard"

// reactstrap components
import {
    Button,
    Row,
    Col,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle,
} from "reactstrap";
const Unittablecard = (props) => {
    //
    const [gdods, setGdods] = useState([]);
    //
    const [magadals, setMagadals] = useState([])

    function init() {
        getMagadals();
        loadGdods();
    }

    const getalldata = async () => {
        await axios.get(`http://localhost:8000/api/smarttipuls/undefined/undefined/undefined/undefined/undefined/undefined/undefined/undefined/undefined/undefined/undefined/undefined/undefined`)
            .then(response => {
                setMagadals(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const getMagadals = async () => {
        await axios.get(`http://localhost:8000/api/magadal`)
            .then(response => {
                setMagadals(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const loadGdods = () => {
        axios.post("http://localhost:8000/api/gdod/gdodsbyhativaid", { hativa: props.hativa })
            .then(response => {
                setGdods(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        init();
    }, []);
    return (
        <Row style={{ direction: 'rtl', border: '1px solid black', padding: '20px', boxShadow: '5px 5px grey', marginBottom: '25px' }} >
            <div style={{ fontWeight: 'bold' }}>{props.hativa.name}</div>
            <Col>
                <Card style={{backgroundColor:'transparent'}}>
                    <CardBody>
                        <Row>
                            {gdods.map((gdod, i) => (
                                gdod ?
                                    <>
                                        <Col>
                                            <CardSubtitle tag="h6" className="mb-2 text-muted" style={{ textAlign: 'center' }}>{gdod.name}</CardSubtitle>
                                            <table style={{ textAlign: 'right' }}>
                                                <thead>
                                                    <th>סוג כלי</th>
                                                    <th>תכנון</th>
                                                    <th>בתהליך</th>
                                                    <th>ביצוע</th>
                                                    <th>אחוז ביצוע</th>
                                                </thead>
                                                <tbody>
                                                    {magadals.map((magadal, i) => (
                                                        magadal ?
                                                            <>
                                                                <Unittablerow magadal={magadal} gdod={gdod} />
                                                            </>
                                                            : null
                                                    ))}
                                                </tbody>
                                            </table>
                                        </Col>
                                    </>
                                    : null
                            ))}
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default Unittablecard;