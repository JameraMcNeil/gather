const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const bcrypt = require('bcrypt');
const cors = require('cors');

// import and configure dotenv
require('dotenv').config();

const app = express();
const PORT = 3003;

const DBNAME = 'events';

// middleware
app.use(express.json());
app.use(methodOverride('_method'));
// app.use(session({
// 	secret: process.env.SECRET,
// 	resave: false,
// 	saveUninitialized: false,
// }))

// error / disconnection
mongoose.connection.on('error', err => console.log(err.message + ' is Mongo not running?'));
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'));


// connect db
mongoose.connect(`mongodb://localhost:27017/${DBNAME}`);
mongoose.connection.once('open', () => {
	console.log('connected to mongoose! ~~~')
});

// whitelist and cors
const whitelist = ['http://localhost: 3000'];
const corsOptions = {
	origin: function(origin, callback) {
		if(whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('not allowed by CORS'));
		}
	}
}

app.use(cors());

// controller
const eventsController = require('./controllers/event_controller.js');
app.use('/events', eventsController);
// const userController = require('./controllers/user_controller.js')
// app.use('/users', userController)
const cityController = require('./controllers/city_controller.js');
app.use('/cities', cityController);


// // stored in the db
// const hashedPassword = bcrypt.hashSync('password1234', bcrypt.genSaltSync(10));
// //generated from a password form
// const hashedPasswordGuess = bcrypt.hashSync('password1234', bcrypt.genSaltSync(10));
// //how to make sure a user can login
// bcrypt.compareSync(hashedPasswordGuess, hashedPassword) //returns true or false

// listener
app.listen(PORT, () => {
	console.log('listening on port ' + PORT)
})