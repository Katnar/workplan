const express = require('express');
const router = express.Router()


const {create, find, read, remove,update,mkatsbymkabaz} = require("../../controllers/workplan/mkat")

router.post('/mkat', create);

router.get('/mkats', find);

router.get('/mkat/:id', read);

router.post('/mkat/update', update)

router.post('/mkat/remove/:id', remove);

router.get('/mkatsbymkabaz/:mkabazid', mkatsbymkabaz);

module.exports = router