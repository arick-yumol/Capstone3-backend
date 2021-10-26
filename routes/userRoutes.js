const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const auth = require('../auth');


router.post('/register', (req, res) => {
	userController.registerUser(req.body).then(result => res.send(result));
})

router.post('/login', (req, res) => {
	userController.loginUser(req.body).then(result => res.send(result));
})

router.post('/duplicates', (req, res) => {
	userController.checkUserDuplicate(req.body).then(result => res.send(result));
})


module.exports = router;