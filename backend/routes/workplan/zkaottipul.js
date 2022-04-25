const express = require('express');
const router = express.Router()


const {create, find, read, remove,update} = require("../../controllers/workplan/zkaottipul")

router.post('/zkaottipul', create);

router.get('/zkaottipul', find);

router.get('/zkaottipul/:id', read);

router.post('/zkaottipul/update', update)

router.post('/zkaottipul/remove/:id', remove);

module.exports = router