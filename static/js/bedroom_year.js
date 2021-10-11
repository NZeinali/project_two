
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


  // Bar Chart (Plotly)
  three_bedroom_2005 = [];    
  three_bedroom_2009 = [];    
  three_bedroom_2013 = [];    
  three_bedroom_2017 = [];    
  three_bedroom_2020 = [];    
  
  four_bedroom_2005 = [];    
  four_bedroom_2009 = [];    
  four_bedroom_2013 = [];    
  four_bedroom_2017 = [];    
  four_bedroom_2020 = [];  


  houseData.forEach(data => {
    if (data.BEDROOMS === 3 && data.YEAR_SOLD == 2005) {
      three_bedroom_2005.push(data.BEDROOMS);
    }
    else if (data.BEDROOMS === 3 && data.YEAR_SOLD == 2009) {
      three_bedroom_2009.push(data.BEDROOMS);
    }
    else if (data.BEDROOMS === 3 && data.YEAR_SOLD == 2013) {
      three_bedroom_2013.push(data.BEDROOMS);
    }
    else if (data.BEDROOMS === 3 && data.YEAR_SOLD == 2017) {
      three_bedroom_2017.push(data.BEDROOMS);
    }
    else if (data.BEDROOMS === 3 && data.YEAR_SOLD == 2020) {
      three_bedroom_2020.push(data.BEDROOMS);
    }


    else if (data.BEDROOMS === 4 && data.YEAR_SOLD == 2005) {
      four_bedroom_2005.push(data.BEDROOMS);
    }
    else if (data.BEDROOMS === 4 && data.YEAR_SOLD == 2009) {
      four_bedroom_2009.push(data.BEDROOMS);
    }
    else if (data.BEDROOMS === 4 && data.YEAR_SOLD == 2013) {
      four_bedroom_2013.push(data.BEDROOMS);
    }
    else if (data.BEDROOMS === 4 && data.YEAR_SOLD == 2017) {
      four_bedroom_2017.push(data.BEDROOMS);
    }
    else if (data.BEDROOMS === 4 && data.YEAR_SOLD == 2020) {
      four_bedroom_2020.push(data.BEDROOMS);
    }
    
  });
  console.log(four_bedroom_2020);
  console.log(three_bedroom_2017);
  
  var x = ["2005", "2009", "2013", "2017", "2020"];
  var y_three_bedroom = [three_bedroom_2005.length, three_bedroom_2009.length, three_bedroom_2013.length,
    three_bedroom_2017.length, three_bedroom_2020.length];

  var y_four_bedroom = [four_bedroom_2005.length, four_bedroom_2009.length, four_bedroom_2013.length,
    four_bedroom_2017.length, four_bedroom_2020.length];

// Bar chart plotted by Chart.js library
new Chart(document.getElementById("bar-chart-grouped"), {
  type: 'bar',
  data: {
    labels: x,
    datasets: [
      {
        label: "Three Bedrooms",
        backgroundColor: "#3e95cd",
        data: y_three_bedroom,
 
      },
      {
        label: "Four Bedrooms",
        backgroundColor: "#cd763e",
        data: y_four_bedroom,
 
      },


    ]
  },
  options: {
    title: {
      display: true,
      text: 'Properties sold in Perth with certain number of bedrooms'
    },
    layout: {
      padding: {
        left: 60,
        right:100
    }  }
  }
});









  

  // // Four and three Bedroom properties

  // var trace1 = {
  //   x: fourBD_year_arr,
  //   type: "histogram",
  //   name: "Four Bedrooms",
  //   opacity: 0.4,
  //   marker: {
  //      color: 'green',
  //   },
  // };
  // var trace2 = {
  //   x: threeBD_year_arr,
  //   type: "histogram",
  //   name: "Three Bedrooms",
  //   opacity: 0.4,
  //   marker: {
  //      color: 'red',
  //   },
  // };
  
  // var data = [trace1, trace2];
  // var layout = {barmode: "overlay"};
  // // Plotly.newPlot('bar2_chart', data, layout);
  






    }).catch(function(error) {
        console.log(error);
      });


