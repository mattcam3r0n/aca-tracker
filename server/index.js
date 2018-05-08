const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();

app.use(bodyParser.json());

app.use(express.static('public'));
// app.use(require("./routes"));

let lastClientId = 0;
let clients = [];

app.post('/client', (request, response) => {
  const theName = request.body.name;
  lastClientId++;
  const client = {
    name: theName,
    clientId: lastClientId,
    lat: '',
    long: '',
    location: '',
  };
  clients.push(client);
  response.json(client);
});

app.post('/locations', (request, response) => {
  const body = request.body;
  const url = `http://nominatim.openstreetmap.org/reverse?format=json&lat=${body.lat}&lon=${body.long}&zoom=18&addressdetails=1`;
  const client = clients.find((c) => c.clientId == body.id);
  fetch(url, 
  { 
    method: 'GET', 
    headers: {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36"
    }
  })
  .then(res => res.json())
  .then(json => {
    client.lat = json.lat;
    client.long = json.lon;
    client.location = json.address;
    console.log(json);
    console.log(json.lat, json.lon);
    response.json(client);
  });
});

app.get('/locations', (request, response) => {
  response.json(clients);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});
