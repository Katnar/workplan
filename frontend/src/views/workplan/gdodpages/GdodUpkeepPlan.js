import React, { useEffect, useState } from 'react';
import axios from 'axios'
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

import { Link, withRouter, Redirect } from "react-router-dom";

import MeagedalCard from "components/workplan/UpkeepPlan/MeagedalCard"

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  Collapse,
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
  Col,
  UncontrolledTooltip,
} from "reactstrap";

import TipulSelect from 'components/general/Select/TipulSelect'

import plus from "assets/img/add.png";

function GdodUpkeepPlan({ match }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  var todaysdate = new Date();
  var firstDayofyear = new Date(todaysdate.getFullYear(), 0, 2);
  var lastDayofyear = new Date(todaysdate.getFullYear() + 1, 0, 1);
  const [magadalcarddata, setMagadalcarddata] = useState({
    gofbizoas: [],
    statuss: [],
    tipultypes: [],
    zkaottipuls: [],
    //
    startdate: firstDayofyear.toISOString().substr(0, 10),
    enddate: lastDayofyear.toISOString().substr(0, 10)
  })
  //
  const [gofbizoas, setGofbizoas] = useState([]);
  const [tipultypes, setTipultypes] = useState([]);
  const [zkaottipuls, setZkaottipuls] = useState([]);
  //
  const [magadals, setMagadals] = useState([])

  function handleChange(evt) {
    const value = evt.target.value;
    setMagadalcarddata({ ...magadalcarddata, [evt.target.name]: value });
  }

  function handleChange2(selectedOptions, name) {
    let tempselectedOptions = [];
    for (let i = 0; i < selectedOptions.length; i++) {
      tempselectedOptions.push(selectedOptions[i].value._id)
    }
    setMagadalcarddata({ ...magadalcarddata, [name]: tempselectedOptions });
  }

  function init() {
    getMagadals();
    getTipultypes();
    getZkaottipuls();
    getGofbizoas();
  }

  const addClock = () => {
    var newelement=({_id:"000",name:"בחר מאגד על"})
    setMagadals(magadals => ([...magadals, newelement]))
};


  const getMagadals = async () => {
    await axios.get(`http://localhost:8000/api/magadal`)
      .then(response => {
        setMagadals(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const getGofbizoas = async () => {
    await axios.get("http://localhost:8000/api/gofbizoa")
      .then(response => {
        setGofbizoas(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const getTipultypes = async () => {
    await axios.get("http://localhost:8000/api/tipultype")
      .then(response => {
        setTipultypes(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const getZkaottipuls = async () => {
    await axios.get("http://localhost:8000/api/zkaottipul")
      .then(response => {
        setZkaottipuls(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Card>
        <CardBody>
          <Row>
            <Button color="" onClick={toggle} style={{ marginBottom: '1rem' }}>מסננים</Button>
            {/* <Button color="" onClick={makefilter} style={{ marginBottom: '1rem' }}>סנן</Button> */}
          </Row>
          <Collapse isOpen={isOpen}>
          <TipulSelect pagefilter={magadalcarddata} gofbizoas={gofbizoas} tipultypes={tipultypes} zkaottipuls={zkaottipuls} handleChange2={handleChange2} />
            <Row style={{ paddingTop: '10px' }}>
              <h3 >תאריכים בין:</h3>
              <Col style={{ display: 'flex', paddingLeft: '0px' }}>
                <Input type="date" name="startdate" value={magadalcarddata.startdate} onChange={handleChange} />
              </Col>
              <Col style={{ display: 'flex' }}>
                <h3 style={{ paddingLeft: '5px' }}>ל:</h3>
                <Input type="date" name="enddate" value={magadalcarddata.enddate} onChange={handleChange} />
              </Col>
            </Row>
          </Collapse>
          <Row>
            {magadals.map((magadal, i) => (
              magadal ?
                <>
                  <Col xs={12} md={3}>
                    <MeagedalCard 
                    gdodsid={[match.params.gdodid]}
                    magadal={magadal} startdate={magadalcarddata.startdate} enddate={magadalcarddata.enddate}
                    tipultypesid={magadalcarddata.tipultypes} zkaottipulsid={magadalcarddata.zkaottipuls} gofbizoasid={magadalcarddata.gofbizoas}
                    />
                  </Col>
                </>
                : null
            ))}
             <Col xs={12} md={3}>
                    <Card onClick={addClock} style={{cursor:"pointer", minHeight: '300px',}}>
                      <CardBody style={{position: 'absolute', left: '50%', top: '50%',transform: 'translate(-50%, -50%)'}}>
                      <img src={plus} style={{ height: "80px" }}></img>
                      </CardBody>
                    </Card>
                  </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
}

export default withRouter(GdodUpkeepPlan);;