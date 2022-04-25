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

class UnitTable extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <>
                <table>
                    <th>{this.props.headline}
                        <th></th>
                        <th>מצבה</th>
                        <th>כשיר</th>
                        <th>לא כשיר</th>
                        <th>% כשירות</th>
                        
                    </th>
                </table>
                {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img onClick={(e) => this.togglePanel(e)} src={bookmarkpic} alt="bookmark" style={{ marginTop: '-16px', cursor: 'pointer' }} />
                </div> */}
            </>
        )
    }
}
export default UnitTable
