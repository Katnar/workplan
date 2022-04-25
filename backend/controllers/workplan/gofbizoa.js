const Gofbizoa = require("../../models/workplan/gofbizoa");

exports.read = async (req, res) => {
  const gofbizoa = await Gofbizoa.findById(req.params.id);
  if (!gofbizoa) {
    res.status(500).json({ message: 'כוף הביצוע לא נמצא' })
  } else {
    res.status(200).send([car])
  }

}

exports.find = (req, res) => {
  Gofbizoa.find()
    .then((gofbizoa) => res.json(gofbizoa))
    .catch((gofbizoa) => res.status(400).json("Error: " + err));
};

exports.create = (req, res) => {
  const gofbizoa = new Gofbizoa(req.body);
  gofbizoa.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  Gofbizoa.deleteOne({ _id: req.params.id })
    .then((gofbizoa) => res.json(gofbizoa))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.update = (req, res) => {
  Gofbizoa.updateOne({ _id: req.body[0] }, req.body[1])
    .then(gofbizoa => res.json(gofbizoa))
    .catch(err => res.status(400).json('Error: ' + err));;
}