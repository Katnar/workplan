import React, { useState, useEffect } from 'react';

// reactstrap components
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
import axios from 'axios';
import history from 'history.js'
import { toast } from "react-toastify";

function AddPikod(props) {
  const [pikoddata, setPikodData] = useState({ //פיקוד חדש 
    name: '', //שם פיקוד
  })

  function handleChange(evt) {
    const value = evt.target.value;
    setPikodData({ ...pikoddata, [evt.target.name]: value });
  }

  const clickSubmit = event => {
    AddPikodToDb();
  }

  function AddPikodToDb() {
    const temppikod = pikoddata;
    axios.post(`http://localhost:8000/api/pikod`, temppikod)
      .then(res => {
        toast.success(`הפיקוד נוסף בהצלחה`);
        history.goback();
      })
      .catch(error => {

      })
    console.log(pikoddata);
  }

  useEffect(() => {

  }, [])

  return (
    <Container style={{ paddingTop: '80px' }}>
      <Card>
        <CardHeader style={{ direction: 'rtl' }}>
          <CardTitle tag="h4" style={{ direction: 'rtl', textAlign: 'center', fontWeight: "bold" }}>הוספת פיקוד</CardTitle>{/*headline*/}
        </CardHeader>

        <CardBody style={{ direction: 'rtl' }}>
          <Container>

            <div style={{ textAlign: 'right', paddingTop: '10px' }}>שם פיקוד</div>
            <FormGroup dir="rtl" >
              <Input type="text" bsSize="lg" name="name" value={pikoddata.name} onChange={handleChange} />
            </FormGroup>

            <div style={{ textAlign: 'center' }}>
              <button className="btn btn-primary" onClick={clickSubmit}>הוסף פיקוד</button>
            </div>

          </Container>
        </CardBody>
      </Card>
    </Container>
  );
}

export default AddPikod;