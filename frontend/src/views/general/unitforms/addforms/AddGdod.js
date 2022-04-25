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

function AddGdod(props) {
  const [gdoddata, setGdodData] = useState({ //חטיבה חדש 
    name: '', //שם חטיבה
    hativa:'', //id of hativa
  })
  
    /*hativas AddOn */
    const [hativas, setHativas] = useState([]);// all hativas
  
    const loadhativas = () => {
      axios.get(`http://localhost:8000/api/hativa`)
        .then(response => {
          setHativas(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
    }
    /*hativas AddOn */

  function handleChange(evt) {
    const value = evt.target.value;
    setGdodData({ ...gdoddata, [evt.target.name]: value });
  }

  const clickSubmit = event => {
    AddGdodToDb();
  }

  function AddGdodToDb() {
    const tempgdod = gdoddata;
    axios.post(`http://localhost:8000/api/gdod`, tempgdod)
      .then(res => {
        GetUpdatedHativa(tempgdod.hativa, res.data._id);
      })
      .catch(error => {
        toast.error(`נא לבחור חטיבה`);
      })
  }

  function GetUpdatedHativa(hativatoupdateid, addedgdodid) {
    var temphativagdods = [];
    axios.post(`http://localhost:8000/api/hativa/hativabyid`, [hativatoupdateid])
      .then(response => {
        temphativagdods = response.data[0].gdod;
        temphativagdods.push(addedgdodid);
        UpdateHativa(hativatoupdateid, temphativagdods);
      })
      .catch((error) => {
        console.log(error);
      })

  }

  function UpdateHativa(hativatoupdateid, temphativagdods) {
    axios.post(`http://localhost:8000/api/hativa/updategdods`, [hativatoupdateid, temphativagdods])
      .then(response => {
        toast.success(`הגדוד נוסף בהצלחה`);
        history.goback();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    loadhativas();
  }, [])

  return (
    <Container style={{ paddingTop: '80px' }}>
      <Card>
        <CardHeader style={{ direction: 'rtl' }}>
          <CardTitle tag="h4" style={{ direction: 'rtl', textAlign: 'center', fontWeight: "bold" }}>הוספת גדוד</CardTitle>{/*headline*/}
        </CardHeader>

        <CardBody style={{ direction: 'rtl' }}>
          <Container>

            <div style={{ textAlign: 'right', paddingTop: '10px' }}>שם גדוד</div>
            <FormGroup dir="rtl" >
              <Input type="text" bsSize="lg" name="name" value={gdoddata.name} onChange={handleChange} />
            </FormGroup>

            <div style={{ textAlign: 'right' }}>
              <Input type="select" name="hativa" onChange={handleChange}>
                <option value={null}>חטיבה</option>
                {hativas.map((hativa, i) => (
                  <option value={hativa._id}> {hativa.name}</option>
                ))}
              </Input>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button className="btn btn-primary" onClick={clickSubmit}>הוסף גדוד</button>
            </div>

          </Container>
        </CardBody>
      </Card>
    </Container>
  );
}

export default AddGdod;