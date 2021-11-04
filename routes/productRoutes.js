const express = require('express');
const router = express.Router();
const productController = require('../controllers/productControllers');
const auth = require('../auth');


router.post('/add', auth.verify, (req, res) => {
	const data = {
		product: req.body,
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	if (data.isAdmin) {
		productController.addProduct(data).then(result => res.send(result));
	}
	else {
		console.log("Error! User is not an admin!");	// to be removed
		res.send(false);
	}
})

router.get('/all', (req, res) => {
	productController.getAllProducts().then(result => res.send(result));
})

router.get('/active', (req, res) => {
	productController.getAllActiveProducts().then(result => res.send(result));
})

router.get('/:productId', (req, res) => {
	productController.getSpecificProduct(req.params).then(result => res.send(result));
})

router.put('/:productId/update', auth.verify, (req, res) => {
	const data = {
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	if (data.isAdmin) {
		productController.updateProduct(req.params, req.body).then(result => res.send(result));
	}
	else {
		console.log("Error! User is not an admin!");	// to be removed
		res.send(false);
	}
})

router.put('/:productId/archive', auth.verify, (req, res) => {
	const data = {
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	if (data.isAdmin) {
		productController.archiveProduct(req.params).then(result => res.send(result));
	}
	else {
		console.log("Error! User is not an admin!");	// to be removed
		res.send(false);
	}
})

router.put('/:productId/unarchive', auth.verify, (req, res) => {
	const data = {
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	if (data.isAdmin) {
		productController.unarchiveProduct(req.params).then(result => res.send(result));
	}
	else {
		console.log("Error! User is not an admin!");	// to be removed
		res.send(false);
	}
})

module.exports = router;