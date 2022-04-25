const Kshirot = require("../../models/kshirot/kshirot");

/*exports.findById = (req, res, next, id) => {
    Kshirot.findById(id).exec((err, kshirot) => {
    if (err || !kshirot) {
      return res.status(400).json({
        error: "הפריט לא נמצא",
      });
    }
    req.kshirot = kshirot;
    next();
  });
};*/

exports.read = async(req, res) => {
  const kshirot = await Kshirot.findById(req.params.id);
  if(!kshirot) {
      res.status(500).json({message:'הפיקוד לא נמצא'})
  } else {
    res.status(200).send([kshirot])
  }

}

exports.find = (req, res) => {
    Kshirot.find()
    .then((kshirot) => res.json(kshirot))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.create = (req, res) => {
  const kshirot = new Kshirot(req.body);
  kshirot.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};
exports.update = (req, res) => {
  const kshirot = new Kshirot(req.body);
  Kshirot.updateOne(kshirot)
    .then((kshirot) => res.json(kshirot))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.remove = (req, res) => {
  Kshirot.deleteOne({ _id: req.params.kshirotId })
    .then((orders) => res.json(orders))
    .catch((err) => res.status(400).json("Error: " + err));
 }
 

exports.updatekshirot = (req, res) => {
  Kshirot.updateOne({_id: req.body[0]},req.body[1])
  .then(orders => res.json(orders))
  .catch(err => res.status(400).json('Error: ' + err));;
}