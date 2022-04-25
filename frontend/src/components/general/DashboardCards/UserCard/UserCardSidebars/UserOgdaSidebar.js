
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

import { signin, authenticate, isAuthenticated } from 'auth/index';

const UserOgdaSidebar = (props) => {
    const { user } = isAuthenticated()

    return (
        <div className="sidebar-wrapper">
            <Nav style={{ textAlign: "right", display: "block", padding: '0px' }}>
                <li style={{ textAlign: "center", paddingTop: '15px' }}>
                    <img src={logomea} style={{ height: "80px" }}></img>
                </li>
               
            </Nav>
        </div>
    );
};

export default UserOgdaSidebar;