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

import SortingTable from "components/workplan/CarsSortingTable/SortingTable";

const HativaCarsTable = ({ match }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [carsfilter, setCarsfilter] = useState({
    gdods: [],
    hativas: ["test"],
    ogdas: ["test"],
    pikods: ["test"],
    //
    cars: [],
    mkats: [],
    mkabazs: [],
    magads: [],
    magadals: [],
  })
  //
  const [gdods, setGdods] = useState([]);
  //
  const [cars, setCars] = useState([]);
  const [mkats, setMkats] = useState([]);
  const [mkabazs, setMkabazs] = useState([]);
  const [magads, setMagads] = useState([]);
  const [magadals, setMagadals] = useState([]);

  function handleChange(evt) {
    const value = evt.target.value;
    setCarsfilter({ ...carsfilter, [evt.target.name]: value });
  }

  function handleChange2(selectedOptions, name) {
    let tempselectedOptions = [];
    for (let i = 0; i < selectedOptions.length; i++) {
      tempselectedOptions.push(selectedOptions[i].value._id)
    }
    setCarsfilter({ ...carsfilter, [name]: tempselectedOptions });
  }

  function init() {
    loadGdods();
    loadMagadals();
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
    for (let i = 0; i < carsfilter.magadals.length; i++) {
      await axios.get(`http://localhost:8000/api/magadsbymagadal/${carsfilter.magadals[i]}`)
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
    for (let i = 0; i < carsfilter.magads.length; i++) {
      await axios.get(`http://localhost:8000/api/mkabazsbymagad/${carsfilter.magads[i]}`)
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
    for (let i = 0; i < carsfilter.mkabazs.length; i++) {
      await axios.get(`http://localhost:8000/api/mkatsbymkabaz/${carsfilter.mkabazs[i]}`)
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
    for (let i = 0; i < carsfilter.mkats.length; i++) {
      await axios.get(`http://localhost:8000/api/carsbymkat/${carsfilter.mkats[i]}`)
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

  const loadGdods = () => {
    axios.post("http://localhost:8000/api/gdod/gdodsbyhativaid", { hativa: match.params.hativaid })
      .then(response => {
        setGdods(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    setMagads([]);
    setCarsfilter({ ...carsfilter, magads: [] });
    loadMagads();
  }, [carsfilter.magadals]);

  useEffect(() => {
    setMkabazs([]);
    setCarsfilter({ ...carsfilter, mkabazs: [] });
    loadMkabazs();
  }, [carsfilter.magads]);

  useEffect(() => {
    setMkats([]);
    setCarsfilter({ ...carsfilter, mkats: [] });
    loadMkats();
  }, [carsfilter.mkabazs]);

  useEffect(() => {
    setCars([]);
    setCarsfilter({ ...carsfilter, cars: [] });
    loadCars();
  }, [carsfilter.mkats]);

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
          <UnitSelect pagefilter={carsfilter} gdods={gdods} handleChange2={handleChange2} level={"hativa"} />
          <CarSelect pagefilter={carsfilter} magadals={magadals} magads={magads} mkabazs={mkabazs} mkats={mkats} cars={cars} handleChange2={handleChange2} />
        </Collapse>
        <SortingTable
          gdodsid={carsfilter.gdods} hativasid={[match.params.hativaid]}
          carsid={carsfilter.cars} mkatsid={carsfilter.mkats} mkabazsid={carsfilter.mkabazs} magadsid={carsfilter.magads} magadalsid={carsfilter.magadals}
        />
      </CardBody>
    </Card>
  );
}
export default withRouter(HativaCarsTable);;