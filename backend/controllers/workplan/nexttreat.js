const Nexttreat = require("../../models/workplan/nexttreat");

exports.read = async (req, res) => {
  const nexttreat = await Nexttreat.findById(req.params.id);
  if (!nexttreat) {
    res.status(500).json({ message: 'האימון לא נמצא' })
  } else {
    res.status(200).send([Nexttreat])
  }

}

exports.find = (req, res) => {
  Nexttreat.find()
    .then((nexttreat) => res.json(nexttreat))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.create = (req, res) => {
  const nexttreat = new Nexttreat(req.body);
  nexttreat.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  Nexttreat.deleteOne({ _id: req.params.id })
    .then((nexttreat) => res.json(nexttreat))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.update = (req, res) => {
  Nexttreat.updateOne({ _id: req.body[0] }, req.body[1])
    .then(nexttreat => res.json(nexttreat))
    .catch(err => res.status(400).json('Error: ' + err));;
}
