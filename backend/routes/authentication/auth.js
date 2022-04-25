const express = require('express');
const router = express.Router()


const {signup, signin, signout, requireSignin} = require("../../controllers/authentication/auth")

router.post('/signup', signup);
router.post('/signin',  signin);
router.get('/signout',  signout);

 


module.exports = router