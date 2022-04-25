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
import DisplayGdodCard from "components/kshirot/DisplayGdodCard/DisplayGdodCard";
import OneMatag from "../matagforms/OneMatag";
import HativaMatagHistorySortingTable from "components/kshirot/HativaMatagHistorySortingTable/SortingTable";

import OpenCardnew from "components/kshirot/OpenCardnew/OpenCardnew";
import { isAuthenticated } from "auth/index";
const MashaHativaPage = ({ match }) => {
  const { user } = isAuthenticated();
  const [hativa, setHativa] = useState([]);
  const [hativagdods, setHativaGdods] = useState([]); // gdods of hativa

  function init() {
    loadhativa();
  }

  const loadhativa = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/hativa/hativabyid`,
        [match.params.hativaid]
      );
      setHativa(response.data[0]);
      findhativagdods(response.data[0]._id);
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

  const findhativagdods = async (hativaid1) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/gdod/gdodsbyhativaid`,
        { hativa: hativaid1 }
      );
      setHativaGdods(response.data); //[0]??
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

  const HativaNameHeader = (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <h1 style={{ color: "white", textAlign: "center" }}>{hativa.name} masah</h1>
    </Container>
  );

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Button>
        <Link to="/kshirottree" style={{ color: "white" }}>
          פתח עץ מסגרות
        </Link>
      </Button>
      <PanelHeader content={HativaNameHeader} />
      <div style={{ padding: "15px" }}>
        <Row>
          {hativagdods.map((gdod, i) =>
            gdod ? (
              <>
                <Col xs={12} md={4}>
                  <DisplayGdodCard id={gdod._id} />
                </Col>
              </>
            ) : null
          )}
        </Row>
      </div>

      <Container style={{ paddingTop: "20px" }}>
        <Card>
          <CardHeader>
            <CardTitle
              tag="h4"
              style={{ direction: "rtl", textAlign: "right" }}
            >
              מטא"ג חטיבתי נוכחי
            </CardTitle>
            {/*headline*/}
          </CardHeader>
          <CardBody style={{ direction: "rtl", textAlign: "right" }}>
            {hativa.matag ? (
              <>
                <OneMatag id={hativa.matag} />
                {user.kshirot === "1" ? null : (
                  <Link to={`/editmatag/${hativa._id}/${hativa.matag}`}>
                    <button className="btn">
                      ערוך מטא"ג חטיבתי
                    </button>
                  </Link>
                )}
              </>
            ) : (
              <>
                <h3>לא קיים מטא"ג חטיבתי נוכחי</h3>
                {user.kshirot === "1" ? null : (
                  <>
                    <Link to={`/addmatag/${hativa._id}`}>
                      <button className="btn">
                        הוסף מטא"ג חטיבתי
                      </button>
                    </Link>
                  </>
                )}
              </>
            )}
          </CardBody>
        </Card>
        {hativa.mataghistory && hativa.mataghistory.length != 0 ? (
          <>
            <OpenCardnew
              headline={'היסטורית מטא"ג'}
              content={<HativaMatagHistorySortingTable />}
            />
          </>
        ) : (
          <>
            <Card style={{ direction: "rtl", textAlign: "right" }}>
              <h3>לא קיימת היסטוריית מטא"ג</h3>
            </Card>
          </>
        )}
      </Container>
    </>
  );
};
export default withRouter(MashaHativaPage);
