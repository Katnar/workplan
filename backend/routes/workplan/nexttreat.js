const express = require('express');
const router = express.Router()


const {create, find, read, remove, update} = require("../../controllers/workplan/nexttreat")

router.post('/nexttreat', create);

router.get('/nexttreats', find);

router.get('/nexttreat/:id', read);

router.post('/nexttreat/update/:id', update)

router.post('/nexttreat/remove/:id', remove);

module.exports = router