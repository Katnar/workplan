const express = require('express');
const router = express.Router()

const { create, find, update, remove, findById,read,updatekshirot} = require('../../controllers/kshirot/kshirot');

// find spec 
router.get('/kshirot/:id', read);

router.get('/kshirot', find);
//add 
router.post('/kshirot',create); /**/ 
//update 
router.put('/kshirot/:kshirotId', update)
//delete 
router.post('/kshirot/remove/:kshirotId', remove )

router.post('/kshirot/updatekshirot',updatekshirot);

module.exports = router;