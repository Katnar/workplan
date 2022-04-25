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

const HativaMatagHistoryGraph = ({ hativaid }) => {
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
            label: 'ציון מטא"ג',
            data: data,
            fill: true,
            backgroundColor: '#A7C7E7',
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

      function getHativa() {
        axios.post(`http://localhost:8000/api/hativa/hativabyid`, [hativaid])
            .then(response => {
                loadhativamataghistory(response.data[0].mataghistory);
            })
            .catch(error => {

            })
    }
   
    function loadhativamataghistory(mataghistoryidarr) {
        var temphativahistorymataglabels = [];
        var temphativahistorymatagdata = [];
        for (let i = 0; i < mataghistoryidarr.length; i++) {
            axios.get(`http://localhost:8000/api/matag/${mataghistoryidarr[i]}`)
                .then(response => {     
                    temphativahistorymataglabels.push(convertDigitIn(response.data[0].createdAt.slice(0,10)));
                    temphativahistorymatagdata.push(CalculateMatagSum(response.data[0]));
                    setKey(Math.random());
                })
                .catch(error => {

                })
        }
        setData(temphativahistorymatagdata);
        setLabels(temphativahistorymataglabels);
    }

    function CalculateMatagSum(matag) {//46 fields means 2.17% every field. rn=> 
        const tempmatag = matag;
        var tempmatagsum = 0;
        if (tempmatag.kata == 'בוצע')
            tempmatagsum += 2;
        if (tempmatag.matag == 'בוצע')
            tempmatagsum += 2;
        if (tempmatag.mhtapim == 'בוצע')
            tempmatagsum += 2;
        if (tempmatag.nagadim == 'בוצע')
            tempmatagsum += 2;
        if (tempmatag.nohak == 'בוצע')
            tempmatagsum += 2;
        if (tempmatag.nihok == 'בוצע')
            tempmatagsum += 2;
        if (tempmatag.car == 'בוצע')
            tempmatagsum += 2;
        if (tempmatag.nagmashzid == 'בוצע')
            tempmatagsum += 2;
        if (tempmatag.nagmashkatkd == 'בוצע')
            tempmatagsum += 2;
        if (tempmatag.nagmashhatap == 'בוצע')
            tempmatagsum += 2;
        if (tempmatag.nagmashkatkl == 'בוצע')
            tempmatagsum += 2;
        if (tempmatag.kabalatpkodot == 'בוצע')
            tempmatagsum += 2;
        if (tempmatag.tiomtohnit == 'בוצע')
            tempmatagsum += 2;
        if (tempmatag.sikomemon == 'בוצע')
            tempmatagsum += 2;

        // console.log(tempmatagsum);//i=14 =>max 28
        var temparr = [];
        temparr.push(
            tempmatag.maracht,
            tempmatag.limod,
            tempmatag.natonim,
            tempmatag.ramatbkiot,
            tempmatag.bkiotbasadak,
            tempmatag.ramatktiva,
            tempmatag.ehotazarim,
            tempmatag.ramathashlita,
            tempmatag.ramatbizoa,
            tempmatag.ramatbkiotkhot,
            tempmatag.midatrazifot,
            tempmatag.ramathatiomkhot,
            tempmatag.tirgolpinoi,
            tempmatag.ramathashlitabtmona,
            tempmatag.ramathabakara,
            tempmatag.midathakabaladohot,
            tempmatag.ramatbizoamtmasht,
            tempmatag.ehotgomlin,
            tempmatag.ehotgomlinplogot,
            tempmatag.sikombnaim,
            tempmatag.lkahim,
            tempmatag.hafaza,
            tempmatag.bizoambhnim,
            tempmatag.mashov,
        )
        for (var i = 0; i < temparr.length; i++) //i=24 => max 48pts
        {
            if (temparr[i] == 1) {
                tempmatagsum += 0;
            }
            if (temparr[i] == 2) {
                tempmatagsum += 1;
            }
            if (temparr[i] == 3) {
                tempmatagsum += 1;
            }
            if (temparr[i] == 4) {
                tempmatagsum += 1;
            }
            if (temparr[i] == 5) {
                tempmatagsum += 2;
            }
        }
        //28pts+48pts=76+24=100
        tempmatagsum += 24;
        return (tempmatagsum);
    }

    useEffect(() => {
        getHativa();
    }, [hativaid])

    return (
        <>
        <Line key={key} data={data1} options={options1} />
        </>
    );
}
export default withRouter(HativaMatagHistoryGraph);;

