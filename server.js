const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

// registerPartials takes directory we want to use for handlebar partial files.
hbs.registerPartials(__dirname + '/views/partials');

// SET Express related configurations. Pass in key-value pairs.
app.set('view engine', 'hbs');

// Register middleware by using app.use. Takes a function.
// next exists so you can tell express when middleware function is done. Useful cause you can have as much middlewares as you like registered in the express app.
// req object contains request info (http method, path, etc.)
app.use((req, res, next) => {
  // let's make a logger with a timestamp.
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);

  // appendFile lets us add into a file.
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });

  // end current middleware, move on to next one.
  next();
});

// CHALLENGE Maintenance.hbs
// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// });

app.use(express.static(__dirname + '/public'));

// Register helper, (name of function in quotes, function);
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// Register a handler.
// Sets up a handler for HTTP get request to the given URL (this case is our root).
// Sends back a function (req, res).
// Request stores info about the request (Headers, body info, method made with request to the path);
// Response has a bunch of methods that allows us to respond HTTP request in any way desired.
app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');

  // Returns a json data
  // res.send({
  //   name: 'Ernest',
  //   likes: [
  //     'Working out',
  //     'Coding'
  //   ]
  // });
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to the Home Page'
  })
});

app.get('/about', (req, res) => {
  // res.send('About Page');
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Portfolio Page'
  });
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
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
