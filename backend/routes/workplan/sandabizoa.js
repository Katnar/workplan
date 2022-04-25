const express = require('express');
const router = express.Router()


const {create, find, read, remove,update} = require("../../controllers/workplan/sadnabizoa")

router.post('/sadnabizoa', create);

router.get('/sadnabizoa', find);

router.get('/sadnabizoa/:id', read);

router.post('/sadnabizoa/:id', update)

router.delete('/sadnabizoa/remove/:id', remove);

module.exports = router