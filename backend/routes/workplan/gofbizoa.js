const express = require('express');
const router = express.Router()


const {create, find, read, remove,update} = require("../../controllers/workplan/gofbizoa")

router.post('/gofbizoa', create);

router.get('/gofbizoa', find);

router.get('/gofbizoa/:id', read);

router.post('/gofbizoa/update', update)

router.post('/gofbizoa/remove/:id', remove);

module.exports = router