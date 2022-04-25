const Mkat = require("../../models/workplan/mkat");

exports.read = async (req, res) => {
  const mkat = await Mkat.findById(req.params.id);
  if (!mkat) {
    res.status(500).json({ message: 'האימון לא נמצא' })
  } else {
    res.status(200).send([mkat])
  }

}

exports.find = (req, res) => {
  Mkat.find()
    .then((mkat) => res.json(mkat))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.create = (req, res) => {
  const mkat = new Mkat(req.body);
  mkat.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  Mkat.deleteOne({ _id: req.params.id })
    .then((mkat) => res.json(mkat))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.update = (req, res) => {
  Mkat.updateOne({ _id: req.body[0] }, req.body[1])
    .then(mkat => res.json(mkat))
    .catch(err => res.status(400).json('Error: ' + err));;
}

exports.mkatsbymkabaz = (req, res) => {
  Mkat.find({ mkabaz: req.params.mkabazid })
    .then((mkat) => res.json(mkat))
    .catch((err) => res.status(400).json("Error: " + err));
};