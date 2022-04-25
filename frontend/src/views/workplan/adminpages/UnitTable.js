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
import Unittablerow from 'components/workplan/UnitsTables/Unittablerow';
import Unittablecard from 'components/workplan/UnitsTables/Unittablecard';
function UnitTable() {



  const [hativas, setHativas] = useState([]);


  function init() {
    loadHativas();
  }


  const loadHativas = () => {
    axios.get("http://localhost:8000/api/hativa")
      .then(response => {
        setHativas(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }


  useEffect(() => {
    init();
  }, []);


  return (
    <>



      <Row>
        <h3 style={{ fontWeight: 'bold' }}>סיכום לפי יחידות</h3>
      </Row>
      {hativas.map((hativa, i) => (
        hativa ?
          <>

            <Unittablecard hativa={hativa} />

          </>
          : null
      ))}





    </>
  );
}

export default withRouter(UnitTable);;