
d3.csv("./csv/perth_properties.csv").then(function(houseData) {
        // console.log(houseData);

        // Convert string to number
        houseData.forEach(house => {
            house.LAND_AREA = +house.LAND_AREA;
            house.CBD_DIST = +house.CBD_DIST;
            house.NEAREST_STN_DIST = +house.NEAREST_STN_DIST;
            house.NEAREST_SCH_DIST = +house.NEAREST_SCH_DIST;
            house.YEAR_SOLD = +house.YEAR_SOLD;
            house.BEDROOMS = +house.BEDROOMS;
        });
        
        // function barChart(station) {


          // // Prevent the page from refreshing
          // d3.event.preventDefault();   

          // var land_size_arr = houseData.map(data => data.LAND_AREA)
          // var price_per_sqm_land_arr = houseData.map(data => data.PRICE / data.LAND_AREA)
          // var price_per_sqm_land_arr = houseData.map(data => data.PRICE )
        
          // var dist_to_cbd_arr = [];
          // var price_per_sqm_land_arr = [];
          // var storage = [];
          var five_seven_arr = [];
          var seven_nine_arr = [];
          var nine_eleven_arr = [];
          var eleven_thirteen_arr = [];
          var thirteen_fifteen_arr = [];
          var fifteen_seventeen_arr = [];
          var seventeen_nineteen_arr = [];

          var five_seven_price_land_arr = [];
          var seven_nine_price_land_arr = [];
          var nine_eleven_price_land_arr = [];
          var eleven_thirteen_price_land_arr = [];
          var thirteen_fifteen_price_land_arr = [];
          var fifteen_seventeen_price_land_arr = [];
          var seventeen_nineteen_price_land_arr = [];

          houseData.forEach(data => {
            if (data.CBD_DIST<7000 && data.CBD_DIST>=5000){
              five_seven_arr.push(data.CBD_DIST);
              five_seven_price_land_arr.push(data.PRICE / data.LAND_AREA);
              // var dict = {x: data.CBD_DIST, y:data.PRICE / data.LAND_AREA};
              // storage.push(dict);
            }
            else if (data.CBD_DIST<9000 && data.CBD_DIST>=7000){
              seven_nine_arr.push(data.CBD_DIST);
              seven_nine_price_land_arr.push(data.PRICE / data.LAND_AREA);
            }
            else if (data.CBD_DIST<11000 && data.CBD_DIST>=9000){
              nine_eleven_arr.push(data.CBD_DIST);
              nine_eleven_price_land_arr.push(data.PRICE / data.LAND_AREA);
            }
            else if (data.CBD_DIST<13000 && data.CBD_DIST>=11000){
              eleven_thirteen_arr.push(data.CBD_DIST);
              eleven_thirteen_price_land_arr.push(data.PRICE / data.LAND_AREA);
            }
            else if (data.CBD_DIST<15000 && data.CBD_DIST>=13000){
              thirteen_fifteen_arr.push(data.CBD_DIST);
              thirteen_fifteen_price_land_arr.push(data.PRICE / data.LAND_AREA);
            }
            else if (data.CBD_DIST<17000 && data.CBD_DIST>=15000){
              fifteen_seventeen_arr.push(data.CBD_DIST);
              fifteen_seventeen_price_land_arr.push(data.PRICE / data.LAND_AREA);
            }
            else if (data.CBD_DIST<19000 && data.CBD_DIST>=17000){
              seventeen_nineteen_arr.push(data.CBD_DIST);
              seventeen_nineteen_price_land_arr.push(data.PRICE / data.LAND_AREA);
            };
          });

          // Calculate average price per sqm of land for each CBD_DIST brackets
          var sum = 0;
          five_seven_price_land_arr.forEach(data =>{
            sum += data;
          })
          var five_seven_avg_price = Math.round(sum / five_seven_price_land_arr.length);


          var sum = 0;
          seven_nine_price_land_arr.forEach(data =>{
            sum += data;
          })
          var seven_nine_avg_price = Math.round(sum / seven_nine_price_land_arr.length);


          var sum = 0;
          nine_eleven_price_land_arr.forEach(data =>{
            sum += data;
          })
          var nine_eleven_avg_price = Math.round(sum / nine_eleven_price_land_arr.length);


          var sum = 0;
          eleven_thirteen_price_land_arr.forEach(data =>{
            sum += data;
          })
          var eleven_thirteen_avg_price = Math.round(sum / eleven_thirteen_price_land_arr.length);


          var sum = 0;
          thirteen_fifteen_price_land_arr.forEach(data =>{
            sum += data;
          })
          var thirteen_fifteen_avg_price = Math.round(sum / thirteen_fifteen_price_land_arr.length);


          var sum = 0;
          fifteen_seventeen_price_land_arr.forEach(data =>{
            sum += data;
          })
          var fifteen_seventeen_avg_price = Math.round(sum / fifteen_seventeen_price_land_arr.length);


          var sum = 0;
          seventeen_nineteen_price_land_arr.forEach(data =>{
            sum += data;
          })
          var seventeen_nineteen_avg_price = Math.round(sum / seventeen_nineteen_price_land_arr.length);


          // const data = {
          //   datasets: [{
          //     label: 'Distance to station',
          //     data: storage,
          //     backgroundColor: 'rgb(255, 99, 132)',
          //     pointRadius: 5,
          //     fill: false,
          //     showLine: false
          //   }],
          // };

          // new Chart(document.getElementById('bar'), {
          //   type: 'scatter',
          //   data: data,
          //   options: {
          //     responsive: true,
          //     plugins: {
          //       legend: {
          //         position: 'top',
          //       }
          //     },

          //     layout: {
          //       padding: {
          //         left: 60,
          //         right:100
          //       }  
          //     }

          //   }
          // });



          var x = ["5-7km", "7-9km", "9-11km", "11-13km", "13-15km", "15-17km", "17-19km"];
          var avg_price = [five_seven_avg_price, seven_nine_avg_price, nine_eleven_avg_price, eleven_thirteen_avg_price,
            thirteen_fifteen_avg_price, fifteen_seventeen_avg_price, seventeen_nineteen_avg_price];
        
            console.log(x);
            console.log(avg_price)


        
        // Bar chart plotted by Chart.js library
        new Chart(document.getElementById("bar-chart-grouped"), {
          type: 'bar',
          data: {
            labels: x,
            datasets: [
              {
                label: "$ / m2",
                backgroundColor: "#3e95cd",
                data: avg_price
         
              }
              // ,
              // {
              //   label: "Four",
              //   backgroundColor: "#cd763e",
              //   data: y_four_bedroom,
         
              // },
        
        
            ]
          },
          options: {
            title: {
              display: true,
              text: 'Average property price per square meter based on its distances to CBD'
            },
            layout: {
              padding: {
                left: 60,
                right:100
            }  }
          }
        });
        







        // }

    // // Initializes the page with a default plot
    // function init() {
    //   var dropdownMenu = d3.selectAll('#selDataset');

    //   // Populate dropdown Menu with the test subject IDs
    //   perth_train_stations.forEach(station => {
    //       var dataset = dropdownMenu.append('option');
    //       dataset.property('value',station);
    //       dataset.text(station);
    //   });

    //   scatterChart("Midland Station");
      
    // }


    // // On change to the DOM, call optionChanged()
    // d3.selectAll("#selDataset").on("click", optionChanged);

    // // Function called by DOM changes

    // function optionChanged() {
    //     var dropdownMenu = d3.selectAll('#selDataset');
    //     var selectedStation = dropdownMenu.property('value');

    //     perth_train_stations.forEach((station,id) => {
    //         if (station === selectedStation) {
    //             scatterChart(station);

    //         }
    //     });
    // }

    // init();

}).catch(function(error) {
        console.log(error);
      });
