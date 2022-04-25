import React, { useEffect, useState } from 'react';
import { Link, withRouter, Redirect } from "react-router-dom";
import axios from 'axios';
import {
    Card,
    CardHeader,
    Container,
    CardBody,
    FormGroup,
    Input,
    InputGroupAddon,
    Button,
    Row

} from "reactstrap";
import history from 'history.js'
import { toast } from "react-toastify";
const EditOgda = ({ match }) => {
    const [ogda, setOgda] = useState([]); //ogda
    const [hativas, setHativas] = useState([]);// all hativas
    const [ogdas, setOgdas] = useState([]);// all ogdas
    const [ogdahativas, setOgdaHativas] = useState([]);// hativas of ogda
    const [deletedogdahativas, setDeletedOgdaHativas] = useState([]);// hativas of ogda
    const [temphativaid, setTempHativaId] = useState([]); // temp value of select input

    const handleChangeTempHativa = event => {
        setTempHativaId(event.target.value);
    }

    const loadogda = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/ogda/`, [match.params.ogdaid])
            setOgda(response.data[0]);
            for (var i = 0; i < response.data[0].hativa.length; i++) {
                findhativasbyid(response.data[0].hativa[i])
            }
        }
        catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };


    const loadhativas = () => {
        axios.get(`http://localhost:8000/api/hativa`)
            .then(response => {
                setHativas(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const loadogdas = () => {
        axios.get(`http://localhost:8000/api/ogda`)
            .then(response => {
                setOgdas(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const findhativasbyid = async (id) => {
        try {
            const response = await axios.post(`http://localhost:8000/api/hativa/hativabyid`, [id])
            setOgdaHativas(oldArray => [...oldArray, response.data[0]]);
        }
        catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };

    function DeleteHativaFromOgdaHativas(hativa) {
        setOgdaHativas(ogdahativas.filter((e) => (e !== hativa)));

        let tempdeletedogdahativas = [...deletedogdahativas];
        tempdeletedogdahativas.push(hativa);
        setDeletedOgdaHativas(tempdeletedogdahativas);
    }

    function ManageUpdateOgda() {
        UpdateDeletedOgdaHativas();
        UpdateOgdaHativas();
        UpdateAllOgdas();// missing in pikod.. only needed if there are multiple pikods..
        UpdateOgda();
    }

    function UpdateDeletedOgdaHativas() {
        for (var i = 0; i < deletedogdahativas.length; i++) {
            axios.post(`http://localhost:8000/api/hativa/updateogda`, [deletedogdahativas[i]._id, null])
                .then(response => {
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    function UpdateOgdaHativas() {
        for (var i = 0; i < ogdahativas.length; i++) {
            axios.post(`http://localhost:8000/api/hativa/updateogda`, [ogdahativas[i]._id, ogda._id])
                .then(response => {
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    function UpdateAllOgdas() {
        //for each ogda delete the hativas of the current ogda
        for (var i = 0; i < ogdas.length; i++) {
            var temparr = ogdas[i].hativa;
            console.log("first: " +temparr);
            for (var j = 0; j < temparr.length; j++) {

                for (var k = 0; k < ogdahativas.length; k++) {

                    if (temparr[j] == ogdahativas[k]._id) {
                        temparr.splice(j,1);

                    }
                }

            }      
            axios.post(`http://localhost:8000/api/ogda/updatehativas`, [ogdas[i]._id, temparr])
                .then(response => {
                })
                .catch((error) => {
                    console.log(error);
                })
                console.log("after: " +temparr);
            }
    }

    function UpdateOgda() {
        axios.post(`http://localhost:8000/api/ogda/updatehativas`, [ogda._id, ogdahativas])
            .then(response => {
                toast.success(`האוגדה עודכנה בהצלחה`);
                history.push(`/kshirottree`);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function AddHativaToOgdaHativas() {
        axios.post(`http://localhost:8000/api/hativa/hativabyid`, [temphativaid])
            .then(response => {
                var isonogdahativas = false;
                for (var i = 0; i < ogdahativas.length; i++) {
                    if (response.data[0]._id == ogdahativas[i]._id) {
                        isonogdahativas = true;
                    }
                }
                if (isonogdahativas == true) {
                    console.log("hativa already om ogda");
                }
                else {
                    setOgdaHativas(oldArray => [...oldArray, response.data[0]]);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        loadogda();
        loadhativas();
        loadogdas();
    }, [])

    return (
        <Container style={{ paddingTop: '80px' }}>
            <Card>
                <CardHeader style={{ direction: "rtl", textAlign: 'right' }}>
                    <div >
                        <h3>עריכת אוגדה: {ogda.name}</h3><hr />
                    </div>
                </CardHeader>
                <CardBody>

                    {ogdahativas.map((hativa, i) => (
                        ogda ? <Row style={{ direction: "rtl" }}>
                            <h3>{hativa.name}</h3>
                            <Button onClick={(e) => DeleteHativaFromOgdaHativas(hativa, e)}>מחק</Button>
                        </Row> : null
                    ))}

                    <div style={{ textAlign: 'right' }}>
                        <Input type="select" onChange={handleChangeTempHativa}>
                            <option value="חטיבה"> חטיבה</option>
                            {hativas.map((hativa, i) => (
                                <option value={hativa._id}> {hativa.name}</option>
                            ))}
                        </Input>
                        <Button onClick={(e) => AddHativaToOgdaHativas()}>הוסף חטיבה</Button>
                    </div>

                    <Button onClick={(e) => ManageUpdateOgda()}>עדכן אוגדה</Button>
                </CardBody>
            </Card>
        </Container>
    )
}
export default withRouter(EditOgda);
