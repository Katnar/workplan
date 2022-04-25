import React from "react";
// core components
import SignUpForm from "views/general/authentication/SignUpForm";
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

function SignUpScreen() {
    return (    
                    <div className="wrapper">
                        <Container style={{ paddingTop: '4rem'}}>
                         <Row>
                             <Col>
                             <SignUpForm />
                             </Col>
                         </Row>
                        </Container>
                    </div>             
    );
}

export default SignUpScreen;
