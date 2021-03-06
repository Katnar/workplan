const express = require('express');
const router = express.Router()


const {create, find, read, remove,update,magadsbymagadal} = require("../../controllers/workplan/magad")

router.post('/magad', create);

router.get('/magad', find);

router.get('/magad/:id', read);

router.post('/magad/update', update)

router.post('/magad/remove/:id', remove);

router.get('/magadsbymagadal/:magadalid', magadsbymagadal);

module.exports = router