import React from "react";
// core components

import SignInForm from "views/general/authentication/SignInForm";
import {
    Button,
    ButtonGroup,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    Label,
    FormGroup,
    Input,
    Table,
    Row,
    CardText,
    Col,
    Container,
    UncontrolledTooltip,
  } from "reactstrap";


var ps;

function SignInScreen() {
    return (
                    <div className="wrapper">
                        <Container style={{ paddingTop: '4rem'}}>
                         <Row>
                             <Col>
                             <SignInForm />
                             </Col>
                         </Row>
                        </Container>
                    </div>
            
    );
}

export default SignInScreen;
