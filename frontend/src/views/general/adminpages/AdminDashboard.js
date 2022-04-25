import React, { useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

import { Link, withRouter, Redirect } from "react-router-dom";
import { Link as RouterLink } from 'react-router-dom'

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

import Cardadam from "components/general/DashboardCards/CardAdam";
import CardKshirot from "components/general/DashboardCards/CardKshirotFolder/CardKshirot";
import CardZminot from "components/general/DashboardCards/CardZminot";
import CardWork from "components/general/DashboardCards/CardWorkFolder/CardWork";

import UserCard from "components/general/DashboardCards/UserCard/UserCard";

import plus from "assets/img/add.png";

function Rtl() {

  return (
    <>
      <Container>
        <UserCard />
      </Container>

      <Container>
        <Row>
          <Col lg="4">
            <Link to={'/useradmineditpage'}>
              <CardKshirot unittype="admin"/>
            </Link>
          </Col>
          <Col lg="4">
          {/* to={'/workplantable'} */}
            <Link >
              <CardWork unittype="admin"/>
            </Link>
          </Col>
          <Col lg="4">
            <Link>
              <Cardadam title="כוח אדם" />
            </Link>
          </Col>
          {/* <Col lg="3">
            <Link>
              <CardZminot title="זמינות" />
            </Link>
          </Col> */}
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
                <Card style={{ textAlign: 'center', background: '#F3E9DD', borderRadius: '80px', height: '250px' }}>
                  <CardBody style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                  <a href="/" target="_blank">
                    <img src={plus} style={{ height: "80px" }}>
                   
                    </img>
                    </a>
                  </CardBody>
                </Card>
              </Col>
              <Col>
                <Card style={{ textAlign: 'center', background: '#F3E9DD', borderRadius: '80px', height: '250px' }}>
                  <CardBody style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                  <a href="/" target="_blank">
                    <img src={plus} style={{ height: "80px" }}>
                   
                    </img>
                    </a>
                  </CardBody>
                </Card>
              </Col>
              <Col>
                <Card style={{ textAlign: 'center', background: '#F3E9DD', borderRadius: '80px', height: '250px' }}>
                  <CardBody style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                  <a href="/" target="_blank">
                    <img src={plus} style={{ height: "80px" }}>
                   
                    </img>
                    </a>
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