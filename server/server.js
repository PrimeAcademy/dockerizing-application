const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

//
// CONFIGURING MIDDLEWARE
// ------------------------------------------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
// API ROUTES
// ------------------------------------------------------------

//
// REGISTERING THE STATICS TO BE SERVED UP FROM SERVER
// ------------------------------------------------------------
app.use(express.static('build'));

// KICKOFF SERVER
app.listen(PORT, () => {
    console.log('Server listening on port: ', PORT);
});
