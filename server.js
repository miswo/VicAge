const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const bodyParser = require('body-parser');
// Allow Cross origin access;
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
	next();
});

app.use(bodyParser.json());

app.use('/event', require('./Controllers/event'));
app.use('/concept',require('./Controllers/concept'));
app.use('/service',require('./Controllers/service'));
app.use('/list',require('./Controllers/list'));
app.use('/user',require('./Controllers/user'));
app.use('/goal',require('./Controllers/goal'));
app.use('/planner',require('./Controllers/planner'));

var db = require('./db');
db.connect((err) => {
	if (err) {
		console.log("Error connectiong MongoDB..")
		process.exit(1);
	} else {
        console.log("MongoDB connected..");
		app.listen(port, () => console.log("Listening on port: %d", port));
	}
});
