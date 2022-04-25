import React, { useState, useEffect } from "react";
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

import GdodHistoryEditPageSortingTable from "components/kshirot/GdodHistoryEditPageSortingTable/SortingTable";
import Onekshirot from "views/kshirot/kshirotforms/onekshirot";

import GdodTrainingHistoryEditPageSortingTable from "components/kshirot/GdodTrainingHistoryEditPageSortingTable/SortingTable";
import Onetraining from "views/kshirot/trainingforms/OneTraining";

import OpenCardnew from "components/kshirot/OpenCardnew/OpenCardnew";

import axios from "axios";
import { isAuthenticated } from "auth/index";

import UserGdodRekam from "./UserGdodRekam";
import UserGdodKal from "./UserGdodKal";
import UserGdodNagmash from "./UserGdodNagmash";
import UserGdodHatmar from "./UserGdodHatmar";
import UserGdodAisuf from "./UserGdodAisuf";


const UserGdodEditPage = ({ match }) => {
  const { user } = isAuthenticated();
  const [gdod, setGdod] = useState([]);

  function init() {
    getGdod();
  }

  const getGdod = async () => {
    var tempgdodid = match.params.gdodid;
    try {
      await axios
        .post(`http://localhost:8000/api/gdod/gdodbyid`, [tempgdodid])
        .then((response) => {
          setGdod(response.data[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch {}
  };


  useEffect(() => {
    init();
  }, []);

  return (
    <>
        <UserGdodRekam gdod={gdod} user={user} />
    </>
  );
};
export default withRouter(UserGdodEditPage);
