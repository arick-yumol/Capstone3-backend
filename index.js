const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

mongoose.connect('mongodb+srv://admin:admin@zuitt-bootcamp.brw90.mongodb.net/Batch127_Capstone3?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded( { extended: true } ));

app.use('/users', userRoutes);
app.use('/products', productRoutes);

app.listen(process.env.PORT || 4002, () => {
	console.log(`API is now online on port ${ process.env.PORT || 4002 }`)
})