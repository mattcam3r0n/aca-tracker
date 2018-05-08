
showLocations();

function showLocations() {
  getLocations()
  .then(displayLocations);
  setTimeout(showLocations, 1000);
}

function getLocations() {
  return fetch('/locations')
    .then(function (response) {
      return response.json();
    });
}

function displayLocations(locations) {
  console.log(locations);
  const locationsDiv = document.getElementById('locations');
  locationsDiv.innerHTML = "";
  locations.forEach((l) => {
    const div = "<div>Name: " + l.name + " Location: " + l.location + "</div>";

    let loc = "";
    Object.keys(l.location).forEach((k) => {
      loc += "<div>" + k + ": " + l.location[k] + "</div>";
    });
    
    const locDiv = `
      <div>
        <div>Name: ${l.name}</div>
        ${loc}
      </div>
      <p/>
    `;

    locationsDiv.innerHTML += locDiv;
  });
}
