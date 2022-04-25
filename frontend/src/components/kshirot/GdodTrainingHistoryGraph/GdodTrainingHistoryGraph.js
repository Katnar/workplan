import React, { useState, useEffect } from 'react';
import { Link, withRouter, Redirect } from "react-router-dom";
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
    Button,
    ButtonGroup,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Label,
    FormGroup,
    Input,
    Table,
    Row,
    Col,
    Container,
    UncontrolledTooltip,
    Progress,
} from "reactstrap";
import axios from 'axios';

const GdodTrainingHistoryGraph = ({ gdodid }) => {
    const [labels, setLabels] = useState([]);
    const [data, setData] = useState([]);
    const [key, setKey] = useState([]); // object key is used because the component didnt re-rendered..

    function convertDigitIn(str){
        return str.split('-').reverse().join('-');
     }

    var data1 = {
        labels: labels,
        datasets: [
          {
            label: 'ציון אימון',
            data: data,
            fill: true,
            backgroundColor: '#00edf5',
            borderColor: 'rgba(99, 187, 255, 0.2)',
          },
        ],
      };
      
      var options1 = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };

    function getGdod() {
        axios.post(`http://localhost:8000/api/gdod/gdodbyid`, [gdodid])
            .then(response => {
                loadgdodtraininghistory(response.data[0].traininghistory);
            })
            .catch(error => {

            })
    }
   
    function loadgdodtraininghistory(traininghistoryidarr) {
        var tempgdodhistorytraininglabels = [];
        var tempgdodhistorytrainingdata = [];
        for (let i = 0; i < traininghistoryidarr.length; i++) {
            axios.get(`http://localhost:8000/api/training/${traininghistoryidarr[i]}`)
                .then(response => {
                    tempgdodhistorytraininglabels.push(convertDigitIn(response.data[0].createdAt.slice(0,10)));
                    tempgdodhistorytrainingdata.push(CalculateTrainingSum(response.data[0]));
                    setKey(Math.random());
                })
                .catch(error => {

                })
        }
        setData(tempgdodhistorytrainingdata);
        setLabels(tempgdodhistorytraininglabels);
    }

    function CalculateTrainingSum(training) {//46 fields means 2.17% every field. rn=> 
        const temptraining = training;
        var temptrainingsum = 0;
        if (temptraining.emon == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.maflag == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.kata == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.kitathalafim == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.kitatnaot == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.kitacala == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.a == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.b == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.d == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.nispach == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.nohak == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.nihok == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.azarim == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.pkodotmasoa == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.sadak == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.tadrich == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.pkodotahzaka == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.tiom == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.aishor == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.shimosbashob == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.shimosbashob2 == 'בוצע')
            temptrainingsum += 2;
        if (temptraining.sicomimon == 'בוצע')
            temptrainingsum += 2;

        // console.log(temptrainingsum);//i=22 =>max 44
        var temparr = [];
        temparr.push(temptraining.bkiot,
            temptraining.bkiotsadac,
            temptraining.ramatnispach,
            temptraining.azarimquality,
            temptraining.zlm,
            temptraining.shika,
            temptraining.bkiotmikom,
            temptraining.bkiotbgdod,
            temptraining.bkiotbashob,
            temptraining.ramatshlita,
            temptraining.razifot,
            temptraining.ramattiom,
            temptraining.shlitabmazav,
            temptraining.midathatama,
            temptraining.nihol,
            temptraining.midatkabala,
            temptraining.hafakat,
            temptraining.ehot,
            temptraining.ehotplogot,
            temptraining.ehotmfkada,
            temptraining.bkiotbashob2,
            temptraining.lamida,
            temptraining.sicombainaim,
            temptraining.rama,
            temptraining.imonhiloz)
        for (var i = 0; i < temparr.length; i++) //i=25 => max 50pts
        {
            if (temparr[i] == 1) {
                temptrainingsum += 0;
            }
            if (temparr[i] == 2) {
                temptrainingsum += 1;
            }
            if (temparr[i] == 3) {
                temptrainingsum += 1;
            }
            if (temparr[i] == 4) {
                temptrainingsum += 1;
            }
            if (temparr[i] == 5) {
                temptrainingsum += 2;
            }
        }
        temptrainingsum += 6;
        return(temptrainingsum);
    }

    useEffect(() => {
        getGdod();
    }, [gdodid])

    return (
        <>
        <Line key={key} data={data1} options={options1} />
        </>
    );
}
export default withRouter(GdodTrainingHistoryGraph);;

