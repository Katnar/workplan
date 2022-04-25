
import React, { useState } from "react";
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Line, Bar } from "react-chartjs-2";
import inwork from "../../../assets/img/Work_in_progress.png";
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

import { chartExample2 } from "variables/charts.js";
import history from '../../../history';

const AdminCardAdam = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const percentage = 20;
  const clickSubmit = (event) => {
    event.preventDefault()
    history.push(`/kshirottree`);

  }
  return (
    <Card style={{ textAlign: 'center', background: '#D3E4CD', borderRadius: '40px', height: '100%', boxShadow: "0 5px 15px 0 rgb(0 0 0 / 10%), 0 5px 15px 0 rgb(0 0 0 / 15%)" }}>
      <CardBody style={{ textAlign: 'center', padding: '2px' }}>

        <CardTitle tag="h1" style={{ textAlign: "center", fontWeight: "bold", color: 'white' }}>
          {props.title}
        </CardTitle>

        <div style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
          {/* <CircularProgressbar value={percentage} text={`${percentage}%`} styles={{
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
          <img src={inwork} />
        </div>

        <CardText style={{ fontWeight: 'bold', color: 'white', fontSize: '20px' }}>
          {/* קצונה: 83% */}
          בתהליכי עבודה
        </CardText>
        {/* <CardText style={{ fontWeight: 'bold', color: 'white', fontSize: '20px' }}>נגדים: 91%</CardText>
        <CardText style={{ fontWeight: 'bold', color: 'white', fontSize: '20px' }}>אע"צים: 76%</CardText> */}

      </CardBody>
    </Card>
  );
};

export default AdminCardAdam;