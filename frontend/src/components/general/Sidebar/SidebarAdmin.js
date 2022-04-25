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

import { ThemeContext, themes } from "contexts/ThemeContext";

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

import logomea from 'assets/img/team100.png';

import { isAuthenticated } from "auth/index";

function SidebarAdmin() {
  const [color, setcolor] = useState("transparent");
  const { user } = isAuthenticated();
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
      <ThemeContext.Consumer>
        {({ changeTheme, theme }) => (
          theme == "white-content" ?
            setcolor("black")
            : setcolor("white")
        )}
      </ThemeContext.Consumer>
      <div className="logo">
        <img src={Logoeged}></img>
      </div>
      <Nav style={{ textAlign: "right" }}>

        {/* <li>
          <NavLink to="/dashboard" style={{ margin: '0px' }} activeClassName="sidebar_active_link">
            <Row style={{ direction: "rtl" }}>
              <Col xs={12} md={3} style={{ paddingLeft: "0px" }}>
                <img src={home} style={{ height: "20px" }}></img>
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4 style={{ color: color }}>
                  דף הבית
                </h4>
              </Col>
            </Row>
          </NavLink>
        </li> */}
        {user.workplan === "0" || "1" ? (
          <li>
            {/* <Navbar
   style={{
    display: "block",
    cursor: "pointer",
    margin: "0px",
    paddingRight: "8px",
   }}
   onClick={toggleNavbar1}
 >
   <Row style={{ direction: "rtl" }}>
     <Col xs={12} md={3} style={{ paddingLeft: "0px" }}>
       <img src={table} style={{ height: "25px" }}></img>
     </Col>
     <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
       <h4 style={{ color:color}}>
         תוכניות עבודה
             </h4>
     </Col>
   </Row>
   <Collapse isOpen={!collapsed1} navbar>
     <NavLink to="/workplantable" className="nav-link"  activeClassName="sidebar_active_link" >
       <h4 style={{ color:color}}>טבלה מסכמת</h4>
     </NavLink>
     <NavLink to="/upkeep" className="nav-link"  activeClassName="sidebar_active_link">
       <h4 style={{ color:color}}>
         סיכום לפי פלטפורמות
       </h4>
     </NavLink>
     <NavLink to="/unittable" className="nav-link">
       <h4 style={{  }}>סיכום לפי יחידות</h4>
     </NavLink>
     <NavLink to="/allcarstable" className="nav-link"  activeClassName="sidebar_active_link">
       <h4 style={{ color:color}}>'טבלת צ</h4>
     </NavLink>
     <NavLink to="/allhistorytipuls" className="nav-link"  activeClassName="sidebar_active_link">
       <h4 style={{ color:color}}>טבלת שינויים</h4>
     </NavLink>
   </Collapse>
 </Navbar> */}
          </li>
        ) : null}
        {user.kshirot === "0" || "1" ? (
          <li>
            <NavLink to="/useradmineditpage" style={{ margin: '0px' }}>
              <Row style={{ direction: "rtl" }}>
                <Col xs={12} md={3} style={{ paddingLeft: "0px" }}>
                  <img src={shortlist} style={{ height: "20px" }}></img>
                </Col>
                <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                  <h4 style={{ color: color }}>
                    כשירות המסגרת
                  </h4>
                </Col>
              </Row>
            </NavLink>
          </li>
        ) : null}
        {user.zminot === "0" || "1" ? (
          <li>
            {/* <Navbar
    style={{
      display: "block",
      cursor: "pointer",
      margin: "0px",
      paddingRight: "8px",
    }}
    onClick={toggleNavbar3}
  >
    <Row style={{ direction: "rtl" }}>
      <Col xs={12} md={3} style={{ paddingLeft: "0px" }}>
        <img src={people} style={{ height: "25px" }}></img>
      </Col>
      <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
        <h4 style={{ color:color}}>
          זמינות
              </h4>
      </Col>
    </Row>
    <Collapse isOpen={!collapsed3} navbar>
      <NavLink to="/addpikod" className="nav-link"  activeClassName="sidebar_active_link">
        <h4 style={{ color:color}}>
          הצג זמינות לפי יחידות
              </h4>
      </NavLink>
      <NavLink to="/addogda" className="nav-link"  activeClassName="sidebar_active_link">
        <h4 style={{ color:color}}>
          הצג זמינות לפי פלטפורמות
              </h4>
      </NavLink>
      <NavLink to="/addhativa" className="nav-link"  activeClassName="sidebar_active_link">
        <h4 style={{ color:color}}>ניתוח זמינות</h4>
      </NavLink>
    </Collapse>
  </Navbar> */}
          </li>
        ) : null}

        {user.adam === "0" || "1" ? (
          <li>
            {/* <Navbar
   style={{
    display: "block",
    cursor: "pointer",
    margin: "0px",
    paddingRight: "8px",
   }}
   onClick={toggleNavbar4}
 >
   <Row style={{ direction: "rtl" }}>
     <Col xs={12} md={3} style={{ paddingLeft: "0px" }}>
       <img src={followers} style={{ height: "25px" }}></img>
     </Col>
     <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
       <h4 style={{ color:color}}>
         כוח אדם
             </h4>
     </Col>
   </Row>
   <Collapse isOpen={!collapsed4} navbar>
     <NavLink to="/addpikod" className="nav-link"  activeClassName="sidebar_active_link">
       <h4 style={{ color:color}}>הכשרות</h4>
     </NavLink>
     <NavLink to="/addogda" className="nav-link"  activeClassName="sidebar_active_link">
       <h4 style={{ color:color}}>דרגות</h4>
     </NavLink>
   </Collapse>
 </Navbar> */}
          </li>
        ) : null}

        <li>
          <Navbar
            style={{
              display: "block",
              cursor: "pointer",
              margin: "0px",
              paddingRight: "8px",
            }}
            onClick={toggleNavbar5}
          >
            <Row style={{ direction: "rtl" }}>
              <Col xs={12} md={3} style={{ paddingLeft: "0px" }}>
                <img src={links} style={{ height: "20px" }}></img>
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4 style={{ color: color }}>
                  קישורים שימושיים
                </h4>
              </Col>
            </Row>
            <Collapse isOpen={!collapsed5} navbar>
              <a href="/" target="_blank">
                <h4 style={{ color: color }}>אתר החיל</h4>
              </a>
              <a href="/" target="_blank">
                <h4 style={{ color: color }}>הוראות קטנא"ר</h4>
              </a>
              <a href="/" target="_blank">
                <h4 style={{ color: color }}>
                  תורה חיילית
                </h4>
              </a>
            </Collapse>
          </Navbar>
        </li>

        <li>
          <NavLink to="/manageusers" style={{ margin: '0px' }} activeClassName="sidebar_active_link">
            <Row style={{ direction: "rtl" }}>
              <Col xs={12} md={3} style={{ paddingLeft: "0px" }}>
                <img src={editusers} style={{ height: "20px" }}></img>
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4 style={{ color: color }}>
                  עריכת משתמשים
                </h4>
              </Col>
            </Row>
          </NavLink>
        </li>

        {/* <li>
          <NavLink to="/setting" style={{margin:'0px'}} activeClassName="sidebar_active_link">
            <Row style={{ direction: "rtl" }}>
              <Col xs={12} md={3} style={{ paddingLeft: "0px" }}>
                <img src={setting} style={{ height: "20px" }}></img>
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4 style={{ color:color }}>
                  הגדרות
                </h4>
              </Col>
            </Row>
          </NavLink>
        </li> */}
      </Nav>
   
    </>
  );
}

export default SidebarAdmin;
