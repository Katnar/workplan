import React, { useState, useEffect } from 'react';
import axios from 'axios';
//need to make better.. 
export async function fetchAdminWorkData() {
    let tipuls = 0;
    let tipulsinprogress = 0;
    let tipulscompleted = 0;

    const tipulfilters = {

    }

    let dataresult = await fetchData(tipulfilters)
    tipuls = dataresult.tipuls;
    tipulsinprogress = dataresult.tipulsinprogress;
    tipulscompleted = dataresult.tipulscompleted;

    if(tipuls!=0)
    {
    tipulsinprogress = (tipulsinprogress / tipuls) * 100
    tipulscompleted = (tipulscompleted / tipuls) * 100
    }
    return ({ tipuls: tipuls, tipulsinprogress: tipulsinprogress, tipulscompleted: tipulscompleted })
}

export async function fetchPikodWorkData(pikodid) {
    let pikodtipuls = 0;
    let pikodtipulsinprogress = 0;
    let pikodtipulscompleted = 0;

    const tipulfilters = {
        gdodid: [],
        hativaid: [],
        ogdaid: [],
        pikodid: [pikodid],
    }

    let dataresult = await fetchData(tipulfilters)
    pikodtipuls = dataresult.tipuls;
    pikodtipulsinprogress = dataresult.tipulsinprogress;
    pikodtipulscompleted = dataresult.tipulscompleted;

    if(pikodtipuls!=0)
    {
    pikodtipulsinprogress = (pikodtipulsinprogress / pikodtipuls) * 100
    pikodtipulscompleted = (pikodtipulscompleted / pikodtipuls) * 100
    }
    return ({ tipuls: pikodtipuls, tipulsinprogress: pikodtipulsinprogress, tipulscompleted: pikodtipulscompleted })
}

export async function fetchOgdaWorkData(ogdaid) {
    let ogdatipuls = 0;
    let ogdatipulsinprogress = 0;
    let ogdatipulscompleted = 0;

    const tipulfilters = {
        gdodid: [],
        hativaid: [],
        ogdaid: [ogdaid],
    }

    let dataresult = await fetchData(tipulfilters)
    ogdatipuls = dataresult.tipuls;
    ogdatipulsinprogress = dataresult.tipulsinprogress;
    ogdatipulscompleted = dataresult.tipulscompleted;

    if(ogdatipuls!=0)
    {
    ogdatipulsinprogress = (ogdatipulsinprogress / ogdatipuls) * 100
    ogdatipulscompleted = (ogdatipulscompleted / ogdatipuls) * 100
    }
    return ({ tipuls: ogdatipuls, tipulsinprogress: ogdatipulsinprogress, tipulscompleted: ogdatipulscompleted })
}

export async function fetchHativaWorkData(hativaid) {
    let hativatipuls = 0;
    let hativatipulsinprogress = 0;
    let hativatipulscompleted = 0;

    const tipulfilters = {
        gdodid: [],
        hativaid: [hativaid],
    }

    let dataresult = await fetchData(tipulfilters)
    hativatipuls = dataresult.tipuls;
    hativatipulsinprogress = dataresult.tipulsinprogress;
    hativatipulscompleted = dataresult.tipulscompleted;

    if(hativatipuls!=0)
    {
    hativatipulsinprogress = (hativatipulsinprogress / hativatipuls) * 100
    hativatipulscompleted = (hativatipulscompleted / hativatipuls) * 100
    }
    return ({ tipuls: hativatipuls, tipulsinprogress: hativatipulsinprogress, tipulscompleted: hativatipulscompleted })
}

export async function fetchGdodWorkData(gdodid) {
    let gdodtipuls = 0;
    let gdodtipulsinprogress = 0;
    let gdodtipulscompleted = 0;

    const tipulfilters = {
        gdodid: [gdodid],
    }

    let dataresult = await fetchData(tipulfilters)
    gdodtipuls = dataresult.tipuls;
    gdodtipulsinprogress = dataresult.tipulsinprogress;
    gdodtipulscompleted = dataresult.tipulscompleted;

    if(gdodtipuls!=0)
    {
        gdodtipulsinprogress = (gdodtipulsinprogress / gdodtipuls) * 100
        gdodtipulscompleted = (gdodtipulscompleted / gdodtipuls) * 100
    }
    return ({ tipuls: gdodtipuls, tipulsinprogress: gdodtipulsinprogress, tipulscompleted: gdodtipulscompleted })
}

export async function fetchData(filters) {
    var tempactivetipuls = [];
    var temptipulsandactive = [];
    //
    let res = await axios.post(`http://localhost:8000/api/smartactivetipuls3`, filters)
    temptipulsandactive = res.data;
    tempactivetipuls = res.data;
    let res2 = await axios.post(`http://localhost:8000/api/smarttipuls3`, filters)
    let data2 = res2.data;
    for (var i = 0; i < data2.length; i++) {
        var bool = true;
        for (var j = 0; j < tempactivetipuls.length; j++) {
            if (data2[i]._id == tempactivetipuls[j].originaltipulid) {
                bool = false;
            }
        }
        if (bool == true) {
            temptipulsandactive.push(data2[i]);
        }
    }
    //
    var tempinprogresstipuls = [];
    var tempcompletedtipuls = [];

    for (var i = 0; i < temptipulsandactive.length; i++) {
        if (temptipulsandactive[i].status._id == "s002") {
            tempinprogresstipuls.push(temptipulsandactive[i])
        }
        if (temptipulsandactive[i].status._id == "s001") {
            tempcompletedtipuls.push(temptipulsandactive[i])
        }
    }
    // console.log(temptipulsandactive)
    // console.log(tempinprogresstipuls)
    // console.log(tempcompletedtipuls)
    return ({ tipuls: temptipulsandactive.length, tipulsinprogress: tempinprogresstipuls.length, tipulscompleted: tempcompletedtipuls.length })
}