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
import DisplayOgdaCard from "components/kshirot/DisplayOgdaCard/DisplayOgdaCard";
import { isAuthenticated } from "auth/index";
const UserPikodEditPage = ({ match }) => {
  const [pikod, setPikod] = useState([]);
  const [pikodogdas, setPikodogdas] = useState([]); // ogdas of pikod
  const { user } = isAuthenticated();
  function init() {
    loadpikod();
  
  }

  const loadpikod = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/pikod/pikodbyid`,
        [match.params.pikodid]
      );
      setPikod(response.data[0]);
      findpikodogdas(response.data[0]._id);
     
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };
  console.log(pikod)

  const findpikodogdas = async (pikodid1) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/ogda/ogdasbypikodid`,
        { pikod: pikodid1 }
      );
      setPikodogdas(response.data); //[0]??
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

  const pikodNameHeader = (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <h1 style={{ color: "white", textAlign: "center" }}> כשירות מסגרות הטנ"א - {pikod.name}</h1>
    </Container>
  );

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      {pikod.type === 'משא' ? (
        <>
          <Button>
            <Link to="/kshirottree" style={{ color: "white" }}>
              פתח עץ מסגרות
            </Link>
          </Button>
          <PanelHeader content={pikodNameHeader} />
          <div style={{ padding: "15px" }}>
            <Row>
              {pikodogdas.map((ogda, i) =>
                ogda ? (
                  <>
                    <Col xs={12} md={4}>
                      <DisplayOgdaCard id={ogda._id} />
                    </Col>
                  </>
                ) : null
              )}
            </Row>
          </div>
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
            {pikod.kshirot ? (
              <>
                
                {user.kshirot === "1" ? null : (
                  <Link  to={{
                    pathname:`/editmashakshirotpikod/${pikod._id}/${pikod.kshirot}`,
                    state: {pikod}
               }}>
                    <button className="btn btn-success">
                      ערוך כשירות פיקודית
                    </button>
                  </Link>
                )}
              </>
            ) : (
              <>
                <h3>לא קיים מטא"ג חטיבתי נוכחי</h3>
                {user.kshirot === "1" ? null : (
                  <>
                    <Link  to={{
                    pathname: `/addmashakshirotpikod/${pikod._id}`,
                    state: {pikod}
               }}>
                      <button className="btn btn-success">
                        הוסף כשירות פיקודית
                      </button>
                    </Link>
                  </>
                )}
              </>
            )}
          </CardBody>
        </Card>
        </>
      ) : (
        <>
          <Button>
            <Link to="/kshirottree" style={{ color: "white" }}>
              פתח עץ מסגרות
            </Link>
          </Button>
          <PanelHeader content={pikodNameHeader} />
          <div style={{ padding: "15px" }}>
            <Row>
              {pikodogdas.map((ogda, i) =>
                ogda ? (
                  <>
                    <Col xs={12} md={4}>
                      <DisplayOgdaCard id={ogda._id} />
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
export default withRouter(UserPikodEditPage);
