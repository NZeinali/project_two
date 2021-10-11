

    // Read CSV
    d3.csv("./csv/perth_properties.csv").then(function(houseData) {
        console.log(houseData);
        houseData.forEach(house => {
            house.LAND_AREA = +house.LAND_AREA;
            house.CBD_DIST = +house.CBD_DIST;
            house.NEAREST_STN_DIST = +house.NEAREST_STN_DIST;
            house.NEAREST_SCH_DIST = +house.NEAREST_SCH_DIST;
            house.YEAR_SOLD = +house.YEAR_SOLD;
            house.BEDROOMS = +house.BEDROOMS;


        });
        var land_size_arr = houseData.map(data => data.LAND_AREA)
        // var price_per_sqm_land_arr = houseData.map(data => data.PRICE / data.LAND_AREA)
        var price_per_sqm_land_arr = houseData.map(data => data.PRICE )
        
        var dist_to_sch_arr = [];
        houseData.forEach(data => {
          if (data.NEAREST_SCH == "PERTH MODERN SCHOOL"){
            dist_to_sch_arr.push(data.NEAREST_SCH_DIST);
          }
        });
        var dist_to_cbd_arr = houseData.map(data => data.CBD_DIST)
        var dist_to_stn_arr = houseData.map(data => data.NEAREST_STN_DIST)
    
        console.log(dist_to_sch_arr);






  // Bar Chart (Plotly)
  one_bedroom_arr = [];    
  two_bedroom_arr = [];    
  three_bedroom_arr = [];    
  four_bedroom_arr = [];    
  five_bedroom_arr = [];    
  six_bedroom_arr = []; 
  fourBD_year_arr = [];   
  threeBD_year_arr = [];   


  houseData.forEach(data => {
    if (data.BEDROOMS === 1) {
      one_bedroom_arr.push(data.BEDROOMS);
    }
    else if (data.BEDROOMS === 2) {
      two_bedroom_arr.push(data.BEDROOMS);
    }
    else if (data.BEDROOMS === 3) {
      three_bedroom_arr.push(data.BEDROOMS);
      threeBD_year_arr.push(data.YEAR_SOLD)

    }
    else if (data.BEDROOMS === 4) {
      four_bedroom_arr.push(data.BEDROOMS);
      fourBD_year_arr.push(data.YEAR_SOLD);
    }
    else if (data.BEDROOMS === 5) {
      five_bedroom_arr.push(data.BEDROOMS);
    }
    else if (data.BEDROOMS === 6) {
      six_bedroom_arr.push(data.BEDROOMS);
    }
    
  });
  console.log(four_bedroom_arr);
  console.log(fourBD_year_arr);
  
  var x = ["One", "Two", "Three", "Four", "Five", "Six"];
  var y = [one_bedroom_arr.length, two_bedroom_arr.length, three_bedroom_arr.length,
          four_bedroom_arr.length, five_bedroom_arr.length, six_bedroom_arr.length];


// Bar chart plotted by Chart.js library
new Chart(document.getElementById("bar-chart-grouped"), {
  type: 'bar',
  data: {
    labels: x,
    datasets: [
      {
        label: "Number of bedrooms",
        backgroundColor: "#3e95cd",
        data: y,
 
      }

    ]
  },
  options: {
    title: {
      display: false,
      text: 'Number of bedrooms in Perth'
    },
    layout: {
      padding: {
        left: 60,
        right:100
      }  
    }
  }
});









  

  // Four and three Bedroom properties

  var trace1 = {
    x: fourBD_year_arr,
    type: "histogram",
    name: "Four Bedrooms",
    opacity: 0.4,
    marker: {
       color: 'green',
    },
  };
  var trace2 = {
    x: threeBD_year_arr,
    type: "histogram",
    name: "Three Bedrooms",
    opacity: 0.4,
    marker: {
       color: 'red',
    },
  };
  
  var data = [trace1, trace2];
  var layout = {barmode: "overlay"};
  // Plotly.newPlot('bar2_chart', data, layout);
  






    }).catch(function(error) {
        console.log(error);
      });


