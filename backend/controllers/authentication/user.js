const User = require('../../models/authentication/user');


 exports.getuserbyid = (req, res) => {
  //  console.log(req.body.userid); //prints userid
    User.findById(req.body.userid).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'משתמש לא נמצא'
            })
        }
        else
        {
            res.send(user)
        }
    })
}

exports.find = (req, res) => {
    User.find().sort({ updatedAt: 'descending' })
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json('Error: ' + err));
}
exports.update = async(req, res) => {
    
    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            lastname:  req.body.lastname,
            personalnumber:  req.body.personalnumber,
            password:  req.body.password,
            validated:  req.body.validated,
            gdodid:  req.body.gdodid,
            hativaid:  req.body.hativaid,
            ogdaid:  req.body.ogdaid,
            pikodid:  req.body.pikodid,
            zminot: req.body.zminot,
            adam: req.body.adam,
            workplan: req.body.workplan,
            kshirot: req.body.kshirot
        },
        {new: true}
        )
        if(!user) {
            res.status(404).send({message:'גדוד הביצוע לא יכולה להיווצר'})
        } 
        res.status(200).send(user)
    

}
// exports.update = (req, res) => {
//     //console.log(req.body); //prints {...}
//   //  console.log(req.params); //prints { id: '608e42b1cedc2a3a18492ae5' }
//     const user = new User(req.body)
//     User.updateOne({_id: req.params.id},user)
//     .then(orders => res.json(orders))
//     .catch(err => res.status(400).json('Error: ' + err));;
// }

exports.remove = (req, res) => {
    console.log(req.body); //prints {}
    console.log(req.params); //prints { userId: '608e42b1cedc2a3a18492ae5' }
    User.deleteOne({_id:req.params.userId})    
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err));;
}

exports.findvalidated = (req, res) => {
    User.find({validated: true}).sort({ updatedAt: 'descending' })
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.findnotvalidated = (req, res) => {
    User.find({validated: false}).sort({ updatedAt: 'descending' })
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json('Error: ' + err));
}

