import React, { useState, useEffect, useRef } from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

import { Link, withRouter, Redirect } from "react-router-dom";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Container,
  Col,
  Collapse,
} from "reactstrap";
import axios from 'axios';


import Cardadam from "components/general/DashboardCards/CardAdam";
import CardKshirot from "components/general/DashboardCards/CardKshirotFolder/CardKshirot";
import CardZminot from "components/general/DashboardCards/CardZminot";
import CardWork from "components/general/DashboardCards/CardWorkFolder/CardWork";

import UserCard from "components/general/DashboardCards/UserCard/UserCard";

import plus from "assets/img/add.png";

function Rtl({ match }) {

  const [pikod, setPikod] = useState([])

  function init() {
    getPikod();
  }

  const getPikod = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/pikod/pikodbyid`, [match.params.pikodid])
      setPikod(response.data[0]);
    }
    catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

  useEffect(() => {
    init();
  }, [])

  return (
    <>
      <Container>
        <UserCard />
      </Container>

      <Container>
        <Row>
          <Col lg="3">
            <Link>
              <CardKshirot unittype="pikod" pikodid={match.params.pikodid}/>
            </Link>
          </Col>
          <Col lg="3">
            <Link>
              <CardWork unittype="pikod" pikodid={match.params.pikodid}/>
            </Link>
          </Col>
          <Col lg="3">
            <Link>
              <Cardadam title="כוח אדם" />
            </Link>
          </Col>
          <Col lg="3">
            <Link>
              <CardZminot title="זמינות" />
            </Link>
          </Col>
        </Row>
      </Container>

      <Container style={{ paddingTop: '2rem' }}>
        <Card style={{ borderRadius: '40px' }}>
          <CardHeader>
            <CardTitle tag="h2" style={{ float: "right", fontWeight: 'bold' }}>
              קישורים חיצוניים
            </CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>
                <Card style={{ textAlign: 'center', background: 'linear-gradient(0deg, rgb(84 162 245) 0%, rgb(78 95 225) 100%)', borderRadius: '80px', height: '250px' }}>
                  <CardBody style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                    <img src={plus} style={{ height: "80px" }}></img>
                  </CardBody>
                </Card>
              </Col>
              <Col>
                <Card style={{ textAlign: 'center', background: 'linear-gradient(0deg, rgb(84 162 245) 0%, rgb(78 95 225) 100%)', borderRadius: '80px', height: '250px' }}>
                  <CardBody style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                    <img src={plus} style={{ height: "80px" }}></img>
                  </CardBody>
                </Card>
              </Col>
              <Col>
                <Card style={{ textAlign: 'center', background: 'linear-gradient(0deg, rgb(84 162 245) 0%, rgb(78 95 225) 100%)', borderRadius: '80px', height: '250px' }}>
                  <CardBody style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                    <img src={plus} style={{ height: "80px" }}></img>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </>
  );
}

export default withRouter(Rtl);