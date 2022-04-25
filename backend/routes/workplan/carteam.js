const express = require('express');
const router = express.Router()


const {create, find, read, remove,update} = require("../../controllers/workplan/carteam")

router.post('/carteam', create);

router.get('/carteam', find);

router.get('/carteam/:id', read);

router.post('/carteam/:id', update)

router.delete('/carteam/remove/:id', remove);

module.exports = router