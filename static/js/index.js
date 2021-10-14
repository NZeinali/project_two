// ################################################################################################ //
//                                       BEDROOM ANALYSIS
// ################################################################################################ //

d3.json("/bedroomsjson")
  .then((houseData) => {
    console.log(houseData);

    // Convert string to number
    houseData.forEach((house) => {
      house.Year_Sold = +house.Year_Sold;
      house.Bedrooms = +house.Bedrooms;
      house.Land_Area = +house.Land_Area;
      house.Price = +house.Price;
    });

    var three_bedroom_2012 = [];
    var three_bedroom_2014 = [];
    var three_bedroom_2016 = [];
    var three_bedroom_2018 = [];
    var three_bedroom_2020 = [];

    var four_bedroom_2012 = [];
    var four_bedroom_2014 = [];
    var four_bedroom_2016 = [];
    var four_bedroom_2018 = [];
    var four_bedroom_2020 = [];

    houseData.forEach((data) => {
      if (data.Bedrooms === 3 && data.Year_Sold == 2012) {
        three_bedroom_2012.push(data.Bedrooms);
      } else if (data.Bedrooms === 3 && data.Year_Sold == 2014) {
        three_bedroom_2014.push(data.Bedrooms);
      } else if (data.Bedrooms === 3 && data.Year_Sold == 2016) {
        three_bedroom_2016.push(data.Bedrooms);
      } else if (data.Bedrooms === 3 && data.Year_Sold == 2018) {
        three_bedroom_2018.push(data.Bedrooms);
      } else if (data.Bedrooms === 3 && data.Year_Sold == 2020) {
        three_bedroom_2020.push(data.Bedrooms);
      } else if (data.Bedrooms === 4 && data.Year_Sold == 2012) {
        four_bedroom_2012.push(data.Bedrooms);
      } else if (data.Bedrooms === 4 && data.Year_Sold == 2014) {
        four_bedroom_2014.push(data.Bedrooms);
      } else if (data.Bedrooms === 4 && data.Year_Sold == 2016) {
        four_bedroom_2016.push(data.Bedrooms);
      } else if (data.Bedrooms === 4 && data.Year_Sold == 2018) {
        four_bedroom_2018.push(data.Bedrooms);
      } else if (data.Bedrooms === 4 && data.Year_Sold == 2020) {
        four_bedroom_2020.push(data.Bedrooms);
      }
    });

    var x = ["2012", "2014", "2016", "2018", "2020"];
    var y_three_bedroom = [
      three_bedroom_2012.length,
      three_bedroom_2014.length,
      three_bedroom_2016.length,
      three_bedroom_2018.length,
      three_bedroom_2020.length,
    ];

    var y_four_bedroom = [
      four_bedroom_2012.length,
      four_bedroom_2014.length,
      four_bedroom_2016.length,
      four_bedroom_2018.length,
      four_bedroom_2020.length,
    ];

    // Bar chart plotted by Chart.js library
    new Chart(document.getElementById("bar-chart-grouped"), {
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
        title: {
          display: true,
          text: "Properties sold in Perth with certain number of bedrooms",
        },
        layout: {
          padding: {
            left: 60,
            right: 100,
          },
        },
      },
    });

    // Bar Chart - Popular bedrooms
    var one_bedroom_arr = [];
    var two_bedroom_arr = [];
    var three_bedroom_arr = [];
    var four_bedroom_arr = [];
    var five_bedroom_arr = [];
    var six_bedroom_arr = [];
    // var threeBD_year_arr = [];
    // var fourBD_year_arr = [];

    houseData.forEach((data) => {
      if (data.Bedrooms === 1) {
        one_bedroom_arr.push(data.Bedrooms);
      } else if (data.Bedrooms === 2) {
        two_bedroom_arr.push(data.Bedrooms);
      } else if (data.Bedrooms === 3) {
        three_bedroom_arr.push(data.Bedrooms);
        // threeBD_year_arr.push(data.Year_Sold);
      } else if (data.Bedrooms === 4) {
        four_bedroom_arr.push(data.Bedrooms);
        // fourBD_year_arr.push(data.Year_Sold);
      } else if (data.Bedrooms === 5) {
        five_bedroom_arr.push(data.Bedrooms);
      } else if (data.Bedrooms === 6) {
        six_bedroom_arr.push(data.Bedrooms);
      }
    });
    // console.log(four_bedroom_arr);
    // console.log(fourBD_year_arr);

    var x = ["One", "Two", "Three", "Four", "Five", "Six"];
    var y = [
      one_bedroom_arr.length,
      two_bedroom_arr.length,
      three_bedroom_arr.length,
      four_bedroom_arr.length,
      five_bedroom_arr.length,
      six_bedroom_arr.length,
    ];

    // Bar chart plotted by Chart.js library
    new Chart(document.getElementById("bar-chart-2"), {
      type: "bar",
      data: {
        labels: x,
        datasets: [
          {
            label: "Number of bedrooms",
            backgroundColor: "#3e95cd",
            data: y,
          },
        ],
      },
      options: {
        title: {
          display: false,
          text: "Number of bedrooms in Perth",
        },
        layout: {
          padding: {
            left: 60,
            right: 100,
          },
        },
      },
    });

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
        // threeBD_year_arr.push(data.Year_Sold);
      } else if (data.Bedrooms === 4) {
        price_fourBD.push(Math.round(data.Price / data.Land_Area));
        // fourBD_year_arr.push(data.Year_Sold);
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
    var y = [
      oneBD_avg_price,
      twoBD_avg_price,
      threeBD_avg_price,
      fourBD_avg_price,
      fiveBD_avg_price,
      sixBD_avg_price,
    ];

    // Bar chart plotted by Chart.js library
    new Chart(document.getElementById("bar-chart-3"), {
      type: "bar",
      data: {
        labels: x,
        datasets: [
          {
            label: "Number of bedrooms",
            backgroundColor: "#3e95cd",
            data: y,
          },
        ],
      },
      options: {
        title: {
          display: false,
          text: "Number of bedrooms in Perth",
        },
        layout: {
          padding: {
            left: 60,
            right: 100,
          },
        },
      },
    });
  })
  .catch(function (error) {
    console.log(error);
  });

// ################################################################################################ //
//                                       HOUSE AGE ANALYSIS
// ################################################################################################ //

d3.json("/agejson")
  .then((houseData) => {
    console.log(houseData);

    // Convert string to number
    houseData.forEach((house) => {
      house.Build_Year = +house.Build_Year;
      house.Land_Area = +house.Land_Area;
      house.Price = +house.Price;
    });

    var house_age = [];
    var house_price = [];

    // house_age = houseData.map((data) => data.Build_Year);
    // house_price = houseData.map((data) =>
    //   Math.round(data.Price / data.Land_Area)
    // );

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
      "2015 onward",
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

    // house_age = houseData.map((data) => data.Build_Year);

    // Plot by PLOTLY
    var trace = {
      x: xValue,
      y: yValue,
      type: "bar",
      text: yValue.map(String),
      textposition: "auto",
      hoverinfo: "none",
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
        title: "Year the property was built",
      },
      yaxis: {
        title: "Price per Land Size ($/m2)",
      },
    };

    Plotly.newPlot("age_plotly", data, layout);
  })
  .catch(function (error) {
    console.log(error);
  });
