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
const EditHativa = ({ match }) => {
    const [hativa, setHativa] = useState([]); //hativa
    const [gdods, setGdods] = useState([]);// all gdods
    const [hativas, setHativas] = useState([]);// all hativas
    const [hativagdods, setHativaGdods] = useState([]);// gdods of hativa
    const [deletedhativagdods, setDeletedHativaGdods] = useState([]);// gdods of hativa
    const [tempgdodid, setTempGdodId] = useState([]); // temp value of select input

    const handleChangeTempGdod = event => {
        setTempGdodId(event.target.value);
    }

    const loadhativa = async () => {
        try {
            const response = await axios.post(`http://localhost:8000/api/hativa/hativabyid`, [match.params.hativaid])
            setHativa(response.data[0]);
            for (var i = 0; i < response.data[0].gdod.length; i++) {
                findgdodsbyid(response.data[0].gdod[i])
            }
        }
        catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };


   const loadgdods = () => {
        axios.get(`http://localhost:8000/api/gdod`)
            .then(response => {
                setGdods(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }
 
    const loadhativas = () => {
        axios.get(`http://localhost:8000/api/hativa`)
            .then(response => {
                setHativas(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const findgdodsbyid = async (id) => {
        try {
            const response = await axios.post(`http://localhost:8000/api/gdod/gdodbyid`, [id])
            setHativaGdods(oldArray => [...oldArray, response.data[0]]);
        }
        catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };

    function DeleteGdodFromHativaGdods(gdod) {
        setHativaGdods(hativagdods.filter((e) => (e !== gdod)));

        let tempdeletedehativagdods = [...deletedhativagdods];
        tempdeletedehativagdods.push(gdod);
        setDeletedHativaGdods(tempdeletedehativagdods);
    }

    function ManageUpdateHativa() {
        UpdateDeletedHativaGdods();
        UpdateHativaGdods();
        UpdateAllHativas();// missing in pikod.. only needed if there are multiple pikods..
        UpdateHativa();
    }

    function UpdateDeletedHativaGdods() {
        console.log("deletedhativagdods: "+deletedhativagdods);
        for (var i = 0; i < deletedhativagdods.length; i++) {
            axios.post(`http://localhost:8000/api/gdod/updatehativa`, [deletedhativagdods[i]._id, null])
                .then(response => {
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    function UpdateHativaGdods() {
        console.log("hativagdods: "+hativagdods);
        for (var i = 0; i < hativagdods.length; i++) {
            axios.post(`http://localhost:8000/api/gdod/updatehativa`, [hativagdods[i]._id, hativa._id])
                .then(response => {
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    function UpdateAllHativas() {
        //for each hativa delete the gdods of the current hativa
        for (var i = 0; i < hativas.length; i++) {
            var temparr = hativas[i].gdod;
            console.log("first: " +temparr);
            for (var j = 0; j < temparr.length; j++) {

                for (var k = 0; k < hativagdods.length; k++) {

                    if (temparr[j] == hativagdods[k]._id) {
                        temparr.splice(j,1);

                    }
                }

            }      
            axios.post(`http://localhost:8000/api/hativa/updategdods`, [hativas[i]._id, temparr])
                .then(response => {
                })
                .catch((error) => {
                    console.log(error);
                })
                console.log("after: " +temparr);
            }
    }

    function UpdateHativa() {
        axios.post(`http://localhost:8000/api/hativa/updategdods`, [hativa._id, hativagdods])
            .then(response => {
                toast.success(`החטיבה עודכנה בהצלחה`);
                history.push(`/kshirottree`);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function AddGdodToHativaGdods() {
        axios.post(`http://localhost:8000/api/gdod/gdodbyid`, [tempgdodid])
            .then(response => {
                var isonhativagdods = false;
                for (var i = 0; i < hativagdods.length; i++) {
                    if (response.data[0]._id == hativagdods[i]._id) {
                        isonhativagdods = true;
                    }
                }
                if (isonhativagdods == true) {
                    console.log("gdod already om hativa");
                }
                else {
                    setHativaGdods(oldArray => [...oldArray, response.data[0]]);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        loadhativa();
        loadgdods();
        loadhativas();
    }, [])

    return (
        <Container style={{ paddingTop: '80px' }}>
            <Card>
                <CardHeader style={{ direction: "rtl", textAlign: 'right' }}>
                    <div >
                        <h3>עריכת חטיבה: {hativa.name}</h3><hr />
                    </div>
                </CardHeader>
                <CardBody>

                   {hativagdods.map((gdod, i) => (
                        gdod ? <Row style={{ direction: "rtl" }}>
                            <h3>{gdod.name}</h3>
                            <Button onClick={(e) => DeleteGdodFromHativaGdods(gdod, e)}>מחק</Button>
                        </Row> : null
                    ))}

                     <div style={{ textAlign: 'right' }}>
                        <Input type="select" onChange={handleChangeTempGdod}>
                            <option value="גדוד"> גדוד</option>
                            {gdods.map((gdod, i) => (
                                <option value={gdod._id}> {gdod.name}</option>
                            ))}
                        </Input>
                        <Button onClick={(e) => AddGdodToHativaGdods()}>הוסף גדוד</Button>
                    </div>

                    <Button onClick={(e) => ManageUpdateHativa()}>עדכן חטיבה</Button>
                </CardBody> 
            </Card>
        </Container>
    )
}
export default withRouter(EditHativa);
