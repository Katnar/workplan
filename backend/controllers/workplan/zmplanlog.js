const Zmplanlog = require("../../models/workplan/zmplanlog");

exports.read = async (req, res) => {
  const zmplanlog = await Zmplanlog.findById(req.params.id);
  if (!zmplanlog) {
    res.status(500).json({ message: 'האימון לא נמצא' })
  } else {
    res.status(200).send([zmplanlog])
  }

}

exports.find = (req, res) => {
  Zmplanlog.find()
    .then((zmplanlog) => res.json(zmplanlog))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.create = (req, res) => {
  const zmplanlog = new Zmplanlog(req.body);
  zmplanlog.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  Zmplanlog.deleteOne({ _id: req.params.id })
    .then((zmplanlog) => res.json(zmplanlog))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.update = (req, res) => {
  Zmplanlog.updateOne({ _id: req.body[0] }, req.body[1])
    .then(zmplanlog => res.json(zmplanlog))
    .catch(err => res.status(400).json('Error: ' + err));;
}
