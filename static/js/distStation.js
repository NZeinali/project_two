
    var perth_train_stations = ["Midland Station", "Warwick Station", "Cockburn Central Station", "Butler Station", "Currambine Station",
      "Bull Creek Station", "Edgewater Station", "Murdoch Station", "Canning Bridge Station", "Stirling Station"];
    
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
        
        function scatterChart(station) {


          // // Prevent the page from refreshing
          // d3.event.preventDefault();   

          // var land_size_arr = houseData.map(data => data.LAND_AREA)
          // var price_per_sqm_land_arr = houseData.map(data => data.PRICE / data.LAND_AREA)
          // var price_per_sqm_land_arr = houseData.map(data => data.PRICE )
        
          var dist_to_stn_arr = [];
          var price_per_sqm_land_arr = [];
          var storage = [];

          houseData.forEach(data => {
            if (station == data.NEAREST_STN){
              dist_to_stn_arr.push(data.NEAREST_STN_DIST);
              price_per_sqm_land_arr.push(data.PRICE / data.LAND_AREA);
              var dict = {x: data.NEAREST_STN_DIST, y:data.PRICE / data.LAND_AREA};
              storage.push(dict);
            }
          });

          // console.log(storage);

          const data = {
            datasets: [{
              label: 'Distance to station',
              data: storage,
              backgroundColor: 'rgb(255, 99, 132)',
              pointRadius: 5,
              fill: false,
              showLine: false
            }],
          };

          new Chart(document.getElementById('scatter'), {
            type: 'scatter',
            data: data,
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                }
              },

              layout: {
                padding: {
                  left: 60,
                  right:100
                }  
              }

            }
          });
        }

    // Initializes the page with a default plot
    function init() {
      var dropdownMenu = d3.selectAll('#selDataset');

      // Populate dropdown Menu with the test subject IDs
      perth_train_stations.forEach(station => {
          var dataset = dropdownMenu.append('option');
          dataset.property('value',station);
          dataset.text(station);
      });

      scatterChart("Midland Station");
      
    }


    // On change to the DOM, call optionChanged()
    d3.selectAll("#selDataset").on("click", optionChanged);

    // Function called by DOM changes

    function optionChanged() {
        var dropdownMenu = d3.selectAll('#selDataset');
        var selectedStation = dropdownMenu.property('value');

        perth_train_stations.forEach((station,id) => {
            if (station === selectedStation) {
                scatterChart(station);

            }
        });
    }

    init();


    }).catch(function(error) {
        console.log(error);
      });
