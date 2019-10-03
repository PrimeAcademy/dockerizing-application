const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// SOURCING IN ROUTES
const fruitsRouter = require('./routes/fruits.router');
const employeesRouter = require('./routes/employees.router');

//
// CONFIGURING MIDDLEWARE
// ------------------------------------------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
// API ROUTES
// ------------------------------------------------------------
app.use('/api/fruits', fruitsRouter);
app.use('/api/employees', employeesRouter);

//
// REGISTERING THE STATICS TO BE SERVED UP FROM SERVER
// ------------------------------------------------------------
app.use(express.static('build'));

// KICKOFF SERVER
app.listen(PORT, () => {
    console.log('Server listening on port: ', PORT);
});
