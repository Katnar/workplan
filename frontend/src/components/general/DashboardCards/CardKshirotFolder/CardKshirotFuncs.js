import React, { useState, useEffect } from 'react';
import axios from 'axios';

export async function fetchAdminKshirotData() {
    let gdodswithkshirotindex = 0;
    let gdodswithtrainingindex = 0;
    
    let pikodkshirot = 0;
    let pikodtraining = 0;
    let res5 = await axios.get(`http://localhost:8000/api/pikod`)
    let data5 = res5.data;
    for (let l = 0; l < data5.length; l++) {
        let res = await axios.post(`http://localhost:8000/api/ogda/ogdasbypikodid`, { pikod: data5[l]._id })
        let data = res.data;
        for (let i = 0; i < data.length; i++) {
            let res1 = await axios.post(`http://localhost:8000/api/hativa/hativasbyogdaid`, { ogda: data[i]._id })
            let data1 = res1.data;
            for (let j = 0; j < data1.length; j++) {
                let res2 = await axios.post(`http://localhost:8000/api/gdod/gdodsbyhativaid`, { hativa: data1[j]._id })
                let data2 = res2.data;
                for (let k = 0; k < data2.length; k++) {
                    if (data2[k].kshirot) {
                    gdodswithkshirotindex += 1;
                    pikodkshirot += await loadgdodkshirot(data2[k].kshirot)
                    }
                    if (data2[k].kshirot) {
                    gdodswithtrainingindex += 1;
                    pikodtraining += await loadgdodtraining(data2[k].training)
                    }
                }
            }
        }
    }
    if (gdodswithkshirotindex != 0)
    pikodkshirot = pikodkshirot / gdodswithkshirotindex

    if (gdodswithtrainingindex != 0)
    pikodtraining = pikodtraining / gdodswithtrainingindex
    return ({ kshirot: pikodkshirot, training: pikodtraining })
}

export async function fetchPikodKshirotData(pikodid) {
    let gdodswithkshirotindex = 0;
    let gdodswithtrainingindex = 0;

    let pikodkshirot = 0;
    let pikodtraining = 0;
    let res = await axios.post(`http://localhost:8000/api/ogda/ogdasbypikodid`, { pikod: pikodid })
    let data = res.data;
    for (let i = 0; i < data.length; i++) {
        let res1 = await axios.post(`http://localhost:8000/api/hativa/hativasbyogdaid`, { ogda: data[i]._id })
        let data1 = res1.data;
        for (let j = 0; j < data1.length; j++) {
            let res2 = await axios.post(`http://localhost:8000/api/gdod/gdodsbyhativaid`, { hativa: data1[j]._id })
            let data2 = res2.data;
            for (let k = 0; k < data2.length; k++) {
                if (data2[k].kshirot) {
                    gdodswithkshirotindex += 1;
                    pikodkshirot += await loadgdodkshirot(data2[k].kshirot)
                }
                if (data2[k].training) {
                    gdodswithtrainingindex += 1;
                    pikodtraining += await loadgdodtraining(data2[k].training)
                }
            }
        }
    }
    if (gdodswithkshirotindex != 0)
        pikodkshirot = pikodkshirot / gdodswithkshirotindex

    if (gdodswithtrainingindex != 0)
        pikodtraining = pikodtraining / gdodswithtrainingindex
    return ({ kshirot: pikodkshirot, training: pikodtraining })
}

export async function fetchOgdaKshirotData(ogdaid) {
    let gdodswithkshirotindex = 0;
    let gdodswithtrainingindex = 0;

    let ogdakshirot = 0;
    let ogdatraining = 0;
    let res = await axios.post(`http://localhost:8000/api/hativa/hativasbyogdaid`, { ogda: ogdaid })
    let data = res.data;
    for (let i = 0; i < data.length; i++) {
        let res1 = await axios.post(`http://localhost:8000/api/gdod/gdodsbyhativaid`, { hativa: data[i]._id })
        let data1 = res1.data;
        for (let j = 0; j < data1.length; j++) {
            if (data1[j].kshirot) {
                gdodswithkshirotindex += 1;
                ogdakshirot += await loadgdodkshirot(data1[j].kshirot)
            }
            if (data1[j].kshirot) {
                gdodswithtrainingindex += 1;
                ogdatraining += await loadgdodtraining(data1[j].training)
            }
        }
    }
    if (gdodswithkshirotindex != 0)
        ogdakshirot = ogdakshirot / gdodswithkshirotindex

    if (gdodswithtrainingindex != 0)
        ogdatraining = ogdatraining / gdodswithtrainingindex
    return ({ kshirot: ogdakshirot, training: ogdatraining })
}

export async function fetchHativaKshirotData(hativaid) {
    let gdodswithkshirotindex = 0;
    let gdodswithtrainingindex = 0;

    let hativakshirot = 0;
    let hativatraining = 0;

    let res = await axios.post(`http://localhost:8000/api/gdod/gdodsbyhativaid`, { hativa: hativaid })
    let data = res.data;
    for (let i = 0; i < data.length; i++) {
        if (data[i].kshirot) {
            gdodswithkshirotindex += 1;
            hativakshirot += await loadgdodkshirot(data[i].kshirot)
        }
        if (data[i].kshirot) {
            gdodswithtrainingindex += 1;
            hativatraining += await loadgdodtraining(data[i].training)
        }
    }
    if (gdodswithkshirotindex != 0)
        hativakshirot = hativakshirot / gdodswithkshirotindex

    if (gdodswithtrainingindex != 0)
        hativatraining = hativatraining / gdodswithtrainingindex
    return ({ kshirot: hativakshirot, training: hativatraining })
}

export async function fetchGdodKshirotData(gdodid) {
    let res = await axios.post(`http://localhost:8000/api/gdod/gdodbyid`, [gdodid]);
    let data = res.data[0];
    let gdodkshirot = await loadgdodkshirot(data.kshirot);
    let gdodtraining = await loadgdodtraining(data.training);
    return ({ kshirot: gdodkshirot, training: gdodtraining })
}

/*gdod*/
async function loadgdodkshirot(kshirotid) {
    if (kshirotid != undefined) {
        let res = await axios.get(`http://localhost:8000/api/kshirot/${kshirotid}`)
        let data = res.data[0];
        return (CalculateKshirotSum(data));
    }
    else {
        return (0)
    }
}

async function loadgdodtraining(trainingid) {
    if (trainingid != undefined) {
        let res = await axios.get(`http://localhost:8000/api/training/${trainingid}`)
        let data = res.data[0];
        return (CalculateTrainingSum(data));
    }
    else {
        return (0)
    }
}
/*gdod*/

/*grades*/
function CalculateKshirotSum(kshirot) {//42 fields means 2.3....% every field. rn=> every field 2% mentality 18%
    const temptipul = kshirot;
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
    if (temptipul.match == '????????')
        tempkshirotsum += 2;
    if (temptipul.load == '????????')
        tempkshirotsum += 2;
    if (temptipul.stash == '????????')
        tempkshirotsum += 2;
    if (temptipul.hatak == '????????')
        tempkshirotsum += 2;
    if (temptipul.lastrefreshdate == '????????')
        tempkshirotsum += 2;
    if (temptipul.matchmahin == '????????')
        tempkshirotsum += 2;
    if (temptipul.matchswap == '????????')
        tempkshirotsum += 2;
    if (temptipul.catalogs == '????????')
        tempkshirotsum += 2;
    if (temptipul.mobilitytools == '????????')
        tempkshirotsum += 2;
    if (temptipul.carlahh == '????????')
        tempkshirotsum += 2;
    if (temptipul.katkal == '????????')
        tempkshirotsum += 2;
    if (temptipul.personalprotection == '????????')
        tempkshirotsum += 2;
    if (temptipul.pkodotopara == '????????')
        tempkshirotsum += 2;
    if (temptipul.tiom == '????????')
        tempkshirotsum += 2;
    if (temptipul.commanderconf == '????????')
        tempkshirotsum += 2;
    if (temptipul.pakalim == '????????')
        tempkshirotsum += 2;
    if (temptipul.tikim == '????????')
        tempkshirotsum += 2;
    if (temptipul.boxcontent == '????????')
        tempkshirotsum += 2;
    if (temptipul.battaliondrillamount == '????????')
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

function CalculateTrainingSum(training) {//46 fields means 2.17% every field. rn=> 
    const temptraining = training;
    var temptrainingsum = 0;
    if (temptraining.emon == '????????')
        temptrainingsum += 2;
    if (temptraining.maflag == '????????')
        temptrainingsum += 2;
    if (temptraining.kata == '????????')
        temptrainingsum += 2;
    if (temptraining.kitathalafim == '????????')
        temptrainingsum += 2;
    if (temptraining.kitatnaot == '????????')
        temptrainingsum += 2;
    if (temptraining.kitacala == '????????')
        temptrainingsum += 2;
    if (temptraining.a == '????????')
        temptrainingsum += 2;
    if (temptraining.b == '????????')
        temptrainingsum += 2;
    if (temptraining.d == '????????')
        temptrainingsum += 2;
    if (temptraining.nispach == '????????')
        temptrainingsum += 2;
    if (temptraining.nohak == '????????')
        temptrainingsum += 2;
    if (temptraining.nihok == '????????')
        temptrainingsum += 2;
    if (temptraining.azarim == '????????')
        temptrainingsum += 2;
    if (temptraining.pkodotmasoa == '????????')
        temptrainingsum += 2;
    if (temptraining.sadak == '????????')
        temptrainingsum += 2;
    if (temptraining.tadrich == '????????')
        temptrainingsum += 2;
    if (temptraining.pkodotahzaka == '????????')
        temptrainingsum += 2;
    if (temptraining.tiom == '????????')
        temptrainingsum += 2;
    if (temptraining.aishor == '????????')
        temptrainingsum += 2;
    if (temptraining.shimosbashob == '????????')
        temptrainingsum += 2;
    if (temptraining.shimosbashob2 == '????????')
        temptrainingsum += 2;
    if (temptraining.sicomimon == '????????')
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
    return (temptrainingsum);
}
/*grades*/