const express = require('express');
const app = express();

app.use(express.json())

require("express-async-errors")

function requestLogger(req, res, next) {
    if(!req.url.startswith("/static")) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
    }
    next()
}

// For testing purposes, GET /
app.get('/', (req, res) => {
  res.json("Express server running. No content provided at root level. Please use another route.");
});

// For testing express.json middleware
app.post('/test-json', (req, res, next) => {
  // send the body as JSON with a Content-Type header of "application/json"
  // finishes the response, res.end()
  res.json(req.body);
  next();
});

// For testing express-async-errors
app.get('/test-error', async (req, res) => {
  throw new Error("Hello World!")
});

const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));
