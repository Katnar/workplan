const express = require('express');
const router = express.Router()


const {create, find, read, remove, update} = require("../../controllers/workplan/zshigra")

router.post('/zshigra', create);

router.get('/zshigras', find);

router.get('/zshigra/:id', read);

router.post('/zshigra/update/:id', update)

router.post('/zshigra/remove/:id', remove);

module.exports = router