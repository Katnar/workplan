const express = require('express');
const router = express.Router()


const {create, find, read, remove, update, carbyid,allcarsdata,carsbymkat,smartcars,smartcars2} = require("../../controllers/workplan/car")

router.post('/car', create);

router.get('/cars', find);

router.get('/car/:id', read);

router.post('/car/update/:id', update)

router.post('/car/remove/:id', remove);

router.get('/carbyid/:carid', carbyid);

router.get('/allcarsdata', allcarsdata);

router.get('/carsbymkat/:mkatid', carsbymkat);

router.get('/smartcars/:pikodid/:ogdaid/:hativaid/:gdodid/:magadalid/:magadid/:mkabazid/:mkatid/:carid', smartcars);

router.post('/smartcars2', smartcars2);

module.exports = router