import React, { useState, useEffect, useRef } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import axios from "axios";
import editpic from "assets/img/edit.png";
import deletepic from "assets/img/delete.png";
import SettingModal from "./modal/SettingModal";
import { Modal, Button } from "antd";
// reactstrap components
import { Container, Input, Row, Col } from "reactstrap";
import SortingTable from "./EditGeneralData/SortingTable";

const Setting = () => {
  //handle data display
  const [sadnabizoa, setSadnabizoa] = useState([]);
  const [gdodbizoa, setGdodbizoa] = useState([]);
  const [carteam, setCarteam] = useState([]);
  //handle add state
  const [addgdodbizoa, setAddGdodBizoa] = useState(false);
  const [addsadnabizoa, setAddSadnaBizoa] = useState(false);
  const [addcarteam, setAddCarTeam] = useState(false);
  const [gdodname, setGdodName] = useState("");
  const [sadnaname, setSadnaName] = useState("");
  const [carteamname, setCarTeamName] = useState("");
//handle edit state
  const [editgdodbizoa, setEditGdodBizoa] = useState(false);
  const [modalData, setModalData] = useState("");
  const [editData, setEditData] = useState("");

  const [editsadnabizoa, setEditSadnaBizoa] = useState(false);
  //const [modalData, setModalData] = useState("");
  // const [editData, setEditData] = useState("");

  const [editcarteam, setEditCarTeam] = useState(false);
  // const [modalData, setModalData] = useState("");
  // const [editData, setEditData] = useState("");

  const addGdodBizoa = () => {
    axios
      .post("http://localhost:8000/api/gdodbizoa", { name: gdodname })
      .then((res) => {
        setGdodName("");
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const editGdodBizoa = () => {
    console.log(modalData);
    axios
      .post(`http://localhost:8000/api/gdodbizoa/${modalData._id}`, {
        name: editData,
      })
      .then((res) => {
        setGdodName("");
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteGdodBizoa = (id) => {
    console.log(modalData);
    axios
      .delete(`http://localhost:8000/api/gdodbizoa/remove/${id}`)
      .then((res) => {
        setGdodName("");
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addSadnaBizoa = () => {
    axios.post(`http://localhost:8000/api/sadnabizoa`,{name: sadnaname})
      .then((res) => {
        setSadnaName("");
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const editSadnaBizoa = () => {
    console.log(modalData);
    axios
      .post(`http://localhost:8000/api/sadnabizoa/${modalData._id}`, {
        name: editData,
      })
      .then((res) => {
        
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteSadnaBizoa = (id) => {
    console.log(modalData);
    axios
      .delete(`http://localhost:8000/api/sadnabizoa/remove/${id}`)
      .then((res) => {
        
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addCarTeam = () => {
    axios.post(`http://localhost:8000/api/carteam`,{name: carteamname})
      .then((res) => {
        setSadnaName("");
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const editCarTeam = () => {
    console.log(modalData);
    axios
      .post(`http://localhost:8000/api/carteam/${modalData._id}`, {
        name: editData,
      })
      .then((res) => {
        setSadnaName("");
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteCarTeam = (id) => {
    console.log(modalData);
    axios
      .delete(`http://localhost:8000/api/carteam/remove/${id}`)
      .then((res) => {
        
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };




  //handle modal edit display
  const showGdodEditModal = () => {
    setEditGdodBizoa(true);
  };
  const handleGdodEditCancel = () => {
    setEditGdodBizoa(false);
  };

  const showSadnaEditModal = () => {
    setEditSadnaBizoa(true);
  };
  const handleSadnaEditCancel = () => {
    setEditSadnaBizoa(false);
  };

  const showCarTeamEditModal = () => {
    setEditCarTeam(true);
  };
  const handleCarTeamCancel = () => {
    setEditCarTeam(false);
  };

// handle modal add display
  const showGdodModal = () => {
    setAddGdodBizoa(true);
  };

  const handleGdodCancel = () => {
    setAddGdodBizoa(false);
  };

  const showSadnaModal = () => {
    setAddSadnaBizoa(true);
  };

  const handleSadnaCancel = () => {
    setAddSadnaBizoa(false);
  };

  const showCarModal = () => {
    setAddCarTeam(true);
  };

  const handleCarCancel = () => {
    setAddCarTeam(false);
  };
  const gdodBizoaDelete = () => {};

  const loadGdodbizoa = () => {
    axios
      .get("http://localhost:8000/api/gdodbizoa")
      .then((response) => {
        setGdodbizoa(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadSadnabizoa = () => {
    axios
      .get("http://localhost:8000/api/sadnabizoa")
      .then((response) => {
        setSadnabizoa(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadCarTeam = () => {
    axios
      .get("http://localhost:8000/api/carteam")
      .then((response) => {
        setCarteam(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadGdodbizoa();
    loadSadnabizoa();
    loadCarTeam();
  }, []);

  return (
    <Container style={{ paddingTop: "80px", direction: "rtl" }}>
      <h2 style={{ textAlign: "right" }}>עריכת נתונים</h2>
      <Row>
        <Col>
          <Row>
              {/* gdodbizoa */}
            <Col>
              {" "}
              <h5 style={{ textAlign: "right" }}>גדודים לביצוע</h5>
            </Col>
            <Col>
              <Button type="primary" onClick={() => showGdodModal()}>
                הוסף גדוד לביצוע
              </Button>
            </Col>
          </Row>

          <SettingModal
            title="הוסף גדוד לביצוע"
            visible={addgdodbizoa}
            onCancel={handleGdodCancel}
          >
            <div>
              <Input
                type="text"
                value={gdodname}
                onChange={(event) => setGdodName(event.target.value)}
              ></Input>
              {console.log(gdodname)}
              <Button onClick={() => addGdodBizoa()}>הוסף</Button>
            </div>
          </SettingModal>
          <table>
            <tr>
              <th>שם</th>
              <th>ערוך</th>
              <th>מחק</th>
            </tr>
            {gdodbizoa.map((data, index) => (
              <tr>
                <td style={{ textAlign: "center" }}>{data.name}</td>
                <td style={{ textAlign: "center" }}>
                  <button
                    className="btn btn-success"
                    style={{ padding: "0.5rem" }}
                    onClick={() => {
                      setModalData(data);
                      showGdodEditModal();
                    }}
                  >
                    <img
                      src={editpic}
                      alt="bookmark"
                      style={{ height: "2rem" }}
                    />
                  </button>
                </td>
                <td style={{ textAlign: "center" }}>
                  <Link>
                    <button
                      className="btn btn-danger"
                      style={{ padding: "0.5rem" }}
                      onClick={() => deleteGdodBizoa(data._id)}
                    >
                      <img
                        src={deletepic}
                        alt="bookmark"
                        style={{ height: "2rem" }}
                      />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
            <SettingModal
              title="ערוך גדוד לביצוע"
              visible={editgdodbizoa}
              onCancel={handleGdodEditCancel}
            >
              <Input
                type="text"
                placeholder={modalData.name}
                value={editData}
                onChange={(e) => {
                  setEditData(e.target.value);
                }}
              ></Input>
              <Button onClick={() => editGdodBizoa()}>עדכן</Button>
            </SettingModal>
          </table>
        </Col>
        {/* sadnabizoa */}
        <Col>
          <Row>
            <Col>
              {" "}
              <h5 style={{ textAlign: "right" }}>סדנאות לביצוע</h5>
            </Col>
            <Col>
              <Button type="primary" onClick={() => showSadnaModal()}>
                הוסף סדנא לביצוע
              </Button>
            </Col>
          </Row>

          <SettingModal
            title="הוסף סדנא לביצוע"
            visible={addsadnabizoa}
            onCancel={handleSadnaCancel}
          >
            <div>
              <Input
                type="text"
                value={sadnaname}
                onChange={(event) => setSadnaName(event.target.value)}
              ></Input>
              {console.log(gdodname)}
              <Button onClick={() => addSadnaBizoa()}>הוסף</Button>
            </div>
          </SettingModal>
          <table>
            <tr>
              <th>שם</th>
              <th>ערוך</th>
              <th>מחק</th>
            </tr>
            {sadnabizoa.map((data, index) => (
              <tr>
                <td style={{ textAlign: "center" }}>{data.name}</td>
                <td style={{ textAlign: "center" }}>
                <button
                    className="btn btn-success"
                    style={{ padding: "0.5rem" }}
                    onClick={() => {
                      setModalData(data);
                      showSadnaEditModal();
                    }}
                  >
                    <img
                      src={editpic}
                      alt="bookmark"
                      style={{ height: "2rem" }}
                    />
                  </button>
                </td>
                <td style={{ textAlign: "center" }}>
                  <Link>
                    <button
                      className="btn btn-danger"
                      style={{ padding: "0.5rem" }}
                      onClick={() => deleteSadnaBizoa(data._id)}
                    >
                      <img
                        src={deletepic}
                        alt="bookmark"
                        style={{ height: "2rem" }}
                      />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
               <SettingModal
              title="ערוך סדנא לביצוע"
              visible={editsadnabizoa}
              onCancel={handleSadnaEditCancel}
            >
              <Input
                type="text"
                placeholder={modalData.name}
                value={editData}
                onChange={(e) => {
                  setEditData(e.target.value);
                }}
              ></Input>
              <Button onClick={() => editSadnaBizoa()}>עדכן</Button>
            </SettingModal>
          </table>
        </Col>
        <Col>
          <Row>
              {/* carteam */}
            <Col>
              {" "}
              <h5 style={{ textAlign: "right" }}>קבוצת רכבים</h5>
            </Col>
            <Col>
              <Button type="primary" onClick={() => showCarModal()}>
                הוסף קבוצת רכבים
              </Button>
            </Col>
          </Row>
          <SettingModal
            title="הוסף קבוצת רכבים"
            visible={addcarteam}
            onCancel={handleCarCancel}
          >
          <div>
              <Input
                type="text"
                value={carteamname}
                onChange={(event) => setCarTeamName(event.target.value)}
              ></Input>
             
              <Button onClick={() => addCarTeam()}>הוסף</Button>
            </div>
          </SettingModal>
          <table>
            <tr>
              <th>שם</th>
              <th>ערוך</th>
              <th>מחק</th>
            </tr>
            {carteam.map((data, index) => (
              <tr>
                <td style={{ textAlign: "center" }}>{data.name}</td>
                <td style={{ textAlign: "center" }}>
                  <button
                    className="btn btn-success"
                    style={{ padding: "0.5rem" }}
                    onClick={() => {
                      setModalData(data);
                      showCarTeamEditModal();
                    }}
                  >
                    <img
                      src={editpic}
                      alt="bookmark"
                      style={{ height: "2rem" }}
                    />
                  </button>
                </td>
                <td style={{ textAlign: "center" }}>
                  <Link>
                    <button
                      className="btn btn-danger"
                      style={{ padding: "0.5rem" }}
                      onClick={() => deleteCarTeam(data._id)}
                    >
                      <img
                        src={deletepic}
                        alt="bookmark"
                        style={{ height: "2rem" }}
                      />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
              <SettingModal
              title="ערוך סדנא לביצוע"
              visible={editcarteam}
              onCancel={handleCarTeamCancel}
            >
              <Input
                type="text"
                placeholder={modalData.name}
                value={editData}
                onChange={(e) => {
                  setEditData(e.target.value);
                }}
              ></Input>
              <Button onClick={() => editCarTeam()}>עדכן</Button>
            </SettingModal>
          </table>
        </Col>
      </Row>
      {/* <SortingTable/> */}
    </Container>
  );
};
export default withRouter(Setting);
