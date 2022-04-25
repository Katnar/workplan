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

import axios from "axios";
import DisplayHativaCard from "components/kshirot/DisplayHativaCard/DisplayHativaCard";

const UserOgdaEditPage = ({ match }) => {
  const [ogda, setOgda] = useState([]);
  const [ogdahativas, setOgdaHativas] = useState([]); // hativas of ogda

  function init() {
    loadogda();
  }

  const loadogda = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/ogda/ogdabyid`,
        [match.params.ogdaid]
      );
      setOgda(response.data[0]);
      findogdahativas(response.data[0]._id);
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

  const findogdahativas = async (ogdaid1) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/hativa/hativasbyogdaid`,
        { ogda: ogdaid1 }
      );
      setOgdaHativas(response.data);
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

  const OgdaNameHeader = (

    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <h1 style={{ color: "white", textAlign: "center" }}> כשירות מסגרות הטנ"א - {ogda.name}</h1>
    </Container>
  );

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      {ogda.type === 'משא' ?
        <>
          <Button>
            <Link to="/kshirottree" style={{ color: "white" }}>
              פתח עץ מסגרות
            </Link>
          </Button>
          <PanelHeader content={OgdaNameHeader} />
          <div style={{ padding: "15px" }}>
            <Row>
              {ogdahativas.map((hativa, i) =>
                hativa ? (
                  <>
                    <Col xs={12} md={4}>
                      <DisplayHativaCard id={hativa._id} />
                    </Col>
                  </>
                ) : null
              )}
            </Row>
          </div>
        </> : (
          <>
           <Button>
           <Link to="/kshirottree" style={{ color: "white" }}>
             פתח עץ מסגרות
           </Link>
         </Button>
         <PanelHeader content={OgdaNameHeader} />
         <div style={{ padding: "15px" }}>
           <Row>
             {ogdahativas.map((hativa, i) =>
               hativa ? (
                 <>
                   <Col xs={12} md={4}>
                     <DisplayHativaCard id={hativa._id} />
                   </Col>
                 </>
               ) : null
             )}
           </Row>
         </div>
         </>
        )}

    </>
  );
};
export default withRouter(UserOgdaEditPage);
