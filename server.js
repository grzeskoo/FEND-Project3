// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8001;
const server = app.listen(port, listening);

function listening() {
    //console.log(server)
    console.log(`Server is running on port ${port}`);
}


// GET route
app.get('/retrieve', getData);

function getData(request, response) {
    response.send(projectData);
}

// POST route
app.post('/add', postData);

function postData(request, response) {
    projectData = request.body;
    response.send({ message: "Post received" })
    console.log(projectData)
}