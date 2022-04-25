const express = require('express');
const router = express.Router()


const {create, find, read, remove,update} = require("../../controllers/workplan/gdodbizoa")

router.post('/gdodbizoa', create);

router.get('/gdodbizoa', find);

router.get('/gdodbizoa/:id', read);

router.post('/gdodbizoa/:id', update)

router.delete('/gdodbizoa/remove/:id', remove);

module.exports = router