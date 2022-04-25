const express = require('express');
const router = express.Router()


const {create, find, read, remove,update,
    smarthistorytipuls,smarthistorytipulsbydates,historytipulbyid,historytipulbyoriginaltipulid
    ,smarthistorytipuls2,smarthistorytipulsbydates2} = require("../../controllers/workplan/historytipul")

router.post('/historytipul', create);

router.get('/historytipuls', find);

router.get('/historytipul/:id', read);

router.post('/historytipul/update', update)

router.post('/historytipul/remove/:id', remove);

router.get('/smarthistorytipuls/:pikodid/:ogdaid/:hativaid/:gdodid/:magadalid/:magadid/:mkabazid/:mkatid/:carid/:gofbizoaid/:statusid/:tipultypeid/:zkaottipulid', smarthistorytipuls);
router.get('/smarthistorytipulsbydates/:pikodid/:ogdaid/:hativaid/:gdodid/:magadalid/:magadid/:mkabazid/:mkatid/:carid/:gofbizoaid/:statusid/:tipultypeid/:zkaottipulid/:updatedAtstartdate/:updatedAtenddate', smarthistorytipulsbydates);

router.get('/historytipulbyid/:historytipulid', historytipulbyid);

router.get('/historytipulbyoriginaltipulid/:originaltipulid', historytipulbyoriginaltipulid);

router.post('/smarthistorytipuls2', smarthistorytipuls2);
router.post('/smarthistorytipulsbydates2', smarthistorytipulsbydates2);

module.exports = router