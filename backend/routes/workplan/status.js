const express = require('express');
const router = express.Router()


const {create, find, read, remove,update} = require("../../controllers/workplan/status")

router.post('/status', create);

router.get('/status', find);

router.get('/status/:id', read);

router.post('/status/update', update)

router.post('/status/remove/:id', remove);

module.exports = router