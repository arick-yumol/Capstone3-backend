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

router.get('/:userId/orders', auth.verify, (req, res) => {
	let data = {
		userId: auth.decode(req.headers.authorization).id
	}

	if (data) {
		userController.userOrders(data).then(result => res.send(result));
	}
	else {
		console.log("Error! User not authenticated!");	// to be removed
		res.send(false);
	}
})

router.post('/checkout', auth.verify, (req, res) => {
	let data = {
		userId: auth.decode(req.headers.authorization).id,
		productId: req.body.productId
	}

	if (data) {
		userController.userCheckout(data).then(result => res.send(result));
	}
	else {
		console.log("Error! User not authenticated!");	// to be removed
		res.send(false);
	}
})

module.exports = router;