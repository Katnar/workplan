const Zkaottipul = require("../../models/workplan/zkaottipul");

exports.read = async (req, res) => {
  const zkaottipul = await Zkaottipul.findById(req.params.id);
  if (!zkaottipul) {
    res.status(500).json({ message: 'זכאות הטיפול לא נמצאה' })
  } else {
    res.status(200).send([car])
  }

}

exports.find = (req, res) => {
    Zkaottipul.find()
    .then((zkaottipul) => res.json(zkaottipul))
    .catch((zkaottipul) => res.status(400).json("Error: " + err));
};

exports.create = (req, res) => {
  const zkaottipul = new Zkaottipul(req.body);
  zkaottipul.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
    Zkaottipul.deleteOne({ _id: req.params.id })
    .then((zkaottipul) => res.json(zkaottipul))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.update = (req, res) => {
    Zkaottipul.updateOne({ _id: req.body[0] }, req.body[1])
    .then(zkaottipul => res.json(zkaottipul))
    .catch(err => res.status(400).json('Error: ' + err));;
}