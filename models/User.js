const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, 'First name is required.']
	},
	lastName: {
		type: String,
		required: [true, 'Last name is required.']
	},
	address: {
		type: String,
		required: [true, 'Address is required.']
	},
	mobileNo: {
		type: String,
		required: [true, 'Mobile number is required.']
	},
	email: {
		type: String,
		required: [true, 'Email is required.']
	},
	password: {
		type: String,
		required: [true, 'Password is required.']
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	orderList: [
		{
			productId: {
				type: String,
				required: [true, "orderId is required."]
			},
			orderDate: {
				type: Date,
				default: new Date()
			}
		}
	]
});

module.exports = mongoose.model('User', userSchema);