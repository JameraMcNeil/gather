const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('express-session');
const cors = require('cors');

// import and configure dotenv
require('dotenv').config();

const app = express();
const port = 3003;

const dbname = 'events';

// middleware
app.use(express.json());
app.use(methodOverride('_method'));

// error / disconnection
mongoose.connection.on('error', err => console.log(err.message + ' is Mongo not running?'));
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'));


// connect db
mongoose.connect(`mongodb://localhost:27017/${dbname}`);
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

// listener
app.listen(port, () => {
	console.log('listening on port ' + port)
})