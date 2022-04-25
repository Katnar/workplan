import React, { useEffect, useState } from 'react';
import {
    Button,
    Card,
    CardHeader,
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

class OpenCard extends React.Component {
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
                <Card style={{ marginBottom: '0px' }}>
                    <CardHeader onClick={(e) => this.togglePanel(e)} style={{ direction: "rtl", cursor: 'pointer' }}>
                        <h4 style={{ direction: "rtl", textAlign: "start", margin: '0px' }}>{this.props.Headline}</h4>
                    </CardHeader>
                    {this.state.isOpen ? ( //card is open
                        <CardBody style={{ direction: "rtl" }}>
                            {this.props.Tableheaders ?
                                this.props.Tableheaders.map((header, i) => (
                                    <>
                                    <div>{header}: {this.props.Tabledata[i]}</div>
                                    </>
                                )) : null
                            }
                        </CardBody>
                    )
                        : null /*card is closed*/}
                </Card>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img onClick={(e) => this.togglePanel(e)} src={bookmarkpic} alt="bookmark" style={{ marginTop: '-16px', cursor: 'pointer' ,height:'40px'}} />
                </div>
            </>
        )
    }
}
export default OpenCard