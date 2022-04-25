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

const GdodKshirotHistoryGraph = ({ gdodid }) => {
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
            label: 'ציון כשירות',
            data: data,
            fill: true,
            backgroundColor: '#fa1251',
            borderColor: 'rgba(255, 99, 132, 0.2)',
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
                loadgdodkshirothistory(response.data[0].history);
            })
            .catch(error => {

            })
    }
   
    function loadgdodkshirothistory(kshirothistoryidarr) {
        var tempgdodhistorykshirotslabels = [];
        var tempgdodhistorykshirotsdata = [];
        for (let i = 0; i < kshirothistoryidarr.length; i++) {
            axios.get(`http://localhost:8000/api/kshirot/${kshirothistoryidarr[i]}`)
                .then(response => {     
                    tempgdodhistorykshirotslabels.push(convertDigitIn(response.data[0].createdAt.slice(0,10)));
                    tempgdodhistorykshirotsdata.push(CalculateKshirotSum(response.data[0]));
                    setKey(Math.random());
                })
                .catch(error => {

                })
        }
        setData(tempgdodhistorykshirotsdata);
        setLabels(tempgdodhistorykshirotslabels);
    }

    function CalculateKshirotSum(kshirot) {//42 fields means 2.3....% every field. rn=> every field 2% mentality 18%
        const temptipul = kshirot;
        console.log(temptipul);
        var tempkshirotsum = 0;
        if(temptipul.officersmax == 0)
        temptipul.officersmax = 1
        if(temptipul.tekenmax == 0)
        temptipul.tekenmax = 1
        if(temptipul.toolsboxmax == 0)
        temptipul.toolsboxmax = 1
        if(temptipul.bakashmax == 0)
        temptipul.bakashmax = 1
        if(temptipul.carpitermax == 0 )
        temptipul.carpitermax = 1
        if(temptipul.carhatapmax == 0)
        temptipul.carhatapmax = 1
        if(temptipul.rioarrowmax == 0)
        temptipul.rioarrowmax = 1
        if(temptipul.shibozmax == 0)
        temptipul.shibozmax = 1
        if(temptipul.driversmax == 0)
        temptipul.driversmax = 1
        if(temptipul.tikshoratmax == 0)
        temptipul.tikshoratmax = 1
        if(temptipul.tkinotmax == 0)
        temptipul.tkinotmax = 1
        if(temptipul.roleholdersmax == 0)
        temptipul.roleholdersmax = 1
        if(temptipul.nokavimmax == 0)
        temptipul.nokavimmax = 1
        if(temptipul.testermax == 0)
        temptipul.testermax = 1
        if(temptipul.amountmhalafmax == 0)
        temptipul.amountmhalafmax = 1
        if(temptipul.amounthanafamax == 0)
        temptipul.amounthanafamax = 1
        
        tempkshirotsum = (temptipul.officers / temptipul.officersmax * 2)
            + (temptipul.teken / temptipul.tekenmax * 2) + (temptipul.toolsbox / temptipul.toolsboxmax * 2) + (temptipul.bakash / temptipul.bakashmax * 2) + (temptipul.carpiter / temptipul.carpitermax * 2) +
            (temptipul.carhatap / temptipul.carhatapmax * 2) + (temptipul.rioarrow / temptipul.rioarrowmax * 2) + (temptipul.shiboz / temptipul.shibozmax * 2) + (temptipul.drivers / temptipul.driversmax * 2) +
            (temptipul.tikshorat / temptipul.tikshoratmax * 2) + (temptipul.tkinot / temptipul.tkinotmax * 2) + (temptipul.roleholders / temptipul.roleholdersmax * 2) +
            (temptipul.nokavim / temptipul.nokavimmax * 2) + (temptipul.tester / temptipul.testermax * 2) + (temptipul.amountmhalaf / temptipul.amountmhalafmax * 2) +
            (temptipul.amounthanafa / temptipul.amounthanafamax * 2);
        //console.log(tempkshirotsum);//good so far 19*2=38
        if (temptipul.match == 'קיים')
            tempkshirotsum += 2;
        if (temptipul.load == 'קיים')
            tempkshirotsum += 2;
        if (temptipul.stash == 'בוצע')
            tempkshirotsum += 2;
        if (temptipul.hatak == 'קיים')
            tempkshirotsum += 2;
        if (temptipul.lastrefreshdate == 'עומד')
            tempkshirotsum += 2;
        if (temptipul.matchmahin == 'קיים')
            tempkshirotsum += 2;
        if (temptipul.matchswap == 'קיים')
            tempkshirotsum += 2;
        if (temptipul.catalogs == 'קיים')
            tempkshirotsum += 2;
        if (temptipul.mobilitytools == 'קיים')
            tempkshirotsum += 2;
        if (temptipul.carlahh == 'קיים')
            tempkshirotsum += 2;
        if (temptipul.katkal == 'קיים')
            tempkshirotsum += 2;
        if (temptipul.personalprotection == 'קיים')
            tempkshirotsum += 2;
        if (temptipul.pkodotopara == 'קיים')
            tempkshirotsum += 2;
        if (temptipul.tiom == 'קיים')
            tempkshirotsum += 2;
        if (temptipul.commanderconf == 'קיים')
            tempkshirotsum += 2;
        if (temptipul.pakalim == 'קיים')
            tempkshirotsum += 2;
        if (temptipul.tikim == 'בוצע')
            tempkshirotsum += 2;
        if (temptipul.boxcontent == 'קיים')
            tempkshirotsum += 2;
        if (temptipul.battaliondrillamount == 'בוצע')
            tempkshirotsum += 2;
        // console.log(tempkshirotsum);//good so far 19*2=38+38=76
        switch (temptipul.mentality) {
            case 1:
                tempkshirotsum += 10;
                break;
            case 2:
                tempkshirotsum += 12;
                break;
            case 3:
                tempkshirotsum += 14;
                break;
            case 4:
                tempkshirotsum += 16;
                break;
            case 5:
                tempkshirotsum += 18;
                break;
            default:
                tempkshirotsum += 0;
        }
        if ((temptipul.trainingquality >= 0) && (temptipul.trainingquality <= 100)) {
            tempkshirotsum += (temptipul.trainingquality * 0.01) * 2;
        }
        else {
            tempkshirotsum += 0;
        }
        if ((temptipul.battaliondrillquality >= 0) && (temptipul.battaliondrillquality <= 100)) {
            tempkshirotsum += (temptipul.battaliondrillquality * 0.01) * 2;
        }
        else {
            tempkshirotsum += 0;
        }
        tempkshirotsum += 2;//not sure about the date stuff..
        return (tempkshirotsum);
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
export default withRouter(GdodKshirotHistoryGraph);;

