
import React, { useEffect, useState } from "react";
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
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

import * as CardKshirotFuncs from './CardKshirotFuncs.js';

const CardKshirot = (props) => {
  const [kshirot, setKshirot] = useState(0);
  const [training, setTraining] = useState(0);

  async function init() {
    if (props.unittype === "admin") {
      let datafromfunc = await CardKshirotFuncs.fetchAdminKshirotData();
      setKshirot(datafromfunc.kshirot);
      setTraining(datafromfunc.training);
    }
    if (props.unittype === "pikod") {
      let datafromfunc = await CardKshirotFuncs.fetchPikodKshirotData(props.pikodid);
      setKshirot(datafromfunc.kshirot);
      setTraining(datafromfunc.training);
    }
    if (props.unittype === "ogda") {
      let datafromfunc = await CardKshirotFuncs.fetchOgdaKshirotData(props.ogdaid);
      setKshirot(datafromfunc.kshirot);
      setTraining(datafromfunc.training);
    }
    if (props.unittype === "hativa") {
      let datafromfunc = await CardKshirotFuncs.fetchHativaKshirotData(props.hativaid);
      setKshirot(datafromfunc.kshirot);
      setTraining(datafromfunc.training);
    }
    if (props.unittype === "gdod") {
      let datafromfunc = await CardKshirotFuncs.fetchGdodKshirotData(props.gdodid);
      setKshirot(datafromfunc.kshirot);
      setTraining(datafromfunc.training);
    }
  }

  useEffect(() => {
    init();
  }, [])

  const percentage = (kshirot + training) / 2

  return ( 

<Card style={{ textAlign: 'center', background: '#99A799', borderRadius: '40px', height: '100%', boxShadow: "0 5px 15px 0 rgb(0 0 0 / 10%), 0 5px 15px 0 rgb(0 0 0 / 15%)" }}>
      <CardBody style={{ textAlign: 'center', padding: '2px' }}>
        <CardTitle tag="h1" style={{ textAlign: "center", fontWeight: "bold", color: 'white' }}>
        כשירות מסגרות אחזקה
        </CardTitle>

        <div style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
          <CircularProgressbar value={percentage.toFixed(0)} text={`${percentage.toFixed(0)}%`} styles={{
            path: {
              stroke: `#4f594e`,
              strokeLinecap: 'round',
              transition: 'stroke-dashoffset 0.5s ease 0s',
            },
            trail: {
              stroke: '#FEF5ED',
              strokeLinecap: 'round',
              transform: 'rotate(0.25turn)',
              transformOrigin: 'center center',
            },
            text: {
              fill: 'white',
              fontSize: '16px',
            },
          }} />
        </div>

        <div>
          {/* <CardText style={{ fontWeight: 'bold', color: 'white', fontSize: '20px' }}>כשירות: {kshirot.toFixed(0)}%</CardText>
          <CardText style={{ fontWeight: 'bold', color: 'white', fontSize: '20px' }}>אימון: {training.toFixed(0)}%</CardText> */}
        </div>
      </CardBody>
    </Card>
  );
};

export default CardKshirot;