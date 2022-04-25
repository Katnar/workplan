const express = require('express');
const router = express.Router()


const {create, find, read, remove,update,
    smarttipuls,smarttipulsbydates,tipulbyid,smarttipuls2,smarttipulsbydates2
    ,smarttipuls3,smarttipulsbydates3} = require("../../controllers/workplan/tipul")

router.post('/tipul', create);

router.get('/tipuls', find);

router.get('/tipul/:id', read);

router.post('/tipul/update', update)

router.post('/tipul/remove/:id', remove);

router.get('/smarttipuls/:pikodid/:ogdaid/:hativaid/:gdodid/:magadalid/:magadid/:mkabazid/:mkatid/:carid/:gofbizoaid/:statusid/:tipultypeid/:zkaottipulid', smarttipuls);
router.get('/smarttipulsbydates/:pikodid/:ogdaid/:hativaid/:gdodid/:magadalid/:magadid/:mkabazid/:mkatid/:carid/:gofbizoaid/:statusid/:tipultypeid/:zkaottipulid/:startdate/:enddate', smarttipulsbydates);

router.get('/tipulbyid/:tipulid', tipulbyid);

router.post('/smarttipuls2', smarttipuls2);
router.post('/smarttipulsbydates2', smarttipulsbydates2);

router.post('/smarttipuls3', smarttipuls3);
router.post('/smarttipulsbydates3', smarttipulsbydates3);

module.exports = router