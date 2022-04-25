const express = require('express');
const router = express.Router()

const { create, find, update, remove, read} = require('../../controllers/kshirot/matag');

// find spec matag
router.get('/matag/:id', read);
router.get('/matag', find)
//add matag
router.post('/matag',create); /**/ 
//update matag
router.post('/matag/update', update)
//delete matag
router.post('/matag/remove/:id', remove )


module.exports = router;