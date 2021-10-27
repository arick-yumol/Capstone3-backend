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

