

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
        
        // function boxChart(station) {


          // // Prevent the page from refreshing
          // d3.event.preventDefault();   

          // var land_size_arr = houseData.map(data => data.LAND_AREA)
          // var price_per_sqm_land_arr = houseData.map(data => data.PRICE / data.LAND_AREA)
          // var price_per_sqm_land_arr = houseData.map(data => data.PRICE )
        
          var property_below_1 = [];
          var property_below_2 = [];
          var property_below_3 = [];
          var property_below_4 = [];

          var price_property_below_1 = [];
          var price_property_below_2 = [];
          var price_property_below_3 = [];
          var price_property_below_4 = [];



          houseData.forEach(data => {
            if (data.NEAREST_STN_DIST < 1000){
              property_below_1.push(data.NEAREST_STN_DIST);
              price_property_below_1.push(Math.round(data.PRICE / data.LAND_AREA));
            }
            else if (data.NEAREST_STN_DIST < 2000){
              property_below_2.push(data.NEAREST_STN_DIST);
              price_property_below_2.push(Math.round(data.PRICE / data.LAND_AREA));
            }
            else if (data.NEAREST_STN_DIST < 3000){
              property_below_3.push(data.NEAREST_STN_DIST);
              price_property_below_3.push(Math.round(data.PRICE / data.LAND_AREA));
            }
            else if (data.NEAREST_STN_DIST < 4000){
              property_below_4.push(data.NEAREST_STN_DIST);
              price_property_below_4.push(Math.round(data.PRICE / data.LAND_AREA));
            };

          });

          // // Calculate average price per sqm of land for each STN_DIST brackets
          // var sum = 0;
          // price_property_below_1.forEach(data =>{
          //   sum += data;
          // })
          // var avg_price_below_1 = Math.round(sum / price_property_below_1.length);


          // var sum = 0;
          // price_property_below_2.forEach(data =>{
          //   sum += data;
          // })
          // var avg_price_below_2 = Math.round(sum / price_property_below_2.length);


          // var sum = 0;
          // price_property_below_3.forEach(data =>{
          //   sum += data;
          // })
          // var avg_price_below_3 = Math.round(sum / price_property_below_3.length);


          // var sum = 0;
          // price_property_below_4.forEach(data =>{
          //   sum += data;
          // })
          // var avg_price_below_4 = Math.round(sum / price_property_below_4.length);

          // console.log(avg_price_below_4) 
          
          
          // PLOTLY
          
          
          var trace1 = {
            y: price_property_below_1,
            type: 'box',
            name: "< 1km"
          };

          
          var trace2 = {
            y: price_property_below_2,
            type: 'box',
            name: "1 - 2km"
          };

          var trace3 = {
            y: price_property_below_3,
            type: 'box',
            name: "2 - 3km"
          };
          
          var trace4 = {
            y: price_property_below_4,
            type: 'box',
            name: "3 - 4km"
          };

          layout = {
            title: 'Proximity to train station and property value',

            margin: {
                l: 100,
                r: 100,
                b: 80,
                t: 80
            },

            showlegend: false
        };


          
          var data = [trace1, trace2, trace3, trace4];
          
          Plotly.newPlot('box_chart', data, layout);


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

    // Function called by DOM changes

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
