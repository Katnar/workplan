const ActiveTipul = require("../../models/workplan/activetipul");
const mongoose = require('mongoose');

let readactivetipul = [
  {
    $lookup: {
      from: "cars",
      localField: "carnumber",
      foreignField: "_id",
      as: "car"
    }
  },
  {
    $unwind: "$car"
  },
  //car type data
  {
    $lookup: {
      from: "mkats",
      localField: "car.mkat",
      foreignField: "_id",
      as: "car.mkat",
    }
  },
  {
    $unwind: "$car.mkat"
  },
  {
    $lookup: {
      from: "mkabazs",
      localField: "car.mkat.mkabaz",
      foreignField: "_id",
      as: "car.mkat.mkabaz",
    }
  },
  {
    $unwind: "$car.mkat.mkabaz"
  },
  {
    $lookup: {
      from: "magads",
      localField: "car.mkat.mkabaz.magad",
      foreignField: "_id",
      as: "car.mkat.mkabaz.magad",
    }
  },
  {
    $unwind: "$car.mkat.mkabaz.magad"
  },
  {
    $lookup: {
      from: "magadals",
      localField: "car.mkat.mkabaz.magad.magadal",
      foreignField: "_id",
      as: "car.mkat.mkabaz.magad.magadal",
    }
  },
  {
    $unwind: "$car.mkat.mkabaz.magad.magadal"
  },
  //car type data end
  //car unit data
  {
    $lookup: {
      from: "gdods",
      localField: "car.gdod",
      foreignField: "_id",
      as: "car.gdod",
    }
  },
  {
    $unwind: "$car.gdod"
  },
  {
    $lookup: {
      from: "hativas",
      localField: "car.gdod.hativa",
      foreignField: "_id",
      as: "car.gdod.hativa",
    }
  },
  {
    $unwind: "$car.gdod.hativa"
  },
  {
    $lookup: {
      from: "ogdas",
      localField: "car.gdod.hativa.ogda",
      foreignField: "_id",
      as: "car.gdod.hativa.ogda",
    }
  },
  {
    $unwind: "$car.gdod.hativa.ogda"
  },
  {
    $lookup: {
      from: "pikods",
      localField: "car.gdod.hativa.ogda.pikod",
      foreignField: "_id",
      as: "car.gdod.hativa.ogda.pikod",
    }
  },
  {
    $unwind: "$car.gdod.hativa.ogda.pikod"
  },
  {
    $lookup: {
      from: "zkaottipuls",
      localField: "zkaottipul",
      foreignField: "_id",
      as: "zkaottipul",
    }
  },
  {
    $unwind: "$zkaottipul"
  },
  {
    $lookup: {
      from: "tipultypes",
      localField: "tipultype",
      foreignField: "_id",
      as: "tipultype",
    }
  },
  {
    $unwind: "$tipultype"
  },
  {
    $lookup: {
      from: "gofbizoas",
      localField: "gofbizoa",
      foreignField: "_id",
      as: "gofbizoa",
    }
  },
  {
    $unwind: "$gofbizoa"
  },
  {
    $lookup: {
      from: "status",
      localField: "status",
      foreignField: "_id",
      as: "status",
    }
  },
  {
    $unwind: "$status"
  },
  {
    $lookup: {
      from: "gdodbizoas",
      localField: "gdodbizoa",
      foreignField: "_id",
      as: "gdodbizoa",
    }
  },
  {
    $lookup: {
      from: "sadnabizoas",
      localField: "sadnabizoa",
      foreignField: "_id",
      as: "sadnabizoa",
    }
  },
  {
    $lookup: {
      from: "carteams",
      localField: "carteam",
      foreignField: "_id",
      as: "carteam",
    }
  },
 
];

exports.read = async (req, res) => {
  const activetipul = await ActiveTipul.findById(req.params.id);
  if (!activetipul) {
    res.status(500).json({ message: 'האימון לא נמצא' })
  } else {
    res.status(200).send([activetipul])
  }

}

exports.find = (req, res) => {
  ActiveTipul.find()
    .then((activetipul) => res.json(activetipul))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.create = (req, res) => {
  const activetipul = new ActiveTipul(req.body);
  activetipul.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  ActiveTipul.deleteOne({ _id: req.params.id })
    .then((activetipul) => res.json(activetipul))
    .catch((err) => res.status(400).json("Error: " + err));
};


exports.update = async(req, res) => {
  console.log('active',req.body.tempactivetipul.carnumber)
  const activetipul = await ActiveTipul.findByIdAndUpdate(
      req.params.id,{
        carnumber:req.body.tempactivetipul.carnumber,
        carteam:req.body.tempactivetipul.carteam,
        description:req.body.tempactivetipul.description,
        gdodbizoa:req.body.tempactivetipul.gdodbizoa,
        gofbizoa:req.body.tempactivetipul.gofbizoa,
        lastipuldate:req.body.tempactivetipul.lastipuldate,
        originaltipulid:req.body.tempactivetipul.originaltipulid,
        sadnabizoa:req.body.tempactivetipul.sadnabizoa,
        status:req.body.tempactivetipul.status,
        tipultype:req.body.tempactivetipul.tipultype, 
        tolarancedate:req.body.tempactivetipul.tolarancedate,
        updatedAt:req.body.tempactivetipul.updatedAt,
        zkaottipul:req.body.tempactivetipul.zkaottipul


      },
      {new: true}
      )
      if(!activetipul) {
          res.status(404).send({message:'סדנאת הביצוע לא יכולה להיווצר'})
      } 
      res.status(200).send(activetipul)
  

}

exports.smartactivetipuls = async (req, res) => {
  let activetipulfindquerry = readactivetipul.slice();
  let finalquerry = activetipulfindquerry;

  let andquery = [];
  //units
  if ((req.params.pikodid)&&(req.params.pikodid!='undefined')) {
    andquery.push({ "car.gdod.hativa.ogda.pikod._id": req.params.pikodid });
  }
  if ((req.params.ogdaid)&&(req.params.ogdaid!='undefined')) {
    andquery.push({ "car.gdod.hativa.ogda._id": req.params.ogdaid });
  }
  if ((req.params.hativaid)&&(req.params.hativaid!='undefined')) {
    andquery.push({ "car.gdod.hativa._id": req.params.hativaid });
  }
  if ((req.params.gdodsid)&&(req.params.gdodsid.length>0)) {
    let gdodsinnerquery = [];
    for(let i=0;i<req.params.gdodsid.length;i++)
    gdodsinnerquery.push({ "car.gdod._id": req.params.gdodsid[i] });

    andquery.push({
      "$or": gdodsinnerquery
    });
  }
  //mkat->magadal
  if ((req.params.magadalid)&&(req.params.magadalid!='undefined')) {
    andquery.push({ "car.mkat.mkabaz.magad.magadal._id": req.params.magadalid });
  }
  if ((req.params.magadid)&&(req.params.magadid!='undefined')) {
    andquery.push({ "car.mkat.mkabaz.magad._id": req.params.magadid });
  }
  if ((req.params.mkabazid)&&(req.params.mkabazid!='undefined')) {
    andquery.push({ "car.mkat.mkabaz._id": req.params.mkabazid });
  }
  if ((req.params.mkatid)&&(req.params.mkatid!='undefined')) {
    andquery.push({ "car.mkat._id": req.params.mkatid });
  }
  //car number
  if ((req.params.carid)&&(req.params.carid!='undefined')) {
    andquery.push({ "car._id": req.params.carid });
  }
  //gofbizoa
  if ((req.params.gofbizoaid)&&(req.params.gofbizoaid!='undefined')) {
    andquery.push({ "gofbizoa._id": req.params.gofbizoaid });
  }
  //status
  if ((req.params.statusid)&&(req.params.statusid!='undefined')) {
    andquery.push({ "status._id": req.params.statusid });
  }
  //tipultype
  if ((req.params.tipultypeid)&&(req.params.tipultypeid!='undefined')) {
    andquery.push({ "tipultype._id": req.params.tipultypeid });
  }
  //zkaottipul
  if ((req.params.zkaottipulid)&&(req.params.zkaottipulid!='undefined')) {
    andquery.push({ "zkaottipul._id": req.params.zkaottipulid });
  }

if(andquery.length != 0){
  let matchquerry = {

    "$match": {
      "$and": andquery
    }
  };
  finalquerry.push(matchquerry)
}   

    // console.log(matchquerry)
    // console.log(andquery)

    ActiveTipul.aggregate(finalquerry)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(400).json('Error: ' + error);
    });
};

exports.smartactivetipulsbydates = async (req, res) => {
  let activetipulfindquerry = readactivetipul.slice();
  let finalquerry = activetipulfindquerry;

  let andquery = [];
  //units
  if ((req.params.pikodid)&&(req.params.pikodid!='undefined')) {
    andquery.push({ "car.gdod.hativa.ogda.pikod._id": req.params.pikodid });
  }
  if ((req.params.ogdaid)&&(req.params.ogdaid!='undefined')) {
    andquery.push({ "car.gdod.hativa.ogda._id": req.params.ogdaid });
  }
  if ((req.params.hativaid)&&(req.params.hativaid!='undefined')) {
    andquery.push({ "car.gdod.hativa._id": req.params.hativaid });
  }
  if ((req.params.gdodsid)&&(req.params.gdodsid.length>0)) {
    let gdodsinnerquery = [];
    for(let i=0;i<req.params.gdodsid.length;i++)
    gdodsinnerquery.push({ "car.gdod._id": req.params.gdodsid[i] });

    andquery.push({
      "$or": gdodsinnerquery
    });
  }
  //mkat->magadal
  if ((req.params.magadalid)&&(req.params.magadalid!='undefined')) {
    andquery.push({ "car.mkat.mkabaz.magad.magadal._id": req.params.magadalid });
  }
  if ((req.params.magadid)&&(req.params.magadid!='undefined')) {
    andquery.push({ "car.mkat.mkabaz.magad._id": req.params.magadid });
  }
  if ((req.params.mkabazid)&&(req.params.mkabazid!='undefined')) {
    andquery.push({ "car.mkat.mkabaz._id": req.params.mkabazid });
  }
  if ((req.params.mkatid)&&(req.params.mkatid!='undefined')) {
    andquery.push({ "car.mkat._id": req.params.mkatid });
  }
  //car number
  if ((req.params.carid)&&(req.params.carid!='undefined')) {
    andquery.push({ "car._id": req.params.carid });
  }
  //gofbizoa
  if ((req.params.gofbizoaid)&&(req.params.gofbizoaid!='undefined')) {
    andquery.push({ "gofbizoa._id": req.params.gofbizoaid });
  }
  //status
  if ((req.params.statusid)&&(req.params.statusid!='undefined')) {
    andquery.push({ "status._id": req.params.statusid });
  }
  //tipultype
  if ((req.params.tipultypeid)&&(req.params.tipultypeid!='undefined')) {
    andquery.push({ "tipultype._id": req.params.tipultypeid });
  }
  //zkaottipul
  if ((req.params.zkaottipulid)&&(req.params.zkaottipulid!='undefined')) {
    andquery.push({ "zkaottipul._id": req.params.zkaottipulid });
  }

  //dates
  if (((req.params.startdate != 'undefined')&&(req.params.enddate != 'undefined'))&&((req.params.startdate != '') && (req.params.enddate != ''))) {
    andquery.push({ "lastipuldate": {$gte: new Date(req.params.startdate), $lte: new Date(req.params.enddate)}});
  }

    let matchquerry = {
      "$match": {
        "$and": andquery
      }
    };
    finalquerry.push(matchquerry)

    // console.log(matchquerry)
    // console.log(andquery)

    ActiveTipul.aggregate(finalquerry)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(400).json('Error: ' + error);
    });
};

exports.activetipulbyid = async (req, res) => {
  let activetipulfindquerry = readactivetipul.slice();
  let finalquerry = activetipulfindquerry;

  let matchquerry = {
    "$match": {
       "_id": mongoose.Types.ObjectId(req.params.activetipulid)
    }
  };
  finalquerry.push(matchquerry)
   
    // console.log(matchquerry)
    // console.log(andquery)
    // console.log(finalquerry)

    ActiveTipul.aggregate(finalquerry)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(400).json('Error: ' + error);
    });
};

exports.smartactivetipuls2 = async (req, res) => {
  let activetipulfindquerry = readactivetipul.slice();
  let finalquerry = activetipulfindquerry;

  let andquery = [];
  //units
  if ((req.body.pikodid)&&(req.body.pikodid.length>0)&&(req.body.ogdaid.length==0)) {
    let pikodinnerquery = [];
    for(let i=0;i<req.body.pikodid.length;i++)
    pikodinnerquery.push({ "car.gdod.hativa.ogda.pikod._id": req.body.pikodid[i] });

    andquery.push({
      "$or": pikodinnerquery
    });
    console.log(pikodinnerquery)
  }
  if ((req.body.ogdaid)&&(req.body.ogdaid.length>0)&&(req.body.hativaid.length==0)) {
    let ogdainnerquery = [];
    for(let i=0;i<req.body.ogdaid.length;i++)
    ogdainnerquery.push({ "car.gdod.hativa.ogda._id": req.body.ogdaid[i] });

    andquery.push({
      "$or": ogdainnerquery
    });
    console.log(ogdainnerquery)
  }
  if ((req.body.hativaid)&&(req.body.hativaid.length>0)&&(req.body.gdodid.length==0)) {
    let hativainnerquery = [];
    for(let i=0;i<req.body.hativaid.length;i++)
    hativainnerquery.push({ "car.gdod.hativa._id": req.body.hativaid[i] });

    andquery.push({
      "$or": hativainnerquery
    });
    console.log(hativainnerquery)
  }
  if ((req.body.gdodid)&&(req.body.gdodid.length>0)) {
    let gdodinnerquery = [];
    for(let i=0;i<req.body.gdodid.length;i++)
    gdodinnerquery.push({ "car.gdod._id": req.body.gdodid[i] });

    andquery.push({
      "$or": gdodinnerquery
    });
    console.log(gdodinnerquery)
  }
  //mkat->magadal
  if (req.body.magadalid) {
    andquery.push({ "car.mkat.mkabaz.magad.magadal._id": req.body.magadalid });
  }
  if (req.body.magadid) {
    andquery.push({ "car.mkat.mkabaz.magad._id": req.body.magadid });
  }
  if (req.body.mkabazid) {
    andquery.push({ "car.mkat.mkabaz._id": req.body.mkabazid });
  }
  if (req.body.mkatid) {
    andquery.push({ "car.mkat._id": req.body.mkatid });
  }
  //car number
  if (req.body.carid) {
    andquery.push({ "car._id": req.body.carid });
  }
  //gofbizoa
  if (req.body.gofbizoaid) {
    andquery.push({ "gofbizoa._id": req.body.gofbizoaid });
  }
  //status
  if (req.body.statusid) {
    andquery.push({ "status._id": req.body.statusid });
  }
  //tipultype
  if (req.body.tipultypeid) {
    andquery.push({ "tipultype._id": req.body.tipultypeid });
  }
  //zkaottipul
  if (req.body.zkaottipulid) {
    andquery.push({ "zkaottipul._id": req.body.zkaottipulid });
  }
if(andquery.length != 0){
  let matchquerry = {

    "$match": {
      "$and": andquery
    }
  };
  finalquerry.push(matchquerry)
}
   
   

    // console.log(matchquerry)
    // console.log(andquery)

    ActiveTipul.aggregate(finalquerry)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(400).json('Error: ' + error);
    });
};

exports.smartactivetipulsbydates2 = async (req, res) => {
  let activetipulfindquerry = readactivetipul.slice();
  let finalquerry = activetipulfindquerry;

  let andquery = [];
  //units
  if ((req.body.pikodid)&&(req.body.pikodid.length>0)&&(req.body.ogdaid.length==0)) {
    let pikodinnerquery = [];
    for(let i=0;i<req.body.pikodid.length;i++)
    pikodinnerquery.push({ "car.gdod.hativa.ogda.pikod._id": req.body.pikodid[i] });

    andquery.push({
      "$or": pikodinnerquery
    });
    console.log(pikodinnerquery)
  }
  if ((req.body.ogdaid)&&(req.body.ogdaid.length>0)&&(req.body.hativaid.length==0)) {
    let ogdainnerquery = [];
    for(let i=0;i<req.body.ogdaid.length;i++)
    ogdainnerquery.push({ "car.gdod.hativa.ogda._id": req.body.ogdaid[i] });

    andquery.push({
      "$or": ogdainnerquery
    });
    console.log(ogdainnerquery)
  }
  if ((req.body.hativaid)&&(req.body.hativaid.length>0)&&(req.body.gdodid.length==0)) {
    let hativainnerquery = [];
    for(let i=0;i<req.body.hativaid.length;i++)
    hativainnerquery.push({ "car.gdod.hativa._id": req.body.hativaid[i] });

    andquery.push({
      "$or": hativainnerquery
    });
    console.log(hativainnerquery)
  }
  if ((req.body.gdodid)&&(req.body.gdodid.length>0)) {
    let gdodinnerquery = [];
    for(let i=0;i<req.body.gdodid.length;i++)
    gdodinnerquery.push({ "car.gdod._id": req.body.gdodid[i] });

    andquery.push({
      "$or": gdodinnerquery
    });
    console.log(gdodinnerquery)
  }
  //mkat->magadal
  if (req.body.magadalid) {
    andquery.push({ "car.mkat.mkabaz.magad.magadal._id": req.body.magadalid });
  }
  if (req.body.magadid) {
    andquery.push({ "car.mkat.mkabaz.magad._id": req.body.magadid });
  }
  if (req.body.mkabazid) {
    andquery.push({ "car.mkat.mkabaz._id": req.body.mkabazid });
  }
  if (req.body.mkatid) {
    andquery.push({ "car.mkat._id": req.body.mkatid });
  }
  //car number
  if (req.body.carid) {
    andquery.push({ "car._id": req.body.carid });
  }
  //gofbizoa
  if (req.body.gofbizoaid) {
    andquery.push({ "gofbizoa._id": req.body.gofbizoaid });
  }
  //status
  if (req.body.statusid) {
    andquery.push({ "status._id": req.body.statusid });
  }
  //tipultype
  if (req.body.tipultypeid) {
    andquery.push({ "tipultype._id": req.body.tipultypeid });
  }
  //zkaottipul
  if (req.body.zkaottipulid) {
    andquery.push({ "zkaottipul._id": req.body.zkaottipulid });
  }

  //dates
  if (((req.body.startdate != 'undefined')&&(req.body.enddate != 'undefined'))&&((req.body.startdate != '') && (req.body.enddate != ''))) {
    andquery.push({ "lastipuldate": {$gte: new Date(req.body.startdate), $lte: new Date(req.body.enddate)}});
  }

    let matchquerry = {
      "$match": {
        "$and": andquery
      }
    };
    finalquerry.push(matchquerry)

    // console.log(matchquerry)
    // console.log(andquery)

    ActiveTipul.aggregate(finalquerry)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(400).json('Error: ' + error);
    });
};

exports.smartactivetipuls3 = async (req, res) => {
  let activetipulfindquerry = readactivetipul.slice();
  let finalquerry = activetipulfindquerry;

  let andquery = [];
  //units
  if ((req.body.pikodid)&&(req.body.pikodid.length>0)&&(req.body.ogdaid.length==0)) {
    let pikodinnerquery = [];
    for(let i=0;i<req.body.pikodid.length;i++)
    pikodinnerquery.push({ "car.gdod.hativa.ogda.pikod._id": req.body.pikodid[i] });

    andquery.push({
      "$or": pikodinnerquery
    });
    console.log(pikodinnerquery)
  }
  if ((req.body.ogdaid)&&(req.body.ogdaid.length>0)&&(req.body.hativaid.length==0)) {
    let ogdainnerquery = [];
    for(let i=0;i<req.body.ogdaid.length;i++)
    ogdainnerquery.push({ "car.gdod.hativa.ogda._id": req.body.ogdaid[i] });

    andquery.push({
      "$or": ogdainnerquery
    });
    console.log(ogdainnerquery)
  }
  if ((req.body.hativaid)&&(req.body.hativaid.length>0)&&(req.body.gdodid.length==0)) {
    let hativainnerquery = [];
    for(let i=0;i<req.body.hativaid.length;i++)
    hativainnerquery.push({ "car.gdod.hativa._id": req.body.hativaid[i] });

    andquery.push({
      "$or": hativainnerquery
    });
    console.log(hativainnerquery)
  }
  if ((req.body.gdodid)&&(req.body.gdodid.length>0)) {
    let gdodinnerquery = [];
    for(let i=0;i<req.body.gdodid.length;i++)
    gdodinnerquery.push({ "car.gdod._id": req.body.gdodid[i] });

    andquery.push({
      "$or": gdodinnerquery
    });
    console.log(gdodinnerquery)
  }
  //car->magadal
  if ((req.body.magadalid)&&(req.body.magadalid.length>0)&&(req.body.magadid.length==0)) {
    let magadalinnerquery = [];
    for(let i=0;i<req.body.magadalid.length;i++)
    magadalinnerquery.push({ "car.mkat.mkabaz.magad.magadal._id": req.body.magadalid[i] });

    andquery.push({
      "$or": magadalinnerquery
    });
    console.log(magadalinnerquery)
  }
  if ((req.body.magadid)&&(req.body.magadid.length>0)&&(req.body.mkabazid.length==0)) {
    let magadinnerquery = [];
    for(let i=0;i<req.body.magadid.length;i++)
    magadinnerquery.push({ "car.mkat.mkabaz.magad._id": req.body.magadid[i] });

    andquery.push({
      "$or": magadinnerquery
    });
    console.log(magadinnerquery)
  }
  if ((req.body.mkabazid)&&(req.body.mkabazid.length>0)&&(req.body.mkatid.length==0)) {
    let mkabazinnerquery = [];
    for(let i=0;i<req.body.mkabazid.length;i++)
    mkabazinnerquery.push({ "car.mkat.mkabaz._id": req.body.mkabazid[i] });

    andquery.push({
      "$or": mkabazinnerquery
    });
    console.log(mkabazinnerquery)
  }
  if ((req.body.mkatid)&&(req.body.mkatid.length>0)&&(req.body.carid.length==0)) {
    let mkatinnerquery = [];
    for(let i=0;i<req.body.mkatid.length;i++)
    mkatinnerquery.push({ "car.mkat._id": req.body.mkatid[i] });

    andquery.push({
      "$or": mkatinnerquery
    });
    console.log(mkatinnerquery)
  }
  if ((req.body.carid)&&(req.body.carid.length>0)) {
    let carinnerquery = [];
    for(let i=0;i<req.body.carid.length;i++)
    carinnerquery.push({ "car._id": req.body.carid[i] });

    andquery.push({
      "$or": carinnerquery
    });
    console.log(carinnerquery)
  }

  //gofbizoa
  if ((req.body.gofbizoaid)&&(req.body.gofbizoaid.length>0)) {
    let gofbizoainnerquery = [];
    for(let i=0;i<req.body.gofbizoaid.length;i++)
    gofbizoainnerquery.push({ "gofbizoa._id": req.body.gofbizoaid[i] });

    andquery.push({
      "$or": gofbizoainnerquery
    });
    console.log(gofbizoainnerquery)
  }
  //status
  if ((req.body.statusid)&&(req.body.statusid.length>0)) {
    let statusinnerquery = [];
    for(let i=0;i<req.body.statusid.length;i++)
    statusinnerquery.push({ "status._id": req.body.statusid[i] });

    andquery.push({
      "$or": statusinnerquery
    });
    console.log(statusinnerquery)
  }
  //tipultype
  if ((req.body.tipultypeid)&&(req.body.tipultypeid.length>0)) {
    let tipultypeinnerquery = [];
    for(let i=0;i<req.body.tipultypeid.length;i++)
    tipultypeinnerquery.push({ "tipultype._id": req.body.tipultypeid[i] });

    andquery.push({
      "$or": tipultypeinnerquery
    });
    console.log(tipultypeinnerquery)
  }
  //zkaottipul
  if ((req.body.zkaottipulid)&&(req.body.zkaottipulid.length>0)) {
    let zkaottipulinnerquery = [];
    for(let i=0;i<req.body.zkaottipulid.length;i++)
    zkaottipulinnerquery.push({ "zkaottipul._id": req.body.zkaottipulid[i] });

    andquery.push({
      "$or": zkaottipulinnerquery
    });
    console.log(zkaottipulinnerquery)
  }

if(andquery.length != 0){
  let matchquerry = {

    "$match": {
      "$and": andquery
    }
  };
  finalquerry.push(matchquerry)
}
   
    // console.log(matchquerry)
    // console.log(andquery)

    ActiveTipul.aggregate(finalquerry)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(400).json('Error: ' + error);
    });
};

exports.smartactivetipulsbydates3 = async (req, res) => {
  let activetipulfindquerry = readactivetipul.slice();
  let finalquerry = activetipulfindquerry;

  let andquery = [];
  //units
  if ((req.body.pikodid)&&(req.body.pikodid.length>0)&&(req.body.ogdaid.length==0)) {
    let pikodinnerquery = [];
    for(let i=0;i<req.body.pikodid.length;i++)
    pikodinnerquery.push({ "car.gdod.hativa.ogda.pikod._id": req.body.pikodid[i] });

    andquery.push({
      "$or": pikodinnerquery
    });
    console.log(pikodinnerquery)
  }
  if ((req.body.ogdaid)&&(req.body.ogdaid.length>0)&&(req.body.hativaid.length==0)) {
    let ogdainnerquery = [];
    for(let i=0;i<req.body.ogdaid.length;i++)
    ogdainnerquery.push({ "car.gdod.hativa.ogda._id": req.body.ogdaid[i] });

    andquery.push({
      "$or": ogdainnerquery
    });
    console.log(ogdainnerquery)
  }
  if ((req.body.hativaid)&&(req.body.hativaid.length>0)&&(req.body.gdodid.length==0)) {
    let hativainnerquery = [];
    for(let i=0;i<req.body.hativaid.length;i++)
    hativainnerquery.push({ "car.gdod.hativa._id": req.body.hativaid[i] });

    andquery.push({
      "$or": hativainnerquery
    });
    console.log(hativainnerquery)
  }
  if ((req.body.gdodid)&&(req.body.gdodid.length>0)) {
    let gdodinnerquery = [];
    for(let i=0;i<req.body.gdodid.length;i++)
    gdodinnerquery.push({ "car.gdod._id": req.body.gdodid[i] });

    andquery.push({
      "$or": gdodinnerquery
    });
    console.log(gdodinnerquery)
  }
  //car->magadal
  if ((req.body.magadalid)&&(req.body.magadalid.length>0)&&(req.body.magadid.length==0)) {
    let magadalinnerquery = [];
    for(let i=0;i<req.body.magadalid.length;i++)
    magadalinnerquery.push({ "car.mkat.mkabaz.magad.magadal._id": req.body.magadalid[i] });

    andquery.push({
      "$or": magadalinnerquery
    });
    console.log(magadalinnerquery)
  }
  if ((req.body.magadid)&&(req.body.magadid.length>0)&&(req.body.mkabazid.length==0)) {
    let magadinnerquery = [];
    for(let i=0;i<req.body.magadid.length;i++)
    magadinnerquery.push({ "car.mkat.mkabaz.magad._id": req.body.magadid[i] });

    andquery.push({
      "$or": magadinnerquery
    });
    console.log(magadinnerquery)
  }
  if ((req.body.mkabazid)&&(req.body.mkabazid.length>0)&&(req.body.mkatid.length==0)) {
    let mkabazinnerquery = [];
    for(let i=0;i<req.body.mkabazid.length;i++)
    mkabazinnerquery.push({ "car.mkat.mkabaz._id": req.body.mkabazid[i] });

    andquery.push({
      "$or": mkabazinnerquery
    });
    console.log(mkabazinnerquery)
  }
  if ((req.body.mkatid)&&(req.body.mkatid.length>0)&&(req.body.carid.length==0)) {
    let mkatinnerquery = [];
    for(let i=0;i<req.body.mkatid.length;i++)
    mkatinnerquery.push({ "car.mkat._id": req.body.mkatid[i] });

    andquery.push({
      "$or": mkatinnerquery
    });
    console.log(mkatinnerquery)
  }
  if ((req.body.carid)&&(req.body.carid.length>0)) {
    let carinnerquery = [];
    for(let i=0;i<req.body.carid.length;i++)
    carinnerquery.push({ "car._id": req.body.carid[i] });

    andquery.push({
      "$or": carinnerquery
    });
    console.log(carinnerquery)
  }
  
  //gofbizoa
  if ((req.body.gofbizoaid)&&(req.body.gofbizoaid.length>0)) {
    let gofbizoainnerquery = [];
    for(let i=0;i<req.body.gofbizoaid.length;i++)
    gofbizoainnerquery.push({ "gofbizoa._id": req.body.gofbizoaid[i] });

    andquery.push({
      "$or": gofbizoainnerquery
    });
    console.log(gofbizoainnerquery)
  }
  //status
  if ((req.body.statusid)&&(req.body.statusid.length>0)) {
    let statusinnerquery = [];
    for(let i=0;i<req.body.statusid.length;i++)
    statusinnerquery.push({ "status._id": req.body.statusid[i] });

    andquery.push({
      "$or": statusinnerquery
    });
    console.log(statusinnerquery)
  }
  //tipultype
  if ((req.body.tipultypeid)&&(req.body.tipultypeid.length>0)) {
    let tipultypeinnerquery = [];
    for(let i=0;i<req.body.tipultypeid.length;i++)
    tipultypeinnerquery.push({ "tipultype._id": req.body.tipultypeid[i] });

    andquery.push({
      "$or": tipultypeinnerquery
    });
    console.log(tipultypeinnerquery)
  }
  //zkaottipul
  if ((req.body.zkaottipulid)&&(req.body.zkaottipulid.length>0)) {
    let zkaottipulinnerquery = [];
    for(let i=0;i<req.body.zkaottipulid.length;i++)
    zkaottipulinnerquery.push({ "zkaottipul._id": req.body.zkaottipulid[i] });

    andquery.push({
      "$or": zkaottipulinnerquery
    });
    console.log(zkaottipulinnerquery)
  }

  //dates
  if (((req.body.startdate != 'undefined')&&(req.body.enddate != 'undefined'))&&((req.body.startdate != '') && (req.body.enddate != ''))) {
    andquery.push({ "lastipuldate": {$gte: new Date(req.body.startdate), $lte: new Date(req.body.enddate)}});
  }

    let matchquerry = {
      "$match": {
        "$and": andquery
      }
    };
    finalquerry.push(matchquerry)

     //console.log(matchquerry)
     console.log(andquery)

     ActiveTipul.aggregate(finalquerry)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(400).json('Error: ' + error);
    });
};