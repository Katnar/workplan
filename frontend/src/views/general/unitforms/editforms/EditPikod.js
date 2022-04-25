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
    Row,
    Col
} from "reactstrap";
import history from 'history.js'
import { toast } from "react-toastify";
const EditPikod = ({ match }) => {
    const [pikod, setPikod] = useState([]); //pikod
    const [ogdas, setOgdas] = useState([]);// all ogdas
    const [pikods, setPikods] = useState([]);// all pikods
    const [pikodogdas, setPikodOgdas] = useState([]);// ogdas of pikod
    const [deletedpikodogdas, setDeletedPikodOgdas] = useState([]);// ogdas of pikod
    const [tempogdaid, setTempOgdaId] = useState([]); // temp value of select input

    const handleChangeTempOgda = event => {
        setTempOgdaId(event.target.value);
    }

    const loadpikod = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/pikod/`, [match.params.id])
            console.log(response.data)
            setPikod(response.data[0]);
            for (var i = 0; i < response.data[0].ogda.length; i++) {
                findogdasbyid(response.data[0].ogda[i])
            }
        }
        catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };

    const loadpikods = () => {
        axios.get(`http://localhost:8000/api/pikod`)
            .then(response => {
                setPikods(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const findogdasbyid = async (id) => {
        try {
            const response = await axios.post(`http://localhost:8000/api/ogda/ogdabyid`, [id])
            setPikodOgdas(oldArray => [...oldArray, response.data[0]]);
        }
        catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };

    function DeleteOgdaFromPikodOgdas(ogda) {
        setPikodOgdas(pikodogdas.filter((e) => (e !== ogda)));

        let tempdeletedpikodogdas = [...deletedpikodogdas];
        tempdeletedpikodogdas.push(ogda);
        setDeletedPikodOgdas(tempdeletedpikodogdas);
    }

    function ManageUpdatePikod() {
        UpdateDeletedPikodOgdas()
        UpdatePikodOgdas()
        UpdateAllPikods();//if i wanna do it the smart way it should be before UpdatePikodOgdas and set the pikod ogdas pikod ogdas to be without the pikodogad[i],updatepikodogdaspikodogdas();
        UpdatePikod();
    }

    function UpdateDeletedPikodOgdas() {
        for (var i = 0; i < deletedpikodogdas.length; i++) {
            axios.post(`http://localhost:8000/api/ogda/updatepikod`,  [deletedpikodogdas[i]._id,null])
            .then(response => {
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }

    function UpdatePikodOgdas() {
        for (var i = 0; i < pikodogdas.length; i++) {
            axios.post(`http://localhost:8000/api/ogda/updatepikod`,  [pikodogdas[i]._id,pikod._id])
                .then(response => {
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    function UpdateAllPikods() {
        //for each pikod delete the ogdas of the current pikod
        for (var i = 0; i < pikods.length; i++) {
            var temparr = pikods[i].ogda;
            console.log("first: " +temparr);
            for (var j = 0; j < temparr.length; j++) {

                for (var k = 0; k < pikodogdas.length; k++) {

                    if (temparr[j] == pikodogdas[k]._id) {
                        temparr.splice(j,1);

                    }
                }

            }      
            axios.post(`http://localhost:8000/api/pikod/updateogdas`, [pikods[i]._id, temparr])
                .then(response => {
                })
                .catch((error) => {
                    console.log(error);
                })
                console.log("after: " +temparr);
        }
    }

    function UpdatePikod() {
        axios.post(`http://localhost:8000/api/pikod/updateogdas`, [pikod._id,pikodogdas])
            .then(response => {
                toast.success(`הפיקוד עודכן בהצלחה`);
                history.push(`/kshirottree`);
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

    function AddOgdaToPikodOgdas() {
        axios.post(`http://localhost:8000/api/ogda/ogdabyid`, [tempogdaid])
            .then(response => {
                var isonpikodogdas=false;
                for(var i=0;i<pikodogdas.length;i++)
                {
                    if(response.data[0]._id==pikodogdas[i]._id)
                    {
                        isonpikodogdas=true;
                    }
                }
                if(isonpikodogdas==true)
                {
                    console.log("ogda already om pikod");
                }
                else{
                    setPikodOgdas(oldArray => [...oldArray, response.data[0]]);
                }    
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        loadpikod();
        loadogdas();
        loadpikods();
    }, [])

    return (
        <Container style={{ paddingTop: '80px' }}>
            <Card>
                <CardHeader style={{ direction: "rtl" ,textAlign:'right'}}>
                    <div >
                        <h3>עריכת פיקוד: {pikod.name}</h3><hr />
                    </div>
                </CardHeader>
                <CardBody>

                    {pikodogdas.map((ogda, i) => (
                        ogda ? <Row style={{ direction: "rtl" }}>
                            <Col xs="11" style={{display: "flex"}}>
                            <h3 style={{margin:"0px"}}>{ogda.name}</h3>
                            </Col>
                            <Col  xs="1" style={{display: "flex"}}>
                            <Button onClick={(e) => DeleteOgdaFromPikodOgdas(ogda, e)}>מחק</Button>
                            </Col>
                        </Row> : null
                    ))}

                    <div style={{ textAlign: 'right' }}>
                        <Input type="select" onChange={handleChangeTempOgda}>
                            <option value="אוגדה"> אוגדה</option>
                            {ogdas.map((ogda, i) => (
                                <option value={ogda._id}> {ogda.name}</option>
                            ))}
                        </Input>
                        <Button onClick={(e) => AddOgdaToPikodOgdas()}>הוסף אוגדה</Button>
                    </div>

                    <Button onClick={(e) => ManageUpdatePikod()}>עדכן פיקוד</Button>
                </CardBody>
            </Card>
        </Container>
    )
}
export default withRouter(EditPikod);
