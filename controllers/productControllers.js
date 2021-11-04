const Product = require('../models/Product');


module.exports.addProduct = (reqBody) => {
	if (reqBody.isAdmin) {
		let newProduct = new Product({
			name: reqBody.product.name,
			description: reqBody.product.description,
			price: reqBody.product.price
		})

		return newProduct.save().then((result, error) => {
			if (error) {
				console.log("Error! Product not added successfully!");	// to be removed
				return false;
			}
			else {
				console.log("Product is successfully added.");	// to be removed
				return true;
			}
		})
	}
	else {
		console.log("Error! User is not and admin!");	// to be removed
		return false;
	}
}

module.exports.getAllProducts = () => {
	return Product.find( {} ).then((result, error) => {
		if (error) {
			console.log("Error! Cannot get all products!");	// to be removed
			return false;
		}
		else {
			console.log("All products have been successfully retrieved.");	// to be removed
			return result;
		}
	})
}

module.exports.getAllActiveProducts = () => {
	return Product.find( { onStock: true } ).then((result, error) => {
		if (error) {
			console.log("Error! Cannot get all active products!");	// to be removed
			return false;
		}
		else {
			console.log("Active products have been successfully retrieved.");	// to be removed
			return result;
		}
	})
}

module.exports.getSpecificProduct = (reqParams) => {
	return Product.findById(reqParams.productId).then((result, error) => {
		if (error) {
			console.log("Error! Cannot get specific product!");	// to be removed
			return false;
		}
		else {
			console.log("Product has been successfully retrieved.");	// to be removed
			return result;
		}
	})
}

module.exports.updateProduct = (reqParams, reqBody) => {
	let updatedProduct = {
		name: reqBody.name,
		description: reqBody.description,
		price: reqBody.price
	}

	return Product.findByIdAndUpdate(reqParams.productId, updatedProduct).then((result, error) => {
		if (error) {
			console.log("Error! Cannot update product information!");	// to be removed
			return false;
		}
		else {
			console.log("Product information has been successfully updated.");	// to be removed
			return true;
		}
	})
}

module.exports.archiveProduct = (reqParams) => {
	let updatedProduct = {
		onStock: false
	}

	return Product.findByIdAndUpdate(reqParams.productId, updatedProduct).then((result, error) => {
		if (error) {
			console.log("Error! Cannot update product availability!");	// to be removed
			return false;
		}
		else {
			console.log("Product availability was successfully updated.");	// to be removed
			return true;
		}
	})
}

module.exports.unarchiveProduct = (reqParams) => {
	let updatedProduct = {
		onStock: true
	}

	return Product.findByIdAndUpdate(reqParams.productId, updatedProduct).then((result, error) => {
		if (error) {
			console.log("Error! Cannot update product availability!");	// to be removed
			return false;
		}
		else {
			console.log("Product availability was successfully updated.");	// to be removed
			return true;
		}
	})
}


/*
module.exports.addProduct = (reqBody) => {
	if (reqBody.isAdmin) {
		let newProduct = new Product({
			name: reqBody.product.name,
			description: reqBody.product.description,
			price: reqBody.product.price
		})

		return newProduct.save().then((result, error) => {
			return (error) ? false : true
		})
	}
	else {
		return false;
	}
}

module.exports.getAllProducts = () => {
	return Product.find( {} ).then((result, error) => {
		return (error) ? false : result
	})
}

module.exports.getAllActiveProducts = () => {
	return Product.find( { onStock: true } ).then((result, error) => {
		return (error) ? false : result
	})
}

module.exports.getSpecificProduct = (reqParams) => {
	return Product.findById(reqParams.productId).then((result, error) => {
		return (error) ? false : result
	})
}

module.exports.updateProduct = (reqParams, reqBody) => {
	let updatedProduct = {
		name: reqBody.name,
		description: reqBody.description,
		price: reqBody.price
	}

	return Product.findByIdAndUpdate(reqParams.productId, updatedProduct).then((result, error) => {
		return (error) ? false : true
	})
}

module.exports.archiveProduct = (reqParams) => {
	let productStatus = { onStock: false }

	return Product.findByIdAndUpdate(reqParams.productId, productStatus).then((result, error) => {
		return (error) ? false : true
	})
}

module.exports.unarchiveProduct = (reqParams) => {
	let productStatus = { onStock: true }

	return Product.findByIdAndUpdate(reqParams.productId, productStatus).then((result, error) => {
		return (error) ? false : true
	})
}*/