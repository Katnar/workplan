const Matag = require("../../models/kshirot/matag");

exports.read = async(req, res) => {
  const matag = await Matag.findById(req.params.id);
  if(!matag) {
      res.status(500).json({message:'טופס לא נמצא'})
  } else {
    res.status(200).send([matag])
  }

}

exports.find = (req, res) => {
  Matag.find()
    .then((matag) => res.json(matag))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.create = (req, res) => {
  const matag = new Matag(req.body);
  matag.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};
exports.update = (req, res) => {
  Matag.updateOne({_id: req.body[0]},req.body[1])
  .then(orders => res.json(orders))
  .catch(err => res.status(400).json('Error: ' + err));;
}

exports.remove = (req, res) => {
  Matag.deleteOne({ _id: req.params.id })
    .then((matag) => res.json(matag))
    .catch((err) => res.status(400).json("Error: " + err));
};


