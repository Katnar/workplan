import React, { useEffect, useState } from 'react';
import axios from 'axios'
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

import { Link, withRouter, Redirect } from "react-router-dom";

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
import CarSelect from 'components/general/Select/CarSelect'
import TipulSelect from 'components/general/Select/TipulSelect'

import SortingTable from "components/workplan/TipulSortingTable/SortingTable";

const GdodworkplanTable = ({ match }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  //
  var todaysdate = new Date();
  var firstDayofyear = new Date(todaysdate.getFullYear(), 0, 2);
  var lastDayofyear = new Date(todaysdate.getFullYear() + 1, 0, 1);

  const [tipulsfilters, setTipulsfilters] = useState({
    cars: [],
    mkats: [],
    mkabazs: [],
    magads: [],
    magadals: [],
    //
    gofbizoas: [],
    statuss: [],
    tipultypes: [],
    zkaottipuls: [],
    //
    startdate: firstDayofyear.toISOString().substr(0, 10),
    enddate: lastDayofyear.toISOString().substr(0, 10)
  })

  const [gofbizoas, setGofbizoas] = useState([]);
  const [statuss, setStatuss] = useState([]);
  const [tipultypes, setTipultypes] = useState([]);
  const [zkaottipuls, setZkaottipuls] = useState([]);
  //
  const [cars, setCars] = useState([]);
  const [mkats, setMkats] = useState([]);
  const [mkabazs, setMkabazs] = useState([]);
  const [magads, setMagads] = useState([]);
  const [magadals, setMagadals] = useState([]);

  function handleChange(evt) {
    const value = evt.target.value;
    setTipulsfilters({ ...tipulsfilters, [evt.target.name]: value });
  }

  function handleChange2(selectedOptions, name) {
    let tempselectedOptions = [];
    for (let i = 0; i < selectedOptions.length; i++) {
      tempselectedOptions.push(selectedOptions[i].value._id)
    }
    setTipulsfilters({ ...tipulsfilters, [name]: tempselectedOptions });
  }

  function init() {
    getGofbizoas();
    getStatuss();
    getTipultypes();
    getZkaottipuls();
    loadMagadals();
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

  const loadMagadals = () => {
    axios.get("http://localhost:8000/api/magadal",)
      .then(response => {
        setMagadals(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const loadMagads = async () => {
    let tempmagadalsmagads = [];
    for (let i = 0; i < tipulsfilters.magadals.length; i++) {
      await axios.get(`http://localhost:8000/api/magadsbymagadal/${tipulsfilters.magadals[i]}`)
        .then(response => {
          for (let j = 0; j < response.data.length; j++)
            tempmagadalsmagads.push(response.data[j])
        })
        .catch((error) => {
          console.log(error);
        })
    }
    setMagads(tempmagadalsmagads);
  }

  const loadMkabazs = async () => {
    let tempmagadsmkabazs = [];
    for (let i = 0; i < tipulsfilters.magads.length; i++) {
      await axios.get(`http://localhost:8000/api/mkabazsbymagad/${tipulsfilters.magads[i]}`)
        .then(response => {
          for (let j = 0; j < response.data.length; j++)
            tempmagadsmkabazs.push(response.data[j])
        })
        .catch((error) => {
          console.log(error);
        })
    }
    setMkabazs(tempmagadsmkabazs);
  }

  const loadMkats = async () => {
    let tempmkabazsmkats = [];
    for (let i = 0; i < tipulsfilters.mkabazs.length; i++) {
      await axios.get(`http://localhost:8000/api/mkatsbymkabaz/${tipulsfilters.mkabazs[i]}`)
        .then(response => {
          for (let j = 0; j < response.data.length; j++)
            tempmkabazsmkats.push(response.data[j])
        })
        .catch((error) => {
          console.log(error);
        })
    }
    setMkats(tempmkabazsmkats);
  }

  const loadCars = async () => {
    let tempmkatscars = [];
    for (let i = 0; i < tipulsfilters.mkats.length; i++) {
      await axios.get(`http://localhost:8000/api/carsbymkat/${tipulsfilters.mkats[i]}`)
        .then(response => {
          for (let j = 0; j < response.data.length; j++) {
            let tempcar = response.data[j];
            tempcar.name = tempcar._id;
            tempmkatscars.push(tempcar)
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }
    setCars(tempmkatscars);
  }

  useEffect(() => {
    setMagads([]);
    setTipulsfilters({ ...tipulsfilters, magads: [] });
    loadMagads();
  }, [tipulsfilters.magadals]);

  useEffect(() => {
    setMkabazs([]);
    setTipulsfilters({ ...tipulsfilters, mkabazs: [] });
    loadMkabazs();
  }, [tipulsfilters.magads]);

  useEffect(() => {
    setMkats([]);
    setTipulsfilters({ ...tipulsfilters, mkats: [] });
    loadMkats();
  }, [tipulsfilters.mkabazs]);

  useEffect(() => {
    setCars([]);
    setTipulsfilters({ ...tipulsfilters, cars: [] });
    loadCars();
  }, [tipulsfilters.mkats]);

  useEffect(() => {
    init();
  }, []);

  return (
    <Card>
      <CardBody>
        <Row>
          <Button color="" onClick={toggle} style={{ marginBottom: '1rem' }}>מסננים</Button>
        </Row>
        <Collapse isOpen={isOpen}>
          <CarSelect pagefilter={tipulsfilters} magadals={magadals} magads={magads} mkabazs={mkabazs} mkats={mkats} cars={cars} handleChange2={handleChange2} />
          <TipulSelect pagefilter={tipulsfilters} gofbizoas={gofbizoas} statuss={statuss} tipultypes={tipultypes} zkaottipuls={zkaottipuls} handleChange2={handleChange2} />
          <Row style={{ paddingTop: '10px' }}>
            <h3 >טיפול אחרון בין:</h3>
            <Col style={{ display: 'flex', paddingLeft: '0px' }}>
              <Input type="date" name="startdate" value={tipulsfilters.startdate} onChange={handleChange} />
            </Col>
            <Col style={{ display: 'flex' }}>
              <h3 style={{ paddingLeft: '5px' }}>ל:</h3>
              <Input type="date" name="enddate" value={tipulsfilters.enddate} onChange={handleChange} />
            </Col>
          </Row>
        </Collapse>
        <SortingTable
          gdodsid={[match.params.gdodid]}
          carsid={tipulsfilters.cars} mkatsid={tipulsfilters.mkats} mkabazsid={tipulsfilters.mkabazs} magadsid={tipulsfilters.magads} magadalsid={tipulsfilters.magadals}
          tipultypesid={tipulsfilters.tipultypes} zkaottipulsid={tipulsfilters.zkaottipuls} gofbizoasid={tipulsfilters.gofbizoas} statussid={tipulsfilters.statuss}
          startdate={tipulsfilters.startdate} enddate={tipulsfilters.enddate}
        />
      </CardBody>
    </Card>
  );
}
export default withRouter(GdodworkplanTable);;