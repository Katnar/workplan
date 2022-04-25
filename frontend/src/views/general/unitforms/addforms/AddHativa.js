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
function AddHativa(props) {
  const [hativadata, setHativaData] = useState({ //חטיבה חדש 
    name: '', //שם חטיבה
    ogda:'', //id of ogda
  })
  
    /*ogdas AddOn */
    const [ogdas, setOgdas] = useState([]);// all ogdas
  
    const loadogdas = () => {
      axios.get(`http://localhost:8000/api/ogda`)
        .then(response => {
          setOgdas(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
    }
    /*ogdas AddOn */

  function handleChange(evt) {
    const value = evt.target.value;
    setHativaData({ ...hativadata, [evt.target.name]: value });
  }

  const clickSubmit = event => {
    AddHativaToDb();
  }

  function AddHativaToDb() {
    const temphativa = hativadata;
    axios.post(`http://localhost:8000/api/hativa`, temphativa)
      .then(res => {
        GetUpdatedOgda(temphativa.ogda, res.data._id);
      })
      .catch(error => {
        toast.error(`נא לבחור אוגדה`);
      })
  }

  function GetUpdatedOgda(ogdatoupdateid, addedhativaid) {
    var tempogdahativas = [];
    axios.post(`http://localhost:8000/api/ogda/ogdabyid`, [ogdatoupdateid])
      .then(response => {
        tempogdahativas = response.data[0].hativa;
        tempogdahativas.push(addedhativaid);
        UpdateOgda(ogdatoupdateid, tempogdahativas);
      })
      .catch((error) => {
        console.log(error);
      })

  }

  function UpdateOgda(ogdatoupdateid, tempogdahativas) {
    axios.post(`http://localhost:8000/api/ogda/updatehativas`, [ogdatoupdateid, tempogdahativas])
      .then(response => {
        toast.success(`החטיבה נוספה בהצלחה`);
        history.goback();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    loadogdas();
  }, [])

  return (
    <Container style={{ paddingTop: '80px' }}>
      <Card>
        <CardHeader style={{ direction: 'rtl' }}>
          <CardTitle tag="h4" style={{ direction: 'rtl', textAlign: 'center', fontWeight: "bold" }}>הוספת חטיבה</CardTitle>{/*headline*/}
        </CardHeader>

        <CardBody style={{ direction: 'rtl' }}>
          <Container>

            <div style={{ textAlign: 'right', paddingTop: '10px' }}>שם חטיבה</div>
            <FormGroup dir="rtl" >
              <Input type="text" bsSize="lg" name="name" value={hativadata.name} onChange={handleChange} />
            </FormGroup>

            <div style={{ textAlign: 'right' }}>
              <Input type="select" name="ogda" onChange={handleChange}>
                <option value={null}>אוגדה</option>
                {ogdas.map((ogda, i) => (
                  <option value={ogda._id}> {ogda.name}</option>
                ))}
              </Input>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button className="btn btn-primary" onClick={clickSubmit}>הוסף חטיבה</button>
            </div>

          </Container>
        </CardBody>
      </Card>
    </Container>
  );
}

export default AddHativa;