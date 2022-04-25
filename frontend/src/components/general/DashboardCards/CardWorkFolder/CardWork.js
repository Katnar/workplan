
import React, { useEffect, useState } from "react";
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import inwork from "../../../../assets/img/Work_in_progress.png";
import {
  Card,
  CardText,
  CardBody,
  CardLink,
  CardTitle,
  Row,
  Collapse,
  Button,
} from "reactstrap";

import * as CardWorkFuncs from './CardWorkFuncs';

const AdminCardWork = (props) => {
  const [tipuls, setTipuls] = useState(0)
  const [tipulsinprogress, setTipulsInprogress] = useState(0)
  const [tipulscompleted, setTipulsCompleted] = useState(0)

  async function init() {
    if (props.unittype === "admin") {
      let datafromfunc = await CardWorkFuncs.fetchAdminWorkData();
      setTipuls(datafromfunc.tipuls)
      setTipulsInprogress(datafromfunc.tipulsinprogress)
      setTipulsCompleted(datafromfunc.tipulscompleted)
    }
    if (props.unittype === "pikod") {
      let datafromfunc = await CardWorkFuncs.fetchPikodWorkData(props.pikodid);
      setTipuls(datafromfunc.tipuls)
      setTipulsInprogress(datafromfunc.tipulsinprogress)
      setTipulsCompleted(datafromfunc.tipulscompleted)
    }
    if (props.unittype === "ogda") {
      let datafromfunc = await CardWorkFuncs.fetchOgdaWorkData(props.ogdaid);
      setTipuls(datafromfunc.tipuls)
      setTipulsInprogress(datafromfunc.tipulsinprogress)
      setTipulsCompleted(datafromfunc.tipulscompleted)
    }
    if (props.unittype === "hativa") {
      let datafromfunc = await CardWorkFuncs.fetchHativaWorkData(props.hativaid);
      setTipuls(datafromfunc.tipuls)
      setTipulsInprogress(datafromfunc.tipulsinprogress)
      setTipulsCompleted(datafromfunc.tipulscompleted)
    }
    if (props.unittype === "gdod") {
      let datafromfunc = await CardWorkFuncs.fetchGdodWorkData(props.gdodid);
      setTipuls(datafromfunc.tipuls)
      setTipulsInprogress(datafromfunc.tipulsinprogress)
      setTipulsCompleted(datafromfunc.tipulscompleted)
    }
  }

  useEffect(() => {
    init();
  }, [])

  const percentage = tipulscompleted
  return (
    <Card style={{ textAlign: 'center', background: '#ADC2A9', borderRadius: '40px', height: '100%', boxShadow: "0 5px 15px 0 rgb(0 0 0 / 10%), 0 5px 15px 0 rgb(0 0 0 / 15%)" }}>
      <CardBody style={{ textAlign: 'center', padding: '2px' }}>
        <CardTitle tag="h1" style={{ textAlign: "center", fontWeight: "bold", color: 'white' }}>
        זמינות וכשירות האמל״ח
        </CardTitle>

        <div style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
          {/* <CircularProgressbar value={percentage.toFixed(0)} text={`${percentage.toFixed(0)}%`} styles={{
            root: {},
            path: {
              stroke: `rgb(0 221 3)`,
              strokeLinecap: 'round',
              transition: 'stroke-dashoffset 0.5s ease 0s',
            },
            trail: {
              stroke: '#ffffff',
              strokeLinecap: 'round',
              transform: 'rotate(0.25turn)',
              transformOrigin: 'center center',
            },
            text: {
              fill: 'white',
              fontSize: '16px',
            },
            background: {
              fill: '#3e98c7',
            },
          }} /> */}
          <img src={inwork}/>
        </div>

        <div>
        <CardText style={{ fontWeight: 'bold', color: 'white', fontSize: '20px' }}>
          {/* קצונה: 83% */}
          בתהליכי עבודה
        </CardText>
          {/* <CardText style={{ fontWeight: 'bold', color: 'white', fontSize: '20px' }}>טיפולים בתכנון: {tipuls}</CardText> */}
          {/* <CardText style={{ fontWeight: 'bold', color: 'white', fontSize: '20px' }}>טיפולים בתהליך: {tipulsinprogress.toFixed(0)}%</CardText> */}
          {/* <CardText style={{ fontWeight: 'bold', color: 'white', fontSize: '20px' }}>טיפולים שבוצעו: {tipulscompleted.toFixed(0)}%</CardText> */}
        </div>
      </CardBody>
    </Card>
  );
};

export default AdminCardWork;