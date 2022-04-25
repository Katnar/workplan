import React, { useState, useEffect, useRef } from 'react';
import { Link, withRouter, Redirect } from "react-router-dom";
// reactstrap components
import SortingTable from "components/workplan/AllTipulsHistorySortingTable/SortingTable";

import axios from 'axios'

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  Collapse,
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

import UnitSelect from 'components/general/Select/UnitSelect'
import TipulSelect from 'components/general/Select/TipulSelect'

const PikodHistoryTipuls = ({ match }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  var todaysdate = new Date();
  var firstDayofyear = new Date(todaysdate.getFullYear(), 0, 2);
  var lastDayofyear = new Date(todaysdate.getFullYear() + 1, 0, 1);

  const [alltipulshistoryfilters, setAlltipulshistoryfilters] = useState({
    gdods: [],
    hativas: [],
    ogdas: [],
    pikods: ["test"],
    //
    gofbizoas: [],
    statuss: [],
    tipultypes: [],
    zkaottipuls: [],
    //
    updatedAtstartdate: firstDayofyear.toISOString().substr(0, 10),
    updatedAtenddate: lastDayofyear.toISOString().substr(0, 10)
  })
  //
  const [gdods, setGdods] = useState([]);
  const [hativas, setHativas] = useState([]);
  const [ogdas, setOgdas] = useState([]);
  //
  const [gofbizoas, setGofbizoas] = useState([]);
  const [statuss, setStatuss] = useState([]);
  const [tipultypes, setTipultypes] = useState([]);
  const [zkaottipuls, setZkaottipuls] = useState([]);
  //

  function handleChange(evt) {
    const value = evt.target.value;
    setAlltipulshistoryfilters({ ...alltipulshistoryfilters, [evt.target.name]: value });
  }

  function handleChange2(selectedOptions, name) {
    let tempselectedOptions = [];
    for (let i = 0; i < selectedOptions.length; i++) {
      tempselectedOptions.push(selectedOptions[i].value._id)
    }
    setAlltipulshistoryfilters({ ...alltipulshistoryfilters, [name]: tempselectedOptions });
  }

  function init() {
    getTipultypes();
    getZkaottipuls();
    getGofbizoas();
    getStatuss();
    loadOgdas();
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

  const getStatuss = async () => {
    await axios.get("http://localhost:8000/api/status")
      .then(response => {
        setStatuss(response.data);
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

  const loadOgdas = () => {
    axios.post("http://localhost:8000/api/ogda/ogdasbypikodid", { pikod: match.params.pikodid })
      .then(response => {
        setOgdas(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const loadHativas = async () => {
    let tempogdahativas = [];
    for (let i = 0; i < alltipulshistoryfilters.ogdas.length; i++) {
      await axios.post("http://localhost:8000/api/hativa/hativasbyogdaid", { ogda: alltipulshistoryfilters.ogdas[i] })
        .then(response => {
          for (let j = 0; j < response.data.length; j++)
            tempogdahativas.push(response.data[j])
        })
        .catch((error) => {
          console.log(error);
        })
    }
    setHativas(tempogdahativas);
  }

  const loadGdods = async () => {
    let temphativasgdods = [];
    for (let i = 0; i < alltipulshistoryfilters.hativas.length; i++) {
      await axios.post("http://localhost:8000/api/gdod/gdodsbyhativaid", { hativa: alltipulshistoryfilters.hativas[i] })
        .then(response => {
          for (let j = 0; j < response.data.length; j++)
            temphativasgdods.push(response.data[j])
        })
        .catch((error) => {
          console.log(error);
        })
    }
    setGdods(temphativasgdods);
  }

  useEffect(() => {
    setHativas([]);
    setAlltipulshistoryfilters({ ...alltipulshistoryfilters, hativas: [] });
    loadHativas();
  }, [alltipulshistoryfilters.ogdas]);

  useEffect(() => {
    setGdods([]);
    setAlltipulshistoryfilters({ ...alltipulshistoryfilters, gdods: [] });
    loadGdods();
  }, [alltipulshistoryfilters.hativas]);

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Card>
        <CardBody>
          <Row>
            <Button color="" onClick={toggle} style={{ marginBottom: '1rem' }}>מסננים</Button>
          </Row>
          <Collapse isOpen={isOpen}>
          <UnitSelect pagefilter={alltipulshistoryfilters} ogdas={ogdas} hativas={hativas} gdods={gdods} handleChange2={handleChange2} level={"pikod"}/>
          <TipulSelect pagefilter={alltipulshistoryfilters} gofbizoas={gofbizoas} statuss={statuss} tipultypes={tipultypes} zkaottipuls={zkaottipuls} handleChange2={handleChange2} />
            <Row style={{ paddingTop: '10px' }}>
              <h3 >עודכנו בין:</h3>
              <Col style={{ display: 'flex', paddingLeft: '0px' }}>
                <Input type="date" name="updatedAtstartdate" value={alltipulshistoryfilters.updatedAtstartdate} onChange={handleChange} />
              </Col>
              <Col style={{ display: 'flex' }}>
                <h3 style={{ paddingLeft: '5px' }}>ל:</h3>
                <Input type="date" name="updatedAtenddate" value={alltipulshistoryfilters.updatedAtenddate} onChange={handleChange} />
              </Col>
            </Row>
          </Collapse>
          <SortingTable 
            gdodsid={alltipulshistoryfilters.gdods} hativasid={alltipulshistoryfilters.hativas} ogdasid={alltipulshistoryfilters.ogdas} pikodsid={[match.params.pikodid]} 
            updatedAtstartdate={alltipulshistoryfilters.updatedAtstartdate} updatedAtenddate={alltipulshistoryfilters.updatedAtenddate}
            tipultypesid={alltipulshistoryfilters.tipultypes} zkaottipulsid={alltipulshistoryfilters.zkaottipuls} gofbizoasid={alltipulshistoryfilters.gofbizoas} statussid={alltipulshistoryfilters.statuss}
           />
        </CardBody>
      </Card>
    </>
  );
}
export default withRouter(PikodHistoryTipuls);;