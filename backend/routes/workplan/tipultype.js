const express = require('express');
const router = express.Router()


const {create, find, read, remove,update} = require("../../controllers/workplan/tipultype")

router.post('/tipultype', create);

router.get('/tipultype', find);

router.get('/tipultype/:id', read);

router.post('/tipultype/update', update)

router.post('/tipultype/remove/:id', remove);

module.exports = router