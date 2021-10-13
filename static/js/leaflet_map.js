d3.json("/mapjson").then(houseData => {
  console.log(houseData);

  // Convert string to number
  houseData.forEach(house => {
    house.Land_Area = +house.Land_Area;
    house.Latitude = +house.Latitude;
    house.Longitude = +house.Longitude;
    house.Price = +house.Price;
  });


  
  // Create a map object
  var myMap = L.map("map", {
    center: [-37.8, 144.9],
    zoom: 4.5
  });

  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

  // Define a markerSize function that will give each city a different radius based on its population
  // function markerSize(population) {
  //   return population / 40;
  // }  






});

