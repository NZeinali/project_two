// Function to determine marker size based on population
function markerSize(price) {
  return price / 5000;
}

d3.json("/mapjson")
  .then((houseData) => {
    // Convert string to number
    houseData.forEach((house) => {
      house.Latitude = +house.Latitude;
      house.Longitude = +house.Longitude;
      house.Land_Area = +house.Land_Area;
      house.Price = +house.Price;
    });
    console.log(houseData);
    // ************************************************************************************************* //
    // Filter data to find properties with 500 to 750[m2] land size and total price below 500,000[$]
    var selecteddata = houseData
      .filter((data) => data.Land_Area >= 500)
      .filter((data) => data.Land_Area < 750)
      .filter((data) => data.Price <= 500000);

    console.log(selecteddata);

    // Define arrays to hold created city and state markers
    var location_arr = [];
    var affordablePriceMarkers = [];

    var price_arr = selecteddata.map((data) => data.Price);
    var land_arr = selecteddata.map((data) => data.Land_Area);

    selecteddata.forEach((data) => {
      var lat = data.Latitude;
      var lng = data.Longitude;
      location_arr.push([lat, lng]);
    });

    console.log(location_arr);

    // Loop through locations and create price markers
    for (var i = 0; i < selecteddata.length; i++) {
      // Setting the marker radius for the property by passing price into the markerSize function
      affordablePriceMarkers.push(
        L.circle(location_arr[i], {
          stroke: false,
          fillOpacity: 0.4,
          color: "Fuchsia",
          fillColor: "Fuchsia",
          radius: markerSize(price_arr[i]),
        }).bindPopup(
          "<h3> Price: $" +
            price_arr[i] +
            "</h3><h3> Land Size: " +
            land_arr[i] +
            "m2</h3>"
        )
      );
    }

    // ************************************************************************************************* //

    // Filter data to find expensive properties with total price over 2,000,000[$]
    var expensivedata = houseData.filter((data) => data.Price > 2000000);

    console.log(selecteddata);

    // Define arrays to hold created city and state markers
    var expensive_location_arr = [];
    var expensivePriceMarkers = [];

    var expensive_price_arr = expensivedata.map((data) => data.Price);
    var expensive_land_arr = expensivedata.map((data) => data.Land_Area);

    expensivedata.forEach((data) => {
      var lat = data.Latitude;
      var lng = data.Longitude;
      expensive_location_arr.push([lat, lng]);
    });

    console.log(expensive_location_arr);

    // Loop through locations and create price markers
    for (var i = 0; i < expensivedata.length; i++) {
      // Setting the marker radius for the property by passing price and land size into the markerSize function
      expensivePriceMarkers.push(
        L.circle(expensive_location_arr[i], {
          stroke: false,
          fillOpacity: 0.4,
          color: "red",
          fillColor: "red",
          radius: markerSize(expensive_price_arr[i]) / 2,
        }).bindPopup(
          "<h3> Price: $" +
            expensive_price_arr[i] +
            "</h3><h3> Land Size: " +
            expensive_land_arr[i] +
            "m2</h3>"
        )
      );
    }

    // Create base layers

    // Streetmap Layer
    var streetmap = L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY,
      }
    );

    var satelliteMap = L.tileLayer(
      "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "satellite-v9",
        accessToken: API_KEY,
      }
    );

    // Create two separate layer groups: one for affordable and one for expensive properties
    var affordablePrices = L.layerGroup(affordablePriceMarkers);
    var expensivePrices = L.layerGroup(expensivePriceMarkers);

    // Create a baseMaps object
    var baseMaps = {
      "Street Map": streetmap,
      "Satellite Map": satelliteMap,
    };

    // Create an overlay object
    var overlayMaps = {
      "Affordable Properties": affordablePrices,
      "Expensive Properties": expensivePrices,
    };

    // Define a map object
    var myMap = L.map("map", {
      center: [-31.95, 115.86],
      zoom: 13,
      layers: [streetmap, affordablePrices],
    });

    // Pass our map layers into our layer control
    // Add the layer control to the map
    L.control
      .layers(baseMaps, overlayMaps, {
        collapsed: false,
      })
      .addTo(myMap);
  })
  .catch(function (error) {
    console.log(error);
  });
