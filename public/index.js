let clientId;
function trackMe() {
  const name = document.getElementById('name').value;
  console.log('trackMe', name);
  getClient(name)
    .then(handleClient);
}

function getClient(name) {
  return fetch('/client', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      name: name
    }),
  })
    .then(function (response) {
      return response.json();
    });
}

function handleClient(clientInfo) {
  // set clientId
  clientId = clientInfo.clientId;
      console.log(clientInfo, clientId);
      updateLocation();
}

function updateLocation() {
  setTimeout(() => {
    getLocation();
    setTimeout(updateLocation, 2000);    
  }, 2000);
}

function getLocation() {
  let options;
  navigator.geolocation.getCurrentPosition((pos) => {
    console.log(pos);
    sendLocation({
      id: clientId,
      lat: pos.coords.latitude,
      long: pos.coords.longitude
    });
  }, (err) => {
    console.log(err);
  }, options);
}

function sendLocation(pos) {
  console.log('sending location');
  return fetch('/locations', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      id: clientId,
      lat: pos.lat,
      long: pos.long
    }),
  })
    .then(function (response) {
      console.log('done sending localtion');
      return response.json();
    });

}