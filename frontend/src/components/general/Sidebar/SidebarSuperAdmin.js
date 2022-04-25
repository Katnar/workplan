import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";

// reactstrap components
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";

import {
  BackgroundColorContext,
  backgroundColors,
} from "contexts/BackgroundColorContext";

import Logoeged from "assets/img/logotene2.png";
import home from "assets/img/home3.png";
import table from "assets/img/table.png";
import followers from "assets/img/followers.png";
import shortlist from "assets/img/shortlist.png";
import people from "assets/img/people.png";
import editusers from "assets/img/editusers.png";
import links from "assets/img/links.png";
import setting from "assets/img/setting.png";


import { signout } from "auth/index";
import history from "../../../history";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Container,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Alert,
  Spinner,
  Label,
  Col,
} from "reactstrap";

import { signin, authenticate, isAuthenticated } from "auth/index";

function SidebarSuperAdmin() {
  const { user } = isAuthenticated();
  console.log(user)
  const [collapsed1, setCollapsed1] = useState(true);
  const [collapsed2, setCollapsed2] = useState(true);
  const [collapsed3, setCollapsed3] = useState(true);
  const [collapsed4, setCollapsed4] = useState(true);
  const [collapsed5, setCollapsed5] = useState(true);

  const toggleNavbar1 = () => setCollapsed1(!collapsed1);
  const toggleNavbar2 = () => setCollapsed2(!collapsed2);
  const toggleNavbar3 = () => setCollapsed3(!collapsed3);
  const toggleNavbar4 = () => setCollapsed4(!collapsed4);
  const toggleNavbar5 = () => setCollapsed5(!collapsed5);

  const clickSubmit = (event) => {
    event.preventDefault();
    signout().then((response) => {
      history.push(`/signin`);
    });
  };
  

  return (
    <>
      <div className="logo">
        <img src={Logoeged}></img>
      </div>
      <Nav style={{ textAlign: "right" }}>
        {/* <li>
          <NavLink to="/dashboard" activeClassName="sidebar_active_link">
            <Row style={{ direction: "rtl" }}>
              <Col xs={12} md={3} style={{ paddingLeft: "0px" }}>
                <img src={home} style={{ height: "25px" }}></img>
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4 style={{ fontWeight: "bold", fontSize: "20px" }}>
                  דף הבית
                      </h4>
              </Col>
            </Row>
          </NavLink>
        </li> */}
        <li>
          {/* <Navbar
            style={{
              display: "block",
              cursor: "pointer",
              margin: "0px",
              paddingRight: "22px",
            }}
            onClick={toggleNavbar1}
          >
            <Row style={{ direction: "rtl" }}>
              <Col xs={12} md={3} style={{ paddingLeft: "0px" }}>
                <img src={table} style={{ height: "25px" }}></img>
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4 style={{ fontWeight: "bold", fontSize: "20px" }}>
                  תוכניות עבודה
                      </h4>
              </Col>
            </Row>
            <Collapse isOpen={!collapsed1} navbar>
              <NavLink to="/workplantable" className="nav-link"  activeClassName="sidebar_active_link" >
                <h4 style={{ fontWeight: "bold" }}>טבלה מסכמת</h4>
              </NavLink>
              <NavLink to="/upkeep" className="nav-link"  activeClassName="sidebar_active_link">
                <h4 style={{ fontWeight: "bold" }}>
                  סיכום לפי פלטפורמות
                </h4>
              </NavLink>
              <NavLink to="/unittable" className="nav-link">
                <h4 style={{ fontWeight: "bold" }}>סיכום לפי יחידות</h4>
              </NavLink>
              <NavLink to="/allcarstable" className="nav-link"  activeClassName="sidebar_active_link">
                <h4 style={{ fontWeight: "bold" }}>'טבלת צ</h4>
              </NavLink>
              <NavLink to="/allhistorytipuls" className="nav-link"  activeClassName="sidebar_active_link">
                <h4 style={{ fontWeight: "bold" }}>טבלת שינויים</h4>
              </NavLink>
            </Collapse>
          </Navbar> */}
        </li>
        <li>
          <Navbar
            style={{
              display: "block",
              cursor: "pointer",
              margin: "0px",
              paddingRight: "22px",
            }}
            onClick={toggleNavbar2}
          >
            <Row style={{ direction: "rtl" }}>
              <Col xs={12} md={3} style={{ paddingLeft: "0px" }}>
                <img src={shortlist} style={{ height: "25px" }}></img>
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4 style={{ fontWeight: "bold", fontSize: "20px" }}>
                  כשירות המסגרת
                      </h4>
              </Col>
            </Row>
            <Collapse isOpen={!collapsed2} navbar>
              <NavLink to="/kshirottree" className="nav-link"  activeClassName="sidebar_active_link">
                <h4 style={{ fontWeight: "bold" }}>פתח מערכת כשירות</h4>
              </NavLink>
            </Collapse>
          </Navbar>
        </li>
        <li>
          {/* <Navbar
            style={{
              display: "block",
              cursor: "pointer",
              margin: "0px",
              paddingRight: "22px",
            }}
            onClick={toggleNavbar3}
          >
            <Row style={{ direction: "rtl" }}>
              <Col xs={12} md={3} style={{ paddingLeft: "0px" }}>
                <img src={people} style={{ height: "25px" }}></img>
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4 style={{ fontWeight: "bold", fontSize: "20px" }}>
                  זמינות
                      </h4>
              </Col>
            </Row>
            <Collapse isOpen={!collapsed3} navbar>
              <NavLink to="/addpikod" className="nav-link"  activeClassName="sidebar_active_link">
                <h4 style={{ fontWeight: "bold" }}>
                  הצג זמינות לפי יחידות
                      </h4>
              </NavLink>
              <NavLink to="/addogda" className="nav-link"  activeClassName="sidebar_active_link">
                <h4 style={{ fontWeight: "bold" }}>
                  הצג זמינות לפי פלטפורמות
                      </h4>
              </NavLink>
              <NavLink to="/addhativa" className="nav-link"  activeClassName="sidebar_active_link">
                <h4 style={{ fontWeight: "bold" }}>ניתוח זמינות</h4>
              </NavLink>
            </Collapse>
          </Navbar> */}
        </li>
        <li>
          {/* <Navbar
            style={{
              display: "block",
              cursor: "pointer",
              margin: "0px",
              paddingRight: "22px",
            }}
            onClick={toggleNavbar4}
          >
            <Row style={{ direction: "rtl" }}>
              <Col xs={12} md={3} style={{ paddingLeft: "0px" }}>
                <img src={followers} style={{ height: "25px" }}></img>
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4 style={{ fontWeight: "bold", fontSize: "20px" }}>
                  כוח אדם
                      </h4>
              </Col>
            </Row>
            <Collapse isOpen={!collapsed4} navbar>
              <NavLink to="/addpikod" className="nav-link"  activeClassName="sidebar_active_link">
                <h4 style={{ fontWeight: "bold" }}>הכשרות</h4>
              </NavLink>
              <NavLink to="/addogda" className="nav-link"  activeClassName="sidebar_active_link">
                <h4 style={{ fontWeight: "bold" }}>דרגות</h4>
              </NavLink>
            </Collapse>
          </Navbar> */}
        </li>
        <li>
          <Navbar
            style={{
              display: "block",
              cursor: "pointer",
              margin: "0px",
              paddingRight: "22px",
            }}
            onClick={toggleNavbar5}
          >
            <Row style={{ direction: "rtl" }}>
              <Col xs={12} md={3} style={{ paddingLeft: "0px" }}>
                <img src={links} style={{ height: "25px" }}></img>
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4 style={{ fontWeight: "bold", fontSize: "20px" }}>
                  קישורים שימושיים
                      </h4>
              </Col>
            </Row>
            <Collapse isOpen={!collapsed5} navbar>
            <a href="/" target="_blank">
                <h4 style={{ fontWeight: "bold" }}>תורה חילית</h4>
              </a>
              <a href="/" target="_blank">
                <h4 style={{ fontWeight: "bold" }}>הוראות קטנא"ר</h4>
              </a>
              <a href="/" target="_blank">
                <h4 style={{ fontWeight: "bold" }}>
                  מערכת לניהול טיפולים
                      </h4>
              </a>
            </Collapse>
          </Navbar>
        </li>
        <li>
          <NavLink to="/manageusers"  activeClassName="sidebar_active_link">
            <Row style={{ direction: "rtl" }}>
              <Col xs={12} md={3} style={{ paddingLeft: "0px" }}>
                <img src={editusers} style={{ height: "25px" }}></img>
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4 style={{ fontWeight: "bold", fontSize: "20px" }}>
                  עריכת משתמשים
                      </h4>
              </Col>
            </Row>
          </NavLink>
        </li>
        <li>
          {/* <NavLink to="/setting"  activeClassName="sidebar_active_link">
            <Row style={{ direction: "rtl" }}>
              <Col xs={12} md={3} style={{ paddingLeft: "0px" }}>
                <img src={setting} style={{ height: "25px" }}></img>
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4 style={{ fontWeight: "bold", fontSize: "20px" }}>
                  הגדרות
                      </h4>
              </Col>
            </Row>
          </NavLink> */}
        </li>
      </Nav>
      <div style={{justifyContent:'center',textAlign:'center', bottom: 0,width:'100%'}}>
        <Button
          onClick={clickSubmit}
          className="btn-info"
          style={{width:'80%'}}
        >
          התנתק
            </Button>
      </div>
    </>
  );
}

export default SidebarSuperAdmin;
