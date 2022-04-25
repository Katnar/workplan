const express = require('express');
const router = express.Router()


const {create, find, read, remove, update} = require("../../controllers/workplan/zmplanlog")

router.post('/zmplanlog', create);

router.get('/zmplanlogs', find);

router.get('/zmplanlog/:id', read);

router.post('/zmplanlog/update/:id', update)

router.post('/zmplanlog/remove/:id', remove);

module.exports = router