const express = require('express');
const router = express.Router()

const { create, find, update, remove, findById,findgdodbyid,updatehativa,updatekshirot,updatehistory,updatetraining,updatetraininghistory,updateallhistoryarray,updatealltraininghistoryarray,gdodsbyhativaid} = require('../../controllers/general/gdod');

// find spec 
router.get('/gdod/:id', findById)
router.get('/gdod', find)
//add 
router.post('/gdod',create); /**/ 
//update 
router.put('/gdod/:gdodId', update)
//delete 
router.delete('/gdod/:id', remove )

router.post('/gdod/gdodbyid',findgdodbyid);

router.post('/gdod/updatehativa',updatehativa);

router.post('/gdod/updatekshirot',updatekshirot);

router.post('/gdod/updatehistory',updatehistory);

router.post('/gdod/updateallhistoryarray',updateallhistoryarray);//for deleting

router.post('/gdod/updatealltraininghistoryarray',updatealltraininghistoryarray);//for deleting

router.post('/gdod/updatetraining',updatetraining);

router.post('/gdod/updatetraininghistory',updatetraininghistory);

router.post('/gdod/gdodsbyhativaid',gdodsbyhativaid);

module.exports = router;