const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
// Allow Cross origin access;
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

require('./apis.js')(app);

app.listen(port, ()=>console.log("Listening on port: %d",port));
