import React, { useState, useEffect } from 'react';
import TreeMenu from 'react-simple-tree-menu';
import '../../../../node_modules/react-simple-tree-menu/dist/main.css';

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Container,
} from "reactstrap";
import axios from 'axios';
import history from '../../../history'

const KshirotTree = () => {
    const [treedata, setTreeData] = useState([]);

    const loadPikods = async () => {
        try {
            await axios.get("http://localhost:8000/api/pikod",)
                .then(response => {
                    loadOgdas(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        catch {

        }
    }

    const loadOgdas = async (pikodarr) => {
        try {
            await axios.get("http://localhost:8000/api/ogda",)
                .then(response => {
                    loadHativas(pikodarr, response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        catch {

        }
    }

    const loadHativas = async (pikodarr, ogdasarr) => {
        try {
            await axios.get("http://localhost:8000/api/hativa",)
                .then(response => {
                    loadGdods(pikodarr, ogdasarr, response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        catch {

        }
    }

    const loadGdods = async (pikodarr, ogdasarr, hativasarr) => {
        try {
            await axios.get("http://localhost:8000/api/gdod",)
                .then(response => {
                    tipulsToTreeData(pikodarr, ogdasarr, hativasarr, response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        catch {

        }
    }

    const tipulsToTreeData = (pikodarr, ogdasarr, hativasarr, gdodsarr) => {
        var finalarr=[];
        for (var i = 0; i < pikodarr.length; i++) {
            var pikodnodes = []
            for (var j = 0; j < ogdasarr.length; j++) {
                var ogdasnodes = []
                if (ogdasarr[j].pikod == pikodarr[i]._id) {
                    for (var k = 0; k < hativasarr.length; k++) {
                        var hativasnodes = []
                        if (hativasarr[k].ogda == ogdasarr[j]._id) {
                            for (var l = 0; l < gdodsarr.length; l++) {
                                //    var gdodnodes=[] no need for it cuz gdod is last
                                if (gdodsarr[l].hativa == hativasarr[k]._id) {
                                    var tempgdodobj = {
                                        gdodskshirotid:gdodsarr[l].kshirot,
                                        type: "gdod",
                                        key: gdodsarr[l]._id,
                                        label: gdodsarr[l].name,
                                        nodes: [],
                                    }
                                    hativasnodes.push(tempgdodobj)
                                }
                            }
                            var temphativaobj = {
                                type: "hativa",
                                key: hativasarr[k]._id,
                                label: hativasarr[k].name,
                                nodes: hativasnodes,
                            }
                            ogdasnodes.push(temphativaobj)
                        }
                    }
                    var tempogdaobj = {
                        type: "ogda",
                        key: ogdasarr[j]._id,
                        label: ogdasarr[j].name,
                        nodes: ogdasnodes,
                    }
                    pikodnodes.push(tempogdaobj)
                }
            }
            var temppikodobj = {
                type: "pikod",
                key: pikodarr[i]._id,
                label: pikodarr[i].name,
                nodes: pikodnodes,
            }
         /*   // Create a new array based on current state: |this code had a problem of 1 pikod only!!|
            let temptreedata = [...treedata];
            // Add item to it
            temptreedata.push(temppikodobj);
            // Set state
            setTreeData(temptreedata);*/
            finalarr.push(temppikodobj);
        }
        setTreeData(finalarr);
    }

    /*end of data */

    function handleTreeClick(event) {
        console.log('handle click ', event);
       
        var idstr=event.key; //idstr = _id
        if (event.type == "pikod") {
            history.push(`/useradmineditpage/${idstr}`);
        }
        if (event.type == "ogda") {
          
            history.push(`/userogdaeditpage/${idstr}`);//idstr = _id
        }
        if (event.type == "hativa") {
            
            history.push(`/userhativaeditpage/${idstr}`);//idstr = _id
        }
        if (event.type == "gdod") {
          
            var gdodskshirotid=event.gdodskshirotid;
            history.push(`/usergdodeditpage/${idstr}`);//idstr = _id
        }
    }

    useEffect(() => {
        loadPikods();
    }, [])

    return (
        <>
            <Container style={{ paddingTop: '80px' }}>
                <Card>
                    <CardHeader style={{ direction: 'rtl' }}>
                        <CardTitle tag="h4" style={{ direction: 'rtl', textAlign: 'right' }}>עץ כשירויות</CardTitle>{/*headline*/}
                    </CardHeader>
                    <CardBody>
                        <TreeMenu
                            cacheSearch
                            data={treedata}
                            debounceTime={125}
                            disableKeyboard={false}
                            hasSearch
                            onClickItem={handleTreeClick}
                            resetOpenNodesOnDataUpdate={false}
                        />
                    </CardBody>
                </Card>
            </Container>
        </>
    );
}
export default KshirotTree;