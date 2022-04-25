const Zshigra = require("../../models/workplan/zshigra");

exports.read = async (req, res) => {
  const zshigra = await Zshigra.findById(req.params.id);
  if (!zshigra) {
    res.status(500).json({ message: 'האימון לא נמצא' })
  } else {
    res.status(200).send([zshigra])
  }

}

exports.find = (req, res) => {
  Zshigra.find()
    .then((zshigra) => res.json(zshigra))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.create = (req, res) => {
  const zshigra = new Zshigra(req.body);
  zshigra.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  Zshigra.deleteOne({ _id: req.params.id })
    .then((zshigra) => res.json(zshigra))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.update = (req, res) => {
  Zshigra.updateOne({ _id: req.body[0] }, req.body[1])
    .then(zshigra => res.json(zshigra))
    .catch(err => res.status(400).json('Error: ' + err));;
}
