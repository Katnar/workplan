import React, { useState, useEffect } from 'react';
import { Link, withRouter, Redirect } from "react-router-dom";
// reactstrap components
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
    Container,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Table,
    Button,
    Label,
    FormGroup,
    Input,
    UncontrolledTooltip,
} from "reactstrap";

// core components
import PanelHeader from "components/kshirot/PanelHeader/PanelHeader.js";

import axios from 'axios';
import DisplayPikodCard from 'components/kshirot/DisplayPikodCard/DisplayPikodCard';

const UserAdminEditPage = ({ match }) => {
    const [pikods, setPikods] = useState([]);

    function init() {
        loadpikods();
    }

    const loadpikods = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/pikod`)
            setPikods(response.data);
        }
        catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };

    const pikodNameHeader =
        <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <h1 style={{ color: 'white', textAlign: 'center' }}>כשירות מסגרות הטנ"א - תמונת מצב</h1>
        </Container>

    useEffect(() => {
        init();
    }, [])

    return (
        <>
        <Button>
        <Link to="/kshirottree" style ={{color:'white'}}>פתח עץ מסגרות</Link>
      </Button>
            <PanelHeader content={pikodNameHeader} />
            <div style={{ padding: '15px' }}>
                <Row>
                    {pikods ? pikods.map((pikod, i) => (
                        pikod ?
                            <>
                                <Col xs={12} md={4}>
                                    <DisplayPikodCard id={pikod._id} />
                                </Col>
                            </>
                            : null
                    )) : null}
                </Row>
            </div>
        </>
    );
}
export default withRouter(UserAdminEditPage);;