const Car = require("../../models/workplan/car");
const mongoose = require('mongoose');

let readcar = [
  {
    $lookup: {
      from: "mkats",
      localField: "mkat",
      foreignField: "_id",
      as: "mkat",
    }
  },
  {
    $unwind: "$mkat"
  },
  {
    $lookup: {
      from: "mkabazs",
      localField: "mkat.mkabaz",
      foreignField: "_id",
      as: "mkat.mkabaz",
    }
  },
  {
    $unwind: "$mkat.mkabaz"
  },
  {
    $lookup: {
      from: "magads",
      localField: "mkat.mkabaz.magad",
      foreignField: "_id",
      as: "mkat.mkabaz.magad",
    }
  },
  {
    $unwind: "$mkat.mkabaz.magad"
  },
  {
    $lookup: {
      from: "magadals",
      localField: "mkat.mkabaz.magad.magadal",
      foreignField: "_id",
      as: "mkat.mkabaz.magad.magadal",
    }
  },
  {
    $unwind: "$mkat.mkabaz.magad.magadal"
  },
  //car type data end
  //car unit data
  {
    $lookup: {
      from: "gdods",
      localField: "gdod",
      foreignField: "_id",
      as: "gdod",
    }
  },
  {
    $unwind: "$gdod"
  },
  {
    $lookup: {
      from: "hativas",
      localField: "gdod.hativa",
      foreignField: "_id",
      as: "gdod.hativa",
    }
  },
  {
    $unwind: "$gdod.hativa"
  },
  {
    $lookup: {
      from: "ogdas",
      localField: "gdod.hativa.ogda",
      foreignField: "_id",
      as: "gdod.hativa.ogda",
    }
  },
  {
    $unwind: "$gdod.hativa.ogda"
  },
  {
    $lookup: {
      from: "pikods",
      localField: "gdod.hativa.ogda.pikod",
      foreignField: "_id",
      as: "gdod.hativa.ogda.pikod",
    }
  },
  {
    $unwind: "$gdod.hativa.ogda.pikod"
  },
];

exports.read = async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (!car) {
    res.status(500).json({ message: 'הרכב לא נמצא' })
  } else {
    res.status(200).send([car])
  }

}

exports.find = (req, res) => {
  Car.find()
    .then((car) => res.json(car))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.create = (req, res) => {
  const car = new Car(req.body);
  car.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  Car.deleteOne({ _id: req.params.id })
    .then((car) => res.json(car))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.update = (req, res) => {
  Car.findByIdAndUpdate(req.params.id, req.body.tempcardata, { new: true }, function (err, result) {
    if (err) {
      console.log(err);
    }

    res.send('הפלוגה עודכנה בהצלחה')
  });
}


exports.carbyid = async (req, res) => {
  let carfindquerry = readcar.slice();
  let finalquerry = carfindquerry;

  let matchquerry = {
    "$match": {
      "_id": (req.params.carid)
    }
  };
  finalquerry.push(matchquerry)

  // console.log(matchquerry)
  // console.log(andquery)
  // console.log(finalquerry)

  Car.aggregate(finalquerry)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(400).json('Error: ' + error);
    });
};

exports.allcarsdata = async (req, res) => {
  let carfindquerry = readcar.slice();
  let finalquerry = carfindquerry;

  Car.aggregate(finalquerry)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(400).json('Error: ' + error);
    });
};

exports.carsbymkat = (req, res) => {
  Car.find({ mkat: req.params.mkatid })
    .then((car) => res.json(car))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.smartcars = async (req, res) => {
  let carfindquerry = readcar.slice();
  let finalquerry = carfindquerry;

  let andquery = [];
  //units
  if (req.params.pikodid != 'undefined') {
    andquery.push({ "gdod.hativa.ogda.pikod._id": req.params.pikodid });
  }
  if (req.params.ogdaid != 'undefined') {
    andquery.push({ "gdod.hativa.ogda._id": req.params.ogdaid });
  }
  if (req.params.hativaid != 'undefined') {
    andquery.push({ "gdod.hativa._id": req.params.hativaid });
  }
  if (req.params.gdodid != 'undefined') {
    andquery.push({ "gdod._id": req.params.gdodid });
  }
  //mkat->magadal
  if (req.params.magadalid != 'undefined') {
    andquery.push({ "mkat.mkabaz.magad.magadal._id": req.params.magadalid });
  }
  if (req.params.magadid != 'undefined') {
    andquery.push({ "mkat.mkabaz.magad._id": req.params.magadid });
  }
  if (req.params.mkabazid != 'undefined') {
    andquery.push({ "mkat.mkabaz._id": req.params.mkabazid });
  }
  if (req.params.mkatid != 'undefined') {
    andquery.push({ "mkat._id": req.params.mkatid });
  }
  //car number
  if (req.params.carid != 'undefined') {
    andquery.push({ "_id": req.params.carid });
  }

  if (andquery.length != 0) {
    let matchquerry = {

      "$match": {
        "$and": andquery
      }
    };
    finalquerry.push(matchquerry)
  }

  // console.log(matchquerry)
  // console.log(andquery)

  Car.aggregate(finalquerry)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(400).json('Error: ' + error);
    });
};

exports.smartcars2 = async (req, res) => {
  let carfindquerry = readcar.slice();
  let finalquerry = carfindquerry;

  let andquery = [];
  //units
  if ((req.body.pikodid)&&(req.body.pikodid.length>0)&&(req.body.ogdaid.length==0)) {
    let pikodinnerquery = [];
    for(let i=0;i<req.body.pikodid.length;i++)
    pikodinnerquery.push({ "gdod.hativa.ogda.pikod._id": req.body.pikodid[i] });

    andquery.push({
      "$or": pikodinnerquery
    });
    console.log(pikodinnerquery)
  }
  if ((req.body.ogdaid)&&(req.body.ogdaid.length>0)&&(req.body.hativaid.length==0)) {
    let ogdainnerquery = [];
    for(let i=0;i<req.body.ogdaid.length;i++)
    ogdainnerquery.push({ "gdod.hativa.ogda._id": req.body.ogdaid[i] });

    andquery.push({
      "$or": ogdainnerquery
    });
    console.log(ogdainnerquery)
  }
  if ((req.body.hativaid)&&(req.body.hativaid.length>0)&&(req.body.gdodid.length==0)) {
    let hativainnerquery = [];
    for(let i=0;i<req.body.hativaid.length;i++)
    hativainnerquery.push({ "gdod.hativa._id": req.body.hativaid[i] });

    andquery.push({
      "$or": hativainnerquery
    });
    console.log(hativainnerquery)
  }
  if ((req.body.gdodid)&&(req.body.gdodid.length>0)) {
    let gdodinnerquery = [];
    for(let i=0;i<req.body.gdodid.length;i++)
    gdodinnerquery.push({ "gdod._id": req.body.gdodid[i] });

    andquery.push({
      "$or": gdodinnerquery
    });
    console.log(gdodinnerquery)
  }
  //car->magadal
  if ((req.body.magadalid)&&(req.body.magadalid.length>0)&&(req.body.magadid.length==0)) {
    let magadalinnerquery = [];
    for(let i=0;i<req.body.magadalid.length;i++)
    magadalinnerquery.push({ "mkat.mkabaz.magad.magadal._id": req.body.magadalid[i] });

    andquery.push({
      "$or": magadalinnerquery
    });
    console.log(magadalinnerquery)
  }
  if ((req.body.magadid)&&(req.body.magadid.length>0)&&(req.body.mkabazid.length==0)) {
    let magadinnerquery = [];
    for(let i=0;i<req.body.magadid.length;i++)
    magadinnerquery.push({ "mkat.mkabaz.magad._id": req.body.magadid[i] });

    andquery.push({
      "$or": magadinnerquery
    });
    console.log(magadinnerquery)
  }
  if ((req.body.mkabazid)&&(req.body.mkabazid.length>0)&&(req.body.mkatid.length==0)) {
    let mkabazinnerquery = [];
    for(let i=0;i<req.body.mkabazid.length;i++)
    mkabazinnerquery.push({ "mkat.mkabaz._id": req.body.mkabazid[i] });

    andquery.push({
      "$or": mkabazinnerquery
    });
    console.log(mkabazinnerquery)
  }
  if ((req.body.mkatid)&&(req.body.mkatid.length>0)&&(req.body.carid.length==0)) {
    let mkatinnerquery = [];
    for(let i=0;i<req.body.mkatid.length;i++)
    mkatinnerquery.push({ "mkat._id": req.body.mkatid[i] });

    andquery.push({
      "$or": mkatinnerquery
    });
    console.log(mkatinnerquery)
  }
  if ((req.body.carid)&&(req.body.carid.length>0)) {
    let carinnerquery = [];
    for(let i=0;i<req.body.carid.length;i++)
    carinnerquery.push({ "_id": req.body.carid[i] });

    andquery.push({
      "$or": carinnerquery
    });
    console.log(carinnerquery)
  }

  if (andquery.length != 0) {
    let matchquerry = {

      "$match": {
        "$and": andquery
      }
    };
    finalquerry.push(matchquerry)
  }

  // console.log(matchquerry)
  // console.log(andquery)

  Car.aggregate(finalquerry)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(400).json('Error: ' + error);
    });
};