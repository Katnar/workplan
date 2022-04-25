const SadnaBizoa = require("../../models/workplan/sadnabizoa");

exports.read = async (req, res) => {
  const sadnabizoa = await SadnaBizoa.findById(req.params.id);
  if (!sadnabizoa) {
    res.status(500).json({ message: 'הסדנא לביצוע לא נמצאה' })
  } else {
    res.status(200).send([sadnabizoa])
  }

}

exports.find = (req, res) => {
  SadnaBizoa.find()
    .then((sadnabizoa) => res.json(sadnabizoa))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.create = (req, res) => {
  const sadnabizoa = new SadnaBizoa(req.body);
  sadnabizoa.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  SadnaBizoa.deleteOne({ _id: req.params.id })
    .then((sadnabizoa) => res.json(sadnabizoa))
    .catch((err) => res.status(400).json("Error: " + err));
};



exports.update = async(req, res) => {
  const sadnabizoa = await SadnaBizoa.findByIdAndUpdate(
      req.params.id,
      {
          name:req.body.name,
      },
      {new: true}
      )
      if(!sadnabizoa) {
          res.status(404).send({message:'סדנאת הביצוע לא יכולה להיווצר'})
      } 
      res.status(200).send(sadnabizoa)
  

}