const Status = require("../../models/workplan/status");

exports.read = async (req, res) => {
  const tipulstatus = await Status.findById(req.params.id);
  if (!tipulstatus) {
    res.status(500).json({ message: 'סוג הטיפול לא נמצא' })
  } else {
    res.status(200).send([car])
  }

}

exports.find = (req, res) => {
  
  Status.find()
    .then((tipulstatus) => res.json(tipulstatus))
    .catch((tipulstatus) => res.status(400).json("Error: " + err));
};

exports.create = (req, res) => {
  const tipulstatus = new Status(req.body);
  tipulstatus.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  Status.deleteOne({ _id: req.params.id })
    .then((tipulstatus) => res.json(tipulstatus))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.update = (req, res) => {
  Status.updateOne({ _id: req.body[0] }, req.body[1])
    .then(tipulstatus => res.json(tipulstatus))
    .catch(err => res.status(400).json('Error: ' + err));;
}