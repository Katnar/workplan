const Training = require("../../models/kshirot/training");

exports.read = async(req, res) => {
  const training = await Training.findById(req.params.id);
  if(!training) {
      res.status(500).json({message:'האימון לא נמצא'})
  } else {
    res.status(200).send([training])
  }

}

exports.find = (req, res) => {
  Training.find()
    .then((training) => res.json(training))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.create = (req, res) => {
  const training = new Training(req.body);
  training.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};
exports.update = (req, res) => {
  Training.updateOne({_id: req.body[0]},req.body[1])
  .then(orders => res.json(orders))
  .catch(err => res.status(400).json('Error: ' + err));;
}

exports.remove = (req, res) => {
  Training.deleteOne({ _id: req.params.trainingId })
    .then((training) => res.json(training))
    .catch((err) => res.status(400).json("Error: " + err));
};


