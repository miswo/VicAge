const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
// Allow Cross origin access;
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use('/event', require('./Controllers/event'));

let db = require('./db');
db.connect((err) => {
	if (err) {
		console.log("Error connectiong MongoDB..")
		process.exit(1);
	} else {
        console.log("MongoDB connected..");
		app.listen(port, () => console.log("Listening on port: %d", port));
	}
});