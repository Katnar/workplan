const express = require('express');
const router = express.Router()


const {create, find, read, remove,update,
    smartactivetipuls,smartactivetipulsbydates,activetipulbyid,smartactivetipuls2,smartactivetipulsbydates2
    ,smartactivetipuls3,smartactivetipulsbydates3} = require("../../controllers/workplan/activetipul")

router.post('/activetipul', create);

router.get('/activetipuls', find);

router.get('/activetipul/:id', read);

router.post('/activetipul/update/:id', update)

router.post('/activetipul/remove/:id', remove);

router.get('/smartactivetipuls/:pikodid/:ogdaid/:hativaid/:gdodid/:magadalid/:magadid/:mkabazid/:mkatid/:carid/:gofbizoaid/:statusid/:tipultypeid/:zkaottipulid', smartactivetipuls);
router.get('/smartactivetipulsbydates/:pikodid/:ogdaid/:hativaid/:gdodid/:magadalid/:magadid/:mkabazid/:mkatid/:carid/:gofbizoaid/:statusid/:tipultypeid/:zkaottipulid/:startdate/:enddate', smartactivetipulsbydates);

router.get('/activetipulbyid/:activetipulid', activetipulbyid);

router.post('/smartactivetipuls2', smartactivetipuls2);
router.post('/smartactivetipulsbydates2', smartactivetipulsbydates2);

router.post('/smartactivetipuls3', smartactivetipuls3);
router.post('/smartactivetipulsbydates3', smartactivetipulsbydates3);

module.exports = router