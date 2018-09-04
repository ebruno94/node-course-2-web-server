const express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

// Register a handler.
// Sets up a handler for HTTP get request to the given URL (this case is our root).
// Sends back a function (req, res).
// Request stores info about the request (Headers, body info, method made with request to the path);
// Response has a bunch of methods that allows us to respond HTTP request in any way desired.
app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');

  // Returns a json data
  res.send({
    name: 'Ernest',
    likes: [
      'Working out',
      'Coding'
    ]
  });
});

app.get('/about', (req, res) => {
  res.send('About Page');
});

// CHALLENGE
// Create a route to /bad, send back JSON data with errorMessage.

app.get('/bad', (req, res) => {
  res.send({
    statusCode: 'BAD',
    errorMessage: 'Bad Request'
  });
});

// Binds application port to our machine.
// takes an optional second argument, a function.
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
