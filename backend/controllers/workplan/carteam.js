const CarTeam = require("../../models/workplan/carteam");

exports.read = async (req, res) => {
  const carteam = await CarTeam.findById(req.params.id);
  if (!carteam) {
    res.status(500).json({ message: 'משפחת הרכבים לא נמצאה' })
  } else {
    res.status(200).send([carteam])
  }

}

exports.find = (req, res) => {
  CarTeam.find()
    .then((carteam) => res.json(carteam))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.create = (req, res) => {
  const carteam = new CarTeam(req.body);
  carteam.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  CarTeam.deleteOne({ _id: req.params.id })
    .then((carteam) => res.json(carteam))
    .catch((err) => res.status(400).json("Error: " + err));
};


exports.update = async(req, res) => {
  const carteam = await CarTeam.findByIdAndUpdate(
      req.params.id,
      {
          name:req.body.name,
      },
      {new: true}
      )
      if(!carteam) {
          res.status(404).send({message:'סדנאת הביצוע לא יכולה להיווצר'})
      } 
      res.status(200).send(carteam)
  

}

