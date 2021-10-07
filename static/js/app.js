// The code for the chart is wrapped inside a function that
// automatically resizes the chart
function makeResponsive() {

    // if the SVG area isn't empty when the browser loads,
    // remove it and replace it with a resized version of the chart
    var svgArea = d3.select("body").select("svg");
  
    // clear svg is not empty
    if (!svgArea.empty()) {
      svgArea.remove();
    }
  
    // SVG wrapper dimensions are determined by the current width and
    // height of the browser window.
    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight;
  
    var margin = {
      top: 50,
      bottom: 50,
      right: 50,
      left: 50
    };
  
    var height = svgHeight - margin.top - margin.bottom;
    var width = svgWidth - margin.left - margin.right;
  
    // Append SVG element
    var svg = d3.select(".chart")
      .append("svg")
      .attr("height", svgHeight)
      .attr("width", svgWidth);
  
    // Append group element
    var chartGroup = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
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
        var price_per_sqm_land_arr = houseData.map(data => data.PRICE / data.LAND_AREA)
        var dist_to_sch_arr = houseData.map(data => data.NEAREST_SCH_DIST)
        var dist_to_cbd_arr = houseData.map(data => data.CBD_DIST)
        var dist_to_stn_arr = houseData.map(data => data.NEAREST_STN_DIST)
    
        // console.log(dist_to_stn_arr);


// Histogram (Plotly)
       
        var trace = {
            x: land_size_arr,
            type: 'histogram',
        };

        var data = [trace];
        
        var layout = {
            title: `Land Sizes Sold in Perth between 1991 and 2020`,
            xaxis: {
            title: "Land Size (m2)"},
            yaxis: {
                title: "Count"},         
        };

        Plotly.newPlot('hist_chart', data, layout);

// scatter chart (Plotly)
var trace1 = {
    x: dist_to_sch_arr,
    y: price_per_sqm_land_arr,
    mode: 'markers',
    type: 'scatter',
    name: 'School',
    marker: { size: 5 }
  };
  
  var trace2 = {
    x: dist_to_cbd_arr,
    y: price_per_sqm_land_arr,
    mode: 'markers',
    type: 'scatter',
    name: 'CBD',
    marker: { size: 5 }
  };

  var trace3 = {
    x: dist_to_stn_arr,
    y: price_per_sqm_land_arr,
    mode: 'markers',
    type: 'scatter',
    name: 'Train Station',
    marker: { size: 5 }
  };
  
  
  var data = [trace1];

  var layout = {
    title: `Dwelling price`,
    xaxis: {
        title: "Distance (m)",
        // range: [0,10000]
    },

    yaxis: {
        title: "Price per Land Area"},         
    };
  
  Plotly.newPlot('scatter_chart', data, layout);
  





  // Histogram (Plotly)
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

  var trace = {
    x: x,
    y: y,
    type: 'bar',
  };

  var data = [trace];
        
  var layout = {
    // title: `Number of bedrooms`,
    xaxis: {
    title: "Number of bedrooms"},
    yaxis: {
      title: "Count"},         
  };

  Plotly.newPlot('bar_chart', data, layout);



  





  

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
  Plotly.newPlot('bar2_chart', data, layout);
  






    }).catch(function(error) {
        console.log(error);
      });
}

// When the browser loads, makeResponsive() is called.
makeResponsive();

// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);
