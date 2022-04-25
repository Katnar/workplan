const express = require('express');
const router = express.Router()

const { create, find, update, remove,read,updatekshirot} = require('../../../controllers/kshirot/masha/mashakshirotpikod');

// find spec 
router.get('/mashakshirotpikod/:id', read);

router.get('/mashakshirotpikod', find);
//add 
router.post('/mashakshirotpikod',create); /**/ 
//update 
router.put('/mashakshirotpikod/:kshirotId', update)
//delete 
router.post('/mashakshirotpikod/remove/:kshirotId', remove )

router.post('/mashakshirotpikod/updatekshirot',updatekshirot);

module.exports = router;