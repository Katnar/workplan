const express = require('express');
const router = express.Router()

const { create, find, update, remove, read} = require('../../controllers/kshirot/training');

// find spec emon
router.get('/training/:id', read);
router.get('/training', find)
//add emon
router.post('/training',create); /**/ 
//update emon
router.post('/training/update', update)
//delete emon
router.post('/training/remove/:trainingId', remove )


module.exports = router;