import React, { useEffect, useState } from 'react';
import {
    Button,
    Card,
    CardHeader,
    CardFooter,
    CardBody,
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
    Table
} from "reactstrap";

import bookmarkpic from "assets/img/bookmark.png";

class OpenCardnew extends React.Component { //recieves headline and content
    constructor(props) {
        super(props);
        this.togglePanel = this.togglePanel.bind(this);/* ?? */
        this.state = {
            isOpen: false
        }
    }

    togglePanel(e) {
        this.setState({ isOpen: !this.state.isOpen })
    }

    render() {
        return (
            <>
                <Card style={{ direction: 'rtl', textAlign: 'right',marginBottom: '0px' }}>
                    {this.state.isOpen ? ( //card is open
                        <>
                            <CardHeader onClick={(e) => this.togglePanel(e)} style={{ direction: "rtl", cursor: 'pointer' }}>
                                <h4 style={{ direction: "rtl", textAlign: "start", marginTop: '0px' }}>{this.props.headline}</h4>
                            </CardHeader>
                            <div>{this.props.content}</div>
                            <CardFooter onClick={(e) => this.togglePanel(e)} style={{ direction: "rtl", cursor: 'pointer', textAlign: 'center' }}>
                            </CardFooter>

                        </>
                    )
                        : <CardHeader onClick={(e) => this.togglePanel(e)} style={{ direction: "rtl", cursor: 'pointer' }}>
                            <h4 style={{ direction: "rtl", textAlign: "start", marginTop: '0px' }}>{this.props.headline}</h4>
                        </CardHeader> /*card is closed*/}
                </Card>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                    <img onClick={(e) => this.togglePanel(e)} src={bookmarkpic} alt="bookmark" style={{ marginTop: '-16px', cursor: 'pointer',height:'40px'}} />
                </div>
            </>
        )
    }
}
export default OpenCardnew