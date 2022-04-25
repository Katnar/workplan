const Mashakshirotpikod = require("../../../models/kshirot/masha/mashakshirotpikod");


exports.read = async(req, res) => {
  const mashakshirotpikod = await Mashakshirotpikod.findById(req.params.id);
  if(!mashakshirotpikod) {
      res.status(500).json({message:'הפיקוד לא נמצא'})
  } else {
    res.status(200).send([mashakshirotpikod])
  }

}

exports.find = (req, res) => {
    Mashakshirotpikod.find()
    .then((mashakshirotpikod) => res.json(mashakshirotpikod))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.create = (req, res) => {
  const mashakshirotpikod = new Mashakshirotpikod(req.body);
  mashakshirotpikod.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};
exports.update = (req, res) => {
  const mashakshirotpikod = new Mashakshirotpikod(req.body);
  Mashakshirotpikod.updateOne(mashakshirotpikod)
    .then((mashakshirotpikod) => res.json(mashakshirotpikod))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.remove = (req, res) => {
  Mashakshirotpikod.deleteOne({ _id: req.params.kshirotId })
    .then((mashakshirotpikod) => res.json(mashakshirotpikod))
    .catch((err) => res.status(400).json("Error: " + err));
 }
 

exports.updatekshirot = (req, res) => {
  Mashakshirotpikod.updateOne({_id: req.body[0]},req.body[1])
  .then(mashakshirotpikod => res.json(mashakshirotpikod))
  .catch(err => res.status(400).json('Error: ' + err));;
}