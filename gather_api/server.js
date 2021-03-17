const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const cors = require('cors');

// import and configure dotenv
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

const DBNAME = process.env.DBNAME;

// middleware
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: false,
}))

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

//sessions routes//

app.get('/create-session', (req, res) => {
	console.log(req.session);
	req.session.anyProperty = 'any value';
	console.log(req.session);
});

app.get('/retrieve-session', (req,res) => {
	if(req.session.anyProperty = 'some value') {
		console.log('session properties match')
	} else {
		console.log('session properties do not match');
	}
	res.redirect('/events')
});

app.get('/update-session', (req, res) => {
	req.session.anyProperty = 'changing anyProperty to this value'
	res.redirect('/')
});

app.get('/destroy-session', (req, res) => {
	if(err) {
	console.log('ran into problems destroying session')
	} else {
		console.log('sucessfully deleted session')
	}
})

// listener
app.listen(PORT, () => {
	console.log('listening on port ' + PORT)
})