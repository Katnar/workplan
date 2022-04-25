const GdodBizoa = require("../../models/workplan/gdodbizoa");

exports.read = async (req, res) => {
  const gdodbizoa = await GdodBizoa.findById(req.params.id);
  if (!gdodbizoa) {
    res.status(500).json({ message: 'הגדוד לביצוע לא נמצא' })
  } else {
    res.status(200).send([gdodbizoa])
  }

}

exports.find = (req, res) => {
  GdodBizoa.find()
    .then((gdodbizoa) => res.json(gdodbizoa))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.create = (req, res) => {
  const gdodbizoa = new GdodBizoa(req.body);
  gdodbizoa.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  console.log(req.params)
  GdodBizoa.deleteOne({ _id: req.params.id })
    .then((gdodbizoa) => res.json(gdodbizoa))
    .catch((err) => res.status(400).json("Error: " + err));
};

// exports.update = (req, res) => {

//   GdodBizoa.updateOne({ _id: req.body[0] }, req.body[1])
//     .then(gdodbizoa => res.json(gdodbizoa))
//     .catch(err => res.status(400).json('Error: ' + err));;
// }

   exports.update = async(req, res) => {
    const gdodbizoa = await GdodBizoa.findByIdAndUpdate(
        req.params.id,
        {
            name:req.body.name,
        },
        {new: true}
        )
        if(!gdodbizoa) {
            res.status(404).send({message:'גדוד הביצוע לא יכולה להיווצר'})
        } 
        res.status(200).send(gdodbizoa)
    

}