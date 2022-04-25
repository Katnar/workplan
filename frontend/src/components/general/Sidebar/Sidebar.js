import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from "react-router-dom";

// reactstrap components
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';

import {
  BackgroundColorContext,
  backgroundColors,
} from "contexts/BackgroundColorContext";

import { ThemeContext, themes } from "contexts/ThemeContext";

import Logoeged from 'assets/img/logotene2.png';
import { signout } from 'auth/index';
import history from '../../../history'

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
  Col
} from "reactstrap";

import { signin, authenticate, isAuthenticated } from 'auth/index';

import SidebarAdmin from 'components/general/Sidebar/SidebarAdmin';
import SidebarGdod from 'components/general/Sidebar/Sidebargdod';
import SidebarHativa from 'components/general/Sidebar/Sidebarhativa';
import SidebarOgda from 'components/general/Sidebar/Sidebarogda';
import SidebarPikod from 'components/general/Sidebar/Sidebarpikod';
import SidebarSuperAdmin from './SidebarSuperAdmin';

import Logo100 from 'assets/img/team100.png';

function Sidebar() {
  const [color, setcolor] = useState("transparent");
  const { user } = isAuthenticated()

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
            setcolor("white")
            : setcolor("rgb(32 33 51)")
        )}
      </ThemeContext.Consumer>

      <div className="sidebar" style={{ background: color, marginRight: '16px', marginTop: '60px', boxShadow: 'none', borderRadius: '0px' }}>
        <div className="sidebar-wrapper" style={{overflow:'hidden'}}>
          {user.role === "0" ? <SidebarAdmin /> :

            user.role === "1" ? <SidebarGdod /> :

              user.role === "2" ? <SidebarHativa /> :

                user.role === "3" ? <SidebarOgda /> :

                    user.role === "4" ? <SidebarPikod /> :

                      user.role === "5" ? <SidebarSuperAdmin /> : null
            }
             <div style={{ textAlign: 'center', position: 'absolute', bottom: 0, width: '100%', marginBottom: '15px' }}>
          <img src={Logo100} height='100px'></img>
            <Button
              onClick={clickSubmit}
              className="btn-team"
              style={{ width: '80%' ,marginTop:'15px', backgroundColor: "#f46430"}}
            >
              התנתק
            </Button>
          </div>
          </div>
     
      </div>
    </>
  );
}
export default Sidebar;
