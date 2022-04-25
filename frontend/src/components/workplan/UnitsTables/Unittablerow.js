import React, { useEffect, useState } from 'react';
import axios from 'axios'


const Unittablerow = (props) => {
    const [tipuls, setTipuls] = useState([])


    const getTipuls = async () => {
        /*axios.get(`http://localhost:8000/api/smarttipuls/${undefined}/${undefined}/${undefined}/${props.gdod._id}/${props.magadal._id}/${undefined}/${undefined}/${undefined}/${undefined}/${undefined}/${undefined}/${undefined}/${undefined}`)
            .then(response => {
                setTipuls(response.data)
            })
            .catch((error) => {
                console.log(error);
            })*/
        var tempactivetipuls = [];
        var temptipulsandactive = [];
        await axios.get(`http://localhost:8000/api/smartactivetipuls/${undefined}/${undefined}/${undefined}/${props.gdod._id}/${props.magadal._id}/${undefined}/${undefined}/${undefined}/${undefined}/${undefined}/${undefined}/${undefined}/${undefined}`)
            .then(response => {
                temptipulsandactive = response.data;
                tempactivetipuls = response.data;
            })
            .catch((error) => {
                console.log(error);
            })
        await axios.get(`http://localhost:8000/api/smarttipuls/${undefined}/${undefined}/${undefined}/${props.gdod._id}/${props.magadal._id}/${undefined}/${undefined}/${undefined}/${undefined}/${undefined}/${undefined}/${undefined}/${undefined}`)
            .then(response => {
                for (var i = 0; i < response.data.length; i++) {
                    var bool = true;
                    for (var j = 0; j < tempactivetipuls.length; j++) {
                        if (response.data[i]._id == tempactivetipuls[j].originaltipulid) {
                            bool = false;
                        }
                    }
                    if (bool == true) {
                        temptipulsandactive.push(response.data[i]);
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .then(response => {
                console.log(temptipulsandactive)
                setTipuls(temptipulsandactive);
            })
    }

    useEffect(() => {
        getTipuls();
    }, []);

    const tipulscompleted = tipuls.filter(tipul => tipul.status.name == "בוצע");
    const tipulsinprogress = tipuls.filter(tipul => tipul.status.name == "ממתין");
    console.log(tipulscompleted)
    const precent = tipuls.length != 0 ? tipulscompleted.length / tipuls.length * 100 : 0;


    return (
        <tr style={{ textAlign: 'center' }}>
            <td>{props.magadal.name}</td>
            <td>{tipuls.length}</td>
            <td>{tipulsinprogress.length}</td>
            <td>{tipulscompleted.length}</td>
            <td>{precent}%</td>
        </tr>
    )
}

export default Unittablerow;