const User = require('../models/User');
const Product = require('../models/Product');
const auth = require('../auth');
const bcrypt = require('bcrypt');


module.exports.registerUser = (reqBody) => {
	let newUser = new User({
		firstName: reqBody.firstName,
		lastName: reqBody.lastName,
		address: reqBody.address,
		mobileNo: reqBody.mobileNo,
		email: reqBody.email,
		password: bcrypt.hashSync(reqBody.password, 10),
	})

	return newUser.save().then((user, error) => {
		if (error) {
			console.log(error);	// to be removed
			return false;
		}
		else {
			console.log("User has been successfully created!");	// to be removed
			return true;
		}
	})
}

module.exports.loginUser = (reqBody) => {
	return User.findOne( { email: reqBody.email } ).then(result => {
		if (result == null) {
			console.log("Error! User does not exist!");	// to be removed
			return false;
		}
		else {
			const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password);

			if (isPasswordCorrect) {
				console.log("User has successfully logged in.");	// to be removed
				return { accessToken: auth.createAccessToken(result.toObject()) };
			}
			else {
				console.log("Error! Password does not match!");	// to be removed
				return false;
			}
		}
	})
}

module.exports.checkUserDuplicate = (reqBody) => {
	return User.find( { email: reqBody.email } ).then(result => {
		if (result.length > 0) {
			console.log("Error! User already exists!");	// to be removed
			return true;
		}
		else {
			console.log("User has no duplicates.");	// to be removed
			return false;
		}
	})
}

module.exports.userDetails = (data) => {
	return User.findById( data.userId ).then(result => {
		result.password = "";
		return result;
	})
}

module.exports.userOrders = (reqParams) => {
	return User.findById(reqParams.userId).then((result, error) => {
		if (error) {
			console.log("Error! Cannot get user's orders!");	// to be removed
			return false;
		}
		else {
			console.log("Retrieved user's orders successfully.");	// to be removed
			return result.orderList;
		}
	})
}

module.exports.userCheckout = async (data) => {
	let isUserUpdated = await User.findById(data.userId).then(user => {
		user.orderList.push( { productId: data.productId } )

		return user.save().then((user, error) => {
			if (error) {
				console.log("Error! Product was not ordered successfully by the user!");	// to be removed
				return false;
			}
			else {
				console.log("User has successfully ordered a product.");	// to be removed
				return true;
			}
		})
	})

	let isProductUpdated = await Product.findById(data.productId).then(product => {
		product.orderedBy.push( { userId: data.userId } )

		return product.save().then((product, error) => {
			if (error) {
				console.log("Error! User was not able to order the product!");	// to be removed
				return false;
			}
			else {
				console.log("Product was ordered by the user.");	// to be removed
				return true;
			}
		})
	})

	if (isUserUpdated && isProductUpdated) {
		console.log("User and product documents have been successfully updated!");	// to be removed
		return true;
	}
	else {
		console.log("User and product documents update failed!");	// to be removed
		return false;
	}
}