
import React, { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import {
    Card,
    CardText,
    CardBody,
    CardLink,
    CardTitle,
    Container,
    Row,
    Col,
    Collapse,
    Button,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
} from "reactstrap";
import { ThemeContext, themes } from "contexts/ThemeContext";

import logomea from 'assets/img/teammeadark.png';

import table from "assets/img/table.png";
import shortlist from "assets/img/shortlist.png";
import people from "assets/img/people.png";
import followers from "assets/img/followers.png";

const UserAdminSidebar = (props) => {

    return (
        <div className="sidebar-wrapper">
            <Nav style={{ textAlign: "right", display: "block", padding: '0px' }}>
                <li style={{ textAlign: "center", paddingTop: '15px' }}>
                    {/* <div style={{fontSize:'10px'}}>פותח ע״י צוות מא״ה</div>
                    <img src={logomea} style={{ height: "80px" }}></img> */}
                </li>
                {/* <li style={{ paddingTop: '15px' }}>
                    <Navbar style={{ display: "block", cursor: "pointer", margin: "0px", paddingRight: "22px", }}>
                        <NavLink to={`/workplantable`} className="nav-link">
                            <Row style={{ justifyContent: 'right' }}>
                                <img src={table} style={{ width: "25px", paddingLeft: '1px' }}></img>
                                <h5 style={{ fontWeight: "bold", textAlign: 'center' }}>
                                    תוכניות עבודה
                                </h5>
                            </Row>
                        </NavLink>
                    </Navbar>
                </li>
                <li>
                    <Navbar style={{ display: "block", cursor: "pointer", margin: "0px", paddingRight: "22px", }}>
                        <NavLink to={`/kshirottree`} className="nav-link">
                            <Row style={{ justifyContent: 'right' }}>
                                <img src={shortlist} style={{ width: "25px", paddingLeft: '1px' }}></img>
                                <h5 style={{ fontWeight: "bold", textAlign: 'center' }}>
                                    כשירות המסגרת
                                </h5>
                            </Row>
                        </NavLink>
                    </Navbar>
                </li>
                <li>
                    <Navbar style={{ display: "block", cursor: "pointer", margin: "0px", paddingRight: "22px", }}>
                        <NavLink to={`/dashboard`} className="nav-link">
                            <Row style={{ justifyContent: 'right' }}>
                                <img src={people} style={{ width: "25px", paddingLeft: '1px' }}></img>
                                <h5 style={{ fontWeight: "bold", textAlign: 'center' }}>
                                    זמינות
                                </h5>
                            </Row>
                        </NavLink>
                    </Navbar>
                </li>
                <li>
                    <Navbar style={{ display: "block", cursor: "pointer", margin: "0px", paddingRight: "22px", }}>
                        <NavLink to={`/dashboard`} className="nav-link">
                            <Row style={{ justifyContent: 'right' }}>
                                <img src={followers} style={{ width: "25px", paddingLeft: '1px' }}></img>
                                <h5 style={{ fontWeight: "bold", textAlign: 'center' }}>
                                    כוח אדם
                                </h5>
                            </Row>
                        </NavLink>
                    </Navbar>
                </li> */}
            </Nav>
        </div>
    );
};

export default UserAdminSidebar;