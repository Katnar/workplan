const Tipultype = require("../../models/workplan/tipultype");

exports.read = async (req, res) => {
  const tipultype = await Tipultype.findById(req.params.id);
  if (!tipultype) {
    res.status(500).json({ message: 'סוג הטיפול לא נמצא' })
  } else {
    res.status(200).send([car])
  }

}

exports.find = (req, res) => {
  Tipultype.find()
    .then((tipultype) => res.json(tipultype))
    .catch((tipultype) => res.status(400).json("Error: " + err));
};

exports.create = (req, res) => {
  const tipultype = new Tipultype(req.body);
  tipultype.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  Tipultype.deleteOne({ _id: req.params.id })
    .then((tipultype) => res.json(tipultype))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.update = (req, res) => {
  Tipultype.updateOne({ _id: req.body[0] }, req.body[1])
    .then(tipultype => res.json(tipultype))
    .catch(err => res.status(400).json('Error: ' + err));;
}