const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Product name is required.']
	},
	description: {
		type: String,
		required: [true, 'Description is required.']
	},
	price: {
		type: Number,
		required: [true, 'Price is required.']
	},
	onStock: {
		type: Boolean,
		default: true
	},
	listedOn: {
		type: Date,
		default: new Date()
	},
	orderedBy: [
		{
			userId: {
				type: String,
				required: [true, "orderId is required."]
			},
			orderDate: {
				type: Date,
				default: new Date()
			}
		}
	]
})

module.exports = mongoose.model('Product', productSchema);