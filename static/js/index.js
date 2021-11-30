// ################################################################################################ //
//                                     PROPERTY BEDROOM / LAND SIZE ANALYSIS
// ################################################################################################ //

d3.json("/bedroomsjson")
  .then((houseData) => {
    // Convert string to number
    houseData.forEach((house) => {
      house.Year_Sold = +house.Year_Sold;
      house.Bedrooms = +house.Bedrooms;
      house.Land_Area = +house.Land_Area;
      house.Price = +house.Price;
    });
    // ****************************************************************************** //
    // Popular land size plotted by plotly
    var land_size_arr = houseData.map((data) => data.Land_Area);

    var trace = {
      x: land_size_arr,
      type: "histogram",
      xbins: {
        size: 50,
      },
    };

    var data = [trace];

    var layout = {
      title: `Histogram of sold property sizes in Perth (1991-2020)`,
      xaxis: {
        title: "Land Size (m2)",
        dtick: 100,
      },
      yaxis: {
        title: "Count",
      },
      margin: {
        l: 100,
        r: 100,
        b: 100,
        t: 100,
      },
    };

    Plotly.newPlot("hist_landsize", data, layout);
    // ****************************************************************************** //

    // Popular bedrooms number plotted by Chart.js
    var one_bedroom_arr = [];
    var two_bedroom_arr = [];
    var three_bedroom_arr = [];
    var four_bedroom_arr = [];
    var five_bedroom_arr = [];
    var six_bedroom_arr = [];

    houseData.forEach((data) => {
      if (data.Bedrooms === 1) {
        one_bedroom_arr.push(data.Bedrooms);
      } else if (data.Bedrooms === 2) {
        two_bedroom_arr.push(data.Bedrooms);
      } else if (data.Bedrooms === 3) {
        three_bedroom_arr.push(data.Bedrooms);
      } else if (data.Bedrooms === 4) {
        four_bedroom_arr.push(data.Bedrooms);
      } else if (data.Bedrooms === 5) {
        five_bedroom_arr.push(data.Bedrooms);
      } else if (data.Bedrooms === 6) {
        six_bedroom_arr.push(data.Bedrooms);
      }
    });

    var x = ["One", "Two", "Three", "Four", "Five", "Six"];
    var y1 = [
      one_bedroom_arr.length,
      two_bedroom_arr.length,
      three_bedroom_arr.length,
      four_bedroom_arr.length,
      five_bedroom_arr.length,
      six_bedroom_arr.length,
    ];

    // Bar chart plotted by Chart.js library
    new Chart(document.getElementById("bar-popular-bedrooms"), {
      type: "bar",
      data: {
        labels: x,
        datasets: [
          {
            label: "Number of bedrooms",
            backgroundColor: "#D2691E",
            data: y1,
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              display: true,

              scaleLabel: {
                display: true,
                labelString: "Number of Bedrooms",
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Number of Sold Properties",
              },
            },
          ],
        },
        layout: {
          padding: {
            left: 60,
            right: 100,
            bottom: 100,
            top: 100,
          },
        },
      },
    });

    // ****************************************************************************** //

    // Number of properties with 3 and 4 bedrooms sold between 2015 and 2020
    var three_bedroom_2015 = [];
    var three_bedroom_2016 = [];
    var three_bedroom_2017 = [];
    var three_bedroom_2018 = [];
    var three_bedroom_2019 = [];
    var three_bedroom_2020 = [];

    var four_bedroom_2015 = [];
    var four_bedroom_2016 = [];
    var four_bedroom_2017 = [];
    var four_bedroom_2018 = [];
    var four_bedroom_2019 = [];
    var four_bedroom_2020 = [];

    houseData.forEach((data) => {
      if (data.Bedrooms === 3 && data.Year_Sold == 2015) {
        three_bedroom_2015.push(data.Bedrooms);
      } else if (data.Bedrooms === 3 && data.Year_Sold == 2016) {
        three_bedroom_2016.push(data.Bedrooms);
      } else if (data.Bedrooms === 3 && data.Year_Sold == 2017) {
        three_bedroom_2017.push(data.Bedrooms);
      } else if (data.Bedrooms === 3 && data.Year_Sold == 2018) {
        three_bedroom_2018.push(data.Bedrooms);
      } else if (data.Bedrooms === 3 && data.Year_Sold == 2019) {
        three_bedroom_2019.push(data.Bedrooms);
      } else if (data.Bedrooms === 3 && data.Year_Sold == 2020) {
        three_bedroom_2020.push(data.Bedrooms);
      } else if (data.Bedrooms === 4 && data.Year_Sold == 2015) {
        four_bedroom_2015.push(data.Bedrooms);
      } else if (data.Bedrooms === 4 && data.Year_Sold == 2016) {
        four_bedroom_2016.push(data.Bedrooms);
      } else if (data.Bedrooms === 4 && data.Year_Sold == 2017) {
        four_bedroom_2017.push(data.Bedrooms);
      } else if (data.Bedrooms === 4 && data.Year_Sold == 2018) {
        four_bedroom_2018.push(data.Bedrooms);
      } else if (data.Bedrooms === 4 && data.Year_Sold == 2019) {
        four_bedroom_2019.push(data.Bedrooms);
      } else if (data.Bedrooms === 4 && data.Year_Sold == 2020) {
        four_bedroom_2020.push(data.Bedrooms);
      }
    });

    var x = ["2015", "2016", "2017", "2018", "2019", "2020"];
    var y_three_bedroom = [
      three_bedroom_2015.length,
      three_bedroom_2016.length,
      three_bedroom_2017.length,
      three_bedroom_2018.length,
      three_bedroom_2019.length,
      three_bedroom_2020.length,
    ];

    var y_four_bedroom = [
      four_bedroom_2015.length,
      four_bedroom_2016.length,
      four_bedroom_2017.length,
      four_bedroom_2018.length,
      four_bedroom_2019.length,
      four_bedroom_2020.length,
    ];

    // Bar chart plotted by Chart.js library
    new Chart(document.getElementById("bar-bedroom_year"), {
      type: "bar",
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
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              display: true,

              scaleLabel: {
                display: true,
                labelString: "Year Sold",
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Number of Sold Properties",
              },
            },
          ],
        },
        layout: {
          padding: {
            left: 60,
            right: 100,
            bottom: 100,
            top: 100,
          },
        },

        layout: {
          padding: {
            left: 60,
            right: 100,
          },
        },
      },
    });

    // ****************************************************************************** //

    // Effect of the number of Bedrooms on the sale or listing price of properties
    var price_oneBD = [];
    var price_twoBD = [];
    var price_threeBD = [];
    var price_fourBD = [];
    var price_fiveBD = [];
    var price_sixBD = [];

    houseData.forEach((data) => {
      if (data.Bedrooms === 1) {
        price_oneBD.push(Math.round(data.Price / data.Land_Area));
      } else if (data.Bedrooms === 2) {
        price_twoBD.push(Math.round(data.Price / data.Land_Area));
      } else if (data.Bedrooms === 3) {
        price_threeBD.push(Math.round(data.Price / data.Land_Area));
      } else if (data.Bedrooms === 4) {
        price_fourBD.push(Math.round(data.Price / data.Land_Area));
      } else if (data.Bedrooms === 5) {
        price_fiveBD.push(Math.round(data.Price / data.Land_Area));
      } else if (data.Bedrooms === 6) {
        price_sixBD.push(Math.round(data.Price / data.Land_Area));
      }
    });

    // Calculate average sales price per sqm of land
    var sum = 0;
    price_oneBD.forEach((data) => {
      sum += data;
    });
    var oneBD_avg_price = Math.round(sum / price_oneBD.length);
    // **********
    var sum = 0;
    price_twoBD.forEach((data) => {
      sum += data;
    });
    var twoBD_avg_price = Math.round(sum / price_twoBD.length);
    // **********
    var sum = 0;
    price_threeBD.forEach((data) => {
      sum += data;
    });
    var threeBD_avg_price = Math.round(sum / price_threeBD.length);
    // **********
    var sum = 0;
    price_fourBD.forEach((data) => {
      sum += data;
    });
    var fourBD_avg_price = Math.round(sum / price_fourBD.length);
    // **********
    var sum = 0;
    price_fiveBD.forEach((data) => {
      sum += data;
    });
    var fiveBD_avg_price = Math.round(sum / price_fiveBD.length);
    // **********
    var sum = 0;
    price_sixBD.forEach((data) => {
      sum += data;
    });
    var sixBD_avg_price = Math.round(sum / price_sixBD.length);

    // Defining arrays for the plot
    var x = ["One", "Two", "Three", "Four", "Five", "Six"];
    var y2 = [
      oneBD_avg_price,
      twoBD_avg_price,
      threeBD_avg_price,
      fourBD_avg_price,
      fiveBD_avg_price,
      sixBD_avg_price,
    ];
    // Bar chart plotted by Chart.js library
    new Chart(document.getElementById("bar-bedroom_price"), {
      type: "bar",
      data: {
        labels: x,
        datasets: [
          {
            label: "Number of Bedrooms",
            backgroundColor: "#3e95cd",
            data: y2,
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              display: true,

              scaleLabel: {
                display: true,
                labelString: "Number of Bedrooms",
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Price per Land Size ($/m2)",
              },
            },
          ],
        },
        layout: {
          padding: {
            left: 60,
            right: 100,
            bottom: 100,
            top: 100,
          },
        },
      },
    });

    // ********************* Plotly
    var trace1 = {
      x: x,
      y: y1,
      xaxis: "x1",
      yaxis: "y1",
      type: "bar",
      marker: {
        color: "rgba(50,171,96,0.6)",
        line: {
          color: "rgba(50,171,96,1.0)",
          width: 1,
        },
      },
      name: "Price per Land size",
    };

    var trace2 = {
      x: x,
      y: y2,
      xaxis: "x1",
      yaxis: "y2",
      type: "bar",
      marker: {
        color: "#FF5733",
        line: {
          color: "#FF5733",
          width: 1,
        },
      },

      name: "Total Price",
    };

    var data = [trace1, trace2];

    var layout = {
      yaxis1: {
        domain: [0, 0.48],
        title: "Number of Sold Properties",
        zeroline: false,
        showline: false,
        showticklabels: true,
        showgrid: true,
      },
      yaxis2: {
        domain: [0.52, 1],
        title: "Price per Land Size ($/m2)",
        zeroline: false,
        showline: false,
        showticklabels: true,
        showgrid: true,
        side: "right",
      },
      legend: {
        x: 0,
        y: 1.3,
        font: {
          size: 14,
        },
      },
      margin: {
        l: 150,
        r: 150,
        t: 70,
        b: 150,
      },
    };

    Plotly.newPlot("multiAxis", data, layout);
  })
  .catch(function (error) {
    console.log(error);
  });

// ################################################################################################ //
//                                       PROPERTY AGE ANALYSIS
// ################################################################################################ //

d3.json("/agejson")
  .then((houseData) => {
    // Convert string to number
    houseData.forEach((house) => {
      house.Build_Year = +house.Build_Year;
      house.Land_Area = +house.Land_Area;
      house.Price = +house.Price;
    });

    var price_below_1990 = [];
    var price_1990_1995 = [];
    var price_1995_2000 = [];
    var price_2000_2005 = [];
    var price_2005_2010 = [];
    var price_2010_2015 = [];
    var price_above_2015 = [];

    houseData.forEach((data) => {
      if (data.Build_Year <= 1990) {
        price_below_1990.push(Math.round(data.Price / data.Land_Area));
      } else if (data.Build_Year <= 1995) {
        price_1990_1995.push(Math.round(data.Price / data.Land_Area));
      } else if (data.Build_Year <= 2000) {
        price_1995_2000.push(Math.round(data.Price / data.Land_Area));
      } else if (data.Build_Year <= 2005) {
        price_2000_2005.push(Math.round(data.Price / data.Land_Area));
      } else if (data.Build_Year <= 2010) {
        price_2005_2010.push(Math.round(data.Price / data.Land_Area));
      } else if (data.Build_Year <= 2015) {
        price_2010_2015.push(Math.round(data.Price / data.Land_Area));
      } else {
        price_above_2015.push(Math.round(data.Price / data.Land_Area));
      }
    });

    // Calculate average sales price per sqm of land for each "Build_Year" period
    var sum = 0;
    price_below_1990.forEach((price) => {
      sum += price;
    });
    var avg_price_below_1990 = Math.round(sum / price_below_1990.length);
    // **********
    var sum = 0;
    price_1990_1995.forEach((price) => {
      sum += price;
    });
    var avg_price_1990_1995 = Math.round(sum / price_1990_1995.length);
    // **********
    var sum = 0;
    price_1995_2000.forEach((price) => {
      sum += price;
    });
    var avg_price_1995_2000 = Math.round(sum / price_1995_2000.length);
    // **********
    var sum = 0;
    price_2000_2005.forEach((price) => {
      sum += price;
    });
    var avg_price_2000_2005 = Math.round(sum / price_2000_2005.length);
    // **********
    var sum = 0;
    price_2005_2010.forEach((price) => {
      sum += price;
    });
    var avg_price_2005_2010 = Math.round(sum / price_2005_2010.length);
    // **********
    var sum = 0;
    price_2010_2015.forEach((price) => {
      sum += price;
    });
    var avg_price_2010_2015 = Math.round(sum / price_2010_2015.length);
    // **********
    var sum = 0;
    price_above_2015.forEach((price) => {
      sum += price;
    });
    var avg_price_above_2015 = Math.round(sum / price_above_2015.length);

    // Defining arrays for the plot
    var xValue = [
      "Before 1990",
      "1990-2000",
      "2000-2005",
      "2005-2010",
      "2010-2015",
      "After 2015",
    ];
    var yValue = [
      avg_price_below_1990,
      avg_price_1990_1995,
      avg_price_1995_2000,
      avg_price_2000_2005,
      avg_price_2005_2010,
      avg_price_2010_2015,
      avg_price_above_2015,
    ];

    // Plot by PLOTLY
    var trace = {
      x: xValue,
      y: yValue,
      type: "bar",

      marker: {
        color: "rgb(158,202,225)",
        opacity: 0.6,
        line: {
          color: "rgb(8,48,107)",
          width: 1.5,
        },
      },
    };

    var data = [trace];

    var layout = {
      title: "Age of Property Analysis",
      xaxis: {
        title: "Year Built",
      },
      yaxis: {
        title: "Average Price per Land Size ($/m2)",
      },
    };

    Plotly.newPlot("age_plotly", data, layout);
  })
  .catch(function (error) {
    console.log(error);
  });

// ################################################################################################ //
//                                       PROPERTY SUBURB ANALYSIS
// ################################################################################################ //

d3.json("/suburbAgejson")
  .then((houseData) => {
    houseData.forEach((house) => {
      house.Build_Year = +house.Build_Year;
      house.Land_Area = +house.Land_Area;
      house.Price = +house.Price;
    });

    // Get the array of SUBURBS and PRICES of each property
    var suburb_arr = houseData.map((house) => house.Suburb);
    var price_arr = houseData.map((house) => house.Price);
    var land_arr = houseData.map((house) => house.Land_Area);

    // Get all the unique values of SUBURB array by creating a function
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    var unique_suburbs = suburb_arr.filter(onlyUnique);

    var sum_price_unique_suburbs = [];

    unique_suburbs.forEach((suburb) => {
      var sum = 0;
      var sum_per_land = 0;
      var count = 0;

      for (var i = 0; i < suburb_arr.length; i++) {
        if (suburb_arr[i] == suburb) {
          sum += price_arr[i];
          sum_per_land += price_arr[i] / land_arr[i];
          count += 1;
        }
      }
      sum_price_unique_suburbs.push({
        Suburb: suburb,
        Avg_Price_per_Land: Math.round(sum_per_land / count),
        Avg_Price: Math.round(sum / count),
      });
    });

    // Sort array by object key value
    sum_price_unique_suburbs.sort(function (a, b) {
      return b.Avg_Price_per_Land - a.Avg_Price_per_Land;
    });

    // Plot horizontal bar chart using PLOTLY

    var sliced_suburb = [];
    var sliced_price = [];
    var sliced_price_per_land = [];

    // Pick top 10 suburbs
    for (var i = 0; i < 10; i++) {
      sliced_suburb.push(sum_price_unique_suburbs[i].Suburb);
      sliced_price.push(sum_price_unique_suburbs[i].Avg_Price);
      sliced_price_per_land.push(
        sum_price_unique_suburbs[i].Avg_Price_per_Land
      );
    }

    var xSuburbPrice = sliced_price;
    var xSuburbPricePerLand = sliced_price_per_land;
    var ySuburb = sliced_suburb;

    // Plotly
    var trace1 = {
      x: xSuburbPricePerLand,
      y: ySuburb,
      xaxis: "x1",
      yaxis: "y1",
      type: "bar",
      marker: {
        color: "rgba(50,171,96,0.6)",
        line: {
          color: "rgba(50,171,96,1.0)",
          width: 1,
        },
      },
      name: "Top 10 expensive suburbs",
      orientation: "h",
      transforms: [
        {
          type: "sort",
          target: "x",
          order: "ascending",
        },
      ],
    };

    var trace2 = {
      x: xSuburbPrice,
      y: ySuburb,
      xaxis: "x2",
      yaxis: "y1",
      type: "bar",
      marker: {
        color: "#FF5733",
        line: {
          color: "#FF5733",
          width: 1,
        },
      },
      orientation: "h",

      name: "Average total sales price for the top 10 expensive suburbs",
    };

    var data = [trace1, trace2];

    var layout = {
      title: "Suburb Analysis",
      xaxis1: {
        range: [0, 4000],
        domain: [0, 0.45],
        title: "Price per Land Size ($/m2)",
        zeroline: false,
        showline: false,
        showticklabels: true,
        showgrid: true,
      },
      xaxis2: {
        range: [700000, 1800000],
        domain: [0.55, 1],
        title: "Total Sales Price ($)",
        zeroline: false,
        showline: false,
        showticklabels: true,
        showgrid: true,
        side: "top",
        dtick: 100000,
      },
      legend: {
        x: 0,
        y: 1.3,
        font: {
          size: 14,
        },
      },
      margin: {
        l: 150,
        r: 70,
        t: 150,
        b: 70,
      },

      annotations: [],
    };

    for (var i = 0; i < 10; i++) {
      var result = {
        xref: "x1",
        yref: "y1",
        x: xSuburbPricePerLand[i] + 190, // position of labels
        y: ySuburb[i], // position of labels
        text: xSuburbPricePerLand[i] + " $/m2",
        font: {
          family: "Arial",
          size: 14,
          color: "green",
        },
        showarrow: false,
      };
      var result2 = {
        xref: "x2",
        yref: "y1",
        x: xSuburbPrice[i] + 50000, // position of labels
        y: ySuburb[i], // position of labels
        text: xSuburbPrice[i] + " $",
        font: {
          family: "Arial",
          size: 14,
          color: "black",
        },
        showarrow: false,
      };

      layout.annotations.push(result, result2);
    }

    Plotly.newPlot("suburb_plotly", data, layout);
  })
  .catch(function (error) {
    console.log(error);
  });

// ################################################################################################ //
//                                       DISTANCE ANALYSIS
// ################################################################################################ //

d3.json("/distancejson")
  .then((houseData) => {
    // Convert string to number
    houseData.forEach((house) => {
      house.CBD_Dist = +house.CBD_Dist;
      house.Land_Area = +house.Land_Area;
      house.Nearest_SCH_Dist = +house.Nearest_SCH_Dist;
      house.Nearest_STN_Dist = +house.Nearest_STN_Dist;
      house.Price = +house.Price;
    });

    // ################################################### //
    // Distance to CBD Analysis
    // ################################################### //

    var three_five_arr = [];
    var five_seven_arr = [];
    var seven_nine_arr = [];
    var nine_eleven_arr = [];
    var eleven_thirteen_arr = [];
    var thirteen_fifteen_arr = [];
    var fifteen_seventeen_arr = [];
    var seventeen_nineteen_arr = [];

    var three_five_price_land_arr = [];
    var five_seven_price_land_arr = [];
    var seven_nine_price_land_arr = [];
    var nine_eleven_price_land_arr = [];
    var eleven_thirteen_price_land_arr = [];
    var thirteen_fifteen_price_land_arr = [];
    var fifteen_seventeen_price_land_arr = [];
    var seventeen_nineteen_price_land_arr = [];

    houseData.forEach((data) => {
      if (data.CBD_Dist < 5000 && data.CBD_Dist >= 3000) {
        three_five_arr.push(data.CBD_Dist);
        three_five_price_land_arr.push(data.Price / data.Land_Area);
      } else if (data.CBD_Dist < 7000) {
        five_seven_arr.push(data.CBD_Dist);
        five_seven_price_land_arr.push(data.Price / data.Land_Area);
      } else if (data.CBD_Dist < 9000) {
        seven_nine_arr.push(data.CBD_Dist);
        seven_nine_price_land_arr.push(data.Price / data.Land_Area);
      } else if (data.CBD_Dist < 11000) {
        nine_eleven_arr.push(data.CBD_Dist);
        nine_eleven_price_land_arr.push(data.Price / data.Land_Area);
      } else if (data.CBD_Dist < 13000) {
        eleven_thirteen_arr.push(data.CBD_Dist);
        eleven_thirteen_price_land_arr.push(data.Price / data.Land_Area);
      } else if (data.CBD_Dist < 15000) {
        thirteen_fifteen_arr.push(data.CBD_Dist);
        thirteen_fifteen_price_land_arr.push(data.Price / data.Land_Area);
      } else if (data.CBD_Dist < 17000) {
        fifteen_seventeen_arr.push(data.CBD_Dist);
        fifteen_seventeen_price_land_arr.push(data.Price / data.Land_Area);
      } else if (data.CBD_Dist < 19000) {
        seventeen_nineteen_arr.push(data.CBD_Dist);
        seventeen_nineteen_price_land_arr.push(data.Price / data.Land_Area);
      }
    });

    // Calculate average price per sqm of land for each CBD_DIST brackets
    var sum = 0;
    three_five_price_land_arr.forEach((data) => {
      sum += data;
    });
    var three_five_avg_price = Math.round(
      sum / three_five_price_land_arr.length
    );

    var sum = 0;
    five_seven_price_land_arr.forEach((data) => {
      sum += data;
    });
    var five_seven_avg_price = Math.round(
      sum / five_seven_price_land_arr.length
    );

    var sum = 0;
    seven_nine_price_land_arr.forEach((data) => {
      sum += data;
    });
    var seven_nine_avg_price = Math.round(
      sum / seven_nine_price_land_arr.length
    );

    var sum = 0;
    nine_eleven_price_land_arr.forEach((data) => {
      sum += data;
    });
    var nine_eleven_avg_price = Math.round(
      sum / nine_eleven_price_land_arr.length
    );

    var sum = 0;
    eleven_thirteen_price_land_arr.forEach((data) => {
      sum += data;
    });
    var eleven_thirteen_avg_price = Math.round(
      sum / eleven_thirteen_price_land_arr.length
    );

    var sum = 0;
    thirteen_fifteen_price_land_arr.forEach((data) => {
      sum += data;
    });
    var thirteen_fifteen_avg_price = Math.round(
      sum / thirteen_fifteen_price_land_arr.length
    );

    var sum = 0;
    fifteen_seventeen_price_land_arr.forEach((data) => {
      sum += data;
    });
    var fifteen_seventeen_avg_price = Math.round(
      sum / fifteen_seventeen_price_land_arr.length
    );

    var sum = 0;
    seventeen_nineteen_price_land_arr.forEach((data) => {
      sum += data;
    });
    var seventeen_nineteen_avg_price = Math.round(
      sum / seventeen_nineteen_price_land_arr.length
    );

    var x = [
      "3-5km",
      "5-7km",
      "7-9km",
      "9-11km",
      "11-13km",
      "13-15km",
      "15-17km",
      "17-19km",
    ];
    var avg_price = [
      three_five_avg_price,
      five_seven_avg_price,
      seven_nine_avg_price,
      nine_eleven_avg_price,
      eleven_thirteen_avg_price,
      thirteen_fifteen_avg_price,
      fifteen_seventeen_avg_price,
      seventeen_nineteen_avg_price,
    ];

    // Bar chart plotted by Chart.js library
    new Chart(document.getElementById("cbd_dist_bar"), {
      type: "bar",
      data: {
        labels: x,
        datasets: [
          {
            label: "($ / m2)",
            backgroundColor: "#DE300B",
            data: avg_price,
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Distance to CBD (km)",
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Price per Land Size ($/m2)",
              },
            },
          ],
        },
        title: {
          display: true,
          text: "Impact of Distance to CBD on Housing Price",
        },
        layout: {
          padding: {
            left: 60,
            right: 100,
            bottom: 100,
            top: 100,
          },
        },
      },
    });

    // ################################################### //
    // Distance to School Analysis
    // ################################################### //

    // Create an array of top 10 Perth's schools
    var top_perth_schools = [
      "PERTH MODERN SCHOOL",
      "PRESBYTERIAN LADIES COLLEGE",
      "PENRHOS COLLEGE",
      "CHRIST CHURCH GRAMMAR SCHOOL",
      "SANTA MARIA COLLEGE",
      "ST HILDA'S ANGLICAN SCHOOL FOR GIRLS",
      "PERTH COLLEGE",
      "ST MARY'S ANGLICAN GIRLS' SCHOOL",
      "HALE SCHOOL",
      "SHENTON COLLEGE",
    ];

    // Initializes the page with a default plot
    function init() {
      var dropdownMenu = d3.selectAll("#selSchool");

      // Populate dropdown Menu with the test subject IDs
      top_perth_schools.forEach((school) => {
        var dataset = dropdownMenu.append("option");
        dataset.property("value", school);
        dataset.text(school);
      });

      scatterChart("PERTH MODERN SCHOOL");
    }

    function scatterChart(school) {
      // Filter data based on the selected school name
      var selecteddata = houseData.filter(
        (data) => data.Nearest_SCH === school
      );

      // Data gathering for scatter chart
      // x is the distance to the school (km)
      // y is the price per land area ($/m2)
      var x = selecteddata.map((data) => data.Nearest_SCH_Dist);
      var y = selecteddata.map((data) =>
        Math.round(data.Price / data.Land_Area)
      );
      // Plotly
      var trace = {
        x: x,
        y: y,
        mode: "markers",
        type: "scatter",

        marker: { size: 12 },
      };

      var data = [trace];

      var layout = {
        xaxis: {
          title: "Distance (km)",
          dtick: 0.2,
        },
        yaxis: {
          title: "Price per Land Size ($/m2)",
        },
        title: "Impact of Distance to School on Housing Price",
      };

      Plotly.newPlot("scatter_school", data, layout);
    }
    // On change to the DOM, call optionChanged()
    d3.selectAll("#selSchool").on("change", optionChanged);

    // Function called by DOM changes

    function optionChanged() {
      var dropdownMenu = d3.selectAll("#selSchool");
      var selectedSchool = dropdownMenu.property("value");
      scatterChart(selectedSchool);
    }

    init();

    // ################################################### //
    // Distance to Train Station Analysis
    // ################################################### //

    // Create an array of 10 Perth's train stations
    var perth_train_stations = [
      "Midland Station",
      "Warwick Station",
      "Cockburn Central Station",
      "Butler Station",
      "Currambine Station",
      "Bull Creek Station",
      "Edgewater Station",
      "Murdoch Station",
      "Canning Bridge Station",
      "Stirling Station",
    ];

    // Initializes the page with a default plot
    function init_station() {
      var dropdownMenu2 = d3.selectAll("#selStation");

      // Populate dropdown Menu with the test subject IDs
      perth_train_stations.forEach((station) => {
        var dataset2 = dropdownMenu2.append("option");
        dataset2.property("value", station);
        dataset2.text(station);
      });

      scatterChart_station("Midland Station");
    }

    function scatterChart_station(station) {
      // Filter data based on the selected school name
      var selecteddata = houseData.filter(
        (data) => data.Nearest_STN === station
      );

      // Data gathering for scatter chart
      // x is the distance to the train station (km)
      // y is the price per land area ($/m2)
      var x2 = selecteddata.map((data) => data.Nearest_STN_Dist);
      var y2 = selecteddata.map((data) =>
        Math.round(data.Price / data.Land_Area)
      );

      // Plotly
      var trace2 = {
        x: x2,
        y: y2,
        mode: "markers",
        type: "scatter",

        marker: { size: 12 },
      };

      var data2 = [trace2];

      var layout = {
        xaxis: {
          dtick: 1000,
          title: "Distance (m)",
          range: [0, 6500],
        },
        yaxis: {
          title: "Price per Land Size ($/m2)",
        },
        title: "Impact of Distance to Train Station on Housing Price",
      };

      Plotly.newPlot("scatter_station", data2, layout);
    }
    // On change to the DOM, call optionChanged()
    d3.selectAll("#selStation").on("change", optionChanged_station);

    // Function called by DOM changes

    function optionChanged_station() {
      var dropdownMenu2 = d3.selectAll("#selStation");
      var selectedStation = dropdownMenu2.property("value");
      scatterChart_station(selectedStation);
    }

    init_station();
  })
  .catch(function (error) {
    console.log(error);
  });
