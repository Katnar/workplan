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
function AddOgda(props) {
  const [ogdadata, setOgdaData] = useState({ //אוגדה חדש 
    name: '', //שם אוגדה
    pikod: '', //id of pikod
  })

  /*Pikod AddOn */
  const [pikods, setPikods] = useState([]);// all pikods

  const loadpikods = () => {
    axios.get(`http://localhost:8000/api/pikod`)
      .then(response => {
        setPikods(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }
  /*Pikod AddOn */

  function handleChange(evt) {
    const value = evt.target.value;
    setOgdaData({ ...ogdadata, [evt.target.name]: value });
  }

  const clickSubmit = event => {
    AddOgdaToDb();
  }

  function AddOgdaToDb() {
    const tempogda = ogdadata;
    axios.post(`http://localhost:8000/api/ogda`, tempogda)
      .then(res => {
        GetUpdatedPikod(tempogda.pikod, res.data._id);
      })
      .catch(error => {
        toast.error(`נא לבחור פיקוד`);
      })
  }

  function GetUpdatedPikod(pikodtoupdateid, addedogdaid) {
    var temppikodogdas = [];
    axios.post(`http://localhost:8000/api/pikod/pikodbyid`, [pikodtoupdateid])
      .then(response => {
        temppikodogdas = response.data[0].ogda;
        temppikodogdas.push(addedogdaid);
        UpdatePikod(pikodtoupdateid, temppikodogdas);
      })
      .catch((error) => {
        console.log(error);
      })

  }

  function UpdatePikod(pikodtoupdateid, temppikodogdas) {
    axios.post(`http://localhost:8000/api/pikod/updateogdas`, [pikodtoupdateid, temppikodogdas])
      .then(response => {
        toast.success(`אוגדה נוספה בהצלחה`);
        history.goback();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    loadpikods();
  }, [])

  return (
    <Container style={{ paddingTop: '80px' }}>
      <Card>
        <CardHeader style={{ direction: 'rtl' }}>
          <CardTitle tag="h4" style={{ direction: 'rtl', textAlign: 'center', fontWeight: "bold" }}>הוספת אוגדה</CardTitle>{/*headline*/}
        </CardHeader>

        <CardBody style={{ direction: 'rtl' }}>
          <Container>

            <div style={{ textAlign: 'right', paddingTop: '10px' }}>שם אוגדה</div>
            <FormGroup dir="rtl" >
              <Input type="text" bsSize="lg" name="name" value={ogdadata.name} onChange={handleChange} />
            </FormGroup>

            <div style={{ textAlign: 'right' }}>
              <Input type="select" name="pikod" onChange={handleChange}>
                <option value={null}>פיקוד</option>
                {pikods.map((pikod, i) => (
                  <option value={pikod._id}> {pikod.name}</option>
                ))}
              </Input>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button className="btn btn-primary" onClick={clickSubmit}>הוסף אוגדה</button>
            </div>

          </Container>
        </CardBody>
      </Card>
    </Container>
  );
}

export default AddOgda;